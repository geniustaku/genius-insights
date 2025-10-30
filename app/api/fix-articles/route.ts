import { NextResponse } from 'next/server';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔧 Starting article fix...');

    const articlesRef = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesRef);

    console.log(`📊 Found ${querySnapshot.size} articles`);

    const updates: Array<{ id: string; title: string; slug: string }> = [];
    const results: {
      updated: number;
      alreadySet: number;
      errors: Array<{ title: string; error: string }>;
    } = {
      updated: 0,
      alreadySet: 0,
      errors: []
    };

    for (const docSnapshot of querySnapshot.docs) {
      const article = docSnapshot.data();

      try {
        if (article.is_published === undefined || article.is_published === null) {
          const articleRef = doc(db, 'articles', docSnapshot.id);
          await updateDoc(articleRef, {
            is_published: true
          });
          console.log(`✅ Updated: ${article.title}`);
          results.updated++;
          updates.push({
            id: docSnapshot.id,
            title: article.title,
            slug: article.slug
          });
        } else {
          console.log(`ℹ️  Already set: ${article.title}`);
          results.alreadySet++;
        }
      } catch (error: any) {
        console.error(`❌ Error updating ${article.title}:`, error);
        results.errors.push({
          title: article.title,
          error: error.message || 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${results.updated} articles`,
      results,
      updates
    });

  } catch (error: any) {
    console.error('❌ Error in fix-articles API:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
