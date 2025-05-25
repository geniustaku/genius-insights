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
  // 2025 baseline data by industry and country (in local currency) - Based on market research
  const baselineData = {
    'south-africa': { // ZAR
      'tech': 720000,
      'finance': 680000,
      'healthcare': 620000,
      'education': 480000,
      'manufacturing': 550000,
      'retail': 420000,
      'mining': 650000,
      'telecom': 580000,
      'hospitality': 380000,
      'agriculture': 450000,
      'construction': 520000,
      'consulting': 640000
    },
    'nigeria': { // NGN
      'tech': 12500000,
      'finance': 14000000,
      'healthcare': 10000000,
      'education': 7500000,
      'manufacturing': 9000000,
      'retail': 6500000,
      'mining': 11000000,
      'telecom': 10500000,
      'hospitality': 5500000,
      'agriculture': 6000000,
      'construction': 8500000,
      'consulting': 11500000
    },
    'kenya': { // KES
      'tech': 2800000,
      'finance': 3200000,
      'healthcare': 2400000,
      'education': 1600000,
      'manufacturing': 2000000,
      'retail': 1400000,
      'mining': 2600000,
      'telecom': 2500000,
      'hospitality': 1200000,
      'agriculture': 1300000,
      'construction': 1900000,
      'consulting': 2700000
    },
    'ghana': { // GHS
      'tech': 85000,
      'finance': 95000,
      'healthcare': 70000,
      'education': 45000,
      'manufacturing': 60000,
      'retail': 40000,
      'mining': 80000,
      'telecom': 75000,
      'hospitality': 35000,
      'agriculture': 38000,
      'construction': 55000,
      'consulting': 78000
    },
    'egypt': { // EGP
      'tech': 420000,
      'finance': 480000,
      'healthcare': 350000,
      'education': 220000,
      'manufacturing': 300000,
      'retail': 180000,
      'mining': 380000,
      'telecom': 360000,
      'hospitality': 160000,
      'agriculture': 170000,
      'construction': 280000,
      'consulting': 400000
    },
    'morocco': { // MAD
      'tech': 280000,
      'finance': 320000,
      'healthcare': 240000,
      'education': 150000,
      'manufacturing': 200000,
      'retail': 120000,
      'mining': 260000,
      'telecom': 250000,
      'hospitality': 110000,
      'agriculture': 115000,
      'construction': 180000,
      'consulting': 270000
    },
    'ethiopia': { // ETB
      'tech': 780000,
      'finance': 900000,
      'healthcare': 650000,
      'education': 420000,
      'manufacturing': 580000,
      'retail': 350000,
      'mining': 720000,
      'telecom': 680000,
      'hospitality': 300000,
      'agriculture': 320000,
      'construction': 520000,
      'consulting': 750000
    },
    'tanzania': { // TZS
      'tech': 58000000,
      'finance': 65000000,
      'healthcare': 48000000,
      'education': 32000000,
      'manufacturing': 42000000,
      'retail': 28000000,
      'mining': 55000000,
      'telecom': 52000000,
      'hospitality': 25000000,
      'agriculture': 26000000,
      'construction': 38000000,
      'consulting': 56000000
    },
    'uganda': { // UGX
      'tech': 95000000,
      'finance': 108000000,
      'healthcare': 78000000,
      'education': 52000000,
      'manufacturing': 68000000,
      'retail': 45000000,
      'mining': 88000000,
      'telecom': 82000000,
      'hospitality': 38000000,
      'agriculture': 42000000,
      'construction': 62000000,
      'consulting': 92000000
    },
    'rwanda': { // RWF
      'tech': 28000000,
      'finance': 32000000,
      'healthcare': 24000000,
      'education': 16000000,
      'manufacturing': 20000000,
      'retail': 14000000,
      'mining': 26000000,
      'telecom': 25000000,
      'hospitality': 12000000,
      'agriculture': 13000000,
      'construction': 18000000,
      'consulting': 27000000
    },
    'senegal': { // XOF
      'tech': 18000000,
      'finance': 20000000,
      'healthcare': 15000000,
      'education': 10000000,
      'manufacturing': 13000000,
      'retail': 9000000,
      'mining': 17000000,
      'telecom': 16000000,
      'hospitality': 8000000,
      'agriculture': 8500000,
      'construction': 12000000,
      'consulting': 17500000
    },
    'ivory-coast': { // XOF
      'tech': 22000000,
      'finance': 25000000,
      'healthcare': 18000000,
      'education': 12000000,
      'manufacturing': 16000000,
      'retail': 11000000,
      'mining': 20000000,
      'telecom': 19000000,
      'hospitality': 10000000,
      'agriculture': 10500000,
      'construction': 14500000,
      'consulting': 21000000
    },
    'botswana': { // BWP
      'tech': 420000,
      'finance': 480000,
      'healthcare': 350000,
      'education': 230000,
      'manufacturing': 300000,
      'retail': 200000,
      'mining': 450000,
      'telecom': 380000,
      'hospitality': 180000,
      'agriculture': 190000,
      'construction': 280000,
      'consulting': 410000
    },
    'mauritius': { // MUR
      'tech': 1800000,
      'finance': 2000000,
      'healthcare': 1500000,
      'education': 1000000,
      'manufacturing': 1300000,
      'retail': 900000,
      'mining': 1600000,
      'telecom': 1550000,
      'hospitality': 800000,
      'agriculture': 850000,
      'construction': 1200000,
      'consulting': 1750000
    },
    'tunisia': { // TND
      'tech': 85000,
      'finance': 95000,
      'healthcare': 70000,
      'education': 45000,
      'manufacturing': 60000,
      'retail': 40000,
      'mining': 80000,
      'telecom': 75000,
      'hospitality': 35000,
      'agriculture': 38000,
      'construction': 55000,
      'consulting': 82000
    },
    'zambia': { // ZMW
      'tech': 380000,
      'finance': 420000,
      'healthcare': 320000,
      'education': 210000,
      'manufacturing': 280000,
      'retail': 180000,
      'mining': 450000,
      'telecom': 350000,
      'hospitality': 160000,
      'agriculture': 170000,
      'construction': 260000,
      'consulting': 370000
    },
    'zimbabwe': { // ZWL
      'tech': 2800000,
      'finance': 3200000,
      'healthcare': 2400000,
      'education': 1600000,
      'manufacturing': 2100000,
      'retail': 1400000,
      'mining': 2700000,
      'telecom': 2500000,
      'hospitality': 1200000,
      'agriculture': 1300000,
      'construction': 1900000,
      'consulting': 2750000
    },
    'namibia': { // NAD
      'tech': 580000,
      'finance': 650000,
      'healthcare': 480000,
      'education': 320000,
      'manufacturing': 420000,
      'retail': 280000,
      'mining': 620000,
      'telecom': 550000,
      'hospitality': 260000,
      'agriculture': 280000,
      'construction': 400000,
      'consulting': 570000
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
  
  // Currency symbols for all African countries
  const currencySymbols = {
    'south-africa': 'R',
    'nigeria': '₦',
    'kenya': 'KSh',
    'ghana': 'GH₵',
    'egypt': 'E£',
    'morocco': 'MAD',
    'ethiopia': 'ETB',
    'tanzania': 'TSh',
    'uganda': 'UGX',
    'rwanda': 'RWF',
    'senegal': 'CFA',
    'ivory-coast': 'CFA',
    'botswana': 'P',
    'mauritius': '₨',
    'tunisia': 'TND',
    'zambia': 'ZK',
    'zimbabwe': 'ZWL',
    'namibia': 'N$'
  };
  
  const currencySymbol = currencySymbols[country] || '$';
  
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