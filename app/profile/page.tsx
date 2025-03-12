"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { IconCoin, IconHeart, Icon3dCubeSphere, IconTrophy, IconLoader2, IconMessage, IconHome, IconUser, IconChartBar, IconHistory, IconUpload, IconCheck } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface UserModel {
  id: string;
  title: string;
  description: string;
  likes: number;
  downloads: number;
  status: string;
  thumbnail: string | null;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  verified: boolean;
  models: UserModel[];
  stats: {
    totalLikes: number;
    modelsCreated: number;
    completedBounties: number;
  };
  pointHistory: {
    id: string;
    amount: number;
    type: 'earned' | 'spent';
    description: string;
    date: string;
  }[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/users/${session.user.id}/profile`)
        .then(res => res.json())
        .then(data => {
          setProfile(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching profile:', error)
          setLoading(false)
        })
    }
  }, [session])

  const floatingDockItems = [
    {
      title: "Home",
      icon: <IconHome className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-5 w-5" />,
      href: session?.user?.id ? `/profile` : "/login",
    },
  ]

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={profile.image || ''} />
              <AvatarFallback className="text-4xl">{profile.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
                {profile.verified ? (
                  <Badge variant="default" className="bg-blue-500">
                    <IconCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/verify')}
                  >
                    Get Verified
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="statistics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="statistics" className="gap-2">
                <IconChartBar className="h-4 w-4" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="points" className="gap-2">
                <IconHistory className="h-4 w-4" />
                Point History
              </TabsTrigger>
              <TabsTrigger value="models" className="gap-2">
                <IconUpload className="h-4 w-4" />
                Models
              </TabsTrigger>
            </TabsList>

            {/* Statistics Tab */}
            <TabsContent value="statistics">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <IconHeart className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Total Likes</h3>
                  </div>
                  <p className="text-4xl font-bold">{profile.stats.totalLikes}</p>
                </Card>
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon3dCubeSphere className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Models Created</h3>
                  </div>
                  <p className="text-4xl font-bold">{profile.stats.modelsCreated}</p>
                </Card>
                <Card className="p-6 bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <IconTrophy className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold">Bounties Completed</h3>
                  </div>
                  <p className="text-4xl font-bold">{profile.stats.completedBounties}</p>
                </Card>
              </div>
            </TabsContent>

            {/* Point History Tab */}
            <TabsContent value="points">
              <Card>
                <div className="p-6 space-y-4">
                  {profile.pointHistory.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
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

            {/* Models Tab */}
            <TabsContent value="models">
              {!profile.verified ? (
                <div className="col-span-full">
                  <Card className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Verify Your Account</h3>
                    <p className="text-muted-foreground mb-4">
                      Get verified to unlock the ability to upload and share CAD models with the community.
                    </p>
                    <Button onClick={() => router.push('/verify')}>
                      Get Verified Now
                    </Button>
                  </Card>
                </div>
              ) : profile.models.length > 0 ? (
                profile.models.map((model) => (
                  <Link key={model.id} href={`/models/${model.id}`}>
                    <Card className="group overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative">
                        {model.thumbnail && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={model.thumbnail}
                            alt={model.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          {model.status}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium truncate">{model.title}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <IconHeart className="h-4 w-4" />
                            {model.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <IconUpload className="h-4 w-4" />
                            {model.downloads}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't uploaded any models yet.</p>
                  <Link href="/upload">
                    <Button>
                      <IconUpload className="h-4 w-4 mr-2" />
                      Upload Your First Model
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FloatingActionButton items={floatingDockItems} />
    </div>
  )
} 