# Currently Tracked Pages

This document lists all pages that are currently being tracked for page visit analytics.

## Pages with Active Tracking

### 1. Home Page
- **Path:** `/`
- **File:** `app/page.tsx`
- **Tracking Method:** `usePageVisit('/')` hook
- **Why Track:** Main landing page - shows overall site traffic

### 2. Document Converter
- **Path:** `/document-converter`
- **File:** `components/DocumentConverter.tsx`
- **Tracking Method:** `usePageVisit('/document-converter')` hook
- **Why Track:** Tool page - measure converter usage and interest

### 3. Tools Page
- **Path:** `/tools`
- **File:** `app/tools/page.tsx`
- **Tracking Method:** `usePageVisit('/tools')` hook
- **Why Track:** Hub page for all tools - shows interest in different calculators

### 4. Articles Listing Page
- **Path:** `/articles`
- **File:** `app/articles/page.js` (wrapped in `ArticlesPageClient`)
- **Tracking Method:** Client wrapper component with `usePageVisit('/articles')`
- **Why Track:** Shows general interest in your content/guides

### 5. Individual Article Pages (Dynamic)
- **Path:** `/articles/[slug]` (e.g., `/articles/sars-tax-guide`, `/articles/property-transfer`)
- **File:** `app/articles/[slug]/page.js` (wrapped in `ArticlePageClient`)
- **Tracking Method:** Client wrapper with `usePageVisit('/articles/{slug}')`
- **Why Track:** **MOST IMPORTANT** - Shows which specific articles are most popular so you know what content resonates with your audience

## How to View Analytics

1. Navigate to: `http://localhost:3000/admin` (or your production URL)
2. Click the **"📊 Analytics"** tab
3. View the dashboard showing:
   - **Total page views** across all pages
   - **Number of tracked pages**
   - **Top page** by visits
   - **Detailed rankings** with:
     - Page name and full path
     - Visit count with visual progress bars
     - First and last visit timestamps
     - Medals (🥇🥈🥉) for top 3 pages

## What This Tells You

### High-Level Insights
- **Home page visits** → Overall site traffic
- **Tools page visits** → Interest in calculators
- **Articles page visits** → Content discovery behavior
- **Document converter visits** → Tool usage/interest

### Most Valuable Insights (Individual Articles)
The **individual article tracking** is your most valuable metric because it tells you:

✅ **Which topics resonate most** with your audience
✅ **Which articles to create more content about**
✅ **Which articles to promote more**
✅ **Which articles need updating or expansion**
✅ **What your audience is searching for**

### Example Insights You'll Get

If you see analytics like this:

| Rank | Page | Visits |
|------|------|--------|
| 🥇 1 | `/articles/sars-tax-filing-guide` | 1,250 |
| 🥈 2 | `/articles/property-transfer-costs` | 890 |
| 🥉 3 | `/document-converter` | 654 |
| 4 | `/articles/medical-aid-comparison` | 432 |
| 5 | `/` | 321 |
| 6 | `/tools` | 189 |

**This tells you:**
- SARS tax content is your most valuable topic → create more tax guides
- Property content is second most popular → expand property coverage
- Document converter is a strong tool → consider promoting it more
- Medical aid content has good interest → opportunity to create related content
- Home and tools pages have lower direct visits → may need SEO optimization

## Next Steps After Tracking

### Weekly Review
1. Check your analytics dashboard weekly
2. Note your top 5 pages
3. Look for trends (which topics are growing?)

### Monthly Actions
1. **Top Performers:** Update and expand your most-visited articles
2. **Create Similar Content:** Write new articles on related topics to your top articles
3. **Low Performers:** Either improve SEO or remove/consolidate
4. **Promote Winners:** Share your popular articles on social media

### Content Strategy
Based on analytics, you can:
- **Write more articles** on topics that get the most visits
- **Update popular articles** with more detail and current information
- **Create tools/calculators** related to your most popular articles
- **Focus SEO efforts** on content types that perform well

## Technical Details

### How It Works
1. When a user visits a tracked page, the `usePageVisit` hook fires
2. It sends a request to `/api/analytics/track` with the page path
3. The API increments the count in Firestore collection `pageVisits`
4. Admin dashboard fetches data from `/api/analytics/stats`
5. Data is displayed with rankings and visualizations

### Data Stored
For each page, Firestore stores:
```javascript
{
  path: "/articles/sars-tax-guide",
  count: 1250,
  firstVisit: Timestamp,
  lastVisit: Timestamp
}
```

### Privacy
✅ **Only tracks:** Page path and visit count
❌ **Does NOT track:** IP addresses, user info, devices, locations, cookies

## Adding More Pages to Track

To track additional pages, add the hook to any client component:

```tsx
'use client';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function MyPage() {
  usePageVisit('/my-page-path');

  return <div>Content</div>;
}
```

## Firestore Structure

```
pageVisits/
├─ home/                         (path: "/")
├─ document-converter/           (path: "/document-converter")
├─ tools/                        (path: "/tools")
├─ articles/                     (path: "/articles")
├─ articles_sars-tax-guide/      (path: "/articles/sars-tax-guide")
├─ articles_property-transfer/   (path: "/articles/property-transfer")
└─ ... (all your other articles will appear here)
```

## Important Notes

1. **Every article is tracked separately** - This is intentional! It helps you see which specific content performs best.

2. **Visit counts are cumulative** - They increase over time, showing you long-term popular content.

3. **Check regularly** - Weekly or monthly reviews will help you spot trends and make better content decisions.

4. **Focus on high performers** - Your top 10-20 pages are where you should focus most of your effort.

5. **Use insights for strategy** - Let the data guide your content creation, not just gut feeling.

---

**Your analytics system is now fully set up and tracking all key pages!** 📊

Start by visiting different pages on your site, then check the admin dashboard to see the data populate.
