#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# settings.sh

# Define the minimum and maximum delay time for characters, words, and lines

export char_min_delay=0.005
export char_max_delay=0.01

export word_min_delay=0.05
export word_max_delay=0.1

export line_min_delay=0.2
export line_max_delay=0.5

# export char_max_delay=0.5
# export char_min_delay=0.00001

# export word_max_delay=0.00015
# export word_min_delay=0.000005

# export line_max_delay=0.00025
# export line_min_delay=0.00001

# Define the ANSI escape codes for different colors
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[0;33m'
export BLUE='\033[0;34m'
export MAGENTA='\033[0;35m'
export CYAN='\033[0;36m'
export WHITE='\033[0;37m'

# Define the default color
export DEFAULT='\033[0m'

export demo_text="As I sit and contemplate the universe,
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
