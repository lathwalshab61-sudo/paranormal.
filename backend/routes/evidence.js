import express from 'express';
import { initialEvidence } from '../data/seedData.js';
import crypto from 'crypto';

export const evidenceRouter = express.Router();

let evidenceVault = [...initialEvidence];

// GET /api/evidence
evidenceRouter.get('/', (req, res) => {
  const { category } = req.query;
  let results = evidenceVault;
  if (category) {
    results = results.filter((e) => e.category === category);
  }

  res.json({
    status: 'ok',
    count: results.length,
    data: results,
  });
});

// POST /api/evidence
evidenceRouter.post('/', (req, res) => {
  const { title, subtitle, analysisText, frequency, confidence, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required for evidence archival' });
  }

  const sha256 = crypto
    .createHash('sha256')
    .update(`${title}-${Date.now()}`)
    .digest('hex');

  const newRecord = {
    archiveId: `#${Math.floor(500 + Math.random() * 500)}`,
    title,
    subtitle: subtitle || `ACOUSTIC CAPTURE • ${new Date().toLocaleTimeString()} EST`,
    analysisText: analysisText || 'Empirical spectral formant match confirmed.',
    confidence: confidence || '92.4%',
    frequency: frequency || '320 Hz',
    noiseFloor: '-44dB',
    duration: '00:20',
    category: category || 'Class-A Audio',
    sha256,
  };

  evidenceVault.unshift(newRecord);

  res.status(201).json({
    status: 'created',
    message: 'Evidence cryptographically signed and archived',
    data: newRecord,
  });
});

