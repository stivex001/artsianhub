"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FileText, X } from 'lucide-react';

interface FileUploadProps {
  title: string;
  description: string;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  onFileUpload?: (file: File | null) => void;
}

export const DocsUploader: React.FC<FileUploadProps> = ({
  title,
  description,
  acceptedTypes = ".svg,.png,.jpg,.jpeg,.gif",
  maxSize = 10,
  onFileUpload
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Check file size (convert MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
    
    if (!acceptedTypesArray.includes(fileExtension)) {
      alert(`Please upload a valid file type: ${acceptedTypes}`);
      return;
    }

    setUploadedFile(file);
    onFileUpload?.(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    onFileUpload?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : uploadedFile
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {uploadedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <FileText className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
            >
              <X className="h-4 w-4" />
              Remove file
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="text-primary hover:text-blue-700 font-medium"
                >
                  Click to upload
                </button>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                SVG, PNG, JPG or GIF (max. {maxSize}MB)
              </p>
            </div>
            <div className="text-xs text-gray-400">OR</div>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};