import { AnimatedTransition } from '@/components/AnimatedTransition';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
interface TestimonialsSectionProps {
  showTestimonials: boolean;
}
export const TestimonialsSection = ({
  showTestimonials
}: TestimonialsSectionProps) => {
  const testimonials = [{
    quote: "KRTRIM's AI chatbot increased our customer satisfaction by 85% and handles 90% of inquiries automatically.",
    name: "Sarah Chen",
    role: "CEO, TechStart Solutions",
    rating: 5
  }, {
    quote: "The voice agent completely transformed our appointment booking. We're saving 20 hours per week.",
    name: "Marcus Rodriguez",
    role: "Operations Manager, MedCare Clinic",
    rating: 5
  }, {
    quote: "Their full-stack SaaS development delivered exactly what we envisioned. Exceptional quality and speed.",
    name: "Amanda Foster",
    role: "Founder, EduTech Pro",
    rating: 5
  }, {
    quote: "Working with the Alpha Team was seamless. Our AI knowledge base now handles complex customer queries perfectly.",
    name: "Dr. Michael Thompson",
    role: "CTO, FinanceFirst",
    rating: 5
  }, {
    quote: "The Meta Team's voice AI solution feels more natural than talking to humans. Our customers love it.",
    name: "Emma Wilson",
    role: "Customer Success Director, RetailMax",
    rating: 5
  }, {
    quote: "Sigma Team built our entire platform in record time. The AI features they integrated are game-changing.",
    name: "David Park",
    role: "Product Lead, InnovateCorp",
    rating: 5
  }, {
    quote: "KRTRIM doesn't just deliver solutions, they deliver transformation. Our ROI was 300% in the first quarter.",
    name: "Lisa Zhang",
    role: "VP Operations, GrowthTech",
    rating: 5
  }, {
    quote: "The level of customization and AI intelligence in our chatbot exceeded all expectations.",
    name: "James Miller",
    role: "Director of Customer Experience, ServicePro",
    rating: 5
  }, {
    quote: "From concept to deployment, KRTRIM's team made our AI vision a reality. Truly exceptional work.",
    name: "Rachel Kumar",
    role: "Founder, HealthTech Innovations",
    rating: 5
  }];

  // Component to render star ratings
  const StarRating = ({
    rating
  }: {
    rating: number;
  }) => {
    return <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />)}
      </div>;
  };
  return <AnimatedTransition show={showTestimonials} animation="slide-up" duration={600}>
      <div className="py-16 md:py-24">
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-7xl text-orange-500">
            Trusted by businesses<br />
            worldwide.
          </h2>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-card border border-border/50 p-6 rounded-lg shadow-sm h-full">
              <StarRating rating={testimonial.rating} />
              <p className="text-lg font-medium mb-4">{testimonial.quote}</p>
              <div className="mt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>)}
        </div>
      </div>
    </AnimatedTransition>;
};