# Google Search Console Indexing Setup Guide

This guide will help you index all your calculators and tools on Google Search Console using the Google Indexing API.

## 📊 What Gets Indexed

This setup will automatically submit **23 URLs** to Google:

### Landing Pages (7)
- Homepage (/)
- /tools
- /calculators
- /articles
- /guides
- /guides/sars-tax-guides
- /guides/property-transfer-guides

### Calculators (14)
1. Income Tax Calculator
2. Property Transfer Calculator
3. Rental Yield Calculator
4. Loan Calculator
5. Investment Calculator
6. **Capital Gains Tax Calculator** (NEW)
7. **Solar & Loadshedding Calculator** (NEW)
8. **Capitec Bank Calculator** (NEW)
9. **Crypto Tax Calculator** (NEW)
10. **Debt Consolidation Calculator** (NEW)
11. **Freelancer/Provisional Tax Calculator** (NEW)
12. **Payroll Calculator** (NEW)
13. **Estate Duty Calculator** (NEW)
14. **TFSA Calculator** (NEW)

---

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project & Enable API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing: **"genius-insights"**
3. Enable the **Web Search Indexing API**:
   - Go to: https://console.cloud.google.com/apis/library/indexing.googleapis.com
   - Click **"Enable"**
   - Wait 2-5 minutes for activation

### Step 2: Create Service Account

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click **"Create Service Account"**
3. Enter details:
   - **Name**: `google-indexing-api`
   - **Description**: `Service account for Google Indexing API`
4. Click **"Create and Continue"**
5. **Grant Role**: Select **"Owner"** or **"Editor"**
6. Click **"Continue"** → **"Done"**

### Step 3: Download Service Account Key

1. Find your new service account in the list
2. Click on it to open details
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Choose **JSON** format
6. Click **"Create"** - file will download
7. **Rename the file** to: `google-service-account.json`
8. **Move it** to your project root directory:
   ```bash
   mv ~/Downloads/[downloaded-key-name].json /Users/genius/genius/google-service-account.json
   ```

### Step 4: Add Service Account to Google Search Console

1. Open your `google-service-account.json` file
2. **Copy the `client_email`** (looks like: `[name]@[project-id].iam.gserviceaccount.com`)
3. Go to [Google Search Console](https://search.google.com/search-console)
4. Select property: **https://www.genius-insights.co.za**
5. Click **"Settings"** (⚙️ icon in left sidebar)
6. Click **"Users and permissions"**
7. Click **"Add user"**
8. **Paste the service account email**
9. Select permission: **"Owner"** (required for Indexing API)
10. Click **"Add"**
11. ⏰ **Wait 5-10 minutes** for permissions to propagate

### Step 5: Verify Sitemap Submission

1. In Google Search Console, go to **"Sitemaps"**
2. Add your sitemap URL: `https://www.genius-insights.co.za/sitemap.xml`
3. Click **"Submit"**
4. Verify it shows as "Success"

---

## 🎯 Running the Indexing Script

Once setup is complete, run the script to index all calculators:

```bash
cd /Users/genius/genius
node scripts/index-all-calculators.js
```

### Expected Output

```
🔍 Google Indexing API - Calculator Batch Submission
======================================================================

📧 Using service account: [your-service-account]@[project].iam.gserviceaccount.com

📊 Total URLs to index: 23
   - Landing pages: 7
   - Calculators: 14

📝 Indexing landing pages...

✅ https://www.genius-insights.co.za/
✅ https://www.genius-insights.co.za/tools
✅ https://www.genius-insights.co.za/calculators
...

📝 Indexing calculators...

✅ capital gains tax  calculator
   https://www.genius-insights.co.za/south-africa-capital-gains-tax-calculator
✅ solar loadshedding  calculator
   https://www.genius-insights.co.za/south-africa-solar-loadshedding-calculator
...

======================================================================
📊 Google Indexing Request Summary
======================================================================
✅ Successfully indexed: 23 URLs
❌ Failed: 0 URLs
📈 Success rate: 100.0%
```

---

## 🐛 Common Errors & Solutions

### Error: "API has not been used"

**Solution:**
1. Go to: https://console.cloud.google.com/apis/library/indexing.googleapis.com
2. Click "Enable"
3. Wait 2-5 minutes
4. Run script again

### Error: "Permission denied" or "403 Forbidden"

**Solution:**
1. Verify service account email is **exactly** as shown in `google-service-account.json`
2. Check it's added to Search Console with **"Owner"** permission
3. Wait 5-10 minutes after adding
4. Try again

### Error: "Quota exceeded" or "429"

**Solution:**
- Google limits: **200 requests per day** per project
- Wait 24 hours
- Run script again tomorrow

### Error: "google-service-account.json not found"

**Solution:**
1. Check file is in project root: `/Users/genius/genius/`
2. Verify filename is exactly: `google-service-account.json`
3. Ensure it's valid JSON (not corrupted)

---

## 📊 Monitoring Indexing Status

### Check in Google Search Console

1. Go to: https://search.google.com/search-console
2. Select property: **genius-insights.co.za**
3. Check these reports:

#### Pages Report
- Shows indexing status of all pages
- Path: **"Pages"** in left sidebar
- Look for: "Indexed", "Not indexed", "Errors"

#### Coverage Report
- Detailed breakdown of indexed/not indexed
- Shows errors and warnings
- Path: **"Coverage"** (under "Index")

#### URL Inspection Tool
- Check specific URL status
- Top of Search Console: paste URL
- Click **"Request Indexing"** if needed

### Expected Timeline

- **Immediate**: Request submitted to Google ✅
- **1-3 hours**: Google starts crawling
- **24-48 hours**: Most URLs indexed
- **3-7 days**: Full indexing complete

---

## 🔄 Best Practices

### Daily Indexing Schedule

Run the script daily to ensure new content gets indexed:

```bash
# Add to cron (optional)
0 9 * * * cd /Users/genius/genius && node scripts/index-all-calculators.js >> logs/indexing.log 2>&1
```

### Re-indexing After Updates

After updating calculator content:

```bash
node scripts/index-all-calculators.js
```

This tells Google to re-crawl the pages.

### Monitoring SEO Performance

1. **Google Search Console** - Impressions, clicks, CTR
2. **Google Analytics** - Traffic sources, user behavior
3. **Sitemap** - Keep `app/sitemap.ts` updated with all new pages

---

## 📈 Expected Traffic Growth

With proper indexing, expect:

- **Week 1**: Initial indexing, 10-20% of calculators indexed
- **Week 2-3**: 50-70% indexed, traffic starts growing
- **Month 1**: 90%+ indexed, 500-1,000 organic visitors/month
- **Month 3**: 2,000-5,000 organic visitors/month (if content is high-quality)
- **Month 6**: 5,000-15,000 organic visitors/month (with consistent updates)

---

## 🔗 Useful Links

- **Google Search Console**: https://search.google.com/search-console
- **Google Cloud Console**: https://console.cloud.google.com/
- **Indexing API Docs**: https://developers.google.com/search/apis/indexing-api/v3/quickstart
- **Search Console Help**: https://support.google.com/webmasters/

---

## ✅ Checklist

Before running the script, ensure:

- [x] Sitemap updated with all 9 new calculators
- [ ] Google Cloud project created
- [ ] Web Search Indexing API enabled
- [ ] Service account created with Owner role
- [ ] Service account key downloaded as `google-service-account.json`
- [ ] Key file placed in project root
- [ ] Service account email added to Search Console as Owner
- [ ] Waited 5-10 minutes after adding to Search Console
- [ ] Sitemap submitted in Search Console

Once all checkboxes are complete, run:

```bash
node scripts/index-all-calculators.js
```

---

## 🆘 Need Help?

If you encounter issues:

1. Check error messages carefully
2. Verify all setup steps completed
3. Check Google Cloud Console for API status
4. Check Search Console for permission status
5. Wait 10 minutes after changes before retrying

**Common mistake**: Forgetting to add service account email to Search Console with **Owner** permission!
