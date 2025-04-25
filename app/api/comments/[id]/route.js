// app/api/comments/[id]/route.js
import { executeQuery } from '@/lib/db';

// Edit a comment
export async function PUT(request, { params }) {
  const commentId = params.id;
  
  try {
    const { content, anonymousCode, userId } = await request.json();
    
    // Validate input
    if (!content) {
      return Response.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }
    
    if (!anonymousCode && !userId) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the comment exists and belongs to the user
    let query;
    let queryParams;
    
    if (userId) {
      query = `
        SELECT id FROM article_comments 
        WHERE id = @param0 AND user_id = @param1
      `;
      queryParams = [commentId, userId];
    } else {
      query = `
        SELECT id FROM article_comments 
        WHERE id = @param0 AND anonymous_code = @param1 AND is_anonymous = 1
      `;
      queryParams = [commentId, anonymousCode];
    }
    
    const comments = await executeQuery(query, queryParams);
    
    if (!comments || comments.length === 0) {
      return Response.json(
        { error: 'Comment not found or not authorized to edit' },
        { status: 404 }
      );
    }
    
    // Update the comment
    const timestamp = new Date().toISOString();
    
    const updateQuery = `
      UPDATE article_comments
      SET content = @param0, updated_at = @param1
      WHERE id = @param2
    `;
    
    await executeQuery(updateQuery, [content, timestamp, commentId]);
    
    return Response.json({ 
      success: true,
      message: 'Comment updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating comment:', error);
    return Response.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// Delete a comment
export async function DELETE(request, { params }) {
  const commentId = params.id;
  
  try {
    const { anonymousCode, userId } = await request.json();
    
    if (!anonymousCode && !userId) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if the comment exists and belongs to the user
    let query;
    let queryParams;
    
    if (userId) {
      query = `
        SELECT id FROM article_comments 
        WHERE id = @param0 AND user_id = @param1
      `;
      queryParams = [commentId, userId];
    } else {
      query = `
        SELECT id FROM article_comments 
        WHERE id = @param0 AND anonymous_code = @param1 AND is_anonymous = 1
      `;
      queryParams = [commentId, anonymousCode];
    }
    
    const comments = await executeQuery(query, queryParams);
    
    if (!comments || comments.length === 0) {
      return Response.json(
        { error: 'Comment not found or not authorized to delete' },
        { status: 404 }
      );
    }
    
    // Delete the comment
    const deleteQuery = `
      DELETE FROM article_comments
      WHERE id = @param0
    `;
    
    await executeQuery(deleteQuery, [commentId]);
    
    return Response.json({ 
      success: true,
      message: 'Comment deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting comment:', error);
    return Response.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

// Like a comment
export async function POST(request, { params }) {
  const commentId = params.id;
  
  try {
    const { operation } = await request.json();
    
    if (operation !== 'like') {
      return Response.json(
        { error: 'Invalid operation' },
        { status: 400 }
      );
    }
    
    // Check if the comment exists
    const query = `
      SELECT id, likes FROM article_comments 
      WHERE id = @param0
    `;
    
    const comments = await executeQuery(query, [commentId]);
    
    if (!comments || comments.length === 0) {
      return Response.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Increment the likes count
    const updateQuery = `
      UPDATE article_comments
      SET likes = likes + 1
      WHERE id = @param0
    `;
    
    await executeQuery(updateQuery, [commentId]);
    
    return Response.json({ 
      success: true,
      likes: comments[0].likes + 1
    });
    
  } catch (error) {
    console.error('Error liking comment:', error);
    return Response.json(
      { error: 'Failed to like comment' },
      { status: 500 }
    );
  }
}