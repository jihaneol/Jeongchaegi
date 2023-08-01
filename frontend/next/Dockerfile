
# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Set the environment variable to production
ENV NODE_ENV=production

# Expose the port that Next.js runs on (by default, it's 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
