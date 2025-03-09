import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/auth/signin"
    }
  }
)

export const config = {
  matcher: [
    "/profile/:path*",
    "/requests/:path*",
    "/models/:path*",
    "/api/requests/:path*",
    "/api/models/:path*"
  ]
} 