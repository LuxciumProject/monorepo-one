// @/components/zip-images/ZipImageViewer.tsx
'use client';

import ImageCard from './ImageCard';

interface ZipImageViewerProps {
  fileList: string[];
}

export default function ZipImageViewer({ fileList }: ZipImageViewerProps) {
  if (fileList.length === 0) {
    return <p>No images found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {fileList.map((fileName) => (
        <ImageCard key={fileName} fileName={fileName} />
      ))}
    </div>
  );
}
