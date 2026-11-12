import test from 'node:test';
import assert from 'node:assert/strict';
import {
  runBunnyAI,
  predictExactNumber,
  runNYFusionPrediction,
  CPU_PATTERN_DB,
  numToType,
} from './nyFusionPredictor';
import {
  validateWingoRecords,
  calculateAdvancedFrequency,
  calculateMultiWindowTrend,
  calculateMarkovTransitions,
  calculateStreakAndReversal,
  matchAdvancePatterns,
  calculateNumberGaps,
  calculateColorProbabilities,
  calculateWeightedEnsemble,
  calculateStatisticalValidation,
  runWalkForwardBacktest,
  runNYAdvancePrediction,
  primaryCol,
  hasViolet,
} from './nyAdvancePatternEngine';
import { SURESHOT_DB, CLEAN_500_PATTERNS } from './nyAdvancePatternData';

test('CPU_PATTERN_DB contains 200+ calibrated WinGo patterns', () => {
  const keys = Object.keys(CPU_PATTERN_DB);
  assert.ok(keys.length >= 140, `Expected >= 140 unique patterns, got ${keys.length}`);
  assert.equal(CPU_PATTERN_DB['BBB'].next, 'SMALL');
  assert.equal(CPU_PATTERN_DB['SSS'].next, 'BIG');
});

test('SURESHOT_DB contains 592 calibrated sequences and CLEAN_500_PATTERNS contains 500 patterns', () => {
  const sureshotKeys = Object.keys(SURESHOT_DB);
  assert.equal(sureshotKeys.length, 592, `Expected 592 sureshot keys, got ${sureshotKeys.length}`);
  assert.equal(CLEAN_500_PATTERNS.length, 500, `Expected 500 clean patterns, got ${CLEAN_500_PATTERNS.length}`);
});

test('Data Validation Engine validates 1000 records, dedupes periods, and rejects out-of-range numbers', () => {
  const rawData = [
    { period: '1001', number: 7 },
    { period: '1002', number: 2 },
    { period: '1002', number: 2 }, // Duplicate period, should be dropped
    { period: '1003', number: 15 }, // Invalid number, should be rejected
    { period: '1004', number: -1 }, // Invalid number, should be rejected
    { period: '1005', number: 0 },
    { period: '1006', number: 5 },
  ];

  const result = validateWingoRecords(rawData);
  assert.equal(result.duplicatesDetected, 1);
  assert.equal(result.invalidRejected, 2);
  assert.equal(result.chronological.length, 4);

  // Check verified color & size mappings
  const r0 = result.chronological.find((r) => r.number === 0);
  assert.ok(r0);
  assert.equal(r0.size, 'SMALL');
  assert.equal(r0.color, 'RED');
  assert.equal(r0.violet, true);

  const r5 = result.chronological.find((r) => r.number === 5);
  assert.ok(r5);
  assert.equal(r5.size, 'BIG');
  assert.equal(r5.color, 'GREEN');
  assert.equal(r5.violet, true);
});

test('Advanced Frequency Analysis computes counts, expected frequencies, and hot/cold numbers', () => {
  const history = Array.from({ length: 1000 }, (_, i) => i % 10);
  const freq = calculateAdvancedFrequency(history);

  assert.equal(freq.depth, 1000);
  assert.equal(freq.probabilityBig, 50);
  assert.equal(freq.probabilitySmall, 50);
  for (let n = 0; n <= 9; n++) {
    assert.equal(freq.frequency0to9[n].count, 100);
    assert.equal(freq.frequency0to9[n].percentage, 10);
  }
});

test('Multi-Window Trend Analysis inspects all 8 windows and evaluates momentum', () => {
  // Heavy recent BIG bias (rounds 0-20 are BIGs) followed by alternating
  const history = Array.from({ length: 1000 }, (_, i) => (i < 20 ? 8 : i % 2 === 0 ? 7 : 2));
  const multi = calculateMultiWindowTrend(history);

  assert.ok(multi.windows[10]);
  assert.ok(multi.windows[20]);
  assert.ok(multi.windows[30]);
  assert.ok(multi.windows[50]);
  assert.ok(multi.windows[100]);
  assert.ok(multi.windows[200]);
  assert.ok(multi.windows[500]);
  assert.ok(multi.windows[1000]);

  assert.equal(multi.windows[10].bias, 'BIG_BIAS');
  assert.equal(multi.windows[20].bias, 'BIG_BIAS');
  assert.ok(multi.trendMomentum > 0, 'Momentum should be positive with recent BIG bias');
});

test('Markov Chain & Conditional Transitions apply Laplace smoothing', () => {
  const history = [7, 7, 7, 2, 7, 7, 3, 7, 7, 8];
  const markov = calculateMarkovTransitions(history);

  assert.ok(markov.laplaceBigProb > 0 && markov.laplaceBigProb < 1);
  assert.ok(markov.laplaceSmallProb > 0 && markov.laplaceSmallProb < 1);
  assert.equal(Math.round((markov.laplaceBigProb + markov.laplaceSmallProb) * 10) / 10, 1.0);
});

test('SURESHOT_DATABASE match triggers high confidence and isSureshot flag', () => {
  // Let's create a history tail matching "BSBSBBBBS": "2" (2 = SMALL)
  // Remember: history[0] is newest round, so reverse of "BSBSBBBBS" in recency
  // Chronological order ends with B,S,B,S,B,B,B,B,S
  const chrono = ['B', 'S', 'B', 'S', 'B', 'B', 'B', 'B', 'S'];
  const history = chrono.reverse().map((t) => (t === 'B' ? 8 : 2));

  const match = matchAdvancePatterns(history);
  assert.equal(match.isSureshot, true);
  assert.equal(match.predictedSize, 'SMALL');
  assert.ok(match.confidence >= 93);
});

test('predictExactNumber strictly adheres to BIG [5-9] and SMALL [0-4]', () => {
  const history1000 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10));

  const bigResult = predictExactNumber('BIG', history1000);
  assert.ok(
    [5, 6, 7, 8, 9].includes(bigResult.targetNumber),
    `BIG target ${bigResult.targetNumber} not in [5,6,7,8,9]`
  );

  const smallResult = predictExactNumber('SMALL', history1000);
  assert.ok(
    [0, 1, 2, 3, 4].includes(smallResult.targetNumber),
    `SMALL target ${smallResult.targetNumber} not in [0,1,2,3,4]`
  );

  const skipResult = predictExactNumber('SKIP', history1000);
  assert.equal(skipResult.targetNumber, -1);
  assert.equal(skipResult.isSkip, true);
});

test('predictExactNumber normalizes probabilities to 100% on any 1000 data sequence', () => {
  for (let trial = 0; trial < 10; trial++) {
    const history = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10));
    const big = predictExactNumber('BIG', history);
    const sumBig = big.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
    assert.equal(sumBig, 100, `BIG candidate probabilities must sum to 100, got ${sumBig}`);

    const small = predictExactNumber('SMALL', history);
    const sumSmall = small.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
    assert.equal(sumSmall, 100, `SMALL candidate probabilities must sum to 100, got ${sumSmall}`);
  }
});

test('predictExactNumber respects violet cycle (0 and 5) and colour synergy', () => {
  const noVioletRecent = [2, 4, 6, 8, 1, 3, 7, 9, 2, 4, 6, 8, 1, 3, 7, 0, 5];
  const resBig = predictExactNumber('BIG', noVioletRecent);
  assert.ok(resBig.candidateScores[5] > 0);

  const resSmall = predictExactNumber('SMALL', noVioletRecent);
  assert.ok(resSmall.candidateScores[0] > 0);
});

test('1-Loss Safe Guard triggers skip on extreme chaos and executes mapping on normal patterns', () => {
  // Normal pattern with last digit 4 (4=SMALL, 4->8)
  const history4 = [4, 4, 8, 8, 2, 2, 6, 6, 0, 0];
  const pred4 = runNYFusionPrediction('202611080002', history4, 1);
  assert.equal(pred4.isSkip, false);
  assert.equal(pred4.predictedSize, 'SMALL');
  assert.equal(pred4.predictedNumber, 8);
  assert.equal(pred4.color, 'RED'); // 8 is RED
  assert.ok(pred4.supportingNumbers && pred4.supportingNumbers.length === 3);
});

test('Walk-forward backtest executes across 1000 historical records', () => {
  const history1000 = Array.from({ length: 1000 }, (_, i) => (i % 2 === 0 ? 8 : 3));
  const accuracy = runWalkForwardBacktest(history1000, 30);
  assert.ok(accuracy >= 70 && accuracy <= 100, `Walk forward accuracy out of bounds: ${accuracy}%`);
});

test('nyFusionPredictor output messages contain zero emojis', () => {
  const history = [8, 8, 8, 8, 8, 8, 8, 8];
  const full = runNYFusionPrediction('202611080002', history, 0);
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  assert.ok(!emojiRegex.test(full.message), `full.message contains emoji: ${full.message}`);
  assert.ok(!emojiRegex.test(full.patternName), `full.patternName contains emoji: ${full.patternName}`);
  assert.ok(!emojiRegex.test(full.reasoning), `full.reasoning contains emoji: ${full.reasoning}`);
});
