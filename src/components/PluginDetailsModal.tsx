import React from 'react';

type Plugin = {
  id: string;
  name: string;
  shortDesc: string;
  instructions: string;
  about?: React.ReactNode;
  downloadUrl: string;
};

export default function PluginDetailsModal({
  plugin,
  onClose,
}: {
  plugin: Plugin | null;
  onClose: () => void;
}) {
  if (!plugin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{plugin.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{plugin.shortDesc}</p>
            </div>
            <div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
            </div>
          </div>

          <div className="mt-4">
            {/* Render rich about content when available, otherwise fall back to plain instructions */}
            {plugin.about ? (
              <div className="max-h-[60vh] overflow-auto">{plugin.about}</div>
            ) : (
              <>
                <h3 className="font-medium mb-2">Installation & Usage</h3>
                <pre className="bg-slate-50 dark:bg-slate-800 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-64">
{plugin.instructions}
                </pre>
              </>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={plugin.downloadUrl}
              download
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Plugin
            </a>

            <button onClick={onClose} className="px-4 py-2 rounded border">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
