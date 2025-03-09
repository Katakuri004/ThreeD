"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy data for the user's uploads
const userUploads = [
  {
    id: 1,
    title: "Industrial Robot Arm",
    description: "A fully articulated robotic arm design with 6 degrees of freedom",
    date: "March 7, 2024",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    title: "Electric Vehicle Chassis",
    description: "Lightweight and aerodynamic EV chassis design optimized for efficiency",
    date: "March 6, 2024",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    title: "Smart Home IoT Hub",
    description: "Compact and modern IoT hub design with integrated cooling",
    date: "March 5, 2024",
    gradient: "from-pink-500 to-rose-500"
  }
]

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="h-64 bg-gradient-to-r from-violet-600 to-purple-600 relative">
        <div className="absolute left-0 right-0 bottom-0 px-4 md:px-8 pb-4 pt-20 bg-gradient-to-t from-black/50 to-transparent">
          <div className="container mx-auto flex items-end gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-[3px] shrink-0">
              <div className="w-full h-full rounded-full bg-white dark:bg-black overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix&backgroundColor=transparent"
                  alt="Profile"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-white mb-1">Sarah Chen</h1>
              <p className="text-violet-200">Joined December 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Uploads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">1.2k</h3>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User's Uploads */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userUploads.map((model) => (
              <Card key={model.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`aspect-[4/3] bg-gradient-to-br ${model.gradient} group-hover:scale-105 transition-transform duration-300`} />
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{model.title}</CardTitle>
                  <CardDescription className="text-sm">{model.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {model.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 