#!/usr/bin/env bash

# Green
GREEN=$(tput setaf 2)
BRIGHT_GREEN=$(
  tput setaf 2
  tput bold
)
RESET=$(tput sgr0)

# Yellow
YELLOW=$(tput setaf 3)
BRIGHT_YELLOW=$(
  tput setaf 3
  tput bold
)

# Red
RED=$(tput setaf 1)
BRIGHT_RED=$(
  tput setaf 1
  tput bold
)

# # Bright Red Background
# RED_BG=$(tput setab 1)
# BRIGHT_RED_BG=$(tput setab 9)

# # Example Usage
# echo "${GREEN}Green${RESET}"
# echo "${BRIGHT_GREEN}Bright Green${RESET}"
# echo "${YELLOW}Yellow${RESET}"
# echo "${BRIGHT_YELLOW}Bright Yellow${RESET}"
# echo "${RED}Red${RESET}"
# echo "${BRIGHT_RED}Bright Red${RESET}"
# echo "${RED_BG}${BRIGHT_YELLOW}Bright Yellow on Red Background${RESET}"
# echo "${BRIGHT_RED_BG}${BRIGHT_YELLOW}Bright Yellow on Bright Red Background${RESET}"
# echo "${BRIGHT_RED_BG}${YELLOW}Yellow on Bright Red Background${RESET}"
# echo "${RED_BG}${YELLOW}Yellow on Red Background${RESET}"

function cleanup {
  echo -e " \n   Aborted by the user."
  exit 130
}

trap cleanup SIGINT

# Prompt the user for confirmation before proceeding
read -r -p "
${RESET}
❯  ${BRIGHT_GREEN}WARNING:${RESET} ${GREEN}This script will stop and remove the Docker engine and containerd services,${RESET} ${BRIGHT_RED}

   THIS WILL DELETE${RESET} ${YELLOW}/var/lib/docker${GREEN},${RESET} ${YELLOW}/var/lib/containerd ${GREEN}and${RESET} ${YELLOW}$HOME/.docker${GREEN}${RESET}
   ${GREEN}and it will reinstall Docker engine.${RESET}

   ${BRIGHT_GREEN}Are you sure you want to continue?${RESET} [NO]/YES: " confirm
if [ "$confirm" != "YES" ]; then
  echo "   Aborted by user."
  exit 1
else
  sudo true
  echo -e "${RESET}\n\n❯  ${BRIGHT_GREEN}URGENT\u0021\u0021\u0021${RESET} ${GREEN}PLEASE USE CTRL+C TO ARBORT THIS WILL DELETE IMPORTANT FILES FROM YOUR SYSTEM${RESET}"
  echo -e "  ${YELLOW}/var/lib/docker${GREEN},${RESET} ${YELLOW}/var/lib/containerd ${GREEN}and${RESET} ${YELLOW}$HOME/.docker ${RED}WILL BE DELETED IN:${RESET}"
fi
echo -ne "  ${BRIGHT_YELLOW}"
# Display countdown timer before proceeding
for i in {10..1}; do
  echo -ne "$i "
  sleep 0.8
done
echo -e "${RESET} ${BRIGHT_RED}now\u0021${RESET}"
sleep 5

echo ''
echo 'Stop and disable Docker and containerd services'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo systemctl stop docker docker.socket containerd
sudo systemctl disable docker docker.socket containerd

echo ''
echo 'Remove Docker-related packages'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo dnf remove -y "*docker*" docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine

# echo ''
# echo 'Remove Docker-related directories'
# # ====================================================================
# printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
# echo ''

#? only in hard mode # sudo du /var/lib/docker
#? only in hard mode # sleep 1
#? only in hard mode # sudo du /var/lib/containerd
#? only in hard mode # sleep 2
#? only in hard mode # sudo du "$HOME/.docker"
#? only in hard mode # sleep 3
#? only in hard mode # sudo rm -rf /var/lib/docker
#? only in hard mode # sudo rm -rf /var/lib/containerd
#? only in hard mode # sudo rm -rf "$HOME/.docker"

echo ''
echo 'Add Docker repository refresh distro-sync and reinstall Docker'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo dnf -y install dnf-plugins-core
sudo dnf config-manager \
  --add-repo \
  https://download.docker.com/linux/fedora/docker-ce.repo

sudo dnf distro-sync -y --refresh
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo ''
echo 'Configure Docker permissions'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo groupadd docker

sudo usermod -aG docker "$USER"

mkdir -p /home/"$USER"/.docker "$HOME/.docker"
sudo chown "$USER":docker /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
ls -aFhl "$HOME/.docker"

echo ''
echo 'Start and enable Docker and containerd services'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo systemctl enable docker docker.socket containerd
sudo systemctl start docker docker.socket containerd

echo ''
echo 'Set Docker context and display status'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''

sudo docker context use default

sudo systemctl status docker docker.socket containerd --no-pager

echo ''
echo 'Run hello-world to verify installation'
# ====================================================================
printf "%*s\n" "$(tput cols)" "" | tr ' ' '='
echo ''
echo_E=""
sudo systemctl status docker docker.socket containerd --no-pager
sudo docker run hello-world && echo_E="${GREEN}―0K―${RESET}"
# ――------------------------------------------------------------------
printf "%*s\n" "$(tput cols)" "" | tr ' ' '-'
echo ''
echo -e "${echo_E}"
echo ''
