import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">info</span>
          <span className="font-label-tag text-label-tag uppercase text-secondary tracking-widest font-mono">
            ORGANIZATIONAL DOSSIER
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          About BTU Division
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Beyond the Unknown (BTU) is an empirical scientific division chartered to investigate, categorize, and contain unexplained anomalous phenomena.
        </p>
      </div>

      {/* Mission Statement Banner */}
      <div className="rounded-xl bg-surface-container p-space-md border border-outline-variant/30 space-y-2 shadow-lg">
        <span className="font-label-tag text-label-tag text-primary uppercase font-mono tracking-widest">
          PRIMARY DIRECTIVE
        </span>
        <h2 className="font-headline-md text-on-surface font-semibold">
          Scientific Rigor Over Sensationalism
        </h2>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          Founded in 1989, the BTU Division operates outside civilian folklore. We treat paranormal encounters as undiscovered physics, quantum acoustic reflections, and localized electromagnetic disruptions. Every anomaly admitted to our archive has survived rigorous falsification against drafts, plumbing harmonics, seismic vibration, and radio contamination.
        </p>
      </div>

      {/* Division Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
          <span className="material-symbols-outlined text-primary text-[28px]">biotech</span>
          <h3 className="font-headline-sm text-on-surface font-bold">Empirical Telemetry</h3>
          <p className="font-body-sm text-on-surface-variant">
            TriField natural EM radiation counters, FLIR thermal radiometric cameras, and acoustic wave analyzers calibrated to NIST standards.
          </p>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
          <span className="material-symbols-outlined text-secondary text-[28px]">shield</span>
          <h3 className="font-headline-sm text-on-surface font-bold">Class IV Containment</h3>
          <p className="font-body-sm text-on-surface-variant">
            Strict safety protocols safeguarding human investigators and public perimeter boundaries from active paranormal thresholds.
          </p>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
          <span className="material-symbols-outlined text-tertiary text-[28px]">lock</span>
          <h3 className="font-headline-sm text-on-surface font-bold">Classified Cryptography</h3>
          <p className="font-body-sm text-on-surface-variant">
            End-to-end encrypted dispatch channels, tamper-evident SHA-256 evidence hashing, and centralized archive vaults.
          </p>
        </div>
      </div>

      {/* Regulatory Compliance */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2 font-mono text-xs text-outline">
        <div className="text-secondary font-bold font-label-tag">REGULATORY ACCREDITATION</div>
        <div>• ISO-17025 Certified Testing Laboratory Standards</div>
        <div>• IEEE Compliance in Extremely Low Frequency (ELF) Radiation Measurements</div>
        <div>• Station Reference: LAT 34.0522° LON -118.2437° • Dispatch Sec-4</div>
      </div>
    </div>
  );
}

