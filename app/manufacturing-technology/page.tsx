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
    title: "Chapter 1: Metal Casting",
    description: "Understanding metal casting processes and equipment",
    models: [
      {
        id: "mfg-1",
        title: "Sand Casting Process",
        description: "Complete demonstration of sand casting steps",
        downloads: 880,
        views: 2400,
        category: "Casting",
      },
      {
        id: "mfg-2",
        title: "Die Casting Machine",
        description: "High-pressure die casting machine operation",
        downloads: 760,
        views: 2000,
        category: "Casting",
      },
    ],
  },
  {
    id: "chapter2",
    title: "Chapter 2: Metal Forming",
    description: "Various metal forming processes and equipment",
    models: [
      {
        id: "mfg-3",
        title: "Rolling Mill",
        description: "Hot and cold rolling process simulation",
        downloads: 820,
        views: 2200,
        category: "Forming",
      },
      {
        id: "mfg-4",
        title: "Forging Press",
        description: "Mechanical forging press operation",
        downloads: 750,
        views: 1900,
        category: "Forming",
      },
    ],
  },
  {
    id: "chapter3",
    title: "Chapter 3: Welding Technology",
    description: "Modern welding processes and equipment",
    models: [
      {
        id: "mfg-5",
        title: "Arc Welding",
        description: "Electric arc welding process demonstration",
        downloads: 900,
        views: 2500,
        category: "Welding",
      },
      {
        id: "mfg-6",
        title: "Spot Welding",
        description: "Resistance spot welding mechanism",
        downloads: 700,
        views: 1800,
        category: "Welding",
      },
    ],
  },
]

export default function ManufacturingTechnologyPage() {
  return (
    <div className="container py-20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Manufacturing Technology</h1>
          <p className="text-muted-foreground text-lg">
            Interactive 3D models of manufacturing processes and equipment
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
                    <Link key={model.id} href={`/manufacturing-technology/${model.id}`}>
                      <Card className="group overflow-hidden transition-colors hover:bg-accent">
                        <div className="aspect-video bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-emerald-500/20 relative">
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