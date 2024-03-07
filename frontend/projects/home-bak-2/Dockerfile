ARG version=16.17.1
FROM node:${version} as builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY ./package.json /app/package.json

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install || cat /root/.npm/_logs/*.log; ls -1a; ls -1a /root/.npm/_logs

COPY . /app
# Build the app
RUN npm run build:prod

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
