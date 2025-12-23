'use client'

import { useRef, useState } from 'react'

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [playing, setPlaying] = useState(false)

    const toggle = () => {
        if (!audioRef.current) return
        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setPlaying(!playing)
    }

    return (
        <>
            <audio ref={audioRef} loop src="/music/christmas.mp3" />
            <button
                onClick={toggle}
                className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
                title={playing ? 'Pause Music' : 'Play Music'}
            >
                {playing ? '⏸️' : '🎵'}
            </button>
        </>
    )
}
