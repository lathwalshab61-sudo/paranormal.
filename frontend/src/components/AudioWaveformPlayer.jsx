import React, { useState, useEffect } from 'react';

export default function AudioWaveformPlayer({
  title = "Class-A EVP: St. Jude Quarantine Ward",
  subtitle = "ACOUSTIC ISOLATION CAPTURE • 03:14:22 EST",
  analysisText = "Phoneme cadence reveals distinct multi-syllabic phrase 'Still here with you'. Natural draft and mechanical harmonics officially ruled out.",
  confidence = "94.2%",
  frequency = "320 Hz",
  noiseFloor = "-42dB",
  duration = "00:18",
  archiveId = "#489"
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((s) => (s >= 18 ? 0 : s + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className="rounded-xl bg-surface-container p-space-md shadow-lg space-y-space-sm border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">graphic_eq</span>
          <span className="font-label-tag text-label-tag uppercase text-primary tracking-widest">
            EVIDENCE VAULT ARCHIVE {archiveId}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-container-high font-label-tag text-label-tag text-secondary uppercase border border-secondary/20">
          REVIEWED
        </span>
      </div>

      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{title}</h3>
        <p className="font-label-telemetry text-label-telemetry text-on-surface-variant mt-0.5 font-mono">
          {subtitle}
        </p>
      </div>

      {/* Interactive Audio Waveform Element */}
      <div className="p-space-sm rounded-lg bg-surface-container-lowest space-y-2 border border-outline-variant/20">
        <div className="flex items-center justify-between gap-3">
          <button
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-[0_0_12px_rgba(208,188,255,0.4)] active:scale-90 transition-transform flex-shrink-0"
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            aria-label={isPlaying ? "Pause EVP Audio" : "Play EVP Audio"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Simulated Waveform graphic */}
          <div className="flex-1 px-2 flex items-center gap-1 h-8">
            <div className="flex-1 flex items-center justify-between gap-[3px] h-full">
              {[
                { h: 'h-2', col: 'bg-outline' },
                { h: 'h-4', col: 'bg-outline' },
                { h: 'h-6', col: 'bg-secondary' },
                { h: 'h-8', col: 'bg-secondary' },
                { h: 'h-7', col: 'bg-primary' },
                { h: 'h-5', col: 'bg-secondary' },
                { h: 'h-8', col: 'bg-primary' },
                { h: 'h-7', col: 'bg-tertiary-container' },
                { h: 'h-5', col: 'bg-tertiary-container' },
                { h: 'h-6', col: 'bg-secondary' },
                { h: 'h-4', col: 'bg-secondary' },
                { h: 'h-3', col: 'bg-outline' },
                { h: 'h-2', col: 'bg-outline' },
              ].map((bar, idx) => (
                <span
                  key={idx}
                  className={`w-1 rounded-full ${bar.h} ${bar.col} transition-all duration-300 ${
                    isPlaying ? 'animate-pulse scale-y-125' : ''
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          <span className="font-label-telemetry text-label-telemetry text-on-surface-variant tabular-nums font-mono flex-shrink-0">
            00:{formattedSeconds} / {duration}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 font-label-telemetry text-label-telemetry text-outline font-mono text-[10px] sm:text-[11px]">
          <span>SPEECH FREQ: {frequency}</span>
          <span>CONFIDENCE: {confidence}</span>
          <span>NOISE FLOOR: {noiseFloor}</span>
        </div>
      </div>

      <div className="p-2 rounded bg-surface-container-high/60 flex items-start gap-2 border border-outline-variant/15">
        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">verified_user</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          <span className="font-semibold text-secondary">Acoustic Analysis:</span> {analysisText}
        </p>
      </div>
    </div>
  );
}

