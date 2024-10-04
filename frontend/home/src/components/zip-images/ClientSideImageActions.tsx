// @/components/zip-images/ClientSideImageActions.tsx
'use client';

import { useState } from 'react';
import ZipImageViewer from './ZipImageViewer';

interface ClientSideImageActionsProps {
  fileList: string[];
}

export default function ClientSideImageActions({
  fileList,
}: ClientSideImageActionsProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReloadImages = () => {
    setRefreshKey((prevKey) => prevKey + 1);
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
      {/* Pass the fileList to ZipImageViewer */}
      <ZipImageViewer key={refreshKey} fileList={fileList} />
    </div>
  );
}
