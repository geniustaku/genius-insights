// app/api/admin/articles/[id]/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import { createSlug } from '@/lib/utils';

// GET - Fetch a specific article by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Check if id is a valid number
    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: `Invalid article ID: ${id}` },
        { status: 400 }
      );
    }
    
    const query = `
      SELECT *
      FROM articles
      WHERE id = @param0
    `;
    
    const results = await executeQuery(query, [id]);
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ article: results[0] });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing article
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Check if id is a valid number
    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: `Invalid article ID: ${id}` },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Check if article exists
    const checkQuery = `SELECT id FROM articles WHERE id = @param0`;
    const checkResult = await executeQuery(checkQuery, [id]);
    
    if (checkResult.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Prepare update fields
    const updates = [];
    const updateParams = [];
    
    if (data.title !== undefined) {
      updates.push(`title = @param${updateParams.length}`);
      updateParams.push(data.title);
      
      // Update slug if title changes and slug not explicitly provided
      if (data.slug === undefined) {
        updates.push(`slug = @param${updateParams.length}`);
        updateParams.push(createSlug(data.title));
      }
    }
    
    if (data.slug !== undefined) {
      updates.push(`slug = @param${updateParams.length}`);
      updateParams.push(data.slug);
    }
    
    if (data.excerpt !== undefined) {
      updates.push(`excerpt = @param${updateParams.length}`);
      updateParams.push(data.excerpt);
    }
    
    if (data.content !== undefined) {
      updates.push(`content = @param${updateParams.length}`);
      updateParams.push(data.content);
      
      // Update reading_time if content changes and not explicitly provided
      if (data.reading_time === undefined) {
        updates.push(`reading_time = @param${updateParams.length}`);
        updateParams.push(calculateReadingTime(data.content));
      }
      
      // Update excerpt if not provided
      if (data.excerpt === undefined) {
        updates.push(`excerpt = @param${updateParams.length}`);
        updateParams.push(data.content.substring(0, 300) + '...');
      }
    }
    
    if (data.category !== undefined) {
      updates.push(`category = @param${updateParams.length}`);
      updateParams.push(data.category);
    }
    
    if (data.author !== undefined) {
      updates.push(`author = @param${updateParams.length}`);
      updateParams.push(data.author);
    }
    
    if (data.is_published !== undefined) {
      updates.push(`is_published = @param${updateParams.length}`);
      updateParams.push(data.is_published ? 1 : 0);
    }
    
    if (data.reading_time !== undefined) {
      updates.push(`reading_time = @param${updateParams.length}`);
      updateParams.push(data.reading_time);
    }
    
    if (data.featured_image !== undefined) {
      updates.push(`featured_image = @param${updateParams.length}`);
      updateParams.push(data.featured_image);
    }
    
    if (data.published_at !== undefined) {
      updates.push(`published_at = @param${updateParams.length}`);
      updateParams.push(data.published_at);
    }
    
    // If no fields to update
    if (updates.length === 0) {
      return NextResponse.json(
        { message: 'No changes to update' },
        { status: 200 }
      );
    }
    
    // Construct and execute update query
    const updateQuery = `
      UPDATE articles
      SET ${updates.join(', ')}
      WHERE id = @param${updateParams.length}
    `;
    
    updateParams.push(id);
    
    await executeQuery(updateQuery, updateParams);
    
    // Fetch updated article
    const getUpdatedQuery = `
      SELECT *
      FROM articles
      WHERE id = @param0
    `;
    
    const updatedArticle = await executeQuery(getUpdatedQuery, [id]);
    
    return NextResponse.json({ 
      success: true, 
      article: updatedArticle[0] 
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an article
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Check if id is a valid number
    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: `Invalid article ID: ${id}` },
        { status: 400 }
      );
    }
    
    // Check if article exists
    const checkQuery = `SELECT id FROM articles WHERE id = @param0`;
    const checkResult = await executeQuery(checkQuery, [id]);
    
    if (checkResult.length === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Delete the article
    const deleteQuery = `
      DELETE FROM articles
      WHERE id = @param0
    `;
    
    await executeQuery(deleteQuery, [id]);
    
    return NextResponse.json({ 
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
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