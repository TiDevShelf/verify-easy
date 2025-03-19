import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ValidationIndicator from "./ValidationIndicator";
import DocumentUpload from "./DocumentUpload";
import FormStepIndicator from "./FormStepIndicator";
import { 
  simulateApiCall, 
  validateAadhaar, 
  validatePAN, 
  validateBankAccount, 
  validateIFSC 
} from "@/utils/validators";

type ValidationStatus = "idle" | "validating" | "valid" | "invalid";

interface ValidationState {
  status: ValidationStatus;
  message?: string;
}

const TOTAL_STEPS = 3;

const KYCForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    accountNumber: "",
    ifsc: "",
    aadhaarFile: null as File | null,
    panFile: null as File | null,
  });
  
  const [validationStates, setValidationStates] = useState({
    aadhaar: { status: "idle" } as ValidationState,
    pan: { status: "idle" } as ValidationState,
    accountNumber: { status: "idle" } as ValidationState,
    ifsc: { status: "idle" } as ValidationState,
  });
  
  // Handle input change with debounced validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset validation status when field is empty
    if (!value.trim()) {
      setValidationStates(prev => ({
        ...prev,
        [name]: { status: "idle" },
      }));
      return;
    }
    
    // Set validation status to validating
    setValidationStates(prev => ({
      ...prev,
      [name]: { status: "validating" },
    }));
    
    // Immediate basic validation
    let basicValidation: { isValid: boolean; message?: string };
    
    switch (name) {
      case "aadhaar":
        basicValidation = validateAadhaar(value);
        break;
      case "pan":
        basicValidation = validatePAN(value);
        break;
      case "accountNumber":
        basicValidation = validateBankAccount(value);
        break;
      case "ifsc":
        basicValidation = validateIFSC(value);
        break;
      default:
        basicValidation = { isValid: false };
    }
    
    // If basic validation fails, update immediately
    if (!basicValidation.isValid) {
      setValidationStates(prev => ({
        ...prev,
        [name]: { 
          status: "invalid", 
          message: basicValidation.message 
        },
      }));
      return;
    }
    
    // Otherwise simulate API validation
    const validationType = name === "accountNumber" ? "bank" : name as "aadhaar" | "pan" | "ifsc";
    
    simulateApiCall(validationType, value)
      .then(result => {
        setValidationStates(prev => ({
          ...prev,
          [name]: { 
            status: result.isValid ? "valid" : "invalid", 
            message: result.isValid ? "Verified" : result.message 
          },
        }));
      });
  };
  
  // File change handlers
  const handleFileChange = (type: "aadhaarFile" | "panFile") => (file: File | null) => {
    setFormData(prev => ({ ...prev, [type]: file }));
  };
  
  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Aadhaar step
        return (
          validationStates.aadhaar.status === "valid" && 
          formData.aadhaarFile !== null
        );
      case 1: // PAN step
        return (
          validationStates.pan.status === "valid" && 
          formData.panFile !== null
        );
      case 2: // Bank step
        return (
          validationStates.accountNumber.status === "valid" && 
          validationStates.ifsc.status === "valid"
        );
      default:
        return false;
    }
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("KYC verification completed successfully!");
      navigate("/success");
    }, 2000);
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="aadhaar" className="text-sm font-medium block">
                Aadhaar Number
              </label>
              <div className="relative">
                <Input
                  id="aadhaar"
                  name="aadhaar"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  className="pr-12"
                  maxLength={12}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIndicator 
                    status={validationStates.aadhaar.status} 
                    message={validationStates.aadhaar.status === "valid" ? "Verified" : validationStates.aadhaar.message} 
                  />
                </div>
              </div>
            </div>
            
            <DocumentUpload
              label="Upload Aadhaar Card"
              onChange={handleFileChange("aadhaarFile")}
              accept="image/jpeg,image/png,application/pdf"
            />
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="pan" className="text-sm font-medium block">
                PAN Number
              </label>
              <div className="relative">
                <Input
                  id="pan"
                  name="pan"
                  placeholder="Enter 10-character PAN"
                  value={formData.pan}
                  onChange={handleInputChange}
                  className="pr-12"
                  maxLength={10}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIndicator 
                    status={validationStates.pan.status} 
                    message={validationStates.pan.status === "valid" ? "Verified" : validationStates.pan.message} 
                  />
                </div>
              </div>
            </div>
            
            <DocumentUpload
              label="Upload PAN Card"
              onChange={handleFileChange("panFile")}
              accept="image/jpeg,image/png,application/pdf"
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="accountNumber" className="text-sm font-medium block">
                Bank Account Number
              </label>
              <div className="relative">
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIndicator 
                    status={validationStates.accountNumber.status} 
                    message={validationStates.accountNumber.status === "valid" ? "Verified" : validationStates.accountNumber.message} 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="ifsc" className="text-sm font-medium block">
                IFSC Code
              </label>
              <div className="relative">
                <Input
                  id="ifsc"
                  name="ifsc"
                  placeholder="Enter IFSC code"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ValidationIndicator 
                    status={validationStates.ifsc.status} 
                    message={validationStates.ifsc.status === "valid" ? "Verified" : validationStates.ifsc.message} 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Render step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Aadhaar Verification";
      case 1:
        return "PAN Verification";
      case 2:
        return "Bank Account Verification";
      default:
        return "KYC Verification";
    }
  };
  
  // Render step description
  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Please enter your 12-digit Aadhaar number and upload a scanned copy of your Aadhaar card.";
      case 1:
        return "Please enter your 10-character PAN number and upload a scanned copy of your PAN card.";
      case 2:
        return "Please enter your bank account details for verification.";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg animate-scale-in">
      <div className="bg-white p-6 sm:p-8">
        <FormStepIndicator
          totalSteps={TOTAL_STEPS}
          currentStep={currentStep}
          className="mb-6"
        />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{getStepTitle()}</h2>
          <p className="text-sm text-muted-foreground">{getStepDescription()}</p>
        </div>
        
        <form className="space-y-8">
          {renderStepContent()}
          
          <div className="pt-2">
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={!isCurrentStepValid() || isSubmitting}
              className="w-full bg-kyc-blue hover:bg-blue-600 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : currentStep === TOTAL_STEPS - 1 ? (
                "Complete Verification"
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default KYCForm;
