# APIne

🌲 APIne: A simple and out of the box back-end interface framework based on Express

## 简介

名字是 A Pine（松树）的组合，读音是`/ə'paɪn/`，象征着API具有像松树一样的层级结构。

本框架包含基本的API示例、ORM以及简易的JWT跨域认证系统（并可根据需要进行OAuth 2.0扩展）。

本项目状态：`开发中`

## 快速安装

``` bash
git clone https://github.com/Eling486/APIne.git
cd APIne
yarn
npm install -g pm2

# Development environment
yarn dev

# OR production environment
yarn start
# AND stop the app
yarn stop
```

## 统一状态码

|返回码|对应含义|
|------|-------|
|0|请求正常|
|-500|服务端异常|
|-501|用户相关异常|
|-50101|用户未登录|
|-50102|用户权限不足|
|-50103|登陆已过期|
|-50104|用户不存在|
|-50105|用户被封禁|
|-50106|Token不合法|
|-502|请求失败|
|-503|参数有误|
|-504|请求超时|