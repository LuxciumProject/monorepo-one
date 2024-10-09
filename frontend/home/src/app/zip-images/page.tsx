// @/app/zip-images/page.tsx
'use client';
// 🚷 Importing server-side module strictly prohibited in client code
import 'client-only'; // ❌ DO NOT use async functions in client code

import YearMonthDaySelector from '@/components/zip-images/YearMonthDaySelector';
import ZipImageViewer from '@/components/zip-images/ZipImageViewer';
import { useEffect, useState } from 'react';

export default function ZipImagesPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileList, setFileList] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPath) {
      fetch(
        `/api/list-zip-contents?zipFilePath=${encodeURIComponent(
          selectedPath,
        )}`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch zip contents');
          }
          return response.json();
        })
        .then((data) => {
          setFileList(data || []);
        })
        .catch((error) => {
          console.error('Error fetching zip contents:', error);
        });
    }
  }, [selectedPath]);

  return (
    <div className="p-4">
      <h1>Zip File Images</h1>
      <YearMonthDaySelector onSelectionChange={setSelectedPath} />
      {fileList.length > 0 && <ZipImageViewer zipFilePath={selectedPath!} />}
    </div>
  );
}
