// lib/utils.js

/**
 * Format a date string to a more readable format
 * @param {string|Date|object} dateString - The date to format (can be Firebase Timestamp)
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString) {
  let date;
  
  // Handle Firebase Timestamp objects
  if (dateString && typeof dateString === 'object' && dateString.toDate) {
    date = dateString.toDate();
  } else if (dateString && typeof dateString === 'object' && dateString.seconds) {
    // Handle Firestore Timestamp object
    date = new Date(dateString.seconds * 1000);
  } else {
    date = new Date(dateString);
  }
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Format the date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Create a slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} - The slugified text
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    .trim();
}

/**
 * Calculate reading time for a given text
 * @param {string} text - The text to calculate reading time for
 * @param {number} wordsPerMinute - Average reading speed in words per minute
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Truncate text to a specified length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) {
    return text;
  }
  
  // Truncate at the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex === -1) {
    return truncated + '...';
  }
  
  return truncated.substring(0, lastSpaceIndex) + '...';
}

/**
 * Group articles by category
 * @param {Array} articles - Array of article objects
 * @returns {Object} - Object with categories as keys and arrays of articles as values
 */
export function groupArticlesByCategory(articles) {
  return articles.reduce((grouped, article) => {
    const category = article.category;
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(article);
    return grouped;
  }, {});
}

/**
 * Format a salary range for display with South African currency
 * @param {number} min - Minimum salary
 * @param {number} max - Maximum salary
 * @param {string} currency - Currency symbol
 * @returns {string} - Formatted salary range
 */
export function formatSalaryRange(min, max, currency = 'R') {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };
  
  return `${currency}${formatNumber(min)} - ${currency}${formatNumber(max)}`;
}

/**
 * Calculate approximate after-tax salary based on South African tax brackets
 * @param {number} grossAnnual - Gross annual salary in ZAR
 * @returns {number} - Approximate after-tax annual salary
 */
export function calculateSouthAfricanAfterTaxSalary(grossAnnual) {
  // South African tax brackets for 2024/2025 (approximate)
  let tax = 0;
  
  if (grossAnnual <= 237100) {
    tax = grossAnnual * 0.18;
  } else if (grossAnnual <= 370500) {
    tax = 42678 + (grossAnnual - 237100) * 0.26;
  } else if (grossAnnual <= 512800) {
    tax = 77362 + (grossAnnual - 370500) * 0.31;
  } else if (grossAnnual <= 673000) {
    tax = 121475 + (grossAnnual - 512800) * 0.36;
  } else if (grossAnnual <= 857900) {
    tax = 179147 + (grossAnnual - 673000) * 0.39;
  } else if (grossAnnual <= 1817000) {
    tax = 251258 + (grossAnnual - 857900) * 0.41;
  } else {
    tax = 644489 + (grossAnnual - 1817000) * 0.45;
  }
  
  // Primary rebate
  const primaryRebate = 17235;
  tax = Math.max(0, tax - primaryRebate);
  
  return grossAnnual - tax;
}

/**
 * Format salary as monthly or annual with proper South African notation
 * @param {number} amount - Salary amount
 * @param {string} period - 'monthly' or 'annual'
 * @returns {string} - Formatted salary with period
 */
export function formatSouthAfricanSalary(amount, period = 'annual') {
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  const formatted = formatter.format(amount);
  
  if (period === 'monthly') {
    return `${formatted} per month`;
  } else {
    return `${formatted} per annum`;
  }
}