#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Desired Prettier configuration outline
const desiredConfig = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
};

// Helper function to check if a directory exists
function isDirectory(directory) {
  return fs.existsSync(directory) && fs.lstatSync(directory).isDirectory();
}

// Helper function to read JSON or JavaScript Prettier configs
function readConfig(filePath) {
  try {
    const ext = path.extname(filePath);
    if (ext === '.json' || ext === '.cjs') {
      return require(filePath);
    } else if (ext === '.yaml' || ext === '.yml') {
      const yaml = require('js-yaml');
      return yaml.load(fs.readFileSync(filePath, 'utf8'));
    } else {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error(`Error reading configuration from ${filePath}:`, err);
    return null;
  }
}

// Recursively find and inspect Prettier configuration files
function inspectPrettierConfigs(directory) {
  const entries = fs.readdirSync(directory);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);

    if (isDirectory(fullPath)) {
      // Skip node_modules and similar directories
      if (['node_modules', '.git', 'dist', 'build'].includes(entry)) {
        continue;
      }
      inspectPrettierConfigs(fullPath); // Recurse into subdirectory
    } else if (/\.prettierrc(\..+)?$/.test(entry)) {
      console.log(`\nInspecting: ${fullPath}`);
      const config = readConfig(fullPath);
      if (config) {
        validateConfig(config, fullPath);
      }
    }
  }
}

// Validate the configuration against the desired outline
function validateConfig(config, filePath) {
  const mismatchedKeys = [];
  for (const key in desiredConfig) {
    if (config[key] !== desiredConfig[key]) {
      mismatchedKeys.push({ key, expected: desiredConfig[key], found: config[key] });
    }
  }

  if (mismatchedKeys.length > 0) {
    console.log(`Issues found in ${filePath}:`);
    mismatchedKeys.forEach(({ key, expected, found }) => {
      console.log(`  - ${key}: Expected '${expected}', Found '${found || 'not defined'}'`);
    });
  } else {
    console.log(`All settings are correct in ${filePath}.`);
  }
}

// Entry point of the script
function main() {
  const rootDirectory = path.resolve('.'); // Starting directory
  console.log(`Inspecting Prettier configurations starting from: ${rootDirectory}\n`);

  inspectPrettierConfigs(rootDirectory);
}

main();
