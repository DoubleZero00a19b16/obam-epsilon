# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for the build/nest-cli)
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build command to create the /dist folder
RUN npm run build

# Stage 2: Production
FROM node:20-slim
WORKDIR /app

# Copy only the package files
COPY package*.json ./

# Install ONLY production dependencies (ignores devDependencies like Jest/TS)
# Also cleans the npm cache to save more space
RUN npm install --omit=dev && npm cache clean --force

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port and start
EXPOSE 3000
CMD ["node", "dist/main"]