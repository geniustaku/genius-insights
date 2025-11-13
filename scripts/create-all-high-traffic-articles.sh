#!/bin/bash

echo "🚀 Creating all high-traffic articles..."
echo ""

# Create remaining 3 SARS articles
node scripts/add-remaining-sars-articles.js

# Create 5 Property articles  
node scripts/add-property-traffic-articles.js

# Create 4 CIPC articles
node scripts/add-cipc-traffic-articles.js

echo ""
echo "✨ All articles created successfully!"
