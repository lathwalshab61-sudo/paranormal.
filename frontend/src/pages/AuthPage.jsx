import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register, logout, isAuthenticated, loading } = useAuth();

  // Mode: 'signin' or 'signup'
  const [mode, setMode] = useState(
    location.pathname.includes('signup') || location.pathname.includes('register')
      ? 'signup'
      : 'signin'
  );

  // Sign In Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up Form State
  const [callSign, setCallSign] = useState('');
  const [email, setEmail] = useState('');
  const [clearanceLevel, setClearanceLevel] = useState('SEC-LEVEL 2');
  const [role, setRole] = useState('Technical Specialist');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedProtocols, setAcceptedProtocols] = useState(false);

  // Status message
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier || !loginPassword) {
      setErrorMsg('Please enter your Operative Call-Sign/Email and Security Passkey.');
      return;
    }

    const res = await login(loginIdentifier, loginPassword);
    if (res.success) {
      setSuccessMsg(`Access Granted: Welcome, ${res.user.callSign}`);
      setTimeout(() => navigate('/'), 1200);
    } else {
      setErrorMsg(res.error || 'Access Denied: Invalid credentials.');
    }
  };

  const handleQuickDemoSignIn = async () => {
    setLoginIdentifier('agent774@btu.gov');
    setLoginPassword('Password123!');
    const res = await login('agent774@btu.gov', 'Password123!');
    if (res.success) {
      setSuccessMsg('Demo Clearance Granted: Welcome, AGENT-774');
      setTimeout(() => navigate('/'), 1000);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!callSign.trim()) {
      setErrorMsg('Call-Sign is required (e.g. AGENT-902).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('A valid official email is required.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMsg('Security Passkey must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setErrorMsg('Passkeys do not match. Please verify.');
      return;
    }
    if (!acceptedProtocols) {
      setErrorMsg('You must acknowledge Class IV Containment & Boundary Directives.');
      return;
    }

    const res = await register({
      callSign,
      email,
      password: signupPassword,
      clearanceLevel,
      role,
      badgeNumber: badgeNumber || `BTU-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    if (res.success) {
      setSuccessMsg(`Clearance Approved: Welcome Operative ${res.user.callSign}!`);
      setTimeout(() => navigate('/'), 1200);
    } else {
      setErrorMsg(res.error || 'Clearance application rejected.');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Header */}
      <div className="flex flex-col space-y-1 text-center items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[26px]">badge</span>
          <span className="font-label-tag text-label-tag uppercase text-secondary tracking-widest font-mono">
            SECURITY CLEARANCE VERIFICATION
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Operative Access Portal
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Authentication interface for Beyond the Unknown (BTU) accredited researchers, field operatives, and containment personnel.
        </p>
      </div>

      {/* Main Glassmorphism Authentication Card */}
      <div className="rounded-xl bg-surface-container p-space-lg border border-outline-variant/30 space-y-space-md shadow-2xl relative overflow-hidden">
        {/* Glow corner accents */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* If already authenticated, show status card */}
        {isAuthenticated && user && (
          <div className="p-space-md rounded-xl bg-surface-container-low border border-secondary/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-tag text-secondary font-mono uppercase">ACTIVE SESSION DETECTED</span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.callSign}
                className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
              />
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface">{user.callSign}</h3>
                <p className="font-mono text-xs text-secondary">{user.clearanceLevel} • {user.role}</p>
                <p className="font-mono text-[10px] text-outline">{user.email}</p>
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-2 rounded-lg bg-primary text-on-primary font-mono text-xs uppercase font-bold"
              >
                Enter Field Console
              </button>
              <button
                onClick={logout}
                className="py-2 px-4 rounded-lg bg-surface-container-high text-tertiary border border-tertiary/30 font-mono text-xs uppercase"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Mode Selector Tabs (Sign In / Sign Up) */}
        <div className="flex rounded-lg bg-surface-container-lowest p-1 border border-outline-variant/20">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-md font-label-tag text-label-tag uppercase font-mono transition-all ${
              mode === 'signin'
                ? 'bg-secondary/20 text-secondary border border-secondary/40 shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Sign In (Field Operative)
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-md font-label-tag text-label-tag uppercase font-mono transition-all ${
              mode === 'signup'
                ? 'bg-primary/20 text-primary border border-primary/40 shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Sign Up (New Clearance)
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-error-container/20 border border-error/40 text-error font-mono text-xs flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/50 text-secondary font-mono text-xs flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Operative Call-Sign or Official Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  person
                </span>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="AGENT-774 or agent@btu.gov"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-secondary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                Security Passkey / Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-secondary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-space-md rounded-lg bg-gradient-to-r from-secondary-container to-inverse-primary text-white font-headline-sm text-body-md uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(3,181,211,0.35)] active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">vpn_key</span>
              <span>{loading ? 'Verifying Clearance...' : 'Authenticate Credentials'}</span>
            </button>

            {/* Quick Demo Fill button */}
            <div className="pt-2 border-t border-outline-variant/20 flex flex-col items-center gap-2">
              <span className="font-label-telemetry text-outline font-mono text-[10px]">
                NEED IMMEDIATE ACCESS? USE DEFAULT CLASSIFIED CREDENTIALS:
              </span>
              <button
                type="button"
                onClick={handleQuickDemoSignIn}
                className="w-full py-2 px-3 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high border border-outline-variant/30 text-secondary font-mono text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Quick Demo Sign In (AGENT-774)</span>
              </button>
            </div>
          </form>
        )}

        {/* 2. SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Operative Call-Sign
                </label>
                <input
                  type="text"
                  value={callSign}
                  onChange={(e) => setCallSign(e.target.value)}
                  placeholder="e.g. AGENT-902"
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@agency.gov"
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Clearance Tier
                </label>
                <select
                  value={clearanceLevel}
                  onChange={(e) => setClearanceLevel(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                >
                  <option value="SEC-LEVEL 1">SEC-LEVEL 1 (Field Observer)</option>
                  <option value="SEC-LEVEL 2">SEC-LEVEL 2 (Technical Specialist)</option>
                  <option value="SEC-LEVEL 3">SEC-LEVEL 3 (Senior Investigator)</option>
                  <option value="SEC-LEVEL 4">SEC-LEVEL 4 (Containment Lead)</option>
                </select>
              </div>

              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Badge ID Number
                </label>
                <input
                  type="text"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="BTU-XXXX (Auto if blank)"
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Security Passkey
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-label-tag text-label-tag uppercase text-outline block mb-1 font-mono">
                  Confirm Passkey
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter passkey"
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedProtocols}
                onChange={(e) => setAcceptedProtocols(e.target.checked)}
                className="mt-1 accent-primary rounded cursor-pointer"
              />
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                I hereby accept BTU Class IV Containment protocols, data non-disclosure standards, and agree to empirical calibration logging.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-space-md rounded-lg bg-gradient-to-r from-primary-container to-secondary text-white font-headline-sm text-body-md uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(160,120,255,0.35)] active:scale-95 transition-all hover:brightness-110 flex items-center justify-center gap-2 pt-2"
            >
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              <span>{loading ? 'Registering...' : 'Register Clearance Credentials'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
