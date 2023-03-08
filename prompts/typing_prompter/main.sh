#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# main.sh

# Get the directory of the script
script_dir="$(dirname "$(readlink -f "$0")")"

# Shellcheck source="$script_dir/settings.sh"
source "$script_dir/settings.sh"

# Shellcheck source="$script_dir/typing.sh"
source "$script_dir/typing.sh"

# Define the demo text
demo_text="This is the demo text that will be displayed in a loop."

display_text_char_by_char() {
  local text="$1"
  local delay="$2"

  # Loop through each character in the text
  for ((i = 0; i < ${#text}; i++)); do
    char="${text:i:1}"
    printf "%s" "$char"
    sleep "$(awk "BEGIN {print $delay * rand()}")"
  done
}

# Display the demo text in a loop
while true; do
  printf "${RED}%s${DEFAULT}\n" "$demo_text"
  sleep 0.5
done

# display_typing_prompt() {
#   # Split the demo text into an array of words
#   local words=($(echo "$demo_text" | tr " " "\n"))

#   # Loop over each word
#   for word in "${words[@]}"; do
#     # Split the word into an array of characters
#     local characters=($(echo "$word" | fold -w1))

#     # Loop over each character
#     for character in "${characters[@]}"; do
#       # Display the character with a random delay
#       sleep "$(awk 'BEGIN{srand();print rand()}')"
#       printf "${RED}%s${DEFAULT}" "$character"

#       # Change the color of the recently typed characters
#       case "$RANDOM" in
#       [0-2500]) color=${RED} ;;
#       [2501-5000]) color=${GREEN} ;;
#       [5001-7500]) color=${BLUE} ;;
#       [7501-8750]) color=${MAGENTA} ;;
#       [8751-9375]) color=${CYAN} ;;
#       [9376-10000]) color=${WHITE} ;;
#       esac
#     done

#     # Add a delay between words
#     sleep "$(awk 'BEGIN{srand();print rand()}')"
#     printf " "
#   done

#   # Add a delay between lines
#   sleep "$(awk 'BEGIN{srand();print rand()}')"
#   printf "\n"
# }
