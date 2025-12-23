'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import FloatingWatermark from '@/components/FloatingWatermark'
import BackButton from '@/components/BackButton'
import GlassCard from '@/components/GlassCard'

export default function GeneratedWish() {
    const { id } = useParams()
    const searchParams = useSearchParams()
    const [data, setData] = useState<any>(null)

    const [replied, setReplied] = useState<string | null>(null)

    useEffect(() => {
        const encodedData = searchParams.get('d')
        if (encodedData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(atob(encodedData)))
                setData(decoded)
                return
            } catch (e) {
                console.error("Failed to decode wish data", e)
            }
        }

        const stored = localStorage.getItem(`wish-${id}`)
        if (stored) setData(JSON.parse(stored))
    }, [id, searchParams])

    if (!data) return null

    // Handle both old (string) and new (object) formats for backward compatibility
    const wishTitle = data.message.title || 'Special Wish'
    const wishBody = data.message.body || data.message

    const message = wishBody.replace('{name}', data.receiver)

    // Surprise teaser for sharing back
    const shareText = encodeURIComponent(
        `🎄 J'ai reçu un vœu magique ! Regarde ça... ✨\n${window.location.href}`
    )

    const quickReplies = ["Merci ! 🙏", "C'est gentil ! ❤️", "Joyeux Noël ! 🎄", "C'est adorable ! ✨"]

    const formattedMessage = message.split('\n').map((line: string, i: number) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ))

    return (
        <main className="relative min-h-screen w-full overflow-hidden font-sans">
            <BackButton />
            <FloatingWatermark name={data.receiver} />

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                style={{
                    backgroundImage: "url('/images/christmas-door.jpg')",
                    animation: 'slowZoom 30s infinite alternate ease-in-out'
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
                <GlassCard className="max-w-md w-full animate-enter" hoverEffect>
                    <div className="mb-4 text-5xl">🎄</div>

                    <h1 className="text-3xl font-display font-bold mb-2 text-red-100 drop-shadow-md">
                        {data.receiver}
                    </h1>
                    <h2 className="text-xl font-bold mb-6 text-yellow-200 uppercase tracking-widest text-[10px]">
                        Received: {wishTitle}
                    </h2>

                    <div className="mb-8 text-lg font-light leading-relaxed text-white/95 max-h-[40vh] overflow-y-auto custom-scrollbar p-2">
                        {formattedMessage}
                    </div>

                    <div className="mb-8 flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-white/60">
                        <span className="h-px w-8 bg-white/20"></span>
                        <span>From {data.sender}</span>
                        <span className="h-px w-8 bg-white/20"></span>
                    </div>

                    {/* Reply Section */}
                    <div className="mb-6">
                        {replied ? (
                            <div className="py-3 px-4 bg-green-500/10 rounded-xl border border-green-500/20 animate-enter">
                                <span className="text-sm font-bold text-green-400 uppercase tracking-widest">
                                    Réponse "{replied}" Envoyée ! ✅
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => {
                                            setReplied(reply)
                                            if (data.phone) {
                                                const text = encodeURIComponent(`🎄 ${data.receiver} a répondu à ton vœu magique : "${reply}"`)
                                                window.open(`https://wa.me/${data.phone}?text=${text}`, '_blank')
                                            }
                                        }}
                                        className="py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 transition-all"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <a
                        href={`https://wa.me/?text=${shareText}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20bd5a] py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                    >
                        <span>📲 Share on WhatsApp</span>
                    </a>
                </GlassCard>
            </div>

            <style jsx>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.15); }
                }
                .animate-enter {
                    animation: enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
                }
                 @keyframes enter {
                    0% { opacity: 0; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }
                 .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }
            `}</style>
        </main>
    )
}
