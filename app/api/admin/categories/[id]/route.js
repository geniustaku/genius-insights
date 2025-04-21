// app/api/admin/categories/[id]/route.js
import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import { createSlug } from '@/lib/utils';

// GET - Fetch a specific category by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const query = `
      SELECT *
      FROM categories
      WHERE id = @param0
    `;
    
    const results = await executeQuery(query, [id]);
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category: results[0] });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing category
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Check if category exists
    const checkQuery = `SELECT id FROM categories WHERE id = @param0`;
    const checkResult = await executeQuery(checkQuery, [id]);
    
    if (checkResult.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Prepare update fields
    const updates = [];
    const updateParams = [];
    
    if (data.name !== undefined) {
      updates.push(`name = @param${updateParams.length}`);
      updateParams.push(data.name);
      
      // Update slug if name changes and slug not explicitly provided
      if (data.slug === undefined) {
        updates.push(`slug = @param${updateParams.length}`);
        updateParams.push(createSlug(data.name));
      }
    }
    
    if (data.slug !== undefined) {
      updates.push(`slug = @param${updateParams.length}`);
      updateParams.push(data.slug);
    }
    
    if (data.description !== undefined) {
      updates.push(`description = @param${updateParams.length}`);
      updateParams.push(data.description);
    }
    
    // If no fields to update
    if (updates.length === 0) {
      return NextResponse.json(
        { message: 'No changes to update' },
        { status: 200 }
      );
    }
    
    // Check if updated name/slug conflicts with existing categories
    if (data.name || data.slug) {
      const checkConflictQuery = `
        SELECT id FROM categories
        WHERE (${data.name ? 'name = @param0' : '1=0'} OR ${data.slug ? 'slug = @param1' : '1=0'})
        AND id != @param2
      `;
      
      const checkParams = [];
      if (data.name) checkParams.push(data.name);
      if (data.slug) checkParams.push(data.slug);
      checkParams.push(id);
      
      const conflicts = await executeQuery(checkConflictQuery, checkParams);
      
      if (conflicts.length > 0) {
        return NextResponse.json(
          { error: 'A category with this name or slug already exists' },
          { status: 409 }
        );
      }
    }
    
    // Construct and execute update query
    const updateQuery = `
      UPDATE categories
      SET ${updates.join(', ')}
      WHERE id = @param${updateParams.length}
    `;
    
    updateParams.push(id);
    
    await executeQuery(updateQuery, updateParams);
    
    // Fetch updated category
    const getUpdatedQuery = `
      SELECT *
      FROM categories
      WHERE id = @param0
    `;
    
    const updatedCategory = await executeQuery(getUpdatedQuery, [id]);
    
    return NextResponse.json({ 
      success: true, 
      category: updatedCategory[0] 
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a category
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Check if category exists
    const checkQuery = `SELECT id FROM categories WHERE id = @param0`;
    const checkResult = await executeQuery(checkQuery, [id]);
    
    if (checkResult.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if category is in use by any articles
    const checkUsageQuery = `
      SELECT COUNT(*) as count
      FROM articles
      WHERE category IN (SELECT name FROM categories WHERE id = @param0)
    `;
    
    const usageResult = await executeQuery(checkUsageQuery, [id]);
    
    if (usageResult[0].count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category because it is used by existing articles' },
        { status: 409 }
      );
    }
    
    // Delete the category
    const deleteQuery = `
      DELETE FROM categories
      WHERE id = @param0
    `;
    
    await executeQuery(deleteQuery, [id]);
    
    return NextResponse.json({ 
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}