import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithFallback } from '../services/api';

const TelemetryContext = createContext(null);

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState({
    emf: 4.8,
    thermal: 58.2,
    frequency: 105.4,
    anomalyIndex: 'LVL 3-MOD',
    anomalySeverity: 'moderate', // 'low', 'moderate', 'high', 'critical'
    fieldTeams: 14,
    enRouteTeams: 4,
    solarKp: 'Kp 4.2',
    solarStatus: 'Geomagnetic Dip',
    connectedToServer: false,
    frequencyActive: true,
    dbStatus: 'In-Memory Store',
  });

  const [incidents, setIncidents] = useState([
    {
      id: 'inc-01',
      time: '03:14:22 EST',
      location: 'Blackwood Sanatorium',
      type: 'EMF Surge & Infrasound',
      level: 'LVL-4',
      status: 'Auditing',
    },
    {
      id: 'inc-02',
      time: '02:48:10 EST',
      location: 'Whispering Pines Asylum',
      type: 'Sub-Zero Cold Spot (-14°F)',
      level: 'LVL-3',
      status: 'Containment Active',
    },
    {
      id: 'inc-03',
      time: '01:22:05 EST',
      location: 'St. Jude Quarantine Ward',
      type: 'Acoustic EVP Class-A',
      level: 'LVL-5',
      status: 'Archived',
    },
  ]);

  // Try Server-Sent Events or Poll Backend
  useEffect(() => {
    // Check Health & DB status
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setTelemetry((prev) => ({
          ...prev,
          connectedToServer: true,
          dbStatus: data.database?.provider || 'Node Synced',
        }));
      })
      .catch(() => {});

    let sseSource = null;
    try {
      sseSource = new EventSource('http://localhost:5000/api/telemetry/stream');
      sseSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setTelemetry((prev) => ({
            ...prev,
            ...data,
            connectedToServer: true,
          }));
        } catch (e) {
          console.error(e);
        }
      };
      sseSource.onerror = () => {
        // SSE disconnected, fallback to interval oscillator
        sseSource.close();
      };
    } catch {
      // Ignore if SSE is unavailable
    }

    // Interval oscillator ensures constant telemetry animation even if server is offline
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const emfFluct = (4.4 + Math.random() * 0.9).toFixed(1);
        const thermFluct = (57.8 + Math.random() * 0.7).toFixed(1);
        const freqFluct = (105.1 + Math.random() * 0.6).toFixed(1);
        return {
          ...prev,
          emf: parseFloat(emfFluct),
          thermal: parseFloat(thermFluct),
          frequency: parseFloat(freqFluct),
        };
      });
    }, 2800);

    return () => {
      clearInterval(interval);
      if (sseSource) sseSource.close();
    };
  }, []);

  const addIncident = (newIncident) => {
    setIncidents((prev) => [
      {
        id: `inc-${Date.now().toString().slice(-4)}`,
        time: new Date().toLocaleTimeString(),
        ...newIncident,
      },
      ...prev,
    ]);
  };

  return (
    <TelemetryContext.Provider value={{ telemetry, setTelemetry, incidents, addIncident }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}

