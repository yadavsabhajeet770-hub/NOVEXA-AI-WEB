/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Clock, ArrowRight, Zap, ShieldCheck, Gamepad2 } from 'lucide-react';
import { GameMode } from '../types';
import { sound } from '../utils/sound';

interface GamesViewProps {
  onSelectGame: (mode: GameMode) => void;
  onShowToast: (msg: string, type?: 'win' | 'err') => void;
  onNavigateToPortal?: () => void;
}

interface ActiveGameItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  gradientClass: string;
  mode: GameMode;
  delay: number;
}

const ACTIVE_GAMES: ActiveGameItem[] = [
  {
    id: 'wg-30s',
    name: 'WinGo 30 Sec',
    badge: 'ULTRA FAST',
    desc: '30-second live high-speed rounds',
    sub: '1000-data real-time deep neural pattern analysis',
    icon: Timer,
    gradientClass: 'from-amber-400 via-orange-500 to-rose-500',
    mode: '30s',
    delay: 0.05,
  },
  {
    id: 'wg-1m',
    name: 'WinGo 1 Min',
    badge: 'DEEP STABILITY',
    desc: '60-second stable statistical cycles',
    sub: 'Markov bi-gram + color harmonic pattern verification',
    icon: Clock,
    gradientClass: 'from-orange-500 via-amber-500 to-yellow-500',
    mode: '1M',
    delay: 0.12,
  },
];

export const GamesView: React.FC<GamesViewProps> = ({ onSelectGame, onNavigateToPortal }) => {
  return (
    <div className="pb-16 animate-fadeIn">
      {/* Section Header with Apple iOS typography */}
      <div className="px-5 pt-4 pb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-deep)] text-[10px] font-['Sora'] font-black uppercase tracking-wider">
          <Zap className="w-3 h-3" />
          <span>LIVE WINGO PREDICTION</span>
        </div>
        <h2 className="text-2xl font-['Sora'] font-black text-[var(--ink)] mt-1 tracking-tight">
          Choose a Game
        </h2>
        <p className="text-xs text-[var(--muted)] mt-1 font-medium leading-relaxed">
          Select an active WinGo room for instant 1000-round live prediction signals with 1-loss recovery guard.
        </p>
      </div>

      {/* Apple iOS Style Game Cards */}
      <div className="px-4 pt-1 space-y-3.5">
        {ACTIVE_GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                damping: 26,
                stiffness: 350,
                delay: game.delay,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playTap();
                onSelectGame(game.mode);
              }}
              className="group relative p-4 rounded-3xl bg-[var(--paper)] dark:bg-[var(--paper-2)] border border-[var(--line)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer select-none transition-all duration-300 hover:shadow-xl hover:border-[var(--accent)] overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div
                className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${game.gradientClass} opacity-15 blur-2xl pointer-events-none group-hover:opacity-25 transition-opacity duration-300`}
              />

              <div className="relative z-10 flex items-start gap-3.5">
                {/* 3D App Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${game.gradientClass} shrink-0 ring-4 ring-white/60 dark:ring-white/10`}
                >
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-['Sora'] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {game.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[var(--accent-deep)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                      LIVE API
                    </span>
                  </div>

                  <h3 className="font-['Sora'] font-black text-lg sm:text-xl text-[var(--ink)] mt-1 tracking-tight">
                    {game.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--ink-2)] font-semibold mt-0.5">
                    {game.desc}
                  </p>
                  <p className="text-[10.5px] sm:text-xs text-[var(--muted)] mt-1 font-medium leading-tight">
                    {game.sub}
                  </p>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="relative z-10 mt-3 pt-2.5 border-t border-[var(--line)] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10.5px] sm:text-xs font-bold text-[var(--muted)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>2-Loss Protected</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-['Sora'] font-black text-xs sm:text-sm shadow-sm group-hover:shadow-md transition-all">
                  <span>ENTER ROOM</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* 9K CLUB & DHANI WIN Quick Launch Portal Banner */}
        {onNavigateToPortal && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 350,
              delay: 0.18,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playTap();
              onNavigateToPortal();
            }}
            className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/15 to-[#241708] border-2 border-amber-500/40 shadow-lg cursor-pointer group hover:border-amber-400 transition-all select-none relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-['Sora'] font-black text-sm text-[var(--ink)]">
                      9K CLUB & DHANI WIN
                    </span>
                    <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-amber-400 text-[#3a2a05] font-black uppercase tracking-wider">
                      GAME PORTAL
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-tight mt-0.5 truncate font-medium">
                    Search, choose & play platforms with live AI prediction HUD overlay.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
