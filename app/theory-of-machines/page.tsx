"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Icon3dCubeSphere, IconDownload, IconEye } from "@tabler/icons-react"
import Link from "next/link"

// Mock data for chapters and models
const chapters = [
  {
    id: "chapter1",
    title: "Chapter 1: Introduction to Mechanisms",
    description: "Basic concepts and fundamentals of mechanical systems",
    models: [
      {
        id: "tom-1",
        title: "Four Bar Linkage",
        description: "Interactive demonstration of a four-bar linkage mechanism",
        thumbnail: "/models/tom/four-bar-linkage.png",
        downloads: 1250,
        views: 3500,
        category: "Linkage Mechanisms",
      },
      {
        id: "tom-2",
        title: "Slider Crank Mechanism",
        description: "Visualization of slider-crank mechanism motion",
        thumbnail: "/models/tom/slider-crank.png",
        downloads: 980,
        views: 2800,
        category: "Linkage Mechanisms",
      },
    ],
  },
  {
    id: "chapter2",
    title: "Chapter 2: Gears and Gear Trains",
    description: "Understanding gear systems and their applications",
    models: [
      {
        id: "tom-3",
        title: "Spur Gear Assembly",
        description: "Interactive spur gear system with multiple gears",
        thumbnail: "/models/tom/spur-gears.png",
        downloads: 850,
        views: 2200,
        category: "Gear Systems",
      },
      {
        id: "tom-4",
        title: "Planetary Gear System",
        description: "Complex planetary gear train demonstration",
        thumbnail: "/models/tom/planetary-gears.png",
        downloads: 720,
        views: 1800,
        category: "Gear Systems",
      },
    ],
  },
  {
    id: "chapter3",
    title: "Chapter 3: Cam and Follower",
    description: "Study of cam mechanisms and their applications",
    models: [
      {
        id: "tom-5",
        title: "Radial Cam with Flat Follower",
        description: "Demonstration of radial cam motion with flat follower",
        thumbnail: "/models/tom/radial-cam.png",
        downloads: 650,
        views: 1600,
        category: "Cam Mechanisms",
      },
      {
        id: "tom-6",
        title: "Oscillating Follower",
        description: "Visualization of oscillating follower motion",
        thumbnail: "/models/tom/oscillating-follower.png",
        downloads: 580,
        views: 1400,
        category: "Cam Mechanisms",
      },
    ],
  },
]

export default function TheoryOfMachinesPage() {
  return (
    <div className="container py-20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Theory of Machines</h1>
          <p className="text-muted-foreground text-lg">
            Interactive 3D models for understanding mechanical systems and mechanisms
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {chapters.map((chapter) => (
            <AccordionItem 
              key={chapter.id} 
              value={chapter.id}
              className="bg-card/50 backdrop-blur-sm border-border/50"
            >
              <AccordionTrigger className="text-lg px-6">
                {chapter.title}
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground mb-6">{chapter.description}</p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {chapter.models.map((model) => (
                    <Link key={model.id} href={`/theory-of-machines/${model.id}`}>
                      <Card className="group overflow-hidden transition-colors hover:bg-accent">
                        <div className="aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 relative">
                          {model.thumbnail ? (
                            <img
                              src={model.thumbnail}
                              alt={model.title}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Icon3dCubeSphere className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                          )}
                          <Badge 
                            variant="secondary" 
                            className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm"
                          >
                            {model.category}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium truncate group-hover:text-accent-foreground">
                            {model.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {model.description}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <IconEye className="h-4 w-4" />
                              {model.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <IconDownload className="h-4 w-4" />
                              {model.downloads}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
} 