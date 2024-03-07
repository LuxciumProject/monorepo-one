#!/usr/bin/env bash

function install_vscode() {
  # Set the installation directory
  install_dir="$HOME/vs-portable"

  # Create the installation directory
  mkdir -p "$install_dir" || exit 11

  # Download the VS Code portable package
  wget 'https://code.visualstudio.com/sha/download?build=stable&os=linux-x64' -O "$install_dir/vscode.tar.gz" || exit 12

  # Extract the package to the installation directory
  tar -xvf "$install_dir/vscode.tar.gz" -C "$install_dir" || exit 13

  # Remove the downloaded package
  rm "$install_dir/vscode.tar.gz" || exit 14

  # Create the data directory
  mkdir "$install_dir/data" || exit 15

  destination_dektop_file="$HOME/.local/share/applications/vscode-portable.desktop"
  # Create the desktop file
  {
    echo "[Desktop Entry]"
    echo "Name=Visual Studio Code (Portable)"
    echo "Comment=Code Editing. Redefined."
    echo "Exec=$install_dir/Code %F"
    echo "Terminal=false"
    echo "Type=Application"
    echo "StartupNotify=true"
    echo "Icon=$install_dir/resources/app/resources/linux/code.png"
    echo "Categories=TextEditor;Development;"
    echo "MimeType=text/plain;"
  } >"$destination_dektop_file"

  # Make the desktop file executable
  chmod +x "$HOME/.local/share/applications/vscode-portable.desktop" || exit 16
}
install_vscode
