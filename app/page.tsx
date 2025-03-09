"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid"
import { 
  Icon3dCubeSphere, 
  IconHeadset, 
  IconAugmentedReality,
  IconRuler, 
  IconRocket,
  IconBrain,
  IconChartBar,
  IconUsers,
  IconDevices,
  IconSettings,
  IconRefresh
} from "@tabler/icons-react"
import { Hero } from "@/components/Hero"
import { motion } from "framer-motion";

const features = [
  {
    title: "Built for developers",
    description: "Our 3D platform is crafted for engineers, developers, and creative minds who push the boundaries of digital creation.",
    icon: <IconRocket className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Ease of use",
    description: "Intuitive interface combined with powerful features makes 3D modeling accessible to everyone.",
    icon: <IconBrain className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Real-time collaboration",
    description: "Work together seamlessly with your team in real-time, sharing models and getting instant feedback.",
    icon: <IconUsers className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "High performance",
    description: "Optimized rendering and modeling capabilities ensure smooth performance even with complex 3D models.",
    icon: <IconChartBar className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Cross-platform support",
    description: "Access your 3D projects from any device, anywhere, with full cross-platform compatibility.",
    icon: <IconDevices className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to help you with any questions.",
    icon: <IconHeadset className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Regular updates",
    description: "Stay ahead with continuous updates bringing new features and improvements.",
    icon: <IconRefresh className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Custom workflows",
    description: "Create and customize your workflows to match your specific needs and preferences.",
    icon: <IconSettings className="h-6 w-6 text-neutral-500" />,
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Bento Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
            Explore Our Features
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Discover the power of 3D visualization and modeling
          </p>
        </div>
        <BentoGrid>
          <BentoGridItem
            title="3D Modeling Excellence"
            description="Create stunning 3D models with our advanced modeling tools and intuitive interface."
            header={
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all hover:after:border-2 hover:after:border-violet-500 hover:after:bg-gradient-to-b hover:after:from-violet-500/20 hover:after:to-purple-500/20">
                <Icon3dCubeSphere className="relative z-10 h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            }
            className="md:col-span-2"
            icon={<IconRocket className="h-4 w-4 text-neutral-500" />}
          />
          <BentoGridItem
            title="VR Integration"
            description="Experience your 3D creations in virtual reality with seamless VR integration."
            header={
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all hover:after:border-2 hover:after:border-purple-500 hover:after:bg-gradient-to-b hover:after:from-purple-500/20 hover:after:to-fuchsia-500/20">
                <IconHeadset className="relative z-10 h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            }
            icon={<IconBrain className="h-4 w-4 text-neutral-500" />}
          />
          <BentoGridItem
            title="AR Visualization"
            description="Bring your 3D models into the real world with augmented reality capabilities."
            header={
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all hover:after:border-2 hover:after:border-fuchsia-500 hover:after:bg-gradient-to-b hover:after:from-fuchsia-500/20 hover:after:to-pink-500/20">
                <IconAugmentedReality className="relative z-10 h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            }
            icon={<IconChartBar className="h-4 w-4 text-neutral-500" />}
          />
          <BentoGridItem
            title="Real-time Collaboration"
            description="Work together with your team in real-time, share models, and get instant feedback."
            header={
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all hover:after:border-2 hover:after:border-pink-500 hover:after:bg-gradient-to-b hover:after:from-pink-500/20 hover:after:to-rose-500/20">
                <IconUsers className="relative z-10 h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            }
            icon={<IconUsers className="h-4 w-4 text-neutral-500" />}
          />
          <BentoGridItem
            title="Precision Tools"
            description="Access professional-grade tools for precise measurements and adjustments."
            header={
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-500 after:absolute after:inset-0 after:rounded-lg after:border after:border-transparent after:transition-all hover:after:border-2 hover:after:border-rose-500 hover:after:bg-gradient-to-b hover:after:from-rose-500/20 hover:after:to-red-500/20">
                <IconRuler className="relative z-10 h-16 w-16 text-white" strokeWidth={1.5} />
              </div>
            }
            icon={<IconRuler className="h-4 w-4 text-neutral-500" />}
          />
        </BentoGrid>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
            Powerful Features
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Everything you need to create amazing 3D experiences
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative group/feature p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative z-10 group-hover/feature:text-white transition-colors">
                <div className="p-2 w-fit rounded-lg bg-neutral-100 dark:bg-neutral-900 mb-4 group-hover/feature:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-800 dark:text-neutral-200 group-hover/feature:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 group-hover/feature:text-white/80">
                  {feature.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 opacity-0 group-hover/feature:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-violet-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-white/80">Join thousands of satisfied customers today.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="secondary" size="lg" className="hover:bg-white hover:text-violet-500">
              <a href="/signup">Sign Up Now →</a>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}