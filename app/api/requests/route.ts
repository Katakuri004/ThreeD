import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"

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
    const userPoints = await prisma.points.findUnique({
      where: { userId: user.id },
    })

    if (!userPoints || userPoints.amount < pointsPrize) {
      return NextResponse.json(
        { error: "Insufficient points" },
        { status: 400 }
      )
    }

    // Create request and deduct points
    const request = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => {
      // Deduct points from requester
      await tx.points.update({
        where: { userId: user.id },
        data: { amount: { decrement: pointsPrize } },
      })

      // Create request
      return tx.request.create({
        data: {
          title,
          description,
          specifications,
          pointsPrize,
          tag,
          expiryDate: new Date(expiryDate),
          requesterId: user.id,
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

    const requests = await prisma.request.findMany({
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