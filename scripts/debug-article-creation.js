#!/usr/bin/env node
/**
 * Debug script to test article creation
 * This will show exactly what data is being sent and what error occurs
 */

// Use native fetch
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

const testArticle = {
  title: "Test Article: South Africa Tech News",
  slug: "test-article-south-africa-tech-news",
  excerpt: "This is a test article to debug the import system.",
  content: `<p>This is a test article about South African technology.</p>

<p>It includes multiple paragraphs to test the content formatting.</p>

<div class="article-source mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
  <h3 class="font-semibold text-gray-900 mb-2">Article Source</h3>
  <p class="text-sm text-gray-600">
    This article was originally published by <strong>Test Source</strong>.
  </p>
  <a href="https://example.com/test" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
    Read original article →
  </a>
</div>`,
  category: "Business",
  author: "Test Author",
  is_published: true,
  reading_time: 2,
  featured_image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
  published_at: new Date().toISOString()
};

async function testArticleCreation() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 Article Creation Debug Test');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📝 Test Article Data:');
  console.log(JSON.stringify(testArticle, null, 2));
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    console.log('📡 Sending POST request to http://localhost:3000/api/admin/articles\n');

    const response = await fetch('http://localhost:3000/api/admin/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testArticle)
    });

    const responseText = await response.text();

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Response:`, responseText);

    if (response.ok) {
      console.log('\n✅ SUCCESS! Article created successfully.');
      const data = JSON.parse(responseText);
      console.log('Article ID:', data.article?.id);
      console.log('Article Slug:', data.article?.slug);
    } else {
      console.log('\n❌ FAILED! Article creation failed.');
      console.log('\nPossible issues:');
      console.log('1. Database connection problem');
      console.log('2. Database schema mismatch');
      console.log('3. Missing required fields');
      console.log('4. SQL Server not running');
      console.log('\nCheck your Next.js server logs for more details.');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nMake sure:');
    console.error('1. Your dev server is running (npm run dev)');
    console.error('2. The server is accessible at http://localhost:3000');
    console.error('3. Database is connected');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

testArticleCreation();
