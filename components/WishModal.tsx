'use client'

import React, { useEffect, useState } from 'react'

interface WishModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    body: string
    recipientName: string
}

export default function WishModal({ isOpen, onClose, title, body, recipientName }: WishModalProps) {
    const [visible, setVisible] = useState(false)
    const [replied, setReplied] = useState<string | null>(null)

    useEffect(() => {
        if (isOpen) {
            setVisible(true)
            document.body.style.overflow = 'hidden'
            setReplied(null)
        } else {
            const timer = setTimeout(() => setVisible(false), 300)
            document.body.style.overflow = 'unset'
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!visible && !isOpen) return null

    const quickReplies = ["Merci ! 🙏", "C'est gentil ! ❤️", "Joyeux Noël ! 🎄", "Wow ! ✨"]

    const formattedBody = body.replace('{name}', recipientName).split('\n').map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ))

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`
                    relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-gray-900/95 text-white shadow-2xl transition-all duration-300
                    ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}
                `}
            >
                {/* Decorative header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 p-6 text-center">
                    <h2 className="font-display text-3xl font-bold tracking-wide text-white drop-shadow-md">
                        {title}
                    </h2>
                </div>

                {/* Body */}
                <div className="p-8 pb-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                        <p className="font-sans text-lg font-light leading-relaxed text-white/90">
                            {formattedBody}
                        </p>
                    </div>
                </div>

                {/* Reply Section */}
                <div className="px-8 pb-8 pt-2">
                    {replied ? (
                        <div className="flex flex-col items-center justify-center py-4 bg-green-500/10 rounded-xl border border-green-500/20">
                            <span className="text-2xl mb-1">✅</span>
                            <span className="text-sm font-bold text-green-400 uppercase tracking-widest">
                                Réponse "{replied}" Envoyée !
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                                <span className="h-px flex-1 bg-white/10"></span>
                                <span>Envoyer une réponse</span>
                                <span className="h-px flex-1 bg-white/10"></span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => setReplied(reply)}
                                        className="py-2 text-sm rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-[1.03] active:scale-95 transition-all"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Close */}
                <div className="flex justify-center p-6 pt-0">
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/5 border border-white/10 px-8 py-2 text-xs font-semibold uppercase tracking-widest transition hover:bg-white/10 active:scale-95 text-white/60"
                    >
                        Fermer la Lettre
                    </button>
                </div>
            </div>
        </div>
    )
}
