import readline from 'readline';

// Define the choices
const choices = ['Option 1', 'Option 2', 'Option 3'];
let selectedIndex = 0;

// Handle keypress events
process.stdin.on('keypress', (_str, key) => {
  if (key.name === 'up')
    selectedIndex = (selectedIndex - 1 + choices.length) % choices.length;
  else if (key.name === 'down')
    selectedIndex = (selectedIndex + 1) % choices.length;
  else if (key.name === 'return') {
    console.log(`\nYou selected: ${choices[selectedIndex]}`);
    process.exit(0);
  }

  // Redraw the interface
  drawInterface();
});

// Enable keypress events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Draw the interface
function drawInterface() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  choices.forEach((choice, index) => {
    if (index === selectedIndex) {
      console.log(`> ${choice}`);
    } else {
      console.log(`  ${choice}`);
    }
  });
}

// Initial draw
drawInterface();
