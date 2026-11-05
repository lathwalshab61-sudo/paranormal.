import React from 'react';

export default function SafetyPage() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[22px]">shield_lock</span>
          <span className="font-label-tag text-label-tag uppercase text-tertiary tracking-widest font-mono">
            MANDATORY PROTOCOLS
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Class IV Containment Safety
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Binding operational rules for all field agents, scientific specialists, and secondary observers during anomalous deployments.
        </p>
      </div>

      {/* Critical Warning Alert Box */}
      <div className="p-space-md rounded-xl bg-error-container/20 border border-error/40 space-y-2 shadow-[0_0_20px_rgba(255,180,171,0.15)]">
        <div className="flex items-center gap-2 text-error">
          <span className="material-symbols-outlined text-[24px] animate-pulse">warning</span>
          <span className="font-headline-sm font-bold uppercase">Zero-Tolerance Trespass Policy</span>
        </div>
        <p className="font-body-sm text-on-surface-variant leading-relaxed">
          Entering condemned, privately owned, or quarantined locations without authorized institutional permits is a state felony. Beyond physical structural collapse risks (asbestos, black mold, rotting timbers), hazardous anomalous thresholds present severe physiological disorientation risks.
        </p>
      </div>

      {/* The 5 Safety Directives */}
      <div className="space-y-space-xs">
        <span className="font-label-tag text-label-tag text-secondary uppercase font-mono tracking-widest px-1">
          OPERATIONAL DIRECTIVES
        </span>

        {[
          {
            num: '01',
            title: 'Dual-Operator Buddy System',
            desc: 'No investigator enters any sub-basement or isolated ward unaccompanied. Radio telemetry must remain synchronized on 142.8 MHz.',
            badge: 'CRITICAL',
          },
          {
            num: '02',
            title: 'EMF Saturation Thresholds (10 mG Max)',
            desc: 'Prolonged exposure to electromagnetic fields exceeding 10.0 mG causes auditory hallucination and hyperventilation. Immediate retreat is mandatory at 10.0 mG.',
            badge: 'HEALTH',
          },
          {
            num: '03',
            title: 'Cryogenic Cold Spot Evacuation',
            desc: 'Thermal drops exceeding -10°F below ambient within 60 seconds indicate rapid energy displacement. Power off non-shielded lithium batteries.',
            badge: 'EQUIPMENT',
          },
          {
            num: '04',
            title: 'Tamper-Proof Audio Chain of Custody',
            desc: 'All SD media and digital voice recorders must be signed into the evidence vault with SHA-256 checksums immediately upon exiting the perimeter.',
            badge: 'FORENSIC',
          },
          {
            num: '05',
            title: 'Acoustic Distress Beacon Protocol',
            desc: 'In case of structural trap or sensory paralysis, trigger the emergency radio tone (press Emergency Uplink on your tactical mobile unit).',
            badge: 'SOS',
          },
        ].map((item) => (
          <div
            key={item.num}
            className="p-space-md rounded-xl bg-surface-container border border-outline-variant/30 flex items-start gap-space-sm"
          >
            <span className="font-mono text-xl text-primary font-bold">{item.num}</span>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-body-lg text-on-surface font-semibold">
                  {item.title}
                </h3>
                <span className="px-2 py-0.5 rounded font-label-tag text-[10px] font-mono bg-surface-container-high text-secondary border border-secondary/20">
                  {item.badge}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

