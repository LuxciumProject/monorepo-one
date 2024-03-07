#!/bin/bash

# File: system_status.sh
# Created by AI: Assistant

# Print the hostname of the system
echo "Hostname: $(hostname)"

# Print the Linux distribution and version
echo "Linux Distribution: $(grep PRETTY_NAME /etc/os-release | cut -d'=' -f2 | tr -d '"')"
echo "Linux Version: $(grep 'VERSION_ID' /etc/os-release | cut -d'=' -f2 | tr -d '"')"

# Print the current system uptime
echo "Uptime: $(uptime -p)"

# Print the available and used disk space
echo "Disk Space:"
df -h | grep '/$'

# Print the available and used memory
echo "Memory:"
free -h

# Print CPU usage
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}'

# Print the number of logged-in users
echo "Logged-in Users: $(users | wc -w)"

# For more information about Assistant, visit:
# https://openai.com/blog/introducing-assistant/

sudo dnf config-manager --disable https://download.fedoraproject.org/pub/fedora/linux/updates/kde/37/x86_64/
