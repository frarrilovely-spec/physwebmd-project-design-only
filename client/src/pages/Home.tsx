import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import KeyBenefitsSection from '@/components/KeyBenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ProvidersSection from '@/components/ProvidersSection';
import ConditionsSection from '@/components/ConditionsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsuranceSection from '@/components/InsuranceSection';
import WhyPsychWebMDSection from '@/components/WhyPsychWebMDSection';
import CallToActionSection from '@/components/CallToActionSection';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultTab, setModalDefaultTab] = useState<'new-patient' | 'existing-patient' | 'intake-form'>('new-patient');

  const handleBookAppointment = (tab: 'new-patient' | 'existing-patient' | 'intake-form' = 'new-patient') => {
    setModalDefaultTab(tab);
    setIsModalOpen(true);
  };

  const handleLearnMore = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBookAppointment={() => handleBookAppointment()} />

      <HeroSection
        onBookAppointment={() => handleBookAppointment()}
        onLearnMore={handleLearnMore}
        onSelectPath={handleBookAppointment}
      />

      <KeyBenefitsSection />

      <HowItWorksSection />

      <ProvidersSection />

      <ConditionsSection />

      <TestimonialsSection />

      <InsuranceSection />

      <WhyPsychWebMDSection />

      <CallToActionSection onBookAppointment={() => handleBookAppointment()} />

      <Footer />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={modalDefaultTab}
      />
    </div>
  );
}
