import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import NewPatientFlow from './NewPatientFlow';
import ExistingPatientFlow from './ExistingPatientFlow';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'new-patient' | 'existing-patient' | 'intake-form';
}

export default function AppointmentModal({ isOpen, onClose, defaultTab = 'new-patient' }: AppointmentModalProps) {
  const handleComplete = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold" data-testid="text-modal-title">Book an Appointment</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            data-testid="button-close-modal"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="p-6 pt-4">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="new-patient" data-testid="tab-new-patient">New Patient</TabsTrigger>
              <TabsTrigger value="existing-patient" data-testid="tab-existing-patient">Existing Patient</TabsTrigger>
              <TabsTrigger value="intake-form" data-testid="tab-intake-form">Intake Form</TabsTrigger>
            </TabsList>

            <TabsContent value="new-patient">
              <NewPatientFlow onComplete={handleComplete} onClose={onClose} />
            </TabsContent>

            <TabsContent value="existing-patient">
              <ExistingPatientFlow
                onComplete={handleComplete}
                onClose={onClose}
                onSwitchToNewPatient={() => {
                  const tabsList = document.querySelector('[role="tablist"]');
                  const newPatientTab = tabsList?.querySelector('[value="new-patient"]') as HTMLElement;
                  newPatientTab?.click();
                }}
              />
            </TabsContent>

            <TabsContent value="intake-form">
              <div className="space-y-6 text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mx-auto">
                  <span className="text-4xl">📋</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" data-testid="text-intake-title">Intake Form</h3>
                  <p className="text-muted-foreground" data-testid="text-intake-subtitle">
                    Coming soon: Complete a detailed online assessment before your first visit.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
