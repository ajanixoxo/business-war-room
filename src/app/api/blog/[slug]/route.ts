import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
     const { slug } = await params;
    const { data: post, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(name, email)
      `)
      .eq("slug", slug)
      .eq("status", "published")
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
