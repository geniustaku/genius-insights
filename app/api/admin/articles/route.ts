// app/api/admin/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  doc,
  deleteDoc
} from 'firebase/firestore';

// Helper function to calculate reading time
function calculateReadingTime(text: string, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime);
}

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

// GET - Fetch all articles (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limitCount = parseInt(searchParams.get('limit') || '100');

    const articlesRef = collection(db, 'articles');
    let q;

    if (category) {
      q = query(
        articlesRef,
        where('category', '==', category),
        firestoreLimit(limitCount)
      );
    } else if (status === 'published') {
      q = query(
        articlesRef,
        where('is_published', '==', true),
        firestoreLimit(limitCount)
      );
    } else if (status === 'draft') {
      q = query(
        articlesRef,
        where('is_published', '==', false),
        firestoreLimit(limitCount)
      );
    } else {
      q = query(
        articlesRef,
        firestoreLimit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    let articles: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for JSON
        published_at: data.published_at?.toDate?.()?.toISOString() || data.published_at
      });
    });

    // Client-side filtering for search if provided
    if (search) {
      const searchLower = search.toLowerCase();
      articles = articles.filter(article =>
        article.title?.toLowerCase().includes(searchLower) ||
        article.content?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by published_at descending
    articles.sort((a, b) => {
      const dateA = new Date(a.published_at).getTime();
      const dateB = new Date(b.published_at).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST - Create a new article
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.content || !data.category || !data.author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, category, author' },
        { status: 400 }
      );
    }

    // Create slug from title if not provided
    const slug = data.slug || createSlug(data.title);

    // Set default values
    const is_published = data.is_published === undefined ? true : data.is_published;
    const reading_time = data.reading_time || calculateReadingTime(data.content);

    // Convert published_at to Firestore Timestamp
    let published_at;
    if (data.published_at) {
      const date = new Date(data.published_at);
      published_at = Timestamp.fromDate(date);
    } else {
      published_at = Timestamp.now();
    }

    // Prepare article data
    const articleData = {
      title: data.title,
      slug,
      excerpt: data.excerpt || data.content.substring(0, 300).replace(/<[^>]*>/g, '') + '...',
      content: data.content,
      category: data.category,
      author: data.author,
      is_published,
      reading_time,
      published_at,
      featured_image: data.featured_image || '',
      // SEO fields
      seo_title: data.seo_title || `${data.title} | Genius Insights South Africa`,
      seo_description: data.seo_description || data.excerpt || data.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      seo_keywords: data.seo_keywords || [],
      source_url: data.source_url || '',
      source_name: data.source_name || '',
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };

    // Add to Firestore
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, articleData);

    return NextResponse.json({
      success: true,
      article: {
        id: docRef.id,
        ...articleData,
        published_at: published_at.toDate().toISOString()
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: `Failed to create article: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE - Delete an article by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('id');

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    // Delete the article
    const articleRef = doc(db, 'articles', articleId);
    await deleteDoc(articleRef);

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });

  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: `Failed to delete article: ${error.message}` },
      { status: 500 }
    );
  }
}
