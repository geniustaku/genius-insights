#!/bin/bash

# Script to add AdSense ads to calculator pages

# Array of calculator pages that need ads
PAGES=(
  "south-africa-business-registration-calculator"
  "south-africa-fnb-calculator"
  "south-africa-fuel-cost-calculator"
  "south-africa-standard-bank-calculator"
)

for PAGE in "${PAGES[@]}"; do
  FILE="/Users/genius/genius/app/$PAGE/page.tsx"

  if [ -f "$FILE" ]; then
    echo "Processing $PAGE..."

    # Check if AdSenseAd import already exists
    if ! grep -q "import AdSenseAd from" "$FILE"; then
      # Add AdSenseAd import after StructuredData import or at top
      if grep -q "import StructuredData" "$FILE"; then
        sed -i '' "/import StructuredData/a\\
import AdSenseAd from '@/components/AdSenseAd';
" "$FILE"
      else
        # Add import after first import line
        sed -i '' "1a\\
import AdSenseAd from '@/components/AdSenseAd';
" "$FILE"
      fi
      echo "  ✓ Added AdSenseAd import"
    else
      echo "  - AdSenseAd already imported"
    fi

  else
    echo "  ✗ File not found: $FILE"
  fi
done

echo "Done!"
