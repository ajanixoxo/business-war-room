/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditBlogForm } from "@/components/admin/edit-blog-form"
import { useAuth } from "@/components/providers/auth-providers"
import { Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { BlogPostWithAuthor } from "@/types/blog"

interface EditPageState {
  post: BlogPostWithAuthor | null
  loading: boolean
  error: string | null
}

export default function EditBlogPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [state, setState] = useState<EditPageState>({
    post: null,
    loading: true,
    error: null,
  })

  const postId = params.id as string

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login")
      return
    }

    if (!postId) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Invalid post ID",
      }))
      return
    }

    fetchPost()
  }, [user, authLoading, router, postId])

  const fetchPost = async (): Promise<void> => {
    if (!user) return

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const post: BlogPostWithAuthor = await response.json()

      setState({
        post,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error("Error fetching post:", error)
      setState({
        post: null,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch post",
      })
    }
  }

  const getAuthToken = async (): Promise<string> => {
    const { supabase } = await import("@/lib/supabase")
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.access_token) {
      throw new Error("No valid session found")
    }

    return session.access_token
  }

  // Loading state
  if (authLoading || state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground">{authLoading ? "Checking authentication..." : "Loading post..."}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (state.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Error Loading Post</h2>
              <p className="text-muted-foreground mb-4">{state.error}</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={fetchPost} variant="outline" className="text-accent border-accent">
                  Try Again
                </Button>
                <Link href="/admin">
                  <Button className="bg-accent text-accent">Back to Dashboard</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null
  }

  // Post not found
  if (!state.post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The post you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to edit it.
              </p>
              <Link href="/admin">
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <EditBlogForm post={state.post} />
}
