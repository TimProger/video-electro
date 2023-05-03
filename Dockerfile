FROM node:18-alpine

COPY . .

RUN npm install --production
RUN npm run build
CMD ["npm", "start"]