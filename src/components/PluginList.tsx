import React from 'react';
import PluginCard from './PluginCard';

type Plugin = {
  id: string;
  name: string;
  shortDesc: string;
  downloadUrl: string;
  aboutUrl?: string;
};

const PLUGINS: Plugin[] = [
  {
    id: 'wp-content-helper',
    name: 'WP Content Helper',
    shortDesc: 'Grammarly-like AI writing assistant for WordPress (Google Gemini).',
    // Use GitHub archive zip for the main branch so users download directly from the repo
    downloadUrl: 'https://github.com/krtrimtech/wp-content-helper/archive/refs/heads/main.zip',
    aboutUrl: 'https://krtrimtech.github.io/wp-content-helper/',
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
