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
    const { requestId, modelId } = data

    // Validate request exists and is in progress
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: { requester: true },
    })

    if (!request) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      )
    }

    if (request.status !== "in_progress") {
      return NextResponse.json(
        { error: "Request is not in progress" },
        { status: 400 }
      )
    }

    if (request.accepterId !== user.id) {
      return NextResponse.json(
        { error: "Only the accepter can complete the request" },
        { status: 403 }
      )
    }

    // Complete request and transfer points in a transaction
    const result = await prisma.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => {
      // Update request status
      const updatedRequest = await tx.request.update({
        where: { id: requestId },
        data: {
          status: "completed",
          completedAt: new Date(),
          modelId,
        },
      })

      // Transfer points to accepter
      await tx.points.update({
        where: { userId: user.id },
        data: { amount: { increment: request.pointsPrize } },
      })

      return updatedRequest
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error completing request:", error)
    return NextResponse.json(
      { error: "Failed to complete request" },
      { status: 500 }
    )
  }
} 