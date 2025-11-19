import Stepper from '../Stepper';

export default function StepperExample() {
  const labels = ['Verify', 'About You', 'Concerns', 'Insurance', 'Questions', 'Emergency Contact', 'Schedule', 'Review'];
  
  return (
    <div className="p-8 bg-background max-w-2xl mx-auto">
      <Stepper currentStep={3} totalSteps={8} labels={labels} />
    </div>
  );
}
