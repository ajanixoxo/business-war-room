"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Eye, Save, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useBlogStore } from "@/store/blog-store"
import { useAuth } from "@/components/providers/auth-providers"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { EnhancedEditor } from "./enhance-editor"

// Define the category type based on your BlogPost interface
type BlogCategory = "Strategy" | "Growth" | "Leadership" | "Tactics" | "Insights"

const categories: BlogCategory[] = ["Strategy", "Growth", "Leadership", "Tactics", "Insights"]

export function CreateBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "" as BlogCategory | "",
    type: "normal" as "featured" | "normal",
    status: "draft" as "published" | "draft",
    coverImage: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { createPost } = useBlogStore()
  const { user } = useAuth()

  const handleInputChange = (field: string, value: string | BlogCategory | File | null | "featured" | "normal") => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }))
    }
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `blog-images/${fileName}`

    const { error: uploadError } = await supabase.storage.from("blog-assets").upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage.from("blog-assets").getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (status: "draft" | "published") => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create posts",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let coverImageUrl: string | undefined = undefined

      if (formData.coverImage) {
        coverImageUrl = await uploadImage(formData.coverImage)
      }

      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category as BlogCategory,
        type: formData.type,
        status,
        read_time: calculateReadTime(formData.content),
        cover_image: coverImageUrl,
        slug: generateSlug(formData.title),
        author_id: user.id,
      }

      await createPost(postData)

      toast({
        title: "Success",
        description: `Blog post ${status === "published" ? "published" : "saved as draft"} successfully`,
      })
      router.push("/admin")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create blog post";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-accent border-accent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create Intelligence Report</h1>
                <p className="text-muted-foreground">Craft your strategic insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="text-accent broder-accent">
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isLoading} className="text-accent broder-accent">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSubmit("published")} disabled={isLoading} className="text-white bg-accent">
                <Send className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Basic information about your post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your strategic title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your intelligence report..."
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select  value={formData.category} onValueChange={(value: BlogCategory) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Post Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "featured" | "normal") => handleInputChange("type", value)}
                    >
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

                <div>
                  <Label htmlFor="coverImage">Cover Image</Label>
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
                      {formData.coverImage ? formData.coverImage.name : "Upload Cover Image"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
                <CardDescription>Write your strategic insights</CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedEditor
                  value={formData.content}
                  onChange={(content) => handleInputChange("content", content)}
                  placeholder="Share your battle-tested wisdom..."
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>
                    <strong>Pro Tips:</strong> Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+K for links. Click the table
                    icon to insert tables.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your post will appear</CardDescription>
              </CardHeader>
              <CardContent>
                {formData.title || formData.excerpt || formData.content ? (
                  <div className="space-y-4">
                    {formData.coverImage && (
                      <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
                        <span className="text-white/80">Cover Image Preview</span>
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
                        className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground"
                        dangerouslySetInnerHTML={{ __html: formData.content }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Start writing to see your preview...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}