import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AppointmentModal from '../AppointmentModal';

export default function AppointmentModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Appointment Modal</Button>
      <AppointmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultTab="new-patient"
      />
    </div>
  );
}
