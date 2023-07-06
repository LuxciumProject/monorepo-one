// UNIMPLEMENTED: Dummy redisCreateClient function as a placeholder  !
/** @deprecated placeholder is unimplemented */
const redisCreateClient: any = () => {
  throw null;
};
// HACK: place holder code and dummy connector                       !
const logInfo = console.log;
const logError = console.error;

export async function redisConnector(port: number = 6383) {
  const R = redisCreateClient({ port });
  if (!R) {
    throw new Error(`Failed to create Redis client on port ${port}`);
  }
  try {
    await R.connect();
    const result = String(await R.PING());
    logInfo(result, `redisTest:${port}`);
    const isConnected = result.toLowerCase() === 'pong';
    if (isConnected) {
      return R;
    }
    throw new Error('Connection failure');
  } catch (error) {
    logError(`Error running redisTest on port ${port}: ${error}`);
    await R.quit();
    return false;
  }
}
