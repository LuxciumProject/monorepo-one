// src/components/zipImages/ZipImageViewer.tsx
'use server';

import ImageCard from './ImageCard'; // Client Component
import { listZipContents } from '@/app/actions/listZipContents';

export default async function ZipImageViewer() {
  try {
    const fileList = await listZipContents();

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {fileList.map((fileName) => (
          <ImageCard key={fileName} fileName={fileName} />
        ))}
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error in ZipImageViewer:', e.message);
      return <p>Error loading images: {e.message}</p>;
    }
    console.error('Unknown error in ZipImageViewer.');
    return <p>Unknown error occurred while loading images.</p>;
  }
}
