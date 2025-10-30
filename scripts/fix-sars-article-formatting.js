const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc, query, where } = require('firebase/firestore');

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

// Variety of professional SARS/tax-related images
const SARS_IMAGES = [
  "https://images.unsplash.com/photo-1554224311-88e69f1f7640?w=1200&h=800&fit=crop", // Calculator and documents
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop", // Business documents
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop", // Laptop with charts
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop", // Financial planning
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop", // Workspace with laptop
  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop"  // Tax documents
];

async function fixArticleFormatting() {
  console.log('🔧 Fixing SARS article formatting and images...\n');

  try {
    // Get all Finance category articles (SARS articles)
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('category', '==', 'Finance'));
    const querySnapshot = await getDocs(q);

    console.log(`📊 Found ${querySnapshot.size} Finance/SARS articles\n`);

    let updated = 0;

    for (const [index, docSnapshot] of querySnapshot.docs.entries()) {
      const article = docSnapshot.data();
      const articleRef = doc(db, 'articles', docSnapshot.id);

      console.log(`\n📝 Processing: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);

      let hasChanges = false;
      const updates = {};

      // Fix content formatting - ensure proper paragraph spacing
      if (article.content) {
        let fixedContent = article.content;

        // Fix markdown formatting issues
        // 1. Ensure double line breaks between paragraphs
        fixedContent = fixedContent.replace(/\n\n\n+/g, '\n\n'); // Remove triple+ newlines

        // 2. Add line break before headers if missing
        fixedContent = fixedContent.replace(/([^\n])\n(#{1,6} )/g, '$1\n\n$2');

        // 3. Add line break after headers if missing
        fixedContent = fixedContent.replace(/(#{1,6} .+)\n([^\n#])/g, '$1\n\n$2');

        // 4. Ensure list items have proper spacing
        fixedContent = fixedContent.replace(/([^\n])\n([-*] )/g, '$1\n\n$2');
        fixedContent = fixedContent.replace(/([^\n])\n(\d+\. )/g, '$1\n\n$2');

        // 5. Add spacing after lists
        fixedContent = fixedContent.replace(/([-*] .+)\n([^\n-*#])/g, '$1\n\n$2');
        fixedContent = fixedContent.replace(/(\d+\. .+)\n([^\n\d#])/g, '$1\n\n$2');

        if (fixedContent !== article.content) {
          updates.content = fixedContent;
          hasChanges = true;
          console.log('   ✓ Fixed content formatting');
        }
      }

      // Update featured image with variety
      const newImage = SARS_IMAGES[index % SARS_IMAGES.length];
      if (article.featured_image !== newImage) {
        updates.featured_image = newImage;
        hasChanges = true;
        console.log(`   ✓ Updated image: ${newImage.substring(0, 60)}...`);
      }

      // Apply updates if there are changes
      if (hasChanges) {
        await updateDoc(articleRef, updates);
        updated++;
        console.log('   ✅ Article updated successfully');
      } else {
        console.log('   ℹ️  No changes needed');
      }
    }

    console.log(`\n📈 Summary:`);
    console.log(`   - Updated: ${updated} articles`);
    console.log(`   - Total processed: ${querySnapshot.size} articles`);
    console.log('\n✨ All SARS articles formatted successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

fixArticleFormatting();
