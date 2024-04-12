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

Synchronous/Asynchronous Execution Duality.

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
//第一个 try/catch 抛出并捕获了错误，第二个 try/catch 抛出错误却没有捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式捕获错误。从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。在前面的例子中，拒绝期约的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。因此，try/catch 块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构——更具体地说，就是期约的方法.


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
