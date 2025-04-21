// app/api/articles/[slug]/route.js
import { getArticleBySlug } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { slug } = params;
  
  try {
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
