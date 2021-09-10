FROM node:14-alpine3.12 AS builder

RUN apk --virtual build-dependencies add \
    libtool curl jq py3-configobj py3-pip py3-setuptools python3 python3-dev g++ make libusb-dev eudev-dev linux-headers && ln -sf python3 /usr/bin/python

WORKDIR /usr/app
COPY package.json yarn.lock /usr/app/

FROM builder AS development
WORKDIR /usr/app
RUN yarn install --frozen-lockfile --unsafe-perm
RUN yarn add usb --build-from-source
COPY . .
ENV NODE_ENV=production
RUN yarn build
ENV PORT=3000
EXPOSE 3000
CMD ["node", "/usr/app/dist/main"]
