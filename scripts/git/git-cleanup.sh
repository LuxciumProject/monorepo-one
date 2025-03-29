#!/bin/bash
# FILE: git-cleanup.sh
# Description: Comprehensive Git repository maintenance script

echo "🧹 Starting Git repository maintenance..."

# 1. Update and prune remote references
echo "📡 Updating remote references..."
git fetch --all --prune

# 2. Remove local branches with deleted remotes
echo "🗑️ Removing local branches with deleted remotes..."
for branch in $(git branch -vv | grep ': disparue\]' | awk '{print $1}'); do
  echo "Removing branch: $branch"
  git branch -D "$branch"
done

# 3. Clean and optimize repository
echo "♻️ Optimizing repository..."
git gc --aggressive --prune=now
git repack -Ad

# 4. Show current branch status
echo -e "\n📊 Current branch status:"
git branch -vv

echo "✨ Maintenance complete!"
