import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { locationsData } from '../data/locationsData';
import { useTelemetry } from '../context/TelemetryContext';

export default function LocationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { telemetry } = useTelemetry();

  const location = locationsData.find((l) => l.id === id) || locationsData[0];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-code text-label-code uppercase tracking-wider py-1 px-2 rounded-lg hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Directory</span>
        </button>

        <span className="px-2 py-0.5 rounded bg-surface-container-high font-label-tag text-label-tag text-secondary uppercase border border-secondary/30">
          CLEARANCE LEVEL 4 REQUIRED
        </span>
      </div>

      {/* Main Dossier Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-xl border border-outline-variant/30">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={location.image}
            alt={location.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent"></div>

          {/* Tactical crosshair overlays */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-secondary tracking-widest bg-surface-container-lowest/80 px-2 py-1 rounded border border-secondary/30">
            [ + LAT/LON RETICLE LOCKED + ]
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-tertiary-container font-label-tag text-label-tag text-on-tertiary-container uppercase font-bold">
                {location.threatLevel}
              </span>
              <span className="font-label-telemetry text-label-telemetry text-secondary font-mono">
                {location.distance}
              </span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg uppercase text-on-surface font-bold tracking-tight">
              {location.title}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant font-medium">
              {location.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics Bar for this site */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase">COORDINATES</span>
          <span className="font-label-code text-[12px] text-secondary font-mono mt-1 break-all">
            {location.coordinates}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase">ESTABLISHED</span>
          <span className="font-label-code text-label-code text-on-surface font-mono mt-1">
            {location.established}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase">LOCAL EMF FLUX</span>
          <span className="font-headline-sm text-headline-sm text-primary font-mono mt-1">
            {telemetry.emf} mG
          </span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase">LOCAL TEMP</span>
          <span className="font-headline-sm text-headline-sm text-tertiary font-mono mt-1">
            {telemetry.thermal}°F
          </span>
        </div>
      </div>

      {/* Description & Investigation Notes */}
      <div className="p-space-md rounded-xl bg-surface-container space-y-3 border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">description</span>
          <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
            Site Dossier Overview
          </h2>
        </div>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          {location.description}
        </p>
      </div>

      {/* Verified Anomaly Signatures */}
      <div className="p-space-md rounded-xl bg-surface-container space-y-3 border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">warning</span>
          <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
            Documented Anomaly Signatures
          </h2>
        </div>
        <ul className="space-y-2">
          {location.anomalies.map((anomaly, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">
                adjust
              </span>
              <span className="font-body-sm text-on-surface">{anomaly}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Containment Protocol Instructions */}
      <div className="p-space-md rounded-xl bg-surface-container-low border border-primary/30 space-y-2 shadow-[0_0_15px_rgba(208,188,255,0.15)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
          <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
            Mandatory Containment Protocol
          </h3>
        </div>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          {location.containmentProtocol}
        </p>
      </div>

      {/* Action Strip */}
      <div className="flex flex-col sm:flex-row gap-space-xs pt-2">
        <Link
          to="/dashboard"
          className="flex-1 py-3 px-space-md rounded-lg bg-primary text-on-primary font-headline-sm text-body-md text-center uppercase tracking-wider font-semibold shadow-[0_0_16px_rgba(208,188,255,0.4)] hover:brightness-110 active:scale-95 transition-all"
        >
          Deploy Field Unit Here
        </Link>
        <Link
          to="/tools"
          className="flex-1 py-3 px-space-md rounded-lg bg-surface-container-high text-secondary border border-secondary/40 font-headline-sm text-body-md text-center uppercase tracking-wider font-semibold hover:bg-surface-container-highest active:scale-95 transition-all"
        >
          Open Sensor Telemetry
        </Link>
      </div>
    </div>
  );
}

