"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User, ArrowRight } from "lucide-react"
import { useBlogStore } from "@/store/blog-store"
import Link from "next/link"
import Image from "next/image"

export function FeaturedPost() {
  const { featuredPosts, isLoading } = useBlogStore()
  const featuredPost = featuredPosts[0]

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Intelligence</h2>
          <p className="text-muted-foreground">Our latest strategic analysis and tactical insights</p>
        </div>
        <Card className="overflow-hidden bg-gradient-hero border-border shadow-tactical">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto bg-gradient-primary opacity-80 animate-pulse"></div>
            <div className="p-8 flex flex-col justify-center">
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    )
  }

  if (!featuredPost) {
    return null
  }

  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Featured Intelligence</h2>
        <p className="text-muted-foreground">Our latest strategic analysis and tactical insights</p>
      </div>

      <Card className="overflow-hidden bg-gradient-hero border-border shadow-tactical hover:shadow-command transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-video md:aspect-auto relative">
            {featuredPost.cover_image ? (
              <Image
                src={featuredPost.cover_image || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-primary opacity-80"></div>
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">{featuredPost.category}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{featuredPost.read_time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{featuredPost.author?.name || "Balogun"}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-4">{featuredPost.title}</h3>

            <p className="text-muted-foreground mb-6 line-clamp-3">{featuredPost.excerpt}</p>

            <Link href={`/blog/${featuredPost.slug}`}>
              <Button className="w-fit">
                Read Intelligence Report <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  )
}
