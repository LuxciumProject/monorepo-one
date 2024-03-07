#!/usr/bin/env bash

# Go to the source directory
echo -e "\nChanging directory to /src"
cd /src

if [ -d "htop" ]; then
    read -p "htop directory already exists, do you want to delete it? [y/n]: " choice
    if [ "$choice" = "y" ]; then
        echo -e "\nRemoving existing htop directory"
        rm -rf htop
    else
        echo -e "\nAborting script"
        exit 1
    fi
fi

# Clone the htop repository
echo -e "\nCloning htop repository"
git clone https://github.com/htop-dev/htop.git

# Go to the htop directory
echo -e "\nChanging directory to htop"
cd htop

# Deinstall the currently installed htop package
echo -e "\nDeinstalling currently installed htop package"
sudo dnf remove -y htop

# Install dependencies
echo -e "\nInstalling htop dependencies"
sudo dnf install -y "*hwloc*" "*ksensors*" "*lm_sensors*" "*pcp-lib*" "pcp-gui" "pcp" autoconf automake gcc hddtemp libcap-devel libnl3-devel libtool ncurses-devel xsensors

# Run the autogen script
echo -e "\nRunning autogen script"
./autogen.sh

# Configure htop with the recommended set of features
echo -e "\nConfiguring htop"
./configure --enable-unicode --enable-hwloc --enable-sensors --enable-capabilities --enable-delayacct # --enable-pcp

# Build htop
echo -e "\nBuilding htop"
make

# Install htop
echo -e "\nInstalling htop"
sudo make install

echo -e "\nCreating symlink to /usr/bin"
sudo ln -s /usr/local/bin/pcp-htop /usr/bin/htop
echo ""

echo "Installation complete!"
