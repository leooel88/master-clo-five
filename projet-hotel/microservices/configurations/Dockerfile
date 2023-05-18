# Specify a base image
FROM node:16-alpine

# Set a working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code to working directory
COPY . .

# Build the project
RUN npm run build

# Expose API port to the outside
EXPOSE ${CONFIGURATION_MICROSERVICE_PORT}

# Launch application
CMD ["npm","start"]
