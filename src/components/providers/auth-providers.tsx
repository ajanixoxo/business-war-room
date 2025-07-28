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
    // Get initial user
    authService.getCurrentUser().then((user) => {
      setUser(user)
      setCurrentUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange((user) => {
      setUser(user)
      setCurrentUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setCurrentUser])

  const signIn = async (email: string, password: string) => {
    const user = await authService.signInWithEmail(email, password)
    setUser(user)
    setCurrentUser(user)
  }

  const signUp = async (email: string, password: string, name: string) => {
    const user = await authService.signUpAdmin(email, password, name)
    setUser(user)
    setCurrentUser(user)
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setCurrentUser(null)
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
