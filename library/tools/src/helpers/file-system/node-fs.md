---
runme:
  id: 01HMT3Y1N8YQY7JAE69MDH31AX
  version: v2.2
---

| Operation Name | Synchronous (`fs`) | Promise-based (`fs.promises`) | Callback-based (`fs`) | Row Number |
|----------------|--------------------|-------------------------------|-----------------------|------------|
| access         | accessSync         | access                        | 

```javascript {"id":"01HMT4ABPJ4H1QGQP6NN6B7B9R"}
// From fs.promise import access
// import { access } from 'fs.promised';
// import { cwd } from 'node:process';
// using the reuire form please import { access, constants } from 'node:fs/promises';
const { access, constants } = require('node:fs/promises');



const { cwd } = require('node:process');
// file /projects/monorepo-one/library/tools/src/helpers/file-system/nodejs-topics.txt
const file = '/projects/monorepo-one/library/tools/src/helpers/file-system/nodejs-topics.txt'

// Check if the file exists in the current directory.
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// Check if the file is readable.
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// Check if the file is writable.
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// Check if the file is readable and writable.
access(file, constants.R_OK | constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`);
});

//  module.exports.myFunction =myFunction
//   function   myFunction() {
//   try {
//   await access('/etc/passwd', constants.R_OK | constants.W_OK);
//   console.log('can access');
// } catch {
//   console.error('cannot access');
// }
// }
// myFunction()
```

| Operation Name | Synchronous (`fs`) | Promise-based (`fs.promises`) | Callback-based (`fs`) | Row Number |
|----------------|--------------------|-------------------------------|-----------------------|------------|
| access         | accessSync         | access                        | access                | 1          |
| appendFile     | appendFileSync     | appendFile                    | appendFile            | 2          |
| chmod          | chmodSync          | chmod                         | chmod                 | 3          |
| chown          | chownSync          | chown                         | chown                 | 4          |
| close          | closeSync          | N/A                           | close                 | 5          |
| copyFile       | copyFileSync       | copyFile                      | copyFile              | 6          |
| cp             | cpSync             | cp                            | cp                    | 7          |
| createReadStream | N/A               | N/A                           | createReadStream      | 8          |
| createWriteStream | N/A             | N/A                           | createWriteStream     | 9          |
| exists         | existsSync         | N/A                           | exists                | 10         |
| fchmod         | fchmodSync         | fchmod                        | fchmod                | 11         |
| fchown         | fchownSync         | fchown                        | fchown                | 12         |
| fdatasync      | fdatasyncSync      | fdatasync                     | fdatasync             | 13         |
| fstat          | fstatSync          | fstat                         | fstat                 | 14         |
| fsync          | fsyncSync          | fsync                         | fsync                 | 15         |
| ftruncate      | ftruncateSync      | ftruncate                     | ftruncate             | 16         |
| futimes        | futimesSync        | futimes                       | futimes               | 17         |
| lchmod         | lchmodSync         | lchmod                        | lchmod                | 18         |
| lchown         | lchownSync         | lchown                        | lchown                | 19         |
| lutimes        | lutimesSync        | lutimes                       | lutimes               | 20         |
| link           | linkSync           | link                          | link                  | 21         |
| lstat          | lstatSync          | lstat                         | lstat                 | 22         |
| mkdir          | mkdirSync          | mkdir                         | mkdir                 | 23         |
| mkdtemp        | mkdtempSync        | mkdtemp                       | mkdtemp               | 24         |
| open           | openSync           | open                          | open                  | 25         |
| openAsBlob     | N/A                | openAsBlob                    | N/A                   | 26         |
| opendir        | opendirSync        | opendir                       | opendir               | 27         |
| read           | readSync           | N/A                           | read                  | 28         |
| readdir        | readdirSync        | readdir                       | readdir               | 29         |
| readFile       | readFileSync       | readFile                      | readFile              | 30         |
| readlink       | readlinkSync       | readlink                      | readlink              | 31         |
| readv          | readvSync          | readv                         | readv                 | 32         |
| realpath       | realpathSync       | realpath                      | realpath              | 33         |
| rename         | renameSync         | rename                        | rename                | 34         |
| rmdir          | rmdirSync          | rmdir                         | rmdir                 | 35         |
| rm             | rmSync             | rm                            | rm                    | 36         |
| stat           | statSync           | stat                          | stat                  | 37         |
| statfs         | statfsSync         | statfs                        | statfs                | 38         |
| symlink        | symlinkSync        | symlink                       | symlink               | 39         |
| truncate       | truncateSync       | truncate                      | truncate              | 40         |
| unlink         | unlinkSync         | unlink                        | unlink                | 41         |
| unwatchFile    | N/A                | N/A                           | unwatchFile           | 42         |
| utimes         | utimesSync         | utimes                        | utimes                | 43         |
| watch          | N/A                | watch                         | watch                 | 44         |
| watchFile      | N/A                | N/A                           | watchFile             | 45         |
| write          | writeSync          | N/A                           | write                 | 46         |
| writeFile      | writeFileSync      | writeFile                     | writeFile             | 47         |
| writev         | writevSync         | writev                        | writev                | 48

```javascript {"id":"01HMT3Z0HCAFY7BCVTPKJYAVPC"}
console.log('hello world')
```