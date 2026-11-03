import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { AssessmentParameters } from './src/types/assessment';
import { generateAssessmentWithGemini } from './src/server/geminiAssessor';

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'smart-pai-assessor' });
  });

  app.post('/api/assess/generate', async (req, res) => {
    try {
      const parameters = req.body?.parameters as AssessmentParameters | undefined;
      if (!parameters || !parameters.fase || !parameters.topikMateri) {
        res.status(400).json({ error: 'Parameter asesmen PAIBP tidak lengkap.' });
        return;
      }

      const result = await generateAssessmentWithGemini(parameters);
      res.json(result);
    } catch (error) {
      console.error('Failed to process /api/assess/generate:', error);
      res.status(500).json({ error: 'Gagal menyusun instrumen asesmen.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart PAI Assessor running on http://localhost:${PORT}`);
  });
}

startServer();
