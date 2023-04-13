FROM node:18

# Set the working directory to /app
WORKDIR /Rest_Film_TP

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . /Rest_Film_TP

# Set the environment variables for MongoDB
ENV MONGO_URI mongodb://mongo:27017/filmstore

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Start the Node.js application
CMD [ "node", "server.js" ]
