'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { wishes } from '@/lib/wishes'
import GlassCard from '@/components/GlassCard'

export default function SendPage() {
    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const [phone, setPhone] = useState('')
    const [wishIndex, setWishIndex] = useState(0)
    const [isCustom, setIsCustom] = useState(false)
    const [customWish, setCustomWish] = useState('')
    const router = useRouter()

    useEffect(() => {
        const name = localStorage.getItem('userName')
        if (name) setSender(name)
    }, [])

    const generateLink = () => {
        if (!receiver || !sender) return
        if (isCustom && !customWish.trim()) return

        const messageObject = isCustom
            ? { title: "Custom Wish", body: customWish.trim() }
            : wishes[wishIndex]

        const wishData = {
            sender,
            receiver,
            message: messageObject,
            phone: phone.trim()
        }

        // Encode data for URL sharing (base64)
        const encodedData = btoa(encodeURIComponent(JSON.stringify(wishData)))

        // We still save to localStorage for the local preview, 
        // but the link will now contain the data
        const id = Date.now().toString()
        localStorage.setItem(`wish-${id}`, JSON.stringify(wishData))

        router.push(`/g/${id}?d=${encodedData}`)
    }

    return (
        <main className="relative min-h-screen w-full overflow-hidden font-sans">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                style={{
                    backgroundImage: "url('/images/media.webp')",
                    animation: 'slowZoom 40s infinite alternate ease-in-out'
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 text-white">
                <GlassCard className="w-full max-w-lg animate-enter">
                    <h1 className="text-3xl font-display font-bold text-center mb-2 text-red-200">
                        🎁 Spread the Joy
                    </h1>
                    <p className="text-center text-sm opacity-90 mb-8 font-light">
                        Create a personalized Christmas message to share with loved ones.
                    </p>

                    <div className="space-y-6">
                        {/* Sender */}
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider opacity-70 ml-1">From</label>
                            <input
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white/15 transition-all text-sm"
                                placeholder="Your Name"
                            />
                        </div>

                        {/* Receiver */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-wider opacity-70 ml-1">To (Recipient)</label>
                                <input
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white/15 transition-all text-sm"
                                    placeholder="Friend's Name"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-wider opacity-70 ml-1">Your WhatsApp (Optional)</label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white/15 transition-all text-sm"
                                    placeholder="+225 00000000"
                                />
                                <p className="text-[10px] opacity-40 ml-1 italic">To receive their reply notification</p>
                            </div>
                        </div>

                        {/* Wishes Toggle */}
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                            <button
                                onClick={() => setIsCustom(false)}
                                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${!isCustom ? 'bg-red-600 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                            >
                                Models
                            </button>
                            <button
                                onClick={() => setIsCustom(true)}
                                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${isCustom ? 'bg-red-600 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                            >
                                Personalize
                            </button>
                        </div>

                        {/* Wishes Input */}
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider opacity-70 ml-1">
                                {isCustom ? 'Your Custom Message' : 'Select a Wish'}
                            </label>

                            {isCustom ? (
                                <textarea
                                    value={customWish}
                                    onChange={(e) => setCustomWish(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white/15 transition-all text-sm resize-none"
                                    placeholder="Write your magical wish here..."
                                />
                            ) : (
                                <div className="relative">
                                    <select
                                        value={wishIndex}
                                        onChange={(e) => setWishIndex(Number(e.target.value))}
                                        className="w-full appearance-none rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white/15 transition-all cursor-pointer text-sm"
                                    >
                                        {wishes.map((wish, i) => (
                                            <option key={i} value={i} className="text-black bg-white">
                                                {wish.title}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-xs">
                                        ▼
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={generateLink}
                            disabled={!sender || !receiver || (isCustom && !customWish.trim())}
                            className="w-full mt-2 rounded-xl bg-gradient-to-r from-red-700 to-red-900 py-4 font-bold uppercase tracking-widest text-white shadow-lg hover:scale-[1.02] hover:shadow-red-500/30 disabled:opacity-50 disabled:hover:scale-100 transition-all text-sm"
                        >
                            🔗 React Magic Link
                        </button>
                    </div>
                </GlassCard>
            </div>

            <style jsx>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-enter {
                    animation: enter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
                }
                 @keyframes enter {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    )
}
