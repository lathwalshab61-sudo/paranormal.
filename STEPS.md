# Operational Steps: Running Frontend & Backend Together

This guide provides three flexible ways to run the **Beyond the Unknown (BTU)** Full-Stack system:
- **Method 1:** The 1-Command Universal Runner *(Fastest, Zero setup)*
- **Method 2:** Separate Terminals *(For standard development)*
- **Method 3:** Vite + Node.js Dual Server *(Full Hot-Module Reloading)*

---

## ⚡ Method 1: The 1-Command Universal Runner (Recommended)

The backend server features a built-in static host that serves the full React application at `http://localhost:5000` while simultaneously powering all REST endpoints and the real-time telemetry stream.

### Steps:
1. Open your terminal in the project root: `c:\Users\Welcome\Desktop\aryan web`
2. Run the server:
   ```powershell
   node backend/server.js
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

*(You will immediately see the complete Beyond the Unknown React app running and actively streaming telemetry from the backend.)*

---

## 🛠️ Method 2: Running in Two Terminals

If you want to view live server logs in one terminal while keeping another terminal open:

### Terminal 1 (Backend API Server):
```powershell
cd "c:\Users\Welcome\Desktop\aryan web\backend"
node server.js
```
> Server will output:
> ```
> 🚀 BTU TACTICAL FULL-STACK APP
> 🖥️ Frontend UI: http://localhost:5000
> 📡 Health Check: http://localhost:5000/api/health
> 📊 Telemetry Stream: http://localhost:5000/api/telemetry/stream
> ```

### Terminal 2 (Standalone Frontend):
Double-click or open in Google Chrome:
```
c:\Users\Welcome\Desktop\aryan web\frontend\standalone.html
```
*(The standalone React app connects automatically to `http://localhost:5000/api`.)*

---

## 💻 Method 3: Full Vite React Developer Environment

For developers editing individual React JSX components with hot-module reloading:

### Step 1: Install & Start Backend
In terminal 1:
```powershell
cd "c:\Users\Welcome\Desktop\aryan web\backend"
npm install
node server.js
```

### Step 2: Install & Start Vite Frontend
In terminal 2:
```powershell
cd "c:\Users\Welcome\Desktop\aryan web\frontend"
npm install
npm run dev
```
> Vite will start on: **`http://localhost:3000`**  
> The Vite app will query and sync with the backend on **`http://localhost:5000`**.

---

## 🌐 Active API Endpoints Reference

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Serves the full React frontend application |
| `/api/health` | `GET` | Health check & BTU Protocol status (ISO-17025) |
| `/api/telemetry` | `GET` | Real-time EMF, Thermal, Frequency snapshot |
| `/api/telemetry/stream` | `GET` | Server-Sent Events (SSE) live sensor stream |
| `/api/locations` | `GET` | Catalog of anomalous containment sites |
| `/api/locations/:id` | `GET` | Single location blueprint & incident dossier |
| `/api/incidents` | `GET / POST` | Real-time field incident log feed |
| `/api/evidence` | `GET / POST` | Cryptographically signed audio EVPs |
| `/api/dispatch` | `POST` | Encrypted 256-bit dispatch transmission uplink |
| `/api/protocols` | `GET` | Class IV containment directives |

---

## 🖱️ One-Click Windows Shortcut

You can also simply double-click the included `start.bat` file in the project folder to start the server and automatically launch the app in your default browser.

