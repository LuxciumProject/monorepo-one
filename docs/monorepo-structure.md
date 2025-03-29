# Monorepo Structure

This document provides an overview of the folder structure and metadata for the `monorepo-one` project. It includes information about each folder and subfolder, their purpose, and any relevant metadata.

## Folder Structure

### Root Directory

- **prompts/**
  - **typing_prompter/**: Contains scripts or files that prompt the user for input or display messages to the user.
  - **chatgpt/**: Contains scripts and resources related to ChatGPT prompts.
    - **more-prompts/**: Additional prompts for various applications.

- **private/**: Contains sensitive data or files that aren't intended to be shared publicly.

- **backend/**
  - **api/**: Contains backend code for APIs.
  - **scratch/**: Contains temporary or experimental backend scripts.

- **common/**: Contains shared resources and configurations.
  - **config/**: Configuration files for the project.
  - **scripts/**: Utility scripts for development and build processes.
  - **temp/**: Temporary files and directories.

- **docker/**: Contains Docker-related files and configurations.

- **docs/**: Contains documentation files.
  - **material-colors.yml**: YAML file for material colors.
  - **nginx.md**: Documentation for Nginx configuration.
  - **pomodoro.txt**: Notes on the Pomodoro technique.

- **examples/**: Contains example projects and code.
  - **node-js/**: Node.js example projects.
  - **phash-scout/**: Example project for pHash scouting.
  - **playground/**: Playground for experimenting with code.
  - **template/**: Template for new projects.
  - **typescript/**: TypeScript example projects.

- **frontend/**: Contains frontend code and resources.
  - **home/**: Frontend resources for the home directory.

- **library/**: Contains reusable code libraries.
  - **bigintString/**: Library for handling big integers as strings.
  - **boxed-list/**: Library for working with boxed lists.
  - **colors-tools/**: Library for color manipulation tools.
  - **human-size/**: Library for handling human-readable sizes.
  - **mapping-tools/**: Library for mapping tools.
  - **object-with-expectations/**: Library for working with objects with expectations.
  - **parallel-mapper/**: Library for parallel mapping.
  - **restraining-zalgo/**: Library for restraining Zalgo text.
  - **tools/**: General tools and utilities.

- **services/**: Contains various services and microservices.
  - **image-scout/**: Service for image scouting operations.
  - **rpc-worker-pool/**: Remote Procedure Call worker management.
  - **mongo-service/**: MongoDB related services.
  - **phash-compute/**: Service for computing perceptual hashes.
  - **redis-services/**: Redis related services.
  - **scan-directories/**: Service for scanning directories.
  - **service-one/**: Placeholder for a service.
  - **service-two/**: Placeholder for another service.

- **static/**: Contains static assets such as images, fonts, or stylesheets.

- **scripts/**: Contains utility scripts for development and build processes.

## Metadata

### Submodules

The monorepo includes several submodules, each with its own main branch:

- **image-scout**: [https://github.com/Luxcium/Redis-ImageScout.git](https://github.com/Luxcium/Redis-ImageScout.git) (main branch: `master`)
- **questrade-ts**: [https://github.com/Luxcium/questrade-ts.git](https://github.com/Luxcium/questrade-ts.git) (main branch: `master`)
- **rpc-worker-pool**: [https://github.com/Luxcium/rpc-worker-pool.git](https://github.com/Luxcium/rpc-worker-pool.git) (main branch: `rpc-worker-pool`)
- **mapping-tools**: [https://github.com/LuxciumProject/mapping-tools.git](https://github.com/LuxciumProject/mapping-tools.git) (main branch: `principal`)
- **ComfyUI**: [https://github.com/Luxcium/ComfyUI.git](https://github.com/Luxcium/ComfyUI.git) (main branch: `master`)
- **OpenHands**: [https://github.com/LuxciumProject/OpenHands.git](https://github.com/LuxciumProject/OpenHands.git) (main branch: `master`)

### Special Characters and Spacing

Some folders have special characters or spacing that are important for VSCode appearance. These should be preserved to maintain the intended structure and appearance in the VSCode explorer.

## Conclusion

This document provides an overview of the folder structure and metadata for the `monorepo-one` project. It is important to keep this documentation up-to-date with any changes to the monorepo structure to ensure consistency and clarity for all collaborators.
