---
title: 修复 Firebase 模拟器无法运行成功
description: Firebase login
pubDate: 2024/03/19
slug: firebase-login
draft: false
tags:
  - Firebase
  - Proxy
---

本地运行 `firebase login --no-localhost`, 运行报错 `Error: Cannot start the Authentication Emulator without a project: run 'firebase init' or provide the --project flag`

需要在控制台配置如下环境变量后，再次运行 `firebase login --no-localhost` ，即可成功

```bash
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
export NO_PROXY=localhost,127.0.0.1
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

运行 firebase 模拟器，运行失败

```bash
firebase init
export FIRESTORE_EMULATOR_HOST=127.0.0.1:9299
export AUTH_EMULATOR_HOST=127.0.0.1:9099
firebase emulators:start --only firestore,auth --import ./emulators/ --export-on-exit
```
