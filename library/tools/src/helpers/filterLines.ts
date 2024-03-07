export function filterLines(str: string) {
  return (linesList: string[][]) => linesList.map(linesFilter(str));
}

export function linesFilter(str: string) {
  return (lines: string[]) => lines.filter(lineFilter(str));
}

export function lineFilter(str: string) {
  return (line: string): boolean => {
    const result = line.search(str);
    return result > -1;
  };
}
