# introduction

## 1

介绍 JavaScript 的起源：从哪里来，如何发展，以及现今的状况。这一章会谈到 JavaScript
与 ECMAScript 的关系、DOM、BOM，以及 Ecma 和 W3C 相关的标准。
js不是一门真正有内聚力的语言，模块内的元素关联性比较弱，代码组织比较松散。

BOM 和 DOM

1. **BOM（Browser Object Model）：** BOM 是浏览器对象模型的缩写。它提供了与浏览器交互的对象和方法，但与网页内容无关。BOM 主要包含了一些用于控制浏览器窗口、处理用户输入、导航等的对象，例如 `window` 对象、`navigator` 对象、`location` 对象等。

2. **DOM（Document Object Model）：** DOM 是文档对象模型的缩写。它是一种表示和操作文档结构的方式，使得 JavaScript 能够动态地访问和修改网页的内容、结构和样式。DOM 将文档中的元素组织成一个树状结构，每个节点都是文档中的一个元素、属性或文本。通过 DOM，JavaScript 可以对网页进行动态修改和交互。
总结：BOM 主要涉及浏览器窗口和浏览器本身的一些属性和方法，而 DOM 则关注网页的结构和内容的操作。

dom是一种api，分成节点。解析head是一支。解析body是一支
