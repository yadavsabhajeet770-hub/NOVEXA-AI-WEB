/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Key,
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../utils/sound';

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reason?: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginWithGoogle, loginWithKey } = useAuth();
  const [accessKey, setAccessKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keyLoading, setKeyLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    sound.playTap();
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      sound.playWin();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('popup-closed-by-user')) {
        setError(msg.replace('Firebase: ', ''));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.playTap();
    setError(null);

    const trimmed = accessKey.trim();
    if (!trimmed) {
      setError('Please enter your CYRUS VIP Access Key.');
      return;
    }

    setKeyLoading(true);
    try {
      await loginWithKey(trimmed);
      sound.playWin();
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setKeyLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-2xl">
        {/* Ambient liquid backdrop orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--accent)]/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_70%)]" />
        </div>

        {/* Modal Window / iOS Style Glass Card with Opaque Base */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360 }}
          className="relative w-full max-w-[420px] rounded-[36px] bg-[var(--paper-2)] border border-[var(--accent)]/40 text-white p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col justify-center"
        >
          {/* iOS Frosted Top Glass Highlight */}
          <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/80 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20 border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Branding with Uploaded Logo Image */}
          <div className="text-center relative z-10 pt-1">
            <div className="flex items-center justify-center select-none py-1 mb-1.5">
              <img
                src="/assets/cyrus_logo.png"
                alt="CYRUS AI"
                className="h-16 sm:h-20 w-auto max-w-[280px] sm:max-w-[340px] object-contain drop-shadow-[0_8px_28px_rgba(16,185,129,0.5)] mx-auto hover:scale-105 transition-transform"
              />
            </div>

            {/* Clean Subtitle without star icon */}
            <p className="text-[11px] sm:text-xs text-[var(--accent)] font-['Sora'] font-semibold tracking-wider text-center uppercase">
              Official Neural Prediction Engine • VIP Access
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="relative z-10 mt-3 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/35 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Method 1: Google Sign-In with Fully Curved Premium Pill */}
          <div className="relative z-10 mt-5">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || keyLoading}
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-['Sora'] font-extrabold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all cursor-pointer border border-white/80"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span className="relative z-10 font-black">
                {loading ? 'Connecting with Google…' : 'Continue with Google'}
              </span>
            </button>
          </div>

          {/* iOS Style Sleek Divider */}
          <div className="relative z-10 my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[var(--accent)] uppercase px-1">
              OR LOGIN WITH CYRUS KEY
            </span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Method 2: CYRUS VIP Access Key Form */}
          <form onSubmit={handleKeyLogin} className="relative z-10 space-y-3">
            <div className="space-y-1.5">
              <label className="text-[11px] sm:text-xs font-['Sora'] font-bold text-[var(--ink)] flex items-center justify-between px-1">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  CYRUS VIP Access Key
                </span>
                <span className="text-[10px] sm:text-xs text-[var(--accent)] font-semibold">Instant VIP</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value.toUpperCase())}
                  placeholder="ENTER VIP KEY (e.g. CYRUS3.0)"
                  disabled={keyLoading}
                  className="w-full pl-11 pr-11 py-3.5 rounded-full bg-black/60 border border-[var(--accent)]/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-white/40 text-sm font-mono tracking-widest uppercase outline-none transition-all shadow-inner"
                />
                <Key className="absolute left-4 top-3.5 w-4 h-4 text-amber-400/80" />
                {accessKey && (
                  <button
                    type="button"
                    onClick={() => setAccessKey('')}
                    className="absolute right-4 top-3.5 text-white/40 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/70 px-1 pt-0.5">
                <span>Default VIP Key:</span>
                <button
                  type="button"
                  onClick={() => setAccessKey('CYRUS3.0')}
                  className="px-2.5 py-0.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-mono font-bold border border-amber-400/40 cursor-pointer active:scale-95 transition-transform"
                >
                  CYRUS3.0 (Tap to fill)
                </button>
              </div>
            </div>

            {/* Submit VIP Key Button - Fully Curved Luxury Pill */}
            <button
              type="submit"
              disabled={keyLoading || loading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#2a1e03] font-['Sora'] font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all cursor-pointer border border-amber-200/70"
            >
              {keyLoading ? (
                <div className="w-4 h-4 border-2 border-[#2a1e03] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>ACTIVATE VIP ACCESS</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Telegram Channel Link for Official Keys */}
          <div className="relative z-10 mt-4 pt-2">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTap()}
              className="w-full py-2.5 px-4 rounded-full bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/40 text-[#40b3e8] text-[11px] sm:text-xs font-['Sora'] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
              </svg>
              <span>Get VIP Key via Telegram Support</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Clean Feature Indicators */}
          <div className="relative z-10 mt-3 pt-2 grid grid-cols-3 gap-1 text-center text-[10px] sm:text-xs text-[var(--muted)] font-medium border-t border-[var(--line)]">
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[var(--accent)] shrink-0" />
              <span>Instant Signals</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[var(--accent)] shrink-0" />
              <span>21-AI Ensemble</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[var(--accent)] shrink-0" />
              <span>Cloud Sync</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
