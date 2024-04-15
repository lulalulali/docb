# 期约与异步函数

Promises and Async Functions
介绍两个紧密相关的异步编程构造：Promise 类型和 async/await。这一章讨论 JavaScript
的异步编程范式，进而介绍期约（promise）与异步函数的关系。

 异步编程 Introduction to Asynchronous Programming
 期约 Promises
 异步函数 Async Functions

ECMA 6 新增了正式的 Promise（期约）引用类型，支持优雅地定义和组织异步逻辑。接下
来几个版本增加了!!!使用 async 和 await 关键字定义异步函数的机制!!!。
注意:本章示例将大量使用异步日志输出的方式 setTimeout(console.log, 0, ...
params)，(定时执行函数),旨在演示执行顺序及其他异步行为。异步输出的内容看起来虽然像是同步输出的，但实际上是异步打印的。这样可以让期约等返回的值达到其最终状态。
此外，浏览器控制台的输出经常能打印出 JavaScript 运行中无法获取的对象信息（比如期
约的状态）。这个特性在示例中广泛使用，以便辅助读者理解相关概念。

## 异步编程

同步行为和异步行为的对立统一是计算机科学的一个基本概念。特别是在 JavaScript 这种单线程事件循环模型中，同步操作与异步操作更是代码所要依赖的核心机制。异步行为是为了优化因计算量大而时间长的操作。如果在等待其他操作完成的同时，即使运行其他指令，系统也能保持稳定，那么这样做就是务实的。
重要的是，异步操作并不一定计算量大或要等很长时间。只要你不想为等待某个异步操作而阻塞线程执行，那么!!!任何时候都可以使用!!!。

## 同步与异步

Synchronous vs. Asynchronous JavaScript.

```js
//同步行为对应内存中顺序执行的处理器指令。每条指令都会严格按照它们出现的顺序来执行，而每条指令执行后也能立即获得存储在系统本地（如寄存器或系统内存）的信息。这样的执行流程容易分析程序在执行到代码任意位置时的状态（比如变量的值）。同步操作的例子可以是执行一次简单的数学计算：
let x = 3; 
x = x + 4; 
//在程序执行的每一步，都可以推断出程序的状态。这是因为后面的指令总是在前面的指令完成后才会执行。等到最后一条指定执行完毕，存储在 x 的值就立即可以使用。这两行 JavaScript 代码对应的低级指令（从 JavaScript 到 x86）并不难想象。首先，操作系统会在栈内存上分配一个存储浮点数值的空间，然后针对这个值做一次数学计算，再把计算结果写回之前分配的内存中。所有这些指令都是在单个线程中按顺序执行的。在低级指令的层面，有充足的工具可以确定系统状态。

//相对地，异步行为类似于系统中断，即当前进程外部的实体可以触发代码执行。异步操作经常是必要的，因为强制进程等待一个长时间的操作通常是不可行的（!!!同步操作则必须要等!!!）。如果代码要访问一些高延迟的资源，比如向远程服务器发送请求并等待响应，那么就会出现长时间的等待。异步操作的例子可以是在定时回调中执行一次简单的数学计算：
let x = 3; 
setTimeout(() => x = x + 4, 1000); 
//这段程序最终与同步代码执行的任务一样，都是把两个数加在一起，但这一次执行线程不知道 x 值何时会改变，因为这取决于回调何时从消息队列出列并执行。异步代码不容易推断。虽然这个例子对应的低级代码最终跟前面的例子没什么区别，但第二个指令块（加操作及赋值操作）是由系统计时器触发的，这会生成一个入队执行的中断。到底什么时候会触发这个中断，这对 JavaScript 运行时来说是一个黑盒，因此实际上无法预知（尽管可以保证这发生在当前线程的同步代码执行之后，否则回调都没有机会出列被执行）。无论如何，在排定回调以后基本没办法知道系统状态何时变化。为了让后续代码能够使用 x，异步执行的函数需要在更新 x 的值以后通知其他代码。如果程序不需要这个值，那么就只管继续执行，不必等待这个结果了。!!!设计一个能够知道 x 什么时候可以读取的系统是非常难的!!!。JavaScript 在实现这样一个系统的过程中也经历了几次迭代.
```

### 以往的异步编程模式

Legacy Asynchronous Programming Patterns.

```js
//异步行为是 JavaScript 的基础，但以前的实现不理想。在早期的 JavaScript 中，!!!只支持定义回调函数来表明异步操作完成!!!。串联多个异步操作是一个常见的问题，通常需要深度嵌套的回调函数（俗称“回调地狱”）来解决。假设有以下异步函数，使用了 setTimeout 在一秒钟之后执行某些操作：
function double(value) {
 setTimeout(() => setTimeout(console.log, 0, value * 2), 1000); 
}
double(3);
// 6（大约 1000 毫秒之后）
//这里的代码没什么神秘的，但关键是理解为什么说它是一个异步函数。setTimeout 可以定义一个在指定时间之后会被调度执行的回调函数。对这个例子而言，1000 毫秒之后，JavaScript 运行时会把回调函数推到自己的消息队列上去等待执行。推到队列之后，回调什么时候出列被执行对 JavaScript 代码就完全不可见了。还有一点，double()函数在 setTimeout 成功调度异步操作之后会立即退出。

//1. 异步返回值.  假设 setTimeout 操作会返回一个有用的值。有什么好办法把这个值传给需要它的地方？广泛接受的一个策略是给异步操作提供一个回调，这个回调中包含要使用异步返回值的代码（作为回调的参数）。
function double(value, callback) { 
 setTimeout(() => callback(value * 2), 1000); 
} 
double(3, (x) => console.log(`I was given: ${x}`)); 
// I was given: 6（大约 1000 毫秒之后）
//这里的 setTimeout 调用告诉 JavaScript 运行时在 1000 毫秒之后把一个函数推到消息队列上。这个函数会由运行时负责异步调度执行。而位于函数闭包中的回调及其参数在异步执行时仍然是可用的。
//2. 失败处理.异步操作的失败处理在回调模型中也要考虑，因此自然就出现了成功回调和失败回调：
function double(value, success, failure) { 
 setTimeout(() => { 
 try { 
 if (typeof value !== 'number') { 
 throw 'Must provide number as first argument'; // 检查 value 参数是否为数字类型。如果不是数字类型，则抛出错误 'Must provide number as first argument'。
 } 
 success(2 * value); //如果 value 是数字类型，则调用 success 回调函数，并将 value 的两倍传递给它。
 } catch (e) { 
 failure(e); //如果在 try 块中发生错误，则 catch 块会捕获错误 e 并调用 failure 回调函数，将错误传递给它。
 } 
 }, 1000); // 使用 setTimeout 在延迟 1 秒（1000 毫秒）后执行传入的箭头函数。这使得 double 函数的操作是异步的。
} 
const successCallback = (x) => console.log(`Success: ${x}`); //定义了一个名为 successCallback 的箭头函数，用于处理成功情况。它接收一个参数 x 并打印出 Success: ${x}。
const failureCallback = (e) => console.log(`Failure: ${e}`); // 定义了一个名为 failureCallback 的箭头函数，用于处理失败情况。它接收一个参数 e 并打印出 Failure: ${e}。
double(3, successCallback, failureCallback); //调用 double 函数，传递 3 作为 value，以及 successCallback 和 failureCallback 作为回调函数。由于 value 是一个数字，最终会调用 successCallback，输出 Success: 6。 
double('b', successCallback, failureCallback); //调用 double 函数，传递 'b' 作为 value，以及 successCallback 和 failureCallback 作为回调函数。由于 value 不是数字，最终会调用 failureCallback，输出 Failure: Must provide number as first argument。
// Success: 6（大约 1000 毫秒之后）
// Failure: Must provide number as first argument（大约 1000 毫秒之后）
//这种模式已经不可取了，因为必须在初始化异步操作时定义回调。异步函数的返回值只在短时间内存在，只有预备好将这个短时间内存在的值作为参数的回调才能接收到它。
//3. 嵌套异步回调.如果异步返值又依赖另一个异步返回值，那么回调的情况还会进一步变复杂。在实际的代码中，这就要求嵌套回调：
function double(value, success, failure) { 
 setTimeout(() => { 
 try { 
 if (typeof value !== 'number') { 
 throw 'Must provide number as first argument'; 
 } 
 success(2 * value); 
 } catch (e) { 
 failure(e); 
 } 
 }, 1000);
} 
const successCallback = (x) => { 
 double(x, (y) => console.log(`Success: ${y}`)); 
}; //加粗.  定义了一个名为 successCallback 的箭头函数，它接收一个参数 x，然后在内部再次调用 double 函数。这是一个递归的调用，因为它在成功时调用 double 函数，并传入一个新的成功回调函数 (y) => console.log(Success: ${y})。
const failureCallback = (e) => console.log(`Failure: ${e}`); //定义了一个名为 failureCallback 的箭头函数，用于处理失败情况。它接收一个参数 e 并打印出 Failure: ${e}。
double(3, successCallback, failureCallback); 
//调用 double 函数，传递 3 作为 value，以及 successCallback 和 failureCallback 作为回调函数。由于 value 是一个数字，最终会调用 successCallback。当 successCallback 被调用时，它会再次调用 double 函数，并传递上一个 value 的两倍值 (3 * 2 = 6) 作为新参数 x，以及一个新的成功回调函数 y，输出 Success: 12
// 输出是Success: 12 不是单纯的12（大约 1000 毫秒之后）  加粗
//显然，随着代码越来越复杂，回调策略是不具有扩展性的。“回调地狱”这个称呼可谓名至实归。!!!嵌套回调的代码维护起来就是噩梦。!!!
```

## 期约

PROMISES.期约是对尚不存在结果的一个替身。A “promise” is a surrogate entity that acts as a stand-in for a result that does not yet exist. 同一时期的计算机科学家还使用了“终局”（eventual）、“期许”（future）、“延迟”（delay）和“迟付”（deferred）等术语指代同样的概念。所有这些概念描述的都是一种异步程序执行的机制。

期约（Promise）在现代 JavaScript 应用中有很多实际应用场景，特别是在处理异步操作时。下面是几个期约的实际应用场景例子：1. **网络请求**：期约经常用于发送 HTTP 请求并处理响应。你可以使用 `fetch` 或其他 AJAX 库发出网络请求，然后在请求完成时通过期约来处理返回的数据。这使得代码更易于管理，且异步操作也更加清晰。2. **文件读取**：在 Node.js 中，期约常用于读取和写入文件。在处理文件 I/O 时，期约可以让代码更好地处理异步操作，避免阻塞主线程。3. **并行处理**：期约可以用于并行处理多个异步任务，比如多个网络请求、数据库查询等。通过 `Promise.all()`方法，程序可以同时执行多个异步操作，并在所有操作完成后统一处理结果。4. **用户界面交互**：期约在处理用户界面的异步操作时非常有用，比如在用户点击按钮后发起请求，然后更新界面。这使得界面更加响应式，用户体验更好。5. **资源加载**：期约可以用于并行加载多个资源，如图片、脚本、样式等。在所有资源加载完成后再执行后续操作，这样可以提高应用的性能。6. **错误处理**：期约提供了 `.catch()`方法，可以用来处理异步操作中的错误。这样可以更好地管理错误和异常，避免应用崩溃。这些只是期约在 JavaScript 应用中的一些实际应用场景。期约使得异步操作更易于管理和控制，为开发人员提供了更灵活和清晰的编程方式。

### Promises\A+规范

The Promises/A+ Specification.早期的期约机制在 jQuery 和 Dojo 中是以 Deferred API 的形式出现的。到了 2010 年，CommonJS 项目实现的 Promises/A 规范日益流行起来。Q 和 Bluebird 等第三方 JavaScript 期约库也越来越得到社区认可，虽然这些库的实现多少都有些不同。为弥合现有实现之间的差异，2012 年 Promises/A+组织分叉（fork）了 CommonJS 的 Promises/A 建议，并以相同的名字制定了 Promises/A+规范。这个规范最终成为了ECMAScript 6 规范实现的范本。ECMAScript 6 增加了对 Promises/A+规范的完善支持，即 Promise 类型。一经推出，Promise 就大受欢迎，成为了主导性的异步编程机制。所有现代浏览器都支持 ES6 期约，很多其他浏览器 API（如fetch()和 Battery Status API）也以期约为基础.

### 期约基础

Promise Basics.

```js
//ECMAScript 6 新增的引用类型 Promise，可以通过 new 操作符来实例化。创建新期约时需要传入执行器（executor）函数作为参数（后面马上会介绍），下面的例子使用了一个空函数对象来应付一下解释器：
let p = new Promise(() => {}); 
setTimeout(console.log, 0, p); // Promise <pending> 
// 这行代码创建了一个新的 Promise 对象 p。这个 Promise 对象没有实际的处理逻辑，因为在 Promise 构造函数中传递的函数（即所谓的执行器函数）是一个空函数（不做任何操作）。因此，Promise 对象 p 的状态将保持为“待定”状态。setTimeout(console.log, 0, p);: 这行代码设置了一个定时器，使用 setTimeout 在 0 毫秒后执行 console.log 函数，并将 Promise 对象 p 作为第三个参数传递给 console.log。由于 setTimeout 会在下一次事件循环（即宏任务）中执行传入的函数 console.log，所以它会稍后执行。在执行时，它会将 Promise 对象 p 传递给 console.log 并打印出来。因此，在代码执行过程中，Promise 对象 p 会立即被创建，但由于执行器函数为空，Promise 对象的状态保持“待定”状态。然后，在事件循环的下一次迭代中，console.log 会将 Promise 对象打印到控制台。这段代码并没有特别复杂的逻辑或异步操作，除了在宏任务队列中使用 setTimeout
//什么意思,不懂???
//之所以说是应付解释器，是因为如果不提供执行器函数，就会抛出 SyntaxError。
```

#### 期约状态机

The Promise State Machine.
在把一个期约实例传给 console.log()时，控制台输出（可能因浏览器不同而略有差异）表明该实例处于待定（pending）状态。如前所述，期约是一个有状态的对象，可能处于如下 3 种状态之一：
 待定（pending）
 兑现（fulfilled，有时候也称为“解决”，resolved）
 拒绝（rejected）
待定（pending）是期约的最初始状态。在待定状态下，期约可以落定（settled）为代表成功的兑现（fulfilled）状态，或者代表失败的拒绝（rejected）状态。无论落定为哪种状态都是不可逆的。只要从待定转换为兑现或拒绝，期约的状态就不再改变。而且，也不能保证期约必然会脱离待定状态。因此，组织合理的代码无论期约解决（resolve）还是拒绝（reject），甚至永远处于待定（pending）状态，都应该具有恰当的行为。
重要的是，期约的状态是私有的，不能直接通过 JavaScript 检测到。这主要是为了避免根据读取到的期约状态，以同步方式处理期约对象。另外，期约的状态也不能被外部 JavaScript 代码修改。这与不能读取该状态的原因是一样的：!!!期约故意将异步行为封装起来，从而隔离外部的同步代码。!!!

#### 解决值、拒绝理由及期约用例

Resolved Values, Rejection Reasons, and Utility of Promises。
期约主要有两大用途。首先是抽象地表示一个异步操作。期约的状态代表期约是否完成。“待定”表示尚未开始或者正在执行中。“兑现”表示已经成功完成，而“拒绝”则表示没有成功完成。
某些情况下，这个状态机就是期约可以提供的最有用的信息。知道一段异步代码已经完成，对于其他代码而言已经足够了。比如，假设期约要向服务器发送一个 HTTP 请求。请求返回 200~299 范围内的状态码就足以让期约的状态变为“兑现”。类似地，如果请求返回的状态码不在 200~299 这个范围内，那么就会把期约状态切换为“拒绝”。
在另外一些情况下，期约封装的异步操作会实际生成某个值，而程序期待期约状态改变时可以访问这个值。相应地，如果期约被拒绝，程序就会期待期约状态改变时可以拿到拒绝的理由。比如，假设期约向服务器发送一个 HTTP 请求并预定会返回一个 JSON。如果请求返回范围在 200~299 的状态码，则足以让期约的状态变为兑现。此时期约内部就可以收到一个 JSON 字符串。类似地，如果请求返回的状态码不在 200~299 这个范围内，那么就会把期约状态切换为拒绝。此时拒绝的理由可能是一个 Error对象，包含着 HTTP 状态码及相关错误消息。为了支持这两种用例，每个期约只要状态切换为兑现，就会有一个私有的内部值（value）。类似地，每个期约只要状态切换为拒绝，就会有一个私有的内部理由（reason）。无论是值还是理由，都是包含原始值或对象的不可修改的引用。二者都是可选的，而且默认值为 undefined。在期约到达某个落定状态时执行的异步代码始终会收到这个值或理由.

#### 通过执行函数控制期约状态

Controlling Promise State with the Executor.

```js
//由于期约的状态是私有的，所以只能在内部进行操作。内部操作在期约的执行器函数中完成。执行器函数主要有两项职责：初始化期约的异步行为和控制状态的最终转换。其中，控制期约状态的转换是通过调用它的两个函数参数实现的。这两个函数参数通常都命名为 resolve()和 reject()。调用resolve()会把状态切换为兑现，调用 reject()会把状态切换为拒绝。另外，调用 reject()也会抛出错误（后面会讨论这个错误）。
let p1 = new Promise((resolve, reject) => resolve()); //这行代码创建了一个新的 Promise 对象 p1。Promise 的执行器函数（传递给 Promise 构造函数的函数）调用了 resolve()，因此 Promise 对象 p1 的状态立即变为“已解决”状态。
setTimeout(console.log, 0, p1); // Promise <resolved>   这行代码设置了一个定时器，使用 setTimeout 在 0 毫秒后执行 console.log 函数，并将 Promise 对象 p1 作为第三个参数传递给 console.log。由于 p1 已经是“已解决”状态，所以 console.log 将在事件循环的下一次迭代中打印出 p1。
let p2 = new Promise((resolve, reject) => reject()); //这行代码创建了一个新的 Promise 对象 p2。Promise 的执行器函数调用了 reject()，因此 Promise 对象 p2 的状态立即变为“已拒绝”状态。
setTimeout(console.log, 0, p2); // Promise <rejected>  这行代码设置了一个定时器，使用 setTimeout 在 0 毫秒后执行 console.log 函数，并将 Promise 对象 p2 作为第三个参数传递给 console.log。由于 p2 已经是“已拒绝”状态，所以 console.log 将在事件循环的下一次迭代中打印出 p2。
// Uncaught error (in promise) 
//在前面的例子中，并没有什么异步操作，因为在初始化期约时，执行器函数已经改变了每个期约的状态。这里的关键在于，执行器函数是同步执行的。这是因为执行器函数是期约的初始化程序。在这段代码执行过程中，Promise 对象 p1 在创建时立即解决（<resolved>），Promise 对象 p2 在创建时立即拒绝（<rejected>）。接着，在事件循环的下一次迭代中，console.log 会分别打印出 p1 和 p2 的状态。

//通过下面的例子可以看出上面代码的执行顺序：
new Promise(() => setTimeout(console.log, 0, 'executor')); 
setTimeout(console.log, 0, 'promise initialized'); 
// executor 在 Promise 构造函数中传递了一个执行器函数。执行器函数中的代码会立即执行。因此，执行器函数会立即调用 setTimeout，设置一个定时器，定时器的回调函数是 console.log，并在 0 毫秒后打印 'executor'。由于setTimeout 的回调是在当前执行栈完成后执行的，所以 'executor' 的输出会被推迟到下一次事件循环。
// promise initialized 

//添加 setTimeout 可以推迟切换状态：
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000)); 
// 在 console.log 打印期约实例的时候，还不会执行超时回调（即 resolve()）
setTimeout(console.log, 0, p); // Promise <pending> 创建一个 Promise 实例 p。Promise 的执行器函数中传递了 resolve 和 reject 函数。Promise 的执行器函数立即执行，并设置了一个 setTimeout，在 1000 毫秒后调用 resolve 函数。在调用 resolve 函数之前，Promise 实例 p保持为 "pending"（未决）状态。

//无论 resolve()和 reject()中的哪个被调用，状态转换都不可撤销了。于是继续修改状态会静默失败，如下所示：
let p = new Promise((resolve, reject) => { 
 resolve();
 reject(); // 没有效果.  创建了一个新的 Promise 实例 p。Promise 的执行器函数立即调用 resolve()，然后尝试调用 reject()。在 Promise 中，一旦 resolve() 或 reject() 被调用，Promise 的状态就会从 "pending" 转变为 "resolved" 或 "rejected"。因此，在 resolve() 之后调用 reject() 是无效的，因为 Promise 已经从 "pending" 转变为 "resolved" 状态。由于在 reject() 之前 resolve() 被调用，Promise 实例 p 在代码执行之后立即变成了 "resolved"（已解决）状态。
}); 
setTimeout(console.log, 0, p); // Promise <resolved> 

//为避免期约卡在待定状态，可以添加一个定时退出功能。比如，可以通过 setTimeout 设置一个10 秒钟后无论如何都会拒绝期约的回调：
let p = new Promise((resolve, reject) => { 
 setTimeout(reject, 10000); // 10 秒后调用 reject() 
 // 执行函数的逻辑
}); 
setTimeout(console.log, 0, p); // Promise <pending> 
setTimeout(console.log, 11000, p); // 11 秒后再检查状态
// (After 10 seconds) Uncaught error 
// (After 11 seconds) Promise <rejected> 
//因为期约的状态只能改变一次，所以这里的超时拒绝逻辑中可以放心地设置让期约处于待定状态的最长时间。如果执行器中的代码在超时之前已经解决或拒绝，那么超时回调再尝试拒绝也会静默失败。

//没懂 什么意思???  确定完的状态不可更改???
```

#### Promise.resolve

```js
//期约并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。通过调用Promise.resolve()静态方法，可以实例化一个解决的期约。下面两个期约实例实际上是一样的：
let p1 = new Promise((resolve, reject) => resolve()); 
let p2 = Promise.resolve(); 
//这个解决的期约的值对应着传给 Promise.resolve()的第一个参数。使用这个静态方法，实际上可以把任何值都转换为一个期约：  就是说只看第一个参数,后面的不管
setTimeout(console.log, 0, Promise.resolve()); 
// Promise <resolved>: undefined 
setTimeout(console.log, 0, Promise.resolve(3)); 
// Promise <resolved>: 3 
// 多余的参数会忽略
setTimeout(console.log, 0, Promise.resolve(4, 5, 6)); 
// Promise <resolved>: 4 

//以下完全看不懂
//对这个静态方法而言，如果传入的参数本身是一个期约，那它的行为就类似于一个空包装。因此，Promise.resolve()可以说是一个幂等方法，如下所示：
let p = Promise.resolve(7); //使用 Promise.resolve(7) 创建了一个已解决的 Promise，返回一个以值 7 解决的 Promise。p 是一个 Promise 对象，已解决，其解决的值是 7。
setTimeout(console.log, 0, p === Promise.resolve(p)); //Promise.resolve(p) 返回传入的 p 本身，因为传入的参数 p 已经是一个 Promise 对象。因此 p === Promise.resolve(p) 为 true。这展示了 Promise.resolve() 的幂等性：如果传入的值已经是一个 Promise 对象，那么该方法会直接返回传入的 Promise。
// true 
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))); 
// true 

//这个幂等性会保留传入期约的状态：
let p = new Promise(() => {}); 
setTimeout(console.log, 0, p); // Promise <pending> 
setTimeout(console.log, 0, Promise.resolve(p)); // Promise <pending> 
setTimeout(console.log, 0, p === Promise.resolve(p)); // true
//注意，这个静态方法能够包装任何非期约值，包括错误对象，并将其转换为解决的期约。因此，也可能导致不符合预期的行为：
let p = Promise.resolve(new Error('foo')); 
setTimeout(console.log, 0, p); 
// Promise <resolved>: Error: foo 
```

#### Promise.reject

Promise Rejection with Promise.reject()

```js
//与 Promise.resolve()类似，Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）。下面的两个期约实例实际上是一样的：
let p1 = new Promise((resolve, reject) => reject()); 
let p2 = Promise.reject(); 
//这个拒绝的期约的理由就是传给 Promise.reject()的第一个参数。这个参数也会传给后续的拒绝处理程序：
let p = Promise.reject(3); 
setTimeout(console.log, 0, p); // Promise <rejected>: 3 
p.then(null, (e) => setTimeout(console.log, 0, e)); // 3  p 是一个 Promise 对象。p.then 是一个用于处理 Promise 完成或拒绝状态的方法。p.then 接受两个回调函数作为参数：第一个是处理 Promise 完成状态的（成功回调），第二个是处理 Promise 拒绝状态的（失败回调）。这里传递 null 作为第一个参数，表示不需要在 Promise 完成状态下执行任何操作，只关心 Promise 拒绝状态。     这是一个箭头函数，用于处理 Promise 拒绝状态。它接受一个参数 e，这是 Promise 拒绝时传递的错误值（错误原因）。箭头函数中调用 setTimeout，延迟 0 毫秒后执行 console.log 并传递 e 作为参数。这样做是为了确保错误信息的打印在 JavaScript 事件循环的下一个阶段执行，允许其他事件或操作在当前任务中执行。
//关键在于，Promise.reject()并没有照搬 Promise.resolve()的幂等逻辑。如果给它传一个期约对象，则这个期约会成为它返回的拒绝期约的理由：
setTimeout(console.log, 0, Promise.reject(Promise.resolve())); 
// Promise <rejected>: Promise <resolved> 
```

#### 同步\异步执行的二元性

Synchronous/Asynchronous Execution Duality. 不懂??? 就是说认出来的异步没抓到?

```js
//Promise 的设计很大程度上会导致一种完全不同于 JavaScript 的计算模式。下面的例子完美地展示了这一点，其中包含了两种模式下抛出错误的情形：
try { 
 throw new Error('foo'); 
} catch(e) { 
 console.log(e); // Error: foo 
} 

try { 
 Promise.reject(new Error('bar')); 
} catch(e) { 
 console.log(e); 
} 
// Uncaught (in promise) Error: bar 
//第一个 try/catch 抛出并捕获了错误，第二个 try/catch 抛出错误却没有捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，!!!是因为它没有通过异步模式捕获错误!!!。从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。在前面的例子中，拒绝期约的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。因此，try/catch 块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构——更具体地说，就是期约的方法.
```

### 期约的实例方法

Promise Instance Methods.期约实例的方法是连接外部同步代码与内部异步代码之间的桥梁。这些方法可以访问异步操作返回的数据，处理期约成功和失败的结果，连续对期约求值，或者添加只有期约进入终止状态时才会执行的代码.

#### 实现Thenable接口

```js
//在 ECMAScript 暴露的异步结构中，任何对象都有一个 then()方法。这个方法被认为实现了Thenable 接口。下面的例子展示了实现这一接口的最简单的类：
class MyThenable { 
 then() {} 
} 
//ECMAScript 的 Promise 类型实现了 Thenable 接口。这个简化的接口跟 TypeScript 或其他包中的接口或类型定义不同，它们都设定了 Thenable 接口更具体的形式
```

#### promise.prototype.then()

```js
//Promise.prototype.then()是为期约实例添加处理程序的主要方法。这个 then()方法接收最多两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行。
function onResolved(id) { 
 setTimeout(console.log, 0, id, 'resolved'); 
} 
function onRejected(id) { 
 setTimeout(console.log, 0, id, 'rejected'); 
} 
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000)); 
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000)); 
p1.then(() => onResolved('p1'), 
 () => onRejected('p1')); //加粗 为 p1 定义了 then 方法。在 p1 成功完成时，调用 onResolved('p1')；在 p1 被拒绝时，调用 onRejected('p1')。
p2.then(() => onResolved('p2'), 
 () => onRejected('p2')); //加粗  为 p2 定义了 then 方法。在 p2 成功完成时，调用 onResolved('p2')；在 p2 被拒绝时，调用 onRejected('p2')。
//（3 秒后）
// p1 resolved 
// p2 rejected 
//因为期约只能转换为最终状态一次，所以这两个操作一定是互斥的。如前所述，两个处理程序参数都是可选的。而且，传给 then()的任何非函数类型的参数都会被静默忽略。

//如果想只提供 onRejected 参数，那就要在 onResolved 参数的位置上传入 undefined。这样有助于避免在内存中创建多余的对象，对期待函数参数的类型系统也是一个交代。
function onResolved(id) { 
 setTimeout(console.log, 0, id, 'resolved'); 
} 
function onRejected(id) { 
 setTimeout(console.log, 0, id, 'rejected'); 
} 
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000)); 
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000)); 

// 非函数处理程序会被静默忽略，不推荐
p1.then('gobbeltygook'); 
// 不传 onResolved 处理程序的规范写法
p2.then(null, () => onRejected('p2')); 

// p2 rejected（3 秒后）
//Promise.prototype.then()方法返回一个新的期约实例：
let p1 = new Promise(() => {}); //这是一个新的Promise实例，状态是pending（待定），因为没有提供resolve或reject操作
let p2 = p1.then(); // 这里通过调用then方法从p1创建一个新的Promise实例p2。由于没有传递处理程序，所以p2的状态和p1一样，都是pending。
setTimeout(console.log, 0, p1); // Promise <pending>   在延迟0毫秒后打印p1，显示Promise <pending>。
setTimeout(console.log, 0, p2); // Promise <pending> 
setTimeout(console.log, 0, p1 === p2); // false 在延迟0毫秒后打印p1和p2是否相等，这里将输出false，因为then方法返回的是一个新的Promise实例。为什么???
//这个新期约实例基于 onResovled 处理程序的返回值构建。换句话说，该处理程序的返回值会通过Promise.resolve()包装来生成新期约。如果没有提供这个处理程序，则 Promise.resolve()就会包装上一个期约解决之后的值。

//如果没有显式的返回语句，则 Promise.resolve()会包装默认的返回值 undefined。
let p1 = Promise.resolve('foo'); 
// 若调用 then()时不传处理程序，则原样向后传
let p2 = p1.then(); 
setTimeout(console.log, 0, p2); // Promise <resolved>: foo 
// 这些都一样
let p3 = p1.then(() => undefined); 
let p4 = p1.then(() => {}); 
let p5 = p1.then(() => Promise.resolve()); 
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined 
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined 
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined 
//如果有显式的返回值，则 Promise.resolve()会包装这个值：
... 
// 这些都一样
let p6 = p1.then(() => 'bar'); //在p1的then()方法中传递了一个返回'bar'的函数，这会创建一个新的Promise实例p6，在延迟0毫秒后打印p6，输出Promise <resolved>: bar。
let p7 = p1.then(() => Promise.resolve('bar')); //传递的函数返回一个解析状态的Promise实例，并包装了'bar'值。这与前面相同，输出Promise <resolved>: bar
setTimeout(console.log, 0, p6); // Promise <resolved>: bar 
setTimeout(console.log, 0, p7); // Promise <resolved>: bar 
// Promise.resolve()保留返回的期约
let p8 = p1.then(() => new Promise(() => {})); //传递的函数返回一个新的未解析的Promise实例，因此创建的p8将保持为pending状态。在延迟0毫秒后打印p8，输出Promise <pending>。
let p9 = p1.then(() => Promise.reject()); 
// Uncaught (in promise): undefined  传递的函数返回一个被拒绝的Promise实例，因此创建的p9会变为被拒绝状态，输出Promise <rejected>: undefined，并引发未捕获的异常。
setTimeout(console.log, 0, p8); // Promise <pending> 
setTimeout(console.log, 0, p9); // Promise <rejected>: undefined 
//抛出异常会返回拒绝的期约：
... 
let p10 = p1.then(() => { throw 'baz'; }); 
// Uncaught (in promise) baz 
setTimeout(console.log, 0, p10); // Promise <rejected> baz 
//注意，返回错误值不会触发上面的拒绝行为，而会把错误对象包装在一个解决的期约中：
... 
let p11 = p1.then(() => Error('qux')); 
setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux 
//onRejected 处理程序也与之类似：onRejected 处理程序返回的值也会被 Promise.resolve()包装。乍一看这可能有点违反直觉，但是想一想，onRejected 处理程序的任务不就是捕获异步错误吗？因此，拒绝处理程序在捕获错误后不抛出异常是符合期约的行为，应该返回一个解决期约。

//下面的代码片段展示了用 Promise.reject()替代之前例子中的 Promise.resolve()之后的结果：
let p1 = Promise.reject('foo'); 
// 调用 then()时不传处理程序则原样向后传
let p2 = p1.then(); 
// Uncaught (in promise) foo
setTimeout(console.log, 0, p2); // Promise <rejected>: foo 
// 这些都一样
let p3 = p1.then(null, () => undefined); 
let p4 = p1.then(null, () => {}); 
let p5 = p1.then(null, () => Promise.resolve()); 
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined 
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined 
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined 
// 这些都一样
let p6 = p1.then(null, () => 'bar'); 
let p7 = p1.then(null, () => Promise.resolve('bar')); 
setTimeout(console.log, 0, p6); // Promise <resolved>: bar 
setTimeout(console.log, 0, p7); // Promise <resolved>: bar 
// Promise.resolve()保留返回的期约
let p8 = p1.then(null, () => new Promise(() => {})); 
let p9 = p1.then(null, () => Promise.reject()); 
// Uncaught (in promise): undefined 
setTimeout(console.log, 0, p8); // Promise <pending> 
setTimeout(console.log, 0, p9); // Promise <rejected>: undefined 
let p10 = p1.then(null, () => { throw 'baz'; }); 
// Uncaught (in promise) baz 
setTimeout(console.log, 0, p10); // Promise <rejected>: baz 
let p11 = p1.then(null, () => Error('qux')); 
setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux 

//都是什么鬼东西???输出什么比较重要?
```

#### Promise.prototype.catch()

```js
//就是说跟then一样
//Promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：onRejected 处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用 Promise.prototype. then(null, onRejected)。下面的代码展示了这两种同样的情况：
let p = Promise.reject(); 
let onRejected = function(e) { 
 setTimeout(console.log, 0, 'rejected'); 
}; 
// 这两种添加拒绝处理程序的方式是一样的：
p.then(null, onRejected); // rejected 
p.catch(onRejected); // rejected   加粗
//Promise.prototype.catch()返回一个新的期约实例：
let p1 = new Promise(() => {}); 
let p2 = p1.catch(); 
setTimeout(console.log, 0, p1); // Promise <pending> 
setTimeout(console.log, 0, p2); // Promise <pending> 
setTimeout(console.log, 0, p1 === p2); // false 
//在返回新期约实例方面，Promise.prototype.catch()的行为与 Promise.prototype.then()的 onRejected 处理程序是一样的。
```

#### Promise.prototype.finally()

```js
//Promise.prototype.finally()方法用于给期约添加 onFinally 处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。这个方法可以避免 onResolved 和 onRejected 处理程序中出现冗余代码。但 onFinally 处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法!!!主要用于添加清理代码!!!。
let p1 = Promise.resolve(); 
let p2 = Promise.reject(); 
let onFinally = function() { 
 setTimeout(console.log, 0, 'Finally!') 
} 
p1.finally(onFinally); // Finally 
p2.finally(onFinally); // Finally 
//Promise.prototype.finally()方法返回一个新的期约实例：
let p1 = new Promise(() => {}); 
let p2 = p1.finally();
setTimeout(console.log, 0, p1); // Promise <pending> 
setTimeout(console.log, 0, p2); // Promise <pending> 
setTimeout(console.log, 0, p1 === p2); // false 由于finally()方法总是返回一个新的Promise实例，p1和p2是两个不同的实例，所以比较结果是false。什么意思???
//这个新期约实例不同于 then()或 catch()方式返回的实例。因为 onFinally 被设计为一个状态无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此。
let p1 = Promise.resolve('foo'); 
// 这里都会原样后传
let p2 = p1.finally(); 
let p3 = p1.finally(() => undefined); 
let p4 = p1.finally(() => {}); 
let p5 = p1.finally(() => Promise.resolve()); 
let p6 = p1.finally(() => 'bar'); 
let p7 = p1.finally(() => Promise.resolve('bar')); 
let p8 = p1.finally(() => Error('qux')); 
setTimeout(console.log, 0, p2); // Promise <resolved>: foo 
setTimeout(console.log, 0, p3); // Promise <resolved>: foo 
setTimeout(console.log, 0, p4); // Promise <resolved>: foo 
setTimeout(console.log, 0, p5); // Promise <resolved>: foo 
setTimeout(console.log, 0, p6); // Promise <resolved>: foo 
setTimeout(console.log, 0, p7); // Promise <resolved>: foo 
setTimeout(console.log, 0, p8); // Promise <resolved>: foo 
//如果返回的是一个待定的期约，或者 onFinally 处理程序抛出了错误（显式抛出或返回了一个拒绝期约），则会返回相应的期约（待定或拒绝），如下所示：
... 
// Promise.resolve()保留返回的期约
let p9 = p1.finally(() => new Promise(() => {})); 
let p10 = p1.finally(() => Promise.reject()); 
// Uncaught (in promise): undefined 
setTimeout(console.log, 0, p9); // Promise <pending> 
setTimeout(console.log, 0, p10); // Promise <rejected>: undefined 
let p11 = p1.finally(() => { throw 'baz'; }); 
// Uncaught (in promise) baz 
setTimeout(console.log, 0, p11); // Promise <rejected>: baz 
//返回待定期约的情形并不常见，这是因为只要期约一解决，新期约仍然会原样后传初始的期约：
let p1 = Promise.resolve('foo'); 
// 忽略解决的值
let p2 = p1.finally( 
 () => new Promise((resolve, reject) => setTimeout(() => resolve('bar'), 100))); 
setTimeout(console.log, 0, p2); // Promise <pending> 
setTimeout(() => setTimeout(console.log, 0, p2), 200); 
// 200 毫秒后：
// Promise <resolved>: foo 
```

#### 非重入期约的方法

Non-Reentrant Promise Methods. 一点也不懂???

```js
//当期约进入落定状态时，与该状态相关的处理程序仅仅会被排期，而非立即执行。跟在添加这个处理程序的代码之后的同步代码一定会在处理程序之前先执行。即使期约一开始就是与附加处理程序关联的状态，执行顺序也是这样的。这个特性由 JavaScript 运行时保证，被称为“非重入”（non-reentrancy）特性。When a promise reaches a settled state, execution of handlers associated with that state are merely scheduled rather than immediately executed. Synchronous code following the attachment of the handler is guaranteed to execute before the handler is invoked. This remains true even if the promise already exists in the state the newly attached handler is associanon-reentrancy, is guaranteed by the JavaScript runtime.下面的例子演示了这个特性：
// 创建解决的期约
let p = Promise.resolve(); 
// 添加解决处理程序
// 直觉上，这个处理程序会等期约一解决就执行
p.then(() => console.log('onResolved handler')); 
// 同步输出，证明 then()已经返回
console.log('then() returns'); 
// 实际的输出：
// then() returns 
// onResolved handler 
//在这个例子中，在一个解决期约上调用 then()会把 onResolved 处理程序推进消息队列。但这个处理程序在当前线程上的同步代码执行完成前不会执行。因此，跟在 then()后面的同步代码一定先于处理程序执行。in this example, calling then() on a resolved promise will push the onResolved handler onto the message queue. This handler will not be executed until it is dequeued after the current thread of execution completes. Therefore, synchronous code immediately following then() is guaranteed to execute prior to the handler.先解决期约,后添加处理程序.

//先添加处理程序后解决期约也是一样的。如果添加处理程序后，同步代码才改变期约状态，那么处理程序仍然会基于该状态变化表现出非重入特性。下面的例子展示了即使先添加了 onResolved 处理程序，再同步调用 resolve()，处理程序也不会进入同步线程执行：The inverse of this scenario yields the same result. If handlers are already attached to a promise that later synchronously changes state, the handler execution is non-reentrant upon that state change. Thefollowing example demonstrates how, even with an onResolved handler already attached, synchronously invoking resolve() will still exhibit non-reentrant behavior:
let synchronousResolve; 
// 创建一个期约并将解决函数保存在一个局部变量中
let p = new Promise((resolve) => { 
 synchronousResolve = function() { 
 console.log('1: invoking resolve()'); 
 resolve(); 
 console.log('2: resolve() returns'); 
 }; 
}); 
p.then(() => console.log('4: then() handler executes')); 
synchronousResolve(); 
console.log('3: synchronousResolve() returns'); 
// 实际的输出： 加粗
// 1: invoking resolve() 
// 2: resolve() returns 
// 3: synchronousResolve() returns 
// 4: then() handler executes 
//在这个例子中，即使期约状态变化发生在添加处理程序之后，处理程序也会等到运行的消息队列让它出列时才会执行。

//非重入适用于 onResolved/onRejected 处理程序、catch()处理程序和 finally()处理程序。下面的例子演示了这些处理程序都只能异步执行：
let p1 = Promise.resolve(); 
p1.then(() => console.log('p1.then() onResolved')); 
console.log('p1.then() returns'); 
let p2 = Promise.reject(); 
p2.then(null, () => console.log('p2.then() onRejected')); 
console.log('p2.then() returns'); 
let p3 = Promise.reject(); 
p3.catch(() => console.log('p3.catch() onRejected')); 
console.log('p3.catch() returns'); 
let p4 = Promise.resolve(); 
p4.finally(() => console.log('p4.finally() onFinally')); 
console.log('p4.finally() returns'); 
// p1.then() returns 
// p2.then() returns 
// p3.catch() returns 
// p4.finally() returns 
// p1.then() onResolved 加粗
// p2.then() onRejected  加粗
// p3.catch() onRejected  加粗
// p4.finally() onFinally  加粗
```

#### 临近处理程序的执行顺序

Sibling Handler Order of Execution.
如果给期约添加了多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序依次执行。无论是 then()、catch()还是 finally()添加的处理程序都是如此。

```js
let p1 = Promise.resolve(); 
let p2 = Promise.reject(); 
p1.then(() => setTimeout(console.log, 0, 1)); 
p1.then(() => setTimeout(console.log, 0, 2)); //给期约添加了多个处理程序,当期约状态变化时，
// 1   相关处理程序会按照添加它们的顺序依次执行。
// 2 
p2.then(null, () => setTimeout(console.log, 0, 3)); 
p2.then(null, () => setTimeout(console.log, 0, 4)); 
// 3 
// 4 
p2.catch(() => setTimeout(console.log, 0, 5)); 
p2.catch(() => setTimeout(console.log, 0, 6)); 
// 5 
// 6 
p1.finally(() => setTimeout(console.log, 0, 7)); 
p1.finally(() => setTimeout(console.log, 0, 8)); 
// 7 
// 8 
```

#### 传递解决值和拒绝理由

Resolved Value and Rejected Reason Passing.

```js
//到了落定状态后，期约会提供其解决值（如果兑现）或其拒绝理由（如果拒绝）给相关状态的处理程序。拿到返回值后，就可以进一步对这个值进行操作。比如，第一次网络请求返回的 JSON 是发送第二次请求必需的数据，那么第一次请求返回的值就应该传给 onResolved 处理程序继续处理。当然，失败的网络请求也应该把 HTTP 状态码传给 onRejected 处理程序。在执行函数中，解决的值和拒绝的理由是分别作为 resolve()和 reject()的第一个参数往后传的。然后，这些值又会传给它们各自的处理程序，作为 onResolved 或 onRejected 处理程序的唯一参数。下面的例子展示了上述传递过程：
let p1 = new Promise((resolve, reject) => resolve('foo')); 
p1.then((value) => console.log(value)); // foo 
let p2 = new Promise((resolve, reject) => reject('bar')); 
p2.catch((reason) => console.log(reason)); // bar 

//Promise.resolve()和 Promise.reject()在被调用时就会接收解决值和拒绝理由。同样地，它们返回的期约也会像执行器一样把这些值传给 onResolved 或 onRejected 处理程序：
let p1 = Promise.resolve('foo'); 
p1.then((value) => console.log(value)); // foo 
let p2 = Promise.reject('bar'); 
p2.catch((reason) => console.log(reason)); // bar 

//一点不懂???
```

#### 拒绝期约与拒绝错误处理

Rejecting Promises and Rejection Error Handling.

```js
//拒绝期约类似于 throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在期约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会成为拒绝的理由。因此以下这些期约都会以一个错误对象为由被拒绝：
let p1 = new Promise((resolve, reject) => reject(Error('foo'))); 
let p2 = new Promise((resolve, reject) => { throw Error('foo'); }); 
let p3 = Promise.resolve().then(() => { throw Error('foo'); }); 
let p4 = Promise.reject(Error('foo')); 
setTimeout(console.log, 0, p1); // Promise <rejected>: Error: foo 
setTimeout(console.log, 0, p2); // Promise <rejected>: Error: foo 
setTimeout(console.log, 0, p3); // Promise <rejected>: Error: foo 
setTimeout(console.log, 0, p4); // Promise <rejected>: Error: foo 
// 也会抛出 4 个未捕获错误

//期约可以以任何理由拒绝，包括 undefined，但最好统一使用错误对象。这样做主要是因为创建错误对象可以让浏览器捕获错误对象中的栈追踪信息，而这些信息对调试是非常关键的。例如，前面例子中抛出的 4 个错误的栈追踪信息如下：
// Uncaught (in promise) Error: foo 
//  at Promise (test.html:5) 
//  at new Promise (<anonymous>) 
//  at test.html:5 
// Uncaught (in promise) Error: foo 
//  at Promise (test.html:6) 
//  at new Promise (<anonymous>) 
//  at test.html:6 
// Uncaught (in promise) Error: foo 
//  at test.html:8 
// Uncaught (in promise) Error: foo 
//  at Promise.resolve.then (test.html:7)

//所有错误都是异步抛出且未处理的，通过错误对象捕获的栈追踪信息展示了错误发生的路径。注意错误的顺序：Promise.resolve().then()的错误最后才出现，这是因为它需要在运行时消息队列中!!添加!!处理程序；也就是说，在最终抛出未捕获错误之前它还会创建另一个期约。这个例子同样揭示了异步错误有意思的副作用。正常情况下，在通过 throw()关键字抛出错误时，JavaScript 运行时的错误处理机制会停止执行抛出错误之后的任何指令：
throw Error('foo'); 
console.log('bar'); // 这一行不会执行
// Uncaught Error: foo 

//但是，在期约中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时继续执行同步指令：
Promise.reject(Error('foo')); 
console.log('bar'); 
// bar 加粗
// Uncaught (in promise) Error: foo 
//如本章前面的 Promise.reject()示例所示，异步错误!!!只能!!!通过异步的 onRejected 处理程序捕获：
// 正确 
Promise.reject(Error('foo')).catch((e) => {}); //回调函数是一个空函数，因此不会执行任何操作。它只是用来捕获Promise的拒绝状态，以避免可能出现的未处理的Promise拒绝错误。通过使用catch()方法，你可以处理Promise实例的拒绝情况，避免未处理的Promise拒绝错误。即使回调函数不执行任何操作，catch()方法仍然会捕获Promise的拒绝状态，并防止未处理的拒绝错误在程序中传播。
// 不正确.在JavaScript中，try-catch块主要用于捕获同步代码中抛出的异常，而Promise实例的拒绝通常需要通过catch()或then()的错误处理回调来处理。因此，try-catch块!!!并不适合用于抓取!!!Promise实例的拒绝。
try { 
 Promise.reject(Error('foo')); 
} catch(e) {} 

//这不包括捕获执行函数中的错误，在解决或拒绝期约之前，仍然可以使用 try/catch 在执行函数中捕获错误： 就是说在捕获执行函数中try catch没事  
let p = new Promise((resolve, reject) => { 
 try { 
 throw Error('foo'); 
 } catch(e) {} 
 resolve('bar'); 
}); 
setTimeout(console.log, 0, p); // Promise <resolved>: bar 

//then()和 catch()的 onRejected 处理程序在语义上相当于 try/catch。出发点都是捕获错误之后将其隔离，同时不影响正常逻辑执行。为此，onRejected 处理程序的任务应该是在捕获异步错误之后返回一个!!!解决!!!的期约。下面的例子中对比了同步错误处理与异步错误处理：
console.log('begin synchronous execution'); 
try { 
 throw Error('foo'); 
} catch(e) { 
 console.log('caught error', e); 
} 
console.log('continue synchronous execution'); 
// begin synchronous execution 
// caught error Error: foo 
// continue synchronous execution 
//以上同步错误 与 以下异步错误
new Promise((resolve, reject) => { 
 console.log('begin asynchronous execution'); 
 reject(Error('bar')); //创建一个新的Promise实例，并传入一个执行器函数（executor function）。在执行器函数中，首先输出日志'begin asynchronous execution'，表示开始异步执行。接着，调用reject()函数，并传入Error('bar')作为拒绝的原因。这样Promise实例被拒绝，原因是Error('bar')
}).catch((e) => { 
 console.log('caught error', e); //这个方法是Promise的错误处理回调。当Promise实例被拒绝时，这个catch()方法将会被调用。在catch()方法中，输出日志'caught error'以及错误对象e（即Error('bar')），以表示捕获到了错误。
}).then(() => { 
 console.log('continue asynchronous execution'); //这是Promise链上的then()方法，用于在之前的Promise操作完成后执行。由于之前的Promise已经被拒绝并在catch()中处理了错误，then()方法会继续执行。在then()方法中，输出日志'continue asynchronous execution'，表示继续异步执行。
}); //展示了Promise链中异步代码执行的逻辑，以及如何处理Promise拒绝的情况。
// begin asynchronous execution 
// caught error Error: bar 
// continue asynchronous execution

//一点没懂???
```

### 期约链锁与期约和合成

Promise Chaining and Composition.多个期约组合在一起可以构成强大的代码逻辑。这种组合可以通过两种方式实现：期约连锁与期约合成。前者就是一个期约接一个期约地拼接，后者则是将多个期约组合为一个期约。

#### 期约链锁

异步任务串行化在实际应用中有很多实际场景，其中一些常见的应用包括：1. **文件处理**：在处理文件操作时，例如读取、写入或删除文件，串行化异步任务可以确保文件操作的正确顺序，避免并发操作导致的数据冲突或文件损坏。2. **网络请求**：在网络编程中，有时候需要依次发送多个网络请求，以确保请求之间的数据传递顺序。例如，在一个 API 调用的多个步骤中，每一步的输出可能会作为下一步的输入。这种情况下，异步任务串行化可以保证请求按顺序执行，避免数据错乱。3. **数据库操作**：在数据库操作中，串行化异步任务可以确保事务的完整性和一致性。比如，当涉及到多个表的关联操作或更新时，串行化可以避免并发修改导致的数据不一致。4. **动画和视觉效果**：在用户界面和游戏开发中，串行化异步任务可以确保动画或视觉效果按顺序进行，提供更好的用户体验。例如，在制作一个复杂的动画序列时，确保每个动画步骤按顺序执行非常重要。5. **任务排队**：在后台服务中，为了确保任务的优先级和执行顺序，可以将异步任务串行化处理。这种方式适用于任务调度、作业队列等场景。6. **交易处理**：在金融和电子商务应用中，交易处理需要严格的顺序和一致性，串行化异步任务可以确保交易的准确性和安全性。总之，异步任务串行化在各种应用中都有广泛的实际应用。这种技术可以确保任务的执行顺序和数据的一致性，提供更可靠的服务和更好的用户体验。

```js
//把期约逐个地串联起来是一种非常有用的编程模式。之所以可以这样做，是因为每个期约实例的方法（then()、catch()和 finally()）都会返回一个新的期约对象，而这个新期约又有自己的实例方法。这样连缀方法调用就可以构成所谓的“期约连锁”。比如：
let p = new Promise((resolve, reject) => { 
 console.log('first'); 
 resolve(); 
}); 
p.then(() => console.log('second')) 
 .then(() => console.log('third')) 
 .then(() => console.log('fourth')); 
// first 
// second 
// third 
// fourth 
//这个实现最终执行了一连串同步任务。正因为如此，这种方式执行的任务没有那么有用，毕竟分别使用 4 个同步函数也可以做到：
(() => console.log('first'))(); 
(() => console.log('second'))(); 
(() => console.log('third'))(); 
(() => console.log('fourth'))(); 

//要真正执行异步任务，可以改写前面的例子，让每个执行器都返回一个期约实例。这样就可以让每个后续期约都等待之前的期约，也就是串行化异步任务。比如，可以像下面这样让每个期约在一定时间后解决：
let p1 = new Promise((resolve, reject) => { 
 console.log('p1 executor'); 
 setTimeout(resolve, 1000); 
}); 
p1.then(() => new Promise((resolve, reject) => { 
 console.log('p2 executor'); 
 setTimeout(resolve, 1000); 
 })) 
 .then(() => new Promise((resolve, reject) => { 
 console.log('p3 executor'); 
 setTimeout(resolve, 1000); 
 })) 
 .then(() => new Promise((resolve, reject) => { 
 console.log('p4 executor'); 
 setTimeout(resolve, 1000); 
 })); 
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）
//把生成期约的代码提取到一个工厂函数中，就可以写成这样：
function delayedResolve(str) { 
 return new Promise((resolve, reject) => { 
 console.log(str); 
 setTimeout(resolve, 1000); 
 }); 
} 
delayedResolve('p1 executor') 
 .then(() => delayedResolve('p2 executor')) 
 .then(() => delayedResolve('p3 executor')) 
 .then(() => delayedResolve('p4 executor')) 
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）
//每个后续的处理程序都会等待前一个期约解决，然后实例化一个新期约并返回它。这种结构可以简洁地将!!!异步任务串行化!!!，解决之前依赖回调的难题。假如这种情况下不使用期约，那么前面的代码可能就要这样写了：
function delayedExecute(str, callback = null) { 
 setTimeout(() => { 
 console.log(str); 
 callback && callback(); 
 }, 1000) 
} 
delayedExecute('p1 callback', () => { 
 delayedExecute('p2 callback', () => { 
 delayedExecute('p3 callback', () => { 
 delayedExecute('p4 callback'); 
 }); 
 }); 

}); 
// p1 callback（1 秒后）
// p2 callback（2 秒后）
// p3 callback（3 秒后）
// p4 callback（4 秒后）
//心明眼亮的开发者会发现，这不正是期约所要解决的回调地狱问题吗？什么意思???因为 then()、catch()和 finally()都返回期约，所以串联这些方法也很直观。下面的例子同时使用这 3 个实例方法：
let p = new Promise((resolve, reject) => { 
 console.log('initial promise rejects'); 
 reject(); 
}); 
p.catch(() => console.log('reject handler')) 
 .then(() => console.log('resolve handler')) 
 .finally(() => console.log('finally handler')); 
// initial promise rejects 
// reject handler 
// resolve handler 
// finally handler

//没懂???
```

#### 期约图

Promise Graphs.

```js
//因为一个期约可以有任意多个处理程序，所以期约连锁可以构建有向非循环图的结构。这样，每个期约都是图中的一个节点，而使用实例方法添加的处理程序则是有向顶点。因为图中的每个节点都会等待前一个节点落定，所以图的方向就是期约的解决或拒绝顺序。下面的例子展示了一种期约有向图，也就是二叉树：
// A 
// / \ 
// B C 
// /\ /\ 
// D E F G 
let A = new Promise((resolve, reject) => { 
 console.log('A'); 
 resolve(); 
}); 
let B = A.then(() => console.log('B')); 
let C = A.then(() => console.log('C')); 
B.then(() => console.log('D')); 
B.then(() => console.log('E')); 
C.then(() => console.log('F')); 
C.then(() => console.log('G')); 
// A 
// B 
// C 
// D 
// E 
// F 
// G 
//注意，日志的输出语句是对二叉树的层序遍历。如前所述，期约的处理程序是按照它们添加的顺序执行的。由于期约的处理程序是先添加到消息队列，然后才逐个执行，因此构成了层序遍历。树只是期约图的一种形式。考虑到根节点不一定唯一，且多个期约也可以组合成一个期约（通过下一节介绍的 Promise.all()和 Promise.race()），所以有向非循环图是体现期约连锁可能性的最准确表达。

//不懂,什么意思???
```

#### Promise.all()和 Promise.race()

```js
//Promise 类提供两个将多个期约实例组合成一个期约的静态方法：Promise.all()和 Promise.race()。而合成后期约的行为取决于内部期约的行为。
 Promise.all()
//Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新期约：
let p1 = Promise.all([ 
 Promise.resolve(), 
 Promise.resolve() 
]); 
// 可迭代对象中的元素会通过 Promise.resolve()转换为期约
let p2 = Promise.all([3, 4]); 
// 空的可迭代对象等价于 Promise.resolve() 
let p3 = Promise.all([]); 
// 无效的语法   ()里面必须有东西,至少是[]
let p4 = Promise.all(); 
// TypeError: cannot read Symbol.iterator of undefined

//合成的期约只会在每个包含的期约都解决之后才解决：
let p = Promise.all([ 
 Promise.resolve(), 
 new Promise((resolve, reject) => setTimeout(resolve, 1000)) 
]); //外层是合成的,包含的都解决它才解决
setTimeout(console.log, 0, p); // Promise <pending> 
p.then(() => setTimeout(console.log, 0, 'all() resolved!')); 
// all() resolved!（大约 1 秒后）

//如果至少有一个包含的期约待定，则合成的期约也会待定。如果有一个包含的期约拒绝，则合成的期约也会拒绝：  就是说合成里面有待定的,最终待定;有拒绝的,最终拒绝
// 永远待定
let p1 = Promise.all([new Promise(() => {})]); 
setTimeout(console.log, 0, p1); // Promise <pending> 
// 一次拒绝会导致最终期约拒绝
let p2 = Promise.all([ 
 Promise.resolve(), 
 Promise.reject(), //加粗
 Promise.resolve() 
]); 
setTimeout(console.log, 0, p2); // Promise <rejected> 
// Uncaught (in promise) undefined 

//如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序： 就是说没拒绝没暂停,按序出解决值
let p = Promise.all([ 
 Promise.resolve(3), 
 Promise.resolve(), 
 Promise.resolve(4) 
]); 
p.then((values) => setTimeout(console.log, 0, values)); // [3, undefined, 4] 

//如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。合成的期约会静默处理所有包含期约的拒绝操作，如下所示：  就是说所有拒绝都会拒绝,但是拒绝理由以第一个为主.
// 虽然只有第一个期约的拒绝理由会进入拒绝处理程序，第二个期约的拒绝也会被静默处理，不会有错误跑掉.  
let p = Promise.all([ 
 Promise.reject(3), 
 new Promise((resolve, reject) => setTimeout(reject, 1000)) 
]); 
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3 
// 没有未处理的错误
```

```js
//race这个词是英文单词，意思是“竞赛”或“比赛”。在 JavaScript 中，Promise.race()方法的名称反映了其功能，即它会对传入的 Promise 列表进行竞赛，返回最先完成或最先被拒绝的 Promise 的结果。举个比方来说，如果你将几个 Promise 对象传入 Promise.race()方法，它会监听这些 Promise 的状态变化。第一个完成或被拒绝的 Promise 决定了 Promise.race()的最终状态和结果，就像一场比赛中最先到达终点的参赛者获胜一样。因此，这个方法名中的“race”表示在多个 Promise 中选择最先完成或最先出错的那个。
//Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接收一个可迭代对象，返回一个新期约
let p1 = Promise.race([ 
 Promise.resolve(), 
 Promise.resolve() 
]); 
// 可迭代对象中的元素会通过 Promise.resolve()转换为期约
let p2 = Promise.race([3, 4]); 
// 空的可迭代对象等价于 new Promise(() => {}) 
let p3 = Promise.race([]); 
// 无效的语法  就是说()里面至少是[],不能为空
let p4 = Promise.race(); 
// TypeError: cannot read Symbol.iterator of undefined 

//Promise.race()不会对解决或拒绝的期约区别对待。无论是解决还是拒绝，只要是第一个落定的期约，Promise.race()就会包装其解决值或拒绝理由并返回新期约：  就是说竞赛,自认第一个落定的期约
// 解决先发生，超时后的拒绝被忽略
let p1 = Promise.race([ 
 Promise.resolve(3), 
 new Promise((resolve, reject) => setTimeout(reject, 1000)) 
]); 
setTimeout(console.log, 0, p1); // Promise <resolved>: 3 
// 拒绝先发生，超时后的解决被忽略
let p2 = Promise.race([ 
 Promise.reject(4), 
 new Promise((resolve, reject) => setTimeout(resolve, 1000)) 
]); 
setTimeout(console.log, 0, p2); // Promise <rejected>: 4 
// 迭代顺序决定了落定顺序
let p3 = Promise.race([ 
 Promise.resolve(5), 
 Promise.resolve(6), 
 Promise.resolve(7) 
]); 
setTimeout(console.log, 0, p3); // Promise <resolved>: 5 

//如果有一个期约拒绝，只要它是第一个落定的，就会成为拒绝合成期约的理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。与 Promise.all()类似，合成的期约会静默处理所有包含期约的拒绝操作，如下所示：  就是说跟.all一样,拒绝都会处理,但是最终拒绝理由只会要第一个
// 虽然只有第一个期约的拒绝理由会进入拒绝处理程序，第二个期约的拒绝也会被静默处理，不会有错误跑掉  
let p = Promise.race([ 
 Promise.reject(3), 
 new Promise((resolve, reject) => setTimeout(reject, 1000)) 
]); 
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3 
// 没有未处理的错误
```

#### 串行期约合成

Serial Promise Composition.串行期约合成是指在异步操作中，将多个期约按顺序进行组合，确保每个期约的执行和结果依赖于前一个期约的完成。这种合成在一些场景下非常有用，以下是几个具体的应用场景：1. **用户认证和授权**：在一个应用中，用户需要先通过身份验证（比如通过用户名和密码登录）然后才能进行下一步操作。这里可以通过串行期约合成，先进行身份验证的异步操作（如向服务器发送请求验证），验证成功后，再执行获取用户权限的异步操作。2. **多步表单提交**：在提交多步表单时，通常需要一步步验证表单数据的正确性，然后在所有数据都通过验证后才进行提交。可以通过串行期约合成，逐步验证和处理表单数据，并在最后一步提交表单数据。3. **数据处理流水线**：在数据处理流程中，经常需要对数据进行多个步骤的处理。通过串行期约合成，可以将不同的数据处理步骤按顺序执行，并在每个步骤完成后将结果传递到下一个步骤。4. **顺序加载资源**：在加载一组资源（如脚本、样式、数据等）时，有些资源需要在另一些资源加载完成后才能加载。通过串行期约合成，可以确保按照特定顺序加载资源，以避免依赖问题。5. **步骤操作**：在一些业务操作中，可能需要按特定步骤依次执行多个异步任务。例如，一个订单流程需要先创建订单，然后支付订单，最后发货。这种情况下，可以使用串行期约合成确保每个步骤按顺序执行，并在前一步完成后再继续。
总之，串行期约合成在需要按顺序执行一系列异步操作的场景中非常有用。通过串行合成，可以确保每个异步操作的执行顺序，并正确处理每个操作的结果和错误。

```js
//到目前为止，我们讨论期约连锁一直围绕期约的串行执行，忽略了期约的另一个主要特性：异步产生值并将其传给处理程序。基于后续期约使用之前期约的返回值来串联期约是期约的基本功能。这很像函数合成，即将多个函数合成为一个函数，比如：
function addTwo(x) {return x + 2;} 
function addThree(x) {return x + 3;} 
function addFive(x) {return x + 5;} 
function addTen(x) { 
 return addFive(addTwo(addThree(x))); 
} 
console.log(addTen(7)); // 17 
//在这个例子中，有 3 个函数基于一个值合成为一个函数。类似地，期约也可以像这样合成起来，渐进地消费一个值，并返回一个结果：  就是说对一个参数排队运行函数
function addTwo(x) {return x + 2;} 
function addThree(x) {return x + 3;} 
function addFive(x) {return x + 5;} 
function addTen(x) { 
 return Promise.resolve(x) 
 .then(addTwo) 
 .then(addThree) 
 .then(addFive); 
} 
addTen(8).then(console.log); // 18 
//使用 Array.prototype.reduce()可以写成更简洁的形式：
function addTwo(x) {return x + 2;} 
function addThree(x) {return x + 3;} 
function addFive(x) {return x + 5;} 
function addTen(x) { 
 return [addTwo, addThree, addFive] 
 .reduce((promise, fn) => promise.then(fn), Promise.resolve(x)); //定义了一个名为addTen的函数，接受一个参数x。在addTen函数的函数体内：创建一个数组[addTwo, addThree, addFive]，包含三个函数。使用数组的reduce()方法遍历该数组。reduce()方法接受两个参数：回调函数和初始值。回调函数的签名是(promise, fn) => promise.then(fn)，它将Promise实例和一个函数作为参数。对每个函数fn，将promise与fn链接（promise.then(fn)）。!!!初始值是Promise.resolve(x)，表示从x创建一个已经解决的Promise实例。reduce()会将数组中的函数应用于Promise.resolve(x)，并在链上继续调用then()方法传递每个函数。最终结果是累积的Promise链!!!。最终返回累积的Promise链。
}
addTen(8).then(console.log); // 18 
//这种模式可以提炼出一个通用函数，可以把任意多个函数作为处理程序合成一个连续传值的期约连锁。这个通用的合成函数可以这样实现：
function addTwo(x) {return x + 2;} 
function addThree(x) {return x + 3;} 
function addFive(x) {return x + 5;} 
function compose(...fns) { 
 return (x) => fns.reduce(
    (promise, fn) => promise.then(fn), Promise.resolve(x)
    ) 
} 
//compose函数返回一个新的箭头函数，该函数接收一个参数x
//fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));：使用数组fns上的reduce()方法遍历所有函数。
//reduce()接受两个参数：一个回调函数和一个初始值.
//回调函数(promise, fn) => promise.then(fn)接收两个参数：当前的Promise实例和要应用的函数fn。它使用Promise的then方法将fn链接到当前的Promise上。
//初始值是Promise.resolve(x)，将输入值x转换为一个已经解决的Promise实例。
//通过reduce()，compose函数将所有传入的函数链式应用于初始的Promise实例。每一个函数在Promise链上按顺序执行，结果将被传递给下一个函数。
let addTen = compose(addTwo, addThree, addFive);
addTen(8).then(console.log); // 18 
//注意:本章后面的 11.3 节在讨论异步函数时还会涉及这个概念。

//基本上不懂???
```

### 期约扩展

Promise Extensions.ES6 期约实现是很可靠的，但它也有不足之处。比如，很多第三方期约库实现中具备而 ECMAScript规范却未涉及的两个特性：期约取消和进度追踪。期约扩展（Promise extensions）通常是指在JavaScript的原生Promise对象之上，添加额外的方法或功能。这些扩展在处理异步操作时提供了更多的灵活性和便利性。以下是一些期约扩展在实际应用中的场景：1. **重试逻辑**：在处理网络请求等可能出现失败的异步操作时，期约扩展可以提供重试逻辑。例如，提供一个方法来重试请求特定次数，或根据特定条件（如请求失败原因）来确定是否要重试。2. **超时控制**：在处理异步操作时，期约扩展可以提供超时功能。如果某个操作超过了预定的时间限制，可以自动取消操作并返回错误。这在处理网络请求等可能超时的操作时非常有用。3. **批量请求**：期约扩展可以提供一种方便的方式来同时处理多个异步请求。例如，可以将多个请求放入一个数组中，然后并行执行它们，并在所有请求完成后处理结果。这在需要同时处理多个独立任务的场景中很有用。4. **资源管理**：在处理异步操作时，期约扩展可以帮助管理资源的分配和释放。例如，可以确保在一个期约完成后自动释放相关资源，以避免资源泄漏或浪费。5. **事件调度**：期约扩展可以用于管理异步操作之间的事件调度。例如，可以在某个期约完成后触发特定的事件或执行其他期约。这在需要处理一系列相互依赖的异步操作时非常有用。6. **错误处理**：期约扩展可以提供更高级的错误处理机制。例如，可以提供一种方便的方法来捕获和处理所有期约中的错误，并进行统一的错误处理。这有助于提高代码的可读性和可维护性。
总之，期约扩展通过提供更多的功能和方法，为开发者提供了处理异步操作的更多选择。这些扩展在提高代码的灵活性、可读性和可维护性方面发挥着重要作用。

#### 期约取消Promise Canceling

```js
//我们经常会遇到期约正在处理过程中，程序却不再需要其结果的情形。这时候如果能够取消期约就好了。某些第三方库，比如 Bluebird，就提供了这个特性。实际上，TC39 委员会也曾准备增加这个特性，但相关提案最终被撤回了。结果，ES6 期约被认为是“激进的”：只要期约的逻辑开始执行，就没有办法阻止它执行到完成。实际上，可以在现有实现基础上提供一种临时性的封装，以实现取消期约的功能。这可以用到 Kevin Smith 提到的“取消令牌”（cancel token）。生成的令牌实例提供了一个接口，利用这个接口可以取消期约；同时也提供了一个期约的实例，可以用来触发取消后的操作并求值取消状态。下面是 CancelToken 类的一个基本实例：
class CancelToken { 
 constructor(cancelFn) { 
 this.promise = new Promise((resolve, reject) => { 
 cancelFn(resolve); 
 }); 
 } 
} 
//这个类包装了一个期约，把解决方法暴露给了 cancelFn 参数。这样，外部代码就可以向构造函数中传入一个函数，从而控制什么情况下可以取消期约。这里期约是令牌类的公共成员，因此可以给它添加处理程序以取消期约。这个类大概可以这样使用：
<button id="start">Start</button> 
<button id="cancel">Cancel</button> 

class CancelToken { 
 constructor(cancelFn) { 
    //在构造函数中，创建了一个名为promise的Promise实例。 
    //Promise实例的回调函数接收两个参数resolve和reject。 传入的cancelFn函数被调用，并传入一个回调函数作为参数。这个回调函数在被调用时，首先在微任务队列中输出"delay cancelled"消息，然后调用resolve，结束Promise。
    //这样，CancelToken实例的Promise通过resolve方法可以被取消。
 this.promise = new Promise(
    (resolve, reject) =>
  { 
 cancelFn(() => { 
 setTimeout(console.log, 0, "delay cancelled"); 
 resolve();  }
      ); 
 }
); 
 } 
} 
const startButton = document.querySelector('#start'); 
const cancelButton = document.querySelector('#cancel'); 
 //定义一个名为cancellableDelayedResolve的函数，该函数接收一个delay参数作为延迟的时间。立即输出"set delay"消息 。
 function cancellableDelayedResolve(delay) { 
    setTimeout(console.log, 0, "set delay"); 
   return new Promise((resolve, reject) => { 
    //返回一个新的Promise实例。
    //使用setTimeout设置延迟操作，在delay时间后执行。在延迟操作中，先输出"delayed resolve"消息，然后调用resolve。
   const id = setTimeout((() => { 
 setTimeout(console.log, 0, "delayed resolve"); 
 resolve(); 
 }), delay); 
    //创建一个新的CancelToken实例。cancelCallback是在点击cancelButton时执行的回调函数。
    //当cancelToken的Promise被解决时，调用clearTimeout(id)取消延迟操作。
 const cancelToken = new CancelToken((cancelCallback) => 
 cancelButton.addEventListener("click", cancelCallback)); 
 cancelToken.promise.then(() => clearTimeout(id)); 
 }); 
} 
startButton.addEventListener("click", () => cancellableDelayedResolve(1000)); 
//绑定startButton的点击事件处理程序。当startButton被点击时，调用cancellableDelayedResolve函数并传入1000毫秒的延迟。
//这段代码提供了一个可以取消延迟操作的机制。用户点击startButton开始异步操作（在1000毫秒后执行），点击cancelButton则可以取消该操作。
//每次单击“Start”按钮都会开始计时，并实例化一个新的 CancelToken 的实例。此时，“Cancel”按钮一旦被点击，就会触发令牌实例中的期约解决。而解决之后，单击“Start”按钮设置的超时也会被取消。

//没懂,什么意思???
```

#### 期约进度通知

Promise Progress Notifications.

```js
//执行中的期约可能会有不少离散的“阶段”，在最终解决之前必须依次经过。某些情况下，监控期约的执行进度会很有用。ECMAScript 6 期约并不支持进度追踪，但是可以通过扩展来实现。一种实现方式是扩展 Promise 类，为它添加 notify()方法，如下所示：
class TrackablePromise extends Promise
//定义一个名为 TrackablePromise 的类，它继承自原生 Promise 类。
{ 
 constructor(executor)
 //TrackablePromise 类的构造函数，接收一个名为 executor 的执行函数作为参数。
 { 
 const notifyHandlers = []; //定义一个空数组，用于存储通知处理程序。
 super((resolve, reject) => { 
 return executor(resolve, reject, (status) => { 
 notifyHandlers.map((handler) => handler(status)); 
 }); 
 }); 
 this.notifyHandlers = notifyHandlers; 
 //将 notifyHandlers 数组存储在实例的 notifyHandlers 属性中。
 }
 //解释super:   调用父类 Promise 的构造函数，并传入两个回调函数：resolve 和 reject。在调用父类构造函数的回调函数中，调用传入的 executor 函数，并传入 resolve、reject 和一个新的通知函数作为参数。定义一个通知函数，该函数接收一个状态（status）作为参数，然后遍历 notifyHandlers 数组中的所有处理程序并调用它们，将状态传递给处理程序。
 notify(notifyHandler) 
 //定义一个名为 notify 的方法，接收一个通知处理程序作为参数。
 { 
 this.notifyHandlers.push(notifyHandler); //将传入的通知处理程序添加到 notifyHandlers 数组中。
 return this; //返回当前 TrackablePromise 实例，以支持链式调用。
 } 
} 
//TrackablePromise 类在 Promise 的基础上添加了一个 notify 方法，用于注册通知处理程序。当执行 TrackablePromise 的 executor 函数时，提供了一个额外的通知函数，该函数可以触发所有注册的通知处理程序。

//这样，TrackablePromise 就可以在执行函数中使用 notify()函数了。可以像下面这样使用这个函数来实例化一个期约：
let p = new TrackablePromise((resolve, reject, notify) => { 
 function countdown(x) { 
 if (x > 0) { 
 notify(`${20 * x}% remaining`); //如果 x 大于 0，则调用 notify 方法，将剩余百分比信息作为通知发送。当 x = 5 时，计算结果为 20 * 5 = 100。这样的话，每递减一次 x，进度百分比就会减少 20。
 setTimeout(() => countdown(x - 1), 1000); //使用 setTimeout 在 1 秒后递归调用 countdown 函数，并将 x 减 1。
 } else { 
 resolve(); 
 } 
 } 
 countdown(5); 
}); 
//这个期约会连续5次递归地设置1000毫秒的超时。每个超时回调都会调用notify()并传入状态值。假设通知处理程序简单地这样写：
... 
let p = new TrackablePromise((resolve, reject, notify) => { 
 function countdown(x) { 
 if (x > 0) { 
 notify(`${20 * x}% remaining`); 
 setTimeout(() => countdown(x - 1), 1000); 
 } else { 
 resolve(); 
 } 
 } 
 countdown(5); 
}); 
p.notify((x) => setTimeout(console.log, 0, 'progress:', x)); 
p.then(() => setTimeout(console.log, 0, 'completed')); 
// （约 1 秒后）80% remaining 
// （约 2 秒后）60% remaining 
// （约 3 秒后）40% remaining 
// （约 4 秒后）20% remaining 
// （约 5 秒后）completed 
//notify()函数会返回期约，所以可以连缀调用，连续添加处理程序。多个处理程序会针对收到的每条消息分别执行一遍，如下所示：
... 
p.notify((x) => setTimeout(console.log, 0, 'a:', x)) 
.notify((x) => setTimeout(console.log, 0, 'b:', x)); 
p.then(() => setTimeout(console.log, 0, 'completed')); 
// （约 1 秒后） a: 80% remaining 
// （约 1 秒后） b: 80% remaining 
// （约 2 秒后） a: 60% remaining 
// （约 2 秒后） b: 60% remaining 
// （约 3 秒后） a: 40% remaining 
// （约 3 秒后） b: 40% remaining 
// （约 4 秒后） a: 20% remaining 
// （约 4 秒后） b: 20% remaining 
// （约 5 秒后） completed 
//总体来看，这还是一个比较粗糙的实现，但应该可以演示出如何使用通知报告进度了。注意 ES6 不支持取消期约和进度通知，一个主要原因就是这样会导致期约连锁和期约合成过度复杂化。比如在一个期约连锁中，如果某个被其他期约依赖的期约被取消了或者发出了通知，那么接下来应该发生什么完全说不清楚。毕竟，如果取消了 Promise.all()中的一个期约，或者期约连锁中前面的期约发送了一个通知，那么接下来应该怎么办才比较合理呢？

//不懂,什么东西???提示???
```

## 异步函数

异步在现代编程中扮演着重要的角色，特别是在处理网络请求、文件操作、数据库访问以及其他需要等待完成的任务时。以下是一些异步操作的实际应用和场景：

1. **网络请求**：在网络编程中，异步操作用于处理HTTP请求和响应。在与API、Web服务或第三方服务进行交互时，异步操作可以提高效率，避免阻塞主线程。
2. **文件操作**: 在文件读写操作中，异步操作可以避免阻塞主线程，使应用程序可以继续处理其他任务。例如，读取和写入文件、处理文件上传和下载等。
3. **数据库访问**：在与数据库交互时，异步操作可以提高数据库查询和写入的效率，并避免阻塞应用程序的主线程。这在数据密集型应用程序中非常重要。
4. **UI响应**：在前端开发中，异步操作可以确保用户界面在处理长时间任务时保持响应。例如，异步加载数据并更新UI，以保持用户体验的流畅。
5. **实时通信**：在应用程序中使用WebSocket或其他实时通信技术时，异步操作是必不可少的。这些技术允许应用程序在用户之间或与服务器之间进行实时通信。
6. **动画和渲染**：在游戏开发和图形渲染中，异步操作可以用于处理动画和渲染任务，确保用户体验的流畅性。
7. **任务队列**：在需要执行多个异步任务时，任务队列可以帮助控制任务的执行顺序和并发数量。这在后台任务处理和消息队列中非常有用。
8. **处理用户输入**：在响应用户输入时，异步操作可以确保应用程序在等待用户输入或处理数据的同时保持流畅运行。
异步操作在这些场景中可以提高应用程序的性能和效率，并提供更好的用户体验。通过异步操作，程序可以在处理其他任务的同时等待某个任务的完成，而不阻塞主线程。

```js
//ASYNC FUNCTIONS.异步函数，也称为“async/await”（语法关键字），是 ES6 期约模式在 ECMAScript 函数中的应用。async/await 是 ES8 规范新增的。这个特性从行为和语法上都增强了 JavaScript，让以同步方式写的代码能够异步执行。下面来看一个最简单的例子，这个期约在超时之后会解决为一个值：
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
//这个期约在 1000 毫秒之后解决为数值 3。如果程序中的其他代码要在这个值可用时访问它，则需要写一个解决处理程序：
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
p.then((x) => console.log(x)); // 3 
//这其实是很不方便的，因为其他代码都必须塞到期约处理程序中。不过可以把处理程序定义为一个函数：
function handler(x) { console.log(x); } 
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
p.then(handler); // 3 
//!!!这个改进其实也不大!!!。这是因为任何需要访问这个期约所产生值的代码，都需要以处理程序的形式来接收这个值。也就是说，代码照样还是要放到处理程序里。ES8 为此提供了 async/await 关键字。

//所以下面是怎么改进的?
```

### 异步函数基础

Async Function Basics.ES8 的 async/await 旨在解决利用异步结构组织代码的问题。为此，ECMAScript 对函数进行了扩展，为其增加了两个新关键字：async 和 await。

#### async

```js
//async 关键字用于声明异步函数。这个关键字可以用在函数声明、函数表达式、箭头函数和方法上：
async function foo() {} 
let bar = async function() {}; 
let baz = async () => {}; 
class Qux { 
 async qux() {} 
} 
//使用 async 关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭包方面，异步函数仍然具有普通 JavaScript 函数的正常行为。正如下面的例子所示，foo()函数仍然会在后面的指令之前被求值：
async function foo() { 
 console.log(1); 
} 
foo(); 
console.log(2); 
// 1 
// 2 
//不过，异步函数如果使用 return 关键字返回了值（如果没有 return 则会返回 undefined），这个值会被 Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。在函数外部调用这个函数可以得到它返回的期约：
async function foo() { 
 console.log(1); 
 return 3; 
} 

// 给返回的期约添加一个解决处理程序
foo().then(console.log);

console.log(2); 
// 1 
// 2 
// 3 

//当然，直接返回一个期约对象也是一样的：
async function foo() { 
 console.log(1); 
 return Promise.resolve(3); 
} 
// 给返回的期约添加一个解决处理程序
foo().then(console.log); 
console.log(2); 
// 1 
// 2 
// 3 

//异步函数的返回值期待（但实际上并不要求）一个实现 thenable 接口的对象，但常规的值也可以。如果返回的是实现 thenable 接口的对象，则这个对象可以由提供给 then()的处理程序“解包”。如果不是，则返回值就被当作已经解决的期约。下面的代码演示了这些情况：
// 返回一个原始值 
async function foo() { 
 return 'foo'; 
} 
foo().then(console.log); 
// foo

// 返回一个没有实现 thenable 接口的对象
async function bar() { 
 return ['bar']; 
} 
bar().then(console.log); 
// ['bar']

// 返回一个实现了 thenable 接口的非期约对象
async function baz() { 
 const thenable = { 
 then(callback) { callback('baz'); } 
 }; 
 return thenable; 
} 
baz().then(console.log); 
// baz
// 返回一个期约
async function qux() { 
 return Promise.resolve('qux'); 
} 
qux().then(console.log); 
// qux

//与在期约处理程序中一样，在异步函数中抛出错误会返回拒绝的期约：
async function foo() { 
 console.log(1); 
 throw 3; 
} 
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2); 
// 1 
// 2 
// 3 

//不过，拒绝期约的错误不会被异步函数捕获：
async function foo() { 
 console.log(1); 
 Promise.reject(3); 
} 
// Attach a rejected handler to the returned promise 
foo().catch(console.log); 
console.log(2); 
// 1 
// 2 
// Uncaught (in promise): 3 

//不知道怎么用???
```

#### await

`await` 是 JavaScript 中用于处理异步操作的关键字，它通常与 `async` 函数一起使用。`await` 的实际应用非常广泛，主要用于在异步操作（例如 Promise）完成之前暂停函数的执行。通过使用 `await`，开发者可以编写易于阅读和维护的异步代码，而无需嵌套回调。以下是 `await` 的一些实际应用和场景：

1. **网络请求**：`await` 可用于等待 HTTP 请求的结果，例如通过 `fetch` API 或其他网络库发送请求，并在请求完成后获取响应。
2. **数据库访问**：`await` 可以在数据库操作中等待查询或写入的结果。这在与 MongoDB、PostgreSQL 等数据库交互时非常有用。
3. **文件操作**：`await` 可用于等待文件读写操作的完成，例如通过 `fs` 模块在 Node.js 中处理文件。
4. **用户认证**：在用户登录或身份验证过程中，`await` 可用于等待异步认证结果，例如通过 OAuth 或其他身份验证服务。
5. **数据处理**：`await` 可用于等待数据处理任务的完成，例如数据转换、压缩或解压缩等操作。
6. **定时任务**：`await` 可与定时任务结合使用，例如等待一段时间后再继续执行代码。可以通过 `setTimeout` 或其他定时函数实现。
7. **UI更新**：在前端开发中，`await` 可用于等待异步数据加载后再更新用户界面，以确保数据的完整性和一致性。
8. **任务序列化**：`await` 可以帮助控制异步任务的顺序执行，确保任务按特定的顺序完成，这在许多场景中非常重要。
9. **处理流数据**：`await` 可以在处理流数据时等待数据的到来，例如从网络流或文件流中读取数据。
通过使用 `await`，开发者可以编写更简洁、可读性更高的异步代码，从而提高应用程序的性能和用户体验。

```js
//因为异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力。使用 await关键字可以暂停异步函数代码的执行，等待期约解决。来看下面这个本章开始就出现过的例子：
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
p.then((x) => console.log(x)); // 3 
//使用 async/await 可以写成这样：
async function foo() { 
 let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
 console.log(await p); 
} 
foo(); 
// 3 
//注意，await 关键字会暂停执行异步函数后面的代码，让出 JavaScript 运行时的执行线程。这个行为与生成器函数中的 yield 关键字是一样的。yield是什么样???await关键字同样是尝试“解包”对象的值，然后将这个值传给表达式，再异步恢复异步函数的执行。

//await 关键字的用法与 JavaScript 的一元操作一样。它可以单独使用，也可以在表达式中使用，如下面的例子所示：
// 异步打印"foo" 
async function foo() { 
 console.log(await Promise.resolve('foo')); 
} 
foo(); 
// foo 

// 异步打印"bar" 
async function bar() { 
 return await Promise.resolve('bar'); 
} 
bar().then(console.log); 
// bar 

// 1000 毫秒后异步打印"baz" 
async function baz() { 
 await new Promise((resolve, reject) => setTimeout(resolve, 1000)); 
 console.log('baz'); 
} 
baz(); 
// baz（1000 毫秒后）

//await 关键字期待（但实际上并不要求）一个实现 thenable 接口的对象，但常规的值也可以。如果是实现 thenable 接口的对象，则这个对象可以由 await 来“解包”。如果不是，则这个值就被当作已经解决的期约。下面的代码演示了这些情况：

// 等待一个原始值 
async function foo() { 
 console.log(await 'foo'); 
} 
foo(); 
// foo

// 等待一个没有实现 thenable 接口的对象    为什么叫没实现???
async function bar() { 
 console.log(await ['bar']); 
} 
bar(); 
// ['bar']

// 等待一个实现了 thenable 接口的非期约对象  为什么叫实现了???
async function baz() { 
 const thenable = { 
 then(callback) { callback('baz'); } 
 }; 
 console.log(await thenable); 
} 
baz(); 
// baz 

// 等待一个期约
async function qux() { 
 console.log(await Promise.resolve('qux')); 
} 
qux(); 
// qux

//等待会抛出错误的同步操作，会返回拒绝的期约：
async function foo() { 
 console.log(1); 
 await (() => { throw 3; })(); 
} 
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);
console.log(2); 
// 1 
// 2 
// 3 
//如前面的例子所示，单独的 Promise.reject()不会被异步函数捕获，而会抛出未捕获错误。

//不过，!!!对拒绝的!!!期约使用 await 则会释放（unwrap）错误值（将拒绝期约返回）：
async function foo() { 
 console.log(1); 
 await Promise.reject(3); 
 console.log(4); // 这行代码不会执行
} 
// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log); 
console.log(2); 
// 1 
// 2 
// 3 

//不太懂 干嘛???何时等 怎么等 等着干嘛???
```

#### await的限制

```js
//await怎么出现 什么环境下出现
//await 关键字必须在异步函数中使用，不能在顶级上下文如<script>标签或模块中使用。不过，定义并立即调用异步函数是没问题的。下面两段代码实际是相同的：
async function foo() { 
 console.log(await Promise.resolve(3)); 
} 
foo(); 
// 3 
// 立即调用的异步函数表达式
(async function() { 
 console.log(await Promise.resolve(3)); 
})(); 
// 3 
//此外，异步函数的特质不会扩展到嵌套函数。因此，await 关键字也只能直接出现在异步函数的定义中。在同步函数内部使用 await 会抛出 SyntaxError。下面展示了一些会出错的例子：
// 不允许：await 出现在了箭头函数中
function foo() { 
 const syncFn = () => { 
 return await Promise.resolve('foo'); 
 }; 
 console.log(syncFn()); 
} 
// 不允许：await 出现在了同步函数声明中
function bar() { 
 function syncFn() { 
 return await Promise.resolve('bar'); 
 } 
 console.log(syncFn()); 
} 
// 不允许：await 出现在了同步函数表达式中
function baz() { 
 const syncFn = function() { 
 return await Promise.resolve('baz'); 
 }; 
 console.log(syncFn()); 
} 
// 不允许：IIFE 使用同步函数表达式或箭头函数
function qux() { 
 (function () { console.log(await Promise.resolve('qux')); })(); 
 (() => console.log(await Promise.resolve('qux')))(); 
} 
```

### 停止和恢复执行

Halting and Resuming Execution.

```js
//使用 await 关键字之后的区别其实比看上去的还要微妙一些。比如，下面的例子中按顺序调用了 3个函数，但它们的输出结果顺序是相反的：
async function foo() { 
 console.log(await Promise.resolve('foo')); 
} 
async function bar() { 
 console.log(await 'bar'); 
} 
async function baz() { 
 console.log('baz'); 
} 
foo(); 
bar(); 
baz(); 
// baz 
// bar 
// foo 

//async/await 中真正起作用的是 await。async 关键字，无论从哪方面来看，都不过是一个标识符。毕竟，异步函数如果不包含 await 关键字，其执行基本上跟普通函数没有什么区别：
async function foo() { 
 console.log(2); 
} 
console.log(1); 
foo(); 
console.log(3); 
// 1 
// 2 
// 3 

//要完全理解 await 关键字，必须知道它并非只是等待一个值可用那么简单。JavaScript 运行时在碰到 await 关键字时，会记录在哪里暂停执行。等到 await 右边的值可用了，JavaScript 运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。因此，即使 await 后面跟着一个立即可用的值，函数的其余部分也会被异步求值。下面的例子演示了这一点：
async function foo() { 
 console.log(2); 
 await null; 
 console.log(4); 
} 
console.log(1); 
foo(); 
console.log(3); 
// 1 
// 2 
// 3 
// 4 
//控制台中输出结果的顺序很好地解释了运行时的工作过程：
(1) 打印 1；
(2) 调用异步函数 foo()；
(3)（在 foo()中）打印 2；
(4)（在 foo()中）await 关键字暂停执行，为立即可用的值 null 向消息队列中添加一个任务；
(5) foo()退出；
(6) 打印 3；
(7) 同步线程的代码执行完毕；
(8) JavaScript 运行时从消息队列中取出任务，恢复异步函数执行；
(9)（在 foo()中）恢复执行，await 取得 null 值（这里并没有使用）；
(10)（在 foo()中）打印 4；
(11) foo()返回。
//如果 await 后面是一个期约，则问题会稍微复杂一些。此时，为了执行异步函数，实际上会有两个任务被添加到消息队列并被异步求值。下面的例子虽然看起来很反直觉，但它演示了!!!真正的执行顺序!!!：
async function foo() { 
 console.log(2); 
 console.log(await Promise.resolve(8)); 
 console.log(9); 
} 
async function bar() { 
console.log(4); 
 console.log(await 6); 
 console.log(7); 
} 
console.log(1); 
foo(); 
console.log(3); 
bar(); 
console.log(5); 
// 1 
// 2 
// 3 
// 4 
// 5 
// 6 
// 7 
// 8 
// 9 
运行时会像这样执行上面的例子：
(1) 打印 1；
(2) 调用异步函数 foo()；
(3)（在 foo()中）打印 2；
(4)（在 foo()中）await 关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务；
(5) 期约立即落定，把给 await 提供值的任务添加到消息队列；
(6) foo()退出；
(7) 打印 3；
(8) 调用异步函数 bar()；
(9)（在 bar()中）打印 4；
(10)（在 bar()中）await 关键字暂停执行，为立即可用的值 6 向消息队列中添加一个任务；
(11) bar()退出；
(12) 打印 5；
(13) 顶级线程执行完毕；
(14) JavaScript 运行时从消息队列中取出解决 await 期约的处理程序，并将解决的值 8 提供给它；
(15) JavaScript 运行时向消息队列中添加一个恢复执行 foo()函数的任务；
(16) JavaScript 运行时从消息队列中取出恢复执行 bar()的任务及值 6；
(17)（在 bar()中）恢复执行，await 取得值 6；
(18)（在 bar()中）打印 6；
(19)（在 bar()中）打印 7；
(20) bar()返回；
(21) 异步任务完成，JavaScript 从消息队列中取出恢复执行 foo()的任务及值 8；
(22)（在 foo()中）打印 8；
(23)（在 foo()中）打印 9；
(24) foo()返回。

//就是说await Promise比直接await一个值要排后面
```

### 异步函数策略

Strategies for Async Functions.需要注意:

#### 实现sleep()

implementing sleep

```js
//很多人在刚开始学习 JavaScript 时，想找到一个类似 Java 中 Thread.sleep()之类的函数，好在程序中加入非阻塞的暂停。以前，这个需求基本上都通过 setTimeout()利用 JavaScript 运行时的行为来实现的。有了异步函数之后，就不一样了。一个简单的箭头函数就可以实现 sleep()：
async function sleep(delay) { 
 return new Promise((resolve) => setTimeout(resolve, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 await sleep(1500); // 暂停约 1500 毫秒  加粗
 console.log(Date.now() - t0); 
} 
foo(); 
// 1502 

//就是说等异步函数1500毫秒?await sleep(1500) 但为什么是1502?
```

#### 利用平行执行

Maximizing Parallelization.平行执行是一种在计算机编程中同时执行多个任务或操作的技术。这种技术可以提高应用程序的性能和效率，特别是在需要处理大量数据或计算密集型任务时。以下是平行执行的一些实际应用和场景：

1. **数据处理**：在处理大量数据集时，可以将数据分割成多个块，并使用平行执行同时对每个块进行处理。例如，在数据分析、机器学习或数据转换任务中，这种方法可以显著提高效率。
2. **多线程计算**：在多线程环境中，平行执行允许多个线程同时运行不同的任务。这在图像处理、科学计算、模拟建模等领域非常有用。
3. **网络请求**：在前端和后端开发中，平行执行可以同时发送多个网络请求并等待它们的结果。这可以加快数据的获取和处理速度。
4. **渲染**：在游戏开发和计算机图形学中，平行执行可以同时渲染多个图形元素或帧，从而提高渲染速度和帧率。
5. **任务调度**：在操作系统和云计算环境中，平行执行可以通过调度多个任务同时运行，提高系统资源的利用率和整体性能。
6. **并行搜索**：在搜索大型数据集时，平行执行可以同时进行多个搜索请求，加快搜索速度。
7. **平行编译**：在软件开发中，平行执行可以同时编译多个源文件，从而加快编译过程。
8. **数据同步**：在分布式系统中，平行执行可以同时同步多个数据源，提高数据同步的速度和效率。
9. **音视频处理**：在音视频编辑和处理时，平行执行可以同时对多个音轨或视频片段进行处理，从而加快处理速度。
10. **交易处理**：在金融和电商领域，平行执行可以同时处理多个交易请求，提高交易处理的速度和吞吐量。
通过使用平行执行，开发者可以充分利用现代硬件的多核架构，提高应用程序的性能和效率。

```js
//如果使用 await 时不留心，则很可能错过平行加速的机会。来看下面的例子，其中顺序等待了 5个随机的超时：
async function randomDelay(id) { 
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000; 
 return new Promise((resolve) => setTimeout(() => { 
 console.log(`${id} finished`); 
 resolve(); 
 }, delay)); 
} 
//在 randomDelay 函数中，返回一个新的 Promise 对象。使用 setTimeout 延迟执行函数，延迟时间由 delay 决定。在延迟完成后，打印 ${id} finished 到控制台，并调用 resolve() 以标记 Promise 完成。
async function foo() { 
 const t0 = Date.now(); 
 await randomDelay(0); 
 await randomDelay(1); 
 await randomDelay(2); 
 await randomDelay(3); 
 await randomDelay(4); 
 console.log(`${Date.now() - t0}ms elapsed`); //每次调用 randomDelay 函数后，foo 函数会等待该函数完成（即 Promise 完成），然后继续执行下一次调用。这意味着每个延迟操作是顺序执行的。
} 
foo(); 
// 0 finished 
// 1 finished 
// 2 finished 
// 3 finished 
// 4 finished 
// 877ms elapsed    foo函数依次执行五个延迟操作，并在所有操作完成后，计算总耗时。这是通过调用异步函数 randomDelay 并等待每个操作完成来实现的。

//用一个 for 循环重写，就是：
async function randomDelay(id) { 
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000; 
 return new Promise((resolve) => setTimeout(() => { 
 console.log(`${id} finished`); 
 resolve(); 
 }, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 for (let i = 0; i < 5; ++i) { 
 await randomDelay(i); 
 } 
 console.log(`${Date.now() - t0}ms elapsed`); 
} 
foo(); 
// 0 finished 
// 1 finished 
// 2 finished 
// 3 finished 
// 4 finished 
// 877ms elapsed 
//就算这些期约之间没有依赖，异步函数也会依次暂停，等待每个超时完成。这样可以保证执行顺序，但总执行时间会变长。

//如果顺序不是必需保证的，那么可以先一次性初始化所有期约，然后再分别等待它们的结果。比如：
async function randomDelay(id) { 
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000; 
 return new Promise((resolve) => setTimeout(() => { 
 setTimeout(console.log, 0, `${id} finished`); 
 resolve(); 
 }, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 const p0 = randomDelay(0); 
 const p1 = randomDelay(1); 
 const p2 = randomDelay(2); 
 const p3 = randomDelay(3); 
 const p4 = randomDelay(4); 
 await p0;// 可以先一次性初始化所有期约，
 await p1; //使用 await 关键字等待每个 Promise 实例完成，即 Promise 完成之前不会继续执行接下来的代码。这意味着这些延迟操作将按顺序执行。
 await p2; 
 await p3; 
 await p4; 
 setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`); 
} 
foo(); 
// 1 finished
// 4 finished 
// 3 finished 
// 0 finished 
// 2 finished 
// 877ms elapsed 

//用数组和 for 循环再包装一下就是：
async function randomDelay(id) { 
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000; 
 return new Promise((resolve) => setTimeout(() => { 
 console.log(`${id} finished`); 
 resolve(); 
 }, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 const promises = Array(5).fill(null).map((_, i) => randomDelay(i)); 
 for (const p of promises) { 
 await p; 
 } 
 console.log(`${Date.now() - t0}ms elapsed`); 
} 
foo(); 
// 4 finished 
// 2 finished 
// 1 finished 
// 0 finished 
// 3 finished 
// 877ms elapsed 
//注意，虽然期约没有按照顺序执行，但 await !!!按顺序!!!收到了每个期约的值：
async function randomDelay(id) { 
 // 延迟 0~1000 毫秒
 const delay = Math.random() * 1000; 
 return new Promise((resolve) => setTimeout(() => { 
 console.log(`${id} finished`); 
 resolve(id); 
 }, delay)); 
} 
async function foo() { 
 const t0 = Date.now(); 
 const promises = Array(5).fill(null).map((_, i) => randomDelay(i)); 
 //使用 Array(5).fill(null) 创建一个包含 5 个 null 元素的数组。然后用 map 方法遍历数组，并对每个元素执行 randomDelay 函数，传入当前索引 i 作为 id。结果是一个包含 5 个 randomDelay 实例的 Promise 数组，存储在 promises 中。
 for (const p of promises) { 
 console.log(`awaited ${await p}`); 
 } 
 console.log(`${Date.now() - t0}ms elapsed`); 
} 
foo(); 
// 1 finished 
// 2 finished 
// 4 finished 
// 3 finished 
// 0 finished 
// awaited 0 
// awaited 1 
// awaited 2 
// awaited 3 
// awaited 4 
// 645ms elapsed这段代码片段演示了如何通过 await 在一个异步函数中按顺序等待多个 Promise 的完成，并计算和打印总耗时。
```

#### 串行执行期约

Serial Promise Execution.

```js
//在 11.2 节，我们讨论过如何串行执行期约并把值传给后续的期约。使用 async/await，期约连锁会变得很简单：
function addTwo(x) {return x + 2;} 
function addThree(x) {return x + 3;} 
function addFive(x) {return x + 5;} 
async function addTen(x) { 
 for (const fn of [addTwo, addThree, addFive]) { 
 x = await fn(x); 
 } 
 return x; 
} 
addTen(9).then(console.log); // 19 
//这里，await 直接传递了每个函数的返回值，结果通过迭代产生。当然，这个例子并没有使用期约，如果要使用期约，则可以把所有函数都改成异步函数。这样它们就都返回期约了：
async function addTwo(x) {return x + 2;} 
async function addThree(x) {return x + 3;} 
async function addFive(x) {return x + 5;} 
async function addTen(x) { 
 for (const fn of [addTwo, addThree, addFive]) { 
 x = await fn(x); 
 } 
 return x; 
} 
addTen(9).then(console.log); // 19 

//为什么要都返回期约,为什么都改成异步函数就达到了???
```

#### 栈追踪与内存管理

栈追踪和内存管理在软件开发和计算机科学中有许多实际的应用和场景。它们在应用程序的性能优化、调试、和稳定性方面扮演着重要的角色。下面是一些具体应用及场景，并附带一个比方来帮助理解。
**栈追踪：**

1. **错误诊断**：当应用程序崩溃或出现异常时，栈追踪可以帮助开发者快速定位问题的源头。它会显示出程序执行过程中调用的方法栈和异常发生的代码位置。
2. **性能优化**：通过分析栈追踪，开发者可以找出程序中最消耗时间的函数调用，从而优化代码，提高性能。
3. **代码理解**：在大型代码库中，栈追踪可以帮助开发者理解函数调用的顺序和依赖关系，方便维护和改进代码。
**比方**：想象你在一个多层建筑中迷路了。栈追踪就像一条路线图，告诉你你曾经过的楼层和房间，你可以通过它找到自己走错路的地方。

**内存管理**
在软件开发和计算机科学中也有许多实际的应用和场景。它涉及到如何有效地分配、使用和释放内存，以确保应用程序稳定、高效地运行。

1. **内存泄漏防止**：通过有效的内存管理，开发者可以防止内存泄漏。内存泄漏会导致应用程序占用过多的内存，从而影响性能甚至崩溃。
2. **性能优化**：合理的内存分配和释放可以提高应用程序的性能，特别是在处理大量数据或需要频繁分配内存的任务中。
3. **资源限制**：在嵌入式系统或移动设备等受资源限制的环境中，内存管理至关重要。合理使用内存可以延长设备的电池寿命并提高其运行速度。
4. **内存碎片问题**：通过有效的内存管理，开发者可以减少内存碎片，确保内存使用的连续性，提高程序的运行效率。
5. **垃圾回收**：在高级编程语言中，垃圾回收是内存管理的一部分，负责自动释放不再使用的对象的内存，避免内存泄漏。
**比方**：内存管理就像在一个仓库中组织物品。你需要将物品按照特定的规则存储和整理，以确保快速找到所需物品并保持仓库的整洁有序。如果不合理地堆积物品，仓库就会变得混乱，寻找物品变得困难，甚至可能导致事故。
总的来说，栈追踪和内存管理对于确保软件的稳定性和性能至关重要。通过优化这两个方面，开发者可以构建更加可靠、高效的应用程序。

```js
//期约与异步函数的功能有相当程度的重叠，但它们在内存中的表示则差别很大。看看下面的例子，它展示了拒绝期约的栈追踪信息：
function fooPromiseExecutor(resolve, reject) { 
 setTimeout(reject, 1000, 'bar'); 
} 
function foo() { 
 new Promise(fooPromiseExecutor); 
 //fooPromiseExecutor 将作为 Promise 的异步操作，包含成功和失败的回调函数
} 
//由于 fooPromiseExecutor 在 1000 毫秒后调用 reject，传入字符串 'bar' 作为拒绝原因，因此 Promise 将在 1000 毫秒后拒绝。
foo(); 
// Uncaught (in promise) bar 
// setTimeout 
// setTimeout (async) 
// fooPromiseExecutor 加粗
// foo 加粗
//根据对期约的不同理解程度，以上栈追踪信息可能会让某些读者不解。栈追踪信息应该相当直接地表现 JavaScript 引擎当前栈内存中函数调用之间的嵌套关系。在超时处理程序执行时和拒绝期约时，我们看到的错误信息包含嵌套函数的标识符，那是被调用以创建最初期约实例的函数。可是，我们知道这些函数已经返回了，因此栈追踪信息中不应该看到它们。答案很简单，这是因为 JavaScript 引擎会在创建期约时尽可能保留完整的调用栈。在抛出错误时，调用栈可以由运行时的错误处理逻辑获取，因而就会出现在栈追踪信息中。当然，这意味着栈追踪信息会占用内存，从而带来一些计算和存储成本。

//如果在前面的例子中使用的是异步函数，那又会怎样呢？比如：
function fooPromiseExecutor(resolve, reject) { 
 setTimeout(reject, 1000, 'bar'); 
 //resolve 是 Promise 的成功回调函数，用于在异步操作成功时调用。reject 是 Promise 的失败回调函数，用于在异步操作失败时调用。
 //使用 setTimeout 创建一个定时器，延迟 1000 毫秒后执行。在定时器到期后，调用 reject，并传入字符串 'bar' 作为拒绝的原因。
} 
async function foo() 
//异步函数可以使用 await 关键字等待异步操作的完成。在这个函数中，await 关键字没有被使用。
{ 
 await new Promise(fooPromiseExecutor); 
 //创建一个 Promise 对象，并将 fooPromiseExecutor 作为 Promise 的执行器传入。
} 
foo(); 
//由于 foo 函数是一个异步函数，但没有使用 await，它将立即返回一个 Promise 对象，这个 Promise 对象的状态变化不会影响其他代码部分。
// Uncaught (in promise) bar 
// foo 加粗
// async function (async)  加粗
// foo 加粗
//这样一改，栈追踪信息就准确地反映了当前的调用栈。fooPromiseExecutor()已经返回，所以它不在错误信息中。但 foo()此时被挂起了，并没有退出。JavaScript 运行时可以简单地在嵌套函数中存储指向包含函数的指针，就跟对待同步函数调用栈一样。这个指针实际上存储在内存中，可用于在出错时生成栈追踪信息。这样就不会像之前的例子那样带来额外的消耗，因此在重视性能的应用中是可以优先考虑的。

//很重要???但是不懂???
```

## 小结

长期以来，掌握单线程 JavaScript 运行时的异步行为一直都是个艰巨的任务。随着 ES6 新增了期约和 ES8 新增了异步函数，ECMAScript 的异步编程特性有了长足的进步。通过期约和 async/await，不仅可以实现之前难以实现或不可能实现的任务，而且也能写出更清晰、简洁，并且容易理解、调试的代码。

期约的主要功能是为异步代码提供了清晰的抽象。可以用期约表示异步执行的代码块，也可以用期约表示异步计算的值。在需要串行异步代码时，期约的价值最为突出。作为可塑性极强的一种结构，期约可以被序列化、连锁使用、复合、扩展和重组。

异步函数是将期约应用于 JavaScript 函数的结果。异步函数可以暂停执行，而不阻塞主线程。无论是编写基于期约的代码，还是组织串行或平行执行的异步代码，使用异步函数都非常得心应手。异步函数可以说是现代 JavaScript 工具箱中最重要的工具之一。

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
