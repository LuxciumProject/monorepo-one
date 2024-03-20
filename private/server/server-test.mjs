// this must create an http server using no packages or no extensions
// the port MUST be 8080 and the response must be "hello, world" with the curent time on the server in an human friendly format

import https from 'node:https';
import fs from 'node:fs'; // Import fs module
import { hostname } from 'node:os';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
// path

const PORT = 8080;

console.log(`Current directory: ${cwd()}`);
console.log(hostname());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keyPath = __dirname + '/key.pem';
const certPath = __dirname + '/cert.pem';

  const options = {
    // Dummy Unsafe SSL Key and Certificate for testing.
    key: fs.readFileSync(keyPath),
    // Dummy Unsafe SSL Key and Certificate for testing.
    cert: fs.readFileSync(certPath)
  };



const server = https.createServer(options ,(_req, res) => {
    res.write('hello, world');
    res.write(new Date().toISOString());
    res.end();
});
// in my local config this is: «listening on https://corsair-one:8080/»
server.listen(PORT, hostname, () => { console.log(`listening on https://${hostname}:${PORT}/`) } );
