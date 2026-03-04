# GENIUS INSIGHTS - MASTER CHANGE DOCUMENT
## Complete SEO, Design & Dominion Strategy

**Date:** 4 March 2026
**Site:** https://www.genius-insights.co.za
**Goal:** Total search dominion — more clicks, page 1 rankings, AI citation readiness, and flawless design across all 64 pages.

---

## TABLE OF CONTENTS

1. [CRITICAL FIXES (Do First)](#1-critical-fixes)
2. [SEO — Meta Titles & Descriptions](#2-seo-meta-titles--descriptions)
3. [SEO — Structured Data & Schema](#3-seo-structured-data--schema)
4. [SEO — Duplicate Page Redirects](#4-seo-duplicate-page-redirects)
5. [SEO — Sitemap & Indexing](#5-seo-sitemap--indexing)
6. [SEO — Robots.txt Improvements](#6-seo-robotstxt-improvements)
7. [SEO — Internal Linking Strategy](#7-seo-internal-linking-strategy)
8. [DESIGN — Color & Visibility Fixes](#8-design-color--visibility-fixes)
9. [DESIGN — OG Images (Social Sharing)](#9-design-og-images)
10. [DESIGN — Favicon & Branding](#10-design-favicon--branding)
11. [AEO — AI Engine Optimization](#11-aeo-ai-engine-optimization)
12. [PAGE-BY-PAGE CHANGE LOG](#12-page-by-page-change-log)
13. [QUICK WIN PAGES (Position 7-20)](#13-quick-win-pages)
14. [CONFIGURATION FIXES](#14-configuration-fixes)
15. [DEPLOYMENT CHECKLIST](#15-deployment-checklist)

---

## 1. CRITICAL FIXES

These must be done first — they affect every page and have the highest SEO impact.

### 1.1 — ALL "2025" References → "2026"

**Impact:** Google deprioritizes stale content. Every competitor updating to 2026 pushes you down.

**Scope:** 200+ occurrences across 50+ files

**Files affected (every calculator, guide, article, and layout page):**

| File | Occurrences | Example Change |
|------|-------------|----------------|
| `app/layout.tsx` | 1 | "Calculators 2025" → "Calculators 2026" |
| `app/page.tsx` | Multiple | "2025" → "2026" throughout |
| All 34 calculator `page.tsx` files | 5-13 each | Title, description, H1, OG, Twitter, content |
| `app/guides/page.tsx` | 10 | Title, hero, stats, CTA |
| `app/guides/sars-tax-guides/page.tsx` | 8 | Title, description, hero, stats |
| `app/guides/property-transfer-guides/page.tsx` | 11 | Title, description, hero, stats |
| `app/cv-builder/page.tsx` | Multiple | Title, description |
| `app/salary-calculator/page.tsx` | Multiple | Title, description |
| `app/career-assessment/page.tsx` | Multiple | Title, description |
| `app/document-converter/page.tsx` | Multiple | Title, description |
| `app/market/page.tsx` | Content references | Rates, prices |
| `app/tools/page.tsx` | Multiple | Stats, descriptions |
| `app/calculators/page.tsx` | Multiple | Descriptions |

**Rule:**
- "2025" → "2026" in all titles, descriptions, H1 headings, OG metadata, Twitter metadata
- "2025/2026" → "2026/2027" where referring to tax years
- "2024/2025" → "2025/2026" where referring to previous tax years
- Keep "2025" only where it's part of a URL slug (e.g., `/south-africa-vat-calculator-2025` stays until redirect is set up)

---

### 1.2 — Missing /public/images/ Directory

**Impact:** CRITICAL — ALL social sharing is broken. Zero OG images load.

**Current state:** The `/public/images/` directory does NOT exist. 29 OG images are referenced in code but none exist.

**Action:** Create `/public/images/` directory and generate all 29 OG images.

**Required OG Images (1200x630px each):**

| # | Filename | For Page |
|---|----------|----------|
| 1 | `og-south-africa-platform.jpg` | Root layout (fallback) |
| 2 | `og-home.jpg` | Homepage |
| 3 | `sa-tax-calculator-og.jpg` | Tax Calculator |
| 4 | `sa-income-tax-og.jpg` | Income Tax Calculator |
| 5 | `sa-bond-calculator-og.jpg` | Bond Calculator |
| 6 | `sa-business-registration-og.jpg` | Business Registration Calculator |
| 7 | `sa-capitec-calculator-og.jpg` | Capitec Calculator |
| 8 | `sa-cgt-calculator-og.jpg` | Capital Gains Tax Calculator |
| 9 | `sa-crypto-tax-calculator-og.jpg` | Crypto Tax Calculator |
| 10 | `sa-debt-consolidation-calculator-og.jpg` | Debt Consolidation Calculator |
| 11 | `sa-estate-duty-calculator-og.jpg` | Estate Duty Calculator |
| 12 | `sa-freelancer-tax-calculator-og.jpg` | Freelancer Tax Calculator |
| 13 | `sa-fuel-calculator-og.jpg` | Fuel Cost Calculator |
| 14 | `sa-investment-calculator-og.jpg` | Investment Calculator |
| 15 | `sa-loan-calculator-og.jpg` | Loan Calculator |
| 16 | `sa-payroll-calculator-og.jpg` | Payroll Calculator |
| 17 | `sa-property-transfer-calculator-og.jpg` | Property Transfer Calculator |
| 18 | `sa-rental-yield-og.jpg` | Rental Yield Calculator |
| 19 | `sa-retirement-calculator-og.jpg` | Retirement Calculator |
| 20 | `sa-solar-calculator-og.jpg` | Solar Calculator |
| 21 | `sa-tfsa-calculator-og.jpg` | TFSA Calculator |
| 22 | `sa-vat-calculator-og.jpg` | VAT Calculator |
| 23 | `cv-builder-og.jpg` | CV Builder |
| 24 | `document-converter-tool.jpg` | Document Converter |
| 25 | `document-converter-twitter.jpg` | Document Converter (Twitter) |
| 26 | `salary-calculator-og.jpg` | Salary Calculator |
| 27 | `career-assessment-og.jpg` | Career Assessment |
| 28 | `skills-analyzer-og.jpg` | Skills Analyzer |
| 29 | `job-comparison-og.jpg` | Job Comparison |
| 30 | `twitter-south-africa-platform.jpg` | Root layout (Twitter) |

**Design spec for OG images:**
- Size: 1200x630px
- White or light background
- Bold black text with calculator/tool name
- Genius Insights logo in corner
- South African flag accent colors (green, gold, black, red, blue)
- "Free | 2026 | South Africa" tagline
- Clean, professional, no gradients

---

### 1.3 — Missing Favicon & App Icons

**Impact:** Unprofessional appearance, missing browser tab icon, PWA broken.

**Create these files in `/public/`:**

| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | 32x32 | Browser tab icon |
| `favicon-16x16.png` | 16x16 | Small favicon |
| `favicon-32x32.png` | 32x32 | Standard favicon |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `android-chrome-192x192.png` | 192x192 | Android PWA |
| `android-chrome-512x512.png` | 512x512 | Android PWA splash |
| `site.webmanifest` | JSON | PWA manifest |

**Add to `app/layout.tsx` metadata:**
```typescript
icons: {
  icon: [
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},
manifest: '/site.webmanifest',
```

---

### 1.4 — Google Verification Codes are Placeholders

**File:** `app/layout.tsx`

**Current (BROKEN):**
```typescript
verification: {
  google: 'your-google-verification-code',
  yandex: 'your-yandex-verification-code',
  other: { 'msvalidate.01': 'your-bing-verification-code' },
}
```

**Note:** You have two Google verification HTML files in `/public/`:
- `google680c6c434d96c2b0.html`
- `google9d50e0b0bce8430a.html`

**Action:** Extract the actual verification code from these files and update `layout.tsx`. Or remove the placeholder metadata if using HTML file verification.

---

### 1.5 — Client-Side Pages Missing Metadata (3 pages)

These pages use `'use client'` and CANNOT export Next.js metadata:

| Page | Current State | Fix |
|------|---------------|-----|
| `south-africa-fnb-calculator/page.tsx` | No metadata | Split into server layout + client component |
| `south-africa-insurance-calculator/page.tsx` | No metadata | Split into server layout + client component |
| `south-africa-standard-bank-calculator/page.tsx` | No metadata | Split into server layout + client component |

**Fix pattern for each:**

1. Create `layout.tsx` in the page directory with metadata export
2. Keep `page.tsx` as `'use client'` with the calculator logic
3. The layout provides SEO metadata, the page provides interactivity

**Example for FNB Calculator:**

Create `app/south-africa-fnb-calculator/layout.tsx`:
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FNB Calculator 2026 | Free FNB Loan, Savings & eBucks Calculator',
  description: 'Free FNB calculator 2026. Calculate FNB personal loans, home loans, savings, investments, and eBucks rewards with current rates.',
  keywords: ['FNB calculator 2026', 'FNB loan calculator', 'FNB eBucks calculator', ...],
  alternates: { canonical: '/south-africa-fnb-calculator' },
  openGraph: { ... },
  twitter: { ... },
}

export default function Layout({ children }) {
  return children
}
```

Repeat for Insurance Calculator and Standard Bank Calculator.

---

## 2. SEO — META TITLES & DESCRIPTIONS

### 2.1 — Shorten All Meta Titles to Under 60 Characters

Google truncates titles at ~60 characters. All current titles are 80-100+ characters. Users see "South Africa Tax Calculator 20..." which looks broken.

**Title optimization rules:**
1. Keep under 60 characters
2. Lead with the primary keyword
3. Include "2026" and "Free"
4. Remove "South Africa" from title (use it in description instead) — Google already knows the locale from content
5. Add "SA" as shorter alternative where needed

**All 34 Calculator Title Changes:**

| Page | Current Title (too long) | New Title (under 60 chars) |
|------|--------------------------|---------------------------|
| tax-calculator | South Africa Tax Calculator 2025 \| SARS Income Tax & PAYE Calculator | SA Tax Calculator 2026 \| Free SARS PAYE Tool |
| income-tax-calculator | South Africa Income Tax Calculator 2025 \| SARS Tax & Salary Deductions Calculator | SA Income Tax Calculator 2026 \| Free SARS Tool |
| bond-calculator | South Africa Bond Calculator 2025 \| Free Home Loan & Affordability Calculator | SA Bond Calculator 2026 \| Free Home Loan Tool |
| business-registration-calculator | South Africa Business Registration Cost Calculator 2025 \| CIPC & SARS Fees | SA Business Registration Calculator 2026 \| CIPC |
| capital-gains-tax-calculator | South Africa Capital Gains Tax Calculator 2025 \| Free CGT Calculator | SA Capital Gains Tax Calculator 2026 \| Free |
| capitec-calculator | Capitec Bank Calculator 2025 \| Free Capitec Loan, Savings & Account Calculator | Capitec Calculator 2026 \| Free Loan & Savings |
| car-finance-calculator | South Africa Car Finance Calculator 2025 \| Vehicle Finance & Balloon Payment Calculator | SA Car Finance Calculator 2026 \| Free Tool |
| credit-card-calculator | South Africa Credit Card Calculator 2025 \| Credit Card Payoff & Interest Calculator | SA Credit Card Calculator 2026 \| Payoff Tool |
| crypto-tax-calculator | South Africa Cryptocurrency Tax Calculator 2025 \| Free Crypto CGT & Trading Income Tax Calculator | SA Crypto Tax Calculator 2026 \| Free CGT Tool |
| debt-consolidation-calculator | South Africa Debt Consolidation Calculator 2025 \| Free Loan Consolidation Savings Calculator | SA Debt Consolidation Calculator 2026 \| Free |
| deposit-calculator | South Africa Fixed Deposit Calculator 2025 \| Savings & Interest Calculator | SA Fixed Deposit Calculator 2026 \| Free Tool |
| estate-duty-calculator | South Africa Estate Duty Calculator 2025 \| Free Death Tax & Inheritance Tax Calculator | SA Estate Duty Calculator 2026 \| Free Tool |
| fnb-calculator | (MISSING — needs layout.tsx) | FNB Calculator 2026 \| Free Loan & Savings Tool |
| freelancer-provisional-tax-calculator | South Africa Freelancer & Provisional Tax Calculator 2025 \| Free Self-Employed Tax Calculator | SA Freelancer Tax Calculator 2026 \| Free |
| fuel-cost-calculator | South Africa Fuel Cost Calculator 2025 \| Petrol & Diesel Price Calculator | SA Fuel Cost Calculator 2026 \| Petrol Price |
| gratuity-calculator | South Africa Gratuity Calculator 2025 \| Severance Pay & Retrenchment Calculator | SA Gratuity Calculator 2026 \| Severance Pay |
| inflation-calculator | South Africa Inflation Calculator 2025 \| CPI & Purchasing Power Calculator | SA Inflation Calculator 2026 \| CPI Tool |
| insurance-calculator | (MISSING — needs layout.tsx) | SA Insurance Calculator 2026 \| Free Quotes |
| investment-calculator | South Africa Investment Calculator 2025 \| Compound Interest & ROI Calculator | SA Investment Calculator 2026 \| Free ROI Tool |
| leave-calculator | South Africa Leave Calculator 2025 \| BCEA Annual Leave & Sick Leave Calculator | SA Leave Calculator 2026 \| BCEA Leave Tool |
| loan-calculator | South Africa Loan Calculator 2025 \| Home Loan & Bond Affordability Calculator | SA Loan Calculator 2026 \| Home Loan Tool |
| overtime-calculator | South Africa Overtime Calculator 2025 \| BCEA Overtime Pay Calculator | SA Overtime Calculator 2026 \| BCEA Pay Tool |
| payroll-calculator | South Africa Payroll Calculator 2025 \| Free PAYE, UIF & Take-Home Pay Calculator | SA Payroll Calculator 2026 \| Free PAYE Tool |
| pension-calculator | South Africa Pension Calculator 2025 \| Retirement Fund & RA Calculator | SA Pension Calculator 2026 \| Retirement Fund |
| personal-loan-calculator | South Africa Personal Loan Calculator 2025 \| Free Loan Repayment Calculator | SA Personal Loan Calculator 2026 \| Free Tool |
| property-transfer-calculator | South Africa Property Transfer Calculator 2025 \| Transfer Duty & Costs Calculator | SA Property Transfer Calculator 2026 \| Free |
| rental-yield-calculator | South Africa Rental Yield Calculator 2025 \| Property Investment ROI Calculator | SA Rental Yield Calculator 2026 \| Free ROI |
| retirement-calculator | South Africa Retirement Calculator 2025 \| Pension Fund & Retirement Planning | SA Retirement Calculator 2026 \| Free Tool |
| solar-loadshedding-calculator | South Africa Solar & Loadshedding Calculator 2025 \| Solar Panel Cost & Savings Calculator | SA Solar Calculator 2026 \| Panel Cost & ROI |
| standard-bank-calculator | (MISSING — needs layout.tsx) | Standard Bank Calculator 2026 \| Free Tool |
| tax-refund-calculator | South Africa Tax Refund Calculator 2025 \| SARS eFiling Refund Estimator | SA Tax Refund Calculator 2026 \| SARS Refund |
| tfsa-calculator | South Africa TFSA Calculator 2025 \| Free Tax-Free Savings Account Growth Calculator | SA TFSA Calculator 2026 \| Tax-Free Savings |
| uif-calculator | South Africa UIF Calculator 2025 \| Free Unemployment Benefits & Contribution Calculator | SA UIF Calculator 2026 \| Benefits Calculator |
| vat-calculator | South Africa VAT Calculator 2025 \| Free 15% VAT Calculator & SARS Tool | SA VAT Calculator 2026 \| Free 15% Tool |

**Other Page Title Changes:**

| Page | Current Title | New Title |
|------|---------------|-----------|
| Homepage | Genius Insights \| South Africa Financial Tools, SARS Tax Calculator & Business News | Genius Insights \| Free SA Financial Tools 2026 |
| CV Builder | Free CV Builder 2025 \| Professional Resume Maker with PDF Download \| South Africa | Free SA CV Builder 2026 \| PDF Resume Maker |
| Document Converter | Free Online Document Converter \| Convert PDF to Word, Excel to PDF, PowerPoint 2025 | Free Document Converter \| PDF to Word & More |
| Salary Calculator | Free African Salary Calculator 2025 \| Check Your Worth in 18 African Countries | Free African Salary Calculator 2026 |
| Career Assessment | Free African Career Assessment Test 2025 \| Find Your Perfect Career in Africa | Free Career Assessment 2026 \| Find Your Path |
| Guides Hub | Free South Africa Guides 2025 \| SARS Tax, Property Transfer & Financial Help | Free SA Guides 2026 \| SARS & Property Help |
| SARS Tax Guides | SARS Tax Guides 2025 \| Complete South Africa Tax Filing & eFiling Help | SARS Tax Guides 2026 \| eFiling Help |
| Property Guides | Property Transfer Guides South Africa 2025 \| Complete Property Buying & Selling Help | SA Property Transfer Guides 2026 \| Free |

### 2.2 — Description Optimization

Descriptions should be 150-160 characters, front-load the value proposition, and include a call to action.

**Key changes for all descriptions:**
1. Start with "Free" — it's the #1 CTR driver
2. Include specific numbers (R36K, 15%, R500K) where relevant
3. Add "Calculate now" or "Try free" as CTA
4. Remove fake social proof ("Used by 100,000+") unless verifiable — Google may penalize
5. Update all "2025" to "2026"
6. Keep under 160 characters

---

## 3. SEO — STRUCTURED DATA & SCHEMA

### 3.1 — Add FAQ Schema to ALL Calculator Pages

**Impact:** FAQ rich snippets in Google = more SERP real estate = higher CTR even at lower positions.

**Current state:** Only 6 of 34 calculators have FAQ sections:
- Credit Card Calculator (4 FAQs)
- Gratuity Calculator (3 FAQs)
- Leave Calculator (3 FAQs)
- Payroll Calculator (4 FAQs)
- Pension Calculator (3 FAQs)
- Tax Refund Calculator (4 FAQs)
- UIF Calculator (4 FAQs)

**Action:** Add FAQ sections with FAQPage schema to ALL remaining 27 calculators.

**For each calculator, add:**

1. A `<section>` with 3-4 relevant FAQs using `<details>/<summary>` HTML elements
2. FAQPage JSON-LD structured data

**FAQ Schema template to add to each page:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate [topic] in South Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Detailed answer with specific SA information..."
      }
    },
    // 2-3 more questions
  ]
}
</script>
```

**FAQ topics for each calculator (to be written):**

| Calculator | FAQ 1 | FAQ 2 | FAQ 3 |
|-----------|-------|-------|-------|
| Tax Calculator | What are the 2026 SARS tax brackets? | How is PAYE calculated? | When must I file my tax return? |
| Bond Calculator | What is the current prime rate? | How much deposit do I need? | What is bond registration cost? |
| Investment Calculator | What is compound interest? | How does inflation affect returns? | What is the best investment in SA? |
| Inflation Calculator | What is SA's current inflation rate? | How does CPI work? | How to protect money from inflation? |
| Fuel Cost Calculator | What is the current petrol price? | How is fuel price calculated in SA? | How to save on fuel costs? |
| Credit Card Calculator | (already has FAQs) | - | - |
| Car Finance Calculator | What is a balloon payment? | Residual value vs balloon? | What is the NCR rate cap? |
| Crypto Tax Calculator | Is crypto taxed in SA? | How does SARS treat crypto? | What is the CGT inclusion rate? |
| Debt Consolidation | What is debt review vs consolidation? | Does consolidation affect credit score? | What is the NCR debt counselling? |
| Deposit Calculator | What are current fixed deposit rates? | How is interest taxed on deposits? | Fixed vs notice deposit? |
| Estate Duty | What is the estate duty threshold? | How is estate duty calculated? | What is the section 4A deduction? |
| FNB Calculator | What is FNB's current interest rate? | How do eBucks rewards work? | FNB vs other banks? |
| Freelancer Tax | How does provisional tax work? | When are provisional tax due dates? | Can I deduct home office expenses? |
| Income Tax | Difference between income tax and PAYE? | What are tax rebates? | How to claim medical tax credits? |
| Insurance Calculator | What insurance do I need in SA? | How to compare insurance quotes? | What is short-term vs long-term insurance? |
| Loan Calculator | What affects loan interest rates? | How to calculate affordability? | What is the NCA? |
| Overtime Calculator | (already has warnings section) | - | - |
| Payroll Calculator | (already has FAQs) | - | - |
| Pension Calculator | (already has FAQs) | - | - |
| Personal Loan | What is the max personal loan rate? | Secured vs unsecured loans? | How to qualify for a personal loan? |
| Property Transfer | What is transfer duty? | How long does transfer take? | Who pays transfer costs? |
| Rental Yield | What is a good rental yield in SA? | Gross vs net yield? | How to calculate ROI on property? |
| Retirement Calculator | What is the two-pot system? | How much do I need to retire? | RA vs pension fund? |
| Solar Calculator | How much does solar cost in SA? | What size system do I need? | What is the solar tax incentive? |
| Standard Bank Calculator | Standard Bank rates vs competitors? | How to apply for a Standard Bank loan? | What is Standard Bank's prime rate? |
| TFSA Calculator | (has rules section but no FAQ schema) | - | - |
| UIF Calculator | (already has FAQs) | - | - |
| VAT Calculator | When must I register for VAT? | What is the VAT threshold? | How to claim VAT back? |
| Capitec Calculator | What is Capitec's interest rate? | How does Capitec savings work? | Capitec vs other banks? |
| Business Registration | How to register a company at CIPC? | PTY Ltd vs CC? | What is the CIPC annual return? |
| Gratuity Calculator | (already has FAQs) | - | - |
| Leave Calculator | (already has FAQs) | - | - |
| Tax Refund Calculator | (already has FAQs) | - | - |

### 3.2 — Add BreadcrumbList Schema to ALL Pages

**Current state:** Only guide slug pages have BreadcrumbList. Article pages and calculators do not.

**Add to every page:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.genius-insights.co.za" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://www.genius-insights.co.za/calculators" },
    { "@type": "ListItem", "position": 3, "name": "SA Tax Calculator" }
  ]
}
```

**Breadcrumb paths:**
- Calculators: Home → Calculators → [Calculator Name]
- Articles: Home → Articles → [Article Title]
- Guides: Home → Guides → [Category] → [Guide Title]
- Tools: Home → Tools → [Tool Name]

### 3.3 — Add Organization Schema to Root Layout

**Add to `app/layout.tsx`:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Genius Insights",
  "url": "https://www.genius-insights.co.za",
  "logo": "https://www.genius-insights.co.za/images/genius-insights-logo.png",
  "description": "South Africa's leading free financial tools and calculators platform",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@genius-insights.co.za",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://twitter.com/GeniusInsightsZA"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ZA"
  }
}
```

### 3.4 — Add WebSite Schema with SearchAction

**Add to homepage:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Genius Insights",
  "url": "https://www.genius-insights.co.za",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.genius-insights.co.za/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 3.5 — Update StructuredData Component

**File:** `components/StructuredData.tsx`

**Changes needed:**
- Update all "2025" references to "2026"
- Add `dateModified` to all schemas (Google prefers fresh content signals)
- Add `author` to WebApplication schemas
- Add `aggregateRating` placeholder (for future reviews)
- Ensure `applicationCategory` is correct for each type

---

## 4. SEO — DUPLICATE PAGE REDIRECTS

### 4.1 — Cannibalization Issues Found

Google is splitting ranking authority between duplicate pages. This is actively hurting rankings.

**Set up 301 redirects in `next.config.ts`:**

```typescript
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      // VAT calculator duplicate
      {
        source: '/south-africa-vat-calculator-2025',
        destination: '/south-africa-vat-calculator',
        permanent: true, // 301 redirect
      },
      // Duplicate eFiling articles
      {
        source: '/articles/sars-efiling-registration',
        destination: '/articles/sars-efiling-registration-guide',
        permanent: true,
      },
      // Duplicate SARS debt articles
      {
        source: '/articles/how-to-pay-sars-debt-south-africa',
        destination: '/guides/how-to-pay-sars-debt-south-africa',
        permanent: true,
      },
      // Duplicate tax brackets
      {
        source: '/articles/sars-tax-brackets-2025-south-africa',
        destination: '/guides/sars-tax-brackets-2025-south-africa',
        permanent: true,
      },
      // Duplicate property transfer costs
      {
        source: '/articles/property-transfer-costs-south-africa-2025-breakdown',
        destination: '/guides/property-transfer-costs-south-africa-2025-breakdown',
        permanent: true,
      },
      // Duplicate attorney fees
      {
        source: '/guides/attorney-fees-property-transfer-south-africa',
        destination: '/articles/attorney-fees-property-transfer-south-africa',
        permanent: true,
      },
      // Duplicate bond costs
      {
        source: '/articles/bond-costs-vs-transfer-costs-south-africa',
        destination: '/guides/bond-costs-vs-transfer-costs-south-africa',
        permanent: true,
      },
      // Duplicate CIPC annual returns
      {
        source: '/articles/cipc-annual-returns-filing-guide',
        destination: '/guides/cipc-annual-returns-filing-guide',
        permanent: true,
      },
      // Duplicate PAYE guide
      {
        source: '/articles/paye-calculator-guide-south-africa',
        destination: '/guides/paye-calculator-guide-south-africa',
        permanent: true,
      },
      // Duplicate SARS calculator guide
      {
        source: '/articles/how-to-use-sars-income-tax-calculator',
        destination: '/guides/how-to-use-sars-income-tax-calculator',
        permanent: true,
      },
    ]
  },
}
```

### 4.2 — Remove Redirected Pages from Sitemap

After setting up redirects, remove the source URLs from `app/sitemap.ts`:
- Remove `/south-africa-vat-calculator-2025` from the calculators array
- Filter out redirected article slugs from the dynamic article fetch

### 4.3 — Delete Duplicate Page Directories

After redirects are confirmed working:
- Delete `app/south-africa-vat-calculator-2025/` directory (redundant)

---

## 5. SEO — SITEMAP & INDEXING

### 5.1 — Pages Missing from Sitemap

**Current sitemap has 40 calculators + dynamic articles + 18 static pages.**

**Missing pages to add:**

| Page | Priority | Change Frequency |
|------|----------|-----------------|
| `/south-africa-insurance-comparison` | 0.8 | monthly |
| `/countries` | 0.6 | monthly |
| `/categories` | 0.6 | weekly |
| `/login` | 0.3 | monthly |
| `/register` | 0.3 | monthly |
| `/salary-calculator` | 0.8 | monthly |

**Note:** `/salary-calculator` IS in the calculators array but listed as just `'/salary-calculator'` — confirm it's being included properly.

### 5.2 — Add Guide Subpages to Sitemap

Add dynamic guide slugs similar to how articles are fetched:

```typescript
// In sitemap.ts - add guide pages
const guidePages = [
  '/guides/sars-tax-guides',
  '/guides/property-transfer-guides',
  // Add all [slug] guides from Firestore
]
```

### 5.3 — Set Proper lastModified Dates

**Current:** All pages use `new Date()` (today's date every time).

**Fix:** Use actual content modification dates where available, especially for articles:
```typescript
lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
```

### 5.4 — Add Priority Differentiation

Current priorities are too flat. Optimize based on GSC impression data:

| Page Type | Current Priority | New Priority | Reason |
|-----------|-----------------|-------------|--------|
| Homepage | 1.0 | 1.0 | Keep |
| Tax Calculator (1,657 impressions) | 0.8 | 0.95 | Highest traffic potential |
| eFiling Registration (1,245 imp) | 0.7 | 0.9 | High demand |
| Personal Loan Calculator (758 imp) | 0.8 | 0.9 | High demand |
| Fuel Cost Calculator (568 imp) | 0.8 | 0.9 | Already position 12 |
| Other high-impression calculators | 0.8 | 0.85 | Good potential |
| Low-impression calculators | 0.8 | 0.7 | Less priority |
| Privacy/Terms | 0.6 | 0.3 | Not SEO priority |

---

## 6. SEO — ROBOTS.TXT IMPROVEMENTS

### 6.1 — Convert to Dynamic robots.ts

**Current:** Static `robots.txt` file in `/app/`

**Replace with:** Dynamic `app/robots.ts` for better Next.js integration:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/node_modules/', '/static/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // AI crawlers - ALLOW for AEO
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.genius-insights.co.za/sitemap.xml',
  }
}
```

---

## 7. SEO — INTERNAL LINKING STRATEGY

### 7.1 — Cross-Link Calculators

Each calculator page should link to 3-4 related calculators in a "Related Tools" section.

**Linking map:**

| Calculator | Links To |
|-----------|----------|
| Tax Calculator | Income Tax, Tax Refund, PAYE/Payroll, TFSA |
| Income Tax | Tax Calculator, Payroll, Tax Refund, Freelancer Tax |
| Bond Calculator | Property Transfer, Loan, Deposit, FNB/Standard Bank/Capitec |
| Investment | TFSA, Deposit, Retirement, Inflation |
| TFSA | Investment, Tax Calculator, Retirement |
| Personal Loan | Car Finance, Debt Consolidation, Credit Card |
| Car Finance | Personal Loan, Insurance, Fuel Cost |
| Property Transfer | Bond, Rental Yield, Estate Duty, Capital Gains |
| Fuel Cost | Car Finance, Inflation |
| Credit Card | Debt Consolidation, Personal Loan |
| Payroll | Income Tax, UIF, Leave, Overtime |
| UIF | Payroll, Leave, Gratuity |
| Leave | Payroll, UIF, Overtime |
| Overtime | Payroll, Leave, Gratuity |
| Pension | Retirement, TFSA, Investment |
| VAT | Business Registration, Tax Calculator |
| Capital Gains | Tax Calculator, Property Transfer, Crypto Tax |
| Crypto Tax | Capital Gains, Tax Calculator |
| Business Registration | VAT, Freelancer Tax |
| Freelancer Tax | Income Tax, Business Registration, VAT |
| Retirement | Pension, TFSA, Investment |
| Solar | Fuel Cost, Insurance |
| Rental Yield | Property Transfer, Bond, Investment |
| Estate Duty | Property Transfer, Capital Gains |
| Debt Consolidation | Credit Card, Personal Loan |

### 7.2 — Link Articles to Calculators

Every article about a topic should link to the relevant calculator, and every calculator should link to relevant articles.

### 7.3 — Add "Related Articles" to Calculator Pages

Use the existing `getRelatedArticles()` function to show 2-3 related articles at the bottom of each calculator page.

---

## 8. DESIGN — COLOR & VISIBILITY FIXES

### 8.1 — Global Text Color Fix

**File:** `app/globals.css`

**Add these rules to ensure all text is visible:**

```css
/* Ensure all form inputs have black text */
input, textarea, select {
  color: #111827 !important; /* text-gray-900 */
}

/* Ensure placeholders are visible but muted */
::placeholder {
  color: #9CA3AF !important; /* text-gray-400 — visible on white */
  opacity: 1;
}

/* Ensure all text on white backgrounds is dark */
.bg-white, .bg-gray-50, .bg-slate-50, [class*="bg-white"] {
  color: #111827; /* Default to dark text */
}
```

### 8.2 — Hero Section Gradient Improvements

**Current state:** All calculator pages use colorful gradient hero sections. These look good but some gradient text (`bg-clip-text text-transparent`) can be hard to read.

**Changes for each calculator page hero:**

Keep the gradient backgrounds (they're beautiful) but ensure:
1. H1 text is always readable — white text on dark gradients is fine
2. The gradient-clip text effect (colored text) is only used on large headings, never body text
3. Badge/tag text has solid backgrounds, not transparent

**No changes needed for hero gradients** — they use dark colors (`600-700` range) with white text. This is correct.

### 8.3 — Light Gradient Card Backgrounds

**Issue:** Some info cards use very light gradients (`from-blue-50 to-cyan-50`) which is fine, but text on these must be dark.

**Verify these patterns across all pages:**
- `bg-gradient-to-br from-*-50 to-*-50` → text must be `text-gray-900` or `text-*-900`
- `bg-gradient-to-r from-*-50 to-*-50` → same rule

**Files to check (all have light gradient cards):**
- All calculator component files in `/components/SouthAfrica*.tsx|jsx`

**Current state:** All light gradient cards already use `text-gray-900` or `text-*-900`. No changes needed.

### 8.4 — Footer Newsletter Input

**File:** `components/Footer.jsx`

**Fix:** Add explicit background and placeholder color:
```jsx
<input
  type="email"
  placeholder="Your email address"
  className="w-full px-4 py-2 rounded text-gray-900 bg-white placeholder-gray-400"
/>
```

### 8.5 — Article Comments Form

**File:** `components/ArticleComments.tsx`

**Fix:** Add explicit text color:
```jsx
<input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" />
<textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" />
```

---

## 9. DESIGN — OG IMAGES

### 9.1 — OG Image Design Specification

**All 30 OG images should follow this design system:**

**Layout (1200x630px):**
```
┌──────────────────────────────────────────┐
│                                          │
│  [Genius Insights Logo]                  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │   SA Tax Calculator 2026           │  │
│  │   ─────────────────────            │  │
│  │   Free SARS Income Tax &           │  │
│  │   PAYE Calculator                  │  │
│  │                                    │  │
│  │   genius-insights.co.za            │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [SA Flag Colors Accent Bar]             │
│                                          │
└──────────────────────────────────────────┘
```

**Colors:**
- Background: White (#FFFFFF)
- Title text: Black (#111827)
- Subtitle: Dark gray (#4B5563)
- URL text: Green (#059669)
- Accent bar: SA flag colors (green #007749, gold #FFB81C, red #DE3831, blue #002395, black #000000)

**Typography:**
- Title: Bold, 48px
- Subtitle: Regular, 24px
- URL: Medium, 20px

### 9.2 — Generate OG Images Programmatically

**Option A:** Use `@vercel/og` or `next/og` to generate OG images dynamically:

Create `app/api/og/route.tsx`:
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Genius Insights'
  const subtitle = searchParams.get('subtitle') || 'South African Financial Tools'

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'white', padding: '60px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827' }}>{title}</div>
        <div style={{ fontSize: '24px', color: '#4B5563', marginTop: '16px' }}>{subtitle}</div>
        <div style={{ fontSize: '20px', color: '#059669', marginTop: 'auto' }}>genius-insights.co.za</div>
        <div style={{ display: 'flex', height: '8px', marginTop: '20px', gap: '4px' }}>
          <div style={{ flex: 1, background: '#007749' }} />
          <div style={{ flex: 1, background: '#FFB81C' }} />
          <div style={{ flex: 1, background: '#DE3831' }} />
          <div style={{ flex: 1, background: '#002395' }} />
          <div style={{ flex: 1, background: '#000000' }} />
          <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #ccc' }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

Then update all page metadata to use:
```typescript
openGraph: {
  images: [{ url: '/api/og?title=SA Tax Calculator 2026&subtitle=Free SARS Income Tax & PAYE Calculator', width: 1200, height: 630 }],
}
```

**Option B:** Generate static images manually and place in `/public/images/`

---

## 10. DESIGN — FAVICON & BRANDING

### 10.1 — Favicon Design

**Design:** Simple "G" letter or brain icon in green (#059669) on transparent background.

**Files to create:**
- `public/favicon.ico` (32x32, 16x16 multi-size)
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png` (180x180)
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

### 10.2 — Web Manifest

**Create `public/site.webmanifest`:**
```json
{
  "name": "Genius Insights",
  "short_name": "Genius",
  "description": "South Africa's Free Financial Tools & Calculators",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#059669",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 11. AEO — AI ENGINE OPTIMIZATION

### 11.1 — What is AEO?

AEO (Answer Engine Optimization) / AI Engine Optimization ensures your content is cited by AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot). This is the next frontier after SEO.

### 11.2 — Allow AI Crawlers (robots.txt)

Already covered in Section 6.1 — add GPTBot, ChatGPT-User, Claude-Web, Anthropic-AI, PerplexityBot user agents.

### 11.3 — Structure Content for AI Citation

**For each calculator page, add a "Quick Answer" section** at the top of the content (below the calculator) that directly answers the most common question:

**Example for Tax Calculator:**
```html
<section itemscope itemtype="https://schema.org/FAQPage">
  <h2>How to Calculate South African Tax in 2026</h2>
  <p>
    South Africa uses a progressive tax system with 7 tax brackets for the 2026/2027 tax year.
    The rates range from 18% (income up to R237,100) to 45% (income above R1,817,000).
    In addition to income tax, employees pay 1% UIF contribution (capped at R177.12/month)
    and employers pay 1% SDL. Use our free calculator above to get your exact figures.
  </p>
</section>
```

**This format works because:**
1. AI systems extract clear, factual statements
2. The structured data helps AI understand the content
3. Specific numbers and thresholds are highly citable
4. The "2026/2027 tax year" makes it current and authoritative

### 11.4 — Add "At a Glance" Data Tables

For each calculator, add a summary table with key data. AI systems love tables:

**Example for Tax Calculator:**
```html
<table>
  <caption>South Africa Tax Brackets 2026/2027</caption>
  <thead>
    <tr><th>Taxable Income (R)</th><th>Tax Rate</th></tr>
  </thead>
  <tbody>
    <tr><td>0 – 237,100</td><td>18%</td></tr>
    <tr><td>237,101 – 370,500</td><td>26%</td></tr>
    <tr><td>370,501 – 512,800</td><td>31%</td></tr>
    <tr><td>512,801 – 673,000</td><td>36%</td></tr>
    <tr><td>673,001 – 857,900</td><td>39%</td></tr>
    <tr><td>857,901 – 1,817,000</td><td>41%</td></tr>
    <tr><td>1,817,001+</td><td>45%</td></tr>
  </tbody>
</table>
```

### 11.5 — Add Speakable Schema

This tells AI and voice assistants which parts of your page are most suitable for reading aloud:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".quick-answer", ".at-a-glance", "h1", ".faq-answer"]
  }
}
```

### 11.6 — Add "How To" Schema for Guide Pages

For step-by-step guides, add HowTo schema:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Register on SARS eFiling",
  "step": [
    { "@type": "HowToStep", "name": "Visit SARS eFiling", "text": "Go to efiling.sars.gov.za..." },
    { "@type": "HowToStep", "name": "Click Register", "text": "Select 'Register' on the login page..." }
  ]
}
```

### 11.7 — Add Definitive Statements

AI systems cite pages that make clear, authoritative statements. Add to each calculator:

```
"The current South African prime interest rate is 11.75% as of March 2026."
"South Africa's VAT rate is 15%, effective since 1 April 2018."
"The TFSA annual contribution limit is R36,000 with a lifetime limit of R500,000."
"UIF contributions are 1% of salary, capped at R17,712 per month."
```

---

## 12. PAGE-BY-PAGE CHANGE LOG

### CALCULATORS (34 pages)

| # | Page | Year Update | Title Shorten | FAQ Add | FAQ Schema | Breadcrumb | OG Image | Metadata Fix | Related Links |
|---|------|-------------|---------------|---------|------------|------------|----------|-------------|---------------|
| 1 | tax-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 2 | income-tax-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 3 | bond-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 4 | business-registration-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 5 | capital-gains-tax-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 6 | capitec-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 7 | car-finance-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD OG img | YES |
| 8 | credit-card-calculator | YES | YES | HAS (4) | ADD | YES | ADD | ADD OG img | YES |
| 9 | crypto-tax-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 10 | debt-consolidation-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 11 | deposit-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD OG img | YES |
| 12 | estate-duty-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 13 | fnb-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD layout.tsx | YES |
| 14 | freelancer-provisional-tax-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 15 | fuel-cost-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 16 | gratuity-calculator | YES | YES | HAS (3) | ADD | YES | ADD | ADD OG img | YES |
| 17 | inflation-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD OG img | YES |
| 18 | insurance-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD layout.tsx | YES |
| 19 | investment-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 20 | leave-calculator | YES | YES | HAS (3) | ADD | YES | ADD | ADD OG img | YES |
| 21 | loan-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 22 | overtime-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD OG img | YES |
| 23 | payroll-calculator | YES | YES | HAS (4) | ADD | YES | FIX | - | YES |
| 24 | pension-calculator | YES | YES | HAS (3) | ADD | YES | ADD | ADD OG img | YES |
| 25 | personal-loan-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD OG img | YES |
| 26 | property-transfer-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 27 | rental-yield-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 28 | retirement-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 29 | solar-loadshedding-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 30 | standard-bank-calculator | YES | YES | YES (3) | YES | YES | ADD | ADD layout.tsx | YES |
| 31 | tax-refund-calculator | YES | YES | HAS (4) | ADD | YES | ADD | ADD OG img | YES |
| 32 | tfsa-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |
| 33 | uif-calculator | YES | YES | HAS (4) | ADD | YES | ADD | ADD OG img | YES |
| 34 | vat-calculator | YES | YES | YES (3) | YES | YES | FIX | - | YES |

**Legend:**
- YES = needs to be added/done
- HAS = already exists, just needs schema markup
- FIX = image referenced in code but file missing
- ADD = both reference and file missing

### OTHER PAGES (30 pages)

| # | Page | Year Update | Title Fix | Breadcrumb | OG Fix | Other Changes |
|---|------|-------------|-----------|------------|--------|---------------|
| 35 | Homepage | YES | YES | - | FIX | Add WebSite schema |
| 36 | About | - | - | YES | ADD | - |
| 37 | Contact | - | - | YES | ADD | - |
| 38 | Privacy | - | - | - | ADD | - |
| 39 | Terms | - | - | - | ADD | - |
| 40 | Calculators Hub | YES | ADD | - | ADD | Add metadata export |
| 41 | Tools Hub | YES | ADD | - | ADD | Add metadata export |
| 42 | CV Builder | YES | YES | YES | FIX | - |
| 43 | Document Converter | YES | YES | YES | FIX | - |
| 44 | Salary Calculator | YES | YES | YES | FIX | - |
| 45 | Career Assessment | YES | YES | YES | FIX | - |
| 46 | Skills Analyzer | YES | ADD | YES | ADD | Add metadata |
| 47 | Job Comparison | YES | ADD | YES | ADD | Add metadata |
| 48 | Market | YES | ADD | YES | ADD | Add metadata |
| 49 | Guides Hub | YES | YES | - | ADD | - |
| 50 | SARS Tax Guides | YES | YES | YES | ADD | - |
| 51 | Property Transfer Guides | YES | YES | YES | ADD | - |
| 52 | Guide [slug] | YES | - | HAS | - | Already has breadcrumbs |
| 53 | Articles List | YES | - | YES | - | - |
| 54 | Article [slug] | - | - | ADD | - | Add breadcrumb schema |
| 55 | Germany VAT | YES | YES | YES | ADD | - |
| 56 | Africa Tools | YES | ADD | YES | ADD | Add metadata |
| 57 | Insurance Comparison | YES | ADD | YES | ADD | Add metadata |
| 58 | Market Report | YES | ADD | YES | ADD | Add metadata |
| 59 | Categories | - | ADD | YES | ADD | Add metadata |
| 60 | Countries | - | ADD | YES | ADD | Add metadata |
| 61-64 | Admin pages | - | - | - | - | No SEO needed |

---

## 13. QUICK WIN PAGES (Position 7-20)

These pages are ALREADY close to page 1. Small improvements can push them to top 10 results.

**Priority order (highest impact first):**

### Tier 1 — Almost Page 1 (Position 7-12)

| Page | Position | Impressions | Action |
|------|----------|-------------|--------|
| cc-vs-pty-ltd-comparison | 7.3 | 137 | Add more content (2000+ words), internal links, FAQ schema |
| solar-loadshedding-calculator | 8.1 | 21 | Update with 2026 solar incentive data, add FAQ |
| bond-registration-vs-property-transfer | 8.1 | 22 | Expand content, add comparison table, link to calculators |
| avoid-property-transfer-delays | 9.6 | 20 | Add practical tips list, FAQ schema |
| property-transfer-timeline | 11.6 | 128 | HIGH PRIORITY — good impressions, add detailed timeline visual |
| fuel-cost-calculator | 12.7 | 568 | HIGH PRIORITY — update fuel prices, add current month data |

### Tier 2 — Top of Page 2 (Position 13-20)

| Page | Position | Impressions | Action |
|------|----------|-------------|--------|
| deregister-company-cipc | 13.9 | 474 | HIGH PRIORITY — add step-by-step process, HowTo schema |
| cipc-name-reservation | 14.2 | 167 | Add detailed process, fees table, timeline |
| property-transfer-costs-2025 | 14.4 | 150 | Update to 2026 costs, add comparison table |
| attorney-fees-property-transfer | 14.4 | 25 | Add detailed fee schedule by province |
| rental-yield-calculator | 16.2 | 85 | Add SA property market data, area comparison |
| how-to-submit-tax-returns | 17.9 | 98 | Add screenshots, step-by-step HowTo schema |
| track-sars-tax-refund | 18.5 | 305 | HIGH PRIORITY — add timeline, status check guide |
| sars-tax-brackets-2025 | 19.1 | 139 | Update to 2026, add comparison with previous year |
| document-converter | 19.1 | 28 | Add more supported formats, speed optimization |
| capitec-calculator | 20.9 | 155 | Add current Capitec rates, product comparison |
| freelancer-provisional-tax | 20.5 | 29 | Add due dates calendar, practical examples |
| business-registration-calculator | 22.0 | 385 | HIGH PRIORITY — add CIPC process guide, fees table |

### Content Enhancement Strategy for Quick Wins

For each quick-win page:
1. **Add 500-1000 more words** of unique, authoritative content
2. **Add data tables** with specific numbers (rates, fees, dates)
3. **Add FAQ schema** (3-4 relevant questions)
4. **Add internal links** to 3-4 related pages
5. **Update year references** to 2026
6. **Add "Last updated: March 2026"** visible date
7. **Add HowTo schema** where applicable (guides)

---

## 14. CONFIGURATION FIXES

### 14.1 — next.config.ts Updates

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // All redirects from Section 4.1
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 14.2 — Add Error & Not-Found Pages

**Currently missing:** No `error.tsx` or `not-found.tsx` at app level.

**Create `app/not-found.tsx`:**
```typescript
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <a href="/" className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Go Home
        </a>
      </div>
    </div>
  )
}
```

This prevents users from hitting ugly default 404 pages, and gives Google a proper 404 signal.

### 14.3 — Security Fix

**File:** `app/admin/page.tsx`

**Issue:** Admin password `4765Zororo@` is hardcoded in client-side code.

**Fix:** Move authentication to server-side API route or use NextAuth properly.

---

## 15. DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All "2025" → "2026" changes applied across all files
- [ ] Meta titles shortened to under 60 characters
- [ ] 301 redirects configured in `next.config.ts`
- [ ] `app/south-africa-vat-calculator-2025/` directory deleted
- [ ] `/public/images/` directory created with all 30 OG images
- [ ] Favicon files added to `/public/`
- [ ] `site.webmanifest` created
- [ ] Google verification codes updated in `layout.tsx`
- [ ] `robots.ts` replaces `robots.txt` (with AI crawler rules)
- [ ] Sitemap updated with missing pages and proper priorities
- [ ] FAQ sections added to all calculator pages
- [ ] FAQ Schema (JSON-LD) added to all FAQ sections
- [ ] BreadcrumbList schema added to all pages
- [ ] Organization schema added to root layout
- [ ] 3 client-side calculator pages given layout.tsx metadata
- [ ] `not-found.tsx` created
- [ ] Internal linking sections added to calculators
- [ ] AEO "Quick Answer" sections added to high-priority pages
- [ ] Global CSS placeholder/input color fixes applied
- [ ] Footer newsletter input styled properly
- [ ] Article comments form styled properly

### Post-Deployment

- [ ] Run `npm run build` — verify no errors
- [ ] Test all 10 redirects return 301
- [ ] Test sitemap.xml loads properly
- [ ] Test robots.txt loads properly
- [ ] Test OG images load (use Facebook Sharing Debugger)
- [ ] Test Twitter cards (use Twitter Card Validator)
- [ ] Submit updated sitemap to Google Search Console
- [ ] Request indexing for top 20 priority pages
- [ ] Verify favicon appears in browser tab
- [ ] Test mobile responsiveness on all updated pages
- [ ] Check Google Rich Results Test for FAQ snippets
- [ ] Monitor Search Console for 7 days for crawl errors
- [ ] Check positions of quick-win pages after 2-4 weeks

### Ongoing (Monthly)

- [ ] Update market data (rates, prices) monthly
- [ ] Check GSC for new cannibalization issues
- [ ] Add new FAQ questions based on actual search queries
- [ ] Monitor AI citation appearances
- [ ] Publish 2-3 new articles per month targeting high-impression queries
- [ ] Update content dates ("Last updated: [Month] 2026")

---

## SUMMARY OF TOTAL CHANGES

| Category | Count |
|----------|-------|
| Files with year updates (2025 → 2026) | 50+ |
| Meta titles to shorten | 42 |
| FAQ sections to add | 27 |
| FAQ Schema to add | 34 |
| BreadcrumbList schemas to add | 50+ |
| OG images to create | 30 |
| 301 redirects to configure | 10 |
| Pages missing metadata (need layout.tsx) | 3 |
| Favicon/manifest files to create | 7 |
| Sitemap pages to add | 6+ |
| CSS/styling fixes | 3 |
| Configuration file updates | 3 |
| New files to create | 10+ |

**Total estimated pages affected:** 64
**Priority:** Critical fixes first (1.1-1.5), then SEO (2-7), then Design (8-10), then AEO (11)

---

*Document generated by Claude Code — 4 March 2026*
*For Genius Insights (genius-insights.co.za)*
