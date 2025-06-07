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
          #667eea 0%, 
          #764ba2 25%, 
          #f093fb 50%, 
          #f5576c 75%, 
          #4facfe 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  )
}
