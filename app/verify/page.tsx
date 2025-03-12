"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconLoader2 } from "@tabler/icons-react"
import { toast } from "sonner"

export default function VerifyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <IconLoader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const handleSendOTP = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/verify/send-otp", {
        method: "POST",
      })

      const data = await response.text()

      if (!response.ok) {
        throw new Error(data || "Failed to send OTP")
      }

      setOtpSent(true)
      toast.success("Verification code sent to your email")
    } catch (error) {
      console.error("Send OTP error:", error)
      setError(error instanceof Error ? error.message : "Failed to send verification code")
      toast.error(error instanceof Error ? error.message : "Failed to send verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/verify/check-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      const data = await response.text()

      if (!response.ok) {
        throw new Error(data || "Invalid verification code")
      }

      toast.success("Account verified successfully!")
      router.push("/profile")
    } catch (error) {
      console.error("Verify OTP error:", error)
      setError(error instanceof Error ? error.message : "Invalid verification code")
      toast.error(error instanceof Error ? error.message : "Invalid verification code")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-lg py-10">
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Verify Your Account</h1>
          <p className="text-muted-foreground">
            Verify your account to unlock the ability to upload and share CAD models with the community.
          </p>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          {!otpSent ? (
            <Button
              className="w-full"
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              {isLoading ? (
                <IconLoader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Send Verification Code
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to your email
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <IconLoader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Verify Code
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleSendOTP}
                disabled={isLoading}
              >
                Resend Code
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 