import React from 'react';
import PluginList from '../components/PluginList';
import { SEO } from '@/components/SEO';

const WordpressToolPage = () => {
    return (
        <>
            <SEO 
                title="WordPress Tools & Plugins"
                description="Explore a collection of powerful, custom-built WordPress tools and plugins by Krtrim to enhance your website's functionality."
                keywords="WordPress plugins, WordPress tools, custom WordPress development, Krtrim plugins"
            />
            <div className="relative overflow-hidden">
                {/* Background elements (orange blur accents) copied from home page for visual consistency */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-3xl -z-10"></div>
                <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-secondary/15 to-accent/10 blur-3xl -z-10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            WordPress Tools & Plugins
                        </h1>
                        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore a collection of powerful WordPress tools and plugins, Use the buttons on each card to download the plugin or read more on the documentation site.
                        </p>
                    </div>

                    <div className="mt-12">
                        <PluginList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default WordpressToolPage;