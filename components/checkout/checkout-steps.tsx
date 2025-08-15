import { Check } from "lucide-react"
import type { CheckoutStep } from "./checkout-page"

interface CheckoutStepsProps {
  currentStep: CheckoutStep
}

const steps = [
  { key: "address", label: "Adresse", number: 1 },
  { key: "delivery", label: "Livraison", number: 2 },
  { key: "payment", label: "Paiement", number: 3 },
  { key: "confirmation", label: "Confirmation", number: 4 },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === currentStep)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const isUpcoming = index > currentStepIndex

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary bg-background"
                        : "border-muted-foreground text-muted-foreground bg-background"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-colors ${isCompleted ? "bg-primary" : "bg-muted-foreground/30"}`} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Step Labels */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-foreground">
          Étape {currentStepIndex + 1} sur {steps.length}: {steps[currentStepIndex]?.label}
        </p>
      </div>
    </div>
  )
}
