'use client'

import { useEffect, useState } from 'react'

interface FloatingWatermarkProps {
    name?: string
}

export default function FloatingWatermark({ name }: FloatingWatermarkProps) {
    const [renderName, setRenderName] = useState<string>('')
    const [instances, setInstances] = useState<Array<{ id: number; top: string; left: string; delay: string; duration: string; size: string }>>([])

    useEffect(() => {
        // Try to get name from localStorage if not provided
        const storedName = name || localStorage.getItem('userName') || ''
        if (storedName) {
            setRenderName(storedName)

            // Create drifting instances
            const newInstances = Array.from({ length: 5 }).map((_, i) => ({
                id: i,
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                delay: `${i * 2}s`,
                duration: `${25 + Math.random() * 15}s`,
                size: `${1.5 + Math.random() * 2}rem`,
            }))
            setInstances(newInstances)
        }
    }, [name])

    if (!renderName) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
            {instances.map((inst) => (
                <div
                    key={inst.id}
                    className="absolute font-mountains text-white whitespace-nowrap opacity-[0.03]"
                    style={{
                        top: inst.top,
                        left: inst.left,
                        fontSize: inst.size,
                        animation: `float ${inst.duration} linear infinite ${inst.delay}`,
                    }}
                >
                    {renderName}
                </div>
            ))}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.03;
                    }
                    50% {
                        transform: translate(100px, -50px) rotate(5deg);
                        opacity: 0.05;
                    }
                    90% {
                        opacity: 0.03;
                    }
                    100% {
                        transform: translate(200px, -100px) rotate(10deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}
