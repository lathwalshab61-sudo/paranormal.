import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTelemetry } from '../context/TelemetryContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenDrawer }) {
  const { telemetry } = useTelemetry();
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

          <Link to="/" className="flex items-center gap-2">
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
                <span className="font-label-tag text-label-tag uppercase text-tertiary tracking-widest font-mono">
                  LIVE ENCRYPTED
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Telemetry Frequency & Profile / Login Button */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-label-telemetry text-label-telemetry text-secondary uppercase font-mono">
              FREQ 142.8 MHZ
            </span>
            <div className="flex items-center gap-1">
              {telemetry.connectedToServer && (
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
              )}
              <span className="font-label-tag text-label-tag text-on-surface-variant uppercase font-mono">
                {telemetry.connectedToServer
                  ? telemetry.dbStatus?.includes('MongoDB')
                    ? '🍃 MONGODB ATLAS'
                    : 'NODE SYNCED'
                  : 'SEC-LEVEL 4'}
              </span>
            </div>
          </div>

          {/* User Profile or Login CTA */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/30"
              >
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-secondary to-primary shadow-[0_0_12px_rgba(76,215,246,0.3)]">
                  <img
                    alt={user.callSign}
                    className="w-8 h-8 rounded-full object-cover"
                    src={user.avatar}
                  />
                </div>
                <div className="hidden md:flex flex-col text-left pr-2 font-mono">
                  <span className="text-xs font-bold text-on-surface leading-tight">{user.callSign}</span>
                  <span className="text-[10px] text-secondary">{user.clearanceLevel}</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-high p-3 border border-outline-variant/40 shadow-2xl z-50 animate-fadeIn space-y-2 font-mono">
                  <div className="pb-2 border-b border-outline-variant/20">
                    <div className="text-xs font-bold text-on-surface">{user.callSign}</div>
                    <div className="text-[10px] text-secondary">{user.role}</div>
                    <div className="text-[9px] text-outline truncate">{user.email}</div>
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 text-xs text-on-surface hover:text-primary py-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    <span>Clearance Dossier</span>
                  </Link>
                  <button
                    onClick={() => { logout(); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-2 text-xs text-tertiary hover:text-error py-1 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="py-1.5 px-3 rounded-lg bg-primary/15 hover:bg-primary/25 border border-primary/40 text-primary font-mono text-xs uppercase font-semibold transition-all shadow-[0_0_12px_rgba(208,188,255,0.2)] flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

