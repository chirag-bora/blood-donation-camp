interface Step {
  number: number
  label: string
  labelEn: string
}

interface ProgressBarProps {
  currentStep: number
  steps: Step[]
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step.number < currentStep
                    ? 'bg-blood-700 text-white'
                    : step.number === currentStep
                    ? 'bg-blood-700 text-white ring-4 ring-blood-200'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.number < currentStep ? '✓' : step.number}
              </div>
              <div className="mt-1.5 text-center hidden sm:block">
                <div className={`text-xs font-semibold hindi ${ step.number === currentStep ? 'text-blood-700' : 'text-gray-400' }`}>
                  {step.label}
                </div>
                <div className={`text-xs ${ step.number === currentStep ? 'text-gray-600' : 'text-gray-300' }`}>
                  {step.labelEn}
                </div>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-colors ${ step.number < currentStep ? 'bg-blood-700' : 'bg-gray-200' }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
