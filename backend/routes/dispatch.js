import express from 'express';
import crypto from 'crypto';

export const dispatchRouter = express.Router();

let dispatchLogs = [];

// POST /api/dispatch
dispatchRouter.post('/', (req, res) => {
  const { agentId, frequency, urgency, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message payload is required for dispatch transmission' });
  }

  const ackId = `ACK-${Date.now().toString().slice(-6)}`;
  const checksum = crypto
    .createHash('md5')
    .update(`${agentId}-${message}-${Date.now()}`)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();

  const record = {
    ackId,
    checksum,
    agentId: agentId || 'AGENT-UNKNOWN',
    frequency: frequency || '142.800 MHz',
    urgency: urgency || 'NORMAL',
    message,
    timestamp: new Date().toISOString(),
    status: 'ACKNOWLEDGED_BY_CENTRAL',
  };

  dispatchLogs.unshift(record);

  res.status(200).json({
    status: 'ok',
    success: true,
    message: 'Transmission decrypted, logged, and verified by Central Relay',
    ackId,
    checksum,
    data: record,
  });
});

// GET /api/dispatch/logs
dispatchRouter.get('/logs', (req, res) => {
  res.json({
    status: 'ok',
    count: dispatchLogs.length,
    data: dispatchLogs,
  });
});

