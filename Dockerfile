# Use the base Nixpacks image
FROM ghcr.io/railwayapp/nixpacks:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Set CI environment variable to false to disable treating warnings as errors
ENV CI=false

# Run the build command
RUN npm run build

# Menjalankan aplikasi dengan perintah npm run start
CMD ["npm", "start"]
