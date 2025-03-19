
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessPage: React.FC = () => {
  // Animation effect on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8 animate-scale-in">
        <div className="mx-auto h-20 w-20 rounded-full bg-kyc-success bg-opacity-10 flex items-center justify-center">
          <Check className="h-10 w-10 text-kyc-success" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verification Successful</h1>
          <p className="text-gray-500">
            Your KYC details have been successfully verified. You can now proceed with the next steps.
          </p>
        </div>
        
        <div className="pt-4">
          <Link to="/">
            <Button variant="outline" className="space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-kyc-success opacity-10 animate-pulse-light" />
        <div className="absolute bottom-1/3 right-1/3 h-40 w-40 rounded-full bg-kyc-blue opacity-10 animate-pulse-light" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default SuccessPage;
