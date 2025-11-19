import { Waypoints, FileEdit, UserCog, Activity } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: Waypoints,
      title: 'Choose your care path',
      description: 'New or existing patient, or complete an intake.',
    },
    {
      number: 2,
      icon: FileEdit,
      title: 'Complete a brief intake',
      description: 'Answer structured questions about your symptoms and goals.',
    },
    {
      number: 3,
      icon: UserCog,
      title: 'Get matched with a provider',
      description: 'We pair you with a licensed clinician who fits your needs.',
    },
    {
      number: 4,
      icon: Activity,
      title: 'Start treatment',
      description: 'Begin therapy or medication management online or in-person.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background" data-testid="section-how-it-works">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-subtitle">
            Getting started is simple and straightforward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative text-center space-y-4"
                data-testid={`step-${step.number}`}
              >
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                  <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground" data-testid={`text-step-title-${step.number}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${step.number}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
