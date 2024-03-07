export function splitedTail(str: string, separator: string) {
  return str.split(separator).slice(-1)[0];
}
export function splitedHead(str: string, separator: string) {
  return str.split(separator).slice(0, 1)[0];
}

export const splitHead = (separator: string) => (str: string) =>
  splitedHead(str, separator);

export const splitTail = (separator: string) => (str: string) =>
  splitedTail(str, separator);
