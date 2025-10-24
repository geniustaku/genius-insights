'use client';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { usePageVisit } from '@/hooks/usePageVisit';

interface ConversionResult {
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}

const DocumentConverter: React.FC = () => {
  // Track page visit
  usePageVisit('/document-converter');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('pdf');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const supportedFormats = {
    input: ['.pdf', '.doc', '.docx', '.xlsx', '.xls', '.pptx', '.ppt', '.odt', '.rtf', '.txt'],
    output: [
      { value: 'pdf', label: 'PDF Document', icon: '📄' },
      { value: 'docx', label: 'Word Document', icon: '📝' },
      { value: 'doc', label: 'Word 97-2003', icon: '📄' },
      { value: 'odt', label: 'OpenDocument Text', icon: '📋' },
      { value: 'rtf', label: 'Rich Text Format', icon: '📄' },
    ]
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setConversionResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'application/rtf': ['.rtf'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB limit
  });

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    return interval;
  };

  const convertDocument = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setConversionResult(null);
    
    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('format', outputFormat);

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 120000)
      );

      const fetchPromise = fetch('http://document-converter-pro.eastus.azurecontainer.io:3000/api/convert', {
        method: 'POST',
        body: formData,
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      clearInterval(progressInterval);
      setProgress(100);

      if (response.ok) {
        // Get the converted file as blob
        const blob = await response.blob();
        const filename = `converted.${outputFormat}`;
        const downloadUrl = URL.createObjectURL(blob);

        setConversionResult({
          success: true,
          filename,
          downloadUrl,
        });

        // Auto-download the file
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const errorText = await response.text();
        setConversionResult({
          success: false,
          error: errorText || 'Conversion failed',
        });
      }
    } catch (error) {
      clearInterval(progressInterval);
      setConversionResult({
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      });
    } finally {
      setIsConverting(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.toLowerCase().split('.').pop();
    const icons: { [key: string]: string } = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      ppt: '📊',
      pptx: '📊',
      odt: '📋',
      rtf: '📄',
      txt: '📝',
    };
    return icons[extension || ''] || '📄';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl">🔄</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Converter</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Convert your documents between PDF, Word, Excel, and PowerPoint formats instantly. 
          Free, secure, and no registration required.
        </p>
      </div>

      {/* Main Converter Interface */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* File Upload Area */}
        <div className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            
            {selectedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{selectedFile.name}</h3>
                  <p className="text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setConversionResult(null);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isDragActive ? 'Drop your file here' : 'Choose or drag a file'}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Supports: PDF, Word, Excel, PowerPoint, OpenDocument, RTF, TXT
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Maximum file size: 50MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Format Selection */}
          {selectedFile && (
            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Convert to:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {supportedFormats.output.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setOutputFormat(format.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      outputFormat === format.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{format.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{format.value.toUpperCase()}</div>
                    <div className="text-xs text-gray-500 mt-1">{format.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Convert Button */}
          {selectedFile && (
            <div className="mt-8 text-center">
              <button
                onClick={convertDocument}
                disabled={isConverting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
              >
                {isConverting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Convert Document</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Progress Bar */}
          {isConverting && (
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                {progress < 30 ? 'Uploading...' : progress < 70 ? 'Converting...' : 'Almost done...'}
              </p>
            </div>
          )}

          {/* Conversion Result */}
          {conversionResult && (
            <div className={`mt-8 p-6 rounded-xl ${
              conversionResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {conversionResult.success ? (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Conversion Successful! 🎉
                  </h3>
                  <p className="text-green-700 mb-4">
                    Your file has been converted and should start downloading automatically.
                  </p>
                  {conversionResult.downloadUrl && (
                    <a
                      href={conversionResult.downloadUrl}
                      download={conversionResult.filename}
                      className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Again</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Conversion Failed
                  </h3>
                  <p className="text-red-700">
                    {conversionResult.error || 'An error occurred during conversion. Please try again.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-xl">🔒</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">100% Secure</h3>
          <p className="text-gray-600 text-sm">Your files are processed securely and deleted immediately after conversion.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-xl">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm">Advanced LibreOffice engine ensures quick and accurate conversions.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-xl">🆓</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Completely Free</h3>
          <p className="text-gray-600 text-sm">No registration, no limits, no watermarks. Just pure conversion power.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentConverter;