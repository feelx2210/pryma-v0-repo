"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sessionsData } from "@/data/sessionsData"

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = Number.parseInt(params.id as string)
  const session = sessionsData.find((s) => s.session_id === sessionId)

  if (!session) {
    return <div>Session not found</div>
  }

  const reviews = [
    {
      name: "Alexandra M.",
      rating: 5,
      comment: "Exceptional training experience. The coach was professional and the facility was pristine.",
      date: "2 days ago",
    },
    {
      name: "Marcus R.",
      rating: 5,
      comment: "Perfect for business travelers. Convenient booking and top-tier equipment.",
      date: "1 week ago",
    },
    {
      name: "Sofia L.",
      rating: 4,
      comment: "Great session, exactly what I needed during my stay in the city.",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <img src={session.images[0] || "/placeholder.svg"} alt={session.title} className="w-full h-64 object-cover" />
        <div className="absolute top-6 left-6">
          <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <Badge className="bg-[#C9A23F] text-black mb-2">{session.category}</Badge>
          <h1 className="text-2xl font-light text-white mb-1">{session.title}</h1>
          <div className="flex items-center text-white/80">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{session.city}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Rating and Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-[#C9A23F] text-[#C9A23F]" />
              <span className="text-lg font-semibold ml-1">{session.rating}</span>
            </div>
            <span className="text-gray-600">({session.reviews_count} reviews)</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold">${Math.round(session.price)}</div>
            <div className="text-sm text-gray-500">per session</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">About This Session</h2>
          <p className="text-gray-700 leading-relaxed">{session.description}</p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Premium {session.category.toLowerCase()} sessions with personalized plans. Designed for travelers &
            professionals seeking exceptional training experiences.
          </p>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Available Times</h2>
          <div className="grid grid-cols-3 gap-2">
            {session.availability.map((time, index) => (
              <Button key={index} variant="outline" className="text-sm bg-transparent">
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Directions */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Location</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{session.city} Premium Training Center</p>
                <p className="text-sm text-gray-600">Downtown {session.city}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const query = encodeURIComponent(`${session.city} Premium Training Center`)
                  window.open(`https://maps.google.com/maps?q=${query}`, "_blank")
                }}
              >
                Directions
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C9A23F] text-[#C9A23F]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          className="w-full bg-[#C9A23F] hover:bg-[#B8921C] text-black font-medium py-6 text-lg"
          onClick={() => router.push(`/booking/${session.session_id}`)}
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}
