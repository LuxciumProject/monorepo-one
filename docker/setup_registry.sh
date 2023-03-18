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
