#!/usr/bin/env bash
# typing.sh

# Define the text to display
text="This is the text to display"

# Define the typing speed in seconds
speed=0.05

# Loop through each character in the text
for ((i = 0; i < ${#text}; i++)); do
  # Print the current character
  printf "%s" "${text:$i:1}"

  # Sleep for the specified amount of time
  sleep "$speed"
done

# Add a newline after the text has been displayed
printf "\n"
