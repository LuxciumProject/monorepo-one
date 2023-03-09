#!/usr/bin/env python
# -*- coding: utf-8 -*-
# main.py

"""
This is a script to display a text character by character with random
delays between characters, words, and lines.
"""

import fcntl
import os
import random
import signal
import sys
import termios
import time

# Get the directory of the script
# script_dir = os.path.dirname(os.path.realpath(__file__))

# Source the settings.sh script to set the environment variables
# os.system(f"source {script_dir}/settings.sh")

# Set constants for average words per minute and average characters per word
AVG_WORDS_PER_MIN = 300
AVG_CHARS_PER_WORD = 5

# Calculate time per word in seconds
TIME_PER_WORD = 60 / AVG_WORDS_PER_MIN

# Calculate time per character in seconds
TIME_PER_CHAR = TIME_PER_WORD / AVG_CHARS_PER_WORD

# Define the delay times for characters, words, and lines
CHAR_MIN_DELAY = 0.0
CHAR_MAX_DELAY = TIME_PER_CHAR
WORD_MIN_DELAY = 0.0
WORD_MAX_DELAY = TIME_PER_WORD
LINE_MIN_DELAY = 0.1
LINE_MAX_DELAY = 0.2


# Define the demo text
DEMO_TEXT = """As I wander through the corridors of my mind,
I am struck by the overwhelming sense of uncertainty.

What is the meaning of life,
And why do we exist in this vast and complex universe?

Is there a purpose to our existence,
Or are we merely a random product of chance and evolution?

These questions may seem daunting,
But they are essential to understanding our place in the world.

For if we are to truly thrive and find happiness,
We must first come to terms with the unknown and embrace the uncertainty.

Only then can we begin to explore the depths of our potential,
And unlock the secrets of the universe that lay before us.

So let us not be afraid of the unknown,
But rather embrace it as an opportunity to learn and grow.

For it is through the mysteries of life that we find meaning,
And it is through our own unique journey that we discover our true purpose."""

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
# print_text(DEMO_TEXT)


def handle_interrupt(_signum, _frame):
    """
    Interrupt function
    """
    # Restore the terminal settings
    termios.tcsetattr(stdin_fd, termios.TCSADRAIN, old_term)
    fcntl.fcntl(stdin_fd, fcntl.F_SETFL, old_flags)
    sys.stdout.write("\b\b")
    sys.stdout.flush()
    print("...\n\nKeyboard interrupt received. Stopping...")
    sys.exit(0)


signal.signal(signal.SIGINT, handle_interrupt)


# Set the terminal in raw mode
stdin_fd = sys.stdin.fileno()
old_term = termios.tcgetattr(stdin_fd)
old_flags = fcntl.fcntl(stdin_fd, fcntl.F_GETFL)
fcntl.fcntl(stdin_fd, fcntl.F_SETFL, old_flags | os.O_NONBLOCK)

# Define the main function of your script here


def main():
    """
    Main function
    """
    # Check if a command line argument was provided
    if len(sys.argv) > 1:
        text = sys.argv[1]
    else:
        text = DEMO_TEXT

    print_text(text)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(" ...  \nKeyboard interrupt received. Stopping...")

# Restore the terminal settings
termios.tcsetattr(stdin_fd, termios.TCSADRAIN, old_term)
fcntl.fcntl(stdin_fd, fcntl.F_SETFL, old_flags)
