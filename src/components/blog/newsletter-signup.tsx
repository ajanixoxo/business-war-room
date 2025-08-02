"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shield, Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return;
    
    // Create email subject and body
    const subject = encodeURIComponent('Newsletter Subscription Request - Strategic Command Network');
    const body = encodeURIComponent(`Hello,

I would like to subscribe to the Strategic Command Network newsletter.

Email: ${email}

Please add me to your mailing list for exclusive intelligence reports, tactical frameworks, and strategic insights.

Best regards`);
    
    // Create mailto link
    const mailtoLink = `mailto:info@businesswarroom.io?subject=${subject}&body=${body}`;
    
    // Open mail app
    window.location.href = mailtoLink;
    
    // Clear the email field
    setEmail("")
  }

  return (
    <section className="py-16">
      <Card className="bg-gradient-hero border-border p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-accent/20 p-4 rounded-full">
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">Join the Strategic Command Network</h2>

          <p className="text-muted-foreground mb-8">
            Get exclusive intelligence reports, tactical frameworks, and strategic insights delivered directly to your
            command center. Join 5,000+ business leaders.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Enter your email for classified intel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
                required
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
            <Button type="submit" className="h-12 px-8">
              Deploy Intel
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">No spam. Strategic insights only. Unsubscribe anytime.</p>
        </div>
      </Card>
    </section>
  )
}