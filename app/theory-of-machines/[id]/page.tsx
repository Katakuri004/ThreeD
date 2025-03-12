"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconDownload, IconEye, IconInfoCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Mock data for the model
const model = {
  id: "tom-1",
  title: "Four Bar Linkage",
  description: "Interactive demonstration of a four-bar linkage mechanism",
  thumbnail: "/models/tom/four-bar-linkage.png",
  fileUrl: "/models/tom/four-bar-linkage.glb",
  downloads: 1250,
  views: 3500,
  category: "Linkage Mechanisms",
  chapter: "Chapter 1: Introduction to Mechanisms",
  explanation: `
    The four-bar linkage is one of the most fundamental mechanisms in mechanical engineering. It consists of four rigid links connected in a loop by four revolute joints.

    Key Components:
    1. Ground Link (Fixed Link): The stationary link that serves as the reference frame
    2. Input Link (Crank): The link that receives the input motion
    3. Output Link (Follower): The link that produces the desired output motion
    4. Coupler Link: The link connecting the input and output links

    Working Principle:
    - When the input link (crank) rotates, it causes the coupler link to move in a complex motion
    - The output link (follower) follows this motion, creating the desired output movement
    - The motion of the coupler point can be used for various applications

    Applications:
    - Door hinges
    - Windshield wipers
    - Bicycle pedals
    - Mechanical toys
    - Industrial machinery

    Grashof's Law:
    The four-bar linkage can be classified based on Grashof's law, which states that for a four-bar linkage:
    s + l ≤ p + q
    where:
    s = length of shortest link
    l = length of longest link
    p, q = lengths of other two links

    Types of Four-Bar Linkages:
    1. Crank-Rocker: One link can rotate 360° while the other oscillates
    2. Double-Rocker: Both links oscillate
    3. Double-Crank: Both links can rotate 360°
    4. Change-Point: Special case where the mechanism can change its type
  `,
  keyPoints: [
    "Fundamental mechanism in mechanical engineering",
    "Consists of four rigid links and four revolute joints",
    "Can be classified using Grashof's law",
    "Used in various everyday applications",
    "Provides complex motion from simple input",
  ],
  formulas: [
    {
      name: "Grashof's Law",
      formula: "s + l ≤ p + q",
      description: "Where s is shortest link, l is longest link, and p, q are other links",
    },
    {
      name: "Transmission Angle",
      formula: "μ = cos⁻¹((a² + b² - c² - d²)/(2ab))",
      description: "Optimal transmission angle is between 45° and 135°",
    },
  ],
}

export default function TheoryOfMachinesModelPage() {
  const [activeTab, setActiveTab] = useState("viewer")

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{model.title}</h1>
                <p className="text-muted-foreground">{model.chapter}</p>
              </div>
              <Badge variant="secondary">{model.category}</Badge>
            </div>
            <Separator />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <IconEye className="h-4 w-4" />
                {model.views} views
              </div>
              <div className="flex items-center gap-1">
                <IconDownload className="h-4 w-4" />
                {model.downloads} downloads
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="viewer">3D Viewer</TabsTrigger>
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
            </TabsList>

            <TabsContent value="viewer" className="mt-4">
              <Card className="aspect-video bg-muted">
                {/* 3D Viewer will be implemented here */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">3D Viewer Coming Soon</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="explanation" className="mt-4 space-y-6">
              <div className="prose prose-sm max-w-none">
                <h2>Detailed Explanation</h2>
                <p>{model.explanation}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Points</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {model.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Important Formulas</h3>
                <div className="grid gap-4">
                  {model.formulas.map((formula, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium">{formula.name}</h4>
                      <p className="text-lg font-mono my-2">{formula.formula}</p>
                      <p className="text-sm text-muted-foreground">{formula.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IconInfoCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">About This Model</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
            <Button className="w-full">
              <IconDownload className="h-4 w-4 mr-2" />
              Download Model
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Related Models</h2>
            <div className="space-y-4">
              {/* Related models will be listed here */}
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 