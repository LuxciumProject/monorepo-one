#!/usr/bin/bash

# Constants
REPO_PATH="/home/luxcium/src/OpenDevin"
MAIN_BRANCH="main"
# WORKING_BRANCH="luxcium"

# Function to update the main branch and push to the remote fork
update_main_and_push() {
  local repo_path=$1
  local main_branch=$2
  # local working_branch=$3

  # Navigate to the repository directory
  cd "$repo_path" || exit 1

  # Check if there are any uncommitted changes and stash them
  uncommitted_changes=$(
    git diff-index --quiet HEAD --
    echo $?
  )
  if [ "$uncommitted_changes" -ne 0 ]; then
    echo "Uncommitted changes detected. Stashing changes."
    git stash push -m "Auto-stash before update $main_branch" || exit 1
    stashed=true
  fi

  # Store the current branch for later
  current_branch=$(git branch --show-current)

  # Checkout to the main branch
  git checkout "$main_branch" || exit 1

  # Pull latest changes from upstream main
  git pull upstream "$main_branch" || exit 1

  # Push the latest main to the remote fork
  git push origin "$main_branch" || exit 1

  # Switch back to the original branch
  git checkout "$current_branch" || exit 1

  # If changes were stashed earlier, pop the stash
  if [ "$stashed" = true ]; then
    echo "Reapplying stashed changes."
    git stash pop || exit 1
  fi
}

# Call the function
update_main_and_push "$REPO_PATH" "$MAIN_BRANCH"
# "$WORKING_BRANCH"
