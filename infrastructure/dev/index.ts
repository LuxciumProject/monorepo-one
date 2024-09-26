import * as docker from "@pulumi/docker";
import { ContainerPort } from '@pulumi/docker/types/input';

// Define the Next.js service
const nextjsImage = new docker.Image("nextjs-image", {
    build: {
        context: "./path-to-your-nextjs-app",
    },
    imageName: "nextjs-app:latest",
});

const nextjsContainer = new docker.Container("nextjs-container", {
    image: nextjsImage.imageName,
    ports: [{
        internal: 3000,
        external: 3000,
    }],
});

export const containerId = nextjsContainer.id;
export const containerName = nextjsContainer.name;
export const containerPort = nextjsContainer.ports.apply((ports:ContainerPort[] | undefined) => ports || [{external:null}][0].external || 4440);
