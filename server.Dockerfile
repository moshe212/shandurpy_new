FROM node:18-alpine

#Run extention server
EXPOSE 3001
WORKDIR /appServer
COPY server /appServer/server
RUN cd server && npm install
CMD cd /appServer/server && npm run start
