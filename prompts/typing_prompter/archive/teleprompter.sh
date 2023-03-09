#!/bin/bash

# Define the text to display
text="As I sit and contemplate the universe,
My mind begins to wander and my thoughts disperse.

I wonder how it all began,
And how it will all end.

I think about the stars and planets,
And how they spin and bend.

The mysteries of the universe are many,
And we may never understand them all.
But I find solace in the fact,
That we're all a part of this great cosmic ball.

From the smallest particle to the largest star,
We're all connected in some way,
And that thought fills me with wonder and awe,
As I ponder the universe each day."

# Set the minimum and maximum delays before each word (in seconds)
min_word_delay=0.00005
max_word_delay=0.0002

# Set the minimum and maximum delays between each character (in seconds)
min_char_delay=0.00001
max_char_delay=0.00003

# Set the minimum and maximum delays between lines (in seconds)
min_line_delay=0.000125
max_line_delay=0.00025

# Define a function to print a single character with a random delay
print_char() {
  char_delay=$(awk -v min="$min_char_delay" -v max="$max_char_delay" 'BEGIN{srand(); print min+rand()*(max-min)}')
  sleep "$char_delay"
  printf "%c" "$1"
}

# Define a function to print a single word with random delays between characters
print_word() {
  word_delay=$(awk -v min="$min_word_delay" -v max="$max_word_delay" 'BEGIN{srand(); print min+rand()*(max-min)}')
  sleep "$word_delay"
  for ((i = 0; i < ${#1}; i++)); do
    print_char "${1:i:1}"
  done
}

# Define a function to print a single line with random delays between words
print_line() {
  # Randomize the delay before the line
  if [[ -z $1 ]]; then
    line_delay=$(awk -v min="0.05" -v max="0.1" 'BEGIN{srand(); print min+rand()*(max-min)}')
  else
    line_delay=$(awk -v min="$min_line_delay" -v max="$max_line_delay" 'BEGIN{srand(); print min+rand()*(max-min)}')
  fi

  # Wait before starting the line
  sleep "$line_delay"

  # Print each word in the line
  for word in $1; do
    print_word "$word"
    printf " "
  done

  # Print a newline character
  printf "\n"
}

# Define a function to print the entire text with random delays between lines
print_text() {
  # Read the lines of text into an array
  readarray -t lines <<<"$1"

  # Loop through each line in the array
  for line in "${lines[@]}"; do
    print_line "$line"
  done

  # Print a final newline character to preserve the prompt
  printf "\n"
}

# Call the print_text function with the text to display
print_text "$text"
