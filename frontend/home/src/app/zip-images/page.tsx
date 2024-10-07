// @/app/zip-images/page.tsx
import { listZipContents } from '@/app/actions/listZipContents';
import ClientSideImageActions from '@/components/zip-images/ClientSideImageActions';

export default async function ZipImagesPage() {
  /*
    ERROR: Expected 1 arguments, but got 0.ts(2554)
    listZipContents.ts(10, 39): An argument for 'zipFilePath' was not provided.
 */
  const fileList = await listZipContents();

  return (
    <div className="p-4">
      <h1>Zip File Images</h1>
      {/*
        ERROR: Type '{ fileList: string[]; }' is not assignable to type 'IntrinsicAttributes & YearMonthDaySelectorProps'.
        Property 'fileList' does not exist on type 'IntrinsicAttributes & YearMonthDaySelectorProps'.ts(2322)
       */}
      <ClientSideImageActions fileList={fileList} />
    </div>
  );
}
