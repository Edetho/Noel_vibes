import type { Metadata } from 'next'
import { Outfit, Mountains_of_Christmas } from 'next/font/google'
import './globals.css'
import MusicPlayer from '@/components/MusicPlayer'
import SnowEffect from '@/components/SnowEffect'
import Sparkles from '@/components/Sparkles'
import FloatingWatermark from '@/components/FloatingWatermark'

export const metadata: Metadata = {
  title: 'Noël Magique 🎄',
  description: 'Vœux de Noël personnalisés avec musique et animations',
  authors: [{ name: 'Prosper' }],
}

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const mountains = Mountains_of_Christmas({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mountains',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${mountains.variable}`}>
      <body className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">
        {/* Snow and Sparkles animations */}
        <SnowEffect />
        <Sparkles />
        <FloatingWatermark />

        {/* Main content */}
        {children}

        {/* Global music player */}
        <MusicPlayer />
      </body>
    </html>
  )
}
