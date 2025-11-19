import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onBookAppointment: () => void;
}

export default function Header({ onBookAppointment }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky
          ? 'bg-card/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
      data-testid="header-main"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary" data-testid="logo-text">
            PsychWebMD
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-how-it-works"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('providers')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-providers"
            >
              Providers
            </button>
            <button
              onClick={() => scrollToSection('conditions')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-conditions"
            >
              Conditions
            </button>
            <button
              onClick={() => scrollToSection('insurance')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="link-insurance"
            >
              Insurance
            </button>
            <Button onClick={onBookAppointment} data-testid="button-book-appointment">
              Book Appointment
            </Button>
          </nav>

          <Button
            onClick={onBookAppointment}
            className="md:hidden"
            data-testid="button-book-appointment-mobile"
          >
            Book
          </Button>
        </div>
      </div>
    </header>
  );
}
