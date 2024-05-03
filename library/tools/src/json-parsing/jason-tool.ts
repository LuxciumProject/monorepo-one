import { createReadStream } from 'fs';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamValues } from 'stream-json/streamers/StreamValues';

const filePath =
  '/home/luxcium/seagate/more/730a31db355493e70b4f8c235275dd47cb35cce6a081d84eed4e5b174e7b27e3-2024-04-24-23-43-12/conversations.json';

const pipeline = chain([createReadStream(filePath), parser(), streamValues()]);

const uniqueIds = new Set(); // To store unique UUIDs

const isUUID = (key: string) => {
  return /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(key);
};

pipeline.on('data', data => {
  const object = data.value;
  const keys = Object.keys(object);

  keys.forEach(key => {
    if (isUUID(key)) {
      uniqueIds.add(key); // Collecting UUID keys
      console.log(`UUID Key: ${key}, Value:`, object[key]);
    }
  });
});

pipeline.on('end', () => {
  console.log('Done processing JSON!');
  console.log('Unique UUIDs:', uniqueIds);
});

pipeline.on('error', err => {
  console.error('Error processing JSON:', err);
});
