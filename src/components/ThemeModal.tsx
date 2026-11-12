/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Palette, Check } from 'lucide-react';
import { THEMES } from '../utils/themes';
import { sound } from '../utils/sound';

interface ThemeModalProps {
  isOpen: boolean;
  currentTheme: string;
  onSelectTheme: (key: string) => void;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  currentTheme,
  onSelectTheme,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl bg-[var(--paper-2)]/95 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-[var(--ink)] overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[var(--line)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-deep)] flex items-center justify-center border border-[var(--accent)]/30 shadow-inner">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Sora'] font-extrabold text-lg text-[var(--ink)]">
                    Color Theme
                  </h3>
                  <p className="text-xs text-[var(--muted)] font-medium">
                    24 vibrant visual palettes for CYRUS AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playTap();
                  onClose();
                }}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-[var(--ink)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="p-4 overflow-y-auto flex-1 overscroll-contain">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {THEMES.map((t) => {
                  const isActive = currentTheme === t.k;
                  return (
                    <button
                      key={t.k}
                      onClick={() => {
                        sound.playTap();
                        onSelectTheme(t.k);
                      }}
                      className={`relative aspect-[1.1] rounded-2xl p-2 transition-all duration-200 cursor-pointer shadow-md active:scale-95 flex flex-col justify-between overflow-hidden border-2 ${
                        isActive
                          ? 'border-white ring-4 ring-[var(--accent)] scale-[1.03] shadow-lg'
                          : 'border-white/15 hover:border-white/40 hover:scale-[1.02]'
                      }`}
                      style={{
                        background: `linear-gradient(145deg, ${t.c1}, ${t.c2} 48%, ${t.c3} 100%)`,
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-['Sora'] font-black text-white/90 drop-shadow-md tracking-wider uppercase">
                          {t.n}
                        </span>
                        {isActive && (
                          <div className="w-4 h-4 rounded-full bg-white text-[var(--accent-deep)] flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="w-full flex items-center gap-1 mt-auto">
                        <span
                          className="h-2 flex-1 rounded-full shadow-inner"
                          style={{ backgroundColor: t.accent }}
                        />
                        <span
                          className="h-2 flex-1 rounded-full shadow-inner"
                          style={{ backgroundColor: t.c4 }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between bg-black/20 text-xs text-white/60 shrink-0">
              <span>Theme auto-saves to your profile</span>
              <button
                onClick={() => {
                  sound.playTap();
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-white text-[#0e7d4b] font-['Sora'] font-bold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
