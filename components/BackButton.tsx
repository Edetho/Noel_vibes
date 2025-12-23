'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="fixed left-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 active:scale-95 shadow-lg group"
            title="Retour"
        >
            <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>
    )
}
