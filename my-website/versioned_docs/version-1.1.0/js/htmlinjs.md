# html in js

了解 JavaScript 如何与 HTML 结合来创建动态网页，主要介绍在网页中嵌入 JavaScript 的不同方式，还有 JavaScript 的内容类型及其与script>元素的关系。

使用script>元素 行内脚本和外部脚本的比较 文档模式对js的影响 确保js不可用时的用户体验

## script> 元素

使用script元素是将js插入html的主要方法，有8个属性。

async仅对外部脚本有效。？表示立即下载脚本，但不能阻止其它页面动作

charset用src指定的代码字符集。？很少用的属性

crossorigin是配置相关请求的cors（跨源资源共享？）设置。默认不用。它=anoymous表示不必设凭据标识；它=ues-credentials表示设置，即出站请求会包含凭据

defer推迟，表示文档完全被解析和显示后再执行。仅对外部脚本有效。？

integrity允许验证子资源的完整性，通过对比到的资源和指定的加密签名。不匹配就报错，脚本不执行。此属性可以确保cdn（connect delivery network）不会提供恶意内容

src表示要执行的代码的外部文件

type表示代码中脚本语言的类型，即mime类型。

使用script的两方式：通过scri直接在网页嵌入js代码；通过scri在网页中包含 外部的js文件。script>中的代码被计算完之前页面其他内容不会被加载、不会被显示。

``</script>``不能在真正结束之前出现，解决办法使用转义字符\，即``<\/script>``

假如你的文件不`打算使用.js的扩展名，一定确保服务器能返回正确的mime类型。

用了src就script>中别整其它代码了，整了也会被无视。

src可以链接外部域的.js文件

script>在未使用defer和async属性的情况下按序解释

### 标签位置

head>里面塞满了，会阻塞，如何解决?放在body>里面，利于加载速度

### 推迟执行脚本defer

``<script defer src="example1.js"></script>``意思就是推迟执行，但defer只对外部脚本文件有效。何为外部？不在本文件的？

### 异步执行脚本

两个src都异步了，他俩没有先后顺序。所以异步脚本不应在加载期间修改dom

### 动态加载脚本

与``<script>``不同的加载脚本方式。是默认异步的，可以加入语句使同步

```js
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
script.async = false; 
document.head.appendChild(script); 
```

先声明，使得不会扰乱优先级

```js
<link rel="preload" href="gibberish.js">  
```

### xhtml中的变化

Extensible HyperText Markup Language，包装的html.它已经退出历史舞台,少有遗留.在xhtml中使用js必须指定type属性且值为text/javascript. ? ``<``会被它认为是标签的开始，假如你想要的小于号，你得换成&lt；还有种方法是将代码都包进CDATA块中，但仅对兼容xhtml的浏览器行得通。把cdta括号的注释掉，是一种好方法。

### 废弃的语法

在``<script>``中加入html注释，这样不支持的就不会去原文呈现，而能识别的依然不影响。

## 2.行内代码与外部文件

js放在外部的好处：更容易维护、缓存（即共用的js只需一次下载）、没有上面的注释规避的担忧

## 3.文档模式

混杂模式、标准模式。标准模式具有使ie有兼容标准的行为。两主要区别在于css渲染方面，对js有些关联影响，这些影响会经常出现！

## 4.元素``<noscript>``

什么时候起作用/里面的内容被渲染？浏览器不支持脚本/关闭脚本支持。在``<body>``中出现包html元素

```js
<body> 
 <noscript> 
 <p>This page requires a JavaScript-enabled browser.</p> 
 </noscript> 
 </body> 
```

## 小结

 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。

 所有``<script>``元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在``<script>``元素中的代码必须严格按次序解释。

 对不推迟执行的脚本，浏览器必须解释完位于``<script>``元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把``<script>``元素放到页面末尾，介于主内容之后及``</body>``标签
之前。

 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。

 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。

 通过使用``<noscript>``元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则``<noscript>``元素中的任何内容都不会被渲染。
