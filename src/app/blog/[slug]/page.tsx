"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { supabase, type BlogPost } from "@/lib/supabase"
import { notFound } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      if (!params.slug) return

      try {
        const { data, error } = await supabase
          .from("posts")
          .select(`
            *,
            author:profiles(name, email)
          `)
          .eq("slug", params.slug)
          .eq("status", "published")
          .single()

        if (error) {
          console.error("Error fetching post:", error)
          notFound()
          return
        }

        setPost(data)
      } catch (error) {
        console.error("Error:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-8">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="aspect-video bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-12 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Intelligence Hub
              </Button>
            </Link>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.cover_image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Meta */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <Badge className="border-accent text-accent">{post.category}</Badge>
              {post.type === "featured" && <Badge>Featured</Badge>}
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.read_time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author?.name || "Balogun"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Title and Excerpt */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-accent hover:prose-a:text-accent/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="mt-16 p-6 bg-gradient-hero rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{post.author?.name || "Balogun"}</h3>
                  <p className="text-muted-foreground">Strategic Consultant & Business War Room Commander</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Helping startups and growing businesses transform challenges into competitive advantages through
                    battle-tested strategies and tactical frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
