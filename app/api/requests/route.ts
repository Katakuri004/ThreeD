import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "@/lib/prisma"
import { Prisma, PrismaClient } from "@prisma/client"

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
    const { title, description, specifications, pointsPrize, tag, expiryDate } = data

    // Validate points
    const userPoints = await prisma.user.findUnique({
      where: { id: user.id },
      select: { points: true }
    })

    if (!userPoints || userPoints.points < pointsPrize) {
      return NextResponse.json(
        { error: "Insufficient points" },
        { status: 400 }
      )
    }

    // Create request and deduct points
    const request = await prisma.$transaction(async (tx) => {
      // Deduct points from requester
      await tx.user.update({
        where: { id: user.id },
        data: { points: { decrement: pointsPrize } }
      })

      // Create request
      return tx.model.create({
        data: {
          title,
          description,
          specifications,
          pointsPrize,
          tag,
          expiryDate: new Date(expiryDate),
          requesterId: user.id,
          status: "open",
        },
      })
    })

    return NextResponse.json(request)
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const tag = searchParams.get("tag")
    const sortBy = searchParams.get("sortBy") || "date"

    const requests = await prisma.model.findMany({
      where: {
        tag: tag || undefined,
        status: "open",
        expiryDate: { gt: new Date() },
      },
      include: {
        requester: {
          select: {
            name: true,
            email: true,
            points: true,
          },
        },
      },
      orderBy: sortBy === "points" 
        ? { pointsPrize: "desc" }
        : { createdAt: "desc" },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    )
  }
} 