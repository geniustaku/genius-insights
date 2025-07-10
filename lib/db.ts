// lib/db.ts
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Define types for our data structures
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  published_at: Timestamp;
  is_published: boolean;
  reading_time: number;
  featured_image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export async function getArticles(limitCount = 10, offset = 0, categoryFilter: string | null = null): Promise<Article[]> {
  try {
    console.log('Attempting to fetch articles from Firestore...');
    console.log('Database instance:', db);
    
    const articlesRef = collection(db, 'articles');
    console.log('Articles collection reference created');
    
    let q;
    
    // Simplified query without compound index requirements
    if (categoryFilter) {
      q = query(
        articlesRef,
        where('category', '==', categoryFilter),
        limit(limitCount)
      );
    } else {
      // Simple query with just published filter
      q = query(
        articlesRef,
        where('is_published', '==', true),
        limit(limitCount)
      );
    }
    
    console.log('Query created, executing...');
    const querySnapshot = await getDocs(q);
    console.log('Query executed, snapshot size:', querySnapshot.size);
    
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Only include published articles and sort manually if needed
      if (data.is_published) {
        articles.push({
          id: doc.id,
          ...data
        } as Article);
      }
    });
    
    // Manual sorting by published_at descending
    articles.sort((a, b) => {
      const dateA = a.published_at?.seconds || 0;
      const dateB = b.published_at?.seconds || 0;
      return dateB - dateA;
    });
    
    console.log('Articles fetched and sorted successfully:', articles.length);
    return articles.slice(0, limitCount);
  } catch (error) {
    console.error('Detailed error fetching articles:', error);
    console.error('Error name:', error?.constructor?.name);

    throw new Error(`Failed to fetch articles: ${ 'Unknown error'}`);
  }
}

// Legacy compatibility function for old SQL-based code
// This is a stub to prevent build errors - in production, these should be migrated to Firestore
export async function executeQuery(query: string, params: any[] = []): Promise<any[]> {
  console.warn('executeQuery is deprecated. Please migrate to Firestore functions.');
  console.warn('Query attempted:', query);
  console.warn('Params:', params);
  
  // Return empty array to prevent crashes
  return [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('slug', '==', slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    // Check if published before returning
    if (!data.is_published) {
      return null;
    }
    
    return {
      id: doc.id,
      ...data
    } as Article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    throw new Error('Failed to fetch article');
  }
}

export async function getArticlesByCategory(categorySlug: string, limitCount = 10, offset = 0): Promise<Article[]> {
  try {
    // First, get the category name from the slug
    const categoriesRef = collection(db, 'categories');
    const categoryQuery = query(
      categoriesRef,
      where('slug', '==', categorySlug),
      limit(1)
    );
    
    const categorySnapshot = await getDocs(categoryQuery);
    
    if (categorySnapshot.empty) {
      return []; // Category not found
    }
    
    const categoryDoc = categorySnapshot.docs[0];
    const categoryName = categoryDoc.data().name;
    
    // Then, get articles for this category
    const articlesRef = collection(db, 'articles');
    const articlesQuery = query(
      articlesRef,
      where('category', '==', categoryName),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(articlesQuery);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Only include published articles
      if (data.is_published) {
        articles.push({
          id: doc.id,
          ...data
        } as Article);
      }
    });
    
    // Manual sorting by published_at descending
    articles.sort((a, b) => {
      const dateA = a.published_at?.seconds || 0;
      const dateB = b.published_at?.seconds || 0;
      return dateB - dateA;
    });
    
    return articles.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw new Error('Failed to fetch articles by category');
  }
}

export async function getTotalArticlesCount(categoryFilter: string | null = null): Promise<number> {
  try {
    const articlesRef = collection(db, 'articles');
    let q;
    
    if (categoryFilter) {
      q = query(
        articlesRef,
        where('is_published', '==', true),
        where('category', '==', categoryFilter)
      );
    } else {
      q = query(
        articlesRef,
        where('is_published', '==', true)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error fetching total articles count:', error);
    throw new Error('Failed to fetch articles count');
  }
}

export async function getRecentArticles(limitCount = 5): Promise<Article[]> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('is_published', '==', true),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.is_published) {
        articles.push({
          id: doc.id,
          ...data
        } as Article);
      }
    });
    
    // Manual sorting by published_at descending
    articles.sort((a, b) => {
      const dateA = a.published_at?.seconds || 0;
      const dateB = b.published_at?.seconds || 0;
      return dateB - dateA;
    });
    
    return articles.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    throw new Error('Failed to fetch recent articles');
  }
}

export async function getRelatedArticles(categoryName: string, currentArticleId: string, limitCount = 3): Promise<Article[]> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('category', '==', categoryName),
      limit(limitCount + 1) // Get one extra to filter out current article
    );
    
    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (doc.id !== currentArticleId && data.is_published) {
        articles.push({
          id: doc.id,
          ...data
        } as Article);
      }
    });
    
    // Manual sorting by published_at descending
    articles.sort((a, b) => {
      const dateA = a.published_at?.seconds || 0;
      const dateB = b.published_at?.seconds || 0;
      return dateB - dateA;
    });
    
    return articles.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    throw new Error('Failed to fetch related articles');
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef);
    
    const querySnapshot = await getDocs(q);
    const categories: Category[] = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      } as Category);
    });
    
    // Manual sorting by name ascending
    categories.sort((a, b) => a.name.localeCompare(b.name));
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('is_published', '==', true),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    // Get all published articles and sort them manually
    const articles: Article[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.is_published) {
        articles.push({
          id: doc.id,
          ...data
        } as Article);
      }
    });
    
    // Sort by published_at descending and return the first one
    articles.sort((a, b) => {
      const dateA = a.published_at?.seconds || 0;
      const dateB = b.published_at?.seconds || 0;
      return dateB - dateA;
    });
    
    return articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error('Error fetching featured article:', error);
    throw new Error('Failed to fetch featured article');
  }
}