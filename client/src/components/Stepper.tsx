interface StepperProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function Stepper({ currentStep, totalSteps, labels }: StepperProps) {
  return (
    <div className="mb-8" data-testid="stepper">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground" data-testid="text-stepper-progress">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          data-testid="progress-bar"
        />
      </div>

      {labels && labels.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground" data-testid="text-stepper-label">
          {labels[currentStep - 1]}
        </div>
      )}
    </div>
  );
}
