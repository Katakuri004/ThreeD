"use client"

import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { SessionProvider } from "next-auth/react"

const ErrorBoundary = dynamic(() => import("./error-boundary").then(mod => mod.ErrorBoundary), {
  ssr: false,
})

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-2">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

const SuspenseProvider = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <SuspenseProvider>
        <SessionProvider>{children}</SessionProvider>
      </SuspenseProvider>
    </ErrorBoundary>
  )
} 