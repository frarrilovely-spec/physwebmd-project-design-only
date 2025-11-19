import { Button } from '@/components/ui/button';
import { Shield, Users, CheckCircle2 } from 'lucide-react';
import StartYourJourneyCard from './StartYourJourneyCard';
import heroBackground from '@assets/generated_images/Hero_background_gradient_bd7eaad5.png';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onLearnMore: () => void;
  onSelectPath: (path: 'new-patient' | 'existing-patient' | 'intake-form') => void;
}

export default function HeroSection({ onBookAppointment, onLearnMore, onSelectPath }: HeroSectionProps) {
  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(23, 184, 166, 0.05) 0%, rgba(23, 184, 166, 0.02) 100%), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-testid="section-hero"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              <div className="text-foreground">Personalized Behavioral</div>
              <div className="text-foreground">Healthcare</div>
              <div className="text-primary mt-2">Anywhere. Anytime.</div>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl" data-testid="text-hero-subtitle">
              Compassionate psychiatric care designed around your needs. Online or in-person visits,
              with insurance accepted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onBookAppointment} data-testid="button-hero-book">
                Book Appointment →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onLearnMore}
                data-testid="button-hero-learn-more"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span data-testid="text-hipaa-badge">HIPAA-compliant & secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span data-testid="text-insurance-badge">Major insurance accepted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span data-testid="text-patients-badge">5,000+ patients cared for</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <StartYourJourneyCard onSelectPath={onSelectPath} />
          </div>
        </div>
      </div>
    </section>
  );
}
