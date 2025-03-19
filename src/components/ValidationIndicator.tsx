
import React from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ValidationStatus = "idle" | "validating" | "valid" | "invalid";

interface ValidationIndicatorProps {
  status: ValidationStatus;
  message?: string;
  className?: string;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  status,
  message,
  className
}) => {
  return (
    <div className={cn("flex items-center transition-all duration-300", className)}>
      {status === "idle" ? null : (
        <>
          {status === "validating" && (
            <Loader2 className="h-4 w-4 text-kyc-neutral animate-spin mr-2" />
          )}
          {status === "valid" && (
            <Check className="h-4 w-4 text-kyc-success animate-scale-in mr-2" />
          )}
          {status === "invalid" && (
            <X className="h-4 w-4 text-kyc-error animate-scale-in mr-2" />
          )}
          
          {message && (
            <span 
              className={cn(
                "text-xs font-medium animate-fade-in",
                status === "valid" && "text-kyc-success",
                status === "invalid" && "text-kyc-error",
                status === "validating" && "text-kyc-neutral"
              )}
            >
              {message}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ValidationIndicator;
