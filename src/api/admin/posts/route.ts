import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
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

    if (coverImage) {
      const bytes = await coverImage.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `${Date.now()}-${coverImage.name}`
      const path = join(process.cwd(), "public/uploads", filename)

      await writeFile(path, buffer)
      coverImagePath = `/uploads/${filename}`
    }

    const post = await prisma.post.create({
      data: {
        title,
        excerpt,
        content,
        category,
        type: type as "featured" | "normal",
        status: status as "published" | "draft",
        readTime,
        coverImage: coverImagePath,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
