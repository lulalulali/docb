# Workers

深入介绍专用工作者线程、共享工作者线程和服务工作者线程。其中包括工作者线程在操作系统和浏览器层面的实现，以及使用各种工作者线程的最佳策略.

 工作者线程简介➤ Introduction to workers

 使用专门的工作者线程执行后台任务➤ Running background tasks with dedicated workers

 使用共享的工作者线程➤ Using with shared workers

 通过服务工作者线程管理请求➤ Managing requests with service workers

前端开发者常说：“JavaScript 是单线程的。”这种说法虽然有些简单，但描述了 JavaScript 在浏览器中的一般行为。因此，作为帮助 Web 开发人员理解 JavaScript 的教学工具，它非常有用The statement “JavaScript is single-threaded” is practically a mantra for the frontend development community. This assertion, although it makes some simplifying assumptions, effectively describes how the JavaScript environment generally behaves inside a browser. Therefore, it is useful as a pedagogical tool for helping web developers understand JavaScript.。

单线程就意味着不能像多线程语言那样把工作委托给独立的线程或进程去做。JavaScript 的单线程可以保证它与不同浏览器 API 兼容。假如 JavaScript 可以多线程执行并发更改，那么像 DOM 这样的 API就会出现问题。因此，POSIX 线程或 Java 的 Thread 类等传统并发结构都不适合 JavaScriptThis single-threaded paradigm is inherently restrictive as it prevents programming patterns that are otherwise feasible in languages capable of delegating work to separate threads or processes. JavaScript is bound to this single-threaded paradigm to preserve compatibility with the various browser APIs that it must interact with. Constructs such as the Document Object Model would encounter problems if subjected to concurrent mutations via multiple JavaScript threads. Therefore, traditional concurrency constructs such as POSIX threads or Java’s Thread class are non-starters for augmenting JavaScript.。

而这也正是工作者线程的价值所在：允许把主线程的工作转嫁给独立的实体，而不会改变现有的单线程模型。虽然本章要介绍的各种工作者线程有不同的形式和功能，

!!!但它们的共同的特点是都独立于JavaScript 的主执行环境!!!.Therein lies the core value proposition of workers: Allow the primary execution thread to delegate work to a separate entity without changing the existing single-threaded model. Although the various worker types covered in this chapter all have different forms and functions, they are unified in their separation from the primary JavaScript environment.。

## 工作者线程简介

JavaScript 环境实际上是运行在托管操作系统中的虚拟环境。在浏览器中每打开一个页面，就会分配一个它自己的环境。这样，每个页面都有自己的内存、事件循环、DOM，等等。每个页面就相当于一个沙盒，不会干扰其他页面。对于浏览器来说，同时管理多个环境是非常简单的，因为所有这些环境都是并行执行的。

使用工作者线程，浏览器可以在原始页面环境之外再分配一个完全独立的二级子环境。这个子环境不能与依赖单线程交互的 API（如 DOM）互操作，但可以与父环境并行执行代码。

### 工作者线程与线程

Comparing Workers and Threads
作为介绍，通常需要将工作者线程与执行线程进行比较。在许多方面，这是一个恰当的比较，因为工作者线程和线程确实有很多共同之处。
 工作者线程是以实际线程实现的。例如，Blink 浏览器引擎实现工作者线程的 WorkerThread 就对应着底层的线程。
 工作者线程并行执行。虽然页面和工作者线程都是单线程 JavaScript 环境，每个环境中的指令则可以并行执行。

 工作者线程可以共享某些内存。工作者线程能够使用 SharedArrayBuffer 在多个环境间共享内容。虽然线程会使用锁实现并发控制，但 JavaScript 使用 Atomics 接口实现并发控制。工作者线程与线程有很多类似之处，但也有重要的区别。
 工作者线程不共享全部内存。在传统线程模型中，多线程有能力读写共享内存空间。除了 SharedArrayBuffer 外，从工作者线程进出的数据需要复制或转移。

 工作者线程不一定在同一个进程里。通常，一个进程可以在内部产生多个线程。根据浏览器引擎的实现，工作者线程可能与页面属于同一进程，也可能不属于。例如，Chrome 的 Blink 引擎对共享工作者线程和服务工作者线程使用独立的进程。
 创建工作者线程的开销更大。工作者线程有自己独立的事件循环、全局对象、事件处理程序和其他 JavaScript 环境必需的特性。创建这些结构的代价不容忽视.

无论形式还是功能，工作者线程都不是用于替代线程的。HTML Web 工作者线程规范是这样说的：工作者线程相对比较重，不建议大量使用。例如，对一张 400 万像素的图片，为每个像素都启动一个工作者线程是不合适的。通常，工作者线程应该是长期运行的，启动成本比较高，每个实例占用的内存也比较大。

### 工作者线程的类型

Types of Workers
Web 工作者线程规范中定义了三种主要的工作者线程：专用工作者线程、共享工作者线程和服务工作者线程。现代浏览器都支持这些工作者线程。

注意:Web 工作者线程规范参见 HTML Standard 网站。

1. 专用工作者线程Dedicated Web Worker
专用工作者线程，通常简称为工作者线程、Web Worker 或 Worker，是一种实用的工具，可以让脚本单独创建一个 JavaScript 线程，以执行委托的任务。专用工作者线程，顾名思义，只能被创建它的页面使用。

2. 共享工作者线程Shared Web Worker
共享工作者线程与专用工作者线程非常相似。主要区别是共享工作者线程可以被多个不同的上下文使用，包括不同的页面。任何与创建共享工作者线程的脚本同源的脚本，都可以向共享工作者线程发送消息或从中接收消息。

3. 服务工作者线程Service Worker
服务工作者线程与专用工作者线程和共享工作者线程截然不同。它的主要用途是拦截、重定向和修改页面发出的请求，充当网络请求的仲裁者的角色。

注意:还有其他一些工作者线程规范，比如 ChromeWorker 或 Web Audio API，但它们并未得到广泛支持，或者定位于小众应用程序，因此本书没有包含与之相关的内容。

### WorkerGlobalScope

在网页上，window 对象可以向运行在其中的脚本暴露各种全局变量。在工作者线程内部，没有 window的概念。这里的全局对象是 WorkerGlobalScope 的实例，通过 self 关键字暴露出来。

1. WorkerGlobalScope 属性和方法WorkerGlobalScope Properties and Methods
self 上可用的属性是 window 对象上属性的严格子集。其中有些属性会返回特定于工作者线程的版本。
 navigator：返回与工作者线程关联的 WorkerNavigator。
 self：返回 WorkerGlobalScope 对象。
 location：返回与工作者线程关联的 WorkerLocation。
 performance：返回（只包含特定属性和方法的）Performance 对象。
 console：返回与工作者线程关联的 Console 对象；对 API 没有限制。
 caches：返回与工作者线程关联的 CacheStorage 对象；对 API 没有限制。
 indexedDB：返回 IDBFactory 对象。
 isSecureContext：返回布尔值，表示工作者线程上下文是否安全。
 origin：返回 WorkerGlobalScope 的源。

类似地，self 对象上暴露的一些方法也是 window 上方法的子集。这些 self 上的方法也与 window上对应的方法操作一样。
 atob()
 btoa()
 clearInterval()
 clearTimeout()
 createImageBitmap()
 fetch()
 setInterval()
 setTimeout()
WorkerGlobalScope 还增加了新的全局方法 importScripts()，只在工作者线程内可用。本章稍后会介绍该方法。

2.WorkerGlobalScope 的子类Subclasses of WorkerGlobalScope
实际上并不是所有地方都实现了 WorkerGlobalScope。每种类型的工作者线程都使用了自己特定
的全局对象，这继承自 WorkerGlobalScope。
 专用工作者线程使用 DedicatedWorkerGlobalScope。
 共享工作者线程使用 SharedWorkerGlobalScope。
 服务工作者线程使用 ServiceWorkerGlobalScope。
本章稍后会在这些全局对象对应的小节中讨论其差异。

## 专用工作者线程

专用工作者线程是最简单的 Web 工作者线程，网页中的脚本可以创建专用工作者线程来执行在页面线程之外的其他任务。   这样的线程可以与父页面交换信息、发送网络请求、执行文件输入/输出、进行密集计算、处理大量数据，以及实现其他不适合在页面执行线程里做的任务（否则会导致页面响应迟钝）A dedicated worker is the simplest type of web worker. Dedicated workers are created by a web page to execute scripts outside the page’s thread of execution. These workers are capable of exchanging information with the parent page, sending network requests, performing file I/O, executing intense computation, processing data in bulk, or any other number of computational tasks that are unsuited for the page execution thread (where they would introduce latency issues)。

注意:在使用工作者线程时，脚本在哪里执行、在哪里加载是非常重要的概念。除非另有
说明，否则本章假定 main.js 是从 ``https://example.com`` 域的根路径加载并执行的顶级脚本。

### 专用工作者线程的基本概念

Dedicated Worker Basics
可以把专用工作者线程称为后台脚本（background script）。JavaScript 线程的各个方面，包括生命周期管理、代码路径和输入/输出，都由初始化线程时提供的脚本来控制。该脚本也可以再请求其他脚本，但一个线程总是从一个脚本源开始。

```js
//1. 创建专用工作者线程Creating a Dedicated Worker
创建专用工作者线程最常见的方式是加载 JavaScript 文件。把文件路径提供给 Worker 构造函数，然后构造函数再在后台异步加载脚本并实例化工作者线程。传给构造函数的文件路径可以是多种形式。

下面的代码演示了如何创建空的专用工作者线程：
emptyWorker.js
// 空的 JS 工作者线程文件

main.js
console.log(location.href); // "https://example.com/" 
const worker = new Worker(location.href + 'emptyWorker.js'); //加粗
console.log(worker); // Worker {} 

这个例子非常简单，但涉及几个基本概念。
 emptyWorker.js 文件是从绝对路径加载的。根据应用程序的结构，使用绝对 URL 经常是多余的。
 这个文件是在后台加载的，工作者线程的初始化完全独立于 main.js。
 工作者线程本身存在于一个独立的 JavaScript 环境中，因此 main.js 必须以 Worker 对象为代理实现与工作者线程通信。在上面的例子中，该对象被赋值给了 worker 变量。
 虽然相应的工作者线程可能还不存在，但该 Worker 对象已在原始环境中可用了。

前面的例子可修改为使用相对路径。不过，这要求 main.js 必须与 emptyWorker.js 在同一个路径下：
const worker = new Worker('./emptyWorker.js');
console.log(worker); // Worker {} 

```

```js
//2. 工作者线程安全限制Worker Security Restrictions
工作者线程的脚本文件只能从与父页面相同的源加载。从其他源加载工作者线程的脚本文件会导致错误，如下所示：
// 尝试基于 https://example.com/worker.js 创建工作者线程
const sameOriginWorker = new Worker('./worker.js'); 

// 尝试基于 https://untrusted.com/worker.js 创建工作者线程
const remoteOriginWorker = new Worker('https://untrusted.com/worker.js'); 
// Error: Uncaught DOMException: Failed to construct 'Worker': 
// Script at https://untrusted.com/main.js cannot be accessed 
// from origin https://example.com 

注意:不能使用非同源脚本创建工作者线程，并不影响执行其他源的脚本。在工作者线程
内部，使用 importScripts()可以加载其他源的脚本。本章稍后会介绍。

基于加载脚本创建的工作者线程不受文档的内容安全策略限制，因为工作者线程在与父文档不同的上下文中运行。不过，如果工作者线程加载的脚本带有全局唯一标识符（与加载自一个二进制大文件一样），就会受父文档内容安全策略的限制。

注意:27.2.5 节会介绍基于二进制大文件创建工作者线程。
```

```js
//3. 使用 Worker 对象Using the Worker Object
Worker()构造函数返回的 Worker 对象是与刚创建的专用工作者线程通信的连接点。它可用于在工作者线程和父上下文间传输信息，以及捕获专用工作者线程发出的事件。

注意:要管理好使用 Worker()创建的每个 Worker 对象。在终止工作者线程之前，它不
会被垃圾回收，也不能通过编程方式恢复对之前 Worker 对象的引用。

Worker 对象支持下列事件处理程序属性。
 onerror：在工作者线程中发生 ErrorEvent 类型的错误事件时会调用指定给该属性的处理程序。  该事件会在工作者线程中抛出错误时发生。 该事件也可以通过 worker.addEventListener('error', handler)的形式处理。
 onmessage：在工作者线程中发生 MessageEvent 类型的消息事件时会调用指定给该属性的处理程序。    该事件会在工作者线程向父上下文发送消息时发生。  该事件也可以通过使用 worker.addEventListener('message', handler)处理。
 onmessageerror：在工作者线程中发生 MessageEvent 类型的错误事件时会调用指定给该属性的处理程序。    该事件会在工作者线程收到无法反序列化的消息时发生。   该事件也可以通过使用 worker.addEventListener('messageerror', handler)处理。

Worker 对象还支持下列方法。
 postMessage()：用于通过异步消息事件向工作者线程发送信息。
 terminate()：用于立即终止工作者线程。没有为工作者线程提供清理的机会，脚本会突然停止。
```

```js
//4. DedicatedWorkerGlobalScope
在专用工作者线程内部，全局作用域是 DedicatedWorkerGlobalScope 的实例。因为这继承自WorkerGlobalScope，所以包含它的所有属性和方法。工作者线程可以通过 self 关键字访问该全局作用域。
globalScopeWorker.js
console.log('inside worker:', self);

main.js
const worker = new Worker('./globalScopeWorker.js'); 
console.log('created worker:', worker); 
// created worker: Worker {} 
// inside worker: DedicatedWorkerGlobalScope {} 
如此例所示，顶级脚本和工作者线程中的 console 对象都将写入浏览器控制台，这对于调试非常有用。因为工作者线程具有不可忽略的启动延迟，所以即使 Worker 对象存在，工作者线程的日志也会在主线程的日志之后打印出来。

注意:这里两个独立的 JavaScript 线程都在向一个 console 对象发消息，该对象随后将消息序列化并在浏览器控制台打印出来。浏览器从两个不同的 JavaScript 线程收到消息，并按照自己认为合适的顺序输出这些消息。为此，在多线程应用程序中使用日志确定操作顺
序时必须要当心。  就是说你要标记好,哪个是哪个的打印???

DedicatedWorkerGlobalScope 在 WorkerGlobalScope 基础上增加了以下属性和方法。
 name：可以提供给 Worker 构造函数的一个可选的字符串标识符。
 postMessage()：与 worker.postMessage()对应的方法，用于从工作者线程内部向父上下文发送消息。
 close()：与 worker.terminate()对应的方法，用于立即终止工作者线程。没有为工作者线程提供清理的机会，脚本会突然停止。
 importScripts()：用于向工作者线程中导入任意数量的脚本。
```

### 专用工作者线程与隐式 MessagePorts

Dedicated Workers and Implicit MessagePorts
专用工作者线程的 Worker 对象和 DedicatedWorkerGlobalScope 与 MessagePorts 有一些相同接口处理程序和方法：onmessage、onmessageerror、close()和 postMessage()。这不是偶然的，因为专用工作者线程隐式使用了 MessagePorts 在两个上下文之间通信。

父上下文中的 Worker 对象和 DedicatedWorkerGlobalScope 实际上融合了 MessagePort，并在自己的接口中分别暴露了相应的处理程序和方法。换句话说，消息还是通过 MessagePort 发送，只是没有直接使用 MessagePort 而已。

也有不一致的地方，比如 start()和 close()约定。专用工作者线程会自动发送排队的消息，因此 start()也就没有必要了。另外，close()在专用工作者线程的上下文中没有意义，因为这样关闭MessagePort 会使工作者线程孤立。因此，在工作者线程内部调用 close()（或在外部调用terminate()）不仅会关闭 MessagePort，也会终止线程。

### 专用工作者线程的生命周期

Understanding the Dedicated Worker Lifecycle
调用 Worker()构造函数是一个专用工作者线程生命的起点。调用之后，它会初始化对工作者线程脚本的请求，并把 Worker 对象返回给父上下文。虽然父上下文中可以立即使用这个 Worker 对象，但与之关联的工作者线程可能还没有创建，因为存在请求脚本的网格延迟和初始化延迟。

一般来说，专用工作者线程可以非正式区分为处于下列三个状态：初始化（initializing）、活动（active）
和终止（terminated）。这几个状态对其他上下文是不可见的。虽然 Worker 对象可能会存在于父上下文中，但也无法通过它确定工作者线程当前是处理初始化、活动还是终止状态。换句话说，与活动的专用工作者线程关联的 Worker 对象和与终止的专用工作者线程关联的 Worker 对象无法分别。

初始化时，虽然工作者线程脚本尚未执行，但可以先把要发送给工作者线程的消息加入队列。这些消息会等待工作者线程的状态变为活动，再把消息添加到它的消息队列。下面的代码演示了这个过程。

```js
//initializingWorker.js
self.addEventListener('message', ({data}) => console.log(data)); 
main.js
const worker = new Worker('./initializingWorker.js'); 
// Worker 可能仍处于初始化状态
// 但 postMessage()数据可以正常处理
worker.postMessage('foo'); 
worker.postMessage('bar'); 
worker.postMessage('baz');
// foo 
// bar 
// baz 
创建之后，专用工作者线程就会伴随页面的整个生命期而存在，除非自我终止（self.close()）或通过外部终止（worker.terminate()）。即使线程脚本已运行完成，线程的环境仍会存在。只要工作者线程仍存在，与之关联的 Worker 对象就不会被当成垃圾收集掉。

自我终止和外部终止最终都会执行相同的工作者线程终止例程。来看下面的例子，其中工作者线程在发送两条消息中间执行了自我终止：
closeWorker.js
self.postMessage('foo'); 
self.close(); 
self.postMessage('bar'); 
setTimeout(() => self.postMessage('baz'), 0); 

main.js
const worker = new Worker('./closeWorker.js'); 
worker.onmessage = ({data}) => console.log(data); 
// foo 
// bar 

虽然调用了 close()，但显然工作者线程的执行并没有立即终止。close()在这里会通知工作者线程取消事件循环中的所有任务，并阻止继续添加新任务。这也是为什么"baz"没有打印出来的原因。!!!工作者线程不需要执行同步停止，因此在父上下文的事件循环中处理的"bar"仍会打印出来!!!。

下面来看外部终止的例子。
terminateWorker.js
self.onmessage = ({data}) => console.log(data); 

main.js
const worker = new Worker('./terminateWorker.js'); 
// 给 1000 毫秒让工作者线程初始化
setTimeout(() => { 
 worker.postMessage('foo'); 
 worker.terminate(); 
 worker.postMessage('bar'); 
 setTimeout(() => worker.postMessage('baz'), 0); 
    //这里，外部先给工作者线程发送了带"foo"的 postMessage，这条消息可以在外部终止之前处理。一旦调用了 terminate()，工作者线程的消息队列就会被清理并锁住，这也是只是打印"foo"的原因。
}, 1000); 
// foo 

注意:close()和 terminate()是幂等操作，多次调用没有问题。这两个方法仅仅是将
Worker 标记为 teardown，因此多次调用不会有不好的影响。

在整个生命周期中，一个专用工作者线程只会关联一个网页（Web 工作者线程规范称其为一个文档）。除非明确终止，否则只要关联文档存在，专用工作者线程就会存在。如果浏览器离开网页（通过导航或关闭标签页或关闭窗口），它会将与其关联的工作者线程标记为终止，它们的执行也会立即停止。
```

### 配置 Worker 选项

Configuring Worker Options
Worker()构造函数允许将可选的配置对象作为第二个参数。该配置对象支持下列属性。

 name：可以在工作者线程中通过 self.name 读取到的字符串标识符。
 type：表示加载脚本的运行方式，可以是"classic"或"module"。"classic"将脚本作为常规脚本来执行，"module"将脚本作为模块来执行。
 credentials：在 type 为"module"时，指定如何获取与传输凭证数据相关的工作者线程模块脚本。值可以是"omit"、"same-orign"或"include"。这些选项与 fetch()的凭证选项相同。在 type 为"classic"时，默认为"omit"。

注意:有的现代浏览器还不完全支持模块工作者线程或可能需要修改标志才能支持。

### 在 JavaScript 行内创建工作者线程

```js
//Creating a Worker from Inline JavaScript
//工作者线程需要基于脚本文件来创建，但这并不意味着该脚本必须是远程资源。专用工作者线程也可以通过 Blob 对象 URL 在行内脚本创建。这样可以更快速地初始化工作者线程，因为没有网络延迟。

下面展示了一个在行内创建工作者线程的例子。
// 创建要执行的 JavaScript 代码字符串
const workerScript = ` 
 self.onmessage = ({data}) => console.log(data); 
`;
// 基于脚本字符串生成 Blob 对象
const workerScriptBlob = new Blob([workerScript]); 

// 基于 Blob 实例创建对象 URL 
const workerScriptBlobUrl = URL.createObjectURL(workerScriptBlob); 

// 基于对象 URL 创建专用工作者线程
const worker = new Worker(workerScriptBlobUrl); 

worker.postMessage('blob worker script'); 
// blob worker script 
在这个例子中，通过脚本字符串创建了 Blob，然后又通过 Blob 创建了对象 URL，最后把对象 URL传给了 Worker()构造函数。该构造函数同样创建了专用工作者线程。

如果把所有代码写在一块，可以浓缩为这样：
const worker = new Worker(URL.createObjectURL(new Blob([`self.onmessage = 
({data}) => console.log(data);`]))); 
worker.postMessage('blob worker script'); 
// blob worker script 
```

工作者线程也可以利用函数序列化来初始化行内脚本。这是因为函数的 toString()方法返回函数代码的字符串，而函数可以在父上下文中定义但在子上下文中执行。来看下面这个简单的例子：

```js
function fibonacci(n) { 
 return n < 1 ? 0 
 : n <= 2 ? 1 
 : fibonacci(n - 1) + fibonacci(n - 2); 
    //定义一个递归函数 fibonacci，用于计算第 n 个 Fibonacci 数。
    //该函数使用三元运算符，根据 n 的值返回相应的 Fibonacci 数：
    //如果 n 小于 1，返回 0。
    //如果 n 小于等于 2，返回 1。
    //否则，返回 fibonacci(n - 1) 与 fibonacci(n - 2) 之和。
    //注释:斐波那契数列即第n项=前两项之和.   兔子对数问题、树的分枝、叶在枝条上的排列、菠萝聚花果上小单果的排列、雅枝竹的花蕾、正在舒展的蕨叶、松球的鳞的排列、蜜蜂的家族树。
const workerScript = ` 
 self.postMessage( 
 (${fibonacci.toString()})(9) 
 );   
`; 
   //创建 Web Worker 的脚本内容:使用模板字符串定义 workerScript，这是 Web Worker 将要执行的脚本内容。workerScript 内包含了 fibonacci 函数的字符串形式和对其的调用。self.postMessage 方法将计算结果发送回主线程。
const worker = new Worker(URL.createObjectURL(new Blob([workerScript]))); 
   // 创建一个新的 Web Worker。使用 Blob 和 URL.createObjectURL.将 workerScript 作为 Blob 的内容，并创建一个 URL 对象，以此来生成 Worker。
worker.onmessage = ({data}) => console.log(data);   
   //接受webworker的消息:定义 Web Worker 的 onmessage 事件处理程序。当 Web Worker 完成计算并发送消息时，这个事件处理程序会被触发，并将结果输出到控制台。  就是说onmessage是有消息发送了就触发的事件.
// 34  。执行代码后，Web Worker 会计算第 9 个 Fibonacci 数并将结果（34）发送回主线程。主线程接收消息并在控制台打印出结果：34。
```

这里有意使用了斐波那契数列的实现，将其序列化之后传给了工作者线程。该函数作为 IIFE 调用并传递参数，结果则被发送回主线程。虽然计算斐波那契数列比较耗时，但所有计算都会委托到工作者线程，因此并不会影响父上下文的性能。

注意:像这样序列化函数有个前提，就是函数体内不能使用通过闭包获得的引用，也包括全局变量，比如 window，因为这些引用在工作者线程中执行时会出错。

### 在工作者线程中动态执行脚本

```js
//Dynamic Script Execution Inside a Worker
//工作者线程中的脚本并非铁板一块，而是可以使用 importScripts()方法通过编程方式加载和执行任意脚本。该方法可用于全局 Worker 对象。这个方法会加载脚本并按照加载顺序同步执行。比如，下面的例子加载并执行了两个脚本：
main.js
const worker = new Worker('./worker.js'); 
// importing scripts 
// scriptA executes 
// scriptB executes 
// scripts imported 

scriptA.js
console.log('scriptA executes'); 
scriptB.js
console.log('scriptB executes'); 
worker.js
console.log('importing scripts');

importScripts('./scriptA.js'); 
importScripts('./scriptB.js'); 
console.log('scripts imported'); 

importScripts()方法可以接收任意数量的脚本作为参数。浏览器下载它们的顺序没有限制，但执行则会严格按照它们在参数列表的顺序进行。因此，下面的代码与前面的效果一样：
console.log('importing scripts'); 
importScripts('./scriptA.js', './scriptB.js'); 
console.log('scripts imported'); 

脚本加载受到常规 CORS (Cross-Origin Resource Sharing)的限制，但在工作者线程内部可以请求来自任何源的脚本。这里的脚本导入策略类似于使用生成的<script>标签动态加载脚本。在这种情况下，所有导入的脚本也会共享作用域。下面的代码演示了这个事实：
main.js
const worker = new Worker('./worker.js', {name: 'foo'}); 
// importing scripts in foo with bar 
// scriptA executes in foo with bar 
// scriptB executes in foo with bar 
// scripts imported 
scriptA.js
console.log(`scriptA executes in ${self.name} with ${globalToken}`); 
scriptB.js
console.log(`scriptB executes in ${self.name} with ${globalToken}`); 
worker.js
const globalToken = 'bar'; 
console.log(`importing scripts in ${self.name} with ${globalToken}`); 
importScripts('./scriptA.js', './scriptB.js'); 
console.log('scripts imported'); 
```

### 委托任务到子工作者线程

Delegating Tasks to Subworkers
有时候可能需要在工作者线程中再创建子工作者线程。在有多个 CPU 核心的时候，使用多个子工作者线程可以实现并行计算。使用多个子工作者线程前要考虑周全，确保并行计算的投入确实能够得到收益，毕竟同时运行多个子线程会有很大计算成本。

除了路径解析不同，创建子工作者线程与创建普通工作者线程是一样的。子工作者线程的脚本路径根据父工作者线程而不是相对于网页来解析。

来看下面的例子（注意额外的 js 目录）：

```js
//main.js
const worker = new Worker('./js/worker.js'); 
// worker 
// subworker 
js/worker.js
console.log('worker'); 
const worker = new Worker('./subworker.js'); 
js/subworker.js
console.log('subworker'); 

注意:顶级工作者线程的脚本和子工作者线程的脚本都必须从与主页相同的源加载.
```

### 处理工作者线程错误

```js
//Handling Worker Errors
//如果工作者线程脚本抛出了错误，该工作者线程沙盒可以阻止它打断父线程(父线程或主线程是创建并控制工作者线程的线程。父线程负责发送消息给工作者线程，并接收工作者线程返回的消息)的执行If an error is thrown inside a worker script, the worker’s sandboxing will serve to prevent it from interrupting the parent thread of execution.。如下例所示，其中的 try/catch 块不会捕获到错误：
main.js
try { 
 const worker = new Worker('./worker.js'); 
 console.log('no error'); 
} catch(e) { 
 console.log('caught error'); 
} 
// no error

worker.js
throw Error('foo'); 

不过，相应的错误事件仍然会冒泡到工作者线程的全局上下文，因此可以通过在 Worker 对象上设置错误事件侦听器访问到。下面看这个例子：
main.js
const worker = new Worker('./worker.js'); 
worker.onerror = console.log; 
// ErrorEvent {message: "Uncaught Error: foo"} 

worker.js
throw Error('foo'); 
```

```js
//何为父线程,工作者线程,以下示例:
// worker.js
onmessage = function(e) {
    console.log('Worker: Message received from main script');
    const result = e.data[0] * e.data[1];
    if (isNaN(result)) {
        postMessage('Please write two numbers');
    } else {
        const workerResult = 'Result: ' + result;
        console.log('Worker: Posting message back to main script');
        postMessage(workerResult);
    }
}
// main.js
const myWorker = new Worker('worker.js');

const firstNumber = 10;
const secondNumber = 20;

console.log('Main: Posting message to worker');
myWorker.postMessage([firstNumber, secondNumber]);

myWorker.onmessage = function(e) {
    console.log('Main: Message received from worker');
    console.log(e.data);
}

myWorker.onerror = function(e) {
    console.log('Main: Error received from worker');
    console.error(e.message);
}
父线程（主线程）：这里的父线程是运行main.js的主线程:
创建了一个Worker实例，并将worker.js作为参数传递。使用postMessage方法向工作者线程发送消息。通过onmessage事件处理函数接收工作者线程发送回来的消息。通过onerror事件处理函数处理工作者线程中发生的错误。

工作者线程：在worker.js文件中定义:使用onmessage事件处理函数接收父线程发送的消息。执行乘法运算并将结果通过postMessage方法发送回父线程。

在这个示例中，父线程发送两个数字到工作者线程，工作者线程接收这两个数字进行乘法运算并将结果返回给父线程。这样可以让耗时的计算在工作者线程中进行，而不阻塞父线程的执行。
```

### 与专用工作者线程通信

Communicating with a Dedicated Worker
与工作者线程的通信都是通过异步消息完成的，但这些消息可以有多种形式。

```js
//1. 使用 postMessage()
最简单也最常用的形式是使用 postMessage()传递序列化的消息。下面来看一个计算阶乘的例子：
factorialWorker.js
function factorial(n) { 
 let result = 1; 
 while(n) { result *= n--; } 
 return result; 
    //定义了一个名为 factorial 的(阶乘)函数，用于计算 n 的阶乘。使用 while 循环将 result 变量依次乘以 n 并递减 n，直到 n 为 0。
} 
self.onmessage = ({data}) => { 
 self.postMessage(`${data}! = ${factorial(data)}`); 
    //设置消息处理程序.   为 Worker 设置 onmessage 事件处理程序。当 Worker 接收到主线程发送的消息时，这个事件处理程序会被触发，并调用 factorial 函数计算阶乘。计算结果通过 self.postMessage 方法发送回主线程，格式为 ${data}! = ${factorial(data)}
}; 

main.js
const factorialWorker = new Worker('./factorialWorker.js'); //创建一个新的 Web Worker，指定脚本文件为 factorialWorker.js。
factorialWorker.onmessage = ({data}) => console.log(data); //设置消息处理程序.  为 Worker 设置 onmessage 事件处理程序。当 Worker 完成计算并发送消息时，这个事件处理程序会被触发，并将结果输出到控制台。
factorialWorker.postMessage(5); 
factorialWorker.postMessage(7); 
factorialWorker.postMessage(10); 
// 5! = 120   .使用 postMessage 方法向 Worker 发送数据。依次发送 5、7 和 10，表示计算 5 的阶乘、7 的阶乘和 10 的阶乘。
// 7! = 5040 
// 10! = 3628800   当代码运行时，main.js 会向 factorialWorker.js 中的 Worker 发送三个消息：5、7 和 10。Worker 收到每个消息后计算相应的阶乘并将结果发送回主线程。主线程接收结果并在控制台打印出：5! = 120   7! = 5040   10! = 3628800这样，主线程在不被阻塞的情况下，能同时处理多个阶乘计算任务，并将结果显示给用户。

对于传递简单的消息，使用 postMessage()在主线程和工作者线程之间传递消息，与在两个窗口间传递消息非常像。主要区别是没有 targetOrigin 的限制，该限制是针对 Window.prototype. postMessage 的，对 WorkerGlobalScope.prototype.postMessage 或 Worker.prototype. postMessage 没有影响。这样约定的原因很简单：工作者线程脚本的源被限制为主页的源，因此没有必要再去过滤了。
```

```js
//2. 使用 MessageChannel
无论主线程还是工作者线程，通过 postMessage()进行通信涉及调用全局对象上的方法，并定义一个临时的传输协议。这个过程可以被 Channel Messaging API 取代，基于该 API 可以在两个上下文间明确建立通信渠道。

MessageChannel 实例有两个端口，分别代表两个通信端点。要让父页面和工作线程通过
MessageChannel 通信，需要把一个端口传到工作者线程中，如下所示：
worker.js
// 在监听器中存储全局 messagePort 
let messagePort = null; 
   //声明一个全局变量 messagePort 用于存储传入的 MessagePort
function factorial(n) { 
 let result = 1; 
 while(n) { result *= n--; } 
 return result; 
   //定义了一个名为 factorial 的函数，用于计算 n 的阶乘。
} 
// 在全局对象上添加消息处理程序
self.onmessage = ({ports}) => { 
 // 只设置一次端口
 if (!messagePort) { 
 // 初始化消息发送端口，
 // 给变量赋值并重置监听器
messagePort = ports[0]; 
 self.onmessage = null; 
 // 在全局对象上设置消息处理程序
 messagePort.onmessage = ({data}) => { 
 // 收到消息后发送数据
 messagePort.postMessage(`${data}! = ${factorial(data)}`); 
 }; 
 }   
     //初始消息处理程序:设置 Worker 的 onmessage 事件处理程序。
     //当 Worker 收到主线程发送的消息时，会检查 messagePort 是否已初始化。
     //如果 messagePort 尚未初始化，则将传入的 ports[0] 赋值给 messagePort 并重置 self.onmessage。
     //然后设置 messagePort 的 onmessage 事件处理程序，当收到数据时计算阶乘并通过 messagePort.postMessage 返回结果。
}; 

main.js
const channel = new MessageChannel();
    //创建一个新的 MessageChannel，它包含两个端口 port1 和 port2，用于双向通信。 
const factorialWorker = new Worker('./worker.js'); //创建一个新的 Web Worker，指定脚本文件为 worker.js。

// 把`MessagePort`对象发送到工作者线程
// 工作者线程负责处理初始化信道,将 MessagePort 的一个端口 port1 发送给 Worker。Worker 负责接收这个端口并通过它与主线程通信。
factorialWorker.postMessage(null, [channel.port1]); 

// 通过信道实际发送\收数据 ,设置 port2 的 onmessage 事件处理程序，用于接收 Worker 发送的消息并在控制台输出结果。
channel.port2.onmessage = ({data}) => console.log(data); 

// 工作者线程通过信道响应  ,使用 port2 发送消息给 Worker，请求计算 5 的阶乘。   
channel.port2.postMessage(5); 
// 5! = 120    
//当代码运行时，主线程将通过 port2 发送消息给 Worker，Worker 接收到消息后通过 port1 计算阶乘并将结果发送回主线程。主线程接收结果并在控制台输出：5! = 120  这种双向通信方式通过 MessageChannel 提供了更灵活的消息传递机制，适用于复杂的交互场景。
在这个例子中，父页面通过 postMessage 与工作者线程共享 MessagePort。使用数组语法是为了在两个上下文间传递可转移对象。本章稍后会介绍可转移对象（Transferable）。工作者线程维护着对该端口的引用，并使用它代替通过全局对象传递消息。当然，消息的格式也需要临时约定：工作者线程收到的第一条消息包含端口，后续的消息才是数据。

使用 MessageChannel 实例与父页面通信很大程度上是多余的。这是因为全局 postMessage()方法本质上与 channel.postMessage()执行的是同样的操作（不考虑 MessageChannel 接口的其他特性）。MessageChannel 真正有用的地方是让两个工作者线程之间直接通信。这可以通过把端口传给另一个工作者线程实现。下面的例子把一个数组传给了一个工作者线程，这个线程又把它传另一个工作者线程，然后再传回主页： 展示了两个 Web Workers 之间的通信。通过使用 MessageChannel，两个 Worker 可以互相传递消息，并将其上下文标识符附加到消息中:
main.js
const channel = new MessageChannel(); 
    //创建一个新的 MessageChannel，它包含两个端口 port1 和 port2，用于双向通信
const workerA = new Worker('./worker.js'); 
const workerB = new Worker('./worker.js'); //创建两个新的 Web Workers，指定脚本文件为 worker.js
workerA.postMessage('workerA', [channel.port1]); //初始化信道并发送端口和标识符.
workerB.postMessage('workerB', [channel.port2]);   //将 MessagePort 的两个端口分别发送给 Worker A 和 Worker B，并附加各自的标识符 'workerA' 和 'workerB'。
workerA.onmessage = ({data}) => console.log(data); //设置 Workers 的消息处理程序.
workerB.onmessage = ({data}) => console.log(data);   //设置 Worker A 和 Worker B 的 onmessage 事件处理程序，用于接收和输出处理后的数据。
workerA.postMessage(['page']);   // ['page', 'workerA', 'workerB'] .分别发送初始消息 ['page'] 给 Worker A 和 Worker B.   加粗
workerB.postMessage(['page'])    // ['page', 'workerB', 'workerA']    加粗

worker.js
let messagePort = null; 
let contextIdentifier = null; //声明两个全局变量 messagePort 用于存储传入的 MessagePort，contextIdentifier 用于存储当前 Worker 的标识符。
function addContextAndSend(data, destination) { 
    // 添加标识符以标识当前工作者线程
 data.push(contextIdentifier); 
    // 把数据发送到下一个目标
 destination.postMessage(data); 
       //添加上下文并发送消息函数:定义了一个函数 addContextAndSend，它将当前 Worker 的标识符附加到数据中，并将数据发送到指定目标.
} 
self.onmessage = ({data, ports}) => { 
   // 如果消息里存在端口（ports） 则初始化工作者线程
 if (ports.length) { 
   // 记录标识符
 contextIdentifier = data; 

   // 获取 MessagePort 
 messagePort = ports[0]; 

   // 添加处理程序把接收的数据
   // 发回到父页面
 messagePort.onmessage = ({data}) => { 
 addContextAndSend(data, self); 
 } 
 } else { 
 addContextAndSend(data, messagePort); 
    //消息处理程序:当 Worker 接收到消息时，首先检查是否包含端口（ports.length）。如果包含端口，则初始化 Worker：记录标识符，存储 MessagePort，并设置 messagePort 的 onmessage 事件处理程序，将接收到的数据返回给父页面。如果不包含端口，则将接收到的数据和标识符发送到 messagePort
 } 
}; 
//当代码运行时，初始消息 ['page'] 会从主线程发送到 Worker A 和 Worker B。然后，Worker A 和 Worker B 会将各自的标识符附加到消息中并通过信道传递给对方。最终消息的输出顺序如下：
// 一 Worker A
//  ['page', 'workerA', 'workerB'] 
// Worker A 接收到 ['page']，附加 workerA，然后通过信道传递给 Worker B，Worker B 再附加 workerB 并返回给主线程。
// 二 Worker B
//  ['page', 'workerB', 'workerA'] 
// Worker B 接收到 ['page']，附加 workerB，然后通过信道传递给 Worker A，Worker A 再附加 workerA 并返回给主线程。
// 这展示了两个 Worker 如何在相互通信的过程中标识自己的上下文并正确处理消息。
在这个例子中，数组的每一段旅程都会添加一个字符串，标识自己到过哪里。数组从父页面发送到工作者线程，工作者线程会加上自己的上下文标识符。然后，数组又从一个工作者线程发送到另一个工作者线程。第二个线程又加上自己的上下文标识符，随即将数组发回主页，主页把数组打印出来。这个例子中的两个工作者线程使用了同一个脚本，因此要注意数组可以双向传递。

//没看懂,具体什么操作???
```

```js
//3. 使用 BroadcastChannel
同源脚本能够通过 BroadcastChannel 相互之间发送和接收消息。这种通道类型的设置比较简单，不需要像 MessageChannel 那样转移乱糟糟的端口。这可以通过以下方式实现：  如何使用 BroadcastChannel 实现 Web Worker 和主线程之间的通信。BroadcastChannel 提供了一种广播消息的方式，允许同一页面或多个页面中的脚本相互通信:
main.js
const channel = new BroadcastChannel('worker_channel'); 
const worker = new Worker('./worker.js'); 
    //创建一个新的 BroadcastChannel 实例，频道名称为 'worker_channel'
    //创建一个新的 Web Worker，指定脚本文件为 worker.js。
channel.onmessage = ({data}) => { 
 console.log(`heard ${data} on page`); 
} 
setTimeout(() => channel.postMessage('foo'), 1000); //设置 channel 的 onmessage 事件处理程序，用于接收来自频道的消息并输出到控制台. 使用 setTimeout 在 1 秒后向 channel 发送消息 'foo'到BroadcastChannel
// heard foo in worker 
// heard bar on page 

worker.js
const channel = new BroadcastChannel('worker_channel'); 
channel.onmessage = ({data}) => { 
 console.log(`heard ${data} in worker`); 
 channel.postMessage('bar'); 
} 
  //创建一个新的 BroadcastChannel 实例，频道名称同样为 'worker_channel'
  //设置 channel 的 onmessage 事件处理程序，当 Worker 接收到消息时，输出收到的消息并向频道发送消息 'bar'。
这里，页面在通过 BroadcastChannel 发送消息之前会先等 1 秒钟。因为这种信道没有端口所有权的概念，所以如果没有实体监听这个信道，广播的消息就不会有人处理。在这种情况下，如果没有setTimeout()，则由于初始化工作者线程的延迟，就会导致消息已经发送了，但工作者线程上的消息处理程序还没有就位Note here that the page waits 1,000 milliseconds before sending the initial message on the BroadcastChannel. Because there is no concept of port ownership with this type of channel, messages broadcasted will not be handled if there is no other entity listening on the channel. In this case, without the setTimeout, the latency of the worker initialization is sufficiently long to prevent the worker’s message handler from being set before the message is actually sent.。

//搞不懂,什么流程???
```

### 工作者线程数据传输

Worker Data Transfer
使用工作者线程时，经常需要为它们提供某种形式的数据负载。工作者线程是独立的上下文，因此在上下文之间传输数据就会产生消耗。在支持传统多线程模型的语言中，可以使用锁、互斥量，以及volatile 变量。在 JavaScript 中，有三种在上下文间转移信息的方式：结构化克隆算法（structured clone algorithm）、可转移对象（transferable objects）和共享数组缓冲区（shared array buffers）。

```js
//1. 结构化克隆算法Structured Clone Algorithm
结构化克隆算法可用于在两个独立上下文间共享数据。该算法由浏览器在后台实现，不能直接调用。
在通过 postMessage()传递对象时，浏览器会遍历该对象，并在目标上下文中生成它的一个副本。下列类型是结构化克隆算法支持的类型。
 除 Symbol 之外的所有原始类型
 Boolean 对象
 String 对象
 BDate
 RegExp
 Blob
 File
 FileList
 ArrayBuffer
 ArrayBufferView
 ImageData
 Array
 Object
 Map
 Set
关于结构化克隆算法，有以下几点需要注意。
 复制之后，源上下文中对该对象的修改，不会传播到目标上下文中的对象。
 结构化克隆算法可以识别对象中包含的循环引用，不会无穷遍历对象。
 克隆 Error 对象、Function 对象或 DOM 节点会抛出错误。
 结构化克隆算法并不总是创建完全一致的副本。
 对象属性描述符、获取方法和设置方法不会克隆，必要时会使用默认值。
 原型链不会克隆。
 RegExp.prototype.lastIndex 属性不会克隆。

注意:结构化克隆算法在对象比较复杂时会存在计算性消耗。因此，实践中要尽可能避免
过大、过多的复制。
```

```js
//2. 可转移对象transferable objects
使用可转移对象（transferable objects）可以把所有权从一个上下文转移到另一个上下文。在不太可能在上下文间复制大量数据的情况下，这个功能特别有用。只有如下几种对象是可转移对象：
 ArrayBuffer
 MessagePort
 ImageBitmap
 OffscreenCanvas
postMessage()方法的第二个可选参数是数组，它指定应该将哪些对象转移到目标上下文。在遍历消息负载对象时，浏览器根据转移对象数组检查对象引用，并对转移对象进行转移而不复制它们。这意味着被转移的对象可以通过消息负载发送，消息负载本身会被复制，比如对象或数组。

下面的例子演示了工作者线程对ArrayBuffer 的常规结构化克隆。这里没有对象转移：
main.js
const worker = new Worker('./worker.js'); 
// 创建 32 位缓冲区
const arrayBuffer = new ArrayBuffer(32); 
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 32
worker.postMessage(arrayBuffer); 
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 32

worker.js
self.onmessage = ({data}) => { 
 console.log(`worker's buffer size: ${data.byteLength}`); // 32
}; 

如果把 ArrayBuffer 指定为可转移对象，那么对缓冲区内存的引用就会从父上下文中抹去，然后分配给工作者线程。下面的例子演示了这个操作，结果分配给 ArrayBuffer 的内存从父上下文转移到了工作者线程：
main.js
const worker = new Worker('./worker.js'); 
// 创建 32 位缓冲区
const arrayBuffer = new ArrayBuffer(32); 
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 32
worker.postMessage(arrayBuffer, [arrayBuffer]);   //加粗
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 0
worker.js
self.onmessage = ({data}) => { 
 console.log(`worker's buffer size: ${data.byteLength}`); // 32  ,({data}) => {:这是一个箭头函数，接收一个事件对象作为参数。这个事件对象包含一个属性 data，即从主线程传递过来的消息内容。花括号 {data} 是对象解构赋值语法，用来直接提取 data 属性的值。
}; 

在其他类型的对象中嵌套可转移对象也完全没有问题。包装对象会被复制，而嵌套的对象会被转移：在 JavaScript 中使用 ArrayBuffer 和 Web Worker 传递数据:
main.js
const worker = new Worker('./worker.js'); 
// 创建 32 位缓冲区
const arrayBuffer = new ArrayBuffer(32); 
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 32
worker.postMessage({foo: {bar: arrayBuffer}}, [arrayBuffer]); 
console.log(`page's buffer size: ${arrayBuffer.byteLength}`); // 0 
   //创建一个新的 Web Worker，运行在 worker.js 文件中的脚本。
   //创建一个 32 字节大小的 ArrayBuffer 对象。
   //打印 arrayBuffer 的字节长度，此时应该是 32。
   //将一个包含 arrayBuffer 的对象 {foo: {bar: arrayBuffer}} 发送给 Web Worker，并将 arrayBuffer 作为第二个参数传递。第二个参数表明这个 arrayBuffer 将被转移给 Web Worker，而不是复制。
   //再次打印 arrayBuffer 的字节长度，此时应该是 0，因为 arrayBuffer 已经被转移给 Web Worker，页面中不再拥有这个缓冲区。

worker.js
self.onmessage = ({data}) => { 
 console.log(`worker's buffer size: ${data.foo.bar.byteLength}`); // 32
}; 
  //定义 Web Worker 的 onmessage 事件处理程序，当 Web Worker 收到消息时将执行此函数。
  //打印接收到的 ArrayBuffer 的字节长度，应该是 32，因为缓冲区已被转移给 Web Worker。
//main.js 中创建了一个 32 字节的缓冲区，并将其发送给 Web Worker。由于使用了 Transferable 对象，缓冲区在发送后 main.js 中的缓冲区大小变为 0。worker.js 接收到缓冲区，并打印其大小为 32。
```

```js
//3. SharedArrayBuffer

注意:由于 Spectre 和 Meltdown 的漏洞，所有主流浏览器在 2018 年 1 月就禁用了
SharedArrayBuffer。从 2019 年开始，有些浏览器开始逐步重新启用这一特性。

既不克隆，也不转移，SharedArrayBuffer 作为 ArrayBuffer 能够在不同浏览器上下文间共享。在把 SharedArrayBuffer 传给 postMessage()时，浏览器只会传递原始缓冲区的引用。结果是，两个不同的 JavaScript 上下文会分别维护对同一个内存块的引用。每个上下文都可以随意修改这个缓冲区，就跟修改常规 ArrayBuffer 一样。来看下面的例子： 使用 SharedArrayBuffer 在主线程和 Web Worker 之间共享内存:
main.js
const worker = new Worker('./worker.js'); //创建一个新的 Web Worker，运行在 worker.js 文件中的脚本。
// 创建 1 字节缓冲区. 创建一个 1 字节大小的 SharedArrayBuffer 对象。与 ArrayBuffer 不同，SharedArrayBuffer 允许多个线程共享同一个内存块
const sharedArrayBuffer = new SharedArrayBuffer(1); 

// 创建 1 字节缓冲区的视图.创建一个 Uint8Array 视图，用于操作 sharedArrayBuffer 中的数据。
const view = new Uint8Array(sharedArrayBuffer); 

// 父上下文赋值 1  .将缓冲区的第一个字节设为 1   .当 Web Worker 发送消息回主线程时，打印缓冲区的当前值
view[0] = 1; 
worker.onmessage = () => { 
 console.log(`buffer value after worker modification: ${view[0]}`); 
}; 

// 发送对 sharedArrayBuffer 的引用 .将 sharedArrayBuffer 的引用发送给 Web Worker。注意这里是传递引用，而不是复制数据
worker.postMessage(sharedArrayBuffer); 
// buffer value before worker modification: 1 
// buffer value after worker modification: 2 

worker.js
self.onmessage = ({data}) => { 
    //定义 Web Worker 的 onmessage 事件处理程序，当 Web Worker 收到消息时将执行此函数. 创建一个 Uint8Array 视图，用于操作接收到的 SharedArrayBuffer。
 const view = new Uint8Array(data);
  console.log(`buffer value before worker modification: ${view[0]}`); //打印缓冲区的当前值，此时应该是 1

 // 工作者线程为共享缓冲区赋值.将缓冲区的第一个字节值加 1
 view[0] += 1; 

 // 发送空消息，通知赋值完成.发送一个空消息通知主线程，修改已完成
 self.postMessage(null); 
}; 
//这个例子展示了如何在主线程和 Web Worker 之间共享和修改内存数据
//main.js 创建了一个 SharedArrayBuffer，并将其第一个字节设为 1。main.js 将 SharedArrayBuffer 的引用发送给 Web Worker。
//Web Worker 接收到缓冲区，并打印当前值，然后将其值加 1。Web Worker 发送一个空消息通知主线程修改已完成。
//主线程收到消息后，打印缓冲区的新值，此时值为 2。

当然，在两个并行线程中共享内存块有资源争用的风险。换句话说，SharedArrayBuffer 实例实际上会被当成易变（volatile）内存。下面的例子演示了这一点：  使用 SharedArrayBuffer 在多线程（由 Web Workers 创建的线程池）之间共享内存，并对共享数据进行并发修改(并发修改的问题:竞态条件（Race Condition）\数据不一致\ 死锁（Deadlock互相等对方完成,结果是无法运行）\饥饿（Starvation一些进程得不到资源被饿死）):
main.js
// 创建包含 4 个线程的线程池
const workers = []; 
for (let i = 0; i < 4; ++i) { 
 workers.push(new Worker('./worker.js')); //创建一个包含 4 个 Web Worker 的线程池，每个 Web Worker 运行 worker.js 中的代码
} 

 // 在最后一个工作者线程完成后打印最终值
let responseCount = 0; 
for (const worker of workers) { 
 worker.onmessage = () => { 
 if (++responseCount == workers.length) { 
 console.log(`Final buffer value: ${view[0]}`); 
 //设置每个 Web Worker 的 onmessage 事件处理程序。当每个 Web Worker 完成任务并发送消息时，响应计数器加一。当所有 Web Worker 完成后，打印共享缓冲区的最终值。
 } 
 }; 
} 

// 初始化 SharedArrayBuffer,把 SharedArrayBuffer 发给每个线程.创建一个大小为 4 字节的 SharedArrayBuffer，并创建一个 Uint32Array 视图来操作这个缓冲区。初始化缓冲区的第一个值为 1。
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 
view[0] = 1; 

for (const worker of workers) { 
 worker.postMessage(sharedArrayBuffer); 
 //发送共享缓冲区,将 SharedArrayBuffer 的引用发送给每个 Web Worker
} 
// （期待结果为 4000001。实际输出类似于：）
// Final buffer value: 2145106 

worker.js 
self.onmessage = ({data}) => { 
 const view = new Uint32Array(data); 

 // 执行 100 万次加操作
 for (let i = 0; i < 1E6; ++i) { 
 view[0] += 1; 
 } 
 self.postMessage(null); 
 //接收共享缓冲区,Web Worker 接收到 SharedArrayBuffer 后，将其转换为 Uint32Array 视图。执行 100 万次加操作，将缓冲区的第一个值加 100 万。加操作完成后，发送空消息通知主线程。
}; 
//这个例子演示了多线程并发修改共享内存的复杂性，通常需要同步机制（例如原子操作或锁）来确保数据一致性。
//主线程 创建了一个共享缓冲区，并将其发送给 4 个 Web Worker。每个 Web Worker 接收到共享缓冲区后，对其进行 100 万次加操作。
//由于没有同步机制，缓冲区的最终值会因为竞争条件而不同。理论上应为 4000001（初始值 1 加上 4 个线程各 100 万次加 1），但实际输出可能会不同（例如：2145106），因为多个线程同时访问和修改共享缓冲区时会发生冲突。

这里，每个工作者线程都顺序执行了 100 万次加操作，每次都读取共享数组的索引、执行一次加操作，然后再把值写回数组索引。在所有工作者线程读/写操作交织的过程中就会发生资源争用。例如：
(1) 线程 A 读取到值 1；
(2) 线程 B 读取到值 1；
(3) 线程 A 加 1 并将 2 写回数组；
(4) 线程 B 仍然使用陈旧的数组值 1，同样把 2 写回数组。

为解决该问题，

控制并发修改的方法:
锁（Lock）：使用互斥锁（mutex）、读写锁（read-write lock）等机制来确保同一时刻只有一个线程或进程可以访问和修改共享资源。例如，在 Java 中，可以使用 synchronized 关键字来实现互斥锁。
信号量（Semaphore）：使用信号量来控制访问共享资源的线程或进程的数量。
原子操作（Atomic Operation）：使用原子操作来确保对共享资源的访问和修改是不可分割的，不会被中断。例如，在 Java 中，可以使用 AtomicInteger、AtomicLong 等类来实现原子操作。
条件变量（Condition Variable）：使用条件变量来协调线程或进程之间的同步，使得线程或进程可以等待特定条件的满足。
乐观锁和悲观锁：乐观锁：假设不会发生冲突，只有在提交时检测是否有冲突，如果有冲突则重试。常用的方法是版本号控制或比较和交换（Compare-and-Swap, CAS）。悲观锁：假设会发生冲突，在每次操作数据前都加锁，确保只有一个线程或进程能够修改数据。

原子操作:可以使用 Atomics 对象让一个工作者线程获得 SharedArrayBuffer 实例的锁，在执行完全部读/写/读操作后，再允许另一个工作者线程执行操作。把 Atomics.add()放到这个例子中就可以得到正确的最终值：
main.js 
// 创建包含 4 个线程的线程池
const workers = []; 
for (let i = 0; i < 4; ++i) { 
 workers.push(new Worker('./worker.js')); 
} 
// 在最后一个工作者线程完成后打印最终值
let responseCount = 0; 
for (const worker of workers) { 
 worker.onmessage = () => { 
 if (++responseCount == workers.length) { 
 console.log(`Final buffer value: ${view[0]}`); 
 } 
 }; 
} 
// 初始化 SharedArrayBuffer 
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 
view[0] = 1; 
// 把 SharedArrayBuffer 发给每个线程
for (const worker of workers) { 
 worker.postMessage(sharedArrayBuffer); 
} 
//（期待结果为 4000001）
// Final buffer value: 4000001 
worker.js 
self.onmessage = ({data}) => { 
 const view = new Uint32Array(data); 
 // 执行 100 万次加操作
 for (let i = 0; i < 1E6; ++i) { 
 Atomics.add(view, 0, 1); //加粗
} 
 self.postMessage(null); 
}; 

注意:第 20 章详细介绍了SharedArrayBuffer 和 Atomics API。
```

### 线程池

```js
//Worker Pools
//因为启用工作者线程代价很大，所以某些情况下可以考虑始终保持固定数量的线程活动，需要时就把任务分派给它们。工作者线程在执行计算时，会被标记为忙碌状态。直到它通知线程池自己空闲了，才准备好接收新任务。这些活动线程就称为“线程池”或“工作者线程池”Because starting a worker is quite expensive, there may be situations where it is more efficient to keep a fixed number of workers alive and dispatch work to them as necessary. When a worker is performing computation, it is marked as busy and will only be ready to take on another task once it notifies the pool that it is available again. This is commonly referred to as a "thread pool" or "worker pool."

!!!线程池中线程的数量多少合适并没有权威的答案!!!，不过可以参考 navigator.hardware Concurrency属性返回的系统可用的核心数量。因为不太可能知道每个核心的多线程能力，所以最好把这个数字作为线程池大小的上限。

一种使用线程池的策略是每个线程都执行同样的任务，但具体执行什么任务由几个参数来控制。通过使用特定于任务的线程池，可以分配固定数量的工作者线程，并根据需要为他们提供参数。工作者线程会接收这些参数，执行耗时的计算，并把结果返回给线程池。然后线程池可以再将其他工作分派给工作者线程去执行。接下来的例子将构建一个相对简单的线程池，但可以涵盖上述思路的所有基本要求。

首先是定义一个 TaskWorker 类，它可以扩展 Worker 类。TaskWorker 类负责两件事：

一是跟踪线程是否正忙于工作，并管理进出线程的信息与事件。

第二，传入给这个工作者线程的任务会封装到一个期约中，然后正确地解决和拒绝。这个类的定义如下：定义了一个名为 TaskWorker 的类，该类继承自 Worker。它的目的是创建一个可用于处理任务的工作者线程，并管理其可用状态:
class TaskWorker extends Worker { 
 constructor(notifyAvailable, ...workerArgs) { 
 super(...workerArgs); //调用父类 Worker 的构造函数，传递剩余参数 workerArgs。这些参数通常包括工作者线程的脚本路径和选项。

 // 初始化为不可用状态
 this.available = false; 
 this.resolve = null; 
 this.reject = null; //以上这两个属性用于存储任务完成后的回调函数

 // 线程池会传递回调以便工作者线程发出它需要新任务的信号. 保存传递过来的回调函数，用于通知线程池工作者线程可用。
 this.notifyAvailable = notifyAvailable; 

 // 线程脚本在完全初始化之后会发送一条"ready"消息.设置工作者线程的消息处理函数，当收到“ready”消息时，调用 setAvailable 方法，表示工作者线程已准备好。
 this.onmessage = () => this.setAvailable(); 
 } 

 // 由线程池调用，以分派新任务
 dispatch({ resolve, reject, postMessageArgs }) { 
 this.available = false; //将 available 属性设置为 false，表示工作者线程当前正在处理任务。
 this.onmessage = ({ data }) => { 
 resolve(data); 
 this.setAvailable(); 
 //设置消息处理函数，当任务完成并收到消息时，调用 resolve(data) 传递任务结果，并调用 setAvailable 方法表示工作者线程可用。
 }; 
 this.onerror = (e) => { 
 reject(e); 
 this.setAvailable(); 
 //设置错误处理函数，当任务出错时，调用 reject(e) 传递错误信息，并调用 setAvailable 方法表示工作者线程可用。
 }; 
 this.postMessage(...postMessageArgs); //向工作者线程发送消息，开始处理任务。
 } 

 setAvailable() { 
 this.available = true; 
 this.resolve = null; 
 this.reject = null; 
 this.notifyAvailable(); 
 //将 available 属性设置为 true，表示工作者线程当前可用。
 //重置 resolve 和 reject 属性为 null。
 //调用 notifyAvailable 回调函数，通知线程池工作者线程已准备好接受新任务。
 } 
} 
//总的来说，这段代码实现了一个任务工作者类 TaskWorker，该类在完成初始化后会通知线程池自己可用，并且可以接受新的任务进行处理。当任务完成或出错时，工作者线程会通知线程池自己重新可用。

然后是定义使用 TaskWorker 类的 WorkerPool 类。它还必须维护尚未分派给工作者线程的任务队列。两个事件可以表明应该分派一个新任务：新任务被添加到队列中，或者工作者线程完成了一个任务，应该再发送另一个任务。WorkerPool 类定义如下：  定义了一个名为 WorkerPool 的类，用于管理多个工作者线程（TaskWorker），以实现任务的并行处理和资源的高效利用:
class WorkerPool { 
 constructor(poolSize, ...workerArgs) { 
 this.taskQueue = []; 
 this.workers = []; 
 // 初始化线程池
 for (let i = 0; i < poolSize; ++i) { 
 this.workers.push( 
 new TaskWorker(() => this.dispatchIfAvailable(), ...workerArgs)); 
    //初始化任务队列，存储待处理的任务。
    //初始化工作者线程数组，存储所有的工作者线程。
    //根据指定的线程池大小 poolSize，循环创建 TaskWorker 实例并将其添加到 workers 数组中。每个 TaskWorker 都会传递一个回调函数 () => this.dispatchIfAvailable()，用于通知线程池该工作者线程可用，并传递其余的工作者参数 workerArgs.
 } 
 } 
 // 把任务推入队列
 enqueue(...postMessageArgs) { 
 return new Promise((resolve, reject) => { 
 this.taskQueue.push({ resolve, reject, postMessageArgs }); 
 this.dispatchIfAvailable(); 
 }); 
 //返回一个新的 Promise，在 Promise 构造函数中，任务被推入 taskQueue 队列。
 //调用 this.dispatchIfAvailable() 方法，尝试将任务分派给可用的工作者线程。
 } 

 // 把任务发送给下一个空闲的线程（如果有的话）
 dispatchIfAvailable() { 
 if (!this.taskQueue.length) { 
 return; 
 } 
 for (const worker of this.workers) { 
 if (worker.available) { 
 let a = this.taskQueue.shift(); 
 worker.dispatch(a); 
 break; 
 //首先检查 taskQueue 是否为空。如果为空，则直接返回。
 //遍历所有的工作者线程 this.workers，寻找一个可用的工作者线程（worker.available）。
 //如果找到可用的工作者线程，从 taskQueue 中取出第一个任务并将其分派给该工作者线程，调用 worker.dispatch(a)。
 //一旦任务被分派，立即退出循环。
 } 
 } 
 } 

 // 终止所有工作者线程
 close() { 
 for (const worker of this.workers) { 
 worker.terminate(); 
 //终止所有工作者线程，遍历 this.workers 数组，调用每个工作者线程的 terminate() 方法。
 } 
 } 
} 
//总的来说，这段代码实现了一个线程池类 WorkerPool，它可以将任务排队并分派给多个工作者线程进行处理，以提高并行处理能力和资源利用效率。当线程池中的某个工作者线程变为可用时，它会自动从任务队列中获取下一个任务并开始处理。此外，还提供了 close() 方法，用于终止所有工作者线程。

定义了这两个类之后，现在可以把任务分派到线程池，并在工作者线程可用时执行它们。在这个例子中，假设我们想计算 1000 万个浮点值之和。为节省转移成本，我们使用SharedArrayBuffer。  
工作者线程的脚本（worker.js）大致如下：利用 WorkerPool 和 TaskWorker 类，通过线程池并行处理任务。它使用 Web Worker 来计算一个大型数组的部分和，并最终求出整个数组的和:
self.onmessage = ({data}) => { 
    //设置消息处理函数，当收到主线程的消息时开始处理任务。
 let sum = 0; 
 let view = new Float32Array(data.arrayBuffer)  //将传递的 SharedArrayBuffer 转换为 Float32Array。

 for (let i = data.startIdx; i < data.endIdx; ++i) { 
    //循环从 data.startIdx 到 data.endIdx 计算部分和。
    // 不需要原子操作，因为只需要读
 sum += view[i]; 
 } 

 // 把结果发送给工作者线程
 self.postMessage(sum); 
}; 

// 发送消息给 TaskWorker , 通知工作者线程:准备好接收任务了
self.postMessage('ready'); 

有了以上代码，利用线程池分派任务的代码可以这样写：
Class TaskWorker { 
 ... 
  // TaskWorker 类定义
} 
Class WorkerPool { 
 ... 
 // WorkerPool 类定义
} 
const totalFloats = 1E8; 
const numTasks = 20; 
const floatsPerTask = totalFloats / numTasks; 
const numWorkers = 4; //总共需要处理的浮点数。  将任务划分为 20 个部分。  每个任务处理的浮点数。   使用 4 个工作者线程。

// 创建线程池,一个包含 4 个工作者线程的线程池，工作者线程的脚本路径为 ./worker.js。
const pool = new WorkerPool(numWorkers, './worker.js'); 

// 创建一个 SharedArrayBuffer 用于存储浮点数，并填充随机浮点数.
let arrayBuffer = new SharedArrayBuffer(4 * totalFloats); 
let view = new Float32Array(arrayBuffer); 
for (let i = 0; i < totalFloats; ++i) { 
 view[i] = Math.random(); 
} 

let partialSumPromises = []; 
for (let i = 0; i < totalFloats; i += floatsPerTask) { 
 partialSumPromises.push( 
 pool.enqueue({ 
 startIdx: i, 
 endIdx: i + floatsPerTask, 
 arrayBuffer: arrayBuffer 
 }) 
 ); 
 //将任务分割成多个部分，每个部分的范围从 startIdx 到 endIdx，并将任务推入 partialSumPromises 数组中。
} 

// 等待所有部分和的 Promise 完成，然后将它们相加，最后打印总和。
Promise.all(partialSumPromises) 
 .then((partialSums) => partialSums.reduce((x, y) => x + y)) 
 .then(console.log); 
//（在这个例子中，和应该约等于 1E8/2）
// 49997075.47203197 
//这个例子展示了如何利用 WorkerPool 和 TaskWorker 并行处理大量数据，从而提高计算效率。

注意:草率地采用并行计算不一定是最好的办法。线程池的调优策略会因计算任务不同和系统硬件不同而不同。
```

## 共享工作者线程

SHARED WORKERS
共享工作者线程或共享线程与专用工作者线程类似，但可以被多个可信任的执行上下文访问。例如，同源的两个标签页可以访问同一个共享工作者线程。SharedWorker 与 Worker 的消息接口稍有不同，包括外部和内部。

共享线程适合开发者希望通过在多个上下文间共享线程减少计算性消耗的情形。比如，可以用一个共享线程管理多个同源页面 WebSocket 消息的发送与接收。共享线程也可以用在同源上下文希望通过一个线程通信的情形。

### 共享工作者线程简介

Shared Worker Basics
从行为上讲，共享工作者线程可以看作是专用工作者线程的一个扩展Behaviorally speaking, shared workers can be considered an extension of dedicated workers。线程创建、线程选项、安全限制和 importScripts()的行为都是相同的。与专用工作者线程一样，共享工作者线程也在独立执行上下文中运行，也只能与其他上下文异步通信。

```js
//1. 创建共享工作者线程Creating a Shared Worker
与专用工作者线程一样，创建共享工作者线程非常常用的方式是通过加载 JavaScript 文件创建。此时，需要给 SharedWorker 构造函数传入文件路径，该构造函数在后台异步加载脚本并实例化共享工作者线程。

下面的例子演示了如何基于绝对路径创建空共享工作者线程：
emptySharedWorker.js
// 空的 JavaScript 线程文件
main.js 
console.log(location.href); // "https://example.com/" 
const sharedWorker = new SharedWorker( 
 location.href + 'emptySharedWorker.js'); 
console.log(sharedWorker); // SharedWorker {} 
前面的例子可以修改为使用相对路径，不过这需要 main.js 和 emptySharedWorker.js在同一个目录下：
const worker = new Worker('./emptyWorker.js'); 
console.log(worker); // Worker {} 

也可以在行内脚本中创建共享工作者线程，但这样做没什么意义。因为每个基于行内脚本字符串创建的 Blob 都会被赋予自己唯一的浏览器内部 URL，所以行内脚本中创建的共享工作者线程始终是唯一的。这里的原因将在下一节介绍。
```

```js
//2. SharedWorker 标识与独占SharedWorker Identity and Single Occupancy
共享工作者线程与专用工作者线程的一个重要区别在于，虽然 Worker()构造函数始终会创建新实例，而 SharedWorker()则只会在相同的标识不存在的情况下才创建新实例。如果的确存在与标识匹配的共享工作者线程，则只会与已有共享者线程建立新的连接。

共享工作者线程标识源自解析后的脚本 URL、工作者线程名称和文档源。例如，下面的脚本将实例化一个共享工作者线程并添加两个连接：
// 实例化一个共享工作者线程
// - 全部基于同源调用构造函数
// - 所有脚本解析为相同的 URL 
// - 所有线程都有相同的名称
new SharedWorker('./sharedWorker.js'); 
new SharedWorker('./sharedWorker.js'); 
new SharedWorker('./sharedWorker.js'); 

类似地，因为下面三个脚本字符串都解析到相同的 URL，所以也只会创建一个共享工作者线程：
// 实例化一个共享工作者线程
// - 全部基于同源调用构造函数
// - 所有脚本解析为相同的 URL 
// - 所有线程都有相同的名称
new SharedWorker('./sharedWorker.js'); 
new SharedWorker('sharedWorker.js'); 
new SharedWorker('https://www.example.com/sharedWorker.js'); 

因为可选的工作者线程名称也是共享工作者线程标识的一部分，所以不同的线程名称会强制浏览器创建多个共享工作者线程。对下面的例子而言，一个名为'foo'，另一个名为'bar'，尽管它们同源且脚本 URL 相同：
// 实例化一个共享工作者线程
// - 全部基于同源调用构造函数
// - 所有脚本解析为相同的 URL 
// - 一个线程名称为'foo'，一个线程名称为'bar' 
new SharedWorker('./sharedWorker.js', {name: 'foo'}); 
new SharedWorker('./sharedWorker.js', {name: 'foo'}); 
new SharedWorker('./sharedWorker.js', {name: 'bar'}); 

共享线程，顾名思义，可以在不同标签页、不同窗口、不同内嵌框架或同源的其他工作者线程之间共享。因此，下面的脚本如果在多个标签页运行，只会在第一次执行时创建一个共享工作者线程，后续执行会连接到该线程：
// 实例化一个共享工作者线程
// - 全部基于同源调用构造函数
// - 所有脚本解析为相同的 URL 
// - 所有线程都有相同的名称
new SharedWorker('./sharedWorker.js'); 

初始化共享线程的脚本只会限制 URL，因此下面的代码会创建两个共享工作者线程，尽管加载了相同的脚本：
// 实例化一个共享工作者线程
// - 全部基于同源调用构造函数
// - '?'导致了两个不同的 URL 
// - 所有线程都有相同的名称
new SharedWorker('./sharedWorker.js'); 
new SharedWorker('./sharedWorker.js?'); 
如果该脚本在两个不同的标签页中运行，同样也只会创建两个共享工作者线程。每个构造函数都会检查匹配的共享工作者线程，然后连接到已存在的那个。
```

```js
//3. 使用 SharedWorker 对象Using the SharedWorker Object
SharedWorker()构造函数返回的 SharedWorker 对象被用作与新创建的共享工作者线程通信的连接点。它可以用来通过 MessagePort 在共享工作者线程和父上下文间传递信息，也可以用来捕获共享线程中发出的错误事件。

SharedWorker 对象支持以下属性。
 onerror：在共享线程中发生 ErrorEvent 类型的错误事件时会调用指定给该属性的处理程序。
 此事件会在共享线程抛出错误时发生。
 此事件也可以通过使用 sharedWorker.addEventListener('error', handler)处理。
 port：专门用来跟共享线程通信的 MessagePort。
```

```js
//4. SharedWorkerGlobalScope
在共享线程内部，全局作用域是 SharedWorkerGlobalScope 的实例。SharedWorkerGlobalScope 继承自 WorkerGlobalScope，因此包括它所有的属性和方法。与专用工作者线程一样，共享工作者线程也可以通过 self 关键字访问该全局上下文。

SharedWorkerGlobalScope 通过以下属性和方法扩展了 WorkerGlobalScope。
 name：可选的字符串标识符，可以传给 SharedWorker 构造函数。
 importScripts()：用于向工作者线程中导入任意数量的脚本。
 close()：与 worker.terminate()对应，用于立即终止工作者线程。没有给工作者线程提供终止前清理的机会；脚本会突然停止。
 onconnect：与共享线程建立新连接时，应将其设置为处理程序。connect 事件包括
MessagePort 实例的 ports 数组，可用于把消息发送回父上下文。
 在通过 worker.port.onmessage 或 worker.port.start()与共享线程建立连接时都会触发 connect 事件。
 connect 事件也可以通过使用 sharedWorker.addEventListener('connect', handler)
处理。

注意:根据浏览器实现，在 SharedWorker 中把日志打印到控制台不一定能在浏览器默认的控制台中看到。
```

### 理解共享工作者线程的生命周期

Understanding the Shared Worker Lifecycle
共享工作者线程的生命周期具有与专用工作者线程相同的阶段的特性。不同之处在于，专用工作者线程只跟一个页面绑定，而共享工作者线程只要还有一个上下文连接就会持续存在 a dedicated worker is inextricably bound to a single page, a shared worker will persist as long as a context remains connected to it。
比如下面的脚本，每次调用它都会创建一个专用工作者线程：
new Worker('./worker.js');

下表详细列出了当三个包含此脚本的标签页按顺序打开和关闭时会发生什么。

| 事件 | 结果 | 事件发生后的线程数 |
| ---- | ---- | ---------------- |
| 标签页 1 | 执行 main.js 创建专用线程 1 | 1 |
| 标签页 2 | 执行 main.js 创建专用线程 2 | 2 |
| 标签页 3 | 执行 main.js 创建专用线程 3 | 3 |
| 标签页 1 | 关闭 专用线程 1 终止 | 2 |
| 标签页 2 | 关闭 专用线程 2 终止 | 1 |
| 标签页 3 | 关闭 专用线程 3 终止 | 0 |

如上表所示，脚本执行次数、打开标签页数和运行的线程数是对等关系。下面再来看看这个简单的脚本，每次执行它都会创建或者连接到共享线程：
``new SharedWorker('./sharedWorker.js');``
下表列出了当三个包含此脚本的标签页按顺序打开和关闭时会发生什么。

| 事件 | 结果 | 事件发生后的线程数 |
| ---- | ---- | ---------------- |
| 标签页 1 | 执行 main.js 创建共享线程 1 | 1 |
| 标签页 2 | 执行 main.js 连接共享线程 1 | 1 |
| 标签页 3 | 执行 main.js 连接共享线程 1 | 1 |
| 标签页 1 | 关闭 断开与共享线程 1 的连接 | 1 |
| 标签页 2 | 关闭 断开与共享线程 1 的连接 | 1 |
| 标签页 3 | 关闭 断开与共享线程 1 的连接。没有连接了，因此终止共享线程 1 | 0 |

如上表所示，标签页 2 和标签页 3 再次调用 new SharedWorker()会连接到已有线程。随着连接的增加和移除，浏览器会记录连接总数。在连接数为 0 时，线程被终止。

关键在于，没有办法以编程方式终止共享线程。前面已经交代过，SharedWorker 对象上没有terminate()方法。在共享线程端口（稍后讨论）上调用 close()时，只要还有一个端口连接到该线程就不会真的终止线程。

SharedWorker 的“连接”与关联 MessagePort 或 MessageChannel 的状态无关。只要建立了连接，浏览器会负责管理该连接。建立的连接会在页面的生命周期内持续存在，只有当页面销毁且没有连接时，浏览器才会终止共享线程。

### 连接到共享工作者线程

```js
//Connecting to a Shared Worker
//每次调用 SharedWorker()构造函数，无论是否创建了工作者线程，都会在共享线程内部触发connect 事件。下面的例子演示了这一点，在循环中调用 SharedWorker()构造函数：
sharedWorker.js 
let i = 0; 
self.onconnect = () => console.log(`connected ${++i} times`); 

main.js 
for (let i = 0; i < 5; ++i) { 
 new SharedWorker('./sharedWorker.js'); 
} 
// connected 1 times 
// connected 2 times 
// connected 3 times 
// connected 4 times 
// connected 5 times 
发生 connect 事件时，SharedWorker()构造函数会隐式创建 MessageChannel 实例，并把
MessagePort 实例的所有权唯一地转移给该 SharedWorker 的实例。这个 MessagePort 实例会保存在 connect 事件对象的 ports 数组中。一个连接事件只能代表一个连接，因此可以假定 ports 数组的长度等于 1。

下面的代码演示了访问事件对象的 ports 数组。这里使用了 Set 来保证只跟踪唯一的对象实例：
sharedWorker.js 
const connectedPorts = new Set(); 
self.onconnect = ({ports}) => { 
 connectedPorts.add(ports[0]); 
 console.log(`${connectedPorts.size} unique connected ports`); 
}; 
main.js 
for (let i = 0; i < 5; ++i) { 
 new SharedWorker('./sharedWorker.js'); 
} 
// 1 unique connected ports 
// 2 unique connected ports 
// 3 unique connected ports 
// 4 unique connected ports 
// 5 unique connected ports 
关键在于，共享线程与父上下文的启动和关闭不是对称的。每个新 SharedWorker 连接都会触发一个事件，但没有事件对应断开 SharedWorker 实例的连接（如页面关闭）。

在前面的例子中，随着与相同共享线程连接和断开连接的页面越来越多，connectedPorts 集合中会受到死端口的污染，没有办法识别它们。一个解决方案是在 beforeunload 事件即将销毁页面时，明确发送卸载消息，让共享线程有机会清除死端口。
```

## 服务工作者线程

SERVICE WORKERS
服务工作者线程（service worker）是一种类似浏览器中代理服务器的线程，可以拦截外出请求和缓存响应。这可以让网页在没有网络连接的情况下正常使用，因为部分或全部页面可以从服务工作者线程缓存中提供服务。服务工作者线程也可以使用 Notifications API、Push API、Background Sync API 和
Channel Messaging API。

与共享工作者线程类似，来自一个域的多个页面共享一个服务工作者线程。不过，为了使用 Push API等特性，服务工作者线程也可以在相关的标签页或浏览器关闭后继续等待到来的推送事件。

无论如何，对于大多数开发者而言，服务工作者线程在两个主要任务上最有用：充当网络请求的缓存层和启用推送通知Ultimately, most developers will find that service workers are most useful for two primary tasks: acting as a caching layer for network requests, and enabling push notifications。在这个意义上，服务工作者线程就是用于把网页变成像原生应用程序一样的工具。

注意:服务工作者线程涉及的内容极其广泛，几乎可以单独写一本书。为了更好地理解这
一话题，推荐有条件的读者学一下 Udacity 的课程“Offline Web Applications”。除此之外，也可以参考 Mozilla 维护的 Service Worker Cookbook 网站，其中包含了常见的服务工作者
线程模式。

注意:服务工作者线程的生命周期取决于打开的同源标签页（称为“客户端”）数量、页面是否发生导航，以及服务脚本是否改变（以及其他一些因素）。如果对服务工作者线程的生命周期认识不够，本节的一些例子可能会让人觉得出乎意料。27.4.5 节详细解释了服务工作者线程的生命周期。

另外，在调试服务工作者线程时，要谨慎使用浏览器的强制刷新功能（Ctrl+Shift+R）。!!!强制刷新会强制浏览器忽略所有网络缓存，而服务工作者线程对大多数主流浏览器而言就是网络缓存!!!。

### 服务工作者线程基础

Service Worker Basics
作为一种工作者线程，服务工作者线程与专用工作者线程和共享工作者线程拥有很多共性。比如，在独立上下文中运行，只能通过异步消息通信。不过，服务工作者线程与专用工作者线程和共享工作者线程还是有很多本质区别的。

```js
//1. ServiceWorkerContainer 提供服务的???
服务工作者线程与专用工作者线程或共享工作者线程的一个区别是没有全局构造函数。服务工作者线程是通过 ServiceWorkerContainer 来管理的，它的实例保存在 navigator.serviceWorker 属
性中。该对象是个顶级接口，通过它可以让浏览器创建、更新、销毁或者与服务工作者线程交互。
console.log(navigator.serviceWorker); 
// ServiceWorkerContainer { ... } 
//navigator 是 Web API 中的一个全局对象，表示用户代理（通常是浏览器）的状态和身份。它提供了许多有用的属性和方法，用于获取浏览器的信息和与用户代理交互。
```

```js
//2. 创建服务工作者线程Creating a Service Worker
与共享工作者线程类似，服务工作者线程同样是在还不存在时创建新实例，在存在时连接到已有实例。ServiceWorkerContainer 没有通过全局构造函数创建，而是暴露了 register()方法，该方法以与 Worker()或 SharedWorker()构造函数相同的方式传递脚本 URL：
emptyServiceWorker.js
// 空服务脚本
main.js
navigator.serviceWorker.register('./emptyServiceWorker.js'); 

register()方法返回一个期约，该期约解决为 ServiceWorkerRegistration 对象，或在注册失败时拒绝。
emptyServiceWorker.js
// 空服务脚本
main.js 
// 注册成功，成功回调（解决）
navigator.serviceWorker.register('./emptyServiceWorker.js') 
 .then(console.log, console.error); 

// ServiceWorkerRegistration { ... } 

// 使用不存在的文件注册，失败回调（拒绝）
navigator.serviceWorker.register('./doesNotExist.js') 
 .then(console.log, console.error); 
// TypeError: Failed to register a ServiceWorker: 
// A bad HTTP response code (404) was received when fetching the script. 

服务工作者线程对于何时注册是比较灵活的。在第一次调用 register()激活服务工作者线程后，后续在同一个页面使用相同 URL 对 register()的调用实际上什么也不会执行。此外，即使浏览器未全局支持服务工作者线程，服务工作者线程本身对页面也应该是不可见的。这是因为它的行为类似代理，就算有需要它处理的操作，也仅仅是发送常规的网络请求。

考虑到上述情况，注册服务工作者线程的一种非常常见的模式是基于特性检测，并在页面的 load事件中操作。比如：
if ('serviceWorker' in navigator) { 
 window.addEventListener('load', () => { 
 navigator.serviceWorker.register('./serviceWorker.js'); 
 }); 
} 

如果没有 load 事件这个门槛，服务工作者线程的注册就会与页面资源的加载重叠，进而拖慢初始页面渲染的过程。除非该服务工作者线程负责管理缓存（这样的话就需要尽早注册，比如使用本章稍后会讨论的 clients.claim()），否则等待 load 事件是个明智的选择，这样同样可以发挥服务工作者线程的价值。
```

```js
//3. 使用 ServiceWorkerContainer 对象Using the ServiceWorkerContainer Object
ServiceWorkerContainer 接口是浏览器对服务工作者线程生态的顶部封装。它为管理服务工作者线程状态和生命周期提供了便利。
ServiceWorkerContainer 始终可以在客户端上下文中访问：
console.log(navigator.serviceWorker); 
// ServiceWorkerContainer { ... } 

ServiceWorkerContainer 支持以下事件处理程序。
 oncontrollerchange：在 ServiceWorkerContainer 触发 controllerchange 事件时会调用指定的事件处理程序。
 此事件在获得新激活的 ServiceWorkerRegistration 时触发。
 此事件也可以使用 navigator.serviceWorker.addEventListener('controllerchange', 
handler)处理。
 onerror：在关联的服务工作者线程触发 ErrorEvent 错误事件时会调用指定的事件处理程序。
 此事件在关联的服务工作者线程内部抛出错误时触发。
 此事件也可以使用 navigator.serviceWorker.addEventListener('error', handler)处理。
 onmessage：在服务工作者线程触发 MessageEvent 事件时会调用指定的事件处理程序。
 此事件在服务脚本向父上下文发送消息时触发。
 此事件也可以使用 navigator.serviceWorker.addEventListener('message', handler)处理。

ServiceWorkerContainer 支持下列属性。
 ready：返回期约，解决为激活的 ServiceWorkerRegistration 对象。该期约不会拒绝。
 controller：返回与当前页面关联的激活的 ServiceWorker 对象，如果没有激活的服务工作者线程则返回 null。

ServiceWorkerContainer 支持下列方法。
 register()：使用接收的 url 和 options 对象创建或更新 ServiceWorkerRegistration。
 getRegistration()：返回期约，解决为与提供的作用域匹配的 ServiceWorkerRegistration对象；如果没有匹配的服务工作者线程则返回 undefined。
 getRegistrations()：返回期约，解决为与 ServiceWorkerContainer 关联的 ServiceWorkerRegistration 对象的数组；如果没有关联的服务工作者线程则返回空数组。
 startMessage()：开始传送通过 Client.postMessage()派发的消息。
```

```js
//4. 使用 ServiceWorkerRegistration 对象
ServiceWorkerRegistration 对象表示注册成功的服务工作者线程。该对象可以在 register()返回的解决期约的处理程序中访问到。通过它的一些属性可以确定关联服务工作者线程的生命周期状态。

调用 navigator.serviceWorker.register()之后返回的期约会将注册成功的 ServiceWorkerRegistration 对象（注册对象）发送给处理函数。在同一页面使用同一 URL 多次调用该方法会返回相同的注册对象。
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registrationA) => { 
 console.log(registrationA); 
 navigator.serviceWorker.register('./serviceWorker2.js') 
 .then((registrationB) => { 
 console.log(registrationA === registrationB); 
 }); 
}); 

ServiceWorkerRegistration 支持以下事件处理程序。
 onupdatefound：在服务工作者线程触发 updatefound 事件时会调用指定的事件处理程序。
 此事件会在服务工作者线程开始安装新版本时触发，表现为 ServiceWorkerRegistration. 
installing 收到一个新的服务工作者线程。
 此事件也可以使用 serv serviceWorkerRegistration.addEventListener('updatefound', 
handler)处理。

ServiceWorkerRegistration 支持以下通用属性。
 scope：返回服务工作者线程作用域的完整 URL 路径。该值源自接收服务脚本的路径和在
register()中提供的作用域。
 navigationPreload：返回与注册对象关联的 NavigationPreloadManager 实例。
 pushManager：返回与注册对象关联的 pushManager 实例。

ServiceWorkerRegistration 还支持以下属性，可用于判断服务工作者线程处于生命周期的什么阶段。
 installing：如果有则返回状态为 installing（安装）的服务工作者线程，否则为 null。
 waiting：如果有则返回状态为 waiting（等待）的服务工作者线程，否则为 null。
 active：如果有则返回状态 activating 或 active（活动）的服务工作者线程，否则为 null。

注意，这些属性都是服务工作者线程状态的一次性快照。这在大多数情况下是没有问题的，因为活动状态的服务工作者线程在页面的生命周期内不会改变状态，除非强制这样做（比如调用 ServiceWorkerGlobalScope.skipWaiting()）。

ServiceWorkerRegistration 支持下列方法。
 getNotifications()：返回期约，解决为 Notification 对象的数组。
 showNotifications()：显示通知，可以配置 title 和 options 参数。
 update()：直接从服务器重新请求服务脚本，如果新脚本不同，则重新初始化。
 unregister()：取消服务工作者线程的注册。该方法会在服务工作者线程执行完再取消注册。
```

```js
//5. 使用 ServiceWorker 对象
ServiceWorker 对象可以通过两种方式获得：通过 ServiceWorkerContainer 对象的 controller属性和通过 ServiceWorkerRegistration 的 active 属性。该对象继承 Worker 原型，因此包括其所有属性和方法，但没有 terminate()方法。

ServiceWorker 支持以下事件处理程序。
 onstatechange：ServiceWorker 发生 statechange 事件时会调用指定的事件处理程序。
 此事件会在 ServiceWorker.state 变化时发生。
 此事件也可以使用 serviceWorker.addEventListener('statechange', handler)处理。

ServiceWorker 支持以下属性。
 scriptURL：解析后注册服务工作者线程的 URL。例如，如果服务工作者线程是通过相对路径
'./serviceWorker.js'创建的，且注册在 https://www.example.com 上，则 scriptURL 属性将
返回"https://www.example.com/serviceWorker.js"。
 state：表示服务工作者线程状态的字符串，可能的值如下。
 installing
 installed
 activating
 activated
 redundant
```

```js
//6. 服务工作者线程的安全限制
与其他工作者线程一样，服务工作者线程也受加载脚本对应源的常规限制（更多信息参见 27.2.1 节）。
此外，由于服务工作者线程几乎可以任意修改和重定向网络请求，以及加载静态资源，服务工作者线程
API 只能在安全上下文（HTTPS）下使用。在非安全上下文（HTTP）中，navigator.serviceWorker
是 undefined。为方便开发，浏览器豁免了通过 localhost 或 127.0.0.1 在本地加载的页面的安全上
下文规则。
注意 可以通过 window.isSecureContext 确定当前上下文是否安全。
```

```js
//7. ServiceWorkerGlobalScope
在服务工作者线程内部，全局上下文是 ServiceWorkerGlobalScope 的实例。ServiceWorkerGlobalScope 继承自 WorkerGlobalScope，因此拥有它的所有属性和方法。服务工作者线程可以通
过 self 关键字访问该全局上下文。
ServiceWorkerGlobalScope 通过以下属性和方法扩展了 WorkerGlobalScope。
 caches：返回服务工作者线程的 CacheStorage 对象。
 clients：返回服务工作者线程的 Clients 接口，用于访问底层 Client 对象。
 registration：返回服务工作者线程的 ServiceWorkerRegistration 对象。
 skipWaiting()：强制服务工作者线程进入活动状态；需要跟 Clients.claim()一起使用。
 fetch()：在服务工作者线程内发送常规网络请求；用于在服务工作者线程确定有必要发送实
际网络请求（而不是返回缓存值）时。
虽然专用工作者线程和共享工作者线程只有一个 message 事件作为输入，但服务工作者线程则可
以接收很多事件，包括页面操作、通知操作触发的事件或推送事件。
注意 根据浏览器实现，在 SeviceWorker 中把日志打印到控制台不一定能在浏览器默
认控制台中看到。
服务工作者线程的全局作用域可以监听以下事件，这里进行了分类。
 服务工作者线程状态
 install：在服务工作者线程进入安装状态时触发（在客户端可以通过 ServiceWorkerRegistration.installing 判断）。也可以在self.onintall 属性上指定该事件的处理程序。
 这是服务工作者线程接收的第一个事件，在线程一开始执行时就会触发。
 每个服务工作者线程只会调用一次。
 activate ：在服务工作者线程进入 激 活 或 已激活 状态时触发（在客户端可以通过
ServiceWorkerRegistration.active 判断）。也可以在 self.onactive 属性上指定该事件
的处理程序。
 此事件在服务工作者线程准备好处理功能性事件和控制客户端时触发。
 此事件并不代表服务工作者线程在控制客户端，只表明具有控制客户端的条件。
 Fetch API 
 fetch：在服务工作者线程截获来自主页面的 fetch()请求时触发。服务工作者线程的 fetch
事件处理程序可以访问 FetchEvent，可以根据需要调整输出。也可以在 self.onfetch 属性
上指定该事件的处理程序。
 Message API 
 message：在服务工作者线程通过 postMesssage()获取数据时触发。也可以在 self.onmessage
属性上指定该事件的处理程序。
 Notification API 
 notificationclick：在系统告诉浏览器用户点击了 ServiceWorkerRegistration.showNotification()生成的通知时触发。也可以在 self.onnotificationclick 属性上指定该事件的
处理程序。
 notificationclose：在系统告诉浏览器用户关闭或取消显示了 ServiceWorkerRegistration. 
showNotification()生成的通知时触发。也可以在 self.onnotificationclose 属性上指
定该事件的处理程序。
 Push API 
 push：在服务工作者线程接收到推送消息时触发。也可以在 self.onpush 属性上指定该事件
的处理程序。
 pushsubscriptionchange：在应用控制外的因素（非 JavaScript 显式操作）导致推送订阅状
态变化时触发。也可以在 self.onpushsubscriptionchange 属性上指定该事件的处理程序。
注意 有些浏览器也支持 async 事件，该事件是在 Background Sync API 中定义的。
Background Sync API 还没有标准化，目前只有 Chrome 和 Opera 支持，因此本书没介绍。
```

```js
//8. 服务工作者线程作用域限制
服务工作者线程只能拦截其作用域内的客户端发送的请求。作用域是相对于获取服务脚本的路径定
义的。如果没有在 register()中指定，则作用域就是服务脚本的路径。
（本章中涉及注册服务工作者线程的例子都使用脚本绝对 URL，以避免混淆。）下面第一个例子演示
通过根目录获取服务脚本对应的默认根作用域：
navigator.serviceWorker.register('/serviceWorker.js') 
.then((serviceWorkerRegistration) => { 
 console.log(serviceWorkerRegistration.scope); 
 // https://example.com/ 
}); 
// 以下请求都会被拦截：
// fetch('/foo.js'); 
// fetch('/foo/fooScript.js'); 
// fetch('/baz/bazScript.js'); 
下面的例子演示了通过根目录获取服务脚本但指定了同一目录作用域：
navigator.serviceWorker.register('/serviceWorker.js', {scope: './'}) 
.then((serviceWorkerRegistration) => { 
 console.log(serviceWorkerRegistration.scope); 
 // https://example.com/ 
}); 
// 以下请求都会被拦截：
// fetch('/foo.js'); 
// fetch('/foo/fooScript.js'); 
// fetch('/baz/bazScript.js'); 
下面的例子演示了通过根目录获取服务脚本但限定了目录作用域：
navigator.serviceWorker.register('/serviceWorker.js', {scope: './foo'}) 
.then((serviceWorkerRegistration) => { 
 console.log(serviceWorkerRegistration.scope); 
 // https://example.com/foo/ 
}); 
// 以下请求都会被拦截：
// fetch('/foo/fooScript.js'); 
// 以下请求都不会被拦截：
// fetch('/foo.js'); 
// fetch('/baz/bazScript.js');
下面的例子演示了通过嵌套的二级目录获取服务脚本对应的同一目录作用域：
navigator.serviceWorker.register('/foo/serviceWorker.js') 
.then((serviceWorkerRegistration) => { 
 console.log(serviceWorkerRegistration.scope); 
 // https://example.com/foo/ 
}); 
// 以下请求都会被拦截：
// fetch('/foo/fooScript.js'); 
// 以下请求都不会被拦截：
// fetch('/foo.js'); 
// fetch('/baz/bazScript.js'); 
服务工作者线程的作用域实际上遵循了目录权限模型，即只能相对于服务脚本所在路径缩小作用
域。像下面这样扩展作用域会抛出错误：
navigator.serviceWorker.register('/foo/serviceWorker.js', {scope: '/'}); 
// Error: The path of the provided scope 'https://example.com/' 
// is not under the max scope allowed 'https://example.com/foo/' 
通常，服务工作者线程作用域会使用末尾带斜杠的绝对路径来定义，比如：
navigator.serviceWorker.register('/serviceWorker.js', {scope: '/foo/'}) 
这样定义作用域有两个目的：将脚本文件的相对路径与作用域的相对路径分开，同时将该路径本身
排除在作用域之外。例如，对于前面的代码片段而言，可能不需要在服务工作者线程的作用域中包含路
径/foo。在末尾加上一个斜杠就可以明确排除/foo。当然，这要求绝对作用域路径不能扩展到服务工
作者线程路径外。
如果想扩展服务工作者线程的作用域，主要有两种方式。
 通过包含想要的作用域的路径提供（获取）服务脚本。
 给服务脚本的响应添加 Service-Worker-Allowed 头部，把它的值设置为想要的作用域。该
作用域值应该与 register()中的作用域值一致。
```

### 服务工作者线程缓存

在服务工作者线程之前，网页缺少缓存网络请求的稳健机制。浏览器一直使用 HTTP 缓存，但 HTTP
缓存并没有对 JavaScript 暴露编程接口，且其行为是受 JavaScript 运行时外部控制的。可以开发临时缓存
机制，缓存响应字符串或 blob，但这种策略比较麻烦且效率低。
JavaScript 缓存的实现之前也有过尝试。MDN 文档也介绍了：
之前的尝试，即 AppCache，看起来是个不错的想法，因为它支持非常容易地指定要缓存
的资源。可是，它对你想要做的事情做了很多假设，当应用程序没有完全遵循这些假设时，它
就崩溃了。
服务工作者线程的一个主要能力是可以通过编程方式实现真正的网络请求缓存机制。与 HTTP 缓存
或 CPU 缓存不同，服务工作者线程缓存非常简单。
 服务工作者线程缓存不自动缓存任何请求。所有缓存都必须明确指定。
 服务工作者线程缓存没有到期失效的概念。除非明确删除，否则缓存内容一直有效。
 服务工作者线程缓存必须手动更新和删除。
 缓存版本必须手动管理。每次服务工作者线程更新，新服务工作者线程负责提供新的缓存键以
保存新缓存。
 唯一的浏览器强制逐出策略基于服务工作者线程缓存占用的空间。服务工作者线程负责管理自
己缓存占用的空间。缓存超过浏览器限制时，浏览器会基于最近最少使用（LRU，Least Recently Used）原则为新缓存腾出空间。
本质上，服务工作者线程缓存机制是一个双层字典，其中顶级字典的条目映射到二级嵌套字典。顶
级字典是 CacheStorage 对象，可以通过服务工作者线程全局作用域的 caches 属性访问。顶级字典
中的每个值都是一个 Cache 对象，该对象也是个字典，是 Request 对象到 Response 对象的映射。
与 LocalStorage 一样，Cache 对象在 CacheStorage 字典中无限期存在，会超出浏览器会话的
界限。此外，Cache 条目只能以源为基础存取。
注意 虽然 CacheStorage 和 Cache 对象是在 Service Worker 规范中定义的，但它们
也可以在主页面或其他工作者线程中使用。

```js
//1. CacheStorage 对象
CacheStorage 对象是映射到 Cache 对象的字符串键/值存储。CacheStorage 提供的 API 类似于
异步 Map。CacheStorage 的接口通过全局对象的 caches 属性暴露出来。
console.log(caches); // CacheStorage {} 
CacheStorage 中的每个缓存可以通过给 caches.open()传入相应字符串键取得。非字符串键会
转换为字符串。如果缓存不存在，就会创建。
Cache 对象是通过期约返回的：
caches.open('v1').then(console.log); 
// Cache {} 
与 Map 类似，CacheStorage 也有 has()、delete()和 keys()方法。这些方法与 Map 上对应方
法类似，但都基于期约。
// 打开新缓存 v1 
// 检查缓存 v1 是否存在
// 检查不存在的缓存 v2 
caches.open('v1') 
.then(() => caches.has('v1')) 
.then(console.log) // true
.then(() => caches.has('v2')) 
.then(console.log); // false
// 打开新缓存 v1 
// 检查缓存 v1 是否存在
// 删除缓存 v1
// 再次检查缓存 v1 是否存在
caches.open('v1') 
.then(() => caches.has('v1')) 
.then(console.log) // true
.then(() => caches.delete('v1')) 
.then(() => caches.has('v1')) 
.then(console.log); // false
// 打开缓存 v1、v3 和 v2
// 检查当前缓存的键
// 注意：缓存键按创建顺序输出
caches.open('v1') 
.then(() => caches.open('v3')) 
.then(() => caches.open('v2')) 
.then(() => caches.keys()) 
.then(console.log); // ["v1", "v3", "v2"]
CacheStorage 接口还有一个 match()方法，可以根据 Request 对象搜索 CacheStorage 中的所
有 Cache 对象。搜索顺序是 CacheStorage.keys()的顺序，返回匹配的第一个响应：
// 创建一个请求键和两个响应值
const request = new Request(''); 
const response1 = new Response('v1'); 
const response2 = new Response('v2'); 
// 用同一个键创建两个缓存对象，最终会先找到 v1 
// 因为它排在 caches.keys()输出的前面
caches.open('v1') 
.then((v1cache) => v1cache.put(request, response1)) 
.then(() => caches.open('v2')) 
.then((v2cache) => v2cache.put(request, response2)) 
.then(() => caches.match(request)) 
.then((response) => response.text()) 
.then(console.log); // v1
CacheStorage.match()可以接收一个 options 配置对象。下一节会介绍该对象。
```

```js
//2. Cache 对象
CacheStorage 通过字符串映射到 Cache 对象。Cache 对象跟 CacheStorage 一样，类似于异步
的 Map。Cache 键可以是 URL 字符串，也可以是 Request 对象。这些键会映射到 Response 对象。
服务工作者线程缓存只考虑缓存 HTTP 的 GET 请求。这样是合理的，因为 GET 请求的响应通常不
会随时间而改变。另一方面，默认情况下，Cache 不允许使用 POST、PUT 和 DELETE 等请求方法。这
些方法意味着与服务器动态交换信息，因此不适合客户端缓存。
为填充 Cache，可能使用以下三个方法。
 put(request, response)：在键（Request 对象或 URL 字符串）和值（Response 对象）
同时存在时用于添加缓存项。该方法返回期约，在添加成功后会解决。
 add(request)：在只有 Request 对象或 URL 时使用此方法发送 fetch()请求，并缓存响应。
该方法返回期约，期约在添加成功后会解决。
 addAll(requests)：在希望填充全部缓存时使用，比如在服务工作者线程初始化时也初始化
缓存。该方法接收 URL 或 Request 对象的数组。addAll()会对请求数组中的每一项分别调用
add()。该方法返回期约，期约在所有缓存内容添加成功后会解决。
与 Map 类似，Cache 也有 delete()和 keys()方法。这些方法与 Map 上对应方法类似，但都基于
期约。
const request1 = new Request('https://www.foo.com'); 
const response1 = new Response('fooResponse'); 
caches.open('v1') 
.then((cache) => { 
 cache.put(request1, response1) 
 .then(() => cache.keys()) 
 .then(console.log) // [Request]
 .then(() => cache.delete(request1)) 
 .then(() => cache.keys()) 
 .then(console.log); // [] 
}); 
要检索 Cache，可以使用下面的两个方法。
 matchAll(request, options)：返回期约，期约解决为匹配缓存中 Response 对象的数组。
 此方法对结构类似的缓存执行批量操作，比如删除所有缓存在/images 目录下的值。
 可以通过 options 对象配置请求匹配方式，本节稍后会介绍。
 match(request, options)：返回期约，期约解决为匹配缓存中的 Response 对象；如果没
命中缓存则返回 undefined。
 本质上相当于 matchAll(request, options)[0]。
 可以通过 options 对象配置请求匹配方式，本节稍后会介绍。
缓存是否命中取决于 URL 字符串和/或 Request 对象 URL 是否匹配。URL 字符串和 Request 对
象是可互换的，因为匹配时会提取 Request 对象的 URL。下面的例子演示了这种互换性：
const request1 = 'https://www.foo.com'; 
const request2 = new Request('https://www.bar.com');
const response1 = new Response('fooResponse'); 
const response2 = new Response('barResponse'); 
caches.open('v1').then((cache) => { 
 cache.put(request1, response1) 
 .then(() => cache.put(request2, response2)) 
 .then(() => cache.match(new Request('https://www.foo.com'))) 
 .then((response) => response.text()) 
 .then(console.log) // fooResponse
 .then(() => cache.match('https://www.bar.com')) 
 .then((response) => response.text()) 
 .then(console.log); // barResponse
}); 
Cache 对象使用 Request 和 Response 对象的 clone()方法创建副本，并把它们存储为键/值对。
下面的例子演示了这一点，因为从缓存中取得的实例并不等于原始的键/值对：
const request1 = new Request('https://www.foo.com'); 
const response1 = new Response('fooResponse'); 
caches.open('v1') 
.then((cache) => { 
 cache.put(request1, response1) 
 .then(() => cache.keys()) 
 .then((keys) => console.log(keys[0] === request1)) // false 
 .then(() => cache.match(request1)) 
 .then((response) => console.log(response === response1)); // false 
}); 
Cache.match()、Cache.matchAll()和 CacheStorage.match()都支持可选的 options 对象，
它允许通过设置以下属性来配置 URL 匹配的行为。
 cacheName：只有 CacheStorage.matchAll()支持。设置为字符串时，只会匹配 Cache 键为
指定字符串的缓存值。
 ignoreSearch：设置为 true 时，在匹配 URL 时忽略查询字符串，包括请求查询和缓存键。
例如，https://example.com?foo=bar 会匹配 https://example.com。
 ignoreMethod：设置为 true 时，在匹配 URL 时忽略请求查询的 HTTP 方法。比如下面的例
子展示了 POST 请求匹配 GET 请求：
const request1 = new Request('https://www.foo.com'); 
const response1 = new Response('fooResponse'); 
const postRequest1 = new Request('https://www.foo.com', 
 { method: 'POST' }); 
caches.open('v1') 
.then((cache) => { 
 cache.put(request1, response1) 
 .then(() => cache.match(postRequest1)) 
 .then(console.log) // undefined
 .then(() => cache.match(postRequest1, { ignoreMethod: true })) 
 .then(console.log); // Response {}
}); 
 ignoreVary：匹配的时候考虑 HTTP 的 Vary 头部，该头部指定哪个请求头部导致服务器响应
不同的值。ignoreVary 设置为 true 时，在匹配 URL 时忽略 Vary 头部。
const request1 = new Request('https://www.foo.com'); 
const response1 = new Response('fooResponse', 
 { headers: {'Vary': 'Accept' }}); 
const acceptRequest1 = new Request('https://www.foo.com', 
 { headers: { 'Accept': 'text/json' } }); 
caches.open('v1') 
.then((cache) => { 
 cache.put(request1, response1) 
 .then(() => cache.match(acceptRequest1)) 
 .then(console.log) // undefined
 .then(() => cache.match(acceptRequest1, { ignoreVary: true })) 
 .then(console.log); // Response {}
}); 
```

```js
//3. 最大存储空间
浏览器需要限制缓存占用的磁盘空间，否则无限制存储势必会造成滥用。该存储空间的限制没有任
何规范定义，完全由浏览器供应商的个人喜好决定。
使用 StorageEstimate API 可以近似地获悉有多少空间可用（以字节为单位），以及当前使用了多少
空间。此方法只在安全上下文中可用：
navigator.storage.estimate()
.then(console.log); 
// 不同浏览器的输出可能不同：
// { quota: 2147483648, usage: 590845 } 
根据 Service Worker 规范：
这些并不是确切的数值，考虑到压缩、去重和混淆等安全原因，该数字并不精确。
```

### 服务工作者线程客户端

服务工作者线程会使用 Client 对象跟踪关联的窗口、工作线程或服务工作者线程。服务工作者线
程可以通过 Clients 接口访问这些 Client 对象。该接口暴露在全局上下文的 self.clients 属性上。
Client 对象支持以下属性和方法。
 id：返回客户端的全局唯一标识符，例如 7e4248ec-b25e-4b33-b15f-4af8bb0a3ac4。id
可用于通过 Client.get()获取客户端的引用。
 type：返回表示客户端类型的字符串。type 可能的值是 window、worker 或 sharedworker。
 url：返回客户端的 URL。
 postMessage()：用于向单个客户端发送消息。
Clients 接口支持通过 get()或 matchAll()访问 Client 对象。这两个方法都通过期约返回结果。
matchAll()也可以接收 options 对象，该对象支持以下属性。
 includeUncontrolled：在设置为 true 时，返回结果包含不受当前服务工作者线程控制的客
户端。默认为 false。
 type：可以设置为 window、worker 或 sharedworker，对返回结果进行过滤。默认为 all，
返回所有类型的客户端。
Clients 接口也支持以下方法。
 openWindow(url)：在新窗口中打开指定 URL，实际上会给当前服务工作者线程添加一个新
Client。这个新 Client 对象以解决的期约形式返回。该方法可用于回应点击通知的操作，此
时服务工作者线程可以检测单击事件并作为响应打开一个窗口。
 claim()：强制性设置当前服务工作者线程以控制其作用域中的所有客户端。claim()可用于不
希望等待页面重新加载而让服务工作者线程开始管理页面。

### 服务工作者线程与一致性

理解服务工作者线程最终用途十分重要：让网页能够模拟原生应用程序。要像原生应用程序一样，
服务工作者线程必须支持版本控制（versioning）。
从全局角度说，服务工作者线程的版本控制可以确保任何时候两个网页的操作都有一致性。该一致
性可以表现为如下两种形式。
 代码一致性。网页不是像原生应用程序那样基于一个二进制文件创建，而是由很多 HTML、CSS、
JavaScript、图片、JSON，以及页面可能加载的任何类型的文件创建。网页经常会递增更新，即
版本升级，以增加或修改行为。如果网页总共加载了 100 个文件，而加载的资源同时来自第 1
版和第 2 版，那么就会导致完全无法预测，而且很可能出错。服务工作者线程为此提供了一种强
制机制，确保来自同源的所有并存页面始终会使用来自相同版本的资源。
 数据一致性。网页并非与外界隔绝的应用程序。它们会通过各种浏览器 API 如 LocalStorage
或 IndexedDB 在本地读取并写入数据；也会向远程 API 发送请求并获取数据。这些获取和写入
数据的格式在不同版本中可能也会变化。如果一个页面以第 1 版中的格式写入了数据，第二个页面以第 2 版中的格式读取该数据就会导致无法预测的结果甚至出错。服务工作者线程的资源一致
性机制可以保证网页输入/输出行为对同源的所有并存网页都相同。
为确保一致性，服务工作者线程的生命周期不遗余力地避免出现有损一致性的现象。比如下面这些
可能。
 服务工作者线程提早失败。在安装服务工作者线程时，任何预料之外的问题都可能阻止服务工
作者线程成功安装。包括服务脚本加载失败、服务脚本中存在语法或运行时错误、无法通过
importScripts()加载工作者线程依赖，甚至加载某个缓存资源失败。
 服务工作者线程激进更新。浏览器再次加载服务脚本时（无论通过 register()手动加载还是基
于页面重载），服务脚本或通过 importScripts()加载的依赖中哪怕有一个字节的差异，也会
启动安装新版本的服务工作者线程。
 未激活服务工作者线程消极活动。当页面上第一次调用 register()时，服务工作者线程会被安
装，但不会被激活，并且在导航事件发生前不会控制页面。这应该是合理的：可以认为当前页
面已加载了资源，因此服务工作者线程不应该被激活，否则就会加载不一致的资源。
 活动的服务工作者线程粘连。只要至少有一个客户端与关联到活动的服务工作者线程，浏览器
就会在该源的所有页面中使用它。浏览器可以安装新服务工作者线程实例以替代这个活动的实
例，但浏览器在与活动实例关联的客户端为 0（或强制更新服务工作者线程）之前不会切换到新
工作者线程。这个服务工作者线程逐出策略能够防止两个客户端同时运行两个不同版本的服务
工作者线程。

### 理解服务工作者线程的生命周期

Service Worker 规范定义了 6 种服务工作者线程可能存在的状态：已解析（parsed）、安装中
（installing）、已安装（installed）、激活中（activating）、已激活（activated）和已失效（redundant）。完整
的服务工作者线程生命周期会以该顺序进入相应状态，尽管有可能不会进入每个状态。安装或激活服务
工作者线程时遇到错误会跳到已失效状态。
上述状态的每次变化都会在 ServiceWorker 对象上触发 statechange 事件，可以像下面这样为
它添加一个事件处理程序：

```js
navigator.serviceWorker.register('./serviceWorker.js')
.then((registration) => {
 registration.installing.onstatechange = ({ target: { state } }) => {
 console.log('state changed to', state);
 };
});
```

```js
//1. 已解析状态
调用 navigator.serviceWorker.register()会启动创建服务工作者线程实例的过程。刚创建的服
务工作者线程实例会进入已解析状态。该状态没有事件，也没有与之相关的 ServiceWorker.state 值。
注意 虽然已解析（parsed）是 Service Worker 规范正式定义的一个状态，但 ServiceWorker.prototype.state 永远不会返回"parsed"。通过该属性能够返回的最早阶段
是 installing。
浏览器获取脚本文件，然后执行一些初始化任务，服务工作者线程的生命周期就开始了。
(1) 确保服务脚本来自相同的源。
(2) 确保在安全上下文中注册服务工作者线程。
(3) 确保服务脚本可以被浏览器 JavaScript 解释器成功解析而不会抛出任何错误。
(4) 捕获服务脚本的快照。下一次浏览器下载到服务脚本，会与这个快照对比差异，并据此决定是
否应该更新服务工作者线程。
所有这些任务全部成功，则 register()返回的期约会解决为一个 ServiceWorkerRegistration
对象。新创建的服务工作者线程实例进入到安装中状态。
```

```js
//2. 安装中状态
安装中状态是执行所有服务工作者线程设置任务的状态。这些任务包括在服务工作者线程控制页面
前必须完成的操作。
在客户端，这个阶段可以通过检查 ServiceWorkerRegistration.installing 是否被设置为
ServiceWorker 实例：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.installing) { 
 console.log('Service worker is in the installing state'); 
 } 
}); 
关联的 ServiceWorkerRegistration 对象也会在服务工作者线程到达该状态时触发 updatefound
事件：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 registration.onupdatefound = () => 
 console.log('Service worker is in the installing state'); 
 }; 
}); 
在服务工作者线程中，这个阶段可以通过给 install 事件添加处理程序来确定：
self.oninstall = (installEvent) => { 
 console.log('Service worker is in the installing state'); 
}; 
安装中状态频繁用于填充服务工作者线程的缓存。服务工作者线程在成功缓存指定资源之前可以一
直处于该状态。如果任何资源缓存失败，服务工作者线程都会安装失败并跳至已失效状态。
服务工作者线程可以通过ExtendableEvent停留在安装中状态。InstallEvent继承自ExtendableEvent，因此暴露了一个 API，允许将状态过渡延迟到期约解决。为此要调用 ExtendableEvent. 
waitUntil()方法，该方法接收一个期约参数，会将状态过渡延迟到这个期约解决。例如，下面的例子
可以延迟 5 秒再将状态过渡到已安装状态：
self.oninstall = (installEvent) => { 
 installEvent.waitUntil( 
 new Promise((resolve, reject) => setTimeout(resolve, 5000)) 
 ); 
}; 
更接近实际的例子是通过 Cache.addAll()缓存一组资源之后再过渡：
const CACHE_KEY = 'v1'; 
self.oninstall = (installEvent) => { 
 installEvent.waitUntil( 
 caches.open(CACHE_KEY) 
 .then((cache) => cache.addAll([ 
 'foo.js', 
 'bar.html', 
 'baz.css', 
 ])) 
 ); 
}; 
如果没有错误发生或者没有拒绝，服务工作者线程就会前进到已安装状态。
```

```js
//3. 已安装状态
已安装状态也称为等待中（waiting）状态，意思是服务工作者线程此时没有别的事件要做，只是准
备在得到许可的时候去控制客户端。如果没有活动的服务工作者线程，则新安装的服务工作者线程会跳
到这个状态，并直接进入激活中状态，因为没有必要再等了。
在客户端，这个阶段可以通过检查 ServiceWorkerRegistration.waiting 是否被设置为一个
ServiceWorker 实例来确定：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.waiting) { 
 console.log('Service worker is in the installing/waiting state'); 
 }
}); 
如果已有了一个活动的服务工作者线程，则已安装状态是触发逻辑的好时机，这样会把这个新服务
工作者线程推进到激活中状态。可以通过 self.skipWaiting()强制推进服务工作者线程的状态，也
可以通过提示用户重新加载应用程序，从而使浏览器可以按部就班地推进。
```

```js
//4. 激活中状态
激活中状态表示服务工作者线程已经被浏览器选中即将变成可以控制页面的服务工作者线程。如果
浏览器中没有活动服务工作者线程，这个新服务工作者线程会自动到达激活中状态。如果有一个活动服
务工作者线程，则这个作为替代的服务工作者线程可以通过如下方式进入激活中状态。
 原有服务工作者线程控制的客户端数量变为 0。这通常意味着所有受控的浏览器标签页都被关
闭。在下一个导航事件时，新服务工作者线程会到达激活中状态。
 已安装的服务工作者线程调用 self.skipWaiting()。这样可以立即生效，而不必等待一次导
航事件。
在激活中状态下，不能像已激活状态中那样执行发送请求或推送事件的操作。
在客户端，这个阶段大致可以通过检查 ServiceWorkerRegistration.active 是否被设置为一
个 ServiceWorker 实例来确定：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.active) { 
 console.log('Service worker is in the activating/activated state'); 
 } 
}); 
注意，ServiceWorkerRegistration.active 属性表示服务工作者线程可能在激活中状态，也
可能在已激活状态。
在这个服务工作者线程内部，可以通过给 activate 事件添加处理程序来获悉：
self.oninstall = (activateEvent) => { 
 console.log('Service worker is in the activating state'); 
}; 
activate 事件表示可以将老服务工作者线程清理掉了，该事件经常用于清除旧缓存数据和迁移数
据库。例如，下面的代码清除了所有版本比较老的缓存：
const CACHE_KEY = 'v3'; 
self.oninstall = (activateEvent) => { 
 caches.keys() 
 .then((keys) => keys.filter((key) => key != CACHE_KEY)) 
 .then((oldKeys) => oldKeys.forEach((oldKey) => caches.delete(oldKey)); 
}; 
activate 事件也继承自 ExtendableEvent，因此也支持 waitUntil()方法，可以延迟过渡到已
激活状态，或者基于期约拒绝过渡到已失效状态。
注意 服务工作者线程中的 activate 事件并不代表服务工作者线程正在控制客户端。
```

```js
//5. 已激活状态
已激活状态表示服务工作者线程正在控制一个或多个客户端。在这个状态，服务工作者线程会捕获
其作用域中的 fetch()事件、通知和推送事件。
在客户端，这个阶段大致可以通过检查 ServiceWorkerRegistration.active 是否被设置为一
个 ServiceWorker 实例来确定：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.active) { 
 console.log('Service worker is in the activating/activated state'); 
 }
}); 
注意，ServiceWorkerRegistration.active 属性表示服务工作者线程可能在激活中状态，也
可能在已激活状态。
更可靠的确定服务工作者线程处于已激活状态一种方式是检查 ServiceWorkerRegistration 的
controller 属性。该属性会返回激活的 ServiceWorker 实例，即控制页面的实例：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.controller) { 
 console.log('Service worker is in the activated state'); 
 } 
}); 
在新服务工作者线程控制客户端时，该客户端中的 ServiceWorkerContainer 会触发 controllerchange 事件：
navigator.serviceWorker.oncontrollerchange = () => { 
 console.log('A new service worker is controlling this client'); 
}; 
另外，也可以使用 ServiceWorkerContainer.ready 期约来检测活动服务工作者线程。该期约
会在当前页面拥有活动工作者线程时立即解决：
navigator.serviceWorker.ready.then(() => { 
 console.log('A new service worker is controlling this client'); 
}); 
```

```js
//6. 已失效状态
已失效状态表示服务工作者线程已被宣布死亡。不会再有事件发送给它，浏览器随时可能销毁它并
回收它的资源。
7. 更新服务工作者线程
因为版本控制的概念根植于服务工作者线程的整个生命周期，所以服务工作者线程会随着版本变
化。为此，服务工作者线程提供了稳健同时也复杂的流程，以安装替换过时的服务工作者线程。
这个更新流程的初始阶段是更新检查，也就是浏览器重新请求服务脚本。以下事件可以触发更新检查。
 以创建当前活动服务工作者线程时不一样的URL调用navigator.serviceWorker.register()。
 浏览器导航到服务工作者线程作用域中的一个页面。
 发生了 fetch()或 push()等功能性事件，且至少 24 小时内没有发生更新检查。
新获取的服务脚本会与当前服务工作者线程的脚本比较差异。如果不相同，浏览器就会用新脚本初
始化一个新的服务工作者线程。更新的服务工作者线程进入自己的生命周期，直至抵达已安装状态。到
达已安装状态后，更新服务工作者线程会等待浏览器决定让它安全地获得页面的控制权（或用户强制它
获得页面控制权）。
关键在于，刷新页面不会让更新服务工作者线程进入激活状态并取代已有的服务工作者线程。比如，
有个打开的页面，其中有一个服务工作者线程正在控制它，而一个更新服务工作者线程正在已安装状态
中等待。客户端在页面刷新期间会发生重叠，即旧页面还没有卸载，新页面已加载了。因此，现有的服
务工作者线程永远不会让出控制权，毕竟至少还有一个客户端在它的控制之下。为此，取代现有服务工
作者线程唯一的方式就是关闭所有受控页面。
```

### 控制反转与服务工作者线程持久化

虽然专用工作者线程和共享工作者线程是有状态的，但服务工作者线程是无状态的。更具体地说，
服务工作者线程遵循控制反转（IoC，Inversion of Control）模式并且是事件驱动的。
这样就意味着服务工作者线程不应该依赖工作者线程的全局状态。服务工作者线程中的绝大多数代
码应该在事件处理程序中定义。当然，服务工作者线程的版本作为全局常量是个显而易见的例外。服务
脚本执行的次数变化很大，高度依赖浏览器状态，因此服务脚本的行为应该是幂等的。
理解服务工作者线程的生命周期与它所控制的客户端的生命周期无关非常重要。大多数浏览器将服
务工作者线程实现为独立的进程，而该进程由浏览器单独控制。如果浏览器检测到某个服务工作者线程
空闲了，就可以终止它并在需要时再重新启动。这意味着可以依赖服务工作者线程在激活后处理事件，
但不能依赖它们的持久化全局状态。

### 通过 updateViaCache 管理服务文件缓存

正常情况下，浏览器加载的所有 JavaScript 资源会按照它们的 Cache-Control 头部纳入 HTTP 缓
存管理。因为服务脚本没有优先权，所以浏览器不会在缓存文件失效前接收更新的服务脚本。
为了尽可能传播更新后的服务脚本，常见的解决方案是在响应服务脚本时设置 Cache-Control: max-age=0 头部。这样浏览器就能始终取得最新的脚本文件。
这个即时失效的方案能够满足需求，但仅仅依靠 HTTP 头部来决定是否更新意味着只能由服务器控
制客户端。为了让客户端能控制自己的更新行为，可以通过 updateViaCache 属性设置客户端对待服
务脚本的方式。该属性可以在注册服务工作者线程时定义，可以是如下三个字符串值。
 imports：默认值。顶级服务脚本永远不会被缓存，但通过 importScripts()在服务工作者线
程内部导入的文件会按照 Cache-Control 头部设置纳入 HTTP 缓存管理。
 all：服务脚本没有任何特殊待遇。所有文件都会按照 Cache-Control 头部设置纳入 HTTP 缓
存管理。
 none：顶级服务脚本和通过 importScripts()在服务工作者线程内部导入的文件永远都不会
被缓存。
可以像下面这样使用 updateViaCache 属性：

```js
navigator.serviceWorker.register('/serviceWorker.js', {
 updateViaCache: 'none'
});
```

浏览器仍在渐进地支持这个选项，因此强烈推荐读者同时使用 updateViaCache 和 CacheControl
头部指定客户端的缓存行为。

### 强制性服务工作者线程操作

```js
//某些情况下，有必要尽可能快地让服务工作者线程进入已激活状态，即使可能会造成资源版本控制
不一致。该操作通常适合在安装事件中缓存资源，此时要强制服务工作者线程进入活动状态，然后再强
制活动服务工作者线程去控制关联的客户端。
实现上述操作的基本代码如下。
const CACHE_KEY = 'v1'; 
self.oninstall = (installEvent) => { 
 // 填充缓存，然后强制服务工作者线程进入已激活状态
 // 这样会触发 activate 事件
 installEvent.waitUntil( 
 caches.open(CACHE_KEY) 
 .then((cache) => cache.addAll([ 
 'foo.css', 
 'bar.js', 
 ])) 
 .then(() => self.skipWaiting()) 
 ); 
}; 
// 强制服务工作者线程接管客户端
// 这会在每个客户端触发 controllerchange 事件
self.onactivate = (activateEvent) => clients.claim();
浏览器会在每次导航事件中检查新服务脚本，但有时候这样也太不够了。ServiceWorkerRegistration
对象为此提供了一个 update()方法，可以用来告诉浏览器去重新获取服务脚本，与现有的比较，然后
必要时安装更新的服务工作者线程。可以这样来实现：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 // 每 17 分钟左右检查一个更新版本
 setInterval(() => registration.update(), 1E6); 
}); 
```

### 服务工作者线程消息

```js
//与专用工作者线程和共享工作者线程一样，服务工作者线程也能与客户端通过 postMessage()交
换消息。实现通信的最简单方式是向活动工作者线程发送一条消息，然后使用事件对象发送回应。发送
给服务工作者线程的消息可以在全局作用域处理，而发送回客户端的消息则可以在 ServiceWorkerContext 对象上处理：
ServiceWorker.js 
self.onmessage = ({data, source}) => { 
 console.log('service worker heard:', data); 
 source.postMessage('bar'); 
}; 
main.js 
navigator.serviceWorker.onmessage = ({data}) => { 
 console.log('client heard:', data); 
}; 
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 if (registration.active) { 
 registration.active.postMessage('foo'); 
 } 
}); 
// service worker heard: foo 
// client heard: bar 
也可以简单地使用 serviceWorker.controller 属性：
ServiceWorker.js 
self.onmessage = ({data, source}) => { 
 console.log('service worker heard:', data); 
 source.postMessage('bar'); 
}; 
main.js 
navigator.serviceWorker.onmessage = ({data}) => { 
 console.log('client heard:', data); 
}; 
navigator.serviceWorker.register('./serviceWorker.js') 
.then(() => { 
 if (navigator.serviceWorker.controller) { 
 navigator.serviceWorker.controller.postMessage('foo'); 
 } 
}); 
// service worker heard: foo 
// client heard: bar 
前面的例子在每次页面重新加载时都会运行。这是因为服务工作者线程会回应每次刷新后客户端脚
本发送的消息。在通过新标签页打开这个页面时也一样。
如果服务工作者线程需要率先发送消息，可以像下面这样获得客户端的引用：
ServiceWorker.js 
self.onmessage = ({data}) => { 
 console.log('service worker heard:', data); 
}; 
self.onactivate = () => { 
 self.clients.matchAll({includeUncontrolled: true}) 
 .then((clientMatches) => clientMatches[0].postMessage('foo')); 
}; 
main.js 
navigator.serviceWorker.onmessage = ({data, source}) => { 
 console.log('client heard:', data); 
 source.postMessage('bar'); 
}; 
navigator.serviceWorker.register('./serviceWorker.js') 
// client heard: foo 
// service worker heard: bar 
前面的例子只会运行一次，因为活动事件在每个服务工作者线程上只会触发一次。
因为客户端和服务工作者线程可以相互之间发送消息，所以通过 MessageChannel 或 BroadcastChannel 实现通信也是可能的。
```

### 拦截 fetch 事件

服务工作者线程最重要的一个特性就是拦截网络请求。服务工作者线程作用域中的网络请求会注册
为 fetch 事件。这种拦截能力不限于 fetch()方法发送的请求，也能拦截对 JavaScript、CSS、图片和
HTML（包括对主 HTML 文档本身）等资源发送的请求。这些请求可以来自 JavaScript，也可以通过
``<script>``、``<link>``或``<img>``标签创建。直观地说，这样是合理的：如果想让服务工作者线程模拟离线
应用程序，它就必须能够把控页面正常运行所需的所有请求资源。
FetchEvent 继承自 ExtendableEvent。让服务工作者线程能够决定如何处理 fetch 事件的方法
是 event.respondWith()。该方法接收期约，该期约会解决为一个 Response 对象。当然，该 Response
对象实际上来自哪里完全由服务工作者线程决定。可以来自网络，来自缓存，或者动态创建。下面几节
将介绍几种网络/缓存策略，可以在服务工作者线程中使用。

```js
//1. 从网络返回
这个策略就是简单地转发 fetch 事件。那些绝对需要发送到服务器的请求例如 POST 请求就适合
该策略。可以像下面实现这一策略：
self.onfetch = (fetchEvent) => { 
 fetchEvent.respondWith(fetch(fetchEvent.request)); 
}; 
注意 前面的代码只演示了如何使用 event.respondWith()。如果 event.respondWith()
没有被调用，浏览器也会通过网络发送请求。
```

```js
//2. 从缓存返回
这个策略其实就是缓存检查。对于任何肯定有缓存的资源（如在安装阶段缓存的资源），可以采用
该策略：
self.onfetch = (fetchEvent) => { 
 fetchEvent.respondWith(caches.match(fetchEvent.request));
}; 
```

```js
//3. 从网络返回，缓存作后备
这个策略把从网络获取最新的数据作为首选，但如果缓存中有值也会返回缓存的值。如果应用程序
需要尽可能展示最新数据，但在离线的情况下仍要展示一些信息，就可以采用该策略：
self.onfetch = (fetchEvent) => { 
 fetchEvent.respondWith( 
 fetch(fetchEvent.request) 
 .catch(() => caches.match(fetchEvent.request)) 
 ); 
}; 
```

```js
//4. 从缓存返回，网络作后备
这个策略优先考虑响应速度，但仍会在没有缓存的情况下发送网络请求。这是大多数渐进式 Web
应用程序（PWA，Progressive Web Application）采取的首选策略：
self.onfetch = (fetchEvent) => { 
 fetchEvent.respondWith( 
 caches.match(fetchEvent.request) 
 .then((response) => response || fetch(fetchEvent.request)) 
 ); 
};
```

```js
//5. 通用后备
应用程序需要考虑缓存和网络都不可用的情况。服务工作者线程可以在安装时缓存后备资源，然后
在缓存和网络都失败时返回它们：
self.onfetch = (fetchEvent) => { 
 fetchEvent.respondWith( 
 // 开始执行“从缓存返回，以网络为后备”策略
 caches.match(fetchEvent.request) 
 .then((response) => response || fetch(fetchEvent.request)) 
 .catch(() => caches.match('/fallback.html')) 
 ); 
}; 
这里的 catch()子句可以扩展为支持不同类型的后备，例如点位图、哑数据，等等。
注意 Jake Archibald 在 Google Developers 网站有一篇关于网络/缓存策略的好文章《离线
指南》。
```

### 推送通知

对于模拟原生应用程序的 Web 应用程序而言，必须支持推送消息。这意味着网页必须能够接收服
务器的推送事件，然后在设备上显示通知（即使应用程序没有运行）。当然，这在常规网页中肯定是不
可能的。不过，有了服务工作者线程就可以实现该行为。
为了在 PWA 应用程序中支持推送通知，必须支持以下 4 种行为。
 服务工作者线程必须能够显示通知。
 服务工作者线程必须能够处理与这些通知的交互。
 服务工作者线程必须能够订阅服务器发送的推送通知。
 服务工作者线程必须能够处理推送消息，即使应用程序没在前台运行或者根本没打开。

```js
//1. 显示通知
服务工作者线程可以通过它们的注册对象使用 Notification API。这样做有很好的理由：与服务工作
者线程关联的通知也会触发服务工作者线程内部的交互事件。
显示通知要求向用户明确地请求授权。授权完成后，可以通过 ServiceWorkerRegistration. 
showNotification()显示通知。下面是示例实现：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 Notification.requestPermission() 
 .then((status) => { 
 if (status === 'granted') { 
 registration.showNotification('foo'); 
 } 
 }); 
}); 
类似地，在服务工作者线程内部可以使用全局 registration 属性触发通知：
self.onactivate = () => self.registration.showNotification('bar');
在上面的例子中，获得显示通知的授权后，会把 foo 通知显示在浏览器中。该通知与使用 new 
Notification()创建的通知看不出有任何差别。此外，显示该通知不需要服务工作者线程额外做任何
事情。服务工作者线程只在需要处理通知事件时才会发挥作用。
```

```js
//2. 处理通知事件
通过 ServiceWorkerRegistration 对象创建的通知会向服务工作者线程发送 notificationclick
和 notificationclose 事件。假设前面例子中的服务脚本定义了如下事件处理程序：
self.onnotificationclick = ({notification}) => { 
 console.log('notification click', notification); 
}; 
self.onnotificationclose = ({notification}) => {
    console.log('notification close', notification); 
}; 
在这个例子中，与通知的两种交互操作都在服务工作者线程中注册了处理程序。这里的 notification
事件对象暴露了 notification 属性，其中包含着生成该事件 Notification 对象。这些处理程序可
以决定交互操作之后的响应方式。
一般来说，单击通知意味着用户希望转到某个具体的页面。在服务工作者线程处理程序中，可以通
过 clients.openWindow()打开相应的 URL，例如：
self.onnotificationclick = ({notification}) => { 
 clients.openWindow('https://foo.com'); 
}; 
```

```js
//3. 订阅推送事件
对于发送给服务工作者线程的推送消息，必须通过服务工作者线程的 PushManager 来订阅。这样
服务工作者线程就可以在 push 事件处理程序中处理推送消息。
下面展示了使用 ServiceWorkerRegistration.pushManager 订阅推送消息的例子：
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 registration.pushManager.subscribe({ 
 applicationServerKey: key, // 来自服务器的公钥
 userVisibleOnly: true 
 }); 
}); 
另外，服务工作者线程也可以使用全局的 registration 属性自己订阅：
self.onactivate = () => { 
 self.registration.pushManager.subscribe({ 
 applicationServerKey: key, // 来自服务器的公钥
 userVisibleOnly: true 
 }); 
};
```

```js
//4. 处理推送事件
订阅之后，服务工作者线程会在每次服务器推送消息时收到 push 事件。这时候它可以这样来处理：
self.onpush = (pushEvent) => { 
 console.log('Service worker was pushed data:', pushEvent.data.text()); 
}; 
为实现真正的推送通知，这个处理程序只需要通过注册对象创建一个通知即可。不过，完善的推送
通知需要创建它的服务工作者线程保持活动足够长时间，以便处理后续的交互事件。
要实现这一点，push 事件继承了 ExtendableEvent。可以把 showNotification()返回的期约
传给 waitUntil()，这样就会让服务工作者线程一直活动到通知的期约解决。
下面展示了实现上述逻辑的简单框架：
main.js 
navigator.serviceWorker.register('./serviceWorker.js') 
.then((registration) => { 
 // 请求显示通知的授权
 Notification.requestPermission() 
 .then((status) => { 
    if (status === 'granted') { 
 // 如果获得授权，只订阅推送消息
 registration.pushManager.subscribe({ 
 applicationServerKey: key, // 来自服务器的公钥
 userVisibleOnly: true 
 }); 
 } 
 }); 
}); 
ServiceWorker.js 
// 收到推送事件后，在通知中以文本形式显示数据
self.onpush = (pushEvent) => { 
 // 保持服务工作者线程活动到通知期约解决
 pushEvent.waitUntil( 
 self.registration.showNotification(pushEvent.data.text()) 
 ); 
}; 
// 如果用户单击通知，则打开相应的应用程序页面
self.onnotificationclick = ({notification}) => { 
 clients.openWindow('https://example.com/clicked-notification'); 
}; 
```

## 小结

工作者线程可以运行异步 JavaScript 而不阻塞用户界面。这非常适合复杂计算和数据处理，特别是
需要花较长时间因而会影响用户使用网页的处理任务。工作者线程有自己独立的环境，只能通过异步消
息与外界通信。
工作者线程可以是专用线程、共享线程。专用线程只能由一个页面使用，而共享线程则可以由同源
的任意页面共享。
服务工作者线程用于让网页模拟原生应用程序。服务工作者线程也是一种工作者线程，但它们更像
是网络代理，而非独立的浏览器线程。可以把它们看成是高度定制化的网络缓存，它们也可以在 PWA
中支持推送通知。

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```

```js
//
```
