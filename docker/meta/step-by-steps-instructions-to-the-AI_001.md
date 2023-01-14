<!-- I have made a strict step by step recipe for you (you ChatGPT the AI Assistant) to follow (A, and B,C,D) so that I can have A) a Dockerfile. and (B,C,D) : 3 scripts to start a standardized test environment using arguments and parameters provided to the command line in a step by step fashion to create an isolated testing pipeline using  B) docker build, C) docker run, D) docker exec; For me the user to copy/paste to include this code directly into my project... the recipe is as follow please produce the scripts using ARGs & ENVs to delegate to future steps or using best practices:   -->

# Create A Docker Pipeline Project To Test Main Project (Package.Tgz)

To create a customized Dockerfile and commands for building and running a secondary project, please use the following instructions for the next session of the AI Assistant:

## a) Create a dockerfile template for the **testing project** that includes the following steps

```markdown
1. Specify the base image to use (e.g. FROM node:18)
2. Copy the **testing project** files from host to container (e.g. COPY . . )
3. Install dependencies (e.g. RUN npm install)
4. Define environment variables if necessary (e.g. ENV NODE_ENV=development)
5. Expose any necessary ports (e.g. EXPOSE 3000)
6. Specify a command to run when the container starts (e.g. CMD ["npm", "start"])
```

## b) Create a command to build the image, including any arguments that can be passed at build time (e.g. --build-arg NODE_VERSION=18) for the **testing project**

```markdown
7. Use the command "docker build" and specify the path to the Dockerfile (e.g. "docker build -t my-test-image -f /path/to/Dockerfile .")
8. Pass any necessary build arguments (e.g. "docker build --build-arg NODE_VERSION=14 -t my-test-image -f /path/to/Dockerfile .")
```

## c) Create a command to run the container, including any necessary arguments for installing the package and building the typescript project for the **testing project**

```markdown
9. Use the command "docker run" and specify the image name (e.g. "docker run -it --rm my-test-image")
10. Mount the package to be tested as a volume (e.g. "docker run -it --rm -v /path/to/package.tgz:/app/package.tgz my-test-image")
11. Run the build command for the TypeScript project (e.g. "docker run -it --rm -v /path/to/package.tgz:/app/package.tgz my-test-image npm run build")
```

## d) Once the container is running, you can use the command "docker exec" to run commands inside the container and interact with the compiled javascript package for the **testing project**

```markdown
12. Use the command "docker exec -it [container name] [command]" (e.g. "docker exec -it my-test-container-1 npm test")
13. Use any necessary package.json scripts or NPM run commands to run performance or integration tests.
```

## Note

Make sure to include any necessary error handling and logging in the commands. Also, make sure that the AI includes the path to the package.json and config file so that the AI can include the compilation step in the build step and run the tests.

In this instruction, I have explicitly named the two projects, one is the project that I am working on (package.tgz) and the other one is the project that is used to build the Docker test pipeline (testing project).

The first project can be referred to as the "main project" or "development project" as it is the project that you are actively working on and developing.

The second project can be referred to as the "testing pipeline project" or "docker pipeline project" as it is used to build the test pipeline for the main project using Docker.

The instructions I provided above are instruction for YOU (the AI) to create A) a Dockerfile. and 3 shell scripts based on: B) docker build, C) docker run, D) docker exec; For me the user to copy/paste to include this code directly into my project...
