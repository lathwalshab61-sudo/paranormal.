import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';

export default function Header({ onOpenDrawer }) {
  const { telemetry } = useTelemetry();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto h-20 px-margin-mobile flex items-center justify-between gap-space-sm">
        {/* Left: Terminal Menu + Logo */}
        <div className="flex items-center gap-space-sm">
          <button
            aria-label="Agency Directives Drawer"
            className="w-11 h-11 flex items-center justify-center text-secondary hover:text-primary transition-colors focus:outline-none rounded-lg hover:bg-surface-container active:scale-95"
            onClick={onOpenDrawer}
            type="button"
          >
            <span className="material-symbols-outlined text-[26px]">terminal</span>
          </button>

          <img
            alt="Beyond The Unknown Emblem"
            className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(208,188,255,0.4)]"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VxbnJV6xNmuPxNprShT6RGKuox634Xa-5m2O7gX7o0N4aVFkF2WLThcDZFBzRv76l9vRB3_Crno9UisjTJmj9Z9OwnxPCCbuH-REmiAG7cRwi_p0mInmTPs0wNg3ANqd3CHN3c3FfG2SWhdytDCWZIwpUi-G1bjHS72zkGxVqJPYIlFQ0zl1esufNti-Xhqc7Ix2WbyEiA2LbycFo0A-3WrkHmQAQeUQzpzD7JEuEY"
          />

          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase text-on-surface leading-none tracking-tight font-bold">
              BTU
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse shadow-[0_0_8px_rgba(255,84,81,0.8)]"></span>
              <span className="font-label-tag text-label-tag uppercase text-tertiary tracking-widest">
                LIVE ENCRYPTED
              </span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry Frequency & Profile */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-label-telemetry text-label-telemetry text-secondary uppercase font-mono">
              FREQ 142.8 MHZ
            </span>
            <div className="flex items-center gap-1">
              {telemetry.connectedToServer && (
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
              )}
              <span className="font-label-tag text-label-tag text-on-surface-variant uppercase">
                {telemetry.connectedToServer
                  ? telemetry.dbStatus?.includes('MongoDB')
                    ? '🍃 MONGODB ATLAS'
                    : 'NODE SYNCED'
                  : 'SEC-LEVEL 4'}
              </span>
            </div>
          </div>

          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-secondary to-primary shadow-[0_0_12px_rgba(76,215,246,0.3)]">
            <img
              alt="Field Agent Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAazlzuFvu1yeDhFPtF2nOYBjP_kch0qBQcIUrm1cr0LGnR_w9xbguBgMx8WHB2GNes7UzoU9pNfdWG6ZxY3pZTWkhOBnUuIOKspiU5VgscBUmeffhqZ66JbBxNS7T2x-9vcafTlidby0Zf2IQIl5Jws189SO7dv2oIn0GkYPstv_QQMaliBvBsqCtPaByIfty7bBdC-G7XP900Y8QAUjiVMoDFJvBwiLq2AiXwqIo"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

