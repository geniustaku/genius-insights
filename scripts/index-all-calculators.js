const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.genius-insights.co.za';

// Service account key file path
const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, '..', 'google-service-account.json');

// All calculators and tools to index
const calculators = [
  // Existing calculators
  '/south-africa-income-tax-calculator',
  '/south-africa-property-transfer-calculator',
  '/south-africa-rental-yield-calculator',
  '/south-africa-loan-calculator',
  '/south-africa-investment-calculator',

  // NEW - Financial calculators
  '/south-africa-capital-gains-tax-calculator',
  '/south-africa-solar-loadshedding-calculator',
  '/south-africa-capitec-calculator',
  '/south-africa-crypto-tax-calculator',
  '/south-africa-debt-consolidation-calculator',
  '/south-africa-freelancer-provisional-tax-calculator',
  '/south-africa-payroll-calculator',
  '/south-africa-estate-duty-calculator',
  '/south-africa-tfsa-calculator',
];

// Important landing pages
const landingPages = [
  '/',
  '/tools',
  '/calculators',
  '/articles',
  '/guides',
  '/guides/sars-tax-guides',
  '/guides/property-transfer-guides',
];

async function indexAllCalculators() {
  console.log('🚀 Starting Google Indexing API requests for ALL calculators...\n');

  // Check if service account key exists
  if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
    console.error('❌ Error: google-service-account.json not found!');
    console.log('\n📋 Setup Instructions:');
    console.log('1. Go to: https://console.cloud.google.com/');
    console.log('2. Enable "Web Search Indexing API"');
    console.log('3. Create a Service Account with "Owner" role');
    console.log('4. Download JSON key as "google-service-account.json"');
    console.log('5. Add service account email to Google Search Console (as Owner)');
    console.log('   Email will be: [service-account]@[project-id].iam.gserviceaccount.com');
    console.log('6. Place the file in the project root directory');
    console.log('\n💡 Tip: In Search Console, go to Settings > Users and permissions');
    console.log('   Add the service account email with "Owner" permission\n');
    process.exit(1);
  }

  try {
    // Load service account credentials
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8'));

    console.log(`📧 Using service account: ${serviceAccount.client_email}\n`);

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    const allUrls = [...landingPages, ...calculators];

    console.log(`📊 Total URLs to index: ${allUrls.length}`);
    console.log(`   - Landing pages: ${landingPages.length}`);
    console.log(`   - Calculators: ${calculators.length}\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Index landing pages first (higher priority)
    console.log('📝 Indexing landing pages...\n');
    for (const page of landingPages) {
      const url = `${BASE_URL}${page}`;

      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });

        console.log(`✅ ${url}`);
        successCount++;

        // Delay to avoid rate limiting (200 requests/day, ~2 per second)
        await new Promise(resolve => setTimeout(resolve, 600));

      } catch (error) {
        console.error(`❌ Failed: ${url}`);
        console.error(`   Error: ${error.message}`);
        errorCount++;
        errors.push({ url, error: error.message });
      }
    }

    // Index calculators
    console.log('\n📝 Indexing calculators...\n');
    for (const calc of calculators) {
      const url = `${BASE_URL}${calc}`;

      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });

        const calcName = calc.replace('/south-africa-', '').replace(/-/g, ' ').replace('calculator', '').trim();
        console.log(`✅ ${calcName} calculator`);
        console.log(`   ${url}`);
        successCount++;

        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 600));

      } catch (error) {
        console.error(`❌ Failed: ${url}`);
        console.error(`   Error: ${error.message}`);
        errorCount++;
        errors.push({ url, error: error.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 Google Indexing Request Summary');
    console.log('='.repeat(70));
    console.log(`✅ Successfully indexed: ${successCount} URLs`);
    console.log(`❌ Failed: ${errorCount} URLs`);
    console.log(`📈 Success rate: ${((successCount / allUrls.length) * 100).toFixed(1)}%`);

    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      errors.forEach(e => {
        console.log(`   ${e.url}`);
        console.log(`   → ${e.error}\n`);
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log('📋 Next Steps:');
    console.log('='.repeat(70));
    console.log('1. ✅ URLs have been submitted to Google Indexing API');
    console.log('2. 🕐 Wait 24-48 hours for Google to process the requests');
    console.log('3. 🔍 Check Google Search Console for indexing status:');
    console.log('   https://search.google.com/search-console');
    console.log('4. 📊 Monitor "Coverage" report to see indexed pages');
    console.log('5. 🔄 Run this script again tomorrow to re-submit if needed\n');

    console.log('💡 Tips:');
    console.log('   - Google limits: 200 requests/day per project');
    console.log('   - Indexing is NOT guaranteed, it\'s a request to Google');
    console.log('   - High-quality content gets indexed faster');
    console.log('   - Submit sitemap.xml to Search Console for best results');
    console.log('   - URL: https://www.genius-insights.co.za/sitemap.xml\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    console.error('   Stack:', error.stack);

    if (error.message.includes('API has not been used')) {
      console.log('\n📋 Enable the Web Search Indexing API:');
      console.log('1. Go to: https://console.cloud.google.com/apis/library/indexing.googleapis.com');
      console.log('2. Select your project');
      console.log('3. Click "Enable"');
      console.log('4. Wait 2-5 minutes');
      console.log('5. Run this script again\n');
    }

    if (error.message.includes('permission') || error.message.includes('403')) {
      console.log('\n📋 Fix permissions:');
      console.log('1. Get service account email from google-service-account.json');
      console.log(`   Current email: ${serviceAccount?.client_email || 'unknown'}`);
      console.log('2. Go to: https://search.google.com/search-console');
      console.log('3. Settings → Users and permissions');
      console.log('4. Add the service account email as "Owner"');
      console.log('5. Verify the email matches exactly (case-sensitive)');
      console.log('6. Wait 5 minutes, then try again\n');
    }

    if (error.message.includes('quota')) {
      console.log('\n📋 Rate limit exceeded:');
      console.log('   - You can only make 200 indexing requests per day');
      console.log('   - Wait 24 hours and try again');
      console.log('   - Or manually submit URLs in Search Console\n');
    }

    process.exit(1);
  }
}

// Run the script
console.log('🔍 Google Indexing API - Calculator Batch Submission');
console.log('='.repeat(70) + '\n');

indexAllCalculators().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
