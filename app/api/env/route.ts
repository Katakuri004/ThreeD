import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    databaseUrlHost: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).host : null,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  })
} 