# LUXCIUM MONOREPO ONE

† **Scientia est lux principium✨** ™

This monorepo contains various projects, libraries, and services organized in a modular structure. It uses Git submodules and follows the Rush stack monorepo workflow.

## Repository Structure

### Core Components

#### LIBRARY

- [LIBRARY](/library/README.md)
  - [bigintString](/library/bigintString/README.md) - BigInt string manipulation utilities
  - [boxed-list](/library/boxed-list/README.md) - List boxing and manipulation tools
  - [colors-tools](/library/colors-tools/README.md) - Color manipulation utilities
  - [human-size](/library/human-size/README.md) - Human-readable size conversion
  - [mapping-tools](/library/mapping-tools/README.md) - Tools for mapping over lists and iterables
  - [object-with-expectations](/library/object-with-expectations/README.md) - Object validation tools
  - [parallel-mapper](/library/parallel-mapper/README.md) - Parallel data mapping utilities
  - [restraining-zalgo](/library/restraining-zalgo/README.md) - Text normalization tools
  - [tools](/library/tools/README.md) - General utility functions

#### SERVICES

- [Image Scout (Submodule)](/services/image-scout/README.md) - Service for image scouting operations
- [RPC Worker Pool (Submodule)](/services/rpc-worker-pool/README.md) - Remote Procedure Call worker management
- [Mongo Service](/services/mongo-service/README.md) - MongoDB related services
- [Questrade TS (Submodule)](/services/questrade-ts/README.md) - Questrade API TypeScript service
- [Phash Compute](/services/phash-compute/README.md) - Perceptual hash computation service

#### APIs

- [APIs](/APIs/README.md) - API implementations and integrations
  - [Version 2](/APIs/2/README.md) - Version 2 API implementations
  - [Anthropic](/APIs/anthropic/README.md) - Anthropic AI API integration
  - [OpenAI](/APIs/openai/README.md) - OpenAI API integration
  - [Sonnet 3.5](/APIs/sonnet-3-5/README.md) - Sonnet 3.5 API implementation

#### BACKEND & FRONTEND

- [Backend](/backend/README.md) - Backend services and server-side code
  - [API](/backend/api/README.md) - Core API implementations
  - [Scratch](/backend/scratch/README.md) - Development and experimental code
- [Frontend](/frontend/README.md) - Frontend applications and client-side code
  - [Client](/frontend/client/README.md) - Core client applications
  - [Home](/frontend/home/README.md) - Home page components
  - [Projects](/frontend/projects/README.md) - Individual frontend projects

### Development Resources

#### EXAMPLES

- [Examples](/examples/README.md) - Code examples and demonstrations
  - [Template](/examples/template/README.md) - Template examples for quick starting new modules
  - [Open AI](/examples/open-ai/README.md) - Examples related to OpenAI API usage
  - [GPU Stuff](/examples/gpu-stuff/README.md) - GPU computation examples
  - [Node.js](/examples/node-js/README.md) - Node.js implementation examples
  - [TypeScript](/examples/typescript/README.md) - TypeScript implementation examples

#### COMMON & SCRIPTS

- [Common](/common/README.md) - Shared configurations and utilities
  - [Config](/common/config/README.md) - Shared configuration files
  - [Git Hooks](/common/git-hooks/README.md) - Repository management hooks
  - [Scripts](/common/scripts/README.md) - Shared utility scripts
- [Scripts](/scripts/README.md) - Utility and automation scripts
  - [Docker Maintenance](/scripts/docker-maintenance-global-system/README.md)
  - [Rush Scripts](/scripts/rush/README.md)

### Additional Resources

- [Docker](/docker/README.md) - Docker configurations and services
- [Docs](/docs/README.md) - Project documentation
- [Infrastructure](/infrastructure/README.md) - Infrastructure setup
- [Helpers](/helpers/README.md) - Helper utilities

## Repository Configuration

### Git Submodules

The repository includes several submodules:

- services/image-scout: <https://github.com/Luxcium/Redis-ImageScout.git>
- services/questrade-ts: <https://github.com/Luxcium/questrade-ts.git>
- services/rpc-worker-pool: <https://github.com/Luxcium/rpc-worker-pool.git>
- library/mapping-tools: <https://github.com/LuxciumProject/mapping-tools.git>

### Project Management

The project uses:

- Rush stack for monorepo management (rush.json)
- VSCode multi-root workspaces (monorepo-one.code-workspace)
- Git submodules (.gitmodules)

## Getting Started

1. Clone the repository with submodules:

   ```bash
   git clone --recursive https://github.com/LuxciumProject/monorepo-one.git
   ```

2. Install dependencies using Rush:

   ```bash
   node common/scripts/install-run-rush.js install
   ```

3. Build all projects:

   ```bash
   node common/scripts/install-run-rush.js build
   ```

## License

Copyright © 2022-2024 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com

### NO PERMISSION ARE GRANTED FOR THIS SOFTWARE

    1) NOT TO PUBLISH;
    2) NOT TO DISTRIBUTE;
    3) NOT TO SUBLICENSE;
    4) NOT TO SELL COPIES OF;

#### NOTICE

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL OR ANY KIND,
> EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS WILL BE LIABLE FOR ALL
> OR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
> OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### EXCEPTIONS

#### YOU HAVE THE RIGHT TO

    A) USE IT FOR YOURSELF;
    B) DISTRIBUTE IT TO YOUR FRIENDS;
    C) DISTRIBUTE IT TO YOUR STUDENTS;
    D) DISTRIBUTE IT TO YOUR COWORKER;
    (FOR PERSONAL USE; AT HOME, AT SCHOOL OR AT WORK)

    IN ALL OR ANY CASES THE COPYRIGHT AND NOTICE ABOVE MUST BE INCLUDED.

† Scientia est lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu
