import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../context/TelemetryContext';

export default function ToolsPage() {
  const { telemetry } = useTelemetry();
  const [activeTab, setActiveTab] = useState('emf'); // 'emf', 'thermal', 'spiritbox', 'infrasound'
  const [isEmfBuzzerOn, setIsEmfBuzzerOn] = useState(false);
  const [peakEmf, setPeakEmf] = useState(telemetry.emf);
  const [sweepSpeed, setSweepSpeed] = useState(200);
  const [sweepDirection, setSweepDirection] = useState('REVERSE');
  const [isSweeping, setIsSweeping] = useState(true);

  useEffect(() => {
    if (telemetry.emf > peakEmf) {
      setPeakEmf(telemetry.emf);
    }
  }, [telemetry.emf, peakEmf]);

  const handleResetPeak = () => {
    setPeakEmf(telemetry.emf);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">sensors</span>
          <span className="font-label-tag text-label-tag uppercase text-secondary tracking-widest font-mono">
            FIELD SENSOR TELEMETRY SUITE
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Tactical Instruments
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Empirical hardware diagnostics, electromagnetic sweep meters, and acoustic resonance detectors calibrated to ISO-17025 standards.
        </p>
      </div>

      {/* Sensor Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'emf', label: 'TriField EMF', icon: 'electric_bolt', color: 'text-primary' },
          { id: 'thermal', label: 'FLIR Thermal', icon: 'thermostat', color: 'text-secondary' },
          { id: 'spiritbox', label: 'Spirit Box SW', icon: 'tune', color: 'text-tertiary' },
          { id: 'infrasound', label: 'Infrasound Geo', icon: 'graphic_eq', color: 'text-secondary-fixed' },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className={`p-3 rounded-xl flex items-center gap-2 transition-all border ${
              activeTab === tool.id
                ? 'bg-surface-container-high border-secondary shadow-[0_0_15px_rgba(76,215,246,0.25)]'
                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${tool.color}`}>
              {tool.icon}
            </span>
            <span className="font-label-tag text-label-tag uppercase tracking-wider text-on-surface text-left">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      {/* 1. EMF METER VIEW */}
      {activeTab === 'emf' && (
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline-sm text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">electric_bolt</span>
                TriField Natural EMF Meter
              </h2>
              <span className="font-label-telemetry text-outline font-mono">MODEL TF-8800 PRO CLASS</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEmfBuzzerOn(!isEmfBuzzerOn)}
                className={`px-3 py-1.5 rounded-lg font-label-tag text-label-tag uppercase transition-all flex items-center gap-1 border ${
                  isEmfBuzzerOn
                    ? 'bg-primary/20 text-primary border-primary'
                    : 'bg-surface-container-low text-outline border-outline-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isEmfBuzzerOn ? 'volume_up' : 'volume_off'}
                </span>
                <span>{isEmfBuzzerOn ? 'BUZZER ON' : 'MUTE'}</span>
              </button>
              <button
                onClick={handleResetPeak}
                className="px-3 py-1.5 rounded-lg bg-surface-container-low text-secondary border border-secondary/30 hover:bg-secondary/10 font-label-tag text-label-tag uppercase transition-all"
              >
                RESET PEAK
              </button>
            </div>
          </div>

          {/* Large Live Digital Gauge */}
          <div className="flex flex-col items-center justify-center py-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20 relative overflow-hidden">
            <span className="font-label-telemetry text-outline uppercase font-mono tracking-widest">
              MAGNETIC FLUX DENSITY
            </span>
            <div className="text-6xl sm:text-7xl font-mono font-bold text-primary tracking-tight my-2 filter drop-shadow-[0_0_16px_rgba(208,188,255,0.4)]">
              {telemetry.emf} <span className="text-2xl text-on-surface-variant font-normal">mG</span>
            </div>

            {/* LED Level Bar */}
            <div className="w-full max-w-md px-6 mt-4">
              <div className="flex justify-between font-label-telemetry text-outline text-[10px] mb-1 font-mono">
                <span>0.0 SAFE</span>
                <span>2.5 MOD</span>
                <span>5.0 HIGH</span>
                <span>10.0+ CRITICAL</span>
              </div>
              <div className="h-4 bg-surface-container-high rounded-full overflow-hidden flex gap-1 p-0.5 border border-outline-variant/30">
                {Array.from({ length: 20 }).map((_, i) => {
                  const threshold = (i + 1) * 0.5;
                  const isActive = telemetry.emf >= threshold;
                  let color = 'bg-secondary';
                  if (i > 10) color = 'bg-primary';
                  if (i > 15) color = 'bg-tertiary-container';

                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm transition-all duration-300 ${
                        isActive ? `${color} shadow-[0_0_6px_currentColor]` : 'bg-surface-container-low opacity-40'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex gap-6 font-label-telemetry font-mono text-outline">
              <span>PEAK: <strong className="text-primary">{peakEmf} mG</strong></span>
              <span>FREQUENCY: <strong className="text-secondary">50/60 Hz Filter Active</strong></span>
              <span>SIGNAL: <strong className="text-tertiary">SURGING</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-tag text-outline block">AC ELECTRIC</span>
              <span className="font-headline-sm text-on-surface font-mono">18 V/m</span>
              <span className="font-label-telemetry text-secondary block">Normal Baseline</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-tag text-outline block">RF MICROWAVE</span>
              <span className="font-headline-sm text-primary font-mono">0.042 mW/m²</span>
              <span className="font-label-telemetry text-primary-fixed-dim block">Low Microwave Pulse</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-tag text-outline block">GEO DRIFT</span>
              <span className="font-headline-sm text-tertiary font-mono">±0.32°</span>
              <span className="font-label-telemetry text-tertiary block">Compass Deflection</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. THERMAL FLIR VIEW */}
      {activeTab === 'thermal' && (
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline-sm text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">thermostat</span>
                FLIR High-Sensitivity Thermal Imager
              </h2>
              <span className="font-label-telemetry text-outline font-mono">LONG-WAVE INFRARED (8-14 µm)</span>
            </div>
            <span className="px-2 py-1 rounded bg-secondary/20 text-secondary font-label-tag font-mono border border-secondary/30">
              COLD-SPOT TRACKING ON
            </span>
          </div>

          {/* Thermal Viewport Simulator */}
          <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-tr from-[#000a26] via-[#3c0091] via-[#d0bcff] to-[#03b5d3] p-4 flex flex-col justify-between border border-secondary/40 shadow-[0_0_20px_rgba(76,215,246,0.2)]">
            <div className="flex justify-between font-mono text-[11px] text-white/90">
              <span>FOV: 45° x 34°</span>
              <span>EMISSIVITY: 0.95</span>
              <span>CALIBRATED: NIST</span>
            </div>

            {/* Target Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-24 h-24 border border-secondary/60 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="absolute -top-6 font-mono text-[12px] bg-black/70 px-2 py-0.5 rounded text-secondary border border-secondary/40">
                  SPOT: {(telemetry.thermal - 12.4).toFixed(1)}°F
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded border border-outline-variant/30 font-mono text-xs">
                <div>AMBIENT: <span className="text-secondary font-bold">{telemetry.thermal}°F</span></div>
                <div>DELTA (MIN): <span className="text-tertiary font-bold">-12.4°F DROP</span></div>
              </div>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md px-2 py-1 rounded border border-outline-variant/30 font-mono text-xs text-secondary">
                ANOMALOUS THERMAL VACUUM DETECTED
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SPIRIT BOX SW SWEEP VIEW */}
      {activeTab === 'spiritbox' && (
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline-sm text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">tune</span>
                Digital Radio Sweep &amp; ITC Scanner
              </h2>
              <span className="font-label-telemetry text-outline font-mono">BAND: 87.5 - 108.0 MHz FM / 530 - 1710 kHz AM</span>
            </div>
            <button
              onClick={() => setIsSweeping(!isSweeping)}
              className={`px-3 py-1.5 rounded-lg font-label-tag text-label-tag uppercase font-mono transition-all border ${
                isSweeping
                  ? 'bg-tertiary-container/30 text-tertiary border-tertiary-container'
                  : 'bg-surface-container-low text-outline border-outline-variant/30'
              }`}
            >
              {isSweeping ? 'SWEEP ACTIVE' : 'SWEEP PAUSED'}
            </button>
          </div>

          <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex flex-col items-center justify-center">
            <span className="font-label-tag text-outline uppercase font-mono tracking-widest">
              TUNED FREQUENCY (SWEEPING {sweepDirection})
            </span>
            <div className="text-6xl sm:text-7xl font-mono font-bold text-tertiary-fixed-dim my-3 filter drop-shadow-[0_0_16px_rgba(255,84,81,0.4)]">
              {telemetry.frequency} <span className="text-2xl text-on-surface-variant font-normal">MHz</span>
            </div>

            {/* Sweep controls */}
            <div className="w-full max-w-md space-y-3 mt-2">
              <div className="flex items-center justify-between font-label-telemetry text-outline font-mono">
                <span>SWEEP RATE: {sweepSpeed} ms/step</span>
                <span>STEP DIRECTION: {sweepDirection}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={sweepSpeed}
                onChange={(e) => setSweepSpeed(Number(e.target.value))}
                className="w-full accent-tertiary cursor-pointer"
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSweepDirection(sweepDirection === 'REVERSE' ? 'FORWARD' : 'REVERSE')}
                  className="flex-1 py-2 rounded-lg bg-surface-container-high text-secondary border border-secondary/30 font-label-tag uppercase font-mono"
                >
                  TOGGLE DIRECTION ({sweepDirection})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. INFRASOUND GEO VIEW */}
      {activeTab === 'infrasound' && (
        <div className="rounded-xl bg-surface-container p-space-md space-y-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-headline-sm text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">graphic_eq</span>
                Infrasonic Resonance Spectrograph
              </h2>
              <span className="font-label-telemetry text-outline font-mono">RANGE: 0.1 Hz TO 20.0 Hz (THE FEAR FREQUENCY BAND)</span>
            </div>
            <span className="px-2 py-1 rounded bg-tertiary-container/20 text-tertiary font-label-tag font-mono border border-tertiary/30 animate-pulse">
              18.9 Hz LOCK ACTIVE
            </span>
          </div>

          <div className="p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/20 space-y-3">
            <p className="font-body-sm text-on-surface-variant">
              Infrasound frequencies near 18.9 Hz correspond directly with human ocular resonance and hyperventilation fear responses. Natural architectural harmonics have been filtered.
            </p>

            <div className="h-32 bg-surface-container-high/40 rounded-lg p-3 flex items-end justify-between gap-1 border border-outline-variant/30">
              {[2, 4, 3, 6, 8, 5, 7, 18, 9, 82, 34, 12, 5, 8, 4, 3, 2].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full rounded-t transition-all ${
                      i === 9 ? 'bg-tertiary shadow-[0_0_12px_#ff5451] animate-pulse' : 'bg-secondary/60'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="font-mono text-[9px] text-outline">
                    {i === 9 ? '18.9' : `${i + 10}Hz`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

