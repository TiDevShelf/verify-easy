
import React from "react";
import { Card } from "@/components/ui/card";
import { Check, User, Calendar, MapPin, Building, Users } from "lucide-react";

interface UserInfoProps {
  userData: Record<string, string>;
  type: 'aadhaar' | 'pan' | 'bank';
}

const UserInfoCard: React.FC<UserInfoProps> = ({ userData, type }) => {
  if (!userData) return null;

  // Get appropriate icon for each field
  const getIcon = (key: string) => {
    switch (key) {
      case 'name':
        return <User className="h-4 w-4 text-gray-500" />;
      case 'dob':
        return <Calendar className="h-4 w-4 text-gray-500" />;
      case 'address':
        return <MapPin className="h-4 w-4 text-gray-500" />;
      case 'bank':
      case 'branch':
        return <Building className="h-4 w-4 text-gray-500" />;
      case 'father':
        return <Users className="h-4 w-4 text-gray-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get formatted label for each field
  const getLabel = (key: string): string => {
    const labels: Record<string, string> = {
      name: "Full Name",
      dob: "Date of Birth",
      gender: "Gender",
      address: "Address",
      father: "Father's Name",
      bank: "Bank Name",
      branch: "Branch"
    };
    
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <Card className="p-4 mt-4 bg-green-50 border border-green-200 animate-fade-in">
      <div className="flex items-center mb-3">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <h3 className="font-medium text-green-800">
          {type === 'aadhaar' ? 'Aadhaar' : type === 'pan' ? 'PAN' : 'Bank'} Verified Successfully
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <div className="mr-2">{getIcon(key)}</div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">{getLabel(key)}</span>
              <span className="font-medium">{value as string}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserInfoCard;
