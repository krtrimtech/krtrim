import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { Bot, Mic, Code, ArrowRight } from 'lucide-react';
interface ServicesSectionProps {
  show: boolean;
}
const services = [{
  team: "Alpha Team",
  service: "AI Knowledge Chatbots",
  description: "Intelligent conversational AI that understands your business data and provides instant, accurate responses to customer queries 24/7.",
  icon: Bot,
  features: ["Custom knowledge base integration", "Multi-language support", "Analytics & insights", "Seamless website integration"],
  calLink: "https://cal.com/krtrim/ai-chatbot-consultation"
}, {
  team: "Meta Team",
  service: "Voice AI Agents",
  description: "Advanced voice assistants that handle customer calls, appointments, and support with natural human-like conversations.",
  icon: Mic,
  features: ["Natural voice synthesis", "Real-time conversation", "Call routing & scheduling", "CRM integration"],
  calLink: "https://cal.com/krtrim/voice-agent-consultation"
}, {
  team: "Sigma Team",
  service: "Full-Stack SaaS Development",
  description: "Complete software solutions powered by AI. From concept to deployment, we build scalable SaaS products that drive growth.",
  icon: Code,
  features: ["AI-powered features", "Scalable architecture", "Modern tech stack", "Ongoing support"],
  calLink: "https://cal.com/krtrim/saas-development-consultation"
}];
export const ServicesSection = ({
  show
}: ServicesSectionProps) => {
  const handleBookConsultation = (calLink: string, serviceName: string) => {
    window.open(`${calLink}?service=${encodeURIComponent(serviceName)}`, '_blank');
  };
  return <AnimatedTransition show={show} animation="slide-up" duration={600}>
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Our Specialized Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three elite teams, each mastering a unique domain of AI and automation to transform your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
            const IconComponent = service.icon;
            return <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 workflow-animate-float bg-gradient-to-b from-primary/20 to-primary/30 dark:from-primary/10 dark:to-primary/20 dark:shadow-[0_0_30px_rgba(251,146,60,0.3)] dark:hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] dark:border-primary/40 dark:hover:border-primary/60" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-4 p-3 rounded-full w-fit backdrop-blur-sm bg-primary dark:shadow-[0_0_20px_rgba(251,146,60,0.4)]">
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase tracking-wide text-primary">{service.team}</p>
                      <CardTitle className="text-2xl font-bold text-foreground">{service.service}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                   <CardContent className="pt-0">
                     <ul className="space-y-3">
                       {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                           <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                           {feature}
                         </li>)}
                     </ul>
                   </CardContent>
                   
                   <CardFooter className="pt-6">
                     <Button onClick={() => handleBookConsultation(service.calLink, service.service)} className="w-full bg-primary/20 text-foreground border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold dark:shadow-[0_0_15px_rgba(251,146,60,0.2)] dark:hover:shadow-[0_0_25px_rgba(251,146,60,0.4)]" variant="outline">
                       Book Consultation
                       <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                   </CardFooter>
                </Card>;
          })}
          </div>
        </div>
      </div>
    </AnimatedTransition>;
};