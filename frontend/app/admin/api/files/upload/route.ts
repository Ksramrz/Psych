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
    // But we need to ensure we're using the correct path
    const cwd = process.cwd();
    const imagesDir = path.resolve(cwd, 'public', 'images');
    
    console.log('Uploading to:', imagesDir);
    console.log('Current working directory:', cwd);

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

    // Sanitize filename - preserve hyphens and dots, only replace truly problematic characters
    // Allow: letters, numbers, dots, hyphens, underscores
    let sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    // Remove any leading/trailing dots or spaces
    sanitizedFileName = sanitizedFileName.trim().replace(/^\.+|\.+$/g, '');
    
    // Ensure it has a valid extension
    if (!sanitizedFileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      // If no extension, try to preserve original extension
      const originalExt = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      if (originalExt) {
        sanitizedFileName = sanitizedFileName + originalExt[0];
      } else {
        sanitizedFileName = sanitizedFileName + '.jpg'; // default
      }
    }
    
    const filePath = path.join(imagesDir, sanitizedFileName);

    try {
      await writeFile(filePath, buffer);
      console.log('File saved successfully to:', filePath);
      
      // Verify file exists
      const { access } = await import('fs/promises');
      try {
        await access(filePath);
        console.log('File verified to exist at:', filePath);
      } catch {
        console.error('File was written but cannot be accessed!');
      }
    } catch (err: any) {
      console.error('Error writing file:', err);
      return NextResponse.json({ error: 'Failed to save file on server' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: `/images/${sanitizedFileName}`,
      fileName: sanitizedFileName,
      savedPath: filePath, // Debug info
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

