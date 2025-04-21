// app/api/resources/[categorySlug]/[type]/[slug]/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Fetch a specific resource by category slug, type and resource slug
export async function GET(request, { params }) {
  try {
    const { categorySlug, type, slug } = params;
    
    const query = `
      SELECT *
      FROM resources
      WHERE category_slug = @param0 AND type = @param1 AND slug = @param2
    `;
    
    const results = await executeQuery(query, [categorySlug, type, slug]);
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ resource: results[0] });
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    );
  }
}