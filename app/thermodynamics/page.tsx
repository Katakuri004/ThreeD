"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconRobot, IconCube, IconTrophy } from "@tabler/icons-react"

// Mock data for top contributors
const topContributors = [
  { id: 1, name: "Rachel Green", contributions: 29, image: "https://api.dicebear.com/7.x/avatars/svg?seed=Rachel" },
  { id: 2, name: "Daniel Park", contributions: 23, image: "https://api.dicebear.com/7.x/avatars/svg?seed=Daniel" },
  { id: 3, name: "Sophie Chen", contributions: 19, image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sophie" },
  { id: 4, name: "Mark Taylor", contributions: 16, image: "https://api.dicebear.com/7.x/avatars/svg?seed=Mark" },
  { id: 5, name: "Anna Kim", contributions: 14, image: "https://api.dicebear.com/7.x/avatars/svg?seed=Anna" },
]

export default function ThermodynamicsPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">Thermodynamics</h1>
          
          <Tabs defaultValue="study" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="study" className="flex items-center gap-2">
                <IconRobot className="h-4 w-4" />
                Study Assistant
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center gap-2">
                <IconCube className="h-4 w-4" />
                Models
              </TabsTrigger>
            </TabsList>

            {/* Study Assistant Tab */}
            <TabsContent value="study">
              <Card className="p-8 text-center">
                <IconRobot className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-semibold mb-4">AI Study Assistant</h2>
                <p className="text-muted-foreground mb-6">
                  Coming soon! Our AI-powered study assistant will help you understand Thermodynamics concepts through interactive discussions and explanations.
                </p>
                <div className="text-sm text-muted-foreground">
                  Features will include:
                  <ul className="mt-2 space-y-1">
                    <li>• Interactive concept explanations</li>
                    <li>• Practice problems and solutions</li>
                    <li>• Visual learning aids</li>
                    <li>• Progress tracking</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>

            {/* Models Tab */}
            <TabsContent value="models">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                  <p className="text-muted-foreground">Models for Thermodynamics will be available here.</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-80 shrink-0">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <IconTrophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Top Contributors</h2>
            </div>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={contributor.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contributor.image} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] text-white font-bold">
                        1
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 