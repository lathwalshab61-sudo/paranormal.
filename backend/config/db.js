import { initialLocations, initialEvidence, initialIncidents } from '../data/seedData.js';

let mongoose = null;
let isConnected = false;
let LocationModel = null;
let IncidentModel = null;
let EvidenceModel = null;
let DispatchModel = null;
let UserModel = null;

// Try dynamically importing mongoose
try {
  mongoose = (await import('mongoose')).default;
} catch (e) {
  console.log('[Database] Mongoose package not yet installed in node_modules.');
}

if (mongoose) {
  // Define Schemas
  const locationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    subtitle: String,
    description: String,
    image: String,
    distance: String,
    tags: [{ label: String, highlight: String }],
    statusLabel: String,
    statusType: String,
    threatLevel: String,
    coordinates: String,
    established: String,
    anomalies: [String],
    containmentProtocol: String,
  }, { timestamps: true });

  const incidentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    time: String,
    location: String,
    type: String,
    level: String,
    status: String,
    notes: String,
  }, { timestamps: true });

  const evidenceSchema = new mongoose.Schema({
    archiveId: { type: String, required: true, unique: true },
    title: String,
    subtitle: String,
    analysisText: String,
    confidence: String,
    frequency: String,
    noiseFloor: String,
    duration: String,
    category: String,
    sha256: String,
  }, { timestamps: true });

  const dispatchSchema = new mongoose.Schema({
    ackId: { type: String, required: true, unique: true },
    agentId: String,
    frequency: String,
    urgency: String,
    message: String,
    status: { type: String, default: 'ACKNOWLEDGED_BY_CENTRAL' },
  }, { timestamps: true });

  const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    callSign: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    clearanceLevel: { type: String, default: 'SEC-LEVEL 2' },
    role: { type: String, default: 'Field Operative' },
    badgeNumber: { type: String },
    stationRef: { type: String, default: 'LAT 34.0522° LON -118.2437°' },
    avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAazlzuFvu1yeDhFPtF2nOYBjP_kch0qBQcIUrm1cr0LGnR_w9xbguBgMx8WHB2GNes7UzoU9pNfdWG6ZxY3pZTWkhOBnUuIOKspiU5VgscBUmeffhqZ66JbBxNS7T2x-9vcafTlidby0Zf2IQIl5Jws189SO7dv2oIn0GkYPstv_QQMaliBvBsqCtPaByIfty7bBdC-G7XP900Y8QAUjiVMoDFJvBwiLq2AiXwqIo' }
  }, { timestamps: true });

  LocationModel = mongoose.models.Location || mongoose.model('Location', locationSchema);
  IncidentModel = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);
  EvidenceModel = mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema);
  DispatchModel = mongoose.models.Dispatch || mongoose.model('Dispatch', dispatchSchema);
  UserModel = mongoose.models.User || mongoose.model('User', userSchema);
}

let lastUri = '';

export async function connectDB(uri) {
  lastUri = uri;
  if (!mongoose) {
    console.log('[Database] Running with in-memory database (Mongoose not installed).');
    return false;
  }

  if (!uri || uri.includes('<db_password>')) {
    console.log('[Database] Notice: MONGODB_URI contains placeholder <db_password>.');
    console.log('[Database] -> Please update backend/.env with your actual MongoDB password.');
    console.log('[Database] -> Running with in-memory persistence fallback.');
    return false;
  }

  // Normalize password encoding (e.g. if password has unencoded '@' like Aryan@2007)
  let safeUri = uri;
  try {
    const srvPrefix = uri.includes('mongodb+srv://') ? 'mongodb+srv://' : (uri.includes('mongodb://') ? 'mongodb://' : '');
    if (srvPrefix) {
      const rest = uri.slice(srvPrefix.length);
      const lastAt = rest.lastIndexOf('@');
      if (lastAt !== -1) {
        const userinfo = rest.slice(0, lastAt);
        const hostAndQuery = rest.slice(lastAt + 1);
        const colonIdx = userinfo.indexOf(':');
        if (colonIdx !== -1) {
          const user = userinfo.slice(0, colonIdx);
          const rawPass = userinfo.slice(colonIdx + 1);
          const cleanPass = decodeURIComponent(rawPass);
          const encodedPass = encodeURIComponent(cleanPass);
          safeUri = `${srvPrefix}${user}:${encodedPass}@${hostAndQuery}`;
        }
      }
    }
  } catch (e) {
    safeUri = uri;
  }

  try {
    console.log('[Database] Connecting to MongoDB Atlas cluster...');
    await mongoose.connect(safeUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('=======================================================');
    console.log('🍃 MONGODB ATLAS CONNECTED SUCCESSFULLY!');
    console.log('📁 Database: Cluster0 (kiieyhz.mongodb.net)');
    console.log('=======================================================');

    // Auto-seed initial data if collections are empty
    await seedDatabaseIfEmpty();

    return true;
  } catch (err) {
    console.error('[Database Connection Error]', err.message);
    console.log('[Database] Falling back to in-memory tactical store.');
    isConnected = false;
    return false;
  }
}

async function seedDatabaseIfEmpty() {
  try {
    const locCount = await LocationModel.countDocuments();
    if (locCount === 0) {
      console.log('[Database] Seeding initial containment locations into MongoDB...');
      await LocationModel.insertMany(initialLocations);
    }

    const incCount = await IncidentModel.countDocuments();
    if (incCount === 0) {
      console.log('[Database] Seeding initial incident logs into MongoDB...');
      await IncidentModel.insertMany(initialIncidents);
    }

    const eviCount = await EvidenceModel.countDocuments();
    if (eviCount === 0) {
      console.log('[Database] Seeding initial evidence archive into MongoDB...');
      await EvidenceModel.insertMany(initialEvidence);
    }
  } catch (err) {
    console.warn('[Database Seed Warning]', err.message);
  }
}

export function getDBStatus() {
  let provider = 'In-Memory Store';
  if (isConnected) {
    provider = 'MongoDB Atlas (Cluster0 Connected)';
  } else if (!mongoose) {
    provider = 'In-Memory Store (Mongoose not installed locally)';
  } else if (!lastUri || lastUri.includes('<db_password>')) {
    provider = 'In-Memory Store (Awaiting Password in .env)';
  } else {
    provider = 'In-Memory Store (Connecting / Offline fallback)';
  }
  return {
    connected: isConnected,
    provider,
    mongooseAvailable: !!mongoose,
  };
}

export { LocationModel, IncidentModel, EvidenceModel, DispatchModel, UserModel };

