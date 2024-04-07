---
title: 使用 Jest 测试框架，实现 100% 的测试覆盖率
pubDate: 2024/04/07
slug: jest-100-percent-coverage
draft: false
tags:
  - Test
  - Jest
---

使用 Jest 测试框架，实现 100% 的测试覆盖率。
参考开源项目[https://github.com/nusr/excel](https://github.com/nusr/excel)

## VsCode 调试 Jest 测试用例

VsCode 添加调试的配置文件 **launch.json**
在文件中添加断点，点击 **Run and Debug** 启动调试

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/jest/bin/jest.js",
        "--runInBand",
        "./src/__tests__/shortcut.test.tsx" // 替换成需要调试的测试文件
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Jest mock

1. Error: Not implemented: navigation (except hash changes)
1. @testing-library/react 使用 fireEvent 触发点击事件没有透传 clientX, clientX, pageX, pageY等
1. mock localStorage
1. mock 某个模块的方法
1. mock window.navigator
1. mock image.onload
1. mock 全局对象

## mock 配置

将 jest.setup.js 添加 Jest 配置文件(jest.config.js)的 `setupFiles: ['<rootDir>/jest.setup.js']`

```ts
// mainDomSet.ts
class BaseSet<T extends Record<string, any>> {
  private state: T;
  constructor(initValue: T) {
    this.state = initValue;
  }
  set = (data: T): void => {
    this.state = data;
  };
  merge = (data: Partial<T>): void => {
    this.state = Object.assign(this.state, data);
  };
  get() {
    return this.state;
  }
}
export const mainDomSet = new MainDomSet({ width: 0, height: 0 });
```

```js
// jest.setup.js
// mock mainDomSet getDomRect method
const { mainDomSet } = require("./mainDomSet");
class PointerEventMock extends Event {
  /**
   *
   * @param { string } type
   * @param { Record<string,string> } props
   */
  constructor(type, props) {
    super(type, props);
    for (const [key, value] of Object.entries(props)) {
      // @ts-ignore
      if (value !== undefined && this[key] === undefined) {
        // @ts-ignore
        this[key] = value;
      }
    }
  }
}

class LocalStorageMock {
  constructor() {
    /** @type Record<string,string> */
    this.store = {};
  }
  get length() {
    return Object.keys(this.store).length;
  }

  clear() {
    this.store = {};
  }
  /**
   *
   * @param { string } key
   * @returns
   */
  getItem(key) {
    return this.store[key] || null;
  }
  /**
   *
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    this.store[key] = value;
  }
  /**
   *
   * @param {string} key
   */
  removeItem(key) {
    delete this.store[key];
  }
  /**
   *
   * @param {number} index
   * @returns {string| null}
   */
  key(index) {
    const list = Object(this.store);
    if (list[index]) {
      return list[index];
    }
    return null;
  }
}
class ImageMock {
  src = "";
  width = 300;
  height = 300;
  /**
   *
   * @param {number | undefined} width
   * @param {number | undefined} height
   */
  constructor(width, height) {
    if (width !== undefined) {
      this.width = width;
    }
    if (height !== undefined) {
      this.height = height;
    }
    setTimeout(() => this.onload(), 0);
  }
  onload() {}
  onerror() {}
}

// fix: @testing-library/react 使用 fireEvent 触发点击事件没有透传 clientX, clientX, pageX, pageY等
global.PointerEvent = PointerEventMock;

// fix: ResizeObserver 没有定义
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// fix: Error: Not implemented: navigation (except hash changes)
delete global.location;
global.location = {
  reload: () => {},
};

// fix: mock localStorage
global.localStorage = new LocalStorageMock();

// fix: mock image.onload
global.Image = ImageMock;

// fix: mock 某个模块的方法
const spy = jest.spyOn(mainDomSet, "get");
spy.mockReturnValue({ width: 1300, height: 500 });

// fix: mock navigator.language
const languageGetter = jest.spyOn(global.navigator, "language", "get");
languageGetter.mockReturnValue("en");

// fix: mock 全局对象
Object.defineProperty(global, "queryLocalFonts", {
  writable: true,
  value: async () => {
    return [
      {
        fullName: "serif",
        family: "serif",
        postscriptName: "serif",
        style: "",
      },
      {
        fullName: "Times New Roman",
        family: "Times New Roman",
        postscriptName: "Times New Roman",
        style: "",
      },
    ];
  },
});
```
