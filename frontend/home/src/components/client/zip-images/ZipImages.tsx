// @Components/zip-images/client/ZipImages.tsx
'use client';
// ❌ Do NOT use async functions in client code
import 'client-only';
// 🚷 Importing server-side modules strictly prohibited
import { HTMLAttributes, useEffect, useState } from 'react';
import YearMonthDaySelector from '../../zip-images/YearMonthDaySelector';
import ZipImageViewer from '../../zip-images/ZipImageViewer';

export default function ZipImages(props: HTMLAttributes<HTMLDivElement>) {
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
    <div {...{ ...props, className: 'p-4' }}>
      <h1>Zip File Images</h1>
      <YearMonthDaySelector onSelectionChange={setSelectedPath} />
      {fileList.length > 0 && <ZipImageViewer zipFilePath={selectedPath!} />}
    </div>
  );
}
