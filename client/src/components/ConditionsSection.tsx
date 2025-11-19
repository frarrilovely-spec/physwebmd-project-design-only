import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function ConditionsSection() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const conditions = [
    { name: 'Anxiety', description: 'Comprehensive treatment for generalized anxiety, panic disorder, and phobias.' },
    { name: 'Depression', description: 'Evidence-based care for major depression and persistent depressive disorder.' },
    { name: 'ADHD', description: 'Diagnosis and management for children, teens, and adults with attention difficulties.' },
    { name: 'Bipolar Disorder', description: 'Specialized treatment for mood stabilization and symptom management.' },
    { name: 'OCD', description: 'Expert care for obsessive-compulsive disorder using proven therapeutic approaches.' },
    { name: 'PTSD', description: 'Trauma-informed treatment for post-traumatic stress and related conditions.' },
    { name: 'Postpartum Mood Disorders', description: 'Compassionate care for perinatal and postpartum mental health.' },
    { name: 'Personality Disorders', description: 'Long-term treatment approaches for personality-related difficulties.' },
    { name: 'Substance Use', description: 'Integrated addiction treatment and dual diagnosis support.' },
    { name: 'Children & Adolescents', description: 'Specialized pediatric psychiatry and therapy services.' },
    { name: 'Couples & Families', description: 'Relationship counseling and family therapy sessions.' },
  ];

  return (
    <section id="conditions" className="py-16 md:py-24 bg-background" data-testid="section-conditions">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-conditions-title">
            Conditions We Treat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-conditions-subtitle">
            Comprehensive care for a wide range of mental health concerns
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {conditions.map((condition, index) => (
            <Badge
              key={index}
              variant={selectedCondition === condition.name ? 'default' : 'secondary'}
              className="cursor-pointer text-sm py-2 px-4 hover-elevate active-elevate-2"
              onClick={() => setSelectedCondition(condition.name)}
              data-testid={`badge-condition-${index}`}
            >
              {condition.name}
            </Badge>
          ))}
        </div>

        {selectedCondition && (
          <div
            className="max-w-2xl mx-auto p-6 rounded-md bg-card border border-card-border text-center"
            data-testid="text-condition-description"
          >
            <h3 className="font-semibold text-lg text-foreground mb-2">
              {selectedCondition}
            </h3>
            <p className="text-muted-foreground">
              {conditions.find((c) => c.name === selectedCondition)?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
