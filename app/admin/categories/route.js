// app/api/admin/categories/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import { createSlug } from '@/lib/utils';

// GET - Fetch all categories
export async function GET() {
  try {
    const query = `
      SELECT * FROM categories
      ORDER BY name ASC
    `;
    
    const categories = await executeQuery(query);
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create a new category
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    // Create slug from name if not provided
    const slug = data.slug || createSlug(data.name);
    
    // Check if category already exists
    const checkQuery = `
      SELECT id FROM categories
      WHERE name = @param0 OR slug = @param1
    `;
    
    const existingCategory = await executeQuery(checkQuery, [data.name, slug]);
    
    if (existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'A category with this name or slug already exists' },
        { status: 409 }
      );
    }
    
    // Insert new category
    const insertQuery = `
      INSERT INTO categories (name, slug, description)
      VALUES (@param0, @param1, @param2);
      SELECT SCOPE_IDENTITY() AS id;
    `;
    
    const result = await executeQuery(insertQuery, [
      data.name,
      slug,
      data.description || ''
    ]);
    
    const id = result[0].id;
    
    return NextResponse.json({
      success: true,
      category: {
        id,
        name: data.name,
        slug,
        description: data.description || ''
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}