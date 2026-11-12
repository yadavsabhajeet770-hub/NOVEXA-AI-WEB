/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  XCircle,
  X,
  Zap,
  Sparkles,
  Lock,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Target,
  Trophy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GameMode, ApiRecord, StoredPrediction, UserData } from '../types';
import { EnsembleResult, primaryCol, bsOf, to17DigitPeriod } from '../utils/aiEngine';
import { NumberBall } from './NumberBall';
import { WingoChart } from './WingoChart';
import { sound } from '../utils/sound';

interface PredictionViewProps {
  mode: GameMode;
  onSwitchMode: (mode: GameMode) => void;
  nextPeriod: string;
  countdownSec: number;
  totalCountdown: number;
  apiRecords: ApiRecord[];
  prediction: EnsembleResult | null;
  userData: UserData;
  isPredicting: boolean;
  onShowToast: (msg: string, type?: 'win' | 'err') => void;
  onRequestPrediction: () => void;
  isLoggedIn?: boolean;
}

export const PredictionView: React.FC<PredictionViewProps> = ({
  mode,
  onSwitchMode,
  nextPeriod,
  countdownSec,
  apiRecords,
  prediction,
  userData,
  isPredicting,
  onShowToast,
  onRequestPrediction,
  isLoggedIn = false,
}) => {
  const [activeSubtab, setActiveSubtab] = useState<'gh' | 'ch' | 'mh'>('gh');
  const [selectedMultiplier, setSelectedMultiplier] = useState<string>('1');
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  // Compute consecutive loss streak for 2-loss safe guard mode
  // "2 loss hone ke baad cyrus ai our achhe se analysis karna start kar de varana skip kar de our jab patterns sahi chale tab hi prediction de"
  const consecutiveLosses = React.useMemo(() => {
    let count = 0;
    for (const p of userData.predictions) {
      if (p.result === 'SKIPPED' || p.result === 'PENDING') continue;
      if (p.result === 'LOSS') {
        count++;
      } else if (p.result === 'WIN') {
        break;
      }
    }
    return count;
  }, [userData.predictions]);

  // Compute countdown flip digits
  const mins = Math.floor(countdownSec / 60);
  const secs = countdownSec % 60;
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  const winCount = userData.stats.w;
  const lossCount = userData.stats.l;
  const totalCount = userData.stats.t;
  const winRate = totalCount ? Math.round((winCount / totalCount) * 100) : 0;

  // Mini balls from last 5 records
  const miniRecords = apiRecords.slice(0, 5);

  return (
    <div className="pb-24 px-3 pt-1 animate-fadeIn max-w-full">
      {/* Responsive layout: Single column on mobile, 2 columns on desktop */}
      <div className="md:grid md:grid-cols-12 md:gap-4 items-start">
        {/* LEFT COLUMN: Mode Switcher, Ticket, 3D Balls Board, Multipliers, Big/Small */}
        <div className="md:col-span-6 flex flex-col gap-3">
          {/* 30s vs 1M Switcher Tabs with iOS Liquid Sliding Pill */}
          <div className="p-1 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] grid grid-cols-2 gap-1.5 shadow-inner relative">
            <button
              onClick={() => {
                sound.playTap();
                onSwitchMode('30s');
              }}
              className="relative py-2 px-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer select-none transition-colors duration-200"
            >
              {mode === '30s' && (
                <motion.div
                  layoutId="activeModeSwitch"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-white to-[#f0f8f3] dark:from-[#182924] dark:to-[#0f1d19] shadow-sm border border-[var(--accent)]/30"
                />
              )}
              <div
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  mode === '30s'
                    ? 'bg-gradient-to-br from-[var(--c1)] to-[var(--c2)] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-white/10 text-[var(--muted)]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span
                className={`relative z-10 font-['Sora'] text-xs ${
                  mode === '30s' ? 'text-[var(--accent-deep)] font-extrabold' : 'text-[var(--muted)]'
                }`}
              >
                WinGo 30 Sec
              </span>
            </button>

            <button
              onClick={() => {
                sound.playTap();
                onSwitchMode('1M');
              }}
              className="relative py-2 px-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer select-none transition-colors duration-200"
            >
              {mode === '1M' && (
                <motion.div
                  layoutId="activeModeSwitch"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-white to-[#f0f8f3] dark:from-[#182924] dark:to-[#0f1d19] shadow-sm border border-[var(--accent)]/30"
                />
              )}
              <div
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  mode === '1M'
                    ? 'bg-gradient-to-br from-[var(--c1)] to-[var(--c2)] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-white/10 text-[var(--muted)]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span
                className={`relative z-10 font-['Sora'] text-xs ${
                  mode === '1M' ? 'text-[var(--accent-deep)] font-extrabold' : 'text-[var(--muted)]'
                }`}
              >
                WinGo 1 Min
              </span>
            </button>
          </div>

          {/* Main Ticket with 51GAME-style Top-Center and Bottom-Center Inward Concave Notches */}
          <div className="relative filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.14)]">
            <div
              className="relative p-3.5 md:p-4 rounded-3xl text-white transition-all duration-500 overflow-hidden"
              style={{
                background: 'var(--grad-deep)',
                WebkitMask:
                  'radial-gradient(circle 12px at 50% 0px, transparent 11px, #000 11.5px) top / 100% 51% no-repeat, radial-gradient(circle 12px at 50% 100%, transparent 11px, #000 11.5px) bottom / 100% 51% no-repeat',
                mask:
                  'radial-gradient(circle 12px at 50% 0px, transparent 11px, #000 11.5px) top / 100% 51% no-repeat, radial-gradient(circle 12px at 50% 100%, transparent 11px, #000 11.5px) bottom / 100% 51% no-repeat',
              }}
            >
              {/* Realistic 3D Inset Bevel Arc for Top Notch */}
              <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 pointer-events-none z-20 overflow-visible"
                viewBox="0 0 24 12"
                aria-hidden="true"
              >
                <path
                  d="M 0,0 A 12,12 0 0,0 24,0"
                  fill="none"
                  stroke="rgba(0,0,0,0.22)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Realistic 3D Inset Bevel Arc for Bottom Notch */}
              <svg
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-3 pointer-events-none z-20 overflow-visible"
                viewBox="0 0 24 12"
                aria-hidden="true"
              >
                <path
                  d="M 0,12 A 12,12 0 0,1 24,12"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Vertical dotted/dashed separator connecting top and bottom notches */}
              <div
                className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 border-l border-dashed border-white/45 pointer-events-none z-10"
                aria-hidden="true"
              />

            <div className="relative z-10 grid grid-cols-2 items-center gap-2">
              {/* Left side */}
              <div className="pr-1">
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowHowToPlay(!showHowToPlay);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-['Sora'] font-extrabold text-[#3a2a05] shadow-xs border border-white/40 cursor-pointer active:scale-95 transition-transform"
                  style={{ background: 'var(--grad-gold)' }}
                >
                  <HelpCircle className="w-3 h-3" />
                  How to play
                </button>
                <div className="text-xs font-semibold text-white/90 mt-2 tracking-wide">
                  WinGo {mode === '30s' ? '30sec' : '1 Min'}
                </div>

                {/* 3D Mini Balls from recent history */}
                <div className="flex items-center gap-1 mt-1.5 overflow-hidden">
                  {miniRecords.map((r) => (
                    <NumberBall key={r.period} number={r.number} size="xs" showGlow={false} />
                  ))}
                </div>
              </div>

              {/* Right side countdown */}
              <div className="text-right pl-1">
                <div className="text-[11px] font-medium text-white/90">Time remaining</div>
                {/* Flip clock digits */}
                <div className="inline-flex items-center justify-end gap-1 mt-1">
                  <span className="w-5 h-8 md:w-6 md:h-9 rounded-lg bg-white dark:bg-[#1f2c28] text-[var(--ink)] font-['Sora'] font-extrabold text-lg md:text-xl flex items-center justify-center flip-card shadow-xs">
                    {mm[0]}
                  </span>
                  <span className="w-5 h-8 md:w-6 md:h-9 rounded-lg bg-white dark:bg-[#1f2c28] text-[var(--ink)] font-['Sora'] font-extrabold text-lg md:text-xl flex items-center justify-center flip-card shadow-xs">
                    {mm[1]}
                  </span>
                  <span className="text-white/80 font-bold px-0.5">:</span>
                  <span className="w-5 h-8 md:w-6 md:h-9 rounded-lg bg-white dark:bg-[#1f2c28] text-[var(--ink)] font-['Sora'] font-extrabold text-lg md:text-xl flex items-center justify-center flip-card shadow-xs">
                    {ss[0]}
                  </span>
                  <span className="w-5 h-8 md:w-6 md:h-9 rounded-lg bg-white dark:bg-[#1f2c28] text-[var(--ink)] font-['Sora'] font-extrabold text-lg md:text-xl flex items-center justify-center flip-card shadow-xs animate-pulse">
                    {ss[1]}
                  </span>
                </div>
                <div className="mt-1 font-['Space_Grotesk'] font-bold text-[10.5px] md:text-xs tracking-wider text-white drop-shadow-xs select-all">
                  #{nextPeriod ? to17DigitPeriod(nextPeriod) : '20261028100051956'}
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* How to play modal tooltip */}
          <AnimatePresence>
            {showHowToPlay && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 shadow-sm"
              >
                <div className="font-bold flex items-center justify-between">
                  <span className="font-['Sora'] font-extrabold text-[11px]">WinGo Rules &amp; Guide</span>
                  <button
                    onClick={() => setShowHowToPlay(false)}
                    className="p-1 text-amber-700 dark:text-amber-300 hover:opacity-75 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="mt-1 leading-relaxed text-[10.5px]">
                  Numbers 0–4 are <b>SMALL</b>, 5–9 are <b>BIG</b>. Odd numbers (1,3,7,9) are{' '}
                  <b>GREEN</b>, even numbers (2,4,6,8) are <b>RED</b>. Number 0 is <b>RED + VIOLET</b>, and 5 is{' '}
                  <b>GREEN + VIOLET</b>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Color + 3D Number Balls Board */}
          <div className="p-3.5 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-md">
            {/* Color buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  sound.playTap();
                  onShowToast('Locked on Green color!', 'win');
                }}
                className={`py-2.5 rounded-xl font-['Sora'] font-extrabold text-xs text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
                  prediction?.color === 'GREEN'
                    ? 'bg-gradient-to-b from-emerald-400 to-green-600 ring-4 ring-emerald-300/40 animate-pulse'
                    : 'bg-gradient-to-b from-emerald-400 to-green-600 opacity-60'
                }`}
              >
                Green
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  onShowToast('Locked on Violet color!', 'win');
                }}
                className={`py-2.5 rounded-xl font-['Sora'] font-extrabold text-xs text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
                  prediction?.violet
                    ? 'bg-gradient-to-b from-violet-400 to-purple-600 ring-4 ring-purple-300/40 animate-pulse'
                    : 'bg-gradient-to-b from-violet-400 to-purple-600 opacity-60'
                }`}
              >
                Violet
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  onShowToast('Locked on Red color!', 'win');
                }}
                className={`py-2.5 rounded-xl font-['Sora'] font-extrabold text-xs text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
                  prediction?.color === 'RED'
                    ? 'bg-gradient-to-b from-rose-400 to-red-600 ring-4 ring-rose-300/40 animate-pulse'
                    : 'bg-gradient-to-b from-rose-400 to-red-600 opacity-60'
                }`}
              >
                Red
              </button>
            </div>

            {/* 10 Real 3D Number Balls Grid (0 to 9) */}
            <div className="mt-3 p-3 rounded-2xl bg-gradient-to-b from-[#f3f8f4] to-[#eaf2ed] dark:from-[#101a17] dark:to-[#0c1513] grid grid-cols-5 gap-2.5 md:gap-3.5 border border-white/50 dark:border-white/5 justify-items-center">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const isWinner = prediction?.number === num;
                const isDimmed = prediction !== null && !isWinner;

                return (
                  <div key={num} className="flex flex-col items-center justify-center p-0.5">
                    <NumberBall
                      number={num}
                      size="lg"
                      isWinner={isWinner}
                      isDimmed={isDimmed}
                      isShaking={isPredicting}
                      onClick={() => {
                        sound.playTap();
                        onShowToast(`Selected number ${num} (${bsOf(num)})`, 'win');
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Multipliers row */}
            <div className="mt-3 flex items-center justify-between gap-1 overflow-x-auto pb-0.5">
              {['R', '1', '5', '10', '20', '50', '100'].map((mul) => (
                <button
                  key={mul}
                  onClick={() => {
                    sound.playTap();
                    setSelectedMultiplier(mul);
                  }}
                  className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-['Sora'] font-bold border transition-all cursor-pointer ${
                    selectedMultiplier === mul
                      ? 'text-[#3a2a05] border-transparent shadow-xs'
                      : 'bg-[var(--paper)] text-[var(--muted)] border-[var(--line)]'
                  }`}
                  style={{
                    background: selectedMultiplier === mul ? 'var(--grad-gold)' : undefined,
                  }}
                >
                  {mul === 'R' ? 'Rand' : `X${mul}`}
                </button>
              ))}
            </div>

            {/* Big vs Small Selectors */}
            <div className="mt-3 p-1 rounded-full bg-[var(--paper)] border border-[var(--line)] grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  sound.playTap();
                  sound.speak('Locked on Big');
                  onShowToast('Locked on Big!', 'win');
                }}
                className={`py-2 rounded-full font-['Sora'] font-extrabold text-xs text-white shadow-xs transition-all active:scale-95 cursor-pointer ${
                  prediction?.bs === 'BIG'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 ring-4 ring-orange-300/40 animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 opacity-60'
                }`}
              >
                Big
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  sound.speak('Locked on Small');
                  onShowToast('Locked on Small!', 'win');
                }}
                className={`py-2 rounded-full font-['Sora'] font-extrabold text-xs text-white shadow-xs transition-all active:scale-95 cursor-pointer ${
                  prediction?.bs === 'SMALL'
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 ring-4 ring-blue-300/40 animate-pulse'
                    : 'bg-gradient-to-r from-sky-400 to-blue-600 opacity-60'
                }`}
              >
                Small
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Prediction Card, Subtabs, History & Stats */}
        <div className="md:col-span-6 flex flex-col gap-3 mt-3 md:mt-0">
          {/* AI Prediction Strip */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-white to-[var(--accent-soft)]/20 dark:from-[var(--paper-2)] dark:to-[var(--paper)] border border-[var(--line)] shadow-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-pulse" />
              <span className="font-['Sora'] font-extrabold text-xs sm:text-sm tracking-wider text-[var(--ink)]">
                CYRUS NEURAL PREDICTION
              </span>
              <span
                className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9.5px] font-['Sora'] font-extrabold tracking-widest text-[#3a2a05]"
                style={{ background: 'var(--grad-gold)' }}
              >
                VIP
              </span>
            </div>
            <div className="font-['Sora'] font-extrabold text-xs sm:text-sm text-[var(--accent-deep)]">
              {prediction ? `${prediction.confidence} %` : 'READY'}
            </div>
          </div>

          {/* 3D 1-Loss Recovery Mode Banner */}
          {consecutiveLosses >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/20 border-2 border-amber-400/50 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.25)] relative overflow-hidden"
              style={{ perspective: '800px' }}
            >
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md animate-pulse">
                  <ShieldAlert className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Sora'] font-black text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>1-LOSS RECOVERY ACTIVE</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-extrabold">
                        {prediction?.bs ? `RECOVERY ${prediction.bs}` : '1L RECOVERY'}
                      </span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-['Space_Grotesk'] font-bold text-amber-600 dark:text-amber-400">
                      Streak: {consecutiveLosses} {consecutiveLosses === 1 ? 'Loss' : 'Losses'}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[var(--muted)] leading-tight mt-1">
                    1-Loss Recovery engaged: Calibrated last-digit mapping locks {prediction?.bs || 'Size'} with Primary #{prediction?.number ?? '—'} and 3 supporting candidates with 1,000-round historical pattern validation.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Premium NEXT PREDICTION Action Button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playTap();
                onRequestPrediction();
              }}
              disabled={isPredicting}
              className="relative w-full py-3.5 px-4 rounded-2xl text-white font-['Sora'] font-black text-sm sm:text-base tracking-wide shadow-xl active:scale-[0.98] transition-all cursor-pointer overflow-hidden border border-white/40 select-none group"
              style={{
                background: 'var(--hero-grad)',
                boxShadow: 'var(--hero-shadow)',
              }}
            >
              {/* Animated liquid shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent bg-[length:200%_100%] animate-shine pointer-events-none" />

              {/* Glowing pulsating ambient light */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/20 via-amber-400/25 to-[var(--accent)]/20 rounded-2xl blur-sm -z-10 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-center gap-2.5">
                {!isLoggedIn ? (
                  <>
                    <Lock className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span className="tracking-wide uppercase text-xs sm:text-sm drop-shadow-sm font-black text-amber-200">
                      NEXT PREDICTION · SIGN IN FIRST
                    </span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-400 text-[#3a2a05] border border-white/40 font-black tracking-wider">
                      VIP
                    </span>
                  </>
                ) : isPredicting ? (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                    <span className="tracking-widest uppercase text-xs sm:text-sm drop-shadow-sm font-extrabold">
                      ANALYZING WINGO PATTERNS…
                    </span>
                  </>
                ) : prediction ? (
                  <>
                    <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
                    <span className="tracking-wider uppercase text-xs sm:text-sm drop-shadow-sm font-extrabold">
                      NEXT PREDICTION · ACTIVE #{nextPeriod ? nextPeriod.slice(-5) : ''}
                    </span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-black/25 text-amber-200 border border-white/20 font-bold">
                      RE-ANALYZE
                    </span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="tracking-widest uppercase text-xs sm:text-sm drop-shadow-sm font-extrabold">
                      NEXT PREDICTION
                    </span>
                    <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-black/25 text-white border border-white/20 font-bold">
                      VIP PATTERN AI
                    </span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Dedicated VIP Neural Prediction Result Card */}
          <AnimatePresence mode="wait">
            {prediction && (
              prediction.isSkip ? (
                <motion.div
                  key={`skip-${nextPeriod}`}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-amber-500/15 dark:from-[#251708] dark:via-[#1c1206] dark:to-[#150d04] border-2 border-amber-500/40 shadow-xl overflow-hidden relative"
                >
                  {/* Background amber glow */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
                  <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs">
                        <ShieldAlert className="w-4 h-4 text-white" />
                      </span>
                      <div>
                        <div className="font-['Sora'] font-black text-xs text-amber-600 dark:text-amber-400 tracking-wide flex items-center gap-1.5">
                          <span>
                            {consecutiveLosses >= 1 || prediction.pattern === 'SKIP_1LOSS_GUARD' || prediction.pattern === 'SKIP_2LOSS_GUARD'
                              ? '1-LOSS SAFE GUARD ACTIVE'
                              : 'AI SAFETY FILTER · ACTIVE'}
                          </span>
                        </div>
                        <div className="font-['Space_Grotesk'] text-[10px] text-[var(--muted)]">
                          Target Period #{nextPeriod ? nextPeriod.slice(-6) : ''} · Capital Safe
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full font-['Sora'] font-black text-[9.5px] bg-amber-500 text-white shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-white" />
                        {consecutiveLosses >= 1 ? 'LOSS STREAK PREVENTED' : 'CAPITAL PROTECTED'}
                      </span>
                    </div>
                  </div>

                  {/* Big Banner: SKIP / PASS ROUND */}
                  <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/30 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <AlertTriangle className="w-6 h-6 text-white stroke-[2.5]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-['Sora'] font-black text-sm text-amber-700 dark:text-amber-300">
                        {consecutiveLosses >= 1 || prediction.pattern === 'SKIP_1LOSS_GUARD' || prediction.pattern === 'SKIP_2LOSS_GUARD'
                          ? 'SAFE PASS: 1-LOSS COOLDOWN'
                          : 'SKIP THIS ROUND (PASS)'}
                      </div>
                      <div className="font-['Space_Grotesk'] text-[11px] text-[var(--muted)] leading-tight mt-0.5 font-medium">
                        {consecutiveLosses >= 1 || prediction.pattern === 'SKIP_1LOSS_GUARD' || prediction.pattern === 'SKIP_2LOSS_GUARD'
                          ? 'AI detected alternation trap / high market entropy after loss. Round safely passed to preserve capital.'
                          : 'High risk pattern with elevated loss probability detected. Do not bet.'}
                      </div>
                    </div>
                  </div>

                  {/* Risk Telemetry & Metrics */}
                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-black/30 border border-amber-500/20 flex flex-col">
                      <span className="text-[9px] text-[var(--muted)] font-bold">Market Choppiness</span>
                      <span className="font-['Sora'] font-black text-amber-600 dark:text-amber-400 text-xs">
                        {prediction.choppinessIndex ?? 75}% · Whipsaw Alternate
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/70 dark:bg-black/30 border border-amber-500/20 flex flex-col">
                      <span className="text-[9px] text-[var(--muted)] font-bold">Entropy Randomness</span>
                      <span className="font-['Sora'] font-black text-rose-600 dark:text-rose-400 text-xs">
                        {prediction.entropyScore ?? 0.98} / 1.00 (High Entropy)
                      </span>
                    </div>
                  </div>

                  {/* Reason & Strategy Note */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-black/25 border border-[var(--line)]">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-['Sora'] font-bold text-amber-700 dark:text-amber-400">
                      <span>Reason:</span>
                      <span className="font-normal text-[var(--ink)]">{prediction.skipReason}</span>
                    </div>
                    <div className="mt-1.5 text-[9.5px] text-[var(--muted)] leading-relaxed border-t border-[var(--line)] pt-1.5 flex items-start gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Capital Preservation Guarantee:</strong> When Wingo enters alternating flips or 50/50 deadlock traps, random bets have a high loss rate. Skipping protects your bankroll and maintains your win streak. The AI will scan and provide a verified signal once pattern stability is restored.</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`pred-${nextPeriod}`}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="p-4 rounded-3xl bg-gradient-to-br from-white via-[var(--accent-soft)]/20 to-white dark:from-[var(--paper-2)] dark:via-[var(--paper)] dark:to-[var(--paper-2)] border-2 border-[var(--accent)]/40 shadow-xl overflow-hidden relative"
                >
                  {/* Background glow decoration */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[var(--accent)]/15 blur-2xl pointer-events-none" />
                  <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--c2)] to-[var(--c3)] text-white shadow-xs">
                        <Sparkles className="w-4 h-4 text-amber-200" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-['Sora'] font-black text-xs sm:text-sm text-[var(--ink)] tracking-tight truncate">
                          CYRUS VIP SIGNAL
                        </div>
                        <div className="font-['Space_Grotesk'] text-[10px] text-[var(--muted)] font-bold">
                          Period #{nextPeriod ? nextPeriod.slice(-6) : ''}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1">
                      {consecutiveLosses >= 1 && (
                        <span className="px-1.5 py-0.5 rounded-full font-['Sora'] font-black text-[9px] bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs flex items-center gap-1 animate-pulse">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>1L SHIELD</span>
                        </span>
                      )}
                      {prediction.isSureshot && (
                        <span className="px-1.5 py-0.5 rounded-full font-['Sora'] font-black text-[9px] bg-gradient-to-r from-amber-500 to-yellow-400 text-[#2a1d00] shadow-xs flex items-center gap-0.5">
                          <Target className="w-2.5 h-2.5" />
                          <span>SURE</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full font-['Sora'] font-extrabold text-[10px] sm:text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xs">
                        {prediction.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Main Signal Display */}
                  <div className="mt-3 grid grid-cols-12 gap-2.5 items-stretch">
                    {/* Left: 3D Target Ball with perspective pedestal & specular lighting */}
                    <div
                      className="col-span-4 flex flex-col items-center justify-center py-2.5 px-1.5 rounded-2xl bg-gradient-to-b from-white/95 to-slate-100/90 dark:from-[var(--paper-2)] dark:to-[var(--paper)] border border-[var(--line)] shadow-sm relative group overflow-hidden"
                      style={{ perspective: '800px' }}
                    >
                      <div className="text-[9px] font-['Sora'] font-extrabold tracking-wide text-[var(--muted)] uppercase mb-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                        <span>TARGET</span>
                      </div>
                      <div
                        className="relative my-0.5 transition-transform duration-300 group-hover:scale-105"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[var(--accent)]/20 via-amber-400/25 to-[var(--c3)]/20 blur-md animate-pulse" />
                        <div className="relative z-10 drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]">
                          <NumberBall number={prediction.number} size="lg" showGlow={true} />
                        </div>
                      </div>
                      <div className="mt-1 flex flex-col items-center justify-center gap-0.5 text-center">
                        <span className="font-['Sora'] font-black text-xs text-[var(--ink)]">
                          Ball #{prediction.number}
                        </span>
                        <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)] font-extrabold uppercase tracking-wide">
                          {prediction.color}
                        </span>
                      </div>
                    </div>

                    {/* Right: Big/Small & Logic Details */}
                    <div className="col-span-8 flex flex-col justify-center gap-2">
                      {/* Big / Small Banner */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex-1 py-2.5 px-3 rounded-2xl text-center font-['Sora'] font-black text-sm sm:text-base tracking-wider text-white shadow-md ${
                            prediction.bs === 'BIG'
                              ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
                              : 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600'
                          }`}
                        >
                          PREDICTED: {prediction.bs}
                        </div>
                      </div>

                      {/* Pattern or System Info */}
                      {prediction.patternName ? (
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-black/20 border border-[var(--line)] text-xs">
                          <div className="font-['Sora'] font-black text-[var(--accent-deep)] flex items-center justify-between gap-1">
                            <span className="truncate">{prediction.patternName}</span>
                            {prediction.pattern && (
                              <span className="shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-deep)]">
                                {prediction.pattern}
                              </span>
                            )}
                          </div>
                          {prediction.bunnyMessage && (
                            <div className="text-[10px] text-[var(--muted)] mt-0.5 font-medium leading-tight">
                              {prediction.bunnyMessage}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-black/20 border border-[var(--line)] text-[10px]">
                          <span className="font-['Sora'] font-bold text-[var(--accent-deep)]">
                            Consensus:
                          </span>{' '}
                          <span className="text-[var(--muted)]">
                            {prediction.logics.map((l) => l.k).slice(0, 5).join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hot & Cold Numbers from predictExactNumber algorithm */}
                  {prediction.hotNumbers && prediction.hotNumbers.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[var(--line)] grid grid-cols-2 gap-2 text-[10px]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="shrink-0 font-['Sora'] font-extrabold text-orange-500 flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-orange-500 fill-orange-500/30" />
                          <span className="text-[9px]">HOT:</span>
                        </span>
                        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                          {prediction.hotNumbers.slice(0, 4).map((n) => (
                            <span
                              key={n}
                              className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center font-bold text-[9px] ${
                                n === prediction.number
                                  ? 'bg-orange-500 text-white ring-1 ring-orange-300'
                                  : 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300'
                              }`}
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>

                      {prediction.coldNumbers && prediction.coldNumbers.length > 0 && (
                        <div className="flex items-center gap-1.5 min-w-0 justify-end">
                          <span className="shrink-0 font-['Sora'] font-extrabold text-sky-500 flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-sky-500" />
                            <span className="text-[9px]">OVERDUE:</span>
                          </span>
                          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                            {prediction.coldNumbers.slice(0, 4).map((n) => (
                              <span
                                key={n}
                                className={`w-4 h-4 shrink-0 rounded-full flex items-center justify-center font-bold text-[9px] ${
                                  n === prediction.number
                                    ? 'bg-sky-500 text-white ring-1 ring-sky-300'
                                    : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                                }`}
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Candidate Probability Rankings */}
                  {prediction.runnerUps && prediction.runnerUps.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[var(--line)]">
                      <div className="flex items-center justify-between text-[10px] mb-1.5">
                        <span className="font-['Sora'] font-extrabold text-[var(--accent-deep)] flex items-center gap-1">
                          <Target className="w-3 h-3 text-[var(--accent-deep)]" />
                          <span>EXACT NUMBER PROBABILITIES</span>
                        </span>
                        <span className="text-[9px] font-bold text-[var(--muted)]">Consensus Weights</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-deep)] font-bold text-xs">
                          <span className="font-['Sora'] font-black">#{prediction.number}</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[var(--accent)] text-white font-extrabold">PRIMARY</span>
                        </div>

                        {prediction.runnerUps.slice(0, 3).map((r, idx) => (
                          <div
                            key={r.number}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-[var(--line)] text-slate-700 dark:text-slate-300 font-semibold text-[10px]"
                          >
                            <span className="font-['Sora'] font-bold">#{r.number}</span>
                            <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-extrabold uppercase tracking-tight">
                              SUPP {idx + 1}
                            </span>
                            <span className="text-[9px] text-[var(--muted)] font-mono">({r.probability}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            )}
          </AnimatePresence>

          {/* Subtabs Panel: Game History / Chart / My History with Liquid Sliding Tabs */}
          <div className="p-3.5 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-md">
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] relative">
              <button
                onClick={() => {
                  sound.playTap();
                  setActiveSubtab('gh');
                }}
                className="relative py-2 rounded-xl font-['Sora'] font-bold text-xs cursor-pointer select-none transition-colors duration-200"
              >
                {activeSubtab === 'gh' && (
                  <motion.div
                    layoutId="activeSubtabPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-xl shadow-xs"
                    style={{ background: 'var(--grad-deep)' }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeSubtab === 'gh' ? 'text-white' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  Game history
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playTap();
                  setActiveSubtab('ch');
                }}
                className="relative py-2 rounded-xl font-['Sora'] font-bold text-xs cursor-pointer select-none transition-colors duration-200"
              >
                {activeSubtab === 'ch' && (
                  <motion.div
                    layoutId="activeSubtabPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-xl shadow-xs"
                    style={{ background: 'var(--grad-deep)' }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeSubtab === 'ch' ? 'text-white' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  Chart
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playTap();
                  setActiveSubtab('mh');
                }}
                className="relative py-2 rounded-xl font-['Sora'] font-bold text-xs cursor-pointer select-none transition-colors duration-200"
              >
                {activeSubtab === 'mh' && (
                  <motion.div
                    layoutId="activeSubtabPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-xl shadow-xs"
                    style={{ background: 'var(--grad-deep)' }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeSubtab === 'mh' ? 'text-white' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  My history
                </span>
              </button>
            </div>

            {/* Tab 1: Game History with 3D Number Balls */}
            {activeSubtab === 'gh' && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--paper)]">
                <table className="w-full text-left text-xs">
                  <thead className="text-white" style={{ background: 'var(--grad-mint)' }}>
                    <tr>
                      <th className="py-2 px-3 font-extrabold text-[10.5px] tracking-wider">Period</th>
                      <th className="py-2 px-3 font-extrabold text-[10.5px] tracking-wider text-center">Number</th>
                      <th className="py-2 px-3 font-extrabold text-[10.5px] tracking-wider">Big Small</th>
                      <th className="py-2 px-3 font-extrabold text-[10.5px] tracking-wider text-right">Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {apiRecords.slice(0, 10).map((r) => {
                      const isRed = primaryCol(r.number) === 'RED';
                      const bs = bsOf(r.number);
                      return (
                        <tr key={r.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-['Space_Grotesk'] text-[11px] text-[var(--muted)]">
                            #{r.period.slice(-7)}
                          </td>
                          <td className="py-2 px-3 flex justify-center">
                            <NumberBall number={r.number} size="xs" showGlow={false} />
                          </td>
                          <td className="py-2 px-3 font-semibold text-[var(--ink)] text-[11px]">
                            {bs === 'BIG' ? 'Big' : 'Small'}
                          </td>
                          <td className="py-2 px-3 text-right">
                            <span
                              className={`inline-block w-2.5 h-2.5 rounded-full ${
                                isRed ? 'bg-red-500 shadow-[0_0_6px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                              }`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Chart (Real Wingo Chart Pattern System) */}
            {activeSubtab === 'ch' && (
              <div className="mt-3 animate-fadeIn">
                <WingoChart mode={mode} />
              </div>
            )}

            {/* Tab 3: My History */}
            {activeSubtab === 'mh' && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--paper)]">
                <table className="w-full text-left text-xs">
                  <thead className="text-white" style={{ background: 'var(--grad-mint)' }}>
                    <tr>
                      <th className="py-2 px-2.5 font-extrabold text-[10px] tracking-wider">Period</th>
                      <th className="py-2 px-2.5 font-extrabold text-[10px] tracking-wider">Pred</th>
                      <th className="py-2 px-2.5 font-extrabold text-[10px] tracking-wider">Result</th>
                      <th className="py-2 px-2.5 font-extrabold text-[10px] tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {userData.predictions.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-xs text-[var(--muted)]">
                          No predictions recorded yet. Follow the CYRUS AI signals!
                        </td>
                      </tr>
                    ) : (
                      userData.predictions.slice(0, 15).map((p: StoredPrediction) => (
                        <tr key={p.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-2 px-2.5 font-['Space_Grotesk'] text-[10.5px] text-[var(--muted)]">
                            #{p.period.slice(-6)}
                          </td>
                          <td className="py-2 px-2.5">
                            {p.result === 'SKIPPED' || p.isSkip || p.predBS === 'SKIP' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-400/30 font-['Sora']">
                                <ShieldCheck className="w-3 h-3 text-amber-500" />
                                <span>SKIP</span>
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 font-bold font-['Sora'] text-xs">
                                <NumberBall number={p.predNum} size="xs" showGlow={false} />
                                <span>{p.predBS}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-2.5">
                            {p.result === 'PENDING' ? (
                              <span className="text-[10px] text-amber-500 font-bold italic animate-pulse">
                                Waiting…
                              </span>
                            ) : p.actualNumber >= 0 ? (
                              <div className="flex items-center gap-1 font-bold font-['Sora'] text-xs">
                                <NumberBall number={p.actualNumber} size="xs" showGlow={false} />
                                <span>{p.actualBS}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-[var(--muted)] font-mono">—</span>
                            )}
                          </td>
                          <td className="py-2 px-2.5 text-right">
                            {p.result === 'PENDING' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-500 border border-amber-400/30 animate-pulse">
                                PENDING
                              </span>
                            ) : p.result === 'SKIPPED' || p.isSkip ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                                <ShieldAlert className="w-2.5 h-2.5 stroke-[2.5]" />
                                <span>SKIPPED</span>
                              </span>
                            ) : p.result === 'JACKPOT' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-amber-400 text-[#3a2a05] border border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                                <Trophy className="w-2.5 h-2.5 text-[#3a2a05] stroke-[2.5]" />
                                <span>JACKPOT</span>
                              </span>
                            ) : (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${
                                  p.result === 'WIN'
                                    ? 'bg-[var(--accent-soft)] text-[var(--accent-deep)]'
                                    : 'bg-rose-100 dark:bg-rose-950 text-red-600'
                                }`}
                              >
                                {p.result === 'WIN' ? (
                                  <>
                                    <CheckCircle2 className="w-2.5 h-2.5 stroke-[2.5]" />
                                    <span>WIN</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-2.5 h-2.5 stroke-[2.5]" />
                                    <span>LOSS</span>
                                  </>
                                )}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Last 10 Results Bar with 3D Number Balls */}
          <div className="p-3.5 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-md">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              LAST 10 RESULTS
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              {apiRecords.slice(0, 10).map((r) => (
                <div
                  key={r.period}
                  className="shrink-0 w-14 p-1.5 rounded-2xl bg-white dark:bg-[var(--paper)] border border-[var(--line)] flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <NumberBall number={r.number} size="sm" showGlow={false} />
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-[var(--muted)] tracking-wider mt-1">
                    {bsOf(r.number)}
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-['Space_Grotesk'] text-[var(--muted)] mt-0.5">
                    #{r.period.slice(-4)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jackpot History (Big / Small Only) */}
          <div className="p-3.5 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-md">
            <div className="flex items-center justify-between text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                JACKPOT HISTORY
              </div>
              <span
                className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold text-[#3a2a05]"
                style={{ background: 'var(--grad-gold)' }}
              >
                BIG / SMALL
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              {apiRecords.slice(0, 10).map((r) => {
                const isBig = bsOf(r.number) === 'BIG';
                return (
                  <div
                    key={r.period}
                    className={`shrink-0 w-14 p-1.5 rounded-2xl text-center shadow-xs border flex flex-col items-center justify-center ${
                      isBig
                        ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                        : 'bg-sky-50/80 dark:bg-sky-950/30 border-sky-300 dark:border-sky-800'
                    }`}
                  >
                    <div
                      className={`font-['Sora'] font-black text-xs sm:text-sm tracking-wide ${
                        isBig ? 'text-amber-700 dark:text-amber-300' : 'text-sky-700 dark:text-sky-300'
                      }`}
                    >
                      {isBig ? 'BIG' : 'SMALL'}
                    </div>
                    <div className="text-[8.5px] sm:text-[9.5px] font-bold text-[var(--muted)] mt-0.5">
                      #{r.period.slice(-4)}
                    </div>
                    <div className="mt-0.5">
                      <NumberBall number={r.number} size="xs" showGlow={false} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Summary Card */}
          <div className="p-3.5 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-md">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              PERFORMANCE
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-[var(--paper)] border border-[var(--line)] text-center">
                <div className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-[var(--muted)]">TOTAL</div>
                <div className="font-['Sora'] font-black text-lg sm:text-xl text-[var(--ink)] mt-0.5">{totalCount}</div>
              </div>
              <div className="p-2 rounded-2xl bg-[var(--accent-soft)]/50 border border-[var(--accent)]/30 text-center">
                <div className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-[var(--accent-deep)]">WINS</div>
                <div className="font-['Sora'] font-black text-lg sm:text-xl text-[var(--accent-deep)] mt-0.5">{winCount}</div>
              </div>
              <div className="p-2 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center">
                <div className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-rose-700 dark:text-rose-400">LOSS</div>
                <div className="font-['Sora'] font-black text-lg sm:text-xl text-rose-600 dark:text-rose-400 mt-0.5">{lossCount}</div>
              </div>
            </div>
            <div className="mt-2 text-center text-xs sm:text-sm text-[var(--muted)] font-medium">
              Win Rate: <b className="text-[var(--accent-deep)] text-xs sm:text-sm font-['Sora'] font-extrabold">{winRate}%</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
