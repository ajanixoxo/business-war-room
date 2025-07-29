"use client"

import { useAuth } from "@/components/providers/auth-providers"
import { useEffect } from "react"

export function AuthDebugComponent() {
  const { user, loading } = useAuth()

  useEffect(() => {
    console.log('🔍 AuthDebug: Current state:', { user, loading })
  }, [user, loading])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs max-w-xs z-50">
      <div><strong>Auth Debug:</strong></div>
      <div>Loading: {loading ? 'true' : 'false'}</div>
      <div>User: {user ? user.email : 'null'}</div>
      <div>Role: {user?.role || 'none'}</div>
    </div>
  )
}