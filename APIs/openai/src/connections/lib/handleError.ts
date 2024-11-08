// Utility functions

export function handleError(error: unknown, context: string): void {
  console.dir({ [`${context} failed (error):`]: error }, {
    depth: null,
    colors: true,
    compact: true,
  });
}
