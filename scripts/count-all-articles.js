const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function countAllArticles() {
  console.log('\nCounting all articles in Firestore...\n');

  try {
    const articlesRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesRef);

    console.log(`📊 Total Articles in Database: ${querySnapshot.size}\n`);

    // Group by category
    const categories = {};
    querySnapshot.forEach((doc) => {
      const article = doc.data();
      const category = article.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({
        title: article.title,
        slug: article.slug,
        reading_time: article.reading_time,
        created: article.created_at?.toDate().toISOString().split('T')[0] || 'Unknown'
      });
    });

    // Display by category
    console.log('📁 Articles by Category:\n');
    Object.keys(categories).sort().forEach(category => {
      console.log(`${category}: ${categories[category].length} articles`);
      categories[category].forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
        console.log(`     - Slug: ${article.slug}`);
        console.log(`     - Reading time: ${article.reading_time} min`);
        console.log(`     - Created: ${article.created}\n`);
      });
    });

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }

  process.exit(0);
}

countAllArticles();
