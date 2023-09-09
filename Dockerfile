# Define builder container for intalling dependencies
FROM node:18-alpine as builder

ARG BUILD_CONTEXT
WORKDIR /build

# Copy workspace files
COPY package.json .
COPY yarn.lock .
COPY ./apps/${BUILD_CONTEXT}/package.json ./apps/${BUILD_CONTEXT}/
COPY ./prisma /build/prisma

# Install dependencies
RUN yarn install

# Build models
RUN yarn db:gen

# Create app container
FROM node:18-alpine

ARG BUILD_CONTEXT
WORKDIR /app

# Copy workspace files
COPY ./apps/${BUILD_CONTEXT}/package.json .
COPY yarn.lock .
COPY --from=builder /build/node_modules/@prisma/client /app/node_modules/@prisma/client
COPY --from=builder /build/node_modules/.prisma /app/node_modules/.prisma

# Copy app files
COPY ./apps/${BUILD_CONTEXT} /app

# Install yarn dependencies
RUN yarn install --production

# Start app
CMD ["yarn", "start"]
