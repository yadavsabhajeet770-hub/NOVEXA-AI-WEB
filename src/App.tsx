/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { PageId, GameMode, ApiRecord, UserData, StoredPrediction } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { FloatingTelegramButton } from './components/FloatingTelegramButton';
import { ParticlesBackground } from './components/ParticlesBackground';
import { GamesView } from './components/GamesView';
import { GamePortalView } from './components/GamePortalView';
import { PredictionView } from './components/PredictionView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { WinLossModal } from './components/WinLossModal';
import { LoginPage } from './components/LoginPage';
import { ThemeModal } from './components/ThemeModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { applyTheme } from './utils/themes';
import { aiEnsemble, server3Prediction, EnsembleResult } from './utils/aiEngine';
import { preloadBallImages } from './utils/ballImages';
import { sound } from './utils/sound';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

const PAGE_ORDER: Record<PageId, number> = {
  games: 0,
  pred: 0.5,
  portal: 1,
  hist: 2,
  settings: 3,
};

const liquidPageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 32 : -32,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 420, damping: 34, mass: 0.5 },
      opacity: { duration: 0.16, ease: 'easeOut' },
      scale: { duration: 0.16, ease: 'easeOut' },
    },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -32 : 32,
    opacity: 0,
    scale: 0.99,
    transition: {
      x: { type: 'spring', stiffness: 420, damping: 34, mass: 0.5 },
      opacity: { duration: 0.12, ease: 'easeIn' },
    },
  }),
};

function MainApp() {
  const { user, loading: authLoading } = useAuth();
  const [curPage, setCurPage] = useState<PageId>('games');
  const [navDirection, setNavDirection] = useState<number>(1);
  const [curMode, setCurMode] = useState<GameMode>('1M');
  const [isNight, setIsNight] = useState<boolean>(false);
  const [isAmoled, setIsAmoled] = useState<boolean>(false);
  const [curTheme, setCurTheme] = useState<string>('mint');
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [aiEngineMode, setAiEngineMode] = useState<'quantum' | 'conservative' | 'aggressive'>('quantum');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(70);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [loginReason, setLoginReason] = useState<string | null>(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Auto prompt login first when user opens the app
  const initialLoginPromptRef = useRef(false);
  useEffect(() => {
    if (!authLoading && !user && !initialLoginPromptRef.current) {
      initialLoginPromptRef.current = true;
      setLoginReason('Welcome to CYRUS AI! Sign in first to access real-time neural predictions & sync your stats.');
      setIsLoginOpen(true);
    }
  }, [authLoading, user]);

  // Countdown & period state
  const [countdownSec, setCountdownSec] = useState<number>(60);
  const [totalCountdown, setTotalCountdown] = useState<number>(60);
  const [curPeriod, setCurPeriod] = useState<string>('');
  const curPeriodRef = useRef<string>('');
  const activeModeRef = useRef<GameMode>(curMode);
  activeModeRef.current = curMode;
  const isWaitingForNewPeriodRef = useRef<boolean>(false);
  const [nextPeriod, setNextPeriod] = useState<string>('');
  const [apiRecords, setApiRecords] = useState<ApiRecord[]>([]);

  // Predictions state
  const [currentPrediction, setCurrentPrediction] = useState<EnsembleResult | null>(null);
  const pendingPredictionRef = useRef<{
    period: string;
    prediction: EnsembleResult;
  } | null>(null);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  // Status & Time
  const [statusText, setStatusText] = useState<string>('Initializing CYRUS AI…');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');

  // Preload ball images on app mount
  useEffect(() => {
    preloadBallImages();
  }, []);

  // User persistent data
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const saved =
        localStorage.getItem('cyrus_ai_v1') ||
        localStorage.getItem('novexa_ai_v1') ||
        localStorage.getItem('ny_dragon_ai_v1') ||
        localStorage.getItem('rdx_brand_v3') ||
        localStorage.getItem('yaarwin_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      stats: { t: 0, w: 0, l: 0 },
      predictions: [],
    };
  });

  // Sync user data to/from Firebase when logged in
  useEffect(() => {
    if (!user) return;
    const fetchCloudData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const cloudData = snap.data();
          if (cloudData.stats) {
            setUserData((prev) => ({
              ...prev,
              stats: cloudData.stats,
            }));
          }
        }
      } catch {
        // ignore
      }
    };
    fetchCloudData();
  }, [user]);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'win' | 'err'; id: number } | null>(
    null
  );

  // Win/Loss Modal
  const [winLossModal, setWinLossModal] = useState<{
    isOpen: boolean;
    isWin: boolean;
    isJackpot?: boolean;
    predNum: number;
    predBS: 'BIG' | 'SMALL';
    actualNumber: number;
    actualBS: 'BIG' | 'SMALL';
    confidence: number;
    period: string;
  }>({
    isOpen: false,
    isWin: false,
    isJackpot: false,
    predNum: 0,
    predBS: 'BIG',
    actualNumber: 0,
    actualBS: 'BIG',
    confidence: 0,
    period: '',
  });

  const showToast = useCallback((message: string, type: 'win' | 'err' = 'win') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2500);
  }, []);

  // Sync theme, night mode, amoled, voice, and engine preferences
  useEffect(() => {
    try {
      const savedTheme =
        localStorage.getItem('cyrus_theme') ||
        localStorage.getItem('novexa_theme') ||
        localStorage.getItem('ny_dragon_ai_theme') ||
        'orange';
      setCurTheme(savedTheme);
      applyTheme(savedTheme);

      const savedNightRaw =
        localStorage.getItem('cyrus_night') ??
        localStorage.getItem('novexa_night') ??
        localStorage.getItem('ny_dragon_ai_night');
      const systemDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialNight = savedNightRaw !== null ? savedNightRaw === '1' : systemDark;
      const savedAmoled = (localStorage.getItem('cyrus_amoled') || localStorage.getItem('novexa_amoled')) === '1';

      setIsNight(initialNight);
      setIsAmoled(savedAmoled);

      const applyDomOptics = (night: boolean, amoled: boolean) => {
        const root = document.documentElement;
        const body = document.body;
        if (night) {
          root.classList.add('dark', 'night');
          root.setAttribute('data-theme', 'dark');
          body.classList.add('dark', 'night');
          if (amoled) {
            root.classList.add('amoled');
            body.classList.add('amoled');
          } else {
            root.classList.remove('amoled');
            body.classList.remove('amoled');
          }
        } else {
          root.classList.remove('dark', 'night', 'amoled');
          root.setAttribute('data-theme', 'light');
          body.classList.remove('dark', 'night', 'amoled');
        }
      };

      applyDomOptics(initialNight, savedAmoled);

      // Listen for system theme changes if user hasn't set manual override
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (e: MediaQueryListEvent) => {
          if (localStorage.getItem('cyrus_night') === null && localStorage.getItem('novexa_night') === null) {
            setIsNight(e.matches);
            applyDomOptics(e.matches, savedAmoled);
          }
        };
        mql.addEventListener?.('change', listener);
      }

      const savedVoice = (localStorage.getItem('cyrus_voice') || localStorage.getItem('novexa_voice')) !== '0';
      setVoiceEnabled(savedVoice);
      sound.voiceEnabled = savedVoice;

      const savedEngine = (localStorage.getItem('cyrus_engine') || localStorage.getItem('novexa_engine')) as 'quantum' | 'conservative' | 'aggressive' | null;
      if (savedEngine) setAiEngineMode(savedEngine);

      const savedConf = Number(localStorage.getItem('cyrus_conf') || localStorage.getItem('novexa_conf'));
      if (savedConf && !isNaN(savedConf)) setConfidenceThreshold(savedConf);
    } catch {
      // ignore
    }
  }, []);

  const syncDomOptics = (night: boolean, amoled: boolean) => {
    const root = document.documentElement;
    const body = document.body;
    if (night) {
      root.classList.add('dark', 'night');
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark', 'night');
      if (amoled) {
        root.classList.add('amoled');
        body.classList.add('amoled');
      } else {
        root.classList.remove('amoled');
        body.classList.remove('amoled');
      }
    } else {
      root.classList.remove('dark', 'night', 'amoled');
      root.setAttribute('data-theme', 'light');
      body.classList.remove('dark', 'night', 'amoled');
    }
  };

  const handleSelectTheme = (k: string) => {
    setCurTheme(k);
    applyTheme(k);
    try {
      localStorage.setItem('cyrus_theme', k);
    } catch {
      // ignore
    }
    showToast(`Applied ${k.toUpperCase()} theme`, 'win');
  };

  const handleToggleNight = () => {
    const next = !isNight;
    setIsNight(next);
    syncDomOptics(next, isAmoled);
    try {
      localStorage.setItem('cyrus_night', next ? '1' : '0');
    } catch {
      // ignore
    }
    showToast(next ? 'Night mode enabled' : 'Day mode enabled', 'win');
  };

  const handleToggleAmoled = () => {
    const next = !isAmoled;
    setIsAmoled(next);
    if (isNight) {
      syncDomOptics(true, next);
    }
    try {
      localStorage.setItem('cyrus_amoled', next ? '1' : '0');
    } catch {
      // ignore
    }
    showToast(next ? 'AMOLED OLED Black enabled' : 'Standard dark mode enabled', 'win');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    showToast(next ? 'Haptic audio on' : 'Haptic audio muted', 'win');
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    sound.voiceEnabled = next;
    try {
      localStorage.setItem('cyrus_voice', next ? '1' : '0');
    } catch {
      // ignore
    }
    showToast(next ? 'Voice announcer enabled' : 'Voice announcer muted', 'win');
  };

  const handleSelectAiEngineMode = (mode: 'quantum' | 'conservative' | 'aggressive') => {
    setAiEngineMode(mode);
    try {
      localStorage.setItem('cyrus_engine', mode);
    } catch {
      // ignore
    }
    showToast(`AI Engine profile: ${mode.toUpperCase()}`, 'win');
  };

  const handleSelectConfidenceThreshold = (val: number) => {
    setConfidenceThreshold(val);
    try {
      localStorage.setItem('cyrus_conf', String(val));
    } catch {
      // ignore
    }
    showToast(`Confidence threshold set to ${val}%`, 'win');
  };

  const handleExportHistory = () => {
    try {
      const wins = userData.stats.w;
      const total = userData.stats.t;
      const rate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0';
      const text = `CYRUS AI WinGo Report\nTotal Rounds: ${total}\nWins: ${wins}\nLosses: ${userData.stats.l}\nAccuracy: ${rate}%\nEngine: ${aiEngineMode.toUpperCase()}\nStatus: Verified VIP`;
      navigator.clipboard.writeText(text);
      showToast('Performance report copied to clipboard!', 'win');
    } catch {
      showToast('Failed to copy report', 'err');
    }
  };

  const handleClearHistory = () => {
    const reset = { stats: { t: 0, w: 0, l: 0 }, predictions: [] };
    setUserData(reset);
    try {
      localStorage.setItem('cyrus_ai_v1', JSON.stringify(reset));
    } catch {
      // ignore
    }
    showToast('History cleared', 'win');
  };

  // Clock ticker
  useEffect(() => {
    const int = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(int);
  }, []);

  // Fast API Fetch logic (Zero CORS lag, instant round polling, 1000 real records)
  const fetchAPIRecords = useCallback(async (targetMode: GameMode, forceFresh = false): Promise<ApiRecord[]> => {
    setStatusText('Syncing live round data…');
    const modeKey = targetMode === '30s' ? '30s' : '1m';
    const localProxyUrl = `/api/wingo/history?mode=${modeKey}&limit=1000${forceFresh ? `&fresh=1&t=${Date.now()}` : ''}`;
    const skyUrl = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-${modeKey}-1000${forceFresh ? `?t=${Date.now()}` : ''}`;
    const fallbackSkyUrl = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-30s-1000`;

    const parseJSON = (json: unknown): ApiRecord[] => {
      if (!json || typeof json !== 'object') return [];
      const anyJ = json as Record<string, unknown>;
      let raw: unknown[] = [];

      if (anyJ.data && typeof anyJ.data === 'object' && Array.isArray((anyJ.data as Record<string, unknown>).list)) {
        raw = (anyJ.data as Record<string, unknown>).list as unknown[];
      } else if (Array.isArray(anyJ.list)) {
        raw = anyJ.list;
      } else if (Array.isArray(json)) {
        raw = json;
      }

      const parsed: ApiRecord[] = [];
      for (const it of raw) {
        if (!it || typeof it !== 'object') continue;
        const o = it as Record<string, unknown>;
        let p: string | null = null;
        let n: number | null = null;

        for (const k of ['issueNumber', 'issue', 'periodNumber', 'period', 'roundId', 'gameNo', 'id']) {
          if (o[k] !== undefined) {
            p = String(o[k]);
            break;
          }
        }

        for (const k of ['number', 'openNumber', 'num', 'result', 'open', 'winNumber']) {
          const v = parseInt(String(o[k]));
          if (!isNaN(v) && v >= 0 && v <= 9) {
            n = v;
            break;
          }
        }

        const sizeVal = o.size ? String(o.size) : undefined;
        const colVal = o.colour || o.color ? String(o.colour || o.color) : undefined;
        const timeVal = o.time ? String(o.time) : undefined;

        if (p && n !== null) {
          parsed.push({
            period: p,
            number: n,
            size: sizeVal,
            colour: colVal,
            time: timeVal,
          });
        }
      }
      return parsed;
    };

    // 1. First priority: High-speed local backend proxy with 1000 records
    try {
      const r = await fetch(localProxyUrl, {
        signal: AbortSignal.timeout(1500),
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      });
      if (r.ok) {
        const j = await r.json();
        const recs = parseJSON(j);
        if (recs.length > 0) return recs;
      }
    } catch {
      // proceed to direct
    }

    // 2. Second priority: Direct Sky Predictor 1000 Cloud Run URL
    try {
      const r = await fetch(skyUrl, {
        signal: AbortSignal.timeout(2200),
        cache: 'no-store',
      });
      if (r.ok) {
        const j = await r.json();
        const recs = parseJSON(j);
        if (recs.length > 0) return recs;
      }
    } catch {
      // proceed to fallback
    }

    // 3. Third priority: Fallback to 30s-1000 URL
    try {
      const r = await fetch(fallbackSkyUrl, {
        signal: AbortSignal.timeout(2200),
        cache: 'no-store',
      });
      if (r.ok) {
        const j = await r.json();
        const recs = parseJSON(j);
        if (recs.length > 0) return recs;
      }
    } catch {
      // no mock fallback: real data only
    }

    return [];
  }, []);

  // Process live records
  const processRecords = useCallback(
    (records: ApiRecord[], forMode: GameMode) => {
      if (forMode !== activeModeRef.current) return;

      const sorted = [...records].sort((a, b) => {
        try {
          return Number(BigInt(b.period) - BigInt(a.period));
        } catch {
          return b.period.localeCompare(a.period);
        }
      });

      if (sorted.length === 0) return;

      const latestPeriod = sorted[0].period;
      let calculatedNextPid = '';
      try {
        calculatedNextPid = String(BigInt(latestPeriod) + 1n);
      } catch {
        calculatedNextPid = String(parseInt(latestPeriod) + 1);
      }

      const isNewPeriod = curPeriodRef.current !== latestPeriod;
      if (isNewPeriod) {
        isWaitingForNewPeriodRef.current = false;
        curPeriodRef.current = latestPeriod;
        setCurPeriod(latestPeriod);
        setNextPeriod(calculatedNextPid);
        setApiRecords(sorted);
        setIsLive(true);
        setStatusText(`LIVE · Next #${calculatedNextPid.slice(-6)}`);
      }

      // Check result for pending prediction
      if (pendingPredictionRef.current && pendingPredictionRef.current.period === latestPeriod) {
        const match = sorted.find((r) => r.period === latestPeriod);
        if (match) {
          const actual = match.number;
          const pred = pendingPredictionRef.current.prediction;
          const actualBS = actual >= 5 ? 'BIG' : 'SMALL';
          const isSkip = pred.isSkip === true;
          // Exact number hit = JACKPOT; Big/Small size hit = WIN; else LOSS
          const isExactJackpot = !isSkip && actual === pred.number;
          const isSizeWin = !isSkip && actualBS === pred.bs;
          const isWin = isExactJackpot || isSizeWin;
          const resultStatus: 'WIN' | 'JACKPOT' | 'LOSS' | 'SKIPPED' = isSkip
            ? 'SKIPPED'
            : isExactJackpot
            ? 'JACKPOT'
            : isSizeWin
            ? 'WIN'
            : 'LOSS';

          setUserData((prev) => {
            const newStats = {
              t: prev.stats.t,
              w: isWin ? prev.stats.w + 1 : prev.stats.w,
              l: isSkip ? prev.stats.l : (isWin ? prev.stats.l : prev.stats.l + 1),
              j: isExactJackpot ? (prev.stats.j || 0) + 1 : (prev.stats.j || 0),
            };

            // Update matching prediction to completed result or insert if not present
            let found = false;
            const updatedList: StoredPrediction[] = prev.predictions.map((p) => {
              if (p.period === latestPeriod) {
                found = true;
                return {
                  ...p,
                  actualNumber: actual,
                  actualBS: actualBS as 'BIG' | 'SMALL',
                  actualColor: (actual % 2 === 0 ? 'RED' : 'GREEN') as 'RED' | 'GREEN',
                  result: resultStatus,
                };
              }
              return p;
            });

            if (!found) {
              updatedList.unshift({
                period: latestPeriod,
                prediction: isSkip ? 'SKIP' : pred.label,
                predNum: pred.number,
                predBS: pred.bs,
                jackpotBS: pred.bs,
                logics: pred.logics,
                actualNumber: actual,
                actualBS: actualBS as 'BIG' | 'SMALL',
                actualColor: (actual % 2 === 0 ? 'RED' : 'GREEN') as 'RED' | 'GREEN',
                result: resultStatus,
                time: new Date().toLocaleTimeString(),
                confidence: pred.confidence,
                isSkip,
                skipReason: pred.skipReason,
                runnerUps: pred.runnerUps,
              });
            }

            const updated = {
              stats: newStats,
              predictions: updatedList.slice(0, 100),
            };
            try {
              localStorage.setItem('cyrus_ai_v1', JSON.stringify(updated));
            } catch {
              // ignore
            }

            // Sync stats to Firestore if logged in
            if (user) {
              updateDoc(doc(db, 'users', user.uid), {
                stats: newStats,
                updatedAt: new Date().toISOString(),
              }).catch(() => {});
            }

            return updated;
          });

          if (curPage === 'pred') {
            if (isSkip) {
              showToast(
                `Period #${latestPeriod.slice(-5)} Passed · Capital Protected (Result: #${actual} ${actualBS})`,
                'win'
              );
            } else {
              setWinLossModal({
                isOpen: true,
                isWin,
                isJackpot: isExactJackpot,
                predNum: pred.number,
                predBS: pred.bs as 'BIG' | 'SMALL',
                actualNumber: actual,
                actualBS,
                confidence: pred.confidence,
                period: latestPeriod,
              });
            }
          }
        }
      }

      // Auto-compute next round's prediction immediately when new period arrives!
      // "timer pura hote hi har second api se jake game me check kare new data aaya ho to khud refresh hoke bata de fast"
      if (isNewPeriod && sorted.length > 0) {
        let consecutiveLosses = 0;
        for (const p of userData.predictions) {
          if (p.result === 'SKIPPED' || p.result === 'PENDING') continue;
          if (p.result === 'LOSS') consecutiveLosses++;
          else if (p.result === 'WIN' || p.result === 'JACKPOT') break;
        }

        const historyNums = sorted.map((r) => r.number);
        const autoNextPred = server3Prediction(calculatedNextPid, historyNums, consecutiveLosses, aiEngineMode);

        setCurrentPrediction(autoNextPred);
        pendingPredictionRef.current = {
          period: calculatedNextPid,
          prediction: autoNextPred,
        };

        if (curPage === 'pred' || curPage === 'portal') {
          showToast(
            `Period #${calculatedNextPid.slice(-5)}: ${autoNextPred.bs} #${autoNextPred.number} (${autoNextPred.confidence}%)`,
            'win'
          );
        }
      }
    },
    [aiEngineMode, curPage, showToast, user, userData.predictions]
  );

  // Poll runner: 1-second continuous check for fresh rounds
  const isPollingRef = useRef<boolean>(false);

  useEffect(() => {
    let mounted = true;
    let timerId: ReturnType<typeof setInterval> | null = null;

    const run = async () => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;
      try {
        const target = curMode;
        const force = isWaitingForNewPeriodRef.current;
        const recs = await fetchAPIRecords(target, force);
        if (mounted && recs && recs.length > 0 && activeModeRef.current === target) {
          processRecords(recs, target);
        }
      } catch {
        // network silent retry on next 1s tick
      } finally {
        isPollingRef.current = false;
      }
    };

    run();
    timerId = setInterval(run, 1000);

    return () => {
      mounted = false;
      if (timerId) clearInterval(timerId);
    };
  }, [curMode, fetchAPIRecords, processRecords]);

  // Countdown timer loop with instant round completion fetch
  useEffect(() => {
    const total = curMode === '30s' ? 30 : 60;
    setTotalCountdown(total);

    const tick = () => {
      const secInCycle = new Date().getSeconds() % total;
      const remain = total - secInCycle;
      setCountdownSec(remain > 0 ? remain : total);

      // When round expires (<= 3s remaining or right at start of new cycle),
      // arm the fast 1-second checker to poll game API until new period data arrives
      if (remain <= 3 || remain >= total - 1) {
        isWaitingForNewPeriodRef.current = true;
      }

      // Fast check at round boundary every second with forceFresh until new period arrives
      if (remain <= 4 || isWaitingForNewPeriodRef.current) {
        fetchAPIRecords(curMode, true)
          .then((recs) => {
            if (recs && recs.length > 0 && activeModeRef.current === curMode) {
              processRecords(recs, curMode);
            }
          })
          .catch(() => {});
      }
    };

    tick();
    const cdInt = setInterval(tick, 1000);
    return () => clearInterval(cdInt);
  }, [curMode, fetchAPIRecords, processRecords]);

  const handleSelectGame = (mode: GameMode) => {
    setNavDirection(1);
    setCurMode(mode);
    setCurPage('pred');
    showToast(`Entered WinGo ${mode === '30s' ? '30 Sec' : '1 Min'}`, 'win');
  };

  const handleSwitchMode = (mode: GameMode) => {
    if (mode === curMode) return;
    activeModeRef.current = mode;
    curPeriodRef.current = '';
    setCurMode(mode);
    setCurPeriod('');
    setNextPeriod('');
    setApiRecords([]);
    setCurrentPrediction(null);
    pendingPredictionRef.current = null;
    setStatusText(`Syncing WinGo ${mode === '30s' ? '30 Sec' : '1 Min'}…`);
    showToast(`Switched to WinGo ${mode === '30s' ? '30 Sec' : '1 Min'}`, 'win');

    // Instantly fetch live rounds for the newly selected mode
    fetchAPIRecords(mode).then((recs) => {
      if (recs && recs.length > 0 && activeModeRef.current === mode) {
        processRecords(recs, mode);
      }
    });
  };

  const handleRequestPrediction = useCallback(() => {
    if (!user) {
      sound.playTap();
      setLoginReason('Sign in is required to generate real-time AI predictions');
      setIsLoginOpen(true);
      showToast('Sign in required for live predictions', 'err');
      return;
    }

    if (isPredicting) return;
    setIsPredicting(true);
    sound.playTap();

    const targetPid = nextPeriod || (curPeriod ? String(BigInt(curPeriod) + 1n) : '20261028100051957');
    // apiRecords are ordered with index 0 as the latest/most recent period
    const historyNums = apiRecords.map((r) => r.number);

    // Calculate current consecutive loss streak:
    // "2 loss hone ke baad cyrus ai our achhe se analysis karna start kar de varana skip kar de our jab patterns sahi chale tab hi prediction de"
    let consecutiveLosses = 0;
    for (const p of userData.predictions) {
      if (p.result === 'SKIPPED' || p.result === 'PENDING') continue;
      if (p.result === 'LOSS') {
        consecutiveLosses++;
      } else if (p.result === 'WIN' || p.result === 'JACKPOT') {
        break;
      }
    }
    
    // Execute NY_FUSION_PREDICTOR engine (Sureshot DB + CPU_PATTERN_DB + 1000-round Quantum/Hash Exact Number + 2-Loss Safe Guard)
    const pred = server3Prediction(targetPid, historyNums, consecutiveLosses, aiEngineMode);

    sound.playLock();

    setCurrentPrediction(pred);
    pendingPredictionRef.current = {
      period: targetPid,
      prediction: pred,
    };

    // Show instant toast feedback with 1-loss recovery awareness
    if (pred.isSkip) {
      showToast(`AI Filter: Round Skipped (${pred.skipReason || 'High Risk Market Chop'})`, 'err');
    } else if (consecutiveLosses >= 1) {
      showToast(`1-LOSS RECOVERY: ${pred.bs} #${pred.number} (${pred.confidence}%)`, 'win');
    } else if (pred.isSureshot) {
      showToast(`SURESHOT MATCH: ${pred.bs} #${pred.number} (${pred.confidence}%)`, 'win');
    } else {
      showToast(`Signal Locked: ${pred.bs} #${pred.number} (${pred.confidence}%)`, 'win');
    }

    // Save this prediction to user's history as PENDING or SKIPPED
    setUserData((prev) => {
      const alreadyHas = prev.predictions.some((p) => p.period === targetPid);
      if (alreadyHas) return prev;

      const newEntry: StoredPrediction = {
        period: targetPid,
        prediction: pred.isSkip ? 'SKIP' : pred.label,
        predNum: pred.number,
        predBS: pred.bs,
        jackpotBS: pred.bs,
        logics: pred.logics,
        actualNumber: -1,
        actualBS: '—',
        actualColor: '—',
        result: pred.isSkip ? 'SKIPPED' : 'PENDING',
        time: new Date().toLocaleTimeString(),
        confidence: pred.confidence,
        serverEngine: pred.serverEngine,
        pattern: pred.pattern,
        patternName: pred.patternName,
        bunnyMessage: pred.bunnyMessage,
        hotNumbers: pred.hotNumbers,
        coldNumbers: pred.coldNumbers,
        reasoning: pred.reasoning,
        isSureshot: pred.isSureshot,
        isSkip: pred.isSkip,
        skipReason: pred.skipReason,
        runnerUps: pred.runnerUps,
      };

      const updated = {
        stats: {
          ...prev.stats,
          t: pred.isSkip ? prev.stats.t : prev.stats.t + 1,
        },
        predictions: [newEntry, ...prev.predictions].slice(0, 100),
      };

      try {
        localStorage.setItem('cyrus_ai_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }

      return updated;
    });

    if (pred.isSkip) {
      showToast(`Capital Protected: AI suggests PASS on #${targetPid.slice(-5)}`, 'win');
    } else {
      showToast(`AI Target Locked: Number ${pred.number} (${pred.bs})`, 'win');
    }
    setTimeout(() => setIsPredicting(false), 600);
  }, [apiRecords, curPeriod, isPredicting, nextPeriod, showToast, user]);

  return (
    <div className="min-h-screen flex justify-center bg-radial from-[var(--bg-radial)] to-[var(--bg-base)] text-[var(--ink)] transition-colors duration-500 overflow-x-hidden md:py-6 md:px-4">
      {/* Responsive Container: Sleek mobile shell, spacious desktop command dashboard */}
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl min-h-screen md:min-h-0 md:h-auto bg-[var(--paper)] relative overflow-x-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] flex flex-col md:rounded-3xl md:border md:border-[var(--line)] transition-all duration-300">
        {/* Ambient floating particles */}
        <ParticlesBackground enabled={particlesEnabled} />

        {/* Dynamic iOS Navbar - slides smoothly upwards and disappears when navigating to the Game page */}
        <AnimatePresence initial={false}>
          {curPage !== 'portal' && (
            <motion.div
              key="global-header-box"
              initial={{ height: 0, opacity: 0, y: -90 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -90 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden relative z-30 shrink-0"
            >
              <Navbar
                curPage={curPage}
                onBack={() => {
                  setNavDirection(-1);
                  setCurPage('games');
                }}
                onOpenSettings={() => {
                  setNavDirection(1);
                  setCurPage('settings');
                }}
                onOpenLogin={() => {
                  setLoginReason('Sign in to sync your stats in cloud & unlock VIP signals');
                  setIsLoginOpen(true);
                }}
                onOpenThemeModal={() => setIsThemeModalOpen(true)}
                isNight={isNight}
                onToggleNight={handleToggleNight}
                statusText={statusText}
                isLive={isLive}
                currentTime={currentTime}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Pages with Smooth Liquid Sliding Page Transition */}
        <main className="flex-1 relative z-10 overflow-hidden min-h-[460px]">
          <AnimatePresence mode="wait" custom={navDirection}>
            <motion.div
              key={curPage}
              custom={navDirection}
              variants={liquidPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full will-change-transform"
            >
              {curPage === 'games' && (
                <GamesView
                  onSelectGame={handleSelectGame}
                  onShowToast={showToast}
                  onNavigateToPortal={() => {
                    setNavDirection(1);
                    setCurPage('portal');
                  }}
                />
              )}

              {curPage === 'pred' && (
                <PredictionView
                  mode={curMode}
                  onSwitchMode={handleSwitchMode}
                  nextPeriod={nextPeriod}
                  countdownSec={countdownSec}
                  totalCountdown={totalCountdown}
                  apiRecords={apiRecords}
                  prediction={currentPrediction}
                  userData={userData}
                  isPredicting={isPredicting}
                  isLoggedIn={!!user}
                  onShowToast={showToast}
                  onRequestPrediction={handleRequestPrediction}
                />
              )}

              {curPage === 'portal' && (
                <GamePortalView
                  onShowToast={showToast}
                  prediction={currentPrediction}
                  countdownSec={countdownSec}
                  nextPeriod={nextPeriod}
                  onRequestPrediction={handleRequestPrediction}
                  onNavigateHome={() => {
                    setNavDirection(-1);
                    setCurPage('games');
                  }}
                  curMode={curMode}
                  onSwitchMode={handleSwitchMode}
                />
              )}

              {curPage === 'hist' && (
                <HistoryView
                  userData={userData}
                  onNavigateToGames={() => setCurPage('pred')}
                  onShowToast={showToast}
                />
              )}

              {curPage === 'settings' && (
                <SettingsView
                  currentTheme={curTheme}
                  onSelectTheme={handleSelectTheme}
                  isNight={isNight}
                  onToggleNight={handleToggleNight}
                  isAmoled={isAmoled}
                  onToggleAmoled={handleToggleAmoled}
                  particlesEnabled={particlesEnabled}
                  onToggleParticles={() => setParticlesEnabled(!particlesEnabled)}
                  soundEnabled={soundEnabled}
                  onToggleSound={handleToggleSound}
                  voiceEnabled={voiceEnabled}
                  onToggleVoice={handleToggleVoice}
                  aiEngineMode={aiEngineMode}
                  onSelectAiEngineMode={handleSelectAiEngineMode}
                  confidenceThreshold={confidenceThreshold}
                  onSelectConfidenceThreshold={handleSelectConfidenceThreshold}
                  onClearHistory={handleClearHistory}
                  onExportHistory={handleExportHistory}
                  onOpenLogin={() => {
                    setLoginReason('Sign in to sync your stats in cloud & unlock VIP signals');
                    setIsLoginOpen(true);
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* iOS Floating Glass Bottom Navigation with Liquid Sliding Animation */}
        <BottomNav
          curPage={curPage}
          onNavigate={(targetPage) => {
            const currentIdx = PAGE_ORDER[curPage] ?? 0;
            const targetIdx = PAGE_ORDER[targetPage] ?? 0;
            setNavDirection(targetIdx >= currentIdx ? 1 : -1);
            if (targetPage === 'games' && curPage === 'pred') {
              setCurPage('games');
            } else {
              setCurPage(targetPage);
            }
          }}
        />

        {/* Floating Circular Telegram VIP Button */}
        <FloatingTelegramButton />

        {/* Win / Loss Celebration Modal */}
        <WinLossModal
          isOpen={winLossModal.isOpen}
          isWin={winLossModal.isWin}
          predNum={winLossModal.predNum}
          predBS={winLossModal.predBS}
          actualNumber={winLossModal.actualNumber}
          actualBS={winLossModal.actualBS}
          confidence={winLossModal.confidence}
          period={winLossModal.period}
          onClose={() => setWinLossModal((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* Real Firebase Login Page / Modal */}
        <LoginPage
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={() => {
            showToast('Welcome to CYRUS AI!', 'win');
          }}
          reason={loginReason}
        />

        {/* 24 Themes Selector Modal */}
        <ThemeModal
          isOpen={isThemeModalOpen}
          currentTheme={curTheme}
          onSelectTheme={handleSelectTheme}
          onClose={() => setIsThemeModalOpen(false)}
        />

        {/* Animated iOS Floating Toast with real vector icons */}
        {toast && (
          <div
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full text-xs sm:text-sm font-['Sora'] font-bold text-white shadow-xl transition-all duration-300 flex items-center gap-2 ${
              toast.type === 'win'
                ? 'bg-[var(--accent)] border border-white/30'
                : 'bg-rose-600 border border-rose-400'
            }`}
          >
            {toast.type === 'win' ? (
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
