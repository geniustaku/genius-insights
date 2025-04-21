'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Fetch files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        // Fetch files from Azure Blob Storage API
        const response = await fetch('/api/admin/media');
        
        if (!response.ok) {
          throw new Error('Failed to fetch media files');
        }
        
        const data = await response.json();
        setFiles(data.files || []);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load media files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFiles();
  }, []);
  
  const handleUploadComplete = (fileData) => {
    // Add the new file to the list
    const newFile = {
      name: fileData.fileName,
      url: fileData.fileUrl,
      contentType: fileData.contentType,
      lastModified: new Date(),
      size: fileData.size || 0
    };
    
    setFiles(prevFiles => [newFile, ...prevFiles]);
  };
  
  const handleFileSelect = (file) => {
    setSelectedFile(selectedFile === file ? null : file);
  };
  
  const handleDeleteFile = async (fileToDelete) => {
    if (!window.confirm(`Are you sure you want to delete "${fileToDelete.name}"?`)) {
      return;
    }
    
    try {
      // Call API to delete the file from Azure Blob Storage
      const response = await fetch(`/api/admin/media/${encodeURIComponent(fileToDelete.name)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete file');
      }
      
      // Remove the deleted file from state
      setFiles(prevFiles => prevFiles.filter(file => file.name !== fileToDelete.name));
      if (selectedFile && selectedFile.name === fileToDelete.name) {
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('Error deleting file:', err);
      alert(err.message || 'Failed to delete file');
    }
  };
  
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
      </div>
      
      {/* Upload Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Media</h2>
        <FileUpload 
          onUploadComplete={handleUploadComplete}
          allowedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']}
          maxSizeMB={5}
        />
      </div>
      
      {/* Media Library */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Your Media Files</h2>
            
            {/* Search input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search files"
              />
            </div>
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="p-12 text-center">
            <svg className="animate-spin h-8 w-8 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Loading your media files...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && !isLoading && (
          <div className="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && !error && files.length === 0 && (
          <div className="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-gray-600">No media files found</p>
            <p className="mt-2 text-gray-500">Start by uploading your first file above.</p>
          </div>
        )}
        
        {/* Media Grid */}
        {!isLoading && !error && files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
            {files.map((file) => (
              <div 
                key={file.name}
                className={`relative border rounded-lg overflow-hidden cursor-pointer ${
                  selectedFile === file ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                }`}
                onClick={() => handleFileSelect(file)}
              >
                {/* Image Preview */}
                <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                  {file.contentType.startsWith('image/') ? (
                    <div className="relative w-full h-32">
                      <Image
                        src={file.url}
                        alt={file.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* File Info */}
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                {/* Selection indicator */}
                {selectedFile === file && (
                  <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* File Details (when selected) */}
      {selectedFile && (
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="flex items-start">
            {/* Preview */}
            <div className="mr-6 w-48">
              {selectedFile.contentType.startsWith('image/') ? (
                <div className="relative h-32 w-48 rounded overflow-hidden">
                  <Image
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedFile.name}</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Type:</span>{' '}
                  <span className="text-gray-900">{selectedFile.contentType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>{' '}
                  <span className="text-gray-900">{formatFileSize(selectedFile.size)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Uploaded:</span>{' '}
                  <span className="text-gray-900">{formatDate(selectedFile.lastModified)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Dimensions:</span>{' '}
                  <span className="text-gray-900">Auto</span>
                </div>
              </div>
              
              {/* URL */}
              <div className="mb-4">
                <label htmlFor="file-url" className="block text-sm font-medium text-gray-700 mb-1">
                  File URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="file-url"
                    id="file-url"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    value={selectedFile.url}
                    readOnly
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => navigator.clipboard.writeText(selectedFile.url)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-3">
                <a
                  href={selectedFile.url}
                  download={selectedFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(selectedFile)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}