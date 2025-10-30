const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc, query, where } = require('firebase/firestore');
const { marked } = require('marked');

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

// Configure marked for better HTML output
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
  headerIds: true, // Add IDs to headers
  mangle: false, // Don't mangle email addresses
});

async function convertMarkdownToHTML() {
  console.log('🔄 Converting markdown content to HTML...\n');

  try {
    // Get all Finance category articles (SARS articles)
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('category', '==', 'Finance'));
    const querySnapshot = await getDocs(q);

    console.log(`📊 Found ${querySnapshot.size} Finance/SARS articles\n`);

    let converted = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const article = docSnapshot.data();
      const articleRef = doc(db, 'articles', docSnapshot.id);

      console.log(`\n📝 Processing: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);

      // Check if content looks like markdown (starts with # or has markdown syntax)
      if (article.content && (article.content.startsWith('#') || article.content.includes('##'))) {
        console.log('   🔄 Converting markdown to HTML...');

        // Convert markdown to HTML
        const htmlContent = marked(article.content);

        // Update the article with HTML content
        await updateDoc(articleRef, {
          content: htmlContent
        });

        converted++;
        console.log('   ✅ Converted successfully');
        console.log(`   📏 Content length: ${htmlContent.length} characters`);
      } else {
        console.log('   ℹ️  Already in HTML format or no content');
      }
    }

    console.log(`\n📈 Summary:`);
    console.log(`   - Converted: ${converted} articles`);
    console.log(`   - Total processed: ${querySnapshot.size} articles`);
    console.log('\n✨ All SARS articles converted to HTML!');

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

convertMarkdownToHTML();
