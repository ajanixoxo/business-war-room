import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json({ error: "No authorization header" }, { status: 401 })
    }

    // Create server client with the auth token
    const serverSupabase = createServerClient()

    // Set the auth header
    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
      error: authError,
    } = await serverSupabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user has admin role
    const { data: profile, error: profileError } = await serverSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 })
    }

    const { data: posts, error } = await serverSupabase
      .from("posts")
      .select(`
        *,
        author:profiles(name, email)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json({ error: "No authorization header" }, { status: 401 })
    }

    // Create server client
    const serverSupabase = createServerClient()

    // Get user from token
    const token = authHeader.replace("Bearer ", "")
    const {
      data: { user },
      error: authError,
    } = await serverSupabase.auth.getUser(token)

    if (authError || !user) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user has admin role
    const { data: profile, error: profileError } = await serverSupabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || profile?.role !== "admin") {
      console.error("Profile error:", profileError)
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const type = formData.get("type") as string
    const status = formData.get("status") as string
    const readTime = formData.get("readTime") as string
    const coverImage = formData.get("coverImage") as File

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let coverImagePath = null

    if (coverImage && coverImage.size > 0) {
      const fileExt = coverImage.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      const { error: uploadError } = await serverSupabase.storage.from("blog-assets").upload(filePath, coverImage)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }

      const { data } = serverSupabase.storage.from("blog-assets").getPublicUrl(filePath)
      coverImagePath = data.publicUrl
    }

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    }

    const { data: post, error } = await serverSupabase
      .from("posts")
      .insert({
        title,
        excerpt,
        content,
        category,
        type: type as "featured" | "normal",
        status: status as "published" | "draft",
        read_time: readTime,
        cover_image: coverImagePath,
        slug: generateSlug(title),
        author_id: user.id,
      })
      .select(`
        *,
        author:profiles(name, email)
      `)
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
