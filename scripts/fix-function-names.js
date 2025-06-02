const fs = require('fs');
const path = require('path');

// Function to fix function names in calculator files
function fixFunctionNames() {
  const appDir = path.join(__dirname, '..', 'app');
  
  // Find all calculator page files
  const calculatorFiles = [
    'uk-investment-calculator/page.tsx',
    'uk-loan-calculator/page.tsx', 
    'uk-pension-calculator/page.tsx',
    'uk-property-calculator/page.tsx',
    'uk-vat-calculator/page.tsx',
    'us-401k-calculator/page.tsx',
    'us-investment-calculator/page.tsx',
    'us-loan-calculator/page.tsx',
    'us-property-calculator/page.tsx',
    'us-sales-tax-calculator/page.tsx',
    'us-student-loan-calculator/page.tsx',
    'us-tax-calculator/page.tsx'
  ];

  calculatorFiles.forEach(filePath => {
    const fullPath = path.join(appDir, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix function names
    content = content.replace(/export default function United Kingdom/g, 'export default function UnitedKingdom');
    content = content.replace(/export default function United States/g, 'export default function UnitedStates');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed: ${filePath}`);
  });
  
  console.log('✅ All function names fixed!');
}

// Run the fix
fixFunctionNames();