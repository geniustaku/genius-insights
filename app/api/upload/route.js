// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/azure-storage';

export async function POST(request) {
  try {
    if (!process.env.AZURE_STORAGE_ACCOUNT_NAME || !process.env.AZURE_STORAGE_ACCOUNT_KEY) {
      return NextResponse.json(
        { error: 'Azure Storage credentials not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Generate a unique filename using timestamp and original name
    const timestamp = new Date().getTime();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${timestamp}-${originalName.replace(/\s+/g, '-')}`;
    
    // Convert the file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to Azure Blob Storage
    const fileUrl = await uploadFile(buffer, fileName, file.type);
    
    return NextResponse.json({
      success: true,
      fileName,
      fileUrl,
      contentType: file.type
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}