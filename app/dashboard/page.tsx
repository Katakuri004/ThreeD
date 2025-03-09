"use client"

import { Card } from "@/components/ui/card"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Badge } from "@/components/ui/badge"
import { type ModelTag } from "@/app/models/[id]/page"
import { IconHeart, IconDownload, IconBookmark, IconMessageCircle, IconX } from "@tabler/icons-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

interface Model {
  id: string
  title: string
  author: string
  description: string
  gradient: string
  likes: number
  downloads: number
  tag: ModelTag
  date: string
}

const TAG_LABELS: Record<ModelTag, string> = {
  misc: "Miscellaneous",
  tom: "Theory of Machines",
  ht: "Heat Transfer",
  th: "Thermal",
  civ: "Civil Engineering",
  fld: "Fluid Mechanics",
  sld: "Solid Modeling"
}

// Mock data - replace with actual data fetching
const savedModels: Model[] = [
  {
    id: "1",
    title: "Complex Gear Assembly",
    author: "John Doe",
    description: "A detailed 3D model of an intricate gear assembly with multiple moving parts.",
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    likes: 245,
    downloads: 180,
    tag: "tom",
    date: "2024-03-15"
  },
  {
    id: "2",
    title: "Heat Exchanger Design",
    author: "Jane Smith",
    description: "Efficient shell and tube heat exchanger model with thermal analysis.",
    gradient: "from-pink-500 via-rose-500 to-fuchsia-500",
    likes: 127,
    downloads: 89,
    tag: "ht",
    date: "2024-03-10"
  }
]

const uploadedModels: Model[] = [
  {
    id: "3",
    title: "Bridge Support Structure",
    author: "You",
    description: "Structural model of a bridge support with load analysis.",
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    likes: 189,
    downloads: 145,
    tag: "civ",
    date: "2024-03-08"
  },
  {
    id: "4",
    title: "Turbine Blade Assembly",
    author: "You",
    description: "High-performance turbine blade with cooling channels.",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    likes: 312,
    downloads: 234,
    tag: "th",
    date: "2024-03-05"
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
            {savedModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedModels.map((model) => (
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
            {uploadedModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {uploadedModels.map((model) => (
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