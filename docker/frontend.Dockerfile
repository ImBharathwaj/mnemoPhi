# Frontend Dockerfile for MnemoPhi React/Next.js Applications
FROM node:18-alpine

# Install necessary packages
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY frontend/dashboard/package*.json ./frontend/dashboard/
COPY frontend/userPage/package*.json ./frontend/userPage/
COPY frontend/shared/package*.json ./frontend/shared/

# Install dependencies for all frontend apps
WORKDIR /app/frontend/dashboard
RUN npm install

WORKDIR /app/frontend/userPage
RUN npm install

WORKDIR /app/frontend/shared
RUN npm install

# Copy source code
COPY frontend/ ./frontend/

# Build applications
WORKDIR /app/frontend/dashboard
RUN npm run build

WORKDIR /app/frontend/userPage
RUN npm run build

# Expose ports
EXPOSE 3000 3001

# Default command (can be overridden in docker-compose)
CMD ["npm", "start"]