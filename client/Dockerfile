FROM node:17-alpine
ENV CI=true
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]