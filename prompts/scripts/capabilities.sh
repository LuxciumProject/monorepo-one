#!/usr/bin/env bash

# Processor
PROCESSOR=$(lscpu | grep "Nom de modèle" | cut -d ':' -f2 | xargs)

# RAM
RAM=$(free -h | grep Mem: | awk '{print $2}')

# Storage
# STORAGE=$(lsblk -o NAME,SIZE)

# Graphics Card
GRAPHICS_CARD="2x NVIDIA Corporation [TITAN Xp] dual GPU" # $(lspci | grep -i vga | awk -F: '{print $3}' | awk '{print $1}')

# Operating System
OS=$(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '"')

# Installed Software
# SOFTWARE=$(dnf list installed)

# Output to file
echo "Computer Capabilities:" >capabilities.txt
echo "Processor: $PROCESSOR" >>capabilities.txt
echo "RAM: $RAM" >>capabilities.txt
# echo "Storage: $STORAGE" >>capabilities.txt
echo "Graphics Card: $GRAPHICS_CARD" >>capabilities.txt
echo "Operating System: $OS" >>capabilities.txt
# echo "Installed Software: $SOFTWARE" >>capabilities.txt

cat capabilities.txt
echo "Capabilities output to capabilities.txt"
