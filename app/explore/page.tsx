"use client"

import { Card } from "@/components/ui/card"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { IconHeart, IconDownload } from "@tabler/icons-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ModelTag, TAG_LABELS } from "@/types/model"
import { TagSelector } from "@/components/ui/tag-selector"
import { useState } from "react"

interface Model {
  id: string
  title: string
  author: string
  description: string
  gradient: string
  likes: number
  downloads: number
  tag: ModelTag
}

const models: Model[] = [
  {
    id: "1",
    title: "Complex Gear Assembly",
    author: "John Doe",
    description: "A detailed 3D model of an intricate gear assembly with multiple moving parts.",
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    likes: 245,
    downloads: 180,
    tag: "tom",
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
  },
  {
    id: "3",
    title: "Bridge Support Structure",
    author: "Mike Johnson",
    description: "Structural model of a bridge support with load analysis.",
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    likes: 189,
    downloads: 145,
    tag: "civ",
  },
  {
    id: "4",
    title: "Turbine Blade Assembly",
    author: "Sarah Williams",
    description: "High-performance turbine blade with cooling channels.",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    likes: 312,
    downloads: 234,
    tag: "th",
  },
  {
    id: "5",
    title: "Fluid Flow Simulator",
    author: "Alex Chen",
    description: "Complex fluid dynamics simulation model.",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    likes: 156,
    downloads: 98,
    tag: "fld",
  },
  {
    id: "6",
    title: "Engine Block Model",
    author: "Emily Brown",
    description: "Detailed engine block design with internal components.",
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    likes: 203,
    downloads: 167,
    tag: "sld",
  },
  {
    id: "7",
    title: "Solar Panel Thermal Analysis",
    author: "David Lee",
    description: "Comprehensive thermal analysis model of a solar panel system with heat distribution patterns.",
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    likes: 178,
    downloads: 132,
    tag: "ht",
  },
  {
    id: "8",
    title: "Wind Turbine Assembly",
    author: "Rachel Green",
    description: "Complete wind turbine assembly with detailed blade design and mechanical components.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    likes: 289,
    downloads: 201,
    tag: "tom",
  },
  {
    id: "9",
    title: "Suspension Bridge Analysis",
    author: "Chris Wilson",
    description: "Structural analysis model of a suspension bridge with load distribution studies.",
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
    likes: 234,
    downloads: 167,
    tag: "civ",
  },
  {
    id: "10",
    title: "HVAC Duct System",
    author: "Lisa Anderson",
    description: "Detailed HVAC duct system with airflow analysis and thermal considerations.",
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    likes: 145,
    downloads: 98,
    tag: "fld",
  },
  {
    id: "11",
    title: "Robotic Arm Mechanism",
    author: "Tom Parker",
    description: "6-axis robotic arm with inverse kinematics and motion simulation.",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    likes: 321,
    downloads: 245,
    tag: "tom",
  },
  {
    id: "12",
    title: "Industrial Boiler Design",
    author: "Maria Garcia",
    description: "High-efficiency industrial boiler with thermal analysis and steam flow patterns.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    likes: 167,
    downloads: 123,
    tag: "th",
  },
  {
    id: "13",
    title: "Automotive Chassis",
    author: "James Wilson",
    description: "Complete automotive chassis design with stress analysis and material specifications.",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    likes: 198,
    downloads: 156,
    tag: "sld",
  },
  {
    id: "14",
    title: "Wave Energy Converter",
    author: "Sophie Chen",
    description: "Innovative wave energy conversion system with fluid-structure interaction analysis.",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    likes: 276,
    downloads: 189,
    tag: "fld",
  }
]

export default function ExplorePage() {
  const [selectedTag, setSelectedTag] = useState<ModelTag | undefined>()

  const filteredModels = selectedTag 
    ? models.filter(model => model.tag === selectedTag)
    : models

  const tagStats = Object.entries(
    models.reduce((acc, model) => {
      acc[model.tag] = (acc[model.tag] || 0) + 1
      return acc
    }, {} as Record<ModelTag, number>)
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 pt-24 pb-6">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Explore Models</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover amazing CAD models from our community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
            <div className="w-full sm:w-64">
              <TagSelector 
                value={selectedTag} 
                onValueChange={setSelectedTag}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tagStats.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag as ModelTag)}
                  className={`inline-flex items-center gap-2 ${
                    selectedTag === tag ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Badge variant={tag as ModelTag}>
                    {TAG_LABELS[tag as ModelTag]} ({count})
                  </Badge>
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(undefined)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`}>
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
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
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <IconHeart className="h-4 w-4" />
                      {model.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconDownload className="h-4 w-4" />
                      {model.downloads}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 