"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "EmailNotVerified":
        return "Your email is not verified. Please verify your email before signing in."
      case "DatabaseError":
        return "There was an error connecting to the database. Please try again later."
      case "AccessDenied":
        return "Account associated with this email already exists."
      default:
        return "An error occurred during authentication. Please try again."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Authentication Error</h1>
        <p className="text-center text-muted-foreground">
          {getErrorMessage(error)}
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/auth/signin">
              Try Again
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
} 