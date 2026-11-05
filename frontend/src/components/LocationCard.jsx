import React from 'react';
import { Link } from 'react-router-dom';

export default function LocationCard({ location }) {
  const {
    id,
    title,
    subtitle,
    description,
    image,
    distance,
    tags = [],
    statusLabel,
    statusType = 'tertiary', // 'tertiary' (red/pink) or 'secondary' (cyan)
  } = location;

  return (
    <div className="rounded-xl bg-surface-container overflow-hidden shadow-lg border border-outline-variant/30 hover:border-secondary/40 transition-all">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          alt={title}
          src={image}
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-tag text-label-tag uppercase ${
                tag.highlight === 'tertiary'
                  ? 'text-tertiary'
                  : tag.highlight === 'primary'
                  ? 'text-primary-fixed-dim'
                  : 'text-outline'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-surface-container-lowest/80 backdrop-blur-sm font-label-telemetry text-label-telemetry text-secondary font-mono">
          {distance}
        </div>
      </div>

      <div className="p-space-md space-y-space-xs">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-headline-md text-headline-sm text-on-surface font-semibold">
              {title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-outline line-clamp-2">
          {description}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <div className={`flex items-center gap-1 font-label-telemetry text-label-telemetry ${
            statusType === 'tertiary' ? 'text-tertiary' : 'text-secondary'
          }`}>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                statusType === 'tertiary' ? 'bg-tertiary animate-pulse' : 'bg-secondary'
              }`}
            ></span>
            <span>{statusLabel}</span>
          </div>

          <Link
            to={`/locations/${id}`}
            className="py-1.5 px-space-md rounded-lg bg-secondary/15 hover:bg-secondary/25 text-secondary font-label-code text-label-code uppercase tracking-wider transition-colors inline-block text-center border border-secondary/30 active:scale-95"
          >
            View Dossier
          </Link>
        </div>
      </div>
    </div>
  );
}

