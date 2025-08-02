import { useRef } from 'react';
import { 
  Bot, 
  Mic, 
  Code, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';





const HowPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-[250px] h-[250px] rounded-full bg-accent/5 blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <div ref={heroRef} className="relative w-full max-w-3xl mx-auto">
            <div className="absolute -z-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="glass-panel rounded-full py-5 px-8 inline-block mx-auto mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">How Krtrim Works</h1>
            </div>
            <p className="text-xl text-center text-foreground/80 max-w-2xl mx-auto mb-12">
              Discover how Krtrim delivers AI-powered solutions for modern businesses. Our teams combine deep expertise and advanced technology to help you automate, scale, and innovate.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <a href="https://discord.gg/7GDEykchFh" target="_blank" rel="noopener noreferrer">
                  Join our Discord
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* About Our Services Section */}
        <div className="mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <p className="text-lg text-foreground/80 mb-6 text-center">
            At Krtrim, we deliver AI-powered solutions tailored to your business needs. Our expertise spans AI chatbots, voice agents, and full-stack SaaS development, helping you automate processes, enhance customer experience, and drive growth.
          </p>
          <ul className="list-disc list-inside text-foreground/80 mb-6">
            <li>AI Knowledge Chatbots for instant, accurate customer support</li>
            <li>Voice AI Agents for seamless, human-like conversations</li>
            <li>Custom SaaS solutions powered by the latest AI technologies</li>
          </ul>
          <p className="text-lg text-foreground/80 text-center">
            We combine deep technical expertise with a consultative approach to ensure your success at every step.
          </p>
        </div>

        {/* What We Need From You Section */}
        <div className="mb-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">What We Need From You</h2>
          <p className="text-foreground/80 mb-4 text-center">
            To deliver the best results, we work closely with you to understand your goals and requirements. Here’s what we typically need from our clients:
          </p>
          <ul className="list-disc list-inside text-foreground/80 mb-4">
            <li>Clear business objectives and desired outcomes</li>
            <li>Access to relevant data, documents, or systems (if needed)</li>
            <li>Key contacts for collaboration and feedback</li>
            <li>Any existing technical or brand guidelines</li>
          </ul>
          <p className="text-foreground/80 text-center">
            Our team guides you through every step, making the process smooth and transparent.
          </p>
        </div>

        {/* How We Work Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Consult</h3>
              <p className="text-foreground/80">We start by understanding your business needs and goals, then recommend the best AI solutions for you.</p>
            </div>
            <div className="glass-panel rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Build</h3>
              <p className="text-foreground/80">Our expert teams design, develop, and integrate your custom AI solution using modern, scalable technology.</p>
            </div>
            <div className="glass-panel rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Support</h3>
              <p className="text-foreground/80">We provide ongoing support, analytics, and improvements to ensure your solution keeps delivering value.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 px-4 rounded-lg glass-panel my-24">
          <h2 className="text-3xl font-bold text-center mb-3">Ready to transform your business with AI?</h2>
          <p className="text-xl text-center text-foreground/80 max-w-3xl mx-auto mb-16">
            Book a free consultation with our experts and see how Krtrim can help you automate, scale, and innovate.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <a href="https://cal.com/krtrim/consultation" target="_blank" rel="noopener noreferrer">
                Book a Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowPage;
