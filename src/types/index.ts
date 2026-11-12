/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ThemeDef {
  k: string;
  n: string;
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  accent: string;
  accent2: string;
  soft: string;
  deep: string;
  bg: string;
  base: string;
  darkBg?: string;
  darkBase?: string;
  heroGrad?: string;
  heroShadow?: string;
}

export interface ApiRecord {
  period: string;
  number: number;
  size?: string;
  colour?: string;
  time?: string;
}

export interface WingoHistoryItem {
  issueNumber: string;
  number: number;
  size: 'big' | 'small' | 'BIG' | 'SMALL';
  colour: string;
  time: string;
}

export interface StoredPrediction {
  period: string;
  prediction: string;
  predNum: number;
  predBS: 'BIG' | 'SMALL' | 'SKIP';
  jackpotBS: 'BIG' | 'SMALL' | 'SKIP';
  logics: Array<{ k: string; bs: 'BIG' | 'SMALL' }>;
  actualNumber: number;
  actualBS: 'BIG' | 'SMALL' | '—';
  actualColor: 'RED' | 'GREEN' | '—';
  result: 'WIN' | 'JACKPOT' | 'LOSS' | 'PENDING' | 'SKIPPED';
  time: string;
  confidence: number;
  serverEngine?: 'SERVER_1_ENSEMBLE' | 'SERVER_3_NY_FUSION';
  pattern?: string;
  patternName?: string;
  bunnyMessage?: string;
  hotNumbers?: number[];
  coldNumbers?: number[];
  runnerUps?: { number: number; probability: number }[];
  reasoning?: string;
  isSureshot?: boolean;
  isSkip?: boolean;
  skipReason?: string;
}

export interface UserData {
  stats: {
    t: number;
    w: number;
    l: number;
    j?: number;
  };
  predictions: StoredPrediction[];
}

export type PageId = 'games' | 'portal' | 'pred' | 'hist' | 'settings';
export type GameMode = '30s' | '1M';
