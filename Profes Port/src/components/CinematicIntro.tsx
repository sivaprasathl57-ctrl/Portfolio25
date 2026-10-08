import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onEnter: () => void;
  isOpen?: boolean;
}

const CIPHER_SYMBOLS = ['#', '(', '&', '$', '@', '%', '*', '!', '?', ':', ';', '{', '}', '[', ']', '|', '/', '<', '>', '0', '1', 'X', 'Z'];

const TARGET_NAME = 'SIVA PRASATH L';

const COLOR_PALETTE = [
  '#00dfd8', // Cyan
  '#34d399', // Emerald
  '#a855f7', // Purple
  '#38bdf8', // Sky Blue
  '#f43f5e', // Rose
  '#fbbf24', // Gold
  '#2dd4bf', // Teal
  '#818cf8', // Indigo
  '#ffffff', // White
];

export default function CinematicIntro({ onEnter, isOpen = true }: CinematicIntroProps) {
  // Timeline phases:
  // 1. 'scramble': 0s - 3.5s (Multiple stacked colorful names scrambling)
  // 2. 'blackout': 3.5s - 8.5s (5 SECONDS OF ONLY PURE BLACK SCREEN)
  // 3. 'unlock': 8.5s - 9.2s (Curtain slides open)
  // 4. 'done': 9.2s+ (Portfolio main website displayed)
  const [phase, setPhase] = useState<'scramble' | 'blackout' | 'unlock' | 'done'>('scramble');

  const [displayText1, setDisplayText1] = useState('#(&SIVA PRASATH L@#');
  const [displayText2, setDisplayText2] = useState('SIVA PRASATH L');
  const [displayText3, setDisplayText3] = useState('$@SIVA PRASATH L%*');

  // Scramble loop for multiple name lines during 'scramble' phase
  useEffect(() => {
    if (phase !== 'scramble') return;

    let tick = 0;
    const interval = setInterval(() => {
      tick++;

      const scrambleRow = (revealRatio: number) => {
        return TARGET_NAME.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (Math.random() > revealRatio) {
            return CIPHER_SYMBOLS[Math.floor(Math.random() * CIPHER_SYMBOLS.length)];
          }
          return char;
        }).join('');
      };

      const progressRatio = Math.min(1, tick / 55);

      setDisplayText1(scrambleRow(Math.max(0, progressRatio - 0.2)));
      setDisplayText2(scrambleRow(progressRatio));
      setDisplayText3(scrambleRow(Math.max(0, progressRatio - 0.1)));
    }, 45);

    return () => clearInterval(interval);
  }, [phase]);

  // Master Timeline Controller
  useEffect(() => {
    // At 3.5 seconds: Transition to 5 SECONDS OF PURE BLACK SCREEN
    const blackoutTimer = setTimeout(() => {
      setPhase('blackout');
    }, 3500);

    // At 8.5 seconds (3.5s + 5.0s black screen): Trigger unlock shutter reveal
    const unlockTimer = setTimeout(() => {
      setPhase('unlock');
    }, 8500);

    // At 9.2 seconds: Complete intro and reveal portfolio website
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onEnter();
    }, 9200);

    return () => {
      clearTimeout(blackoutTimer);
      clearTimeout(unlockTimer);
      clearTimeout(doneTimer);
    };
  }, [onEnter]);

  // Skip immediately on click or hotkey
  const skipImmediately = () => {
    setPhase('unlock');
    setTimeout(() => {
      setPhase('done');
      onEnter();
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
        skipImmediately();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen || phase === 'done') return null;

  // Helper component for per-character colorful name line
  const RenderColorfulName = ({ text, opacityClass = 'opacity-100' }: { text: string; opacityClass?: string }) => (
    <div className={`font-mono text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.18em] uppercase flex items-center justify-center flex-wrap gap-y-2 ${opacityClass}`}>
      {text.split('').map((char, index) => {
        const color = COLOR_PALETTE[index % COLOR_PALETTE.length];
        return (
          <span
            key={index}
            style={{
              color: char === ' ' ? 'transparent' : color,
              textShadow: char === ' ' ? 'none' : `0 0 12px ${color}80, 0 0 24px ${color}40`,
              filter: char === ' ' ? 'none' : `drop-shadow(0 0 8px ${color}60)`,
              transition: 'color 0.1s ease, text-shadow 0.1s ease',
            }}
            className="inline-block transition-transform hover:scale-125"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      onClick={skipImmediately}
      className="fixed inset-0 z-[100] bg-[#000000] text-white flex items-center justify-center select-none cursor-pointer overflow-hidden"
    >
      {/* Top & Bottom Slide Shutters for Final Reveal */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: phase === 'unlock' ? '-100%' : '0%' }}
        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#000000] z-30 pointer-events-none"
      />
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: phase === 'unlock' ? '100%' : '0%' }}
        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#000000] z-30 pointer-events-none"
      />

      {/* PHASE 1: SINGLE NAME SHOWING WITH PER-CHARACTER GLOW & SCRAMBLE EFFECT */}
      <AnimatePresence>
        {phase === 'scramble' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative z-40 px-4 text-center max-w-6xl mx-auto w-full flex flex-col items-center justify-center"
          >
            {/* Single Primary Center Name Line */}
            <div className="py-6 sm:py-10">
              <RenderColorfulName text={displayText2} opacityClass="opacity-100" />
            </div>

            {/* Subtle Cipher Decryption Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,223,216,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Decrypting Identity Protocol...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: 5 SECONDS OF PURE BLACK SCREEN - No text, no icons, 100% black */}
      {phase === 'blackout' && (
        <div className="absolute inset-0 bg-[#000000] z-40 pointer-events-none" />
      )}
    </div>
  );
}
