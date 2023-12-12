FROM node:current-alpine3.18

RUN mkdir -p /acm_frontend
WORKDIR /acm_frontend
ADD . .
RUN npm install
RUN npm run build
CMD npm run start