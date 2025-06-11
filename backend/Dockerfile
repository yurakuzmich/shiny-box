# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create data directory and initialize tasks.json
RUN mkdir -p /app/dist/data && \
    echo "[]" > /app/dist/data/tasks.json

# Create a volume for persistent data
VOLUME ["/app/dist/data"]

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"] 