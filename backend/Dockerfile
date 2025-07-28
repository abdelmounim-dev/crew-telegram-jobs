FROM node:20-alpine

WORKDIR /opt/app

COPY package.json yarn.lock* package-lock.json* ./

ENV PATH /opt/app/node_modules/.bin:$PATH

RUN if [ -f "./yarn.lock" ]; then yarn install --frozen-lockfile; else npm install --production; fi

COPY . .

RUN npm run build

EXPOSE 1337

CMD [ "npm", "start" ]
