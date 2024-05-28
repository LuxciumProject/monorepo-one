import { folderPathGenerator } from './folderPathGenerator';

// Example usage:
const pathGen = folderPathGenerator('/path/to');
let result = pathGen.next();
while (!result.done) {
  console.log(result.value); // Handle each yielded value
  result = pathGen.next();
}

if (result.value === undefined) {
  console.error('The specified path does not exist.');
} else if (null === result.value) {
  console.error('The specified path is not a directory.');
} else if (!result.value) {
  console.log('The directory contains no subdirectories.');
}
