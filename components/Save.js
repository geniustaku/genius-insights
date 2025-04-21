"use client";

import { useState } from 'react';

export default function SaveButton() {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    // In a real app, this would save the article to the user's account
    setSaved(true);
    // You could also call an API here to save the article
  };

  return (
    <button 
      className={`flex items-center gap-2 ${
        saved ? 'text-blue-600 bg-blue-50' : 'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-blue-600'
      } transition-colors px-4 py-2 rounded-lg`}
      onClick={handleSave}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill={saved ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
      <span>{saved ? 'Saved' : 'Save for later'}</span>
    </button>
  );
}