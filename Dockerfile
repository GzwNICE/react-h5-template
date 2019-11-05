# 基础镜像
FROM circleci/node:latest-browsers

# 定义工作目录
WORKDIR /usr/src/app/

USER root
COPY package.json ./
RUN yarn config set registry http://registry.npm.taobao.org/ && yarn install

COPY ./ ./

RUN npm run test

CMD ["npm", "run", "build"]
