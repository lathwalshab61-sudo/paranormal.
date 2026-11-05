import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';

export default function TelemetryBar() {
  const { telemetry } = useTelemetry();

  return (
    <div className="rounded-xl bg-surface-container-low p-space-md shadow-md border border-outline-variant/30">
      <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container/40 -mx-space-md px-space-md -mt-space-md pt-2 rounded-t-xl border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[16px]">sensors</span>
          <span className="font-label-tag text-label-tag uppercase text-secondary tracking-widest">
            LIVE ATMOSPHERIC TELEMETRY
          </span>
        </div>
        <span className="font-label-telemetry text-label-telemetry text-tertiary uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          FEED SYNCED
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-surface-container flex flex-col items-center justify-center border border-outline-variant/15 hover:border-tertiary/40 transition-colors">
          <span className="font-label-tag text-label-tag text-outline uppercase">ANOMALY INDEX</span>
          <span className="font-label-code text-label-code text-tertiary mt-1 font-bold">
            {telemetry.anomalyIndex}
          </span>
          <span className="font-label-telemetry text-label-telemetry text-on-surface-variant">
            Active Fluctuations
          </span>
        </div>

        <div className="p-2 rounded-lg bg-surface-container flex flex-col items-center justify-center border border-outline-variant/15 hover:border-primary/40 transition-colors">
          <span className="font-label-tag text-label-tag text-outline uppercase">FIELD TEAMS</span>
          <span className="font-label-code text-label-code text-primary mt-1 font-bold">
            {telemetry.fieldTeams} UNITS
          </span>
          <span className="font-label-telemetry text-label-telemetry text-on-surface-variant">
            {telemetry.enRouteTeams} En Route
          </span>
        </div>

        <div className="p-2 rounded-lg bg-surface-container flex flex-col items-center justify-center border border-outline-variant/15 hover:border-secondary/40 transition-colors">
          <span className="font-label-tag text-label-tag text-outline uppercase">SOLAR FLARE</span>
          <span className="font-label-code text-label-code text-secondary mt-1 font-bold">
            {telemetry.solarKp}
          </span>
          <span className="font-label-telemetry text-label-telemetry text-on-surface-variant">
            {telemetry.solarStatus}
          </span>
        </div>
      </div>
    </div>
  );
}

