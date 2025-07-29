"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, ArrowRight } from "lucide-react"
import { useBlogStore } from "@/store/blog-store"
import Link from "next/link"
import Image from "next/image"

export function BlogGrid() {
  const { posts, isLoading } = useBlogStore()

  // Filter published posts and exclude featured posts
  const publishedPosts = posts.filter((post) => post.status === "published" && post.type !== "featured")

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="rounded-lg  border-accent/20 bg-card text-card-foreground shadow-sm group overflow-hidden hover:shadow-command transition-all duration-300 cursor-pointer">
            <Card className="l gap-3 pt-0 border-0">
              <div className="aspect-video relative">
                {post.cover_image ? (
                  <Image src={post.cover_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-primary opacity-80"></div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <Badge className="border-accent text-accent bg-transparent">{post.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2 flex-1">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm flex-1">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{post.author?.name || "Balogun"}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short", // "Dec"
                      day: "numeric", // "5"
                      year: "numeric" // "2025"
                    })}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {publishedPosts.length > 6 && (
        <div className="text-center mt-12">
          <Button variant="outline">Load More Intelligence Reports</Button>
        </div>
      )}
    </section>
  )
}
