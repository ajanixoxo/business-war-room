"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function BlogHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative pt-24 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            War Room <span className="text-accent">Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Strategic insights, tactical frameworks, and battle-tested wisdom for modern business leaders. Your command
            center for competitive advantage.
          </p>
          <div className="max-w-md mx-auto relative">
            <Input
              placeholder="Search battle plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border foucs:outline-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-text-muted-foreground text-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
