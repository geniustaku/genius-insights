// app/api/resources/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Fetch resources for the front-end
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const type = searchParams.get('type');
    
    let query = `
      SELECT id, title, slug, category_slug, type, created_at, updated_at
      FROM resources
      WHERE 1=1
    `;
    
    const params = [];
    
    if (categorySlug) {
      query += ` AND category_slug = @param${params.length}`;
      params.push(categorySlug);
    }
    
    if (type) {
      query += ` AND type = @param${params.length}`;
      params.push(type);
    }
    
    query += ` ORDER BY title ASC`;
    
    const resources = await executeQuery(query, params);
    
    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}