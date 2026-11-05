import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialLocations, initialEvidence, initialIncidents } from './data/seedData.js';
import { connectDB, getDBStatus, LocationModel, IncidentModel, EvidenceModel, DispatchModel } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');

// Load .env natively
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx > -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://agnm4m_db_user:<db_password>@cluster0.kiieyhz.mongodb.net/btu_telemetry?retryWrites=true&w=majority';

// In-Memory Fallback State
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

let inMemoryLocations = [...initialLocations];
let inMemoryEvidence = [...initialEvidence];
let inMemoryIncidents = [...initialIncidents];
let inMemoryDispatch = [];

// Continuous telemetry oscillator
setInterval(() => {
  currentTelemetry.emf = parseFloat((4.4 + Math.random() * 0.9).toFixed(1));
  currentTelemetry.thermal = parseFloat((57.8 + Math.random() * 0.7).toFixed(1));
  currentTelemetry.frequency = parseFloat((105.1 + Math.random() * 0.6).toFixed(1));
}, 2800);

// Initialize Database
connectDB(MONGODB_URI);

// Detect if express & cors are available
let express, cors;
try {
  express = (await import('express')).default;
  cors = (await import('cors')).default;
} catch (err) {
  console.log('[BTU Server] Notice: Express not yet in node_modules, engaging Native Zero-Dependency HTTP Engine.');
}

if (express && cors) {
  // Express Implementation
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Static files
  app.use(express.static(FRONTEND_DIR));

  app.use((req, res, next) => {
    console.log(`[BTU-NET ${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ONLINE',
      engine: 'Express.js',
      division: 'Beyond the Unknown (BTU)',
      protocolVersion: '4.8.2',
      stationRef: 'LAT 34.0522° LON -118.2437°',
      database: getDBStatus(),
      serverTime: new Date().toISOString(),
      telemetryActive: true,
    });
  });

  app.get('/api/telemetry', (req, res) => res.json({ status: 'ok', data: currentTelemetry }));

  app.get('/api/telemetry/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);
    const timer = setInterval(() => {
      res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);
    }, 2800);

    req.on('close', () => clearInterval(timer));
  });

  app.get('/api/locations', async (req, res) => {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && LocationModel) {
        const locations = await LocationModel.find({});
        return res.json({ status: 'ok', count: locations.length, source: 'MongoDB Atlas', data: locations });
      }
    } catch (e) {
      console.warn('Fallback to in-memory locations', e.message);
    }
    res.json({ status: 'ok', count: inMemoryLocations.length, source: 'In-Memory', data: inMemoryLocations });
  });

  app.get('/api/locations/:id', async (req, res) => {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && LocationModel) {
        const loc = await LocationModel.findOne({ id: req.params.id });
        if (loc) return res.json({ status: 'ok', source: 'MongoDB Atlas', data: loc });
      }
    } catch (e) {}

    const loc = inMemoryLocations.find((l) => l.id === req.params.id);
    if (!loc) return res.status(404).json({ error: 'Location dossier not found' });
    res.json({ status: 'ok', source: 'In-Memory', data: loc });
  });

  app.get('/api/incidents', async (req, res) => {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && IncidentModel) {
        const incidents = await IncidentModel.find({}).sort({ createdAt: -1 });
        return res.json({ status: 'ok', count: incidents.length, source: 'MongoDB Atlas', data: incidents });
      }
    } catch (e) {}
    res.json({ status: 'ok', count: inMemoryIncidents.length, source: 'In-Memory', data: inMemoryIncidents });
  });

  app.post('/api/incidents', async (req, res) => {
    const { location, type, level, notes } = req.body;
    const newIncident = {
      id: `inc-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' EST',
      location: location || 'Field Sector',
      type: type || 'Anomalous Flux',
      level: level || 'LVL-3',
      status: 'Active Audit',
      notes: notes || '',
    };

    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && IncidentModel) {
        await IncidentModel.create(newIncident);
        return res.status(201).json({ status: 'created', source: 'MongoDB Atlas', data: newIncident });
      }
    } catch (e) {}

    inMemoryIncidents.unshift(newIncident);
    res.status(201).json({ status: 'created', source: 'In-Memory', data: newIncident });
  });

  app.get('/api/evidence', async (req, res) => {
    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && EvidenceModel) {
        const evidence = await EvidenceModel.find({});
        return res.json({ status: 'ok', count: evidence.length, source: 'MongoDB Atlas', data: evidence });
      }
    } catch (e) {}
    res.json({ status: 'ok', count: inMemoryEvidence.length, source: 'In-Memory', data: inMemoryEvidence });
  });

  app.post('/api/dispatch', async (req, res) => {
    const { agentId, frequency, urgency, message } = req.body;
    const ackId = `ACK-${Date.now().toString().slice(-6)}`;
    const record = {
      ackId,
      agentId: agentId || 'AGENT-BTU-774',
      frequency: frequency || '142.800 MHz',
      urgency: urgency || 'NORMAL',
      message: message || '',
      status: 'ACKNOWLEDGED_BY_CENTRAL',
    };

    try {
      const dbStatus = getDBStatus();
      if (dbStatus.connected && DispatchModel) {
        await DispatchModel.create(record);
        return res.json({ status: 'ok', ackId, source: 'MongoDB Atlas', data: record });
      }
    } catch (e) {}

    inMemoryDispatch.unshift(record);
    res.json({ status: 'ok', ackId, source: 'In-Memory', data: record });
  });

  app.get('/', (req, res) => {
    const standaloneFile = path.join(FRONTEND_DIR, 'standalone.html');
    if (fs.existsSync(standaloneFile)) {
      res.sendFile(standaloneFile);
    } else {
      res.send('BTU Telemetry Backend Online.');
    }
  });

  app.listen(PORT, () => {
    const db = getDBStatus();
    console.log(`=======================================================`);
    console.log(`🚀 BTU FULL-STACK APP ONLINE ON PORT ${PORT}`);
    console.log(`🖥️  Frontend UI: http://localhost:${PORT}`);
    console.log(`🍃 Database: ${db.provider}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
} else {
  // Built-in Native Node.js HTTP Engine
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    console.log(`[BTU-NET ${new Date().toISOString()}] ${method} ${pathname}`);

    const sendJson = (statusCode, data) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    const parseBody = (callback) => {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          callback(parsed);
        } catch {
          callback({});
        }
      });
    };

    // Serve Frontend Standalone React App at root
    if (pathname === '/' || pathname === '/index.html' || pathname === '/app') {
      const standaloneFile = path.join(FRONTEND_DIR, 'standalone.html');
      if (fs.existsSync(standaloneFile)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(standaloneFile).pipe(res);
        return;
      }
    }

    // Routing
    if (pathname === '/api/health') {
      sendJson(200, {
        status: 'ONLINE',
        engine: 'Native Node.js (Zero-Dependency Engine)',
        division: 'Beyond the Unknown (BTU)',
        protocolVersion: '4.8.2',
        stationRef: 'LAT 34.0522° LON -118.2437°',
        database: getDBStatus(),
        serverTime: new Date().toISOString(),
        telemetryActive: true,
      });
    } else if (pathname === '/api/telemetry') {
      sendJson(200, { status: 'ok', data: currentTelemetry });
    } else if (pathname === '/api/telemetry/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });
      res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);
      const timer = setInterval(() => {
        res.write(`data: ${JSON.stringify(currentTelemetry)}\n\n`);
      }, 2800);
      req.on('close', () => clearInterval(timer));
    } else if (pathname === '/api/locations') {
      try {
        const dbStatus = getDBStatus();
        if (dbStatus.connected && LocationModel) {
          const locations = await LocationModel.find({});
          return sendJson(200, { status: 'ok', count: locations.length, source: 'MongoDB Atlas', data: locations });
        }
      } catch (e) {}
      sendJson(200, { status: 'ok', count: inMemoryLocations.length, source: 'In-Memory', data: inMemoryLocations });
    } else if (pathname.startsWith('/api/locations/')) {
      const id = pathname.replace('/api/locations/', '');
      try {
        const dbStatus = getDBStatus();
        if (dbStatus.connected && LocationModel) {
          const loc = await LocationModel.findOne({ id });
          if (loc) return sendJson(200, { status: 'ok', source: 'MongoDB Atlas', data: loc });
        }
      } catch (e) {}
      const loc = inMemoryLocations.find((l) => l.id === id);
      if (loc) sendJson(200, { status: 'ok', source: 'In-Memory', data: loc });
      else sendJson(404, { error: 'Location not found' });
    } else if (pathname === '/api/incidents') {
      if (method === 'GET') {
        try {
          const dbStatus = getDBStatus();
          if (dbStatus.connected && IncidentModel) {
            const incidents = await IncidentModel.find({}).sort({ createdAt: -1 });
            return sendJson(200, { status: 'ok', count: incidents.length, source: 'MongoDB Atlas', data: incidents });
          }
        } catch (e) {}
        sendJson(200, { status: 'ok', count: inMemoryIncidents.length, source: 'In-Memory', data: inMemoryIncidents });
      } else if (method === 'POST') {
        parseBody(async (body) => {
          const newIncident = {
            id: `inc-${Date.now().toString().slice(-4)}`,
            time: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' EST',
            location: body.location || 'Field Sector',
            type: body.type || 'Anomalous Flux',
            level: body.level || 'LVL-3',
            status: 'Active Audit',
            notes: body.notes || '',
          };
          try {
            const dbStatus = getDBStatus();
            if (dbStatus.connected && IncidentModel) {
              await IncidentModel.create(newIncident);
              return sendJson(201, { status: 'created', source: 'MongoDB Atlas', data: newIncident });
            }
          } catch (e) {}
          inMemoryIncidents.unshift(newIncident);
          sendJson(201, { status: 'created', source: 'In-Memory', data: newIncident });
        });
      }
    } else if (pathname === '/api/evidence') {
      try {
        const dbStatus = getDBStatus();
        if (dbStatus.connected && EvidenceModel) {
          const evidence = await EvidenceModel.find({});
          return sendJson(200, { status: 'ok', count: evidence.length, source: 'MongoDB Atlas', data: evidence });
        }
      } catch (e) {}
      sendJson(200, { status: 'ok', count: inMemoryEvidence.length, source: 'In-Memory', data: inMemoryEvidence });
    } else if (pathname === '/api/dispatch' && method === 'POST') {
      parseBody(async (body) => {
        const ackId = `ACK-${Date.now().toString().slice(-6)}`;
        const record = {
          ackId,
          agentId: body.agentId || 'AGENT-BTU-774',
          frequency: body.frequency || '142.800 MHz',
          urgency: body.urgency || 'NORMAL',
          message: body.message || '',
          status: 'ACKNOWLEDGED_BY_CENTRAL',
        };
        try {
          const dbStatus = getDBStatus();
          if (dbStatus.connected && DispatchModel) {
            await DispatchModel.create(record);
            return sendJson(200, { status: 'ok', ackId, source: 'MongoDB Atlas', data: record });
          }
        } catch (e) {}
        inMemoryDispatch.unshift(record);
        sendJson(200, { status: 'ok', ackId, source: 'In-Memory', data: record });
      });
    } else {
      sendJson(404, { error: 'Endpoint not found', pathname });
    }
  });

  server.listen(PORT, () => {
    const db = getDBStatus();
    console.log(`=======================================================`);
    console.log(`🚀 BTU TACTICAL FULL-STACK APP (NATIVE NODE.JS)`);
    console.log(`🖥️  Frontend UI: http://localhost:${PORT}`);
    console.log(`🍃 Database: ${db.provider}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}
