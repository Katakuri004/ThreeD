import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        const userPoints = await prisma.points.findUnique({
          where: { userId: user.id },
        })
        token.points = userPoints?.amount || 0
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.points = token.points as number
      }
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { points: true }
        })

        if (existingUser) {
          if (!existingUser.points) {
            await prisma.points.create({
              data: {
                userId: existingUser.id,
                amount: 10000,
              }
            })
          }
          return true
        }

        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
            points: {
              create: {
                amount: 10000,
              },
            },
          },
        })

        return true
      } catch (error) {
        console.error("Sign in error:", error)
        return false
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 