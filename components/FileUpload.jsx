'use client';

import { useState } from 'react';

export default function FileUpload({ onUploadComplete, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'], maxSizeMB = 5 }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Reset states
    setError(null);
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`File type not allowed. Please upload ${allowedTypes.join(', ')} only.`);
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds the limit of ${maxSizeMB}MB.`);
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadProgress(10); // Initial progress
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate progress (in a real app, you might use an upload progress event)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Upload file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }
      
      // Set progress to 100% and complete
      setUploadProgress(100);
      
      const data = await response.json();
      
      // Call the callback with the uploaded file data
      if (onUploadComplete) {
        onUploadComplete(data);
      }
      
      // Reset the file input
      event.target.value = '';
      
      // Reset states after a short delay to show the 100% progress
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload file');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload File
        </label>
        <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-3">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Click to upload
            </span>
            {' or drag and drop'}
          </p>
          <p className="text-xs text-gray-500">
            {allowedTypes.join(', ')} up to {maxSizeMB}MB
          </p>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept={allowedTypes.join(',')}
            disabled={isUploading}
          />
        </div>
      </div>
      
      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full mt-2">
          <div className="bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-right">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}