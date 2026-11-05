# Beyond the Unknown (BTU) — Full Stack Web Application

A professional, classified paranormal research and environmental telemetry application built with a modern React frontend and a resilient Node.js backend.

---

## 📁 Project Architecture

```
aryan web/
├── backend/                       # Node.js Tactical API Server
│   ├── data/
│   │   └── seedData.js            # Initial containment locations, evidence, and incident logs
│   ├── routes/
│   │   ├── telemetry.js           # Live sensor telemetry & Server-Sent Events (SSE)
│   │   ├── locations.js           # Target containment dossiers & coordinates
│   │   ├── incidents.js           # Real-time field incident logging
│   │   ├── evidence.js            # Cryptographically hashed audio EVPs & spectrograms
│   │   └── dispatch.js            # Encrypted tactical communication channel
│   ├── server.js                  # Dual-mode server (Express + Native Zero-Dependency HTTP engine)
│   └── package.json               # Backend dependencies and scripts
│
├── frontend/                      # React Frontend Application
│   ├── src/
│   │   ├── components/            # Reusable UI HUD elements
│   │   │   ├── Header.jsx         # Status banner, terminal drawer button, live encryption pulse
│   │   │   ├── BottomNav.jsx      # Mobile HUD bottom bar (Home, Locs, Tools, Ops, Vault)
│   │   │   ├── DirectivesDrawer.jsx # Directives & Archive slide-out modal
│   │   │   ├── TelemetryBar.jsx   # Live Anomaly Index, Teams, Solar Flare Kp
│   │   │   ├── SensorStrip.jsx    # Quick EMF, Thermal, SW Frequency meters
│   │   │   ├── AudioWaveformPlayer.jsx # Interactive Class-A EVP audio waveform
│   │   │   ├── LocationCard.jsx   # Containment site cards with badges and dossier triggers
│   │   │   └── DisclaimerBanner.jsx # Regulatory dispatch legal notice
│   │   ├── context/
│   │   │   └── TelemetryContext.jsx # Real-time telemetry provider synced via SSE / polling
│   │   ├── pages/                 # Full page directory
│   │   │   ├── HomePage.jsx       # Mission telemetry ready dashboard
│   │   │   ├── LocationsPage.jsx  # Containment site search and filtering
│   │   │   ├── LocationDetailPage.jsx # Classified dossier, anomalies, and protocols
│   │   │   ├── ToolsPage.jsx      # TriField EMF, FLIR Thermal, Spirit Box, Infrasound
│   │   │   ├── OpsDashboardPage.jsx # Tactical dispatch, team deployment, incident logger
│   │   │   ├── EvidenceVaultPage.jsx # Tamper-evident archived EVPs and spectrograms
│   │   │   ├── AboutPage.jsx      # BTU division history & ISO-17025 standards
│   │   │   ├── SafetyPage.jsx     # Class IV containment safety rules & buddy system
│   │   │   └── ContactDispatchPage.jsx # Encrypted dispatch transmission form
│   │   ├── services/
│   │   │   └── api.js             # API client with automatic offline fallback
│   │   ├── data/
│   │   │   └── locationsData.js   # Structured containment dataset
│   │   ├── App.jsx                # Router & main shell layout
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Dark Glassmorphism, Space Grotesk & Space Mono styling
│   ├── standalone.html            # Zero-build browser-ready preview (double-click to open)
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Exact tactical color tokens & typography
│   └── package.json               # Frontend dependencies
│
├── code.html                      # Original Google Stitch prototype
├── DESIGN.md                      # Design system specification
├── screen.png                     # Design preview
└── package.json                   # Root workspace orchestration
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend API Server

Open a terminal in the project directory:

```bash
cd backend
node server.js
```

> **Note:** The backend server features a **Dual-Engine Architecture**. It immediately runs out of the box using Node.js's built-in engine with zero dependencies required, and automatically upgrades to Express when `npm install` is run!

Once started, the server listens on **`http://localhost:5000`**:
- **Health Check:** `http://localhost:5000/api/health`
- **Telemetry Stream (SSE):** `http://localhost:5000/api/telemetry/stream`
- **Containment Sites:** `http://localhost:5000/api/locations`
- **Evidence Vault:** `http://localhost:5000/api/evidence`
- **Field Incidents:** `http://localhost:5000/api/incidents`

---

### 2. Launch the React Frontend

You have two convenient ways to run the frontend:

#### Option A: Instant Zero-Build Browser Launch
Simply double-click or open `frontend/standalone.html` in Google Chrome or any browser.
It loads the full interactive React 18 multi-page application with real-time telemetry, routing, and live backend synchronization.

#### Option B: Standard Vite Development Server
Inside a terminal:

```bash
cd frontend
npm install
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 🛠️ Key Features

- **Live Telemetry Engine:** Dynamic simulated EMF fluctuations, thermal drops, and spirit box SW sweeps, connected via Server-Sent Events (SSE).
- **Interactive EVP Audio Waveform:** Real-time animated audio visualizer with phoneme cadence breakdown, confidence score, and speech frequency tracking.
- **Hardware Sensor Suite:** TriField EMF meter with level bars, FLIR false-color thermal scanner, Spirit Box frequency sweep rate tuner, and 18.9 Hz infrasound lock.
- **Incident Dispatch Console:** Form for logging field anomalies directly to Central Command with immediate real-time feed updates.
- **Evidence Vault:** Cryptographically validated anomaly archive with SHA-256 fingerprinting.
- **Full Tactical Design System:** Ultra-deep obsidian glassmorphism, spectral purple, telemetry cyan, and hazard red accents.

