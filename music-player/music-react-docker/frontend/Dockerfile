# Use an official Node.js image with LTS version as the base image
FROM node:lts AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the frontend for production
RUN npm run build

# Expose port 5173 (default for Vite)
EXPOSE 5173

# Command to run the frontend server
CMD ["npm", "run", "dev"]
#CMD ["npm", "run", "dev", "--host", "0.0.0.0"]
