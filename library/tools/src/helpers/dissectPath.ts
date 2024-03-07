import path from 'path';

export type InitialPart = `/${string}`;
export type FileNamePart = `${number}${'.' | ''}${string}`;
export type BasePart = `/${string}` | `/`;
export type FileSegments = [
  initialPart: InitialPart,
  fileNamePart: FileNamePart,
  basePart: BasePart
];

export function dissectPath(filePath: string, num: number = 2): FileSegments {
  const parsedPath = path.parse(filePath);
  const dirParts = parsedPath.dir.split(path.sep);

  let initialPart: InitialPart;
  let fileNamePart: FileNamePart = parsedPath.base as FileNamePart;
  let basePart: BasePart;

  if (num <= 0) {
    basePart = `/${dirParts.slice(1).join(path.sep)}`;
    initialPart = `/${fileNamePart}`;
  } else if (num >= dirParts.length - 1) {
    basePart = '/';
    initialPart = `/${dirParts.slice(1).join(path.sep)}/${fileNamePart}`;
  } else {
    const midParts = dirParts.splice(-num);
    basePart = `/${dirParts.slice(1).join(path.sep)}`;
    initialPart = `/${midParts.join(path.sep)}/${fileNamePart}`;
  }

  return [initialPart, fileNamePart, basePart];
}
