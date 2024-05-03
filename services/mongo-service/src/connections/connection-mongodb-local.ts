import mongoose from 'mongoose';
import { createMongooseUri } from './mongoose-uri';

export function getDbConnection(): AsyncDisposable & {
  connection: Promise<typeof mongoose>;
} {
  const connection = mongoose.connect('mongodb://127.0.0.1:27017/myapp');
  connection.then(() => {
    console.log('Connected to MongoDB');
  });
  return {
    connection,
    [Symbol.asyncDispose]: async () => {
      try {
        (await connection).disconnect();
        console.log('Disconnected from MongoDB');
      } catch (error) {
        console.error(`Error in mogoose disconnect asyncDispose: ${error}`);
      }
      return;
    },
  };
}

export async function getAsyncDbConnection(
  database: string = 'my_app',
  port: number = 27017,
  host: string = 'localhost',
  username?: string,
  password?: string,
  authSource?: string,
  options?: Record<string, string>
) {
  const URI = createMongooseUri(
    ...[database, port, host, username, password, authSource, options]
  );
  try {
    const connection = await mongoose.connect(URI).then(payload => {
      console.log('Connecting to MongoDB...');
      return payload;
    });

    return {
      ...connection,
      [Symbol.asyncDispose]: async () => {
        try {
          await connection.disconnect();
          console.log('Disconnected from MongoDB');
        } catch (error) {
          console.error(`Error in mogoose disconnect asyncDispose: ${error}`);
        }
        return;
      },
    };
  } catch (error) {
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
    console.error(`Error in mongoose at: getAsyncDbConnection   ${error}`);
    return {
      connection: null,
      [Symbol.asyncDispose]: async () => {
        return;
      },
    };
  }
}
