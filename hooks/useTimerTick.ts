import { useEffect } from 'react';
import { useTimerStore } from '../store/useTimerStore';

export const useTimerTick = () => {
    const { timeLeft, isActive, mode, tick } = useTimerStore();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Timer finished logic handled in store tick check or here
            // But store tick handles stopping it.
            // We can add sound playing here if we want to react to it finishing.
            console.log("Timer finished! Play sound here.");
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, tick]);

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
