import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      onBookAppointment={() => console.log('Book appointment')}
      onLearnMore={() => console.log('Learn more')}
      onSelectPath={(path) => console.log('Selected path:', path)}
    />
  );
}
