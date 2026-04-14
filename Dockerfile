FROM node:18-alpine

# Set workdir to backend folder
WORKDIR /app

# Copy backend package files
COPY backened/package*.json ./

RUN npm install

# Copy backend source code
COPY backened/. .

# Expose backend port (change if your server uses something else)
EXPOSE 5000

# Start command (adjust if your main file is different)
CMD ["node", "server.js"]

