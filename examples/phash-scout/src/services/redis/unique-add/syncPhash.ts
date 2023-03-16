export async function syncPhash(R: any, k: string) {
  try {
    // SEND COMMAND: IMGSCOUT.SYNC -----------------------------------
    await R.sendCommand(['IMGSCOUT.SYNC', k]);
    return true;
  } catch (error) {
    console.error(String(error));
  }
  return false;
}
