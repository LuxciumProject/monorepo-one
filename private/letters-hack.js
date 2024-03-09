function addHoverEffect(elementSelector, options = {}) {
  // Define a string of uppercase letters.
  const letters = options.letters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // The rate at which the text changes, in milliseconds.
  const changeRate = options.changeRate || 30;

  // The amount to increment the iteration count each time.
  const incrementAmount = options.incrementAmount || 1 / 3;

  // Get the elements.
  const elements = document.querySelectorAll(elementSelector);

  // Add a mouseover event listener to each element.
  elements.forEach(element => {
    // Declare a variable to hold the interval ID.
    let interval = null;

    element.onmouseover = event => {
      // Initialize a counter for the iterations.
      let iteration = 0;

      // If an interval is already running, clear it.
      clearInterval(interval);

      // Start a new interval.
      interval = setInterval(() => {
        // Change the text of the element.
        event.target.innerText = event.target.innerText
          // Split the text into an array of characters.
          .split('')
          // Map each character to a new character.
          .map((_letter, index) => {
            // If the index of the character is less than the iteration count,
            // use the original character.
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            // Otherwise, use a random letter.
            return letters[Math.floor(Math.random() * letters.length)];
          })
          // Join the array of characters back into a string.
          .join('');

        // If the iteration count is greater than or equal to the length of the original text,
        // clear the interval.
        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        // Increment the iteration count.
        iteration += incrementAmount;
        // Run the interval every changeRate milliseconds.
      }, changeRate);
    };
  });
}

addHoverEffect('h1', {
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  changeRate: 30,
  incrementAmount: 1 / 3,
});

// As in: https://www.youtube.com/watch?v=W5oawMJaXbU
// Based on https://codepen.io/Hyperplexed/full/rNrJgrd
