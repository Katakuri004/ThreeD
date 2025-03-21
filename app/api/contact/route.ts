import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to send a message" },
        { status: 401 }
      )
    }

    const { message } = await request.json()

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: session.user.email,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: session.user.email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${session.user.name || session.user.email}`,
      text: `From: ${session.user.name || session.user.email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>From:</strong> ${session.user.name || session.user.email}</p>
        <p><strong>Email:</strong> ${session.user.email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send email:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
} 