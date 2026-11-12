/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Flame,
  Trophy,
  TrendingUp,
  Search,
  Share2,
  Clock,
  Zap,
  Target,
  BarChart2,
  X,
  Copy,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserData, StoredPrediction } from '../types';
import { NumberBall } from './NumberBall';
import { sound } from '../utils/sound';
import { to17DigitPeriod } from '../utils/aiEngine';

interface HistoryViewProps {
  userData: UserData;
  onNavigateToGames?: () => void;
  onShowToast?: (msg: string, type?: 'win' | 'err') => void;
}

type FilterKey = 'all' | 'win' | 'loss' | 'skipped' | 'big' | 'small' | 'pending';

export const HistoryView: React.FC<HistoryViewProps> = ({
  userData,
  onNavigateToGames,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const total = userData.stats.t;
  const wins = userData.stats.w;
  const loss = userData.stats.l;
  const acc = total ? Math.round((wins / total) * 100) : 0;
  const skippedCount = useMemo(
    () => userData.predictions.filter((p) => p.result === 'SKIPPED' || p.isSkip).length,
    [userData.predictions]
  );

  // Streak calculations
  const { currentStreak, streakType, bestWinStreak } = useMemo(() => {
    let curr = 0;
    let type: 'WIN' | 'LOSS' | null = null;
    let best = 0;
    let runningWins = 0;

    const completed = userData.predictions.filter(
      (p) => p.result === 'WIN' || p.result === 'JACKPOT' || p.result === 'LOSS'
    );

    if (completed.length > 0) {
      type = completed[0].result === 'LOSS' ? 'LOSS' : 'WIN';
      for (const p of completed) {
        const itemType = p.result === 'LOSS' ? 'LOSS' : 'WIN';
        if (itemType === type) curr++;
        else break;
      }

      for (const p of completed) {
        if (p.result === 'WIN' || p.result === 'JACKPOT') {
          runningWins++;
          if (runningWins > best) best = runningWins;
        } else {
          runningWins = 0;
        }
      }
    }

    return { currentStreak: curr, streakType: type, bestWinStreak: best };
  }, [userData.predictions]);

  // Big vs Small wins breakdown
  const { bigWins, smallWins } = useMemo(() => {
    let bw = 0;
    let sw = 0;
    for (const p of userData.predictions) {
      if (p.result === 'WIN' || p.result === 'JACKPOT') {
        if (p.predBS === 'BIG') bw++;
        if (p.predBS === 'SMALL') sw++;
      }
    }
    return { bigWins: bw, smallWins: sw };
  }, [userData.predictions]);

  // Filtered and searched list
  const filteredList = useMemo(() => {
    return userData.predictions.filter((p) => {
      if (filter === 'win' && p.result !== 'WIN' && p.result !== 'JACKPOT') return false;
      if (filter === 'loss' && p.result !== 'LOSS') return false;
      if (filter === 'skipped' && !(p.result === 'SKIPPED' || p.isSkip)) return false;
      if (filter === 'big' && p.predBS !== 'BIG') return false;
      if (filter === 'small' && p.predBS !== 'SMALL') return false;
      if (filter === 'pending' && p.result !== 'PENDING') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const pid = p.period.toLowerCase();
        const num = String(p.predNum);
        const bs = p.predBS.toLowerCase();
        const pat = (p.patternName || '').toLowerCase();
        if (!pid.includes(q) && !num.includes(q) && !bs.includes(q) && !pat.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [userData.predictions, filter, searchQuery]);

  const handleCopyStats = () => {
    sound.playTap();
    const text = `CYRUS AI VIP Audit Report:\n• Win Rate: ${acc}%\n• Total Rounds: ${total}\n• Wins: ${wins} | Losses: ${loss}\n• Current Streak: ${currentStreak}x ${streakType || 'None'}\n• Best Win Run: ${bestWinStreak}W in a row\n• Big Wins: ${bigWins} | Small Wins: ${smallWins}\nVerified by CYRUS AI Pattern System`;
    navigator.clipboard?.writeText(text).catch(() => {});
    if (onShowToast) {
      onShowToast('Audit report copied to clipboard!', 'win');
    }
  };

  const handleCopyPeriod = (pid: string) => {
    sound.playTap();
    navigator.clipboard?.writeText(to17DigitPeriod(pid)).catch(() => {});
    if (onShowToast) {
      onShowToast(`Copied #${pid.slice(-6)}`, 'win');
    }
  };

  return (
    <div className="pb-28 px-3.5 pt-2 animate-fadeIn max-w-full">
      {/* Header with Title and Quick Share */}
      <div className="px-1.5 pt-2 pb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-extrabold tracking-[2px] uppercase text-[var(--accent-deep)] font-['Sora']">
              CYRUS AI AUDIT TELEMETRY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-['Sora'] font-black text-[var(--ink)] mt-0.5 tracking-tight">
            Prediction History
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] font-medium">
            Pattern database telemetry &amp; verified round results
          </p>
        </div>

        <button
          onClick={handleCopyStats}
          title="Export / Share Stats"
          className="p-2.5 rounded-2xl bg-white dark:bg-[var(--paper-2)] border border-[var(--line)] shadow-sm hover:border-[var(--accent)] text-[var(--ink)] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm font-bold font-['Sora']"
        >
          <Share2 className="w-4 h-4 text-[var(--accent-deep)]" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      <div className="mt-2 flex flex-col gap-3.5">
        {/* Luxury Hero Analytical Card */}
        <div
          className="relative p-5 md:p-6 rounded-[28px] sm:rounded-[36px] text-white shadow-2xl overflow-hidden border border-white/20 transition-all duration-500"
          style={{
            background:
              'var(--hero-grad, linear-gradient(135deg, var(--c4) 0%, var(--c3) 40%, var(--accent) 75%, var(--c1) 100%))',
            boxShadow:
              'var(--hero-shadow, 0 20px 48px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3))',
          }}
        >
          {/* Ambient light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent bg-[length:200%_100%] animate-shine pointer-events-none" />

          {/* Top telemetry tag */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
              </span>
              <span className="font-['Sora'] font-extrabold text-xs sm:text-sm tracking-wider text-white">
                PERFORMANCE SCORECARD
              </span>
            </div>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-['Sora'] font-black tracking-widest text-[#3a2a05] shadow-xs"
              style={{ background: 'var(--grad-gold)' }}
            >
              VIP VERIFIED
            </span>
          </div>

          {/* KPI Cells Grid with Fluid Responsive Typography */}
          <div className="relative z-10 mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-center shadow-inner">
              <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-white/70">
                TOTAL
              </div>
              <div className="font-['Sora'] font-black text-xl sm:text-2xl md:text-3xl text-white mt-0.5">
                {total}
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-center shadow-inner">
              <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-white/90">
                WINS
              </div>
              <div className="font-['Sora'] font-black text-xl sm:text-2xl md:text-3xl text-white mt-0.5">
                {wins}
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-center shadow-inner">
              <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-rose-300">
                LOSSES
              </div>
              <div className="font-['Sora'] font-black text-xl sm:text-2xl md:text-3xl text-rose-300 mt-0.5">
                {loss}
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-center shadow-inner">
              <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-amber-200">
                ACCURACY
              </div>
              <div className="font-['Sora'] font-black text-xl sm:text-2xl md:text-3xl text-amber-200 mt-0.5">
                {acc}%
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 mt-3.5 h-2.5 rounded-full bg-black/35 overflow-hidden border border-white/15">
            <div
              className="h-full bg-gradient-to-r from-amber-300 via-white to-amber-200 rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${acc}%` }}
            />
          </div>

          {/* Streak & Best Run */}
          <div className="relative z-10 mt-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-white/95">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>
                {currentStreak > 1
                  ? `${currentStreak}× ${streakType} Streak Active`
                  : total > 0
                  ? 'Active round tracking'
                  : 'Start predicting to build streaks'}
              </span>
            </div>

            <div className="text-[11px] sm:text-xs text-amber-200 font-['Space_Grotesk'] font-bold">
              Best Run: <span className="font-black underline">{bestWinStreak}W</span> in a row
            </div>
          </div>
        </div>

        {/* Filter Pills + Search Bar */}
        <div className="space-y-2">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search by period #, number, Big/Small, or pattern name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] text-xs font-medium focus:outline-none focus:border-[var(--accent)] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Liquid Tabs Filter */}
          <div className="p-1 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] flex items-center gap-1 overflow-x-auto shadow-inner">
            {[
              { k: 'all', label: `All (${userData.predictions.length})` },
              { k: 'win', label: `Wins (${wins})` },
              { k: 'loss', label: `Losses (${loss})` },
              { k: 'skipped', label: `Skipped (${skippedCount})` },
              { k: 'big', label: 'Big' },
              { k: 'small', label: 'Small' },
              { k: 'pending', label: 'Pending' },
            ].map((item) => (
              <button
                key={item.k}
                onClick={() => {
                  sound.playTap();
                  setFilter(item.k as FilterKey);
                }}
                className="relative px-3.5 py-1.5 rounded-xl text-xs font-['Sora'] font-bold cursor-pointer select-none transition-colors duration-200 shrink-0"
              >
                {filter === item.k && (
                  <motion.div
                    layoutId="activeHistFilter"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-xl shadow-md"
                    style={{ background: 'var(--grad-deep)' }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    filter === item.k
                      ? 'text-white'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Cards Grid - Responsive: 1 col on mobile, 2 cols on desktop */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3.5">
          {filteredList.length === 0 ? (
            <div className="col-span-full p-10 rounded-3xl bg-[var(--paper-2)] border border-dashed border-[var(--line)] text-center text-[var(--muted)] text-xs">
              <Sparkles className="w-10 h-10 mx-auto mb-2.5 text-amber-400 animate-pulse" />
              <div className="font-['Sora'] font-black text-sm text-[var(--ink)]">
                {userData.predictions.length === 0
                  ? 'No predictions recorded yet'
                  : 'No records match your search filter'}
              </div>
              <div className="text-[11.5px] opacity-75 mt-1 max-w-xs mx-auto">
                Hit <span className="text-[var(--accent-deep)] font-extrabold">NEXT PREDICTION</span> in the games tab to generate signals using the pattern database.
              </div>
              {onNavigateToGames && (
                <button
                  onClick={() => {
                    sound.playTap();
                    onNavigateToGames();
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl text-white font-['Sora'] font-bold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
                  style={{ background: 'var(--grad-deep)' }}
                >
                  Go to Live Predictions
                </button>
              )}
            </div>
          ) : (
            filteredList.slice(0, 60).map((p: StoredPrediction, idx) => {
              const isPending = p.result === 'PENDING';
              const isSkipped = p.result === 'SKIPPED' || p.isSkip;
              const isJackpot = p.result === 'JACKPOT';
              const isWin = p.result === 'WIN' || isJackpot;

              return (
                <motion.div
                  key={`${p.period}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(0.25, idx * 0.03) }}
                  className={`p-4 rounded-[26px] bg-white/95 dark:bg-[var(--paper-2)]/95 border shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden ${
                    isPending
                      ? 'border-amber-400/40'
                      : isSkipped
                      ? 'border-amber-400/50 dark:border-amber-500/30 shadow-[0_4px_20px_-6px_rgba(245,158,11,0.2)]'
                      : isJackpot
                      ? 'border-amber-400 shadow-[0_4px_24px_-4px_rgba(251,191,36,0.45)] ring-1 ring-amber-400/50'
                      : isWin
                      ? 'border-[var(--accent)]/50 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.2)]'
                      : 'border-rose-300/40 dark:border-rose-900/40'
                  }`}
                >
                  {/* Subtle corner glow */}
                  <div
                    className={`absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none blur-2xl opacity-25 ${
                      isSkipped ? 'bg-amber-400' : isJackpot ? 'bg-amber-300' : isWin ? 'bg-[var(--accent)]' : isPending ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                  />

                  {/* Top Bar: Period ID & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyPeriod(p.period)}
                      className="flex items-center gap-1.5 text-left group cursor-pointer"
                      title="Click to copy period ID"
                    >
                      <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
                      <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[var(--ink)] tracking-wider group-hover:text-[var(--accent-deep)] transition-colors">
                        #{to17DigitPeriod(p.period)}
                      </span>
                      <Copy className="w-3 h-3 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-['Sora'] font-black tracking-wide ${
                        isPending
                          ? 'bg-amber-500/20 text-amber-500 border border-amber-400/30 animate-pulse'
                          : isSkipped
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/30'
                          : isJackpot
                          ? 'bg-amber-400 text-[#3a2a05] border border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                          : isWin
                          ? 'bg-[var(--accent-soft)] text-[var(--accent-deep)] border border-[var(--accent)]/30'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-400/30'
                      }`}
                    >
                      {isPending ? (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                          <span>PENDING</span>
                        </>
                      ) : isSkipped ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                          <span>SKIPPED (SAFE)</span>
                        </>
                      ) : isJackpot ? (
                        <>
                          <Trophy className="w-3.5 h-3.5 text-[#3a2a05] stroke-[2.5] animate-bounce" />
                          <span>JACKPOT</span>
                        </>
                      ) : isWin ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>WIN</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>MISSED</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Body: Comparison between Predicted and Actual Result */}
                  <div className="mt-3 grid grid-cols-7 items-center p-3 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)]">
                    {/* Left: Predicted Target */}
                    <div className="col-span-3 flex flex-col items-center">
                      <span className="text-[8.5px] font-extrabold tracking-widest text-[var(--muted)] uppercase">
                        {isSkipped ? 'AI ACTION' : 'PREDICTED'}
                      </span>
                      <div className="mt-1">
                        {isSkipped ? (
                          <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                        ) : (
                          <NumberBall number={p.predNum} size="md" showGlow={isWin} />
                        )}
                      </div>
                      <span
                        className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-['Sora'] font-black ${
                          isSkipped
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : p.predBS === 'BIG'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                        }`}
                      >
                        {isSkipped ? 'PASS ROUND' : p.predBS}
                      </span>
                    </div>

                    {/* Middle: Match Indicator */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      {isSkipped ? (
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-xs">
                          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : isWin ? (
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[var(--line)] text-[var(--muted)] flex items-center justify-center">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Right: Actual Result */}
                    <div className="col-span-3 flex flex-col items-center">
                      <span className="text-[8.5px] font-extrabold tracking-widest text-[var(--muted)] uppercase">
                        ACTUAL OUTCOME
                      </span>
                      <div className="mt-1">
                        {isPending ? (
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-500 font-extrabold text-sm animate-pulse">
                            ?
                          </div>
                        ) : p.actualNumber >= 0 ? (
                          <NumberBall number={p.actualNumber} size="md" showGlow={false} />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-dashed border-[var(--line)] flex items-center justify-center text-xs text-[var(--muted)] font-bold">
                            —
                          </div>
                        )}
                      </div>
                      <span
                        className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-['Sora'] font-black ${
                          isPending
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                            : p.actualBS === 'BIG'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : p.actualBS === 'SMALL'
                            ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                            : 'bg-gray-100 dark:bg-white/5 text-[var(--muted)]'
                        }`}
                      >
                        {isPending
                          ? 'Waiting…'
                          : p.actualNumber >= 0
                          ? `${p.actualBS} (#${p.actualNumber})`
                          : 'Filtered Out'}
                      </span>
                    </div>
                  </div>

                  {/* Foot: Pattern Pill, AI Guidance, Confidence */}
                  <div className="mt-3 pt-2.5 border-t border-[var(--line)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {isSkipped ? (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-['Sora'] font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>CAPITAL PRESERVED</span>
                        </span>
                      ) : p.isSureshot ? (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-['Sora'] font-black bg-amber-400 text-[#2a1d00] shadow-xs flex items-center gap-1">
                          <Target className="w-2.5 h-2.5" />
                          <span>SURESHOT</span>
                        </span>
                      ) : null}

                      {p.patternName ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[9.5px] font-['Sora'] font-black bg-[var(--accent-soft)] text-[var(--accent-deep)] border border-[var(--accent)]/25">
                          {p.patternName}
                        </span>
                      ) : p.skipReason ? (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                          {p.skipReason}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[var(--accent-soft)] text-[var(--accent-deep)] border border-[var(--accent)]/20">
                          Pattern Signal
                        </span>
                      )}

                      {p.time && (
                        <span className="text-[9.5px] font-['Space_Grotesk'] text-[var(--muted)]">
                          {p.time}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 font-['Sora'] font-black text-xs text-[var(--accent-deep)] shrink-0">
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{p.confidence}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
