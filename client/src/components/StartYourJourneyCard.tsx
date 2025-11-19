import { Card } from '@/components/ui/card';
import { ChevronRight, UserPlus, Calendar, FileText } from 'lucide-react';

interface StartYourJourneyCardProps {
  onSelectPath: (path: 'new-patient' | 'existing-patient' | 'intake-form') => void;
}

export default function StartYourJourneyCard({ onSelectPath }: StartYourJourneyCardProps) {
  const paths = [
    {
      id: 'new-patient' as const,
      icon: UserPlus,
      title: 'New Patient',
      subtitle: 'First-time comprehensive evaluation',
    },
    {
      id: 'existing-patient' as const,
      icon: Calendar,
      title: 'Existing Patient',
      subtitle: 'Follow-up or ongoing care',
    },
    {
      id: 'intake-form' as const,
      icon: FileText,
      title: 'Intake Form',
      subtitle: 'Complete detailed assessment',
    },
  ];

  return (
    <Card className="p-6 md:p-8 w-full max-w-md hover-elevate" data-testid="card-journey">
      <h3 className="text-2xl font-bold mb-2 text-foreground" data-testid="text-journey-title">
        Get Started
      </h3>
      <p className="text-muted-foreground mb-6" data-testid="text-journey-subtitle">
        Choose how you'd like to begin care.
      </p>

      <div className="space-y-3">
        {paths.map((path) => {
          const Icon = path.icon;
          return (
            <button
              key={path.id}
              onClick={() => onSelectPath(path.id)}
              className="w-full flex items-center gap-4 p-4 rounded-md border border-card-border bg-card hover-elevate active-elevate-2 transition-all text-left group"
              data-testid={`button-${path.id}`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground" data-testid={`text-${path.id}-title`}>
                  {path.title}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`text-${path.id}-subtitle`}>
                  {path.subtitle}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
