// src/components/zipImages/ClientSideImageActions.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import ZipImageViewer as a Server Component
const ZipImageViewer = dynamic(() => import('./ZipImageViewer'), {
  ssr: false,
});

export default function ClientSideImageActions() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReloadImages = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Trigger a re-render
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleReloadImages}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Reload Images
      </button>
      {/* Use the refreshKey to trigger a re-render of the server-side image viewer */}
      <ZipImageViewer key={refreshKey} />
    </div>
  );
}
