import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisclaimerBanner from '../components/DisclaimerBanner';
import TelemetryBar from '../components/TelemetryBar';
import SensorStrip from '../components/SensorStrip';
import LocationCard from '../components/LocationCard';
import AudioWaveformPlayer from '../components/AudioWaveformPlayer';
import { locationsData } from '../data/locationsData';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* 1. CRITICAL SAFETY DISCLAIMER BANNER */}
      <DisclaimerBanner />

      {/* 2. HERO SECTION */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-xl border border-outline-variant/30">
        <div
          className="bg-cover bg-center w-full min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-space-md relative"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1WEYWJOccoXouzDsnLIBwf-VS7npZoVvkavb7YtDvuGdlwjjucy4H1Yk4UJ_FBu5VshVACUr-m5lo1tYUrkkDW-Wo3BrYTCPpEarKrkcOq9tuKHDmw-0nC0kkDdk5c9d3ZpHsbzVBIEDbG2cYvv82dO3xTxqVu2_yxcbfmBBqnwLGEXZl_Q0UQsPT_jwpfX-ARh16h5tV8wLOZ_m5nJ6h-By7m2AWTK1KJRRfKHY')",
          }}
        >
          {/* Gradient Scrim for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>

          {/* Live Protocol Badge */}
          <div className="relative z-10 flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-secondary/30">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#4cd7f6]"></span>
              <span className="font-label-tag text-label-tag text-secondary uppercase tracking-widest font-mono">
                MISSION TELEMETRY READY
              </span>
            </div>
            <span className="font-label-telemetry text-label-telemetry text-outline font-mono">
              STN-774
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="relative z-10 space-y-1 mb-space-md">
            <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg uppercase text-on-surface font-bold tracking-tight">
              Explore the Unknown. <br />
              <span className="text-primary-fixed-dim">Investigate the Unexplained.</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 max-w-xl">
              A scientific &amp; critical approach to anomalous phenomena, environmental radiation logging, and empirical field research.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-space-xs pt-1">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-space-xs py-3 px-space-md rounded-lg bg-gradient-to-r from-tertiary-container to-inverse-primary text-on-surface font-headline-sm text-body-md tracking-wider uppercase font-semibold shadow-[0_0_20px_rgba(255,84,81,0.35)] active:scale-95 transition-all hover:brightness-110"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">radiology</span>
              <span>Start Investigation</span>
            </button>

            <button
              onClick={() => navigate('/locations')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-space-xs py-3 px-space-md rounded-lg bg-surface-container-high/80 backdrop-blur-md text-secondary font-headline-sm text-body-md tracking-wider uppercase font-semibold active:scale-95 transition-all hover:bg-surface-container-highest border border-secondary/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              <span>Explore Locations</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE FIELD TELEMETRY BAR */}
      <TelemetryBar />

      {/* 4. QUICK SENSOR ACCESS STRIP */}
      <SensorStrip />

      {/* 5. FEATURED INVESTIGATION SITES */}
      <div className="space-y-space-xs pt-space-xs">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
              Target Containments
            </h2>
            <p className="font-label-telemetry text-label-telemetry text-outline font-mono">
              PRIORITY FIELD ANOMALIES
            </p>
          </div>
          <Link
            to="/locations"
            className="font-label-tag text-label-tag text-secondary uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 font-mono"
          >
            <span>CATALOG ({locationsData.length})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {locationsData.slice(0, 2).map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>

      {/* 6. LATEST FIELD EVIDENCE ARCHIVE */}
      <AudioWaveformPlayer />

      {/* 7. AGENCY METHODOLOGY STATEMENT */}
      <div className="rounded-xl bg-surface-container-low p-space-md shadow-md space-y-space-xs border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          <span className="font-label-tag text-label-tag uppercase text-primary tracking-widest">
            BTU EMPIRICAL PROTOCOL
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Objective Investigation Methodology
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          We investigate anomalies critically. Anecdotal claims are thoroughly tested against acoustic reflection, infrasound, radio frequency harmonics, and building settlement interference before being accepted into the archive.
        </p>
        <div className="pt-2 flex items-center justify-between font-label-telemetry text-label-telemetry text-outline font-mono border-t border-outline-variant/20">
          <span>PEER AUDITED: ISO-17025 CLASS</span>
          <span className="text-secondary">DISPATCH SEC-4 ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

