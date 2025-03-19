
import React from "react";
import { cn } from "@/lib/utils";

interface FormStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
  totalSteps,
  currentStep,
  className
}) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index} 
          className={cn(
            "h-1 rounded-full transition-all duration-300 ease-out",
            currentStep === index 
              ? "bg-kyc-blue w-8" 
              : index < currentStep 
                ? "bg-kyc-blue w-6" 
                : "bg-kyc-neutral bg-opacity-20 w-6"
          )}
        />
      ))}
    </div>
  );
};

export default FormStepIndicator;
