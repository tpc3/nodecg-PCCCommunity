FROM node:alpine
WORKDIR /opt/nodecg
RUN apk add --no-cache git make gcc python3 musl-dev g++ && npm install --global nodecg-cli && nodecg setup && npm i && apk del git make gcc python3 musl-dev g++
COPY . /opt/nodecg/bundles/pcccommunity/
CMD ["node", "index.js"]
