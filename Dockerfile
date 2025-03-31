FROM node:lts-slim

WORKDIR /sefa_frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=development

EXPOSE 3001
# ENV CI=true は、Docker コンテナ内で npm test を 1 回実行して終了させる、React の build プロセスを厳格にする ために設定されています。
# GitHub Actions や Travis CI などの CI/CD 環境では、自動的に CI=true が設定されることが多い。
# ENV CI=true

# React の開発サーバーを起動
CMD ["npm", "run", "dev"]
