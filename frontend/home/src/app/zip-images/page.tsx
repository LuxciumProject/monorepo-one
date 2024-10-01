// src/app/zip-images/page.tsx
'use server';

import dynamic from 'next/dynamic';

// Dynamically import Client Component with ssr: false
const ClientSideImageActions = dynamic(
  () => import('@/components/zipImages/ClientSideImageActions'),
  { ssr: false },
);

export default async function ZipImagesPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Zip File Images</h1>
      <ClientSideImageActions />
    </div>
  );
}
