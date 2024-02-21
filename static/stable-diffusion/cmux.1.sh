#!/usr/bin/env bash

# Define the path to the Conda environment's Python executable
PYTHON_EXEC="/home/luxcium/anaconda3/envs/ai_lab/bin/python"

# Define the path to the main.py script
MAIN_PY_PATH="/src/ComfyUI/main.py"

# Define the placeholder script for the matrix-style indicators
PLACEHOLDER_SCRIPT="/usr/bin/neo"

# Define the Tmux session name
SESSION_NAME="comfyui_session"

# Check if the Tmux session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  # Session does not exist, create a new tmux session
  tmux new-session -d -s ${SESSION_NAME} -n 'ComfyUI'

  # Split the initial window vertically for the main Zsh panel on the left (25% width)
  tmux split-window -t ${SESSION_NAME} -h -p 75

  # Split the right panel horizontally for the two ComfyUI instances
  tmux split-window -t ${SESSION_NAME}:0.1 -v -p 66
  tmux split-window -t ${SESSION_NAME} -v -p 50

  # Navigate to the first ComfyUI pane and start the first instance
  # tmux send-keys -t $SESSION_NAME:0.1 "exec $PYTHON_EXEC $MAIN_PY_PATH --port 8089 --cuda-device 0" C-m

  # Navigate to the second ComfyUI pane and start the second instance
  # tmux send-keys -t $SESSION_NAME:0.2 "exec $PYTHON_EXEC $MAIN_PY_PATH --port 8189 --cuda-device 1" C-m

  # Navigate to the third pane (for placeholder script) and start the script
  # tmux send-keys -t $SESSION_NAME:0.3 "exec $PLACEHOLDER_SCRIPT" C-m

  # Optionally, select the main Zsh pane to start
  tmux select-pane -t $SESSION_NAME:0.0

  echo "Session $SESSION_NAME created successfully."
else
  echo "Session $SESSION_NAME already exists. Attaching to it."
  tmux attach -t $SESSION_NAME
  exit 0
fi

# Attach to the tmux session only if not already inside a tmux session
if [ -z "$TMUX" ]; then
  tmux attach -t $SESSION_NAME
else
  echo "Already inside a Tmux session. Not attaching to avoid nesting."
fi

# ❯ lsof -i :8089
# ❯ netstat -tuln | grep 8089
# ❯ /sbin/ss -tuln | grep 8089
