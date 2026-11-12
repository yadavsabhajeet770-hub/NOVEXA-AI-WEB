/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { server3PredictHandler } from './src/server/server3Controller';

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json());

  // Server 3 API Routes
  app.get('/api/server3/predict', server3PredictHandler);
  app.post('/api/server3/predict', server3PredictHandler);
  app.get('/api/predict/server3', server3PredictHandler);
  app.post('/api/predict/server3', server3PredictHandler);

  // Fast In-Memory Cached Wingo Live Data Proxy with Rapid Background Polling
  const historyCache: Record<string, { data: any; ts: number }> = {};
  const isFetchingMap: Record<string, boolean> = {};

  const backgroundSync = async (mode: '30s' | '1m', force = false): Promise<any> => {
    const cacheKey = `${mode}_1000`;
    if (!force && isFetchingMap[cacheKey]) return historyCache[cacheKey]?.data;
    isFetchingMap[cacheKey] = true;
    try {
      const primaryUrl = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-${mode}-1000?t=${Date.now()}`;
      let response = await fetch(primaryUrl, { signal: AbortSignal.timeout(1800) });
      if (!response.ok && mode === '1m') {
        const fallbackUrl = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-30s-1000?t=${Date.now()}`;
        response = await fetch(fallbackUrl, { signal: AbortSignal.timeout(1800) });
      }
      if (response.ok) {
        const json = await response.json();
        historyCache[cacheKey] = { data: json, ts: Date.now() };
        return json;
      }
    } catch {
      // background silent retry
    } finally {
      isFetchingMap[cacheKey] = false;
    }
    return historyCache[cacheKey]?.data;
  };

  // Immediate initial load and 500ms continuous rapid background refresh
  backgroundSync('30s');
  backgroundSync('1m');
  setInterval(() => {
    backgroundSync('30s');
    backgroundSync('1m');
  }, 500);

  app.get('/api/wingo/history', async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const mode = (req.query.mode === '30s' ? '30s' : '1m') as '30s' | '1m';
    const limit = req.query.limit === '1000' ? '1000' : req.query.limit === '500' ? '500' : '100';
    const isFresh = req.query.fresh === '1';
    const cacheKey = `${mode}_1000`;
    const now = Date.now();

    const cached = historyCache[cacheKey];

    // If client requested fresh data, or cache is missing or older than 300ms, fetch immediately
    if (isFresh && (!cached || (now - cached.ts > 300))) {
      try {
        const freshData = await backgroundSync(mode, true);
        if (freshData) {
          return res.json(freshData);
        }
      } catch {
        // fallback to cached
      }
    } else if (!cached || (now - cached.ts > 600)) {
      backgroundSync(mode, true);
    }

    if (cached) {
      return res.json(cached.data);
    }

    // Direct live fetch if cache not yet populated
    try {
      const primaryUrl = `https://sky-predictor-1012593186417.asia-southeast1.run.app/api/wingo-history-${mode}-${limit}?t=${Date.now()}`;
      const response = await fetch(primaryUrl, { signal: AbortSignal.timeout(2000) });
      if (response.ok) {
        const json = await response.json();
        historyCache[cacheKey] = { data: json, ts: Date.now() };
        return res.json(json);
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (err: any) {
      return res.status(502).json({ error: 'Failed to fetch live history', details: err?.message });
    }
  });

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      engine: 'NY_FUSION_PREDICTOR',
      server: 3,
      time: new Date().toISOString(),
    });
  });

  // Mount Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CYRUS AI & Server 3 NY_FUSION_PREDICTOR running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal Server Error:', err);
  process.exit(1);
});
