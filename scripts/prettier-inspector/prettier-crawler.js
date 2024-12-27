#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Desired Prettier configuration outline
const desiredConfig = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
};

// Exclusion list for directories
const exclusionList = ['node_modules', '.git', 'dist', 'build', 'lib', 'src', 'out', 'OpenHands'];

// Helper function to check if a directory exists
function isDirectory(directory) {
  return fs.existsSync(directory) && fs.lstatSync(directory).isDirectory();
}

// Helper function to read Prettier configs in various formats
function readConfig(filePath) {
  try {
    const ext = path.extname(filePath);
    if (ext === '.json' || ext === '.cjs') {
      return require(filePath);
    } else if (ext === '.yaml' || ext === '.yml') {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(JSON.stringify(require('yaml').parse(fileContent)));
    } else if (ext === '.js') {
      return require(filePath);
    } else {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.log(`\x1b[31mError reading configuration from ${filePath}: ${err.message}\x1b[0m`);
    return null;
  }
}

// Recursively find and inspect Prettier configuration files
function inspectPrettierConfigs(directory, summary) {
  const entries = fs.readdirSync(directory);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);

    if (isDirectory(fullPath)) {
      // Skip directories in the exclusion list
      if (exclusionList.includes(entry)) {
        continue;
      }
      inspectPrettierConfigs(fullPath, summary); // Recurse into subdirectory
    } else if (/\.prettierrc(\..+)?$|prettier\.config\.js$/.test(entry)) {
      summary.totalFiles++;
      console.log(`\n\x1b[36mInspecting: ${fullPath}\x1b[0m`);
      const config = readConfig(fullPath);
      if (config) {
        validateConfig(config, fullPath, summary);
      } else {
        summary.invalidFiles.push(fullPath);
      }
    }
  }
}

// Validate the configuration against the desired outline
function validateConfig(config, filePath, summary) {
  const mismatchedKeys = [];
  for (const key in desiredConfig) {
    if (config[key] !== desiredConfig[key]) {
      mismatchedKeys.push({ key, expected: desiredConfig[key], found: config[key] });
    }
  }

  if (mismatchedKeys.length > 0) {
    console.log(`\x1b[33mIssues found in ${filePath}:\x1b[0m`);
    mismatchedKeys.forEach(({ key, expected, found }) => {
      console.log(`  \x1b[31m- ${key}: Expected '${expected}', Found '${found || 'not defined'}'\x1b[0m`);
    });
    console.log(`\x1b[35mSuggested Fix:\x1b[0m`);
    mismatchedKeys.forEach(({ key, expected }) => {
      console.log(`  \x1b[32mSet '${key}' to '${expected}'\x1b[0m`);
    });
    summary.filesWithIssues.push(filePath);
  } else {
    console.log(`\x1b[32mAll settings are correct in ${filePath}.\x1b[0m`);
    summary.correctFiles.push(filePath);
  }
}

// Entry point of the script
function main() {
  const rootDirectory = path.resolve('.'); // Starting directory
  const summary = {
    totalFiles: 0,
    correctFiles: [],
    filesWithIssues: [],
    invalidFiles: [],
  };

  console.log(`\x1b[34mInspecting Prettier configurations starting from: ${rootDirectory}\x1b[0m\n`);

  inspectPrettierConfigs(rootDirectory, summary);

  // Summary of results
  console.log(`\n\x1b[1mSummary of Inspection:\x1b[0m`);
  console.log(`  \x1b[34mTotal files inspected: ${summary.totalFiles}\x1b[0m`);
  console.log(`  \x1b[32mFiles with correct configuration: ${summary.correctFiles.length}\x1b[0m`);
  console.log(`  \x1b[33mFiles with issues: ${summary.filesWithIssues.length}\x1b[0m`);
  console.log(`  \x1b[31mInvalid or unreadable files: ${summary.invalidFiles.length}\x1b[0m`);

  if (summary.filesWithIssues.length > 0) {
    console.log(`\n\x1b[33mFiles with issues:\x1b[0m`);
    summary.filesWithIssues.forEach(file => console.log(`  \x1b[31m- ${file}\x1b[0m`));
  }

  if (summary.invalidFiles.length > 0) {
    console.log(`\n\x1b[31mInvalid or unreadable files:\x1b[0m`);
    summary.invalidFiles.forEach(file => console.log(`  \x1b[31m- ${file}\x1b[0m`));
  }
}

main();
