import { doc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

// GET single article by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    const article = {
      id: docSnap.id,
      ...docSnap.data()
    };
    
    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

// UPDATE article
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Prepare update data
    const updateData = {
      ...data,
      updated_at: Timestamp.now()
    };
    
    // Remove id from update data if present
    delete updateData.id;
    
    const docRef = doc(db, 'articles', id);
    await updateDoc(docRef, updateData);
    
    return NextResponse.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE article
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, 'articles', id);
    
    // Check if article exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}