import { Button } from '@/components/ui/button';

interface CallToActionSectionProps {
  onBookAppointment: () => void;
}

export default function CallToActionSection({ onBookAppointment }: CallToActionSectionProps) {
  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
      data-testid="section-cta"
    >
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-cta-title">
          Ready to begin your care?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
          Same-week appointments may be available
        </p>
        <Button size="lg" onClick={onBookAppointment} data-testid="button-cta-book">
          Book Appointment →
        </Button>
      </div>
    </section>
  );
}
