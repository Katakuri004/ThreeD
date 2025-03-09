import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "@/components/providers"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="relative min-h-screen bg-background bg-grid">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </Providers>
  )
} 