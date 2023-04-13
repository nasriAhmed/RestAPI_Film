FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY server.js .

# Set the environment variables for MongoDB
ENV MONGO_URI mongodb://127.0.0.1:27017/filmstore

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "server.js" ]
