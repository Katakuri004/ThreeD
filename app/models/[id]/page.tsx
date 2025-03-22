"use client";

import { useState } from "react";
import { LayoutGrid, type Card } from "@/components/ui/layout-grid";
import { Button } from "@/components/ui/button";
import { BackgroundBoxes } from "@/components/ui/background-boxes";
import { IconHeart, IconDownload, IconMessageCircle, IconBookmark, Icon3dCubeSphere, IconTrophy } from "@tabler/icons-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ModelTag, TAG_LABELS } from "@/types/model";

interface ProductImage {
  id: number;
  gradient: string;
  caption: string;
}

interface Author {
  id: string;
  name: string;
  username: string;
  image: string;
  stats: {
    totalLikes: number;
    totalDownloads: number;
    totalModels: number;
    activeBounties: number;
    completedBounties: number;
  };
}

interface ProductDetails {
  id: string;
  title: string;
  author: Author;
  description: string;
  images: ProductImage[];
  likes: number;
  saves: number;
  downloads: number;
  comments: number;
  tag: ModelTag;
  createdAt: string;
}

// Mock data - replace with actual data fetching
const productData: ProductDetails = {
  id: "1",
  title: "Complex Gear Assembly",
  author: {
    id: "author1",
    name: "John Doe",
    username: "johndoe",
    image: "",
    stats: {
      totalLikes: 1234,
      totalDownloads: 567,
      totalModels: 45,
      activeBounties: 3,
      completedBounties: 12,
    },
  },
  description: "A detailed 3D model of an intricate gear assembly with multiple moving parts.",
  tag: "tom",
  images: [
    {
      id: 1,
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      caption: "Front View",
    },
    {
      id: 2,
      gradient: "from-fuchsia-500 via-rose-500 to-pink-500",
      caption: "Side View",
    },
    {
      id: 3,
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
      caption: "Exploded View",
    },
    {
      id: 4,
      gradient: "from-teal-500 via-emerald-500 to-green-500",
      caption: "Detail View",
    },
    {
      id: 5,
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      caption: "Assembly",
    },
    {
      id: 6,
      gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      caption: "Analysis",
    }
  ],
  likes: 245,
  saves: 127,
  downloads: 89,
  comments: 32,
  createdAt: "2024-02-20",
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed like" : "Added like");
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Removed from saved" : "Added to saved");
  };

  const handleDownload = () => {
    // Implement download functionality
    toast.success("Starting download...");
  };

  const cards: Card[] = productData.images.map((image) => ({
    id: image.id,
    content: image.caption,
    className: "h-full w-full",
    gradient: image.gradient,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 pt-24 pb-6">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{productData.title}</h1>
            <Badge variant={productData.tag}>{TAG_LABELS[productData.tag]}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <UserAvatar 
              user={productData.author} 
              showName 
              avatarClassName="h-10 w-10"
            />
            <span className="text-sm text-muted-foreground">
              Posted on {new Date(productData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card">
              <LayoutGrid cards={cards} />
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{productData.description}</p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">About the Author</h2>
                <Link href={`/user/${productData.author.id}`}>
                  <Button variant="ghost">View Profile</Button>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IconHeart className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Total Likes</span>
                  </div>
                  <p className="text-2xl font-bold">{productData.author.stats.totalLikes}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3dCubeSphere className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Total Models</span>
                  </div>
                  <p className="text-2xl font-bold">{productData.author.stats.totalModels}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IconTrophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Completed Bounties</span>
                  </div>
                  <p className="text-2xl font-bold">{productData.author.stats.completedBounties}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 rounded-lg border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="icon"
                    onClick={handleLike}
                  >
                    <IconHeart
                      className={cn("h-5 w-5", liked && "fill-current")}
                    />
                  </Button>
                  <Button
                    variant={saved ? "default" : "outline"}
                    size="icon"
                    onClick={handleSave}
                  >
                    <IconBookmark
                      className={cn("h-5 w-5", saved && "fill-current")}
                    />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/sandbox/${id}`}>
                    <Button variant="outline" className="gap-2">
                      <Icon3dCubeSphere className="h-5 w-5" />
                      View in 3D
                    </Button>
                  </Link>
                  <Button onClick={handleDownload} className="gap-2">
                    <IconDownload className="h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-semibold">{productData.likes}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-semibold">{productData.downloads}</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-semibold">{productData.saves}</p>
                  <p className="text-sm text-muted-foreground">Saves</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-semibold">{productData.comments}</p>
                  <p className="text-sm text-muted-foreground">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 