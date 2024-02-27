---
title: Adding new blog template
description: adding a new blog template
pubDate: 2024/02/24
slug: template
draft: true
tags:
  - template
---

## Table of contents

## Inside `src/assets/` directory (recommended)

Example: Suppose you want to display `example.jpg` whose path is `/src/assets/images/example.jpg`.

```md
![something](@assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work ❌ -->
<img src="@assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

### Inside `public` directory

Example: Assume `example.jpg` is located at `/public/assets/images/example.jpg`.

```md
![something](/assets/images/example.jpg)

<!-- OR -->
<img src="/assets/images/example.jpg" alt="something">
```
