import { getDbConnection } from '../connections/connection-mongodb-local';
import { BlogModel } from '../models/blog-example';

void (async function () {
  const actions = [];
  const small = new BlogModel({ size: 'small' });
  actions.push(small.save());

  // or
  actions.push(BlogModel.create({ size: 'small' }));

  // or, for inserting large batches of documents
  actions.push(BlogModel.insertMany([{ size: 'small' }]));
  await using myDB = getDbConnection();
  await Promise.all(actions);
  return myDB;
})();
