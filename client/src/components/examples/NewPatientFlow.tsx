import NewPatientFlow from '../NewPatientFlow';

export default function NewPatientFlowExample() {
  return (
    <div className="p-8 bg-background max-w-3xl mx-auto">
      <NewPatientFlow
        onComplete={() => console.log('Flow completed')}
        onClose={() => console.log('Flow closed')}
      />
    </div>
  );
}
