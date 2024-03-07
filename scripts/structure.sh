#!/usr/bin/env bash
# File name: structure.sh

# MIT © 2022 Luxcium (Benjamin Vincent)

# Print the structure of a project folder, including the root folder,
# category folders in the root folder, and sub-folders in each
# category folder.

# Define the default value for the root folder
root_folder="."

# Check if the root folder path was provided as an argument
if [ $# -ge 1 ]; then
  # Use the first argument as the root folder path
  root_folder="$1"
else
  # Check if the root folder path was provided as an environment variable
  if [ -n "$ROOT_FOLDER" ]; then
    # Use the ROOT_FOLDER environment variable as the root folder path
    root_folder="$ROOT_FOLDER"
  fi
fi

# Print the root folder
echo "$root_folder"

# Print the category folders in the root folder
for category_folder in "$root_folder"/*; do

  # Test if the directory exists
  if [ -d "$category_folder" ]; then
    echo "  $category_folder"
  fi
  # Print the sub-folders in each category folder
  for sub_folder in "$category_folder"/*; do
    if [ -d "$category_folder" ]; then

      echo "    $sub_folder"
      touch "$sub_folder"/README.md
    fi
  done
done

# This script was written by the AI Assistant
: '
Training data: a diverse dataset of publicly available web pages,
  books, and other texts

Knowledge cutoff: 2021

Current date: December 2022

Browsing: disabled

Capabilities: generating human-like text and answering questions on
  a wide range of topics

Intended use: assisting users with tasks and answering questions

Important note: verify the accuracy and reliability of any
  information or recommendations provided by Assistant, and use it
  as a supplement to, rather than a replacement for, human knowledge
  and expertise
'
# https://openai.com/blog/openai-assistant/
