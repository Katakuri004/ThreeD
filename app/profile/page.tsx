"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconCoin, IconHeart, Icon3dCubeSphere, IconTrophy, IconLoader2, IconChartBar, IconHistory, IconUpload, IconSettings, IconDownload, IconEdit } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { ModelTag, TAG_LABELS } from "@/types/models"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FloatingActionButton } from "@/components/ui/floating-action-button"

interface UserModel {
  id: string;
  title: string;
  likes: number;
  downloads: number;
  tag: ModelTag;
  thumbnail: string;
  createdAt: Date;
  status: 'public' | 'private' | 'draft';
}

interface PointHistory {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  date: Date;
}

interface BountyActivity {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'expired';
  reward: number;
  deadline?: Date;
  completedAt?: Date;
}

// Mock data
const mockUserData = {
  models: [
    {
      id: "1",
      title: "Complex Gear Assembly",
      likes: 245,
      downloads: 89,
      tag: "tom",
      thumbnail: "from-blue-500 via-cyan-500 to-sky-500",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      status: 'public',
    },
    {
      id: "2",
      title: "Draft Model",
      likes: 0,
      downloads: 0,
      tag: "misc",
      thumbnail: "from-gray-500 via-gray-600 to-gray-700",
      createdAt: new Date(),
      status: 'draft',
    },
  ] as UserModel[],
  pointHistory: [
    {
      id: "1",
      amount: 500,
      type: "earned",
      description: "Bounty completed: Industrial Robot Arm",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: "2",
      amount: -100,
      type: "spent",
      description: "Downloaded premium model: Electric Vehicle Chassis",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ] as PointHistory[],
  bounties: [
    {
      id: "1",
      title: "Industrial Robot Arm",
      status: "completed",
      reward: 500,
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      id: "2",
      title: "Electric Vehicle Battery Mount",
      status: "active",
      reward: 750,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    },
  ] as BountyActivity[],
};

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/profile")
    }
  }, [status, router])

  const floatingDockItems = [
    {
      title: "Home",
      icon: <Icon3dCubeSphere className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Settings",
      icon: <IconSettings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => router.push('/settings')}
              >
                <IconEdit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{session.user.name}</h1>
              <p className="text-muted-foreground">{session.user.email}</p>
              <div className="flex items-center justify-center gap-2">
                <IconCoin className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-semibold">{session.user.points || 10000} points</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="gap-2">
                <IconChartBar className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="models" className="gap-2">
                <IconUpload className="h-4 w-4" />
                My Models
              </TabsTrigger>
              <TabsTrigger value="bounties" className="gap-2">
                <IconTrophy className="h-4 w-4" />
                Bounties
              </TabsTrigger>
              <TabsTrigger value="points" className="gap-2">
                <IconHistory className="h-4 w-4" />
                Points
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <IconHeart className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Total Likes</h3>
                  </div>
                  <p className="text-4xl font-bold">1,234</p>
                </Card>
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <IconDownload className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Downloads</h3>
                  </div>
                  <p className="text-4xl font-bold">567</p>
                </Card>
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon3dCubeSphere className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Models</h3>
                  </div>
                  <p className="text-4xl font-bold">{mockUserData.models.length}</p>
                </Card>
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <IconTrophy className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold">Bounties</h3>
                  </div>
                  <p className="text-4xl font-bold">{mockUserData.bounties.filter(b => b.status === 'completed').length}</p>
                </Card>
              </div>
            </TabsContent>

            {/* Models Tab */}
            <TabsContent value="models">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">My Models</h2>
                  <Button>
                    <IconUpload className="h-4 w-4 mr-2" />
                    Upload New Model
                  </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {mockUserData.models.map((model) => (
                    <Link key={model.id} href={`/models/${model.id}`}>
                      <Card className="group overflow-hidden">
                        <div className={`aspect-video bg-gradient-to-br ${model.thumbnail} group-hover:opacity-80 transition-opacity relative`}>
                          {model.status !== 'public' && (
                            <Badge variant="secondary" className="absolute top-2 right-2">
                              {model.status}
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium truncate">{model.title}</h3>
                            <Badge variant={model.tag}>{TAG_LABELS[model.tag]}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <IconHeart className="h-4 w-4" />
                                <span>{model.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <IconDownload className="h-4 w-4" />
                                <span>{model.downloads}</span>
                              </div>
                            </div>
                            <span>{model.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Bounties Tab */}
            <TabsContent value="bounties">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">My Bounties</h2>
                  <Button variant="outline">
                    <IconTrophy className="h-4 w-4 mr-2" />
                    Browse Bounties
                  </Button>
                </div>
                <div className="grid gap-4">
                  {mockUserData.bounties.map((bounty) => (
                    <Card key={bounty.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{bounty.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge 
                              variant={
                                bounty.status === 'completed' ? 'default' :
                                bounty.status === 'active' ? 'outline' : 'secondary'
                              }
                            >
                              {bounty.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <IconCoin className="h-4 w-4" />
                              <span>{bounty.reward}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          {bounty.status === 'completed' ? (
                            <p>Completed on {bounty.completedAt?.toLocaleDateString()}</p>
                          ) : bounty.status === 'active' && bounty.deadline ? (
                            <p>Due by {bounty.deadline.toLocaleDateString()}</p>
                          ) : null}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Points Tab */}
            <TabsContent value="points">
              <Card>
                <div className="p-6 space-y-4">
                  {mockUserData.pointHistory.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div className={cn(
                        "font-semibold",
                        entry.type === "earned" ? "text-green-500" : "text-red-500"
                      )}>
                        {entry.type === "earned" ? "+" : "-"}{Math.abs(entry.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FloatingActionButton items={floatingDockItems} />
    </div>
  )
} 