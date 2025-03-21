import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "@/lib/prisma"

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
    const { requestId } = data

    // Validate request exists and is in progress
    const request = await prisma.model.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
    })

    if (!request) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      )
    }

    if (request.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Request is not in progress" },
        { status: 400 }
      )
    }

    // Update request status
    const updatedRequest = await prisma.model.update({
      where: { id: requestId },
      data: {
        status: "COMPLETED",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        }
      },
    })

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error("Error completing request:", error)
    return NextResponse.json(
      { error: "Failed to complete request" },
      { status: 500 }
    )
  }
} 