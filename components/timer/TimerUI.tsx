'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Sliders } from 'lucide-react';
import { useTimerStore, TimerMode, DURATIONS } from '@/store/useTimerStore';
import { useTimerTick } from '@/hooks/useTimerTick';

export default function TimerUI() {
    useTimerTick();
    const { timeLeft, isActive, mode, startTimer, pauseTimer, resetTimer, setMode } = useTimerStore();

    const RADIUS = 45;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    const totalTime = DURATIONS[mode];
    const progress = timeLeft / totalTime;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const circleVariants = {
        initial: { strokeDashoffset: CIRCUMFERENCE },
        animate: { strokeDashoffset: CIRCUMFERENCE * (1 - progress) }
    };

    const modes: { id: TimerMode; label: string }[] = [
        { id: 'focus', label: 'Focus' },
        { id: 'shortBreak', label: 'Short Break' },
        { id: 'longBreak', label: 'Long Break' },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative">
            {/* Top Pill - Mode Switcher */}
            <div className="absolute top-0 mt-4 glass-panel p-1 rounded-full flex items-center gap-1 z-20">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${mode === m.id
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Central Grouping Container */}
            <div className="flex flex-col items-center gap-10 md:gap-14 w-full max-h-full py-4 justify-center">

                {/* Timer Ring - Responsive & Constrained */}
                <div className="relative w-full max-w-[300px] md:max-w-[420px] aspect-square flex items-center justify-center shrink-1 min-h-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Background Track */}
                        <circle
                            cx="50"
                            cy="50"
                            r={RADIUS}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-white/10"
                        />
                        {/* Progress Indicator with Neon Glow */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r={RADIUS}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                            strokeDasharray={CIRCUMFERENCE} // 2 * pi * 45
                            initial="initial"
                            animate="animate"
                            variants={circleVariants}
                            transition={{ duration: 1, ease: "linear" }} // Changed to linear for smooth ticking
                        />
                    </svg>

                    {/* Time Display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="font-mono tabular-nums text-7xl md:text-8xl font-bold tracking-tighter text-white select-none drop-shadow-lg">
                            {formatTime(timeLeft)}
                        </h1>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-8 shrink-0">
                    {/* Reset Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetTimer}
                        className="glass-button p-4 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Reset Timer"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </motion.button>

                    {/* Play/Pause Button (Hero Element) */}
                    <motion.button
                        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isActive ? pauseTimer : startTimer}
                        className="relative group p-8 rounded-[2rem] bg-white text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all duration-300"
                        aria-label={isActive ? "Pause Timer" : "Start Timer"}
                    >
                        {/* Light Source Gradient */}
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white via-gray-100 to-gray-300 opacity-100" />

                        {/* Inner Highlight for Tactile Feel */}
                        <div className="absolute inset-[1px] rounded-[2rem] bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

                        {isActive ? (
                            <Pause className="relative z-10 w-10 h-10 fill-black" />
                        ) : (
                            <Play className="relative z-10 w-10 h-10 fill-black ml-1" />
                        )}
                    </motion.button>

                    {/* Settings/Mode Button - Keeping for future settings, or could be removed if modes are enough */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => alert('Settings coming soon')}
                        className="glass-button p-4 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Timer Settings"
                    >
                        <Sliders className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

