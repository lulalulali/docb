# Network Requests and Remote Resources

网络请求与远程资源

探讨浏览器请求数据和资源的常用方式，包括早期的 XMLHttpRequest 和现代的 Fetch API。

 使用 XMLHttpRequest 对象   Using the XMLHttpRequest object
 处理 XMLHttpRequest 事件   Working with XMLHttpRequest events
 源域 Ajax 限制             Cross-domain Ajax restrictions
 Fetch API  
 Streams API  

2005 年，Jesse James Garrett 撰写了一篇文章，“Ajax—A New Approach to Web Applications”。这篇文章中描绘了一个被他称作 Ajax（Asynchronous JavaScript+XML，即异步 JavaScript 加 XML）的技术。
这个技术涉及发送服务器请求额外数据而不刷新页面，从而实现更好的用户体验The technique consisted of making server requests for additional data without unloading the web page, resulting in a better user experience.。Garrett 解释了这个技术怎样改变自 Web 诞生以来就一直延续的传统单击等待的模式Garrett explained how this technique could be used to change the traditional click-and-wait paradigm that the web had been stuck in since its inception.。

把 Ajax 推到历史舞台上的关键技术是 XMLHttpRequest（XHR）对象。这个对象最早由微软发明，然后被其他浏览器所借鉴。在 XHR 出现之前，Ajax 风格的通信必须通过一些黑科技实现，主要是使用隐藏的窗格或内嵌窗格。XHR 为发送服务器请求和获取响应提供了合理的接口。这个接口可以实现异步从服务器获取额外数据，意味着用户点击不用页面刷新也可以获取数据。通过 XHR 对象获取数据后，可以使用 DOM 方法把数据插入网页。虽然 Ajax 这个名称中包含 XML，但实际上 Ajax 通信与数据格式无关。这个技术主要是可以实现在不刷新页面的情况下从服务器获取数据，格式并不一定是 XML。
实际上，Garrett 所称的这种 Ajax 技术已经出现很长时间了。在 Garrett 那篇文章之前，一般称这种技术为远程脚本。这种浏览器与服务器的通信早在 1998 年就通过不同方式实现了。最初，JavaScript 对服务器的请求可以通过中介（如 Java 小程序或 Flash 影片）来发送。后来 XHR 对象又为开发者提供了原生的浏览器通信能力，减少了实现这个目的的工作量。
XHR 对象的 API 被普遍认为比较难用，而 Fetch API 自从诞生以后就迅速成为了 XHR 更现代的替代标准。Fetch API 支持期约（promise）和服务线程（service worker），已经成为极其强大的 Web 开发工具。
注意:本章会全面介绍 XMLHttpRequest，但它实际上是过时 Web 规范的产物，应该只在旧版本浏览器中使用。实际开发中，应该尽可能使用 fetch()。

In 2005, Jesse James Garrett penned an online article titled “Ajax: A New Approach to Web Applications”. This article outlined a technique that he referred to as Ajax, short for Asynchronous JavaScript+XML.  
The technique consisted of making server requests for additional data without unloading the web page, resulting in a better user experience. Garrett explained how this technique could be used to change the traditional click-and-wait paradigm that the web had been stuck in since its inception.
The key technology pushing Ajax forward was !!!the XMLHttpRequest (XHR) object!!!, first invented by Microsoft and then duplicated by other browser vendors. Prior to the introduction of XHR, Ajax-style communication had to be accomplished through a number of hacks, mostly using hidden frames or iframes. XHR introduced a streamlined interface for making server requests and evaluating the responses. This allowed for asynchronous retrieval of additional information from the server, meaning that a user click didn’t have to refresh the page to retrieve more data. Instead, an XHR object could be used to retrieve the data and then the data could be inserted into the page using the DOM. And despite the mention of XML in the name, Ajax communication is format-agnostic; the technique is about retrieving data from the server without refreshing a page, not necessarily about XML.

The technique that Garrett referred to as Ajax had, in fact, been around for some time. Typically called !!!remote scripting!!! prior to Garrett’s article, such browser-server communication has been possible since 1998 using different techniques. Early on, server requests could be made from JavaScript through an intermediary, such as a Java applet or Flash movie. The XHR object brought native browser communication capabilities to developers, reducing the amount of work necessary to achieve the result.

The XHR object’s API is widely regarded as difficult to use, and, in the time since its introduction, the Fetch API has blossomed as a modernized replacement for XHR. Its support for promises and service workers has made it an incredibly powerful web development tool..

## XMLHttpRequest 对象

```js
//IE5 是第一个引入 XHR 对象的浏览器。这个对象是通过 ActiveX 对象实现并包含在 MSXML 库中的。为此，XHR 对象的 3 个版本在浏览器中分别被暴露为 MSXML2.XMLHttp、MSXML2.XMLHttp.3.0和 MXSML2.XMLHttp.6.0。
// 所有现代浏览器都通过 XMLHttpRequest 构造函数原生支持 XHR 对象：
let xhr = new XMLHttpRequest(); 
```

### 使用XHR

```js
//使用 XHR 对象首先要调用 open()方法，这个方法接收 3 个参数：请求类型（"get"、"post"等）、请求的 URL，以及表示请求是否异步的布尔值。false：一个布尔值，指定请求是同步的。如果为 false，表示同步请求，浏览器会在请求完成之前阻塞。下面是一个例子：
xhr.open("get", "example.php", false); 
//阻塞行为：当 async 参数（第三个参数）为 false 时，表示请求是同步的。浏览器在发送请求和接收响应时会阻塞，用户无法进行其他操作，直到请求完成。这通常会导致较差的用户体验，因此同步请求在现代 Web 开发中不推荐使用。
// 这行代码就可以向 example.php 发送一个同步的 GET 请求。关于这行代码需要说明几点。首先，这里的 URL 是相对于代码所在页面的，当然也可以使用绝对 URL。其次，调用 open()不会实际发送请求，只是为发送请求做好准备。

// 注意:只能访问同源 URL，也就是域名相同、端口相同、协议相同。如果请求的 URL 与发送请求的页面在任何方面有所不同，则会抛出安全错误。

// 要发送定义好的请求，必须像下面这样调用 send()方法：
xhr.open("get", "example.txt", false); 
xhr.send(null); //xhr.send 方法发送请求到服务器。对于 GET 请求，send 方法的参数通常是 null 或省略（undefined）。

// send()方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传 null，因为这个参数在某些浏览器中是必需的。调用 send()之后，请求就会发送到服务器。
// 因为这个请求是同步的，所以 JavaScript 代码会等待服务器响应之后再继续执行。收到响应后，XHR对象的以下属性会被填充上数据。
//  responseText：作为响应体返回的文本。 
//  responseXML：如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的 XML DOM 文档。 
//  status：响应的 HTTP 状态。 
//  statusText：响应的 HTTP 状态描述。
// 收到响应后，第一步要检查 status 属性以确保响应成功返回。一般来说，HTTP 状态码为 2xx 表示成功。此时，responseText 或 responseXML（如果内容类型正确）属性中会有内容。如果 HTTP状态码是 304，则表示资源未修改过，是从浏览器缓存中直接拿取的。当然这也意味着响应有效。为确保收到正确的响应，应该检查这些状态，如下所示：
xhr.open("get", "example.txt", false); 
xhr.send(null); 
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
} else { 
 alert("Request was unsuccessful: " + xhr.status); 
} 
// 以上代码可能显示服务器返回的内容，也可能显示错误消息，取决于 HTTP 响应的状态码。为确定下一步该执行什么操作，最好检查 status 而不是 statusText 属性，因为后者已经被证明在跨浏览器的情况下不可靠。无论是什么响应内容类型，responseText 属性始终会保存响应体，而 responseXML则对于非 XML 数据是 null。
// 虽然可以像前面的例子一样发送同步请求，但多数情况下最好使用异步请求，这样可以不阻塞JavaScript 代码继续执行。XHR 对象有一个 readyState 属性，表示当前处在请求/响应过程的哪个阶段。
// 这个属性有如下可能的值。
//  0：未初始化（Uninitialized）。尚未调用 open()方法。
//  1：已打开（Open）。已调用 open()方法，尚未调用 send()方法。
//  2：已发送（Sent）。已调用 send()方法，尚未收到响应。
//  3：接收中（Receiving）。已经收到部分响应。
//  4：完成（Complete）。已经收到所有响应，可以使用了。
// 每次 readyState 从一个值变成另一个值，都会触发 readystatechange 事件。可以借此机会检查 readyState 的值。一般来说，我们唯一关心的 readyState 值是 4，表示数据已就绪。为保证跨浏览器兼容，onreadystatechange 事件处理程序应该在调用 open()之前赋值。来看下面的例子：
let xhr = new XMLHttpRequest(); //创建一个新的 XMLHttpRequest 对象，用于发送 HTTP 请求。
xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } 
 //设置 onreadystatechange 事件处理程序，当 XMLHttpRequest 对象的 readyState 属性改变时，会调用这个函数。检查 readyState 是否为 4，表示请求已完成。检查 status 是否在 200 到 299 之间，或者是否等于 304，表示请求成功。如果成功，使用 alert 显示响应文本 xhr.responseText。如果不成功，显示错误信息和状态码。
}; 

xhr.open("get", "example.txt", true); //使用 GET 方法初始化一个指向 example.txt 的异步请求。第三个参数 true 指定请求是异步的(异步请求不会阻塞浏览器的主线程，用户在请求期间仍然可以进行其他操作，改善用户体验。)。    使用 send 方法发送请求到服务器。对于 GET 请求，send 方法的参数是 null 或省略（undefined）。
xhr.send(null); 
// 以上代码使用 DOM Level 0 风格为 XHR 对象添加了事件处理程序，因为并不是所有浏览器都支持DOM Level 2 风格。与其他事件处理程序不同，onreadystatechange 事件处理程序不会收到 event对象。在事件处理程序中，必须使用 XHR 对象本身来确定接下来该做什么。

// 注意:由于 onreadystatechange 事件处理程序的作用域问题，这个例子在 onreadystatechange 事件处理程序中使用了 xhr 对象而不是 this 对象。使用 this 可能导致功能失败或导致错误，取决于用户使用的是什么浏览器。因此还是使用保存 XHR 对象的变量更保险一些。

// 在收到响应之前如果想取消异步请求，可以调用 abort()方法：
xhr.abort(); 
//示例,接上面
// 设置一个定时器，在 2 秒后取消请求
//   setTimeout(function() {
// 取消请求
//   xhr.abort();
// 显示取消请求的信息
//   alert("Request was aborted");
// }, 2000);
// 调用这个方法后，XHR 对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。中断请求后，应该取消对 XHR 对象的引用。由于内存问题，不推荐重用 XHR 对象.
```

### HTTP头部

```js
//HTTP Headers
//每个 HTTP 请求和响应都会携带一些头部字段，这些字段可能对开发者有用。XHR 对象会通过一些方法暴露与请求和响应相关的头部字段。
// 默认情况下，XHR 请求会发送以下头部字段。
//  Accept：浏览器可以处理的内容类型。
//  Accept-Charset：浏览器可以显示的字符集。
//  Accept-Encoding：浏览器可以处理的压缩编码类型。
//  Accept-Language：浏览器使用的语言。
//  Connection：浏览器与服务器的连接类型。
//  Cookie：页面中设置的 Cookie。
//  Host：发送请求的页面所在的域。
//  Referer：发送请求的页面的 URI。注意，这个字段在 HTTP 规范中就拼错了，所以考虑到兼容性也必须将错就错。（正确的拼写应该是 Referrer。）
//  User-Agent：浏览器的用户代理字符串。
// 虽然不同浏览器发送的确切头部字段可能各不相同，但这些通常都是会发送的。如果需要发送额外的请求头部，可以使用 setRequestHeader()方法。这个方法接收两个参数：头部字段的名称和值。
// 为保证请求头部被发送，必须在 open()之后、send()之前调用 setRequestHeader()，如下面的例子所示：
let xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } 
}; 
xhr.open("get", "example.php", true); 
xhr.setRequestHeader("MyHeader", "MyValue"); //两个参数：头部字段的名称和值.   整句的位置在open之后在send前.
xhr.send(null); 
// 服务器通过读取自定义头部可以确定适当的操作。自定义头部一定要区别于浏览器正常发送的头部，否则可能影响服务器正常响应。有些浏览器允许重写默认头部，有些浏览器则不允许。

// 可以使用 getResponseHeader()方法从 XHR 对象获取响应头部，只要传入要获取头部的名称即可。如果想取得所有响应头部，可以使用 getAllResponseHeaders()方法，这个方法会返回包含所有响应头部的字符串。下面是调用这两个方法的例子：
let myHeader = xhr.getResponseHeader("MyHeader"); 
let allHeaders xhr.getAllResponseHeaders(); 
// 服务器可以使用头部向浏览器传递额外的结构化数据。getAllResponseHeaders()方法通常返回类似如下的字符串：
Date: Sun, 14 Nov 2004 18:04:03 GMT 
Server: Apache/1.3.29 (Unix) 
Vary: Accept 
X-Powered-By: PHP/4.3.8 
Connection: close 
Content-Type: text/html; charset=iso-8859-1 
// 通过解析以上头部字段的输出，就可以知道服务器发送的所有头部，而不需要单独去检查了。
```

### GET请求  GET Requests

```js
//最常用的请求方法是 GET 请求，用于向服务器查询某些信息。必要时，需要在 GET 请求的 URL后面添加查询字符串参数。对 XHR 而言，查询字符串必须正确编码后添加到 URL 后面，然后再传给open()方法。
// 发送 GET 请求最常见的一个错误是查询字符串格式不对。查询字符串中的每个名和值都必须使用encodeURIComponent()编码，所有名/值对必须以和号（&）分隔，如下面的例子所示：
xhr.open("get", "example.php?name1=value1&name2=value2", true); 
// 可以使用以下函数将查询字符串参数添加到现有的 URL 末尾：
function addURLParam(url, name, value) { 
    //url：要添加参数的基本 URL。name：要添加的查询参数的名称。value：要添加的查询参数的值。
 url += (url.indexOf("?") == -1 ? "?" : "&"); 
   //使用 indexOf("?") 检查 URL 中是否已经包含查询字符串（即是否包含问号 ?）。如果不包含问号 ?（即 indexOf("?") 返回 -1），则在 URL 末尾添加一个问号 ?。如果包含问号 ?，则在 URL 末尾添加一个与号 &。
 url += encodeURIComponent(name) + "=" + encodeURIComponent(value);//使用 encodeURIComponent 函数对参数名称和参数值进行编码，以确保它们在 URL 中是安全的。    将编码后的参数名称和参数值以 = 连接，添加到 URL 的末尾。 
 return url; 
} 
//就是针对域名后面的内容的操作
// 这里定义了一个 addURLParam()函数，它接收 3 个参数：要添加查询字符串的 URL、查询参数和参数值。首先，这个函数会检查 URL 中是否已经包含问号（以确定是否已经存在其他参数）。如果没有，则加上一个问号；否则就加上一个和号。然后，分别对参数名和参数值进行编码，并添加到 URL 末尾。
// 最后一步是返回更新后的 URL。

// 可以使用以上这个函数构建请求 URL，如下面的例子所示：
let url = "example.php"; 
// 添加参数
url = addURLParam(url, "name", "Nicholas"); 
url = addURLParam(url, "book", "Professional JavaScript"); 
// 初始化请求
xhr.open("get", url, false); 
// 这里使用 addURLParam()函数可以保证通过 XHR 发送请求的 URL 格式正确。
```

### POST请求

```js
//post即上递内容
//第二个最常用的请求是 POST 请求，用于向服务器发送应该保存的数据。每个 POST 请求都应该在请求体中携带提交的数据，而 GET 请求则不然。POST 请求的请求体可以包含非常多的数据，而且数据可以是任意格式。要初始化 POST 请求，open()方法的第一个参数要传"post"，比如：
xhr.open("post", "example.php", true); 
// 接下来就是要给 send()方法传入要发送的数据。因为 XHR 最初主要设计用于发送 XML，所以可以传入序列化之后的 XML DOM 文档作为请求体。当然，也可以传入任意字符串。

// 默认情况下，对服务器而言，POST 请求与提交表单是不一样的。服务器逻辑需要读取原始 POST数据才能取得浏览器发送的数据。不过，可以使用 XHR 模拟表单提交。为此，第一步需要把 ContentType 头部设置为"application/x-www-formurlencoded"，这是提交表单时使用的内容类型。第二步是创建对应格式的字符串。POST 数据此时使用与查询字符串相同的格式。如果网页中确实有一个表单需要序列化并通过 XHR 发送到服务器，则可以使用第 14 章的 serialize()函数来创建相应的字符串，如下所示：
function submitData() { 
 let xhr = new XMLHttpRequest(); 
 xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } 
 }; 
 xhr.open("post", "postexample.php", true); 
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //使用 setRequestHeader 方法设置请求头，指定内容类型为 application/x-www-form-urlencoded。
 let form = document.getElementById("user-info"); //获取 ID 为 user-info 的表单元素。
 xhr.send(serialize(form));//使用自定义的 serialize 函数将表单数据序列化，并使用 send 方法发送请求。
} 
// 在这个函数中，来自 ID 为"user-info"的表单中的数据被序列化之后发送给了服务器。PHP 文件postexample.php 随后可以通过$_POST 取得 POST 的数据。比如：
<?php 
 header("Content-Type: text/plain"); 
 echo <<<EOF 
Name: {$_POST['user-name']} 
Email: {$_POST['user-email']} 
EOF; 
?> 
// 假如没有发送 Content-Type 头部，PHP 的全局$_POST 变量中就不会包含数据，而需要通过$HTTP_RAW_POST_DATA 来获取。
// 注意:POST 请求相比 GET 请求要占用更多资源。从性能方面说，发送相同数量的数据，GET 请求比 POST 请求要快两倍。

//以下是一个完整的示例，包含 submitData 和 serialize 函数(分别用于序列化表单数据和发送异步请求)，以及一个示例表单：
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Form Submission Example</title>
//   <script>
//     function serialize(form) {
//       let parts = [];
//       for (let i = 0; i < form.elements.length; i++) {
//         let field = form.elements[i];
//         if (field.name && !field.disabled && field.type !== "file" && field.type !== "submit" && field.type !== "reset" && field.type !== "button") {
//           if (field.type === "select-multiple") {
//             for (let j = 0; j < field.options.length; j++) {
//               if (field.options[j].selected) {
//                 parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value));
//               }
//             }
//           } else if ((field.type !== "checkbox" && field.type !== "radio") || field.checked) {
//             parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
//           }
//         }
//       }
//       return parts.join("&");
//     }

//     function submitData() {
//       let xhr = new XMLHttpRequest();
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//           if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             alert(xhr.responseText);
//           } else {
//             alert("Request was unsuccessful: " + xhr.status);
//           }
//         }
//       };
//       xhr.open("post", "postexample.php", true);
//       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//       let form = document.getElementById("user-info");
//       xhr.send(serialize(form));
//     }
//   </script>
// </head>
// <body>
//   <form id="user-info">
//     <label for="name">Name:</label>
//     <input type="text" id="name" name="name"><br>
//     <label for="email">Email:</label>
//     <input type="email" id="email" name="email"><br>
//     <button type="button" onclick="submitData()">Submit</button>
//   </form>
// </body>
// </html>

```

### XMLHttpRequest Level 2

XHR 对象作为事实标准的迅速流行，也促使 W3C 为规范这一行为而制定了正式标准。
XMLHttpRequest Level 1 只是把已经存在的 XHR 对象的实现细节明确了一下。XMLHttpRequest Level 2又进一步发展了 XHR 对象。并非所有浏览器都实现了 XMLHttpRequest Level 2 的所有部分，但所有浏览器都实现了其中部分功能。

#### FormData 类型

```js
//现代 Web 应用程序中经常需要对表单数据进行序列化，因此 XMLHttpRequest Level 2 新增了FormData 类型。FormData 类型便于表单序列化，也便于创建与表单类似格式的数据然后通过 XHR发送。下面的代码创建了一个 FormData 对象，并填充了一些数据：
let data = new FormData(); 
data.append("name", "Nicholas"); 
// append()方法接收两个参数：键和值，相当于表单字段名称和该字段的值。可以像这样添加任意多个键/值对数据。此外，通过直接给 FormData 构造函数传入一个表单元素，也可以将表单中的数据作为键/值对填充进去：
let data = new FormData(document.forms[0]); 

// 有了 FormData 实例，可以像下面这样直接传给 XHR 对象的 send()方法：
let xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } 
}; 
xhr.open("post", "postexample.php", true); 

let form = document.getElementById("user-info"); //获取 ID 为 user-info 的表单元素。
xhr.send(new FormData(form)); //使用 FormData 构造函数创建一个新的 FormData 对象，传入表单元素 form。FormData 对象会自动从表单中提取数据，并将其格式化为适合发送的格式。使用 send 方法发送 FormData 对象到服务器。   就是说formdata是用来读表单后提数据的.

// 使用 FormData 的另一个方便之处是不再需要给 XHR 对象显式设置任何请求头部了。XHR 对象能够识别作为 FormData 实例传入的数据类型并自动配置相应的头部。
```

#### 超时

```js
//Timeouts
//IE8 给 XHR 对象增加了一个 timeout 属性，用于表示发送请求后等待多少毫秒，如果响应不成功就中断请求。之后所有浏览器都在自己的 XHR 实现中增加了这个属性。在给 timeout 属性设置了一个时间且在该时间过后没有收到响应时，XHR 对象就会触发 timeout 事件，调用 ontimeout 事件处理程序。这个特性后来也被添加到了 XMLHttpRequest Level 2 规范。下面看一个例子：
let xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 try { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } catch (ex) { 
 // 假设由 ontimeout 处理
 } 
 } 
}; 
xhr.open("get", "timeout.php", true); 
xhr.timeout = 1000; // 设置超时时间为1000毫秒
xhr.ontimeout = function() { 
 alert("Request did not return in a second."); 
}; //当请求超时时调用的函数
xhr.send(null); 
// 这个例子演示了使用 timeout 设置超时。给 timeout 设置 1000 毫秒意味着，如果请求没有在 1秒钟内返回则会中断。此时则会触发 ontimeout 事件处理程序，readyState 仍然会变成 4，因此也会调用 onreadystatechange 事件处理程序。不过，如果在超时之后访问 status 属性则会发生错误。
// 为做好防护，可以把检查 status 属性的代码封装在 try/catch 语句中。

```

#### overrideMimeType()方法

```js
//Firefox 首先引入了 overrideMimeType()方法用于重写 XHR 响应的 MIME 类型。这个特性后来也被添加到了 XMLHttpRequest Level 2。因为响应返回的 MIME 类型决定了 XHR 对象如何处理响应，所以如果有办法覆盖服务器返回的类型，那么是有帮助的。
//假设服务器实际发送了 XML 数据，但响应头设置的 MIME 类型是 text/plain。结果就会导致虽然数据是 XML，但 responseXML 属性值是 null。此时调用 overrideMimeType()可以保证将响应当成 XML 而不是纯文本来处理：

let xhr = new XMLHttpRequest(); 
xhr.open("get", "text.php", true); 
xhr.overrideMimeType("text/xml"); //就是说拿xml覆盖\当成xml处理
xhr.send(null); 

// 这个例子强制让 XHR 把响应当成 XML 而不是纯文本来处理。为了正确覆盖响应的 MIME 类型，必须在调用 send()之前调用 overrideMimeType()。
```

## 进度事件

PROGRESS EVENTS
Progress Events 是 W3C 的工作草案，定义了客户端服务器端通信。这些事件最初只针对 XHR，现在也推广到了其他类似的 API。有以下 6 个进度相关的事件。
 loadstart：在接收到响应的第一个字节时触发。
   progress：在接收响应期间反复触发。
 error：在请求出错时触发。
 abort：在调用 abort()终止连接时触发。
   load：在成功接收完响应时触发。
 loadend：在通信完成时，且在 error、abort 或 load 之后触发。
每次请求都会首先触发 loadstart 事件，之后是一个或多个 progress 事件，接着是 error、abort或 load 中的一个，最后以 loadend 事件结束。
这些事件大部分都很好理解，但其中有两个需要说明一下。

### load事件

```js
//Firefox 最初在实现 XHR 的时候，曾致力于简化交互模式。最终，增加了一个 load 事件用于替代readystatechange 事件。load 事件在响应接收完成后立即触发，这样就不用检查 readyState 属性了。onload 事件处理程序会收到一个 event 对象，其 target 属性设置为 XHR 实例，在这个实例上可以访问所有 XHR 对象属性和方法。不过，并不是所有浏览器都实现了这个事件的 event 对象。考虑到跨浏览器兼容，还是需要像下面这样使用 XHR 对象变量：
let xhr = new XMLHttpRequest(); 
xhr.onload = function() { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
}; 
xhr.open("get", "altevents.php", true); 
xhr.send(null); 
// 只要是从服务器收到响应，无论状态码是什么，都会触发 load 事件。

// 就是说只要加载了\load了,都会触发load事件.
// 这意味着还需要检查 status属性才能确定数据是否有效。Firefox、Opera、Chrome 和 Safari 都支持 load 事件。
```

### progress 事件

```js
//Mozilla 在 XHR 对象上另一个创新是 progress 事件，在浏览器接收数据期间，这个事件会反复触发。每次触发时，onprogress 事件处理程序都会收到 event 对象，其 target 属性是 XHR 对象，且包含 3 个额外属性：lengthComputable、position 和 totalSize。其中，lengthComputable 是一个布尔值，表示进度信息是否可用；position 是接收到的字节数；totalSize 是响应的 ContentLength 头部定义的总字节数。有了这些信息，就可以给用户提供进度条了。以下代码演示了如何向用户展示进度：
let xhr = new XMLHttpRequest(); 
xhr.onload = function(event) { 
 if ((xhr.status >= 200 && xhr.status < 300) || 
 xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
}; 
xhr.onprogress = function(event) {
    //为 XMLHttpRequest 对象的 onprogress 事件设置了一个事件处理函数。当请求的进度发生变化时，这个函数会被调用，通常用于显示下载或上传的进度。 
 let divStatus = document.getElementById("status"); 
 //获取了页面中 id 为 status 的 div 元素，并将其赋值给变量 divStatus。这个元素将用于显示进度信息。
 if (event.lengthComputable) { 
 divStatus.innerHTML = "Received " + event.position + " of " + 
 event.totalSize + 
" bytes"; //检查 progress 事件的 lengthComputable 属性。如果为 true，表示可以计算加载的总字节数和已加载的字节数。  在 divStatus 元素中显示下载进度信息。event.position 表示已经加载的字节数，event.totalSize 表示总共需要加载的字节数。event.loaded 表示已经加载的字节数，event.total 表示总共需要加载的字节数。这段代码将这些信息组合成字符串，并将其设置为 divStatus 元素的内容。
//这个事件会在请求的进度发生变化时触发，通常用于显示下载进度。   当请求正在进行时，这个函数会被调用。 如果进度事件包含可计算的长度信息，更新进度显示元素的内容。   例如，如果已经下载了 500 字节，总共需要下载 1000 字节，那么会在页面上显示 "Received 500 of 1000 bytes"。
//divStatus.innerHTML = "Received " + event.loaded + " of " + event.total + " bytes";   同理

 } 
}; 

xhr.open("get", "altevents.php", true); 
xhr.send(null); 
// 为了保证正确执行，必须在调用 open()之前添加 onprogress 事件处理程序。在前面的例子中，每次触发 progress 事件都会更新 HTML 元素中的信息。假设响应有 Content-Length 头部，就可以利用这些信息计算出已经收到响应的百分比。
```

## 跨源资源分享

```js
//CROSS-ORIGIN RESOURCE SHARING
//通过 XHR 进行 Ajax 通信的一个主要限制是跨源安全策略。默认情况下，XHR 只能访问与发起请求的页面在同一个域内的资源。这个安全限制可以防止某些恶意行为。不过，浏览器也需要支持合法跨源访问的能力。
// 跨源资源共享（CORS，Cross-Origin Resource Sharing）定义了浏览器与服务器如何实现跨源通信。
// CORS 背后的基本思路就是使用自定义的 HTTP 头部允许浏览器和服务器相互了解，以确实请求或响应应该成功还是失败。
// 对于简单的请求，比如 GET 或 POST 请求，没有自定义头部，而且请求体是 text/plain 类型，这样的请求在发送时会有一个额外的头部叫 Origin。Origin 头部包含发送请求的页面的源（协议、域名和端口），以便服务器确定是否为其提供响应。下面是 Origin 头部的一个示例：
// Origin: http://www.nczonline.net 
// 如果服务器决定响应请求，那么应该发送 Access-Control-Allow-Origin 头部，包含相同的源；
// 或者如果资源是公开的，那么就包含"*"。比如：
// Access-Control-Allow-Origin: http://www.nczonline.net 
// 如果没有这个头部，或者有但源不匹配，则表明不会响应浏览器请求。否则，服务器就会处理这个请求。注意，无论请求还是响应都不会包含 cookie 信息。
// 现代浏览器通过 XMLHttpRequest 对象原生支持 CORS。在尝试访问不同源的资源时，这个行为会被自动触发。要向不同域的源发送请求，可以使用标准 XHR对象并给 open()方法传入一个绝对 URL，
// 比如：
let xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() { 
 if (xhr.readyState == 4) { 
 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
 alert(xhr.responseText); 
 } else { 
 alert("Request was unsuccessful: " + xhr.status); 
 } 
 } 
}; 
xhr.open("get", "http://www.somewhere-else.com/page/", true); //传入一个绝对的URL
xhr.send(null); 

// 跨域 XHR 对象允许访问 status 和 statusText 属性，也允许同步请求。出于安全考虑，跨域 XHR对象也施加了一些额外限制。
//  不能使用 setRequestHeader()设置自定义头部。
//  不能发送和接收 cookie。
//  getAllResponseHeaders()方法始终返回空字符串。
// 因为无论同域还是跨域请求都使用同一个接口，所以最好在访问本地资源时使用相对 URL，在访问远程资源时使用绝对 URL。这样可以更明确地区分使用场景，同时避免出现访问本地资源时出现头部或cookie 信息访问受限的问题。

//完全搞不明白,什么意思???
```

### 预检请求

```js
//Preflighted Requests
//CORS 通过一种叫预检请求（preflighted request）的服务器验证机制，允许使用自定义头部、除 GET和 POST 之外的方法，以及不同请求体内容类型。在要发送涉及上述某种高级选项的请求时，会先向服务器发送一个“预检”请求。这个请求使用 OPTIONS 方法发送并包含以下头部。
//  Origin：与简单请求相同。
//  Access-Control-Request-Method：请求希望使用的方法。
//  Access-Control-Request-Headers：（可选）要使用的逗号分隔的自定义头部列表。

// 下面是一个假设的 POST 请求，包含自定义的 NCZ 头部：
// Origin: http://www.nczonline.net 
// Access-Control-Request-Method: POST 
// Access-Control-Request-Headers: NCZ 
// 在这个请求发送后，服务器可以确定是否允许这种类型的请求。服务器会通过在响应中发送如下头部与浏览器沟通这些信息。
//  Access-Control-Allow-Origin：与简单请求相同。
//  Access-Control-Allow-Methods：允许的方法（逗号分隔的列表）。
//  Access-Control-Allow-Headers：服务器允许的头部（逗号分隔的列表）。
//  Access-Control-Max-Age：缓存预检请求的秒数。
// 例如：
// Access-Control-Allow-Origin: http://www.nczonline.net 
// Access-Control-Allow-Methods: POST, GET 
// Access-Control-Allow-Headers: NCZ 
// Access-Control-Max-Age: 1728000 
// 预检请求返回后，结果会按响应指定的时间缓存一段时间。换句话说，只有第一次发送这种类型的请求时才会多发送一次额外的 HTTP 请求。

// 没看懂,怎么应用???
```

### 凭据请求

```js
//Credentialed Requests
//默认情况下，跨源请求不提供凭据（cookie、HTTP 认证和客户端 SSL 证书）。可以通过将withCredentials 属性设置为 true 来表明请求会发送凭据。如果服务器允许带凭据的请求，那么可以在响应中包含如下 HTTP 头部：
Access-Control-Allow-Credentials: true 
// 如果发送了凭据请求而服务器返回的响应中没有这个头部，则浏览器不会把响应交给 JavaScript
// （responseText 是空字符串，status 是 0，onerror()被调用）。注意，服务器也可以在预检请求的响应中发送这个 HTTP 头部，以表明这个源允许发送凭据请求。
// If a credentialed request is sent and this header is not sent as part of the response, then the browser  doesn’t pass the response to JavaScript (responseText is an empty string, status is 0, and onerror() is invoked). 
// Note that the server can also send this HTTP header as part of the preflight  response to indicate that the origin is allowed to send credentialed requests.

// 什么意思???不太懂
```

## 替代性跨源技术

ALTERNATE CROSS-DOMAIN TECHNIQUES
CORS 出现之前，实现跨源 Ajax 通信是有点麻烦的。开发者需要依赖能够执行跨源请求的 DOM 特性，在不使用 XHR 对象情况下发送某种类型的请求。虽然 CORS 目前已经得到广泛支持，但这些技术仍然没有过时，因为它们不需要修改服务器。

### 图片探测Image Pings

```js
//图片探测是利用<img>标签实现跨域通信的最早的一种技术。任何页面都可以跨域加载图片而不必担心限制，!!!因此这也是在线广告跟踪的主要方式!!!。

// 可以动态创建图片，然后通过它们的 onload 和onerror 事件处理程序得知何时收到响应。
// 这种动态创建图片的技术经常用于图片探测（image pings）。图片探测是与服务器之间简单、跨域、单向的通信。数据通过查询字符串发送，响应可以随意设置，不过一般是位图图片或值为 204 的状态码。
// 浏览器通过图片探测拿不到任何数据，但可以通过监听 onload 和 onerror 事件知道什么时候能接收到响应。下面看一个例子：
let img = new Image(); 
img.onload = img.onerror = function() { 
 alert("Done!"); 
 //当图像加载完成或失败时，都会弹出一个 "Done!" 的提示。
}; 
img.src = "http://www.example.com/test?name=Nicholas"; 
// 这个例子创建了一个新的 Image 实例，然后为它的 onload 和 onerror 事件处理程序添加了同一个函数。这样可以确保请求完成时无论什么响应都会收到通知。设置完 src 属性之后请求就开始了，这个例子向服务器发送了一个 name 值。
// 图片探测频繁用于跟踪用户在页面上的点击操作或动态显示广告。当然，图片探测的缺点是只能发送 GET 请求和无法获取服务器响应的内容。这也是只能利用图片探测实现浏览器与服务器单向通信的原因。
```

### JSONP

```js
//JSONP 是“javascript object notation with padding”的简写，是在 Web 服务上流行的一种 JSON 变体。
// JSONP 是一种通过 <script> 标签加载数据的技术，通常用于解决跨域请求的问题。基本思想是通过在服务器端包裹 JSON 数据，使其成为一个 JavaScript 函数调用，然后在客户端定义这个函数以处理数据。这样就可以通过 <script> 标签加载并执行这个 JSONP 响应。

// JSONP 看起来跟 JSON 一样，只是会被包在一个函数调用里，比如：
// callback({ "name": "Nicholas" }); 
// JSONP 格式包含两个部分：回调和数据。

// 回调是在页面接收到响应之后应该调用的函数，通常回调函数的名称是通过请求来动态指定的。而数据就是作为参数传给回调函数的 JSON 数据。

// 下面是一个典型的 JSONP 请求：
http://freegeoip.net/json/?callback=handleResponse 
// 这个 JSONP 请求的 URL 是一个地理位置服务。JSONP 服务通常支持以查询字符串形式指定回调函数的名称。比如这个例子就把回调函数的名字指定为 handleResponse()。

// JSONP 调用是通过动态创建<script>元素并为 src 属性指定跨域 URL 实现的。此时的<script>与<img>元素类似，能够不受限制地从其他域加载资源。因为 JSONP 是有效的 JavaScript，所以 JSONP响应在被加载完成之后会立即执行。比如下面这个例子：
function handleResponse(response) { 
 console.log(` 
 You're at IP address ${response.ip}, which is in 
 ${response.city}, ${response.region_name}`); 
} 
let script = document.createElement("script"); 
script.src = "http://freegeoip.net/json/?callback=handleResponse"; //设置新创建的 <script> 元素的 src 属性。(指定了一个 URL，其中包含了一个 callback 参数，该参数值为 handleResponse。这意味着，当这个脚本加载并执行时，响应数据将被传递给 handleResponse 函数。)
document.body.insertBefore(script, document.body.firstChild); //将新创建的 <script> 元素插入到文档的 body 元素中，作为第一个子元素。这样做的效果是立即加载和执行指定的脚本。
// 这个例子会显示从地理位置服务获取的 IP 地址及位置信息。

// JSONP 由于其简单易用，在开发者中非常流行。相比于图片探测，使用 JSONP 可以直接访问响应，实现浏览器与服务器的双向通信。不过 JSONP 也有一些缺点。
// 首先，JSONP 是从不同的域拉取可执行代码。如果这个域并不可信，则可能在响应中加入恶意内容。
// 此时除了完全删除 JSONP 没有其他办法。在使用不受控的 Web 服务时，一定要保证是可以信任的。
// 第二个缺点是不好确定 JSONP 请求是否失败。虽然 HTML5 规定了<script>元素的 onerror 事件处理程序，但还没有被任何浏览器实现。为此，开发者经常使用计时器来决定是否放弃等待响应。这种方式并不准确，毕竟不同用户的网络连接速度和带宽是不一样的。
```

## FetchAPI

Fetch API 能够执行 XMLHttpRequest 对象的所有任务，但更容易使用，接口也更现代化，能够在Web 工作线程等现代 Web 工具中使用。XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步。

Fetch API 是 WHATWG 的一个“活标准”（living standard），用规范原文说，就是“Fetch 标准定义请求、响应，以及绑定二者的流程：获取（fetch）”。
Fetch API 本身是使用 JavaScript 请求资源的优秀工具，同时这个 API 也能够应用在服务线程（service worker）中，提供拦截、重定向和修改通过 fetch()生成的请求接口。

### 基本用法

basic utilization
fetch()方法是暴露在全局作用域中的，包括主页面执行线程、模块和工作线程。调用这个方法，浏览器就会向给定 URL 发送请求。The fetch() method is available in any global scope, both in the primary page execution, modules, and inside workers. Invoking it will instruct the browser to send a request to a provided URL.

#### 分派请求

```js
//Dispatching a Request
//fetch 是一个现代的、基于 Promise 的 API，用于进行网络请求。与传统的 XMLHttpRequest 不同，fetch 提供了一种更简单和更灵活的方式来处理 HTTP 请求和响应。
//fetch()只有一个必需的参数 input。多数情况下，这个参数是要获取资源的 URL。这个方法返回一个期约promise：
let r = fetch('/bar'); //使用 fetch API 发起一个 GET 请求，目标是相对 URL /bar。fetch 返回一个 Promise 对象，这个 Promise 对象代表着一个尚未完成的异步操作。
console.log(r); // Promise <pending>  ,将 fetch 返回的 Promise 对象 r 打印到控制台。在 fetch 请求开始时，Promise 的状态是 pending（待定），表示请求正在进行中，但尚未完成或失败。
// URL 的格式（相对路径、绝对路径等）的解释与 XHR 对象一样。

// 请求完成、资源可用时，期约会解决为一个 Response 对象。这个对象是 API 的封装，可以通过它取得相应资源。获取资源要使用这个对象的属性和方法，掌握响应的情况并将负载转换为有用的形式，如下所示：
fetch('bar.txt') 
 .then((response) => { 
 console.log(response); 
 }); 
// Response { type: "basic", url: ... }   
//先是使用fetch API发起一个GET请求,目标是bar.txt,返回一个promise对象;然后then 方法附加了一个回调函数，当 fetch 请求成功完成时，这个回调函数会被调用。回调函数接收一个 response 对象，并将其打印到控制台。

// fetch 返回的 Response 对象包含以下常用属性和方法：
// response.ok：一个布尔值，表示请求是否成功 (状态码在 200-299 之间)。
// response.status：HTTP 状态码（例如 200 表示成功）。
// response.statusText：状态码对应的文本信息（例如 "OK"）。
// response.url：请求的最终 URL。
// response.type：响应的类型（例如 "basic", "cors", "error", "opaque"）。
// response.headers：响应的头部信息。
// response.text()：返回一个解析为文本的 Promise。
// response.json()：返回一个解析为 JSON 对象的 Promise。


以下是读取文本内容:
fetch('bar.txt')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text(); // 将响应体解析为文本
    })
    .then((text) => {
        console.log(text); // 打印文本内容
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
以下是读取json内容:
fetch('bar.txt')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // 将响应体解析为 JSON 对象
    })
    .then((data) => {
        console.log(data); // 打印解析后的 JSON 对象
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });

// fetch方便来异步http请求并通过处理 Response 对象来获取和处理响应数据。不同的方法（如 text() 或 `json()`）可以用于将响应体解析为不同的格式，以便进一步处理。
```

#### 读取响应

```js
//Reading a Response
//读取响应内容的最简单方式是取得纯文本格式的内容，这要用到 text()方法。这个方法返回一个期约，会解决为取得资源的完整内容：
fetch('bar.txt') 
 .then((response) => { 

 response.text().then((data) => { 
 console.log(data); 
 //在 response 对象上调用 text() 方法，这个方法返回一个新的 Promise，该 Promise 解析为响应体的文本内容。再附加一个 then 回调函数来处理解析后的文本数据，并将其打印到控制台。
 }); 
 }); 
// bar.txt 的内容
// 内容的结构通常是打平的：This promise structure is commonly flattened:
fetch('bar.txt') 
 .then((response) => response.text()) 
 .then((data) => console.log(data)); 
// bar.txt 的内容

//then 方法附加了一个回调函数，当 fetch 请求成功完成时，这个回调函数会被调用。回调函数接收一个 response 对象，并调用 response.text() 方法，该方法返回一个新的 Promise，该 Promise 解析为响应体的文本内容。
//第二个 then 回调函数接收解析后的文本数据，并将其打印到控制台。
```

#### 处理状态码和请求失败

```js
//Handling Status Codes and Request Failures
//Fetch API 支持通过 Response 的 status（状态码）和 statusText（状态文本）属性检查响应状态。

// 成功获取响应的请求通常会产生值为 200 的状态码，如下所示：
fetch('/bar') 
 .then((response) => { 
 console.log(response.status); // 200 
 console.log(response.statusText); // OK 
 }); 

// 请求不存在的资源通常会产生值为 404 的状态码：
fetch('/does-not-exist') 
 .then((response) => { 
 console.log(response.status); // 404 
 console.log(response.statusText); // Not Found 
 }); 

// 请求的 URL 如果抛出服务器错误会产生值为 500 的状态码：
fetch('/throw-server-error') 
 .then((response) => { 
 console.log(response.status); // 500 
 console.log(response.statusText); // Internal Server Error 
 }); 

// 可以显式地设置 fetch()在遇到重定向时的行为（本章后面会介绍），不过默认行为是跟随重定向并返回状态码不是 300~399 的响应。跟随重定向时，响应对象的 redirected 属性会被设置为 true，
// 而状态码仍然是 200：
fetch('/permanent-redirect') 
 .then((response) => { 
 // 默认行为是跟随重定向直到最终 URL 
 // 这个例子会出现至少两轮网络请求
 // <origin url>/permanent-redirect -> <redirect url> 
 console.log(response.status); // 200 
 console.log(response.statusText); // OK 
 console.log(response.redirected); // true 
 }); 
// 在前面这几个例子中，虽然请求可能失败（如状态码为 500），但都只执行了期约的解决处理函数。
// 事实上，只要服务器返回了响应，fetch()期约都会解决。这个行为是合理的：系统级网络协议已经成功完成消息的一次往返传输。至于真正的“成功”请求，则需要在处理响应时再定义。

// 通常状态码为 200 时就会被认为成功了，其他情况可以被认为未成功。为区分这两种情况，可以在状态码非 200~299 时检查 Response 对象的 ok 属性：
fetch('/bar') 
 .then((response) => { 
 console.log(response.status); // 200 
 console.log(response.ok); // true 
 }); 

fetch('/does-not-exist') 
 .then((response) => { 
 console.log(response.status); // 404 
 console.log(response.ok); // false 
 }); 

// 因为服务器没有响应而导致浏览器超时，这样真正的 fetch()失败会导致期约被拒绝：
fetch('/hangs-forever') 
 .then((response) => { 
 console.log(response); //请求成功时
 }, (err) => { 
     console.log(err); //请求失败时
 }); 
  //使用 fetch API 发起一个 GET 请求，目标是相对 URL /hangs-forever。fetch 返回一个 Promise 对象，这个 Promise 对象表示异步请求操作的最终状态。
  //then 方法附加了两个回调函数：第一个回调函数接收一个 response 对象，当请求成功完成时被调用，并将 response 打印到控制台。第二个回调函数接收一个 err 对象，当请求失败时被调用，并将错误信息打印到控制台。
//（浏览器超时后）
// TypeError: "NetworkError when attempting to fetch resource." 

// 违反 CORS (cross origin resource sharing)、无网络连接、HTTPS 错配及其他浏览器/网络策略问题都会导致期约被拒绝。
// 可以通过 url 属性检查通过 fetch()发送请求时使用的完整 URL：
// foo.com/bar/baz 发送的请求
console.log(window.location.href); // https://foo.com/bar/baz 

fetch('qux').then((response) => console.log(response.url)); 
// https://foo.com/bar/qux

fetch('/qux').then((response) => console.log(response.url)); 
// https://foo.com/qux

fetch('//qux.com').then((response) => console.log(response.url)); 
// https://qux.com

fetch('https://qux.com').then((response) => console.log(response.url)); 
// https://qux.com

//不很懂,这是处理请求\针对请求???
```

#### 自定义选项

Custom Fetch Options
只使用 URL 时，fetch()会发送 GET 请求，只包含最低限度的请求头When used with only a URL, fetch()will dispatch a GET request with a minimal set of request headers.。要进一步配置如何发送请求，需要传入可选的第二个参数 init 对象。init 对象要按照下表中的键/值进行填充。

| 键      | 值                                                                                                     |
|---------|-------------------------------------------------------------------------------------------------------|
| body    | 指定使用请求体时请求体的内容 必须是 Blob、BufferSource、FormData、URLSearchParams、ReadableStream 或 String 的实例 |
| cache   | 用于控制浏览器与 HTTP缓存的交互。要跟踪缓存的重定向，请求的 redirect 属性值必须是"follow"，而且必须符合同源策略限制。必须是下列值之一 |
|         | **default**                                                                                             |
|         | - fetch()返回命中的有效缓存。不发送请求                                                                 |
|         | - 命中无效（stale）缓存会发送条件式请求。如果响应已经改变，则更新缓存的值。然后 fetch()返回缓存的值         |
|         | - 未命中缓存会发送请求，并缓存响应。然后 fetch()返回响应                                                 |
|         | **no-store**                                                                                           |
|         | - 浏览器不检查缓存，直接发送请求                                                                        |
|         | - 不缓存响应，直接通过 fetch()返回                                                                      |
|         | **reload**                                                                                             |
|         | - 浏览器不检查缓存，直接发送请求                                                                        |
|         | - 缓存响应，再通过 fetch()返回                                                                          |
|         | **no-cache**                                                                                           |
|         | - 无论命中有效缓存还是无效缓存都会发送条件式请求。如果响应已经改变，则更新缓存的值。然后 fetch()返回缓存的值|
|         | - 未命中缓存会发送请求，并缓存响应。然后 fetch()返回响应                                                 |

| 键          | 值                                                                                                                                   |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------|
| force-cache | - 无论命中有效缓存还是无效缓存都通过 fetch()返回。不发送请求                                                                          |
|             | - 未命中缓存会发送请求，并缓存响应。然后 fetch()返回响应                                                                              |
| only-if-cached | - 只在请求模式为 same-origin 时使用缓存                                                                                            |
|             | - 无论命中有效缓存还是无效缓存都通过 fetch()返回。不发送请求                                                                          |
|             | - 未命中缓存返回状态码为 504（网关超时）的响应                                                                                        |
|             | 默认值为 default                                                                                                                      |
| credentials | 用于指定在外发请求中如何包含 cookie。与 XMLHttpRequest 的 withCredentials 标签类似                                                     |
|             | 必须是下列字符串值之一                                                                                                                |
|             | - omit：不发送 cookie                                                                                                                 |
|             | - same-origin：只在请求 URL 与发送 fetch()请求的页面同源时发送 cookie                                                                  |
|             | - include：无论同源还是跨源都包含 cookie                                                                                              |
|             | 在支持 Credential Management API 的浏览器中，也可以是一个 FederatedCredential 或 PasswordCredential 的实例                              |
|             | 默认为 same-origin                                                                                                                    |
| headers     | 用于指定请求头部                                                                                                                       |
|             | 必须是 Headers 对象实例或包含字符串格式键/值对的常规对象                                                                               |
|             | 默认值为不包含键/值对的 Headers 对象。这不意味着请求不包含任何头部，浏览器仍然会随请求发送一些头部。虽然这些头部对 JavaScript 不可见，但浏览器的网络检查器可以观察到 |
| integrity   | 用于强制子资源完整性                                                                                                                   |
|             | 必须是包含子资源完整性标识符的字符串                                                                                                   |
|             | 默认为空字符串                                                                                                                         |
| keepalive   | 用于指示浏览器允许请求存在时间超出页面生命周期。适合报告事件或分析，比如页面在 fetch()请求后很快卸载。设置 keepalive 标志的 fetch()请求可用于替代 Navigator.sendBeacon() |
|             | 必须是布尔值                                                                                                                           |
|             | 默认为 false                                                                                                                           |
| method      | 用于指定 HTTP 请求方法                                                                                                                 |
|             | 基本上就是如下字符串值：                                                                                                               |
|             | - GET                                                                                                                                 |
|             | - POST                                                                                                                                |
|             | - PUT                                                                                                                                 |
|             | - PATCH                                                                                                                               |
|             | - DELETE                                                                                                                              |
|             | - HEAD                                                                                                                                |
|             | - OPTIONS                                                                                                                             |
|             | - CONNECT                                                                                                                             |
|             | - TRACE                                                                                                                               |
|             | 默认为 GET                                                                                                                             |

| 键               | 值                                                                                                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| mode             | 用于指定请求模式。这个模式决定来自跨源请求的响应是否有效，以及客户端可以读取多少响应。违反这里指定模式的请求会抛出错误                                                                                             |
|                  | 必须是下列字符串值之一                                                                                                                                                                                             |
|                  | - **cors**：允许遵守 CORS 协议的跨源请求。响应是“CORS 过滤的响应”，意思是响应中可以访问的浏览器头部是经过浏览器强制白名单过滤的                                                                                  |
|                  | - **no-cors**：允许不需要发送预检请求的跨源请求（HEAD、GET 和只带有满足 CORS 请求头部的 POST）。响应类型是 opaque，意思是不能读取响应内容                                                                          |
|                  | - **same-origin**：任何跨源请求都不允许发送                                                                                                                                                                        |
|                  | - **navigate**：用于支持 HTML 导航，只在文档间导航时使用。基本用不到                                                                                                                                               |
|                  | 在通过构造函数手动创建 Request 实例时，默认为 cors；否则，默认为 no-cors                                                                                                                                           |
| redirect         | 用于指定如何处理重定向响应（状态码为 301、302、303、307 或 308）                                                                                                                                                    |
|                  | 必须是下列字符串值之一                                                                                                                                                                                             |
|                  | - **follow**：跟踪重定向请求，以最终非重定向 URL 的响应作为最终响应                                                                                                                                                |
|                  | - **error**：重定向请求会抛出错误                                                                                                                                                                                  |
|                  | - **manual**：不跟踪重定向请求，而是返回 opaqueredirect 类型的响应，同时仍然暴露期望的重定向 URL。允许以手动方式跟踪重定向                                                                                         |
|                  | 默认为 follow                                                                                                                                                                                                      |
| referrer         | 用于指定 HTTP 的 Referer 头部的内容                                                                                                                                                                               |
|                  | 必须是下列字符串值之一                                                                                                                                                                                             |
|                  | - **no-referrer**：以 no-referrer 作为值                                                                                                                                                                           |
|                  | - **client/about:client**：以当前 URL 或 no-referrer（取决于来源策略 referrerPolicy）作为值                                                                                                                        |
|                  | - **``<URL>``**：以伪造 URL 作为值。伪造 URL 的源必须与执行脚本的源匹配                                                                                                                                               |
|                  | 默认为 client/about:client                                                                                                                                                                                         |
| referrerPolicy   | 用于指定 HTTP 的 Referer 头部                                                                                                                                                                                      |
|                  | 必须是下列字符串值之一                                                                                                                                                                                             |
|                  | - **no-referrer**                                                                                                                                                                                                  |
|                  |     - 请求中不包含 Referer 头部                                                                                                                                                                                    |
|                  | - **no-referrer-when-downgrade**                                                                                                                                                                                   |
|                  |     - 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部                                                                                                                                           |
|                  |     - 对于所有其他请求，将 Referer 设置为完整 URL                                                                                                                                                                  |
|                  | - **origin**                                                                                                                                                                                                       |
|                  |     - 对于所有请求，将 Referer 设置为只包含源                                                                                                                                                                      |
|                  | - **same-origin**                                                                                                                                                                                                  |
|                  |     - 对于跨源请求，不包含 Referer 头部                                                                                                                                                                            |
|                  |     - 对于同源请求，将 Referer 设置为完整 URL                                                                                                                                                                     |

| 键                              | 值                                                                                     |
|---------------------------------|----------------------------------------------------------------------------------------|
| strict-origin                   | - 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部                    |
|                                 | - 对于所有其他请求，将 Referer 设置为只包含源                                           |
| origin-when-cross-origin        | - 对于跨源请求，将 Referer 设置为只包含源                                               |
|                                 | - 对于同源请求，将 Referer 设置为完整 URL                                              |
| strict-origin-when-cross-origin | - 对于从安全 HTTPS 上下文发送到 HTTP URL 的请求，不包含 Referer 头部                    |
|                                 | - 对于所有其他跨源请求，将 Referer 设置为只包含源                                       |
|                                 | - 对于同源请求，将 Referer 设置为完整 URL                                              |
| unsafe-url                      | - 对于所有请求，将 Referer 设置为完整 URL                                              |
|                                 | 默认为 no-referrer-when-downgrade                                                      |
| signal                          | 用于支持通过 AbortController 中断进行中的 fetch()请求                                   |
|                                 | 必须是 AbortSignal 的实例                                                              |
|                                 | 默认为未关联控制器的 AbortSignal 实例                                                   |

### 常见Fetch请求模式

Common Fetch Patterns
与 XMLHttpRequest 一样，fetch()!!!既可以发送数据也可以接收数据!!!。使用 init 对象参数，可以配置 fetch()在请求体中发送各种序列化的数据。

#### 发送JSON数据

```js
// /Sending JSON Data
//可以像下面这样发送简单 JSON 字符串：
let payload = JSON.stringify({ 
 foo: 'bar' 
}); //创建请求体,使用 JSON.stringify 方法将一个 JavaScript 对象转换为 JSON 字符串。创建了一个包含键值对 { foo: 'bar' } 的 JSON 字符串.
let jsonHeaders = new Headers({ 
 'Content-Type': 'application/json' 
}); //创建请求头, 创建一个 Headers 对象，并设置请求头 Content-Type 为 application/json。  这个头部信息表示请求体的数据格式为 JSON。

//发送请求,使用 fetch 函数发送一个 HTTP 请求。第一个参数是请求的 URL /send-me-json。 第二个参数是一个配置对象，包含请求的方法、请求体和请求头：method: 'POST' 指定请求方法为 POST，POST 方法通常用于发送数据。 body: payload 指定请求体为之前创建的 JSON 字符串。  headers: jsonHeaders 指定请求头为之前创建的 Headers 对象。
fetch('/send-me-json', { 
 method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
 body: payload, 
 headers: jsonHeaders 
});
```

#### 在请求体中发送参数

```js
//Sending Parameters in a Request Body
//因为请求体支持任意字符串值，所以可以通过它发送请求参数：
let payload = 'foo=bar&baz=qux'; //字符串 payload,即编码字符串,包含 URL 编码的数据。这里的内容表示两个键值对：foo=bar 和 baz=qux。
let paramHeaders = new Headers({ 
 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
}); //创一个Headers 对象，并设置请求头 Content-Type 为 application/x-www-form-urlencoded; charset=UTF-8。这个头部信息表示请求体的数据格式为 URL 编码.
fetch('/send-me-params', { 
 method: 'POST', // 发送请求体时必须使用一种 HTTP 方法
 body: payload, 
 headers: paramHeaders 
}); 
```

#### 发送文件Sending Files

```js
//因为请求体支持 FormData 实现，所以 fetch()也可以序列化并发送文件字段中的文件：
let imageFormData = new FormData(); 
let imageInput = document.querySelector("input[type='file']");
//使用 document.querySelector 方法获取页面中第一个类型为 file 的 <input> 元素。 
imageFormData.append('image', imageInput.files[0]); //将选中的文件添加到 FormData 对象中。imageInput.files[0] 获取用户选择的第一个文件。append 方法的第一个参数 'image' 是键，第二个参数是文件对象。
fetch('/img-upload', { 
 method: 'POST', 
 body: imageFormData 
}); //第二个参数是一个配置对象，包含请求的方法和请求体：

// 这个 fetch()实现可以支持多个文件： 添加多个文件的时候
let imageFormData = new FormData(); 
let imageInput = document.querySelector("input[type='file'][multiple]"); //.querySelector 方法获取页面中第一个类型为 file 且带有 multiple 属性的 <input> 元素。这个元素允许用户选择多个文件。
for (let i = 0; i < imageInput.files.length; ++i) { 
 imageFormData.append('image', imageInput.files[i]); 
//  /使用 for 循环遍历 imageInput.files 数组中的所有文件。使用 append 方法将每个文件添加到 FormData 对象中，键名为 'image'。
}
fetch('/img-upload', { 
 method: 'POST', 
 body: imageFormData 
}); 
```

#### 加载Blob文件

```js
// Loading Files as Blobs  (Binary Large Object 的缩写，是 JavaScript 中用于表示不可变的、原始数据的类。Blob 对象代表一个类文件对象，它可以包含任意数量的二进制数据。Blob 通常用于处理文件上传、下载和其他需要处理原始数据的操作。)

//Fetch API也能提供 Blob 类型的响应，而 Blob 又可以兼容多种浏览器 API。一种常见的做法是明确将图片文件加载到内存，然后将其添加到 HTML图片元素。为此，可以使用响应对象上暴露的 blob()方法。
// 这个方法返回一个期约，解决为一个 Blob 的实例。然后，可以将这个实例传给 URL.createObjectUrl()以生成可以添加给图片元素 src 属性的值：

const imageElement = document.querySelector('img'); 
fetch('my-image.png') 
   .then((response) => response.blob()) 
   .then((blob) => { 
     imageElement.src = URL.createObjectURL(blob); 
 }); 
 //fetch 返回一个 Promise，当请求完成时，response 参数将包含响应对象。调用 response.blob() 方法将响应数据转换为一个 Blob 对象。这段代码中的 then 方法返回一个新的 Promise，解析为 Blob 对象。
 //处理 Blob 对象并创建一个对象 URL。URL.createObjectURL(blob) 创建一个表示该 Blob 对象的 URL。  将这个 URL 设置为 imageElement 的 src 属性，以显示图片.

//加载二进制大对象似的文件 ,咋应用啊???
```

#### 发送跨源请求

```js
//Sending a Cross-Origin Request
//从不同的源请求资源，响应要包含 CORS (cross origin objet sharing)头部才能保证浏览器收到响应。没有这些头部，跨源请求会失败并抛出错误。
fetch('//cross-origin.com'); 
//当你尝试使用 fetch 从跨域资源加载数据时，如果服务器没有设置适当的 CORS (Cross-Origin Resource Sharing) 头，就会遇到类似以下错误：
// TypeError: Failed to fetch 
// No 'Access-Control-Allow-Origin' header is present on the requested resource. 
//错误的原因是浏览器的同源策略 (Same-Origin Policy)。同源策略是一种安全机制，用于防止一个源 (protocol + domain + port) 下的文档或脚本，与来自不同源的资源进行交互。为了允许跨源请求，服务器必须明确允许通过设置适当的 CORS 头。
//解决方法:服务器端设置 CORS 头;使用代理服务器;JSONP;使用现代浏览器的 CORS.

// 如果代码不需要访问响应，也可以发送 no-cors 请求。此时响应的 type 属性值为 opaque，因此无法读取响应内容。这种方式适合发送探测请求或者将响应缓存起来供以后使用。  no-cors 模式的主要用途是允许浏览器向不同源发送请求，而不会被同源策略阻止。然而，由于安全原因，浏览器会限制这些请求的响应信息，以防止潜在的跨站脚本攻击（XSS）。
fetch('//cross-origin.com', { method: 'no-cors' }) 
 .then((response) => console.log(response.type)); 
// opaque  ,当你使用 fetch 方法并设置 { method: 'no-cors' } 时，你会收到一个类型为 opaque 的响应。这是由于 no-cors 模式的限制。   'no-cors' 模式允许请求跨域资源，但会限制响应的可访问性和可用性。特别是，浏览器会将响应视为不透明（opaque），这意味着你无法访问响应体的内容、状态码、头信息等。  response.type 属性将显示响应的类型。在 no-cors 模式下，这个类型总是 opaque。

//opaque 响应的限制:   无法读取响应内容：你无法读取响应体，也不能访问状态码和头信息。这是因为浏览器为了安全起见，不允许你访问这些信息。 受限的使用场景：尽管你可以发送请求，这种方式通常仅用于发送例如图片、样式表或脚本等不需要读取响应内容的资源。
```

#### 中断请求

```js
//Aborting a Request
//Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController. abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的 fetch()请求会导致包含错误的拒绝。
let abortController = new AbortController(); //AbortController 是一个控制中断操作的接口。通过创建一个实例，你可以控制和中断一个或多个请求。
fetch('wikipedia.zip', { signal: abortController.signal }) 
 .catch(() => console.log('aborted!'); //使用 fetch 函数请求一个名为 wikipedia.zip 的资源。通过 { signal: abortController.signal } 传递中断信号给 fetch 请求，以便稍后可以通过这个信号中断请求。如果请求被中断，fetch 会抛出一个错误，这里通过 catch 捕获错误并输出 'aborted!'。

// 10 毫秒后中断请求,调用 abort 方法会触发传递给 fetch 的中断信号，从而中断请求。
setTimeout(() => abortController.abort(), 10); 
// 已经中断 
```

### Headers对象

Headers 对象是所有外发请求和入站响应头部的容器。每个外发的 Request 实例都包含一个空的Headers 实例，可以通过 Request.prototype.headers 访问，每个入站 Response 实例也可以通过
Response.prototype.headers 访问包含着响应头部的 Headers 对象。这两个属性都是可修改属性。
另外，使用 new Headers()也可以创建一个新实例。

#### Headers 与 Map 的相似之处

```js
//Headers 对象与 Map 对象极为相似。这是合理的，因为 HTTP 头部本质上是序列化后的键/值对，它们的 JavaScript 表示则是中间接口This should make sense, as HTTP headers are essentially serialized key-value pairs, and their JavaScript representation is the intermediate interface. 。Headers 与 Map 类型都有 get()、set()、has()和 delete()等实例方法，如下面的代码所示：
let h = new Headers(); 
let m = new Map(); 

// 设置键
h.set('foo', 'bar'); 
m.set('foo', 'bar'); 

// 检查键
console.log(h.has('foo')); // true 
console.log(m.has('foo')); // true 
console.log(h.has('qux')); // false 
console.log(m.has('qux')); // false 

// 获取值,使用 get 方法从 Headers 和 Map 对象中获取键 'foo' 对应的值 'bar' 并输出。
console.log(h.get('foo')); // bar 
console.log(m.get('foo')); // bar 

// 更新值
h.set('foo', 'baz'); 
m.set('foo', 'baz');

// 取得更新的值
console.log(h.get('foo')); // baz 
console.log(m.get('foo')); // baz 

// 删除值
h.delete('foo'); 
m.delete('foo'); 

// 确定值已经删除
console.log(h.get('foo')); // undefined 
console.log(m.get('foo')); // undefined 

// Headers 和 Map 都可以使用一个可迭代对象来初始化，比如：
let seed = [['foo', 'bar']]; 
let h = new Headers(seed); 
let m = new Map(seed); 
console.log(h.get('foo')); // bar 
console.log(m.get('foo')); // bar 
// 而且，它们也都有相同的 keys()、values()和 entries()迭代器接口：
let seed = [['foo', 'bar'], ['baz', 'qux']]; 
let h = new Headers(seed); 
let m = new Map(seed); 
console.log(...h.keys()); // foo, baz 
console.log(...m.keys()); // foo, baz 
console.log(...h.values()); // bar, qux 
console.log(...m.values()); // bar, qux 
console.log(...h.entries()); // ['foo', 'bar'], ['baz', 'qux'] 
console.log(...m.entries()); // ['foo', 'bar'], ['baz', 'qux'] 
```

#### Headers 独有的特性

```js
//Unique Features of the Headers Object
//Headers 并不是与 Map 处处都一样。在初始化 Headers 对象时，也可以使用键/值对形式的对象，而 Map 则不可以：
let seed = {foo: 'bar'}; 
let h = new Headers(seed); 
console.log(h.get('foo')); // bar 
let m = new Map(seed); 
// TypeError: object is not iterable ,试使用 { foo: 'bar' } 对象初始化 Map，但是对象本身不是可迭代的，因此抛出了 TypeError: object is not iterable 错误。 正确语句是: let m2 = new Map();  m2.set('foo', 'bar'); console.log(m2.get('foo')); // bar

// 一个 HTTP 头部字段可以有多个值，而 Headers 对象通过 append()方法支持添加多个值。在Headers 实例中还不存在的头部上调用 append()方法相当于调用 set()。后续调用会以逗号为分隔符拼接多个值：
let h = new Headers(); 
h.append('foo', 'bar'); 
console.log(h.get('foo')); // "bar"
h.append('foo', 'baz'); 
console.log(h.get('foo')); // "bar, baz" 
```

#### 头部护卫

```js
//Header Guards
//某些情况下，并非所有 HTTP 头部都可以被客户端修改，而 Headers 对象使用护卫来防止不被允许的修改。不同的护卫设置会改变 set()、append()和 delete()的行为。违反护卫限制会抛出TypeError。
// Headers 实例会因来源不同而展现不同的行为，它们的行为由护卫来控制。JavaScript 可以决定Headers 实例的护卫设置。下表列出了不同的护卫设置和每种设置对应的行为。
```

| 模式            | 适用情形                                                   | 限制                                                         |
|-----------------|------------------------------------------------------------|--------------------------------------------------------------|
| none            | 在通过构造函数创建 Headers 实例时激活                       | 无                                                           |
| request         | 在通过构造函数初始化 Request 对象，且 mode 值为非 no-cors 时激活 | 不允许修改禁止修改的头部（参见 MDN 文档中的 forbidden header name 词条） |
| request-no-cors | 在通过构造函数初始化 Request 对象，且 mode 值为 no-cors 时激活  | 不允许修改非简单头部（参见 MDN 文档中的 simple header 词条）    |
| response        | 在通过构造函数初始化 Response 对象时激活                   | 不允许修改禁止修改的响应头部（参见 MDN 文档中的 forbidden response header name 词条） |
| immutable       | 在通过 error() 或 redirect() 静态方法初始化 Response 对象时激活 | 不允许修改任何头部                                           |

### Request 对象

顾名思义，Request 对象是获取资源请求的接口。这个接口暴露了请求的相关信息，也暴露了使用请求体的不同方式。
注意:与请求体相关的属性和方法将在本章 24.5.6 节介绍。

#### 创建 Request 对象

```js
//可以通过构造函数初始化 Request 对象。为此需要传入一个 input 参数，一般是 URL：
let r = new Request('https://foo.com'); 
console.log(r); 
// Request {...} 

// Request 构造函数也接收第二个参数——一个 init 对象。这个 init 对象与前面介绍的 fetch()的 init 对象一样。没有在 init 对象中涉及的值则会使用默认值：
// 用所有默认值创建 Request 对象
console.log(new Request('')); 

// Request { 
// bodyUsed: false 
// cache: "default" 
// credentials: "same-origin" 
// destination: "" 
// headers: Headers {} 
// integrity: "" 
// keepalive: false 
// method: "GET" 
// mode: "cors" 
// redirect: "follow" 
// referrer: "about:client" 
// referrerPolicy: "" 
// signal: AbortSignal {aborted: false, onabort: null} 
// url: "<current URL>" 
// } 

// 用指定的初始值创建 Request 对象
console.log(new Request('https://foo.com', 
 { method: 'POST' })); 

// Request { 
// bodyUsed: false 
// cache: "default" 
// credentials: "same-origin" 
// destination: "" 
// headers: Headers {} 
// integrity: "" 
// keepalive: false 
// method: "POST"  加粗
// mode: "cors" 
// redirect: "follow" 
// referrer: "about:client" 
// referrerPolicy: "" 
// signal: AbortSignal {aborted: false, onabort: null} 
// url: "https://foo.com/" 加粗
// } 

//就是说默认创建是什么样子 指定初始值创建是什么样子???
```

#### 克隆 Request 对象

```js
//Cloning Request Objects
//Fetch API 提供了两种不太一样的方式用于创建 Request 对象的副本：使用 Request 构造函数和使用 clone()方法。将 Request 实例作为 input 参数传给 Request 构造函数，会得到该请求的一个副本：
let r1 = new Request('https://foo.com'); 
let r2 = new Request(r1); 

console.log(r2.url); // https://foo.com/ 

// 如果再传入 init 对象，则 init 对象的值会覆盖源对象中同名的值：
let r1 = new Request('https://foo.com'); 
let r2 = new Request(r1, {method: 'POST'}); 
console.log(r1.method); // GET 
console.log(r2.method); // POST 

// 这种克隆方式并不总能得到一模一样的副本。最明显的是，第一个请求的请求体会被标记为“已使用”：
let r1 = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
let r2 = new Request(r1); 
console.log(r1.bodyUsed); // true 
console.log(r2.bodyUsed); // false 
// 如果源对象与创建的新对象不同源，则 referrer 属性会被清除。此外，如果源对象的 mode 为 navigate，则会被转换为 same-origin。

// 上面是用new,下面是用clone
// 第二种克隆 Request 对象的方式是使用 clone()方法，这个方法会创建一模一样的副本，任何值都不会被覆盖。与第一种方式不同，这种方法不会将任何请求的请求体标记为“已使用”：
let r1 = new Request('https://foo.com', { method: 'POST', body: 'foobar' }); 
let r2 = r1.clone(); 

console.log(r1.url); // https://foo.com/ 
console.log(r2.url); // https://foo.com/ 

console.log(r1.bodyUsed); // false 
console.log(r2.bodyUsed); // false 

// 如果请求对象的 bodyUsed 属性为 true（即请求体已被读取），那么上述任何一种方式都不能用来创建这个对象的副本。在请求体被读取之后再克隆会导致抛出 TypeError。
let r = new Request('https://foo.com'); 
r.clone(); 
new Request(r); 
// 没有错误
r.text(); // 设置 bodyUsed 为 true .  就是说这句就是请求体被读取???
r.clone(); 
// TypeError: Failed to execute 'clone' on 'Request': Request body is already used 
new Request(r); 
// TypeError: Failed to construct 'Request': Cannot construct a Request with a 
Request object that has already been used. 
```

#### 在 fetch()中使用 Request 对象

```js
//Using Request Objects with fetch()
//fetch()和 Request 构造函数拥有相同的函数签名并不是巧合。在调用 fetch()时，可以传入已经创建好的 Request 实例而不是 URL。与 Request 构造函数一样，传给 fetch()的 init 对象会覆盖传入请求对象的值：
let r = new Request('https://foo.com'); 
// 向 foo.com 发送 GET 请求,即直接fetch不写其它就是get请求
fetch(r); 
// 向 foo.com 发送 POST 请求
fetch(r, { method: 'POST' });

// fetch()会在内部克隆传入的 Request 对象。与克隆 Request 一样，fetch()也不能拿请求体已经用过的 Request 对象来发送请求：
let r = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
r.text(); 
fetch(r); 
// TypeError: Cannot construct a Request with a Request object that has already been used. 

// 关键在于，通过 fetch 使用 Request 会将请求体标记为已使用。也就是说，有请求体的 Request只能在一次 fetch 中使用。（不包含请求体的请求不受此限制。）演示如下：
let r = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
fetch(r); 
fetch(r); 
// TypeError: Cannot construct a Request with a Request object that has already been used.  fetch过的不能再fetch\请求标记已使用.

// 要想基于包含请求体的相同 Request 对象多次调用 fetch()，必须在第一次发送 fetch()请求前调用 clone()：
let r = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
// 3 个都会成功
fetch(r.clone()); 
fetch(r.clone()); 
fetch(r); 
```

### Response 对象

The Response Object
顾名思义，Response 对象是获取资源响应的接口。这个接口暴露了响应的相关信息，也暴露了使用响应体的不同方式。
注意:与响应体相关的属性和方法将在本章 24.5.6 节介绍。

#### 创建 Response 对象

Creating Response Objects
可以通过构造函数初始化 Response 对象且不需要参数。此时响应实例的属性均为默认值，因为它并不代表实际的 HTTP 响应：

```js
let r = new Response();
console.log(r);
// Response {
// body: (...)
// bodyUsed: false
// headers: Headers {}
// ok: true
// redirected: false
// status: 200
// statusText: "OK"
// type: "default"
// url: ""
// }
```

Response 构造函数接收一个可选的 body 参数。这个 body 可以是 null，等同于 fetch()参数init 中的 body。还可以接收一个可选的 init 对象，这个对象可以包含下表所列的键和值。

| 键         | 值                                                                 |
|------------|--------------------------------------------------------------------|
| headers    | 必须是 Headers 对象实例或包含字符串键/值对的常规对象实例            |
|            | 默认为没有键/值对的 Headers 对象                                    |
| status     | 表示 HTTP 响应状态码的整数                                          |
|            | 默认为 200                                                          |
| statusText | 表示 HTTP 响应状态的字符串                                          |
|            | 默认为空字符串                                                      |

```js
//可以像下面这样使用 body 和 init 来构建 Response 对象：
let r = new Response('foobar', { 
 status: 418, 
 statusText: 'I\'m a teapot' 
}); 
console.log(r); 

// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: false 
// redirected: false 
// status: 418  加粗
// statusText: "I'm a teapot"  加粗
// type: "default" 
// url: "" 
// } 

// 大多数情况下，产生 Response 对象的主要方式是调用 fetch()，它返回一个最后会解决为Response 对象的期约，这个 Response 对象代表实际的 HTTP 响应。下面的代码展示了这样得到的Response 对象：
fetch('https://foo.com') 
 .then((response) => { 
 console.log(response); 
 }); 

// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: true 
// redirected: false 
// status: 200 
// statusText: "OK" 
// type: "basic" 
// url: "https://foo.com/" 
// } 

// Response 类还有两个用于生成 Response 对象的静态方法：Response.redirect()和 Response. error()。前者接收一个 URL 和一个重定向状态码（301、302、303、307 或 308），返回重定向的 Response对象：  就是说重定向是定向一种状态
console.log(Response.redirect('https://foo.com', 301)); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: false 
// redirected: false 
// status: 301 
// statusText: "" 
// type: "default" 
// url: "" 
// } 

// 提供的!!!状态码必须对应重定向!!!，否则会抛出错误：
Response.redirect('https://foo.com', 200); 
// RangeError: Failed to execute 'redirect' on 'Response': Invalid status code 

// 另一个静态方法 Response.error()用于产生表示网络错误的 Response 对象（网络错误会导致fetch()期约被拒绝）。
console.log(Response.error()); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: false 
// redirected: false 
// status: 0 
// statusText: "" 
// type: "error" 
// url: "" 
// } 
```

#### 读取响应状态信息

Reading Response Status Information
Response 对象包含一组只读属性，描述了请求完成后的状态，如下表所示。

| 属性        | 值                                                                 |
|-------------|--------------------------------------------------------------------|
| headers     | 响应包含的 Headers 对象                                             |
| ok          | 布尔值，表示 HTTP 状态码的含义。200~299 的状态码返回 true，其他状态码返回 false |
| redirected  | 布尔值，表示响应是否至少经过一次重定向                                |
| status      | 整数，表示响应的 HTTP 状态码                                          |
| statusText  | 字符串，包含对 HTTP 状态码的正式描述。这个值派生自可选的 HTTP Reason-Phrase 字段，因此如果服务器以 Reason-Phrase 为由拒绝响应，这个字段可能是空字符串 |
| type        | 字符串，包含响应类型。可能是下列字符串值之一：                         |
|             | - basic：表示标准的同源响应                                           |
|             | - cors：表示标准的跨源响应                                            |
|             | - error：表示响应对象是通过 Response.error() 创建的                    |
|             | - opaque：表示 no-cors 的 fetch() 返回的跨源响应                      |
|             | - opaqueredirect：表示对 redirect 设置为 manual 的请求的响应          |
| url         | 包含响应 URL 的字符串。对于重定向响应，这是最终的 URL；非重定向响应则是它产生的 URL |

```js
//以下代码演示了返回 200、302、404 和 500 状态码的 URL 对应的响应：
fetch('//foo.com').then(console.log); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: true 
// redirected: false 
// status: 200 
// statusText: "OK" 
// type: "basic" 
// url: "https://foo.com/" 
// } 

fetch('//foo.com/redirect-me').then(console.log); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: true 
// redirected: true 加粗
// status: 200 
// statusText: "OK" 
// type: "basic" 
// url: "https://foo.com/redirected-url/"   加粗
// } 

fetch('//foo.com/does-not-exist').then(console.log); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: false  加粗
// redirected: true 
// status: 404   加粗
// statusText: "Not Found" 加粗
// type: "basic" 
// url: "https://foo.com/does-not-exist/" 
// } 

fetch('//foo.com/throws-error').then(console.log); 
// Response { 
// body: (...) 
// bodyUsed: false 
// headers: Headers {} 
// ok: false  加粗
// redirected: true 
// status: 500  加粗
// statusText: "Internal Server Error"  加粗
// type: "basic" 
// url: "https://foo.com/throws-error/" 
// } 
```

#### 克隆 Response 对象

```js
//克隆 Response 对象的主要方式是使用 clone()方法，这个方法会创建一个一模一样的副本，不会覆盖任何值。这样不会将任何请求的请求体标记为已使用：
let r1 = new Response('foobar'); 
let r2 = r1.clone(); 

console.log(r1.bodyUsed); // false 
console.log(r2.bodyUsed); // false 

// 如果响应对象的 bodyUsed 属性为 true（即响应体已被读取），则不能再创建这个对象的副本。在响应体被读取之后再克隆会导致抛出 TypeError。
let r = new Response('foobar'); 
r.clone(); 
// 没有错误
r.text(); // 设置 bodyUsed 为 true 
r.clone(); 
// TypeError: Failed to execute 'clone' on 'Response': Response body is already used 

// 有响应体的 Response 对象只能读取一次。（不包含响应体的 Response 对象不受此限制。）比如：
let r = new Response('foobar'); 
r.text().then(console.log); // foobar 
r.text().then(console.log); 
// TypeError: Failed to execute 'text' on 'Response': body stream is locked 

// 要多次读取包含响应体的同一个 Response 对象，必须在第一次读取前调用 clone()：
let r = new Response('foobar'); 
r.clone().text().then(console.log); // foobar 
r.clone().text().then(console.log); // foobar 
r.text().then(console.log); // foobar 

// 此外，通过创建带有原始响应体的 Response 实例，可以执行伪克隆操作。关键是这样不会把第一个 Response 实例标记为已读，而是会在两个响应之间共享：
let r1 = new Response('foobar'); 
let r2 = new Response(r1.body); 
console.log(r1.bodyUsed); // false 
console.log(r2.bodyUsed); // false 
r2.text().then(console.log); // foobar 
r1.text().then(console.log); 
// TypeError: Failed to execute 'text' on 'Response': body stream is locked
```

### Request、Response 及 Body 混入

```js
//Request 和 Response 都使用了 Fetch API 的 Body 混入，以实现两者承担有效载荷的能力。这个混入为两个类型提供了只读的 body 属性（实现为 ReadableStream）、只读的 bodyUsed 布尔值（表示 body 流是否已读）和一组方法，用于从流中读取内容并将结果转换为某种 JavaScript 对象类型。
// 通常，将 Request 和 Response 主体作为流来使用主要有两个原因。一个原因是有效载荷的大小可能会导致网络延迟，另一个原因是流 API 本身在处理有效载荷方面是有优势的。除此之外，最好是一次性获取资源主体。

// Body 混入提供了 5 个方法，用于将 ReadableStream 转存到缓冲区的内存里，将缓冲区转换为某种 JavaScript 对象类型，以及通过期约来产生结果。在解决之前，期约会等待主体流报告完成及缓冲被解析。这意味着客户端必须等待响应的资源完全加载才能访问其内容。
```

#### Body.text()

```js
//Body.text()方法返回期约，解决为将缓冲区转存得到的 UTF-8 格式字符串。下面的代码展示了在 Response 对象上使用 Body.text()：
fetch('https://foo.com') 
 .then((response) => response.text()) 
 .then(console.log); 
 //第一个 then 方法接受一个回调函数，这个函数会在 fetch 请求成功并收到响应时被调用。回调函数的参数是一个 Response 对象，代表从服务器接收到的响应。使用 response.text() 方法将响应体解析为纯文本。这个方法返回一个 Promise，其值为解析后的文本数据。    
 //第二个 then 方法接受一个回调函数，这个回调函数会在 response.text() 返回的 Promise 解析后被调用。回调函数的参数是解析后的文本数据。使用 console.log 将解析后的文本数据打印到控制台.
// <!doctype html><html lang="en"> 
// <head> 
// <meta charset="utf-8"> 
// ... 

// 以下代码展示了在 Request 对象上使用 Body.text()：
let request = new Request('https://foo.com', 
 { method: 'POST', body: 'barbazqux' }); 
 //Request 构造函数用于创建一个新的请求对象。第一个参数 'https://foo.com' 是请求的 URL。第二个参数是一个配置对象，其中：method: 'POST' 指定了请求方法为 POST。body: 'barbazqux' 指定了请求的请求体为 'barbazqux'。
request.text() 
 .then(console.log); 
 //request.text() 方法用于读取请求体，并将其解析为纯文本。它返回一个 Promise，其值为解析后的文本数据。then 方法接受一个回调函数，这个回调函数会在 request.text() 返回的 Promise 解析后被调用。使用 console.log 将解析后的文本数据打印到控制台。
// barbazqux 
```

#### Body.json()

```js
//Body.json()方法返回期约，解决为将缓冲区转存得到的 JSON。下面的代码展示了在 Response对象上使用 Body.json()：
fetch('https://foo.com/foo.json') 
 .then((response) => response.json()) 
 .then(console.log); 
 //第一个 then 方法接受一个回调函数，这个函数会在 fetch 请求成功并收到响应时被调用。回调函数的参数是一个 Response 对象，代表从服务器接收到的响应。使用 response.json() 方法将响应体解析为 JSON 格式。这个方法返回一个 Promise，其值为解析后的 JSON 数据。
 //第二个 then 方法接受一个回调函数，这个回调函数会在 response.json() 返回的 Promise 解析后被调用。回调函数的参数是解析后的 JSON 数据。使用 console.log 将解析后的 JSON 数据打印到控制台。
// {"foo": "bar"} 

// 以下代码展示了在 Request 对象上使用 Body.json()：
let request = new Request('https://foo.com', 
 { method:'POST', body: JSON.stringify({ bar: 'baz' }) }); 
 //Request 构造函数用于创建一个新的请求对象。第一个参数 'https://foo.com' 是请求的 URL。第二个参数是一个配置对象，其中：method: 'POST' 指定了请求方法为 POST。body: JSON.stringify({ bar: 'baz' }) 将对象 { bar: 'baz' } 转换为 JSON 字符串，并作为请求体发送。
request.json() 
 .then(console.log); 
 //request.json() 方法用于从 Request 对象中读取请求体，并将其解析为 JSON 格式。这个方法返回一个 Promise，其值为解析后的 JSON 数据。   then 方法接受一个回调函数，这个回调函数会在 request.json() 返回的 Promise 解析后被调用。    使用 console.log 将解析后的 JSON 数据打印到控制台。
// {bar: 'baz'} 
//tip:标准的 Request 对象并没有提供直接读取请求体并解析为 JSON 的方法。通常，json 方法用于 Response 对象而不是 Request 对象。因此，上述代码中的 request.json() 可能会导致错误。

let request = new Request('https://foo.com', 
  { method: 'POST', body: JSON.stringify({ bar: 'baz' }) });
let fetchRequest = fetch(request);
fetchRequest.then(response => {
  return response.json(); // 读取响应体并解析为 JSON
}).then(data => {
  console.log(data); // 处理解析后的 JSON 数据
}).catch(error => {
  console.error('Fetch error:', error); // 处理请求错误
});
```

#### Body.formData()

```js
//浏览器可以将 FormData 对象序列化/反序列化为主体。例如，下面这个 FormData 实例：
let myFormData = new FormData(); 
myFormData.append('foo', 'bar'); 
// 在通过 HTTP 传送时，WebKit 浏览器会将其序列化为下列内容：
------WebKitFormBoundarydR9Q2kOzE6nbN7eR 
Content-Disposition: form-data; name="foo" 
bar 
------WebKitFormBoundarydR9Q2kOzE6nbN7eR-- 

// Body.formData()方法返回期约，解决为将缓冲区转存得到的 FormData 实例。下面的代码展示了在 Response 对象上使用 Body.formData()：
fetch('https://foo.com/form-data') 
 .then((response) => response.formData()) 
 .then((formData) => console.log(formData.get('foo')); 
 //第一个 then 方法接受一个回调函数，这个函数会在 fetch 请求成功并收到响应时被调用。回调函数的参数是一个 Response 对象，代表从服务器接收到的响应。使用 response.formData() 方法将响应体解析为 FormData 对象。这个方法返回一个 Promise，其值为解析后的 FormData 对象。
 //第二个 then 方法接受一个回调函数，这个回调函数会在 response.formData() 返回的 Promise 解析后被调用。回调函数的参数是解析后的 FormData 对象。使用 formData.get('foo') 方法获取 FormData 对象中名为 'foo' 的字段值。使用 console.log 将字段值打印到控制台。
// bar 

// 以下代码展示了在 Request 对象上使用 Body.formData()：
let myFormData = new FormData(); 
myFormData.append('foo', 'bar'); 
let request = new Request('https://foo.com', 
 { method:'POST', body: myFormData }); 
request.formData() 
 .then((formData) => console.log(formData.get('foo')); 
 //request.formData() 方法用于从 Request 对象中读取请求体，并将其解析为 FormData 对象。这个方法返回一个 Promise，其值为解析后的 FormData 对象。then 方法接受一个回调函数，这个回调函数会在 request.formData() 返回的 Promise 解析后被调用。使用 formData.get('foo') 方法获取 FormData 对象中名为 'foo' 的字段值。使用 console.log 将字段值打印到控制台。
// bar 
```

#### Body.arrayBuffer()

```js
//有时候，可能需要以原始二进制格式查看和修改主体。为此，可以使用 Body.arrayBuffer()将主体内容转换为 ArrayBuffer 实例。Body.arrayBuffer()方法返回期约，解决为将缓冲区转存得到的 ArrayBuffer 实例。下面的代码展示了在 Response 对象上使用 Body.arrayBuffer()：
fetch('https://foo.com') 
 .then((response) => response.arrayBuffer()) 
 .then(console.log); 
 //第一个 then 方法接受一个回调函数，这个函数会在 fetch 请求成功并收到响应时被调用。回调函数的参数是一个 Response 对象，代表从服务器接收到的响应。使用 response.arrayBuffer() 方法将响应体解析为 ArrayBuffer 对象。这个方法返回一个 Promise，其值为解析后的 ArrayBuffer 对象。
 //第二个 then 方法接受一个回调函数，这个回调函数会在 response.arrayBuffer() 返回的 Promise 解析后被调用。    回调函数直接将解析后的 ArrayBuffer 对象打印到控制台。
// ArrayBuffer(...) {} 
//tip:ArrayBuffer 的用途.ArrayBuffer 是一种通用的、固定长度的二进制数据缓冲区。它常用于处理原始二进制数据，特别是在 Web API 中，如 File API 和 WebSocket。你可以使用 DataView 或类型化数组（如 Uint8Array, Float32Array 等）来读取和操作 ArrayBuffer 的内容。

// 以下代码展示了在 Request 对象上使用 Body.arrayBuffer()：
let request = new Request('https://foo.com', 
 { method:'POST', body: 'abcdefg' }); 

// 以整数形式打印二进制编码的字符串
request.arrayBuffer() 
 .then((buf) => console.log(new Int8Array(buf))); 
// Int8Array(7) [97, 98, 99, 100, 101, 102, 103] 
```

#### Body.blob()

```js
//有时候，可能需要以原始二进制格式使用主体，不用查看和修改。为此，可以使用 Body.blob()将主体内容转换为 Blob 实例。Body.blob()方法返回期约，解决为将缓冲区转存得到的 Blob 实例。( blob是 "Binary Large Object" 的缩写。BLOB 是一种存储大量二进制数据的数据库对象。它可以用于存储各种类型的文件和数据，包括图像、音频、视频、文档等。BLOB 类型的字段通常用于存储大小较大且不容易用文本表示的数据。)
// 下面的代码展示了在 Response 对象上使用 Body.blob()：
fetch('https://foo.com') 
 .then((response) => response.blob()) 
 .then(console.log); 
// Blob(...) {size:..., type: "..."}

// 以下代码展示了在 Request 对象上使用 Body.blob()：
let request = new Request('https://foo.com', 
 { method:'POST', body: 'abcdefg' }); 
request.blob() 
 .then(console.log); 
// Blob(7) {size: 7, type: "text/plain;charset=utf-8"} 
```

#### 一次性流

```js
//Single-Use Streams
//因为 Body 混入是构建在 ReadableStream 之上的，所以主体流只能使用一次。这意味着所有主体混入方法都只能调用一次，再次调用就会抛出错误。 就是说request\respond后不能再re了
fetch('https://foo.com') 
 .then((response) => response.blob().then(() => response.blob())); 
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked 

let request = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
request.blob().then(() => request.blob()); 
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked 

// 即使是在读取流的过程中，所有这些方法也会在它们被调用时给 ReadableStream 加锁，以阻止其他读取器访问：
fetch('https://foo.com') 
 .then((response) => { 
 response.blob(); // 第一次调用给流加锁
 response.blob(); // 第二次调用再次加锁会失败
 }); 
// TypeError: Failed to execute 'blob' on 'Response': body stream is locked 
let request = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
request.blob(); // 第一次调用给流加锁
request.blob(); // 第二次调用再次加锁会失败
// TypeError: Failed to execute 'blob' on 'Request': body stream is locked 

// 作为 Body 混入的一部分，bodyUsed 布尔值属性表示 ReadableStream 是否已摄受（disturbed），
// 意思是读取器是否已经在流上加了锁。这不一定表示流已经被完全读取。As part of the Body mixin, a bodyUsed Boolean property indicates if the ReadableStream is disturbed, meaning a reader has already placed a lock on the stream. This doesn’t necessarily indicate that the stream is fully drained. 下面的代码演示了这个属性：
let request = new Request('https://foo.com', 
 { method: 'POST', body: 'foobar' }); 
let response = new Response('foobar'); 
console.log(request.bodyUsed); // false 
console.log(response.bodyUsed); // false 
request.text().then(console.log); // foobar 
response.text().then(console.log); // foobar 
console.log(request.bodyUsed); // true 
console.log(response.bodyUsed); // true 
```

#### 使用 ReadableStream 主体

```js
//Using a ReadableStream Body
//JavaScript 编程逻辑很多时候会将访问网络作为原子操作，比如请求是同时创建和发送的，响应数据也是以统一的格式一次性暴露出来的。这种约定隐藏了底层的混乱，让涉及网络的代码变得很清晰。
// 从 TCP/IP 角度来看，传输的数据是以分块形式抵达端点的，而且速度受到网速的限制。接收端点会为此分配内存，并将收到的块写入内存。Fetch API 通过 ReadableStream 支持在这些块到达时就实时读取和操作这些数据。
// 注意:本节会以获取 Fetch API 规范的 HTML 为例。这个页面差不多有 1MB 大小，足以让示例中接收的数据分成多个块。

// 正如Stream API所定义的，ReadableStream暴露了getReader()方法，用于产生ReadableStreamDefaultReader，这个读取器可以用于在数据到达时异步获取数据块。数据流的格式是 Uint8Array。
// 下面的代码调用了读取器的 read()方法，把最早可用的块打印了出来：  展示了如何使用 Fetch API 读取响应体并创建一个 ReadableStreamDefaultReader，然后读取响应体的内容:
fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
 .then((body) => { 
 let reader = body.getReader();//获取 Response 对象的 body 属性，它是一个 ReadableStream 对象。
 console.log(reader); // ReadableStreamDefaultReader {}  调用 body.getReader() 获取一个 ReadableStreamDefaultReader 对象，用于读取流中的数据。 
 reader.read() 
 .then(console.log); //调用 reader.read() 方法读取流中的数据。   read() 方法返回一个 Promise，解析后的值是一个对象，包含两个属性：value：一个 Uint8Array，表示读取到的数据块。done：一个布尔值，表示流是否已被读取完毕。将读取到的结果打印到控制台。
 }); 
// { value: Uint8Array{}, done: false } 
//读取响应体的内容,什么意思???如何应用的???

// 在随着数据流的到来取得整个有效载荷，可以像下面这样递归调用 read()方法：展示了如何使用 Fetch API 逐块读取响应体的数据流，并处理每一块数据:
fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
 .then((body) => { 
 let reader = body.getReader(); //调用 body.getReader() 获取一个 ReadableStreamDefaultReader 对象，用于读取流中的数据。

 function processNextChunk({value, done}) { 
 if (done) { 
 return; 
 } 
 console.log(value); 
 return reader.read() 
 .then(processNextChunk); 
 //processNextChunk 函数接收一个对象作为参数，该对象包含两个属性：
 //value：一个 Uint8Array，表示读取到的数据块。
 //done：一个布尔值，表示流是否已被读取完毕。
 //如果 done 为 true，表示所有数据都已读取完毕，函数返回。
 //否则，打印当前读取到的数据块 value，并递归调用 reader.read() 继续读取下一块数据。
 } 

 return reader.read() 
 .then(processNextChunk); //调用 reader.read() 方法读取第一块数据，并将读取到的数据传递给 processNextChunk 函数处理。

 }); 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// ... 

// 异步函数非常适合这样的 fetch()操作。可以通过使用 async/await 将上面的递归调用打平：展示了如何使用 Fetch API 逐块读取响应体的数据流，并处理每一块数据:
fetch('https://fetch.spec.whatwg.org/')  
 //获取 Response 对象的 body 属性，它是一个 ReadableStream 对象。
 //使用 async 函数处理读取响应体流的过 程。
 .then((response) => response.body) 
 .then(async function(body) { 
 let reader = body.getReader(); 
 //调用 body.getReader() 获取一个 ReadableStreamDefaultReader 对象，用于读取流中的数据。
 while(true) { 
 let { value, done } = await reader.read(); 
 if (done) { 
 break; 
 } 
 console.log(value); 
 } 
 //进入一个无限循环，以便逐块读取数据。使用 await reader.read() 读取下一块数据，这个方法返回一个包含 value 和 done 属性的对象。value 是一个 Uint8Array，表示读取到的数据块。done 是一个布尔值，表示流是否已被读取完毕。如果 done 为 true，表示所有数据都已读取完毕，退出循环。否则，打印当前读取到的数据块 value，并继续读取下一块数据。
 }); 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// ... 

// 另外，read()方法也可以真接封装到 Iterable 接口中。因此就可以在 for-await-of 循环中方便地实现这种转换： 使用 Fetch API 和异步迭代器逐块读取响应体的数据流:
fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
 .then(async function(body) { 
 let reader = body.getReader(); 

 let asyncIterable = { 
 [Symbol.asyncIterator]() { 
 return { 
 next() { 
 return reader.read(); 
 } 
 }; 
 } 
 }; //创建一个异步可迭代对象 asyncIterable，它实现了 Symbol.asyncIterator 方法。    Symbol.asyncIterator 方法返回一个对象，该对象实现了 next 方法，next 方法调用 reader.read() 读取下一块数据。

 for await (chunk of asyncIterable) { 
 console.log(chunk); //使用 for await...of 循环遍历 asyncIterable，逐块读取数据。每次循环，chunk 是一个包含 value 和 done 属性的对象：value 是一个 Uint8Array，表示读取到的数据块。done 是一个布尔值，表示流是否已被读取完毕。   打印读取到的 chunk。
 } 
 }); 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// { value: Uint8Array{}, done: false } 
// ... 

// 通过将异步逻辑包装到一个生成器函数中，还可以进一步简化代码。而且，这个实现通过支持只读取部分流也变得更稳健。如果流因为耗尽或错误而终止，读取器会释放锁，以允许不同的流读取器继续操作：使用了异步生成器来逐块读取响应体数据流:
async function* streamGenerator(stream) { 
 const reader = stream.getReader();

 try { 
 while (true) { 
 const { value, done } = await reader.read(); 
 if (done) { 
 break; 
 } 
 yield value; 
 } 
 } 
 
 finally { 
 reader.releaseLock(); 
  //定义一个异步生成器函数 streamGenerator，它接收一个 ReadableStream 对象作为参数。  调用 stream.getReader() 获取一个 ReadableStreamDefaultReader 对象，用于读取流中的数据。
  //在 try 块中：使用 while (true) 循环，不断读取数据。使用 await reader.read() 读取下一块数据，返回一个包含 value 和 done 属性的对象。如果 done 为 true，表示流已读取完毕，退出循环。使用 yield 关键字返回读取到的数据块 value。在 finally 块中：调用 reader.releaseLock() 释放锁定的读取器，以便其他读取器可以使用该流。
 } 
} 

fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
 .then(async function(body) { 
 for await (chunk of streamGenerator(body)) { 
 console.log(chunk); 
  //使用 fetch 函数发起一个 GET 请求，目标 URL 是 'https://fetch.spec.whatwg.org/'。   fetch 返回一个 Promise，解析后的值是一个 Response 对象。   获取 Response 对象的 body 属性，它是一个 ReadableStream 对象。   使用 async 函数处理读取响应体流的过程。  使用 for await...of 循环遍历 streamGenerator 返回的异步可迭代对象，逐块读取数据。  在循环中，打印每个读取到的数据块 chunk。
 } 
 }); 
```

```js
//在这些例子中，当读取完 Uint8Array 块之后，浏览器会将其标记为可以被垃圾回收。对于需要在不连续的内存中连续检查大量数据的情况，这样可以节省很多内存空间。
// 缓冲区的大小，以及浏览器是否等待缓冲区被填充后才将其推到流中，要根据 JavaScript 运行时的实现。浏览器会控制等待分配的缓冲区被填满，同时会尽快将缓冲区数据（有时候可能未填充数据）发送到流。
// 不同浏览器中分块大小可能不同，这取决于带宽和网络延迟。此外，浏览器如果决定不等待网络，也可以将部分填充的缓冲区发送到流。最终，我们的代码要准备好处理以下情况：

//  不同大小的 Uint8Array 块；
//  部分填充的 Uint8Array 块；
//  块到达的时间间隔不确定。

// 默认情况下，块是以 Uint8Array 格式抵达的。因为块的分割不会考虑编码，所以会出现某些值作为多字节字符被分散到两个连续块中的情况。手动处理这些情况是很麻烦的，但很多时候可以使用Encoding API 的可插拔方案。

// 要将 Uint8Array 转换为可读文本，可以将缓冲区传给 TextDecoder，返回转换后的值。通过设置 stream: true，可以将之前的缓冲区保留在内存，从而让跨越两个块的内容能够被正确解码：使用 TextDecoder 将流中的二进制数据解码为文本，然后将解码后的文本逐块打印出来:
let decoder = new TextDecoder(); //TextDecoder 用于将 Uint8Array 或 ArrayBuffer 类型的二进制数据解码为字符串
async function* streamGenerator(stream) { 
 const reader = stream.getReader(); 
 try { 
 while (true) { 
 const { value, done } = await reader.read(); 
 if (done) { 
 break; 
 } 
 yield value; 
 } 
 } finally { 
 reader.releaseLock(); 
 //streamGenerator 接收一个 ReadableStream 对象并返回一个异步生成器。
 //使用 getReader() 获取读取器。
 //在 while (true) 循环中异步读取数据块，直到 done 为 true。
 //使用 yield 返回读取到的每个数据块
 } 
} 

fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
 .then(async function(body) { 
 for await (chunk of streamGenerator(body)) { 
 console.log(decoder.decode(chunk, { stream: true })); 
 } 
 //使用 fetch 发起请求获取数据流。
 //获取响应体的 body 属性，即 ReadableStream 对象。
 //使用 for await...of 循环遍历 streamGenerator 返回的异步可迭代对象。
 //使用 decoder.decode(chunk, { stream: true }) 解码每个数据块为字符串，并打印解码后的字符串。
 }); 
// <!doctype html><html lang="en"> ... 
// whether a <a data-link-type="dfn" href="#concept-header" ... 
// result to <var>rangeValue</var>. ... 
// ... 
```

```js
//因为可以使用 ReadableStream 创建 Response 对象，所以就可以在读取流之后，将其通过管道导入另一个流。然后在这个新流上再使用 Body 的方法，如 text()。这样就可以随着流的到达实时检查和操作流内容。下面的代码展示了这种双流技术：    使用 ReadableStream 创建一个新的流来处理从 fetch 请求中获取的响应体数据，然后将其内容转换为文本并打印出来:
fetch('https://fetch.spec.whatwg.org/') 
 .then((response) => response.body) 
   //使用 fetch 请求获取数据流。提取响应体的 body 属性，它是一个 ReadableStream。
 .then((body) => { 
 const reader = body.getReader();//调用 body.getReader() 获取 ReadableStreamDefaultReader 对象来读取数据流

 // 创建第二个流
 return new ReadableStream({ 
 async start(controller) { 
 try { 
 while (true) { 
 const { value, done } = await reader.read(); 
 if (done) { 
 break; 
 } 
 // 将主体流的块推到第二个流
 controller.enqueue(value); 
 } 
 } finally { 
 controller.close(); 
 reader.releaseLock(); 
 } 
  //定义一个新的 ReadableStream 对象。
  //使用 start(controller) 方法初始化新的流。
  //在 start 方法中，读取原始流的内容，并将每个数据块 enqueue 到新的流中。
  //当所有数据块读取完成后，调用 controller.close() 关闭新的流，并释放原始流的读取器锁。
 } 
 }) 
 }) 

 .then((secondaryStream) => new Response(secondaryStream)) 
   //将创建的 ReadableStream 传递给 Response 构造函数，创建一个新的 Response 对象
 .then(response => response.text()) 
 .then(console.log); 
   //调用新的 Response 对象的 text() 方法，将其内容转换为字符串。
   //打印转换后的文本内容。
// <!doctype html><html lang="en"><head><meta charset="utf-8"> ...
```

## Beacon API

```js
//为了把尽量多的页面信息传到服务器，很多分析工具需要在页面生命周期中尽量晚的时候向服务器发送遥测或分析数据。因此，理想的情况下是通过浏览器的 unload 事件发送网络请求。这个事件表示用户要离开当前页面，不会再生成别的有用信息了This event signals that a page departure is occurring and that no more useful information will be generated on that page.。
// 在 unload 事件触发时，分析工具要停止收集信息并把收集到的数据发给服务器。这时候有一个问题，因为 unload 事件对浏览器意味着没有理由再发送任何结果未知的网络请求（因为页面都要被销毁了）。
// 例如，在 unload 事件处理程序中创建的任何异步请求都会被浏览器取消。为此，异步 XMLHttpRequest或 fetch()不适合这个任务。分析工具可以使用同步 XMLHttpRequest 强制发送请求，但这样做会导致用户体验问题。浏览器会因为要等待 unload 事件处理程序完成而延迟导航到下一个页面。
// 为解决这个问题，W3C 引入了补充性的 Beacon API。这个 API 给 navigator 对象增加了一个sendBeacon()方法。这个简单的方法接收一个 URL 和一个数据有效载荷参数，并会发送一个 POST请求。可选的数据有效载荷参数有 ArrayBufferView、Blob、DOMString、FormData 实例。如果请求成功进入了最终要发送的任务队列，则这个方法返回 true，否则返回 false。
// 可以像下面这样使用这个方法：
// 发送 POST 请求
// URL: 'https://example.com/analytics-reporting-url' 
// 请求负载：'{foo: "bar"}' 
navigator.sendBeacon('https://example.com/analytics-reporting-url', '{foo: "bar"}'); 
// 这个方法虽然看起来只不过是 POST 请求的一个语法糖，但它有几个重要的特性。

//  sendBeacon()并不是只能在页面生命周期末尾使用，而是任何时候都可以使用。
//  调用 sendBeacon()后，浏览器会把请求添加到一个内部的请求队列。浏览器会主动地发送队列中的请求。
//  浏览器保证在原始页面已经关闭的情况下也会发送请求。
//  状态码、超时和其他网络原因造成的失败完全是不透明的，不能通过编程方式处理。
//  信标（beacon）请求会携带调用 sendBeacon()时所有相关的 cookie。
```

## Web Socket

Web Socket（套接字）的目标是通过一个长时连接实现与服务器全双工、双向的通信。在 JavaScript中创建 Web Socket 时，一个 HTTP 请求会发送到服务器以初始化连接。服务器响应后，连接使用 HTTP的 Upgrade 头部从 HTTP 协议切换到 Web Socket 协议。这意味着 Web Socket 不能通过标准 HTTP 服务器实现，而必须使用支持该协议的专有服务器。
因为 Web Socket使用了自定义协议，所以 URL方案（scheme）稍有变化：不能再使用``<http://或> https://``，而要使用 ``ws://和 wss://``。前者是不安全的连接，后者是安全连接。在指定 Web Socket URL 时，必须包含 URL 方案，因为将来有可能再支持其他方案。
使用自定义协议而非 HTTP 协议的好处是，客户端与服务器之间可以发送非常少的数据，不会对HTTP 造成任何负担。使用更小的数据包让 Web Socket 非常适合带宽和延迟问题比较明显的移动应用。
使用自定义协议的缺点是，定义协议的时间比定义 JavaScript API 要长。Web Socket 得到了所有主流浏览器支持

### API

```js
//要创建一个新的 Web Socket，就要实例化一个 WebSocket 对象并传入提供连接的 URL：
let socket = new WebSocket("ws://www.example.com/server.php"); 
// 注意，必须给 WebSocket 构造函数传入一个绝对 URL。同源策略不适用于 Web Socket，因此可以打开到任意站点的连接。至于是否与来自特定源的页面通信，则完全取决于服务器。（在握手阶段就可以确定请求来自哪里。）
// 浏览器会在初始化 WebSocket 对象之后立即创建连接。与 XHR 类似，WebSocket 也有一个readyState 属性表示当前状态。不过，这个值与 XHR 中相应的值不一样。

//  WebSocket.OPENING（0）：连接正在建立。
//  WebSocket.OPEN（1）：连接已经建立。
//  WebSocket.CLOSING（2）：连接正在关闭。
//  WebSocket.CLOSE（3）：连接已经关闭。
// WebSocket 对象没有 readystatechange 事件，而是有与上述不同状态对应的其他事件。
// readyState 值从 0 开始。

// 任何时候都可以调用 close()方法关闭 Web Socket 连接：
// socket.close(); 
// 调用 close()之后，readyState 立即变为 2（连接正在关闭），并会在关闭后变为 3（连接已经关闭）。
```

### 发送和接收数据

```js
//打开 Web Socket 之后，可以通过连接发送和接收数据。要向服务器发送数据，使用 send()方法并传入一个字符串、ArrayBuffer 或 Blob，如下所示：  如何使用 WebSocket 对象与服务器建立连接，并发送不同类型的数据（字符串、ArrayBuffer 和 Blob）:
let socket = new WebSocket("ws://www.example.com/server.php"); //创建一个新的 WebSocket 对象，连接到指定的 WebSocket 服务器 URL。
let stringData = "Hello world!"; 
let arrayBufferData = Uint8Array.from(['f', 'o', 'o']); 
let blobData = new Blob(['f', 'o', 'o']); 
//stringData：定义一个字符串数据。arrayBufferData：使用 Uint8Array 创建一个包含字符 'f', 'o', 'o' 的数组，然后转换为 ArrayBuffer。   blobData：使用 Blob 创建一个包含字符 'f', 'o', 'o' 的 Blob 对象。
socket.send(stringData); 
socket.send(arrayBufferData.buffer); 
socket.send(blobData);
//socket.send(stringData)：发送字符串数据。
//socket.send(arrayBufferData.buffer)：发送 ArrayBuffer 数据。
//socket.send(blobData)：发送 Blob 数据。 

// 服务器向客户端发送消息时，WebSocket 对象上会触发 message 事件。这个 message 事件与其他消息协议类似，可以通过 event.data 属性访问到有效载荷：
socket.onmessage = function(event) { 
 let data = event.data; 
 // 对数据执行某些操作
}; 
// 与通过 send()方法发送的数据类似，event.data 返回的数据也可能是 ArrayBuffer 或 Blob。
// 这由 WebSocket 对象的 binaryType 属性决定，该属性可能是"blob"或"arraybuffer"。
```

### 其他事件

WebSocket 对象在连接生命周期中有可能触发 3 个其他事件。

```js
//  open：在连接成功建立时触发。
//  error：在发生错误时触发。连接无法存续。
//  close：在连接关闭时触发。
// WebSocket 对象不支持 DOM Level 2 事件监听器，因此需要使用 DOM Level 0 风格的事件处理程序来监听这些事件：
let socket = new WebSocket("ws://www.example.com/server.php"); //创建一个新的 WebSocket 对象，连接到指定的 WebSocket 服务器 URL
socket.onopen = function() { 
 alert("Connection established."); 
}; //当 WebSocket 连接成功建立时，会触发 onopen 事件处理函数，弹出一个提示框显示“Connection established.”。
socket.onerror = function() { 
 alert("Connection error."); 
}; //当 WebSocket 连接出现错误时，会触发 onerror 事件处理函数，弹出一个提示框显示“Connection error.”
socket.onclose = function() { 
 alert("Connection closed."); 
}; //当 WebSocket 连接关闭时，会触发 onclose 事件处理函数，弹出一个提示框显示“Connection closed.”。

// 在这些事件中，只有 close 事件的 event 对象上有额外信息。这个对象上有 3 个额外属性：
// wasClean、code 和 reason。其中，

// wasClean 是一个布尔值，表示连接是否干净地关闭；

// code 是一个来自服务器的数值状态码；

// reason 是一个字符串，包含服务器发来的消息。

// 可以将这些信息显示给用户或记录到日志：如何在 WebSocket 连接关闭时处理 onclose 事件，并获取有关关闭事件的详细信息:
socket.onclose = function(event) { 
 console.log(`as clean? ${event.wasClean} Code=${event.code} Reason=${ 
 event.reason}`); 
}; 
//Was clean? true Code=1000 Reason=
//或者Was clean? false Code=1006 Reason=Server failure
```

## 安全

```js
//探讨 Ajax 安全的文章已经有了很多，事实上也出版了很多专门讨论这个话题的书。大规模 Ajax 应用程序需要考虑的安全问题非常多，但在通用层面上一般需要考虑以下几个问题。
// 首先，任何 Ajax 可以访问的 URL，也可以通过浏览器或服务器访问，例如下面这个 URL：
/getuserinfo.php?id=23 
// 请求这个 URL，可以假定返回 ID 为 23 的用户信息。访问者可以将 23 改为 24 或 56，甚至其他任何值。getuserinfo.php 文件必须知道访问者是否拥有访问相应数据的权限。否则，服务器就会大门敞开，泄露所有用户的信息。
// 在未授权系统可以访问某个资源时，可以将其视为跨站点请求伪造（CSRF，cross-site request forgery）攻击。未授权系统会按照处理请求的服务器的要求伪装自己。Ajax 应用程序，无论大小，都会受到 CSRF攻击的影响，包括无害的漏洞验证攻击和恶意的数据盗窃或数据破坏攻击。
// 关于安全防护 Ajax 相关 URL 的一般理论认为，需要验证请求发送者拥有对资源的访问权限。可以通过如下方式实现。
//  要求通过 SSL 访问能够被 Ajax 访问的资源。
//  要求每个请求都发送一个按约定算法计算好的令牌（token）。

// 注意，以下手段对防护 CSRF 攻击是无效的。
//  要求 POST 而非 GET 请求（很容易修改请求方法）。
//  使用来源 URL 验证来源（来源 URL 很容易伪造）。
//  基于 cookie 验证（同样很容易伪造）。
```

## 小结

Ajax 是无须刷新当前页面即可从服务器获取数据的一个方法，具有如下特点。

 让 Ajax 迅速流行的中心对象是 XMLHttpRequest（XHR）。

 这个对象最早由微软发明，并在 IE5 中作为通过 JavaScript 从服务器获取 XML 数据的一种手段。

 之后，Firefox、Safari、Chrome 和 Opera 都复刻了相同的实现。W3C 随后将 XHR 行为写入 Web标准。

 虽然不同浏览器的实现有些差异，但 XHR 对象的基本使用在所有浏览器中相对是规范的，因此可以放心地在 Web 应用程序中使用。

XHR 的一个主要限制是同源策略，即通信只能在相同域名、相同端口和相同协议的前提下完成。

访问超出这些限制之外的资源会导致安全错误，除非使用了正式的跨域方案。这个方案叫作跨源资源共享（CORS，Cross-Origin Resource Sharing），XHR 对象原生支持 CORS。图片探测和 JSONP 是另外两种跨域通信技术，但没有 CORS 可靠。

Fetch API 是作为对 XHR 对象的一种端到端的替代方案而提出的。这个 API 提供了优秀的基于期约的结构、更直观的接口，以及对 Stream API 的最好支持。

Web Socket 是与服务器的全双工、双向通信渠道。与其他方案不同，Web Socket 不使用 HTTP，而使用了自定义协议，目的是更快地发送小数据块。这需要专用的服务器，但速度优势明显。
