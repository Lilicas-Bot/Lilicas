# Define builder container for intalling dependencies
FROM node:18-alpine as builder

ARG BUILD_CONTEXT
WORKDIR /build

COPY package.json .
COPY yarn.lock .
COPY ./apps/${BUILD_CONTEXT}/package.json /build/${BUILD_CONTEXT}/

RUN yarn install
COPY ./apps/${BUILD_CONTEXT} build/${BUILD_CONTEXT}

# Create app container
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /build /app

CMD ["yarn", "start"]
