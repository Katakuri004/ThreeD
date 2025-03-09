import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log("Database connection successful")
    
    // Test query to verify schema
    const userCount = await prisma.user.count()
    console.log("User count:", userCount)
    
    return NextResponse.json({ 
      status: "success",
      message: "Database connected successfully",
      userCount 
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { 
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 