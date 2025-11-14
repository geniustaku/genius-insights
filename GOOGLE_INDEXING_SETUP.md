# Google Indexing API - Automated Setup Guide

This guide shows you how to automatically request indexing for all your articles using Google's Indexing API.

## 🎯 Benefits

- **Automatic**: Request indexing for 20+ articles at once
- **Fast**: Articles indexed in 24-48 hours instead of 1-2 weeks
- **Free**: 200 requests per day (Google quota)
- **Easy**: Run one command to index all articles

---

## 📋 Setup Steps

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
   - Click "Select a project" → "New Project"
   - Name: "Genius Insights Indexing"
   - Click "Create"

### Step 2: Enable Web Search Indexing API

1. In your project, go to [APIs & Services Library](https://console.cloud.google.com/apis/library)
2. Search for "Web Search Indexing API"
3. Click on it, then click **"Enable"**
4. Wait 2-3 minutes for activation

### Step 3: Create Service Account

1. Go to [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click **"+ Create Service Account"**
3. Fill in details:
   - **Name**: `indexing-service-account`
   - **Description**: `Service account for Google Indexing API`
4. Click **"Create and Continue"**
5. Skip the optional steps (no role needed)
6. Click **"Done"**

### Step 4: Download Service Account Key

1. Find your new service account in the list
2. Click on it to open details
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Choose **"JSON"** format
6. Click **"Create"**
7. **Save the downloaded JSON file**

### Step 5: Rename and Move the Key File

1. Rename the downloaded file to: `google-service-account.json`
2. Move it to your project root directory:
   ```
   /Users/genius/genius/google-service-account.json
   ```

⚠️ **IMPORTANT**: This file contains secrets! Add to `.gitignore`:
```bash
echo "google-service-account.json" >> .gitignore
```

### Step 6: Add Service Account to Google Search Console

1. Open your `google-service-account.json` file
2. Find the `client_email` field (looks like: `xxxxx@xxxxx.iam.gserviceaccount.com`)
3. Copy that email address
4. Go to [Google Search Console](https://search.google.com/search-console)
5. Select your property: `https://www.genius-insights.co.za`
6. Click **Settings** (gear icon) → **Users and permissions**
7. Click **"Add user"**
8. Paste the service account email
9. Set permission to **"Owner"**
10. Click **"Add"**

### Step 7: Run the Indexing Script

Now you can run the automated indexing:

```bash
cd /Users/genius/genius
node scripts/request-google-indexing.js
```

### Expected Output:

```
🚀 Starting Google Indexing API requests...

📊 Found 55 published articles

⭐ Priority articles (Finance, Property, Business): 30

📝 Requesting indexing for priority articles...

✅ SARS Tax Brackets 2025: Complete Income Tax Guide...
   https://www.genius-insights.co.za/guides/sars-tax-brackets-2025-south-africa
✅ How to Pay SARS Debt: Complete Guide 2025...
   https://www.genius-insights.co.za/guides/how-to-pay-sars-debt-south-africa
...

============================================================
📊 Indexing Request Summary
============================================================
✅ Successful: 20
❌ Failed: 0
📝 Total articles in database: 55

💡 Note: Google limits to 200 indexing requests per day.
💡 Run this script daily to index more articles.
💡 Check status in Google Search Console after 24-48 hours.
```

---

## 🔄 Running Regularly

### Manual (Recommended at First)

Run whenever you publish new articles:
```bash
node scripts/request-google-indexing.js
```

### Automated (Optional - Using Cron)

To run automatically every day:

1. Edit crontab:
   ```bash
   crontab -e
   ```

2. Add this line (runs daily at 2 AM):
   ```
   0 2 * * * cd /Users/genius/genius && node scripts/request-google-indexing.js >> logs/indexing.log 2>&1
   ```

3. Create logs directory:
   ```bash
   mkdir -p /Users/genius/genius/logs
   ```

### Automated (Cloud - Using GitHub Actions)

Create `.github/workflows/google-indexing.yml`:

```yaml
name: Request Google Indexing

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  request-indexing:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Create service account file
        run: echo '${{ secrets.GOOGLE_SERVICE_ACCOUNT_JSON }}' > google-service-account.json

      - name: Request indexing
        run: node scripts/request-google-indexing.js
```

Then add your service account JSON as a GitHub secret named `GOOGLE_SERVICE_ACCOUNT_JSON`.

---

## 📊 Monitoring Results

### Google Search Console

Check indexing status:
1. Go to [Search Console](https://search.google.com/search-console)
2. Click **"Pages"** (left sidebar)
3. Watch "Indexed" count increase

### Script Modifications

To index different articles, edit `scripts/request-google-indexing.js`:

```javascript
// Index only new articles from last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const recentArticles = articles.filter(a => {
  const publishedDate = a.published_at?.toDate?.() || new Date(a.published_at);
  return publishedDate >= sevenDaysAgo;
});
```

---

## ❌ Troubleshooting

### Error: "API has not been used in project"

**Solution**: Wait 5-10 minutes after enabling the API, then try again.

### Error: "Permission denied"

**Solution**:
1. Verify service account email is added to Search Console as **Owner**
2. Check that Web Search Indexing API is enabled
3. Ensure service account key file is correct

### Error: "Quota exceeded"

**Solution**: Google limits 200 requests/day. Wait until tomorrow or contact Google to request higher quota.

### Error: "File not found: google-service-account.json"

**Solution**:
1. Ensure file is named exactly: `google-service-account.json`
2. Place it in project root: `/Users/genius/genius/`
3. Run script from project root

---

## 🎯 Best Practices

1. **Start Small**: Test with 5-10 URLs first
2. **Monitor Quota**: Track daily usage (200/day limit)
3. **Prioritize New Content**: Index new articles immediately
4. **Check Results**: Verify in Search Console after 24-48 hours
5. **Re-index Updates**: Request indexing again after major article updates

---

## 🔐 Security Notes

- ✅ **DO** add `google-service-account.json` to `.gitignore`
- ✅ **DO** keep the service account key file secure
- ❌ **DON'T** commit the key file to Git
- ❌ **DON'T** share the key file publicly

---

## 📈 Expected Results

**Before Automated Indexing:**
- Manual requests: 10-20 per session
- Time to index: 1-2 weeks
- Coverage: 35/201 pages indexed

**After Automated Indexing:**
- Automated requests: 20-200 per day
- Time to index: 24-48 hours
- Coverage: 100+/201 pages indexed (within 2 weeks)

---

## 🆘 Need Help?

If you encounter issues:
1. Check [Google's Indexing API docs](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
2. Verify setup steps completed correctly
3. Check error messages in script output
4. Review quotas in [Google Cloud Console](https://console.cloud.google.com/apis/api/indexing.googleapis.com/quotas)

---

**Ready to automate indexing?** Follow the steps above to set up and run:

```bash
node scripts/request-google-indexing.js
```
