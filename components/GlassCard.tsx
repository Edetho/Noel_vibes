import { ReactNode } from 'react'

interface GlassCardProps {
    children: ReactNode
    className?: string
    hoverEffect?: boolean
    style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', hoverEffect = false, style }: GlassCardProps) {
    return (
        <div
            className={`
        relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md transition-all duration-500
        ${hoverEffect ? 'hover:scale-[1.02] hover:bg-white/15 hover:shadow-red-500/10' : ''}
        ${className}
      `}
            style={style}
        >
            {/* Subtle shimmer gradient overlay */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

            {children}
        </div>
    )
}
