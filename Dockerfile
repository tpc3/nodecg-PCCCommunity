FROM node:alpine
WORKDIR /opt/nodecg
RUN apk add git && npm install --global nodecg-cli && nodecg setup
COPY . /opt/nodecg/bundles/PCCDiscord/
ENTRYPOINT nodecg start
