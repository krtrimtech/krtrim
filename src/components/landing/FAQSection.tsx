import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
interface FAQSectionProps {
  showFAQs?: boolean;
}
export const FAQSection = ({
  showFAQs = true
}: FAQSectionProps) => {
  const [openItem, setOpenItem] = useState<string | null>("item-1");
  const faqs = [{
    id: "item-1",
    question: "What services does Krtrim Agency offer?",
    answer: "Krtrim specializes in three core areas: Custom Web Development (Alpha Team), AI Solutions including chatbots and voice agents (Meta Team), and Full-Stack SaaS Development (Sigma Team). We build intelligent, scalable solutions tailored to your business needs."
  }, {
    id: "item-2",
    question: "How can AI solutions benefit my business?",
    answer: "AI solutions from Krtrim can significantly boost efficiency, reduce operational costs, enhance customer experience through 24/7 support, and drive business growth by automating tasks and providing data-driven insights. We help you work smarter, not just harder."
  }, {
    id: "item-3",
    question: "What is Krtrim's project development process?",
    answer: "Our process typically involves three phases: Consult (understanding your needs), Build (designing and developing your custom solution), and Support (providing ongoing maintenance and improvements). We ensure a transparent and collaborative journey from start to finish."
  }, {
    id: "item-4",
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity of the solution. After an initial consultation, we provide a detailed proposal with a clear timeline. Our agile approach ensures efficient delivery and regular updates."
  }, {
    id: "item-5",
    question: "What makes Krtrim different from other development agencies?",
    answer: "Krtrim stands out through our commitment to measurable ROI, our deep expertise in AI and modern web technologies, and our philosophy of true partnership. We don't just deliver projects; we become an extension of your team, invested in your long-term success and growth."
  }, {
    id: "item-6",
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, absolutely. We offer comprehensive post-launch support, maintenance, and continuous improvement services to ensure your solution remains optimal, secure, and aligned with your evolving business goals."
  }];
  return <AnimatedTransition show={showFAQs} animation="slide-up" duration={600}>
      <div className="relative py-16 md:py-24">
        {/* Decorative Blobs */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about our AI solutions and development services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full" value={openItem} onValueChange={setOpenItem}>
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
                    <HelpCircle className="mr-3 h-5 w-5 text-primary" />
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </AnimatedTransition>;
};