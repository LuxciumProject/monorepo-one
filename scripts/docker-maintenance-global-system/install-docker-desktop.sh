#!/usr/bin/env bash
exit 15
# sudo dnf -y install gnome-terminal

# sudo dnf -y install dnf-plugins-core
# sudo dnf config-manager \
#   --add-repo \
#   https://download.docker.com/linux/fedora/docker-ce.repo

# sudo dnf distro-sync -y --refresh

# # https://desktop.docker.com/linux/main/amd64/docker-desktop-4.19.0-x86_64.rpm?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64

# sudo modprobe kvm
# sudo modprobe kvm_intel

# sudo lsmod | grep kvm
# ls -al /dev/kvm
# sudo usermod -aG kvm "$USER"

# sudo dnf install -y qemu
# sudo dnf install -y qemu-kvm qemu-kvm-core libvirt-daemon-kvm

# if [[ "$(cat /etc/subuid)" != "$USER":100000:65536 ]]; then
#   (grep "$USER" /etc/subuid 1>/dev/null) 2>/dev/null || (echo "$USER:100000:65536" | sudo tee -a /etc/subuid)
# fi

# if [[ "$(cat /etc/subgid)" != "$USER":100000:65536 ]]; then
#   (grep "$USER" /etc/subgid 1>/dev/null) 2>/dev/null || (echo "$USER:100000:65536" | sudo tee -a /etc/subgid)
# fi
