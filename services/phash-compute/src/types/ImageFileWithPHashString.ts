export type ImageFileWithPHashString = {
  compatibleImagefilePath: string;
  pHashString: string;
  pHashMethod: string | null;
};

export type WithPHashString = {
  pHashString: string;
  pHashMethod: string | null;
};
