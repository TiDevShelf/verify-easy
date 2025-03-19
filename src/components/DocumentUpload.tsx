
import React, { useState, useCallback, useRef } from "react";
import { UploadCloud, File, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFile } from "@/utils/validators";
import ValidationIndicator from "./ValidationIndicator";

interface DocumentUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  onChange,
  accept = "image/jpeg,image/png,application/pdf",
  maxSize = 5, // 5MB default
  className
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      onChange(null);
      return;
    }
    
    const validation = validateFile(selectedFile);
    
    if (!validation.isValid) {
      setError(validation.message || "Invalid file");
      return;
    }
    
    setFile(selectedFile);
    onChange(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For PDF, show a generic icon
      setPreview(null);
    }
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [handleFile]);

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith("image/")) {
      return <Image className="h-6 w-6 text-kyc-blue" />;
    }
    
    return <File className="h-6 w-6 text-kyc-blue" />;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium block">{label}</label>
      
      <div
        className={cn(
          "file-upload-zone transition-all duration-300 relative",
          isDragging && "file-upload-zone-active",
          error ? "border-kyc-error bg-red-50" : file ? "border-kyc-success bg-green-50 bg-opacity-20" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className="sr-only"
          ref={inputRef}
          accept={accept}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center py-4">
            <UploadCloud className="h-10 w-10 text-kyc-neutral mb-3" />
            <p className="text-sm font-medium">Drag & drop or click to upload</p>
            <p className="text-xs text-kyc-neutral mt-1">
              JPG, PNG or PDF (max {maxSize}MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 bg-white rounded border">
            <div className="flex items-center space-x-3">
              {preview ? (
                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded bg-kyc-light-blue flex items-center justify-center">
                  {getFileIcon()}
                </div>
              )}
              
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-kyc-neutral">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      {error ? (
        <ValidationIndicator 
          status="invalid" 
          message={error} 
          className="mt-1" 
        />
      ) : null}
    </div>
  );
};

export default DocumentUpload;
