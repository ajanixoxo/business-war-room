import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { join } from "path"
import { writeFile } from "fs/promises"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    if (coverImage && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `${Date.now()}-${coverImage.name}`
      const path = join(process.cwd(), "public/uploads", filename)

      await writeFile(path, buffer)
      coverImagePath = `/uploads/${filename}`
    }

    const updateData: any = {
      title,
      excerpt,
      content,
      category,
      type: type as "featured" | "normal",
      status: status as "published" | "draft",
      readTime,
    }

    if (coverImagePath) {
      updateData.coverImage = coverImagePath
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
