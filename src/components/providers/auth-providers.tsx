"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authService, type AuthUser } from "@/lib/auth"
import { useBlogStore } from "@/store/blog-store"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  allowedEmails: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { setCurrentUser } = useBlogStore()

  useEffect(() => {
    let mounted = true

    // Get initial user
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        if (mounted) {
          setUser(currentUser)
          setCurrentUser(currentUser)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error getting current user:", error)
        if (mounted) {
          setUser(null)
          setCurrentUser(null)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (authUser) => {
      console.log('🔄 AuthProvider: Auth state changed, received user:', authUser)
      if (mounted) {
        setUser(authUser)
        setCurrentUser(authUser)
        console.log('✅ AuthProvider: Updated user state with:', authUser)
        if (!loading) {
          setLoading(false)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [setCurrentUser, loading])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 AuthProvider: Starting signIn...')
      const user = await authService.signInWithEmail(email, password)
      console.log('✅ AuthProvider: Got user from service:', user)
      setUser(user)
      setCurrentUser(user)
      console.log('✅ AuthProvider: Set user state')
    } catch (error) {
      console.error("❌ AuthProvider: Sign in error:", error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const user = await authService.signUpAdmin(email, password, name)
      setUser(user)
      setCurrentUser(user)
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
      setCurrentUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        allowedEmails: authService.getAllowedEmails(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}