import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { Pencil } from 'lucide-react';

export function ReviewModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    // The form will handle the success animation, we just need to close the modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent closing if it's loading
      if (isLoading) return;
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-primary/20 text-foreground border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold dark:shadow-[0_0_15px_rgba(251,146,60,0.2)] dark:hover:shadow-[0_0_25px_rgba(251,146,60,0.4)]"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Leave a Review
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-lg"
        onEscapeKeyDown={(e) => {
          if (isLoading) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
        hideCloseButton={isLoading}
      >
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            We'd love to hear your feedback. Please fill out the form below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[80vh] overflow-y-auto hide-scrollbar">
          <ReviewForm 
            setIsLoading={setIsLoading} 
            onSuccess={handleSuccess} 
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
