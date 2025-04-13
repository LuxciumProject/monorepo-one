# LUXCIUM MONOREPO ONE

† **Scientia est lux principium✨** ™

This monorepo contains various projects, libraries, and services organized in a modular structure. It uses Git submodules and follows the Rush stack monorepo workflow.

## Repository Structure

### Core Components

#### 📚 LIBRARY

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

#### 💁 SERVICES

- [Phash Compute](/services/phash-compute/README.md) - Perceptual hash computation service
- [Scan Directories](/services/scan-directories/README.md) - Directory scanning utilities
- [RPC Worker Pool](/services/rpc-worker-pool/README.md) - Remote Procedure Call worker management
- [Image Pipeline](/services/image-pipeline/README.md) - Image processing pipeline service
- [Redis Services](/services/redis-services/README.md) - Redis integration services
- [Service One](/services/service-one/README.md) - General purpose service
- [Service Two](/services/service-two/README.md) - General purpose service
- [Mongo Service](/services/mongo-service/README.md) - MongoDB related services

#### 📙 APIs

- [APIs](/APIs/README.md) - API implementations and integrations
  - [Groq Cloud](/APIs/groq-cloud/README.md) - Groq Cloud API integration
  - [Anthropic](/APIs/anthropic/README.md) - Anthropic AI API integration
  - [OpenAI](/APIs/openai/README.md) - OpenAI API integration

#### 🏦 BACKEND

- [Backend](/backend/README.md) - Backend services and server-side code
  - [API](/backend/api/README.md) - Core API implementations
    - [API Package](/backend/api/api-package/README.md) - Legacy API server
    - [Comments](/backend/api/comments/README.md) - Comments API service
    - [Posts](/backend/api/posts/README.md) - Posts API service

#### 👨‍💻 FRONTEND

- [Frontend](/frontend/README.md) - Frontend applications and client-side code
  - [Home](/frontend/home/README.md) - Home page components
  - [Quick Start](/frontend/quick-start/README.md) - Quick start application

#### 🤖 PROMPTS

- [Prompts](/prompts/README.md) - Prompts for exercises and examples

#### 💫 PRIVATE

- [Private](/private/README.md) - Private and confidential files

#### 🎨 STATIC

- [Static](/static/README.md) - Static assets and resources

#### 🎱 EXAMPLES

- [Examples](/examples/README.md) - Code examples and demonstrations
  - [CaseCobra](/examples/casecobra-master/README.md) - CaseCobra development example
  - [Phash Scout](/examples/phash-scout/README.md) - Perceptual hash scouting examples
  - [Template](/examples/template/README.md) - Template examples for quick starting new modules
  - [Open AI](/examples/open-ai/README.md) - Examples related to OpenAI API usage
  - [GPU Stuff](/examples/gpu-stuff/README.md) - GPU computation examples
  - [MCP Servers](/examples/mcp-servers/README.md) - Model Context Protocol server examples
  - [Playground](/examples/playground/README.md) - General playground for experimentation
  - [Node.js](/examples/node-js/README.md) - Node.js implementation examples

#### 📔 SCRIPTS

- [Scripts](/scripts/README.md) - Utility and automation scripts

### Development Tools and Documentation

- [Infrastructure](/infrastructure/README.md) - Infrastructure setup and development tools

### Development Resources

#### COMMON & SCRIPTS

### DOCUMENTATION

- [Monorepo Structure](/docs/monorepo-structure.md): Documentation of the folder structure and metadata.
- [Naming Conventions](/docs/naming-conventions.md): Guide to the agreed-upon naming conventions for files, folders, and variables.
- [Common](/common/README.md) - Shared configurations and utilities
  - [Config](/common/config/README.md) - Shared configuration files
  - [Git Hooks](/common/git-hooks/README.md) - Repository management hooks
  - [Scripts](/common/scripts/README.md) - Shared utility scripts
- [Scripts](/scripts/README.md) - Utility and automation scripts
  - [Docker Maintenance](/scripts/docker-maintenance-global-system/README.md)
  - [Rush Scripts](/scripts/rush/README.md)
(Note: The links to README.md files are placeholders and will need to be verified for correctness. Each subdirectory should contain a README.md that provides further details about its contents.)

### Additional Resources

- [Docker](/docker/README.md) - Docker configurations and services
- [Docs](/docs/README.md) - Project documentation
- [Infrastructure](/infrastructure/README.md) - Infrastructure setup
- [Helpers](/helpers/README.md) - Helper utilities

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

### Luxcium License: NO PERMISSIONS GRANTED - PROVIDED "AS IS" - WITHOUT WARRANTY

- THESE FILES ARE **NOT** FIT FOR ANY PARTICULAR PURPOSE IN THEIR CURRENT FORM.
- THESE FILES OR THEIR CONTENT HAVE NOT BEEN TESTED OR RUN YET IN ANY OR ALL ENVIRONMENTS!
- **DO NOT** RUN ANY OF THESE FILES UNLESS YOU HAVE REVIEWED THEIR FULL CONTENT.
- YOU MUST TAKE FULL RESPONSIBILITY FOR ANY PROBLEMS THEY MAY CAUSE TO YOU (or anyone).
- YOU MUST TAKE FULL RESPONSIBILITY FOR ANY PROBLEMS THEY MAY CAUSE TO YOUR MACHINE (or any machine).

#### NO PERMISSIONS ARE GRANTED FOR THIS SOFTWARE OR DOCUMENTATION

```plaintext
    1) NOT TO PUBLISH;
    2) NOT TO DISTRIBUTE;
    3) NOT TO SUBLICENSE;
    4) NOT TO SELL COPIES OF;
```

   Even for unpermited usage you must provide the name of the copyright holder and this must be included in all copies or substantial portions of the Software:

   The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in this Software.

Except as contained in this notice, the name of the \<copyright holders> shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the \<copyright holders>. »

## COPYRIGHT

Copyright © 2023-2025 · LUXCIUM · (Benjamin Vincent) · luxcium﹫neb401.com

† **Scientia est lux principium✨** ™
