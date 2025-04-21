// app/api/admin/articles/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import { createSlug } from '@/lib/utils';

// GET - Fetch all articles (with optional filters)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = `
      SELECT id, title, slug, excerpt, category, author, published_at, 
      is_published, reading_time, featured_image
      FROM articles
      WHERE 1=1
    `;
    
    const params = [];
    
    if (category) {
      query += ` AND category = @param${params.length}`;
      params.push(category);
    }
    
    if (status === 'published') {
      query += ` AND is_published = 1`;
    } else if (status === 'draft') {
      query += ` AND is_published = 0`;
    }
    
    if (search) {
      query += ` AND (title LIKE @param${params.length} OR content LIKE @param${params.length})`;
      params.push(`%${search}%`);
    }
    
    query += ` ORDER BY published_at DESC`;
    query += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
    
    const articles = await executeQuery(query, params);
    
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
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content || !data.category || !data.author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create slug from title if not provided
    const slug = data.slug || createSlug(data.title);
    
    // Set default values
    const is_published = data.is_published === undefined ? true : data.is_published;
    const reading_time = data.reading_time || calculateReadingTime(data.content);
    const published_at = data.published_at || new Date().toISOString();
    
    const query = `
      INSERT INTO articles (
        title, slug, excerpt, content, category, author, 
        is_published, reading_time, published_at, featured_image
      )
      VALUES (
        @param0, @param1, @param2, @param3, @param4, @param5, 
        @param6, @param7, @param8, @param9
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    
    const params = [
      data.title,
      slug,
      data.excerpt || data.content.substring(0, 300) + '...',
      data.content,
      data.category,
      data.author,
      is_published ? 1 : 0,
      reading_time,
      published_at,
      data.featured_image || null
    ];
    
    const result = await executeQuery(query, params);
    const id = result[0].id;
    
    return NextResponse.json({ 
      success: true, 
      article: {
        id,
        title: data.title,
        slug,
        category: data.category,
        author: data.author,
        is_published,
        reading_time,
        published_at,
        featured_image: data.featured_image
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

// Helper function to calculate reading time
function calculateReadingTime(text, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime);
}