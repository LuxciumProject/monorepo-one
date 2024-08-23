export type LocalPath<
  LocalBasePath extends string = string,
  DirectoryPath extends string = string,
  FileName extends string = string,
> = `${LocalBasePath}/${DirectoryPath}/${FileName}`;
