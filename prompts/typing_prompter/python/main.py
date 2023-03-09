#!/usr/bin/env python
# -*- coding: utf-8 -*-
# main.py

"""
This is a script to display a text character by character with random
delays between characters, words, and lines.
"""

import os
import random
import time

# Get the directory of the script
script_dir = os.path.dirname(os.path.realpath(__file__))

# Source the settings.sh script to set the environment variables
os.system(f"source {script_dir}/settings.sh")

# Define the delay times for characters, words, and lines
# Define the delay times for characters, words, and lines
CHAR_MIN_DELAY = 0.005
CHAR_MAX_DELAY = 0.1
WORD_MIN_DELAY = 0.025125
WORD_MAX_DELAY = 0.251
LINE_MIN_DELAY = 0.2
LINE_MAX_DELAY = 0.5


# Define the demo text
DEMO_TEXT = """As I sit and contemplate the universe,
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
As I ponder the universe each day."""

# MODIFIED FUNCTION


def generate_random_delay(min_delay, max_delay):
    """
    Generate a random delay between min_delay and max_delay.
    """
    return random.uniform(min_delay, max_delay)

# MODIFIED FUNCTION


def display_text_char_by_char(text, min_delay, max_delay):
    """
    Display the text character by character with random delays between
    characters.
    """
    # Loop through each character in the text
    for char in text:
        # Generate a unique random delay time for each character
        delay = generate_random_delay(min_delay, max_delay)
        time.sleep(delay)

        print(char, end='', flush=True)
# Define a function to print a single character with a random delay


def print_char(char):
    """
    Print a single character with a random delay.
    """
    # Generate a unique random delay time for each character
    char_delay = generate_random_delay(CHAR_MIN_DELAY, CHAR_MAX_DELAY)
    time.sleep(char_delay)
    print(char, end='', flush=True)

# Define a function to print a single word with random delays between characters


def print_word(word):
    """
    Print a single word with random delays between characters.
    """
    # Generate a unique random delay time for each word
    word_delay = generate_random_delay(WORD_MIN_DELAY, WORD_MAX_DELAY)
    time.sleep(word_delay)
    for char in word:
        print_char(char)

    print(" ", end='', flush=True)

# Define a function to print a single line with random delays between words


def print_line(line):
    """
    Print a single line with random delays between words.
    """
    # Generate a unique random delay time for each line
    line_delay = generate_random_delay(LINE_MIN_DELAY, LINE_MAX_DELAY)
    time.sleep(line_delay)

    # Print each word in the line
    words = line.split()
    for word in words:
        print_word(word)

    # Print a newline character
    print()

# Define a function to print the entire text with random delays between lines


def print_text(text):
    """
    Print the entire text with random delays between lines.
    """
    # Read the lines of text into an array
    lines = text.splitlines()

    # Loop through each line in the array
    for line in lines:
        print_line(line)

    # Print a final newline character to preserve the prompt
    print()


# Call the print_text function with the demo text
print_text(DEMO_TEXT)
