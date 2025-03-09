"use client"

import { Card } from "@/components/ui/card"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Badge } from "@/components/ui/badge"
import { type ModelTag } from "@/app/models/[id]/page"
import { IconCoin, IconTrendingUp, IconFilter, IconSortAscending, IconMessage, IconUser, IconTrophy, IconMedal } from "@tabler/icons-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TagSelector } from "@/components/ui/tag-selector"
import { Calendar } from "@/components/ui/calendar"
import { ProgressRing } from "@/components/ui/progress-ring"
import { useState } from "react"
import { toast } from "sonner"
import { format, differenceInDays, differenceInHours, isBefore } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface BountyRequest {
  id: string
  title: string
  description: string
  specifications: string
  requester: {
    name: string
    points: number
    email?: string
  }
  pointsPrize: number
  tag: ModelTag
  date: string
  expiryDate: string
  status: "open" | "in_progress" | "completed"
  acceptedBy?: {
    name: string
    email: string
    date: string
  }
}

interface UserRanking {
  id: string
  name: string
  points: number
  bountyCount: number
  modelsUploaded: number
}

const mockBounties: BountyRequest[] = [
  {
    id: "1",
    title: "Complex Planetary Gear System",
    description: "Need a detailed model of a planetary gear system with specific gear ratios for an educational project.",
    specifications: "- Center sun gear: 24 teeth\n- Planet gears (3x): 16 teeth each\n- Ring gear: 56 teeth\n- Module: 2mm\n- Pressure angle: 20°",
    requester: {
      name: "John Smith",
      points: 1200,
      email: "john.smith@example.com"
    },
    pointsPrize: 500,
    tag: "tom",
    date: "2024-03-15",
    expiryDate: "2024-04-15",
    status: "open"
  },
  {
    id: "2",
    title: "Heat Exchanger with Specific Flow Rates",
    description: "Looking for a shell and tube heat exchanger model with custom specifications for thermal analysis.",
    specifications: "- Shell diameter: 300mm\n- Tube count: 120\n- Tube diameter: 20mm\n- Baffle spacing: 200mm\n- Flow rate: 50 L/min",
    requester: {
      name: "Sarah Chen",
      points: 850,
      email: "sarah.chen@example.com"
    },
    pointsPrize: 300,
    tag: "ht",
    date: "2024-03-14",
    expiryDate: "2024-04-14",
    status: "in_progress",
    acceptedBy: {
      name: "Mike Johnson",
      email: "mike.j@example.com",
      date: "2024-03-15"
    }
  }
]

const mockRankings: UserRanking[] = [
  {
    id: "1",
    name: "Sarah Chen",
    points: 15000,
    bountyCount: 12,
    modelsUploaded: 8
  },
  {
    id: "2",
    name: "Mike Johnson",
    points: 12500,
    bountyCount: 8,
    modelsUploaded: 15
  },
  {
    id: "3",
    name: "John Smith",
    points: 9800,
    bountyCount: 5,
    modelsUploaded: 10
  }
]

export default function RequestPage() {
  const [selectedTag, setSelectedTag] = useState<ModelTag>()
  const [sortBy, setSortBy] = useState<"date" | "points">("date")
  const [bounties, setBounties] = useState<BountyRequest[]>(mockBounties)
  const [pointsToOffer, setPointsToOffer] = useState<number>(100)
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [rankingFilter, setRankingFilter] = useState<"all" | "month" | "week">("all")
  const [rankings, setRankings] = useState<UserRanking[]>(mockRankings)

  const handleCreateRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const specifications = formData.get("specifications") as string

    if (!selectedTag) {
      toast.error("Please select a category")
      return
    }

    if (pointsToOffer < 100) {
      toast.error("Minimum bounty is 100 points")
      return
    }

    if (!expiryDate) {
      toast.error("Please select an expiry date")
      return
    }

    if (isBefore(expiryDate, new Date())) {
      toast.error("Expiry date must be in the future")
      return
    }

    // Here you would typically make an API call to create the request
    toast.success("Request created successfully")
  }

  const handleAcceptBounty = (bountyId: string) => {
    // Here you would typically make an API call to accept the bounty
    toast.success("Bounty accepted! You can now start working on this request.")
  }

  const calculateTimeRemaining = (expiryDate: string) => {
    const end = new Date(expiryDate)
    const now = new Date()
    const daysRemaining = differenceInDays(end, now)
    const hoursRemaining = differenceInHours(end, now) % 24

    if (daysRemaining < 0) return { progress: 0, text: "Expired" }

    const totalDays = differenceInDays(end, new Date(bounties.find(b => b.expiryDate === expiryDate)?.date || ""))
    const progress = Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100))

    return {
      progress,
      text: daysRemaining > 0
        ? `${daysRemaining}d ${hoursRemaining}h`
        : `${hoursRemaining}h`
    }
  }

  const sortedBounties = [...bounties].sort((a, b) => {
    if (sortBy === "points") {
      return b.pointsPrize - a.pointsPrize
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const filteredBounties = selectedTag
    ? sortedBounties.filter(bounty => bounty.tag === selectedTag)
    : sortedBounties

  const acceptedBounties = bounties.filter(bounty => 
    bounty.status === "in_progress" && bounty.acceptedBy?.email === "mike.j@example.com" // Replace with actual user email
  )

  const BountyCard = ({ bounty, showProgress = true }: { bounty: BountyRequest; showProgress?: boolean }) => {
    const timeRemaining = calculateTimeRemaining(bounty.expiryDate)

    return (
      <Card className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{bounty.title}</h3>
            <p className="text-sm text-muted-foreground">by {bounty.requester.name}</p>
          </div>
          <Badge variant={bounty.tag} className="capitalize">
            {bounty.tag}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">{bounty.description}</p>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm font-mono whitespace-pre-wrap">{bounty.specifications}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <IconCoin className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{bounty.pointsPrize}</span>
            </div>
            {showProgress && timeRemaining.progress > 0 && (
              <div className="flex items-center gap-2">
                <ProgressRing
                  value={timeRemaining.progress}
                  size={32}
                  strokeWidth={3}
                  className="text-primary"
                >
                  <span className="text-[10px] font-medium">{timeRemaining.text}</span>
                </ProgressRing>
              </div>
            )}
            <span className="text-sm text-muted-foreground">
              {new Date(bounty.date).toLocaleDateString()}
            </span>
          </div>
          {bounty.status === "open" ? (
            <Button onClick={() => handleAcceptBounty(bounty.id)}>
              Accept Bounty
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant={bounty.status === "in_progress" ? "tom" : "sld"}>
                {bounty.status === "in_progress" ? "In Progress" : "Completed"}
              </Badge>
              {bounty.acceptedBy && (
                <Button variant="ghost" size="sm" className="gap-1">
                  <IconMessage className="h-4 w-4" />
                  Message
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    )
  }

  const AcceptedBountyCard = ({ bounty }: { bounty: BountyRequest }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{bounty.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={bounty.tag} className="capitalize">
              {bounty.tag}
            </Badge>
            <Badge variant="outline">In Progress</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <IconMessage className="h-4 w-4" />
          Message Requester
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium mb-2">Requester Information</h4>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <IconUser className="h-4 w-4 text-muted-foreground" />
              {bounty.requester.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {bounty.requester.email}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Bounty Details</h4>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <IconCoin className="h-4 w-4 text-yellow-500" />
              {bounty.pointsPrize} points
            </p>
            <p className="text-sm text-muted-foreground">
              Accepted on {new Date(bounty.acceptedBy?.date || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Specifications</h4>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-mono whitespace-pre-wrap">{bounty.specifications}</p>
        </div>
      </div>
    </Card>
  )

  const RankingCard = ({ user, rank }: { user: UserRanking; rank: number }) => {
    const medalColor = rank === 1 ? "text-yellow-500" : rank === 2 ? "text-gray-400" : rank === 3 ? "text-amber-700" : "text-muted-foreground"
    
    return (
      <Card className={cn(
        "p-4 transition-all",
        rank <= 3 ? "bg-muted/50" : ""
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            medalColor,
            rank <= 3 ? "bg-background" : ""
          )}>
            {rank <= 3 ? (
              <IconMedal className="h-5 w-5" />
            ) : (
              <span className="text-sm font-medium">{rank}</span>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {user.bountyCount} bounties · {user.modelsUploaded} models
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-500">
              <IconCoin className="h-4 w-4" />
              <span className="font-semibold">{user.points.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 pt-24 pb-6">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">CAD Requests</h1>
          <p className="text-lg text-muted-foreground">
            Request custom CAD models or browse existing bounties
          </p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">Create Request</TabsTrigger>
            <TabsTrigger value="browse">Browse Requests</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Bounties</TabsTrigger>
            <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="p-6">
              <form onSubmit={handleCreateRequest} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a clear title for your request"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you need and why"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">Technical Specifications</Label>
                  <Textarea
                    id="specifications"
                    name="specifications"
                    placeholder="List all technical specifications, measurements, and requirements"
                    required
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <TagSelector
                      value={selectedTag}
                      onValueChange={setSelectedTag}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !expiryDate && "text-muted-foreground"
                          )}
                        >
                          {expiryDate ? format(expiryDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={expiryDate}
                          onSelect={setExpiryDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="points">Point Bounty</Label>
                    <Input
                      id="points"
                      name="points"
                      type="number"
                      min="100"
                      step="50"
                      value={pointsToOffer}
                      onChange={(e) => setPointsToOffer(Number(e.target.value))}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum 100 points
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Create Request
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="browse">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-64">
                  <TagSelector
                    value={selectedTag}
                    onValueChange={setSelectedTag}
                  />
                </div>
                <Select value={sortBy} onValueChange={(value: "date" | "points") => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value="date">Latest</SelectItem>
                      <SelectItem value="points">Highest Bounty</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectedTag && (
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedTag(undefined)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear filter
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredBounties.map((bounty) => (
                  <BountyCard key={bounty.id} bounty={bounty} />
                ))}
              </div>

              {filteredBounties.length === 0 && (
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-muted-foreground">
                    No requests found for this category.<br />
                    Try selecting a different category or create a new request.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="space-y-6">
              {acceptedBounties.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {acceptedBounties.map((bounty) => (
                    <AcceptedBountyCard key={bounty.id} bounty={bounty} />
                  ))}
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-muted-foreground">
                    You haven't accepted any bounties yet.<br />
                    Browse the available requests to find work.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboards">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <IconTrophy className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold">Top Contributors</h2>
                </div>
                
                <Select value={rankingFilter} onValueChange={(value: "all" | "month" | "week") => setRankingFilter(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time period</SelectLabel>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {rankings.map((user, index) => (
                  <RankingCard key={user.id} user={user} rank={index + 1} />
                ))}
              </div>

              {rankings.length === 0 && (
                <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-muted-foreground">
                    No rankings available for this time period.<br />
                    Check back later or switch to a different time frame.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 