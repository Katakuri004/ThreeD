import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

type SessionUser = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = session.user as SessionUser
    const data = await req.json()
    const { title, description, category, fileUrl } = data

    // Create new model
    const model = await prisma.model.create({
      data: {
        title,
        description,
        category,
        fileUrl,
        status: "DRAFT",
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(model)
  } catch (error) {
    console.error("Error creating model:", error)
    return NextResponse.json(
      { error: "Failed to create model" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sortBy") || "date"

    const models = await prisma.model.findMany({
      where: {
        category: category || undefined,
        status: "PUBLIC",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: sortBy === "likes" 
        ? { likes: "desc" }
        : { createdAt: "desc" },
    })

    return NextResponse.json(models)
  } catch (error) {
    console.error("Error fetching models:", error)
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    )
  }
} 