import { useCallback, useRef, useEffect } from 'react';

export function useExamSounds() {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        }
    }, []);

    const playTone = useCallback((type: 'correct' | 'incorrect' | 'complete') => {
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const now = ctx.currentTime;

        // Helper for snappy, short sounds
        const playSound = (freq: number, type: OscillatorType, startTime: number, duration: number, vol: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration);
        };

        if (type === 'correct') {
            // Single snappy "Ding!" (High C)
            playSound(1046.50, 'sine', now, 0.15, 0.2);
        }
        else if (type === 'incorrect') {
            // Slide from 300Hz down to 150Hz quickly
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        }
        else if (type === 'complete') {
            // Short victory fanfare
            const speed = 0.08;
            playSound(523.25, 'sine', now, 0.3, 0.1);
            playSound(659.25, 'sine', now + speed, 0.3, 0.1);
            playSound(783.99, 'sine', now + speed * 2, 0.3, 0.1);
            playSound(1046.50, 'sine', now + speed * 3, 0.6, 0.15);
        }
    }, []);

    const playCorrect = () => playTone('correct');
    const playIncorrect = () => playTone('incorrect');
    const playComplete = () => playTone('complete');

    return {
        playCorrect,
        playIncorrect,
        playComplete
    };
}
