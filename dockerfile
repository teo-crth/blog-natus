# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./data ./data
COPY ./public ./public
COPY ./views ./views
COPY ./controllers ./controllers
COPY ./index.js ./index.js
COPY ./router.js ./router.js

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install

EXPOSE 3000

# Start the app using serve command
CMD [ "node", "index.js" ]


# 1 Créer une image avec commande dans le terminal : docker build -t natus-app1 .
# 2 run depuis docker destop