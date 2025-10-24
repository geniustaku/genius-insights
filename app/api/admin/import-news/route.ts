// app/api/admin/import-news/route.ts
import { NextRequest, NextResponse } from 'next/server';

const NewsAPI = require('newsapi');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');

// Initialize News API
const newsapi = new NewsAPI(process.env.NEWS_API_KEY || '6bffbb338ace4364bd138d765b4c36a7');

interface ImportResult {
  timestamp: string;
  queriesRun: number;
  articlesFound: number;
  uniqueArticles: number;
  validArticles: number;
  imported: number;
  failed: number;
  errors: string[];
}

/**
 * Fetch and extract full article content from URL
 */
async function extractFullArticle(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      const cleanContent = article.textContent.replace(/\s+/g, ' ').trim();
      const wordCount = cleanContent.split(/\s+/).length;

      return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt || cleanContent.substring(0, 300) + '...',
        wordCount
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Generate SEO keywords for article
 */
function generateSEOKeywords(article: any, category: string): string[] {
  const keywords = new Set<string>();

  // Core South Africa keywords
  keywords.add('South Africa');
  keywords.add('South African');
  keywords.add('SA');

  // Category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    'Business': ['business', 'economy', 'entrepreneurship', 'commerce', 'trade', 'investment', 'market', 'startup', 'company', 'corporate'],
    'Banking': ['banking', 'finance', 'financial services', 'fintech', 'loans', 'credit', 'savings', 'payment', 'digital banking'],
    'Property': ['property', 'real estate', 'housing', 'mortgage', 'rental', 'property market', 'home buying', 'investment property'],
    'Tax & SARS': ['tax', 'SARS', 'taxation', 'tax compliance', 'tax planning', 'income tax', 'VAT', 'tax return'],
    'Insurance': ['insurance', 'medical aid', 'life insurance', 'short-term insurance', 'insurance claims', 'coverage']
  };

  // Add category keywords
  const catKeywords = categoryKeywords[category] || categoryKeywords['Business'];
  catKeywords.forEach(kw => keywords.add(kw));

  // Location keywords
  const locations = ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Port Elizabeth'];
  locations.forEach(loc => keywords.add(loc));

  // Industry terms
  const industryTerms = ['fintech', 'innovation', 'technology', 'digital transformation', 'African market'];
  industryTerms.forEach(term => keywords.add(term));

  // Extract keywords from title
  const titleWords = article.title.toLowerCase().split(/\s+/);
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'been', 'were', 'their', 'there', 'what', 'when', 'where', 'which', 'while'];
  titleWords.forEach((word: string) => {
    if (word.length > 4 && !stopWords.includes(word)) {
      keywords.add(word);
    }
  });

  return Array.from(keywords).slice(0, 20);
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
 * Check if article is valid for import
 */
function isArticleValid(article: any): boolean {
  if (!article.title || article.title.trim().length === 0) return false;
  if (article.title === '[Removed]' || article.description === '[Removed]') return false;
  if (!article.description && !article.content) return false;

  const text = (article.title + ' ' + (article.description || '')).toLowerCase();
  if (!text.includes('south africa') && !text.includes('sa ') &&
      !text.includes('cape town') && !text.includes('johannesburg') &&
      !text.includes('pretoria') && !text.includes('durban')) {
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
 * Transform News API article to website article format
 */
async function transformArticle(newsArticle: any): Promise<any> {
  // Try to extract full content
  let fullArticle = null;
  try {
    fullArticle = await extractFullArticle(newsArticle.url);
  } catch (error) {
    console.log('Could not extract full content from:', newsArticle.url);
  }

  const articleContent = fullArticle ? fullArticle.content : newsArticle.content;
  const category = categorizeArticle(newsArticle);
  const slug = createSlug(newsArticle.title);
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

  const seoTitle = `${newsArticle.title} | South Africa ${category} News | Genius Insights`;
  const seoDescription = excerpt.substring(0, 155) + ` - Latest ${category.toLowerCase()} news and insights from South Africa.`;

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
 * Import article to website
 */
async function importArticleToWebsite(article: any): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result
    };
  } catch (error: any) {
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
  const result: ImportResult = {
    timestamp: new Date().toISOString(),
    queriesRun: 0,
    articlesFound: 0,
    uniqueArticles: 0,
    validArticles: 0,
    imported: 0,
    failed: 0,
    errors: []
  };

  try {
    const queries = [
      'South Africa technology',
      'South Africa tech startup',
      'South Africa business',
      'South Africa fintech',
      'South Africa innovation'
    ];

    result.queriesRun = queries.length;
    let allArticles: any[] = [];

    // Fetch news for each query
    for (const query of queries) {
      try {
        const response = await newsapi.v2.everything({
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10,
          from: getDateDaysAgo(7),
        });

        if (response.articles && response.articles.length > 0) {
          allArticles = allArticles.concat(response.articles);
        }
      } catch (error: any) {
        result.errors.push(`Error fetching "${query}": ${error.message}`);
      }
    }

    result.articlesFound = allArticles.length;

    // Remove duplicates
    const uniqueArticles = removeDuplicates(allArticles);
    result.uniqueArticles = uniqueArticles.length;

    // Filter valid articles
    const validArticles = uniqueArticles.filter(article => isArticleValid(article));
    result.validArticles = validArticles.length;

    // Transform and import articles
    for (const article of validArticles) {
      try {
        const transformed = await transformArticle(article);
        const importResult = await importArticleToWebsite(transformed);

        if (importResult.success) {
          result.imported++;
        } else {
          result.failed++;
          result.errors.push(`Failed to import "${article.title}": ${importResult.error}`);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error: any) {
        result.failed++;
        result.errors.push(`Error processing "${article.title}": ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      result
    }, { status: 500 });
  }
}
