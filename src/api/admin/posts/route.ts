/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: posts, error } = await supabase
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    let coverImagePath = null

    if (coverImage && coverImage.size > 0) {
      const fileExt = coverImage.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      const { error: uploadError } = await supabase.storage.from("blog-assets").upload(filePath, coverImage)

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 })
      }

      const { data } = supabase.storage.from("blog-assets").getPublicUrl(filePath)
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

    const { data: post, error } = await supabase
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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
