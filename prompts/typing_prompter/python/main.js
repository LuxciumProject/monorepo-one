#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const mainFilePath = path.join(__dirname, 'main.py');
// const text = 'DEMO_TEXT';

function main(prompt) {
  const pythonProcess = spawn(mainFilePath, [prompt]);

  pythonProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });

  // child.stdout.on('data', data => {
  //   console.log(data.toString());
  // });

  // child.stderr.on('data', data => {
  //   console.error(`Error: ${data}`);
  // });

  // child.on('close', code => {
  //   console.log(`child process exited with code ${code}`);
  // });
}

if (require.main === module) {
  const prompt = process.argv[2] || 'DEMO_TEXT';
  main(prompt);
}
