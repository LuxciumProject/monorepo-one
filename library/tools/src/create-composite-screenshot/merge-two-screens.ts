#!/usr/bin/env node

/*

I am using linux nodejs typescript
I will take a screen capture of each screen (monitors) separately and have one (png) image of the corect size and change the size of teh other image and do a script with node js to change the sizes and put both in a resuting composit image
I need a self contained script (nodejs typescript) and not using canvas that would receive the path of the left image (probably a .png) followed bit the right image path to the other .png image if both are valid images I would like to composite them into a resulting image I would like to get the resulting composit image to be saved to the disk
I need a shebang please name it merge-two-screens.ts

the config files will be in the /projects/monorepo-one/library/tools folder and the script would be in the /projects/monorepo-one/library/tools/src/create-composite-screenshot/merge-two-screens.ts file I am unsing import instead of require


*/

// I am using linux nodejs typescript
// I will take a screen capture of each screen (monitors) separately and have one (png) image of the corect size and change the size of teh other image and do a script with node js to change the sizes and put both in a resuting composit image
// I need a self contained script (nodejs typescript) and not using canvas that would receive the path of the left image (probably a .png) followed bit the right image path to the other .png image if both are valid images I would like to composite them into a resulting image I would like to get the resulting composit image to be saved to the disk
// I need a shebang please name it merge-two-screens.ts

// the config files will be in the /projects/monorepo-one/library/tools folder and the script would be in the /projects/monorepo-one/library/tools/src/create-composite-screenshot/merge-two-screens.ts file I am unsing import instead of require

// Path: library/tools/src/create-composite-screenshot/merge-two-screens.ts

import { createCanvas, loadImage } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

const leftImage = process.argv[2];
const rightImage = process.argv[3];

const leftImageWidth = 1920;
const leftImageHeight = 1080;

const rightImageWidth = 1920;
const rightImageHeight = 1080;

const canvas = createCanvas(leftImageWidth + rightImageWidth, leftImageHeight);
const context = canvas.getContext('2d');

const leftImagePromise = loadImage(leftImage);
const rightImagePromise = loadImage(rightImage);

Promise.all([leftImagePromise, rightImagePromise]).then(images => {
  context.drawImage(images[0], 0, 0, leftImageWidth, leftImageHeight);
  context.drawImage(
    images[1],
    leftImageWidth,
    0,
    rightImageWidth,
    rightImageHeight
  );

  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(__dirname, 'composite.png'), buffer);
});
