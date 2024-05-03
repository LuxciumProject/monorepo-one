import { URLSearchParams } from 'url';

/**
 * Creates a MongoDB connection URI based on the provided parameters.
 * @remarks This function is used to create a MongoDB connection URI.
 * For more information, see the [MongoDB documentation](https://docs.mongodb.com/manual/reference/connection-string/).
 *
 * @param database - The name of the database to connect to. Defaults to 'my_app'.
 * @param port - The port number of the MongoDB server. Defaults to 27017.
 * @param host - The host address of the MongoDB server. Defaults to 'localhost'.
 * @param username - The username for authentication. Optional.
 * @param password - The password for authentication. Optional.
 * @param authSource - The authentication source database. Optional.
 * @param options - Additional connection options as key-value pairs. Optional.
 * @param srv - Indicates whether to use the SRV record. Defaults to false.
 * @returns The MongoDB connection URI.
 */
export function createMongooseUri(
  database: string = 'my_app',
  port: number = 27017,
  host: string = 'localhost',
  username?: string,
  password?: string,
  authSource?: string,
  options?: Record<string, string>,
  srv: boolean = false
): string {
  let uri = !srv ? 'mongodb://' : 'mongodb+srv://';

  if (username && password) {
    // Encode username and password to handle special characters
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    uri += `${encodedUsername}:${encodedPassword}@`;
  } else if (username) {
    const encodedUsername = encodeURIComponent(username);
    uri += `${encodedUsername}@`;
  }

  uri += `${host}:${port}`;

  if (database || authSource) {
    uri += '/';
  }

  if (database) {
    uri += database;
  }

  const params = new URLSearchParams();

  if (authSource) {
    params.append('authSource', authSource);
  }

  if (options) {
    for (const [key, value] of Object.entries(options)) {
      params.append(key, value);
    }
  }

  if (params.toString()) {
    uri += `?${params.toString()}`;
  }

  return uri;
}
