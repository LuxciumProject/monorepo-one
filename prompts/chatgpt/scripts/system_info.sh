#!/bin/bash

echo "System Information Report"
echo "========================="
echo "User and Group Information:"
echo "User: $(whoami)"
echo "Group: $(groups)"
echo "Hostname: $(hostname)"
echo ""

echo "Operating System and Kernel:"
neofetch
echo ""

echo "CPU Architecture:"
lscpu
echo ""

echo "Block Devices:"
lsblk
echo ""

echo "Memory Usage:"
free -h
echo ""

echo "Disk Usage:"
df -h
echo ""

echo "All System Information:"
uname -a
echo ""

echo "PCI Devices:"
lspci
echo ""

echo "USB Devices:"
lsusb
echo ""

echo "Detailed Hardware Information:"
hwinfo --short
echo ""

echo "Environment Variables:"
env
echo ""

# Replace `gsettings` with the equivalent for your desktop environment if not GNOME.
echo "Desktop Environment Settings:"
# For GNOME:
gsettings list-recursively
# For KDE Plasma (replace with specific config if needed):
# kreadconfig --file kscreensaverrc --group ScreenSaver --key Timeout
echo "KDE Desktop Environment Settings:"
# List configurations from the kwinrc file which manages window manager settings
echo "Window Manager Settings:"
cat ~/.config/kwinrc
echo ""

# List configurations related to plasma desktop settings
echo "Plasma Desktop Settings:"
cat ~/.config/plasma-org.kde.plasma.desktop-appletsrc
echo ""
