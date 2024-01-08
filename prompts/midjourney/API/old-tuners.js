// // Destination directory
// const DEST_DIR = '/projects/monorepo-one/prompts/midjourney/API/html/tuners';

// // Delay between requests (in milliseconds)
// const DELAY = 200;

// // // Fetch and save HTML for each URL
// // tunerUrlList.forEach((url, index) => {
// //   setTimeout(async () => {
// //     try {
// //       const response = await axios.get(url);
// //       const html = response.data;
// //       const filename = path.join(DEST_DIR, `file${index}.html`);
// //       fs.writeFileSync(filename, html);
// //       console.log(`Saved ${url} to ${filename}`);
// //     } catch (error) {
// //       console.error(`Failed to fetch ${url}: ${error.message}`);
// //     }
// //   }, index * DELAY);
// // });

// // Fetch and save HTML for each URL
// export async function fn_de0c94() {
//   try {
//     await Promise.all(
//       tunerUrlList.map((url, index) => {
//         setTimeout(async () => {
//           try {
//             const response = await axios.get(url);
//             const html = response.data;
//             const filename = path.join(DEST_DIR, `file${index}.html`);
//             fs.writeFileSync(filename, html);
//             console.log(`Saved ${url} to ${filename}`);
//           } catch (error) {
//             console.error(`Failed to fetch ${url}: ${error.message}`);
//           }
//         }, index * DELAY);
//       })
//     );
//   } catch (error) {
//     console.error(`Failed to fetch ${url}: ${error.message}`);
//   }

//   return void 0;
// }

// // fn_de0c94();
