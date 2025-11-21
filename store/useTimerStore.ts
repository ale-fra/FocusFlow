import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerState {
    timeLeft: number;
    isActive: boolean;
    mode: TimerMode;
    cycles: number;

    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: TimerMode) => void;
    tick: () => void;
    completeTimer: () => void;
    incrementCycles: () => void;
}

export const DURATIONS: Record<TimerMode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export const useTimerStore = create<TimerState>()(
    persist(
        (set, get) => ({
            timeLeft: DURATIONS.focus,
            isActive: false,
            mode: 'focus',
            cycles: 0,

            startTimer: () => set({ isActive: true }),
            pauseTimer: () => set({ isActive: false }),
            resetTimer: () => {
                const { mode } = get();
                set({ timeLeft: DURATIONS[mode], isActive: false });
            },
            setMode: (mode) => {
                set({ mode, timeLeft: DURATIONS[mode], isActive: false });
            },
            tick: () => {
                const { timeLeft, isActive } = get();
                if (isActive && timeLeft > 0) {
                    set({ timeLeft: timeLeft - 1 });
                }
            },
            completeTimer: () => {
                set((state) => ({
                    isActive: false,
                    timeLeft: DURATIONS[state.mode],
                    cycles: state.cycles + 1,
                }));
            },
            incrementCycles: () => set((state) => ({ cycles: state.cycles + 1 })),
        }),
        {
            name: 'timer-storage',
        }
    )
);
