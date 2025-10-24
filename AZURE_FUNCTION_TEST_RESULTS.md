# Azure Function Deployment - Test Results

## ✅ Successfully Deployed

Your Azure Function **"NewsArticleImporter"** has been successfully deployed to Azure!

### Deployment Details:
- **Function App**: genius-insights-news
- **Resource Group**: genius-insights-rg
- **Region**: South Africa North
- **Runtime**: Node.js 22 on Windows
- **Status**: ✅ Active and Running
- **Schedule**: Every 3 hours (8 times per day)

### Scheduled Execution Times (SAST):
- 02:00 AM | 05:00 AM | 08:00 AM | 11:00 AM
- 02:00 PM | 05:00 PM | 08:00 PM | 11:00 PM

## Environment Variables Configured:

✅ **NEWS_API_KEY**: Configured
✅ **WEBSITE_URL**: https://www.genius-insights.co.za

## Function Features:

✅ Full article content extraction (web scraping)
✅ SEO metadata generation (keywords, descriptions, Open Graph)
✅ South African context boxes
✅ Professional source attribution
✅ Duplicate filtering
✅ Quality validation

## ⚠️ Issue Found During Testing:

When manually testing the article import API endpoint (`/api/admin/articles`), received error:

```
HTTP 500 - {"error":"Failed to create article"}
```

### Possible Causes:

1. **Firebase/Firestore Connection Issue**
   - The production deployment may not have proper Firebase credentials
   - Environment variables for Firebase may be missing

2. **Vercel Environment Variables**
   - Check if Firebase config is properly set in Vercel dashboard
   - Verify these env vars are set:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `FIREBASE_CLIENT_EMAIL`
     - `FIREBASE_PRIVATE_KEY`

3. **Firebase Permissions**
   - Firestore rules may be blocking writes from server-side
   - Check Firebase Console → Firestore → Rules

## ✅ What's Working:

1. **Azure Function Deployment**: Successfully deployed
2. **Timer Trigger**: Configured to run every 3 hours
3. **Environment Variables**: Set in Azure
4. **Function Recognition**: Azure recognizes the NewsArticleImporter function
5. **Code Structure**: All dependencies installed and code deployed

## 🔄 Next Steps to Fix:

### 1. Check Vercel Environment Variables

Go to: https://vercel.com/your-project/settings/environment-variables

Ensure all Firebase variables are set:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Check Firebase Console

1. Go to: https://console.firebase.google.com
2. Select your project
3. Go to **Firestore Database** → **Rules**
4. Verify write permissions allow server-side writes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{article} {
      allow read: true;
      allow write: true; // Or add specific server authentication
    }
  }
}
```

### 3. Test Locally First

Before the Azure Function runs, test article creation locally:

```bash
# From your project directory
npm run dev

# In another terminal, test the API:
curl -X POST "http://localhost:3000/api/admin/articles" \
  -H "Content-Type: application/json" \
  -d @test-article-api.json
```

If it works locally but fails in production, it's definitely an environment variable issue.

### 4. Monitor Azure Function Execution

The function will run automatically on schedule. To view execution logs:

#### Via Azure Portal:
1. Go to: https://portal.azure.com
2. Navigate to: genius-insights-news Function App
3. Click: **Functions** → **NewsArticleImporter** → **Monitor**
4. View execution history and logs

#### Via CLI:
```bash
# Stream logs (when function runs)
az webapp log download \
  --resource-group genius-insights-rg \
  --name genius-insights-news \
  --log-file logs.zip

# Or view in Azure Portal real-time
```

### 5. Manual Test (Once API is Fixed)

Once the article API is working, wait for the next scheduled run or manually trigger by clicking "Run" in the Azure Portal function page.

## Expected Behavior When Working:

1. Function runs every 3 hours
2. Fetches 5 different news queries from News API
3. Finds 20-50 articles total
4. Filters for South Africa-related content
5. Extracts full article text (900+ words)
6. Generates SEO metadata
7. Imports 5-15 valid articles to website

## Cost Breakdown:

- **Azure Function**: R0.00 (FREE - 240 executions/month)
- **News API**: R0.00 (FREE tier - 100 requests/day)
- **Total Monthly Cost**: R0.00 ✅

## View Your Function App:

**Azure Portal**:
https://portal.azure.com/#resource/subscriptions/f3759b49-d26f-48d6-8ec1-3e8ccaf47a87/resourceGroups/genius-insights-rg/providers/Microsoft.Web/sites/genius-insights-news

## Files Deployed:

```
azure-functions/
├── host.json                          # Function app configuration
├── package.json                       # Dependencies
├── node_modules/                      # Installed packages
└── NewsArticleImporter/
    ├── function.json                  # Timer trigger config (every 3 hours)
    └── index.js                       # Main function code
```

## Summary:

✅ Azure Function: **Deployed Successfully**
✅ Schedule: **Configured (Every 3 hours)**
✅ Environment: **Set Up**
⚠️ API Endpoint: **Needs Verification** (likely Firebase env vars)

Once the API endpoint issue is resolved, the Azure Function will automatically start importing fresh South African news articles every 3 hours!

---

**Next Run**: The function will execute at the next scheduled time (every 3 hours on the hour: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC)
