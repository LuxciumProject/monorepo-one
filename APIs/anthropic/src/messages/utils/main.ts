import { processImage } from './imageProcessor';

async function main() {
  const filePath =
    '/projects/monorepo-one/private/imgs/unsplash-ryan-johnston.jpg';
  const details = await processImage(filePath);
  console.log(details);
}

main().catch(console.error);
