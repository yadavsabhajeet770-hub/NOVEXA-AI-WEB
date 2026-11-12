/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Trash2,
  Cpu,
  Volume2,
  VolumeX,
  UserCheck,
  LogIn,
  Sun,
  Moon,
  Smartphone,
  Mic,
  Share2,
  ShieldCheck,
  Check,
  Zap,
  Sliders,
  Database,
  Radio,
} from 'lucide-react';
import { THEMES } from '../utils/themes';
import { sound } from '../utils/sound';
import { useAuth } from '../context/AuthContext';

export type AiEngineMode = 'quantum' | 'conservative' | 'aggressive';

interface SettingsViewProps {
  currentTheme: string;
  onSelectTheme: (key: string) => void;
  isNight: boolean;
  onToggleNight: () => void;
  isAmoled: boolean;
  onToggleAmoled: () => void;
  particlesEnabled: boolean;
  onToggleParticles: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  aiEngineMode: AiEngineMode;
  onSelectAiEngineMode: (mode: AiEngineMode) => void;
  confidenceThreshold: number;
  onSelectConfidenceThreshold: (val: number) => void;
  onClearHistory: () => void;
  onExportHistory: () => void;
  onOpenLogin: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentTheme,
  onSelectTheme,
  isNight,
  onToggleNight,
  isAmoled,
  onToggleAmoled,
  particlesEnabled,
  onToggleParticles,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
  aiEngineMode,
  onSelectAiEngineMode,
  confidenceThreshold,
  onSelectConfidenceThreshold,
  onClearHistory,
  onExportHistory,
  onOpenLogin,
}) => {
  const { user, logout } = useAuth();
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  return (
    <div className="pb-28 animate-fadeIn max-w-lg mx-auto">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] font-extrabold tracking-[2.5px] uppercase text-[var(--accent-deep)] flex items-center gap-1.5">
          <Sliders className="w-3 h-3 text-[var(--accent)]" />
          SYSTEM CONFIGURATION
        </span>
        <h2 className="text-2xl font-['Sora'] font-extrabold text-[var(--ink)] mt-0.5 tracking-tight">
          Preferences &amp; Engine
        </h2>
        <p className="text-xs text-[var(--muted)] mt-1 font-medium">
          Personalize neural predictions, day/night optics, and voice synthesis
        </p>
      </div>

      <div className="px-3.5 mt-2 space-y-3.5">
        {/* User Account & Cloud Sync Card */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-deep)] flex items-center justify-center font-black overflow-hidden shadow-sm p-1">
                  {user ? (
                    user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="CYRUS Avatar"
                        className="w-full h-full rounded-xl object-contain"
                      />
                    ) : (
                      <img
                        src="/assets/cyrus_dp.png"
                        alt="CYRUS DP"
                        className="w-full h-full rounded-xl object-contain"
                      />
                    )
                  ) : (
                    <img
                      src="/assets/cyrus_dp.png"
                      alt="CYRUS DP"
                      className="w-full h-full rounded-xl object-contain"
                    />
                  )}
                </div>
                {user && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-[var(--paper-2)] flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-['Sora'] font-bold text-sm sm:text-base text-[var(--ink)] truncate max-w-[150px] sm:max-w-[200px]">
                    {user
                      ? (user.displayName || user.email?.split('@')[0] || 'CYRUS VIP').replace(/NOVEXA/gi, 'CYRUS3.0')
                      : 'CYRUS VIP Explorer'}
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      user
                        ? 'bg-[var(--accent-soft)] text-[var(--accent-deep)] border border-[var(--accent)]/30'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                    }`}
                  >
                    {user ? 'VIP Live' : 'Read Only'}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--muted)] flex items-center gap-1.5 mt-0.5">
                  <Database className="w-3 h-3 text-[var(--accent)]" />
                  {user
                    ? ('vipKey' in user && user.vipKey
                        ? `VIP Key: ${user.vipKey.replace(/NOVEXA/gi, 'CYRUS3.0')}`
                        : user.email?.replace(/novexa/gi, 'cyrus'))
                    : 'Sign in to sync your stats in cloud'}
                </div>
              </div>
            </div>

            {user ? (
              <button
                onClick={() => {
                  sound.playTap();
                  logout();
                }}
                className="px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 text-xs sm:text-sm font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer active:scale-95"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playTap();
                  onOpenLogin();
                }}
                className="px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-['Sora'] font-bold shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                style={{ background: 'var(--grad-deep)' }}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Day / Night & Optics Visual Switcher */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider">
            <span className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              APPEARANCE &amp; OPTICS
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--muted)] uppercase font-semibold">
              {isNight ? (isAmoled ? 'Night · AMOLED' : 'Night Mode') : 'Day Mode'}
            </span>
          </div>

          {/* Day vs Night Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                if (isNight) {
                  sound.playTap();
                  onToggleNight();
                }
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 active:scale-98 ${
                !isNight
                  ? 'border-amber-400 bg-amber-500/10 shadow-sm ring-2 ring-amber-400/30'
                  : 'border-[var(--line)] bg-[var(--paper)] hover:border-slate-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  !isNight ? 'bg-amber-400 text-amber-950 shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Sun className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">Day Mode</div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)]">Crisp paper view</div>
              </div>
            </button>

            <button
              onClick={() => {
                if (!isNight) {
                  sound.playTap();
                  onToggleNight();
                }
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 active:scale-98 ${
                isNight
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm ring-2 ring-[var(--accent)]/30'
                  : 'border-[var(--line)] bg-[var(--paper)] hover:border-slate-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isNight ? 'bg-[var(--accent)] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Moon className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">Night Mode</div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)]">Cyber glow view</div>
              </div>
            </button>
          </div>

          {/* AMOLED Pure Black Toggle (Visible when Night is active) */}
          {isNight && (
            <div className="p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[var(--accent)]" />
                <div>
                  <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">
                    AMOLED Pure Black (OLED)
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                    Pitch black pixels to save battery
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playTap();
                  onToggleAmoled();
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  isAmoled ? 'bg-[var(--accent)]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isAmoled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Floating Liquid Particles Toggle */}
          <div className="p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <div>
                <div className="text-xs font-bold font-['Sora'] text-[var(--ink)]">
                  Liquid Floating Particles
                </div>
                <div className="text-[10px] text-[var(--muted)]">
                  Smooth ambient floating bokeh
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                onToggleParticles();
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                particlesEnabled ? 'bg-[var(--accent)]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  particlesEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* AI Neural Prediction Engine Controls */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--accent)]" />
              NEURAL ENGINE PROFILE
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--accent-deep)] font-extrabold uppercase">
              21-Model Active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: 'quantum' as AiEngineMode,
                name: 'Quantum 21',
                sub: 'Balanced ~84%',
                badge: 'Recommended',
              },
              {
                id: 'conservative' as AiEngineMode,
                name: 'Conservative',
                sub: 'Safe Streaks',
                badge: 'Low Risk',
              },
              {
                id: 'aggressive' as AiEngineMode,
                name: 'Jackpot AI',
                sub: 'High Payout',
                badge: 'Aggressive',
              },
            ].map((mode) => {
              const active = aiEngineMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    sound.playTap();
                    onSelectAiEngineMode(mode.id);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative active:scale-95 ${
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] ring-2 ring-[var(--accent)]/30'
                      : 'border-[var(--line)] bg-[var(--paper)] hover:border-slate-300'
                  }`}
                >
                  {active && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent)]" />
                  )}
                  <div className="text-[11px] sm:text-xs font-['Sora'] font-bold text-[var(--ink)] leading-tight">
                    {mode.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[var(--muted)] mt-0.5">{mode.sub}</div>
                  <span className="inline-block mt-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[var(--accent-deep)]">
                    {mode.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Confidence Threshold */}
          <div className="pt-2 border-t border-[var(--line)]">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[var(--ink)] mb-2">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[var(--accent)]" />
                Confidence Signal Threshold
              </span>
              <span className="text-[var(--accent-deep)] font-black">{confidenceThreshold}%+</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[65, 70, 75, 80].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    sound.playTap();
                    onSelectConfidenceThreshold(val);
                  }}
                  className={`py-1.5 rounded-xl text-xs sm:text-sm font-bold font-['Sora'] transition-all cursor-pointer ${
                    confidenceThreshold === val
                      ? 'bg-[var(--accent)] text-white shadow-sm'
                      : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio & Voice Synthesis Card */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider">
            <Mic className="w-4 h-4 text-[var(--accent)]" />
            AUDIO &amp; SPEECH SYNTHESIS
          </div>

          {/* Voice Announcer Toggle */}
          <div className="p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">
                  Voice Announcer
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                  Speaks lock alerts &amp; win announcements aloud
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                onToggleVoice();
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                voiceEnabled ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  voiceEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* iOS Haptic Audio Toggle */}
          <div className="p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent-deep)] flex items-center justify-center">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">
                  iOS Haptic Audio
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                  Clicks, locking chimes &amp; victory sound
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playTap();
                onToggleSound();
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                soundEnabled ? 'bg-[var(--accent)]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 24 Themes Palette */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg">
          <div className="flex items-center justify-between text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider mb-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              24 PREMIUM PALETTES
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--muted)] uppercase font-semibold">
              Tap to switch
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {THEMES.map((t) => {
              const isActive = currentTheme === t.k;
              return (
                <button
                  key={t.k}
                  onClick={() => {
                    sound.playTap();
                    onSelectTheme(t.k);
                  }}
                  className={`relative aspect-square rounded-2xl p-1 transition-all duration-300 cursor-pointer shadow-sm active:scale-95 flex flex-col justify-end items-center overflow-hidden border-2 ${
                    isActive
                      ? 'border-white ring-4 ring-[var(--accent)] scale-105 shadow-md'
                      : 'border-transparent hover:scale-102'
                  }`}
                  style={{
                    background: `linear-gradient(160deg, ${t.c1}, ${t.c2} 45%, ${t.c3} 100%)`,
                  }}
                >
                  <span className="text-[9px] sm:text-[10px] font-['Sora'] font-black text-white tracking-wider drop-shadow-md mb-1 uppercase">
                    {t.n}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Management Actions (Export & Clear) */}
        <div className="p-4 rounded-3xl bg-[var(--paper-2)] border border-[var(--line)] shadow-lg space-y-2.5">
          <div className="text-xs sm:text-sm font-['Sora'] font-bold text-[var(--ink)] tracking-wider mb-1">
            DATA &amp; HISTORY
          </div>

          {/* Export Report */}
          <button
            onClick={() => {
              sound.playTap();
              onExportHistory();
            }}
            className="w-full p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between text-left hover:border-[var(--accent)] transition-all cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[var(--ink)]">
                  Export Stats Summary
                </div>
                <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                  Copy performance &amp; streaks to clipboard
                </div>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-blue-500">Copy</span>
          </button>

          {/* Clear History with Double-Confirmation */}
          {confirmClear ? (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 flex items-center justify-between gap-2">
              <div className="text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300">
                Confirm clear all predictions?
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold bg-[var(--paper)] text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    sound.playTap();
                    onClearHistory();
                    setConfirmClear(false);
                  }}
                  className="px-3 py-1 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 text-white shadow-sm"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                sound.playTap();
                setConfirmClear(true);
              }}
              className="w-full p-3 rounded-2xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between text-left hover:border-rose-400 transition-all cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold font-['Sora'] text-rose-600">
                    Clear Prediction History
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--muted)]">
                    Reset accuracy counters &amp; local records
                  </div>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-rose-500">Reset</span>
            </button>
          )}
        </div>

        {/* Security & System Info Footer */}
        <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/[0.03] border border-[var(--line)] text-center text-[10px] sm:text-xs text-[var(--muted)] flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>CYRUS AI Neural Engine v6.2.0 · End-to-End Cryptographic Sync</span>
        </div>
      </div>
    </div>
  );
};
