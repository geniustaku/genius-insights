#!/usr/bin/env node
/**
 * Local testing script for News API article import
 * Run this to test the news import without deploying to Azure
 *
 * Usage:
 *   node scripts/test-news-import.js
 *   node scripts/test-news-import.js --dry-run  (preview only, don't create articles)
 *   node scripts/test-news-import.js --limit 5   (limit to 5 articles)
 */

const NewsAPI = require('newsapi');

// Use native fetch if available (Node 18+), otherwise use https
let fetch;
if (typeof globalThis.fetch === 'function') {
  fetch = globalThis.fetch;
} else {
  // Fallback to https for older Node versions
  const https = require('https');
  fetch = async (url, options = {}) => {
    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: options.method || 'GET',
        headers: options.headers || {}
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            text: async () => data,
            json: async () => JSON.parse(data)
          });
        });
      });
      req.on('error', reject);
      if (options.body) {
        req.write(options.body);
      }
      req.end();
    });
  };
}

// Article extraction libraries
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');

/**
 * Fetch and extract full article content from URL
 * @param {string} url - Article URL
 * @returns {Promise<{title: string, content: string, excerpt: string} | null>}
 */
async function extractFullArticle(url) {
  try {
    console.log(`      🔍 Fetching full content from: ${url.substring(0, 60)}...`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.log(`      ⚠️  Failed to fetch (${response.status})`);
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      // Clean up the text content
      const cleanContent = article.textContent
        .replace(/\s+/g, ' ')  // Normalize whitespace
        .trim();

      const wordCount = cleanContent.split(/\s+/).length;
      console.log(`      ✅ Extracted ${wordCount} words`);

      return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt || cleanContent.substring(0, 300) + '...'
      };
    }

    console.log(`      ⚠️  Could not parse article content`);
    return null;

  } catch (error) {
    console.log(`      ⚠️  Extraction error: ${error.message}`);
    return null;
  }
}

/**
 * Generate SEO keywords from article content
 * @param {object} article - Article with title, description, content
 * @param {string} category - Article category
 * @returns {Array<string>} - Array of SEO keywords
 */
function generateSEOKeywords(article, category) {
  const keywords = new Set();

  // Always include South Africa variants
  keywords.add('South Africa');
  keywords.add('South African');
  keywords.add('SA');

  // Add category-specific keywords
  const categoryKeywords = {
    'Business': ['business', 'economy', 'entrepreneurship', 'commerce', 'trade', 'investment', 'market'],
    'Banking': ['banking', 'finance', 'financial services', 'fintech', 'loans', 'credit', 'savings'],
    'Tax & SARS': ['tax', 'SARS', 'taxation', 'tax returns', 'tax filing', 'revenue', 'tax compliance'],
    'Property': ['property', 'real estate', 'housing', 'property market', 'buying property', 'mortgage'],
    'Insurance': ['insurance', 'cover', 'medical aid', 'life insurance', 'short-term insurance', 'policy']
  };

  if (categoryKeywords[category]) {
    categoryKeywords[category].forEach(kw => keywords.add(kw));
  }

  // Extract important terms from title (all words 4+ chars)
  const title = article.title || '';
  const titleWords = title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 4 && !isStopWord(word));
  titleWords.forEach(word => keywords.add(word));

  // Extract key phrases from content (2-3 word combinations that appear multiple times)
  const content = (article.content || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const fullText = `${title.toLowerCase()} ${description} ${content}`;

  // Common South African business/finance terms
  const saTerms = [
    'johannesburg', 'cape town', 'pretoria', 'durban',
    'fintech', 'startup', 'innovation', 'technology',
    'investment', 'funding', 'venture capital',
    'economic growth', 'digital transformation',
    'financial sector', 'emerging market'
  ];

  saTerms.forEach(term => {
    if (fullText.includes(term)) {
      keywords.add(term);
    }
  });

  // Add location-specific keywords if mentioned
  const cities = ['johannesburg', 'cape town', 'pretoria', 'durban', 'port elizabeth', 'bloemfontein'];
  cities.forEach(city => {
    if (fullText.includes(city)) {
      keywords.add(city);
      keywords.add(city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    }
  });

  // Convert to array, limit to 15-20 keywords, prioritize longer more specific terms
  return Array.from(keywords)
    .filter(kw => kw.length >= 2)
    .sort((a, b) => {
      // Prioritize multi-word keywords
      const aWords = a.split(' ').length;
      const bWords = b.split(' ').length;
      if (aWords !== bWords) return bWords - aWords;
      return b.length - a.length;
    })
    .slice(0, 20);
}

/**
 * Check if word is a common stop word
 */
function isStopWord(word) {
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'into', 'year', 'your', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
    'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after',
    'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new',
    'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was'
  ]);
  return stopWords.has(word.toLowerCase());
}

// Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || '6bffbb338ace4364bd138d765b4c36a7';
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000';

// Command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find(arg => arg.startsWith('--limit='));
const importLimit = limitArg ? parseInt(limitArg.split('=')[1]) : 999;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 Genius Insights - News Article Importer');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`Mode: ${isDryRun ? '🔍 DRY RUN (preview only)' : '✍️  LIVE IMPORT'}`);
console.log(`Target: ${WEBSITE_URL}`);
console.log(`Limit: ${importLimit} articles\n`);

// Initialize News API
const newsapi = new NewsAPI(NEWS_API_KEY);

async function main() {
  try {
    console.log('📰 Fetching news from News API...\n');

    // Queries focused on South African tech and business
    const queries = [
      'South Africa technology',
      'South Africa tech startup',
      'South Africa business',
      'South Africa fintech',
      'South Africa innovation'
    ];

    let allArticles = [];

    // Fetch news for each query
    for (const query of queries) {
      console.log(`   Searching: "${query}"`);

      try {
        const response = await newsapi.v2.everything({
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10,
          from: getDateDaysAgo(7), // Last 7 days
        });

        if (response.articles && response.articles.length > 0) {
          allArticles = allArticles.concat(response.articles);
          console.log(`   ✓ Found ${response.articles.length} articles`);
        } else {
          console.log(`   ✗ No articles found`);
        }
      } catch (error) {
        console.error(`   ✗ Error: ${error.message}`);
      }

      // Rate limiting
      await sleep(500);
    }

    console.log(`\n📊 Total articles fetched: ${allArticles.length}`);

    // Remove duplicates
    const uniqueArticles = removeDuplicates(allArticles);
    console.log(`📊 Unique articles: ${uniqueArticles.length}`);

    // Filter and transform
    const validArticles = uniqueArticles.filter(article => isArticleValid(article));
    console.log(`📊 Valid SA articles: ${validArticles.length}\n`);

    if (validArticles.length === 0) {
      console.log('⚠️  No valid articles found to import.');
      console.log('💡 Try adjusting the search queries or date range.\n');
      return;
    }

    // Transform articles (now async to fetch full content)
    const articlesToTransform = validArticles.slice(0, importLimit);
    const transformedArticles = [];

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 EXTRACTING FULL CONTENT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (let i = 0; i < articlesToTransform.length; i++) {
      console.log(`   [${i + 1}/${articlesToTransform.length}] ${articlesToTransform[i].title}`);
      const transformed = await transformArticle(articlesToTransform[i]);
      transformedArticles.push(transformed);
      await sleep(1000); // Be nice to the source websites
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 ARTICLES TO IMPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    transformedArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Author: ${article.author}`);
      console.log(`   Source: ${article.source_name}`);
      console.log(`   Reading time: ${article.reading_time} min`);
      console.log(`   Published: ${new Date(article.published_at).toLocaleDateString()}`);
      console.log(`   Slug: ${article.slug}`);
      console.log('');
    });

    if (isDryRun) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔍 DRY RUN MODE - No articles were created');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('💡 Run without --dry-run to actually import articles\n');
      return;
    }

    // Import articles
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✍️  IMPORTING ARTICLES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let imported = 0;
    let failed = 0;
    const errors = [];

    for (const article of transformedArticles) {
      try {
        const result = await importArticleToWebsite(article);
        if (result.success) {
          imported++;
          console.log(`✓ Imported: ${article.title}`);
        } else {
          failed++;
          console.log(`✗ Failed: ${article.title}`);
          console.log(`  Error: ${result.error}`);
          errors.push({ title: article.title, error: result.error });
        }
      } catch (error) {
        failed++;
        console.log(`✗ Error: ${article.title}`);
        console.log(`  ${error.message}`);
        errors.push({ title: article.title, error: error.message });
      }

      // Rate limiting
      await sleep(500);
    }

    // Summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📈 IMPORT SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total processed: ${transformedArticles.length}\n`);

    if (errors.length > 0) {
      console.log('❌ ERRORS:\n');
      errors.forEach(err => {
        console.log(`   • ${err.title}`);
        console.log(`     ${err.error}\n`);
      });
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Helper functions (same as Azure Function)

async function transformArticle(newsArticle) {
  const category = categorizeArticle(newsArticle);
  const slug = createSlug(newsArticle.title);

  // Try to extract full article content from the source URL
  const fullArticle = await extractFullArticle(newsArticle.url);

  // Use full content if available, otherwise fall back to News API snippet
  const articleContent = fullArticle ? fullArticle.content : newsArticle.content;
  const articleExcerpt = fullArticle ? fullArticle.excerpt :
                        (newsArticle.description ||
                         (newsArticle.content ? newsArticle.content.substring(0, 200) + '...' : ''));

  // Generate HTML content with the full article text
  const content = generateArticleContent({
    ...newsArticle,
    content: articleContent,
    description: articleExcerpt
  });

  const wordCount = content.split(/\s+/).length;
  const reading_time = Math.max(1, Math.ceil(wordCount / 200));

  // Generate SEO keywords from content
  const seoKeywords = generateSEOKeywords({
    title: newsArticle.title,
    description: articleExcerpt,
    content: articleContent
  }, category);

  // Generate SEO-optimized title and description
  const seoTitle = `${newsArticle.title} | South Africa ${category} News | Genius Insights`;
  const seoDescription = articleExcerpt.substring(0, 155).replace(/<[^>]*>/g, '').trim() +
    ` - Latest ${category.toLowerCase()} news and insights from South Africa.`;

  return {
    title: newsArticle.title,
    slug: slug,
    excerpt: articleExcerpt.substring(0, 300),
    content: content,
    category: category,
    author: newsArticle.author || newsArticle.source.name || 'News Team',
    is_published: true,
    reading_time: reading_time,
    featured_image: newsArticle.urlToImage || '',
    published_at: newsArticle.publishedAt,
    source_url: newsArticle.url,
    source_name: newsArticle.source.name,
    // SEO fields
    seo_title: seoTitle,
    seo_description: seoDescription,
    seo_keywords: seoKeywords
  };
}

function generateArticleContent(newsArticle) {
  let html = '';

  // Add main image if available
  if (newsArticle.urlToImage) {
    html += `<div class="article-image mb-6">
      <img src="${newsArticle.urlToImage}" alt="${escapeHtml(newsArticle.title)}" class="w-full rounded-lg shadow-lg" />
    </div>\n\n`;
  }

  // Add introduction/description as lead paragraph
  if (newsArticle.description) {
    html += `<p class="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">${escapeHtml(newsArticle.description)}</p>\n\n`;
  }

  // Add main content - expand it with all available information
  if (newsArticle.content) {
    // Remove the truncation marker from News API
    let content = newsArticle.content.replace(/\[\+\d+\s+chars\]$/i, '');

    // Split into paragraphs and format each
    // Handle both newline-separated paragraphs and long text that needs to be split
    let paragraphs = content.split(/\n+/).filter(p => p.trim());

    // If we got a single long paragraph (like from Readability), split it better
    if (paragraphs.length === 1 && paragraphs[0].length > 500) {
      // Split on sentence boundaries followed by space and capital letter
      const sentences = paragraphs[0].match(/[^.!?]+[.!?]+/g) || [paragraphs[0]];
      paragraphs = [];
      let currentPara = '';

      sentences.forEach(sentence => {
        currentPara += sentence;
        // Create a new paragraph every 3-4 sentences or 400-500 chars
        if (currentPara.length > 400 || (currentPara.split(/[.!?]/).length > 3 && currentPara.length > 200)) {
          paragraphs.push(currentPara.trim());
          currentPara = '';
        }
      });

      if (currentPara.trim()) {
        paragraphs.push(currentPara.trim());
      }
    }

    paragraphs.forEach(paragraph => {
      const trimmed = paragraph.trim();
      if (trimmed && trimmed.length > 20) { // Skip very short fragments
        html += `<p class="mb-4 text-gray-800 leading-relaxed">${escapeHtml(trimmed)}</p>\n\n`;
      }
    });
  }

  // Add comprehensive context about the topic
  html += generateContextualContent(newsArticle);

  // Add source attribution at the bottom - AFTER all content
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
          This article contains information originally published by <strong class="text-blue-700">${escapeHtml(newsArticle.source.name)}</strong> on ${new Date(newsArticle.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
        <p class="text-sm text-gray-600 mb-4">
          We've curated this content to bring you the latest South African tech and business news. The article has been formatted and presented here for your convenience with full attribution to the original source.
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

// Generate additional contextual content based on the article topic
function generateContextualContent(newsArticle) {
  let html = '';
  const title = newsArticle.title.toLowerCase();
  const description = (newsArticle.description || '').toLowerCase();
  const content = (newsArticle.content || '').toLowerCase();
  const fullText = title + ' ' + description + ' ' + content;

  // Add relevant South African context based on keywords
  if (fullText.includes('fintech') || fullText.includes('banking') || fullText.includes('financial')) {
    html += `\n<div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
      <h3 class="font-bold text-blue-900 mb-3 text-lg">💼 South African Financial Sector Context</h3>
      <p class="text-blue-800 mb-3">
        South Africa's financial technology sector has been experiencing rapid growth, with increased investment in digital banking, mobile payments, and innovative financial services. The country's regulatory environment through the South African Reserve Bank (SARB) and Financial Sector Conduct Authority (FSCA) continues to evolve to support fintech innovation while ensuring consumer protection.
      </p>
      <p class="text-blue-800">
        This development is part of a broader digital transformation across South African industries, positioning the country as a leader in African financial technology.
      </p>
    </div>\n\n`;
  }

  if (fullText.includes('startup') || fullText.includes('entrepreneur') || fullText.includes('funding') || fullText.includes('investment')) {
    html += `\n<div class="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-lg">
      <h3 class="font-bold text-green-900 mb-3 text-lg">🚀 South African Startup Ecosystem</h3>
      <p class="text-green-800 mb-3">
        South Africa's startup ecosystem, particularly in Cape Town and Johannesburg, has been attracting significant international attention and investment. The country serves as a gateway to African markets and has produced several successful tech companies that have expanded globally.
      </p>
      <p class="text-green-800">
        Government initiatives, accelerator programs, and increased venture capital availability are contributing to a thriving entrepreneurial environment across multiple sectors including technology, renewable energy, and e-commerce.
      </p>
    </div>\n\n`;
  }

  if (fullText.includes('technology') || fullText.includes(' tech ') || fullText.includes('digital') || fullText.includes('innovation')) {
    html += `\n<div class="bg-purple-50 border-l-4 border-purple-500 p-6 my-6 rounded-r-lg">
      <h3 class="font-bold text-purple-900 mb-3 text-lg">💻 Technology in South Africa</h3>
      <p class="text-purple-800 mb-3">
        South Africa continues to strengthen its position as a technology hub in Africa, with growing investments in infrastructure, skills development, and innovation. The country's well-developed telecommunications infrastructure and educated workforce make it an attractive destination for tech companies and digital initiatives.
      </p>
      <p class="text-purple-800">
        Major tech hubs in Cape Town, Johannesburg, and Pretoria are fostering collaboration between established companies, startups, and academic institutions to drive technological advancement across the continent.
      </p>
    </div>\n\n`;
  }

  if (fullText.includes('economy') || fullText.includes('market') || fullText.includes('trade') || fullText.includes('business')) {
    html += `\n<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6 rounded-r-lg">
      <h3 class="font-bold text-yellow-900 mb-3 text-lg">📈 Economic Impact & Business Environment</h3>
      <p class="text-yellow-800 mb-3">
        South Africa's economy, the most industrialized in Africa, plays a crucial role in the continent's economic landscape. Recent developments in various sectors reflect ongoing efforts to attract foreign investment, create jobs, and drive sustainable economic growth.
      </p>
      <p class="text-yellow-800">
        The government's focus on economic transformation, infrastructure development, and supporting key industries continues to shape the business environment and create opportunities for both local and international investors.
      </p>
    </div>\n\n`;
  }

  return html;
}

function categorizeArticle(article) {
  const title = (article.title || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = title + ' ' + description;

  const categories = {
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

function isArticleValid(article) {
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

async function importArticleToWebsite(article) {
  try {
    const response = await fetch(`${WEBSITE_URL}/api/admin/articles`, {
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
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function removeDuplicates(articles) {
  const seen = new Set();
  return articles.filter(article => {
    if (seen.has(article.url)) return false;
    seen.add(article.url);
    return true;
  });
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
