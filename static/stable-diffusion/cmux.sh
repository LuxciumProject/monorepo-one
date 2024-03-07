#!/bin/bash

# Constants
SESSION_NAME="comfyui_session"
PYTHON_EXEC="/home/luxcium/anaconda3/envs/ai_lab/bin/python"
MAIN_PY_PATH="/src/ComfyUI/main.py"
PLACEHOLDER_SCRIPT="/usr/bin/neo"
FIRST_WINDOW_NAME="dashboard" # Replace 'dashboard' with your preferred window name

# Check if the tmux session already exists
if ! tmux has-session -t $SESSION_NAME 2>/dev/null; then
  # Create a new tmux session with a window named differently than 'main'
  tmux new-session -d -s $SESSION_NAME -n $FIRST_WINDOW_NAME

  # Split the new window into two panes horizontally and start the first specific command
  tmux split-window -P -h -l 33 -t $SESSION_NAME:0 "$PYTHON_EXEC $MAIN_PY_PATH --port 8089 --cuda-device 0"

  # Split the right pane vertically and start the second specific command
  tmux split-window -P -v -l 66 -t $SESSION_NAME:0.1 "$PYTHON_EXEC $MAIN_PY_PATH --port 8189 --cuda-device 1"

  # In the bottom right pane (now pane 2), start the third specific command (the placeholder script)
  tmux split-window -P -v -l 50 -t $SESSION_NAME:0.2 "$PLACEHOLDER_SCRIPT"

else
  echo "Session $SESSION_NAME already exists."
fi

# Attach to the session if not already inside a TMUX session
if [ -z "$TMUX" ]; then
  tmux attach -t $SESSION_NAME
else
  echo "Already in a TMUX session."
fi
