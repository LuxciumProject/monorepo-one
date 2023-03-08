#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# main.sh

# Get the directory of the script
script_dir="$(dirname "$(readlink -f "$0")")"

# Shellcheck source="$script_dir/settings.sh"
source "$script_dir/settings.sh"

# Define the demo text
demo_text="This is the demo text that will be displayed in a loop."

# Display the demo text in a loop
while true; do
  printf "${RED}%s${DEFAULT}\n" "$demo_text"
  sleep 0.5
done
