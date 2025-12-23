'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GlassCard from '@/components/GlassCard'

export default function WelcomePage() {
    const [name, setName] = useState('')
    const router = useRouter()

    useEffect(() => {
        const storedName = localStorage.getItem('userName')
        if (!storedName) {
            router.push('/')
        } else {
            setName(storedName)
        }
    }, [router])

    return (
        <main className="relative min-h-screen w-full overflow-hidden font-sans">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                style={{
                    backgroundImage: "url('/images/christmas-door.jpg')",
                    animation: 'slowZoom 25s infinite alternate ease-in-out'
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-0" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
                <GlassCard className="max-w-md w-full animate-enter" hoverEffect>
                    {/* Title */}
                    <h1 className="mb-6 text-4xl md:text-5xl font-display font-bold leading-tight drop-shadow-lg text-red-100">
                        Welcome, {name} 🎄
                    </h1>

                    {/* Message */}
                    <p className="mb-8 text-lg font-light text-white/90 leading-relaxed">
                        May the melody and spirit of the holidays fill your home with love and peace. ✨
                    </p>

                    {/* CTA */}
                    <button
                        onClick={() => router.push('/wishes')}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-800 py-4 text-lg font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] hover:shadow-red-500/40 active:scale-95"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                        <span className="relative z-20">
                            🎁 View my wishes
                        </span>
                    </button>

                    <footer className="mt-6 text-xs text-white/40 font-light tracking-widest uppercase">
                        Season's Greetings
                    </footer>
                </GlassCard>
            </div>

            <style jsx>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-enter {
                    animation: enter 1s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
                }
                 @keyframes enter {
                    0% { opacity: 0; transform: translateY(30px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

            `}</style>
        </main>
    )
}
