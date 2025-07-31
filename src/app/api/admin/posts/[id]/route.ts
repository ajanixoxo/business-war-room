import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

interface RouteParams {
  params: Promise<{ id: string }>
}

interface UpdatePostData {
  title: string
  excerpt: string
  content: string
  category: string
  type: "featured" | "normal"
  status: "published" | "draft"
  read_time: string
  slug: string
  cover_image?: string
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Get the authorization header
      const { id } = await params;
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

    // Fetch the specific post
    const { data: post, error } = await serverSupabase
      .from("posts")
      .select(`
        *,
        author:profiles(name, email)
      `)
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Get the authorization header
      const { id } = await params;
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

    const { error } = await serverSupabase.from("posts").delete().eq("id", id) // Ensure user can only delete their own posts

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
      const { id } = await params;
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

    const formData = await request.formData()
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const type = formData.get("type") as string
    const status = formData.get("status") as string
    const readTime = formData.get("readTime") as string
    const coverImage = formData.get("coverImage") as File | null

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let coverImagePath: string | undefined

    if (coverImage && coverImage.size > 0) {
      const fileExt = coverImage.name.split(".").pop()
      if (!fileExt) {
        return NextResponse.json({ error: "Invalid file extension" }, { status: 400 })
      }

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

    const generateSlug = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    }

    const updateData: UpdatePostData = {
      title,
      excerpt,
      content,
      category,
      type: type as "featured" | "normal",
      status: status as "published" | "draft",
      read_time: readTime,
      slug: generateSlug(title),
    }

    if (coverImagePath) {
      updateData.cover_image = coverImagePath
    }

    const { data: post, error } = await serverSupabase
      .from("posts")
      .update(updateData)
      .eq("id",id)
      .eq("author_id", user.id) // Ensure user can only update their own posts
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
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
