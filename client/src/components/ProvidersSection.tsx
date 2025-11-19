import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import drSarahNguyen from '@assets/generated_images/Dr_Sarah_Nguyen_headshot_184933b2.png';
import drMichaelChen from '@assets/generated_images/Dr_Michael_Chen_headshot_c1f26429.png';
import drEmilyRodriguez from '@assets/generated_images/Dr_Emily_Rodriguez_headshot_ef4fab0d.png';
import drJamesWilliams from '@assets/generated_images/Dr_James_Williams_headshot_20195cf8.png';

export default function ProvidersSection() {
  const providers = [
    {
      name: 'Dr. Sarah Nguyen, MD',
      role: 'Psychiatrist',
      specialties: 'Anxiety & Mood Disorders',
      image: drSarahNguyen,
      initials: 'SN',
    },
    {
      name: 'Dr. Michael Chen, MD',
      role: 'Psychiatrist',
      specialties: 'ADHD & Adult Psychiatry',
      image: drMichaelChen,
      initials: 'MC',
    },
    {
      name: 'Dr. Emily Rodriguez, PsyD',
      role: 'Clinical Psychologist',
      specialties: 'Trauma & PTSD',
      image: drEmilyRodriguez,
      initials: 'ER',
    },
    {
      name: 'Dr. James Williams, MD',
      role: 'Psychiatrist',
      specialties: 'Addiction & Dual Diagnosis',
      image: drJamesWilliams,
      initials: 'JW',
    },
  ];

  return (
    <section id="providers" className="py-16 md:py-24 bg-card" data-testid="section-providers">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-providers-title">
            Our Expert Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-providers-subtitle">
            Board-certified psychiatrists and psychologists ready to help
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider, index) => (
            <Card
              key={index}
              className="p-6 text-center space-y-4 hover-elevate"
              data-testid={`card-provider-${index}`}
            >
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={provider.image} alt={provider.name} />
                <AvatarFallback>{provider.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground mb-1" data-testid={`text-provider-name-${index}`}>
                  {provider.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2" data-testid={`text-provider-role-${index}`}>
                  {provider.role}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`text-provider-specialties-${index}`}>
                  {provider.specialties}
                </p>
              </div>
              <Badge variant="secondary" className="w-fit mx-auto" data-testid={`badge-provider-status-${index}`}>
                Accepting new patients
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
