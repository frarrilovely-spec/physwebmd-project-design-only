import { AlertCircle } from 'lucide-react';

export default function Footer() {
  const links = {
    Care: ['How It Works', 'Providers', 'Conditions'],
    Patients: ['New Patients', 'Existing Patients', 'FAQs'],
    Company: ['About', 'Careers', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service'],
  };

  return (
    <footer className="bg-card border-t border-card-border py-12" data-testid="footer-main">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4" data-testid={`text-footer-category-${category.toLowerCase()}`}>
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      data-testid={`link-footer-${item.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-card-border">
          <div className="flex items-start gap-3 p-4 rounded-md bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground" data-testid="text-crisis-disclaimer">
              <strong>Crisis Resources:</strong> If you are in crisis or considering harming yourself,
              call 911 or go to the nearest emergency room immediately. This platform is not for emergencies.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground" data-testid="text-copyright">
          © {new Date().getFullYear()} PsychWebMD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
