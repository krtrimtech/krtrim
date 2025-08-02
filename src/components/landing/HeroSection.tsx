import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useState } from 'react';
import { WorkflowDiagram } from '../workflow/WorkflowDiagram';

interface HeroSectionProps {
  showTitle: boolean;
}
export const HeroSection = ({
  showTitle
}: HeroSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return <div className="py-20 md:py-28 flex flex-col items-center text-center">
      <AnimatedTransition show={showTitle} animation="slide-up" duration={600}>
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/images/logo.png" 
            alt="KRTRIM Logo" 
            className="w-20 h-20 mx-auto mb-4"
          />
        </div>
        
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-transparent md:text-7xl animate-gradient-flow"
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          KRTRIM
        </h1>
        <div className="mb-4 flex justify-center">
          <span className="inline-block px-4 py-2 rounded-full text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-2xl font-semibold shadow-lg animate-pulse">
            Unleash AI. Accelerate Growth.
          </span>
        </div>
        
        {/* Description */}
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
          Transform your business with cutting-edge AI solutions. From intelligent chatbots to voice agents and full-stack SaaS development - we build the future of automation.
        </p>
        
        {/* Workflow Diagram */}
        <div className="mb-12 w-full">
          <WorkflowDiagram />
        </div>
        
        {/* Call to action */}
        <Button 
          size="lg" 
          onClick={() => window.open('https://cal.com/krtrim/consultation', '_blank')} 
          className="rounded-full px-8 py-6 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50 transform hover:scale-105 hover:shadow-2xl hover:brightness-110 dark:shadow-[0_0_20px_rgba(251,146,60,0.3)] dark:hover:shadow-[0_0_40px_rgba(251,146,60,0.6)]"
        >
          Book Free Consultation
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

      </AnimatedTransition>
    </div>;
};