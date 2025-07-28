"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { sessionsData } from "@/data/sessionsData"

export async function generateStaticParams() {
  // Generate static params for all session IDs (1-330)
  const params = []
  for (let i = 1; i <= 330; i++) {
    params.push({ id: i.toString() })
  }
  return params
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const sessionId = Number.parseInt(params.id as string)
  const session = sessionsData.find((s) => s.session_id === sessionId)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  if (!session) {
    return <div>Session not found</div>
  }

  const handleSubmit = () => {
    // Mock review submission
    setTimeout(() => {
      router.push("/home")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-medium">Leave a Review</h1>
        </div>
      </div>

      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How was your session with {session.title.split(" - ")[0]}?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Tap to rate</p>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-colors">
                    <Star
                      className={`w-10 h-10 ${star <= rating ? "fill-[#C9A23F] text-[#C9A23F]" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-lg font-medium text-[#C9A23F]">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                      ? "Great!"
                      : rating === 3
                        ? "Good!"
                        : rating === 2
                          ? "Fair"
                          : "Poor"}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-2">Tell us about your experience (optional)</label>
              <Textarea
                placeholder="Share your thoughts about the session, coach, and facility..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            className="w-full bg-[#C9A23F] hover:bg-[#B8921C] text-black font-medium py-6 text-lg"
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit & Done
          </Button>

          <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/home")}>
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  )
}
