
/**
 * KYC Validation Utility Functions
 */

// Mock user data for simulation
const mockUserData = {
  aadhaar: {
    "123456789012": {
      name: "Rahul Sharma",
      dob: "15-04-1985",
      gender: "Male",
      address: "123 Main St, Mumbai, Maharashtra"
    },
    "234567890123": {
      name: "Priya Patel",
      dob: "23-08-1990",
      gender: "Female",
      address: "456 Park Avenue, Delhi, New Delhi"
    }
  },
  pan: {
    "ABCPD1234E": {
      name: "Rahul Sharma",
      father: "Vikram Sharma",
      dob: "15-04-1985"
    },
    "PQRST5678F": {
      name: "Priya Patel",
      father: "Rajesh Patel",
      dob: "23-08-1990"
    }
  },
  bank: {
    "12345678901": {
      name: "Rahul Sharma",
      bank: "State Bank of India",
      branch: "Mumbai Main"
    },
    "98765432109": {
      name: "Priya Patel",
      bank: "HDFC Bank",
      branch: "Delhi Central"
    }
  }
};

// Aadhaar validation - 12 digits
export const validateAadhaar = (aadhaar: string): { isValid: boolean; message?: string; userData?: any } => {
  const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
  
  if (!aadhaar) {
    return { isValid: false, message: "Aadhaar number is required" };
  }
  
  // For demo purposes, accept these test numbers directly without further validation
  if (aadhaar === "123456789012" || aadhaar === "234567890123") {
    return { isValid: true, userData: mockUserData.aadhaar[aadhaar] };
  }
  
  // Remove spaces or special characters if present in the input
  const cleanedAadhaar = aadhaar.replace(/\s+/g, "").replace(/-/g, "");
  
  if (!aadhaarRegex.test(cleanedAadhaar)) {
    return { 
      isValid: false, 
      message: "Invalid Aadhaar format. It should be a 12-digit number not starting with 0 or 1" 
    };
  }
  
  // For other numbers, check in mockUserData
  const userData = mockUserData.aadhaar[cleanedAadhaar];
  if (userData) {
    return { isValid: true, userData };
  }
  
  // For demo purposes, let's consider any 12-digit number as valid without verification in the demo data
  if (cleanedAadhaar.length === 12 && !isNaN(Number(cleanedAadhaar))) {
    // Return a generic user profile for testing
    return { 
      isValid: true, 
      userData: {
        name: "Demo User",
        dob: "01-01-1990",
        gender: "Not Specified",
        address: "Demo Address, India"
      }
    };
  }
  
  return { isValid: false, message: "Aadhaar not found in our records" };
};

// PAN validation - 10 characters with specific pattern
export const validatePAN = (pan: string): { isValid: boolean; message?: string; userData?: any } => {
  // PAN format: AAAPL1234C (5 alphabets, 4 numbers, 1 alphabet)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  
  if (!pan) {
    return { isValid: false, message: "PAN number is required" };
  }
  
  // For demo purposes, accept these test numbers directly
  if (pan === "ABCPD1234E" || pan === "PQRST5678F") {
    return { isValid: true, userData: mockUserData.pan[pan] };
  }
  
  // Convert to uppercase for validation
  const cleanedPan = pan.toUpperCase().replace(/\s+/g, "");
  
  if (!panRegex.test(cleanedPan)) {
    return { 
      isValid: false, 
      message: "Invalid PAN format. Should be 5 uppercase letters, 4 numbers, and 1 uppercase letter" 
    };
  }
  
  // For other numbers, check in mockUserData
  const userData = mockUserData.pan[cleanedPan];
  if (userData) {
    return { isValid: true, userData };
  }
  
  // For demo purposes, let's consider any valid format PAN as valid
  if (panRegex.test(cleanedPan)) {
    return { 
      isValid: true, 
      userData: {
        name: "Demo User",
        father: "Demo Father",
        dob: "01-01-1990"
      }
    };
  }
  
  return { isValid: false, message: "PAN not found in our records" };
};

// Bank Account validation
export const validateBankAccount = (accountNumber: string): { isValid: boolean; message?: string; userData?: any } => {
  if (!accountNumber) {
    return { isValid: false, message: "Account number is required" };
  }
  
  // For demo purposes, accept these test numbers directly
  if (accountNumber === "12345678901" || accountNumber === "98765432109") {
    return { isValid: true, userData: mockUserData.bank[accountNumber] };
  }
  
  // Remove spaces if present in the input
  const cleanedAccountNumber = accountNumber.replace(/\s+/g, "");
  
  // Most bank accounts in India have 9-18 digits
  if (!/^\d{9,18}$/.test(cleanedAccountNumber)) {
    return { 
      isValid: false, 
      message: "Invalid account number format. Should be 9-18 digits" 
    };
  }
  
  // For other numbers, check in mockUserData
  const userData = mockUserData.bank[cleanedAccountNumber];
  if (userData) {
    return { isValid: true, userData };
  }
  
  // For demo purposes, consider any account number with valid format as valid
  return { 
    isValid: true, 
    userData: {
      name: "Demo User",
      bank: "Demo Bank",
      branch: "Demo Branch"
    }
  };
};

// IFSC validation
export const validateIFSC = (ifsc: string): { isValid: boolean; message?: string } => {
  // IFSC format: AAAA0123456 (4 alphabets representing bank, 0 for reserve, and 6 alphanumeric for branch)
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
  if (!ifsc) {
    return { isValid: false, message: "IFSC code is required" };
  }
  
  // Convert to uppercase and remove spaces
  const cleanedIFSC = ifsc.toUpperCase().replace(/\s+/g, "");
  
  if (!ifscRegex.test(cleanedIFSC)) {
    return { 
      isValid: false, 
      message: "Invalid IFSC format. Should be 4 uppercase letters, 0, and 6 alphanumeric characters" 
    };
  }
  
  // For demo purposes, let's consider these test codes as valid
  if (cleanedIFSC === "SBIN0123456" || cleanedIFSC === "HDFC0123456") {
    return { isValid: true };
  }
  
  // For demo purposes, consider any IFSC with valid format as valid
  if (ifscRegex.test(cleanedIFSC)) {
    return { isValid: true };
  }
  
  return { isValid: false, message: "IFSC code not found in our records" };
};

// File validation for document uploads
export const validateFile = (file: File | null): { isValid: boolean; message?: string } => {
  if (!file) {
    return { isValid: false, message: "File is required" };
  }
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    return { 
      isValid: false, 
      message: "Invalid file type. Please upload JPG, PNG or PDF" 
    };
  }
  
  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      message: "File size exceeds 5MB. Please upload a smaller file" 
    };
  }
  
  return { isValid: true };
};

// For demonstration purposes, we'll simulate API calls with timeouts
export const simulateApiCall = (
  type: 'aadhaar' | 'pan' | 'bank' | 'ifsc',
  value: string
): Promise<{ isValid: boolean; message?: string; userData?: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'aadhaar':
          resolve(validateAadhaar(value));
          break;
        case 'pan':
          resolve(validatePAN(value));
          break;
        case 'bank':
          resolve(validateBankAccount(value));
          break;
        case 'ifsc':
          resolve(validateIFSC(value));
          break;
        default:
          resolve({ isValid: false, message: "Invalid validation type" });
      }
    }, 800); // Simulate network delay
  });
};
