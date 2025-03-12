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
    title: "Chapter 1: Heat Engines",
    description: "Understanding various heat engine cycles and their operations",
    models: [
      {
        id: "thermo-1",
        title: "Four Stroke Engine",
        description: "Complete cycle of a four-stroke internal combustion engine",
        downloads: 920,
        views: 2500,
        category: "Engine Cycles",
      },
      {
        id: "thermo-2",
        title: "Steam Engine",
        description: "Working model of a steam engine with moving parts",
        downloads: 780,
        views: 2100,
        category: "Engine Cycles",
      },
    ],
  },
  {
    id: "chapter2",
    title: "Chapter 2: Thermodynamic Cycles",
    description: "Visualization of important thermodynamic cycles",
    models: [
      {
        id: "thermo-3",
        title: "Carnot Cycle",
        description: "Interactive demonstration of the ideal Carnot cycle",
        downloads: 850,
        views: 2300,
        category: "Power Cycles",
      },
      {
        id: "thermo-4",
        title: "Rankine Cycle",
        description: "Steam power plant cycle with all components",
        downloads: 750,
        views: 1900,
        category: "Power Cycles",
      },
    ],
  },
  {
    id: "chapter3",
    title: "Chapter 3: Heat Transfer",
    description: "Models demonstrating various heat transfer mechanisms",
    models: [
      {
        id: "thermo-5",
        title: "Heat Exchanger",
        description: "Shell and tube heat exchanger with flow visualization",
        downloads: 680,
        views: 1800,
        category: "Heat Transfer",
      },
      {
        id: "thermo-6",
        title: "Thermal Conduction",
        description: "Heat conduction through different materials",
        downloads: 620,
        views: 1600,
        category: "Heat Transfer",
      },
    ],
  },
]

export default function ThermodynamicsPage() {
  return (
    <div className="container py-20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Thermodynamics</h1>
          <p className="text-muted-foreground text-lg">
            Interactive 3D models for understanding thermal systems and processes
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
                    <Link key={model.id} href={`/thermodynamics/${model.id}`}>
                      <Card className="group overflow-hidden transition-colors hover:bg-accent">
                        <div className="aspect-video bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 relative">
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