# module

## common knowledge

variables, functions, classes, objects或其它助力完成任务的代码

模块是打包的代码块，灵活使用，在多个项目中共享，重复使用。

## fs

是用来处理文件操作的模块，可读文件、可写、可与其他文件目录互动，是file system的缩写。为开发者提供了Node.js对文件系统进行操作的能力

```javascript
// 引入 fs 模块
const fs = require('fs');
// 读取文件内容
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件时发生错误：', err);
    return;
  }
  console.log('文件内容：', data);
});
```

用fs中的readfile方法，读这个叫example.txt的文件，使用utf8，读取完毕执行，后的函数，是个回调函数，err是错误信息，data是文件的内容

在 `package.json` 文件中，`engines` 字段用于指定你的项目所依赖的 Node.js 版本范围。这可以确保你的项目在特定版本的 Node.js 下能够正常运行。

## engine

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Node.js project",
  "engines": {
    "node": ">=10.0.0"
  },
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

以上是engine字段，>=10表示只有10及以上的版本才可以装engines。简言之，engine就是系统性要求或兼容性说明。有助于项目的稳定性，因为nodejs版本在变化。你engine里面的东西还能在别的环境中跑吗?

## marked

是专门用来将md转换成html的npm包，即你不在需要在用html展示的时候再添加html的一些语法标签，相当于翻译。核心是marked函数。

```bash
npm install marked
```

```javascript
// 引入 marked 模块
const marked = require('marked');
// 要转换的 Markdown 文本
const markdownText = '# Hello, Markdown!';
// 使用 marked 将 Markdown 转换为 HTML
const htmlText = marked(markdownText);
// 打印转换后的 HTML
console.log(htmlText);
```

第一步是install,第二步是在js中使用：引入marked；转换md.

## path

用于处理文件路径、构建、解析路径。在不同操作系统上 。后缀basename是文件名、dirname是文件目录（即上级目录）、parse是解析路径join是新路径  以上4个只有join是跟两个对象，前三个是跟单个路径的对象

```javascript
// 引入 path 模块
const path = require('path');
// 示例路径
const filePath = '/home/user/documents/example.txt';
// 获取文件名
const fileName = path.basename(filePath);
console.log('文件名:', fileName);
// 获取文件所在目录
const directory = path.dirname(filePath);
console.log('文件所在目录:', directory);
// 构建新的路径
const newPath = path.join(directory, 'newFile.txt');
console.log('新路径:', newPath);
// 解析路径
const parsedPath = path.parse(filePath);
console.log('解析路径:', parsedPath);
```

这个例子中，`path` 模块的 `basename` 方法用于获取文件名，`dirname` 方法用于获取文件所在目录，`join` 方法用于构建新的路径，`parse` 方法用于解析路径。

## app

app常指使用express的程序，它是express的核心对象，有了它，定义路由、中间件、处理http请求。假如express像服务员，app就像服务员的操作手册

```bash
npm install express
```

```javascript
// 引入Express模块
const express = require('express');
// 创建Express应用程序对象
const app = express();
// 定义一个简单的路由
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## escape-html

没有escapehtml模块，但是有escape-html模块。增加安全性提高。

```bash
npm install escape-html
```

```javascript
// 引入 escape-html 模块
const escapeHtml = require('escape-html');
// 要转义的字符串
const userInput = '<script>alert("XSS attack!");</script>';
// 使用 escapeHtml 函数转义字符串
const escapedHtml = escapeHtml(userInput);
// 输出转义后的结果
console.log(escapedHtml);
```

在这个例子中，`escape-html` 模块将用户输入的字符串 `<script>alert("XSS attack!");</script>` 转义为 `&lt;script&gt;alert("XSS attack!");&lt;/script&gt;`，这样就防止了该字符串被解释为实际的 HTML 代码，从而防止了潜在的 XSS 攻击。
比方说，这就好比在展示用户评论时，将用户输入的文本进行转义，以确保用户输入的内容不会执行任何恶意的 JavaScript 代码，从而提高应用程序的安全性。
