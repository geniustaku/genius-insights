# Quick Start: News Import System

## 🚀 Test It Now (5 Minutes)

### Step 1: Install Dependencies

```bash
npm install newsapi node-fetch --save
```

### Step 2: Preview Articles (Dry Run)

```bash
# See what articles would be imported (no actual import)
node scripts/test-news-import.js --dry-run
```

**This shows you:**
- ✅ What articles were found from News API
- ✅ How they're categorized
- ✅ Article titles, authors, sources
- ✅ NO articles are actually created

### Step 3: Test Import (2 Articles)

```bash
# Make sure your dev server is running
npm run dev

# In another terminal, import just 2 articles
node scripts/test-news-import.js --limit=2
```

### Step 4: Check Results

**Admin Panel:**
- Go to: http://localhost:3000/admin
- Click "📝 Articles" tab
- See your 2 imported articles!

**Website:**
- Go to: http://localhost:3000/articles
- See the articles in your articles list

**Analytics:**
- Go to: http://localhost:3000/admin
- Click "📊 Analytics" tab
- (Visit the article pages first to generate analytics)

### Step 5: Full Import

```bash
# Import all found articles (usually 10-30)
node scripts/test-news-import.js
```

## What Articles Get Imported?

### Searches For:
- ✅ South Africa technology news
- ✅ South Africa tech startups
- ✅ South Africa business news
- ✅ South Africa fintech
- ✅ South Africa innovation

### Filters:
- ✅ Must mention "South Africa" (or SA cities)
- ✅ Must be in English
- ✅ Must be from last 7 days
- ✅ Must have actual content
- ✅ No duplicates (same URL)

### Auto-Categorizes:
- **Business** - startups, economy, companies
- **Banking** - fintech, loans, banking
- **Property** - real estate, housing
- **Tax & SARS** - tax, SARS, revenue
- **Insurance** - insurance, medical aid

## Example Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Genius Insights - News Article Importer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mode: ✍️  LIVE IMPORT
Target: http://localhost:3000

📰 Fetching news from News API...

   Searching: "South Africa technology"
   ✓ Found 8 articles
   Searching: "South Africa business"
   ✓ Found 10 articles

📊 Total articles fetched: 18
📊 Unique articles: 15
📊 Valid SA articles: 12

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ARTICLES TO IMPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. South African fintech startup raises $10M
   Category: Banking
   Author: TechCabal
   Reading time: 5 min

2. Cape Town named top tech hub in Africa
   Category: Business
   Author: Business Insider SA
   Reading time: 4 min

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️  IMPORTING ARTICLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Imported: South African fintech startup raises $10M
✓ Imported: Cape Town named top tech hub in Africa

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 IMPORT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Successfully imported: 2
❌ Failed: 0
📊 Total processed: 2
```

## Customize Search Queries

Edit `scripts/test-news-import.js` and change the queries:

```javascript
const queries = [
  'South Africa technology',
  'South Africa AI',              // Add your own
  'Cape Town startup',            // City-specific
  'Johannesburg fintech',         // More specific
  'South Africa cryptocurrency'   // Trending topics
];
```

## Automate with Azure Functions

Once you're happy with local testing, deploy to Azure to run automatically every 6 hours:

See **[NEWS_IMPORT_SETUP.md](NEWS_IMPORT_SETUP.md)** for full deployment instructions.

## Quick Commands

```bash
# Preview only (no import)
node scripts/test-news-import.js --dry-run

# Import 5 articles
node scripts/test-news-import.js --limit=5

# Full import
node scripts/test-news-import.js

# Check what's running
ps aux | grep test-news-import
```

## Troubleshooting

### "Cannot find module 'newsapi'"

```bash
npm install newsapi node-fetch --save
```

### "Connection refused" or "ECONNREFUSED"

Make sure your dev server is running:
```bash
npm run dev
```

### "No valid articles found"

The searches might not have found SA-specific articles. Try:
1. Running again later (news changes)
2. Adjusting search queries
3. Increasing date range (change `getDateDaysAgo(7)` to more days)

### "Failed to import" errors

Check:
1. Your `/api/admin/articles` endpoint is working
2. Required fields match your database schema
3. Database connection is working

## What Each Article Gets

✅ **Title** - Original article title
✅ **Slug** - Auto-generated URL-friendly slug
✅ **Content** - HTML formatted with images
✅ **Excerpt** - First 300 characters
✅ **Category** - Auto-categorized
✅ **Author** - Original author or source name
✅ **Featured Image** - Article hero image
✅ **Reading Time** - Auto-calculated
✅ **Source Attribution** - Credits original publisher
✅ **Published Date** - Original publish date

## Privacy & Ethics

✅ **Source Attribution** - Every article credits the original publisher
✅ **Link to Original** - Includes link to read full article at source
✅ **Fair Use** - Uses news excerpts with attribution
✅ **No Plagiarism** - Clear indication of source

## Next Steps

1. ✅ **Test locally** with dry-run
2. ✅ **Import a few** articles to test
3. ✅ **Check your admin** panel to see them
4. ✅ **Customize queries** for your audience
5. ✅ **Deploy to Azure** for automation

## Cost

**Local Testing:** FREE
**Azure Functions:** FREE (within free tier)
**News API:** FREE (100 requests/day = enough for 4 imports/day)

**Total: $0/month**

---

## Ready to Start?

```bash
# Run this now!
node scripts/test-news-import.js --dry-run
```

See what articles you'd get! 📰
