#!/usr/bin/env node
/**
 * Delete test and old imported articles via API
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

async function deleteTestArticles() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🗑️  Deleting Test and Old Imported Articles');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Fetch all articles
    const response = await fetch('http://localhost:3000/api/admin/articles?limit=50');

    if (!response.ok) {
      console.error('Failed to fetch articles:', response.status);
      return;
    }

    const data = await response.json();
    const articles = data.articles || [];

    // Filter articles to delete
    const toDelete = articles.filter(article => {
      const title = article.title || '';
      const author = article.author || '';

      return (
        title.includes('Test Article') ||
        title.includes('South African leader talks trade') ||
        title.includes("South Africa's $25 Billion Grid Build") ||
        author === 'RT' ||
        author === 'Bloomberg News' ||
        author === 'Test Author'
      );
    });

    if (toDelete.length === 0) {
      console.log('No articles to delete.');
      return;
    }

    console.log(`Found ${toDelete.length} articles to delete:\n`);
    toDelete.forEach((article, i) => {
      console.log(`${i + 1}. ${article.title} (ID: ${article.id})`);
    });

    console.log('\n🗑️  Deleting...\n');

    for (const article of toDelete) {
      const deleteResponse = await fetch(`http://localhost:3000/api/admin/articles?id=${article.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (deleteResponse.ok) {
        console.log(`✓ Deleted: ${article.title}`);
      } else {
        console.log(`✗ Failed to delete: ${article.title}`);
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Successfully processed ${toDelete.length} articles`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteTestArticles();
