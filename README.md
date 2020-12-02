# react-h5

## 项目介绍
react-h5项目

## 运行
1. yarn / npm install  安装依赖
2. yarn start  / npm run start  本地启动

## 使用说明
1. react / react-redux 前端框架 / 状态管理
   react: https://reactjs.bootcss.com/docs/getting-started.html
   redux: https://www.redux.org.cn/docs/react-redux/

2. UI库使用  antd-mobile  前端UI框架
   官网：https://mobile.ant.design/docs/react/introduce-cn

## :star: 特性

- 支持 ES6+ 源码，编译生成生产代码
- 集成代码风格校验 (eslint)
- 集成 git commit 校验（lint-staged）
- 集成代码热替换（react-hot-loader）
- 集成 API 代理（http-proxy-middleware)

## :open_file_folder: 目录介绍

    ├── dist 编译产出代码
    ├── internals 内部部件，包括 webpack 等 node 脚本
    ├── public 公共文件
    ├── server 服务端，承载 HMR，mock，proxy
    ├── src 源代码
        ├── components 公共组件
        ├── models  sotre/reducers
        ├── pages  页面文件
        ├── services  请求方法地址
        ├── utlis   各种封装/路由/请求

