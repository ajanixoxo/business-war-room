"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreateBlogForm } from "@/components/admin/create-blog-form"
import { useAuth } from "@/components/providers/auth-providers"

export default function CreateBlogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <CreateBlogForm />
}
