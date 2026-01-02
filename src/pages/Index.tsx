import { useState, useEffect } from 'react';
import { useAnimateIn } from '@/lib/animations';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CallToAction } from '@/components/landing/CallToAction';
import { LoadingScreen } from '@/components/landing/LoadingScreen';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const showHero = useAnimateIn(false, 300);
  const showServices = useAnimateIn(false, 600);
  const showTestimonials = useAnimateIn(false, 900);
  const showFAQs = useAnimateIn(false, 1200);
  const showCallToAction = useAnimateIn(false, 1500);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <>
      <SEO 
        title="AI Solutions for Business Growth"
        description="Krtrim provides custom AI solutions, including web development, AI chatbots, voice agents, and SaaS development, to automate your business and drive growth."
        keywords="AI solutions, web development, AI chatbot, voice agent, SaaS development, business automation"
      />
      <div className="relative overflow-hidden">
        {/* Background elements with orange theme */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-secondary/15 to-accent/10 blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="flex flex-col space-y-24">
            {/* Hero Section */}
            <HeroSection showTitle={showHero} />
            
            {/* Services Section */}
            <ServicesSection show={showServices} />
            
            {/* Testimonials Section */}
            <TestimonialsSection showTestimonials={showTestimonials} />

            {/* FAQ Section */}
            <FAQSection showFAQs={showFAQs} />
            
            {/* Call to Action */}
            <CallToAction show={showCallToAction} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
