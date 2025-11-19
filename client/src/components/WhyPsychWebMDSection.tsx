import { Award, Users, Monitor, Heart, Shield, Sparkles } from 'lucide-react';

export default function WhyPsychWebMDSection() {
  const reasons = [
    {
      icon: Award,
      title: 'Evidence-based treatment plans',
    },
    {
      icon: Users,
      title: 'Licensed psychiatric clinicians',
    },
    {
      icon: Monitor,
      title: 'Telehealth and in-person options',
    },
    {
      icon: Heart,
      title: 'Personalized care for all ages',
    },
    {
      icon: Shield,
      title: 'Secure, HIPAA-compliant platform',
    },
    {
      icon: Sparkles,
      title: 'Modern digital experience',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card" data-testid="section-why-psychwebmd">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-why-title">
            Why PsychWebMD?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-why-subtitle">
            Quality mental healthcare you can trust
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4"
                data-testid={`reason-${index}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground" data-testid={`text-reason-title-${index}`}>
                    {reason.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
