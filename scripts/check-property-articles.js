const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');

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

async function checkPropertyArticles() {
  console.log('\nChecking Property articles in Firestore...\n');

  try {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('category', '==', 'Property'));
    const querySnapshot = await getDocs(q);

    console.log(`Found ${querySnapshot.size} Property articles:\n`);

    // Convert to array and sort by created_at
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });

    // Sort by created_at descending (newest first)
    articles.sort((a, b) => {
      const dateA = a.created_at?.toDate() || new Date(0);
      const dateB = b.created_at?.toDate() || new Date(0);
      return dateB - dateA;
    });

    articles.forEach((article, index) => {
      const createdDate = article.created_at?.toDate().toISOString().split('T')[0] || 'Unknown';
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   - Slug: ${article.slug}`);
      console.log(`   - Created: ${createdDate}`);
      console.log(`   - Reading time: ${article.reading_time} min`);
      console.log(`   - ID: ${article.id}\n`);
    });

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }

  process.exit(0);
}

checkPropertyArticles();
