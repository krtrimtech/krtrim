import { useState, useEffect } from 'react';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { Card } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';
import { ReviewModal } from '@/components/ReviewModal';
import { db } from '@/components/forms/firebaseConfig.js';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";

interface TestimonialsSectionProps {
  showTestimonials: boolean;
}

const staticTestimonials = [{
  quote: "KRTRIM's AI chatbot increased our customer satisfaction by 85% and now handles 90% of our inquiries automatically. A game-changer for our support team.",
  name: "Rohan Kapoor",
  role: "Operations Head",
  company: "Zenith Logistics India",
  service: "Meta Team - AI Solutions",
  rating: 5
}, {
  quote: "The new website is not only beautiful but also incredibly fast. Our conversion rates have increased by 40% since launch.",
  name: "Chloe Dubois",
  role: "Marketing Director",
  company: "Northern Bloom Co.",
  service: "Alpha Team - Web Development",
  rating: 5
}, {
  quote: "Their full-stack SaaS development delivered exactly what we envisioned. The platform is robust, scalable, and was delivered ahead of schedule.",
  name: "Ethan Vance",
  role: "Founder",
  company: "InnovateEd Solutions",
  service: "Sigma Team - SaaS Development",
  rating: 5
}, {
  quote: "Working with the Alpha Team was seamless. They understood our vision and built a website that perfectly represents our brand.",
  name: "Hannah Sterling",
  role: "CEO",
  company: "Summit Creative Agency",
  service: "Alpha Team - Web Development",
  rating: 4.5
}, {
  quote: "The Meta Team's voice AI has revolutionized our customer service. It's efficient, and our customers find it incredibly helpful.",
  name: "Ngozi Okoro",
  role: "Customer Support Head",
  company: "AfriConnect Telecom",
  service: "Meta Team - AI Solutions",
  rating: 4.5
}, {
  quote: "Sigma Team built our entire platform in record time. The AI features they integrated are powerful and give us a competitive edge.",
  name: "Maya Thompson",
  role: "Product Manager",
  company: "Quantum Innovations Group",
  service: "Sigma Team - SaaS Development",
  rating: 5
}, {
  quote: "KRTRIM delivers not just solutions, but real transformation. Our ROI was 300% in the first quarter alone.",
  name: "Liam O'Connell",
  role: "VP Operations",
  company: "Maple Growth Ventures",
  service: "Sigma Team - SaaS Development",
  rating: 5
}, {
  quote: "The AI intelligence in our new chatbot is exceptional. It has significantly improved our customer experience.",
  name: "Sophia Rodriguez",
  role: "Director of CX",
  company: "Elite Service Solutions",
  service: "Meta Team - AI Solutions",
  rating: 4
}, {
  quote: "From concept to deployment, KRTRIM's team made our AI vision a reality. Their expertise is unmatched.",
  name: "Ananya Rao",
  role: "Founder",
  company: "Veda HealthTech",
  service: "Sigma Team - SaaS Development",
  rating: 5
}];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return <div className="flex items-center gap-1 mb-2">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={16} className="text-orange-400 fill-orange-400" />)}
      {halfStar && <StarHalf size={16} className="text-orange-400 fill-orange-400" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={16} className="text-gray-300" />)}
    </div>;
};

const TestimonialCard = ({ testimonial, id }: { testimonial: any, id: string }) => (
  <Card key={id} className="bg-card border border-border/50 p-6 rounded-lg shadow-sm h-full flex flex-col">
    <StarRating rating={testimonial.rating} />
    <p className="text-lg font-medium mb-4 flex-grow">{testimonial.quote}</p>
    <div className="mt-auto">
      <p className="font-bold text-foreground">
        — {testimonial.name}, {testimonial.role} at{" "}
        {testimonial.organizationLink ? (
          <a 
            href={testimonial.organizationLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            {testimonial.company}
          </a>
        ) : (
          testimonial.company
        )}
      </p>
      <p className="text-sm text-muted-foreground">{`(Service: ${testimonial.service})`}</p>
    </div>
  </Card>
);

const LoadingSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const TestimonialsSection = ({ showTestimonials }: TestimonialsSectionProps) => {
  const [firebaseTestimonials, setFirebaseTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews: any[] = [];
      querySnapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      setFirebaseTestimonials(reviews);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching testimonials: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const allTestimonials = [...firebaseTestimonials, ...staticTestimonials];

  return <AnimatedTransition show={showTestimonials} animation="slide-up" duration={600}>
      <div className="relative py-16 md:py-24">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-7xl text-orange-500">
            Trusted by businesses<br />
            worldwide.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {isLoading && (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id || `static-${index}`} 
              testimonial={testimonial} 
              id={testimonial.id || `static-${index}`} 
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <ReviewModal />
        </div>
      </div>
    </AnimatedTransition>;
};