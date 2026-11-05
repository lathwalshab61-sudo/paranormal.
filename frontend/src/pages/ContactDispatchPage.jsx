import React, { useState } from 'react';
import { postWithFallback } from '../services/api';

export default function ContactDispatchPage() {
  const [agentId, setAgentId] = useState('AGENT-BTU-774');
  const [frequency, setFrequency] = useState('142.800 MHz');
  const [urgency, setUrgency] = useState('NORMAL');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('IDLE'); // 'IDLE', 'TRANSMITTING', 'SENT', 'ERROR'
  const [transmissionLog, setTransmissionLog] = useState([]);

  const handleTransmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('TRANSMITTING');

    const payload = {
      agentId,
      frequency,
      urgency,
      message,
      timestamp: new Date().toISOString(),
    };

    const res = await postWithFallback('/dispatch', payload, {
      success: true,
      ackId: `ACK-${Date.now().toString().slice(-6)}`,
    });

    setStatus('SENT');
    setTransmissionLog((prev) => [
      {
        id: res.ackId || `ACK-${Date.now().toString().slice(-6)}`,
        time: new Date().toLocaleTimeString(),
        urgency,
        summary: message.slice(0, 40) + (message.length > 40 ? '...' : ''),
      },
      ...prev,
    ]);
    setMessage('');
    setTimeout(() => setStatus('IDLE'), 3500);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">alternate_email</span>
          <span className="font-label-tag text-label-tag uppercase text-primary tracking-widest font-mono">
            SECURE RELAY
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Encrypted Dispatch Uplink
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Military-grade encrypted radio and digital communication channel for field operatives and accredited institutional researchers.
        </p>
      </div>

      {/* Terminal Transmission Box */}
      <div className="rounded-xl bg-surface-container p-space-md border border-outline-variant/30 space-y-space-md shadow-xl">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">wifi_channel</span>
            <span className="font-headline-sm text-body-lg font-bold text-on-surface uppercase">
              UPLINK TERMINAL COM-4
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>256-BIT AES ACTIVE</span>
          </div>
        </div>

        {status === 'SENT' && (
          <div className="p-3 rounded-lg bg-secondary/15 border border-secondary/40 text-secondary font-mono text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>TRANSMISSION ACKNOWLEDGED BY CENTRAL DISPATCH COMMAND</span>
          </div>
        )}

        <form onSubmit={handleTransmit} className="space-y-space-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Field Agent Call-Sign
              </label>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Frequency Channel
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-secondary"
                required
              />
            </div>

            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Priority Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-tertiary"
              >
                <option value="ROUTINE">ROUTINE (Periodic Telemetry)</option>
                <option value="NORMAL">NORMAL (Operational Update)</option>
                <option value="PRIORITY">PRIORITY (Anomaly Threshold Spike)</option>
                <option value="EMERGENCY">EMERGENCY (Containment Breach SOS)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
              Transmission Message Body
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="State your coordinates, observed anomaly parameters, assistance requested, or research query..."
              className="w-full p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="font-label-telemetry text-outline font-mono text-[10px]">
              DATA COMPRESSION: GZIP • PACKET SIZE: OPTIMAL
            </span>
            <button
              type="submit"
              disabled={status === 'TRANSMITTING'}
              className="py-2.5 px-6 rounded-lg bg-primary text-on-primary font-headline-sm text-body-md uppercase font-semibold tracking-wider shadow-[0_0_14px_rgba(208,188,255,0.4)] active:scale-95 transition-all hover:brightness-110 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">cell_tower</span>
              <span>{status === 'TRANSMITTING' ? 'Encrypting & Relaying...' : 'Send Uplink'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Transmission History */}
      {transmissionLog.length > 0 && (
        <div className="rounded-xl bg-surface-container p-space-md border border-outline-variant/30 space-y-2">
          <span className="font-label-tag text-label-tag text-outline uppercase font-mono tracking-widest block">
            RECENT TRANSMISSION ACKNOWLEDGMENTS
          </span>
          <div className="space-y-1">
            {transmissionLog.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="text-secondary">{log.id}</span>
                  <span className="text-outline">[{log.time}]</span>
                  <span className="text-on-surface">{log.summary}</span>
                </div>
                <span className="text-primary font-bold">{log.urgency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

