import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Stars } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const WhySection = ({ 
  title, 
  content, 
  icon, 
  id 
}: { 
  title: string, 
  content: React.ReactNode, 
  icon: React.ReactNode,
  id: string 
}) => {
  return (
    <div id={id} className="mb-20 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
      </div>
      <div className="text-foreground/80 space-y-4 text-lg">
        {content}
      </div>
    </div>
  );
};

const WhyPage = () => {
  return (
    <>
      <SEO 
        title="Why Choose Krtrim? | AI-Powered ROI and Partnership"
        description="Discover why Krtrim is the right AI development partner for your business. We focus on delivering measurable ROI through strategic AI solutions and long-term partnerships."
        keywords="AI development partner, business growth with AI, AI ROI, AI strategy, SaaS development company"
      />
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 left-0 w-[250px] h-[250px] rounded-full bg-accent/5 blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground bg-clip-text">
              Why Krtrim?
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In a world of buzzwords, we focus on what matters: tangible results for your business.
            </p>
            
            <div className="mt-10 glass-panel p-8 md:p-10 rounded-lg max-w-3xl mx-auto shadow-lg border-2 border-primary/20">
              <p className="text-xl md:text-2xl text-foreground/90">
                Why invest in AI? Why choose us as your partner? Why do our solutions consistently deliver value?
              </p>
              <p className="text-xl md:text-2xl text-foreground/90 mt-6">
                The "why" is what drives everything we build.
              </p>
            </div>
          </div>
          
          <WhySection
            id="why-1"
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            title="Because AI is the Engine of Modern Business"
            content={
              <>
                <p>
                  In today's hyper-competitive digital landscape, standing still is not an option. AI and automation are no longer future-facing luxuries for large corporations; they are essential, present-day tools for efficiency, sustainable growth, and market survival. Businesses that fail to integrate intelligent solutions risk being outpaced by competitors who leverage technology to work smarter, not just harder. True <span className="font-bold text-primary/90">business growth with AI</span> comes from a strategic implementation of this transformative technology.
                </p>
                <p>
                  The core advantage of <span className="font-bold text-primary/90">AI solutions for business</span> lies in their ability to handle complexity and scale operations in ways that are simply not possible with manual effort alone. From automating repetitive administrative tasks, which frees up your valuable human capital, to unlocking predictive insights from your own data, AI is the key to unlocking your business's full potential. It's about creating more time for what humans do best: high-level strategy, creative problem-solving, and building genuine customer relationships.
                </p>
              </>
            }
          />
          
          <WhySection
            id="why-2"
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            title="Because Our Solutions Deliver Measurable ROI"
            content={
              <>
                <p>
                  At Krtrim, we build practical solutions that directly impact your bottom line. We're not interested in "AI for AI's sake." Every project is meticulously designed to solve a real-world business problem and deliver a clear, measurable <span className="font-bold text-primary/90">return on investment (ROI) from AI</span>.
                </p>
                <ul className="list-disc list-inside space-y-4 pl-4">
                  <li>
                    <strong>Custom Web Development (Alpha Team):</strong> A high-performance website is your #1 salesperson, working 24/7. We go beyond aesthetics to build fast, engaging, and SEO-optimized sites that convert visitors into loyal customers. By focusing on Core Web Vitals, intuitive UX design, and robust code, we create a powerful online presence that climbs search engine rankings and drives revenue.
                  </li>
                  <li>
                    <strong>AI Solutions (Meta Team):</strong> Our <span className="font-bold text-primary/90">AI chatbot for business</span> and <span className="font-bold text-primary/90">Voice AI agent</span> services can reduce customer support overhead by up to 70%. They increase lead capture and qualification by being instantly available around the clock and boost customer satisfaction by providing immediate, accurate answers, freeing your team to handle high-value interactions.
                  </li>
                  <li>
                    <strong>SaaS Development (Sigma Team):</strong> As a leading <span className="font-bold text-primary/90">SaaS development company</span>, we understand that speed and scalability are critical. We don't just build apps; we build businesses. Our expertise in scalable architecture and agile development (MVP) helps you get to market faster with a future-proof product that can grow and adapt with your user base.
                  </li>
                </ul>
              </>
            }
          />
          
          <WhySection
            id="why-3"
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Because We Are Your Long-Term AI Development Partner"
            content={
              <>
                <p>
                  Many agencies deliver a package of code and then disappear, leaving you to navigate the complexities of maintenance and evolution alone. We believe in building long-term partnerships. Your success is our success, and we're committed to supporting you every step of the way. Our process, which you can read about in detail on our 'How We Work' page, is built on transparency, collaboration, and a deep understanding of your unique goals.
                </p>
                <p>
                  We become a true extension of your team. As your dedicated <span className="font-bold text-primary/90">AI development partner</span>, we provide the ongoing technical expertise and strategic guidance you need to navigate the complexities of technology and achieve your vision. With Krtrim, you don't just get a one-time solution; you get a dedicated partner invested in your continuous growth and innovation.
                </p>
              </>
            }
          />
          
          <div className="mt-16 text-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/how">
                See How We Work
                <Stars size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyPage;
