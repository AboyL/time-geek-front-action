FROM node:12

COPY . /App
WORKDIR /App

# RUN npm install
# RUN node ./db/sync.js

EXPOSE 3000

CMD node ./db/sync.js && npm run dev