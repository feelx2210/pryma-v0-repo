"use client"

import { useState } from "react"
import { MapPin, Star, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { sessionsData } from "@/data/sessionsData"
import MapView from "@/components/MapView"
import { Button } from "@/components/ui/button"

const cities = [
  "Dallas",
  "Miami",
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "San Diego",
  "Austin",
  "Seattle",
  "Portland",
  "Denver",
]

const categories = [
  "Yoga",
  "Pilates",
  "Tennis",
  "Personal Training",
  "Boxing",
  "Dance",
  "Swimming",
  "Martial Arts",
  "HIIT",
  "CrossFit",
]

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("Miami")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sessions, setSessions] = useState(sessionsData)
  const router = useRouter()

  const filteredSessions = sessions.filter((session) => {
    const cityMatch = session.city === selectedCity
    const categoryMatch = !selectedCategory || session.category === selectedCategory
    return cityMatch && categoryMatch
  })

  const handleSessionSelect = (sessionId: number) => {
    router.push(`/session/${sessionId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-light">Hi Dario, train anywhere.</h1>
            <div className="flex items-center mt-2 text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{selectedCity}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#C9A23F] text-sm">Premium Member</div>
            <div className="text-xs text-gray-400">Active</div>
          </div>
        </div>

        {/* City Selector */}
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Near Me Button */}
        <Button
          variant="outline"
          className="w-full mt-3 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // For demo, we'll just show Miami as the closest city
                  setSelectedCity("Miami")
                },
                (error) => {
                  console.log("Location access denied")
                },
              )
            }
          }}
        >
          📍 Find Sessions Near Me
        </Button>
      </div>

      {/* Real Map View */}
      <div className="p-6 pb-0">
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Sessions in {selectedCity}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tap any golden marker to see session details • {filteredSessions.length} premium sessions available
          </p>
        </div>
        <MapView city={selectedCity} sessions={filteredSessions} onSessionSelect={handleSessionSelect} />
      </div>

      {/* Filters */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Available Sessions</h2>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <Badge
            variant={!selectedCategory ? "default" : "outline"}
            className={`whitespace-nowrap cursor-pointer ${!selectedCategory ? "bg-[#C9A23F] text-black" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`whitespace-nowrap cursor-pointer ${selectedCategory === category ? "bg-[#C9A23F] text-black" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Session Cards */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <Link key={session.session_id} href={`/session/${session.session_id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                      <img
                        src={session.images[0] || "/placeholder.svg"}
                        alt={session.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm leading-tight">{session.title}</h3>
                        <div className="text-right ml-2">
                          <div className="text-lg font-semibold">${Math.round(session.price)}</div>
                          <div className="text-xs text-gray-500">per session</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-[#C9A23F] text-[#C9A23F]" />
                          <span className="text-sm ml-1">{session.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({session.reviews_count} reviews)</span>
                        <Badge variant="outline" className="text-xs">
                          {session.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{session.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
