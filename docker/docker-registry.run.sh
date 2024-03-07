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

# I apologize for the confusion in my previous responses. Here's the completion of step 3 and the missing parts of the last message.

# Step 3 (continued):

# ...enter information about your organization and server, which will be included in the certificate. You can use the default values for most fields, but make sure to enter the correct value for the "Common Name" field (e.g., registry.corsair-one).

# Copy the generated nginx-selfsigned.crt and nginx-selfsigned.key files to the "certs" directory in your project folder.
# And the missing part of the last message:

# D) In this setup, `https://registry.corsair-one:5443/v2/_catalog` would work as well, but you need to make sure you have uncommented the HTTPS server block in the `nginx.conf` file, moved the generated SSL certificate and key to the `certs` directory, and updated the `docker-compose.yml` file to mount the certificate files inside the Nginx container.

# Following the provided steps, you should have a complete and functional setup for your Docker registry and Nginx reverse proxy on your Fedora machine. The provided `test_registry.sh` script can be used to verify that everything works as expected, by pulling an image, pushing it to the registry, and testing the registry using different endpoints.
# By following these steps, you should have a complete setup that meets your requirements. If you encounter any issues or need further clarification, please let me know.
