#!/usr/bin/env bash

# /scripts/rush/upgrade.sh

set -euo pipefail

# Function to display error messages
error_exit() {
  echo "Error: $1" >&2
  exit 1
}

# Ensure pnpm is installed
if ! command -v pnpm &>/dev/null; then
  error_exit "pnpm is not installed. Please install pnpm before running this script."
fi

# Step 1: Upgrade pnpm globally using pnpm
echo "Upgrading pnpm globally using pnpm..."
if ! pnpm add -g pnpm; then
  error_exit "Failed to upgrade pnpm globally using pnpm."
fi

# Step 2: Get the new pnpm version
NEW_VERSION=$(pnpm -v)
if [ -z "$NEW_VERSION" ]; then
  error_exit "Failed to retrieve the pnpm version."
fi
echo "pnpm upgraded to version $NEW_VERSION"

# Step 3: Locate rush.json
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
RUSH_JSON_PATH="$PROJECT_ROOT/rush.json"

if [ ! -f "$RUSH_JSON_PATH" ]; then
  error_exit "rush.json not found at $RUSH_JSON_PATH"
fi

# Step 4: Update pnpmVersion in rush.json using sed
echo "Updating pnpmVersion in rush.json..."

# Backup rush.json
cp "$RUSH_JSON_PATH" "$RUSH_JSON_PATH.bak" || error_exit "Failed to create a backup of rush.json"

# Use sed to replace the pnpmVersion line while preserving comments
if ! sed -i -E "s/(\"pnpmVersion\"[[:space:]]*:[[:space:]]*\")[^\"]+(\")/\1$NEW_VERSION\2/" "$RUSH_JSON_PATH"; then
  error_exit "Failed to update pnpmVersion in rush.json"
fi

echo "pnpmVersion updated to $NEW_VERSION in rush.json"
rush update --full --network-concurrency 20
echo "Upgrade complete."
