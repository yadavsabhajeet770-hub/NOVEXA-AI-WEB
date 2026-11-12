/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Gamepad2, History, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { sound } from '../utils/sound';

interface BottomNavProps {
  curPage: PageId;
  onNavigate: (page: PageId) => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ curPage, onNavigate }) => {
  const isHomeActive = curPage === 'games' || curPage === 'pred';

  const navItems: NavItem[] = [
    {
      id: 'games',
      label: 'Home',
      icon: Home,
      isActive: isHomeActive,
    },
    {
      id: 'portal',
      label: 'Game',
      icon: Gamepad2,
      isActive: curPage === 'portal',
    },
    {
      id: 'hist',
      label: 'History',
      icon: History,
      isActive: curPage === 'hist',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      isActive: curPage === 'settings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] md:max-w-md z-40 px-2.5 pb-2.5 pt-0.5 pointer-events-none">
      <div className="pointer-events-auto bg-[var(--paper-2)]/95 backdrop-blur-2xl border border-[var(--line)] rounded-[24px] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.36)] flex items-center justify-around p-1 relative overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playTap();
                onNavigate(item.id);
              }}
              className="relative flex-1 py-1.5 px-2 flex flex-col items-center justify-center gap-0.5 rounded-[18px] cursor-pointer select-none transition-colors duration-200"
            >
              {/* Sliding Liquid Pill Background */}
              {item.isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  transition={{
                    type: 'spring',
                    stiffness: 440,
                    damping: 32,
                    mass: 0.7,
                  }}
                  className="absolute inset-0 rounded-[18px] bg-[var(--paper)] shadow-sm border border-[var(--accent)]/40 overflow-hidden"
                >
                  {/* Liquid gloss top reflection */}
                  <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                  {/* Ambient fluid glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)] pointer-events-none" />
                </motion.div>
              )}

              {/* Active Gold Top Indicator Line */}
              {item.isActive && (
                <motion.div
                  layoutId="activeNavTopBar"
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 34,
                    mass: 0.7,
                  }}
                  className="absolute top-0.5 w-5 h-[2.5px] rounded-full shadow-[0_0_8px_rgba(244,215,122,0.6)]"
                  style={{ background: 'var(--grad-gold)' }}
                />
              )}

              {/* Icon & Label with fluid organic bounce */}
              <motion.div
                animate={item.isActive ? { scale: [1, 1.12, 1], y: [0, -1, 0] } : { scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative z-10 flex flex-col items-center gap-0.5"
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[var(--accent-deep)] dark:text-[var(--accent)] stroke-[2.4]'
                      : 'text-[var(--muted)] stroke-[1.8] hover:text-[var(--ink)]'
                  }`}
                />
                <span
                  className={`text-[9.5px] sm:text-[10.5px] font-['Sora'] font-bold tracking-tight transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[var(--accent-deep)] dark:text-[var(--accent)] font-extrabold'
                      : 'text-[var(--muted)]'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
