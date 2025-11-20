'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Sliders } from 'lucide-react';

export default function TimerUI() {
    // Mock state for visual demonstration
    const progress = 0.75; // 75% remaining
    const time = "25:00";

    const circleVariants = {
        initial: { strokeDashoffset: 283 },
        animate: { strokeDashoffset: 283 * (1 - progress) }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative">
            {/* Top Pill - Focus Mode */}
            <div className="absolute top-0 mt-4 glass-panel px-4 py-1.5 rounded-full text-xs font-medium text-white/50 tracking-widest uppercase z-20">
                Focus Mode
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
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-white/10"
                        />
                        {/* Progress Indicator with Neon Glow */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                            strokeDasharray="283" // 2 * pi * 45
                            initial="initial"
                            animate="animate"
                            variants={circleVariants}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>

                    {/* Time Display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="font-mono tabular-nums text-7xl md:text-8xl font-bold tracking-tighter text-white select-none drop-shadow-lg">
                            {time}
                        </h1>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-8 shrink-0">
                    {/* Reset Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-button p-4 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Reset Timer"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </motion.button>

                    {/* Play Button (Hero Element) */}
                    <motion.button
                        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group p-8 rounded-[2rem] bg-white text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all duration-300"
                        aria-label="Start Timer"
                    >
                        {/* Light Source Gradient */}
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white via-gray-100 to-gray-300 opacity-100" />

                        {/* Inner Highlight for Tactile Feel */}
                        <div className="absolute inset-[1px] rounded-[2rem] bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

                        <Play className="relative z-10 w-10 h-10 fill-black ml-1" />
                    </motion.button>

                    {/* Settings/Mode Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
