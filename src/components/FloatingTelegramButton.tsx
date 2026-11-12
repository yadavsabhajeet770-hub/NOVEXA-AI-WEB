/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface FloatingTelegramButtonProps {
  url?: string;
}

export const FloatingTelegramButton: React.FC<FloatingTelegramButtonProps> = ({
  url = 'https://t.me/+W9bUCI1PYdMwZDc1',
}) => {
  return (
    <motion.aside
      aria-label="Official Telegram VIP Channel"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed bottom-20 right-3.5 md:right-6 z-40"
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playTap()}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-[0_8px_25px_-4px_rgba(42,171,238,0.65)] cursor-pointer select-none border-2 border-white/80 dark:border-white/20"
        style={{
          background: 'linear-gradient(135deg, #2AABEE 0%, #229ED9 50%, #1789c4 100%)',
        }}
        aria-label="Join Official CYRUS AI Telegram VIP Channel"
      >
        {/* Pulsing ambient ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#2AABEE] opacity-40 animate-ping pointer-events-none" />

        {/* Real Authentic Telegram Paper Airplane SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-white drop-shadow-sm -ml-0.5 -mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>

        {/* Mini VIP Online Indicator Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent)] border-2 border-white dark:border-[var(--paper-2)] text-[8px] font-bold text-white items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
          </span>
        </span>

        {/* Hover Label Tooltip */}
        <span className="absolute right-14 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-['Sora'] font-extrabold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-white/10">
          CYRUS VIP TG
        </span>
      </motion.a>
    </motion.aside>
  );
};
