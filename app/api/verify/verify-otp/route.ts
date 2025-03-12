import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { email, otp } = body

    if (email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Find valid OTP
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
        expires: {
          gt: new Date(),
        },
      },
    })

    if (!verificationToken) {
      return new NextResponse("Invalid or expired OTP", { status: 400 })
    }

    // Update user verification status
    await db.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    })

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    })

    return new NextResponse("Account verified successfully", { status: 200 })
  } catch (error) {
    console.error("[VERIFICATION_VERIFY_OTP]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 