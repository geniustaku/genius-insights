// app/api/categories/[category]/articles/route.js
import { getArticlesByCategory } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { category } = params;
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  try {
    const articles = await getArticlesByCategory(category, limit, offset);
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}