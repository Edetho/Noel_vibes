'use client'

import { useEffect, useState } from 'react'

const starCount = 60 // Increased density

export default function Sparkles() {
  const [stars, setStars] = useState<Array<{ id: number; top: string; left: string; delay: string; duration: string; size: string; color: string; blur: string }>>([])

  useEffect(() => {
    const colors = [
      '#ffffff', // White
      '#fde047', // Gold
      '#fefce8', // Soft Yellow
      '#fecaca', // Soft Red
      '#99f6e4', // Soft Teal/Ice
      '#fcd34d'  // Amber
    ]
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 5 + 3}s`,
      size: `${Math.random() * 3 + 1}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() > 0.8 ? '1px' : '0.5px',
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Background Glow - Magical Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.15),transparent_60%)] animate-magical-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.1),transparent_50%)] animate-magical-pulse-reverse" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            filter: `blur(${star.blur})`,
            boxShadow: `0 0 ${parseInt(star.size) * 3}px ${star.color}`,
            animation: `twinkle ${star.duration} ease-in-out infinite ${star.delay}`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { 
                        opacity: 0; 
                        transform: scale(0.3) rotate(0deg); 
                    }
                    50% { 
                        opacity: 0.9; 
                        transform: scale(1.1) rotate(180deg);
                    }
                }
                .animate-magical-pulse {
                    animation: magical-pulse 12s ease-in-out infinite;
                }
                .animate-magical-pulse-reverse {
                    animation: magical-pulse 15s ease-in-out infinite reverse;
                }
                @keyframes magical-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
            `}</style>
    </div>
  )
}
