import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { locationsData } from '../data/locationsData';
import { postWithFallback } from '../services/api';

export default function OpsDashboardPage() {
  const { telemetry, incidents, addIncident } = useTelemetry();
  const [location, setLocation] = useState(locationsData[0].title);
  const [anomalyType, setAnomalyType] = useState('EMF Surge & Cold Spot');
  const [level, setLevel] = useState('LVL-4');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [lockdownActive, setLockdownActive] = useState(false);

  const handleSubmitIncident = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMsg('');

    const newRecord = {
      location,
      type: anomalyType,
      level,
      status: 'Active Audit',
      notes,
    };

    // Post to backend or fallback
    await postWithFallback('/incidents', newRecord, { success: true });
    addIncident(newRecord);

    setIsSubmitting(false);
    setNotes('');
    setFeedbackMsg('Incident logged to Central Tactical Dispatch.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[22px]">emergency</span>
          <span className="font-label-tag text-label-tag uppercase text-tertiary tracking-widest font-mono">
            TACTICAL DISPATCH COMMAND
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Field Operations Console
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Live coordination of deployed field units, anomaly quarantine protocols, and incident telemetry logging.
        </p>
      </div>

      {/* Operations Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">DEPLOYED UNITS</span>
          <span className="font-headline-md text-primary font-mono font-bold mt-1">14 UNITS</span>
          <span className="font-label-telemetry text-secondary font-mono">4 En Route</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">ANOMALY INDEX</span>
          <span className="font-headline-md text-tertiary font-mono font-bold mt-1">{telemetry.anomalyIndex}</span>
          <span className="font-label-telemetry text-tertiary font-mono">High Variance</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">DISPATCH STATUS</span>
          <span className="font-headline-md text-secondary font-mono font-bold mt-1">CODE AMBER</span>
          <span className="font-label-telemetry text-outline font-mono">Standing Protocols</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono">LOCKDOWN MODE</span>
          <button
            onClick={() => setLockdownActive(!lockdownActive)}
            className={`mt-1 py-1 px-2 rounded font-label-code text-[11px] uppercase transition-all ${
              lockdownActive
                ? 'bg-error-container text-on-error-container animate-pulse shadow-[0_0_10px_#93000a]'
                : 'bg-surface-container-high text-outline hover:text-on-surface'
            }`}
          >
            {lockdownActive ? 'OVERRIDE ENGAGED' : 'ENGAGE LOCKDOWN'}
          </button>
        </div>
      </div>

      {/* Incident Logging Form */}
      <div className="rounded-xl bg-surface-container p-space-md border border-outline-variant/30 space-y-space-sm shadow-lg">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">add_task</span>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
              Log Field Anomaly Incident
            </h2>
          </div>
          <span className="font-label-tag text-label-tag text-secondary uppercase font-mono">
            FORM SEC-4
          </span>
        </div>

        {feedbackMsg && (
          <div className="p-3 rounded-lg bg-secondary/15 border border-secondary/40 text-secondary font-mono text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{feedbackMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitIncident} className="space-y-space-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Target Containment
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:outline-none focus:border-secondary"
              >
                {locationsData.map((l) => (
                  <option key={l.id} value={l.title}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Anomaly Type
              </label>
              <input
                type="text"
                value={anomalyType}
                onChange={(e) => setAnomalyType(e.target.value)}
                placeholder="e.g. EMF Surge, EVP, Cold Spot"
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:outline-none focus:border-secondary"
                required
              />
            </div>

            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Threat Classification
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:outline-none focus:border-secondary"
              >
                <option value="LVL-1">LVL-1 (Residual / Trace)</option>
                <option value="LVL-2">LVL-2 (Low Energy Poltergeist)</option>
                <option value="LVL-3">LVL-3 (Moderate Thermal Drop)</option>
                <option value="LVL-4">LVL-4 (Critical Class IV Anomaly)</option>
                <option value="LVL-5">LVL-5 (Immediate Quarantine Breach)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
              Field Telemetry Notes &amp; Observations
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observed frequencies, sensory observations, containment boundary checks..."
              className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-lg bg-primary text-on-primary font-headline-sm text-body-md uppercase font-semibold tracking-wider shadow-[0_0_14px_rgba(208,188,255,0.4)] active:scale-95 transition-all hover:brightness-110 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Log'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Incident Log Ticker */}
      <div className="rounded-xl bg-surface-container p-space-md border border-outline-variant/30 space-y-space-sm shadow-lg">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
            <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
              Real-time Incident Feed
            </h2>
          </div>
          <span className="font-label-telemetry text-label-telemetry text-secondary font-mono">
            {incidents.length} RECORDS ACTIVE
          </span>
        </div>

        <div className="space-y-2">
          {incidents.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-outline-variant/40 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-label-code text-primary font-mono">{item.id}</span>
                  <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                    {item.location}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.level === 'LVL-5' || item.level === 'LVL-4'
                        ? 'bg-tertiary-container/30 text-tertiary'
                        : 'bg-secondary/20 text-secondary'
                    }`}
                  >
                    {item.level}
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant">{item.type}</p>
                {item.notes && <p className="font-body-sm text-outline italic">"{item.notes}"</p>}
              </div>

              <div className="flex sm:flex-col items-end justify-between font-label-telemetry font-mono text-outline">
                <span>{item.time}</span>
                <span className="text-secondary">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

