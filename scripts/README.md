# Scripts Documentation

This document provides an overview of the various scripts available in this repository, organized into logical groups for ease of use and understanding.

## Table of Contents

- [Scripts Documentation](#scripts-documentation)
  - [Table of Contents](#table-of-contents)
  - [Core Scripts](#core-scripts)
  - [Specialized Scripts](#specialized-scripts)
    - [Docker Maintenance](#docker-maintenance)
    - [Rush Scripts](#rush-scripts)
  - [Build and Deployment Scripts](#build-and-deployment-scripts)
  - [Utility Scripts](#utility-scripts)
  - [Development Scripts](#development-scripts)
  - [Tasks](#tasks)
  - [Usage](#usage)
  - [Notes](#notes)
  - [License](#license)
  - [Contact](#contact)

## Core Scripts

- `for_each-do_the_thing.sh` - Batch operation script that performs a specified action for each item in a list.
- `install_vscode.sh` - Installs Visual Studio Code in a portable manner.
- `install-all.rush.sh` - Installs all necessary dependencies for the project using Rush.
- `install-more.rush.sh` - Installs additional dependencies for the project using Rush.
- `install-ts-eslint.sh` - Installs TypeScript and ESLint for the project.
- `npm-global-install.sh` - Installs global npm packages required for the project.
- `populate-directories.sh` - Populates directories with initial files.
- `prepare.js` - Prepares the project for development.
- `pull-upstream.sh` - Pulls the latest changes from the upstream repository.
- `purge-rebuild.rush.sh` - Purges and rebuilds the project using Rush.
- `reset-all.sh` - Resets all configurations to their default state.
- `system_status.sh` - Checks the system status and provides a report.
- `update-minimal-all.sh` - Performs a minimal update for the project.
- `upgrade-eslint.sh` - Upgrades ESLint to the latest version.

## Specialized Scripts

### Docker Maintenance

Located in `/docker-maintenance-global-system/`:

- `install-docker-desktop.sh` - Installs Docker Desktop on the system.
- `UNSAFE-docker-engine-maintenance.sh` - Performs unsafe maintenance on the Docker engine.
- `UNSAFE-HARD-docker-engine-maintenance.sh` - Performs hard maintenance on the Docker engine.

### Rush Scripts

Located in `/rush/`:

- Rush-specific automation and management scripts for monorepo workflows.

## Build and Deployment Scripts

- `build.sh` - Builds the project.
- `deploy.sh` - Deploys the project.
- `start-minikube.sh` - Starts Minikube for local Kubernetes development.

## Utility Scripts

- `for_each-do_the_thing.sh` - Performs a specified action for each item in a list.
- `populate-directories.sh` - Populates directories with initial files.
- `reset-all.sh` - Resets all configurations to their default state.
- `system_status.sh` - Checks the system status and provides a report.

## Development Scripts

- `install-ts-eslint.sh` - Installs TypeScript and ESLint for the project.
- `upgrade-eslint.sh` - Upgrades ESLint to the latest version.
- `prepare.js` - Prepares the project for development.
- `pull-upstream.sh` - Pulls the latest changes from the upstream repository.
- `stress-test.sh` - Performs a stress test on the system.
- `structure.sh` - Sets up the initial structure for the project.

## Tasks

- `tasks.json` - Contains the configuration for various tasks that can be run in the project.
- `launch.json` - Contains the configuration for launching the project in a development environment.
- `settings.json` - Contains the configuration settings for the project.

## Usage

Most scripts can be executed directly from the command line. Always check the script content and any accompanying documentation before running.

```bash
# Make script executable
chmod +x script_name.sh

# Run script
./script_name.sh
```

## Notes

- Ensure that you have the necessary permissions to execute these scripts.
- Some scripts may require additional configuration or environment variables to be set.
- Always review the scripts before running them to understand their impact.

## License

This project is licensed under the terms of the Luxcium License. See the [LICENSE](../LICENSE) file for details.

## Contact

For any questions or issues, please contact Benjamin Vincent Kasapoglu at luxcium＠neb401.com.

† Scientia est lux principium✨ ™
