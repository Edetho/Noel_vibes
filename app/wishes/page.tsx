'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { wishes } from '@/lib/wishes'
import GlassCard from '@/components/GlassCard'
import WishModal from '@/components/WishModal'

export default function WishesPage() {
    const [name, setName] = useState('')
    const [selectedWish, setSelectedWish] = useState<number | null>(null)
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
        <main className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden font-sans pb-20">
            {/* Background */}
            <div
                className="fixed inset-0 bg-cover bg-center z-0 scale-105"
                style={{
                    backgroundImage: "url('/images/christmas-door.jpg')",
                    animation: 'slowZoom 30s infinite alternate ease-in-out'
                }}
            />

            {/* Overlay */}
            <div className="fixed inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div className="relative z-10 min-h-screen px-4 py-12 text-white flex flex-col items-center">
                <div className="w-full max-w-4xl animate-enter">
                    <header className="mb-12 text-center">
                        <div className="mb-2 text-red-300 text-sm font-bold tracking-[0.2em] uppercase">
                            For You
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            Magical Wishes
                        </h1>
                        <p className="mt-4 text-white/70 max-w-lg mx-auto">
                            Tap on a card to reveal the special message waiting for you inside.
                        </p>
                    </header>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                        {wishes.map((wish, index) => (
                            <div key={index} onClick={() => setSelectedWish(index)} className="cursor-pointer group perspective-1000">
                                <GlassCard
                                    className={`
                                        h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,0,0,0.3)]
                                        flex flex-col justify-between animate-fade-in-up
                                    `}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                    hoverEffect
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-xl backdrop-blur-sm border border-red-500/30">
                                            🎁
                                        </div>
                                        <h2 className="text-xl font-bold text-red-100 group-hover:text-white transition-colors">
                                            {wish.title}
                                        </h2>
                                    </div>
                                    <p className="text-white/60 line-clamp-3 text-sm italic">
                                        "{wish.body.replace('{name}', name).substring(0, 80)}..."
                                    </p>
                                    <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-red-400 group-hover:text-red-300">
                                        Read Letter <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                </GlassCard>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => router.push('/send')}
                            className="bg-gradient-to-r from-red-700 to-red-900 border border-white/10 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white"
                        >
                            📩 Send Custom Wishes
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <WishModal
                isOpen={selectedWish !== null}
                onClose={() => setSelectedWish(null)}
                title={selectedWish !== null ? wishes[selectedWish].title : ''}
                body={selectedWish !== null ? wishes[selectedWish].body : ''}
                recipientName={name}
            />

            <style jsx>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-enter {
                    animation: enter 0.8s ease-out backwards;
                }
                @keyframes enter {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    )
}
