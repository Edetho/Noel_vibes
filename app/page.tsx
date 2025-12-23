'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (!name.trim()) return
    localStorage.setItem('userName', name.trim())
    router.push('/welcome')
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{
          backgroundImage: "url('/images/christmas-door.jpg')",
          animation: 'slowZoom 20s infinite alternate ease-in-out'
        }}
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center text-white">

        {/* Glassmorphism Card */}
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md animate-enter">

          {/* Logo / Title */}
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-2 text-red-400 text-xs font-bold tracking-[0.2em] uppercase drop-shadow-sm">
              🎁 Festive Wishes
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight drop-shadow-lg bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent transform transition-all duration-700 hover:scale-105">
              Noël Magique
            </h1>
          </div>

          <p className="mb-8 text-lg text-white/90 drop-shadow-md font-light">
            Enter your name to unlock the magic...
          </p>

          {/* Form */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <input
              type="text"
              placeholder="Your name..."
              className="w-full rounded-xl bg-white/10 border border-white/30 px-6 py-4 text-center text-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white/20 transition-all duration-300 shadow-inner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <button
              onClick={handleSubmit}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-800 py-4 text-lg font-bold text-white shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] hover:shadow-red-500/40 active:scale-95"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
              <span className="relative z-20 flex items-center justify-center gap-2">
                Discover the Magic ✨
              </span>
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-xs text-white/50 font-light tracking-wider">
            Designed with ❤️ for Christmas
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-enter {
          animation: enter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
        }
        @keyframes enter {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </main>
  )
}
