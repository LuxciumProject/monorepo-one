import fs from 'fs';
import SchemaGenerator from 'json-schema-generator';
import JSONStream from 'jsonstream';

const stream = fs
  .createReadStream(
    '/home/luxcium/Téléchargements/730a31db355493e70b4f8c235275dd47cb35cce6a081d84eed4e5b174e7b27e3-2024-03-29-05-06-07/conversations.json'
  )
  .pipe(JSONStream.parse('*'));

let data: any[] = [];

stream.on('data', (chunk: any) => {
  const processedChunk = replaceUniqueKeysWithCommonKey(chunk);
  data.push(processedChunk);
});

stream.on('end', () => {
  const schema = SchemaGenerator(data);
  console.log(JSON.stringify(schema, null, 2));
});

// Function to replace unique keys with a common key
function replaceUniqueKeysWithCommonKey(obj: any) {
  const newObj: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (isUUID(key) && typeof obj[key] === 'object') {
      newObj['common-key'] = replaceUniqueKeysWithCommonKey(obj[key]);
    } else if (typeof obj[key] === 'object') {
      newObj[key] = replaceUniqueKeysWithCommonKey(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// Function to check if a string is a UUID
function isUUID(str: string) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return regex.test(str);
}
