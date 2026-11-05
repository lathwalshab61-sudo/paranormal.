import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DirectivesDrawer from './components/DirectivesDrawer';
import { TelemetryProvider } from './context/TelemetryContext';

import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import ToolsPage from './pages/ToolsPage';
import OpsDashboardPage from './pages/OpsDashboardPage';
import EvidenceVaultPage from './pages/EvidenceVaultPage';
import AboutPage from './pages/AboutPage';
import SafetyPage from './pages/SafetyPage';
import ContactDispatchPage from './pages/ContactDispatchPage';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <TelemetryProvider>
      <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen tactical-grid-bg relative selection:bg-primary-container selection:text-on-primary-container">
        {/* Persistent Tactical Header */}
        <Header onOpenDrawer={() => setIsDrawerOpen(true)} />

        {/* Slide-out Directives & Archive Drawer */}
        <DirectivesDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full pt-24 pb-28 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/dashboard" element={<OpsDashboardPage />} />
            <Route path="/ops" element={<OpsDashboardPage />} />
            <Route path="/evidence" element={<EvidenceVaultPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/safety-protocols" element={<SafetyPage />} />
            <Route path="/contact" element={<ContactDispatchPage />} />
            <Route path="/contact-agency" element={<ContactDispatchPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Persistent Bottom Tactical Navigation */}
        <BottomNav />
      </div>
    </TelemetryProvider>
  );
}

