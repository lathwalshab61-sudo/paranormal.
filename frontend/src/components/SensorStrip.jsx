import React from 'react';
import { Link } from 'react-router-dom';
import { useTelemetry } from '../context/TelemetryContext';

export default function SensorStrip() {
  const { telemetry } = useTelemetry();

  return (
    <div className="space-y-space-xs">
      <div className="flex items-center justify-between px-1">
        <span className="font-label-tag text-label-tag text-on-surface-variant uppercase tracking-widest">
          RAPID FIELD SENSOR LINK
        </span>
        <Link to="/tools" className="font-label-telemetry text-label-telemetry text-secondary hover:underline flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          CALIBRATED • SUITE
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* EMF Sensor Card */}
        <Link
          to="/tools"
          className="rounded-xl bg-surface-container p-2.5 flex flex-col justify-between shadow-sm border border-outline-variant/20 hover:border-primary/50 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-primary text-[18px]">electric_bolt</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
          </div>
          <div>
            <span className="font-label-tag text-label-tag text-on-surface-variant block uppercase">
              EMF FIELD
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight font-mono">
              {telemetry.emf}
            </span>
            <span className="font-label-telemetry text-label-telemetry text-primary-fixed-dim block">
              mG • AMBIENT
            </span>
          </div>
        </Link>

        {/* Thermal Sensor Card */}
        <Link
          to="/tools"
          className="rounded-xl bg-surface-container p-2.5 flex flex-col justify-between shadow-sm border border-outline-variant/20 hover:border-secondary/50 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">thermostat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </div>
          <div>
            <span className="font-label-tag text-label-tag text-on-surface-variant block uppercase">
              THERMAL
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight font-mono">
              {telemetry.thermal}°
            </span>
            <span className="font-label-telemetry text-label-telemetry text-secondary block">
              FAHRENHEIT
            </span>
          </div>
        </Link>

        {/* Spirit Box Sweep Card */}
        <Link
          to="/tools"
          className="rounded-xl bg-surface-container p-2.5 flex flex-col justify-between shadow-sm border border-outline-variant/20 hover:border-tertiary/50 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">tune</span>
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span>
          </div>
          <div>
            <span className="font-label-tag text-label-tag text-on-surface-variant block uppercase">
              SWEEP SW
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed-dim leading-tight font-mono">
              {telemetry.frequency}
            </span>
            <span className="font-label-telemetry text-label-telemetry text-tertiary block">
              MHz • REVERSE
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

