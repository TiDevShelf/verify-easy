
/**
 * KYC Validation Utility Functions
 */

// Aadhaar validation - 12 digits
export const validateAadhaar = (aadhaar: string): { isValid: boolean; message?: string } => {
  const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
  
  if (!aadhaar) {
    return { isValid: false, message: "Aadhaar number is required" };
  }
  
  if (!aadhaarRegex.test(aadhaar)) {
    return { 
      isValid: false, 
      message: "Invalid Aadhaar format. It should be a 12-digit number not starting with 0 or 1" 
    };
  }
  
  // In a real implementation, this would call the UIDAI API
  // For now, we'll do a simple validation for demonstration
  
  return { isValid: true };
};

// PAN validation - 10 characters with specific pattern
export const validatePAN = (pan: string): { isValid: boolean; message?: string } => {
  // PAN format: AAAPL1234C (5 alphabets, 4 numbers, 1 alphabet)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  
  if (!pan) {
    return { isValid: false, message: "PAN number is required" };
  }
  
  if (!panRegex.test(pan)) {
    return { 
      isValid: false, 
      message: "Invalid PAN format. Should be 5 uppercase letters, 4 numbers, and 1 uppercase letter" 
    };
  }
  
  // In a real implementation, this would call the NSDL API
  // For now, we'll do a simple validation for demonstration
  
  return { isValid: true };
};

// Bank Account validation
export const validateBankAccount = (accountNumber: string): { isValid: boolean; message?: string } => {
  if (!accountNumber) {
    return { isValid: false, message: "Account number is required" };
  }
  
  // Most bank accounts in India have 9-18 digits
  if (!/^\d{9,18}$/.test(accountNumber)) {
    return { 
      isValid: false, 
      message: "Invalid account number format. Should be 9-18 digits" 
    };
  }
  
  // In a real implementation, this would call a bank validation API
  // For now, we'll do a simple validation for demonstration
  
  return { isValid: true };
};

// IFSC validation
export const validateIFSC = (ifsc: string): { isValid: boolean; message?: string } => {
  // IFSC format: AAAA0123456 (4 alphabets representing bank, 0 for reserve, and 6 alphanumeric for branch)
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
  if (!ifsc) {
    return { isValid: false, message: "IFSC code is required" };
  }
  
  if (!ifscRegex.test(ifsc)) {
    return { 
      isValid: false, 
      message: "Invalid IFSC format. Should be 4 uppercase letters, 0, and 6 alphanumeric characters" 
    };
  }
  
  // In a real implementation, this would validate against an IFSC directory
  // For now, we'll do a simple validation for demonstration
  
  return { isValid: true };
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
): Promise<{ isValid: boolean; message?: string }> => {
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
