"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      router.push("/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-light text-[#C9A23F] mb-2 tracking-wider">PRYMA</h1>
          <div className="w-24 h-0.5 bg-[#C9A23F] mx-auto"></div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl text-white font-light">Welcome back, Dario.</h2>
          <p className="text-gray-400 text-lg">Book your next premium session.</p>
        </div>
      </div>

      <div className="absolute bottom-8">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#C9A23F] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#C9A23F] rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-[#C9A23F] rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}
