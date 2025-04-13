// @/components/zip-images/ImageCard.tsx
'use client';
// ❌ Do NOT use async functions in client code
import 'client-only';

interface ImageCardProps {
  imageUrl: string;
  fileName: string;
}

export default function ImageCard({ imageUrl, fileName }: ImageCardProps) {
  return (
    <div className="image-card">
      <img
        src={imageUrl}
        alt={fileName}
        className="h-auto w-full object-cover"
      />
      <p className="text-center">{fileName}</p>
    </div>
  );
}
