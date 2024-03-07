#!/bin/bash

# Set the default value for the RAMDISK_PATH variable if it is not set
RAMDISK_PATH=${RAMDISK_PATH-'/run/media/ramdisk'}

RAMDISK_FILES="${HOME}/ramdisk_files"
RAMDISK_PATH=${RAMDISK_PATH:-'/run/media/ramdisk'}

# Create the ramdisk
sudo mkdir -p "$RAMDISK_PATH"
sudo mount -t tmpfs -o size=1024m tmpfs "$RAMDISK_PATH"

# Copy the files from the hard drive to the ramdisk
sudo cp -rp "${RAMDISK_FILES}/"* "$RAMDISK_PATH"
sudo cp -rp /usr/bin "$RAMDISK_PATH"
sudo cp -rp /usr/sbin "$RAMDISK_PATH"

# /home/luxcium/.local/bin:/home/luxcium/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
