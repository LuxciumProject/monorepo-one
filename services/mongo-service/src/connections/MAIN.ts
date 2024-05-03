import { getAsyncDbConnection } from './connection-mongodb-local';

void async function MAIN() {
  await using db = await getAsyncDbConnection();
  if (db.connection === null) {
    console.error('Error in MAIN: db is null');
    return db;
  }
  const dbx = db;
  console.log('ConnectionStates =====================================');
  console.dir(dbx.ConnectionStates);

  console.log('STATES ===============================================');
  console.dir(dbx.STATES);

  console.log('SchemaTypes ==========================================');
  console.dir(dbx.SchemaTypes);

  console.log('Types ================================================');
  console.dir(dbx.Types);

  console.log('connection ===========================================');
  console.dir(dbx.connection);

  console.log('connections ==========================================');
  console.dir(dbx.connections);

  console.log('mquery ===============================================');
  console.dir(dbx.mquery);
  // dbx.pluralize()
  // dbx.startSession()
  // dbx.syncIndexes()
  console.log('version ==============================================');
  console.log(dbx.version);
  console.log('------------------------------------------------------');

  return db;
};
// MAIN();
