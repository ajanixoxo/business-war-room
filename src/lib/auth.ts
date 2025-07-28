import { supabase } from "./supabase"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin"
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
      .single()

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

    return {
      id: data.user!.id,
      email,
      name,
      role: "admin",
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
