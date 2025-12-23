'use client'

import { useEffect, useState } from 'react'

export default function SnowEffect() {
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; animationDuration: string; opacity: number }>>([])

    useEffect(() => {
        const count = 50
        const newSnowflakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 10}s`, // 10-13s
            opacity: Math.random(),
        }))
        setSnowflakes(newSnowflakes)
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="fixed top-[-10px] rounded-full bg-white blur-[1px]"
                    style={{
                        left: flake.left,
                        width: '8px',
                        height: '8px',
                        opacity: flake.opacity * 0.7,
                        animation: `fall ${flake.animationDuration} linear infinite`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(20px);
          }
        }
      `}</style>
        </div>
    )
}
