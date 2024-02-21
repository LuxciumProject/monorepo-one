#!/usr/bin/env bash

# Path: net-dist-nodes.sh

# Activate the Conda environment
conda activate ai_lab

# Define the path to the Conda environment's Python executable
PYTHON_EXEC="/path/to/conda/envs/ai_lab/bin/python"

# Navigate to the ComfyUI directory
cd /projects/sdxl-workspace/ComfyUI/ && (
  # Create a new tmux session named 'comfyui_session'
  tmux new-session -d -s comfyui_session -n 'ComfyUI'

  # Start the first ComfyUI instance on GPU 0 in the first pane
  # Use exec to directly invoke the Python executable, replacing the current process
  tmux send-keys -t comfyui_session "exec $PYTHON_EXEC main.py --port 8089 --cuda-device 0" C-m

  # Split the window into two panes
  tmux split-window -h -t comfyui_session

  # Start the second ComfyUI instance on GPU 1 in the second pane
  # Again, use exec for direct invocation
  tmux send-keys -t comfyui_session:0.1 "exec $PYTHON_EXEC main.py --port 8189 --cuda-device 1" C-m

  # Attach to the tmux session
  tmux attach -t comfyui_session
)
