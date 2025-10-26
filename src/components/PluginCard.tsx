import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function PluginCard({ plugin }: { plugin: any }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    // If repo info is not provided, fall back to static downloadUrl
    const owner = plugin.repoOwner;
    const repo = plugin.repoName;

    if (!owner || !repo) {
      window.location.href = plugin.downloadUrl;
      return;
    }

    setLoading(true);
    try {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Failed to fetch release');
      const data = await res.json();
      const assets = data.assets || [];
      if (assets.length > 0 && assets[0].browser_download_url) {
        // Redirect browser to the first asset's download URL
        window.location.href = assets[0].browser_download_url;
        return;
      }
      // If no assets, fall back to release zip (source code) if available
      if (data.zipball_url) {
        window.location.href = data.zipball_url;
        return;
      }
      // Fallback to configured static URL
      window.location.href = plugin.downloadUrl;
    } catch (err) {
      console.error('Download fallback', err);
      window.location.href = plugin.downloadUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 workflow-animate-float bg-gradient-to-b from-primary/20 to-primary/30 dark:from-primary/10 dark:to-primary/20">
      <CardHeader className="text-left pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 p-3 rounded-full w-fit backdrop-blur-sm bg-primary/80">
              {/* placeholder icon */}
              <svg className="h-6 w-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 7L12 12L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <CardTitle className="text-lg font-bold text-foreground">{plugin.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">{plugin.shortDesc}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* brief features or placeholder */}
        <p className="text-sm text-muted-foreground">Easy to install. Per-user API keys. Gutenberg-native toolbar integration.</p>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="w-full flex gap-3">
          <button onClick={handleDownload} className="w-full" disabled={loading}>
            <Button className="w-full bg-primary/20 text-foreground border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold" variant="outline">
              {loading ? 'Preparing...' : 'Download'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>

          <a href={plugin.aboutUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full" variant="ghost">About</Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
