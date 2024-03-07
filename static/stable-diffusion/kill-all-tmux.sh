#!/bin/bash

# List all tmux sessions and kill each
tmux list-sessions -F "#{session_name}" | while read -r session; do
  echo "Killing session: $session"
  tmux kill-session -t "$session"
done

echo "All Tmux sessions have been killed."
