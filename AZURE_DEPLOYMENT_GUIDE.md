# Azure Function Deployment Guide (Windows)

## Current Status
✅ Function App Configuration:
- Name: genius-insights-news
- Resource Group: genius-insights-rg
- Runtime: Node.js 22 LTS
- Operating System: Windows
- Hosting Plan: Consumption (FREE)
- Region: South Africa North
- Schedule: Every 3 hours (8 times/day)

## Next Steps

### 1. Complete Azure Portal Setup

Once your Function App finishes deploying in Azure Portal (takes 2-3 minutes):

1. Click **"Go to resource"** button
2. You'll be taken to your Function App overview page

### 2. Configure Environment Variables

In the Azure Portal, configure your environment variables:

1. In the left menu, click **"Configuration"** (under Settings)
2. Click **"+ New application setting"**
3. Add these two settings:

   **Setting 1:**
   - Name: `NEWS_API_KEY`
   - Value: `6bffbb338ace4364bd138d765b4c36a7`

   **Setting 2:**
   - Name: `WEBSITE_URL`
   - Value: `https://www.genius-insights.co.za` (or `http://localhost:3000` for testing)

4. Click **"Save"** at the top
5. Click **"Continue"** when prompted

### 3. Deploy Your Function Code

Open your terminal and run these commands:

```bash
# Navigate to your project
cd /Users/genius/genius

# Install Azure Functions Core Tools (if not installed)
npm install -g azure-functions-core-tools@4

# Install dependencies in azure-functions folder
cd azure-functions
npm install

# Login to Azure (if not logged in)
az login

# Deploy the function
func azure functionapp publish genius-insights-news
```

### 4. Verify Deployment

After deployment completes:

1. Go back to Azure Portal
2. Navigate to your Function App: **genius-insights-news**
3. Click **"Functions"** in the left menu
4. You should see **"NewsArticleImporter"** listed
5. Click on it to see details

### 5. Test the Function

Run your function manually to test:

```bash
# In Azure Portal
1. Go to your Function App
2. Click "Functions" → "NewsArticleImporter"
3. Click "Code + Test" in the left menu
4. Click "Test/Run" button at the top
5. Click "Run" to execute

# Or via CLI
az functionapp function invoke \
  --resource-group genius-insights-rg \
  --name genius-insights-news \
  --function-name NewsArticleImporter
```

### 6. Monitor Function Executions

View logs in real-time:

```bash
# Via CLI
az functionapp log tail \
  --resource-group genius-insights-rg \
  --name genius-insights-news

# Or in Azure Portal
1. Go to your Function App
2. Click "Functions" → "NewsArticleImporter"
3. Click "Monitor" in the left menu
4. View execution history and logs
```

## Function Schedule

Your function will run automatically **every 3 hours**:

| Time (SAST) | Time (UTC) | Execution # |
|-------------|------------|-------------|
| 02:00 AM    | 00:00 UTC  | 1           |
| 05:00 AM    | 03:00 UTC  | 2           |
| 08:00 AM    | 06:00 UTC  | 3           |
| 11:00 AM    | 09:00 UTC  | 4           |
| 02:00 PM    | 12:00 UTC  | 5           |
| 05:00 PM    | 15:00 UTC  | 6           |
| 08:00 PM    | 18:00 UTC  | 7           |
| 11:00 PM    | 21:00 UTC  | 8           |

**Total: 8 executions per day = 240 per month**

## Cost Breakdown

### Free Tier Limits:
- 1,000,000 executions/month
- 400,000 GB-seconds/month

### Your Usage:
- Executions: 240/month (0.024% of limit)
- Compute time: ~240 seconds/month (0.06% of limit)

**Monthly Cost: R0.00** ✅ Well within free tier!

## Features Included

✅ **Full Article Content Extraction** - Uses web scraping to get complete articles (900+ words instead of snippets)
✅ **Comprehensive SEO** - Auto-generates keywords, titles, descriptions, Open Graph tags
✅ **Article Visit Tracking** - Tracks page visits for all articles
✅ **Smart Categorization** - Automatically categorizes articles (Business, Banking, Property, Tax, Insurance)
✅ **South African Context** - Adds relevant SA context boxes to articles
✅ **Source Attribution** - Professional source attribution at end of articles
✅ **Duplicate Prevention** - Filters out duplicate articles by URL
✅ **Quality Filtering** - Only imports valid, SA-related articles

## Troubleshooting

### Deployment fails with "unauthorized"
```bash
# Re-login to Azure
az login
```

### Function not appearing after deployment
- Wait 2-3 minutes for deployment to complete
- Refresh Azure Portal page
- Check deployment logs in terminal

### Function fails with "NEWS_API_KEY not found"
- Go to Azure Portal → Function App → Configuration
- Verify environment variables are saved
- Restart Function App

### Articles not importing to website
- Check WEBSITE_URL is correct (https://www.genius-insights.co.za)
- Verify your website is accessible from internet
- Check Function logs for error messages

## Useful Commands

```bash
# View Function App settings
az functionapp config appsettings list \
  --resource-group genius-insights-rg \
  --name genius-insights-news

# Restart Function App
az functionapp restart \
  --resource-group genius-insights-rg \
  --name genius-insights-news

# View all functions in app
az functionapp function list \
  --resource-group genius-insights-rg \
  --name genius-insights-news

# Delete Function App (if needed)
az functionapp delete \
  --resource-group genius-insights-rg \
  --name genius-insights-news
```

## Next Time

After initial setup, to update your function code:

```bash
cd /Users/genius/genius/azure-functions
func azure functionapp publish genius-insights-news
```

That's it! Your function will automatically import fresh South African news articles every 3 hours! 🚀
