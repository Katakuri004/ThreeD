"use client"

import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Button } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { LoadingViewer } from "@/components/ui/loading-viewer"
import { Skeleton } from "@/components/ui/skeleton"

export default function SandboxLoading() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10">
        {/* Header */}
        <div className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/models">
              <Button variant="ghost" className="gap-2">
                <IconArrowLeft className="h-5 w-5" />
                Back to Models
              </Button>
            </Link>
          </div>
        </div>

        {/* Loading Viewer */}
        <div className="h-screen w-full">
          <LoadingViewer className="h-full" />
        </div>

        {/* Loading Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
} 