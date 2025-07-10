// app/api/articles/route.js
import { getArticles } from '@/lib/db';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  const slug = searchParams.get('slug');
  
  try {
    // If slug is provided, fetch single article by slug
    if (slug) {
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      
      const doc = querySnapshot.docs[0];
      const article = {
        id: doc.id,
        ...doc.data()
      };
      
      return NextResponse.json({ article });
    }
    
    // Otherwise fetch articles list
    const articles = await getArticles(limit, offset);
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Prepare article data
    const articleData = {
      ...data,
      published_at: Timestamp.now(),
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };
    
    // Add to Firestore
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, articleData);
    
    return NextResponse.json({ 
      message: 'Article created successfully',
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}