#!/usr/bin/env node

const fs = require('fs');

// Set the label, message, and color for the badge
const LABEL = 'version';
const COLOR = 'blue';

// Read the package.json file
fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const packageData = JSON.parse(data);

  // Extract the version information
  const version = packageData.version;
  const MESSAGE = version;

  // Create the static badge URL
  const badgeUrl = `https://img.shields.io/static/v1?label=${LABEL}&message=${MESSAGE}&color=${COLOR}`;

  // Generate the Markdown version of the badge
  const markdown = `![${LABEL} Badge](${badgeUrl})`;

  // Print the Markdown to the console
  console.log(markdown);
});
