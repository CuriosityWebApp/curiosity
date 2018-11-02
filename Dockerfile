# base image
FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "start"]

# Build and tag Docker image
#  docker build -t curiosity .

# Then spin up the container
#  docker run -it \
#  -v ${PWD}:/usr/src/app \
#  -v /usr/src/app/node_modules \
#  -p 3000:3000 \
#  --rm \
#  sample-app