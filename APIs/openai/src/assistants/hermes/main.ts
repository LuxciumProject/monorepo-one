(async function MAIN() {
  try {
    // Your async code will go here:
    const result = null;
    //
    return { success: true as const, result };
  } catch (error: any) {
    const message: string = error?.message ?? 'An error occurred.';
    // const result = {
    //   success: false as const,
    // };
    console.warn('An error occurred:', error.message);
    // throw error;
    return { success: false as const, message, error };
  }
})()
  .then(result => {
    console.log('MAIN IIFE executed successfully.');
    console.dir([result]);
    return result;
  })
  .catch(error => {
    console.error('Unhandled error in MAIN IIFE:', error.message);
    const result = { success: false as const, criticalError: true };
    console.dir([error]);
    return result;
  })
  .then(
    (
      result:
        | { success: true }
        | { success: false; message?: string; criticalError?: boolean }
    ) => {
      console.log('MAIN IIFE completed after sucess or failure.');
      !result.success && result.criticalError ? console.dir(result) : null;
      return result;
    }
  )
  .finally(() => {
    console.log('MAIN IIFE finally block executed.');
  });

export function main<R>(
  tryBlock: () => R,
  catchBlock: (error: any) => any,
  finallyBlock: () => void
) {
  console.log('MAIN function executed.');
}
