// app/api/admin/resources/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import { createSlug } from '@/lib/utils';

// Let's create a simple SQL table for resources if it doesn't exist yet
async function ensureResourcesTable() {
  try {
    // Check if table exists
    const checkQuery = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='resources' AND xtype='U')
      CREATE TABLE resources (
        id INT IDENTITY(1, 1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        slug NVARCHAR(255) NOT NULL,
        category_slug NVARCHAR(255) NOT NULL,
        type NVARCHAR(100) NOT NULL,
        content NVARCHAR(MAX),
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE()
      )
    `;
    
    await executeQuery(checkQuery);
  } catch (error) {
    console.error('Error ensuring resources table exists:', error);
  }
}

// GET - Fetch resources, optionally filtered by category and type
export async function GET(request) {
  try {
    await ensureResourcesTable();
    
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
    
    query += ` ORDER BY created_at DESC`;
    
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

// POST - Create a new resource
export async function POST(request) {
  try {
    await ensureResourcesTable();
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.category_slug || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create slug from title if not provided
    const slug = data.slug || createSlug(data.title);
    
    // Check if resource with this slug already exists for this category and type
    const checkQuery = `
      SELECT id FROM resources
      WHERE category_slug = @param0 AND type = @param1 AND slug = @param2
    `;
    
    const existingResource = await executeQuery(checkQuery, [
      data.category_slug,
      data.type,
      slug
    ]);
    
    if (existingResource.length > 0) {
      return NextResponse.json(
        { error: 'A resource with this slug already exists for this category and type' },
        { status: 409 }
      );
    }
    
    // Insert new resource
    const insertQuery = `
      INSERT INTO resources (title, slug, category_slug, type, content)
      VALUES (@param0, @param1, @param2, @param3, @param4);
      SELECT SCOPE_IDENTITY() AS id;
    `;
    
    const result = await executeQuery(insertQuery, [
      data.title,
      slug,
      data.category_slug,
      data.type,
      data.content || ''
    ]);
    
    const id = result[0].id;
    
    return NextResponse.json({
      success: true,
      resource: {
        id,
        title: data.title,
        slug,
        category_slug: data.category_slug,
        type: data.type,
        content: data.content || ''
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}