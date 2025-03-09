"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconCoin } from "@tabler/icons-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/profile")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
            <p className="text-muted-foreground">{session.user.email}</p>
            <div className="flex items-center gap-1 mt-2">
              <IconCoin className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{session.user.points || 0} points</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Completed Bounties</h2>
            <p className="text-2xl font-bold">0</p>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Models Uploaded</h2>
            <p className="text-2xl font-bold">0</p>
          </Card>
        </div>
      </Card>
    </div>
  )
} 