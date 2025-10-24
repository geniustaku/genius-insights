# Automatic News Article Import System

This system automatically imports South African tech and business news articles using the News API and creates them as articles on your website.

## Features

✅ **Automatic import** of South African tech/business news
✅ **Multiple search queries** for better coverage
✅ **Smart categorization** (Business, Banking, Property, Tax & SARS, Insurance)
✅ **Duplicate prevention** - no duplicate URLs
✅ **Content filtering** - only SA-relevant articles
✅ **HTML formatting** - properly formatted article content
✅ **Source attribution** - credits original publishers
✅ **Azure Functions** - runs automatically every 6 hours
✅ **Local testing** - test before deploying to Azure

## Quick Start: Test Locally First

### Step 1: Install Dependencies

```bash
cd /Users/genius/genius
npm install newsapi node-fetch --save
```

### Step 2: Make Script Executable

```bash
chmod +x scripts/test-news-import.js
```

### Step 3: Run in Dry-Run Mode (Preview Only)

```bash
# See what articles would be imported without actually creating them
node scripts/test-news-import.js --dry-run
```

This will show you:
- What articles were found
- How they're categorized
- What the content looks like
- No articles are actually created

### Step 4: Test Real Import (Limited)

```bash
# Start your dev server first
npm run dev

# In another terminal, import just 2 articles as a test
node scripts/test-news-import.js --limit=2
```

### Step 5: Check Your Website

Go to:
- http://localhost:3000/admin → See the imported articles
- http://localhost:3000/articles → See them in the article list
- http://localhost:3000/admin → Analytics tab → See visits tracked

### Step 6: Full Import

```bash
# Import all found articles (up to ~50)
node scripts/test-news-import.js
```

## How It Works

### 1. Fetches News

The system searches for articles using these queries:
- "South Africa technology"
- "South Africa tech startup"
- "South Africa business"
- "South Africa fintech"
- "South Africa innovation"

### 2. Filters Articles

Only imports articles that:
- ✅ Are in English
- ✅ Are from the last 7 days
- ✅ Mention South Africa (or SA cities)
- ✅ Have actual content (not [Removed])
- ✅ Are unique (no duplicate URLs)

### 3. Categorizes Content

Automatically assigns categories based on keywords:
- **Business** - startups, companies, economy
- **Banking** - fintech, loans, payments
- **Property** - real estate, housing
- **Tax & SARS** - tax, revenue, VAT
- **Insurance** - insurance, medical aid

### 4. Creates Articles

Each article gets:
- **Title** - from news source
- **Slug** - auto-generated URL-friendly
- **Content** - HTML formatted with images
- **Excerpt** - first 300 characters
- **Category** - auto-categorized
- **Author** - original author or source name
- **Featured Image** - article image
- **Reading Time** - auto-calculated
- **Source Attribution** - credits original publisher
- **Published Date** - original publish date

## Azure Functions Deployment

### Prerequisites

1. **Azure Account** - [Create free account](https://azure.microsoft.com/free/)
2. **Azure Functions Core Tools** - Install:

```bash
npm install -g azure-functions-core-tools@4
```

3. **Azure CLI** - [Install Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)

### Deploy to Azure

#### Step 1: Login to Azure

```bash
az login
```

#### Step 2: Create Azure Function App

```bash
# Create resource group
az group create --name genius-news-rg --location southafricanorth

# Create storage account
az storage account create \
  --name geniusnewsstorage \
  --resource-group genius-news-rg \
  --location southafricanorth \
  --sku Standard_LRS

# Create function app (Node.js 18)
az functionapp create \
  --resource-group genius-news-rg \
  --consumption-plan-location southafricanorth \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name genius-news-importer \
  --storage-account geniusnewsstorage
```

#### Step 3: Configure Environment Variables

```bash
# Set News API key
az functionapp config appsettings set \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --settings "NEWS_API_KEY=6bffbb338ace4364bd138d765b4c36a7"

# Set your website URL (change for production)
az functionapp config appsettings set \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --settings "WEBSITE_URL=https://www.genius-insights.co.za"
```

#### Step 4: Deploy the Function

```bash
cd azure-functions

# Install dependencies
npm install

# Deploy
func azure functionapp publish genius-news-importer
```

### Verify Deployment

```bash
# Check function logs
func azure functionapp logstream genius-news-importer

# Test manually (trigger immediately)
az functionapp function keys list \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --function-name NewsArticleImporter
```

## Schedule

The Azure Function runs automatically:
- **Schedule:** Every 6 hours
- **Cron:** `0 0 */6 * * *`
- **Times:** 12 AM, 6 AM, 12 PM, 6 PM (UTC)

### Change Schedule

Edit `azure-functions/NewsArticleImporter/function.json`:

```json
{
  "schedule": "0 0 */6 * * *"  // Change this
}
```

Examples:
- Every 12 hours: `0 0 */12 * * *`
- Every 3 hours: `0 0 */3 * * *`
- Once daily at 6 AM: `0 0 6 * * *`
- Twice daily: `0 0 6,18 * * *`

## Customization

### Change Search Queries

Edit `azure-functions/NewsArticleImporter/index.js`:

```javascript
const queries = [
  'South Africa technology',
  'South Africa AI',           // Add your own
  'South Africa cybersecurity', // Add more
  'Cape Town startup'          // City-specific
];
```

### Change Date Range

```javascript
from: getDateDaysAgo(7)  // Change 7 to more/fewer days
```

### Add More Categories

```javascript
const categories = {
  'Business': [...],
  'Technology': ['AI', 'machine learning', 'cloud', 'software'],  // New
  'Healthcare': ['health', 'medical', 'hospital', 'doctor']       // New
};
```

### Content Filtering

Modify `isArticleValid()` function to add custom filters.

## Monitoring

### View Logs in Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Find your Function App: "genius-news-importer"
3. Click "Functions" → "NewsArticleImporter"
4. Click "Monitor" → View execution history

### Check Import Results

The function logs:
- Number of articles found
- Number imported successfully
- Number failed
- Detailed error messages

### Manual Trigger

```bash
# Trigger function manually via Azure Portal
# OR use Azure CLI:
az functionapp function show \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --function-name NewsArticleImporter
```

## Troubleshooting

### No articles being imported?

**Check:**
1. News API quota (free tier = 100 requests/day)
2. Website URL is correct in environment variables
3. Articles pass SA relevance filter
4. No duplicate articles (already imported)

### Articles failing to import?

**Check:**
1. Your `/api/admin/articles` endpoint is accessible
2. Required fields are present (title, content, category, author)
3. Database permissions
4. Check Azure Function logs for errors

### Rate limiting errors?

The script includes built-in rate limiting (500ms between requests). If you hit limits:
- Reduce number of queries
- Increase delay between requests
- Upgrade News API plan

## Cost Estimation

### News API
- **Free Tier:** 100 requests/day
- **Developer:** $449/month - 250,000 requests/month
- **With this setup:** ~30 requests every 6 hours = 120/day
- **Recommendation:** Stay on free tier or upgrade if needed

### Azure Functions
- **Consumption Plan:** Pay per execution
- **Estimate:** ~4 executions/day × $0.000016/execution = **~$0.002/day** = **$0.60/month**
- **Free Tier:** First 1 million executions free = This costs **$0.00/month**

**Total Cost: FREE** (within free tiers)

## Security Best Practices

### 1. Secure API Keys

Don't commit API keys to git:

```bash
# Add to .gitignore
echo "azure-functions/local.settings.json" >> .gitignore
```

### 2. Add Authentication (Optional)

Protect your article creation API:

```javascript
// In your article API route
const authHeader = request.headers.get('Authorization');
if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
  return new Response('Unauthorized', { status: 401 });
}
```

Then add to Azure Function:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`
}
```

### 3. Monitor Usage

Set up Azure alerts for:
- Failed executions
- Execution time > 5 minutes
- Memory usage > 80%

## Advanced Features

### Add Duplicate Detection by Title

```javascript
// Before importing, check if article exists
async function articleExists(slug) {
  const response = await fetch(`${WEBSITE_URL}/api/articles?slug=${slug}`);
  const data = await response.json();
  return data.articles && data.articles.length > 0;
}
```

### Add Email Notifications

Use Azure SendGrid or similar:

```javascript
// After import
if (imported > 0) {
  await sendEmail({
    to: 'admin@genius-insights.co.za',
    subject: `${imported} new articles imported`,
    body: `Successfully imported ${imported} articles`
  });
}
```

### Add Slack Notifications

```javascript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `📰 Imported ${imported} new articles`
  })
});
```

## Files Reference

### Created Files
- `azure-functions/package.json` - Dependencies
- `azure-functions/NewsArticleImporter/function.json` - Function config
- `azure-functions/NewsArticleImporter/index.js` - Main function
- `scripts/test-news-import.js` - Local testing script

### Required Files
- `app/api/admin/articles/route.js` - Article creation API (already exists)

## Support

### Resources
- [News API Documentation](https://newsapi.org/docs)
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Node.js News API Client](https://github.com/bzar/node-newsapi)

### Common Issues
- **401 Unauthorized:** Check News API key
- **429 Too Many Requests:** Reduce request frequency
- **Database errors:** Check article schema matches
- **No SA articles:** Adjust search queries

---

## Quick Commands Reference

```bash
# Test locally (preview)
node scripts/test-news-import.js --dry-run

# Test with limit
node scripts/test-news-import.js --limit=5

# Full import
node scripts/test-news-import.js

# Deploy to Azure
cd azure-functions && func azure functionapp publish genius-news-importer

# View Azure logs
func azure functionapp logstream genius-news-importer
```

---

**Your automated news import system is ready!** 🚀

Start with local testing, then deploy to Azure for automatic imports every 6 hours.
