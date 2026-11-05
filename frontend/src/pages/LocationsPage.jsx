import React, { useState } from 'react';
import LocationCard from '../components/LocationCard';
import { locationsData } from '../data/locationsData';

const filterCategories = ['All Containments', 'Class IV Audio', 'Thermal Drop', 'Active Dispatch'];

export default function LocationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Containments');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locationsData.filter((loc) => {
    const matchesFilter =
      selectedFilter === 'All Containments' ||
      loc.tags.some((t) => t.label.toLowerCase().includes(selectedFilter.toLowerCase().replace(' containments', ''))) ||
      loc.statusLabel.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesSearch =
      loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile pb-space-xl space-y-space-md">
      {/* Page Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">explore</span>
          <span className="font-label-tag text-label-tag uppercase text-secondary tracking-widest font-mono">
            CLASSIFIED RECON DIRECTORY
          </span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
          Target Containments
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Georeferenced spatial archives of high-intensity anomalous structures undergoing active telemetry monitoring.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-space-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anomaly sites, wings, or tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:outline-none focus:border-secondary transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              type="button"
              className={`px-3 py-2 rounded-lg font-label-tag text-label-tag uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedFilter === category
                  ? 'bg-secondary/20 text-secondary border border-secondary shadow-[0_0_10px_rgba(76,215,246,0.3)]'
                  : 'bg-surface-container text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-high'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-1 font-label-telemetry text-label-telemetry text-outline font-mono">
        <span>LOCATIONS DISPLAYED: {filteredLocations.length} OF {locationsData.length}</span>
        <span className="text-secondary">GPS PROJECTION: WGS 84</span>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filteredLocations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <div className="p-space-xl text-center rounded-xl bg-surface-container border border-outline-variant/20">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">radar</span>
          <p className="font-headline-sm text-on-surface">No Containment Sites Match Query</p>
          <p className="font-body-sm text-on-surface-variant mt-1">
            Try adjusting your search terms or selecting 'All Containments'.
          </p>
        </div>
      )}
    </div>
  );
}

