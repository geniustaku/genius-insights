'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryResources({ categorySlug }) {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Resource type icons and descriptions
  const resourceTypes = {
    'salary-guide': {
      title: 'Salary Guide',
      icon: '💰',
      description: 'Explore South African compensation trends and ZAR benchmarks'
    },
    'career-roadmap': {
      title: 'Career Roadmap',
      icon: '🗺️',
      description: 'Step-by-step progression from entry-level to senior positions in South Africa'
    },
    'skill-assessment': {
      title: 'Skill Assessment',
      icon: '📊',
      description: 'Evaluate your skills and identify areas for professional growth in the South African market'
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/resources?category=${categorySlug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        
        const data = await response.json();
        setResources(data.resources || []);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, [categorySlug]);

  // Group resources by type
  const getResourcesByType = (type) => {
    return resources.filter(resource => resource.type === type)[0];
  };

  if (isLoading) {
    return (
      <section className="bg-gray-50 p-8 rounded-xl mt-12">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((placeholder) => (
            <div key={placeholder} className="animate-pulse bg-white p-6 rounded-lg shadow-sm">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Create default resource cards
  const renderResourceCard = (type) => {
    const resource = getResourcesByType(type);
    const typeInfo = resourceTypes[type] || {
      title: type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' '),
      icon: '📄',
      description: 'View this resource'
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">{typeInfo.title}</h3>
        <p className="text-gray-600 mb-4">
          {typeInfo.description}
        </p>
        <Link 
          href={resource ? `/resources/${categorySlug}/${type}/${resource.slug}` : `/resources/${categorySlug}/${type}`}
          className="text-indigo-600 font-medium hover:text-indigo-800"
        >
          View Resource →
        </Link>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 p-8 rounded-xl mt-12">
      <h2 className="text-3xl font-bold mb-6">South African Career Resources</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.keys(resourceTypes).map(type => (
          renderResourceCard(type)
        ))}
      </div>
    </section>
  );
}