"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sessionsData } from "@/data/sessionsData"

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = Number.parseInt(params.id as string)
  const session = sessionsData.find((s) => s.session_id === sessionId)

  const [selectedDate, setSelectedDate] = useState("Tomorrow, July 28")
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)

  if (!session) {
    return <div>Session not found</div>
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(2)
  }

  const handlePayment = () => {
    // Mock Apple Pay flow
    setTimeout(() => {
      router.push(`/ticket/${session.session_id}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-medium">Book Session</h1>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={session.images[0] || "/placeholder.svg"}
            alt={session.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-medium">{session.title}</h2>
            <p className="text-sm text-gray-600">
              {session.city} • ${Math.round(session.price)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <>
            {/* Date Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start bg-[#C9A23F]/10 border-[#C9A23F]">
                  {selectedDate}
                </Button>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {session.availability.map((time, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="py-6 bg-transparent"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {step === 2 && (
          <>
            {/* Booking Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span>{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>60 minutes</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${Math.round(session.price)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Pay</span>
                    </div>
                    <span>Apple Pay</span>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-[#C9A23F] hover:bg-[#B8921C] text-black font-medium py-6 text-lg"
              onClick={handlePayment}
            >
              Confirm & Pay ${Math.round(session.price)}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
