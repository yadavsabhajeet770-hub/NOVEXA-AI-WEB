/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ExternalLink,
  Play,
  Sparkles,
  Zap,
  Check,
  Copy,
  ChevronLeft,
  RotateCw,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { EnsembleResult } from '../utils/aiEngine';
import { GameMode } from '../types';

interface GamePortalViewProps {
  onShowToast: (msg: string, type?: 'win' | 'err') => void;
  prediction?: EnsembleResult | null;
  countdownSec?: number;
  nextPeriod?: string;
  onRequestPrediction?: () => void;
  onNavigateHome?: () => void;
  curMode?: GameMode;
  onSwitchMode?: (mode: GameMode) => void;
}

export interface GamePlatform {
  id: '9k-club' | 'dhani-win';
  title: string;
  tagline: string;
  url: string;
  inviteCode: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  features: string[];
  description: string;
  stats: {
    players: string;
    syncRate: string;
    speed: string;
  };
}

const OFFICIAL_GAMES: GamePlatform[] = [
  {
    id: '9k-club',
    title: '9K CLUB',
    tagline: 'Official 9K Club VIP Gaming & WinGo',
    url: 'https://9k545.com/register?inviteCode=HFS25AN&from=web',
    inviteCode: 'HFS25AN',
    badge: 'OFFICIAL VIP',
    badgeColor: 'from-amber-400 via-orange-500 to-amber-600',
    accentColor: '#f59e0b',
    features: ['Invite: HFS25AN', '1-Sec Result Sync', 'WinGo 30s & 1M', 'VIP Room'],
    description:
      'Premier high-speed WinGo platform with official invite code HFS25AN. Calibrated with CYRUS AI live pattern signals.',
    stats: {
      players: '84.2K Active',
      syncRate: '99.4% Match',
      speed: '< 0.8s Sync',
    },
  },
  {
    id: 'dhani-win',
    title: 'DHANI WIN',
    tagline: 'Official Dhani Win 30s & 1M Gaming Portal',
    url: 'https://dhaniwin9.com/register?inviteCode=HRJ4KLN&from=web',
    inviteCode: 'HRJ4KLN',
    badge: 'VERIFIED CLUB',
    badgeColor: 'from-emerald-400 via-teal-500 to-emerald-600',
    accentColor: '#10b981',
    features: ['Invite: HRJ4KLN', 'Instant WinGo', 'Fast Withdrawal', '2L Recovery'],
    description:
      'High liquidity live color trading portal with official invite code HRJ4KLN. Integrated with 2-Loss Opposite Recovery signals.',
    stats: {
      players: '92.6K Active',
      syncRate: '98.9% Match',
      speed: '< 1.0s Sync',
    },
  },
];

export const GamePortalView: React.FC<GamePortalViewProps> = ({
  onShowToast,
  prediction,
  countdownSec = 60,
  nextPeriod,
  onRequestPrediction,
  onNavigateHome,
  curMode = '1M',
  onSwitchMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | '9k-club' | 'dhani-win'>('all');
  const [activeGame, setActiveGame] = useState<GamePlatform | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Floating Cyber HUD State (Collapsible into floating glowing orb)
  const [isHudMinimized, setIsHudMinimized] = useState<boolean>(false);
  const [hudPos, setHudPos] = useState<{ x: number; y: number }>({ x: 12, y: 58 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number }>({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  });

  // Filter between the two official games
  const filteredGames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OFFICIAL_GAMES.filter((g) => {
      const matchFilter = selectedFilter === 'all' || g.id === selectedFilter;
      const matchSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.tagline.toLowerCase().includes(q) ||
        g.inviteCode.toLowerCase().includes(q) ||
        g.features.some((f) => f.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleCopyCode = (id: string, code: string) => {
    sound.playTap();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
    } catch {
      // ignore
    }
    setCopiedId(id);
    onShowToast(`Invite code ${code} copied!`, 'win');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLaunchGame = (game: GamePlatform) => {
    sound.playTap();
    setActiveGame(game);
    setIsHudMinimized(false);
    onShowToast(`Opening ${game.title} with CYRUS AI Live HUD…`, 'win');
  };

  // Draggable Cyber HUD Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Ignore button clicks from triggering drag
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: hudPos.x,
      startY: hudPos.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxX = typeof window !== 'undefined' ? window.innerWidth - (isHudMinimized ? 70 : 236) : 200;
    const maxY = typeof window !== 'undefined' ? window.innerHeight - (isHudMinimized ? 70 : 290) : 400;

    setHudPos({
      x: Math.max(8, Math.min(maxX, dragStartRef.current.startX + dx)),
      y: Math.max(50, Math.min(maxY, dragStartRef.current.startY + dy)),
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="pb-28 px-3 pt-2 animate-fadeIn max-w-full">
      {/* Sleek Top Bar (Specific to Game Hub, replaces global Navbar) */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2 min-w-0">
          {onNavigateHome && (
            <button
              onClick={() => {
                sound.playTap();
                onNavigateHome();
              }}
              className="h-9 px-3 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] text-[var(--ink)] font-['Sora'] font-bold text-xs flex items-center gap-1 active:scale-95 transition-transform cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--accent-deep)]" />
              <span>Home</span>
            </button>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
              <span className="font-['Sora'] font-black text-xs text-[var(--ink)] tracking-wide">
                GAME PORTAL
              </span>
            </div>
            <p className="text-[10px] text-[var(--muted)] font-medium">
              Choose 9K Club or Dhani Win
            </p>
          </div>
        </div>

        {/* Live Signal Badge */}
        <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] text-[10.5px] font-['Sora'] font-black text-[var(--accent-deep)] shadow-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{prediction ? `${prediction.bs} #${prediction.number}` : 'AI READY'}</span>
        </div>
      </div>

      {/* Real-Time Search Bar */}
      <div className="relative mb-3">
        <div className="relative flex items-center bg-[var(--paper-2)] border border-[var(--line)] rounded-2xl shadow-xs focus-within:ring-2 focus-within:ring-[var(--accent)]/40 focus-within:border-[var(--accent)] transition-all overflow-hidden">
          <div className="pl-3.5 pr-2 text-[var(--muted)] flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[var(--accent-deep)]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 9K Club or Dhani Win..."
            className="w-full py-2.5 pr-9 text-xs sm:text-sm font-['Sora'] font-medium bg-transparent text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                sound.playTap();
                setSearchQuery('');
              }}
              className="absolute right-2.5 w-6 h-6 rounded-full flex items-center justify-center bg-black/10 dark:bg-white/10 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs: ALL, 9K CLUB, DHANI WIN */}
      <div className="flex items-center gap-1.5 mb-3.5">
        {[
          { id: 'all', label: 'All Games (2)' },
          { id: '9k-club', label: '9K CLUB' },
          { id: 'dhani-win', label: 'DHANI WIN' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setSelectedFilter(tab.id as 'all' | '9k-club' | 'dhani-win');
            }}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-['Sora'] font-bold text-center transition-all cursor-pointer select-none ${
              selectedFilter === tab.id
                ? 'bg-gradient-to-r from-[var(--c1)] to-[var(--c2)] text-white shadow-xs'
                : 'bg-[var(--paper-2)] text-[var(--muted)] border border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clean 2-Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredGames.map((game, idx) => {
          const is9K = game.id === '9k-club';

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-3xl border transition-all duration-300 relative overflow-hidden p-4 shadow-md flex flex-col justify-between ${
                is9K
                  ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/15 to-[var(--paper-2)] border-amber-500/40 shadow-amber-500/10'
                  : 'bg-gradient-to-br from-emerald-500/10 via-teal-500/15 to-[var(--paper-2)] border-emerald-500/40 shadow-emerald-500/10'
              }`}
            >
              {/* Metallic bevel glow line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              <div>
                {/* Header: Badge & Speed */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-['Sora'] font-black text-[9px] text-white shadow-xs bg-gradient-to-r ${game.badgeColor}`}
                  >
                    {game.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-['Space_Grotesk'] font-bold text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{game.stats.speed}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-['Sora'] font-black text-xl text-[var(--ink)] tracking-tight">
                  {game.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-snug mt-0.5 font-medium">
                  {game.tagline}
                </p>

                {/* Invite Code Box */}
                <div className="mt-3 p-2 rounded-xl bg-white/75 dark:bg-black/35 border border-[var(--line)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[10px] font-bold text-[var(--muted)] uppercase">Invite Code:</span>
                    <span className="font-mono font-black text-sm text-[var(--accent-deep)] tracking-wider">
                      {game.inviteCode}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(game.id, game.inviteCode)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-['Sora'] font-bold flex items-center gap-1 bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--accent-soft)] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    {copiedId === game.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500 font-extrabold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[var(--muted)]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Features Tags */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1">
                  {game.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[9.5px] px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--line)] text-[var(--muted)] font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Play in Fullscreen App OR Open in Direct Browser */}
              <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center gap-2">
                <button
                  onClick={() => handleLaunchGame(game)}
                  className={`flex-1 py-3 px-3 rounded-2xl font-['Sora'] font-black text-xs sm:text-sm text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none ${
                    is9K
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-105'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-105'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NOW</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/25 text-white/90">CYRUS HUD</span>
                </button>

                {/* Clean Direct Browser Window Link */}
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTap()}
                  className="py-3 px-3 rounded-2xl font-['Sora'] font-bold text-xs bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] shadow-xs hover:bg-[var(--paper-2)] active:scale-95 transition-all flex items-center justify-center gap-1"
                  title="Open directly in phone browser"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>Direct</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No results message */}
      {filteredGames.length === 0 && (
        <div className="p-8 text-center rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm">
          <p className="font-['Sora'] font-bold text-sm text-[var(--ink)]">
            No games found for "{searchQuery}"
          </p>
          <button
            onClick={() => {
              sound.playTap();
              setSearchQuery('');
              setSelectedFilter('all');
            }}
            className="mt-3 px-3.5 py-1.5 rounded-xl font-['Sora'] font-bold text-xs bg-[var(--paper)] text-[var(--accent-deep)] border border-[var(--line)] cursor-pointer"
          >
            Show 9K Club & Dhani Win
          </button>
        </div>
      )}

      {/* Clean Bottom Note */}
      <div className="mt-3.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-xs">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="text-[11px] text-[var(--muted)] leading-tight">
          Both games are calibrated with 1-second live result polling and CYRUS AI live cyber HUD.
        </span>
      </div>

      {/* Fullscreen Mobile-Optimized In-App Game Viewer Modal rendered via document.body Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeGame && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] w-screen h-[100dvh] flex flex-col bg-[#0b0f14] overflow-hidden"
              >
                {/* Top Control Bar (Never overlaps the game, fixed compact height) */}
                <div className="h-12 px-3 bg-[#131921] border-b border-white/10 flex items-center justify-between gap-2 shrink-0 z-30 select-none">
                  {/* Exit Game Button */}
                  <button
                    onClick={() => {
                      sound.playTap();
                      setActiveGame(null);
                    }}
                    className="h-8 px-2.5 rounded-xl font-['Sora'] font-extrabold text-xs bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Exit</span>
                  </button>

                  {/* Game Name & Status */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-['Sora'] font-black text-xs sm:text-sm text-white truncate">
                      {activeGame.title}
                    </span>
                    <span className="hidden sm:inline font-mono text-[10px] text-white/50">
                      (Code: {activeGame.inviteCode})
                    </span>
                  </div>

                  {/* Direct Browser Window Link */}
                  <a
                    href={activeGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTap()}
                    className="h-8 px-3 rounded-xl font-['Sora'] font-bold text-xs bg-amber-400 text-[#2a1d00] hover:bg-amber-300 active:scale-95 transition-all flex items-center gap-1 shadow-sm"
                    title="Open in native Chrome window"
                  >
                    <span>Direct Play</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Game Screen Frame (Uses full remaining height, device-responsive, zero bottom bars) */}
                <div className="flex-1 relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <iframe
                    src={activeGame.url}
                    title={activeGame.title}
                    className="w-full h-full border-0 select-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      touchAction: 'manipulation',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />

                  {/* ===================================================================
                      PREMIUM 3D CYBER HUD (From User Attachment: SHUBHAM / CYRUS PANEL)
                      Features:
                      1. Floating Minimized Cyber Launcher Orb with Glowing Rings
                      2. Expanded 3D Cyber HUD with Conic Plasma Border, Holographic Pod,
                         Target Ball Number, BIG/SMALL Neon Badge, Period, Countdown,
                         and EXECUTE / MINIMIZE Controls.
                      =================================================================== */}

                  {/* 1. Minimized Glowing Cyber Launcher Orb */}
                  {isHudMinimized ? (
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: `${hudPos.x}px`,
                        top: `${hudPos.y}px`,
                        touchAction: 'none',
                        zIndex: 50,
                      }}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        sound.playTap();
                        setIsHudMinimized(false);
                      }}
                      className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none shadow-[0_12px_28px_#000,0_0_18px_rgba(57,255,20,0.48),inset_0_0_15px_rgba(57,255,20,0.24)] border-2 border-[rgba(57,255,20,0.7)] bg-[radial-gradient(circle_at_32%_25%,rgba(57,255,20,0.34),transparent_48%),linear-gradient(145deg,#003012,#000b05_62%,#000)] relative group"
                    >
                      {/* Spinning Outer SVG Rings */}
                      <svg
                        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none animate-spin"
                        style={{ animationDuration: '6s' }}
                        viewBox="0 0 62 62"
                      >
                        <circle
                          cx="31"
                          cy="31"
                          r="27"
                          fill="none"
                          stroke="#39ff14"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeDasharray="28 16"
                        />
                        <circle
                          cx="31"
                          cy="31"
                          r="23"
                          fill="none"
                          stroke="#b9ff00"
                          strokeWidth="1.2"
                          strokeDasharray="8 21"
                        />
                      </svg>

                      {/* Orbiting Satellite Light */}
                      <div
                        className="absolute -inset-1.5 pointer-events-none animate-spin"
                        style={{ animationDuration: '3s' }}
                      >
                        <i className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_9px_#b9ff00]" />
                      </div>

                      {/* Core Crowned Cyrus Emblem */}
                      <div className="relative z-10 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-black/60 border border-[rgba(57,255,20,0.5)] shadow-[0_0_10px_#39ff14] p-0.5">
                        <img
                          src="/assets/cyrus_dp.png"
                          alt="CYRUS DP"
                          className="w-full h-full object-contain pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    /* 2. Expanded 3D Cyber HUD Panel (Compact & Premium) */
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      style={{
                        position: 'absolute',
                        left: `${hudPos.x}px`,
                        top: `${hudPos.y}px`,
                        touchAction: 'none',
                        zIndex: 50,
                      }}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className="w-[224px] select-none rounded-[32px] p-[2px] relative overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.45),0_18px_50px_rgba(0,0,0,0.95)]"
                    >
                      {/* Rotating Conic Plasma Border Glow (From HTML Attachment) */}
                      <div
                        className="absolute -inset-[100%] z-0 pointer-events-none animate-spin"
                        style={{
                          animationDuration: '4s',
                          background:
                            'conic-gradient(from 0deg, transparent 60%, #39ff14 75%, #ffffff 82%, #00eaff 88%, transparent 100%)',
                        }}
                      />
                      <div
                        className="absolute -inset-[100%] z-0 pointer-events-none animate-spin"
                        style={{
                          animationDuration: '5.5s',
                          animationDirection: 'reverse',
                          opacity: 0.7,
                          background:
                            'conic-gradient(from 180deg, transparent 60%, #00c83c 75%, #ffe600 82%, #b9ff00 88%, transparent 100%)',
                        }}
                      />

                      {/* Inner Cyber Box */}
                      <div className="relative z-10 w-full h-full rounded-[30px] p-2.5 bg-[radial-gradient(circle_at_50%_-10%,rgba(0,83,30,0.72),transparent_53%),linear-gradient(#001208,#000803_57%,#000201)] border border-[rgba(57,255,20,0.3)] shadow-[inset_0_0_22px_rgba(57,255,20,0.25)] flex flex-col justify-between">
                        {/* Header Section */}
                        <div className="pb-1.5 border-b border-[rgba(57,255,20,0.35)] flex flex-col gap-1.5">
                          {/* Title Bar with Drag Handle & Minimize Button */}
                          <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-[linear-gradient(90deg,rgba(57,255,20,0.18),rgba(0,0,0,0.9),rgba(0,234,255,0.15))] border border-[rgba(57,255,20,0.45)] shadow-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-ping" />
                              <span className="font-['Orbitron'] font-black text-[10px] text-white tracking-wider drop-shadow-[0_0_6px_#39ff14]">
                                CYRUS AI VIP
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.playTap();
                                setIsHudMinimized(true);
                              }}
                              className="w-5 h-5 rounded-md flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#39ff14] cursor-pointer"
                              title="Minimize to floating orb"
                            >
                              <Minimize2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* 30s & 1M Game Mode Switcher (Compact & Premium) */}
                          <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-black/65 border border-[rgba(57,255,20,0.35)] shadow-inner">
                            <div className="flex items-center gap-1 text-[7.5px] font-mono font-bold text-white/80">
                              <Zap className="w-2.5 h-2.5 text-[#39ff14]" />
                              <span>WINGO ROOM</span>
                            </div>

                            <div className="flex items-center gap-1 p-0.5 rounded-md bg-[#001406] border border-[rgba(57,255,20,0.4)]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sound.playTap();
                                  if (onSwitchMode) onSwitchMode('30s');
                                }}
                                className={`px-2 py-0.5 rounded font-['Orbitron'] font-black text-[7.5px] tracking-wider transition-all cursor-pointer ${
                                  curMode === '30s'
                                    ? 'bg-gradient-to-r from-[#39ff14] via-[#00ff88] to-[#00c83c] text-[#001907] shadow-[0_0_10px_rgba(57,255,20,0.85)] scale-102'
                                    : 'text-white/60 hover:text-white bg-transparent'
                                }`}
                              >
                                30S
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sound.playTap();
                                  if (onSwitchMode) onSwitchMode('1M');
                                }}
                                className={`px-2 py-0.5 rounded font-['Orbitron'] font-black text-[7.5px] tracking-wider transition-all cursor-pointer ${
                                  curMode === '1M'
                                    ? 'bg-gradient-to-r from-[#ffe600] via-[#ffcc00] to-[#ff9900] text-[#1c1200] shadow-[0_0_10px_rgba(255,230,0,0.85)] scale-102'
                                    : 'text-white/60 hover:text-white bg-transparent'
                                }`}
                              >
                                1M
                              </button>
                            </div>
                          </div>

                          {/* Stat Strip: SYS, ROOM, TIME */}
                          <div className="grid grid-cols-3 gap-1 text-[6.5px] font-mono font-bold tracking-tight text-white/80">
                            <span className="py-0.5 px-1 rounded bg-[rgba(57,255,20,0.18)] border border-[rgba(57,255,20,0.35)] text-center">
                              SYS:<b className="text-[#ffe600] ml-0.5">ONLINE</b>
                            </span>
                            <span className="py-0.5 px-1 rounded bg-[rgba(57,255,20,0.18)] border border-[rgba(57,255,20,0.35)] text-center">
                              ROOM:<b className="text-[#00eaff] ml-0.5">{curMode === '30s' ? '30S' : '1M'}</b>
                            </span>
                            <span className="py-0.5 px-1 rounded bg-[rgba(57,255,20,0.18)] border border-[rgba(57,255,20,0.35)] text-center">
                              TIME:
                              <b className="text-[#ffe600] ml-0.5">
                                {String(Math.floor(countdownSec / 60)).padStart(2, '0')}:
                                {String(countdownSec % 60).padStart(2, '0')}
                              </b>
                            </span>
                          </div>
                        </div>

                        {/* Center Stage: Holographic Housing & Target Pod */}
                        <div className="relative my-2 w-full p-2.5 rounded-2xl bg-[radial-gradient(circle,rgba(0,234,255,0.08),transparent_58%),linear-gradient(145deg,rgba(0,27,10,0.98),rgba(0,5,2,0.99))] border border-[rgba(57,255,20,0.55)] shadow-[0_0_19px_rgba(57,255,20,0.3),inset_0_0_20px_rgba(57,255,20,0.2)] overflow-hidden">
                          {/* 4 Corner Tech Brackets */}
                          <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#39ff14] shadow-[0_0_3px_#39ff14]" />
                          <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#39ff14] shadow-[0_0_3px_#39ff14]" />
                          <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#39ff14] shadow-[0_0_3px_#39ff14]" />
                          <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#39ff14] shadow-[0_0_3px_#39ff14]" />

                          {/* Prediction Shell Layout */}
                          <div className="flex items-center gap-2">
                            {/* Left: 3D Number Pod with Gyroscopic Rings */}
                            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                              {/* Spinning Gyro Ring 1 */}
                              <div
                                className="absolute inset-0 rounded-full border border-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.4)] animate-spin pointer-events-none"
                                style={{ animationDuration: '3.5s' }}
                              />
                              {/* Spinning Gyro Ring 2 */}
                              <div
                                className="absolute inset-1 rounded-full border border-[#00eaff] shadow-[0_0_8px_rgba(0,234,255,0.4)] animate-spin pointer-events-none"
                                style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
                              />

                              {/* Number Plate Display */}
                              <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-[#003612] via-[#001006] to-[#00250c] border border-[#39ff14] flex flex-col items-center justify-center shadow-inner">
                                <span className="font-['Orbitron'] font-black text-xl text-white drop-shadow-[0_0_8px_#39ff14]">
                                  {prediction ? prediction.number : '—'}
                                </span>
                                <span className="text-[6.5px] font-mono font-bold text-white/70 uppercase">
                                  {prediction ? prediction.color : 'BALL'}
                                </span>
                              </div>
                            </div>

                            {/* Right: BIG / SMALL Neon Badge & Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                              {/* Signal Locked Status */}
                              <div className="flex items-center gap-1 text-[6.5px] font-mono font-bold tracking-wider text-[#00eaff]">
                                <span className="w-1 h-1 rounded-full bg-[#39ff14] animate-ping" />
                                <span>SIGNAL LOCKED</span>
                              </div>

                              {/* Big / Small 3D Badge */}
                              <div
                                className={`py-1 px-1.5 rounded-lg text-center font-['Orbitron'] font-black text-xs tracking-wider text-white shadow-md transform -skew-x-3 ${
                                  prediction?.bs === 'BIG'
                                    ? 'bg-gradient-to-r from-[#38ff7a] via-[#009833] to-[#003612] border border-[#baffc7] shadow-[0_0_12px_rgba(57,255,100,0.6)]'
                                    : 'bg-gradient-to-r from-[#2ceaff] via-[#007db4] to-[#002b46] border border-[#bdf7ff] shadow-[0_0_12px_rgba(0,234,255,0.6)]'
                                }`}
                              >
                                {prediction?.bs || 'STANDBY'}
                              </div>

                              {/* Sync Track Bar */}
                              <div className="flex items-center gap-1 text-[6px] font-mono text-white/80">
                                <span>SYNC</span>
                                <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
                                  <div className="h-full w-[99%] bg-gradient-to-r from-[#39ff14] via-[#00eaff] to-[#ffe600] shadow-[0_0_4px_#00eaff]" />
                                </div>
                                <b className="text-[#ffe600]">
                                  {prediction ? `${prediction.confidence}%` : '99%'}
                                </b>
                              </div>
                            </div>
                          </div>

                          {/* Target Period Strip */}
                          <div className="mt-1.5 pt-1 border-t border-[rgba(0,234,255,0.35)] flex items-center justify-between text-[7px] font-mono tracking-wider text-white/90">
                            <span>
                              PERIOD: <strong>#{nextPeriod ? nextPeriod.slice(-5) : '-----'}</strong>
                            </span>
                            <span className="text-[#00eaff] font-bold">CYRUS CORE</span>
                          </div>
                        </div>

                        {/* Bottom Actions: EXECUTE & MINIMIZE Buttons (From User HTML) */}
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              sound.playTap();
                              if (onRequestPrediction) onRequestPrediction();
                            }}
                            className="flex-1 h-7 rounded-xl font-['Orbitron'] font-black text-[8px] tracking-wider text-[#001006] bg-[linear-gradient(rgba(255,255,255,0.8),transparent_42%),linear-gradient(90deg,#b9ff00,#ffe600,#39ff14,#b9ff00)] shadow-[0_2px_0_#00651d,0_3px_8px_#000,0_0_12px_rgba(57,255,20,0.55)] active:translate-y-0.5 cursor-pointer uppercase transition-all"
                          >
                            EXECUTE
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              sound.playTap();
                              setIsHudMinimized(true);
                            }}
                            className="h-7 px-2.5 rounded-xl font-['Orbitron'] font-bold text-[7.5px] tracking-wider text-white border border-[#00c83c] bg-[linear-gradient(rgba(255,255,255,0.13),transparent_43%),linear-gradient(90deg,#001907,#00501d,#001907)] shadow-[0_2px_0_#00250c,inset_0_0_8px_rgba(57,255,20,0.3)] active:translate-y-0.5 cursor-pointer uppercase"
                          >
                            CLOSE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
