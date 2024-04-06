# 代理与反射

Proxies and Reflect.

介绍两个紧密相关的概念：Proxy（代理）和 Reflect（反射） API。代理和反射用于拦
截和修改这门语言的基本操作.

本章内容
  代理基础
  代码捕获器与反射方法
  代理模式

ECMAScript 6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体地说，!!!可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用!!!。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制.   由于代理是一种新的基础性语言能力，很多转译程序都不能把代理行为转换为之前的 ECMAScript 代码，因为代理的行为实际上是无可替代的。为此，代理和反射只在百分之百支持它们的平台上有用。可以检测代理是否存在，不存在则提供后备代码。不过这会导致代码冗余，因此并不推荐。

## 代理基础

PROXY FUNDAMENTALS.正如本章开头所介绍的，代理是目标对象的抽象。从很多方面看，代理类似 C++指针(也有重大区别)，因为它可以用作目标对象的替身，但又完全独立于目标对象。目标对象既可以直接被操作，也可以通过代理来操作。但直接操作会绕过代理施予的行为。

### 创建空代理

Creating a Passthrough Proxy.

```js
//最简单的代理是空代理，即除了作为一个抽象的目标对象，什么也不做。默认情况下，在代理对象上执行的所有操作都会无障碍地传播到目标对象。因此，在任何可以使用目标对象的地方，都可以通过同样的方式来使用与之关联的代理对象。
//代理是使用 Proxy 构造函数创建的。这个构造函数接收两个参数：目标对象和处理程序对象。缺少其中任何一个参数都会抛出 TypeError。要创建空代理，可以传一个简单的对象字面量作为处理程序对象，从而让所有操作畅通无阻地抵达目标对象。

//在代理对象上执行的任何操作实际上都会应用到目标对象。唯一可感知的不同就是代码中操作的是代理对象: 没懂???
const target = { 
 id: 'target' 
}; 
const handler = {}; 
const proxy = new Proxy(target, handler); 

// id 属性会访问同一个值
console.log(target.id); // target 
console.log(proxy.id); // target 

// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = 'foo'; 
console.log(target.id); // foo 
console.log(proxy.id); // foo 

// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = 'bar'; 
console.log(target.id); // bar 
console.log(proxy.id); // bar 

// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true 
console.log(proxy.hasOwnProperty('id')); // true 

// 大Proxy.prototype 是 undefined 
// 因此不能使用 instanceof 操作符. 这里没懂???
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check 
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check 

// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
```

### 定义捕获器

Defining Traps.

```js
//使用代理的主要目的是可以定义捕获器（trap）。捕获器就是在处理程序对象中定义的“基本操作的拦截器”。每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接或间接在代理对象上调用。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改相应的行为。注意:捕获器（trap）是从操作系统中借用的概念。在操作系统中，捕获器是程序流中的一个同步中断，可以暂停程序流，转而执行一段子例程，之后再返回原始程序流。
//例如，可以定义一个 get()捕获器，在 ECMAScript 操作以某种形式调用 get()时触发。下面的例子定义了一个 get()捕获器：
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 // 捕获器在处理程序对象中以方法名为键
 get() { 
 return 'handler override'; 
 } 
}; 
const proxy = new Proxy(target, handler); 
//这样，当通过代理对象执行 get()操作时，就会触发定义的 get()捕获器。当然，get()不是ECMAScript 对象可以调用的方法。这个操作在 JavaScript 代码中可以通过多种形式触发并被 get()捕获器拦截到。proxy[property]、proxy.property 或 Object.create(proxy)[property]等操作都会触发基本的 get()操作以获取属性。因此所有这些操作只要发生在代理对象上，就会触发 get()捕获器。
//注意，只有在代理对象上执行这些操作才会触发捕获器。在目标对象上执行这些操作仍然会产生正常的行为。
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 // 捕获器在处理程序对象中以方法名为键
 get() { 
 return 'handler override'; 
 } 
}; //它是一个包含了一个 get 方法的对象，用于定义代理对象的行为。在此例中，get 方法被定义为返回字符串 'handler override'。

const proxy = new Proxy(target, handler);
//该代理对象将目标对象 target 和处理程序对象 handler 连接起来。代理对象将拦截对目标对象的各种操作，并根据处理程序定义的行为来处理这些操作。 
console.log(target.foo); // bar 直接访问目标对象的属性 foo，因为目标对象的属性未被代理拦截，所以返回原始值 'bar'
console.log(proxy.foo); // handler override 访问代理对象的属性 foo，!!!代理对象将调用处理程序对象中定义的 get 方法来处理此次访问!!!。由于在处理程序中重写了 get 方法，所以返回的是处理程序定义的字符串 'handler override'。
console.log(target['foo']); // bar 
console.log(proxy['foo']); // handler override 
console.log(Object.create(target)['foo']); // bar 通过 Object.create() 方法创建一个新对象，该对象的原型为目标对象 target，然后访问其属性 foo。由于属性 foo 并未被代理，所以返回原始值 'bar'。
console.log(Object.create(proxy)['foo']); // handler override 通过 Object.create() 方法创建一个新对象，该对象的原型为代理对象 proxy，然后访问其属性 foo。!!!由于代理对象拦截了属性的访问!!!，所以返回的是处理程序定义的字符串 'handler override'。
```

### 捕获器参数和反射API

Trap Parameters and the Reflect API.

```js
//所有捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。比如，get()捕获器会接收到目标对象、要查询的属性和代理对象三个参数。
const target = { 
 foo: 'bar' 
}; 
const handler = { 
get(trapTarget, property, receiver) 
//包含了一个 get 方法的对象，用于定义代理对象的行为.get 方法接收三个参数：trapTarget：被代理的目标对象，即 target。property：被访问的属性名，即 'foo'。receiver：代理对象，即 proxy。
{ 
 console.log(trapTarget === target); //trapTarget 是被代理的目标对象，即 target，所以此处输出 true。
 console.log(property); 
 console.log(receiver === proxy); 
 } 
}; 
const proxy = new Proxy(target, handler); 

proxy.foo; 
// true 
// foo 
// true 

//有了这些参数，就可以重建被捕获方法的原始行为：
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get(trapTarget, property, receiver) { 
 return trapTarget[property]; 
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 访问代理对象的属性 foo，触发了代理对象的 get 方法。在 get 方法内部，trapTarget[property] 返回了目标对象中 foo 属性的值 'bar'。因此，此行代码输出 'bar'。
console.log(target.foo); // bar 直接访问目标对象 target 的属性 foo，输出其值 'bar'。
```

```js
//所有捕获器都可以基于自己的参数重建原始操作，但并非所有捕获器行为都像 get()那么简单。因此，通过手动写码如法炮制的想法是不现实的。实际上，开发者并不需要手动重建原始行为，而是可以通过调用全局 Reflect 对象上（封装了原始行为）的同名方法来轻松重建。处理程序对象中所有可以捕获的方法都有对应的反射（Reflect）API 方法。这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有与被拦截方法相同的行为。因此，使用反射 API 也可以像下面这样定义出空代理对象：
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get() { 
 return Reflect.get(...arguments);//arguement展开操作符，表示将传递给 get 方法的所有参数展开为一个数组。 
 //它是一个包含了一个 get 方法的对象，用于定义代理对象的行为。在此例中，get 方法使用了 Reflect.get 方法来获取属性值，Reflect.get 方法的参数和返回值与 Proxy 对象的 get 方法一致。
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo); // bar 

//甚至还可以写得更简洁一些：
const target = { 
 foo: 'bar' 
};
const handler = { 
 get: Reflect.get 
}; //reflect.get后面直接无了
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo); // bar 
```

```js
//事实上，如果真想创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理，那么甚至不需要定义处理程序对象：
const target = { 
 foo: 'bar' 
}; 
const proxy = new Proxy(target, Reflect); //创建了一个代理对象 proxy，它代理了 target 对象，并使用 Reflect 对象作为其处理程序。
console.log(proxy.foo); // bar 
console.log(target.foo); // bar 

```

```js
//反射 API 为开发者准备好了样板代码，在此基础上开发者可以用最少的代码修改捕获的方法。比如，下面的代码在某个属性被访问时，会对返回的值进行一番修饰：
const target = { 
 foo: 'bar', 
 baz: 'qux' 
}; 
const handler = { 
 get(trapTarget, property, receiver) { 
 let decoration = ''; // 声明一个名为 decoration 的变量，用于存储装饰符。
 if (property === 'foo') { 
 decoration = '!!!'; 
 } //如果被访问的属性是 'foo'，则将装饰符设置为 '!!!'，用于后续对属性值的装饰。
 return Reflect.get(...arguments) + decoration; //用 Reflect.get 方法获取目标对象上指定属性的值，并将装饰符添加到属性值后返回。
 } //在 handler 对象中定义的 get 方法，接收三个参数：trapTarget 表示被代理的目标对象，property 表示被访问的属性名，receiver 表示代理对象本身。
}; //定义了一个名为 handler 的常量，其值是一个对象，其中包含了一个 get 方法，该方法用于拦截属性的读取操作。
const proxy = new Proxy(target, handler); //创建了一个代理对象 proxy，它代理了 target 对象，并且使用了定义的 handler 对象作为其处理程序。
console.log(proxy.foo); // bar!!! : 打印了代理对象 proxy 的属性 foo 的值，并在值后添加了装饰符 '!!!'。
console.log(target.foo); // bar 打印了原始对象 target 的属性 foo 的值，没有添加装饰符。
console.log(proxy.baz); // qux 打印了代理对象 proxy 的属性 baz 的值，未进行装饰处理，因此输出结果与原始对象相同。
console.log(target.baz); // qux 打印了原始对象 target 的属性 baz 的值，没有添加装饰符。
```

### 捕获器不变式

Trap Invariants.

```js
//使用捕获器几乎可以改变所有基本方法的行为，但也不是没有限制。根据 ECMAScript 规范，每个捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循“捕获器不变式”（trap invariant）。捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为。
//比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的值时，会抛出 TypeError：
const target = {}; //一个空对象 target，它将成为代理的目标对象
Object.defineProperty(target, 'foo', { 
 configurable: false, 
 writable: false, 
 value: 'bar' 
}); // 使用 Object.defineProperty 方法在 target 对象上定义了一个名为 foo 的属性。这个属性是不可配置的（configurable: false），不可写的（writable: false），且值为 'bar'。
const handler = { 
 get() { 
 return 'qux'; 
 } 
}; // 创建一个名为 handler 的对象，其中包含了一个 get 方法。这个方法用于拦截属性的读取操作，并始终返回字符串 'qux'。
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); 
// TypeError 由于原始对象 target 上的属性 foo 是不可写的，且没有指定 get 方法，因此在代理对象 proxy 上访问属性 foo 时，会触发一个类型错误（TypeError）。

//创建了一个代理对象 proxy，该代理对象拦截了对原始对象 target 上属性 foo 的读取操作。但由于原始对象 target 上的 foo 属性是不可写的，且没有指定 get 方法，因此尝试访问代理对象 proxy 的 foo 属性会导致类型错误。
```

### 可撤销代理

Revocable Proxies.

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
