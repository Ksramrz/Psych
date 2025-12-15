import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (5MB max). Some deployments may have lower limits; we'll catch and report.
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Use absolute path to ensure we're in the right directory
    // In production, process.cwd() should be /var/www/clinicsense/frontend
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    console.log('Uploading to:', imagesDir);
    console.log('Current working directory:', process.cwd());

    // Ensure directory exists
    await mkdir(imagesDir, { recursive: true });

    let buffer: Buffer;
    try {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } catch (err: any) {
      console.error('Error reading file buffer:', err);
      return NextResponse.json({ error: 'Failed to read file buffer (possible size limit or encoding issue)' }, { status: 500 });
    }

    // Sanitize filename
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(imagesDir, sanitizedFileName);

    try {
      await writeFile(filePath, buffer);
    } catch (err: any) {
      console.error('Error writing file:', err);
      return NextResponse.json({ error: 'Failed to save file on server' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: `/images/${sanitizedFileName}`,
      fileName: sanitizedFileName,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

