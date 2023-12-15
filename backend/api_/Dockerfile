ARG version=16.17.1
FROM node:${version}-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY ./package.json /app/package.json

# Install dependencies.
RUN yarn

COPY ./ /app

# Build the app
RUN npm run build:prod

FROM node:${version}-slim as production
ENV NODE_ENV production

WORKDIR /usr/app

COPY --from=builder /app/dist /usr/app
COPY --from=builder /app/node_modules /usr/app/node_modules
COPY --from=builder /app/package.json /usr/app/package.json
COPY --from=builder /app/yarn.lock /usr/app/yarn.lock

EXPOSE 80

CMD ["node", "main.js"]
