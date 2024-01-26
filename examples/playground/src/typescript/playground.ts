import { spawn } from 'node:child_process';

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data: any) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data: any) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code: any) => {
  console.log(`child process exited with code ${code}`);
});

let any: any;
