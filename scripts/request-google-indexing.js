const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyBa1btWkbw2CPmxQ9D-ruw6fzw1EC629fE",
  authDomain: "genius-sa-tools.firebaseapp.com",
  projectId: "genius-sa-tools",
  storageBucket: "genius-sa-tools.firebasestorage.app",
  messagingSenderId: "216840912866",
  appId: "1:216840912866:web:ae24f91f0979aaef1f03bb",
  measurementId: "G-5HP57NKK9Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_URL = 'https://www.genius-insights.co.za';

// Service account key file path (you'll need to create this)
const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, '..', 'google-service-account.json');

async function requestIndexing() {
  console.log('🚀 Starting Google Indexing API requests...\n');

  // Check if service account key exists
  if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
    console.error('❌ Error: google-service-account.json not found!');
    console.log('\n📋 Setup Instructions:');
    console.log('1. Go to: https://console.cloud.google.com/');
    console.log('2. Enable "Web Search Indexing API"');
    console.log('3. Create a Service Account');
    console.log('4. Download JSON key as "google-service-account.json"');
    console.log('5. Add service account email to Google Search Console (as Owner)');
    console.log('6. Place the file in the project root directory\n');
    process.exit(1);
  }

  try {
    // Load service account credentials
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8'));

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    // Fetch all published articles from Firebase
    const articlesRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesRef);

    const articles = querySnapshot.docs
      .map(doc => doc.data())
      .filter(article => article.is_published)
      .sort((a, b) => {
        const dateA = a.published_at?.toDate?.() || new Date(a.published_at);
        const dateB = b.published_at?.toDate?.() || new Date(b.published_at);
        return dateB.getTime() - dateA.getTime();
      });

    console.log(`📊 Found ${articles.length} published articles\n`);

    // Priority articles (high-traffic categories)
    const priorityCategories = ['Finance', 'Property', 'Business'];
    const priorityArticles = articles.filter(a => priorityCategories.includes(a.category));

    console.log(`⭐ Priority articles (${priorityCategories.join(', ')}): ${priorityArticles.length}\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Request indexing for priority articles first
    console.log('📝 Requesting indexing for priority articles...\n');

    for (const article of priorityArticles.slice(0, 20)) { // Limit to 20 to avoid quota issues
      const url = `${BASE_URL}/guides/${article.slug}`;

      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED', // or 'URL_DELETED' to remove from index
          },
        });

        console.log(`✅ ${article.title.substring(0, 60)}...`);
        console.log(`   ${url}`);
        successCount++;

        // Add delay to avoid rate limiting (200 requests/day limit)
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Failed: ${article.title.substring(0, 60)}...`);
        console.error(`   Error: ${error.message}`);
        errorCount++;
        errors.push({ url, error: error.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Indexing Request Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📝 Total articles in database: ${articles.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(e => {
        console.log(`   ${e.url}: ${e.error}`);
      });
    }

    console.log('\n💡 Note: Google limits to 200 indexing requests per day.');
    console.log('💡 Run this script daily to index more articles.');
    console.log('💡 Check status in Google Search Console after 24-48 hours.\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);

    if (error.message.includes('API has not been used')) {
      console.log('\n📋 You need to enable the Web Search Indexing API:');
      console.log('1. Go to: https://console.cloud.google.com/apis/library/indexing.googleapis.com');
      console.log('2. Click "Enable"');
      console.log('3. Wait a few minutes, then try again\n');
    }

    if (error.message.includes('permission')) {
      console.log('\n📋 Permission error - Make sure:');
      console.log('1. Service account email is added to Search Console as Owner');
      console.log('2. Web Search Indexing API is enabled');
      console.log('3. Service account has correct permissions\n');
    }

    process.exit(1);
  }
}

// Run the script
requestIndexing();
