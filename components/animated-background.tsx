"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [gradientPosition, setGradientPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed inset-0 transition-all duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(${gradientPosition}deg, 
          #f8fafc 0%, 
          #e2e8f0 25%, 
          #cbd5e1 50%, 
          #94a3b8 75%, 
          #64748b 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  )
}
