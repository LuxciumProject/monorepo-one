#!/usr/bin/env node

const fs = require('fs');
const Canvas = require('canvas');

// Read the paths of the two images from the command-line arguments
const image1Path = process.argv[2];
const image2Path = process.argv[3];

// Check that the images exist
if (!fs.existsSync(image1Path) || !fs.existsSync(image2Path)) {
  console.error('Error: One or both of the specified images do not exist');
  process.exit(1);
}

// Load the images
const image1Data = fs.readFileSync(image1Path);
const image1 = new Canvas.Image();
image1.src = image1Data;

const image2Data = fs.readFileSync(image2Path);
const image2 = new Canvas.Image();
image2.src = image2Data;

// Create a canvas that is large enough to hold both images
const canvas = Canvas.createCanvas(
  image1.width + image2.width,
  Math.max(image1.height, image2.height)
);

// Draw the images on the canvas
const ctx = canvas.getContext('2d');
ctx.drawImage(image1, 0, 0);
ctx.drawImage(image2, image1.width, 0);

// Save the composite image to a file
const compositeImageData = canvas.toBuffer();
fs.writeFileSync('composite.png', compositeImageData);

console.log('Successfully created composite image');

/*

I am using linux nodejs typescript
I will take a screen capture of each screen (monitors) separately and have one (png) image of the corect size and change the size of teh other image and do a script with node js to change the sizes and put both in a resuting composit image
I need a self contained script (nodejs typescript) and not using canvas that would receive the path of the left image (probably a .png) followed bit the right image path to the other .png image if both are valid images I would like to composite them into a resulting image I would like to get the resulting composit image to be saved to the disk
I need a shebang please name it merge-two-screens.ts

the config files will be in the /projects/monorepo-one/library/tools folder and the script would be in the /projects/monorepo-one/library/tools/src/create-composite-screenshot/merge-two-screens.ts file I am unsing import instead of require


*/
