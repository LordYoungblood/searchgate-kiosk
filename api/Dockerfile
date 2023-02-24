FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon &&\
    npm install &&\
    apk --no-cache add curl


EXPOSE 8080

CMD ["npm", "start"]