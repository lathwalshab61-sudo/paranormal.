import express from 'express';
import { initialIncidents } from '../data/seedData.js';

export const incidentsRouter = express.Router();

let incidents = [...initialIncidents];

// GET /api/incidents
incidentsRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    count: incidents.length,
    data: incidents,
  });
});

// POST /api/incidents
incidentsRouter.post('/', (req, res) => {
  const { location, type, level, notes } = req.body;

  if (!location || !type) {
    return res.status(400).json({ error: 'Location and Anomaly Type are required' });
  }

  const newIncident = {
    id: `inc-${Date.now().toString().slice(-4)}`,
    time: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' EST',
    location,
    type,
    level: level || 'LVL-3',
    status: 'Active Audit',
    notes: notes || '',
  };

  incidents.unshift(newIncident);

  res.status(201).json({
    status: 'created',
    message: 'Field anomaly incident logged successfully',
    data: newIncident,
  });
});

