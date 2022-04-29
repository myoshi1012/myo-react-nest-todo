FROM node:17-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .
# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["npm", "run" "start:prod"]