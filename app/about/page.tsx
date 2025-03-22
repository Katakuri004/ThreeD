"use client"

import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, useGLTF } from "@react-three/drei"
import { motion } from "framer-motion"
import { 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconMail, 
  IconSchool,
  IconTarget,
  IconBook,
  IconUsers,
  IconSparkles,
  IconLogin
} from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react"

// Mock 3D model for the about page
function AboutModel() {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial 
        color="#4f46e5"
        metalness={0.7}
        roughness={0.2}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

const features = [
  {
    title: "Interactive 3D Models",
    description: "Explore engineering concepts through interactive 3D models that you can rotate, zoom, and examine from every angle.",
    icon: <IconTarget className="h-8 w-8 text-indigo-500" />
  },
  {
    title: "Educational Content",
    description: "Access comprehensive educational content covering various engineering subjects, from Theory of Machines to Thermodynamics.",
    icon: <IconBook className="h-8 w-8 text-indigo-500" />
  },
  {
    title: "Community Driven",
    description: "Join a community of engineering students and professionals sharing knowledge and resources.",
    icon: <IconUsers className="h-8 w-8 text-indigo-500" />
  },
  {
    title: "Easy to Use",
    description: "Simple and intuitive interface designed to make learning engineering concepts more accessible.",
    icon: <IconSparkles className="h-8 w-8 text-indigo-500" />
  }
]

const team = [
  {
    name: "Arpit Kumar",
    role: "Lead Developer",
    bio: "I like Tech, Music and Cheesecake",
    image: "/img/headshot pic.jpg"
  },
  {
    name: "Jane Smith",
    role: "Content Director",
    bio: "Experienced engineering educator with a focus on interactive learning.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  {
    name: "Arya ",
    role: "3D Model Specialist",
    bio: "Expert in creating detailed 3D models for engineering education.",
    image: "/img/arya-hs.jpg"
  }
]

export default function AboutPage() {
  const { data: session } = useSession()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }
      
      setSubmitStatus("success")
      setMessage("")
    } catch (error) {
      setSubmitStatus("error")
      console.error("Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6">About ThreeD</h1>
              <p className="text-xl text-gray-300 mb-8">
                ThreeD is a platform dedicated to revolutionizing engineering education through interactive 3D models and immersive learning experiences.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/explore">Explore Models</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[400px]"
            >
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <Stage environment="city" intensity={0.6}>
                  <AboutModel />
                </Stage>
                <OrbitControls
                  makeDefault
                  minDistance={3}
                  maxDistance={10}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ThreeD?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-center">{member.name}</CardTitle>
                    <CardDescription className="text-center">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-400">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
            <p className="text-gray-300 text-center mb-8">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            
            <Card className="bg-background/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                {session ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Share your thoughts or questions with us..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <Button variant="outline" size="icon" asChild>
                          <Link href="https://github.com" target="_blank">
                            <IconBrandGithub className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href="https://linkedin.com" target="_blank">
                            <IconBrandLinkedin className="h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !message.trim()}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>

                    {submitStatus === "success" && (
                      <p className="text-green-500 text-sm">Message sent successfully!</p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-gray-400">
                      Please sign in to send us a message.
                    </p>
                    <Button asChild>
                      <Link href="/auth/signin">
                        <IconLogin className="h-5 w-5 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
