async function clickUnarchiveButtonsWithDelay() {
  let counter = 0
  const unarchiveButtons = document.querySelectorAll('button[aria-label="Désarchiver la conversation"]');
  for (const button of unarchiveButtons) {
    button.click();
    counter++;
    await new Promise(resolve => setTimeout(resolve, 350)); // Wait for 350ms
    console.log(`Clicked unarchive button ${counter}`);
  }
  console.log('Clicked all unarchive buttons.');
}

clickUnarchiveButtonsWithDelay();

