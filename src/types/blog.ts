// Centralized type definitions for the blog system
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  type: "featured" | "normal"
  status: "published" | "draft"
  read_time: string
  cover_image?: string
  slug: string
  author_id: string
  created_at: string
  updated_at: string
}

export interface BlogPostWithAuthor extends BlogPost {
  author: {
    id: string
    name: string
    email: string
    role: "admin"
    created_at: string
    updated_at: string
  }
}

export interface CreatePostData {
  title: string
  excerpt: string
  content: string
  category: string
  type: "featured" | "normal"
  status: "published" | "draft"
  readTime: string
  coverImage?: File
}

export interface UpdatePostData extends CreatePostData {
  id: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success?: boolean
}

export interface FormErrors {
  title?: string
  excerpt?: string
  content?: string
  category?: string
  general?: string
}

export const BLOG_CATEGORIES = ["Strategy", "Growth", "Leadership", "Tactics", "Insights"] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const POST_TYPES = ["featured", "normal"] as const
export type PostType = (typeof POST_TYPES)[number]

export const POST_STATUSES = ["published", "draft"] as const
export type PostStatus = (typeof POST_STATUSES)[number]
