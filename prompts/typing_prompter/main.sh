#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# main.sh

# Get the directory of the script
script_dir="$(dirname "$(readlink -f "$0")")"

# Shellcheck source="$script_dir/settings.sh"
source "$script_dir/settings.sh"
# Shellcheck source="$script_dir/functions.sh"
source "$script_dir/functions.sh"

# MODIFIED FUNCTION
display_text_char_by_char() {
  local text="$1"
  local min_delay="$2"
  local max_delay="$3"

  # Loop through each character in the text
  for ((i = 0; i < ${#text}; i++)); do
    char="${text:i:1}"

    # Generate a unique random delay time for each character
    local delay
    # Declare and assign separately to avoid masking return values.
    delay=$(generate_random_delay "$min_delay" "$max_delay")
    sleep "$delay"

    printf "%s" "$char"
  done
}

# Define a function to print a single character with a random delay
print_char() {
  # Generate a unique random delay time for each character
  char_delay=$(generate_random_delay "$char_min_delay" "$char_max_delay")
  sleep "$char_delay"
  printf "%c" "$1"
}

# Define a function to print a single word with random delays between characters
print_word() {
  # Generate a unique random delay time for each word
  word_delay=$(generate_random_delay "$word_min_delay" "$word_max_delay")
  sleep "$word_delay"
  for ((i = 0; i < ${#1}; i++)); do
    print_char "${1:i:1}"
  done
}

# Define a function to print a single line with random delays between words
print_line() {
  # Generate a unique random delay time for each line
  line_delay=$(generate_random_delay "$line_min_delay" "$line_max_delay")
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
print_text "$demo_text"
