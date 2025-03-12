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
    title: "Chapter 1: Lathe Machines",
    description: "Understanding lathe operations and mechanisms",
    models: [
      {
        id: "mmt-1",
        title: "Lathe Headstock",
        description: "Detailed view of lathe machine headstock assembly",
        downloads: 850,
        views: 2200,
        category: "Lathe Components",
      },
      {
        id: "mmt-2",
        title: "Carriage Assembly",
        description: "Cross-slide and compound rest mechanisms",
        downloads: 720,
        views: 1900,
        category: "Lathe Components",
      },
    ],
  },
  {
    id: "chapter2",
    title: "Chapter 2: Milling Machines",
    description: "Exploring milling machine operations and components",
    models: [
      {
        id: "mmt-3",
        title: "Vertical Milling Head",
        description: "Detailed assembly of vertical milling head",
        downloads: 650,
        views: 1700,
        category: "Milling Components",
      },
      {
        id: "mmt-4",
        title: "Indexing Head",
        description: "Universal dividing head mechanism",
        downloads: 580,
        views: 1500,
        category: "Milling Components",
      },
    ],
  },
  {
    id: "chapter3",
    title: "Chapter 3: CNC Machines",
    description: "Modern CNC machine tools and their mechanisms",
    models: [
      {
        id: "mmt-5",
        title: "CNC Tool Changer",
        description: "Automatic tool changing mechanism for CNC machines",
        downloads: 750,
        views: 2000,
        category: "CNC Systems",
      },
      {
        id: "mmt-6",
        title: "Ball Screw Assembly",
        description: "Precision ball screw drive system",
        downloads: 620,
        views: 1600,
        category: "CNC Systems",
      },
    ],
  },
]

export default function MachineAndMachineToolsPage() {
  return (
    <div className="container py-20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Machine and Machine Tools</h1>
          <p className="text-muted-foreground text-lg">
            Interactive 3D models of machine tools and their mechanisms
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
                    <Link key={model.id} href={`/machine-and-machine-tools/${model.id}`}>
                      <Card className="group overflow-hidden transition-colors hover:bg-accent">
                        <div className="aspect-video bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 relative">
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