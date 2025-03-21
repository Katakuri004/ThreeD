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

    // Validate request exists and is open
    const request = await prisma.model.findUnique({
      where: { id: requestId },
      include: {
        creator: {
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

    if (request.status !== "open") {
      return NextResponse.json(
        { error: "Request is not open" },
        { status: 400 }
      )
    }

    if (request.creator.id === user.id) {
      return NextResponse.json(
        { error: "Cannot accept your own request" },
        { status: 400 }
      )
    }

    if (new Date(request.expiryDate) < new Date()) {
      return NextResponse.json(
        { error: "Request has expired" },
        { status: 400 }
      )
    }

    // Update request status and set accepter
    const updatedRequest = await prisma.model.update({
      where: { id: requestId },
      data: {
        status: "in_progress",
        accepterId: user.id,
        acceptedAt: new Date(),
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
        accepter: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error("Error accepting request:", error)
    return NextResponse.json(
      { error: "Failed to accept request" },
      { status: 500 }
    )
  }
} 