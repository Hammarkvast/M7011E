FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i gaussian
RUN npm install request
COPY . .
EXPOSE 8080
CMD ["npm","start"]
