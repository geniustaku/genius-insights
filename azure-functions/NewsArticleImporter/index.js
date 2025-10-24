// Azure Function: NewsArticleImporter
// Runs every 6 hours to fetch South African tech and business news

const NewsAPI = require('newsapi');
const fetch = require('node-fetch');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');

// Initialize News API
const newsapi = new NewsAPI(process.env.NEWS_API_KEY || '6bffbb338ace4364bd138d765b4c36a7');

// Your website URL (change this for production)
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000';

/**
 * Fetch and extract full article content from URL
 */
async function extractFullArticle(url, context) {
  try {
    context.log(`Fetching full content from: ${url.substring(0, 60)}...`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      context.log(`Failed to fetch (${response.status})`);
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      const cleanContent = article.textContent.replace(/\s+/g, ' ').trim();
      const wordCount = cleanContent.split(/\s+/).length;
      context.log(`Extracted ${wordCount} words`);

      return {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt || cleanContent.substring(0, 300) + '...'
      };
    }

    return null;
  } catch (error) {
    context.log.error(`Extraction error: ${error.message}`);
    return null;
  }
}

/**
 * Main Azure Function handler
 */
module.exports = async function (context, myTimer) {
  context.log('News Article Importer started at:', new Date().toISOString());

  try {
    // Fetch news articles from multiple queries for better coverage
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
      context.log(`Fetching news for: ${query}`);

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
          context.log(`Found ${response.articles.length} articles for "${query}"`);
        }
      } catch (error) {
        context.log.error(`Error fetching news for "${query}":`, error.message);
      }
    }

    // Remove duplicates (same URL)
    const uniqueArticles = removeDuplicates(allArticles);
    context.log(`Total unique articles found: ${uniqueArticles.length}`);

    // Filter valid articles
    const validArticles = uniqueArticles.filter(article => isArticleValid(article));
    context.log(`Valid articles found: ${validArticles.length}`);

    // Transform articles (with full content extraction)
    const transformedArticles = [];
    for (const article of validArticles) {
      context.log(`Transforming: ${article.title}`);
      const transformed = await transformArticle(article, context);
      transformedArticles.push(transformed);
      await sleep(1000); // Rate limit
    }

    context.log(`Articles ready to import: ${transformedArticles.length}`);

    // Import articles to your website
    let imported = 0;
    let failed = 0;

    for (const article of transformedArticles) {
      try {
        const result = await importArticleToWebsite(article, context);
        if (result.success) {
          imported++;
          context.log(`✓ Imported: ${article.title}`);
        } else {
          failed++;
          context.log(`✗ Failed: ${article.title} - ${result.error}`);
        }
      } catch (error) {
        failed++;
        context.log.error(`✗ Error importing "${article.title}":`, error.message);
      }

      // Rate limiting: wait 500ms between requests
      await sleep(500);
    }

    const summary = {
      timestamp: new Date().toISOString(),
      queriesRun: queries.length,
      articlesFound: allArticles.length,
      uniqueArticles: uniqueArticles.length,
      validArticles: transformedArticles.length,
      imported: imported,
      failed: failed
    };

    context.log('Import Summary:', summary);
    context.res = { body: summary };

  } catch (error) {
    context.log.error('Fatal error in News Article Importer:', error);
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};

/**
 * Generate SEO keywords for article
 */
function generateSEOKeywords(article, category) {
  const keywords = new Set();

  // Core South Africa keywords
  keywords.add('South Africa');
  keywords.add('South African');
  keywords.add('SA');

  // Category-specific keywords
  const categoryKeywords = {
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

  // Extract keywords from title (filter out common words)
  const titleWords = article.title.toLowerCase().split(/\s+/);
  titleWords.forEach(word => {
    if (word.length > 4 && !isStopWord(word)) {
      keywords.add(word);
    }
  });

  return Array.from(keywords).slice(0, 20);
}

/**
 * Check if word is a stop word
 */
function isStopWord(word) {
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'been', 'were', 'their', 'there', 'what', 'when', 'where', 'which', 'while'];
  return stopWords.includes(word);
}

/**
 * Transform News API article to your article format
 */
async function transformArticle(newsArticle, context) {
  // Try to extract full article content
  let fullArticle = null;
  try {
    fullArticle = await extractFullArticle(newsArticle.url, context);
  } catch (error) {
    context.log(`Could not extract full content: ${error.message}`);
  }

  // Use full content if available, otherwise use API content
  const articleContent = fullArticle ? fullArticle.content : newsArticle.content;

  // Determine category based on content
  const category = categorizeArticle(newsArticle);

  // Generate slug from title
  const slug = createSlug(newsArticle.title);

  // Extract clean excerpt
  const excerpt = fullArticle?.excerpt || newsArticle.description ||
                  (articleContent ? articleContent.substring(0, 300) + '...' : '');

  // Create article content in HTML format
  const content = generateArticleContent({
    ...newsArticle,
    content: articleContent
  });

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const reading_time = Math.max(1, Math.ceil(wordCount / 200));

  // Generate SEO metadata
  const seoKeywords = generateSEOKeywords({
    title: newsArticle.title,
    description: excerpt,
    content: articleContent
  }, category);

  const seoTitle = `${newsArticle.title} | South Africa ${category} News | Genius Insights`;
  const seoDescription = excerpt.substring(0, 155) + ` - Latest ${category.toLowerCase()} news and insights from South Africa.`;

  return {
    title: newsArticle.title,
    slug: slug,
    excerpt: excerpt.substring(0, 300),
    content: content,
    category: category,
    author: newsArticle.author || newsArticle.source.name || 'News Team',
    is_published: true,
    reading_time: reading_time,
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
 * Generate HTML content from news article with full content and context
 */
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
    const paragraphs = content.split(/\n+/).filter(p => p.trim());
    paragraphs.forEach(paragraph => {
      const trimmed = paragraph.trim();
      if (trimmed) {
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

/**
 * Generate additional contextual content based on the article topic
 */
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

/**
 * Categorize article based on content
 */
function categorizeArticle(article) {
  const title = (article.title || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = title + ' ' + description;

  // Category keywords
  const categories = {
    'Business': ['business', 'economy', 'market', 'company', 'startup', 'entrepreneur', 'investment'],
    'Tax & SARS': ['tax', 'sars', 'revenue', 'vat', 'customs', 'duties'],
    'Banking': ['bank', 'banking', 'finance', 'loan', 'credit', 'fintech', 'payment'],
    'Property': ['property', 'real estate', 'housing', 'mortgage', 'rental'],
    'Insurance': ['insurance', 'medical aid', 'cover', 'policy', 'claim']
  };

  // Score each category
  let bestCategory = 'Business'; // Default
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
function isArticleValid(article) {
  // Must have title
  if (!article.title || article.title.trim().length === 0) {
    return false;
  }

  // Filter out articles with [Removed] content
  if (article.title === '[Removed]' || article.description === '[Removed]') {
    return false;
  }

  // Must have some content
  if (!article.description && !article.content) {
    return false;
  }

  // Check if South Africa related
  const text = (article.title + ' ' + (article.description || '')).toLowerCase();
  if (!text.includes('south africa') && !text.includes('sa ') &&
      !text.includes('cape town') && !text.includes('johannesburg') &&
      !text.includes('pretoria') && !text.includes('durban')) {
    return false;
  }

  return true;
}

/**
 * Import article to your website via API
 */
async function importArticleToWebsite(article, context) {
  try {
    const response = await fetch(`${WEBSITE_URL}/api/admin/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication header if your API requires it
        // 'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`
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
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Remove duplicate articles by URL
 */
function removeDuplicates(articles) {
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
 * Create URL-friendly slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100); // Limit length
}

/**
 * Escape HTML special characters
 */
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

/**
 * Get date N days ago in ISO format
 */
function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * Sleep helper for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
