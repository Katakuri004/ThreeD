import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { db } from "@/lib/db";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              hashedPassword: true,
              image: true,
            },
          });

          if (!user || !user.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          const isValid = await compare(credentials.password, user.hashedPassword);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("[AUTH_ERROR]", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string | null;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Initial sign in
        return {
          ...token,
          id: user.id,
        };
      }

      // On subsequent calls, try to find the user
      try {
        const dbUser = await db.user.findUnique({
          where: {
            email: token.email!,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        });

        if (!dbUser) {
          return token;
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      } catch (error) {
        console.error("[JWT_ERROR]", error);
        return token;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 