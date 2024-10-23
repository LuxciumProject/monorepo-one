#!/usr/bin/bash

# /scripts/rush/upgrade.sh
# Usage: ./upgrade.sh

set -euo pipefail # Exit immediately if a command exits with a non-zero status, treat unset variables as an error, and ensure errors in piped commands are also caught

# Function to display error messages
error_exit() {
  echo "Error: $1" >&2
  exit 1
}

# Step 1: Upgrade pnpm globally without using npm with retry mechanism
retry_count=0
max_retries=3
echo "Upgrading pnpm globally using pnpm..."
while [ $retry_count -lt $max_retries ]; do
  if pnpm add -g pnpm; then
    break
  else
    retry_count=$((retry_count + 1))
    echo "Retry $retry_count/$max_retries..."
    sleep 2
  fi
  if [ $retry_count -eq $max_retries ]; then
    error_exit "Failed to upgrade pnpm globally using pnpm after $max_retries attempts."
  fi
done

# Step 2: Get the new pnpm version
NEW_VERSION=$(pnpm -v)
if [ -z "$NEW_VERSION" ]; then
  error_exit "Failed to retrieve the pnpm version."
fi
echo "pnpm upgraded to version $NEW_VERSION"

# Step 3: Locate rush.json
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -z "$SCRIPT_DIR" ]; then
  error_exit "Failed to determine the script directory."
fi

PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
if [ -z "$PROJECT_ROOT" ]; then
  error_exit "Failed to determine the project root directory."
fi

RUSH_JSON_PATH="$PROJECT_ROOT/rush.json"

if [ ! -f "$RUSH_JSON_PATH" ]; then
  error_exit "rush.json not found at $RUSH_JSON_PATH"
fi

# Step 4: Update pnpmVersion in rush.json
echo "Updating pnpmVersion in rush.json..."
if ! jq --arg version "$NEW_VERSION" '.pnpmVersion = $version' "$RUSH_JSON_PATH" >"$RUSH_JSON_PATH.tmp"; then
  error_exit "Failed to update pnpmVersion in rush.json"
fi

# Validate the updated rush.json to ensure it is still valid JSON
echo "Validating the updated rush.json..."
if ! jq empty "$RUSH_JSON_PATH.tmp"; then
  error_exit "The updated rush.json is not valid JSON"
fi

# Replace the original rush.json with the updated one using a more atomic approach
if ! cp "$RUSH_JSON_PATH.tmp" "$RUSH_JSON_PATH"; then
  error_exit "Failed to replace rush.json with the updated version"
fi
rm "$RUSH_JSON_PATH.tmp"
echo "pnpmVersion updated to $NEW_VERSION in rush.json"

echo "Upgrade complete."
