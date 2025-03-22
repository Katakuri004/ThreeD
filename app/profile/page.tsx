"use client"

import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { 
  IconDownload, 
  IconTrophy, 
  IconUpload, 
  IconCheck,
  IconCoin,
  IconStar,
  IconAward,
  IconMedal,
  IconChartBar,
  IconHistory,
  IconArrowUpRight,
  IconArrowDownRight,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCube,
  IconCheckbox,
  IconClock,
  IconTrendingUp
} from "@tabler/icons-react"
import Link from "next/link"
import { useMemo, memo, Suspense } from "react"
import { cn } from "@/lib/utils"
import { Component, type ReactNode } from 'react'

// Add weekday labels
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Mock data for achievements
const achievements = [
  {
    title: "CAD Master",
    description: "Uploaded 10 CAD models",
    icon: <IconUpload className="h-8 w-8 text-blue-500" />,
    progress: 10,
    total: 10,
    earned: true
  },
  {
    title: "Bounty Hunter",
    description: "Fulfilled 10 CAD bounties",
    icon: <IconCheck className="h-8 w-8 text-green-500" />,
    progress: 10,
    total: 10,
    earned: true
  },
  {
    title: "Point Collector",
    description: "Earned 10,000 points",
    icon: <IconCoin className="h-8 w-8 text-yellow-500" />,
    progress: 10000,
    total: 10000,
    earned: true
  },
  {
    title: "Community Star",
    description: "Received 50 likes on models",
    icon: <IconStar className="h-8 w-8 text-purple-500" />,
    progress: 50,
    total: 50,
    earned: true
  },
  {
    title: "Early Adopter",
    description: "Joined in the first month",
    icon: <IconAward className="h-8 w-8 text-red-500" />,
    progress: 1,
    total: 1,
    earned: true
  },
  {
    title: "Quality Contributor",
    description: "5 models featured",
    icon: <IconMedal className="h-8 w-8 text-indigo-500" />,
    progress: 5,
    total: 5,
    earned: true
  }
]

interface DownloadedModel {
  id: string
  name: string
  thumbnail: string
  downloadCount: number
  lastDownloaded: string
}

// Custom Error Boundary Component
class CustomErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// Update mock data to match interfaces
const detailedStats: DetailedStat[] = [
  {
    title: "Total Downloads",
    value: "1,234",
    icon: IconDownload
  },
  {
    title: "Active Models",
    value: "42",
    icon: IconCube
  },
  {
    title: "Completion Rate",
    value: "98%",
    icon: IconCheckbox
  },
  {
    title: "Total Points",
    value: "3,500",
    icon: IconStar
  },
  {
    title: "Avg. Response Time",
    value: "2.3s",
    icon: IconClock
  },
  {
    title: "Success Rate",
    value: "95%",
    icon: IconTrendingUp
  }
]

const pointTransactions: PointTransaction[] = [
  {
    type: "earned",
    amount: 100,
    description: "Model download milestone reached",
    date: "2024-03-15"
  },
  {
    type: "spent",
    amount: 50,
    description: "Premium feature access",
    date: "2024-03-14"
  },
  {
    type: "earned",
    amount: 75,
    description: "Community contribution reward",
    date: "2024-03-13"
  },
  {
    type: "spent",
    amount: 25,
    description: "Custom model request",
    date: "2024-03-12"
  }
]

// Activity Grid Component
const ActivityGrid = memo(function ActivityGrid({ data }: { data: ActivityDay[] }) {
  // Group data by weeks
  const weeks = useMemo(() => {
    const weeks: ActivityDay[][] = []
    let currentWeek: ActivityDay[] = []
    
    // Sort data by date
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    
    // Take only the last 51 weeks (357 days) plus current week
    const recentData = sortedData.slice(-357)
    
    recentData.forEach((day) => {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      currentWeek.push(day)
    })
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }
    
    return weeks
  }, [data])

  return (
    <div className="bg-black/20 rounded-lg p-6 mb-12">
      <h2 className="text-xl font-semibold mb-6">Activity</h2>
      <div className="flex justify-start max-w-[900px] mx-auto">
        <div className="flex gap-3">
          {/* Weekday labels */}
          <div className="flex flex-col gap-[3px] pr-2 text-right">
            {weekDays.map((day) => (
              <div key={day} className="h-[10px] flex items-center justify-end text-[9px] text-gray-400 leading-none">
                {day}
              </div>
            ))}
          </div>
          
          {/* Activity grid */}
          <div className="flex gap-[3px]">
            {weeks.slice(-51).map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={cn(
                      "h-[10px] w-[10px] rounded-[2px] transition-colors",
                      day.activity === 0
                        ? "bg-gray-800/50"
                        : day.activity < 3
                        ? "bg-indigo-900/50"
                        : day.activity < 5
                        ? "bg-indigo-700/50"
                        : "bg-indigo-500/50",
                      "hover:bg-opacity-75 cursor-pointer group relative"
                    )}
                  >
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-black/90 rounded text-[9px] whitespace-nowrap z-10">
                      {day.activity} activities on {new Date(day.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

// Stats Card Component
const StatsCard = memo(function StatsCard({ title, value, icon: Icon }: DetailedStat) {
  return (
    <div className="bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  )
})

// Transaction Item Component
const TransactionItem = memo(function TransactionItem({ transaction }: { transaction: PointTransaction }) {
  const isPositive = transaction.type === 'earned'
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800">
      <div>
        <p className="font-medium">{transaction.description}</p>
        <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      <p className={cn("font-semibold", isPositive ? "text-green-500" : "text-red-500")}>
        {isPositive ? '+' : '-'}{transaction.amount} points
      </p>
    </div>
  )
})

// Types
interface ActivityDay {
  date: string
  activity: number
}

interface DetailedStat {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
}

interface PointTransaction {
  type: 'earned' | 'spent'
  amount: number
  description: string
  date: string
}

function generateActivityData(): ActivityDay[] {
  const data: ActivityDay[] = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 356) // Start from 51 weeks ago
  
  // Ensure we start from a Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1)
  }

  // Generate data for exactly 51 weeks plus current week
  const days = 357 // 51 weeks * 7 days
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    data.push({
      date: currentDate.toISOString(),
      activity: Math.floor(Math.random() * 8) // Random activity level (0-7)
    })
  }

  return data
}

// Stats Grid Component
const StatsGrid = memo(function StatsGrid({ stats }: { stats: DetailedStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
})

// Transactions List Component
const TransactionsList = memo(function TransactionsList({ transactions }: { transactions: PointTransaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No transactions to display
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  )
})

// Downloaded Models List Component
const DownloadedModelsList = memo(function DownloadedModelsList({ models }: { models: DownloadedModel[] }) {
  if (models.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No downloaded models yet
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <div
          key={model.id}
          className="group relative bg-black/20 rounded-lg overflow-hidden hover:bg-black/30 transition-colors"
        >
          <div className="aspect-video relative">
            <img
              src={model.thumbnail}
              alt={model.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://placehold.co/600x400/1a1a1a/404040?text=No+Preview'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
              {model.name}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <IconDownload className="w-4 h-4" />
                {model.downloadCount}
              </span>
              <span>Last: {new Date(model.lastDownloaded).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

// Mock downloaded models data
const downloadedModels: DownloadedModel[] = [
  {
    id: "1",
    name: "Steam Engine v2",
    thumbnail: "https://placehold.co/600x400/1a1a1a/404040?text=Steam+Engine",
    downloadCount: 156,
    lastDownloaded: "2024-03-15"
  },
  {
    id: "2",
    name: "Advanced Gearbox",
    thumbnail: "https://placehold.co/600x400/1a1a1a/404040?text=Gearbox",
    downloadCount: 89,
    lastDownloaded: "2024-03-14"
  },
  {
    id: "3",
    name: "Hydraulic Pump",
    thumbnail: "https://placehold.co/600x400/1a1a1a/404040?text=Pump",
    downloadCount: 234,
    lastDownloaded: "2024-03-13"
  }
]

export default function ProfilePage() {
  const { data: session, status } = useSession()

  // Memoize user image URL
  const userImage = useMemo(() => {
    return session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name}`
  }, [session?.user?.image, session?.user?.name])

  // Memoize activity data to prevent unnecessary recalculation
  const activityData = useMemo(() => generateActivityData(), [])

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-indigo-500 border-indigo-500/30 rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Handle unauthenticated state
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10">
            {/* Add error handling for image load */}
            <img
              src={userImage}
              alt={session.user?.name || "Profile"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=fallback`
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{session.user?.name || 'Anonymous User'}</h1>
            <p className="text-gray-400">{session.user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-background/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <IconUpload className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-gray-400">Models Uploaded</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <IconDownload className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-sm text-gray-400">Models Downloaded</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-500/10">
                  <IconTrophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-400">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="stats" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="stats">Detailed Statistics</TabsTrigger>
            <TabsTrigger value="points">Point History</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="mt-0">
            <CustomErrorBoundary fallback={<div className="text-red-500">Error loading statistics</div>}>
              <Suspense fallback={<div className="animate-pulse">Loading statistics...</div>}>
                <StatsGrid stats={detailedStats} />
              </Suspense>
            </CustomErrorBoundary>
          </TabsContent>
          <TabsContent value="points" className="mt-0">
            <CustomErrorBoundary fallback={<div className="text-red-500">Error loading transactions</div>}>
              <Suspense fallback={<div className="animate-pulse">Loading transactions...</div>}>
                <TransactionsList transactions={pointTransactions} />
              </Suspense>
            </CustomErrorBoundary>
          </TabsContent>
        </Tabs>

        {/* Downloaded Models */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Downloaded Models</h2>
          <CustomErrorBoundary fallback={<div className="text-red-500">Error loading downloaded models</div>}>
            <Suspense fallback={<div className="animate-pulse">Loading downloaded models...</div>}>
              <DownloadedModelsList models={downloadedModels} />
            </Suspense>
          </CustomErrorBoundary>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-white/5">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activity Grid */}
        <section className="mb-12">
          <ActivityGrid data={activityData} />
        </section>

        {/* Footer */}
        <footer className="w-full bg-background/80 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">ThreeD</p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/katakuri.2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <IconBrandInstagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com/Katakuri004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <IconBrandGithub className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/arpit-kumar-kata/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <IconBrandLinkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 