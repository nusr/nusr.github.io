---
title: 前端性能优化：SPA 页面秒开
description: The SPA page opens in seconds
pubDate: 2020/04/04
slug: the-spa-page-opens-in-seconds
draft: false
tags:
  - Performance
---

## Table of contents

## 一、编译构建

## 1. tree shaking

去掉无用的代码，可以常规开启

## 2. DLL

将常用的包且不经常改变版本号的依赖包打包成公共 js
Vue 常用的包： vue vue-router vuex
React 常用的包： react react

## 3. 拆分成多个 HTML 页面

SPA 页面只有一个 HTML 页面。
可以多拆成几个 HTML 页面，加快页面打开速度。

## 二、框架层面

### 1. CDN

加载资源访问速度

### 2. gzip

nginx 可以常规开启，一般只压缩纯文本、字体文件、SVG 和 XMl 文件。图片压缩效果不好，且消耗服务器性能。

```bash
gzip  on;
gzip_comp_level 4;
gzip_buffers  4 16k;
gzip_types text/javascript text/plain text/css text/xml application/javascript application/x-javascript application/xml  application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
#gzip_min_length 1k;
gzip_http_version 1.1;
```

### 3. webp

存在兼容问题，IE 浏览器直接不支持

### 4. webview 缓存

webview 缓存配合 DLL 是大杀器。
端上缓存前端的静态资源，第一访问 webview 中的 H5 页面时，会去请求前端静态资源，端上缓存这些静态资源。
DLL 文件一般很少发生变化，后面进入 H5 页面时，可以直接从端上取 DLL 文件，不用去服务器请求资源。
前端代码 css 打包成一个文件，其余 js 打包成一个文件。每次前端发布时，只修改 index.css 和 index.js 文件的版本号。
DLL 文件最好也加上单独版本号，方便后期的更新。

```bash
# 前端四份文件。
index.html
1.0/index.js
1.0/index.css
0.1/dll.js
```

### 5. 组件懒加载

react 组件可以使用 [react-loadable](https://github.com/jamiebuilds/react-loadable)
vue 组件可以使用 [vue 官方指南](https://router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk)

### 6. 动态 import

异步引入 js 文件

### 7. 骨架屏

防止用户等待时间过长。

### 8. SSR

解决首屏加载缓慢的问题以及 SPA 应用 SEO 不佳的问题。
没尝试过，后期有机会尝试。

## 三、后端请求

### 1. 不经常变化的数据

使用 cookie,localStorage,sessionStorage 缓存不经常变化的数据
cookie 存储容量太小，大量数据存储推荐使用 localStorage,sessionStorage
过期的数据及时从 localStorage,sessionStorage 清除，防止存的数据过多

### 2. 经常变化的数据

对于一次请求多条数据，要做增删改查操作，可以使用增量修改。
比如删除列表中的一条数据，向后端请求成功后，后端只返回成功或者失败，请求成功后，前端做数据的刷新操作，减少请求次数。
缺点也很明显：多人对同一数据操作时，会导致数据不同步。

## 四、编码阶段

使用前面的优化手段后，编码阶段合理引入包即可。其他的优化，对整个的性能优化影响较小。
分析依赖包是否引入合理，少不了[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
