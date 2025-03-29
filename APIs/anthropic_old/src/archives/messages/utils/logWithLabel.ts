export function logWithLabel(label: string) {
  return (value: any) => {
    console.log(label, value);
    return value;
  };
}
