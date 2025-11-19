import { Clock, Monitor, UserCheck } from 'lucide-react';

export default function KeyBenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Quick Access',
      description: 'Same-week appointments often available.',
    },
    {
      icon: Monitor,
      title: 'Online & In-Person',
      description: 'Care that fits your lifestyle.',
    },
    {
      icon: UserCheck,
      title: 'Expert Providers',
      description: 'Matched to your unique needs.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card" data-testid="section-benefits">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4"
                data-testid={`benefit-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground" data-testid={`text-benefit-title-${index}`}>
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
