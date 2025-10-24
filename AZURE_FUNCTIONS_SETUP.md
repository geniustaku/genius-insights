# 🚀 Azure Functions Setup Guide - Genius Insights

This guide will help you deploy your news import function to Azure Functions that runs automatically every 6 hours.

## 💰 Cost: FREE (within free tier limits)

**Free Tier Includes:**
- 1 million executions/month
- 400,000 GB-seconds compute/month

**Your Usage:**
- 120 executions/month (4 times/day × 30 days)
- ~0.336 GB-seconds/month
- **Cost: R0.00** ✅

---

## 📋 Prerequisites

1. **Azure Account** - [Sign up for free](https://azure.microsoft.com/free/)
2. **Azure CLI** - Install command line tools
3. **Azure Functions Core Tools** - For deployment

### Install Azure CLI

**macOS:**
```bash
brew update && brew install azure-cli
```

**Windows:**
```bash
# Download from: https://aka.ms/azure-cli
# Or use Chocolatey:
choco install azure-cli
```

**Linux:**
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Install Azure Functions Core Tools

**macOS:**
```bash
brew tap azure/functions
brew install azure-functions-core-tools@4
```

**Windows:**
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

**Linux:**
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

---

## 🚀 Quick Deployment (Automated)

We've created a deployment script that does everything for you!

```bash
# Run the deployment script
npm run deploy:azure

# Or directly:
bash scripts/deploy-azure-functions.sh
```

The script will:
1. Login to Azure (if needed)
2. Create Resource Group
3. Create Storage Account
4. Create Function App
5. Configure environment variables
6. Deploy your function

---

## 🔧 Manual Deployment (Step by Step)

If you prefer to deploy manually or understand what's happening:

### Step 1: Login to Azure

```bash
az login
```

### Step 2: Create Resources

```bash
# Set your variables
RESOURCE_GROUP="genius-insights-rg"
LOCATION="southafricawest"  # Closest to South Africa
STORAGE_ACCOUNT="geniusinsightssa"
FUNCTION_APP="genius-insights-functions"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Create storage account
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS

# Create Function App (Consumption Plan = cheapest)
az functionapp create \
  --resource-group $RESOURCE_GROUP \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name $FUNCTION_APP \
  --storage-account $STORAGE_ACCOUNT \
  --os-type Linux
```

### Step 3: Configure Environment Variables

```bash
# Set your website URL
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings "WEBSITE_URL=https://www.genius-insights.co.za"

# Set News API key
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings "NEWS_API_KEY=6bffbb338ace4364bd138d765b4c36a7"
```

### Step 4: Deploy Function

```bash
# Navigate to functions directory
cd azure-functions

# Install dependencies
npm install

# Deploy to Azure
func azure functionapp publish genius-insights-functions
```

---

## ⏰ Timer Schedule Configuration

Your function runs on this schedule (in `azure-functions/NewsArticleImporter/function.json`):

```json
{
  "schedule": "0 0 */3 * * *"
}
```

**This means:** Every 3 hours - **8 times per day**

**Runs at (UTC):**
- 12:00 AM (2:00 AM SAST)
- 3:00 AM (5:00 AM SAST)
- 6:00 AM (8:00 AM SAST)
- 9:00 AM (11:00 AM SAST)
- 12:00 PM (2:00 PM SAST)
- 3:00 PM (5:00 PM SAST)
- 6:00 PM (8:00 PM SAST)
- 9:00 PM (11:00 PM SAST)

### Change Schedule

Edit `azure-functions/NewsArticleImporter/function.json`:

```json
// Every hour
"0 0 * * * *"

// Every day at 8 AM UTC
"0 0 8 * * *"

// Every 12 hours
"0 0 */12 * * *"

// Every Monday at 9 AM
"0 0 9 * * 1"

// Multiple times: 6 AM, 12 PM, 6 PM
"0 0 6,12,18 * * *"
```

**Format:** `{second} {minute} {hour} {day} {month} {day-of-week}`

After changing, redeploy:
```bash
npm run deploy:azure
```

---

## 🔍 Monitor Your Function

### View Logs in Real-Time

```bash
az functionapp log tail \
  --name genius-insights-functions \
  --resource-group genius-insights-rg
```

### View in Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: Resource Groups → genius-insights-rg → genius-insights-functions
3. Click "Functions" → "NewsArticleImporter"
4. Click "Monitor" tab to see execution history

### Check Last Run

```bash
# View recent invocations
az functionapp function show \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  --function-name NewsArticleImporter
```

---

## 🧪 Test Locally Before Deploying

```bash
cd azure-functions

# Install dependencies
npm install

# Start local development server
func start

# Your function will be available at:
# http://localhost:7071/admin/functions/NewsArticleImporter

# Test manually by triggering it
curl http://localhost:7071/admin/functions/NewsArticleImporter
```

---

## 🛡️ Security Best Practices

### 1. Don't Commit Secrets

The `.gitignore` already excludes:
- `local.settings.json`
- Firebase credentials
- `.env` files

### 2. Use Azure Key Vault (Optional, for production)

```bash
# Create Key Vault
az keyvault create \
  --name genius-insights-kv \
  --resource-group genius-insights-rg \
  --location southafricawest

# Store secrets
az keyvault secret set \
  --vault-name genius-insights-kv \
  --name "NewsAPIKey" \
  --value "your-api-key"

# Reference in Function App
az functionapp config appsettings set \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  --settings "NEWS_API_KEY=@Microsoft.KeyVault(SecretUri=https://genius-insights-kv.vault.azure.net/secrets/NewsAPIKey/)"
```

---

## 📊 Monitoring & Alerts

### Set Up Email Alerts

1. Go to Azure Portal → Function App
2. Click "Alerts" → "New alert rule"
3. Add condition: "Failed requests" > 3
4. Add action: Send email to your email
5. Save alert

### Application Insights (Optional)

Enable detailed monitoring:

```bash
az functionapp config appsettings set \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  --settings "APPINSIGHTS_INSTRUMENTATIONKEY=your-key"
```

---

## 🔄 Update Your Function

When you make changes to the code:

```bash
# Option 1: Use deployment script
npm run deploy:azure

# Option 2: Deploy manually
cd azure-functions
func azure functionapp publish genius-insights-functions
```

---

## ❌ Troubleshooting

### Function Not Running

```bash
# Check if function is enabled
az functionapp function show \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  --function-name NewsArticleImporter

# Restart function app
az functionapp restart \
  --name genius-insights-functions \
  --resource-group genius-insights-rg
```

### Check Error Logs

```bash
# View recent errors
az functionapp log tail \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  | grep -i error
```

### API Not Accessible

Make sure your website URL is correct:

```bash
az functionapp config appsettings list \
  --name genius-insights-functions \
  --resource-group genius-insights-rg \
  | grep WEBSITE_URL
```

---

## 🗑️ Delete Resources (If Needed)

To stop everything and delete all Azure resources:

```bash
# Delete entire resource group (removes everything)
az group delete \
  --name genius-insights-rg \
  --yes \
  --no-wait

# This will stop all charges immediately
```

---

## 💡 Tips

1. **Test locally first** - Always test with `func start` before deploying
2. **Check logs regularly** - Monitor for errors in the first few days
3. **Adjust schedule** - Change timer based on how often you want new articles
4. **Monitor costs** - Set up budget alerts in Azure Portal (should be R0)
5. **Backup function code** - Keep it in git (already done!)

---

## 📞 Support

- **Azure Functions Docs**: https://learn.microsoft.com/azure/azure-functions/
- **Pricing Calculator**: https://azure.microsoft.com/pricing/calculator/
- **Azure Support**: https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade

---

## ✅ Checklist

Before deploying:
- [ ] Azure account created
- [ ] Azure CLI installed
- [ ] Azure Functions Core Tools installed
- [ ] Logged in to Azure (`az login`)
- [ ] Tested function locally (`func start`)
- [ ] Updated `WEBSITE_URL` if needed
- [ ] Verified News API key is valid

After deploying:
- [ ] Check function appears in Azure Portal
- [ ] View logs to confirm first run
- [ ] Set up monitoring/alerts
- [ ] Test by checking new articles appear on site
- [ ] Verify costs in Azure Portal (should be R0)

---

## 🎉 Success!

Your function is now running automatically every 6 hours, importing fresh South African business news to your site!

**Next Steps:**
1. Monitor for 24 hours to ensure it's working
2. Check your website for new articles
3. Adjust schedule if needed
4. Set up email alerts for failures

Happy automating! 🚀
