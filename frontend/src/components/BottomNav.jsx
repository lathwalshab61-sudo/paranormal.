import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', icon: 'radar' },
  { path: '/locations', label: 'Locs', icon: 'explore' },
  { path: '/tools', label: 'Tools', icon: 'sensors' },
  { path: '/dashboard', label: 'Ops', icon: 'emergency' },
  { path: '/evidence', label: 'Vault', icon: 'inventory_2' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.7)] border-t border-outline-variant/30">
      <div className="max-w-md mx-auto flex justify-between items-center h-20 px-gutter-mobile">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all ${
                isActive
                  ? "text-primary relative after:content-[''] after:absolute after:bottom-1 after:w-8 after:h-0.5 after:bg-secondary after:shadow-[0_0_8px_#4cd7f6]"
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label-tag text-label-tag uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

