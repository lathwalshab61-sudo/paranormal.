import express from 'express';
import { initialLocations } from '../data/seedData.js';

export const locationsRouter = express.Router();

let locations = [...initialLocations];

// GET /api/locations
locationsRouter.get('/', (req, res) => {
  const { tag, search } = req.query;
  let results = locations;

  if (tag) {
    results = results.filter((loc) =>
      loc.tags.some((t) => t.label.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (loc) =>
        loc.title.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        loc.subtitle.toLowerCase().includes(q)
    );
  }

  res.json({
    status: 'ok',
    count: results.length,
    data: results,
  });
});

// GET /api/locations/:id
locationsRouter.get('/:id', (req, res) => {
  const loc = locations.find((l) => l.id === req.params.id);
  if (!loc) {
    return res.status(404).json({ error: 'Containment site dossier not found' });
  }
  res.json({
    status: 'ok',
    data: loc,
  });
});

// POST /api/locations/:id/override
locationsRouter.post('/:id/override', (req, res) => {
  const loc = locations.find((l) => l.id === req.params.id);
  if (!loc) {
    return res.status(404).json({ error: 'Location not found' });
  }

  const { statusLabel, threatLevel } = req.body;
  if (statusLabel) loc.statusLabel = statusLabel;
  if (threatLevel) loc.threatLevel = threatLevel;

  res.json({
    message: `Containment parameters updated for ${loc.title}`,
    data: loc,
  });
});

