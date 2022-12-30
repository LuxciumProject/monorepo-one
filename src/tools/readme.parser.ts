import { load } from 'cheerio';
import fs from 'fs';
import { marked } from 'marked';

export async function extractTypeScriptCodeFromReadme() {
  // Read the README.md file
  const readme = fs.readFileSync('./README.md', 'utf8');

  // Parse the README.md file using the marked library
  const parsedReadme = marked(readme);

  // Load the parsed readme into cheerio
  const $ = load(parsedReadme);

  // Select all code blocks with a "language-typescript" class
  const codeBlocks = $('code.language-typescript');

  // Iterate over the code blocks and extract the code
  codeBlocks.each((_, codeBlock) => {
    const code = $(codeBlock).text();
    console.log(code);
  });
}
extractTypeScriptCodeFromReadme();

// // Create a JSDOM instance from the parsed readme
// const dom = new JSDOM(parsedReadme);

// // Get all the <pre><code class="language-typescript"> elements from the DOM
// const codeElements = dom.window.document.querySelectorAll(
//   'pre code.language-typescript'
// );

// // Iterate over the code elements and extract the code
// for (const codeElement of codeElements) {
//   false && console.log(codeElement.innerHTML);
// }

// import { JSDOM } from 'jsdom';
export async function fn_7b70ff() {
  // Read the README.md file
  const readme = fs.readFileSync('./README.md', 'utf8');
  // Parse the README.md file using the marked library
  const parsedReadmeMarked = marked(readme);
  const parsedReadme = readme; // marked(readme);
  void parsedReadmeMarked;
  // console.error(parsedReadme);
  // Extract the bash code blocks from the parsed readme
  const bashCodeBlocks = parsedReadme.match(/```bash\n(.+?)```/g);
  if (bashCodeBlocks) {
    const bashCode = bashCodeBlocks.map(codeBlock => {
      // Extract the code from the code block and return it
      return codeBlock.replace(/```/g, '');
    });
    console.log(bashCode);
  }

  // Extract the TypeScript code blocks from the parsed readme
  const tsCodeBlocks = parsedReadme.match(/```typescript\n(.+?)```/g);
  if (tsCodeBlocks) {
    const tsCode = tsCodeBlocks.map(codeBlock => {
      // Extract the code from the code block and return it
      return codeBlock.replace(/```/g, '');
    });
    console.log(tsCode);
  }
}
