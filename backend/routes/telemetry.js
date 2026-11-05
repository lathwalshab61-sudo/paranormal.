import express from 'express';

export const telemetryRouter = express.Router();

let currentTelemetry = {
  emf: 4.8,
  thermal: 58.2,
  frequency: 105.4,
  anomalyIndex: 'LVL 3-MOD',
  anomalySeverity: 'moderate',
  fieldTeams: 14,
  enRouteTeams: 4,
  solarKp: 'Kp 4.2',
  solarStatus: 'Geomagnetic Dip',
};

// Periodic fluctuation engine
setInterval(() => {
  currentTelemetry.emf = parseFloat((4.4 + Math.random() * 0.9).toFixed(1));
  currentTelemetry.thermal = parseFloat((57.8 + Math.random() * 0.7).toFixed(1));
  currentTelemetry.frequency = parseFloat((105.1 + Math.random() * 0.6).toFixed(1));
}, 2800);

// GET /api/telemetry
telemetryRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    data: currentTelemetry,
  });
});

// GET /api/telemetry/stream (Server-Sent Events)
telemetryRouter.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial state immediately
  res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);

  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);
  }, 2800);

  req.on('close', () => {
    clearInterval(timer);
  });
});

// POST /api/telemetry/calibrate
telemetryRouter.post('/calibrate', (req, res) => {
  const { sensor } = req.body;
  if (sensor === 'emf') currentTelemetry.emf = 0.0;
  if (sensor === 'thermal') currentTelemetry.thermal = 72.0;

  res.json({
    message: `Sensor [${sensor}] zero-calibrated successfully`,
    data: currentTelemetry,
  });
});

