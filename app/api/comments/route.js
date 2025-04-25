// app/api/comments/route.js
import { executeQuery } from '@/lib/db';

// GET comments for an article
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get('articleSlug');
  
  if (!articleSlug) {
    return Response.json(
      { error: 'Article slug is required' },
      { status: 400 }
    );
  }
  
  try {
    // Get article ID from slug first
    const articleQuery = `
      SELECT id FROM articles 
      WHERE slug = @param0 AND is_published = 1
    `;
    
    const articles = await executeQuery(articleQuery, [articleSlug]);
    
    if (!articles || articles.length === 0) {
      return Response.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    const articleId = articles[0].id;
    
    // Get comments for the article
    const commentsQuery = `
      SELECT 
        c.id,
        c.user_id,
        c.name,
        c.content,
        c.created_at as createdAt,
        c.updated_at as updatedAt,
        c.is_anonymous as isAnonymous,
        c.is_author as isAuthor,
        c.avatar,
        c.likes
      FROM article_comments c
      WHERE c.article_id = @param0 AND c.is_approved = 1
      ORDER BY c.created_at DESC
    `;
    
    const comments = await executeQuery(commentsQuery, [articleId]);
    
    return Response.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return Response.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST a new comment
export async function POST(request) {
  try {
    const { 
      articleSlug, 
      userId, 
      name, 
      email, 
      content, 
      isAnonymous, 
      anonymousCode 
    } = await request.json();
    
    // Validate required fields
    if (!articleSlug || !content) {
      return Response.json(
        { error: 'Missing required fields', message: 'Article slug and comment content are required' },
        { status: 400 }
      );
    }
    
    // Check if user is authenticated or provided necessary info
    if (!userId && !isAnonymous && (!name || !email)) {
      return Response.json(
        { error: 'Missing authentication', message: 'Name and email are required for guest comments' },
        { status: 400 }
      );
    }
    
    // Get article ID from slug
    const articleQuery = `
      SELECT id, author FROM articles 
      WHERE slug = @param0 AND is_published = 1
    `;
    
    const articles = await executeQuery(articleQuery, [articleSlug]);
    
    if (!articles || articles.length === 0) {
      return Response.json(
        { error: 'Article not found', message: 'The specified article does not exist' },
        { status: 404 }
      );
    }
    
    const articleId = articles[0].id;
    const articleAuthor = articles[0].author;
    
    // Prepare data for insertion
    const timestamp = new Date().toISOString();
    let userName = name;
    let userEmail = email;
    let isAuthor = false;
    let avatar = null;
    
    // If user is authenticated, get their info
    if (userId) {
      const userQuery = `
        SELECT name, email, avatar FROM users 
        WHERE id = @param0
      `;
      
      const users = await executeQuery(userQuery, [userId]);
      
      if (users && users.length > 0) {
        userName = users[0].name;
        userEmail = users[0].email;
        avatar = users[0].avatar;
        
        // Check if user is the author
        isAuthor = articleAuthor === userName;
      }
    }
    
    // Insert comment
    const insertQuery = `
      INSERT INTO article_comments (
        article_id,
        user_id,
        name,
        email,
        content,
        is_anonymous,
        anonymous_code,
        is_author,
        is_approved,
        avatar,
        likes,
        created_at,
        updated_at
      ) VALUES (
        @param0,
        @param1,
        @param2,
        @param3,
        @param4,
        @param5,
        @param6,
        @param7,
        @param8,
        @param9,
        @param10,
        @param11,
        @param12
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    
    const result = await executeQuery(insertQuery, [
      articleId,
      userId || null,
      userName,
      userEmail || null,
      content,
      isAnonymous ? 1 : 0,
      anonymousCode || null,
      isAuthor ? 1 : 0,
      1, // Auto-approve for now
      avatar,
      0, // Initial likes count
      timestamp,
      timestamp
    ]);
    
    const commentId = result[0].id;
    
    // Return the new comment
    const comment = {
      id: commentId,
      name: userName,
      content,
      createdAt: timestamp,
      updatedAt: timestamp,
      isAnonymous: isAnonymous ? true : false,
      isAuthor: isAuthor,
      avatar,
      likes: 0
    };
    
    return Response.json({ 
      success: true,
      comment
    });
    
  } catch (error) {
    console.error('Error posting comment:', error);
    return Response.json(
      { error: 'server_error', message: 'Failed to post comment' },
      { status: 500 }
    );
  }
}