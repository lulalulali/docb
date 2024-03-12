# 基本引用类型

 理解对象
 基本 JavaScript 数据类型
 原始值与原始值包装类型

讨论 JavaScript 所有内置的引用类型，如 Date、Regexp、原始类型及其包装类型。每种引用类型既有理论上的讲解，也有相关浏览器实现的剖析

构造函数就是用来创建新对象的函数，``let now = new Date();``Date这里就是构造函数，负责创建一个只有默认属性和方法的简单对象。ecmascript提供了很多像Date这样的原生引用类型，帮开发者实现任务。

函数也是一种引用类型，内容很多放在10章讲。

## Date

date类型将日期自动保存为UTC，Universal Time Coordinated格式，即自1970110000经过的毫秒数。使用这种，Date可以精确表示1970110000之前之后285616年的日期。为什么是285616年？？？

两个辅助方法：Date.parse()和 Date.UTC()。返回的是该日期的毫秒数。

```js
let someDate = new Date(Date.parse("May 23, 2019")); 
//上下两句等价
let someDate = new Date("May 23, 2019"); 
```

```js
// GMT 时间 2000 年 1 月    （1 日零点）默认是0
let y2k = new Date(Date.UTC(2000, 0)); 
// GMT 时间 2005 年 5 月 5 日下午 5 点 55 分 55 秒
let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55)); 
//上下同
// 本地时间 2000 年 1 月 1 日零点
let y2k = new Date(2000, 0); 
// 本地时间 2005 年 5 月 5 日下午 5 点 55 分 55 秒
let allFives = new Date(2005, 4, 5, 17, 55, 55);
```

### 继承的方法

Date类型重写了toLocaleString()、toString()和 valueOf()方法，分别返回与浏览器运行的本地环境一致的日期和时间、带时区信息的日期时间、

因Date的valueof不返回字符串，而是毫秒表示，所以能比大小。如下。也是确保日期先后的简单方式

```js
toLocaleString() - 2/1/2019 12:00:00 AM 
toString() - Thu Feb 1 2019 00:00:00 GMT-0800 (Pacific Standard Time)

let date1 = new Date(2019, 0, 1); // 2019 年 1 月 1 日
let date2 = new Date(2019, 1, 1); // 2019 年 2 月 1 日
console.log(date1 < date2); // true 
console.log(date1 > date2); // false 
```

### 日期格式化方法

 toDateString()显示日期中的周几、月、日、年（格式特定于实现）；

 toTimeString()显示日期中的时、分、秒和时区（格式特定于实现）；

 toLocaleDateString()显示日期中的周几、月、日、年（格式特定于实现和地区）；

 toLocaleTimeString()显示日期中的时、分、秒（格式特定于实现和地区）；

 toUTCString()显示完整的 UTC 日期（格式特定于实现）。
用这个不用toGMTstring（）

### 日期/时间组件方法

![date1](./date1.png)
![date2](./date2.png)

## RegExp

## 正则RegExp

Regular Expression

`RegExp`（正则表达式）是一种强大的文本模式匹配工具，用于在字符串中查找、匹配和操作特定模式的文本。正则表达式由一系列字符组成，形成一个搜索模式。它可以用于验证字符串的格式、搜索和替换特定文本，以及执行其他字符串处理操作。
`RegExp` 对象则是JavaScript中与正则表达式相关的对象。通过`RegExp`对象，你可以创建和操作正则表达式。`RegExp`对象有两种创建方式：

1. 字面量创建： 使用正斜杠`/`将正则表达式包裹起来，例如：`/pattern/`。

   ```javascript
   var pattern = /abc/;
   ```

2. 构造函数创建： 使用`RegExp`构造函数，传递一个字符串作为正则表达式的模式。

   ```javascript
   var pattern = new RegExp("abc");
   ```

比喻：想象你正在寻找一本书中的特定内容，而这本书是一本巨大的百科全书。正则表达式就像是你要查找的关键字，而`RegExp`对象就像是你用来查找的放大镜。

- 正则表达式（关键字）：比如你要查找书中所有包含关键字“JavaScript”的段落，这个关键字就是你的正则表达式。
- RegExp对象（放大镜）：`RegExp`对象就是你使用的工具，它帮助你在整本书中定位和匹配所有包含“JavaScript”关键字的部分。你可以使用不同的模式和选项，就像调整放大镜的焦距一样，以精准地找到你需要的内容。
总体而言，正则表达式和`RegExp`对象提供了一种强大的方式来处理字符串，就像你用放大镜在文本中查找特定内容一样。


```js
```
```js
```
```js
```
```js
```
```js
```
```js
```