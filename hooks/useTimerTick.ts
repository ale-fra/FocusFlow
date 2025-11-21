import { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';

export const useTimerTick = () => {
    const { timeLeft, isActive, tick } = useTimerStore();

    // Effect 1: Ticking
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, tick]);

    // Effect 2: Completion
    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            console.log("Timer finished! Play sound here.");
            tick(); // Ensure store updates isActive to false
        }
    }, [timeLeft, isActive, tick]);

    useEffect(() => {
        const formatTime = (seconds: number) => {
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        if (isActive) {
            document.title = `(${formatTime(timeLeft)}) FocusFlow`;
        } else {
            document.title = 'FocusFlow';
        }
    }, [timeLeft, isActive]);
};
