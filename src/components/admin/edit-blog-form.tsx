/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Eye, Save, Send, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useBlogStore } from "@/store/blog-store"
import { useAuth } from "@/components/providers/auth-providers"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { EnhancedEditor } from "./enhance-editor"
import type { BlogPostWithAuthor, FormErrors, BlogCategory, PostType, PostStatus } from "@/types/blog"

interface EditBlogFormProps {
  post: BlogPostWithAuthor
}

interface FormState {
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  type: PostType
  status: PostStatus
  coverImage: File | null
  currentCoverImage: string | null
}

export function EditBlogForm({ post }: EditBlogFormProps) {
  const [formData, setFormData] = useState<FormState>({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category as BlogCategory,
    type: post.type,
    status: post.status,
    coverImage: null,
    currentCoverImage: post.cover_image || null,
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { invalidateCache, fetchPosts } = useBlogStore()

  const handleInputChange = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]): void => {
      setFormData((prev) => ({ ...prev, [field]: value }))

      // Clear field-specific error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors],
  )

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0]
      if (file) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid File Type",
            description: "Please select an image file",
            variant: "destructive",
          })
          return
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: "Please select an image smaller than 5MB",
            variant: "destructive",
          })
          return
        }

        setFormData((prev) => ({ ...prev, coverImage: file }))
      }
    },
    [toast],
  )

  const calculateReadTime = useCallback((content: string): string => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters"
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required"
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = "Excerpt must be less than 500 characters"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const getAuthToken = useCallback(async (): Promise<string> => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.access_token) {
      throw new Error("No valid session found. Please log in again.")
    }

    return session.access_token
  }, [])

  const handleSubmit = useCallback(
    async (status: PostStatus): Promise<void> => {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to update posts",
          variant: "destructive",
        })
        return
      }

      if (!validateForm()) {
        toast({
          title: "Validation Error",
          description: "Please fix the errors below",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)
      setErrors({})

      try {
        const authToken = await getAuthToken()

        // Create FormData for the API request
        const apiFormData = new FormData()
        apiFormData.append("title", formData.title.trim())
        apiFormData.append("excerpt", formData.excerpt.trim())
        apiFormData.append("content", formData.content)
        apiFormData.append("category", formData.category)
        apiFormData.append("type", formData.type)
        apiFormData.append("status", status)
        apiFormData.append("readTime", calculateReadTime(formData.content))

        if (formData.coverImage) {
          apiFormData.append("coverImage", formData.coverImage)
        }

        // Make API request
        const response = await fetch(`/api/admin/posts/${post.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: apiFormData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to update post")
        }

        const updatedPost: BlogPostWithAuthor = await response.json()

        // Update the store
        invalidateCache()
        await fetchPosts()

        toast({
          title: "Success",
          description: `Post ${status === "published" ? "updated and published" : "updated as draft"} successfully`,
        })

        router.push("/admin")
      } catch (error) {
        console.error("Error updating post:", error)

        const errorMessage = error instanceof Error ? error.message : "Failed to update post"

        setErrors({ general: errorMessage })
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [
      user,
      validateForm,
      formData,
      post.id,
      calculateReadTime,
      getAuthToken,
      invalidateCache,
      fetchPosts,
      toast,
      router,
    ],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-2  items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="border-accent text-accent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden md:inline"> Back to Dashboard</span> 
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Edit Intelligence Report</h1>
                <p className="text-muted-foreground">Update your strategic insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Mobile Preview Toggle */}
              <Button variant="outline" onClick={() => setShowMobilePreview(!showMobilePreview)} className="hidden border-accent text-accent">
                {showMobilePreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showMobilePreview ? "Hide Preview" : "Show Preview"}
              </Button>

              <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isLoading} className="border-accent text-accent">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {isLoading ? "Saving..." : "Save Draft"}
              </Button>

              <Button onClick={() => handleSubmit("published")} disabled={isLoading} className="bg-accent text-white">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                {isLoading ? "Publishing..." : "Update & Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* General Error Display */}
        {errors.general && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.general}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Preview Modal */}
        {showMobilePreview && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="bg-background h-full overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowMobilePreview(false)}>
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <BlogPreview formData={formData} />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            {/* Post Details */}
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Update your post information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your strategic title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your intelligence report..."
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    rows={3}
                    className={errors.excerpt ? "border-destructive" : ""}
                  />
                  {errors.excerpt && <p className="text-sm text-destructive mt-1">{errors.excerpt}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: BlogCategory) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Technology", "Business", "Health", "Science", "Culture"].map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="type">Post Type</Label>
                    <Select value={formData.type} onValueChange={(value: PostType) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* <div>
                  <Label htmlFor="coverImage">Cover Image</Label>
                  {formData.currentCoverImage && (
                    <div className="mt-2 mb-2">
                      <p className="text-sm text-muted-foreground">Current image:</p>
                      <img
                        src={formData.currentCoverImage || "/placeholder.svg"}
                        alt="Current cover"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.coverImage
                        ? formData.coverImage.name
                        : formData.currentCoverImage
                          ? "Replace Cover Image"
                          : "Upload Cover Image"}
                    </Button>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            {/* Content Editor */}
            <div className={errors.content ? "border border-destructive rounded-lg" : ""}>
              <EnhancedEditor
                value={formData.content}
                onChange={(content) => handleInputChange("content", content)}
                placeholder="Share your battle-tested wisdom..."
              />
              {errors.content && <p className="text-sm text-destructive mt-1 px-3">{errors.content}</p>}
            </div>
          </div>

          {/* Preview Section - Hidden on mobile */}
          <div className="hidden lg:block space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your updated post will appear</CardDescription>
              </CardHeader>
              <CardContent>
                <BlogPreview formData={formData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Preview Component
interface BlogPreviewProps {
  formData: FormState
}

function BlogPreview({ formData }: BlogPreviewProps) {
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (!formData.title && !formData.excerpt && !formData.content) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Start editing to see your preview...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {(formData.coverImage || formData.currentCoverImage) && (
        <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
          {formData.coverImage ? (
            <span className="text-white/80">New Cover Image Selected</span>
          ) : (
            <img
              src={formData.currentCoverImage || ""}
              alt="Cover preview"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        {formData.category && <Badge className="border-accent text-accent">{formData.category}</Badge>}
        {formData.type === "featured" && <Badge>Featured</Badge>}
        <span className="text-sm text-muted-foreground">{calculateReadTime(formData.content)}</span>
      </div>

      {formData.title && <h1 className="text-2xl font-bold text-foreground">{formData.title}</h1>}

      {formData.excerpt && <p className="text-muted-foreground">{formData.excerpt}</p>}

      {formData.content && (
        <div
          className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-accent hover:prose-a:text-accent/80"
          dangerouslySetInnerHTML={{ __html: formData.content }}
        />
      )}
    </div>
  )
}
