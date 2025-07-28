"use client"

import { useEffect, useRef, useState } from "react"

interface MapViewProps {
  city: string
  sessions: Array<{
    session_id: number
    title: string
    city: string
    category: string
    price: number
    rating: number
    latitude?: number
    longitude?: number
  }>
  onSessionSelect?: (sessionId: number) => void
}

// City coordinates for map centering
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Dallas: { lat: 32.7767, lng: -96.797 },
  Miami: { lat: 25.7617, lng: -80.1918 },
  "New York": { lat: 40.7128, lng: -74.006 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "San Diego": { lat: 32.7157, lng: -117.1611 },
  Austin: { lat: 30.2672, lng: -97.7431 },
  Seattle: { lat: 47.6062, lng: -122.3321 },
  Portland: { lat: 45.5152, lng: -122.6784 },
  Denver: { lat: 39.7392, lng: -104.9903 },
}

export default function MapView({ city, sessions, onSessionSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const infoWindowRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setMapError(true)
      document.head.appendChild(script)
    } else if ((window as any).google) {
      setIsLoaded(true)
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !(window as any).google) return

    const cityCoord = cityCoordinates[city] || { lat: 40.7128, lng: -74.006 }

    try {
      const google = (window as any).google
      const map = new google.maps.Map(mapRef.current, {
        center: cityCoord,
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f8f9fa" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#e3f2fd" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      })

      mapInstanceRef.current = map

      // Create single info window to reuse
      infoWindowRef.current = new google.maps.InfoWindow()
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError(true)
    }
  }, [isLoaded, city])

  // Add markers for sessions
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !infoWindowRef.current) return

    const google = (window as any).google
    if (!google) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    const cityCoord = cityCoordinates[city] || { lat: 40.7128, lng: -74.006 }

    // Generate consistent positions for sessions based on their ID
    sessions.forEach((session) => {
      // Use session ID to generate consistent but pseudo-random positions
      const seed = session.session_id * 1000
      const offsetLat = ((seed % 100) / 100 - 0.5) * 0.08 // Consistent offset within ~4km
      const offsetLng = (((seed * 7) % 100) / 100 - 0.5) * 0.08

      const marker = new google.maps.Marker({
        position: {
          lat: cityCoord.lat + offsetLat,
          lng: cityCoord.lng + offsetLng,
        },
        map: mapInstanceRef.current,
        title: session.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#C9A23F",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
        animation: google.maps.Animation.DROP,
      })

      // Add click listener
      marker.addListener("click", () => {
        // Close any open info window
        if (infoWindowRef.current) {
          infoWindowRef.current.close()
        }

        // Create info window content
        const content = `
          <div style="padding: 12px; max-width: 250px; font-family: Inter, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${session.title}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 12px; font-size: 12px; color: #6b7280;">${session.category}</span>
              <span style="font-size: 12px; color: #6b7280;">★ ${session.rating}</span>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #C9A23F;">$${Math.round(session.price)}</p>
            <button 
              onclick="window.selectSession(${session.session_id})" 
              style="
                background: #C9A23F; 
                color: black; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 6px; 
                font-size: 14px; 
                font-weight: 600; 
                cursor: pointer;
                width: 100%;
              "
            >
              View Details
            </button>
          </div>
        `

        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(content)
          infoWindowRef.current.open(mapInstanceRef.current, marker)
        }
      })

      markersRef.current.push(marker)
    })

    // Add global function for info window button clicks
    ;(window as any).selectSession = (sessionId: number) => {
      if (onSessionSelect) {
        onSessionSelect(sessionId)
      }
    }
  }, [sessions, city, isLoaded, onSessionSelect])

  if (mapError) {
    return (
      <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-gray-400 mb-2">⚠️</div>
          <p className="text-gray-600 text-sm">Unable to load map</p>
          <p className="text-gray-500 text-xs">Check your API key configuration</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A23F] mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
          <p className="text-gray-500 text-xs">Finding sessions in {city}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="h-64 w-full rounded-lg shadow-sm border border-gray-200" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
        {sessions.length} sessions
      </div>
    </div>
  )
}
