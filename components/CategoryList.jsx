'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Icons mapping for visual representation
  const categoryIcons = {
    'Software Development': '💻',
    'Data Science': '📊',
    'Cloud Computing': '☁️',
    // Add more mappings as you add more categories
  };
  
  // Color classes mapping for visual styling
  const categoryColors = {
    'Software Development': 'bg-blue-100 text-blue-700',
    'Data Science': 'bg-green-100 text-green-700',
    'Cloud Computing': 'bg-purple-100 text-purple-700',
    // Add more mappings as you add more categories
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((placeholder) => (
          <div key={placeholder} className="animate-pulse bg-white rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }
  
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((category) => {
        // Get the icon or use a default one
        const icon = categoryIcons[category.name] || '📈';
        
        // Get the color class or use a default one
        const colorClass = categoryColors[category.name] || 'bg-gray-100 text-gray-700';
        
        return (
          <Link 
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center mb-4 text-xl`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-600">
              {category.description || `Explore career options in ${category.name}`}
            </p>
          </Link>
        );
      })}
    </div>
  );
}