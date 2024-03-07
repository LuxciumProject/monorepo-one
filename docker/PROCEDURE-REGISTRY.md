# Local Docker Registry Creation Steps

Here is a revised version of the setup, which includes more detailed
explanations and comments in the configuration files. This setup will
use ports 5555 and 5443, leaving ports 80 and 443 free on your local
machine.

## Step By Step procedure

1. Create a new directory for your project, and inside that directory,
   create a file called docker-compose.yml with the following content:

   ```yaml
   version: "3.3"

   services:
   registry:
   image: registry:2
   container_name: local_registry
   environment:
   REGISTRY_HTTP_ADDR: 0.0.0.0:5000
   expose: - "5000"

   nginx:
   image: nginx:latest
   container_name: nginx_proxy
   volumes: - ./nginx.conf:/etc/nginx/conf.d/registry.conf
   ports: - "5555:5555" # Expose port 5555 for http # - "5443:5443" # Uncomment this line to use HTTPS
   depends_on: - registry
   ```

   This docker-compose.yml file creates two services: registry (the Docker registry) and nginx (the reverse proxy). The registry service is using the official Docker registry image and exposing port 5000 within the Docker network. The nginx service uses the official Nginx image and mounts the custom nginx.conf file.

2. Create a new file called nginx.conf in the same directory as the docker-compose.yml file. Add the following content to the file, adjusting the server_name to match your custom hostname:

   ```conf
   # HTTP server configuration

   server {
   listen 5555; # Listen on port 5555 for incoming connections
   server_name registry.corsair-one;

       location / {
           proxy_pass http://registry:5000; # Forward requests to the Docker registry
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

   }

   # HTTPS server configuration (uncomment to enable)

   # server {

   # listen 5443 ssl; # Listen on port 5443 for incoming SSL connections

   # server_name registry.corsair-one

   # ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt; # Path to the SSL certificate

   # ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key; # Path to the SSL certificate key

   # location / {

   # proxy_pass <http://registry:5000>; # Forward requests to the Docker registry

   # proxy_set_header Host $host

   # proxy_set_header X-Real-IP $remote_addr

   # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for

   # proxy_set_header X-Forwarded-Proto $scheme

   # }

   # }
   ```

   This nginx.conf file defines two server blocks. The first block
   listens on port 5555 and forwards incoming HTTP requests to the
   Docker registry. The second block, which is commented out by default,
   listens on port 5443 for HTTPS requests.

3. (Optional) Generate a self-signed SSL certificate for HTTPS. Run the following commands:

   ```sh
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
   ```

   This command generates a new self-signed certificate and private key. You'll be prompted to enter information about your organization and server, which will be included in the certificate. You can use the default values for most fields, but make sure to enter the correct value for the "Common Name" field (e.g., registry.corsair-one).
   Copy the generated nginx-selfsigned.crt and nginx-selfsigned.key files to the "certs" directory in your project folder.

    <!-- Benjamin Vincent
    please keep going from where you stopped including the context just before you stopped and after you finish your explanation give a summary of general knowledge that is assumed in your explanation about docker docker-compose and make sure you gave a script tho automate all that including every step such that if I run it it would prove that everything work (I will only have created both the docker compose and the nginx config file and I would have created the folder and be in taht directory as I run the script that would create a registry add something in it and test it both on the `http://registry.corsair-one/v2/_catalog` and the `http://corsair-one:5555/v2/_catalog` also optionally on the https one I would create 3 filles (the 2 already mentioned) and the script I am asking for and running the script would prove that all my requests are fulfilled and working successfully (please continue where you stopped) -->

4. (Optional) If you want to use HTTPS, move the generated nginx-selfsigned.crt and nginx-selfsigned.key files to a directory named certs in the same directory as your docker-compose.yml and nginx.conf files. Update the docker-compose.yml to mount the certificate files inside the Nginx container:

   ```yaml
   version: '3.3'

   services:
   registry:
   image: registry:2
   container_name: local_registry
   environment:
   REGISTRY_HTTP_ADDR: 0.0.0.0:5000
   expose: - "5000"

   nginx:
   image: nginx:latest
   container_name: nginx_proxy
   volumes: - ./nginx.conf:/etc/nginx/conf.d/registry.conf - ./certs/nginx-selfsigned.crt:/etc/ssl/certs/nginx-selfsigned.crt # Mount the SSL certificate - ./certs/nginx-selfsigned.key:/etc/ssl/private/nginx-selfsigned.key # Mount the SSL certificate key
   ports: - "5555:5555" - "5443:5443" # Expose port 5443 for HTTPS
   depends_on: - registry
   ```

5. Run the following command to start both the Docker registry and Nginx containers:

   ```sh
   docker-compose up -d
   ```

   Now you can access your Docker registry at <http://registry.corsair-one:5555/v2/_catalog>, <http://corsair-one:5555/v2/_catalog>, and optionally, <https://corsair-one:5443/v2/_catalog> if you have set up HTTPS.

6. Create a script called test_registry.sh with the following content:

   ```sh
   #!/usr/bin/env bash

   # Pull and tag an image

   docker pull hello-world
   docker tag hello-world registry.corsair-one:5555/hello-world

   # Push the image to the registry

   docker push registry.corsair-one:5555/hello-world

   # Test the registry with different endpoints

   curl -X GET <http://registry.corsair-one:5555/v2/_catalog>
   curl -X GET <http://corsair-one:5555/v2/_catalog>

   # Uncomment the following line if you have set up HTTPS

   # curl -k -X GET <https://corsair-one:5443/v2/_catalog>
   ```

7. Make the script executable and run it:

   ```sh
   chmod +x test_registry.sh
   ./test_registry.sh
   ```

   This script will pull the hello-world image, tag it with the custom registry hostname, push it to the registry, and test the registry using both the custom hostname and the corsair-one hostname with the specified ports.

Docker is a platform for developing, shipping, and running applications in containers. Docker Compose is a tool for defining and running multi-container Docker applications. In this example, we use Docker Compose to create two containers, one for the Docker registry and another for the Nginx reverse proxy.

This setup fulfills your requirements:

A) Both ports 80 and 443 are unused and free on your local machine.
B) <http://registry.corsair-one:5555/v2/_catalog> and <http://corsair-one:5555/v2/_catalog> are equivalent in this context.
C) If you have set up HTTPS, <https://corsair-one:5443/v2/_catalog> is the way to access the secure registry.
D) In this setup, `https://registry.corsair-one:5443/v2/_catalog` would work as well, but you need to make sure you have uncommented the HTTPS server block in the `nginx.conf` file, moved the generated SSL certificate and key to the `certs` directory, and updated the `docker-compose.yml` file to mount the certificate files inside the Nginx container.

By following these steps, you should have a complete setup that meets your requirements. If you encounter any issues or need further clarification, please let me know.

Following the provided steps, you should have a complete and functional setup for your Docker registry and Nginx reverse proxy on your Fedora machine. The provided `test_registry.sh` script can be used to verify that everything works as expected, by pulling an image, pushing it to the registry, and testing the registry using different endpoints.

## Previous Working Notes

```sh
#!/usr/bin/env bash
sudo dnf install docker-ce -y >/dev/null
sudo docker run -d -p 5555:5000 --restart always --name registry registry:2 2>/dev/null || true
# sudo docker tag my-image localhost:5555/my-image
# sudo docker push localhost:5555/my-image
# sudo docker pull localhost:5555/my-image
# sudo openssl req -newkey rsa:4096 -nodes \
# -sha256 -keyout /etc/docker/certs.d/localhost:5555/ca.key \
# -x509 -days 365 -out /etc/docker/certs.d/localhost:5555/ca.crt

docker pull hello-world
docker tag hello-world localhost:5555/hello-world
docker push localhost:5555/hello-world

docker update --restart always registry
docker restart registry
```

## New Script

Here's a script that automates the process you described in your working notes. Save this script as setup_registry.sh in the same directory as your docker-compose.yml and nginx.conf files.

```bash
#!/usr/bin/env bash

# Create the certs directory if it doesn't exist
mkdir -p certs

# Generate a self-signed SSL certificate (optional)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/nginx-selfsigned.key -out certs/nginx-selfsigned.crt -subj "/C=US/ST=ExampleState/L=ExampleCity/O=ExampleOrg/CN=registry.corsair-one"

# Start Docker registry and Nginx containers
docker-compose up -d

# Pull and tag an image
docker pull hello-world
docker tag hello-world registry.corsair-one:5555/hello-world

# Push the image to the registry
docker push registry.corsair-one:5555/hello-world

# Test the registry with different endpoints
curl -X GET http://registry.corsair-one:5555/v2/_catalog
curl -X GET http://corsair-one:5555/v2/_catalog

# Test the registry using HTTPS (optional)
curl -k -X GET https://corsair-one:5443/v2/_catalog
```

**Make the script executable and run it:**

```bash
chmod +x setup_registry.sh
./setup_registry.sh
```

### This script will

1. Create the certs directory if it doesn't exist.

2. Generate a self-signed SSL certificate (optional).

3. Start Docker registry and Nginx containers using docker-compose up -d.

4. Pull and tag the hello-world image.

5. Push the image to the registry.

6. Test the registry using different endpoints (HTTP and HTTPS).

This should automate the steps described in your working notes. If you have any issues or need further clarification, please let me know.

## ChatGPT-4 Summary

**Topic:** Setting up a local Docker registry with Nginx reverse proxy on Fedora

**Context:** The user wants to create a local Docker registry using Nginx as a reverse proxy. The setup should use ports 5555 and 5443, leaving ports 80 and 443 free on their local machine. The user has provided a working notes file with detailed instructions and requested a single script to automate the setup process.

1. **Action Items:**
   Create a new directory for the project.
   Create a docker-compose.yml file with the provided content.
   Create an nginx.conf file with the provided content.
   Execute the provided setup_registry.sh script.

2. **Key Points:**
   The setup uses Docker Compose to create two containers: Docker registry and Nginx reverse proxy.
   Ports 5555 and 5443 are used, leaving ports 80 and 443 free.
   A self-signed SSL certificate can be generated and used for HTTPS (optional).
   The registry can be accessed at the specified endpoints, including HTTP and HTTPS.

3. **Contextual Information:**
   Docker is a platform for developing, shipping, and running applications in containers.
   Docker Compose is a tool for defining and running multi-container Docker applications.
   The setup_registry.sh script automates the process of setting up the Docker registry, Nginx reverse proxy, and testing the endpoints.

4. **Next Steps:**
   Verify the provided setup_registry.sh script meets the user's requirements.
   If any issues or clarifications are needed, address them accordingly.
   Once you have the summary, please feel free to copy and paste this summary into a new instance of ChatGPT so we can continue our conversation where we left off.
