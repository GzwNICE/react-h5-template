# gagago-h5

## 项目介绍
gagago h5项目

## 运行
1. yarn / npm install  安装依赖
2. yarn start  / npm run start  本地启动

## 使用说明
1. react / react-redux 前端框架 / 状态管理
   react: https://reactjs.bootcss.com/docs/getting-started.html
   redux: https://www.redux.org.cn/docs/react-redux/

2. 国际化多语言使用  react-intl-universal 由阿里巴巴推出的react国际化库
   github官网：https://github.com/alibaba/react-intl-universal
   多类型字段国际化使用参考： https://juejin.im/post/5d11ae8b6fb9a07ee4637047#heading-18

3. UI库使用  antd-mobile  阿里巴巴前端UI框架
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
        ├── locales 国际化文档
        ├── models  sotre/reducers
        ├── pages  页面文件
        ├── services  请求方法地址
        ├── utlis   各种封装/路由/请求


## :bookmark_tabs: 文档

- [项目使用指南](./docs/项目使用指南.md)

- [Git Commit 规范](./docs/Git%20Commit规范.md)

- [版本规范.md](./版本规范.md)

## :paperclip: 更新日志

[CHANGELOG.md](./CHANGELOG.md)
