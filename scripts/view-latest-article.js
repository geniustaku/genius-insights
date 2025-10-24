#!/usr/bin/env node
/**
 * View the latest imported article to see the content structure
 */

const https = require('https');
const http = require('http');

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const req = protocol.request(url, {
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
}

async function viewLatestArticle() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📰 Latest Imported Article');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    const response = await fetch('http://localhost:3000/api/admin/articles?limit=1');

    if (!response.ok) {
      console.error('Failed to fetch articles:', response.status);
      return;
    }

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      console.log('No articles found.');
      return;
    }

    const article = articles[0];

    console.log('📌 TITLE:');
    console.log(article.title);
    console.log('\n📝 CATEGORY:', article.category);
    console.log('✍️  AUTHOR:', article.author);
    console.log('⏱️  READING TIME:', article.reading_time, 'min');
    console.log('🔗 SLUG:', article.slug);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 EXCERPT:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(article.excerpt);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📰 FULL CONTENT (HTML):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(article.content);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CONTENT INCLUDES:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Analyze content
    const hasImage = article.content.includes('<img');
    const hasLeadParagraph = article.content.includes('text-lg font-semibold');
    const hasContextBox = article.content.includes('border-l-4');
    const hasSourceAttribution = article.content.includes('Source Information');
    const hasOriginalLink = article.content.includes('View Original Article');

    console.log(hasImage ? '✅ Hero Image' : '❌ No Hero Image');
    console.log(hasLeadParagraph ? '✅ Lead Paragraph (bold intro)' : '❌ No Lead Paragraph');
    console.log(hasContextBox ? '✅ SA Context Box' : '❌ No Context Box');
    console.log(hasSourceAttribution ? '✅ Source Attribution' : '❌ No Source Attribution');
    console.log(hasOriginalLink ? '✅ Link to Original Article' : '❌ No Original Link');

    // Count sections
    const paragraphs = (article.content.match(/<p[^>]*>/g) || []).length;
    const contextBoxes = (article.content.match(/border-l-4/g) || []).length;

    console.log('\n📊 CONTENT STATS:');
    console.log('   • Paragraphs:', paragraphs);
    console.log('   • Context Boxes:', contextBoxes);
    console.log('   • Content Length:', article.content.length, 'characters');
    console.log('   • Reading Time:', article.reading_time, 'minutes');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🌐 VIEW ARTICLE:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`Admin Panel: http://localhost:3000/admin`);
    console.log(`Article Page: http://localhost:3000/articles/${article.slug}`);
    console.log(`All Articles: http://localhost:3000/articles`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

viewLatestArticle();
