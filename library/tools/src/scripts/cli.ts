// src/scripts/cli.ts

import {
  analyzeDirectory,
  categorizeContent,
  findDuplicateStructures,
} from './analyze-prompts';

async function main(): Promise<void> {
  const rootPath: string = process.argv[2] || './prompts';

  try {
    console.log('Analyzing directory structure...');
    const structure = await analyzeDirectory(rootPath);

    console.log('Categorizing content...');
    const categories = categorizeContent(structure);

    console.log('Finding duplicate structures...');
    const duplicates = await findDuplicateStructures({
      structure,
      categories,
      duplicates: new Map(),
    });

    // Output results in a structured format
    console.log('\nAnalysis Results:');

    console.log('\nCategories:');
    categories.forEach((files, category) => {
      console.log(`\n${category}:`);
      files.slice(0, 5).forEach(file => console.log(`  ${file}`));
      if (files.length > 5) console.log(`  ... and ${files.length - 5} more`);
    });

    // Add output for duplicates
    console.log('\nDuplicate Structures:');
    duplicates.forEach((paths, pattern) => {
      console.log(`\nPattern: ${pattern}`);
      paths.forEach(path => console.log(`  ${path}`));
    });
  } catch (error) {
    console.error('Analysis failed:', error);
    process.exit(1);
  }
}

main();
