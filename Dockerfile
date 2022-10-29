FROM node:16-alpine

RUN mkdir -p /source

WORKDIR /source

COPY . .

RUN yarn && yarn start

EXPOSE 8000

CMD ["node", "build/index.js"]
