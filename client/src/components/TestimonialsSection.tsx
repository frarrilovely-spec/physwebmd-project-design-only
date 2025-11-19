import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'The process was easy and I felt truly heard. My provider is wonderful.',
      author: 'PsychWebMD Patient',
    },
    {
      quote: 'Same-week appointment! I was struggling and they got me in quickly.',
      author: 'PsychWebMD Patient',
    },
    {
      quote: 'Telehealth visits are so convenient. Great care from the comfort of home.',
      author: 'PsychWebMD Patient',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card" data-testid="section-testimonials">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 hover-elevate"
              data-testid={`card-testimonial-${index}`}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground italic" data-testid={`text-testimonial-quote-${index}`}>
                "{testimonial.quote}"
              </p>
              <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-author-${index}`}>
                — {testimonial.author}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
