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
    title: "Chapter 1: Basic Modeling",
    description: "Introduction to solid modeling concepts and techniques",
    models: [
      {
        id: "solid-1",
        title: "Primitive Shapes",
        description: "Basic geometric shapes and their combinations",
        downloads: 950,
        views: 2600,
        category: "Basics",
      },
      {
        id: "solid-2",
        title: "Boolean Operations",
        description: "Union, intersection, and difference operations",
        downloads: 820,
        views: 2200,
        category: "Basics",
      },
    ],
  },
  {
    id: "chapter2",
    title: "Chapter 2: Advanced Features",
    description: "Complex modeling features and techniques",
    models: [
      {
        id: "solid-3",
        title: "Sweep Operations",
        description: "Linear and rotational sweep demonstrations",
        downloads: 780,
        views: 2100,
        category: "Advanced",
      },
      {
        id: "solid-4",
        title: "Loft and Blend",
        description: "Complex surface transitions and blending",
        downloads: 680,
        views: 1800,
        category: "Advanced",
      },
    ],
  },
  {
    id: "chapter3",
    title: "Chapter 3: Assembly Modeling",
    description: "Creating and managing complex assemblies",
    models: [
      {
        id: "solid-5",
        title: "Mechanical Assembly",
        description: "Multi-part assembly with constraints",
        downloads: 720,
        views: 1900,
        category: "Assembly",
      },
      {
        id: "solid-6",
        title: "Exploded View",
        description: "Interactive exploded view of assemblies",
        downloads: 650,
        views: 1700,
        category: "Assembly",
      },
    ],
  },
]

export default function SolidModellingPage() {
  return (
    <div className="container py-20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Solid Modelling</h1>
          <p className="text-muted-foreground text-lg">
            Interactive 3D models for learning CAD and solid modeling techniques
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
                    <Link key={model.id} href={`/solid-modelling/${model.id}`}>
                      <Card className="group overflow-hidden transition-colors hover:bg-accent">
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon3dCubeSphere className="h-12 w-12 text-muted-foreground/50" />
                          </div>
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