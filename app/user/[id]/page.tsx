"use client"

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconCoin, IconHeart, Icon3dCubeSphere, IconTrophy, IconLoader2, IconMessage, IconHome, IconUser, IconChartBar, IconHistory, IconUpload } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { ModelTag, TAG_LABELS } from "@/types/model";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface UserModel {
  id: string;
  title: string;
  likes: number;
  downloads: number;
  tag: ModelTag;
  thumbnail: string;
}

interface PointHistory {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  date: Date;
}

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  points: number;
  stats: {
    totalLikes: number;
    totalDownloads: number;
    totalModels: number;
    activeBounties: number;
    completedBounties: number;
  };
  recentModels: UserModel[];
  pointHistory: PointHistory[];
}

// Mock data - replace with actual data fetching
const mockUserProfile: UserProfile = {
  id: "author1",
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  image: "",
  points: 10000,
  stats: {
    totalLikes: 1234,
    totalDownloads: 567,
    totalModels: 45,
    activeBounties: 3,
    completedBounties: 12,
  },
  recentModels: [
    {
      id: "1",
      title: "Complex Gear Assembly",
      likes: 245,
      downloads: 89,
      tag: "tom",
      thumbnail: "from-blue-500 via-cyan-500 to-sky-500",
    },
  ],
  pointHistory: [
    {
      id: "1",
      amount: 500,
      type: "earned",
      description: "Bounty completed: Industrial Robot Arm",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "2",
      amount: -100,
      type: "spent",
      description: "Downloaded premium model: Electric Vehicle Chassis",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ],
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockUserProfile);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const floatingDockItems = [
    {
      title: "Home",
      icon: <IconHome className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-5 w-5" />,
      href: session?.user?.id ? `/user/${session.user.id}` : "/login",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">User not found</p>
      </div>
    );
  }

  const isOwnProfile = session?.user?.id === params.id;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={profile.image} />
              <AvatarFallback className="text-4xl">{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <IconCoin className="h-5 w-5 text-yellow-500" />
                  <span className="text-xl font-semibold">{profile.points} points</span>
                </div>
                {!isOwnProfile && (
                  <Link href={`/messages/${profile.id}`}>
                    <Button variant="outline" className="gap-2">
                      <IconMessage className="h-5 w-5" />
                      Message
                    </Button>
                  </Link>
                )}
              </div>
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
                  <p className="text-4xl font-bold">{profile.stats.totalModels}</p>
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
                  {mockUserProfile.pointHistory.map((entry) => (
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

            {/* Models Tab */}
            <TabsContent value="models">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {profile.recentModels.map((model) => (
                  <Link key={model.id} href={`/models/${model.id}`}>
                    <Card className="group overflow-hidden">
                      <div className={`aspect-video bg-gradient-to-br ${model.thumbnail} group-hover:opacity-80 transition-opacity`} />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium truncate">{model.title}</h3>
                          <Badge variant={model.tag}>{TAG_LABELS[model.tag]}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <IconHeart className="h-4 w-4" />
                            <span>{model.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon3dCubeSphere className="h-4 w-4" />
                            <span>{model.downloads}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FloatingActionButton items={floatingDockItems} />
    </div>
  );
} 