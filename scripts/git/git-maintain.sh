#!/bin/bash
# FILE: git-maintain.sh
# Description: Performs additional maintenance tasks for Git repository

echo "🔍 Starting Git repository health check..."

# 1. Check for untracked files
echo "📋 Checking untracked files..."
git status -u

# 2. Verify repository integrity
echo "🔎 Verifying repository integrity..."
git fsck --full

# 3. Check for large files
echo "📦 Checking for large files..."
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sort -nr -k3

# 4. Show repository size info
echo "📊 Repository size information..."
du -sh .git/

# 5. Check remote configuration
echo "🌐 Remote repository configuration:"
git remote -v

echo "✨ Health check complete!"
