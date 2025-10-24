#!/bin/bash

# Azure Functions Deployment Script for Genius Insights
# This script deploys your news import function to Azure

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Azure Functions Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Configuration
RESOURCE_GROUP="genius-insights-rg"
LOCATION="southafricawest"
STORAGE_ACCOUNT="geniusinsightssa"
FUNCTION_APP="genius-insights-functions"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed"
    echo "Install it from: https://aka.ms/azure-cli"
    exit 1
fi

# Check if logged in
echo "🔐 Checking Azure login..."
if ! az account show &> /dev/null; then
    echo "Please login to Azure:"
    az login
fi

echo ""
echo "📦 Current subscription:"
az account show --query "{Name:name, ID:id}" -o table
echo ""

read -p "Continue with this subscription? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 1
fi

# Create Resource Group (if doesn't exist)
echo ""
echo "📁 Creating resource group..."
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --output none || true

# Create Storage Account (if doesn't exist)
echo "💾 Creating storage account..."
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --kind StorageV2 \
  --output none 2>/dev/null || echo "Storage account already exists"

# Create Function App (if doesn't exist)
echo "⚡ Creating function app..."
az functionapp create \
  --resource-group $RESOURCE_GROUP \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name $FUNCTION_APP \
  --storage-account $STORAGE_ACCOUNT \
  --os-type Linux \
  --output none 2>/dev/null || echo "Function app already exists"

# Configure App Settings
echo "⚙️  Configuring environment variables..."

# Read current settings
read -p "Enter your website URL (default: https://www.genius-insights.co.za): " WEBSITE_URL
WEBSITE_URL=${WEBSITE_URL:-https://www.genius-insights.co.za}

read -p "Enter your News API key (press enter to keep existing): " NEWS_API_KEY
if [ ! -z "$NEWS_API_KEY" ]; then
  az functionapp config appsettings set \
    --name $FUNCTION_APP \
    --resource-group $RESOURCE_GROUP \
    --settings "NEWS_API_KEY=$NEWS_API_KEY" \
    --output none
fi

az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings "WEBSITE_URL=$WEBSITE_URL" \
  --output none

echo "✅ Configuration updated"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
cd azure-functions
npm install --production

# Deploy Function
echo ""
echo "🚀 Deploying function to Azure..."
func azure functionapp publish $FUNCTION_APP --javascript

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Function App: $FUNCTION_APP"
echo "Resource Group: $RESOURCE_GROUP"
echo "Schedule: Every 6 hours (0 0 */6 * * *)"
echo ""
echo "📊 View logs:"
echo "   az functionapp log tail --name $FUNCTION_APP --resource-group $RESOURCE_GROUP"
echo ""
echo "🌐 View in portal:"
echo "   https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$FUNCTION_APP"
echo ""
echo "💰 Estimated monthly cost: R0.00 (within free tier)"
echo ""
