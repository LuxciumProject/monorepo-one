#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# settings.sh

# Define the minimum and maximum delay time for characters, words, and lines

export char_min_delay=0.005
export char_max_delay=0.1

export word_min_delay=0.025125
export word_max_delay=0.251

export line_min_delay=0.2
export line_max_delay=0.5

export char_max_delay=0 #.00000000001
export char_min_delay=0 #.00000000001
#
export word_max_delay=0 #.00000000001
export word_min_delay=0 #.00000000001
#
export line_max_delay=0 #.00000000001
export line_min_delay=0 #.00000000001

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

echo As I sit and contemplate the universe,
echo My mind begins to wander and my thoughts disperse.
echo
echo I wonder how it all began,
echo And how it will all end.
echo
echo I think about the stars and planets,
echo And how they spin and bend.
echo
echo The mysteries of the universe are many,
echo And we may never understand them all.
echo But I find solace in the fact,
echo That we\'re all a part of this great cosmic ball.
echo
echo From the smallest particle to the largest star,
echo We\'re all connected in some way,
echo And that thought fills me with wonder and awe,
echo As I ponder the universe each day.
