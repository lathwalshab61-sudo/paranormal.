import React from 'react';

export default function DisclaimerBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-md border border-outline-variant/30">
      <div className="flex items-start gap-space-sm">
        <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-error-container text-on-error-container shadow-[0_0_8px_rgba(147,0,10,0.6)]">
          <span className="material-symbols-outlined text-[16px] animate-pulse">warning</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs mb-1">
            <span className="font-label-tag text-label-tag uppercase text-tertiary-fixed tracking-wider">
              REGULATORY DISPATCH
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            <span className="font-bold text-on-surface">LEGAL &amp; SAFETY NOTICE:</span> Unauthorized entry onto condemned, quarantined, or private structures is strictly illegal. Empirical telemetry logs must comply with regional boundary laws.
          </p>
        </div>
      </div>
    </div>
  );
}

