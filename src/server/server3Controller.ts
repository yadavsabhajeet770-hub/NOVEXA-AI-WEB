/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Server 3 Controller — NY_FUSION_PREDICTOR API Route
 */

import { Request, Response } from 'express';
import { runNYFusionPrediction, NYFusionFullPrediction } from '../utils/nyFusionPredictor';

const API_ENDPOINTS = {
  '30s': 'https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-30s-1000',
  '1M': 'https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-1m-1000',
};

async function fetchLiveHistory(mode: '30s' | '1M'): Promise<number[]> {
  try {
    const url = API_ENDPOINTS[mode] || API_ENDPOINTS['30s'];
    let res = await fetch(url, { signal: AbortSignal.timeout(6500) });
    if (!res.ok && mode === '1M') {
      res = await fetch(API_ENDPOINTS['30s'], { signal: AbortSignal.timeout(6500) });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json?.data?.list && Array.isArray(json.data.list)) {
      return json.data.list.map((it: any) => Number(it.number ?? 0));
    }
  } catch (err) {
    console.warn(`[Server 3] Live API fallback warning:`, err);
  }
  // Default fallback sequence if network fails
  return [5, 8, 2, 7, 3, 9, 0, 4, 1, 6, 8, 2, 9, 3, 7];
}

export async function server3PredictHandler(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const query = req.query || {};

    const mode = (body.mode || query.mode || '30s') as '30s' | '1M';
    const period = body.period || query.period || `${Date.now()}`;
    const consecutiveLosses = Number(body.consecutiveLosses || query.consecutiveLosses || 0);

    let history: number[] = [];

    if (Array.isArray(body.history) && body.history.length > 0) {
      history = body.history.map(Number);
    } else {
      history = await fetchLiveHistory(mode);
    }

    // Run NY_FUSION_PREDICTOR (Pure logic.txt: CPU_PATTERN_DB + runBunnyAI + predictExactNumber 1000 data)
    const fusionResult: NYFusionFullPrediction = runNYFusionPrediction(period, history, consecutiveLosses);

    return res.json({
      success: true,
      server: 3,
      engine: 'NY_FUSION_PREDICTOR',
      mode,
      period,
      analyzedRounds: Math.min(1000, history.length),
      prediction: {
        size: fusionResult.predictedSize,
        exactNumber: fusionResult.predictedNumber,
        color: fusionResult.color,
        violet: fusionResult.violet,
        confidence: fusionResult.confidence,
        isSkip: fusionResult.isSkip,
        skipReason: fusionResult.skipReason,
        pattern: fusionResult.pattern,
        patternName: fusionResult.patternName,
        message: fusionResult.message,
        hotNumbers: fusionResult.hotNumbers,
        coldNumbers: fusionResult.coldNumbers,
        runnerUps: fusionResult.runnerUps,
        candidateProbs: fusionResult.candidateProbs,
        reasoning: fusionResult.reasoning,
        choppinessIndex: fusionResult.choppinessIndex,
        entropyScore: fusionResult.entropyScore,
      },
      timestamp: fusionResult.timestamp,
    });
  } catch (error: any) {
    console.error('[Server 3] Prediction Error:', error);
    return res.status(500).json({
      success: false,
      server: 3,
      error: error?.message || 'Server 3 Prediction failed',
    });
  }
}
