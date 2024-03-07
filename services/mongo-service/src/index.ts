import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

export default () => console.log('Hello from service two');

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  await mongoose.connect('mongodb://localhost/my_database', {
    connectTimeoutMS: 2000,
    socketTimeoutMS: 2000,
    serverSelectionTimeoutMS: 2000,
  });
  mongoose.connection
    .once('open', listener => {
      console.log('OPEN!', listener);
    })
    .on('error', error => {
      console.warn(error);
    });

  return void 0;
})();
