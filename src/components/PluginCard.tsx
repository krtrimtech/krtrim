import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function PluginCard({ plugin }: { plugin: any }) {
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
          <a href={plugin.downloadUrl} download className="w-full">
            <Button className="w-full bg-primary/20 text-foreground border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold" variant="outline">
              Download
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>

          <a href={plugin.aboutUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full" variant="ghost">About</Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
