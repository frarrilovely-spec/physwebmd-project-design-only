export default function InsuranceSection() {
  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna',
    'UnitedHealthcare',
    'Optum',
    'Medicare',
  ];

  return (
    <section id="insurance" className="py-16 md:py-24 bg-background" data-testid="section-insurance">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-insurance-title">
            Insurance Partners
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-insurance-subtitle">
            PsychWebMD partners with many major insurance providers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {insuranceProviders.map((provider, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 rounded-md bg-card border border-card-border min-h-[100px]"
              data-testid={`card-insurance-${index}`}
            >
              <span className="text-center font-semibold text-sm text-muted-foreground">
                {provider}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground" data-testid="text-insurance-verification">
          We'll verify your benefits before your appointment
        </p>
      </div>
    </section>
  );
}
