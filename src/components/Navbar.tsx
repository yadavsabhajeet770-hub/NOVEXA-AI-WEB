/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Sun,
  Moon,
  Palette,
  Volume2,
  User as UserIcon,
  LogOut,
  MoreVertical,
} from 'lucide-react';
import { PageId } from '../types';
import { useAuth } from '../context/AuthContext';
import { sound } from '../utils/sound';

interface NavbarProps {
  curPage: PageId;
  onBack: () => void;
  onOpenSettings: () => void;
  onOpenLogin: () => void;
  onOpenThemeModal: () => void;
  isNight: boolean;
  onToggleNight: () => void;
  statusText: string;
  isLive: boolean;
  currentTime: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  curPage,
  onBack,
  onOpenSettings: _onOpenSettings,
  onOpenLogin,
  onOpenThemeModal,
  isNight,
  onToggleNight,
  statusText,
  isLive,
  currentTime,
}) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or tap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-30">
      {/* Top Hero Container */}
      <div
        className="relative px-4 pt-6 pb-5 rounded-b-[32px] text-white shadow-xl overflow-visible transition-all duration-500"
        style={{
          background: 'var(--grad-mint)',
          boxShadow: 'inset 0 -24px 48px -24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Ambient liquid glow overlays */}
        <div className="absolute inset-0 rounded-b-[32px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none overflow-hidden" />
        <div className="absolute inset-0 rounded-b-[32px] bg-gradient-to-r from-transparent via-white/15 to-transparent bg-[length:200%_100%] animate-shine pointer-events-none overflow-hidden" />

        {/* Topbar Row: CYRUS AI | Login | ⋮ */}
        <div className="relative z-20 flex items-center justify-between">
          {/* Left: Back button (when in game/prediction) + CYRUS Brand (no processor icon) */}
          <div className="flex items-center gap-2">
            {curPage !== 'games' && (
              <button
                onClick={() => {
                  sound.playTap();
                  onBack();
                }}
                aria-label="Go Back"
                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm active:scale-90 transition-transform cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Brand: CYRUS AI Premium Crowned Logo Emblem */}
            <div className="flex items-center select-none py-0.5 shrink">
              <img
                src="/assets/cyrus_logo.png"
                alt="CYRUS AI"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[180px] sm:max-w-[240px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-transform"
              />
            </div>
          </div>

          {/* Right Action buttons: Login | ⋮ */}
          <div className="relative flex items-center gap-2" ref={menuRef}>
            {/* Login / User Profile Button */}
            {user ? (
              <button
                onClick={() => {
                  sound.playTap();
                  if (
                    window.confirm(
                      `Signed in as ${user.displayName || user.email}. Sign out?`
                    )
                  ) {
                    logout();
                  }
                }}
                title={user.displayName || user.email || 'User'}
                className="h-10 px-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-sm active:scale-90 transition-transform cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="CYRUS DP"
                    className="w-6 h-6 rounded-full border border-white/80 object-contain shadow-xs bg-black/20"
                  />
                ) : (
                  <img
                    src="/assets/cyrus_dp.png"
                    alt="CYRUS DP"
                    className="w-6 h-6 rounded-full border border-white/80 object-contain shadow-xs bg-black/20"
                  />
                )}
                <LogOut className="w-3.5 h-3.5 text-white/80" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playTap();
                  onOpenLogin();
                }}
                className="h-10 px-3 rounded-2xl bg-white text-[var(--accent-deep)] font-['Sora'] font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Premium Circular Three-Dot Menu Button (⋮) */}
            <button
              onClick={() => {
                sound.playTap();
                setIsMenuOpen((prev) => !prev);
              }}
              aria-label="Settings and themes menu"
              aria-expanded={isMenuOpen}
              className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-md active:scale-90 transition-all cursor-pointer ${
                isMenuOpen
                  ? 'bg-white/35 border-amber-300 ring-2 ring-amber-300/40 text-amber-200 scale-95 shadow-lg'
                  : 'bg-white/20 hover:bg-white/30 border-white/30 text-white hover:border-amber-300/50 hover:shadow-lg'
              }`}
            >
              <MoreVertical className="w-5 h-5 transition-transform duration-200" />
            </button>

            {/* Dropdown Menu (Directly below ⋮ button, never overflows mobile) */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute right-0 top-12 z-50 w-60 p-2 rounded-2xl bg-[var(--paper-2)]/95 backdrop-blur-2xl border border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex flex-col gap-1 text-[var(--ink)] select-none ring-1 ring-black/40"
                >
                  {/* Option 1: Appearance / Day & Night */}
                  <button
                    onClick={() => {
                      sound.playTap();
                      onToggleNight();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-amber-400/20 flex items-center justify-center text-amber-300 transition-colors border border-white/10 shadow-xs">
                        {isNight ? (
                          <Moon className="w-4 h-4 fill-amber-300 text-amber-300" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-300" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)]">
                          Appearance
                        </div>
                        <div className="text-[10px] sm:text-xs text-[var(--muted)] font-medium">
                          {isNight ? 'Dark Mode active' : 'Light Mode active'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-md bg-white/10 text-amber-300 border border-white/15">
                      {isNight ? 'Dark' : 'Light'}
                    </span>
                  </button>

                  {/* Option 2: Color Theme */}
                  <button
                    onClick={() => {
                      sound.playTap();
                      setIsMenuOpen(false);
                      onOpenThemeModal();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] transition-colors border border-white/10 shadow-xs">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)]">
                          Color Theme
                        </div>
                        <div className="text-[10px] sm:text-xs text-[var(--muted)] font-medium">
                          24 Vibrant Palettes
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-md bg-[var(--accent-soft)] text-[var(--accent-deep)] border border-[var(--accent)]/25">
                      Pick
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Tattoo Badge */}
        <div className="relative mt-3 text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-['Sora'] font-extrabold tracking-[2px] uppercase shadow-md border border-white/50 text-[#3a2a05]"
            style={{ background: 'var(--grad-gold)' }}
          >
            CYRUS AI VIP
          </span>
        </div>

        {/* Notice ticker banner */}
        <div className="relative z-10 mt-3.5 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[var(--paper-2)]/90 backdrop-blur-md text-[var(--ink-2)] shadow-md border border-white/40">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--accent-soft)] text-[var(--accent-deep)] shrink-0">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 overflow-hidden whitespace-nowrap text-xs sm:text-sm font-semibold">
            <span className="animate-marquee">
              CYRUS AI · Neural prediction engine · Firebase Cloud Synced · 21-System Ensemble · High accuracy · Telegram VIP channel available ·&nbsp;&nbsp;
            </span>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white shrink-0 shadow-sm"
            style={{ background: 'var(--grad-deep)' }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Live Status Bar (Visible in Prediction Mode) */}
      {curPage === 'pred' && (
        <div className="mx-3.5 mt-3 px-3.5 py-2.5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-sm flex items-center justify-between gap-2.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isLive
                  ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-pulse'
                  : 'bg-amber-400 animate-ping'
              }`}
            />
            <span className="font-bold text-[var(--ink)] truncate">{statusText}</span>
          </div>
          <div className="font-['Space_Grotesk'] font-semibold text-[var(--muted)] text-[11px] shrink-0">
            {currentTime}
          </div>
        </div>
      )}
    </header>
  );
};
