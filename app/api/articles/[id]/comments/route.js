import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

// GET comments for an article
export async function GET(request, { params }) {
  try {
    const { id: articleId } = params;
    
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('article_id', '==', articleId),
      where('is_approved', '==', true),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST new comment
export async function POST(request, { params }) {
  try {
    const { id: articleId } = params;
    const data = await request.json();
    
    // Basic validation
    if (!data.author || !data.content) {
      return NextResponse.json({ error: 'Author and content are required' }, { status: 400 });
    }
    
    if (data.content.length > 1000) {
      return NextResponse.json({ error: 'Comment too long (max 1000 characters)' }, { status: 400 });
    }
    
    // Prepare comment data
    const commentData = {
      article_id: articleId,
      author: data.author.trim(),
      email: data.email?.trim() || '',
      content: data.content.trim(),
      is_approved: true, // Auto-approve for now, you can add moderation later
      created_at: Timestamp.now(),
      updated_at: Timestamp.now()
    };
    
    // Add to Firestore
    const commentsRef = collection(db, 'comments');
    const docRef = await addDoc(commentsRef, commentData);
    
    return NextResponse.json({ 
      message: 'Comment added successfully',
      id: docRef.id 
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}