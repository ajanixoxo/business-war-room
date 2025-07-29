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
    console.log('🔐 Starting signInWithEmail')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('❌ Auth error:', error)
      throw error
    }

    console.log('✅ Auth successful, user:', data.user)

    if (!data.user) {
      throw new Error('No user returned from authentication')
    }

    // Get user profile using the authenticated user's ID
    console.log('🔍 Looking up profile for user:', data.user.id)

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    console.log('🔍 Profile query result:', { profile, profileError })

    if (profileError) {
      console.error('❌ Profile lookup error:', profileError)

      // Check if any profiles exist for debugging
      const { data: allProfiles } = await supabase.from("profiles").select("*")
      console.log('📋 All profiles in database:', allProfiles)

      throw profileError
    }

    if (!profile) {
      console.log('❌ No profile found')
      throw new Error('User profile not found')
    }

    console.log('✅ Profile found:', profile)

    const authUser = {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString(),
    }

    console.log('✅ Returning AuthUser:', authUser)
    return authUser
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
  // Get current user with enhanced debugging
  async getCurrentUser(): Promise<AuthUser | null> {
    console.log('🔍 Getting current user...')

    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('getCurrentUser timed out after 10 seconds')), 10000)
      )

      const authPromise = supabase.auth.getUser()

      const { data: { user } } = await Promise.race([authPromise, timeoutPromise])

      console.log('🔍 Auth user:', user)

      if (!user) {
        console.log('❌ No authenticated user')
        return null
      }

      // Get profile with timeout
      const profilePromise = supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      const profileTimeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Profile query timed out after 5 seconds')), 5000)
      )

      const { data: profile, error } = await Promise.race([profilePromise, profileTimeoutPromise])

      if (error) {
        console.error('❌ Profile error:', error)
        return null
      }

      if (!profile) {
        console.log('❌ No profile found')
        return null
      }

      const authUser = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        created_at: profile.created_at || new Date().toISOString(),
        updated_at: profile.updated_at || new Date().toISOString(),
      }

      console.log('✅ getCurrentUser success:', authUser)
      return authUser
    } catch (error) {
      console.error('❌ getCurrentUser error:', error)
      return null
    }
  }

  // Enhanced auth state change listener
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state changed:', event, 'User ID:', session?.user?.id)

      if (event === 'SIGNED_OUT' || !session?.user) {
        console.log('🚪 User signed out, calling callback with null')
        callback(null)
        return
      }

      // For SIGNED_IN events, the user data should already be set by signInWithEmail
      // So we only need to handle TOKEN_REFRESHED here
      if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed, getting current user...')
        try {
          const user = await this.getCurrentUser()
          console.log('✅ Got current user after token refresh:', user)
          callback(user)
        } catch (error) {
          console.error('❌ Error getting user after token refresh:', error)
          callback(null)
        }
      } else if (event === 'SIGNED_IN') {
        console.log('🔐 SIGNED_IN event - user should already be set by signIn method')
        // Don't call getCurrentUser here since it might hang
        // The user should already be set by the signInWithEmail method
      }
    })
  }

  // Listen to auth changes

  // Get allowed emails (for display purposes)
  getAllowedEmails(): string[] {
    return [...ALLOWED_ADMIN_EMAILS]
  }
}

export const authService = new AuthService()
