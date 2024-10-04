// @/app/zip-images/page.tsx
import { listZipContents } from '@/app/actions/listZipContents';
import ClientSideImageActions from '@/components/zip-images/ClientSideImageActions';

export default async function ZipImagesPage() {
  const fileList = await listZipContents();

  return (
    <div className="p-4">
      <h1>Zip File Images</h1>
      <ClientSideImageActions fileList={fileList} />
    </div>
  );
}
