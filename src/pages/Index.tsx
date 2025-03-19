
import React from "react";
import KYCForm from "@/components/KYCForm";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">KYC Verification</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Complete your KYC verification by providing your identity and bank details. This is a secure and encrypted process.
          </p>
        </div>
        
        <KYCForm />
        
        <div className="max-w-lg mx-auto mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your data is encrypted and secure. We comply with all data protection regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
