import React, { useState } from 'react';
import AudioWaveformPlayer from '../components/AudioWaveformPlayer';

const vaultArchives = [
  {
    archiveId: '#489',
    title: 'Class-A EVP: St. Jude Quarantine Ward',
    subtitle: 'ACOUSTIC ISOLATION CAPTURE • 03:14:22 EST',
    analysisText: 'Phoneme cadence reveals distinct multi-syllabic phrase "Still here with you". Natural draft and mechanical harmonics officially ruled out.',
    confidence: '94.2%',
    frequency: '320 Hz',
    noiseFloor: '-42dB',
    duration: '00:18',
    category: 'Class-A Audio',
  },
  {
    archiveId: '#490',
    title: 'Sub-Basement Hydrotherapy Echo: Blackwood',
    subtitle: 'HYDROTHERAPY CRYPT • 01:45:00 EST',
    analysisText: 'Deep guttural resonance synchronized with 18.9 Hz infrasound peak. Audio envelope matches human vocal cord frequency envelope at 95 Hz.',
    confidence: '91.8%',
    frequency: '95 Hz',
    noiseFloor: '-38dB',
    duration: '00:24',
    category: 'Class-A Audio',
  },
  {
    archiveId: '#491',
    title: 'Tower 3 Whisper Artifact: Whispering Pines',
    subtitle: 'ISOLATED TOWER • 04:12:18 EST',
    analysisText: 'Binaural microphone captured high-frequency whispering during -14°F cold spot. Speech formant analysis detects child phonetic structure.',
    confidence: '88.5%',
    frequency: '1.2 kHz',
    noiseFloor: '-45dB',
    duration: '00:14',
    category: 'Class-B Audio',
  },
];

export default function EvidenceVaultPage() {
  const [filter, setFilter] = useState('All Records');

  const filtered = vaultArchives.filter((a) => {
    if (filter === 'All Records') return true;
    return a.category === filter;
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Page Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
          <span className="font-label-tag text-label-tag uppercase text-primary tracking-widest font-mono">
            CLASSIFIED FORENSIC VAULT
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Evidence Archive &amp; Logs
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Cryptographically signed, tamper-evident repository of recorded acoustic anomalies, thermal captures, and sensor logs.
        </p>
      </div>

      {/* Vault Statistics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">ARCHIVED FILES</span>
          <span className="font-headline-md text-primary font-mono font-bold mt-1">492 ITEMS</span>
          <span className="font-label-telemetry text-secondary font-mono">SHA-256 Verified</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">CLASS-A EVPS</span>
          <span className="font-headline-md text-tertiary font-mono font-bold mt-1">84 FILES</span>
          <span className="font-label-telemetry text-tertiary font-mono">&gt;90% Phoneme Score</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">FLIR THERMAL</span>
          <span className="font-headline-md text-secondary font-mono font-bold mt-1">118 FRAMES</span>
          <span className="font-label-telemetry text-outline font-mono">Negative Delta Locked</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">AUDIT PROTOCOL</span>
          <span className="font-headline-md text-on-surface font-mono font-bold mt-1">ISO-17025</span>
          <span className="font-label-telemetry text-secondary font-mono">Peer-Verified</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-outline-variant/20 pb-2">
        {['All Records', 'Class-A Audio', 'Class-B Audio'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-label-tag text-label-tag uppercase font-mono transition-all ${
              filter === cat
                ? 'bg-primary/20 text-primary border border-primary/40'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Audio Players List */}
      <div className="space-y-space-md">
        {filtered.map((archive) => (
          <AudioWaveformPlayer
            key={archive.archiveId}
            archiveId={archive.archiveId}
            title={archive.title}
            subtitle={archive.subtitle}
            analysisText={archive.analysisText}
            confidence={archive.confidence}
            frequency={archive.frequency}
            noiseFloor={archive.noiseFloor}
            duration={archive.duration}
          />
        ))}
      </div>
    </div>
  );
}

