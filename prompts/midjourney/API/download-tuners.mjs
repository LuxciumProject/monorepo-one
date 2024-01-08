import { exec } from 'child_process';
import path from 'path';

const DEST_DIR = '/projects/monorepo-one/prompts/midjourney/API/html/tuners';
const DELAY = 200;

/**
 * List of Midjourney tuner URLs to be fetched using commandline curl or wget.
 * List of URLs to fetch
 * @type {string[]}
 */
import tunerUrlList from './tuner-list.mjs';

function downloadWithWget(url, filename) {
  return new Promise((resolve, reject) => {
    exec(`wget -O "${filename}" "${url}"`, error => {
      if (error) {
        console.error(`Failed to fetch ${url}: ${error.message}`);
        reject(error);
      } else {
        console.log(`Saved ${url} to ${filename}`);
        resolve();
      }
    });
  });
}

export async function downloadUrls(tunerUrlList) {
  // extract the name from url as an example "https://tuner.midjourney.com/hqzgSEk" would yield 'hqzgSEk'

  for (let i = 0; i < tunerUrlList.length; i++) {
    const url = tunerUrlList[i];
    const name = url.split('/').pop();
    const filename = path.join(DEST_DIR, `${name}.html`);
    await downloadWithWget(url, filename);
    await new Promise(resolve => setTimeout(resolve, DELAY));
  }
}

downloadUrls(tunerUrlList);
//
