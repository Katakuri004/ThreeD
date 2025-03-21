import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.error("[VERIFY_OTP] No session or email found")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { otp } = await req.json()
    console.log("[VERIFY_OTP] Received OTP:", otp)
    console.log("[VERIFY_OTP] User email:", session.user.email)

    if (!otp || typeof otp !== "string" || otp.length !== 6) {
      console.error("[VERIFY_OTP] Invalid OTP format:", otp)
      return new NextResponse("Invalid OTP format", { status: 400 })
    }

    // Find and validate OTP
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: session.user.email,
          token: otp,
        },
      },
    })

    console.log("[VERIFY_OTP] Found verification token:", verificationToken)

    if (!verificationToken) {
      console.error("[VERIFY_OTP] No valid verification token found")
      return new NextResponse("Invalid or expired OTP", { status: 400 })
    }

    if (new Date() > verificationToken.expires) {
      // Delete expired token
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: session.user.email,
            token: otp,
          },
        },
      })
      console.error("[VERIFY_OTP] Token expired")
      return new NextResponse("OTP has expired", { status: 400 })
    }

    // Mark user as verified
    await db.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        emailVerified: new Date(),
      },
    })
    console.log("[VERIFY_OTP] User marked as verified")

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: session.user.email,
          token: otp,
        },
      },
    })
    console.log("[VERIFY_OTP] Used OTP deleted")

    return new NextResponse("Verification successful", { status: 200 })
  } catch (error) {
    console.error("[VERIFY_OTP] Unexpected error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 