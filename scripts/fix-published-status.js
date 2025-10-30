const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

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

async function fixPublishedStatus() {
  console.log('🔧 Fixing published status for all articles...\n');

  try {
    const articlesRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesRef);

    console.log(`📊 Found ${querySnapshot.size} articles\n`);

    let updated = 0;
    let alreadySet = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const article = docSnapshot.data();

      if (article.is_published === undefined || article.is_published === null) {
        // Update the article to set is_published to true
        const articleRef = doc(db, 'articles', docSnapshot.id);
        await updateDoc(articleRef, {
          is_published: true
        });
        console.log(`✅ Updated: ${article.title} (${article.slug})`);
        updated++;
      } else {
        console.log(`ℹ️  Already set: ${article.title} (is_published: ${article.is_published})`);
        alreadySet++;
      }
    }

    console.log(`\n📈 Summary:`);
    console.log(`   - Updated: ${updated} articles`);
    console.log(`   - Already set: ${alreadySet} articles`);
    console.log(`   - Total: ${querySnapshot.size} articles`);

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

fixPublishedStatus();
