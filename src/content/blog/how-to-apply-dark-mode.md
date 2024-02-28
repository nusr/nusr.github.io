---
title: 适配 Dark Mode
description: 实现适配 Dark Mode 的方法
pubDate: 2019/12/22
slug: how-to-apply-dark-mode
draft: false
tags:
  - CSS
---

## Table of contents

适配 Dark Mode 从未如此简单。

## 1. 使用选择器覆盖实现

这种方法兼容性最好，但是要多写很多代码。

```html
<div>
  <div>使用选择器覆盖</div>
  <label>Light</label>
  <input
    type="radio"
    name="theme"
    value="day"
    checked
    onclick="handleClick(this)"
  />
  <label>Dark</label>
  <input type="radio" name="theme" value="dark" onclick="handleClick(this)" />
</div>
<script>
  function handleClick(e) {
    if (e.value === "day") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
</script>
```

```css
.dark body {
  color: #fff;
  background: #000;
}

body {
  color: #000;
  background: #fff;
  transition: all 2s ease-out;
}
```

## 2. CSS var 实现 Dark Mode 适配

CSS var 函数可以接受两个参数，第一参数为空时，使用第二个参数。

```html
<div>
  <div>1. CSS + JS 实现 Dark Mode 适配</div>
  <label>Light</label>
  <input
    type="radio"
    name="theme"
    value="day"
    checked
    onclick="handleClick(this)"
  />
  <label>Dark</label>
  <input type="radio" name="theme" value="dark" onclick="handleClick(this)" />
</div>
<script>
  function handleClick(e) {
    if (e.value === "day") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
</script>
```

```css
.dark {
  --background-color: #000;
  --text-color: #fff;
}

body {
  color: var(--text-color, #000);
  background: var(--background-color, #fff);
  transition: all 2s ease-out;
}
```

CSS var 的兼容性如下：

![css variables](@assets/images/caniuse-css-variables.png)

大部分情况都可以适用，但是要兼容 IE，就不用考虑这个方法了。如果是在客户端渲染HTML文件，CSS 变量可以统一由客户端注入到HTML根标签上，这样，任何HTML页面都可以使用。

## 3. 纯 CSS 实现

**prefers-color-scheme** 可以判断系统使用的主题。

```css
body {
  background-color: #fff；;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000；;
  }
}
```

**prefers-color-scheme** 的兼容性如下：

![prefers-color-scheme](@assets/images/caniuse-prefers-color-scheme.png)

兼容性不如 CSS var，但是不需要使用JS，效率会很高。

## 参考

1. [https://developer.mozilla.org/en-US/docs/Web/CSS/var](https://developer.mozilla.org/en-US/docs/Web/CSS/var)
