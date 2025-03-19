
import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface UserInfoProps {
  userData: any;
  type: 'aadhaar' | 'pan' | 'bank';
}

const UserInfoCard: React.FC<UserInfoProps> = ({ userData, type }) => {
  if (!userData) return null;

  return (
    <Card className="p-4 mt-4 bg-green-50 border border-green-200 animate-fade-in">
      <div className="flex items-center mb-2">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <h3 className="font-medium text-green-800">Verified Information</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-500 capitalize">{key}</span>
            <span className="font-medium">{value as string}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserInfoCard;
