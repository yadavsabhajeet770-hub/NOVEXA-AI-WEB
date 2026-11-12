/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ShieldAlert, Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NumberBall } from './NumberBall';
import { sound } from '../utils/sound';

interface WinLossModalProps {
  isOpen: boolean;
  isWin: boolean;
  isJackpot?: boolean;
  predNum: number;
  predBS: 'BIG' | 'SMALL';
  actualNumber: number;
  actualBS: 'BIG' | 'SMALL';
  confidence: number;
  period: string;
  onClose: () => void;
}

export const WinLossModal: React.FC<WinLossModalProps> = ({
  isOpen,
  isWin,
  isJackpot = false,
  predNum,
  predBS,
  actualNumber,
  actualBS,
  confidence,
  period,
  onClose,
}) => {
  // Prevent duplicate firework/confetti triggers during re-renders
  const triggeredPeriodRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      triggeredPeriodRef.current = null;
      return;
    }

    // Only fire audio and confetti ONCE per unique round result
    if (triggeredPeriodRef.current === period) return;
    triggeredPeriodRef.current = period;

    if (isWin) {
      sound.playWin();
      try {
        // Single crisp, elegant particle burst
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ffffff'],
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }
    } else {
      sound.playLoss();
    }

    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen, isWin, period, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="relative w-full max-w-[350px] rounded-[36px] p-6 text-white text-center shadow-2xl overflow-hidden border border-white/20"
          style={{
            background: isWin
              ? 'linear-gradient(145deg, #063d24 0%, #0c5734 45%, #052315 100%)'
              : 'linear-gradient(145deg, #3d0e14 0%, #57161f 45%, #21070a 100%)',
            boxShadow: isWin
              ? '0 25px 65px -12px rgba(16, 185, 129, 0.45), 0 0 0 1px rgba(52, 211, 153, 0.25)'
              : '0 25px 65px -12px rgba(239, 68, 68, 0.45), 0 0 0 1px rgba(248, 113, 113, 0.25)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Ambient radial glow */}
          <div
            className={`absolute -top-12 -left-12 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-40 ${
              isWin ? 'bg-[var(--accent)]' : 'bg-rose-500'
            }`}
          />
          <div
            className={`absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-30 ${
              isWin ? 'bg-amber-400' : 'bg-red-600'
            }`}
          />

          {/* Icon Badge */}
          <div className="relative z-10 mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40 bg-gradient-to-b from-white/25 to-white/5 backdrop-blur-md">
            {isWin ? (
              <div className="relative">
                <Trophy className="w-10 h-10 text-amber-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)] animate-bounce" />
                <Sparkles className="w-4 h-4 text-amber-200 absolute -top-1 -right-2 animate-spin" />
              </div>
            ) : (
              <ShieldAlert className="w-10 h-10 text-rose-300 drop-shadow-[0_2px_10px_rgba(244,63,94,0.6)]" />
            )}
          </div>

          {/* Main Title & Subtitle */}
          <div className="relative z-10 mt-3.5">
            <span
              className={`inline-block px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-['Sora'] font-black tracking-widest uppercase border ${
                isJackpot
                  ? 'bg-amber-400 text-[#3a2a05] border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : isWin
                  ? 'bg-[var(--accent-soft)] text-white border-[var(--accent)]/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-400/40'
              }`}
            >
              {isJackpot ? 'EXACT NUMBER HIT' : isWin ? 'VIP SIGNAL HIT' : 'NEURAL WEIGHT SYNC'}
            </span>
            <h2 className="font-['Sora'] font-black text-2xl sm:text-3xl tracking-wide mt-1.5 drop-shadow">
              {isJackpot ? 'JACKPOT WIN!' : isWin ? 'PREDICTION WIN!' : 'ROUND MISSED'}
            </h2>
            <p className="text-[11px] sm:text-xs font-medium text-white/80 mt-1 max-w-[260px] mx-auto leading-relaxed">
              {isJackpot
                ? 'JACKPOT HIT! Exact target ball number predicted accurately!'
                : isWin
                ? 'CYRUS pattern logic predicted this round accurately!'
                : 'Neural algorithm recalibrated weights for the next signal.'}
            </p>
          </div>

          {/* Comparison Cards: Predicted vs Actual */}
          <div className="relative z-10 mt-4 p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 grid grid-cols-7 items-center gap-1 shadow-inner">
            {/* Predicted */}
            <div className="col-span-3 flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-white/60 uppercase">
                PREDICTED
              </span>
              <div className="mt-1">
                <NumberBall number={predNum} size="sm" showGlow={isWin} />
              </div>
              <span
                className={`mt-1 font-['Sora'] font-black text-xs sm:text-sm px-2 py-0.5 rounded-full ${
                  predBS === 'BIG' ? 'bg-amber-500/20 text-amber-300' : 'bg-sky-500/20 text-sky-300'
                }`}
              >
                {predBS}
              </span>
            </div>

            {/* Middle Divider */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              {isWin ? (
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] animate-pulse" />
              ) : (
                <ArrowRight className="w-4 h-4 text-white/40" />
              )}
            </div>

            {/* Actual */}
            <div className="col-span-3 flex flex-col items-center">
              <span className="text-[9px] font-extrabold tracking-wider text-white/60 uppercase">
                ACTUAL
              </span>
              <div className="mt-1">
                <NumberBall number={actualNumber} size="sm" showGlow={false} />
              </div>
              <span
                className={`mt-1 font-['Sora'] font-black text-xs px-2 py-0.5 rounded-full ${
                  actualBS === 'BIG' ? 'bg-amber-500/20 text-amber-300' : 'bg-sky-500/20 text-sky-300'
                }`}
              >
                {actualBS}
              </span>
            </div>
          </div>

          {/* Period Info & Accuracy */}
          <div className="relative z-10 mt-3 flex items-center justify-between text-[11px] px-1 text-white/70">
            <div>
              Round <span className="font-['Space_Grotesk'] font-bold text-white">#{period ? period.slice(-6) : '------'}</span>
            </div>
            <div className="font-['Sora'] font-extrabold text-amber-300">
              {confidence}% Confidence
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="relative z-10 mt-4 w-full py-3.5 rounded-2xl font-['Sora'] font-black text-xs tracking-wider shadow-xl active:scale-[0.98] transition-transform cursor-pointer text-[#3a2a05] border border-amber-200/40"
            style={{
              background: 'linear-gradient(135deg, #f8df8b 0%, #e6be57 50%, #cb9e31 100%)',
              boxShadow: '0 8px 24px -4px rgba(245, 158, 11, 0.4)',
            }}
          >
            {isWin ? 'CONTINUE WINNING' : 'NEXT PREDICTION'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
