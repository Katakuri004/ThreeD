"use client"

import Link from "next/link"

export default function SignUpPrompt() {
  return (
    <div className="rounded-lg bg-purple-500 p-8 text-white">
      <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
      <p className="mt-2 text-purple-100">
        Join thousands of satisfied customers today.
      </p>
      <Link
        href="/auth/signin"
        className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Sign Up Now →
      </Link>
    </div>
  )
} 