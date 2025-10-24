# Page Visit Tracking System

This document explains how to use the page visit tracking system implemented with Firestore.

## Overview

The page visit tracking system allows you to track the number of visits to different pages on your website. It stores only page visit counts in Firestore - no personal information, location data, or device details are collected.

## Features

- ✅ Simple visit count tracking
- ✅ Real-time analytics dashboard in admin panel
- ✅ Firestore integration
- ✅ No personal data collection
- ✅ Easy to add to any page
- ✅ Automatic tracking with hooks

## How It Works

1. When a user visits a tracked page, the `usePageVisit` hook sends a request to the API
2. The API increments the visit count in Firestore
3. The admin dashboard displays all page statistics sorted by visit count

## Adding Tracking to Pages

### Method 1: Using the Hook (Recommended)

For client components, import and use the `usePageVisit` hook:

```tsx
'use client';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function MyPage() {
  // Track visits to this page
  usePageVisit('/my-page');

  return (
    <div>My Page Content</div>
  );
}
```

### Method 2: Using the PageVisitTracker Component

Add the `PageVisitTracker` component to automatically track based on the URL:

```tsx
import PageVisitTracker from '@/components/PageVisitTracker';

export default function MyPage() {
  return (
    <>
      <PageVisitTracker />
      <div>My Page Content</div>
    </>
  );
}
```

## Currently Tracked Pages

- `/document-converter` - Document converter tool page

## Adding More Pages to Track

To track additional pages, simply add one of the tracking methods above to your page components.

### Example: Tracking Multiple Pages

```tsx
// app/articles/page.tsx
'use client';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function ArticlesPage() {
  usePageVisit('/articles');
  // ... rest of component
}
```

```tsx
// app/tools/page.tsx
'use client';
import { usePageVisit } from '@/hooks/usePageVisit';

export default function ToolsPage() {
  usePageVisit('/tools');
  // ... rest of component
}
```

## Viewing Analytics

1. Navigate to your admin panel at `/admin`
2. Click on the "📊 Analytics" tab
3. View the dashboard showing:
   - Total page views across all tracked pages
   - Number of tracked pages
   - Top page by visits
   - Detailed table with rankings and visit counts

## Firestore Structure

Data is stored in the `pageVisits` collection with the following structure:

```
pageVisits/
  ├─ document-converter/
  │   ├─ path: "/document-converter"
  │   ├─ count: 150
  │   ├─ firstVisit: Timestamp
  │   └─ lastVisit: Timestamp
  ├─ articles/
  │   ├─ path: "/articles"
  │   ├─ count: 89
  │   ├─ firstVisit: Timestamp
  │   └─ lastVisit: Timestamp
  └─ ...
```

## API Endpoints

### Track Page Visit
- **Endpoint:** `POST /api/analytics/track`
- **Body:** `{ "pagePath": "/page-path" }`
- **Response:** `{ "success": true }`

### Get Analytics Stats
- **Endpoint:** `GET /api/analytics/stats`
- **Response:** `{ "stats": [...] }`

## Files Created

- `lib/analytics.ts` - Core tracking functions
- `hooks/usePageVisit.ts` - React hook for tracking
- `components/PageVisitTracker.tsx` - Auto-tracking component
- `components/admin/AnalyticsDashboard.tsx` - Admin dashboard
- `app/api/analytics/track/route.ts` - API for tracking visits
- `app/api/analytics/stats/route.ts` - API for fetching stats

## Best Practices

1. ✅ Track key pages like landing pages, tools, and article pages
2. ✅ Use consistent naming for page paths (e.g., `/page-name` not `page-name`)
3. ✅ Review analytics regularly to identify popular pages
4. ✅ Don't over-track - focus on pages that matter for your business
5. ✅ The tracking happens client-side, so it won't affect SEO or server performance

## Privacy

This tracking system is designed with privacy in mind:
- ✅ Only counts page visits
- ✅ No personal information collected
- ✅ No IP addresses stored
- ✅ No device information tracked
- ✅ No location data collected
- ✅ No cookies required

## Troubleshooting

### Visits not being tracked
1. Check that the page is a client component (`'use client'` directive)
2. Verify Firestore is properly configured in `lib/firebase.ts`
3. Check browser console for errors
4. Ensure the API routes are accessible

### Analytics not showing in dashboard
1. Visit tracked pages first to generate data
2. Click the refresh button in the dashboard
3. Check Firestore console to verify data is being written
4. Check for API errors in the browser console

## Future Enhancements

Possible improvements you could add:
- Daily/weekly/monthly visit breakdowns
- Real-time visitor counter
- Page visit trends over time
- Export analytics to CSV
- Email reports
- Custom date range filtering
