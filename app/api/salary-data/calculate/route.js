// app/api/salary-data/calculate/route.js
import { executeQuery } from '@/lib/db';

export async function POST(request) {
  try {
    const { industry, experience, education, location, country } = await request.json();
    
    // Validate required fields
    if (!industry || !experience || !education || !location || !country) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // In a production app, you would query your database here
    // For now, we'll use the fallback calculation
    return calculateFallbackSalary(industry, experience, education, location, country);
    
  } catch (error) {
    console.error('Salary calculation error:', error);
    return Response.json(
      { error: 'Failed to calculate salary' },
      { status: 500 }
    );
  }
}

// Fallback function when database doesn't have specific data
function calculateFallbackSalary(industry, experience, education, location, country) {
  // 2025 baseline data by industry and country (in local currency)
  const baselineData = {
    'south-africa': {
      'tech': 650000,
      'finance': 600000,
      'healthcare': 550000,
      'education': 450000,
      'manufacturing': 500000,
      'retail': 400000,
      'mining': 580000,
      'telecom': 520000,
      'hospitality': 380000,
      'agriculture': 420000,
      'construction': 480000,
      'consulting': 580000
    },
    'nigeria': {
      'tech': 9500000, // Naira
      'finance': 11000000,
      'healthcare': 8000000,
      'education': 5500000,
      'default': 7000000
    },
    'kenya': {
      'tech': 2300000, // Kenyan Shilling
      'finance': 2500000,
      'healthcare': 1800000,
      'education': 1200000,
      'default': 1500000
    },
    'default': {
      'tech': 45000, // USD equivalent
      'finance': 50000,
      'healthcare': 40000,
      'education': 30000,
      'default': 35000
    }
  };
  
  const experienceMultiplier = {
    'entry': 0.7,
    'mid': 1.0,
    'senior': 1.5,
    'executive': 2.2
  };
  
  const locationFactor = {
    'south-africa': {
      'johannesburg': 1.1,
      'cape-town': 1.05,
      'durban': 0.95,
      'pretoria': 1.0,
      'default': 0.9
    },
    'nigeria': {
      'lagos': 1.15,
      'abuja': 1.1,
      'default': 0.9
    },
    'kenya': {
      'nairobi': 1.1,
      'mombasa': 1.0,
      'default': 0.9
    },
    'default': {
      'default': 1.0
    }
  };
  
  const educationBonus = {
    'south-africa': {
      'high-school': 0,
      'diploma': 30000,
      'bachelor': 70000,
      'honors': 100000,
      'masters': 150000,
      'phd': 250000
    },
    'nigeria': {
      'high-school': 0,
      'diploma': 500000,
      'bachelor': 1000000,
      'masters': 2000000,
      'phd': 3500000
    },
    'kenya': {
      'high-school': 0,
      'diploma': 150000,
      'bachelor': 300000,
      'masters': 600000,
      'phd': 900000
    },
    'default': {
      'high-school': 0,
      'diploma': 2000,
      'bachelor': 5000,
      'masters': 10000,
      'phd': 15000
    }
  };
  
  // Get appropriate baseline data
  const countryData = baselineData[country] || baselineData['default'];
  const baseSalary = countryData[industry] || countryData['default'] || 35000;
  
  // Get modifiers
  const expMultiplier = experienceMultiplier[experience] || 1.0;
  
  const countryLocationData = locationFactor[country] || locationFactor['default'];
  const locFactor = countryLocationData[location] || countryLocationData['default'] || 1.0;
  
  const countryEduData = educationBonus[country] || educationBonus['default'];
  const eduBonus = countryEduData[education] || 0;
  
  // Calculate salary
  const estimatedSalary = (baseSalary * expMultiplier * locFactor) + eduBonus;
  
  // Get job titles and location names
  const industryNames = {
    'tech': 'Technology & IT',
    'finance': 'Finance & Banking',
    'healthcare': 'Healthcare & Medical',
    'education': 'Education & Academia',
    'manufacturing': 'Manufacturing & Production',
    'retail': 'Retail & E-commerce',
    'mining': 'Mining & Resources',
    'telecom': 'Telecommunications',
    'hospitality': 'Hospitality & Tourism',
    'agriculture': 'Agriculture & Farming',
    'construction': 'Construction & Engineering',
    'consulting': 'Consulting & Professional Services'
  };
  
  const experienceNames = {
    'entry': 'Entry Level (0-2 years)',
    'mid': 'Mid Level (3-5 years)',
    'senior': 'Senior Level (6-10 years)',
    'executive': 'Executive Level (10+ years)'
  };
  
  const jobTitles = {
    'tech': {
      'entry': 'Junior Developer',
      'mid': 'Software Developer',
      'senior': 'Senior Developer',
      'executive': 'IT Director'
    },
    'finance': {
      'entry': 'Financial Analyst',
      'mid': 'Senior Analyst',
      'senior': 'Finance Manager',
      'executive': 'Finance Director'
    },
    // Add more mappings as needed
    'default': {
      'entry': 'Junior Professional',
      'mid': 'Professional',
      'senior': 'Senior Professional',
      'executive': 'Director'
    }
  };
  
  const locationNames = {
    'south-africa': {
      'johannesburg': 'Johannesburg',
      'cape-town': 'Cape Town',
      'durban': 'Durban',
      'pretoria': 'Pretoria',
      'port-elizabeth': 'Port Elizabeth (Gqeberha)',
      'bloemfontein': 'Bloemfontein'
    },
    'nigeria': {
      'lagos': 'Lagos',
      'abuja': 'Abuja'
    },
    'kenya': {
      'nairobi': 'Nairobi',
      'mombasa': 'Mombasa'
    }
  };
  
  // Get job title
  const industryTitles = jobTitles[industry] || jobTitles['default'];
  const jobTitle = industryTitles[experience] || industryTitles['default'] || 'Professional';
  
  // Get location name
  const countryLocations = locationNames[country] || {};
  const locationName = countryLocations[location] || location;
  
  // Get industry name
  const industryName = industryNames[industry] || industry;
  
  // Get experience name
  const experienceName = experienceNames[experience] || experience;
  
  // Skills by industry
  const skillsByIndustry = {
    'tech': ['JavaScript', 'React', 'Python', 'Cloud Architecture', 'Data Analysis'],
    'finance': ['Financial Analysis', 'Risk Management', 'Banking Systems', 'Regulatory Compliance'],
    'healthcare': ['Patient Care', 'Healthcare Administration', 'Medical Records', 'Clinical Research'],
    'education': ['Curriculum Development', 'E-Learning', 'Student Assessment', 'Educational Psychology'],
    'manufacturing': ['Supply Chain', 'Quality Control', 'Process Optimization', 'Lean Manufacturing'],
    'retail': ['Inventory Management', 'Customer Experience', 'E-commerce', 'Visual Merchandising'],
    'mining': ['Mineral Processing', 'Safety Management', 'Environmental Compliance', 'Geological Analysis'],
    'telecom': ['Network Infrastructure', '5G Technologies', 'Telecom Regulations', 'Service Development'],
    'hospitality': ['Customer Service', 'Event Management', 'Hospitality Operations', 'Revenue Management'],
    'agriculture': ['Crop Management', 'Agricultural Technology', 'Sustainable Farming', 'Supply Chain Management'],
    'construction': ['Project Management', 'Civil Engineering', 'Building Information Modeling', 'Safety Protocols'],
    'consulting': ['Business Analysis', 'Process Improvement', 'Change Management', 'Strategic Planning']
  };
  
  const inDemandSkills = skillsByIndustry[industry] || ['Communication', 'Leadership', 'Project Management'];
  
  // Currency symbols
  let currencySymbol = 'R'; // Default to South African Rand
  if (country === 'nigeria') currencySymbol = '₦';
  else if (country === 'kenya') currencySymbol = 'KSh';
  else if (country === 'ghana') currencySymbol = 'GH₵';
  else if (country === 'egypt') currencySymbol = 'E£';
  else if (!['south-africa', 'tanzania', 'ethiopia', 'uganda', 'morocco', 'rwanda'].includes(country)) {
    currencySymbol = '$'; // Default to USD for other countries
  }
  
  return Response.json({
    currency: currencySymbol,
    average: Math.round(estimatedSalary),
    low: Math.round(estimatedSalary * 0.85),
    high: Math.round(estimatedSalary * 1.15),
    jobTitle: jobTitle,
    locationName: locationName,
    industryName: industryName,
    experienceName: experienceName,
    inDemandSkills: inDemandSkills
  });
}