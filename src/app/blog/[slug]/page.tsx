"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/app/Navbar"
import Footer from "@/app/Footer"
import { Button } from "@/components/ui/button"
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { supabase, type BlogPost } from "@/lib/supabase"
import { notFound } from "next/navigation"

interface BlogPostWithAuthor extends BlogPost {
  author: {
    name: string
    email: string
    created_at: string
    id: string
    role: "admin"
    updated_at: string
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPostWithAuthor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      if (!params.slug) return

      try {
        // First, get the post by slug to get the ID
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("id")
          .eq("slug", params.slug)
          .eq("status", "published")
          .single()

        if (postError || !postData) {
          console.error("Error fetching post by slug:", postError)
          notFound()
          return
        }

        // Now fetch the full post data using the API route
        const response = await fetch(`/api/admin/posts/${postData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          // If the admin route fails, fall back to direct Supabase query
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("posts")
            .select(`
              *,
              author:profiles(name, email)
            `)
            .eq("id", postData.id)
            .eq("status", "published")
            .single()

          if (fallbackError) {
            console.error("Error fetching post:", fallbackError)
            notFound()
            return
          }

          setPost(fallbackData as BlogPostWithAuthor)
        } else {
          const apiData = await response.json()
          setPost(apiData as BlogPostWithAuthor)
        }
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
        <Navbar />
        {/* Loading Hero */}
        <div className="relative">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-primary opacity-80"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-slate-700 rounded w-24"></div>
                <div className="h-16 bg-slate-700 rounded w-3/4"></div>
                <div className="flex space-x-6">
                  <div className="h-4 bg-slate-700 rounded w-20"></div>
                  <div className="h-4 bg-slate-700 rounded w-24"></div>
                  <div className="h-4 bg-slate-700 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Loading Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header Section */}
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-primary opacity-80"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-6 z-10">
          <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Intel Center
          </Button>
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author?.name || "Balogun"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.read_time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short", // "Dec"
                      day: "numeric", // "5"
                      year: "numeric" // "2025"
                    })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-border">
          <div className="flex items-center gap-4 text-white">
            <Button variant="ghost" className="hover:bg-accent/10">
              <Share2 className="w-4 h-4 mr-2" />
              Share Intel
            </Button>
            <Button variant="ghost" className="hover:bg-accent/10">
              <Bookmark className="w-4 h-4 mr-2" />
              Save for Later
            </Button>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-foreground"
          style={{ lineHeight: 1.75, fontSize: "1.125rem" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action Section */}
        <div className="mt-16 p-8 bg-gradient-hero rounded-lg border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Implement These Strategies?</h3>
          <p className="text-muted-foreground mb-6">
            Join over 500 business leaders who receive our exclusive strategic intelligence reports and tactical
            insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-tactical transform hover:scale-105 transition-all duration-300 h-11 rounded-md px-8">
              Schedule Strategic Consultation
            </Button>
            <Button variant="outline" className="h-11 rounded-md px-8 bg-transparent border-accent text-accent">
              Download Full Framework
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
