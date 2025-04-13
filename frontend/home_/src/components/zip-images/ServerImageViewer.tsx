// @/components/zip-images/ServerImageViewer.tsx
'use server';
// 🚫 Do NOT import client components in server code

import ImageCard from '@Components/zip-images/ImageCard'; // did fix an error here by changing to correct import
import { listZipContents } from '@ServerActions/listZipContents';

interface ServerImageViewerProps {
  zipFilePath: string;
}

export default async function ServerImageViewer({
  zipFilePath,
}: ServerImageViewerProps) {
  try {
    const fileList = await listZipContents(zipFilePath);

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {fileList.map((fileName) => (
          <ImageCard
            key={fileName}
            imageUrl={`/api/get-image?fileName=${fileName}&zipFilePath=${encodeURIComponent(zipFilePath)}`}
            fileName={fileName}
          />
        ))}
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error in ServerImageViewer:', e.message);
      return <p>Error loading images: {e.message}</p>;
    }
    console.error('Unknown error in ServerImageViewer.');
    return <p>Unknown error occurred while loading images.</p>;
  }
}
