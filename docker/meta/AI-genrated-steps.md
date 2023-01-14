# Pipeline Environnement to Test Typescript Project

Create a pipeline for testing a typescript project in an isolated environment using Docker:

Create a Dockerfile in the root of your project with the following content:

```Dockerfile
FROM node:18

COPY package.json config.js src/ /app/

WORKDIR /app

RUN npm install

CMD ["npm", "run", "build"]
```

Run the following command to build the Docker image:

```bash
docker build -t my-ts-project .
```

Run the following command to start a container with your project and test package:

```bash
docker run -v $(pwd)/test-package.tgz:/app/test-package.tgz -it my-ts-project npm install ./test-package.tgz && npm run test
```

Once the container is running, you can use the following command to attach to it and run additional commands:

```bash
docker exec -it CONTAINER_ID bash
```

Please note that the above instructions assumes that you have a package.json file in the root of your project with a "build" and "test" script, and that you are using a test-package.tgz file in your current directory.

Please note that this is a more general template and may not be enough if your project has more complex dependencies, but it is a good starting point.
