import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imagesDir = path.join(process.cwd(), 'public', 'images');

    // Check if directory exists, create if not
    try {
      await fs.access(imagesDir);
    } catch {
      await fs.mkdir(imagesDir, { recursive: true });
      return NextResponse.json({ files: [] });
    }

    const files = await fs.readdir(imagesDir);
    const fileInfos = await Promise.all(
      files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(async (file) => {
          const filePath = path.join(imagesDir, file);
          const stats = await fs.stat(filePath);
          return {
            name: file,
            size: stats.size,
            url: `/images/${file}`,
          };
        })
    );

    return NextResponse.json({ files: fileInfos });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}
