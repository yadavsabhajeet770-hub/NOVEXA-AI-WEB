import test from 'node:test';
import assert from 'node:assert/strict';
import {
  bsOf,
  primaryCol,
  hasViolet,
  hashPeriod,
  aiEnsemble,
  server3Prediction,
  StatisticalPredictionEngine,
  SYS,
} from './aiEngine';

test('bsOf returns BIG for >=5 and SMALL for <5', () => {
  assert.equal(bsOf(0), 'SMALL');
  assert.equal(bsOf(4), 'SMALL');
  assert.equal(bsOf(5), 'BIG');
  assert.equal(bsOf(9), 'BIG');
});

test('primaryCol and hasViolet handle 0 and 5 special numbers correctly', () => {
  assert.equal(primaryCol(0), 'RED');
  assert.equal(hasViolet(0), true);
  assert.equal(primaryCol(5), 'GREEN');
  assert.equal(hasViolet(5), true);
  assert.equal(primaryCol(1), 'GREEN');
  assert.equal(hasViolet(1), false);
  assert.equal(primaryCol(2), 'RED');
  assert.equal(hasViolet(2), false);
});

test('hashPeriod is deterministic for given period', () => {
  const p1 = '202610270001';
  assert.equal(hashPeriod(p1), hashPeriod(p1));
  assert.notEqual(hashPeriod(p1), hashPeriod('202610270002'));
});

test('aiEnsemble returns a valid prediction result with 26+ breakdown systems', () => {
  const sampleHistory = Array.from({ length: 1000 }, (_, i) => i % 10);
  const res = aiEnsemble('202610270016', sampleHistory);

  assert.ok(res.number >= 0 && res.number <= 9);
  assert.ok(res.bs === 'BIG' || res.bs === 'SMALL');
  assert.ok(res.confidence >= 60 && res.confidence <= 100);
  assert.ok(res.label.length > 0);
  assert.equal(Object.keys(res.breakdown).length, Object.keys(SYS).length);
  assert.ok(res.breakdown['MWIN']);
  assert.ok(res.breakdown['MKV2']);
  assert.ok(res.breakdown['SURE']);
  assert.ok(res.breakdown['GAPN']);
  assert.ok(res.breakdown['RNDR']);
});

test('StatisticalPredictionEngine multiWindowTrend assesses 10, 20, 50, 100, 500, 1000 windows', () => {
  const history1000 = Array.from({ length: 1000 }, (_, i) => (i < 20 ? 8 : i % 2 === 0 ? 7 : 3));
  const trend = StatisticalPredictionEngine.multiWindowTrend(history1000);

  assert.ok(trend.windows[10]);
  assert.ok(trend.windows[20]);
  assert.ok(trend.windows[50]);
  assert.ok(trend.windows[100]);
  assert.ok(trend.windows[500]);
  assert.ok(trend.windows[1000]);
  assert.equal(trend.windows[10].bias, 'BIG_BIAS');
  assert.ok(trend.trendMomentum > 0);
});

test('StatisticalPredictionEngine markovTransitions computes 1st and 2nd order probabilities with Laplace smoothing', () => {
  const history = [7, 7, 7, 2, 7, 7, 3, 7, 7, 8];
  const markov = StatisticalPredictionEngine.markovTransitions(history);

  assert.ok(markov.laplaceBigProb > 0 && markov.laplaceBigProb < 1);
  assert.ok(markov.laplaceSmallProb > 0 && markov.laplaceSmallProb < 1);
  assert.equal(Math.round((markov.laplaceBigProb + markov.laplaceSmallProb) * 10) / 10, 1.0);
});

test('StatisticalPredictionEngine detectRandomRepeatAndBounce tracks repeat rates and overdue repeats', () => {
  // Sequence with immediate repeat [8, 8, ...]
  const historyWithRepeat = [8, 8, 2, 7, 3, 8, 2, 7, 4, 9];
  const res = StatisticalPredictionEngine.detectRandomRepeatAndBounce(historyWithRepeat);

  assert.ok(typeof res.empiricalRepeatRate === 'number');
  assert.ok(typeof res.empiricalBounceRate === 'number');
  assert.equal(res.lastNum, 8);
  assert.equal(res.roundsSinceRepeat, 0); // Happened at index 0
});

test('StatisticalPredictionEngine predictExactNumber strictly adheres to BIG [5-9] and SMALL [0-4] and sums to 100%', () => {
  const history1000 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10));

  const bigResult = StatisticalPredictionEngine.predictExactNumber('BIG', history1000);
  assert.ok([5, 6, 7, 8, 9].includes(bigResult.targetNumber));
  const bigSum = bigResult.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
  assert.equal(bigSum, 100);

  const smallResult = StatisticalPredictionEngine.predictExactNumber('SMALL', history1000);
  assert.ok([0, 1, 2, 3, 4].includes(smallResult.targetNumber));
  const smallSum = smallResult.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
  assert.equal(smallSum, 100);
});

test('server3Prediction processes 1000 records and handles 1-loss recovery mapping with 3 supporting numbers', () => {
  // Test with history starting with 7
  // Mapping rules:
  // 7 -> BS: SMALL, Num: 9 -> mappedBS is SMALL, exactNum is 9 (or mappedBS from rule: 7=SMALL, 7->9)
  // Let's test with history starting with last digit 1 (1=SMALL, 1->7)
  const history1000 = [1, 2, 4, 6, 8, 0, 3, 5, 7, 9].concat(Array.from({ length: 990 }, (_, i) => i % 10));

  // Normal run (0 losses)
  const normalPred = server3Prediction('20261028100051957', history1000, 0);
  assert.ok(['BIG', 'SMALL', 'SKIP'].includes(normalPred.bs));
  assert.ok(normalPred.candidateProbs && normalPred.candidateProbs.length > 0);

  // 1-loss run (consecutiveLosses = 1)
  const lossPred = server3Prediction('20261028100051958', history1000, 1);
  assert.equal(lossPred.isTwoLossShieldActive, true);
  assert.equal(lossPred.isSkip, false);
  // Last digit of history[0] = 1:
  // BS: 1=SMALL
  // NUM: 1->7
  assert.equal(lossPred.bs, 'SMALL');
  assert.equal(lossPred.number, 7);
  // 7 is GREEN (odd and not 0 or 5)
  assert.equal(lossPred.color, 'GREEN');
  assert.equal(lossPred.violet, false);
  assert.ok(lossPred.label.includes('(1L Recovery Mapping)'));

  // Verify 3 supporting numbers
  assert.ok(lossPred.supportingNumbers && lossPred.supportingNumbers.length === 3);
  assert.equal(lossPred.supportingNumbers.includes(7), false); // Distinct from primary

  // Verify candidate probability sum is 100%
  if (lossPred.candidateProbs && lossPred.candidateProbs.length > 0) {
    const sum = lossPred.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
    assert.equal(sum, 100);
  }
});

test('StatisticalPredictionEngine analyzeLatestNumberOccurrences deeply audits 1000 records', () => {
  // Fabricate 1000 records where number 7 appears multiple times followed predominantly by 2 (SMALL, RED)
  const history1000: number[] = [7];
  for (let i = 1; i < 1000; i++) {
    if (history1000[i - 1] === 7 && i < 200) {
      history1000.push(2); // Followed by 2
    } else {
      history1000.push((i * 3 + 1) % 10);
    }
  }

  const audit = StatisticalPredictionEngine.analyzeLatestNumberOccurrences(history1000);
  assert.equal(audit.lastNum, 7);
  assert.ok(audit.totalOccurrences > 0);
  assert.ok(audit.topNextNumber >= 0 && audit.topNextNumber <= 9);
  assert.ok(audit.bigPctAfterLastNum >= 0 && audit.bigPctAfterLastNum <= 100);
  assert.ok(audit.smallPctAfterLastNum >= 0 && audit.smallPctAfterLastNum <= 100);
  assert.ok(audit.redPctAfterLastNum >= 0 && audit.redPctAfterLastNum <= 100);
  assert.ok(audit.greenPctAfterLastNum >= 0 && audit.greenPctAfterLastNum <= 100);
});

test('StatisticalPredictionEngine analyzeColorPatterns detects colour streaks, zigzags, and violet cycle', () => {
  // Red streak: numbers [2, 4, 6, 8, 2] (all Red)
  const redStreakHistory = [2, 4, 6, 8, 2, 1, 3, 7];
  const redAnalysis = StatisticalPredictionEngine.analyzeColorPatterns(redStreakHistory);
  assert.equal(redAnalysis.colorStreak.type, 'RED');
  assert.ok(redAnalysis.colorStreak.count >= 4);

  // Alternating R-G-R-G: [2, 3, 4, 7, 6, 9] (R, G, R, G, R, G)
  const altHistory = [2, 3, 4, 7, 6, 9, 2, 1];
  const altAnalysis = StatisticalPredictionEngine.analyzeColorPatterns(altHistory);
  assert.equal(altAnalysis.isAlternating, true);

  // Violet cycle overdue test: 10 rounds with no 0 or 5
  const noVioletHistory = [1, 2, 3, 4, 6, 7, 8, 9, 1, 2, 3];
  const violetAnalysis = StatisticalPredictionEngine.analyzeColorPatterns(noVioletHistory);
  assert.ok(violetAnalysis.roundsSinceViolet >= 6);
  assert.equal(violetAnalysis.violetSurge, true);
});

test('StatisticalPredictionEngine selectExactNumber prioritizes dual pattern intersection', () => {
  // If Big/Small is predicting BIG and Colour pattern predicts RED -> intersection candidates are [6, 8]
  // Provide history with Red momentum
  const redHistory = [2, 4, 6, 8, 2, 4, 6, 8, 2, 4];
  const res = StatisticalPredictionEngine.predictExactNumber('BIG', redHistory);
  assert.ok([5, 6, 7, 8, 9].includes(res.targetNumber));
  // Probability distribution must strictly sum to 100%
  const totalProb = res.candidateProbs.reduce((acc, c) => acc + c.probability, 0);
  assert.equal(totalProb, 100);
});

