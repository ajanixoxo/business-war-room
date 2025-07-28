"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Target, Shield, TrendingUp, Users, Zap, Brain } from "lucide-react"
import { useBlogStore } from "@/store/blog-store"

const categoryIcons = {
  "All Intel": Target,
  Strategy: Shield,
  Growth: TrendingUp,
  Leadership: Users,
  Tactics: Zap,
  Insights: Brain,
}

export function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState("All Intel")
  const { categories, posts } = useBlogStore()

  // Calculate post counts
  const allIntelCount = posts.filter((post) => post.status === "published").length
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category.name] = posts.filter((post) => post.category === category.name && post.status === "published").length
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryData = [
    { name: "All Intel", count: allIntelCount },
    ...categories.map((cat) => ({
      name: cat.name,
      count: categoryCounts[cat.name] || 0,
    })),
  ]

  return (
    <section className="py-8 border-b border-border">
      <div className="flex flex-wrap gap-3">
        {categoryData.map((category) => {
          const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Target
          const isActive = activeCategory === category.name

          return (
            <Button
              key={category.name}
              variant={isActive ? "default" : "outline"}
              className="h-12 px-6"
              onClick={() => setActiveCategory(category.name)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.name}
              <span className="ml-2 bg-background/20 px-2 py-1 rounded-full text-xs">{category.count}</span>
            </Button>
          )
        })}
      </div>
    </section>
  )
}
