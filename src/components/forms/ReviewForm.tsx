import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Loader2, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  rating: z.number().min(1, { message: "Please provide a rating." }),
  quote: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }),
  organizationLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

interface ReviewFormProps {
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
  isLoading: boolean;
}

export function ReviewForm({ setIsLoading, onSuccess, isLoading }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      rating: 0,
      quote: "",
      organizationLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading || isSuccess) return;

    setIsLoading(true);
    setIsSuccess(false);

    try {
      await addDoc(collection(db, "testimonials"), {
        ...values,
        createdAt: serverTimestamp(),
      });

      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
      });

      setTimeout(() => {
        onSuccess();
        // Reset states for the next time the modal opens
        setIsSuccess(false);
        form.reset();
        setRating(0);
      }, 1500);

    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
      setIsSuccess(false);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* FormFields remain the same */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Doe" {...field} disabled={isLoading || isSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Acme Inc." {...field} disabled={isLoading || isSuccess} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CEO" {...field} disabled={isLoading || isSuccess} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Used</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading || isSuccess}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Alpha Team - Web Development">Alpha Team - Web Development</SelectItem>
                  <SelectItem value="Meta Team - AI Solutions">Meta Team - AI Solutions</SelectItem>
                  <SelectItem value="Sigma Team - SaaS Development">Sigma Team - SaaS Development</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. https://www.example.com" {...field} disabled={isLoading || isSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <Star
                        key={starValue}
                        size={24}
                        className={`cursor-pointer ${
                          starValue <= (hoverRating || rating)
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        } ${isLoading || isSuccess ? 'cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (isLoading || isSuccess) return;
                          setRating(starValue);
                          form.setValue("rating", starValue);
                        }}
                        onMouseEnter={() => !(isLoading || isSuccess) && setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience..."
                  className="min-h-[120px]"
                  {...field}
                  disabled={isLoading || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || isSuccess} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Success!
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </Form>
  );
}
