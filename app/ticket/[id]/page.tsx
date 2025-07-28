"use client"

import { useParams, useRouter } from "next/navigation"
import { QrCode, MapPin, Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { sessionsData } from "@/data/sessionsData"

export default function TicketPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = Number.parseInt(params.id as string)
  const session = sessionsData.find((s) => s.session_id === sessionId)

  if (!session) {
    return <div>Session not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-[#C9A23F] text-black p-6 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-light mb-2">Your session is booked, Dario.</h1>
        <p className="text-black/80">Ticket added to Apple Wallet</p>
      </div>

      <div className="p-6">
        {/* Digital Ticket */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-black text-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-light">PRYMA</h2>
                <p className="text-[#C9A23F] text-sm">Premium Session</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Booking ID</p>
                <p className="font-mono text-sm">PRM-{sessionId.toString().padStart(4, "0")}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="font-medium mb-2">{session.title}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C9A23F]" />
                  <span>Tomorrow, July 28</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A23F]" />
                  <span>10:00 AM</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-[#C9A23F]" />
                  <span>{session.city} Premium Training Center</span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 bg-white">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 mx-auto mb-4 flex items-center justify-center rounded-lg">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Show this QR code at the facility</p>
            </div>
          </CardContent>
        </Card>

        {/* Session Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Session Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Coach</span>
                <span>Premium Instructor</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span>60 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Equipment</span>
                <span>Provided</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cancellation</span>
                <span>Free until 2 hours before</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            Add to Apple Wallet
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            Get Directions
          </Button>

          <Button className="w-full bg-[#C9A23F] hover:bg-[#B8921C] text-black" onClick={() => router.push("/home")}>
            Back to Home
          </Button>
        </div>

        {/* Post-session prompt */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-3">After your session, we'd love your feedback</p>
          <Button variant="outline" size="sm" onClick={() => router.push(`/review/${sessionId}`)}>
            Leave a Review
          </Button>
        </div>
      </div>
    </div>
  )
}
