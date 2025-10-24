# Azure Function: News Article Importer

Automatically imports South African tech and business news articles from News API.

## Function Details

- **Name:** NewsArticleImporter
- **Type:** Timer Trigger
- **Schedule:** Every 6 hours (`0 0 */6 * * *`)
- **Runtime:** Node.js 18
- **Timeout:** 10 minutes

## Local Development

### Prerequisites

```bash
npm install -g azure-functions-core-tools@4
```

### Setup

```bash
# Install dependencies
npm install

# Copy settings file
cp local.settings.json.example local.settings.json

# Edit local.settings.json with your values
```

### Run Locally

```bash
# Start the function locally
npm start

# Or use func directly
func start
```

### Test Locally

Trigger the function manually:
```bash
# The function will run automatically based on timer
# Or test via HTTP (after adding HTTP trigger)
```

## Deploy to Azure

```bash
# Login
az login

# Deploy
func azure functionapp publish genius-news-importer
```

## Environment Variables

Set in Azure Portal or via CLI:

```bash
az functionapp config appsettings set \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --settings "NEWS_API_KEY=your-key-here"

az functionapp config appsettings set \
  --name genius-news-importer \
  --resource-group genius-news-rg \
  --settings "WEBSITE_URL=https://your-site.com"
```

## Monitoring

View logs:
```bash
func azure functionapp logstream genius-news-importer
```

Or in Azure Portal:
1. Go to Function App
2. Click "Functions" → "NewsArticleImporter"
3. Click "Monitor"

## Configuration

### Change Schedule

Edit `NewsArticleImporter/function.json`:

```json
{
  "schedule": "0 0 */6 * * *"  // Change this
}
```

### Change Search Queries

Edit `NewsArticleImporter/index.js`:

```javascript
const queries = [
  'South Africa technology',  // Modify these
  'Your custom query here'
];
```

## Files

- `package.json` - Dependencies
- `host.json` - Function app configuration
- `local.settings.json.example` - Example settings
- `NewsArticleImporter/function.json` - Function trigger config
- `NewsArticleImporter/index.js` - Main function code

## Documentation

See parent directory documentation:
- **[NEWS_IMPORT_SETUP.md](../NEWS_IMPORT_SETUP.md)** - Full setup guide
- **[QUICK_START_NEWS_IMPORT.md](../QUICK_START_NEWS_IMPORT.md)** - Quick start

## Support

- [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions/)
- [News API Docs](https://newsapi.org/docs)
