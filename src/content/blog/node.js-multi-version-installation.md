---
title: Node.js 多版本安装
description: Node.js Multi-version installation
pubDate: 2018/10/01
slug: nodejs-multi-version-installation
draft: false
tags:
  - Node.js
---

## Table of contents

Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine（Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境）。

## 单个 Node.js 版本的安装

Node.js 单个版本的安装非常简单，根据自己的操作系统，从[官网](https://node.js.org/)下载安装程序，按照默认安装即可。国外的网站，下载速度较慢，国内有[镜像网站](http://node.js.cn/download/),下载较快。

### windows 安装遇到的坑

使用 npm install 安装包时报错，卸载了 Node.js 重新安装，依然报错

> 解决方法：安装盘文件系统为 FAT32，改为 NTFS，就可以安装包，不会报错了

## 多个 Node.js 版本的安装

Node.js 的版本更新非常快，所有有时需要在多个版本之间切换，就需要安装多个版本的 Node.js. Node.js 多个版本的安装，需要借助相应的工具。 MAC 和 Linux 用户，可以使用以下的安装工具。

- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

## nvm 安装 Node.js

安装 nvm 后，nodejs 依然还没有安装。打开 PowerShell 、 CMD 、 git bash(推荐),在命令行输入 `nvm` 回车会 nvm 所有可以使用的命令，说说常用的几个命令。

![nvm](@assets/images/nvm-help.png)

> 获取所有可以安装的 Node.js 版本

`nvm ls-remote`

![nvm ls-remote](@assets/images/nvm-list.png)

`LTS` 指最新稳定版本，`CURRENT` 指最新版本，一般安装 `LTS`

> 安装指定版本的 Node.js

`nvm install 20.11.1`

> 列出所有已经安装的版本

`nvm list`

> 指定当前要使用的 Node.js 版本,只用指定使用的 Node.js 版本后，nodejs 的才真正安装了。

`nvm use 20.11.1`

![nvm use 20.11.1](@assets/images/nvm-use.png)

> 卸载某个 Node.js 版本

`nvm uninstall 20.11.1`

## Node.js 包管理器

Node.js 包管理器一览表

- npm
- cnpm
- yarn

npm 是 Node.js 自带的包管理器，但是默认下载依赖包的地址是国外服务器，下载速度较慢。使用 npm ,下载包两小时，敲代码 5 分钟。阿里巴巴是 Node.js 前端非常重视 Node.js 的使用，于是，淘宝开发了 cnpm,使用与 npm 一致，默认下载是国内地址，下载速度快得飞起。下载地址[https://npm.taobao.org](https://npm.taobao.org/)

[yarn](https://yarnpkg.com/zh-Hans/) 是 facebook 开发的新一代包管理器，主要是解决依赖包的安装问题。支持离线安装依赖包，同时依赖包的安装顺序不会出错。

### npm yarn 命令对照表

| npm                                      | Yarn                                  |
| ---------------------------------------- | ------------------------------------- |
| npm install                              | yarn install                          |
| (N/A)                                    | yarn install –flat                    |
| (N/A)                                    | yarn install –har                     |
| (N/A)                                    | yarn install –no-lockfile             |
| (N/A)                                    | yarn install –pure-lockfile           |
| npm install \[package\]                  | (N/A)                                 |
| npm install –save \[package\]            | yarn add \[package\]                  |
| npm install –save-dev \[package\]        | yarn add \[package\] \[–dev/-D\]      |
| (N/A)                                    | yarn add \[package\] \[–peer/-P\]     |
| npm install –save-optional \[package\]   | yarn add \[package\] \[–optional/-O\] |
| npm install –save-exact \[package\]      | yarn add \[package\] \[–exact/-E\]    |
| (N/A)                                    | yarn add \[package\] \[–tilde/-T\]    |
| npm install –global \[package\]          | yarn global add \[package\]           |
| npm rebuild                              | yarn install –force                   |
| npm uninstall \[package\]                | (N/A)                                 |
| npm uninstall –save \[package\]          | yarn remove \[package\]               |
| npm uninstall –save-dev \[package\]      | yarn remove \[package\]               |
| npm uninstall –save-optional \[package\] | yarn remove \[package\]               |
| npm cache clean                          | yarn cache clean                      |
| rm -rf node_modules && npm install       | yarn upgrade                          |
