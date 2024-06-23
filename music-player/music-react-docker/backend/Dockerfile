# FROM node:lts
FROM node:lts-alpine
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "server"]
