import ExistingPatientFlow from '../ExistingPatientFlow';

export default function ExistingPatientFlowExample() {
  return (
    <div className="p-8 bg-background max-w-3xl mx-auto">
      <ExistingPatientFlow
        onComplete={() => console.log('Flow completed')}
        onClose={() => console.log('Flow closed')}
        onSwitchToNewPatient={() => console.log('Switch to new patient')}
      />
    </div>
  );
}
