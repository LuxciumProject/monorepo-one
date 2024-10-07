// @/app/api/list-directory/route.ts
'use server';
import { listDirectoryContents } from '@ServerActions/listDirectoryContents';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dirPath = searchParams.get('dirPath');

  if (!dirPath) {
    return NextResponse.json(
      { error: 'Missing dirPath parameter' },
      { status: 400 },
    );
  }

  try {
    const contents = await listDirectoryContents(dirPath);
    return NextResponse.json(contents);
  } catch (error) {
    console.error('Error fetching directory contents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch directory contents' },
      { status: 500 },
    );
  }
}
