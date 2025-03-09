import { NextResponse } from "next/server"
import { headers } from "next/headers"

export const dynamic = 'force-dynamic'

export async function GET() {
  const headersList = headers()
  
  return NextResponse.json({
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    },
    headers: {
      host: headersList.get("host"),
      userAgent: headersList.get("user-agent"),
    },
  })
} 