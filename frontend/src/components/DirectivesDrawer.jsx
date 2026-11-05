import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DirectivesDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md pt-20 transition-all animate-fadeIn">
      <div 
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
      <div className="p-space-lg max-w-sm ml-auto mr-0 bg-surface-container-high/95 h-full flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.9)] border-l border-outline-variant/40">
        <div className="space-y-space-md">
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
            <span className="font-label-code text-label-code uppercase text-secondary tracking-widest">
              DIRECTIVES &amp; ARCHIVE
            </span>
            <button
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-space-xs">
            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `h-12 px-space-md flex items-center gap-space-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-surface-container text-primary border border-primary/40'
                    : 'bg-surface-container/60 hover:bg-surface-container text-on-surface hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-secondary">info</span>
              <span className="font-body-md text-body-md">About BTU Division</span>
            </NavLink>

            <NavLink
              to="/safety"
              onClick={onClose}
              className={({ isActive }) =>
                `h-12 px-space-md flex items-center gap-space-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-surface-container text-tertiary border border-tertiary/40'
                    : 'bg-surface-container/60 hover:bg-surface-container text-on-surface hover:text-tertiary'
                }`
              }
            >
              <span className="material-symbols-outlined text-tertiary">shield_lock</span>
              <span className="font-body-md text-body-md">Class IV Containment Safety</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `h-12 px-space-md flex items-center gap-space-sm rounded-lg transition-all ${
                  isActive
                    ? 'bg-surface-container text-primary border border-primary/40'
                    : 'bg-surface-container/60 hover:bg-surface-container text-on-surface hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-primary">alternate_email</span>
              <span className="font-body-md text-body-md">Encrypted Dispatch Uplink</span>
            </NavLink>
          </nav>
        </div>

        <div className="p-space-sm bg-surface-container-lowest/90 rounded-lg border border-outline-variant/30">
          <span className="font-label-tag text-label-tag text-outline block">BTU PROTOCOL VER 4.8.2</span>
          <span className="font-label-telemetry text-label-telemetry text-on-surface-variant font-mono">
            STATION REF: LAT 34.0522° LON -118.2437°
          </span>
        </div>
      </div>
    </div>
  );
}

