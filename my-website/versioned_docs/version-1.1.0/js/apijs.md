# js api

介绍各种 JavaScript API，包括 Atomics、Encoding、File、Blob、Notifications、Streams、Timing、Web Components 和 Web Cryptography

 Atomics 与 SharedArrayBuffer
 跨上下文消息   Cross-context messaging
 Encoding API
 File API 与 Blob API
 拖放          Drag and drop
 Notifications API
 Page Visibility API
 Streams API
 计时 API      Timing APIs
 Web 组件      Web components
 Web Cryptography API

随着 Web 浏览器能力的增加，其复杂性也在迅速增加。从很多方面看，现代 Web 浏览器已经成为构建于诸多规范之上、集不同 API 于一身的“瑞士军刀”。浏览器规范的生态在某种程度上是混乱而无序的。一些规范如 HTML5，定义了一批增强已有标准的 API 和浏览器特性。而另一些规范如 Web Cryptography API 和 Notifications API，只为一个特性定义了一个 API。不同浏览器实现这些新 API 的情况也不同，有的会实现其中一部分，有的则干脆尚未实现。
最终，是否使用这些比较新的 API 还要看项目是支持更多浏览器，还是要采用更多现代特性。有些API 可以通过腻子脚本polyfill来模拟，但腻子脚本通常会带来性能问题，此外也会增加网站 JavaScript 代码的负荷。
注意 Web API 的数量之多令人难以置信（参见 MDN 文档的 Web APIs 词条）。本章要介绍的 API 仅限于与大多数开发者有关、已经得到多个浏览器支持，且本书其他章节没有涵盖的部分

The increasing versatility of web browsers is accompanied by a dizzying increase in complexity. In many ways, the modern web browser has become a Swiss army knife of different APIs detailed in a broad collection of specifications. This browser specification ecosystem is messy and volatile. Some specifications like HTML5 are a bundle of APIs and browser features that enhance an existing standard. Other specifications define an API for a single feature, such as the Web Cryptography API or the Notifications API. Depending on the browser, adoption of these newer APIs can sometimes be partial or nonexistent.
Ultimately, the decision to use newer APIs involves a tradeoff between supporting more browsers and enabling more modern features. Some APIs can be emulated using a polyfill, but polyfills can often incur a performance hit or bloat your site’s JS payloads.
NOTE:The number of web APIs is mind-bogglingly huge (``https://developer.mozilla.org/en-US/docs/Web/API``). This chapter’s API coverage is limited to APIs that are relevant to most developers, supported by multiple browser vendors, and not covered elsewhere in this book.

## Atomics 与 SharedArrayBuffer

就是说搭配出现,atomics是为了shared出现的;好好用,用不好多个上下文访问 SharedArrayBuffer 时，如果同时对缓冲区执行操作，就可能出现资源争用问题。Atomics API 通过强制同一时刻只能对缓冲区执行一个操作，可以让多个上下文安全地读写一个SharedArrayBuffer。Atomics API 是 ES2017 中定义的。
仔细研究会发现 Atomics API 非常像一个简化版的指令集架构（ISA），这并非意外。原子操作的本质会排斥操作系统或计算机硬件通常会自动执行的优化（比如指令重新排序）。The nature of atomic operations precludes some optimizations that the operating system or computer hardware would normally perform automatically (such as instruction reordering).原子操作也让并发访问内存变得不可能，!!!如果应用不当就可能导致程序执行变慢!!!。为此，Atomics API 的设计初衷是在最少但很稳定的原子行为基础之上，构建!!!复杂的多线程!!! JavaScript 程序。

### SharedArrayBuffer

```js
//就是说shared是公厕,都能用;而没有share的arraybuffer得切换才能用.
//SharedArrayBuffer 与 ArrayBuffer 具有同样的 API。二者的主要区别是 ArrayBuffer 必须在不同执行上下文间切换，SharedArrayBuffer 则可以被任意多个执行上下文同时使用。在多个执行上下文间共享内存意味着并发线程操作成为了可能。传统 JavaScript 操作对于并发内存访问导致的资源争用没有提供保护。
//下面的例子演示了 4 个专用工作线程访问同一个SharedArrayBuffer 导致的资源争用问题：
const workerScript = ` 
self.onmessage = ({data}) => { 
 const view = new Uint32Array(data); 
 // 执行 1 000 000 次加操作
 for (let i = 0; i < 1E6; ++i) { 
 // 线程不安全   加操作会导致资源争用
 view[0] += 1; 
 } 
 self.postMessage(null); 
}; 
`; 
const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript])); 

// 创建容量为 4 的工作线程池
const workers = []; 
for (let i = 0; i < 4; ++i) { 
 workers.push(new Worker(workerScriptBlobUrl)); 
} 

// 在最后一个工作线程完成后打印出最终值
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

// 把 SharedArrayBuffer 发送到每个工作线程
for (const worker of workers) { 
 worker.postMessage(sharedArrayBuffer); 
} 

//（期待结果为 4000001。实际输出可能类似这样：）
// Final buffer value: 2145106 
为解决这个问题，Atomics API 应运而生。Atomics API 可以保证 SharedArrayBuffer 上的JavaScript 操作是线程安全的。

注意 SharedArrayBuffer API 等同于 ArrayBuffer API，后者在第 6 章介绍过。关于如何在多个上下文中使用 SharedArrayBuffer，可以参考第 27 章。
```

```js
//

```

### 原子操作基础

Atomics Basics
任何全局上下文中都有 Atomics 对象，这个对象上expose了用于执行线程安全操作的一套静态方法，其中多数方法以一个 TypedArray 实例（一个 SharedArrayBuffer 的引用）作为第一个参数，以相关操作数作为后续参数。

#### 算术及位操作方法

```js
//Atomic Arithmetic and Bitwise Methods  .Atomics API 提供了一套简单的方法用以执行就地修改操作。在 ECMA 规范中，这些方法被定义为AtomicReadModifyWrite 操作。在底层，这些方法都会从 SharedArrayBuffer 中某个位置读取值，然后执行算术或位操作，最后再把计算结果写回相同的位置。这些操作的原子本质意味着上述读取、修改、写回操作会按照顺序执行，不会被其他线程中断。
//以下代码演示了所有算术方法：
// 创建大小为 1 的缓冲区
let sharedArrayBuffer = new SharedArrayBuffer(1); 

// 基于缓冲创建 Uint8Array 
let typedArray = new Uint8Array(sharedArrayBuffer); 

// 所有 ArrayBuffer 全部初始化为 0 
console.log(typedArray); // Uint8Array[0]

const index = 0; 
const increment = 5; 

// 对索引 0 处的值执行原子加 5 
Atomics.add(typedArray, index, increment); 

console.log(typedArray); // Uint8Array[5]

// 对索引 0 处的值执行原子减 5 
Atomics.sub(typedArray, index, increment); 

console.log(typedArray); // Uint8Array[0]

以下代码演示了所有位方法：
// 创建大小为 1 的缓冲区
let sharedArrayBuffer = new SharedArrayBuffer(1); 

// 基于缓冲创建 Uint8Array 
let typedArray = new Uint8Array(sharedArrayBuffer); 

// 所有 ArrayBuffer 全部初始化为 0 
console.log(typedArray); // Uint8Array[0] 
const index = 0; 

// 对索引 0 处的值执行原子或 0b1111  Atomic or 0b1111 to value at index 0
Atomics.or(typedArray, index, 0b1111); 
console.log(typedArray); // Uint8Array[15] 

// 对索引 0 处的值执行原子与 0b1111 
Atomics.and(typedArray, index, 0b1100); 
console.log(typedArray); // Uint8Array[12]

// 对索引 0 处的值执行原子异或 0b1111 
Atomics.xor(typedArray, index, 0b1111); 
console.log(typedArray); // Uint8Array[3]

// 前面线程不安全的例子可以改写为下面这样：
 const workerScript = ` 
 self.onmessage = ({data}) => { 
 const view = new Uint32Array(data); 
 // 执行 1 000 000 次加操作
 for (let i = 0; i < 1E6; ++i) { 
 // 线程安全的加操作.此处加粗;之前是view[0] += 1; 
 Atomics.add(view, 0, 1); 
 } 
 self.postMessage(null); 
}; 
`; 
const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript])); 
// 创建容量为 4 的工作线程池
const workers = []; 
for (let i = 0; i < 4; ++i) { 
 workers.push(new Worker(workerScriptBlobUrl)); 
} 
// 在最后一个工作线程完成后打印出最终值
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
// 把 SharedArrayBuffer 发送到每个工作线程
for (const worker of workers) { 
worker.postMessage(sharedArrayBuffer); 
} 
//（期待结果为 4000001）
// Final buffer value: 4000001 
```

#### 原子读和写

```js
//Atomic Reads and Writes浏览器的 JavaScript 编译器和 CPU 架构本身都有权限重排指令以提升程序执行效率。正常情况下，JavaScript 的单线程环境是可以随时进行这种优化的。但多线程下的指令重排可能导致资源争用，而且极难 debug.Atomics API 通过两种主要方式解决了这个问题。 所有原子指令相互之间的顺序!!!永远不会重排!!!。 使用原子读或原子写保证所有指令（包括原子和非原子指令）都不会相对原子读/写重新排序。这意味着位于原子读/写之前的所有指令会在原子读/写发生前完成，而位于原子读/写之后的所有指令会在原子读/写完成后才会开始.

//除了读写缓冲区的值，Atomics.load()和 Atomics.store()还可以构建“代码围栏”。JavaScript引擎保证非原子指令可以相对于 load()或 store()本地重排，但这个重排不会侵犯原子读/写的边界。
//以下代码演示了这种行为：
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 

// 执行非原子写 Perform non-Atomic write
view[0] = 1; 

// 非原子写可以保证在这个读操作之前完成，因此这里一定会读到 1 
console.log(Atomics.load(view, 0)); // 1 

// 执行原子写
Atomics.store(view, 0, 2); 

// 非原子读可以保证在原子写完成后发生，因此这里一定会读到 2 
console.log(view[0]); // 2 

//看不懂,什么东西???写入就是store,读就是load
```

#### 原子交换

```js
//Atomic Exchanges
//为了保证连续、不间断的先读后写， Atomics API 提供了两种方法： exchange() 和compareExchange()。Atomics.exchange()执行简单的交换，以保证其他线程不会中断值的交换：
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 
// 在索引 0 处写入 3 
Atomics.store(view, 0, 3); 

// 从索引 0 处读取值，然后在索引 0 处写入 4 
console.log(Atomics.exchange(view, 0, 4)); // 3

// 从索引 0 处读取值
console.log(Atomics.load(view, 0)); // 4

// 在多线程程序中，一个线程可能!!!只希望!!!在上次读取某个值之后没有其他线程修改该值的情况下才对共享缓冲区执行写操作。如果这个值没有被修改，这个线程就可以安全地写入更新后的值；如果这个值被修改了，那么执行写操作将会破坏其他线程计算的值。对于这种任务，Atomics API 提供了compareExchange()方法。这个方法只在目标索引处的值与预期值匹配时才会执行写操作。来看下面这个例子：
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 
// 在索引 0 处写入 5 
Atomics.store(view, 0, 5); 
// 从缓冲区读取值
let initial = Atomics.load(view, 0); 

// 对这个值执行非原子操作
let result = initial ** 2; 

// 只在缓冲区未被修改的情况下才会向缓冲区写入新值
Atomics.compareExchange(view, 0, initial, result); 

// 检查写入成功
console.log(Atomics.load(view, 0)); // 25
如果值不匹配，compareExchange()调用则什么也不做：
const sharedArrayBuffer = new SharedArrayBuffer(4); 
const view = new Uint32Array(sharedArrayBuffer); 
// 在索引 0 处写入 5 
Atomics.store(view, 0, 5); 
// 从缓冲区读取值
let initial = Atomics.load(view, 0); 
// 对这个值执行非原子操作
let result = initial ** 2; 
// 只在缓冲区未被修改的情况下才会向缓冲区写入新值. 什么叫缓冲区未被修改???就是initial???
Atomics.compareExchange(view, 0, -1, result); 
// 检查写入失败
console.log(Atomics.load(view, 0)); // 5 

```

#### 原子Futex操作与加锁

```js
//Atomics Futex Operations and Locks
//如果没有某种锁机制，多线程程序就无法支持复杂需求。为此，Atomics API 提供了模仿 Linux Futex（快速用户空间互斥量，fast user-space mutex）的方法。这些方法本身虽然非常简单，但可以作为更复杂锁机制的基本组件。
// 注意:所有原子 Futex 操作只能用于 Int32Array 视图。而且，也只能用在工作线程内部。 什么是int32array视图?是JavaScript 中的一种 TypedArray 类型，用于表示固定长度的 32 位有符号整数数组的视图。它允许你在内存中直接操作二进制数据，以便进行高效的数据处理和操作。假设你有一个需要处理大量整数数据的场景，比如图像处理、音频处理、数据分析等。在这种情况下，使用 Int32Array 视图可以带来性能上的优势，因为它们允许你直接在内存中操作二进制数据，而不需要进行类型转换或者复制。

// Atomics.wait()和 Atomics.notify()通过示例很容易理解。下面这个简单的例子创建了 4 个工作线程，用于对长度为 1 的 Int32Array 进行操作。这些工作线程会依次取得锁并执行自己的加操作：The spawned workers will take turns obtaining the lock and performing their add operation

const workerScript = ` 
self.onmessage = ({data}) => { 
 const view = new Int32Array(data); 
 console.log('Waiting to obtain lock'); 
 // 遇到初始值则停止，10000 毫秒超时
Atomics.wait(view, 0, 0, 1E5); 
 console.log('Obtained lock'); 

 // 在索引 0 处加 1 
 Atomics.add(view, 0, 1); 
 console.log('Releasing lock'); 

 // 只允许 1 个工作线程继续执行
 Atomics.notify(view, 0, 1); 
 self.postMessage(null); 
}; 
`; 
//当工作线程收到消息时，它会等待直到满足特定条件（在这里是等待直到索引为 0 的位置的值为 0），然后将该位置的值增加 1，并通知等待中的线程。最后，它向主线程发送一个空消息。    
// 这是 ES6 中的模板字面量语法，允许在字符串中嵌入表达式和变量。在这里，它包含了工作线程脚本的内容。
// self: 这是在工作线程中代表全局作用域的对象。在工作线程中，self 等同于 this，但用于表示当前线程的全局对象。
// onmessage: 这是一个事件处理函数，当主线程发送消息给工作线程时会触发。在这里，我们使用解构赋值语法来获取传递给工作线程的数据。
// ({data}): 这是 ES6 中的解构赋值语法，用于从对象中提取属性值。在这里，我们从传递给工作线程的消息中提取 data 属性。
// =>: 这是箭头函数语法，用于定义匿名函数。在这里，它定义了一个箭头函数，用作 onmessage 事件的处理函数。
// const view = new Int32Array(data);: 这行代码创建了一个 Int32Array 视图，用于访问传递给工作线程的数据。
// console.log('Waiting to obtain lock');: 这行代码调用了 console.log() 方法，用于在控制台中输出一条消息。
// Atomics.wait(view, 0, 0, 1E5);: 这行代码调用了 Atomics.wait() 方法，用于让线程等待，直到满足特定的条件。在这里，它让线程等待直到索引为 0 的位置的值为 0，最长等待时间为 10000 毫秒。
// console.log('Obtained lock');: 这行代码再次调用了 console.log() 方法，输出另一条消息。
// Atomics.add(view, 0, 1);: 这行代码调用了 Atomics.add() 方法，用于原子性地将指定位置的值增加指定的量。在这里，它将索引为 0 的位置的值增加 1。
// Atomics.notify(view, 0, 1);: 这行代码调用了 Atomics.notify() 方法，用于通知等待中的线程。在这里，它通知了等待在索引为 0 的位置上的线程，表示可以继续执行。
// self.postMessage(null);: 这行代码调用了 postMessage() 方法，用于向主线程发送消息。在这里，它向主线程发送了一个空消息。


const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript])); 
const workers = []; 
for (let i = 0; i < 4; ++i) { 
 workers.push(new Worker(workerScriptBlobUrl)); 
} 
//创建了一个 Blob 对象，将 workerScript 字符串包装起来，然后通过 URL.createObjectURL() 方法生成一个 URL，用于创建 Worker 对象。这个 URL 表示了包含工作线程脚本的 Blob 对象的地址。   声明了一个空数组 workers，用于存储创建的 Worker 对象。   循环，用于创建并初始化 4 个工作线程。在循环内部，通过 new Worker(workerScriptBlobUrl) 创建了 Worker 对象，并将其添加到 workers 数组中。

// 在最后一个工作线程完成后打印出最终值
let responseCount = 0; 
for (const worker of workers) { 
 worker.onmessage = () => { 
 if (++responseCount == workers.length) { 
 console.log(`Final buffer value: ${view[0]}`); 
 } 
 }; 
} 
//声明了一个变量 responseCount，用于跟踪工作线程的响应数量。    这是另一个循环，用于为每个 Worker 对象设置消息监听器。当每个工作线程完成时，将增加 responseCount 的值。当所有工作线程都完成时，会输出最终缓冲区的值。

// 初始化 SharedArrayBuffer 
const sharedArrayBuffer = new SharedArrayBuffer(8); 
const view = new Int32Array(sharedArrayBuffer); 
// 把 SharedArrayBuffer 发送到每个工作线程
for (const worker of workers) { 
 worker.postMessage(sharedArrayBuffer); 
} 
//创建了一个大小为 8 字节的 SharedArrayBuffer 对象，用于在主线程和工作线程之间共享数据。   这行代码创建了一个 Int32Array 视图，以便在主线程和工作线程之间访问 SharedArrayBuffer 中的数据。    这是另一个循环，用于将 SharedArrayBuffer 对象发送给每个工作线程。

// 1000 毫秒后释放第一个锁
setTimeout(() => Atomics.notify(view, 0, 1), 1000); 
//在 1000 毫秒（1 秒）后，通知等待在 SharedArrayBuffer 的索引为 0 处的线程，表示可以继续执行。   Atomics 对象的方法之一，用于通知等待中的线程。在这里，它通知了等待在 SharedArrayBuffer 的索引为 0 处的线程，表示可以继续执行。 这是一个 Int32Array 对象，用于访问 SharedArrayBuffer 中的数据。 这是在 SharedArrayBuffer 中的索引，表示要通知的位置。 这是通知的值，表示一个线程可以继续执行。

// Waiting to obtain lock 
// Waiting to obtain lock 
// Waiting to obtain lock 
// Waiting to obtain lock 
// Obtained lock 
// Releasing lock 
// Obtained lock 
// Releasing lock 
// Obtained lock 
// Releasing lock 
// Obtained lock 
// Releasing lock 
// Final buffer value: 4 
// 因为是使用 0 来初始化 SharedArrayBuffer，所以每个工作线程都会到达 Atomics.wait()并停止执行。在停止状态下，执行线程存在于一个等待队列中，在经过指定时间或在相应索引上调用Atomics.notify() 之前，一直保持暂停状态。 1000 毫秒之后，顶部执行上下文会调用Atomics.notify()释放其中一个等待的线程。这个线程执行完毕后会再次调用 Atomics.notify()释放另一个线程。这个过程会持续到所有线程都执行完毕并通过 postMessage()传出最终的值。就是说通知的位置,通知的值,使得wait的线程释放

// Atomics API 还提供了 Atomics.isLockFree()方法。不过我们基本上应该不会用到。这个方法在高性能算法中可以用来确定是否有必要获取锁。规范中的介绍如下：
// Atomics.isLockFree()是一个优化原语。基本上，如果一个原子原语（compareExchange、load、store、add、sub、and、or、xor 或 exchange）在 n 字节大小的数据上的原子步骤
// 在不调用代理在组成数据的n字节之外获得锁的情况下可以执行，则Atomics.isLockFree(n)会返回 true。高性能算法会使用 Atomics.isLockFree 确定是否在关键部分使用锁或原子
// 操作。如果原子原语需要加锁，则算法提供自己的锁会更高效。If an atomic primitive is not lock-free then it is often more efficient for an algorithm to provide its own locking.
// Atomics.isLockFree(4)始终返回 true，因为在所有已知的相关硬件上都是支持的。能够如此假设通常可以简化程序。
```

## 跨上下文消息

CROSS-CONTEXT MESSAGING

```js
//跨文档消息，有时候也简称为 XDM（cross-document messaging），是一种在不同执行上下文（如不同工作线程或不同源的页面）间传递信息的能力。例如，www.wrox.com 上的页面想要与包含在内嵌窗格中的 p2p.wrox.com 上面的页面通信。在 XDM 之前，要以安全方式实现这种通信需要很多工作。XDM以安全易用的方式规范化了这个功能。
//注意 跨上下文消息用于窗口之间通信或工作线程之间通信。本节主要介绍使用postMessage()与其他窗口通信 。关于工作线程之间通信、MessageChannel 和BroadcastChannel，可以参考第 27 章。

// XDM 的!!!核心是 postMessage()方法!!!。除了 XDM，这个方法名还在 HTML5 中很多地方用到过，但目的都一样，都是把数据传送到另一个位置。
// postMessage()方法接收 3 个参数：消息、表示目标接收源的字符串和可选的可传输对象的数组（只与工作线程相关）。第二个参数对于安全非常重要，其可以限制浏览器交付数据的目标。下面来看一个例子：
let iframeWindow = document.getElementById("myframe").contentWindow; 
iframeWindow.postMessage("A secret", "http://www.wrox.com");
//postMessage() 方法确实有一个可选的第三个参数，用于传递消息的传输通道。第三个参数是一个 options 对象，它允许您指定额外的参数，例如传输消息的信道。例如，您可以使用 { transfer: [transferable] } 指定要传递的可传输对象数组。这些可传输对象可以是共享的 ArrayBuffer、MessagePort 或 ImageBitmap 对象等。这样可以更有效地将数据从一个上下文传递到另一个上下文，而无需进行复制。在你的例子中，因为您没有提供第三个参数，因此假设您的消息不包含任何可传输对象。 
// 最后一行代码尝试向内嵌窗格中发送一条消息，而且指定了源必须是"http://www.wrox.com"。如果源匹配，那么消息将会交付到内嵌窗格；否则，postMessage()什么也不做。这个限制可以保护信息不会因地址改变而泄露。如果不想限制接收目标，则可以给 postMessage()的第二个参数传"*"，但不推荐这么做。
// 接收到 XDM 消息后，window 对象上会触发 message 事件。这个事件是异步触发的，因此从消息发出到接收到消息（接收窗口触发 message 事件）可能有延迟。传给 onmessage 事件处理程序的 event对象包含以下 3 方面重要信息。
//  data：作为第一个参数传递给 postMessage()的字符串数据。
//  origin：发送消息的文档源，例如"http://www.wrox.com"。
//  source：发送消息的文档中 window 对象的代理。这个代理对象主要用于在发送上一条消息的窗口中执行 postMessage()方法。如果发送窗口有相同的源，那么这个对象应该就是 window
// 对象。

// 接收消息之后验证发送窗口的源是非常重要的。与 postMessage()的第二个参数可以保证数据不会意外传给未知页面一样，在 onmessage 事件处理程序中检查发送窗口的源可以保证数据来自正确的地方。基本的使用方式如下所示：
window.addEventListener("message", (event) => { 
 // 确保来自预期发送者
 if (event.origin == "http://www.wrox.com") { 
 // 对数据进行一些处理
 processMessage(event.data); 
 // 可选：向来源窗口发送一条消息
 event.source.postMessage("Received!", "http://p2p.wrox.com"); 
 } 
 //添加了一个事件监听器，用于监听 message 事件，当浏览器接收到来自其他窗口或 frame 的消息时触发。当事件发生时，会执行指定的回调函数。
 //条件语句，用于检查消息来源的域名是否为 "http://www.wrox.com"。`event.origin` 表示消息的来源，如果来源是 "http://www.wrox.com"，则条件成立。
 //调用了一个名为 processMessage 的函数，用来处理接收到的消息数据。event.data 包含了从其他窗口或 frame 发送过来的消息内容。   这行代码向消息的来源窗口发送一条消息。event.source 表示消息的来源窗口，postMessage() 方法用于向其他窗口发送消息。在这里，它发送了一个包含字符串 "Received!" 的消息，并指定了目标窗口的源为 "http://p2p.wrox.com"。
}); 
// 大多数情况下，event.source 是某个 window 对象的代理，而非实际的 window 对象。因此不能通过它访问所有窗口下的信息。最好只使用 postMessage()，这个方法永远存在而且可以调用。XDM 有一些怪异之处。首先，postMessage()的第一个参数的最初实现始终是一个字符串。后来，第一个参数改为允许任何结构的数据传入，不过并非所有浏览器都实现了这个改变。为此，最好就是只通 过 postMessage() 发送字符串。如果需要传递结构化数据，那么最好先对该数据调用JSON.stringify()，通过 postMessage()传过去之后，再在 onmessage 事件处理程序中调用JSON.parse()。
// 在通过内嵌窗格加载不同域时，使用 XDM 是非常方便的。这种方法在混搭（mashup）和社交应用中非常常用。通过使用 XDM 与内嵌窗格中的网页通信，可以保证包含页面的安全。XDM 也可以用于同源页面之间通信。
```

## Encoping API

Encoding API 主要用于实现字符串与定型数组之间的转换。规范新增了 4 个用于执行转换的全局类：TextEncoder、TextEncoderStream、TextDecoder 和 TextDecoderStream。
注意 相比于批量（bulk）的编解码，对流（stream）编解码的支持很有限。

### 文本编码

Encoding Text
Encoding API 提供了两种将字符串转换为定型数组二进制格式的方法：批量编码和流编码。把字符串转换为定型数组时，编码器始终使用 UTF-8。

#### 批量编码

```js
//Bulk Encoding
//所谓批量，指的是 JavaScript 引擎会同步编码整个字符串。对于非常长的字符串，可能会花较长时间。批量编码是通过 TextEncoder 的实例完成的：
const textEncoder = new TextEncoder(); 
// 这个实例上有一个 encode()方法，该方法接收一个字符串参数，并以 Uint8Array 格式返回每个字符的 UTF-8 编码：
const textEncoder = new TextEncoder(); 
const decodedText = 'foo'; 
const encodedText = textEncoder.encode(decodedText);
//用之前创建的 TextEncoder 对象将原始文本编码为字节序列，并将结果赋值给常量 encodedText。这个过程将字符串转换为其 UTF-8 编码的字节序列。
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
console.log(encodedText); // Uint8Array(3) [102, 111, 111] 

// 编码器是用于处理字符的，有些字符（如表情符号）在最终返回的数组中可能会占多个索引：
const textEncoder = new TextEncoder(); 
const decodedText = '☺'; 
const encodedText = textEncoder.encode(decodedText); 
// ☺的 UTF-8 编码是 0xF0 0x9F 0x98 0x8A（即十进制 240、159、152、138）
console.log(encodedText); // Uint8Array(4) [240, 159, 152, 138]

// 编码器实例还有一个 encodeInto()方法，该方法接收一个字符串和目标 Unit8Array，返回一个字典,a dictionary containing read and written properties该字典包含 read 和 written 属性，分别表示成功从源字符串读取了多少字符和向目标数组写入了多少字符。如果定型数组的空间不够，编码就会提前终止，返回的字典会体现这个结果：
//使用 TextEncoder 对象将字符串编码为字节序列，并将结果存储在预先分配的数组中。通过 encodeInto() 方法，我们可以获得编码的详细信息，包括读取的字符数和写入的字节数。

const textEncoder = new TextEncoder(); 
const fooArr = new Uint8Array(3); //创建了一个长度为 3 的 Uint8Array 数组，并将其赋值给常量 fooArr。这个数组用于存储编码后的字符串 'foo' 的字节序列。
const barArr = new Uint8Array(2); 
const fooResult = textEncoder.encodeInto('foo', fooArr);//使用 TextEncoder 对象将字符串 'foo' 编码为字节序列，并将结果存储在 fooArr 数组中。同时，它返回一个对象 fooResult，该对象包含了编码的信息，其中 read 表示读取的字符数，written 表示写入的字节数。
const barResult = textEncoder.encodeInto('bar', barArr);
console.log(fooArr); // Uint8Array(3) [102, 111, 111] 
console.log(fooResult); // { read: 3, written: 3 }
console.log(barArr); // Uint8Array(2) [98, 97] 
console.log(barResult); // { read: 2, written: 2 }
// encode()要求分配一个新的 Unit8Array，encodeInto()则不需要。对于追求性能的应用，这个差别可能会带来显著不同。

// 注意 文本编码会始终使用 UTF-8 格式，而且必须写入 Unit8Array 实例。使用其他类型数组会导致 encodeInto()抛出错误。
```

#### 流编码

```js
//Stream Encoding 就是说还是编码
//TextEncoderStream 其实就是 TransformStream 形式的 TextEncoder。将解码后的文本流通过管道输入流编码器会得到编码后文本块的流：Piping a decoded text stream through the stream encoder will yield a stream of encoded text chunks:
async function* chars() { 
 const decodedText = 'foo'; 
 for (let char of decodedText) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, char)); 
 } 
 //名为 char的异步生成器函数用于生成一系列值，每个值都可以通过 yield 关键字返回，并且可以在需要时异步生成。声明了一个常量 decodedText，并将字符串 'foo' 赋值给它,这是我们要生成的文本。 循环，用于遍历 decodedText 中的每个字符。在每次迭代中，char 将依次表示 'f'、'o' 和 'o'。使用 yield 关键字返回一个 Promise，该 Promise 在 1 秒后解析为当前迭代的字符。await 关键字用于等待 Promise 解析完成。
} 
const decodedTextStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of chars()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
 //创建了一个可读流 decodedTextStream，使用了一个异步函数作为 start 方法。在 start 方法中，我们通过迭代 chars 生成器函数并将字符依次推送到流中。关闭流的写入端，表示不会再有新的数据被推送到流中。这通常在所有数据都已经推送完成时调用。  =在 start 方法中通过异步迭代将 chars() 生成器函数产生的字符逐个推送到流中。最后，调用 controller.close() 关闭流的写入端，表示数据的推送已经完成。
}); 
const encodedTextStream = decodedTextStream.pipeThrough(new TextEncoderStream()); //通过管道将 decodedTextStream 中的数据传递给 TextEncoderStream 对象，以进行编码。
const readableStreamDefaultReader = encodedTextStream.getReader(); 
(async function() { 
 while(true) { 
 const { done, value } = await readableStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
 //获取了 encodedTextStream 的默认读取器，用于从流中读取数据。立即调用的异步函数表达式，用于从流中读取数据并在控制台上打印。在一个无限循环中，它等待读取器的数据并打印每个读取的值，直到读取器返回 { done: true } 为止。条件语句，用于检查读取器是否已经完成了所有数据的读取。如果读取器返回的对象中的 done 属性为 true，则退出循环；否则，打印读取到的值。
})(); 
// Uint8Array[102] 
// Uint8Array[111] 
// Uint8Array[111] 

// 不是很懂,什么意思???
```

### 文本解码

Decoding Text
Encoding API 提供了两种将定型数组转换为字符串的方式：批量解码和流解码。与编码器类不同，在将定型数组转换为字符串时 from typed array to string，解码器支持非常多的字符串编码，可以参考 Encoding Standard 规范的“Names and labels”一节。默认字符编码格式是 UTF-8。

#### 批量解码

```js
//Bulk Decoding  解码就是把码换成明文形式???
//所谓批量，指的是 JavaScript 引擎会同步解码整个字符串。对于非常长的字符串，可能会花较长时间。批量解码是通过 TextDecoder 的实例完成的：
const textDecoder = new TextDecoder(); 
// 这个实例上有一个 decode()方法，该方法接收一个定型数组参数，返回解码后的字符串：
const textDecoder = new TextDecoder(); 
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
const encodedText = Uint8Array.of(102, 111, 111); 
const decodedText = textDecoder.decode(encodedText);
console.log(decodedText); // foo 
// 解码器!!!不关心传入的是哪种定型数组!!!，它只会专心解码整个二进制表示。在下面这个例子中，只包含 8 位字符的 32 位值被解码为 UTF-8 格式，解码得到的字符串中填充了空格：
const textDecoder = new TextDecoder(); 
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
const encodedText = Uint32Array.of(102, 111, 111); 
const decodedText = textDecoder.decode(encodedText); 
console.log(decodedText); // "f o o " 

// 解码器是用于处理定型数组中分散在多个索引上的字符的， span multiple indices in the typed array, such as emojis:
const textDecoder = new TextDecoder(); 
// ☺的 UTF-8 编码是 0xF0 0x9F 0x98 0x8A（即十进制 240、159、152、138）
const encodedText = Uint8Array.of(240, 159, 152, 138);
const decodedText = textDecoder.decode(encodedText); 
console.log(decodedText); // ☺

// 与 TextEncoder 不同，TextDecoder 可以兼容很多字符编码。比如下面的例子就使用了 UTF-16而非默认的 UTF-8：
const textDecoder = new TextDecoder('utf-16'); 
// f 的 UTF-8 编码是 0x0066（即十进制 102）
// o 的 UTF-8 编码是 0x006F（即二进制 111）
const encodedText = Uint16Array.of(102, 111, 111); 
const decodedText = textDecoder.decode(encodedText); 
console.log(decodedText); // foo 
```

#### 流解码

```js
//Stream Decoding
//TextDecoderStream 其实就是 TransformStream 形式的 TextDecoder。将编码后的文本流通过管道输入流解码器会得到解码后文本块的流：
//就是跟上面的那一段反着来
async function* chars() { 
 // 每个块必须是一个定型数组
 const encodedText = [102, 111, 111].map((x) => Uint8Array.of(x)); 
 //创建了一个数组 encodedText，其中包含了几个 Uint8Array 数组，分别表示字符 'f'、'o' 和 'o' 的字节序列。这些字符对应的 UTF-8 编码分别是 102、111 和 111。
 for (let char of encodedText) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, char)); 
 } 
} 
const encodedTextStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of chars()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
 //可读流 encodedTextStream，使用了一个异步函数作为 start 方法。在 start 方法中，我们通过迭代 chars 生成器函数并将字节序列依次推送到流中。
}); 
const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream()); //通过管道将 encodedTextStream 中的数据传递给 TextDecoderStream 对象，以进行解码。
const readableStreamDefaultReader = decodedTextStream.getReader(); 
(async function() { 
 while(true) { 
 const { done, value } = await readableStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
 //获取了 decodedTextStream 的默认读取器，用于从流中读取数据。立即调用的异步函数表达式，用于从流中读取数据并在控制台上打印。在一个无限循环中，它等待读取器的数据并打印每个读取的值，直到读取器返回 { done: true } 为止。条件语句，用于检查读取器是否已经完成了所有数据的读取。如果读取器返回的对象中的 done 属性为 true，则退出循环；否则，打印读取到的值。
})(); 
// f 
// o 
// o 
//先通过生成器函数生成一系列字节序列，然后将这些字节序列推送到可读流中。接着，将可读流中的字节序列通过解码器进行解码，然后通过读取器从解码后的流中读取数据，并将每个字符打印到控制台上。

// 文本解码器流能够识别可能分散在不同块上的代理对。解码器流会保持块片段直到取得完整的字符。比如在下面的例子中，流解码器在解码流并输出字符之前会等待传入 4 个块：
async function* chars() { 
 // ☺的 UTF-8 编码是 0xF0 0x9F 0x98 0x8A（即十进制 240、159、152、138）
 const encodedText = [240, 159, 152, 138].map((x) => Uint8Array.of(x)); 
 for (let char of encodedText) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, char)); 
 } 
} 
const encodedTextStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of chars()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
}); 
const decodedTextStream = encodedTextStream.pipeThrough(new TextDecoderStream()); 
const readableStreamDefaultReader = decodedTextStream.getReader(); 
(async function() { 
 while(true) { 
 const { done, value } = await readableStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
})(); 
// ☺

// 文本解码器流经常与 fetch()一起使用，因为响应体可以作为 ReadableStream 来处理。比如：
const response = await fetch(url); 
const stream = response.body.pipeThrough(new TextDecoderStream());
const decodedStream = stream.getReader() 
for await (let decodedChunk of decodedStream) { 
 console.log(decodedChunk); 
} 
```

## File API与Blob API

就是用来使网页能操作本机内的文件的.
Web 应用程序的一个主要的痛点是无法操作用户计算机上的文件。2000 年之前，处理文件的唯一方式是把``<input type="file">``放到一个表单里，仅此而已。File API 与 Blob API 是为了让 Web 开发者能以安全的方式访问客户端机器上的文件，从而更好地与这些文件交互而设计的。

### File类型

```js
//File API 仍然以表单中的文件输入字段为基础，但是增加了直接访问文件信息的能力。HTML5 在DOM 上为文件输入元素添加了 files 集合。当用户在文件字段中选择一个或多个文件时，这个 files集合中会包含一组 File 对象，表示被选中的文件。每个 File 对象都有一些只读属性。
//  name：本地系统中的文件名。
//  size：以字节计的文件大小。
//  type：包含文件 MIME 类型的字符串。
//  lastModifiedDate：表示文件最后修改时间的字符串。这个属性只有 Chome 实现了。
// 例如，通过监听 change 事件然后遍历 files 集合可以取得每个选中文件的信息：
//选择了文件或者拖放了文件时，会触发 change 事件。在事件处理函数中，会获取用户选择的文件列表，并遍历文件列表中的每个文件，然后打印每个文件的名称、类型和大小到控制台上。

let filesList = document.getElementById("files-list"); //通过 getElementById 方法获取具有指定 ID "files-list" 的 DOM 元素，通常是一个文件输入框或文件拖放区域。获取的元素被赋值给变量 filesList。
filesList.addEventListener("change", (event) => { 
 let files = event.target.files, 
 i = 0, 
 len = files.length; 
 while (i < len) { 
 const f = files[i]; 
 console.log(`${f.name} (${f.type}, ${f.size} bytes)`); 
 i++; 
 } 
 //一个事件监听器，监听 change 事件。当用户在文件输入框中选择了文件或者拖放了文件时，就会触发这个事件。一旦事件发生，将执行指定的回调函数。箭头函数，作为事件监听器的回调函数。它接收一个事件对象 event，该对象包含有关事件的各种信息。
 //声明了一个变量 files，用于存储用户选择的文件列表。通过 event.target.files 属性获取了用户选择的文件列表，并将其赋值给 files。 
 //同时声明了两个变量 i 和 len，用于迭代文件列表。while 循环，用于遍历文件列表中的每个文件。获取文件列表中索引为 i 的文件，并将其赋值给常量 f。在每次迭代中，f 表示当前处理的文件。使用 console.log() 方法将文件的名称、类型和大小打印到控制台上。${f.name} 表示文件名，${f.type} 表示文件类型，${f.size} 表示文件大小。将迭代器 i 的值增加 1，以便下一次循环迭代到下一个文件。
}); 
// 这个例子简单地在控制台输出了每个文件的信息。仅就这个能力而言，已经可以说是 Web 应用向前迈进的一大步了。不过，File API 还提供了 FileReader 类型，让我们可以实际从文件中读取数据。
```

### FileReader类型

```js
//FileReader类型表示一种异步文件读取机制。可以把FileReader 想象成类似于XMLHttpRequest，
//只不过是用于从文件系统读取文件，而不是从服务器读取数据。
//FileReader 类型提供了几个读取文件数据的方法。
//  readAsText(file, encoding)：从文件中读取纯文本内容并保存在 result 属性中。第二个参数表示编码，是可选的。
//  readAsDataURL(file)：读取文件并将内容的数据 URI 保存在 result 属性中。
//  readAsBinaryString(file)：读取文件并将每个字符的二进制数据保存在 result 属性中。
//  readAsArrayBuffer(file)：读取文件并将文件内容以 ArrayBuffer 形式保存在 result 属性。
// 这些读取数据的方法为处理文件数据提供了极大的灵活性。例如，为了向用户显示图片，可以将图片读取为数据 URI，而为了解析文件内容，可以将文件读取为文本。

// 因为这些读取方法是异步的，所以每个 FileReader 会发布几个事件，其中 3 个最有用的事件是progress、error 和 load，分别表示还有更多数据、发生了错误和读取完成。

// progress 事件每 50 毫秒就会触发一次，其与 XHR 的 progress 事件具有相同的信息：lengthComputable、loaded 和 total。此外，在 progress 事件中可以读取 FileReader 的 result属性，即使其中尚未包含全部数据。

// error 事件会在由于某种原因无法读取文件时触发。触发 error 事件时，FileReader 的 error属性会包含错误信息。这个属性是一个对象，只包含一个属性：code。这个错误码的值可能是 1（未找到文件）、2（安全错误）、3（读取被中断）、4（文件不可读）或 5（编码错误）。

// load 事件会在文件成功加载后触发。如果 error 事件被触发，则不会再触发 load 事件。
// 下面的例子演示了所有这 3 个事件：
let filesList = document.getElementById("files-list"); 
filesList.addEventListener("change", (event) => { 
 let info = "", 
 output = document.getElementById("output"), 
 progress = document.getElementById("progress"), 
 files = event.target.files, 
 type = "default", 
 reader = new FileReader(); 
 //存储文件信息的字符串，初始化为空。output 获取具有指定 ID "output" 的 DOM 元素，通常用于显示文件内容或信息。progress 获取具有指定 ID "progress" 的 DOM 元素，通常用于显示文件读取的进度信息。files 获取用户选择的文件列表。type 表示文件类型，默认为 "default"。reader 创建了一个新的 FileReader 对象，用于读取文件内容。

 if (/image/.test(files[0].type)) { 
 reader.readAsDataURL(files[0]); 
 type = "image"; 
 } else { 
 reader.readAsText(files[0]); 
 type = "text"; 
 //条件语句，用于检查用户选择的第一个文件的类型是否为图片。如果是图片类型，则通过 readAsDataURL 方法将文件内容读取为 data URL 格式；如果不是图片类型，则通过 readAsText 方法将文件内容读取为文本格式。
 } 

 reader.onerror = function() { 
 output.innerHTML = "Could not read file, error code is " + 
 reader.error.code; 
 //错误处理函数，用于处理文件读取过程中可能出现的错误。当文件读取出错时，将在 output 元素中显示错误信息。
 }; 
 
 reader.onprogress = function(event) { 
 if (event.lengthComputable) { 
 progress.innerHTML = `${event.loaded}/${event.total}`; 
 } 
 //进度事件处理函数，用于在文件读取过程中更新读取进度。如果进度信息可计算，将在 progress 元素中显示当前已加载的字节数和总字节数。
 }; 

 reader.onload = function() { 
 let html = ""; 
 switch(type) { 
  case "image": 
 html = `<img src="${reader.result}">`; 
 break; 

 case "text": 
 html = reader.result; 
 break; 

 } 
 output.innerHTML = html; 
 }; 
 //成功加载事件处理函数，用于处理文件读取成功的情况。根据文件类型的不同，将生成不同的 HTML 内容，并将其显示在 output 元素中。
}); 
// 以上代码从表单字段中读取一个文件，并将其内容显示在了网页上。如果文件的 MIME 类型表示它是一个图片，那么就将其读取后保存为数据 URI，在 load 事件触发时将数据 URI 作为图片插入页面中。
// 如果文件不是图片，则读取后将其保存为文本并原样输出到网页上。progress 事件用于跟踪和显示读取文件的进度，而 error 事件用于监控错误。

// 如果想提前结束文件读取，则可以在过程中调用 abort()方法，从而触发 abort 事件。在 load、error 和 abort 事件触发后，还会触发 loadend 事件。loadend 事件表示在上述 3 种情况下，所有读取操作都已经结束。readAsText()和 readAsDataURL()方法已经得到了所有主流浏览器支持。
```

### FileReaderSync类型

```js
//顾名思义，FileReaderSync 类型就是 FileReader 的同步版本。这个类型拥有与 FileReader相同的方法，

// 只有在整个文件都加载到内存之后才会继续执行。

// FileReaderSync 只在工作线程中可用，因为如果读取整个文件耗时太长则会影响全局。
// 假设通过 postMessage()向工作线程发送了一个 File 对象。以下代码会让工作线程同步将文件读取到内存中，然后将文件的数据 URL 发回来：
// worker.js 
self.omessage = (messageEvent) => { 
 const syncReader = new FileReaderSync();
 console.log(syncReader); // FileReaderSync {}   .这是 Worker 线程的全局属性，用于指定当从父线程接收到消息时要执行的回调函数。在这个回调函数中，我们处理从父线程发送过来的消息。  创建了一个 FileReaderSync 的实例 syncReader，它是一个同步的文件读取器，可以在 Worker 线程中使用。打印了创建的 FileReaderSync 实例，用于确认文件读取器已成功创建。

 // 读取文件时阻塞工作线程  .使用 FileReaderSync 对象的 readAsDataURL() 方法同步地读取传入的数据。在这里，我们假设传入的数据是一个文件，readAsDataURL() 方法将返回该文件的 Data URL 字符串。文件的内容以 Base64 编码的形式嵌入到 Data URL 中。
 const result = syncReader.readAsDataUrl(messageEvent.data);

 // PDF 文件的示例响应 ,打印了读取文件后得到的 Data URL 字符串，以确认文件已经成功读取并转换为 Data URL。
 console.log(result); // data:application/pdf;base64,JVBERi0xLjQK... 

 // 把 URL 发回去,读取到的 Data URL 字符串发送回父线程，以便父线程进一步处理或显示。通常，父线程会接收到这个消息，并根据需要进行相应的操作，比如将 Data URL 显示为一个链接或嵌入到页面中。
 self.postMessage(result); 
};
//当 Worker 线程接收到消息时，1.它会创建一个 FileReaderSync 实例，2.并使用该实例同步读取传入的数据，3.然后将读取到的文件内容以 Data URL 的形式发送回父线程。
```

### Blob与部分读取

```js
//Blobs and Partial Reads
//某些情况下，可能需要读取部分文件而不是整个文件。为此，File 对象提供了一个名为 slice()的方法。

// slice()方法接收两个参数：起始字节和要读取的字节数。

// 这个方法返回一个 Blob 的实例，而 Blob 实际上是 File 的超类。
// blob 表示二进制大对象（binary larget object），是 JavaScript 对不可修改二进制数据的封装类型。包含字符串的数组、ArrayBuffers、ArrayBufferViews，甚至其他 Blob 都可以用来创建 blob。Blob构造函数可以接收一个 options 参数，并在其中指定 MIME 类型：
console.log(new Blob(['foo'])); 
// Blob {size: 3, type: ""}    ,创建了一个 Blob 对象，包含字符串 'foo'。Blob 是表示二进制大对象的一种数据类型，它通常用于存储二进制数据或大型数据对象。在这里，传入了一个包含单个字符串的数组，表示要存储的数据。   ，Blob 对象的大小为 3 字节，表示存储的数据字符串 'foo' 的长度为 3 字符。

console.log(new Blob(['{"a": "b"}'], { type: 'application/json' })); 
// {size: 10, type: "application/json"}  创建了一个 Blob 对象，包含 JSON 字符串 '{"a": "b"}'。此时，通过传入一个对象作为第二个参数，指定了 Blob 的 MIME 类型为 'application/json'，以便描述该 Blob 中数据的类型。Blob 对象的大小为 10 字节，表示存储的 JSON 字符串长度为 10 字符，类型为'application/json'。 

console.log(new Blob(['<p>Foo</p>', '<p>Bar</p>'], { type: 'text/html' })); 
// {size: 20, type: "text/html"} ,创建了一个 Blob 对象，包含 HTML 字符串 '<p>Foo</p>' 和 '<p>Bar</p>'。通过传入一个对象作为第二个参数，指定了 Blob 的 MIME 类型为 'text/html'，以便描述该 Blob 中数据的类型。打印了创建的 Blob 对象。在这个例子中，Blob 对象的大小为 20 字节，表示存储的 HTML 字符串总长度为 20 字符，类型为 'text/html'。

//以上展示了如何使用 Blob 对象来存储不同类型的数据，并说明了如何通过指定 MIME 类型来描述 Blob 中数据的类型。Blob 的大小是根据存储的数据长度来计算的。

// Blob 对象有一个 size 属性和一个 type 属性，还有一个 slice()方法用于进一步切分数据。另外也可以使用 FileReader 从 Blob 中读取数据。下面的例子!!!只会!!!读取文件的前 32 字节：
let filesList = document.getElementById("files-list"); 
//过 getElementById 方法获取具有指定 ID "files-list" 的 DOM 元素，通常是一个文件输入框或文件拖放区域。获取的元素被赋值给变量 filesList。给 filesList 元素添加了一个事件监听器，监听 change 事件。当用户在文件输入框中选择了文件或者拖放了文件时，就会触发这个事件。一旦事件发生，将执行指定的回调函数。
filesList.addEventListener("change", (event) => { 
 let info = "", 
 output = document.getElementById("output"), 
 progress = document.getElementById("progress"), 
 files = event.target.files, 
 reader = new FileReader(), 
 //声明了一些变量，其中：info 存储文件信息的字符串，初始化为空。output 获取具有指定 ID "output" 的 DOM 元素，通常用于显示文件内容或信息。progress 获取具有指定 ID "progress" 的 DOM 元素，通常用于显示文件读取的进度信息。files 获取用户选择的文件列表。reader 创建了一个新的 FileReader 对象，用于读取文件内容。blob 通过调用 blobSlice 函数获取文件的一部分，这里获取了文件的前 32 个字节作为 Blob 对象。
 blob = blobSlice(files[0], 0, 32);//blobSlice(file, start, end)，其中：file 是一个 File 或 Blob 对象，代表要截取数据的文件。start 是要截取的起始位置（以字节为单位）。end 是要截取的结束位置（以字节为单位）。

 if (blob) { 
 reader.readAsText(blob); 
 reader.onerror = function() { 
 output.innerHTML = "Could not read file, error code is " + 
 reader.error.code; 
 }; 
 reader.onload = function() { 
 output.innerHTML = reader.result; 
 }; 
 //检查是否成功获取到了文件的 Blob 对象。如果成功获取到了 Blob 对象，则执行对应的文件读取操作；否则，打印一条消息到控制台，指示浏览器不支持 slice() 方法。
//使用 FileReader 对象的 readAsText() 方法读取指定的 Blob 对象。在这里，我们将读取的文件内容以文本格式进行处理。
//错误处理函数，用于处理文件读取过程中可能出现的错误。当文件读取出错时，将在 output 元素中显示错误信息。
//成功加载事件处理函数，用于处理文件读取成功的情况。在这个函数中，将文件内容显示在 output 元素中。
 } else { 
 console.log("Your browser doesn't support slice()."); 
 } 
}); 

//当用户选择了文件或者拖放了文件时，会触发 change 事件。在事件处理函数中，首先获取用户选择的文件列表，并尝试获取文件的一部分作为 Blob 对象。如果成功获取到了 Blob 对象，则使用 FileReader 对象读取该 Blob 对象的内容，并将内容显示在页面上；否则，提示用户的浏览器不支持该操作。
// 只读取部分文件可以节省时间，特别是在只需要数据特定部分比如文件头的时候。
```

### 对象URL与Blob

```js
//Object URLs and Blobs(Binary Large Object)
//对象 URL 有时候也称作 Blob URL，是指引用存储在 File 或 Blob 中数据的 URL。对象 URL 的优点是不用把文件内容读取到 JavaScript 也可以使用文件。只要在适当位置提供对象 URL 即可。要创建对象 URL，可以使用 window.URL.createObjectURL()方法并传入 File 或 Blob 对象。这个函数返回的值是一个指向内存中地址的字符串。因为这个字符串是 URL，所以可以在 DOM 中直接使用。例如，
// 以下代码使用对象 URL 在页面中显示了一张图片：
let filesList = document.getElementById("files-list"); 
filesList.addEventListener("change", (event) => { 
 let info = "", 
 output = document.getElementById("output"), 
 progress = document.getElementById("progress"), 
 //声明了一些变量：info 存储文件信息的字符串，初始化为空。output 获取具有指定 ID "output" 的 DOM 元素，通常用于显示文件内容或信息。progress 获取具有指定 ID "progress" 的 DOM 元素，通常用于显示文件读取的进度信息。files 获取用户选择的文件列表。reader 创建了一个新的 FileReader 对象，用于读取文件内容。url 使用 URL.createObjectURL() 方法创建一个 URL，用于在页面中显示选定文件的预览。这个 URL 对象将代表所选文件的二进制数据
 files = event.target.files, 
 reader = new FileReader(), 
 url = window.URL.createObjectURL(files[0]); 

 if (url) { 
 if (/image/.test(files[0].type)) { 
 output.innerHTML = `<img src="${url}">`; 
} else { 
 output.innerHTML = "Not an image."; 
 } 
 } else { 
 output.innerHTML = "Your browser doesn't support object URLs."; 
 } 
 //检查是否成功创建了文件的预览 URL。如果成功创建了 URL，则根据文件类型判断是否是图片类型。如果是图片类型，则在 output 元素中显示该图片的预览；否则，显示文本信息 "Not an image."。如果无法创建 URL（一般是因为浏览器不支持 URL.createObjectURL() 方法），则在 output 元素中显示文本信息 "Your browser doesn't support object URLs."。
}); 
// 如果把对象 URL 直接放到<img>标签，就不需要把数据先读到 JavaScript 中了。<img>标签可以直接从相应的内存位置把数据读取到页面上。
// 使用完数据之后，最好能释放与之关联的内存。只要对象 URL 在使用中，就不能释放内存。如果想表明不再使用某个对象 URL，则可以把它传给 window.URL.revokeObjectURL()。页面卸载时，所有对象 URL 占用的内存都会被释放。不过，最好在不使用时就立即释放内存，以便尽可能保持页面占用最少资源。

// 释放内存和垃圾回收是相关但不完全相同的概念。
// 1. **释放内存**：释放内存是指在编程中显式地释放不再需要的内存空间，以便让操作系统可以重新分配这些空间给其他程序或者系统使用。在许多编程语言中，如C、C++，程序员需要手动分配内存，并在不再需要时显式释放这些内存，以避免内存泄漏和资源浪费。例如，在C语言中，使用 `free()` 函数来释放动态分配的内存。
// 2. **垃圾回收**：垃圾回收是一种自动化的内存管理机制，在运行时自动识别和回收不再使用的内存，以避免内存泄漏和提高程序的健壮性。垃圾回收器会周期性地扫描程序的内存空间，识别不再被引用的对象，并释放这些对象所占用的内存。垃圾回收通常由编程语言的运行时环境或者虚拟机来实现，如Java、JavaScript等语言中就有垃圾回收机制。
// 虽然释放内存和垃圾回收都涉及到内存管理，但它们的实现方式和触发时机不同。释放内存是由程序员显式地操作，而垃圾回收是由运行时环境自动进行的。垃圾回收通常更高级、更自动化，能够减少程序员的工作量，并且有助于避免一些常见的内存管理错误。
```

### 读取拖放文件

```js
//Drag-and-Drop File Reading
//组合使用 HTML5 拖放 API 与 File API 可以创建读取文件信息的有趣功能。在页面上创建放置目标后，可以从桌面上把文件拖动并放到放置目标。这样会像拖放图片或链接一样触发 drop 事件。被放置的文件可以通过事件的 event.dataTransfer.files 属性读到，这个属性保存着一组 File 对象，就像文本输入字段一样。
// 下面的例子会把拖放到页面放置目标上的文件信息打印出来：  当用户将文件拖放到指定区域时，会触发 dragenter、dragover 和 drop 事件。在事件处理函数中，首先阻止默认行为，然后根据事件类型处理拖放的文件列表，最后在页面中显示文件信息。
let droptarget = document.getElementById("droptarget"); //获取具有指定 ID "droptarget" 的 DOM 元素，通常是用作文件拖放的目标区域。
function handleEvent(event) { 
 let info = "", 
 output = document.getElementById("output"), 
 files, i, len; 
 event.preventDefault(); //事件处理函数，用于处理拖放事件。声明了一些变量：info 存储文件信息的字符串，初始化为空。output 获取具有指定 ID "output" 的 DOM 元素，通常用于显示文件信息。files, i, len 用于迭代处理拖放的文件列表。阻止了事件的默认行为。在拖放操作中，阻止默认行为是必要的，以避免浏览器打开拖放的文件或链接。

 if (event.type == "drop") { 
 files = event.dataTransfer.files; 
 i = 0; 
 len = files.length; 
 while (i < len) { 
 info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`; 
 i++; 
 } 
 output.innerHTML = info; 
 } 
 //在 drop 事件中，将获取拖放的文件列表，遍历文件列表，并构建文件信息字符串。最后，将文件信息显示在 output 元素中。
} 

droptarget.addEventListener("dragenter", handleEvent); 
droptarget.addEventListener("dragover", handleEvent); 
droptarget.addEventListener("drop", handleEvent); //将 handleEvent 函数分别添加为拖放目标元素的 dragenter、dragover 和 drop 事件的监听器。这样，当拖放事件发生时，将会调用 handleEvent 函数进行处理。

// 与后面要介绍的拖放的例子一样，必须取消 dragenter、dragover 和 drop 的默认行为。在drop 事件处理程序中，可以通过 event.dataTransfer.files 读到文件，此时可以获取文件的相关信息。
```

## 媒　体　元　素

```js
//MEDIA ELEMENTS
//随着嵌入音频和视频元素在 Web 应用上的流行，大多数内容提供商会强迫使用 Flash 以便达到最佳的跨浏览器兼容性。HTML5 新增了两个与媒体相关的元素，即<audio>和<video>，从而为浏览器提供了嵌入音频和视频的统一解决方案。
// 这两个元素既支持 Web 开发者在页面中嵌入媒体文件，也支持 JavaScript 实现对媒体的自定义控制。
// 以下是它们的用法：
<!-- 嵌入视频 --> 
<video src="conference.mpg" id="myVideo">Video player not available.</video> 
<!-- 嵌入音频 --> 
<audio src="song.mp3" id="myAudio">Audio player not available.</audio> 
// 每个元素至少要求有一个 src 属性，以表示要加载的媒体文件。我们也可以指定表示视频播放器大小的 width 和 height 属性，以及在视频加载期间显示图片 URI 的 poster 属性。另外，controls属性如果存在，则表示浏览器应该显示播放界面，让用户可以直接控制媒体。开始和结束标签之间的内容是在媒体播放器不可用时显示的替代内容。
// 由于浏览器支持的媒体格式不同，因此可以指定多个不同的媒体源。为此，需要从元素中删除 src属性，使用一个或多个<source>元素代替，如下面的例子所示：
// <!-- 嵌入视频 --> 
// <video id="myVideo"> 
//  <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'"> 
//  <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'"> 
//  <source src="conference.mpg"> 
//  Video player not available. 
// </video> 
// <!-- 嵌入音频 --> 
// <audio id="myAudio"> 
//  <source src="song.ogg" type="audio/ogg"> 
//  <source src="song.mp3" type="audio/mpeg"> 
//  Audio player not available. 
// </audio> 
// 讨论不同音频和视频的编解码器超出了本书范畴，但浏览器支持的编解码器确实可能有所不同，因此指定多个源文件通常是必需的。
```

### 属性

Properties
``<video>``和``<audio>``元素提供了稳健的 JavaScript 接口。这两个元素有很多共有属性，可以用于确定媒体的当前状态，如下表所示。

| 属性                 | 数据类型       | 说明                                                       |
|---------------------|--------------|-----------------------------------------------------------|
| autoplay            | Boolean      | 取得或设置 autoplay 标签                                   |
| buffered            | TimeRanges   | 对象，表示已下载缓冲的时间范围                               |
| bufferedBytes       | ByteRanges   | 对象，表示已下载缓冲的字节范围                               |
| bufferingRate       | Integer      | 平均每秒下载的位数                                           |
| bufferingThrottled  | Boolean      | 表示缓冲是否被浏览器截流                                     |
| controls            | Boolean      | 取得或设置 controls 属性，用于显示或隐藏浏览器内置控件        |
| currentLoop         | Integer      | 媒体已经播放的循环次数                                       |
| currentSrc          | String       | 当前播放媒体的 URL                                          |
| currentTime         | Float        | 已经播放的秒数                                               |
| defaultPlaybackRate | Float        | 取得或设置默认回放速率。默认为 1.0 秒                        |
| duration            | Float        | 媒体的总秒数                                                 |
| ended               | Boolean      | 表示媒体是否播放完成                                         |
| loop                | Boolean      | 取得或设置媒体是否应该在播放完再循环开始                      |
| muted               | Boolean      | 取得或设置媒体是否静音                                       |
| networkState        | Integer      | 表示媒体当前网络连接状态。0 表示空，1 表示加载中，2 表示加载元数据，3 表示加载了第一帧，4 表示加载完成 |
| paused              | Boolean      | 表示播放器是否暂停                                           |
| playbackRate        | Float        | 取得或设置当前播放速率。用户可能会让媒体播放快一些或慢一些。与 defaultPlaybackRate 不同，该属性会保持不变，除非开发者修改 |
| played              | TimeRanges   | 到目前为止已经播放的时间范围                                 |
| readyState          | Integer      | 表示媒体是否已经准备就绪。0 表示媒体不可用，1 表示可以显示当前帧，2 表示媒体可以开始播放，3 表示媒体可以从头播到尾 |
| seekable            | TimeRanges   | 可以跳转的时间范围                                           |
| seeking             | Boolean      | 表示播放器是否正移动到媒体文件的新位置                        |
| src                 | String       | 媒体文件源。可以在任何时候重写                                |
| start               | Float        | 取得或设置媒体文件中的位置，以秒为单位，从该处开始播放        |
| totalBytes          | Integer      | 资源需要的字节总数（如果知道的话）                            |
| videoHeight         | Integer      | 返回视频（不一定是元素）的高度。只适用于``<video>``               |
| videoWidth          | Integer      | 返回视频（不一定是元素）的宽度。只适用于``<video>``              |
| volume              | Float        | 取得或设置当前音量，值为 0.0 到 1.0                          |

上述很多属性也可以在``<audio>``或``<video>``标签上设置。

### 事件

Events
除了有很多属性，媒体元素还有很多事件。这些事件会监控由于媒体回放或用户交互导致的不同属性的变化。下表列出了这些事件。

| 事件               | 何时触发                      |
|-------------------|-------------------------------|
| abort             | 下载被中断                     |
| canplay           | 回放可以开始，readyState 为 2  |
| canplaythrough    | 回放可以继续，不应该中断，readState 为 3 |
| canshowcurrentframe | 已经下载当前帧，readyState 为 1 |
| dataunavailable   | 不能回放，因为没有数据，readyState 为 0 |
| durationchange    | duration 属性的值发生变化      |
| emptied           | 网络连接关闭了                 |
| empty             | 发生了错误，阻止媒体下载        |
| ended             | 媒体已经播放完一遍，且停止了    |
| error             | 下载期间发生了网络错误         |
| load              | 所有媒体已经下载完毕。这个事件已被废弃，使用 canplaythrough 代替 |
| loadeddata        | 媒体的第一帧已经下载           |
| loadedmetadata    | 媒体的元数据已经下载           |
| loadstart         | 下载已经开始                   |
| pause             | 回放已经暂停                   |
| play              | 媒体已经收到开始播放的请求     |
| playing           | 媒体已经实际开始播放了         |
| progress          | 下载中                         |
| ratechange        | 媒体播放速率发生变化           |
| seeked            | 跳转已结束                     |
| seeking           | 回放已移动到新位置             |
| stalled           | 浏览器尝试下载，但尚未收到数据  |
| timeupdate        | currentTime 被非常规或意外地更改了 |
| volumechange      | volume 或 muted 属性值发生了变化 |
| waiting           | 回放暂停，以下载更多数据       |

这些事件被设计得尽可能具体，以便 Web 开发者能够使用较少的 HTML 和 JavaScript 创建自定义的音频/视频播放器（而不是创建新 Flash 影片）。

### 自定义媒体播放器

```js
//Custom Media Players
//使用<audio>和<video>的 play()和 pause()方法，可以手动控制媒体文件的播放。综合使用属性、事件和这些方法，可以方便地创建自定义的媒体播放器，如下面的例子所示：
<div class="mediaplayer"> 
 <div class="video"> 
   <video id="player" src="movie.   mov" poster="mymovie.jpg" 
     width="300" height="200"> 
     Video player not available. 
   </video> 
 </div> 
 <div class="controls"> 
    <input type="button" value="Play" id="video-btn"> 
    <span id="curtime">0</span>/<span id="duration">0</span> 
 </div> 
</div> 
```

```js
// 通过使用 JavaScript 创建一个简单的视频播放器，上面这个基本的 HTML 就可以被激活了，如下所示：
// 取得元素的引用
let player = document.getElementById("player"), 
 btn = document.getElementById("video-btn"), 
 curtime = document.getElementById("curtime"), 
 duration = document.getElementById("duration"); 
// 更新时长
duration.innerHTML = player.duration; 
// 为按钮添加事件处理程序
btn.addEventListener( "click", (event) => { 
 if (player.paused) { 
 player.play(); 
 btn.value = "Pause"; 
 } else { 
 player.pause(); 
 btn.value = "Play"; 
 } 
 //当按钮被点击时，会执行回调函数。回调函数首先检查视频是否暂停，如果是暂停状态，则播放视频并将按钮文本设置为 "Pause"；如果不是暂停状态，则暂停视频并将按钮文本设置为 "Play"。
}); 
// 周期性更新当前时间
setInterval(() => { 
 curtime.innerHTML = player.currentTime; 
}, 250); 
//首先获取视频元素、按钮元素和显示当前时间及总时长的元素。然后设置总时长的显示内容为视频的总时长。为按钮添加点击事件处理程序，使其在点击时播放或暂停视频，并相应地修改按钮文本。最后，通过定时器周期性地更新当前播放时间的显示内容。
// 这里的 JavaScript 代码简单地为按钮添加了事件处理程序，可以根据当前状态播放和暂停视频。此外，还给<video>元素的 load 事件添加了事件处理程序，以便显示视频的时长。最后，重复的计时器用于更新当前时间。通过监听更多事件以及使用更多属性，可以进一步扩展这个自定义的视频播放器。同样的代码也可以用于<audio>元素以创建自定义的音频播放器。
```

### 检测编解码器

```js
//Codec Support Detection  就是说看下你这个浏览器能不能放?
//如前所述，并不是所有浏览器都支持<video>和<audio>的所有编解码器，这通常意味着必须提供多个媒体源。为此，也有 JavaScript API 可以用来检测浏览器是否支持给定格式和编解码器。这两个媒体元素都有一个名为 canPlayType()的方法，该方法接收一个格式/编解码器字符串，返回一个字符串值："probably"、"maybe"或""（空字符串），其中空字符串就是假值，意味着可以在 if 语句中像这样使用 canPlayType()：
if (audio.canPlayType("audio/mpeg")) { 
 // 执行某些操作
} 
"probably"和"maybe"都是真值，在 if 语句的上下文中可以转型为 true。
// 在只给 canPlayType()提供一个 MIME 类型的情况下，最可能返回的值是"maybe"和空字符串。这是因为文件实际上只是一个包装音频和视频数据的容器，而真正决定文件是否可以播放的是编码。在同时提供 MIME 类型和编解码器的情况下，返回值的可能性会提高到"probably"。下面是几个例子：
let audio = document.getElementById("audio-player"); 
// 很可能是"maybe" 
if (audio.canPlayType("audio/mpeg")) { 
 // 执行某些操作
} 
// 可能是"probably"
if (audio.canPlayType("audio/ogg; codecs=\"vorbis\"")) { 
 // 执行某些操作
} 
// 注意，编解码器必须放到引号中。同样，也可以在视频元素上使用 canPlayType()检测视频格式。
```

### 音频类型

```js
//The Audio Type
//<audio>元素还有一个名为 Audio 的原生 JavaScript 构造函数，支持在任何时候播放音频。Audio类型与 Image 类似，都是 DOM 元素的对等体，只是不需插入文档即可工作。要通过 Audio 播放音频，只需创建一个新实例并传入音频源文件：
let audio = new Audio("sound.mp3"); 
//创建了一个新的 Audio 对象，并将指定音频文件 "sound.mp3" 分配给它。这样就创建了一个用于播放音频文件的音频对象，并将其赋值给变量 audio。
EventUtil.addHandler(audio, "canplaythrough", function(event) { 
 audio.play(); 
 //自定义的事件处理函数，用于添加事件监听器。在这里，它被用来为 audio 元素添加一个事件监听器，监听 "canplaythrough" 事件。"canplaythrough" 事件表示音频可以播放并且不会因为缓冲而中断。当浏览器预计能够连续播放音频文件时，会触发此事件。  当 canplaythrough 事件被触发时，会执行回调函数，其中调用了 audio.play() 方法。这个方法用于开始播放音频文件。
}); 
// 创建 Audio 的新实例就会开始下载指定的文件。下载完毕后，可以调用 play()来播放音频。在 iOS 中调用 play()方法会弹出一个对话框，请求用户授权播放声音。为了连续播放，必须在onfinish 事件处理程序中立即调用 play()。
```

## 原生拖放

NATIVE DRAG AND DROP
IE4 最早在网页中为 JavaScript 引入了对拖放功能的支持。当时，网页中只有两样东西可以触发拖放：图片和文本。

拖动图片就是简单地在图片上按住鼠标不放然后移动鼠标。而对于文本，必须先选中，然后再以同样的方式拖动。

在 IE4 中，唯一有效的放置目标是文本框。IE5 扩展了拖放能力，添加了新的事件，让网页中几乎一切都可以成为放置目标。IE5.5 又进一步，!!!允许几乎一切都可以拖动!!!（IE6 也支
持这个功能）。HTML5 在 IE 的拖放实现基础上标准化了拖放功能。所有主流浏览器都根据 HTML5 规范实现了原生的拖放。
关于拖放最有意思的可能就是可以跨窗格、跨浏览器容器，有时候甚至可以跨应用程序拖动元素。
浏览器对拖放的支持可以让我们实现这些功能。

### 拖放事件

Drag-and-Drop Events
拖放事件几乎可以让开发者控制拖放操作的方方面面。

关键的部分是确定每个事件是在哪里触发的。

有的事件在被拖放元素上触发，有的事件则在放置目标上触发。在某个元素被拖动时，会（按顺序）触发以下事件：
(1) dragstart
(2) drag
(3) dragend
在按住鼠标键!!!不放并开始移动!!!鼠标的那一刻，被拖动元素上会触发 dragstart 事件。此时光标会变成非放置符号（圆环中间一条斜杠），表示元素不能放到自身上。拖动开始时，可以在 ondragstart事件处理程序中通过 JavaScript 执行某些操作。
dragstart 事件触发后，只要目标还被拖动就会持续触发 drag 事件。这个事件类似于 mousemove，即随着鼠标移动而不断触发。当拖动停止时（把元素放到有效或无效的放置目标上），会触发 dragend事件。
所有这 3 个事件的目标都是被拖动的元素。默认情况下，浏览器在拖动开始后不会改变被拖动元素的外观，因此是否改变外观由你来决定。不过，大多数浏览器此时会创建元素的一个半透明副本，始终跟随在光标下方。
在把元素拖动到一个有效的放置目标上时，会依次触发以下事件：
(1) dragenter
(2) dragover
(3) dragleave 或 drop
只要一把元素拖动到放置目标上，dragenter 事件（类似于 mouseover 事件）就会触发。dragenter事件触发之后，会立即触发 dragover 事件，并且元素在放置目标范围内被拖动期间此事件会持续触发。
当元素被拖动到放置目标之外，dragover 事件停止触发，dragleave 事件触发（类似于 mouseout事件）。如果被拖动元素被放到了目标上，则会触发 drop 事件而不是 dragleave 事件。这些事件的目标是放置目标元素。

### 自定义放置目标

```js
//Custom Drop Targets
//在把某个元素拖动到无效放置目标上时，会看到一个特殊光标（圆环中间一条斜杠）表示不能放下。即使所有元素都支持放置目标事件，这些元素默认也是不允许放置的。如果把元素拖动到不允许放置的目标上，无论用户动作是什么都不会触发 drop 事件。不过，通过覆盖 dragenter 和 dragover 事件的默认行为，可以把任何元素转换为有效的放置目标。例如，如果有一个 ID 为"droptarget"的<div>元素，那么可以使用以下代码把它转换成一个放置目标：
let droptarget = document.getElementById("droptarget"); 
//获取具有指定 ID "droptarget" 的 DOM 元素，通常用作文件拖放的目标区域，并将其赋值给变量 droptarget。
droptarget.addEventListener("dragover", (event) => { 
 event.preventDefault(); 
 //为 droptarget 元素添加了一个 dragover 事件的监听器。dragover 事件在拖动目标元素上发生时触发，表示拖动对象正在悬停在目标上方。在这个监听器中，调用 event.preventDefault() 方法阻止默认行为，以允许在此元素上放置被拖动的对象。
}); 
droptarget.addEventListener("dragenter", (event) => { 
 event.preventDefault(); 
 //为 droptarget 元素添加了一个 dragenter 事件的监听器。dragenter 事件在拖动对象进入目标元素时触发。在这个监听器中，同样调用 event.preventDefault() 方法阻止默认行为，以允许在此元素上放置被拖动的对象。
}); 
// 执行上面的代码之后，把元素拖动到这个<div>上应该可以看到光标变成了允许放置的样子。另外，drop 事件也会触发。

// 在 Firefox 中，放置事件的默认行为是导航到放在放置目标上的 URL。这意味着把图片拖动到放置目标上会导致页面导航到图片文件，把文本拖动到放置目标上会导致无效 URL 错误。为阻止这个行为，!!!在 Firefox 中必须!!!取消 drop 事件的默认行为：
droptarget.addEventListener("drop", (event) => { 
 event.preventDefault(); 
}); 
```

### dataTransfer对象

```js
//除非数据受影响，否则简单的拖放并没有实际意义。为实现拖动操作中的数据传输，IE5 在 event对象上暴露了 dataTransfer 对象，用于从被拖动元素向放置目标传递字符串数据which exists as a property of event and is used to transfer string data from the dragged item to the drop target.因为这个对象是event 的属性，所以在拖放事件的事件处理程序外部无法访问 dataTransfer。在事件处理程序内部，可以使用这个对象的属性和方法实现拖放功能。dataTransfer 对象现在已经纳入了 HTML5 工作草案。
// dataTransfer 对象有两个主要方法：getData()和 setData()。顾名思义，getData()用于获取 setData()存储的值。setData()的第一个参数以及 getData()的唯一参数是一个字符串，表示要设置的数据类型："text"或"URL"，如下所示： 首先，使用 setData() 方法将文本和 URL 数据设置到拖放操作的数据传输对象中。然后，使用 getData() 方法从数据传输对象中获取文本和 URL 数据。

// 传递文本,将数据 "some text" 设置到拖放操作的数据传输对象中，并指定数据类型为 "text"。在拖放操作中，数据传输对象用于传递拖动操作中的数据。从拖放操作的数据传输对象中获取名为 "text" 的数据。如果之前使用 setData() 方法设置了相同类型的数据，那么这行代码将返回设置的数据，否则将返回一个空字符串。
event.dataTransfer.setData("text", "some text"); 
let text = event.dataTransfer.getData("text"); //???能打印text吗 ,是多少

// 传递 URL ,将 URL "http://www.wrox.com/" 设置到拖放操作的数据传输对象中，并指定数据类型为 "URL"。从拖放操作的数据传输对象中获取名为 "URL" 的数据。如果之前使用 setData() 方法设置了相同类型的数据，那么这行代码将返回设置的数据，否则将返回一个空字符串。
event.dataTransfer.setData("URL", "http://www.wrox.com/"); 
let url = event.dataTransfer.getData("URL"); 
// 虽然这两种数据类型是 IE 最初引入的，但 HTML5 已经将其扩展为允许任何 MIME 类型。为向后兼容，HTML5还会继续支持"text"和"URL"，但它们会分别被映射到"text/plain"和"text/uri-list"。
// dataTransfer 对象实际上可以包含每种 MIME 类型的一个值，也就是说可以同时保存文本和URL，两者不会相互覆盖。存储在 dataTransfer 对象中的数据只能在放置事件中读取。如果没有在ondrop 事件处理程序中取得这些数据，dataTransfer 对象就会被销毁，数据也会丢失。
// 在从文本框拖动文本时，浏览器会调用 setData()并将拖动的文本以"text"格式存储起来。类似地，在拖动链接或图片时，浏览器会调用 setData()并把 URL 存储起来。当数据被放置在目标上时，可以使用 getData()获取这些数据。当然，可以在 dragstart 事件中手动调用 setData()存储自定义数据，以便将来使用。
// 作为文本的数据和作为 URL 的数据有一个区别。当把数据作为文本存储时，数据不会被特殊对待。
// 而当把数据作为 URL 存储时，数据会被作为网页中的一个链接，意味着如果把它放到另一个浏览器窗口，浏览器会导航到该 URL。
// 直到版本 5，Firefox都不能正确地把"url"映射为"text/uri-list"或把"text"映射为"text/plain"。
// 不过，它可以把"Text"（第一个字母大写）正确映射为"text/plain"。在通过 dataTransfer 获取数据时，为保持最大兼容性，需要对 URL 检测两个值并对文本使用"Text"： 首先，将拖放操作的数据传输对象存储在变量 dataTransfer 中。然后，尝试从数据传输对象中获取 URL 数据，优先尝试获取类型为 "url" 的数据，如果不存在则尝试获取类型为 "text/uri-list" 的数据，并将获取到的第一个非空数据赋值给变量 url。接着，尝试从数据传输对象中获取文本数据，并将其赋值给变量 text。

let dataTransfer = event.dataTransfer; //将拖放操作的数据传输对象存储在变量 dataTransfer 中。数据传输对象用于在拖放操作期间传递数据。
// 读取 URL ,从数据传输对象中尝试获取 URL 数据。它首先尝试从数据传输对象中获取类型为 "url" 的数据，如果获取不到，则尝试获取类型为 "text/uri-list" 的数据。它使用了逻辑或运算符 || 来检查两种类型的数据是否存在，并将第一个非空的数据赋值给变量 url。
let url = dataTransfer.getData("url") || dataTransfer.getData("text/uri-list"); 
// 读取文本,从数据传输对象中获取文本数据。它尝试获取类型为 "Text" 的数据，并将其赋值给变量 text。
let text = dataTransfer.getData("Text"); 
// 这里要注意，首先应该尝试短数据名。这是因为直到版本 10，IE 都不支持扩展的类型名，而且会在遇到无法识别的类型名时抛出错误。
```

### dropEffect 与 effectAllowed

dataTransfer 对象不仅可以用于实现简单的数据传输，还可以用于确定能够对被拖动元素和放置目标执行什么操作。为此，可以使用两个属性：dropEffect 与 effectAllowed。
dropEffect 属性可以告诉浏览器允许哪种放置行为 tell the browser which type of drop behaviors are allowed.这个属性有以下 4 种可能的值。
 "none"：被拖动元素不能放到这里。这是除文本框之外所有元素的默认值。
 "move"：被拖动元素应该移动到放置目标。
 "copy"：被拖动元素应该复制到放置目标。
 "link"：表示放置目标会导航到被拖动元素（仅在它是 URL 的情况下）。
在把元素拖动到放置目标上时，上述每种值都会导致显示一种不同的光标。不过，是否导致光标示意的动作还要取决于开发者。换句话说，如果没有代码参与，则没有什么会自动移动、复制或链接。唯一不用考虑的就是光标自己会变。为了使用 dropEffect 属性，必须在放置目标的 ondragenter 事件处理程序中设置它。

除非同时设置 effectAllowed，否则 dropEffect 属性也没有用。effectAllowed 属性表示对被拖动元素是否允许 dropEffect。This property indicates which dropEffect is allowed for the dragged item.这个属性有如下几个可能的值。
 "uninitialized"：没有给被拖动元素设置动作。
 "none"：被拖动元素上没有允许的操作。
 "copy"：只允许"copy"这种 dropEffect。
 "link"：只允许"link"这种 dropEffect。
 "move"：只允许"move"这种 dropEffect。
 "copyLink"：允许"copy"和"link"两种 dropEffect。
 "copyMove"：允许"copy"和"move"两种 dropEffect。
 "linkMove"：允许"link"和"move"两种 dropEffect。
 "all"：允许所有 dropEffect。
必须在 ondragstart 事件处理程序中设置这个属性。

假设我们想允许用户把文本从一个文本框拖动到一个``<div>``元素。那么必须同时把 dropEffect 和effectAllowed 属性设置为"move"。因为``<div>``元素上放置事件的默认行为是什么也不做，所以文本不会自动地移动自己。The text won’t automatically move itself because the default behavior for the drop event on a ``<div>`` is to do nothing.如果覆盖这个默认行为，文本就会自动从文本框中被移除。然后是否把文本插入``<div>``元素就取决于你了。如果是把 dropEffect 和 effectAllowed 属性设置为"copy"，那么文本框中的文本不会自动被移除。

不太懂什么意思???

### 可拖动能力

```js
//Draggability
//默认情况下，图片、链接和文本是可拖动的，这意味着无须额外代码用户便可以拖动它们。文本只有在被选中后才可以拖动，而图片和链接在任意时候都是可以拖动的。我们也可以让其他元素变得可以拖动。HTML5 在所有 HTML 元素上规定了一个 draggable 属性，表示元素是否可以拖动。图片和链接的 draggable 属性自动被设置为 true，而其他所有元素此属性的默认值为 false。如果想让其他元素可拖动，或者不允许图片和链接被拖动，都可以设置这个属性。
例如：
<!-- 禁止拖动图片 --> 
<img src="smile.gif" draggable="false" alt="Smiley face"> 
<!-- 让元素可以拖动 --> 
<div draggable="true">...</div> 

```

### 其他成员

Additional Members
HTML5 规范还为 dataTransfer 对象定义了下列方法。
 addElement(element)：为拖动操作添加元素。这纯粹是为了传输数据，不会影响拖动操作的外观。在本书写作时，还没有浏览器实现这个方法。
 clearData(format)：清除以特定格式存储的数据。
 setDragImage(element, x, y)：允许指定拖动发生时显示在光标下面的图片。这个方法接收 3 个参数：要显示的 HTML 元素及标识光标位置的图片上的 x 和 y 坐标。这里的 HTML 元素可以是一张图片，此时显示图片；也可以是其他任何元素，此时显示渲染后的元素。
 types：当前存储的数据类型列表。这个集合类似数组，以字符串形式保存数据类型，比如"text"。

## Notifications API

Notifications API 用于向用户显示通知。无论从哪个角度看，这里的通知都很类似 alert()对话框：
都使用 JavaScript API 触发页面外部的浏览器行为，而且都允许页面处理用户与对话框或通知弹层的交
互。不过，通知提供更灵活的自定义能力。
Notifications API 在 Service Worker 中非常有用。渐进 Web 应用（PWA，Progressive Web Application）
通过触发通知可以在页面不活跃时向用户显示消息，看起来就像原生应用。

### 通知权限

```js
//Notification Permissions
//Notifications API 有被滥用的可能，因此默认会开启两项安全措施：
 通知只能在运行在安全上下文的代码中被触发；
 通知必须按照每个源的原则明确得到用户允许。
用户授权显示通知是通过浏览器内部的一个对话框完成的。除非用户没有明确给出允许或拒绝的答
复，否则这个权限请求对每个域只会出现一次。浏览器会记住用户的选择，如果被拒绝则无法重来。
页面可以使用全局对象 Notification 向用户请求通知权限。这个对象有一个 requestPemission()
方法，该方法返回一个期约，用户在授权对话框上执行操作后这个期约会解决。
Notification.requestPermission() 
 .then((permission) => { 
 console.log('User responded to permission request:', permission); 
 }); 
"granted"值意味着用户明确授权了显示通知的权限。除此之外的其他值意味着显示通知会静默失
败。如果用户拒绝授权，这个值就是"denied"。一旦拒绝，就无法通过编程方式挽回，因为不可能再
触发授权提示。
```

### 显示和隐藏通知

```js
//Showing and Hiding Notification
//Notification 构造函数用于创建和显示通知。最简单的通知形式是只显示一个标题，这个标题内
容可以作为第一个参数传给 Notification 构造函数。以下面这种方式调用 Notification，应该会
立即显示通知：
new Notification('Title text!'); 
可以通过 options 参数对通知进行自定义，包括设置通知的主体、图片和振动等：
new Notification('Title text!', {
 body: 'Body text!', 
 image: 'path/to/image.png', 
 vibrate: true 
});
调用这个构造函数返回的 Notification 对象的 close()方法可以关闭显示的通知。下面的例子
展示了显示通知后 1000 毫秒再关闭它：
const n = new Notification('I will close in 1000ms'); 
setTimeout(() => n.close(), 1000);
```

### 通知生命周期回调

```js
//Notification Lifecycle Callbacks
//通知并非只用于显示文本字符串，也可用于实现交互。Notifications API 提供了 4 个用于添加回调的
生命周期方法：
 onshow 在通知显示时触发；
 onclick 在通知被点击时触发；
 onclose 在通知消失或通过 close()关闭时触发；
 onerror 在发生错误阻止通知显示时触发。onerror is triggered when an error occurs that prevents the notification from being 
displayed
下面的代码将每个生命周期事件都通过日志打印了出来：
const n = new Notification('foo'); 
n.onshow = () => console.log('Notification was shown!'); 
n.onclick = () => console.log('Notification was clicked!'); 
n.onclose = () => console.log('Notification was closed!'); 
n.onerror = () => console.log('Notification experienced an error!'); 
```

## Page Visibility API

Web 开发中一个常见的问题是开发者不知道用户什么时候真正在使用页面。如果页面被最小化或隐藏在其他标签页后面，那么轮询服务器或更新动画等功能可能就没有必要了。Page Visibility API 旨在为
开发者提供页面对用户是否可见的信息。
这个 API 本身非常简单，由 3 部分构成。
 document.visibilityState 值，表示下面 4 种状态之一。
 页面在后台标签页或浏览器中最小化了。
 页面在前台标签页中。
 实际页面隐藏了，但对页面的预览是可见的（例如在 Windows 7 上，用户鼠标移到任务栏图标上会显示网页预览）。
 页面在屏外预渲染。
 visibilitychange 事件，该事件会在文档从隐藏变可见（或反之）时触发。
 document.hidden 布尔值，表示页面是否隐藏。这可能意味着页面在后台标签页或浏览器中被最小化了。这个值是为了向后兼容才继续被浏览器支持的，应该优先使用 document.visibilityState
检测页面可见性。

要想在页面从可见变为隐藏或从隐藏变为可见时得到通知，需要监听 visibilitychange 事件。
document.visibilityState 的值是以下三个字符串之一：
 "hidden"
 "visible"
 "prerender"

## Streams API

Streams API 是为了解决一个简单但又基础的问题而生的：Web 应用如何消费有序的小信
息块而不是大块信息？How can a web application consume information in sequential chunks rather than in bulk?这种能力主要有两种应用场景。
 大块数据可能不会一次性都可用。网络请求的响应就是一个典型的例子。网络负载是以连续信息包形式交付的，而流式处理可以让应用在数据一到达就能使用，而不必等到所有数据都加载完毕。什么是流式处理???
 大块数据可能需要分小部分处理。视频处理、数据压缩、图像编码和 JSON 解析都是可以分成小部分进行处理，而不必等到所有数据都在内存中时再处理的例子。
第 24 章在讨论网络请求和远程资源时会介绍 Streams API 在 fetch()中的应用，不过 Streams API
本身是通用的。实现 Observable 接口的 JavaScript 库共享了很多流的基础概念。
注意 虽然 Fetch API已经得到所有主流浏览器支持，但 Streams API则没有那么快得到支持。

流式处理（Stream Processing）是一种数据处理方式，通过连续而持续的数据流来进行实时处理和分析，而不是一次性处理整个数据集。在流式处理中，数据会被分成一系列的数据段（流），每个数据段都会被逐个处理，并且可以在数据到达的同时进行处理。
举个场景来说明流式处理的应用：
假设你是一个电子商务公司的数据分析师，负责监控用户行为和实时分析销售数据。你希望能够实时地监控网站上的用户行为，比如浏览商品、添加到购物车、下单购买等，并且根据用户行为做出相应的推荐或者促销活动。
在这种情况下，你可以使用流式处理来实现实时的数据分析和推荐系统。你可以通过在网站上添加监控和日志记录功能，将用户行为数据以流的形式发送到流处理平台。然后，在流处理平台上，你可以编写流式处理程序来实时处理这些数据，分析用户行为模式，生成实时的统计报表，甚至是实时地向用户推荐商品或者提供个性化的优惠信息。
举例来说，当一个用户浏览了一件商品时，网站会记录下这个用户的浏览行为，并将这条数据发送到流处理平台。流处理程序可以即时分析这条数据，更新该用户的偏好模型，并且根据这个用户的偏好向其推荐相关的商品。如果用户在购物车中添加了商品，流处理程序也可以即时更新购物车统计信息，并且触发相应的库存管理和订单处理操作。
总的来说，流式处理通过实时地处理数据流，可以帮助应用程序实时地进行数据分析、监控和决策，从而实现更加智能和响应速度更快的应用系统。

### 理解流

Introduction to Streams
提到流，可以把数据想像成某种通过管道输送的液体。JavaScript 中的流借用了管道相关的概念，
因为原理是相通的。根据规范，“这些 API 实际是为映射低级 I/O 原语而设计，包括适当时候对字节流
的规范化”。Stream API 直接解决的问题是处理网络请求和读写磁盘。
Stream API 定义了三种流。
 可读流Readable streams：可以通过某个公共接口读取数据块的流。数据在内部从底层源进入流，然后由消费者
（consumer）进行处理。
 可写流Writable streams：可以通过某个公共接口写入数据块的流。生产者（producer）将数据写入流，数据在内
部传入底层数据槽（sink）。
 转换流Transform streams：由两种流组成，可写流用于接收数据（可写端），可读流用于输出数据（可读端）。这
两个流之间是转换程序（transformer），可以根据需要检查和修改流内容。

块、内部队列和反压Chunks, Internal Queues, and Backpressure
流的基本单位是块（chunk）。块可是任意数据类型，但通常是定型数组。每个块都是离散的流片段，
可以作为一个整体来处理。更重要的是，块不是固定大小的，也不一定按固定间隔到达。在理想的流当
中，块的大小通常近似相同，到达间隔也近似相等。不过好的流实现需要考虑边界情况。
前面提到的各种类型的流都有入口和出口的概念。有时候，由于数据进出速率不同，可能会出现不
匹配的情况。为此流平衡可能出现如下三种情形。
 流出口处理数据的速度比入口提供数据的速度快。流出口经常空闲（可能意味着流入口效率较
低），但只会浪费一点内存或计算资源，因此这种流的不平衡是可以接受的。
 流入和流出均衡。这是理想状态。
 流入口提供数据的速度比出口处理数据的速度快。这种流不平衡是固有的问题。此时一定会在
某个地方出现数据积压，流必须相应做出处理。
流不平衡是常见问题，但流也提供了解决这个问题的工具。所有流都会为已进入流但尚未离开流的
块提供一个内部队列。对于均衡流，这个内部队列中会有零个或少量排队的块，因为流出口块出列的速度与流入口块入列的速度近似相等。这种流的内部队列所占用的内存相对比较小。
如果块入列速度快于出列速度，则内部队列会不断增大。流不能允许其内部队列无限增大，因此它
会使用反压（backpressure）通知流入口停止发送数据，直到队列大小降到某个既定的阈值之下。这个阈
值由排列策略决定，这个策略定义了内部队列可以占用的最大内存，即高水位线（high water mark）。

### 可读流

```js
//Readable Streams
//可读流是对底层数据源的封装。底层数据源可以将数据填充到流中，允许消费者通过流的公共接口读取数据。Readable streams are a wrapper for an underlying source of data. This underlying source is able to feed its data into the stream and allow that data to be read from the stream’s public interface.
1. ReadableStreamDefaultController
来看下面的生成器，它每 1000 毫秒就会生成一个递增的整数：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
 // 在生成器函数中，yield 关键字用于暂停函数的执行，并将指定的值作为生成器的下一个值返回。await: 在异步函数中，await 关键字用于暂停函数的执行，等待 Promise 解析完成，并返回解析后的值。new Promise((resolve) => setTimeout(resolve, 1000, i)): 这是一个 Promise 对象的实例化。在这个 Promise 中，setTimeout 函数会在 1000 毫秒后调用 resolve，并传递参数 i。(resolve) => setTimeout(resolve, 1000, i): 这是一个箭头函数，它接收一个参数 resolve，并在 1000 毫秒后调用 resolve 函数，并将 i 作为参数传递给 resolve 函数。setTimeout(resolve, 1000, i): 这是一个异步操作，它会在 1000 毫秒后调用 resolve 函数，并将 i 作为参数传递给 resolve 函数。await new Promise(...): 使用 await 关键字等待 Promise 解析完成。这里暂停函数的执行，直到 setTimeout 函数调用 resolve，并将 i 作为参数传递给 resolve 函数，然后才会继续执行生成器函数。
 } 
 //异步生成器函数 ints(),使用 for 循环，从 0 开始，每次递增 1，循环次数为 5 次。使用了 yield 关键字，将当前的生成器状态暂停，并等待异步操作的结果。在这里，使用 setTimeout 创建了一个延迟 1000 毫秒的异步操作，当延迟结束时，生成器继续执行，并将当前循环变量 i 的值作为结果返回。
 //该函数每隔 1000 毫秒生成一个递增的整数，并在生成器中使用 yield 暂停状态，等待异步操作的结果。这样，在每次循环时，生成器将暂停执行并等待 1000 毫秒后再继续执行，并返回当前循环变量的值。
} 
这个生成器的值可以通过可读流的控制器传入可读流。访问这个控制器最简单的方式就是创建
ReadableStream 的一个实例，并在这个构造函数的 underlyingSource 参数（第一个参数）中定义
start()方法，然后在这个方法中使用作为参数传入的 controller。默认情况下，这个控制器参数是
ReadableStreamDefaultController 的一个实例：
const readableStream = new ReadableStream({ 
 start(controller) { 
 console.log(controller); // ReadableStreamDefaultController {} 
 } 
}); 
//创建了一个新的可读流对象 readableStream，通过传入一个配置对象来初始化这个可读流。在配置对象中，定义了 start 方法作为可读流的启动函数。这个方法会在流被启动时被调用，并传入一个 controller 参数，用于控制流的行为。

调用控制器的 enqueue()方法可以把值传入控制器。所有值都传完之后，调用 close()关闭流：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const readableStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of ints()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
 //创建了一个可读流对象 readableStream，通过传入一个配置对象来初始化这个可读流。在配置对象中，定义了 start 方法作为可读流的启动函数。这个方法会在流被启动时被调用，并传入一个 controller 参数，用于控制流的行为。
 //使用 for await...of 循环，遍历异步生成器函数 ints() 生成的递增整数序列，并将每个整数作为 chunk 返回给调用方。   将生成的整数块 chunk 推送到可读流的控制器对象中，以便流的消费者可以读取这些数据。   关闭可读流的控制器对象，表示数据已经全部生成完毕，没有更多的数据需要传递给流的消费者了。
});
```

```js
//2. ReadableStreamDefaultReader
前面的例子把 5 个值加入了流的队列，但没有把它们从队列中读出来。为此，需要一个 ReadableStreamDefaultReader 的实例，该实例可以通过流的 getReader()方法获取。调用这个方法会获得
流的锁，保证只有这个读取器可以从流中读取值：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
 } 
 const readableStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of ints()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
}); 
console.log(readableStream.locked); // false 
const readableStreamDefaultReader = readableStream.getReader(); 
console.log(readableStream.locked); // true 

消费者使用这个读取器实例的 read()方法可以读出值：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const readableStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of ints()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
}); 
console.log(readableStream.locked); // false 
const readableStreamDefaultReader = readableStream.getReader(); 
console.log(readableStream.locked); // true 
//首先，定义了一个异步生成器函数 ints()，用于生成递增的整数。然后，创建了一个可读流对象 readableStream，在初始化配置对象中定义了 start 方法作为流的启动函数。在 start 方法中，使用 for await...of 循环遍历异步生成器函数 ints() 生成的整数序列，并将每个整数推送到流的控制器对象中。最后，关闭了可读流的控制器对象，表示数据生成完毕。接着，通过调用 getReader() 方法创建了一个可读流的默认阅读器对象，用于从流中读取数据。

// 消费者,最后，通过一个异步函数作为消费者，不断地从可读流中读取数据，并打印出来，直到流被关闭。
(async function() { 
 while(true) { 
 const { done, value } = await readableStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
})(); 
// 0 
// 1 
// 2 
// 3 
// 4 

//什么意思 ,不懂???
```

### 可写流

```js
//Writable Streams
//可写流是底层数据槽的封装。底层数据槽处理通过流的公共接口写入的数据。Writable streams are a wrapper for an underlying sink for data. This underlying sink handles data from the stream’s public interface.
//1. 创建 WritableStream
//来看下面的生成器，它每 1000 毫秒就会生成一个递增的整数：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
//这些值通过可写流的公共接口可以写入流。在传给 WritableStream 构造函数的 underlyingSink参数中，通过实现 write()方法可以获得写入的数据：
const readableStream = new ReadableStream({ 
 write(value) { 
 console.log(value); 
 } 
}); 

//2. WritableStreamDefaultWriter
//要把获得的数据写入流，可以通过流的 getWriter()方法获取 WritableStreamDefaultWriter的实例。这样会获得流的锁，确保只有一个写入器可以向流中写入数据：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const writableStream = new WritableStream({ 
 write(value) { 
 console.log(value); 
 } 
}); 
console.log(writableStream.locked); // false 
const writableStreamDefaultWriter = writableStream.getWriter(); 
console.log(writableStream.locked); // true 
// 在向流中写入数据前，生产者必须确保写入器可以接收值。writableStreamDefaultWriter.ready返回一个期约，此期约会在能够向流中写入数据时解决。然后，就可以把值传给writableStreamDefaultWriter.write()方法。写入数据之后，调用 writableStreamDefaultWriter.close()将流关闭：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const writableStream = new WritableStream({
write(value) { 
 console.log(value); 
 } 
}); 
console.log(writableStream.locked); // false 
const writableStreamDefaultWriter = writableStream.getWriter(); 
console.log(writableStream.locked); // true 

// 生产者
(async function() { 
 for await (let chunk of ints()) { 
 await writableStreamDefaultWriter.ready; 
 writableStreamDefaultWriter.write(chunk); 
 } 
 writableStreamDefaultWriter.close(); 
})();

//就是说你不写.close它就不关

//什么意思???不太懂
```

### 转换流

```js
//Transform Streams
//转换流用于组合可读流和可写流。数据块在两个流之间的转换是通过 transform()方法完成的。
// 来看下面的生成器，它每 1000 毫秒就会生成一个递增的整数：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 

// 下面的代码创建了一个 TransformStream 的实例，通过 transform()方法将每个值翻倍：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
//以下加粗
const { writable, readable } = new TransformStream({ 
 transform(chunk, controller) { 
 controller.enqueue(chunk * 2); 
 } 
}); 

// 向转换流的组件流（可读流和可写流）传入数据和从中获取数据，与本章前面介绍的方法相同：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const { writable, readable } = new TransformStream({ 
 transform(chunk, controller) { 
 controller.enqueue(chunk * 2); 
} 
}); 
const readableStreamDefaultReader = readable.getReader(); 
const writableStreamDefaultWriter = writable.getWriter(); 
//首先，定义了一个异步生成器函数 ints()，用于生成递增的整数。然后，创建了一个转换流对象，其中的 transform 方法将从可写端传入的数据进行简单的乘以 2 的转换操作，并将结果推送到可读端。接着，创建了可读流的默认阅读器对象和可写流的默认写入器对象。

// 消费者,通过一个立即执行的异步函数作为消费者，不断地从可读端读取数据，并打印出来，直到流被关闭。
(async function() { 
 while (true) { 
 const { done, value } = await readableStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
})(); 

// 生产者,一个立即执行的异步函数作为生产者，不断地从生成器函数中获取整数块，并将其写入到可写端，直到所有数据被写入完毕，然后关闭可写流的写入器对象。
(async function() { 
 for await (let chunk of ints()) { 
 await writableStreamDefaultWriter.ready; 
 writableStreamDefaultWriter.write(chunk); 
 } 
 writableStreamDefaultWriter.close(); 
})(); 

//什么意思???
```

### 通过管道连接流

```js
//Piping Streams
//流可以通过管道连接成一串Streams can be piped into one another to form a chain。最常见的用例是使用 pipeThrough()方法把 ReadableStream 接入TransformStream。One common form of this is to pipe a ReadableStream into a TransformStream using the pipeThrough() method.从内部看，ReadableStream 先把自己的值传给 TransformStream 内部的WritableStream，然后执行转换，接着转换后的值又在新的 ReadableStream 上出现。下面的例子将一个整数的 ReadableStream 传入 TransformStream，TransformStream 对每个值做加倍处理：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const integerStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of ints()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
 //定义了一个异步生成器函数 ints()，用于生成递增的整数。然后，创建了一个可读流对象 integerStream，在其初始化配置中，使用异步函数作为 start 方法，用于启动流并将整数数据推送给流的控制器。
}); 

const doublingStream = new TransformStream({ 
 transform(chunk, controller) { 
 controller.enqueue(chunk * 2); 
 } 
 //创建了一个转换流对象 doublingStream，在其初始化配置中，定义了 transform 方法，用于对从可读端传入的数据进行转换操作。
}); 

// 通过管道连接流,通过 pipeThrough 方法将整数流和转换流进行管道连接，生成一个新的连接流 pipedStream。
const pipedStream = integerStream.pipeThrough(doublingStream); 
// 从连接流的输出获得读取器,创建了连接流的默认阅读器对象 pipedStreamDefaultReader，用于从连接流中读取数据。
const pipedStreamDefaultReader = pipedStream.getReader();

// 消费者,一个立即执行的异步函数作为消费者，不断地从连接流读取数据，并打印出来，直到流被关闭。
(async function() { 
 while(true) { 
 const { done, value } = await pipedStreamDefaultReader.read(); 
 if (done) { 
 break; 
 } else { 
 console.log(value); 
 } 
 } 
})(); 
// 0 
// 2 
// 4 
// 6 
// 8 

// 另外，使用 pipeTo()方法也可以将 ReadableStream 连接到 WritableStream。整个过程与使用 pipeThrough()类似：
async function* ints() { 
 // 每 1000 毫秒生成一个递增的整数
 for (let i = 0; i < 5; ++i) { 
 yield await new Promise((resolve) => setTimeout(resolve, 1000, i)); 
 } 
} 
const integerStream = new ReadableStream({ 
 async start(controller) { 
 for await (let chunk of ints()) { 
 controller.enqueue(chunk); 
 } 
 controller.close(); 
 } 
}); 
const writableStream = new WritableStream({ 
 write(value) { 
 console.log(value); 
 } 
});
const pipedStream = integerStream.pipeTo(writableStream); 
// 0 
// 1
// 2 
// 3 
// 4 
// 注意，这里的管道连接操作隐式从 ReadableStream 获得了一个读取器，并把产生的值填充到WritableStream。

//大概是???  就是说要弄的变量都需要搞个新的变量来装,再操作???
```

## 计时API

```js
//TIMING APIs
//页面性能始终是 Web 开发者关心的话题。Performance 接口通过 JavaScript API 暴露了浏览器内部的度量指标，允许开发者直接访问这些信息并基于这些信息实现自己想要的功能。这个接口暴露在window.performance 对象上。所有与页面相关的指标，包括已经定义和将来会定义的，都会存在于这个对象上。
// Performance 接口由多个 API 构成：
//  High Resolution Time API 
//  Performance Timeline API 
//  Navigation Timing API 
//  User Timing API 
//  Resource Timing API 
//  Paint Timing API 
// 有关这些规范的更多信息以及新增的性能相关规范，可以关注 W3C 性能工作组的 GitHub 项目页面。
// 注意:浏览器通常支持被废弃的 Level 1 和作为替代的 Level 2。本节尽量介绍 Level 2 级规范。
```

### High Resolution Time API

```js
//Date.now()方法只适用于日期时间相关操作，而且是不要求计时精度的操作。在下面的例子中，函数 foo()调用前后分别记录了一个时间戳：
const t0 = Date.now(); 
foo(); 
const t1 = Date.now(); 

const duration = t1 – t0; 

console.log(duration); 
//用来测量函数 foo() 的执行时间。记录函数开始执行的时间，然后执行函数，记录函数执行结束的时间，计算两个时间点之间的时间差，最后将时间差打印出来，从而得到函数的执行时间。
// 考虑如下 duration 会包含意外值的情况。
//  duration 是 0。Date.now()只有毫秒级精度，如果 foo()执行足够快，则两个时间戳的值会相等。
//  duration 是负值或极大值。如果在 foo()执行时，系统时钟被向后或向前调整了（如切换到夏令时），则捕获的时间戳不会考虑这种情况，因此时间差中会包含这些调整。
// 为此，必须使用不同的计时 API 来精确且准确地度量时间的流逝。High Resolution Time API 定义了window.performance.now()，这个方法返回一个微秒精度的浮点值。因此，使用这个方法先后捕获的时间戳更不可能出现相等的情况。而且这个方法可以保证时间戳单调增长。
const t0 = performance.now(); 
const t1 = performance.now(); 
console.log(t0); // 1768.625000026077 
console.log(t1); // 1768.6300000059418 
const duration = t1 – t0; 
console.log(duration); // 0.004999979864805937 
//使用了 performance.now() 方法来测量时间，它提供了更高精度的时间测量，通常以毫秒为单位。 跟上面的差不多,就是精度高了一些
// performance.now()计时器采用相对度量。这个计时器在执行上下文创建时从 0 开始计时。例如，打开页面或创建工作线程时，performance.now()就会从 0 开始计时。由于这个计时器在不同上下文中初始化时可能存在时间差，因此不同上下文之间如果没有共享参照点则不可能直接比较 performance.now()。
// performance.timeOrigin 属性返回计时器初始化时全局系统时钟的值。
const relativeTimestamp = performance.now(); //获取相对于文档加载开始时间（performance.timeOrigin）的时间戳。
const absoluteTimestamp = performance.timeOrigin + relativeTimestamp; //计算了相对时间戳和文档加载开始时间的总和，得到绝对时间戳。
console.log(relativeTimestamp); // 244.43500000052154 相对时间戳 ,即相对于文档加载开始时间的时间差。
console.log(absoluteTimestamp); // 1561926208892.4001 绝对时间戳,即从 Unix 纪元（1970 年 1 月 1 日 00:00:00 UTC）到当前时间的毫秒数。
//使用了 performance.now() 和 performance.timeOrigin 方法来获取相对和绝对的时间戳。

// 注意:通过使用 performance.now()测量 L1 缓存与主内存的延迟差，幽灵漏洞（Spectre）可以执行缓存推断攻击。为弥补这个安全漏洞，所有的主流浏览器有的选择降低
// performance.now()的精度，有的选择在时间戳里混入一些随机性。WebKit 博客上有一篇相关主题的不错的文章“What Spectre and Meltdown Mean For WebKit”，作者是 Filip Pizlo。
```

### Performance Timeline API

```js
//Performance Timeline API 使用一套用于度量客户端延迟的工具扩展了 Performance 接口。性能度量将会采用计算结束与开始时间差的形式。这些开始和结束时间会被记录为 DOMHighResTimeStamp值，而封装这个时间戳的对象是 PerformanceEntry 的实例。
// 浏览器会自动记录各种 PerformanceEntry 对象，而使用 performance.mark()也可以记录自定义的 PerformanceEntry 对象。在一个执行上下文中被记录的所有性能条目可以通过 performance. getEntries()获取： 

console.log(performance.getEntries()); 
// [PerformanceNavigationTiming, PerformanceResourceTiming, ... ] 
// 这个返回的集合代表浏览器的性能时间线（performance timeline）。每个 PerformanceEntry 对象都有 name、entryType、startTime 和 duration 属性： 使用了 performance.getEntries() 方法来获取页面性能相关的记录，并输出其中第一个记录的相关信息:

const entry = performance.getEntries()[0]; //调用了 performance.getEntries() 方法获取页面性能相关的记录数组，并取出数组中的第一个记录
console.log(entry.name); // "https://foo.com" 打印出记录的名称，通常是资源的 URL 或导航的 URL。
console.log(entry.entryType); // navigation 打印出记录的类型，这里是导航
console.log(entry.startTime); // 0 打印出记录的开始时间，通常是从页面加载开始的时间（相对于 performance.timing.navigationStart）。
console.log(entry.duration); // 182.36500001512468 打印出记录的持续时间，通常是从开始时间到结束时间的时间差。

// 不过，PerformanceEntry 实际上是一个抽象基类。所有记录条目虽然都继承 PerformanceEntry，但最终还是如下某个具体类的实例：
//  PerformanceMark
//  PerformanceMeasure
//  PerformanceFrameTiming
//  PerformanceNavigationTiming
//  PerformanceResourceTiming
//  PerformancePaintTiming
// 上面每个类都会增加大量属性，用于描述与相应条目有关的元数据。每个实例的 name 和 entryType属性会因为各自的类不同而不同。
```

#### User Timing API

```js
//User Timing API 用于记录和分析自定义性能条目。如前所述，记录自定义性能条目要使用
// performance.mark()方法：创建一个名为 "foo" 的性能标记，并输出该标记的相关信息，以便进行性能分析和调试。使用了 Performance API 中的 performance.mark() 和 performance.getEntriesByType() 方法来创建和获取性能标记，并输出了第一个标记的相关信息。

performance.mark('foo'); //使用 performance.mark() 方法在性能时间线上创建一个名为 "foo" 的性能标记。使用 performance.getEntriesByType() 方法获取所有类型为 "mark" 的性能记录，并输出其中第一个记录的相关信息。
console.log(performance.getEntriesByType('mark')[0]); 
//输出的内容是一个对象，包含了这个性能标记的各种信息：
// PerformanceMark { 
// name: "foo", 
// entryType: "mark", 
// startTime: 269.8800000362098, 
// duration: 0 
// } 
// 在计算开始前和结束后各创建一个自定义性能条目可以计算时间差。最新的标记（mark）会被推到getEntriesByType()返回数组的开始：使用了 Performance API 中的 performance.mark() 方法来创建两个性能标记，并使用 performance.getEntriesByType() 方法获取这两个标记的信息，然后计算它们之间的时间差:

performance.mark('foo'); 
for (let i = 0; i < 1E6; ++i) {} 
performance.mark('bar'); 
const [endMark, startMark] = performance.getEntriesByType('mark'); 
console.log(startMark.startTime - endMark.startTime); // 1.3299999991431832 测量在一个循环执行后创建性能标记的时间间隔，用于分析某些操作的执行时间。

// 除了自定义性能条目，还可以生成 PerformanceMeasure（性能度量）条目，对应由名字作为标识的两个标记之间的持续时间。PerformanceMeasure 的实例由 performance.measure()方法生成：使用了 Performance API 中的 performance.mark() 方法来创建两个性能标记，并使用 performance.measure() 方法创建了一个性能测量来测量这两个标记之间的时间间隔:

performance.mark('foo'); 
for (let i = 0; i < 1E6; ++i) {} 
performance.mark('bar'); //使用 performance.mark() 方法在性能时间线上创建一个名为 "bar" 的性能标记，这个标记是在循环后创建的
performance.measure('baz', 'foo', 'bar'); //使用 performance.measure() 方法创建了一个名为 "baz" 的性能测量，用于测量 "foo" 标记和 "bar" 标记之间的时间间隔。
const [differenceMark] = performance.getEntriesByType('measure');//使用 performance.getEntriesByType() 方法获取所有类型为 "measure" 的性能记录，并将这些记录存储在 differenceMark 变量中。
console.log(differenceMark); 
//显示了性能测量的名称为 "baz"，起始时间为 "foo" 标记的时间，持续时间为从 "foo" 到 "bar" 标记的时间间隔。
// PerformanceMeasure { 
// name: "baz", 
// entryType: "measure", 
// startTime: 298.9800000214018, 
// duration: 1.349999976810068 
// } 测量在一个循环执行后创建性能标记并进行性能测量，用于分析某些操作的执行时间。

//就是说得建一个新的测量已经存在的???
```

#### Navigation Timing API

```js
//Navigation Timing API 提供了高精度时间戳，用于度量当前页面加载速度。浏览器会在导航事件发生时自动记录 PerformanceNavigationTiming 条目。这个对象会捕获大量时间戳，用于描述页面是何时以及如何加载的。
// 下面的例子计算了 loadEventStart 和 loadEventEnd 时间戳之间的差：
const [performanceNavigationTimingEntry] = performance.getEntriesByType('navigation'); 
console.log(performanceNavigationTimingEntry); 
// PerformanceNavigationTiming { 
// connectEnd: 2.259999979287386 
// connectStart: 2.259999979287386 
// decodedBodySize: 122314 
// domComplete: 631.9899999652989 
// domContentLoadedEventEnd: 300.92499998863786 
// domContentLoadedEventStart: 298.8950000144541 
// domInteractive: 298.88499999651685 
// domainLookupEnd: 2.259999979287386 
// domainLookupStart: 2.259999979287386 
// duration: 632.819999998901 
// encodedBodySize: 21107 
// entryType: "navigation" 
// fetchStart: 2.259999979287386 
// initiatorType: "navigation" 
// loadEventEnd: 632.819999998901 
// loadEventStart: 632.0149999810383 
// name: " https://foo.com " 
// nextHopProtocol: "h2" 
// redirectCount: 0 
// redirectEnd: 0 
// redirectStart: 0 
// requestStart: 7.7099999762140214 
// responseEnd: 130.50999998813495 
// responseStart: 127.16999999247491 
// secureConnectionStart: 0 
// serverTiming: [] 
// startTime: 0 
// transferSize: 21806 
// type: "navigate" 
// unloadEventEnd: 132.73999997181818 
// unloadEventStart: 132.41999997990206 
// workerStart: 0 
// } 
console.log(performanceNavigationTimingEntry.loadEventEnd – 
 performanceNavigationTimingEntry.loadEventStart); 
// 0.805000017862767 
```

#### Resource Timing API

```js
//Resource Timing API 提供了高精度时间戳，用于度量当前页面加载时请求资源的速度。浏览器会在加载资源时自动记录 PerformanceResourceTiming。这个对象会捕获大量时间戳，用于描述资源加载的速度。
// 下面的例子计算了加载一个特定资源所花的时间：

const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0]; 
//使用了 Performance API 中的 performance.getEntriesByType() 方法来获取资源类型的性能条目，并打印出第一个资源的性能条目。
console.log(performanceResourceTimingEntry); 
// PerformanceResourceTiming { 
// connectEnd: 138.11499997973442
// connectStart: 138.11499997973442 
// decodedBodySize: 33808 
// domainLookupEnd: 138.11499997973442 
// domainLookupStart: 138.11499997973442 
// duration: 0 
// encodedBodySize: 33808 
// entryType: "resource" 
// fetchStart: 138.11499997973442 
// initiatorType: "link" 
// name: "https://static.foo.com/bar.png", 
// nextHopProtocol: "h2" 
// redirectEnd: 0 
// redirectStart: 0 
// requestStart: 138.11499997973442 
// responseEnd: 138.11499997973442 
// responseStart: 138.11499997973442 
// secureConnectionStart: 0 
// serverTiming: [] 
// startTime: 138.11499997973442 
// transferSize: 0 
// workerStart: 0 
// } 
console.log(performanceResourceTimingEntry.responseEnd – 
 performanceResourceTimingEntry.requestStart); 
// 493.9600000507198 
// 通过计算并分析不同时间的差，可以更全面地审视浏览器加载页面的过程，发现可能存在的性能瓶颈。
```

## Web 组件

这里所说的 Web 组件指的是一套用于增强 DOM 行为的工具，包括影子 DOM、自定义元素和 HTML 模板。这一套浏览器 API 特别混乱。
 并没有统一的“Web Components”规范：每个 Web 组件都在一个不同的规范中定义。
 有些 Web 组件如影子 DOM 和自定义元素，已经出现了向后不兼容的版本问题。
 浏览器实现极其不一致。
由于存在这些问题，因此使用 Web 组件通常需要引入一个 Web 组件库，比如 Polymer。这种库可以作为腻子脚本，模拟浏览器中缺失的 Web 组件。
注意 本章只介绍 Web 组件的最新版本。

### HTML 模板

```js
//在 Web 组件之前，一直缺少基于 HTML 解析构建 DOM 子树，然后在需要时再把这个子树渲染出来的机制。一种间接方案是使用 innerHTML 把标记字符串转换为 DOM 元素，但这种方式存在严重的安全隐患。另一种间接方案是使用 document.createElement()构建每个元素，然后逐个把它们添加到孤儿根节点（不是添加到 DOM），但这样做特别麻烦，完全与标记无关。
// 相反，更好的方式是提前在页面中写出特殊标记，让浏览器自动将其解析为 DOM 子树，但跳过渲染。这正是 HTML 模板的核心思想，而<template>标签正是为这个目的而生的。下面是一个简单的HTML 模板的例子：
<template id="foo"> 
 <p>I'm inside a template!</p> 
</template>
```

#### 使用 DocumentFragment

```js
//在浏览器中渲染时，上面例子中的文本不会被渲染到页面上。因为<template>的内容不属于活动文档，所以 document.querySelector()等 DOM 查询方法不会发现其中的<p>标签。这是因为<p>存在于一个包含在 HTML 模板中的 DocumentFragment 节点内。
// 在浏览器中通过开发者工具检查网页内容时，可以看到<template>中的 DocumentFragment：
<template id="foo"> 
 #document-fragment 
 <p>I'm inside a template!</p> 
</template> 

// 通过<template>元素的 content 属性可以取得这个 DocumentFragment 的引用：
console.log(document.querySelector('#foo').content); // #document-fragment
// 此时的 DocumentFragment 就像一个对应子树的最小化 document 对象。换句话说，DocumentFragment 上的 DOM 匹配方法可以查询其子树中的节点：
const fragment = document.querySelector('#foo').content; 
console.log(document.querySelector('p')); // null 
console.log(fragment.querySelector('p')); // <p>...<p> 
// DocumentFragment 也是批量向 HTML 中添加元素的高效工具。比如，我们想以最快的方式给某个 HTML 元素添加多个子元素

// !!!如果连续调用 document.appendChild()，则不仅费事，还会导致多次布局重排。而使用 DocumentFragment 可以一次性添加所有子节点，最多只会有一次布局重排：!!!


// 开始状态：
// <div id="foo"></div> 
// 
// 期待的最终状态：
// <div id="foo"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </div> 
// 也可以使用 document.createDocumentFragment() 
const fragment = new DocumentFragment(); 
const foo = document.querySelector('#foo'); 
// 为 DocumentFragment 添加子元素不会导致布局重排
fragment.appendChild(document.createElement('p')); 
fragment.appendChild(document.createElement('p')); 
fragment.appendChild(document.createElement('p')); 
console.log(fragment.children.length); // 3 
foo.appendChild(fragment); 
console.log(fragment.children.length); // 0
console.log(document.body.innerHTML); 
// <div id="foo"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </div> 
```

#### 使用``<template>``标签

```js
//注意，在前面的例子中，DocumentFragment 的所有子节点都高效地转移到了 foo 元素上，转移之后 DocumentFragment 变空了。同样的过程也可以使用<template>标签重现This same procedure can be replicated using a <template>:：

const fooElement = document.querySelector('#foo'); 
const barTemplate = document.querySelector('#bar'); 
const barFragment = barTemplate.content; 

console.log(document.body.innerHTML); 
// <div id="foo"> 
// </div> 
// <template id="bar"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </template> 

fooElement.appendChild(barFragment); 

console.log(document.body.innerHTML); 
// <div id="foo"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </div> 
// <tempate id="bar"></template> 
//就是说把元素从里面薅过来

// 如果想要复制模板，可以使用 importNode()方法克隆 DocumentFragment：

const fooElement = document.querySelector('#foo'); 
const barTemplate = document.querySelector('#bar'); 
const barFragment = barTemplate.content; 

console.log(document.body.innerHTML); 
// <div id="foo"> 
// </div> 
// <template id="bar"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </template> 

fooElement.appendChild(document.importNode(barFragment, true)); 

console.log(document.body.innerHTML); 
// <div id="foo"> 
// <p></p> 
// <p></p> 
// <p></p>
// </div> 
// <template id="bar"> 
// <p></p> 
// <p></p> 
// <p></p> 
// </template>
//就是说复制不是转移,以前的不变
```

#### 模板脚本

```js
//脚本执行可以推迟到将 DocumentFragment 的内容实际添加到 DOM 树。下面的例子演示了这个过程：
// 页面 HTML：
// 
// <div id="foo"></div> 
// <template id="bar"> 
// <script>console.log('Template script executed');</script> 
// </template> 
const fooElement = document.querySelector('#foo'); 
const barTemplate = document.querySelector('#bar'); 
const barFragment = barTemplate.content; 
console.log('About to add template'); 
fooElement.appendChild(barFragment); 
console.log('Added template'); 
// About to add template 
// Template script executed 
// Added template 
//由于模板内容包含一个 <script> 元素，当模板内容被添加到文档中时，其中的脚本会被执行。因此，打印的顺序为 "About to add template"，然后是 <script> 中的内容 "Template script executed"，最后是 "Added template"。
// 如果新添加的元素需要进行某些初始化，这种延迟执行是有用的。
```

### 影子 DOM

Shadow DOM
概念上讲，影子 DOM（shadow DOM） Web 组件相当直观，通过它可以将一个完整的 DOM 树作为节点添加到父 DOM 树。这样可以实现 DOM 封装，意味着 CSS 样式和 CSS 选择符可以限制在影子 DOM子树而不是整个顶级 DOM 树中。
影子 DOM 与 HTML 模板很相似，因为它们都是类似 document 的结构，并允许与顶级 DOM 有一定程度的分离。不过，影子 DOM 与 HTML 模板还是有区别的，主要表现在影子 DOM 的内容会实际渲染到页面上，而 HTML 模板的内容不会。

#### 介绍影子DOM

```js
//Introduction to Shadow DOM
//假设有以下 HTML 标记，其中包含多个类似的 DOM 子树：
<div> 
 <p>Make me red!</p> 
</div> 
<div> 
 <p>Make me blue!</p> 
</div> 
<div> 
 <p>Make me green!</p> 
</div> 
// 从其中的文本节点可以推断出，这 3 个 DOM 子树会分别渲染为不同的颜色As you’ve likely surmised揣度from the text nodes, each of these three DOM subtrees should be assigned different colors.。常规情况下，为了给每个子树应用唯一的样式，又不使用 style 属性，就需要给每个子树添加一个唯一的类名，然后通过相应的选择符为它们添加样式：
<div class="red-text"> 
 <p>Make me red!</p> 
</div> 
<div class="green-text"> 
 <p>Make me green!</p> 
</div> 
<div class="blue-text"> 
 <p>Make me blue!</p> 
</div>

<style> 
.red-text { 
 color: red; 
} 
.green-text { 
 color: green; 
} 
.blue-text { 
 color: blue; 
} 
</style> 
// 当然，这个方案也不是十分理想，因为这跟在全局命名空间中定义变量没有太大区别。尽管知道这些样式与其他地方无关，所有 CSS 样式还会应用到整个 DOM。为此，就要保持 CSS 选择符足够特别，以防这些样式渗透到其他地方。但这也仅是一个折中的办法而已。理想情况下，应该能够把 CSS 限制在使用它们的 DOM 上：这正是影子 DOM 最初的使用场景。Ideally, you’d prefer to restrict CSS to only a portion of the DOM: therein lies the raw utility of the shadow DOM.
```

#### 创建影子DOM

```js
//Creating a Shadow DOM
//考虑到安全及避免影子 DOM 冲突，并非所有元素都可以包含影子 DOM。尝试给无效元素或者已经有了影子 DOM 的元素添加影子 DOM 会导致抛出错误。
以下是可以容纳影子 DOM 的元素。
 任何以有效名称创建的自定义元素（参见 HTML 规范中相关的定义）
 <article>
 <aside>
 <blockquote>
 <body>
 <div>
 <footer>
 <h1>
 <h2>
 <h3>
 <h4>
 <h5>
 <h6>
 <header>
 <main>
 <nav>
 <p>
 <section>
 <span>
// 影子 DOM 是通过 attachShadow()方法创建并添加给有效 HTML 元素的。容纳影子 DOM 的元素被称为影子宿主（shadow host）。影子 DOM 的根节点被称为影子根（shadow root）。
// attachShadow()方法需要一个shadowRootInit 对象，返回影子DOM的实例。shadowRootInit对象必须包含一个 mode 属性，值为"open"或"closed"。对"open"影子 DOM的引用可以通过 shadowRoot属性在 HTML 元素上获得，而对"closed"影子 DOM 的引用无法这样获取。
// 下面的代码演示了不同 mode 的区别：

document.body.innerHTML = ` 
 <div id="foo"></div> 
 <div id="bar"></div> 
`; 

const foo = document.querySelector('#foo'); 
const bar = document.querySelector('#bar'); 

const openShadowDOM = foo.attachShadow({ mode: 'open' }); 
const closedShadowDOM = bar.attachShadow({ mode: 'closed' });

console.log(openShadowDOM); // #shadow-root (open)
console.log(closedShadowDOM); // #shadow-root (closed)

console.log(foo.shadowRoot); // #shadow-root (open) 
console.log(bar.shadowRoot); // null 限制通过影子宿主访问影子 DOM
// 一般来说，需要创建保密（closed）影子 DOM 的场景很少。虽然这可以限制通过影子宿主访问影子 DOM，但恶意代码有很多方法绕过这个限制，恢复对影子 DOM 的访问。

// !!!简言之，不能为了安全而建保密影子 DOM。!!!

// 注意 如果想保护独立的 DOM 树不受未信任代码影响，影子 DOM 并不适合这个需求。
// 对<iframe>施加的跨源限制更可靠.
```

### 使用影子DOM

```js
//Using a Shadow DOM
//把影子 DOM 添加到元素之后，可以像使用常规 DOM 一样使用影子 DOM。来看下面的例子，这里重新创建了前面红/绿/蓝子树的示例：你会在页面中看到三个不同颜色的 <p> 元素，每个元素都包含在自己的 Shadow DOM 中:

for (let color of ['red', 'green', 'blue']) 
//循环语句，它遍历颜色数组中的每个颜色值。
{ 
 const div = document.createElement('div'); 
 const shadowDOM = div.attachShadow({ mode: 'open' }); 
 //建一个新的 <div> 元素，并将其存储在 div 变量中。   使用 attachShadow() 方法创建一个 Shadow DOM，并将其模式设置为 "open"，表示可以从外部访问 Shadow DOM。
 document.body.appendChild(div); //将新创建的 <div> 元素添加到文档的 <body> 中。
 shadowDOM.innerHTML = ` 
 <p>Make me ${color}</p> 
 <style> 
 p { 
 color: ${color}; 
 } 
 </style> 
 `; 
 //将 Shadow DOM 中的 innerHTML 设置为一段 HTML 代码，其中包含一个 <p> 元素和一个内联样式。   这是插值语法，${color} 的值将根据当前循环迭代的颜色值进行替换，每次迭代时都会生成一个不同颜色的 <p> 元素。   这是内联样式块，它包含了一些 CSS 规则，其中的颜色将根据当前循环迭代的颜色值进行设置，以使每个 <p> 元素具有不同的颜色
} 
// 虽然这里使用相同的选择符应用了 3 种不同的颜色，但每个选择符只会把样式应用到它们所在的影子 DOM 上。为此，3 个<p>元素会出现 3 种不同的颜色。

// 可以这样验证这些元素分别位于它们自己的影子 DOM 中：
for (let color of ['red', 'green', 'blue']) { 
 const div = document.createElement('div'); 
 const shadowDOM = div.attachShadow({ mode: 'open' }); 
 document.body.appendChild(div); 
 shadowDOM.innerHTML = ` 
 <p>Make me ${color}</p> 
 <style> 
 p { 
 color: ${color}; 
 } 
 </style> 
 `; 
} 

function countP(node) { 
 console.log(node.querySelectorAll('p').length); 
}
//调用 countP() 函数统计页面中所有 <div> 元素及其 Shadow DOM 中 <p> 元素的数量。
countP(document); // 0  首先调用 countP() 函数，传入 document 作为参数，目的是统计整个文档中 <p> 元素的数量，但这里结果为 0，因为没有直接在 document 中查找 <p> 元素。
for (let element of document.querySelectorAll('div')) { 
 countP(element.shadowRoot); 
 //    这是一个 for...of 循环，用于遍历文档中所有 <div> 元素。   在循环中，对每个 <div> 元素的 Shadow DOM 调用 countP() 函数，以统计每个 Shadow DOM 中 <p> 元素的数量。
} 
// 1 
// 1 
// 1 

// 在浏览器开发者工具中可以更清楚地看到影子 DOM。例如，前面的例子在浏览器检查窗口中会显示成这样：
<body> 
<div> 
 #shadow-root (open) 
 <p>Make me red!</p> 
 <style> 
 p { 
 color: red; 
 } 
 </style> 
</div> 
<div> 
 #shadow-root (open) 
 <p>Make me green!</p> 
 <style> 
 p { 
 color: green; 
 } 
 </style> 
</div> 
<div> 
 #shadow-root (open) 
 <p>Make me blue!</p> 
 <style> 
 p { 
 color: blue; 
 } 
 </style> 
</div> 
</body> 

// 影子 DOM 并非铁板一块。HTML 元素可以在 DOM 树间无限制移动：
document.body.innerHTML = ` 
<div></div> 
<p id="foo">Move me</p> 
`; 
const divElement = document.querySelector('div'); 
const pElement = document.querySelector('p'); 
const shadowDOM = divElement.attachShadow({ mode: 'open' }); 
// 从父 DOM 中移除元素
divElement.parentElement.removeChild(pElement); 
// 把元素添加到影子 DOM 
shadowDOM.appendChild(pElement); 
// 检查元素是否移动到了影子 DOM 中
console.log(shadowDOM.innerHTML); // <p id="foo">Move me</p>
```

### 合成与影子 DOM 槽位

```js
//Composition and Shadow DOM Slots
//影子 DOM 是为自定义 Web 组件设计的，为此需要支持嵌套 DOM 片段。从概念上讲，可以这么说：
// 位于影子宿主中的 HTML需要一种机制以渲染到影子 DOM中去，但这些 HTML又不必属于影子 DOM树。
// 默认情况下，嵌套内容会隐藏。来看下面的例子，其中的文本在 1000 毫秒后会被隐藏：Consider the following example where the text becomes hidden after 1000 milliseconds: 就是说shadow是藏\盖起来:
document.body.innerHTML = ` 
<div> 
 <p>Foo</p> 
</div> 
`; 
//将文档的 body 内容替换为给定的 HTML 结构，其中包含一个 div 元素，其内部包含一个 p 元素（文本为 "Foo"）。
//这是一个 setTimeout 函数调用，它会在 1 秒后执行指定的函数。在这里，指定的函数是使用 document.querySelector('div') 来获取文档中的第一个 div 元素，然后调用 attachShadow({ mode: 'open' }) 来将其 Shadow DOM 设置为开启模式。
setTimeout(() => document.querySelector('div').attachShadow({ mode: 'open' }), 1000); 
// 影子 DOM 一添加到元素中，浏览器就会赋予它最高优先级，优先渲染它的内容而不是原来的文本。
// 在这个例子中，由于影子 DOM 是空的，因此<div>会在 1000 毫秒后变成空的。

// 为了显示文本内容，需要使用<slot>标签指示浏览器在哪里放置原来的 HTML。下面的代码修改了前面的例子，让影子宿主中的文本出现在了影子 DOM 中：. In the code that follows, the previous example is reworked so the text reappears inside the shadow DOM:
document.body.innerHTML = ` 
<div id="foo"> 
 <p>Foo</p> 
</div> 
`; 
document.querySelector('div') 
 .attachShadow({ mode: 'open' }) 
 .innerHTML = `<div id="bar"> 
 <slot></slot> 
 <div>` 
// 现在，投射进去的内容就像自己存在于影子 DOM 中一样。检查页面会发现原来的内容实际上替代了<slot>：
<body> 
<div id="foo"> 
 #shadow-root (open) 
 <div id="bar"> 
 <p>Foo</p> 
 </div> 
</div> 
</body> 

// !!!注意，虽然在页面检查窗口中看到内容在影子 DOM中，但这实际上只是 DOM内容的投射（projection）。
// 实际的元素仍然处于!!!外部 DOM 中!!!：什么意思???
document.body.innerHTML = ` 
<div id="foo"> 
 <p>Foo</p> 
</div> 
`; 
document.querySelector('div') 
 .attachShadow({ mode: 'open' }) 
 .innerHTML = ` 
 <div id="bar"> 
 <slot></slot> 
 </div>` 
console.log(document.querySelector('p').parentElement); 
// <div id="foo"></div> 

// 下面是使用槽位（slot）改写的前面红/绿/蓝子树的例子：
for (let color of ['red', 'green', 'blue']) { 
 const divElement = document.createElement('div'); 
 divElement.innerText = `Make me ${color}`; 
 //将新创建的 div 元素添加到文档的 body 中。
 document.body.appendChild(divElement) 
 
 //在 p 元素中包含一个插槽（slot），这是用于插入来自宿主元素的内容。  
 //宿主元素指的是创建的每个 div 元素。在循环中，每次迭代都创建了一个 div 元素，并为每个 div 元素创建了一个 Shadow DOM。因此，每个 div 元素都是其相应 Shadow DOM 的宿主元素。
 divElement 
 .attachShadow({ mode: 'open' }) 
 .innerHTML = ` 
 <p><slot></slot></p> 
 <style> 
 p { 
 color: ${color}; 
 
 } 
 </style> 
 `; 
} 

// 除了默认槽位，还可以使用命名槽位（named slot）实现多个投射。这是通过匹配的 slot/name 属性对实现的。带有 slot="foo"属性的元素会被投射到带有 name="foo"的<slot>上。下面的例子演示了如何改变影子宿主子元素的渲染顺序：就是说定向\同名投射:
document.body.innerHTML = ` 
<div> 
 <p slot="foo">Foo</p> 
 <p slot="bar">Bar</p> 
</div> 
`; 
document.querySelector('div') 
 .attachShadow({ mode: 'open' }) 
 .innerHTML = ` 
 <slot name="bar"></slot> 
 <slot name="foo"></slot> 
 `; 
// Renders: 
// Bar 
// Foo 
```

### 事件重找靶

```js
//Event Retargeting
//如果影子 DOM 中发生了浏览器事件（如 click），那么浏览器需要一种方式以让父 DOM 处理事件。
// 不过，实现也必须考虑影子 DOM 的边界。为此，事件会逃出影子 DOM 并经过事件重定向（event retarget）在外部被处理。逃出后，事件就好像是由影子宿主本身而非真正的包装元素触发的一样。下面的代码演示了这个过程：
// 创建一个元素作为影子宿主
document.body.innerHTML = ` 
<div onclick="console.log('Handled outside:', event.target)"></div> 
`; 

// 添加影子 DOM 并向其中插入 HTML 
document.querySelector('div') 
 .attachShadow({ mode: 'open' }) 
 .innerHTML = ` 
<button onclick="console.log('Handled inside:', event.target)">Foo</button> 
`; 
// 点击按钮时：
// Handled inside: <button onclick="..."></button> 
// Handled outside: <div onclick="..."></div> 

// !!!注意，事件重定向只会发生在影子 DOM 中实际存在的元素上。使用<slot>标签从外部投射进来的元素不会发生事件重定向，因为从技术上讲，这些元素仍然存在于影子 DOM 外部。
```

### 自定义元素

Custom Elements
如果你使用 JavaScript 框架，那么很可能熟悉自定义元素的概念。这是因为所有主流框架都以某种形式提供了这个特性。自定义元素为 HTML 元素引入了面向对象编程的风格。基于这种风格，可以创建自定义的、复杂的和可重用的元素，而且只要使用简单的 HTML 标签或属性就可以创建相应的实例。

#### 创建自定义元素

```js
//Defining a Custom Element
//浏览器会尝试将无法识别的元素作为通用元素整合进 DOM。当然，这些元素默认也不会做任何通用 HTML 元素不能做的事。来看下面的例子，其中胡乱编的 HTML 标签会变成一个 HTMLElement 实例：
document.body.innerHTML = ` 
<x-foo >I'm inside a nonsense element.</x-foo > 
`; 
console.log(document.querySelector('x-foo') instanceof HTMLElement); // true 
// 自定义元素在此基础上更进一步。They allow you to define complex behavior whenever an <x-foo> tag appears, and also to tap into the element’s lifecycle with respect to the DOM.利用自定义元素，可以在<x-foo>标签出现时为它定义复杂的行为，同样也可以在 DOM 中将其纳入元素生命周期管理。自定义元素要使用全局属性customElements，
// 这个属性会返回 CustomElementRegistry 对象。
console.log(customElements); // CustomElementRegistry {} 

// 调用 customElements.define()方法可以创建自定义元素。下面的代码创建了一个简单的自定义元素，这个元素继承 HTMLElement：
class FooElement extends HTMLElement {} 
customElements.define('x-foo', FooElement); 
document.body.innerHTML = ` 
<x-foo >I'm inside a nonsense element.</x-foo > 
`; 
console.log(document.querySelector('x-foo') instanceof FooElement); // true
// 注意 自定义元素名必须至少包含一个不在名称开头和末尾的连字符，而且元素标签不能自关闭。

// 自定义元素的威力源自类定义。例如，可以通过调用自定义元素的构造函数来控制这个类在 DOM中每个实例的行为：
class FooElement extends HTMLElement { 
 constructor() { 
 super(); 
 console.log('x-foo') 
 } 
} 
//定义了一个名为 FooElement 的自定义元素类，它继承自 HTMLElement。在构造函数中，打印了 'x-foo'。然后，通过 customElements.define 方法将自定义元素 x-foo 关联到了 FooElement 类。接下来，代码通过 document.body.innerHTML 将三个 x-foo 元素插入到了页面的 body 中。在插入时，浏览器会自动创建对应的 FooElement 实例，并执行构造函数中的代码。因此，每次插入 x-foo 元素时，都会打印 'x-foo'。最终输出了三次 'x-foo'。
customElements.define('x-foo', FooElement); 
document.body.innerHTML = ` 
<x-foo></x-foo> 
<x-foo></x-foo> 
<x-foo></x-foo> 
`; 
// x-foo 
// x-foo 
// x-foo   不是很懂??? define就是关联

// 注意:!!!在自定义元素的构造函数中必须始终先调用 super()!!!。如果元素继承了 HTMLElement或相似类型而不会覆盖构造函数，则没有必要调用 super()，因为原型构造函数默认会做这件事。很少有创建自定义元素而不继承 HTMLElement 的。如果自定义元素继承了一个元素类，那么可以使用 is 属性和 extends 选项将标签指定为该自定义元素的实例：
class FooElement extends HTMLDivElement { 
 constructor() { 
 super(); 
 console.log('x-foo') 
 } 
} 
customElements.define('x-foo', FooElement, { extends: 'div' }); 
document.body.innerHTML = ` 
<div is="x-foo"></div> 
<div is="x-foo"></div> 
<div is="x-foo"></div> 
`; 
// x-foo 
// x-foo 
// x-foo
```

#### 添加 Web 组件内容

```js
//Adding Web Component Content
//因为每次将自定义元素添加到 DOM 中都会调用其类构造函数，所以很容易自动给自定义元素添加子 DOM 内容。虽然不能在构造函数中添加子 DOM（会抛出 DOMException），但可以为自定义元素添加影子 DOM 并将内容添加到这个影子 DOM 中：
class FooElement extends HTMLElement { 
 constructor() { 
 super(); 

 // this 引用 Web 组件节点
 this.attachShadow({ mode: 'open' }); 
 this.shadowRoot.innerHTML = ` 
 <p>I'm inside a custom element!</p> 
 `; 
 } 
} 
customElements.define('x-foo', FooElement); 
document.body.innerHTML += `<x-foo></x-foo`; 
// 结果 DOM：
// <body> 
// <x-foo> 
// #shadow-root (open) 
// <p>I'm inside a custom element!</p> 
// <x-foo> 
// </body> 

// 为避免字符串模板和 innerHTML 不干净，可以使用 HTML 模板和 document.createElement()重构这个例子：
//（初始的 HTML）
// <template id="x-foo-tpl"> 
// <p>I'm inside a custom element template!</p> 
// </template> 
const template = document.querySelector('#x-foo-tpl'); 
class FooElement extends HTMLElement { 
 constructor() { 
 super(); 
 this.attachShadow({ mode: 'open' }); 
 this.shadowRoot.appendChild(template.content.cloneNode(true)); 
 } 
} 
customElements.define('x-foo', FooElement); 
document.body.innerHTML += `<x-foo></x-foo`; 
// 结果 DOM：
// <body> 
// <template id="x-foo-tpl"> 
// <p>I'm inside a custom element template!</p> 
// </template> 
// <x-foo> 
// #shadow-root (open) 
// <p>I'm inside a custom element template!</p> 
// <x-foo> 
// </body> 
// 这样可以在自定义元素中实现高度的 HTML 和代码重用，以及 DOM 封装。使用这种模式能够自由创建可重用的组件而不必担心外部 CSS 污染组件的样式。
```

#### 使用自定义元素生命周期方法

```js
//可以在自定义元素的不同生命周期执行代码。带有相应名称的自定义元素类的实例方法会在不同生命周期阶段被调用。自定义元素有以下 5 个生命周期方法。
//  constructor()：在创建元素实例或将已有 DOM 元素升级为自定义元素时调用。
//  connectedCallback()：在每次将这个自定义元素实例添加到 DOM 中时调用。
//  disconnectedCallback()：在每次将这个自定义元素实例从 DOM 中移除时调用。
//  attributeChangedCallback()：在每次可观察属性的值发生变化时调用。在元素实例初始化时，初始值的定义也算一次变化。
//  adoptedCallback()：在通过 document.adoptNode()将这个自定义元素实例移动到新文档对象时调用。
// 下面的例子演示了这些构建、连接和断开连接的回调：
class FooElement extends HTMLElement { 
 constructor() { 
 super(); 
 console.log('ctor'); 
 } 
 connectedCallback() { 
 console.log('connected'); 
 } 
 disconnectedCallback() { 
 console.log('disconnected'); 
 }
} //定义了一个名为 FooElement 的自定义元素类，它继承自 HTMLElement。这个类有三个方法:在元素实例创建时调用，当元素连接到文档时调用，当元素从文档中断开连接时调用
customElements.define('x-foo', FooElement); 
const fooElement = document.createElement('x-foo'); 
// ctor 创建了一个 x-foo 元素，并将其添加到 document.body 中。这导致构造函数被调用
document.body.appendChild(fooElement); 
// connected   
document.body.removeChild(fooElement); 
// disconnected   将 x-foo 元素从文档中移除，导致调用 disconnectedCallback() 方法
```

#### 反射自定义元素属性

```js
//Reflecting Custom Element Attributes
//自定义元素既是 DOM 实体又是 JavaScript 对象，因此两者之间应该同步变化。换句话说，对 DOM的修改应该反映到 JavaScript 对象，反之亦然。

// 要从 JavaScript 对象反射到 DOM，常见的方式是使用获取函数和设置函数。

// 下面的例子演示了在 JavaScript 对象和 DOM 之间反射 bar 属性的过程：
document.body.innerHTML = `<x-foo></x-foo>`; //定义了一个名为 FooElement 的自定义元素类，并将其与自定义元素名称 x-foo 关联。该自定义元素类继承自 HTMLElement，并添加了一个名为 bar 的属性。
class FooElement extends HTMLElement { 
 constructor() { 
 super(); 
 this.bar = true; 
 //使用 super() 调用了父类 HTMLElement 的构造函数，然后给 this.bar 赋值为 true。  super() 方法是在子类中调用父类构造函数的方法。在面向对象编程中，当你创建一个子类并且需要在子类的构造函数中调用父类的构造函数时，你可以使用 super() 方法来实现这一目的。
 } 
 get bar() { 
 return this.getAttribute('bar'); 
 } 
 set bar(value) { 
 this.setAttribute('bar', value) 
 } 
} 
customElements.define('x-foo', FooElement); //.define 方法将 FooElement 类与自定义元素名称 x-foo 关联  
console.log(document.body.innerHTML); //.body.innerHTML 设置为包含 <x-foo></x-foo> 的字符串，将自定义元素 x-foo 添加到了 document.body 中。
// <x-foo bar="true"></x-foo>   由于 FooElement 类的 constructor 中设置了 bar 的初始值为 true，因此生成的 x-foo 元素会包含 bar="true" 的属性。

// 另一个方向的反射（从 DOM 到 JavaScript 对象）需要给相应的属性添加监听器。为此，可以使用observedAttributes()获取函数让自定义元素的属性值每次改变时都调用 attributeChangedCallback()：

class FooElement extends HTMLElement { 
 static get observedAttributes() { 
 // 返回应该触发 attributeChangedCallback()执行的属性
 return ['bar']; 
 } 
 get bar() { 
 return this.getAttribute('bar'); 
 //
 } 
 set bar(value) { 
 this.setAttribute('bar', value) 
 } 
 attributeChangedCallback(name, oldValue, newValue) { 
 if (oldValue !== newValue) { 
 console.log(`${oldValue} -> ${newValue}`); 
 this[name] = newValue; 
 //attributeChangedCallback() 方法，用于在元素的属性值发生变化时进行处理。在这个方法中，通过比较新旧值，如果发生变化，则打印出旧值和新值，并将新值设置给对应的属性。
 } 
 } 
} 
customElements.define('x-foo', FooElement); 
document.body.innerHTML = `<x-foo bar="false"></x-foo>`; 
// null -> false   changedcallback就是说对改变的反馈
document.querySelector('x-foo').setAttribute('bar', true); 
// false -> true 
```

#### 升级自定义元素

```js
//Upgrading Custom Elements
//并非始终可以先定义自定义元素，然后再在 DOM 中使用相应的元素标签。为解决这个先后次序问题，Web 组件在 CustomElementRegistry 上额外暴露了一些方法。这些方法可以用来检测自定义元素是否定义完成，然后可以用它来升级已有元素。

//如果自定义元素已经有定义，那么 CustomElementRegistry.get()方法会返回相应自定义元素的类。类似地，CustomElementRegistry.whenDefined()方法会返回一个期约，当相应自定义元素有定义之后解决：when a custom element is eventually defined and upgrade existing elements:

//使用 customElements.whenDefined() 方法来异步等待自定义元素的定义完成
customElements.whenDefined('x-foo').then(() => console.log('defined!'));
console.log(customElements.get('x-foo')); 
// undefined    .whenDefined('x-foo').then() 方法注册了一个回调函数，在自定义元素 x-foo 定义完成后被调用，打印出 'defined!'。
customElements.define('x-foo', class {}); 
// defined!   .define('x-foo', class {}) 方法定义了名为 x-foo 的自定义元素。   当自定义元素定义完成后，回调函数被触发，打印出 'defined!'。
console.log(customElements.get('x-foo')); 
// class FooElement {}      打印自定义元素 'x-foo' 的注册情况时，使用 customElements.get('x-foo') 方法获取到了已定义的自定义元素类 class FooElement {}。

// 连接到 DOM 的元素在自定义元素有定义时会自动升级。如果想在元素连接到 DOM 之前强制升级，可以使用 CustomElementRegistry.upgrade()方法：

// 在自定义元素有定义之前会创建 HTMLUnknownElement 对象
const fooElement = document.createElement('x-foo'); //自定义元素 x-foo 的实例 fooElement，但在创建时还未定义 x-foo 的类。

// 创建自定义元素,定义了 x-foo 的类 FooElement，并通过 customElements.define('x-foo', FooElement) 将其注册为自定义元素
class FooElement extends HTMLElement {} 
customElements.define('x-foo', FooElement); 
console.log(fooElement instanceof FooElement); // false由于 fooElement 在创建时未与已定义的自定义元素类相关联，

// 强制升级,使用 customElements.upgrade(fooElement) 方法，强制将 fooElement 与已定义的 FooElement 类相关联。
customElements.upgrade(fooElement); 
console.log(fooElement instanceof FooElement); // true  ，fooElement instanceof FooElement 返回 true，表明 fooElement 现在是 FooElement 类的实例。
// 注意:还有一个 HTML Imports Web 组件，但这个规范目前还是草案，没有主要浏览器支持。浏览器最终是否会支持这个规范目前还是未知数。

//就是说继承呢并不一定是实例,得升级???
```

## Web Cryptography API

Web Cryptography API 描述了一套密码学工具，规范了 JavaScript 如何以安全和符合惯例的方式实现加密。这些工具包括生成、使用和应用加密密钥对，加密和解密消息，以及可靠地生成随机数。注意 加密接口的组织方式有点奇怪，其外部是一个Crypto对象，内部是一个SubtleCrypto对象。在 Web Cryptography API 标准化之前，window.crypto 属性在不同浏览器中的实现差异非常大。为实现跨浏览器兼容，标准 API 都暴露在 SubtleCrypto 对象上。

### 生成随机数

```js
//在需要生成随机值时，很多人会使用 Math.random()。这个方法在浏览器中是以伪随机数生成器（PRNG，PseudoRandom Number Generator）方式实现的。所谓“伪”指的是生成值的过程不是真的随机。PRNG 生成的值只是模拟了随机的特性。浏览器的 PRNG 并未使用真正的随机源，只是对一个内部状态应用了固定的算法。每次调用 Math.random()，这个内部状态都会被一个算法修改，而结果会被转换为一个新的随机值。例如，V8 引擎使用了一个名为 xorshift128+的算法来执行这种修改。由于算法本身是固定的，其输入只是之前的状态，因此随机数顺序也是确定的。xorshift128+使用128 位内部状态，而算法的设计让任何初始状态在重复自身之前都会产生 2128–1 个伪随机值。这种循环被称为置换循环（permutation cycle），而这个循环的长度被称为一个周期（period）。很明显，如果攻击者知道 PRNG 的内部状态，就可以预测后续生成的伪随机值。如果开发者无意中使用 PRNG 生成了私有密钥用于加密，则攻击者就可以利用 PRNG 的这个特性算出私有密钥。伪随机数生成器主要用于快速计算出看起来随机的值。不过并不适合用于加密计算。为解决这个问题，密码学安全伪随机数生成器（CSPRNG，Cryptographically Secure PseudoRandom Number Generator）额外增加了一个熵作为输入，例如测试硬件时间或其他无法预计行为的系统特性。这样一来，计算速度明显比常规 PRNG 慢很多，但 CSPRNG 生成的值就很难预测，可以用于加密了。Web Cryptography API 引入了 CSPRNG，这个 CSPRNG 可以通过 crypto.getRandomValues()在全局 Crypto 对象上访问。与 Math.random()返回一个介于 0和 1之间的浮点数不同，getRandomValues()会把随机值写入作为参数传给它的定型数组。定型数组的类不重要，因为底层缓冲区会被随机的二进制位填充。下面的例子展示了生成 5 个 8 位随机值：
const array = new Uint8Array(1); 
for (let i=0; i<5; ++i) { 
 console.log(crypto.getRandomValues(array)); 
} 
// Uint8Array [41] 
// Uint8Array [250] 
// Uint8Array [51] 
// Uint8Array [129] 
// Uint8Array [35] 

// getRandomValues()最多可以生成 216（65 536）字节，超出则会抛出错误：
const fooArray = new Uint8Array(2 ** 16); 
console.log(window.crypto.getRandomValues(fooArray)); // Uint32Array(16384) [...]      对于 fooArray，它的长度为 2 的 16 次方（65536），这是 getRandomValues() 方法可以处理的最大长度。因此，它成功地生成了随机值，并将其填充到数组中。结果是一个包含 65536 个随机值的 Uint32Array。
const barArray = new Uint8Array((2 ** 16) + 1); 
console.log(window.crypto.getRandomValues(barArray)); // Error 

// 要使用 CSPRNG 重新实现 Math.random()，可以通过生成一个随机的 32 位数值，然后用它去除最大的可能值 0xFFFFFFFF。这样就会得到一个介于 0 和 1 之间的值：
function randomFloat() { 
 // 生成 32 位随机值
 const fooArray = new Uint32Array(1); //创建了一个长度为 1 的 Uint32Array 数组 fooArray 用于存储随机值.   用最大可能的值来除,调用 crypto.getRandomValues(fooArray) 方法来生成一个 32 位的随机值，并将其存储在 fooArray 中。

 // 定义了一个常量 maxUint32，其值为 0xFFFFFFFF，即 32 位无符号整数的最大值是 2^32 –1
 const maxUint32 = 0xFFFFFFFF; 

 return crypto.getRandomValues(fooArray)[0] / maxUint32; 
 //将生成的随机值除以 maxUint32 来得到一个介于 0 到 1 之间的随机浮点数，并将其返回。  包含0但不包含1
} 

console.log(randomFloat()); // 0.5033651619458955 
```

### 使用 SubtleCrypto 对象

Using the SubtleCrypto Object
Web Cryptography API 重头特性都暴露在了 SubtleCrypto 对象上，可以通过 window.crypto. subtle 访问：The overwhelming majority of the Web Cryptography API resides inside the SubtleCrypto object, accessible via window.crypto.subtle:
console.log(crypto.subtle); // SubtleCrypto {}
这个对象包含一组方法，用于执行常见的密码学功能，如加密、散列、签名和生成密钥。因为所有密码学操作都在原始二进制数据上执行，所以 SubtleCrypto 的每个方法都要用到 ArrayBuffer 和ArrayBufferView 类型。由于字符串是密码学操作的重要应用场景，因此 TextEncoder 和TextDecoder 是经常与 SubtleCrypto 一起使用的类，用于实现二进制数据与字符串之间的相互转换。
注意 SubtleCrypto 对象只能在安全上下文（https）中使用。在不安全的上下文中，subtle 属性是 undefined。

#### 生成密码学摘要

```js
//计算数据的密码学摘要是非常常用的密码学操作。这个规范支持 4 种摘要算法：SHA-1 和 3 种SHA-2。
//  SHA-1（Secure Hash Algorithm 1）：架构类似 MD5 的散列函数。接收任意大小的输入，生成160 位消息散列。由于容易受到碰撞攻击，这个算法已经不再安全。
//  SHA-2（Secure Hash Algorithm 2）：构建于相同耐碰撞单向压缩函数之上的一套散列函数。规范支持其中 3 种：SHA-256、SHA-384 和 SHA-512。生成的消息摘要可以是 256 位（SHA-256）、384 位（SHA-384）或 512 位（SHA-512）。

// !!!这个算法被认为是安全的，广泛应用于很多领域和协议，包括 TLS、PGP 和加密货币（如比特币）。!!!

// SubtleCrypto.digest()方法用于生成消息摘要。要使用的散列算法通过字符串"SHA-1"、"SHA-256"、"SHA-384"或"SHA-512"指定。下面的代码展示了一个使用 SHA-256 为字符串"foo"生成消息摘要的例子：使用了 Web Crypto API，计算了给定消息（'foo'）的 SHA-256 哈希值:

(async function() { 
 const textEncoder = new TextEncoder(); //创建了一个 TextEncoder 实例，用于将字符串编码为字节数组。
 const message = textEncoder.encode('foo'); //使用 TextEncoder 编码字符串 'foo'，将其转换为字节数组。
 const messageDigest = await crypto.subtle.digest('SHA-256', message); //使用 Web Crypto API 中的 crypto.subtle.digest() 方法计算消息的 SHA-256 哈希值。这个方法接受两个参数：要使用的哈希算法（这里是 'SHA-256'）和要处理的消息。
 console.log(new Uint32Array(messageDigest)); 
//将生成的消息摘要作为参数创建了一个 Uint32Array，并打印出来。SHA-256 算法生成的哈希值是一个字节数组，这里使用 Uint32Array 将其表示为一系列 32 位整数。
})(); 
// Uint32Array(8) [1806968364, 2412183400, 1011194873, 876687389, 
// 1882014227, 2696905572, 2287897337, 2934400610] 得到了消息 'foo' 的 SHA-256 哈希值的字节数组表示形式。

// 通常，在使用时，二进制的消息摘要会转换为十六进制字符串格式。通过将二进制数据按 8 位进行分割，然后再调用 toString(16)就可以把任何数组缓冲区转换为十六进制字符串：
(async function() { 
 const textEncoder = new TextEncoder(); 
 const message = textEncoder.encode('foo'); 
 const messageDigest = await crypto.subtle.digest('SHA-256', message); 

 const hexDigest = Array.from(new Uint8Array(messageDigest)) 
 .map((x) => x.toString(16).padStart(2, '0')) 
 .join('');  //将哈希值字节数组转换为十六进制字符串。这里的 Array.from() 方法将 Uint8Array 转换为普通数组，然后使用 map() 方法将每个字节转换为两位十六进制，并用 padStart() 方法确保每个字节都是两位。最后，使用 join() 方法将所有字节连接成一个字符串。
 console.log(hexDigest); //打印十六进制表示的哈希值。
})(); 
// 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae 得到了消息 'foo' 的 SHA-256 哈希值的十六进制字符串表示形式。

// !!!软件公司通常会公开自己软件二进制安装包的摘要，以便用户验证自己下载到的确实是该公司发布的版本（而不是被恶意软件篡改过的版本）。!!!

// 下面的例子演示了下载 Firefox v67.0，通过 SHA-512 计算其散列，再下载其 SHA-512 二进制验证摘要，最后检查两个十六进制字符串匹配：用于从 Mozilla 的 CDN 下载 Firefox 二进制文件，并验证其 SHA-512 摘要是否与发布的摘要匹配:
(async function() { 
 const mozillaCdnUrl = '// downloadorigin.cdn.mozilla.net/pub/firefox/releases/67.0 /'; //定义了 Mozilla 的 CDN 地址，这里是下载 Firefox 67.0 版本的二进制文件。
 const firefoxBinaryFilename = 'linux-x86_64/en-US/firefox-67.0.tar.bz2'; //定义了要下载的 Firefox 二进制文件的文件名。
 const firefoxShaFilename = 'SHA512SUMS'; //定义了包含发布的 Firefox 二进制文件摘要的文件的文件名。
 console.log('Fetching Firefox binary...'); //打印消息，表示正在获取 Firefox 二进制文件。

 const fileArrayBuffer = await (await fetch(mozillaCdnUrl + firefoxBinaryFilename)) 
 .arrayBuffer(); //使用 fetch() 方法从 Mozilla CDN 获取 Firefox 二进制文件，并将其作为 Array Buffer 返回。
 console.log('Calculating Firefox digest...'); //打印消息，表示正在计算 Firefox 二进制文件的摘要。

 const firefoxBinaryDigest = await crypto.subtle.digest('SHA-512', fileArrayBuffer);//使用 Web Crypto API 的 crypto.subtle.digest() 方法计算 Firefox 二进制文件的 SHA-512 摘要。
 const firefoxHexDigest = Array.from(new Uint8Array(firefoxBinaryDigest)) 
 .map((x) => x.toString(16).padStart(2, '0')) 
 .join(''); //将二进制摘要转换为十六进制字符串形式。
 console.log('Fetching published binary digests...'); //打印消息，表示正在获取发布的二进制文件摘要。

 // SHA 文件包含此次发布的所有 Firefox 二进制文件的摘要，
 // 因此要根据其格式进制拆分
 const shaPairs = (await (await fetch(mozillaCdnUrl + firefoxShaFilename)).text()) 
 .split(/\n/).map((x) => x.split(/\s+/)); //使用 fetch() 方法从 Mozilla CDN 获取包含发布的摘要的文件，并将其分割成行，然后分割每一行以获取文件名和 SHA 值的数组。
 let verified = false; //定义一个变量 verified，用于记录验证结果。
console.log('Checking calculated digest against published digests...'); //打印消息，表示正在检查计算出的摘要是否与发布的摘要匹配。
 for (const [sha, filename] of shaPairs) { 
 if (filename === firefoxBinaryFilename) { 
 if (sha === firefoxHexDigest) { 
 verified = true; 
 break; 
 //检查文件名是否匹配。
 //检查 SHA 摘要是否与计算出的摘要匹配。
 // 如果匹配，则将 verified 设置为 true。
 //遍历包含发布的摘要的数组，检查每个摘要是否与计算出的摘要匹配。
 } 
 } 
 } 
 console.log('Verified:', verified); //打印验证结果。
})(); 
// Fetching Firefox binary... 
// Calculating Firefox digest... 
// Fetching published binary digests... 
// Checking calculated digest against published digests... 
// Verified: true 

//就是说如果躲过了上面的验证代码,就可以通过验证???所以说躲过验证的机会大吗???
```

#### CryptoKey 与算法

什么意思???怎么样才能都看懂???
!!!如果没了密钥，那密码学也就没什么意义了!!!。SubtleCrypto 对象使用 CryptoKey 类的实例来生成密钥。CryptoKey 类支持多种加密算法，允许控制密钥抽取和使用。
CryptoKey 类支持以下算法，按各自的父密码系统归类。
 RSA（Rivest-Shamir-Adleman）：公钥密码系统，使用两个大素数获得一对公钥和私钥，可用于签名/验证或加密/解密消息。RSA 的陷门函数被称为分解难题（factoring problem）。
 RSASSA-PKCS1-v1_5：RSA 的一个应用，用于使用私钥给消息签名，允许使用公钥验证签名。
 SSA（Signature Schemes with Appendix），表示算法支持签名生成和验证操作。
 PKCS1（Public-Key Cryptography Standards #1），表示算法展示出的 RSA 密钥必需的数学特性。
 RSASSA-PKCS1-v1_5 是确定性的，意味着同样的消息和密钥每次都会生成相同的签名。
 RSA-PSS：RSA 的另一个应用，用于签名和验证消息。
 PSS（Probabilistic Signature Scheme），表示生成签名时会加盐以得到随机签名。
 与 RSASSA-PKCS1-v1_5 不同，同样的消息和密钥每次都会生成不同的签名。
 与 RSASSA-PKCS1-v1_5 不同，RSA-PSS 有可能约简到 RSA 分解难题的难度。
 通常，虽然 RSASSA-PKCS1-v1_5 仍被认为是安全的，但 RSA-PSS 应该用于代替RSASSA-PKCS1-v1_5。
 RSA-OAEP：RSA 的一个应用，用于使用公钥加密消息，用私钥来解密。
 OAEP（Optimal Asymmetric Encryption Padding），表示算法利用了 Feistel 网络在加密前处理未
加密的消息。
 OAEP 主要将确定性 RSA 加密模式转换为概率性加密模式。
 ECC（Elliptic-Curve Cryptography）：公钥密码系统，使用一个素数和一个椭圆曲线获得一对公钥和私钥，可用于签名/验证消息。ECC 的陷门函数被称为椭圆曲线离散对数问题（elliptic curvediscrete logarithm problem）。ECC 被认为优于 RSA。虽然 RSA 和 ECC 在密码学意义上都很强，但 ECC 密钥比 RSA 密钥短，而且 ECC 密码学操作比 RSA 操作快。
 ECDSA（Elliptic Curve Digital Signature Algorithm）：ECC 的一个应用，用于签名和验证消息。这个算法是数字签名算法（DSA，Digital Signature Algorithm）的一个椭圆曲线风格的变体。
 ECDH（Elliptic Curve Diffie-Hellman）：ECC 的密钥生成和密钥协商应用，允许两方通过公开通信渠道建立共享的机密。这个算法是 Diffie-Hellman 密钥交换（DH，Diffie-Hellman key exchange）协议的一个椭圆曲线风格的变体。
 AES（Advanced Encryption Standard）：对称密钥密码系统，使用派生自置换组合网络的分组密码加密和解密数据。AES 在不同模式下使用，不同模式算法的特性也不同。
 AES-CTR：AES 的计数器模式（counter mode）。这个模式使用递增计数器生成其密钥流，其行为类似密文流。使用时必须为其提供一个随机数，用作初始化向量。AES-CTR 加密/解密可以并行。
 AES-CBC：AES 的密码分组链模式（cipher block chaining mode）。在加密纯文本的每个分组之前，先使用之前密文分组求 XOR，也就是名字中的“链”。使用一个初始化向量作为第一个分组的 XOR 输入。
 AES-GCM：AES 的伽罗瓦/计数器模式（Galois/Counter mode）。这个模式使用计数器和初始化向量生成一个值，这个值会与每个分组的纯文本计算 XOR。与 CBC 不同，这个模式的 XOR 输入不依赖之前分组密文。因此 GCM 模式可以并行。由于其卓越的性能，AES-GCM 在很多网络安全协议中得到了应用。
 AES-KW：AES 的密钥包装模式（key wrapping mode）。这个算法将加密密钥包装为一个可移植且加密的格式，可以在不信任的渠道中传输。传输之后，接收方可以解包密钥。与其他 AES 模式不同，AES-KW 不需要初始化向量。
 HMAC（Hash-Based Message Authentication Code）：用于生成消息认证码的算法，用于验证通过不可信网络接收的消息没有被修改过。两方使用散列函数和共享私钥来签名和验证消息。
 KDF（Key Derivation Functions）：可以使用散列函数从主密钥获得一个或多个密钥的算法。KDF能够生成不同长度的密钥，也能把密钥转换为不同格式。
 HKDF（HMAC-Based Key Derivation Function）：密钥推导函数，与高熵输入（如已有密钥）一起使用。
 PBKDF2（Password-Based Key Derivation Function 2）：密钥推导函数，与低熵输入（如密钥字符串）一起使用。
注意 CryptoKey 支持很多算法，但其中只有部分算法能够用于 SubtleCrypto 的方法。要了解哪个方法支持什么算法，可以参考 W3C 网站上 Web Cryptography API 规范的“Algorithm Overview”。

#### 生成 CryptoKey

Generating CryptoKeys
使用 SubtleCrypto.generateKey()方法可以生成随机 CryptoKey，这个方法返回一个期约，解决为一个或多个 CryptoKey 实例。使用时需要给这个方法传入一个指定目标算法的参数对象、一个表示密钥是否可以从 CryptoKey 对象中提取出来的布尔值，以及一个表示这个密钥可以与哪个SubtleCrypto 方法一起使用的字符串数组（keyUsages）。
由于不同的密码系统需要不同的输入来生成密钥，上述参数对象为每种密码系统都规定了必需的输入：
 RSA 密码系统使用 RsaHashedKeyGenParams 对象；
 ECC 密码系统使用 EcKeyGenParams 对象；
 HMAC 密码系统使用 HmacKeyGenParams 对象；
 AES 密码系统使用 AesKeyGenParams 对象。

keyUsages 对象用于说明密钥可以与哪个算法一起使用。至少要包含下列中的一个字符串：
 encrypt
 decrypt
 sign
 verify
 deriveKey
 deriveBits
 wrapKey
 unwrapKey

假设要生成一个满足如下条件的对称密钥：
 支持 AES-CTR 算法；
 密钥长度 128 位；
 不能从 CryptoKey 对象中提取；
 可以跟 encrypt()和 decrypt()方法一起使用。
那么可以参考如下代码：使用 Web Crypto API 生成了一个对称密钥，并指定了密钥的算法参数和用途：

```js
(async function() { 
 const params = { 
 name: 'AES-CTR', 
 length: 128 
 }; //定义了生成密钥时所使用的算法和长度。在这里，使用了 AES-CTR 算法，并指定了密钥长度为 128 位
 const keyUsages = ['encrypt', 'decrypt']; //定义了密钥的用途，这里是加密和解密。
 const key = await crypto.subtle.generateKey(params, false, keyUsages); //使用 Web Crypto API 的 generateKey() 方法生成密钥。这个方法接受三个参数：算法参数、是否可导出以及密钥的用途。在这里，我们传入了算法参数、false 表示生成的密钥不可导出，以及密钥的用途。生成的密钥会被返回并存储在变量 key 中。
 console.log(key); 
 // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)}   打印生成的密钥对象。这个对象包含了密钥的类型、是否可提取、算法信息以及密钥的用途。
})(); 

假设要生成一个满足如下条件的非对称密钥：
 支持 ECDSA 算法；
 使用 P-256 椭圆曲线；
 可以从 CryptoKey 中提取；
 可以跟 sign()和 verify()方法一起使用。
那么可以参考如下代码：生成了一个 ECDSA 密钥对，并指定了它们的算法和用途:

(async function() { 
 const params = { 
 name: 'ECDSA', 
 namedCurve: 'P-256' 
 }; //定义了生成密钥对时所使用的算法和曲线。在这里，使用了 ECDSA 算法，并指定了曲线为 P-256。
 const keyUsages = ['sign', 'verify']; //定义了密钥的用途，这里是签名和验证
 const {publicKey, privateKey} = await crypto.subtle.generateKey(params, true, 
 keyUsages); //使用 Web Crypto API 的 generateKey() 方法生成密钥对。这个方法接受三个参数：算法参数、是否可导出以及密钥的用途。在这里，我们传入了算法参数、true 表示生成的密钥可导出，以及密钥的用途。生成的公钥和私钥会被返回并存储在变量 publicKey 和 privateKey 中。
 console.log(publicKey); 
 // CryptoKey {type: "public", extractable: true, algorithm: {...}, usages: Array(1)} 打印生成的公钥对象。这个对象包含了密钥的类型、是否可提取、算法信息以及密钥的用途。
 console.log(privateKey); 
 // CryptoKey {type: "private", extractable: true, algorithm: {...}, usages: Array(1)} 打印生成的私钥对象。同样包含了密钥的类型、是否可提取、算法信息以及密钥的用途。
})(); 
```

#### 导出和导入密钥

```js
//Exporting and Importing Keys
//如果密钥是可提取的，那么就可以在 CryptoKey 对象内部暴露密钥原始的二进制内容。使用exportKey()方法并指定目标格式（"raw"、"pkcs8"、"spki"或"jwk"）就可以取得密钥。这个方法返回一个期约，解决后的 ArrayBuffer 中包含密钥：

(async function() { 
 const params = { 
 name: 'AES-CTR', 
 length: 128 
 }; //定义了生成密钥时所使用的算法和密钥长度。在这里，使用了 AES 算法，密钥长度为 128 位。
 const keyUsages = ['encrypt', 'decrypt']; //定义了密钥的用途，这里是加密和解密。
 const key = await crypto.subtle.generateKey(params, true, keyUsages); //使用 Web Crypto API 的 generateKey() 方法生成密钥。这个方法接受三个参数：算法参数、是否可导出以及密钥的用途。在这里，我们传入了算法参数、true 表示生成的密钥可导出，以及密钥的用途。生成的密钥会被存储在变量 key 中。

 const rawKey = await crypto.subtle.exportKey('raw', key); //使用 Web Crypto API 的 exportKey() 方法将密钥导出为原始格式。这个方法接受两个参数：导出的格式和要导出的密钥。在这里，我们将密钥导出为原始格式。
 console.log(new Uint8Array(rawKey)); 
 // Uint8Array[93, 122, 66, 135, 144, 182, 119, 196, 234, 73, 84, 7, 139, 43, 238, 
 // 110] 将导出的原始密钥以 Uint8Array 格式打印出来。原始密钥是一串字节，表示为 Uint8Array。
})(); 

// 与 exportKey()相反的操作要使用 importKey()方法实现。importKey()方法的签名实际上是generateKey()和 exportKey()的组合。下面的方法会生成密钥、导出密钥，然后再导入密钥：

(async function() { 
 const params = { 
 name: 'AES-CTR', 
 length: 128 
 }; 
 const keyUsages = ['encrypt', 'decrypt']; 
 const keyFormat = 'raw'; 
 const isExtractable = true; 
 const key = await crypto.subtle.generateKey(params, isExtractable, keyUsages); 
 const rawKey = await crypto.subtle.exportKey(keyFormat, key); 

 const importedKey = await crypto.subtle.importKey(keyFormat, rawKey, params.name, 
 isExtractable, keyUsages); 
 //使用 Web Crypto API 的 importKey() 方法将原始密钥导入。这个方法接受五个参数：导入的格式、原始密钥、算法名称、是否可导出和密钥用途。在这里，我们将原始密钥导入，并存储在变量 importedKey 中。
 console.log(importedKey); 
 // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)} 
})(); 

```

#### 从主密钥派生密钥

Deriving Keys from Master Keys
使用 SubtleCrypto 对象可以通过可配置的属性从已有密钥获得新密钥。SubtleCrypto 支持一个 deriveKey()方法和一个 deriveBits()方法，前者返回一个解决为 CryptoKey 的期约，后者返回一个解决为 ArrayBuffer 的期约。
注意 deriveKey()与 deriveBits()的区别很微妙，因为调用 deriveKey()实际上与调用 deriveBits()之后再把结果传给 importKey()相同。
deriveBits()方法接收一个算法参数对象、主密钥和输出的位长作为参数。当两个人分别拥有自己的密钥对，但希望获得共享的加密密钥时可以使用这个方法。下面的例子使用 ECDH 算法基于两个密钥对生成了对等密钥，并确保它们派生相同的密钥位：使用 Web Crypto API 实现了椭圆曲线 Diffie-Hellman 密钥交换。让我们逐句解释：

```js
(async function() { 
 const ellipticCurve = 'P-256'; 
 const algoIdentifier = 'ECDH'; 
 const derivedKeySize = 128; 
 const params = { 
 name: algoIdentifier, 
 namedCurve: ellipticCurve 
 }; //定义了椭圆曲线的类型，这里选择了 P-256 曲线。
 // 定义了算法标识符，这里是 ECDH（椭圆曲线 Diffie-Hellman）。
 //定义了派生密钥的位数，这里是 128 位。

 const params = { name: algoIdentifier, namedCurve: ellipticCurve };: //定义了算法参数对象，包括算法名称和椭圆曲线类型。
 const keyUsages = ['deriveBits'];//定义了密钥用途，这里只包括了 deriveBits，表示该密钥用于派生比特。 
 const keyPairA = await crypto.subtle.generateKey(params, true, keyUsages); //使用 Web Crypto API 的 generateKey() 方法生成密钥对 A。这个密钥对包括公钥和私钥，用于密钥交换。
 const keyPairB = await crypto.subtle.generateKey(params, true, keyUsages); //使用相同的算法参数生成密钥对 B。

 //使用 Web Crypto API 的 deriveBits() 方法从 A 的公钥和 B 的私钥派生密钥位。这个方法接受三个参数：派生参数对象、私钥和派生密钥的位数。
 //crypto.subtle.deriveBits: Web Crypto API 中用于从两个密钥派生出位的方法。
 //Object.assign: 用于将一个或多个源对象的属性复制到目标对象。在这里，它将一些参数对象与其它参数合并为一个对象。{ public: keyPairA.publicKey }: 这是作为第一个参数传递给 Object.assign() 的对象字面量。它将 A 的公钥作为 public 属性传递给派生函数。,: 分隔不同的参数或键值对。params: 这是作为第二个参数传递给 Object.assign() 的参数对象
 //Object.assign({ public: keyPairA.publicKey }, params): 这一部分创建了一个对象，包含用于派生密钥的参数。在这个对象中，public 属性设置为 A 的公钥，其余参数由 params 对象提供。params：是一个包含了算法名称和椭圆曲线名称的对象。keyPairB.privateKey：表示要使用的私钥，这里是 B 的私钥。derivedKeySize：表示要派生的密钥位的大小。
 const derivedBitsAB = await crypto.subtle.deriveBits(
 Object.assign({ public: keyPairA.publicKey }, params), 
 keyPairB.privateKey, 
 derivedKeySize); 

 // 使用相同的方法从 B 的公钥和 A 的私钥派生密钥位
 const derivedBitsBA = await crypto.subtle.deriveBits(
 Object.assign({ public: keyPairB.publicKey }, params), 
 keyPairA.privateKey, 
 derivedKeySize); 

 const arrayAB = new Uint32Array(derivedBitsAB);//创建 Uint32Array 类型的数组，存储从 A 到 B 派生的密钥位。 
 const arrayBA = new Uint32Array(derivedBitsBA); //创建 Uint32Array 类型的数组，存储从 B 到 A 派生的密钥位。

 // 确保密钥数组相等,检查派生的密钥位数组是否相等。
 console.log( 
 arrayAB.length === arrayBA.length && 
 arrayAB.every((val, i) => val === arrayBA[i])); // true 
})(); 

// deriveKey()方法是类似的，只不过返回的是 CryptoKey 的实例而不是 ArrayBuffer。下面的例子基于一个原始字符串，应用 PBKDF2 算法将其导入一个原始主密钥，然后派生了一个 AES-GCM 格式的新密钥：
(async function() { 
 const password = 'foobar'; 
 const salt = crypto.getRandomValues(new Uint8Array(16)); 
 const algoIdentifier = 'PBKDF2'; 
 const keyFormat = 'raw'; 
 const isExtractable = false; 
//声明一个包含密码的常量。
//const salt = crypto.getRandomValues(new Uint8Array(16));: 声明一个常量 salt，其中包含了一个长度为 16 字节的随机值数组，用作密码哈希时的盐。
//const algoIdentifier = 'PBKDF2';: 声明一个算法标识符常量，指定了密码基于密码的密钥派生函数 (PBKDF2)。
//const keyFormat = 'raw';: 声明一个密钥格式常量，指定密钥的导入和导出格式为原始字节格式。
//const isExtractable = false;: 声明一个布尔值常量，指示生成的密钥是否可以导出。

 const params = { 
 name: algoIdentifier 
 }; // 声明一个参数对象常量，用于指定密钥派生函数的名称。

 const masterKey = await window.crypto.subtle.importKey( 
 keyFormat, 
 (new TextEncoder()).encode(password), 
 params, 
 isExtractable, 
 ['deriveKey'] 
 ); 
 //使用密码导入一个主密钥。这里使用了 Web Crypto API 中的 importKey() 方法，该方法将密码转换为一个密钥，并且指定了可以使用该密钥的操作。const deriveParams = { name: 'AES-GCM', length: 128 };: 声明一个参数对象常量，用于指定派生密钥的算法名称和长度。
 const deriveParams = { 
 name: 'AES-GCM', 
 length: 128 
 }; 

 const derivedKey = await window.crypto.subtle.deriveKey( 
 Object.assign({salt, iterations: 1E5, hash: 'SHA-256'}, params), 
 masterKey, 
 deriveParams, 
 isExtractable, 
 ['encrypt']
 ); //使用主密钥和其他参数来派生一个密钥。这里使用了 Web Crypto API 中的 deriveKey() 方法，该方法从主密钥派生出一个新的密钥，并且指定了可以使用该密钥的操作。
 console.log(derivedKey); 
 // CryptoKey {type: "secret", extractable: false, algorithm: {...}, usages: Array(1)} 
})(); 
```

#### 使用非对称密钥签名和验证消息

```js
//Signing and Verifying Messages with Asymmetric Keys
//通过 SubtleCrypto 对象可以使用公钥算法用私钥生成签名，或者用公钥验证签名。这两种操作分别通过 SubtleCrypto.sign()和 SubtleCrypto.verify()方法完成。
// 签名消息需要传入参数对象以指定算法和必要的值、CryptoKey 和要签名的 ArrayBuffer 或ArrayBufferView。下面的例子会生成一个椭圆曲线密钥对，并使用私钥签名消息：
(async function() { 
 const keyParams = { 
 name: 'ECDSA', 
 namedCurve: 'P-256' 
 }; 
 const keyUsages = ['sign', 'verify']; 
 const {publicKey, privateKey} = await crypto.subtle.generateKey(keyParams, true, 
 keyUsages); 

 const message = (new TextEncoder()).encode('I am Satoshi Nakamoto'); 
 const signParams = { 
 name: 'ECDSA', 
 hash: 'SHA-256' 
 }; 
 const signature = await crypto.subtle.sign(signParams, privateKey, message); 
 console.log(new Uint32Array(signature)); 
 // Uint32Array(16) [2202267297, 698413658, 1501924384, 691450316, 778757775, ... ] 
})(); 
// 希望通过这个签名验证消息的人可以使用公钥和 SubtleCrypto.verify()方法。这个方法的签名几乎与 sign()相同，只是必须提供公钥以及签名。下面的例子通过验证生成的签名扩展了前面的例子：
(async function() { 
 const keyParams = { 
 name: 'ECDSA', 
 namedCurve: 'P-256' 
 }; 
 const keyUsages = ['sign', 'verify']; 
 const {publicKey, privateKey} = await crypto.subtle.generateKey(keyParams, true, 
 keyUsages); 
 const message = (new TextEncoder()).encode('I am Satoshi Nakamoto'); 
 const signParams = { 
 name: 'ECDSA', 
 hash: 'SHA-256' 
 }; 
 const signature = await crypto.subtle.sign(signParams, privateKey, message); 

 const verified = await crypto.subtle.verify(signParams, publicKey, signature,  message); 
 //使用 crypto.subtle.generateKey() 方法生成了一对 ECDSA 密钥对，包括公钥和私钥。密钥参数 (keyParams) 包括算法名称为 'ECDSA'，指定了曲线 'P-256'。
//创建了一条消息，用于签名和验证。
//使用 crypto.subtle.sign() 方法对消息进行签名，使用私钥对消息进行 ECDSA 签名，签名算法参数 (signParams) 包括算法名称为 'ECDSA'，哈希算法为 'SHA-256'。
//使用 crypto.subtle.verify() 方法验证签名，使用公钥对签名和消息进行验证。接受四个参数：signParams：指定了签名算法的参数，包括算法名称为 'ECDSA'，哈希算法为 'SHA-256'。publicKey：用于验证签名的公钥。signature：要验证的签名数据。message：用于签名的原始消息数据。
//最后，打印验证结果，应该输出 true 表示签名验证成功。
 console.log(verified); // true 
})(); 
```

#### 使用对称密钥加密和解密

```js
//Encrypting and Decrypting with Symmetric Keys
//SubtleCrypto 对象支持使用公钥和对称算法加密和解密消息。这两种操作分别通过 SubtleCrypto. encrypt()和 SubtleCrypto.decrypt()方法完成。
//加密消息需要传入参数对象以指定算法和必要的值、加密密钥和要加密的数据。下面的例子会生成对称 AES-CBC 密钥，用它加密消息，最后解密消息：
(async function() { 
 const algoIdentifier = 'AES-CBC'; //定义了算法标识符，表示使用 AES-CBC 对称加密算法。
 const keyParams = { 
 name: algoIdentifier, 
 length: 256 
 //设置了用于生成密钥的参数对象，包括算法名称和密钥长度。
 }; 
 const keyUsages = ['encrypt', 'decrypt']; //指定了密钥的用途，即可以用于加密和解密。
 const key = await crypto.subtle.generateKey(keyParams, true,  keyUsages); //使用给定的参数异步生成一个密钥对。生成密钥对操作是在 crypto.subtle.generateKey() 方法中完成的，await 关键字等待生成密钥的 Promise 解析。生成的密钥对存储在 key 变量中。
 const originalPlaintext = (new TextEncoder()).encode('I am Satoshi Nakamoto'); // 将原始文本编码为 UTF-8 字节序列，以备后续加密。
 const encryptDecryptParams = { 
 name: algoIdentifier, 
 iv: crypto.getRandomValues(new Uint8Array(16)) 
 //设置了加密和解密的参数对象，包括算法名称和随机初始化向量（IV）。
 }; 

 const ciphertext = await crypto.subtle.encrypt(encryptDecryptParams, key,  originalPlaintext); 
 console.log(ciphertext); 
 // ArrayBuffer(32) {}    接受三个参数：encryptDecryptParams: 包含加密算法的参数对象，这里设置了算法名称和随机初始化向量（IV）。key: 包含加密密钥的 CryptoKey 对象，是由 crypto.subtle.generateKey() 方法生成的。originalPlaintext: 要加密的原始文本，作为 ArrayBuffer 或 ArrayBufferView 提供。

 const decryptedPlaintext = await crypto.subtle.decrypt(encryptDecryptParams, key,  ciphertext); //使用生成的密钥和给定的参数对象对密文进行解密。解密操作是在 crypto.subtle.decrypt() 方法中完成的，await 关键字等待解密的 Promise 解析。解密后的原始文本存储在 decryptedPlaintext 变量中。
 console.log((new TextDecoder()).decode(decryptedPlaintext)); 
 // I am Satoshi Nakamoto 
})(); 
```

#### 包装和解包密钥

```js
//Wrapping and Unwrapping a Key
//SubtleCrypto 对象支持包装和解包密钥，以便在非信任渠道传输。这两种操作分别通过 SubtleCrypto.wrapKey()和 SubtleCrypto.unwrapKey()方法完成。包装密钥需要传入一个格式字符串、要包装的 CryptoKey 实例、要执行包装的 CryptoKey，以及一个参数对象用于指定算法和必要的值。下面的例子生成了一个对称 AES-GCM 密钥，用 AES-KW 来包装这个密钥，最后又将包装的密钥解包：
(async function() { 
 const keyFormat = 'raw'; 
 const extractable = true; 
 const wrappingKeyAlgoIdentifier = 'AES-KW'; 
 const wrappingKeyUsages = ['wrapKey', 'unwrapKey']; 
 const wrappingKeyParams = { 
 name: wrappingKeyAlgoIdentifier, 
 length: 256 
 }; 
 const keyAlgoIdentifier = 'AES-GCM'; 
 const keyUsages = ['encrypt']; 
 const keyParams = { 
 name: keyAlgoIdentifier, 
 length: 256 
 }; 
 
 const wrappingKey = await crypto.subtle.generateKey(wrappingKeyParams, extractable,  wrappingKeyUsages); 
 //生成一个用于包装的密钥。这里使用的算法是 AES-KW（AES Key Wrap），密钥长度为 256 位，设置为可提取，且具有包装和解包密钥的用途。
 console.log(wrappingKey); 
 // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)} 

 const key = await crypto.subtle.generateKey(keyParams, extractable, keyUsages); 
 console.log(key); 
 //生成一个需要被包装的密钥。这里使用的算法是 AES-GCM（用于加密），密钥长度为 256 位，设置为可提取，且具有加密的用途。
 // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)} 
 
 const wrappedKey = await crypto.subtle.wrapKey(keyFormat, key, wrappingKey,  wrappingKeyAlgoIdentifier);
  //使用包装密钥对要包装的密钥进行包装。它接受四个参数：keyFormat: 包含密钥的格式，这里设置为 'raw'。key: 要包装的密钥。wrappingKey: 用于包装的密钥。wrappingKeyAlgoIdentifier: 包装密钥的算法标识符。
 console.log(wrappedKey);  // ArrayBuffer(40) {} 

 const unwrappedKey = await crypto.subtle.unwrapKey(keyFormat, wrappedKey,  wrappingKey, wrappingKeyParams, keyParams, extractable, keyUsages); 
 //使用包装密钥对被包装的密钥进行解包。它接受七个参数：keyFormat: 包含密钥的格式，与 wrapKey() 方法中的格式相同。wrappedKey: 被包装的密钥。wrappingKey: 用于解包的密钥。wrappingKeyParams: 用于包装的密钥的参数。keyParams: 要解包的密钥的参数。extractable: 是否可提取。keyUsages: 解包后的密钥的用途。
 console.log(unwrappedKey);  // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)} 
})() 
```

## 小结

除了定义新标签，HTML5 还定义了一些 JavaScript API。这些 API 可以为开发者提供更便捷的 Web接口，暴露堪比桌面应用的能力。本章主要介绍了以下 API。
 Atomics API 用于保护代码在多线程内存访问模式下不发生资源争用。

 postMessage() API 支持从不同源跨文档发送消息，同时保证安全和遵循同源策略。

 Encoding API 用于实现字符串与缓冲区之间的无缝转换（越来越常见的操作）。

 File API 提供了发送、接收和读取大型二进制对象的可靠工具。

 媒体元素``<audio>``和``<video>``拥有自己的 API，用于操作音频和视频。并不是每个浏览器都会支持所有媒体格式，使用 canPlayType()方法可以检测浏览器支持情况。

 拖放 API 支持方便地将元素标识为可拖动，并在操作系统完成放置时给出回应。可以利用它创建自定义可拖动元素和放置目标。

 Notifications API 提供了一种浏览器中立的方式，以此向用户展示消通知弹层。

 Streams API 支持以全新的方式读取、写入和处理数据。

 Timing API 提供了一组度量数据进出浏览器时间的可靠工具。

 Web Components API 为元素重用和封装技术向前迈进提供了有力支撑。

 Web Cryptography API 让生成随机数、加密和签名消息成为一类特性。

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

```js
//
```

```js
//
```

```js
//
```
