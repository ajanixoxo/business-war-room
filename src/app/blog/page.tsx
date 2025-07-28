"use client"

import { useEffect } from "react"
import Navbar from "../Navbar"
import { BlogHero } from "@/components/blog/blog-hero"
import { FeaturedPost } from "@/components/blog/featured-post"
import { BlogCategories } from "@/components/blog/blog-categories"
import { BlogGrid } from "@/components/blog/blog-grid"
import { NewsletterSignup } from "@/components/blog/newsletter-signup"
import Footer from "../Footer"
import { useBlogStore } from "@/store/blog-store"

export default function BlogPage() {
  const { fetchPosts, fetchCategories, fetchFeaturedPosts } = useBlogStore()

  useEffect(() => {
    // Fetch data on mount
    fetchPosts()
    fetchCategories()
    fetchFeaturedPosts()
  }, [fetchPosts, fetchCategories, fetchFeaturedPosts])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BlogHero />
      <div className="container mx-auto px-6">
        <FeaturedPost />
        <BlogCategories />
        <BlogGrid />
        <NewsletterSignup />
      </div>
      <Footer />
    </div>
  )
}
