FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build assets if you have a build script
# RUN npm run build

# Expose the port your server uses (assuming 3000)
EXPOSE 3000

# Start your app (adjust based on your entry point)
CMD ["npm", "start"]
