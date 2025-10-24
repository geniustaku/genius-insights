// app/api/admin/import-news/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore';
// @ts-ignore
import { Readability } from '@mozilla/readability';
// @ts-ignore
import { JSDOM } from 'jsdom';

const NEWS_API_KEY = process.env.NEWS_API_KEY || '6bffbb338ace4364bd138d765b4c36a7';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetch news from News API directly
 */
async function fetchNewsArticles(query: string, pageSize: number = 10, from: string): Promise<any> {
  const params = new URLSearchParams({
    q: query,
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    from: from,
    apiKey: NEWS_API_KEY
  });

  const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`News API request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch and extract full article content from URL using web scraping
 */
async function extractFullArticle(url: string): Promise<any> {
  try {
    console.log('[extractFullArticle] Scraping URL:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.log('[extractFullArticle] Response not OK:', response.status);
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      const cleanContent = article.textContent.replace(/\s+/g, ' ').trim();
      const wordCount = cleanContent.split(/\s+/).length;

      console.log('[extractFullArticle] Successfully scraped:', wordCount, 'words');
      return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt || cleanContent.substring(0, 300) + '...',
        wordCount
      };
    }

    return null;
  } catch (error: any) {
    console.error('[extractFullArticle] Error:', error.message);
    return null;
  }
}

interface ImportResult {
  timestamp: string;
  queriesRun: number;
  articlesFound: number;
  uniqueArticles: number;
  validArticles: number;
  newArticles: number;
  skipped: number;
  imported: number;
  failed: number;
  errors: string[];
}

/**
 * Check if article is valid for import
 */
function isArticleValid(article: any): boolean {
  if (!article.title || article.title.trim().length === 0) return false;
  if (article.title === '[Removed]' || article.description === '[Removed]') return false;
  if (!article.description && !article.content) return false;

  const text = (article.title + ' ' + (article.description || '')).toLowerCase();

  // Check for South Africa
  const hasSouthAfrica = text.includes('south africa') || text.includes('sa ') ||
      text.includes('cape town') || text.includes('johannesburg') ||
      text.includes('pretoria') || text.includes('durban');

  // Check for Rwanda
  const hasRwanda = text.includes('rwanda') || text.includes('kigali') ||
      text.includes('rwandan');

  // Check for Zimbabwe
  const hasZimbabwe = text.includes('zimbabwe') || text.includes('harare') ||
      text.includes('zimbabwean');

  // Check for Nigeria
  const hasNigeria = text.includes('nigeria') || text.includes('nigerian') ||
      text.includes('lagos') || text.includes('abuja');

  // Article must be from at least one of these countries
  if (!hasSouthAfrica && !hasRwanda && !hasZimbabwe && !hasNigeria) {
    return false;
  }

  return true;
}

/**
 * Create slug from title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

/**
 * Categorize article based on content
 */
function categorizeArticle(article: any): string {
  const title = (article.title || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = title + ' ' + description;

  const categories: Record<string, string[]> = {
    'Business': ['business', 'economy', 'market', 'company', 'startup', 'entrepreneur', 'investment'],
    'Tax & SARS': ['tax', 'sars', 'revenue', 'vat', 'customs', 'duties'],
    'Banking': ['bank', 'banking', 'finance', 'loan', 'credit', 'fintech', 'payment'],
    'Property': ['property', 'real estate', 'housing', 'mortgage', 'rental'],
    'Insurance': ['insurance', 'medical aid', 'cover', 'policy', 'claim']
  };

  let bestCategory = 'Business';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(categories)) {
    let score = 0;
    keywords.forEach(keyword => {
      if (content.includes(keyword)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

/**
 * Generate SEO keywords for article
 */
function generateSEOKeywords(article: any, category: string): string[] {
  const keywords = new Set<string>();

  // Core Africa keywords
  keywords.add('Africa');
  keywords.add('African');

  // Detect which countries are mentioned
  const text = (article.title + ' ' + (article.description || '')).toLowerCase();
  if (text.includes('south africa') || text.includes('sa ')) {
    keywords.add('South Africa');
    keywords.add('South African');
  }
  if (text.includes('rwanda')) {
    keywords.add('Rwanda');
    keywords.add('Rwandan');
  }
  if (text.includes('zimbabwe')) {
    keywords.add('Zimbabwe');
    keywords.add('Zimbabwean');
  }
  if (text.includes('nigeria')) {
    keywords.add('Nigeria');
    keywords.add('Nigerian');
  }

  // Category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    'Business': ['business', 'economy', 'entrepreneurship', 'commerce', 'trade', 'investment', 'market', 'startup', 'company', 'corporate', 'innovation'],
    'Banking': ['banking', 'finance', 'financial services', 'fintech', 'loans', 'credit', 'savings', 'payment', 'digital banking', 'mobile money'],
    'Property': ['property', 'real estate', 'housing', 'mortgage', 'rental', 'property market', 'home buying', 'investment property'],
    'Tax & SARS': ['tax', 'SARS', 'taxation', 'tax compliance', 'tax planning', 'income tax', 'VAT', 'tax return'],
    'Insurance': ['insurance', 'medical aid', 'life insurance', 'short-term insurance', 'insurance claims', 'coverage']
  };

  // Add category keywords
  const catKeywords = categoryKeywords[category] || categoryKeywords['Business'];
  catKeywords.forEach(kw => keywords.add(kw));

  // Tech keywords (relevant to most articles)
  const techKeywords = ['technology', 'digital', 'AI', 'artificial intelligence', 'fintech', 'blockchain', 'cybersecurity', 'cloud computing'];
  techKeywords.forEach(kw => keywords.add(kw));

  // Major city keywords
  const locations = ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Kigali', 'Harare', 'Lagos', 'Abuja'];
  locations.forEach(loc => {
    if (text.includes(loc.toLowerCase())) {
      keywords.add(loc);
    }
  });

  return Array.from(keywords).slice(0, 25);
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Generate article content HTML
 */
function generateArticleContent(newsArticle: any, fullContent?: string): string {
  let html = '';

  if (newsArticle.urlToImage) {
    html += `<div class="article-image mb-6">
      <img src="${newsArticle.urlToImage}" alt="${escapeHtml(newsArticle.title)}" class="w-full rounded-lg shadow-lg" />
    </div>\n\n`;
  }

  if (newsArticle.description) {
    html += `<p class="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">${escapeHtml(newsArticle.description)}</p>\n\n`;
  }

  // Use full scraped content if available, otherwise use News API content
  const content = fullContent || newsArticle.content || '';
  const paragraphs = content.split(/\n+/).filter((p: string) => p.trim());
  paragraphs.forEach((paragraph: string) => {
    const trimmed = paragraph.trim();
    if (trimmed && trimmed.length > 20) {
      html += `<p class="mb-4 text-gray-800 leading-relaxed">${escapeHtml(trimmed)}</p>\n\n`;
    }
  });

  // Add source attribution
  html += `\n<hr class="my-8 border-gray-300" />\n\n`;
  html += `<div class="article-source mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-gray-900 mb-2 text-lg">Source Information</h3>
        <p class="text-gray-700 mb-3">
          This article contains information originally published by <strong class="text-blue-700">${escapeHtml(newsArticle.source.name)}</strong>.
        </p>
        <a href="${newsArticle.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
          <span>View Original Article at ${escapeHtml(newsArticle.source.name)}</span>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>`;

  return html;
}

/**
 * Transform News API article to website article format
 */
async function transformArticle(newsArticle: any): Promise<any> {
  // Try to extract full content from the article URL
  let fullArticle = null;
  try {
    console.log(`[transformArticle] Attempting to scrape: ${newsArticle.title}`);
    fullArticle = await extractFullArticle(newsArticle.url);
  } catch (error) {
    console.log('[transformArticle] Could not extract full content, using News API content');
  }

  const category = categorizeArticle(newsArticle);
  const slug = createSlug(newsArticle.title);

  // Use scraped content if available
  const articleContent = fullArticle ? fullArticle.content : newsArticle.content;
  const excerpt = fullArticle?.excerpt || newsArticle.description ||
                  (articleContent ? articleContent.substring(0, 300) + '...' : '');

  const content = generateArticleContent(newsArticle, articleContent);
  const wordCount = content.split(/\s+/).length;
  const reading_time = Math.max(1, Math.ceil(wordCount / 200));

  const seoKeywords = generateSEOKeywords({
    title: newsArticle.title,
    description: excerpt,
    content: articleContent
  }, category);

  // Detect country for SEO
  const text = (newsArticle.title + ' ' + (newsArticle.description || '')).toLowerCase();
  let region = 'Africa';
  if (text.includes('south africa')) region = 'South Africa';
  else if (text.includes('rwanda')) region = 'Rwanda';
  else if (text.includes('zimbabwe')) region = 'Zimbabwe';
  else if (text.includes('nigeria')) region = 'Nigeria';

  const seoTitle = `${newsArticle.title} | ${region} ${category} News | Genius Insights`;
  const seoDescription = excerpt.substring(0, 155) + ` - Latest ${category.toLowerCase()} news and insights from ${region}.`;

  return {
    title: newsArticle.title,
    slug,
    excerpt: excerpt.substring(0, 300),
    content,
    category,
    author: newsArticle.author || newsArticle.source.name || 'News Team',
    is_published: true,
    reading_time,
    featured_image: newsArticle.urlToImage || '',
    published_at: newsArticle.publishedAt,
    source_url: newsArticle.url,
    source_name: newsArticle.source.name,
    seo_title: seoTitle,
    seo_description: seoDescription,
    seo_keywords: seoKeywords
  };
}

/**
 * Get all existing source URLs from database
 */
async function getExistingSourceUrls(): Promise<Set<string>> {
  try {
    const articlesRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesRef);
    const urls = new Set<string>();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.source_url) {
        urls.add(data.source_url);
      }
    });

    console.log(`[getExistingSourceUrls] Found ${urls.size} existing articles`);
    return urls;
  } catch (error) {
    console.error('Error fetching existing source URLs:', error);
    return new Set<string>();
  }
}

/**
 * Import article to Firestore
 */
async function importArticleToFirestore(article: any, existingUrls: Set<string>): Promise<any> {
  try {
    console.log('[importArticleToFirestore] Importing:', article.title);

    // Check if article already exists using the pre-fetched set
    if (existingUrls.has(article.source_url)) {
      console.log('[importArticleToFirestore] Article already exists, skipping');
      return {
        success: false,
        error: 'Article already exists',
        skipped: true
      };
    }

    // Convert published_at to Firestore Timestamp
    let published_at;
    if (article.published_at) {
      const date = new Date(article.published_at);
      published_at = Timestamp.fromDate(date);
    } else {
      published_at = Timestamp.now();
    }

    // Prepare article data
    const articleData = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      is_published: article.is_published,
      reading_time: article.reading_time,
      published_at,
      featured_image: article.featured_image,
      seo_title: article.seo_title,
      seo_description: article.seo_description,
      seo_keywords: article.seo_keywords,
      source_url: article.source_url,
      source_name: article.source_name,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };

    // Add to Firestore
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, articleData);

    console.log('[importArticleToFirestore] Successfully imported with ID:', docRef.id);
    return {
      success: true,
      data: { id: docRef.id }
    };
  } catch (error: any) {
    console.error('[importArticleToFirestore] Error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Remove duplicates by URL
 */
function removeDuplicates(articles: any[]): any[] {
  const seen = new Set();
  return articles.filter(article => {
    if (seen.has(article.url)) {
      return false;
    }
    seen.add(article.url);
    return true;
  });
}

/**
 * Get date N days ago
 */
function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * POST /api/admin/import-news
 * Manually trigger news import
 */
export async function POST(request: NextRequest) {
  console.log('[POST /api/admin/import-news] Starting import');

  const result: ImportResult = {
    timestamp: new Date().toISOString(),
    queriesRun: 0,
    articlesFound: 0,
    uniqueArticles: 0,
    validArticles: 0,
    newArticles: 0,
    skipped: 0,
    imported: 0,
    failed: 0,
    errors: []
  };

  try {
    const queries = [
      // South Africa - Tech & Business
      'South Africa fintech',
      'South Africa artificial intelligence',
      'South Africa banking technology',
      'South Africa tech startup',
      'South Africa cybersecurity',
      'South Africa cloud computing',

      // Rwanda - Tech & Business
      'Rwanda fintech',
      'Rwanda technology innovation',
      'Rwanda digital banking',
      'Rwanda artificial intelligence',
      'Rwanda tech startup',

      // Zimbabwe - Tech & Business
      'Zimbabwe fintech',
      'Zimbabwe mobile banking',
      'Zimbabwe technology',
      'Zimbabwe digital payment',

      // Nigeria - Tech & Business
      'Nigeria fintech',
      'Nigeria artificial intelligence',
      'Nigeria tech startup',
      'Nigeria digital banking',
      'Nigeria blockchain',
      'Nigeria cybersecurity',

      // Regional/Cross-country
      'Africa fintech innovation',
      'Africa AI technology',
      'Africa digital transformation',
      'Africa banking technology',
      'Africa cloud computing',
      'Africa telecommunications'
    ];

    result.queriesRun = queries.length;
    let allArticles: any[] = [];

    // Fetch news for each query
    for (const query of queries) {
      try {
        console.log(`Fetching news for: ${query}`);
        const response = await fetchNewsArticles(query, 10, getDateDaysAgo(7));

        console.log(`Found ${response.articles?.length || 0} articles for "${query}"`);

        if (response.articles && response.articles.length > 0) {
          allArticles = allArticles.concat(response.articles);
        }
      } catch (error: any) {
        console.error(`Error fetching "${query}":`, error);
        result.errors.push(`Error fetching "${query}": ${error.message}`);
      }
    }

    result.articlesFound = allArticles.length;
    console.log(`Total articles found: ${allArticles.length}`);

    // Remove duplicates
    const uniqueArticles = removeDuplicates(allArticles);
    result.uniqueArticles = uniqueArticles.length;
    console.log(`Unique articles: ${uniqueArticles.length}`);

    // Filter valid articles
    const validArticles = uniqueArticles.filter(article => isArticleValid(article));
    result.validArticles = validArticles.length;
    console.log(`Valid SA articles: ${validArticles.length}`);

    // Fetch all existing source URLs once for efficient duplicate checking
    console.log('Fetching existing articles from database...');
    const existingUrls = await getExistingSourceUrls();

    // Filter out articles that already exist
    const newArticles = validArticles.filter(article => !existingUrls.has(article.url));
    result.newArticles = newArticles.length;
    result.skipped = validArticles.length - newArticles.length;

    if (result.skipped > 0) {
      console.log(`⏭️  Skipping ${result.skipped} articles that already exist`);
    }

    console.log(`📥 Will import ${result.newArticles} new articles`);

    // Transform and import only new articles
    for (const article of newArticles) {
      try {
        console.log(`\n[Import] Processing: ${article.title}`);

        // Transform article (includes scraping)
        const transformed = await transformArticle(article);

        // Import to Firestore
        const importResult = await importArticleToFirestore(transformed, existingUrls);

        if (importResult.success) {
          result.imported++;
          console.log(`✅ Imported: ${article.title}`);
          // Add to existing URLs set to prevent duplicates in same batch
          existingUrls.add(article.url);
        } else {
          result.failed++;
          const errorMsg = `Failed to import "${article.title}": ${importResult.error}`;
          console.log(`❌ ${errorMsg}`);
          // Only add to errors if it's not a duplicate (we already reported skipped count)
          if (!importResult.skipped) {
            result.errors.push(errorMsg);
          }
        }

        // Rate limiting between articles (important for scraping)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error: any) {
        result.failed++;
        const errorMsg = `Error processing "${article.title}": ${error.message}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
      }
    }

    console.log('[POST /api/admin/import-news] Import complete');
    console.log(`✅ Imported: ${result.imported}, ❌ Failed: ${result.failed}`);

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error: any) {
    console.error('[POST /api/admin/import-news] Fatal error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      result
    }, { status: 500 });
  }
}
