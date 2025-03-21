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
  IconArrowDownRight
} from "@tabler/icons-react"
import Link from "next/link"

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

// Mock data for downloaded models
const downloadedModels = [
  {
    name: "Steam Engine Model",
    category: "Mechanical",
    date: "2024-02-15",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=steam"
  },
  {
    name: "Gear Assembly",
    category: "Mechanical",
    date: "2024-02-10",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gear"
  },
  {
    name: "Hydraulic System",
    category: "Fluid Mechanics",
    date: "2024-02-05",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=hydraulic"
  }
]

// Mock data for point transactions
const pointTransactions = [
  {
    id: 1,
    type: 'earned',
    amount: 500,
    description: 'Model "Steam Engine" was downloaded 5 times',
    date: '2024-02-15'
  },
  {
    id: 2,
    type: 'spent',
    amount: 200,
    description: 'Downloaded premium model "Advanced Gearbox"',
    date: '2024-02-14'
  },
  {
    id: 3,
    type: 'earned',
    amount: 1000,
    description: 'Bounty completed: Complex Pump Design',
    date: '2024-02-13'
  },
  {
    id: 4,
    type: 'earned',
    amount: 300,
    description: 'Received 10 likes on your models',
    date: '2024-02-12'
  },
  {
    id: 5,
    type: 'spent',
    amount: 500,
    description: 'Created new bounty request',
    date: '2024-02-11'
  }
]

// Mock data for detailed statistics
const detailedStats = [
  {
    title: 'Total Downloads',
    value: '1.2k',
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: 'Active Models',
    value: '28',
    change: '+3',
    changeType: 'positive'
  },
  {
    title: 'Completion Rate',
    value: '94%',
    change: '+2.5%',
    changeType: 'positive'
  },
  {
    title: 'Total Points',
    value: '15.5k',
    change: '+2.1k',
    changeType: 'positive'
  },
  {
    title: 'Avg. Response Time',
    value: '2.3d',
    change: '-0.5d',
    changeType: 'positive'
  },
  {
    title: 'Success Rate',
    value: '98%',
    change: '+1%',
    changeType: 'positive'
  }
]

// Mock activity data for the grid
const generateActivityData = () => {
  const data = []
  const today = new Date()
  const totalWeeks = 53
  const totalDays = totalWeeks * 7

  // Calculate the start date (totalDays ago from today)
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - totalDays + 1)

  // Generate activity data for each day
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    data.push({
      date: currentDate,
      count: Math.floor(Math.random() * 5) // Random activity count
    })
  }

  return data
}

const activityData = generateActivityData()

export default function ProfilePage() {
  const { data: session } = useSession()

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
            <img
              src={session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.name}`}
              alt={session.user?.name || "Profile"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{session.user?.name}</h1>
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

        {/* Statistics & Transactions */}
        <section className="mb-12">
          <Tabs defaultValue="statistics" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="statistics" className="flex items-center gap-2">
                <IconChartBar className="h-4 w-4" />
                Detailed Statistics
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <IconHistory className="h-4 w-4" />
                Point History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="statistics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedStats.map((stat, index) => (
                  <Card key={stat.title} className="bg-background/50 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-gray-400">{stat.title}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <div className={`flex items-center gap-1 text-sm ${
                            stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.changeType === 'positive' ? (
                              <IconArrowUpRight className="h-4 w-4" />
                            ) : (
                              <IconArrowDownRight className="h-4 w-4" />
                            )}
                            {stat.change}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <Card className="bg-background/50 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {pointTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'earned' ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}>
                            {transaction.type === 'earned' ? (
                              <IconArrowUpRight className={`h-4 w-4 ${
                                transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'
                              }`} />
                            ) : (
                              <IconArrowDownRight className={`h-4 w-4 ${
                                transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'
                              }`} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className={`font-semibold ${
                          transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Downloaded Models */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recently Downloaded Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadedModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/50 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-white/5">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle>{model.name}</CardTitle>
                    <CardDescription>
                      {model.category} • {new Date(model.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
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
        <section>
          <h2 className="text-2xl font-bold mb-6">Activity</h2>
          <Card className="bg-background/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="flex flex-col gap-[11px] text-xs text-gray-400 pt-8">
                  {weekDays.map(day => (
                    <span key={day} className="h-3 text-right">{day}</span>
                  ))}
                </div>
                <div>
                  <div className="grid auto-rows-[12px] grid-flow-col gap-1 overflow-hidden">
                    {activityData.map((day, index) => {
                      const dayOfWeek = day.date.getDay()
                      return (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-sm cursor-pointer transition-colors hover:opacity-80"
                          style={{
                            backgroundColor: day.count > 0 
                              ? `rgba(99, 102, 241, ${0.2 + (day.count / 5) * 0.8})`
                              : 'rgba(255, 255, 255, 0.1)',
                            gridRow: dayOfWeek + 1
                          }}
                          title={`${day.count} activities on ${day.date.toLocaleDateString()}`}
                        />
                      )
                    })}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-sm bg-white/10" />
                      <div className="w-3 h-3 rounded-sm bg-indigo-500/20" />
                      <div className="w-3 h-3 rounded-sm bg-indigo-500/40" />
                      <div className="w-3 h-3 rounded-sm bg-indigo-500/60" />
                      <div className="w-3 h-3 rounded-sm bg-indigo-500/80" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 