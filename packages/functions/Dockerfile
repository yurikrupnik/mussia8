FROM gcr.io/mussia6/lerna AS builder

COPY . ./packages/functions

RUN npm i
RUN npm run build

EXPOSE 3333 3334

CMD ["npm", "run", "fucntion"]
