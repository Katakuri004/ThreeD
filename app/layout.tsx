"use client"

import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-grid min-h-screen`}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
