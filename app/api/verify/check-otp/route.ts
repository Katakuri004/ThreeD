import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.error("[VERIFY_CHECK_OTP] No session or email found")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { otp } = await req.json()
    console.log("[VERIFY_CHECK_OTP] Received OTP:", otp)
    console.log("[VERIFY_CHECK_OTP] User email:", session.user.email)

    if (!otp || typeof otp !== "string" || otp.length !== 6) {
      console.error("[VERIFY_CHECK_OTP] Invalid OTP format:", otp)
      return new NextResponse("Invalid OTP format", { status: 400 })
    }

    // Find and validate OTP
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: session.user.email,
        token: otp,
        expires: {
          gt: new Date(),
        },
      },
    })

    console.log("[VERIFY_CHECK_OTP] Found verification token:", verificationToken)

    if (!verificationToken) {
      console.error("[VERIFY_CHECK_OTP] No valid verification token found")
      return new NextResponse("Invalid or expired OTP", { status: 400 })
    }

    // Mark user as verified
    try {
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          verified: true,
        },
      })
      console.log("[VERIFY_CHECK_OTP] User marked as verified")
    } catch (error) {
      console.error("[VERIFY_CHECK_OTP] Failed to update user:", error)
      return new NextResponse("Failed to update user verification status", { status: 500 })
    }

    // Delete used OTP
    try {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: session.user.email,
            token: otp,
          },
        },
      })
      console.log("[VERIFY_CHECK_OTP] Used OTP deleted")
    } catch (error) {
      console.error("[VERIFY_CHECK_OTP] Failed to delete used OTP:", error)
      // Continue even if deletion fails
    }

    return new NextResponse("Verification successful", { status: 200 })
  } catch (error) {
    console.error("[VERIFY_CHECK_OTP] Unexpected error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 