# Use an official Node.js image with LTS version as the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose port 3001 (used by your Node.js server)
EXPOSE 3001

# Command to run the backend server
CMD ["npm", "run", "server","--host"]
