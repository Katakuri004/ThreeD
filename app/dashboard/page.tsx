"use client"

import { Card } from "@/components/ui/card"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Badge } from "@/components/ui/badge"
import { type Model, type ModelTag, TAG_LABELS } from "@/types/model"
import { IconHeart, IconDownload, IconBookmark, IconMessageCircle, IconX } from "@tabler/icons-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

const tagVariants: Record<ModelTag, "default" | "secondary" | "destructive" | "outline"> = {
  misc: "default",
  tom: "secondary",
  ht: "destructive",
  th: "outline",
  civ: "default",
  fld: "secondary",
  sld: "destructive"
}

const mockModels: Model[] = [
  {
    id: "1",
    title: "Theory of Machines Model",
    author: "John Doe",
    description: "A comprehensive model demonstrating various machine mechanisms",
    gradient: "from-blue-500 to-purple-500",
    likes: 150,
    downloads: 75,
    tag: "tom",
    category: "tom",
    fileUrl: "/models/tom-model.glb",
    thumbnail: "/thumbnails/tom-model.png",
    status: "PUBLIC",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    userId: "user123",
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "Heat Transfer Analysis",
    author: "Jane Smith",
    description: "Interactive model showing heat transfer principles",
    gradient: "from-red-500 to-orange-500",
    likes: 120,
    downloads: 60,
    tag: "ht",
    category: "ht",
    fileUrl: "/models/ht-model.glb",
    thumbnail: "/thumbnails/ht-model.png",
    status: "PUBLIC",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    userId: "user123",
    date: "2024-01-14"
  },
  {
    id: "3",
    title: "Civil Engineering Structure",
    author: "Mike Johnson",
    description: "Detailed model of a bridge structure",
    gradient: "from-green-500 to-teal-500",
    likes: 200,
    downloads: 100,
    tag: "civ",
    category: "civ",
    fileUrl: "/models/civ-model.glb",
    thumbnail: "/thumbnails/civ-model.png",
    status: "PUBLIC",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    userId: "user123",
    date: "2024-01-13"
  },
  {
    id: "4",
    title: "Thermal System Design",
    author: "Sarah Wilson",
    description: "Model showcasing thermal system components",
    gradient: "from-yellow-500 to-red-500",
    likes: 90,
    downloads: 45,
    tag: "th",
    category: "th",
    fileUrl: "/models/th-model.glb",
    thumbnail: "/thumbnails/th-model.png",
    status: "PUBLIC",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    userId: "user123",
    date: "2024-01-12"
  }
]

const tagStats = {
  tom: { count: 45, downloads: 1250, likes: 890 },
  ht: { count: 32, downloads: 980, likes: 670 },
  th: { count: 28, downloads: 850, likes: 520 },
  civ: { count: 38, downloads: 1100, likes: 780 },
  fld: { count: 25, downloads: 720, likes: 430 },
  sld: { count: 42, downloads: 1400, likes: 950 },
  misc: { count: 15, downloads: 380, likes: 210 }
}

const totalStats = {
  totalModels: 225,
  totalDownloads: 6680,
  totalLikes: 4450,
  totalSaves: 2890
}

export default function DashboardPage() {
  const [modelToRemove, setModelToRemove] = useState<string | null>(null)
  const sortedTags = Object.entries(tagStats).sort((a, b) => b[1].count - a[1].count)

  const handleRemove = (modelId: string) => {
    // Implement remove functionality here
    toast.success("Model removed from saved list")
    setModelToRemove(null)
  }

  const ModelCard = ({ model, onRemove }: { model: Model; onRemove?: (id: string) => void }) => (
    <Card className="group relative overflow-hidden">
      <div className="aspect-square w-full overflow-hidden">
        <div className={`h-full w-full bg-gradient-to-br ${model.gradient} transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100 rounded-t-lg`} />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold transition-colors group-hover:text-primary">
              {model.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {model.author}</p>
          </div>
          <Badge variant={model.tag}>{TAG_LABELS[model.tag]}</Badge>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {model.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <IconHeart className="h-4 w-4" />
              {model.likes}
            </span>
            <span className="flex items-center gap-1">
              <IconDownload className="h-4 w-4" />
              {model.downloads}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(model.date).toLocaleDateString()}
            </span>
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/90 hover:text-destructive-foreground"
              onClick={() => onRemove(model.id)}
            >
              <IconX className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 pt-24 pb-6">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your CAD models and view statistics
          </p>
        </div>

        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList>
            <TabsTrigger value="saved">Saved Models</TabsTrigger>
            <TabsTrigger value="uploads">Your Uploads</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            {mockModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockModels.map((model) => (
                  <Link key={model.id} href={`/models/${model.id}`}>
                    <ModelCard model={model} onRemove={handleRemove} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">
                  No saved models yet.<br />
                  Browse the <Link href="/explore" className="text-primary hover:underline">explore page</Link> to discover and save models.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="uploads" className="space-y-6">
            {mockModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockModels.map((model) => (
                  <Link key={model.id} href={`/models/${model.id}`}>
                    <ModelCard model={model} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">
                  You haven't uploaded any models yet.<br />
                  <Link href="/upload" className="text-primary hover:underline">Upload your first model</Link>
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconBookmark className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Models</p>
                      <p className="text-2xl font-semibold">{totalStats.totalModels}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconDownload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Downloads</p>
                      <p className="text-2xl font-semibold">{totalStats.totalDownloads}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconHeart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Likes</p>
                      <p className="text-2xl font-semibold">{totalStats.totalLikes}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <IconMessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Saves</p>
                      <p className="text-2xl font-semibold">{totalStats.totalSaves}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Category Statistics</h2>
                <div className="space-y-6">
                  {sortedTags.map(([tag, stats]) => (
                    <div key={tag} className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Badge variant={tag as ModelTag} className="w-full sm:w-auto justify-center sm:justify-start">
                          {TAG_LABELS[tag as ModelTag]}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 flex-1">
                        <div>
                          <p className="text-sm text-muted-foreground">Models</p>
                          <p className="font-semibold">{stats.count}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Downloads</p>
                          <p className="font-semibold">{stats.downloads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Likes</p>
                          <p className="font-semibold">{stats.likes}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block w-32">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${tag} rounded-full`}
                            style={{ 
                              width: `${(stats.count / totalStats.totalModels) * 100}%`,
                              backgroundColor: `var(--${tag})` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 