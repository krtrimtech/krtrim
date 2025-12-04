import React from 'react';
import PluginCard from './PluginCard';

type Plugin = {
  id: string;
  name: string;
  shortDesc: string;
  downloadUrl: string;
  aboutUrl?: string;
  repoOwner?: string;
  repoName?: string;
};

const PLUGINS: Plugin[] = [
  {
    id: 'wp-content-helper',
    name: 'WP Content Helper',
    shortDesc: 'Grammarly-like AI writing assistant for WordPress (Google Gemini). Per-user API keys. Gutenberg-native toolbar integration.',
    // Use GitHub archive zip for the main branch so users download directly from the repo
    downloadUrl: 'https://github.com/krtrimtech/wp-content-helper/archive/refs/heads/main.zip',
    aboutUrl: 'https://krtrimtech.github.io/wp-content-helper/',
    repoOwner: 'krtrimtech',
    repoName: 'wp-content-helper',
  },
  {
    id: 'krtrim-solar-core',
    name: 'Krtrim Solar Core',
    shortDesc: 'Comprehensive project management and bidding platform for solar companies. Creates a unified dashboard for Solar Clients, Solar Vendors, and Area Managers, with custom user roles.',
    // Use GitHub archive zip for the main branch so users download directly from the repo
    downloadUrl: 'https://github.com/krtrimtech/krtrim-solar-core/archive/refs/heads/main.zip',
    aboutUrl: 'https://krtrimtech.github.io/krtrim-solar-core/',
    repoOwner: 'krtrimtech',
    repoName: 'krtrim-solar-core',
  },
];

export default function PluginList() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLUGINS.map((p) => (
          <PluginCard key={p.id} plugin={p} />
        ))}
      </div>
    </div>
  );
}
