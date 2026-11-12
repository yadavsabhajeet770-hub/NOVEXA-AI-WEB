/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CYRUS AI — ADVANCED WINGO CHART & STATISTICS SYSTEM
 * Production-Quality 51GAME-Style 10-Rounds-Per-Page Chart & 50-Page Pagination
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  X,
  Clock,
  PieChart,
  BarChart3,
  Flame,
} from 'lucide-react';
import { GameMode, WingoHistoryItem } from '../types';
import { NumberBall } from './NumberBall';
import { sound } from '../utils/sound';

interface WingoChartProps {
  mode: GameMode;
  onSelectPeriod?: (period: string) => void;
}

const ROW_HEIGHT = 38; // px per row for exact SVG alignment
const PAGE_SIZE = 10; // Exactly 10 rounds per page (51GAME standard)

// Standard Wingo color mapping helper
export function getNumberColorType(n: number): 'green' | 'red' | 'violet-red' | 'violet-green' {
  if (n === 0) return 'violet-red';
  if (n === 5) return 'violet-green';
  if ([1, 3, 7, 9].includes(n)) return 'green';
  return 'red';
}

export const WingoChart: React.FC<WingoChartProps> = ({ mode }) => {
  const [data30s, setData30s] = useState<WingoHistoryItem[]>([]);
  const [data1M, setData1M] = useState<WingoHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<WingoHistoryItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const activeRecords = mode === '30s' ? data30s : data1M;
  const totalPages = Math.max(1, Math.ceil(activeRecords.length / PAGE_SIZE));

  // Reset to page 1 whenever mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [mode]);

  // Track active fetch requests to prevent race conditions
  const activeFetchIdRef = useRef<number>(0);

  const fetchHistory = useCallback(
    async (targetMode: GameMode, isSilent = false) => {
      const fetchId = ++activeFetchIdRef.current;
      if (!isSilent) setLoading(true);
      else setIsRefreshing(true);
      setError(null);

      try {
        const modeKey = targetMode === '30s' ? '30s' : '1m';
        const local1000Url = `/api/wingo/history?mode=${targetMode}&limit=1000`;
        const direct1000Url = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-${modeKey}-1000`;
        const fallback1000Url = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-30s-1000`;

        let res: Response | null = null;

        // Priority 1: High-speed local cached proxy with 1000 records
        try {
          res = await fetch(local1000Url, { signal: AbortSignal.timeout(4000) });
          if (!res.ok) res = null;
        } catch {
          res = null;
        }

        // Priority 2: Direct 1000 endpoint
        if (!res) {
          try {
            res = await fetch(direct1000Url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) res = null;
          } catch {
            res = null;
          }
        }

        // Priority 3: Fallback 1000 endpoint
        if (!res) {
          try {
            res = await fetch(fallback1000Url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
          } catch (e) {
            throw new Error('All 1000 history endpoints unreachable');
          }
        }

        const json = await res.json();

        if (json && json.data && Array.isArray(json.data.list)) {
          if (fetchId !== activeFetchIdRef.current) return; // Discard stale responses

          const list: WingoHistoryItem[] = json.data.list.map((item: any) => ({
            issueNumber: String(item.issueNumber || item.issue || item.periodNumber || ''),
            number: Number(item.number ?? 0),
            size: String(item.size || (Number(item.number) >= 5 ? 'big' : 'small')).toLowerCase() as 'big' | 'small',
            colour: String(item.colour || item.color || ''),
            time: String(item.time || ''),
          }));

          if (targetMode === '30s') {
            setData30s(list);
          } else {
            setData1M(list);
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err: unknown) {
        if (fetchId === activeFetchIdRef.current) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`Failed to fetch ${targetMode} chart data:`, msg);
          setError(`Unable to refresh ${targetMode === '30s' ? '30S' : '1M'} chart (${msg})`);
        }
      } finally {
        if (fetchId === activeFetchIdRef.current) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    []
  );

  // Auto-fetch whenever mode changes
  useEffect(() => {
    fetchHistory(mode, false);
  }, [mode, fetchHistory]);

  // Periodic background auto-refresh without page reload
  useEffect(() => {
    const intervalMs = mode === '30s' ? 5000 : 8000;
    const timer = setInterval(() => {
      fetchHistory(mode, true);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [mode, fetchHistory]);

  // 1. ADVANCED STATISTICS (Calculated across the latest 100 Periods)
  const stats = useMemo(() => {
    const sample = activeRecords.slice(0, 100);
    const total = sample.length;
    const freq = Array(10).fill(0);
    const missing = Array(10).fill(total);
    const maxConsecutive = Array(10).fill(0);

    if (total === 0) {
      return {
        freq,
        missing,
        avgMissing: Array(10).fill(0),
        maxConsecutive,
        bigCount: 0,
        smallCount: 0,
        bigPct: 50,
        smallPct: 50,
        redCount: 0,
        greenCount: 0,
        violetCount: 0,
        currentStreak: { type: '—', count: 0 },
        maxStreak: { type: '—', count: 0 },
        currentColorStreak: { color: '—', count: 0 },
      };
    }

    // 1. Frequency count in 100 periods
    sample.forEach((r) => {
      const n = r.number;
      if (n >= 0 && n <= 9) {
        freq[n]++;
      }
    });

    // 2. Missing count (periods since last appeared, 0 = appeared in latest period)
    for (let n = 0; n <= 9; n++) {
      const idx = sample.findIndex((r) => r.number === n);
      if (idx !== -1) {
        missing[n] = idx;
      }
    }

    // 3. Average Missing (average gap distance between appearances)
    const avgMissing = freq.map((f, n) => {
      if (f <= 0) return total;
      const indices: number[] = [];
      sample.forEach((r, i) => {
        if (r.number === n) indices.push(i);
      });
      if (indices.length <= 1) {
        return Math.round(total / f);
      }
      let totalGaps = 0;
      for (let i = 0; i < indices.length - 1; i++) {
        totalGaps += indices[i + 1] - indices[i];
      }
      return Math.max(1, Math.round(totalGaps / (indices.length - 1)));
    });

    // 4. Max Consecutive appearances in 100 periods
    for (let n = 0; n <= 9; n++) {
      let max = 0;
      let curr = 0;
      const chronological = [...sample].reverse();
      for (const r of chronological) {
        if (r.number === n) {
          curr++;
          if (curr > max) max = curr;
        } else {
          curr = 0;
        }
      }
      maxConsecutive[n] = max;
    }

    // 5. Big / Small analysis
    let bigCount = 0;
    let smallCount = 0;
    sample.forEach((r) => {
      if (r.number >= 5) bigCount++;
      else smallCount++;
    });
    const bigPct = Math.round((bigCount / total) * 100);
    const smallPct = 100 - bigPct;

    // Current streak
    const curStreakType = sample[0]?.number >= 5 ? 'BIG' : 'SMALL';
    let curStreakCount = 0;
    for (const r of sample) {
      const isB = r.number >= 5 ? 'BIG' : 'SMALL';
      if (isB === curStreakType) curStreakCount++;
      else break;
    }

    // Longest streak
    let maxStreakType = 'BIG';
    let maxStreakCount = 0;
    let tempType = '';
    let tempCount = 0;
    const chrono = [...sample].reverse();
    for (const r of chrono) {
      const type = r.number >= 5 ? 'BIG' : 'SMALL';
      if (type === tempType) {
        tempCount++;
      } else {
        tempType = type;
        tempCount = 1;
      }
      if (tempCount > maxStreakCount) {
        maxStreakCount = tempCount;
        maxStreakType = tempType;
      }
    }

    // 6. Colour breakdown
    let redCount = 0;
    let greenCount = 0;
    let violetCount = 0;
    sample.forEach((r) => {
      const n = r.number;
      if ([2, 4, 6, 8].includes(n)) redCount++;
      else if ([1, 3, 7, 9].includes(n)) greenCount++;
      else if (n === 0) {
        redCount++;
        violetCount++;
      } else if (n === 5) {
        greenCount++;
        violetCount++;
      }
    });

    const firstNum = sample[0]?.number;
    let firstColor = 'GREEN';
    if ([2, 4, 6, 8].includes(firstNum)) firstColor = 'RED';
    else if (firstNum === 0) firstColor = 'RED/VIOLET';
    else if (firstNum === 5) firstColor = 'GREEN/VIOLET';

    let curColCount = 0;
    for (const r of sample) {
      const n = r.number;
      let col = 'GREEN';
      if ([2, 4, 6, 8].includes(n)) col = 'RED';
      else if (n === 0) col = 'RED/VIOLET';
      else if (n === 5) col = 'GREEN/VIOLET';

      if (col === firstColor) curColCount++;
      else break;
    }

    return {
      freq,
      missing,
      avgMissing,
      maxConsecutive,
      bigCount,
      smallCount,
      bigPct,
      smallPct,
      redCount,
      greenCount,
      violetCount,
      currentStreak: { type: curStreakType, count: curStreakCount },
      maxStreak: { type: maxStreakType, count: maxStreakCount },
      currentColorStreak: { color: firstColor, count: curColCount },
    };
  }, [activeRecords]);

  // 2. PAGINATION SLICE: Exactly 10 Rounds for the current page
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return activeRecords.slice(start, start + PAGE_SIZE);
  }, [activeRecords, currentPage]);

  // Precomputed points for SVG Zigzag line ONLY across the 10 rows on current page
  const pageZigzagPoints = useMemo(() => {
    if (pageRecords.length === 0) return '';
    return pageRecords
      .map((r, i) => {
        // Grid is 10 columns, viewBox width is 1000 => each column width = 100, center = n * 100 + 50
        const x = r.number * 100 + 50;
        const y = i * ROW_HEIGHT + ROW_HEIGHT / 2;
        return `${x},${y}`;
      })
      .join(' ');
  }, [pageRecords]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      sound.playTap();
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      sound.playTap();
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <div className="w-full space-y-3.5 select-none animate-fadeIn">
      {error && (
        <div className="px-3.5 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-semibold flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchHistory(mode, false)}
            className="text-[11px] underline font-bold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* MAIN 51GAME-INSPIRED CHART & STATISTICS SYSTEM */}
      <div className="rounded-3xl overflow-hidden border border-[var(--line)] bg-white dark:bg-[var(--paper-2)] shadow-md">
        
        {/* Top Header Bar matching 51GAME Yellow Bar (Period | Number) */}
        <div className="bg-[#f5be2e] dark:bg-[#d9a01f] text-white px-4 py-2.5 flex items-center justify-between font-['Sora'] font-bold text-xs tracking-wider shadow-xs">
          <span>Period</span>
          <div className="flex items-center gap-2">
            <span>Number</span>
            {isRefreshing && <RotateCw className="w-3.5 h-3.5 animate-spin text-white/90" />}
          </div>
        </div>

        {/* SECTION 1: Statistics Matrix (Last 100 Periods) */}
        <div className="border-b border-[var(--line)] bg-slate-50/50 dark:bg-black/10">
          <div className="px-3.5 pt-2.5 pb-1 flex items-center justify-between">
            <span className="font-['Sora'] font-extrabold text-[11px] text-[var(--ink)] tracking-wide">
              Statistic (last 100 Periods)
            </span>
            <span className="text-[10px] font-bold text-[var(--muted)]">
              {activeRecords.length >= 100 ? '100 Rounds Sample' : `${activeRecords.length} Rounds`}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs select-none min-w-[320px]">
              <tbody>
                {/* Row 1: Winning Numbers with 0-9 red circle outlines */}
                <tr className="border-b border-[var(--line)]/60">
                  <td className="py-2 px-2 text-left font-['Sora'] font-bold text-[10.5px] text-[var(--ink)] whitespace-nowrap pl-3 w-32">
                    Winning Numbers
                  </td>
                  {Array.from({ length: 10 }).map((_, n) => (
                    <td key={n} className="py-2 px-0.5">
                      <span className="inline-flex w-[19px] h-[19px] rounded-full items-center justify-center border border-red-500 text-red-600 dark:text-red-400 font-['Sora'] font-bold text-[10px]">
                        {n}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row 2: Missing */}
                <tr className="border-b border-[var(--line)]/60">
                  <td className="py-1.5 px-2 text-left font-['Sora'] font-semibold text-[10px] text-[var(--muted)] whitespace-nowrap pl-3">
                    Missing
                  </td>
                  {stats.missing.map((val, n) => {
                    const isZero = val === 0;
                    return (
                      <td key={n} className="py-1.5 px-0.5">
                        <span
                          className={`inline-block font-mono text-[10.5px] ${
                            isZero
                              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1 rounded font-black'
                              : 'text-slate-600 dark:text-slate-400 font-bold'
                          }`}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 3: Avg missing */}
                <tr className="border-b border-[var(--line)]/60">
                  <td className="py-1.5 px-2 text-left font-['Sora'] font-semibold text-[10px] text-[var(--muted)] whitespace-nowrap pl-3">
                    Avg missing
                  </td>
                  {stats.avgMissing.map((val, n) => (
                    <td key={n} className="py-1.5 px-0.5 font-mono text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                      {val}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Frequency (Highlighted in Green Font) */}
                <tr className="border-b border-[var(--line)]/60 bg-emerald-50/20 dark:bg-emerald-950/10">
                  <td className="py-1.5 px-2 text-left font-['Sora'] font-semibold text-[10px] text-emerald-700 dark:text-emerald-300 whitespace-nowrap pl-3">
                    Frequency
                  </td>
                  {stats.freq.map((val, n) => (
                    <td key={n} className="py-1.5 px-0.5 font-mono text-[10.5px] font-black text-emerald-600 dark:text-emerald-400">
                      {val}
                    </td>
                  ))}
                </tr>

                {/* Row 5: Max consecutive */}
                <tr>
                  <td className="py-1.5 px-2 text-left font-['Sora'] font-semibold text-[10px] text-[var(--muted)] whitespace-nowrap pl-3">
                    Max consecutive
                  </td>
                  {stats.maxConsecutive.map((val, n) => (
                    <td key={n} className="py-1.5 px-0.5 font-mono text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                      {val}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: Exactly 10 Rounds Per Page Chart with Page-Specific Polyline */}
        <div className="relative">
          {/* Table Header: Period | 0 1 2 3 4 5 6 7 8 9 | B/S */}
          <div className="grid grid-cols-[105px_1fr_28px] sm:grid-cols-[135px_1fr_32px] items-center py-2 px-2.5 bg-slate-100/90 dark:bg-black/25 border-b border-[var(--line)] text-[10.5px] font-['Sora'] font-extrabold text-[var(--ink)] tracking-wider">
            <div className="pl-1">Period</div>
            <div className="grid grid-cols-10 text-center">
              {Array.from({ length: 10 }).map((_, n) => (
                <span key={n} className="text-slate-500 dark:text-slate-400 font-mono text-[10px] sm:text-[11px]">
                  {n}
                </span>
              ))}
            </div>
            <div className="text-center">B/S</div>
          </div>

          {/* 10 Rows Container with Overlay SVG Line */}
          <div
            className="relative select-none divide-y divide-[var(--line)]/60"
            style={{ minHeight: `${PAGE_SIZE * ROW_HEIGHT}px` }}
          >
            {/* SVG Connecting Line (rendered only across the 10 rows on this page) */}
            {pageRecords.length > 0 && (
              <div className="absolute top-0 bottom-0 left-[105px] right-[28px] sm:left-[135px] sm:right-[32px] pointer-events-none z-10">
                <svg
                  viewBox={`0 0 1000 ${pageRecords.length * ROW_HEIGHT}`}
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                >
                  <polyline
                    points={pageZigzagPoints}
                    stroke="#ef4444"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.85"
                  />
                </svg>
              </div>
            )}

            {/* Row Items */}
            {pageRecords.length === 0 ? (
              <div className="py-16 text-center text-xs text-[var(--muted)]">
                {loading ? 'Fetching historical periods…' : 'No records found.'}
              </div>
            ) : (
              pageRecords.map((r, i) => {
                const winNum = r.number;
                const isBig = winNum >= 5;
                const colorType = getNumberColorType(winNum);

                return (
                  <div
                    key={r.issueNumber || i}
                    onClick={() => {
                      sound.playTap();
                      setSelectedRecord(r);
                    }}
                    className="grid grid-cols-[105px_1fr_28px] sm:grid-cols-[135px_1fr_32px] items-center px-2.5 hover:bg-amber-500/5 active:bg-amber-500/10 cursor-pointer transition-colors relative"
                    style={{ height: `${ROW_HEIGHT}px` }}
                  >
                    {/* Left: Full 17-digit Period Number */}
                    <div className="font-mono text-[8.5px] sm:text-[10px] font-semibold text-[var(--muted)] dark:text-slate-300 tracking-[-0.03em] whitespace-nowrap pl-0.5">
                      {r.issueNumber}
                    </div>

                    {/* Middle: 0 to 9 numbers grid */}
                    <div className="relative z-20 grid grid-cols-10 items-center justify-items-center">
                      {Array.from({ length: 10 }).map((_, n) => {
                        const isWin = n === winNum;

                        if (!isWin) {
                          return (
                            <div
                              key={n}
                              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center border border-slate-300 dark:border-slate-700/80 text-slate-400 dark:text-slate-500 text-[9.5px] sm:text-[10.5px] font-mono"
                            >
                              {n}
                            </div>
                          );
                        }

                        // Winning Number Circle
                        if (colorType === 'violet-red') {
                          // 0: Red + Violet split
                          return (
                            <div
                              key={n}
                              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center text-white text-[9.5px] sm:text-[10.5px] font-black font-['Sora'] shadow-sm ring-1.5 ring-red-400/50"
                              style={{
                                background: 'conic-gradient(from 180deg, #ef4444 0% 50%, #a855f7 50% 100%)',
                              }}
                            >
                              0
                            </div>
                          );
                        }

                        if (colorType === 'violet-green') {
                          // 5: Green + Violet split
                          return (
                            <div
                              key={n}
                              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center text-white text-[9.5px] sm:text-[10.5px] font-black font-['Sora'] shadow-sm ring-1.5 ring-emerald-400/50"
                              style={{
                                background: 'conic-gradient(from 180deg, #10b981 0% 50%, #a855f7 50% 100%)',
                              }}
                            >
                              5
                            </div>
                          );
                        }

                        if (colorType === 'green') {
                          return (
                            <div
                              key={n}
                              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center bg-emerald-500 text-white text-[9.5px] sm:text-[10.5px] font-black font-['Sora'] shadow-sm ring-1.5 ring-emerald-400/50"
                            >
                              {n}
                            </div>
                          );
                        }

                        // Red
                        return (
                          <div
                            key={n}
                            className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center bg-red-500 text-white text-[9.5px] sm:text-[10.5px] font-black font-['Sora'] shadow-sm ring-1.5 ring-red-400/50"
                          >
                            {n}
                          </div>
                        );
                      })}
                    </div>

                    {/* Right: B / S Badge */}
                    <div className="flex justify-center">
                      <span
                        className={`w-[19px] h-[19px] sm:w-[21px] sm:h-[21px] rounded-full flex items-center justify-center font-['Sora'] font-black text-[9px] sm:text-[10px] shadow-xs ${
                          isBig
                            ? 'bg-amber-400 text-[#3a2a05]'
                            : 'bg-sky-500 text-white'
                        }`}
                      >
                        {isBig ? 'B' : 'S'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* SECTION 3: 51GAME-Style Pagination (< 1/50 >) */}
          <div className="flex items-center justify-center gap-6 py-4 bg-slate-50/70 dark:bg-black/20 border-t border-[var(--line)] select-none">
            {/* Prev Page Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-white/20 transition-all active:scale-95 cursor-pointer shadow-xs"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Page Indicator */}
            <span className="font-['Sora'] font-extrabold text-sm text-[var(--ink)] tracking-wider">
              {currentPage}/{totalPages}
            </span>

            {/* Next Page Button (Gold 51GAME Button) */}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="w-10 h-10 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] active:bg-[#a16207] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: Big/Small & Colour Analysis Cards (Last 100 Periods) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
        {/* Card A: Big / Small Analysis */}
        <div className="p-4 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-sm backdrop-blur-md space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-['Sora'] font-bold text-xs text-[var(--ink)]">
              <PieChart className="w-4 h-4 text-amber-500" />
              <span>BIG / SMALL ANALYSIS</span>
            </div>
            <span className="text-[10px] font-bold text-[var(--muted)]">100 Rounds</span>
          </div>

          {/* Counts & Percentages */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
              <div className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300">BIG</div>
              <div className="font-['Sora'] font-black text-xl text-amber-600 dark:text-amber-400 mt-0.5">
                {stats.bigCount} <span className="text-xs font-bold">({stats.bigPct}%)</span>
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40">
              <div className="text-[10px] font-extrabold text-sky-800 dark:text-sky-300">SMALL</div>
              <div className="font-['Sora'] font-black text-xl text-sky-600 dark:text-sky-400 mt-0.5">
                {stats.smallCount} <span className="text-xs font-bold">({stats.smallPct}%)</span>
              </div>
            </div>
          </div>

          {/* Dual Color Progress Bar */}
          <div className="space-y-1">
            <div className="w-full h-2.5 rounded-full overflow-hidden bg-slate-100 dark:bg-black/40 flex">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                style={{ width: `${stats.bigPct}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-500"
                style={{ width: `${stats.smallPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-[var(--muted)] px-0.5">
              <span>BIG {stats.bigPct}%</span>
              <span>SMALL {stats.smallPct}%</span>
            </div>
          </div>

          {/* Streaks */}
          <div className="flex items-center justify-between pt-1 border-t border-[var(--line)] text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-bold text-[var(--muted)]">Streak:</span>
              <span className="font-['Sora'] font-black text-[11px] text-[var(--ink)]">
                {stats.currentStreak.count}x {stats.currentStreak.type}
              </span>
            </div>
            <div className="text-[11px] font-medium text-[var(--muted)]">
              Max: <strong className="text-[var(--ink)]">{stats.maxStreak.count}x {stats.maxStreak.type}</strong>
            </div>
          </div>
        </div>

        {/* Card B: Colour Analysis */}
        <div className="p-4 rounded-3xl bg-white/95 dark:bg-[var(--paper-2)]/95 border border-[var(--line)] shadow-sm backdrop-blur-md space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-['Sora'] font-bold text-xs sm:text-sm text-[var(--ink)]">
              <Activity className="w-4 h-4 text-[var(--accent)]" />
              <span>COLOUR ANALYSIS</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-[var(--muted)]">Distribution</span>
          </div>

          {/* Color Breakdown Pills */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
              <div className="text-[9.5px] font-extrabold text-emerald-800 dark:text-emerald-300">GREEN</div>
              <div className="font-['Sora'] font-black text-lg text-emerald-600 dark:text-emerald-400 mt-0.5">
                {stats.greenCount}
              </div>
            </div>
            <div className="p-2 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
              <div className="text-[9.5px] font-extrabold text-rose-800 dark:text-rose-300">RED</div>
              <div className="font-['Sora'] font-black text-lg text-rose-600 dark:text-rose-400 mt-0.5">
                {stats.redCount}
              </div>
            </div>
            <div className="p-2 rounded-2xl bg-purple-50/80 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40">
              <div className="text-[9.5px] font-extrabold text-purple-800 dark:text-purple-300">VIOLET</div>
              <div className="font-['Sora'] font-black text-lg text-purple-600 dark:text-purple-400 mt-0.5">
                {stats.violetCount}
              </div>
            </div>
          </div>

          {/* Color Streak */}
          <div className="flex items-center justify-between pt-1 border-t border-[var(--line)] text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[11px] sm:text-xs font-bold text-[var(--muted)]">Current Colour:</span>
              <span className="font-['Sora'] font-black text-[11px] sm:text-xs text-[var(--ink)]">
                {stats.currentColorStreak.count}x {stats.currentColorStreak.color}
              </span>
            </div>
          </div>

          {/* Recent 10 Color Beads */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[10px] font-bold text-[var(--muted)]">Recent:</span>
            <div className="flex items-center gap-1">
              {activeRecords.slice(0, 10).map((r, i) => {
                const colorType = getNumberColorType(r.number);
                return (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full shadow-xs inline-block"
                    style={{
                      background:
                        colorType === 'green'
                          ? '#10b981'
                          : colorType === 'red'
                          ? '#ef4444'
                          : colorType === 'violet-red'
                          ? 'conic-gradient(#ef4444 50%, #a855f7 50%)'
                          : 'conic-gradient(#10b981 50%, #a855f7 50%)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Interactive Round Detail Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] p-5 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-deep)]">
                  PERIOD DETAILS
                </span>
                <div className="font-mono font-bold text-sm text-[var(--ink)] mt-0.5">
                  #{selectedRecord.issueNumber}
                </div>

                <div className="my-3 flex justify-center">
                  <NumberBall number={selectedRecord.number} size="lg" showGlow={true} />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <div className="text-[9px] font-bold text-[var(--muted)]">NUMBER</div>
                    <div className="font-['Sora'] font-black text-base text-[var(--ink)] mt-0.5">
                      {selectedRecord.number}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <div className="text-[9px] font-bold text-[var(--muted)]">SIZE</div>
                    <div
                      className={`font-['Sora'] font-black text-base mt-0.5 ${
                        selectedRecord.number >= 5 ? 'text-amber-500' : 'text-sky-500'
                      }`}
                    >
                      {selectedRecord.number >= 5 ? 'BIG' : 'SMALL'}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--paper)] border border-[var(--line)]">
                    <div className="text-[9px] font-bold text-[var(--muted)]">COLOUR</div>
                    <div className="font-['Sora'] font-black text-xs uppercase mt-1 text-emerald-600 dark:text-emerald-400">
                      {selectedRecord.colour || getNumberColorType(selectedRecord.number)}
                    </div>
                  </div>
                </div>

                {selectedRecord.time && (
                  <div className="mt-3 text-[11px] font-medium text-[var(--muted)] flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Timestamp: {selectedRecord.time}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
