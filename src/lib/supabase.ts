import { createClient } from "@supabase/supabase-js"
import type { BlogPost, BlogPostWithAuthor } from "@/types/blog"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Database types
export interface User {
  id: string
  email: string
  name: string
  role: "admin"
  created_at: string
  updated_at: string
}

// export interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   content: string
//   category: "Strategy" | "Growth" | "Leadership" | "Tactics" | "Insights"
//   type: "featured" | "normal"
//   status: "published" | "draft"
//   read_time: string
//   cover_image?: string
//   slug: string
//   author_id: string
//   created_at: string
//   updated_at: string
//   author?: User
// }

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  post_count: number
}

export type { BlogPost, BlogPostWithAuthor }