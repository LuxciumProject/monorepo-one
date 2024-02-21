#!/bin/bash

# Constants
PYTHON_EXEC="/home/luxcium/anaconda3/envs/ai_lab/bin/python"
MAIN_PY_PATH="/src/ComfyUI/main.py"
PLACEHOLDER_SCRIPT="/usr/bin/neo"
SESSION_NAME="comfyui_session"

# Check if the tmux session already exists and create it if it doesn't
if ! tmux has-session -t $SESSION_NAME 2>/dev/null; then
  # Create a new tmux session and start the first command in the main pane
  tmux new-session -d -s $SESSION_NAME -n main -c "$PLACEHOLDER_SCRIPT"

  # Split the main window into two panes horizontally, 66% and 33%
  # And start the second command in the new pane
  tmux split-window -h -p 33 -t $SESSION_NAME -c "$PYTHON_EXEC $MAIN_PY_PATH --port 8189 --cuda-device 1"

  # Split the right pane vertically into two and start the remaining commands
  tmux split-window -v -p 50 -t $SESSION_NAME:main.1 -c "$PYTHON_EXEC $MAIN_PY_PATH --port 8089 --cuda-device 0"
else
  echo "Session $SESSION_NAME already exists."
fi

# Attach to the session if not already attached
tmux attach -t $SESSION_NAME
