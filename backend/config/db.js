import { initialLocations, initialEvidence, initialIncidents } from '../data/seedData.js';

let mongoose = null;
let isConnected = false;
let LocationModel = null;
let IncidentModel = null;
let EvidenceModel = null;
let DispatchModel = null;

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

  LocationModel = mongoose.models.Location || mongoose.model('Location', locationSchema);
  IncidentModel = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);
  EvidenceModel = mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema);
  DispatchModel = mongoose.models.Dispatch || mongoose.model('Dispatch', dispatchSchema);
}

export async function connectDB(uri) {
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

  try {
    console.log('[Database] Connecting to MongoDB Atlas cluster...');
    await mongoose.connect(uri, {
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
  return {
    connected: isConnected,
    provider: isConnected ? 'MongoDB Atlas (Cluster0)' : 'In-Memory Store (Awaiting Password in .env)',
    mongooseAvailable: !!mongoose,
  };
}

export { LocationModel, IncidentModel, EvidenceModel, DispatchModel };

