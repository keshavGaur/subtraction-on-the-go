FROM node:8.9.4
LABEL maintainer="keshav Gaur"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --only=production && mv node_modules ../
COPY . .