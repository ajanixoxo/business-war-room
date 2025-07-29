import { supabase } from "./supabase"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin"
  created_at: string
  updated_at: string
}

// Hardcoded allowed admin emails
const ALLOWED_ADMIN_EMAILS = ["takeoutsguy@gmail.com", "Bunmibalogun450@yahoo.com", "joelayomide35@gmail.com"]

class AuthService {
  // Check if email is allowed to register
  private isAllowedEmail(email: string): boolean {
    return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())
  }

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (profileError) throw profileError

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString(),
    }
  }

  // Sign up new admin (restricted to allowed emails only)
async signUpAdmin(email: string, password: string, name: string): Promise<AuthUser> {
    // Check if email is in allowed list
    if (!this.isAllowedEmail(email)) {
      throw new Error("This email is not authorized to create an admin account")
    }

    // Check if user limit reached (max 3 admins)
    const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin")

    if (count && count >= 3) {
      throw new Error("Maximum number of admins reached")
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.toLowerCase())
      .maybeSingle() // Use maybeSingle() instead of single() to handle no results

    if (existingUser) {
      throw new Error("An account with this email already exists")
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: "admin",
        },
      },
    })

    if (error) throw error

    if (!data.user) {
      throw new Error("Failed to create user")
    }

    // Wait a bit for the trigger to create the profile
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Try to get the profile, with retries
    let profile = null
    let attempts = 0
    const maxAttempts = 5

    while (!profile && attempts < maxAttempts) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle()

      if (profileData) {
        profile = profileData
        break
      }

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError
      }

      attempts++
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    if (!profile) {
      // If profile still doesn't exist, create it manually
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email: email.toLowerCase(),
          name,
          role: "admin",
        })
        .select()
        .single()

      if (createError) throw createError
      profile = newProfile
    }

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString(),
    }
}

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) return null

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString(),
    }
  }

  // Listen to auth changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser()
        callback(user)
      } else {
        callback(null)
      }
    })
  }

  // Get allowed emails (for display purposes)
  getAllowedEmails(): string[] {
    return [...ALLOWED_ADMIN_EMAILS]
  }
}

export const authService = new AuthService()
