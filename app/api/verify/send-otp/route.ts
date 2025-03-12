import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { generateOTP, sendVerificationEmail } from "@/lib/verification"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      console.error("[VERIFY_SEND_OTP] No session or email found")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log("[VERIFY_SEND_OTP] Generating OTP for:", session.user.email)

    // Generate OTP
    const otp = generateOTP()

    // Store OTP in database
    try {
      await prisma.verificationToken.create({
        data: {
          identifier: session.user.email,
          token: otp,
          expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        },
      })
      console.log("[VERIFY_SEND_OTP] OTP stored in database")
    } catch (error) {
      console.error("[VERIFY_SEND_OTP] Failed to store OTP:", error)
      return new NextResponse("Failed to store verification token", { status: 500 })
    }

    // Send verification email
    try {
      await sendVerificationEmail(session.user.email, otp)
      console.log("[VERIFY_SEND_OTP] Email sent successfully")
    } catch (error) {
      console.error("[VERIFY_SEND_OTP] Failed to send email:", error)
      // Clean up the stored OTP if email sending fails
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: session.user.email,
            token: otp,
          },
        },
      })
      return new NextResponse("Failed to send verification email", { status: 500 })
    }

    return new NextResponse("OTP sent successfully", { status: 200 })
  } catch (error) {
    console.error("[VERIFY_SEND_OTP] Unexpected error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 