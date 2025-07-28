import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { supabase } from "@/lib/supabase"
import type { BlogPost, Category, User } from "@/lib/supabase"

interface BlogState {
  // Data
  posts: BlogPost[]
  categories: Category[]
  featuredPosts: BlogPost[]
  currentUser: User | null

  // Loading states
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean

  // Actions
  fetchPosts: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchFeaturedPosts: () => Promise<void>
  createPost: (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => Promise<BlogPost>
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>
  deletePost: (id: string) => Promise<void>
  setCurrentUser: (user: User | null) => void

  // Cache management
  invalidateCache: () => void
  lastFetched: number | null
}

export const useBlogStore = create<BlogState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        posts: [],
        categories: [],
        featuredPosts: [],
        currentUser: null,
        isLoading: false,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
        lastFetched: null,

        // Fetch all posts with caching
        fetchPosts: async () => {
          const now = Date.now()
          const { lastFetched } = get()

          // Cache for 5 minutes
          if (lastFetched && now - lastFetched < 5 * 60 * 1000) {
            return
          }

          set({ isLoading: true })

          try {
            const { data, error } = await supabase
              .from("posts")
              .select(`
                *,
                author:profiles(name, email)
              `)
              .order("created_at", { ascending: false })

            if (error) throw error

            set({
              posts: data || [],
              lastFetched: now,
              isLoading: false,
            })
          } catch (error) {
            console.error("Error fetching posts:", error)
            set({ isLoading: false })
          }
        },

        // Fetch categories
        fetchCategories: async () => {
          try {
            const { data, error } = await supabase.from("categories").select("*").order("name")

            if (error) throw error

            set({ categories: data || [] })
          } catch (error) {
            console.error("Error fetching categories:", error)
          }
        },

        // Fetch featured posts
        fetchFeaturedPosts: async () => {
          try {
            const { data, error } = await supabase
              .from("posts")
              .select(`
                *,
                author:profiles(name, email)
              `)
              .eq("type", "featured")
              .eq("status", "published")
              .order("created_at", { ascending: false })
              .limit(3)

            if (error) throw error

            set({ featuredPosts: data || [] })
          } catch (error) {
            console.error("Error fetching featured posts:", error)
          }
        },

        // Create new post
        createPost: async (postData) => {
          set({ isCreating: true })

          try {
            const { data, error } = await supabase
              .from("posts")
              .insert([postData])
              .select(`
                *,
                author:profiles(name, email)
              `)
              .single()

            if (error) throw error

            // Update local state
            set((state) => ({
              posts: [data, ...state.posts],
              isCreating: false,
            }))

            return data
          } catch (error) {
            set({ isCreating: false })
            throw error
          }
        },

        // Update post
        updatePost: async (id, updates) => {
          set({ isUpdating: true })

          try {
            const { data, error } = await supabase
              .from("posts")
              .update(updates)
              .eq("id", id)
              .select(`
                *,
                author:profiles(name, email)
              `)
              .single()

            if (error) throw error

            // Update local state
            set((state) => ({
              posts: state.posts.map((post) => (post.id === id ? data : post)),
              isUpdating: false,
            }))

            return data
          } catch (error) {
            set({ isUpdating: false })
            throw error
          }
        },

        // Delete post
        deletePost: async (id) => {
          set({ isDeleting: true })

          try {
            const { error } = await supabase.from("posts").delete().eq("id", id)

            if (error) throw error

            // Update local state
            set((state) => ({
              posts: state.posts.filter((post) => post.id !== id),
              isDeleting: false,
            }))
          } catch (error) {
            set({ isDeleting: false })
            throw error
          }
        },

        // Set current user
        setCurrentUser: (user) => {
          set({ currentUser: user })
        },

        // Invalidate cache
        invalidateCache: () => {
          set({ lastFetched: null })
        },
      }),
      {
        name: "blog-store",
        partialize: (state) => ({
          posts: state.posts,
          categories: state.categories,
          featuredPosts: state.featuredPosts,
          lastFetched: state.lastFetched,
        }),
      },
    ),
    { name: "blog-store" },
  ),
)
