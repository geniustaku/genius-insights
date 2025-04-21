// app/api/admin/media/route.js
import { NextResponse } from 'next/server';
import { listFiles } from '@/lib/azure-storage';

export async function GET() {
  try {
    // List files from Azure Blob Storage
    const files = await listFiles();
    
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Failed to list files from storage' },
      { status: 500 }
    );
  }
}