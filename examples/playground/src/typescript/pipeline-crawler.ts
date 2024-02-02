import fs from 'node:fs';
import path from 'node:path';

function listImagesInFolder(folderPath: string): string[] {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const extension = path.extname(file).toLowerCase();
    return imageExtensions.includes(extension);
  });
  return imageFiles;
}

function processImage(imagePath: string) {
  try {
    if (imagePath.includes('_')) {
      throw new Error(`Invalid file name: ${imagePath}`);
    }

    // Replace these console.logs with real processing steps later
    console.log(`Processing step 1 for ${imagePath}`);
    console.log(`Processing step 2 for ${imagePath}`);
    // Add more processing steps as needed
  } catch (error:any) {
    console.error(`\x1b[31mError: ${error.message}\x1b[0m`);
  }
}

const folderPath = '/projects/monorepo-one/private/imgs';
const imageFiles = listImagesInFolder(folderPath);

imageFiles.forEach(file => {
  const filePath = path.join(folderPath, file);
  processImage(filePath);
});



/*
1 Awaited<Type>
2 Partial<Type>
3 Required<Type>
4 Readonly<Type>
5 Record<Keys, Type>
6 Pick<Type, Keys>
7 Omit<Type, Keys>
8 Exclude<UnionType, ExcludedMembers>
9 Extract<Type, Union>
10 NonNullable<Type>
11 Parameters<Type>
12 ConstructorParameters<Type>
13 ReturnType<Type>
14 InstanceType<Type>
15 ThisParameterType<Type>
16 OmitThisParameter<Type>
17 ThisType<Type>
18 Uppercase<StringType>
19 Lowercase<StringType>
20 Capitalize<StringType>
21 Uncapitalize<StringType> openai-domain-verification=dv-Xs5yNORmMks7ppuaVkVHb9VF
 */
