const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs, limit } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBa1btWkbw2CPmxQ9D-ruw6fzw1EC629fE",
  authDomain: "genius-insights-2.firebaseapp.com",
  projectId: "genius-insights-2",
  storageBucket: "genius-insights-2.firebasestorage.app",
  messagingSenderId: "326338611095",
  appId: "1:326338611095:web:09bb6e9dd488c1d7dc08bd",
  measurementId: "G-PWD6J7ZL1E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testArticleFetch() {
  const slug = 'sars-efiling-registration-guide';

  console.log(`🔍 Testing fetch for slug: ${slug}\n`);

  try {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('❌ No article found with this slug');

      // Let's check what slugs exist
      console.log('\n📋 Here are all article slugs in the database:');
      const allArticles = await getDocs(articlesRef);
      allArticles.forEach(doc => {
        const article = doc.data();
        console.log(`  - ${article.slug || 'NO SLUG'} (${article.title})`);
      });
    } else {
      console.log('✅ Article found!');
      const article = querySnapshot.docs[0].data();
      console.log(`Title: ${article.title}`);
      console.log(`Slug: ${article.slug}`);
      console.log(`Category: ${article.category}`);
    }
  } catch (error) {
    console.error('Error fetching article:', error);
  }

  process.exit(0);
}

testArticleFetch();
