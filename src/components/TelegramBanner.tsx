/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Send } from 'lucide-react';
import { sound } from '../utils/sound';

interface TelegramBannerProps {
  title?: string;
  subtitle?: string;
}

export const TelegramBanner: React.FC<TelegramBannerProps> = ({
  title = 'CYRUS AI OFFICIAL TG',
  subtitle = 'Free VIP signals & analysis ke liye join karein',
}) => {
  return (
    <a
      href="https://t.me/+W9bUCI1PYdMwZDc1"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sound.playTap()}
      className="relative mx-3.5 my-2.5 px-4 py-3 rounded-2xl text-white flex items-center justify-between gap-3 shadow-[0_12px_28px_-8px_rgba(0,136,204,0.6)] overflow-hidden transition-all active:scale-[0.97] group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #0088cc 0%, #00a8e8 50%, #00c6ff 100%)',
        boxShadow: '0 12px 24px -8px rgba(0,136,204,0.6), inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
    >
      {/* Liquid shimmer reflection */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shine pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white text-[#0088cc] flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
          <Send className="w-5 h-5 -rotate-12 translate-x-0.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-sky-100 tracking-wide drop-shadow-sm">
            {subtitle}
          </div>
          <div className="font-['Sora'] font-extrabold text-[14px] tracking-wide text-white drop-shadow">
            {title}
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white text-[#0088cc] font-['Sora'] font-extrabold text-[11px] tracking-wider px-3.5 py-2 rounded-full shadow-md whitespace-nowrap group-hover:shadow-lg transition-all">
        JOIN NOW ↗
      </div>
    </a>
  );
};
