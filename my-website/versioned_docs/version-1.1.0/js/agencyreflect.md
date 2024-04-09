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
//最简单的代理是空代理，即除了作为一个抽象的目标对象，什么也不做。默认情况下，在代理对象上执行的所有操作都会无障碍地传播到目标对象。因此，在任何可以使用目标对象的地方，都可以通过同样的方式来使用与之关联的代理对象。    代理是使用 Proxy 构造函数创建的。这个构造函数接收两个参数：目标对象和处理程序对象。缺少其中任何一个参数都会抛出 TypeError。要创建空代理，可以传一个简单的对象字面量作为处理程序对象，从而让所有操作畅通无阻地抵达目标对象。 在代理对象上执行的任何操作实际上都会应用到目标对象。唯一可感知的不同就是代码中操作的是代理对象: 没懂???
const target = { 
 id: 'target' 
}; 
const handler = {}; 
const proxy = new Proxy(target, handler); 

 //id 属性会访问同一个值
console.log(target.id); // target 
console.log(proxy.id); // target 

// 给目标属性赋值会反映在两个对象上 因为两个对象访问的是同一个值
target.id = 'foo'; 
console.log(target.id); // foo 
console.log(proxy.id);//  foo 

// 给代理属性赋值会反映在两个对象上 因为这个赋值会转移到目标对象
proxy.id = 'bar'; 
console.log(target.id); // bar 
console.log(proxy.id); // bar 

// hasOwnProperty()方法在两个地方 都会应用到目标对象
console.log(target.hasOwnProperty('id'));  true 
console.log(proxy.hasOwnProperty('id'));  true 

// 大Proxy.prototype 是 undefined  因此不能使用 instanceof 操作符. 这里没懂???
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check 
console.log(proxy instanceof Proxy);  //TypeError: Function has non-object prototype 'undefined' in instanceof check 

// 严格相等可以用来区分代理和目标
console.log(target === proxy);  false
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
  //捕获器在处理程序对象中以方法名为键
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
console.log(target['foo']);//  bar 
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
 true 
 foo 
 true 

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
 return Reflect.get(...arguments);//arguement展开操作符，表示将传递给 get 方法的所有参数展开为一个数组。  它是一个包含了一个 get 方法的对象，用于定义代理对象的行为。在此例中，get 方法使用了 Reflect.get 方法来获取属性值，Reflect.get 方法的参数和返回值与 Proxy 对象的 get 方法一致。
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo);  bar 
console.log(target.foo);  bar 

//甚至还可以写得更简洁一些：
const target = { 
 foo: 'bar' 
};
const handler = { 
 get: Reflect.get 
};// reflect.get后面直接无了
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo);//  bar 
```

```js
//事实上，如果真想创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理，那么甚至不需要定义处理程序对象：
const target = { 
 foo: 'bar' 
}; 
const proxy = new Proxy(target, Reflect); //创建了一个代理对象 proxy，它代理了 target 对象，并使用 Reflect 对象作为其处理程序。
console.log(proxy.foo);//  bar 
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
 let decoration = '';  //声明一个名为 decoration 的变量，用于存储装饰符。
 if (property === 'foo') { 
 decoration = '!!!'; 
 } //如果被访问的属性是 'foo'，则将装饰符设置为 '!!!'，用于后续对属性值的装饰。
 return Reflect.get(...arguments) + decoration; //用 Reflect.get 方法获取目标对象上指定属性的值，并将装饰符添加到属性值后返回。
 } //在 handler 对象中定义的 get 方法，接收三个参数：trapTarget 表示被代理的目标对象，property 表示被访问的属性名，receiver 表示代理对象本身。
}; //定义了一个名为 handler 的常量，其值是一个对象，其中包含了一个 get 方法，该方法用于拦截属性的读取操作。
const proxy = new Proxy(target, handler);// 创建了一个代理对象 proxy，它代理了 target 对象，并且使用了定义的 handler 对象作为其处理程序。
console.log(proxy.foo);//  bar!!! : 打印了代理对象 proxy 的属性 foo 的值，并在值后添加了装饰符 '!!!'。
console.log(target.foo);//  bar 打印了原始对象 target 的属性 foo 的值，没有添加装饰符。
console.log(proxy.baz); // qux 打印了代理对象 proxy 的属性 baz 的值，未进行装饰处理，因此输出结果与原始对象相同。
console.log(target.baz);//  qux 打印了原始对象 target 的属性 baz 的值，没有添加装饰符。
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
 //TypeError 由于原始对象 target 上的属性 foo 是不可写的，且没有指定 get 方法，因此在代理对象 proxy 上访问属性 foo 时，会触发一个类型错误（TypeError）。

//创建了一个代理对象 proxy，该代理对象拦截了对原始对象 target 上属性 foo 的读取操作。但由于原始对象 target 上的 foo 属性是不可写的，且没有指定 get 方法，因此尝试访问代理对象 proxy 的 foo 属性会导致类型错误。
```

### 可撤销代理

Revocable Proxies.

```js
//有时候可能需要中断代理对象与目标对象之间的联系。对于使用 new Proxy()创建的普通代理来说，这种联系会在代理对象的生命周期内一直持续存在。Proxy 也暴露了 revocable()方法，这个方法支持撤销代理对象与目标对象的关联。撤销代理的操作是不可逆的。而且，撤销函数（revoke()）是幂等的，调用多少次的结果都一样。撤销代理之后再调用代理会抛出 TypeError。撤销函数和代理对象是在实例化时同时生成的：
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get() { 
 return 'intercepted';//其中包含一个 get 方法，用于拦截属性的读取操作，并始终返回字符串 'intercepted'
 } 
}; 
const { proxy, revoke } = Proxy.revocable(target, handler); //使用解构赋值，从函数 Proxy.revocable 的返回值中提取两个属性，分别赋值给变量 proxy 和 revoke。.使用 Proxy.revocable 方法创建了一个可撤销的代理对象 proxy，并将其与目标对象 target 和处理程序对象 handler 相关联。Proxy.revocable 方法返回一个包含 proxy 和 revoke 函数的对象，可以用于撤销代理对象。
console.log(proxy.foo); // intercepted 
console.log(target.foo);  //bar 
revoke(); 
console.log(proxy.foo);  //TypeError  尝试访问已经撤销的代理对象 proxy 的属性 foo。由于代理对象已经被撤销，尝试访问其属性会触发一个类型错误（TypeError）
```

### 实用反射API

Utility of the Reflect API.反射api的使用.

```js
// 某些情况下应该优先使用反射 API，有一些理由的
// 1. 反射 API 与对象 API 
//  在使用反射 API 时，要记住：
//  (1) 反射 API 并不限于捕获处理程序；
//  (2) 大多数反射 API 方法在 Object 类型上有对应的方法。
//  通常，Object 上的方法适用于通用程序，而反射方法适用于细粒度的对象控制与操作。
// 2. 状态标记
//  很多反射方法返回称作“状态标记”的布尔值，表示意图执行的操作是否成功。有时候，状态标记 比那些返回修改后的对象或者抛出错误（取决于方法）的反射 API 方法更有用。例如，可以使用反射API 对下面的代码进行重构：
 
//  初始代码 
const o = {}; 
try { 
 Object.defineProperty(o, 'foo', 'bar');
  //在对象 o 上定义属性 'foo'，属性值为 'bar'。然而，Object.defineProperty 方法的第三个参数应该是一个包含属性描述符的对象，而不是属性的值。因此，这里会抛出一个异常。由于异常被捕获，所以会执行 catch 块中的代码，打印 'failure'。

  //举例
  Object.defineProperty(obj, 'readOnlyProp', {
  value: 'This is a read-only property', // 属性值
  writable: false, // 设置为只读
  enumerable: true, // 可枚举
  configurable: true // 可配置
});
//举例

  //第三个参数应该是一个描述属性的对象。这个对象可以包含以下属性：configurable（可配置性）：布尔值，表示属性是否可被删除或修改特性，默认为false。enumerable（可枚举性）：布尔值，表示属性是否可被枚举，默认为false。value（属性值）：任意类型的值，表示属性的值，默认为undefined。writable（可写性）：布尔值，表示属性是否可被赋值运算符改变，默认为false。get（getter函数）：函数，表示获取属性值的方法，默认为undefined。set（setter函数）：函数，表示设置属性值的方法，默认为undefined。
 console.log('success'); 
} catch(e) { 
 console.log('failure');
 //如果 try 块中发生异常，将执行的代码块，并将异常信息存储在变量 e 中。 
}
//在定义新属性时如果发生问题，Reflect.defineProperty()会返回 false，而不是抛出错误。因此使用这个反射方法可以这样重构上面的代码：

// 重构后的代码
const o = {}; 
if(Reflect.defineProperty(o, 'foo', {value: 'bar'}))
 //包含属性描述符的对象，其中 value 指定了属性的值
{ 
 console.log('success'); 
} else { 
 console.log('failure'); 
} 
// 以下反射方法都会提供状态标记：
//   Reflect.defineProperty()
//   Reflect.preventExtensions()
//   Reflect.setPrototypeOf()
//   Reflect.set()
//   Reflect.deleteProperty()

// 3. 用一等函数替代操作符
// 以下反射方法提供只有通过操作符才能完成的操作。
//   Reflect.get()：可以替代对象属性访问操作符。
//   Reflect.set()：可以替代=赋值操作符。
//   Reflect.has()：可以替代 in 操作符或 with()。
//   Reflect.deleteProperty()：可以替代 delete 操作符。
//   Reflect.construct()：可以替代 new 操作符。
// 4. 安全地应用函数
// 在通过 apply 方法调用函数时，被调用的函数可能也定义了自己的 apply 属性（虽然可能性极小）。
// 为绕过这个问题，可以使用定义在 Function 原型上的 apply 方法，比如：Function.prototype.apply.call(myFunc, thisVal, argumentList); 
// 这种可怕的代码完全可以使用 Reflect.apply 来避免：Reflect.apply(myFunc, thisVal, argumentsList);
```

### 代理另一个代理

Proxying a Proxy.

```js
//代理可以拦截反射 API 的操作，而这意味着完全可以创建一个代理，通过它去代理另一个代理。这样就可以在一个目标对象之上构建多层拦截网：
const target = { 
 foo: 'bar' 
}; 
const firstProxy = new Proxy(target, { 
 get() { 
 console.log('first proxy'); 
 return Reflect.get(...arguments); 
 } 
});
 //创建第一个代理 firstProxy，将其代理目标设置为 target，并定义了一个捕获器函数用于拦截对属性的访问。创建一个代理对象，代理目标为 target，并传入一个捕获器对象作为参数。 在捕获器对象中定义了一个 get 捕获器，用于拦截属性的读取操作。当对代理对象的属性进行读取操作时，将执行此捕获器中的代码块。 在捕获器中打印 'first proxy'。 使用 Reflect.get() 方法继续访问原始对象 target 的属性。
const secondProxy = new Proxy(firstProxy, { 
 get() { 
 console.log('second proxy'); 
 return Reflect.get(...arguments); 
 } 
}); 
console.log(secondProxy.foo); 
// second proxy 
// first proxy 
// bar 

//一段一段的代理出来???
```

### 代理的问题与不足

Proxy Considerations and Shortcomings.
代理是在 ECMAScript 现有基础之上构建起来的一套新 API，因此其实现已经尽力做到最好了。很大程度上，代理作为对象的虚拟层可以正常使用。但在某些情况下，代理也不能与现在的 ECMAScript机制很好地协同。

#### 代理中的this

```js
//代理潜在的一个问题来源是 this 值。我们知道，方法中的 this 通常指向调用这个方法的对象：
const target = { 
 thisValEqualsProxy() { 
 return this === proxy; 
 } 
} 
const proxy = new Proxy(target, {}); //创建一个代理对象 proxy，代理目标为 target，并且没有定义任何捕获器。
console.log(target.thisValEqualsProxy()); // false 调用 target 对象的 thisValEqualsProxy 方法。此时方法内部的 this 指向的是调用该方法的对象，即 target。方法内部判断 this === proxy，由于此时的 this 是 target，而 proxy 是另一个对象，因此返回值为 false。
console.log(proxy.thisValEqualsProxy()); // true  调用 proxy 对象的 thisValEqualsProxy 方法。此时方法内部的 this 指向的是调用该方法的对象，即 proxy。方法内部判断 this === proxy，由于此时的 this 正是 proxy 对象本身，因此返回值为 true。
//从直觉上讲，这样完全没有问题：调用代理上的任何方法，比如 proxy.outerMethod()，而这个方法进而又会调用另一个方法，如 this.innerMethod()，实际上都会调用 proxy.innerMethod()。多数情况下，这是符合预期的行为。可是，如果目标对象依赖于对象标识，那就可能碰到意料之外的问题。
```

```js
//通过 WeakMap 保存私有变量的例子,以下是它的简化版：
const wm = new WeakMap(); //创建了一个新的弱映射 wm，用于存储对象和用户 ID 的对应关系。
class User { 
 constructor(userId)//在 User 类中定义了一个构造函数，接收一个参数 userId，用于初始化用户对象。
  { 
 wm.set(this, userId); 
 } //将当前对象 this 和 userId 关联存储到弱映射 wm 中，以便后续可以通过对象获取对应的用户 ID。
 set id(userId) { 
 wm.set(this, userId); 
 } //定义了一个名为 id 的 setter 方法，用于设置用户 ID。将当前对象 this 和 userId 关联存储到弱映射 wm 中，以更新或设置对象的用户 ID。
 get id() { 
 return wm.get(this); 
 } //: 定义了一个名为 id 的 getter 方法，用于获取用户 ID。返回弱映射 wm 中与当前对象 this 关联的用户 ID。
} 
//这段代码实现了一个 User 类，该类具有设置和获取用户 ID 的功能，并且使用了弱映射来存储对象和用户 ID 的对应关系。使用弱映射可以确保在没有其他引用时自动释放对象及其对应的用户 ID，避免了内存泄漏问题。看不懂???

//由于这个实现依赖 User 实例的对象标识，在这个实例被代理的情况下就会出问题：
const user = new User(123); //创建一个名为 user 的 User 类实例，并传入用户 ID 为 123，这个实例代表了一个具体的用户对象。
console.log(user.id); // 123 访问 user 对象的 id 属性，将输出用户 ID，即 123
const userInstanceProxy = new Proxy(user, {}); //创建了一个代理对象 userInstanceProxy，该代理对象代理了 user 对象。
console.log(userInstanceProxy.id); // undefined  尝试访问 userInstanceProxy 对象的 id 属性，!!!由于代理对象中的处理器为空对象!!!，未提供针对 id 属性的处理逻辑，因此返回 undefined。..在这段代码中，由于代理对象的处理器为空对象，未提供对 id 属性的任何处理逻辑，因此无法通过代理对象访问到原始对象的 id 属性，导致返回 undefined。
//这是因为 User 实例一开始使用目标对象作为 WeakMap 的键，代理对象却尝试从!!!自身!!!取得这个实例。什么意思???

//要解决这个问题，就需要!!!重新配置代理!!!，把代理 User 实例改为代理 User 类本身。之后再创建代理的实例就会以代理实例作为 WeakMap 的键了：
const UserClassProxy = new Proxy(User, {}); //创建了一个代理类 UserClassProxy，代理了 User 类。由于代理处理器为空对象，因此没有提供对 User 类的任何处理逻辑。
const proxyUser = new UserClassProxy(456); //创建了一个 User 类的代理对象 proxyUser，传入用户 ID 为 456。由于代理类没有提供构造函数的处理逻辑，因此会调用原始类 User 的构造函数，并创建一个新的用户对象，但在创建后并没有将其与用户 ID 关联起来。
console.log(proxyUser.id); //456 尝试访问 proxyUser 对象的 id 属性。由于在构造函数中并没有将代理对象与用户 ID 关联起来，所以返回 undefined。
//由于代理类的处理器为空对象，没有提供对构造函数的任何处理逻辑，因此代理对象无法正确地设置用户 ID，导致无法通过代理对象访问到正确的用户 ID，返回 undefined。

//什么意思???不懂???
```

#### 代理与内部槽位

roxies and Internal Slots

```js
//代理与内置引用类型（比如 Array）的实例通常可以很好地协同，但有些 ECMAScript 内置类型可能会依赖代理无法控制的机制，结果导致在代理上调用某些方法会出错。一个典型的例子就是 Date 类型。根据 ECMAScript 规范，Date 类型方法的执行依赖 this 值上的内部槽位[[NumberDate]]。代理对象上不存在这个内部槽位，而且这个内部槽位的值也不能通过普通的 get()和 set()操作访问到，于是代理拦截后本应转发给目标对象的方法会抛出 TypeError：
const target = new Date(); 
const proxy = new Proxy(target, {}); 
console.log(proxy instanceof Date); // true 
proxy.getDate(); // TypeError: 'this' is not a Date object 
//是实例吗?是 但是代理会出错
```

## 代理捕获器与反射方法

PROXY TRAPS AND REFLECT METHODS.
代理可以捕获 13 种不同的基本操作。这些操作有各自不同的反射 API 方法、参数、关联 ECMAScript操作和不变式。
正如前面示例所展示的，有几种不同的 JavaScript 操作会调用同一个捕获器处理程序。不过，对于在代理对象上执行的任何一种操作，只会有一个捕获处理程序被调用。不会存在重复捕获的情况。
只要在代理上调用，所有捕获器都会拦截它们对应的反射 API 操作。All traps will also intercept their corresponding Reflect API operations if they are invoked on
the proxy.
代理可以捕获不同的操作;对于代理对象,只有一个捕获处理程序会被调\无重复捕获.只要在代理上调用,所有捕获器都会拦截他们对应的反射api操作.

### get()

```js
//get()捕获器会在获取属性值的操作中被调用。对应的反射 API 方法为 Reflect.get()。
//get就是获取属性值的操作,对应api是reflect.get
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 get(target, property, receiver) { 
 console.log('get()'); 
 return Reflect.get(...arguments) 
 } 
}); //代理对象 proxy   代理对象的目标对象 myTarget    !当!属性被获取时，会输出 'get()' 并返回 Reflect.get(...arguments) 的结果，即返回目标对象的属性值。
proxy.foo; 
// get()   尝试获取代理对象 proxy 的 foo 属性。由于代理对象的属性不存在，因此触发了代理处理器中的 get 捕获器。捕获器中会输出 'get()'，然后调用 Reflect.get(...arguments) 获取目标对象 myTarget 的属性值。由于目标对象的 foo 属性不存在，所以最终返回 undefined
```

```js
1. 返回值
返回值无限制。
2. 拦截的操作
 proxy.property
 proxy[property]
 Object.create(proxy)[property]
 Reflect.get(proxy, property, receiver)
3. 捕获器处理程序参数
 target：目标对象。
 property：引用的目标对象上的字符串键\符号键属性。①
 receiver：代理对象或继承代理对象的对象。
4. 捕获器不变式
如果 target.property 不可写且不可配置，则处理程序返回的值必须与 target.property 匹配。
如果 target.property 不可配置且[[Get]]特性为 undefined，处理程序的返回值也必须是 undefined。
```

#### set()

```js
//set()捕获器会在设置属性值的操作中被调用。对应的反射 API 方法为 Reflect.set()。
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 set(target, property, value, receiver) { 
 console.log('set()'); 
 return Reflect.set(...arguments) 
 } 
}); 
proxy.foo = 'bar'; 
// set()  尝试将代理对象 proxy 的 foo 属性设置为 'bar'。由于这是一个属性设置操作，因此会触发代理处理器中的 set 捕获器。捕获器中会输出 'set()'，然后调用 Reflect.set(...arguments) 将属性设置到目标对象 myTarget 上，最终完成属性的设置操作。
```

```js
1. 返回值
返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError。
2. 拦截的操作
 proxy.property = value
 proxy[property] = value
 Object.create(proxy)[property] = value
 Reflect.set(proxy, property, value, receiver)
3. 捕获器处理程序参数
 target：目标对象。给谁
 property：引用的目标对象上的字符串键\符号键属性。给什么属性
 value：要赋给属性的值。给的属性的值
 receiver：接收最初赋值的对象。谁转接,谁先接住
4. 捕获器不变式
如果 target.property 不可写且不可配置，则不能修改目标属性的值。
如果 target.property 不可配置且[[Set]]特性为 undefined，则不能修改目标属性的值。
在严格模式下，处理程序中返回 false 会抛出 TypeError
```

#### has()

```js
//has()捕获器会在 in 操作符中被调用。对应的反射 API 方法为 Reflect.has()。
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 has(target, property) { 
 console.log('has()'); 
 return Reflect.has(...arguments) 
 } 
}); //创建了一个代理对象 proxy，代理了目标对象 myTarget。在代理处理器中定义了 has 捕获器，用于捕获对代理对象的 in 操作。当使用 in 运算符检查属性存在性时，会输出 'has()' 并调用 Reflect.has(...arguments) 来判断目标对象是否具有该属性
'foo' in proxy; 
// has() 检查代理对象 proxy 是否具有名为 'foo' 的属性。这个操作会触发代理处理器中的 has 捕获器。捕获器中会输出 'has()'，然后调用 Reflect.has(...arguments) 来判断目标对象 myTarget 是否具有名为 'foo' 的属性。

1. 返回值
has()必须返回布尔值，表示属性是否存在。返回非布尔值会被转型为布尔值。 has表示有吗
2. 拦截的操作
 property in proxy
 property in Object.create(proxy)
 with(proxy) {(property);}
 Reflect.has(proxy, property)
3. 捕获器处理程序参数
 target：目标对象。
 property：引用的目标对象上的字符串键属性。
4. 捕获器不变式
如果 target.property 存在且不可配置，则处理程序必须返回 true。
如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true。
```

### defineProperty()

```js
//defineProperty()捕获器会在 Object.defineProperty()中被调用。对应的反射 API 方法为Reflect.defineProperty()。
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 defineProperty(target, property, descriptor) { 
 console.log('defineProperty()'); 
 return Reflect.defineProperty(...arguments) 
 } 
}); 
//创建了一个代理对象 proxy，代理了目标对象 myTarget。在代理处理器中定义了 defineProperty 捕获器，用于捕获对代理对象的属性定义操作。当使用 Object.defineProperty() 定义属性时，会输出 'defineProperty()' 并调用 Reflect.defineProperty(...arguments) 来在目标对象上定义属性。
Object.defineProperty(proxy, 'foo', { value: 'bar' }); 
// defineProperty()   使用 Object.defineProperty() 在代理对象 proxy 上定义了一个名为 'foo'，值为 'bar' 的新属性。这个操作会触发代理处理器中的 defineProperty 捕获器。捕获器中会输出 'defineProperty()'，然后调用 Reflect.defineProperty(...arguments) 来在目标对象 myTarget 上定义属性。

1. 返回值
defineProperty()必须返回布尔值，表示属性是否成功定义。返回非布尔值会被转型为布尔值。
2. 拦截的操作
 Object.defineProperty(proxy, property, descriptor)
 Reflect.defineProperty(proxy, property, descriptor)
3. 捕获器处理程序参数
 target：目标对象。 抓什么
 property：引用的目标对象上的字符串键属性。抓的对象的属性
 descriptor：包含可选的 enumerable、configurable、writable、value、get 和 set定义的对象。 抓的属性的描述项
4. 捕获器不变式
如果目标对象不可扩展，则无法定义属性。
如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性。
如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性。

//没搞懂,干什么用的???
//defineProperty() 方法通常用于在对象上定义新属性或修改现有属性的属性描述符。添加新属性并设置属性描述符;修改属性的特性;模拟类成员的私有属性;拦截对属性的访问或设置.
```

### getOwnPropertyDescriptor()

```js
//getOwnPropertyDescriptor()捕获器会在 Object.getOwnPropertyDescriptor()中被调用。对应的反射 API 方法为 Reflect.getOwnPropertyDescriptor()。
//getownproperty用于获取指定对象上属性的属性描述符即descriptor。它返回一个对象，该对象描述了所请求属性的各种属性（如值、可写性、可枚举性、可配置性等）。其常见的使用场景包括但不限于：检查属性的特性,看是否可写可枚举等;控制对象属性的访问权限,即将可写变成布尔值做if的条件;序列化对象属性;模拟私有属性.
const myTarget = {}; //创建一个空对象 myTarget，作为代理的目标对象。
const proxy = new Proxy(myTarget, { 
 getOwnPropertyDescriptor(target, property) { 
 console.log('getOwnPropertyDescriptor()'); //在代理对象的处理器中定义了一个 getOwnPropertyDescriptor 方法，用于拦截对代理对象属性描述符的获取操作。该方法接收三个参数：target：代理的目标对象，即原始对象 myTarget。property：要获取属性描述符的属性名。
 return Reflect.getOwnPropertyDescriptor(...arguments) //调用 Reflect.getOwnPropertyDescriptor 方法获取目标对象上指定属性的属性描述符，并返回结果。这里使用了展开语法 ...arguments 将函数参数传递给 Reflect.getOwnPropertyDescriptor 方法。
 } 
}); //使用 Proxy 构造函数创建一个代理对象 proxy，并指定了代理的行为，其中包含一个 getOwnPropertyDescriptor 方法的处理器。
Object.getOwnPropertyDescriptor(proxy, 'foo'); //调用 Object.getOwnPropertyDescriptor 方法获取代理对象 proxy 上属性 'foo' 的属性描述符。
// getOwnPropertyDescriptor() 
//当尝试获取代理对象上的属性描述符时，会触发代理对象的 getOwnPropertyDescriptor 方法，该方法会打印一条日志并调用 Reflect.getOwnPropertyDescriptor 方法获取目标对象上属性的属性描述符，并返回给调用者。

1. 返回值
getOwnPropertyDescriptor()必须返回对象，或者在属性不存在时返回 undefined。
2. 拦截的操作
 Object.getOwnPropertyDescriptor(proxy, property)
 Reflect.getOwnPropertyDescriptor(proxy, property)
3. 捕获器处理程序参数
 target：目标对象。
 property：引用的目标对象上的字符串键属性。
4. 捕获器不变式
如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的
对象。
如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象。
如果自有的 target.property 存在且 target 不可扩展，则处理程序必须返回一个表示该属性存
在的对象。
如果 target.property 不存在且 target 不可扩展，则处理程序必须返回 undefined 表示该属
性不存在。
如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象。
```

### ownKey()

```js
//ownKeys()捕获器会在 Object.keys()及类似方法中被调用。对应的反射 API 方法为 Reflect. ownKeys()。
//ownKeys() 方法的主要使用场景是拦截对象的属性键的操作，包括获取对象自身可枚举和不可枚举的属性键。这可以用于实现一些特定的行为，例如隐藏某些属性、动态生成属性等
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 ownKeys(target) { 
 console.log('ownKeys()'); 
 return Reflect.ownKeys(...arguments) 
 } 
}); 
Object.keys(proxy); 
// ownKeys() 

1. 返回值
ownKeys()必须返回包含字符串或符号的可枚举对象。
2. 拦截的操作
 Object.getOwnPropertyNames(proxy)
 Object.getOwnPropertySymbols(proxy)
 Object.keys(proxy)
 Reflect.ownKeys(proxy)
//例如
const proxy = new Proxy(sensitiveData, {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter(key => !hiddenProperties.includes(key));
  }
});
3. 捕获器处理程序参数
 target：目标对象。
4. 捕获器不变式
返回的可枚举对象必须包含 target 的所有不可配置的自有属性。
如果 target 不可扩展，则返回可枚举对象必须准确地包含自有属性键。
//不懂,怎么用???
```

```js
//filter(key => !hiddenProperties.includes(key)): 使用 filter 方法遍历所有属性键，并根据 hiddenProperties 数组中是否包含当前属性键来决定是否保留该属性键。如果当前属性键不在 hiddenProperties 数组中，filter 方法会保留该属性键，否则将其过滤掉。
```

### getPrototypeOf()

```js
//getPrototypeOf()捕获器会在 Object.getPrototypeOf()中被调用。对应的反射 API 方法为Reflect.getPrototypeOf()。
//`getPrototypeOf()` 方法主要用于获取指定对象的原型（prototype）。1. 原型链操作：可以用于检查对象的原型链结构，从而进行相关操作。例如，可以使用 `getPrototypeOf()` 方法来检查对象的原型是否符合预期，并基于不同的原型执行不同的逻辑。2. 对象类型判断：可以用于确定对象的类型。在 JavaScript 中，对象的类型信息通常存储在其原型对象中。通过 `getPrototypeOf()` 方法可以获取对象的原型，进而判断其类型。3. 对象方法拦截：在代理对象中，可以通过拦截 `getPrototypeOf()` 方法来修改原型的返回值，从而实现对对象类型的动态控制或修改。4. 兼容性处理：在某些情况下，可能需要检查对象的原型以确保代码在不同环境下的兼容性。通过 `getPrototypeOf()` 方法可以获取对象的原型并进行必要的兼容性处理。具体的实际场景可能包括以下几种情况：- 在编写库或框架时，可能需要检查对象的原型来确保正确的类型检查和处理。- 在调试或测试过程中，可能需要检查对象的原型以排查类型相关的问题。- 在代理对象中，可能需要拦截 `getPrototypeOf()` 方法来动态修改对象的原型，以实现特定的行为或逻辑。
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 getPrototypeOf(target) { 
 console.log('getPrototypeOf()'); 
 return Reflect.getPrototypeOf(...arguments) 
 } 
}); 
Object.getPrototypeOf(proxy); 
// getPrototypeOf() 

//检查原型链结构
// 定义一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 在原型上定义一个方法
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};
// 创建一个 Person 对象
const john = new Person('John', 30);
// 获取 john 对象的原型
const prototype = Object.getPrototypeOf(john);
// 打印原型对象
console.log(prototype); // 输出：Person { sayHello: [Function] }在这个示例中，首先定义了一个 Person 构造函数，然后在其原型上定义了一个 sayHello 方法。接着，我们创建了一个 john 对象，并使用 getPrototypeOf() 方法获取了它的原型对象，最后打印出了原型对象的内容。

1. 返回值
getPrototypeOf()必须返回对象或 null。
2. 拦截的操作
 Object.getPrototypeOf(proxy)
 Reflect.getPrototypeOf(proxy)
 proxy.__proto__
 Object.prototype.isPrototypeOf(proxy)
 proxy instanceof Object
3. 捕获器处理程序参数
 target：目标对象。
4. 捕获器不变式
如果 target 不可扩展，则 Object.getPrototypeOf(proxy)唯一有效的返回值就是 Object. 
getPrototypeOf(target)的返回值
```

### setPrototypeOf()

```js
//setPrototypeOf()捕获器会在 Object.setPrototypeOf()中被调用。对应的反射 API 方法为Reflect.setPrototypeOf()。修改对象的原型链;创建对象代理;对象继承.
// 示例 1: 修改对象的原型链
const person = {
  greet() {
    console.log('Hello!');
  }
};
const student = {};
Object.setPrototypeOf(student, person);
student.greet(); // 输出：Hello!
// 示例 2: 创建对象代理
const originalObj = {
  foo: 'bar'
};
const handler = {
  get(target, property) {
    console.log(`Getting property "${property}"`);
    return Reflect.get(target, property);
  }
};
const proxy = new Proxy({}, handler);
Object.setPrototypeOf(originalObj, proxy);
console.log(originalObj.foo); // 输出：Getting property "foo"，然后输出：bar
//访问原始对象 originalObj 的 foo 属性。由于原始对象的原型被设置为代理对象，因此会触发代理处理程序中的 get 方法。在 get 方法中打印了属性名，并返回原始对象上对应属性的值。因此，在控制台中会打印出 Getting property "foo"，并且输出原始对象 originalObj 中 foo 属性的值 'bar'。
// 示例 3: 对象继承
class Animal {
  speak() {
    console.log('Animal speaks');
  }
}
class Dog {
  bark() {
    console.log('Dog barks');
  }
}
// 继承 Animal 类的 Dog 类,逗号前面是对象,后面是引用的对象,即把后面的移到前面来
Object.setPrototypeOf(Dog.prototype, Animal.prototype);
const dog = new Dog();
dog.speak(); // 输出：Animal speaks
dog.bark();  // 输出：Dog barks


const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 setPrototypeOf(target, prototype) { 
 console.log('setPrototypeOf()'); 
 return Reflect.setPrototypeOf(...arguments) 
 } 
}); 
Object.setPrototypeOf(proxy, Object); 
// setPrototypeOf() 

1. 返回值
setPrototypeOf()必须返回布尔值，表示原型赋值是否成功。返回非布尔值会被转型为布尔值。
2. 拦截的操作
 Object.setPrototypeOf(proxy)
 Reflect.setPrototypeOf(proxy)
3. 捕获器处理程序参数
 target：目标对象。
 prototype：target 的替代原型，如果是顶级原型则为 null。
4. 捕获器不变式
如果 target 不可扩展，则唯一有效的 prototype 参数就是 Object.getPrototypeOf(target)
的返回值。
```

### isExtensible()

```js
//isExtensible()捕获器会在 Object.isExtensible()中被调用。对应的反射 API 方法为Reflect.isExtensible()。
//`isExtensible()` 方法用于检查对象是否可扩展，即是否可以向对象添加新的属性。其返回值为布尔类型，如果对象是可扩展的，则返回 `true`；否则返回 `false`。以下是 `isExtensible()` 方法的一些使用场景和示例代码：
//1. **动态对象**：在需要动态添加属性的情况下，可以使用 `isExtensible()` 方法检查对象是否可扩展，以决定是否可以添加新的属性。返回布尔值
const obj = { name: 'John' };
console.log(Object.isExtensible(obj)); // true
// 在需要时可以向对象动态添加新的属性
if (Object.isExtensible(obj)) {
  obj.age = 30;
}
console.log(obj); // { name: 'John', age: 30 }
//2. **对象保护**：在一些情况下，需要确保对象不被修改，可以在代码中使用 `isExtensible()` 方法来验证对象的可扩展性，并采取相应的防护措施。   首先创建了一个对象 frozenObj，并使用 Object.freeze() 方法将其冻结，使其不可扩展。然后使用 Object.isExtensible() 方法检查对象是否可扩展，由于对象已被冻结，因此返回值为 false。
const frozenObj = { name: 'Jane' };
Object.freeze(frozenObj);//冻住了,不可扩展了
console.log(Object.isExtensible(frozenObj)); // false
// 在尝试添加新属性时，会抛出错误或者忽略操作
if (Object.isExtensible(frozenObj)) {
  frozenObj.age = 25; // 不会执行
}
console.log(frozenObj); // { name: 'Jane' }
//3. **对象属性验证**：在某些场景下，需要对对象进行属性验证，可以使用 `isExtensible()` 方法判断对象是否可以动态添加新属性，以便进行进一步的处理。
function validateObject(obj) {
  if (!Object.isExtensible(obj)) {
    console.error('Object is not extensible.');
    return false;
  }
  // 进行其他属性验证操作
  return true;
}
const myObj = { name: 'Alice' };
validateObject(myObj); // true
Object.preventExtensions(myObj);//使用 Object.preventExtensions() 方法使 myObj 对象不可扩展.
validateObject(myObj); // false，对象不可扩展
//这些示例说明了 `isExtensible()` 方法在动态属性添加、对象保护和属性验证等场景中的应用。

const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 isExtensible(target) { 
 console.log('isExtensible()'); 
return Reflect.isExtensible(...arguments) 
 } 
}); 
Object.isExtensible(proxy); 
// isExtensible() 

1. 返回值
isExtensible()必须返回布尔值，表示 target 是否可扩展。返回非布尔值会被转型为布尔值。
2. 拦截的操作
 Object.isExtensible(proxy)
 Reflect.isExtensible(proxy)
3. 捕获器处理程序参数
 target：目标对象。
4. 捕获器不变式
如果 target 可扩展，则处理程序必须返回 true。
如果 target 不可扩展，则处理程序必须返回 false。
```

### preventExtensions()

```js
//preventExtensions()捕获器会在 Object.preventExtensions()中被调用。对应的反射 API方法为 Reflect.preventExtensions()。
//`Object.preventExtensions()` 方法用于禁止一个对象添加新属性和新方法。一旦调用了该方法，任何后续的尝试在该对象上添加新属性或方法都将失败。这个方法返回被操作对象本身。
//1. **保护对象不被修改：**   
let person = { name: 'Alice' };
Object.preventExtensions(person);
// 尝试添加新属性
person.age = 30;
console.log(person); // 输出: { name: 'Alice' }
在这个例子中，我们先定义了一个对象`person`，然后使用`Object.preventExtensions()`方法禁止了对该对象的扩展。尝试向该对象添加新属性`age`时，操作不会生效，因为对象已经被禁止扩展。

//2. **保护对象不被扩展：**
function readOnly(obj) {
  Object.preventExtensions(obj);//这意味着无法向对象添加新属性
  Object.freeze(obj);//这意味着无法修改对象的现有属性。
}
let book = { title: 'JavaScript Cookbook' };
readOnly(book);
// 尝试添加新属性
book.author = 'John Doe';
console.log(book); // 输出: { title: 'JavaScript Cookbook' }
//在这个例子中，我们定义了一个`readOnly`函数，该函数接受一个对象作为参数，并使用`Object.preventExtensions()`方法禁止对象的扩展，然后使用`Object.freeze()`方法冻结对象，使其属性不可修改。调用`readOnly`函数后，尝试向`book`对象添加新属性`author`时，操作不会生效。
//总的来说，`Object.preventExtensions()`方法通常用于保护对象的结构不被修改，或者用于确保对象的属性不会被意外添加新属性。

const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 preventExtensions(target) { 
 console.log('preventExtensions()'); 
 return Reflect.preventExtensions(...arguments) 
 } 
}); 
Object.preventExtensions(proxy); 
// preventExtensions() 

1. 返回值
preventExtensions()必须返回布尔值，表示 target 是否已经不可扩展。返回非布尔值会被转
型为布尔值。
2. 拦截的操作
 Object.preventExtensions(proxy)
 Reflect.preventExtensions(proxy)
3. 捕获器处理程序参数
 target：目标对象。
4. 捕获器不变式
如果 Object.isExtensible(proxy)是 false，则处理程序必须返回 true。
```

### apply()

```js
//apply()捕获器会在调用函数时中被调用。对应的反射 API 方法为 Reflect.apply()。
//`apply()` 是 JavaScript 中函数对象的一个方法，用于在特定的上下文中调用函数，并传递一个包含参数的数组或类数组对象作为函数的参数。
// 1. 改变函数执行上下文：将函数应用于指定的对象上，以便函数中的 `this` 关键字引用该对象。
function greet() {
  console.log('Hello, ' + this.name);
}
var person = { name: 'Alice' };
// 在 person 对象上调用 greet 函数
greet.apply(person); // 输出：Hello, Alice
// 2. 传递数组作为参数,将数组或类数组对象作为参数传递给函数，并将其解构为独立的参数。
function sum(a, b, c) {
  return a + b + c;
}
var numbers = [1, 2, 3];
// 将数组作为参数传递给 sum 函数
var result = sum.apply(null, numbers);//null作为函数执行的上下文对象，如果不需要改变函数执行上下文，则传入 null。
console.log(result); // 输出：6
//3. 借用其他函数的实现,在一个函数中调用另一个函数，并使用 `apply()` 传递参数，从而实现一些特定的功能。
function Animal(name) {
  this.name = name;
}
function Dog(name) {
  // 调用 Animal 构造函数以初始化 Dog 对象
  Animal.apply(this, arguments);
}//this在函数内部，指代当前对象。arguments: 特殊对象，包含了函数调用时传入的所有参数。
var myDog = new Dog('Buddy');
console.log(myDog.name); // 输出：Buddy

//在上述示例中，`apply()` 方法用于将函数应用于特定的对象上，传递数组作为参数，或者借用其他函数的实现来初始化对象。这些都是 `apply()` 方法的常见用法场景。

const myTarget = () => {};
const proxy = new Proxy(myTarget, {
 apply(target, thisArg, ...argumentsList) {
 console.log('apply()');
 return Reflect.apply(...arguments)
 }
});
proxy();
// apply()

1. 返回值
返回值无限制。
2. 拦截的操作
 proxy(...argumentsList)
 Function.prototype.apply(thisArg, argumentsList)
 Function.prototype.call(thisArg, ...argumentsList)
 Reflect.apply(target, thisArgument, argumentsList)
3. 捕获器处理程序参数
 target：目标对象。
 thisArg：调用函数时的 this 参数。
 argumentsList：调用函数时的参数列表
4. 捕获器不变式
target 必须是一个函数对象。
```

### construct()

```js
//construct()捕获器会在 new 操作符中被调用。对应的反射 API 方法为 Reflect.construct()。
// 定义一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
    // 定义一个方法
  this.sayHello = function() {
    console.log('Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.');
  };
}
// 使用构造函数创建对象
var person1 = new Person('Alice', 30);
var person2 = new Person('Bob', 25);
// 调用对象的方法
person1.sayHello(); // 输出：Hello, my name is Alice and I am 30 years old.
person2.sayHello(); // 输出：Hello, my name is Bob and I am 25 years old.


const myTarget = function() {}; 
const proxy = new Proxy(myTarget, { 
 construct(target, argumentsList, newTarget) { 
 console.log('construct()'); 
 return Reflect.construct(...arguments) 
 } 
}); 
new proxy; 
// construct() 

1. 返回值
construct()必须返回一个对象。
2. 拦截的操作
 new proxy(...argumentsList)
 Reflect.construct(target, argumentsList, newTarget)
3. 捕获器处理程序参数
 target：目标构造函数。
 argumentsList：传给目标构造函数的参数列表。
 newTarget：最初被调用的构造函数。
4. 捕获器不变式
target 必须可以用作构造函数.
```

## 代理模式

PROXY PATTERNS. 使用代理可以在代码中实现一些有用的编程模式。

### 跟踪属性访问

Tracking Property Access.

```js
//通过捕获 get、set 和 has 等操作，可以知道对象属性什么时候被访问、被查询。把实现相应捕获器的某个对象代理放到应用中，可以监控这个对象何时在何处被访问过：
const user = { 
 name: 'Jake' 
}; 
const proxy = new Proxy(user, { 
 get(target, property, receiver) { 
 console.log(`Getting ${property}`); 
 return Reflect.get(...arguments); 
 }, 

 set(target, property, value, receiver) { 
 console.log(`Setting ${property}=${value}`); 
 return Reflect.set(...arguments); 
 } 
}); 
proxy.name; // Getting name  读取了 name 属性。由于 Proxy 拦截了读取操作，因此会输出日志 Getting name，然后返回 user 对象的 name 属性值 'Jake'。
proxy.age = 27; // Setting age=27 对 age 属性进行了赋值操作。由于 Proxy 拦截了赋值操作，因此会输出日志 Setting age=27，然后将 user 对象的 age 属性设置为 27
```

### 隐藏属性

Hidden Properties.

```js
//代理的内部实现对外部代码是不可见的，因此要隐藏目标对象上的属性也轻而易举。比如：
const hiddenProperties = ['foo', 'bar']; 
const targetObject = { 
 foo: 1, 
 bar: 2, 
 baz: 3 
}; 
const proxy = new Proxy(targetObject, { 
 get(target, property) { 
 if (hiddenProperties.includes(property)) { 
 return undefined; 
 } else { 
 return Reflect.get(...arguments); 
 } 
 }, //定义了 get 捕获器，用于拦截属性的读取操作。当读取属性时，会首先检查该属性是否在 hiddenProperties 中，如果在则返回 undefined，否则继续执行原始的读取操作。

 has(target, property) { 
if (hiddenProperties.includes(property)) { 
 return false; 
 } else { 
 return Reflect.has(...arguments); 
 } 
 } //定义了 has 捕获器，用于拦截属性是否存在的操作。当检查属性是否存在时，会首先检查该属性是否在 hiddenProperties 中，如果在则返回 false，否则继续执行原始的检查操作。
}); 
// get() 进行属性读取操作
console.log(proxy.foo); // undefined 
console.log(proxy.bar); // undefined 
console.log(proxy.baz); // 3  由于 foo 和 bar 在 hiddenProperties 中，因此读取它们的值会返回 undefined，而 baz 不在其中，所以返回其原始的值 3。
// has() 进行属性是否存在的检查操作.   由于 foo 和 bar 在 hiddenProperties 中，因此返回 false，而 baz 不在其中，所以返回 true。
console.log('foo' in proxy); // false 
console.log('bar' in proxy); // false 
console.log('baz' in proxy); // true 
```

### 属性验证

Property Validation

```js
//因为所有赋值操作都会触发 set()捕获器，所以可以根据所赋的值决定是允许还是拒绝赋值：
const target = { 
 onlyNumbersGoHere: 0 
}; 

//set 捕获器，用于拦截属性的赋值操作
const proxy = new Proxy(target, { 
 set(target, property, value) { 
 if (typeof value !== 'number') { 
 return false; 
 } else { 
 return Reflect.set(...arguments); 
 } 
 } //当对属性进行赋值时，会首先检查赋给属性的值是否为数字类型，如果不是数字类型，则返回 false，表示拒绝赋值；如果是数字类型，则继续执行原始的赋值操作。
}); 
proxy.onlyNumbersGoHere = 1; 
console.log(proxy.onlyNumbersGoHere); // 1 
proxy.onlyNumbersGoHere = '2'; //进行属性赋值操作。由于赋值的值不是数字类型，而是字符串类型，因此赋值失败，onlyNumbersGoHere 的值仍然为 1。
console.log(proxy.onlyNumbersGoHere); // 1 
```

### 函数与构造函数参数验证

Function and Constructor Parameter Validation.

```js
//跟保护和验证对象属性类似，也可对函数和构造函数参数进行审查。比如，可以让函数只接收某种类型的值：
function median(...nums)
//使用了 rest 参数语法，可以接受任意数量的参数，并将它们打包成一个数组 nums。
 { 
 return nums.sort()[Math.floor(nums.length / 2)]; //在函数体内部，对传入的参数数组 nums 进行排序，并返回排序后数组的中间值（如果数组长度为偶数，则取中间两个数的平均值）作为中位数。
} 

const proxy = new Proxy(median, { 
 apply(target, thisArg, argumentsList) 
 //该捕获器用于拦截函数的调用操作，其中 target 是目标函数（这里是 median 函数），thisArg 是函数调用时的 this 值（在这个例子中没有用到），argumentsList 是传递给函数的参数列表。
 { 
 for (const arg of argumentsList) { 
 if (typeof arg !== 'number') { 
 throw 'Non-number argument provided'; 
 } //如果某个参数不是数字类型，则抛出异常，表示不允许非数字类型的参数。
 }
return Reflect.apply(...arguments); 
 } 
}); 
console.log(proxy(4, 7, 1)); // 4 调用代理后的函数 proxy，传入了三个数字参数，结果为中位数 4。
console.log(proxy(4, '7', 1)); 
// Error: Non-number argument provided 再次调用代理后的函数 proxy，传入了包含一个字符串参数 '7' 的参数列表。由于其中存在非数字类型的参数，因此触发了捕获器中的异常抛出，最终导致程序终止。

//类似地，可以要求实例化时必须给构造函数传参：
class User { 
 constructor(id) { 
 this.id_ = id; 
 } //一个简单的 User 类，构造函数接受一个 id 参数，并将其存储在实例的 id_ 属性中。
} 
const proxy = new Proxy(User, { 
 construct(target, argumentsList, newTarget)
 //该捕获器用于拦截对构造函数的调用操作，其中 target 是目标构造函数（这里是 User 类），argumentsList 是传递给构造函数的参数列表，newTarget 是用于 new 操作符的目标构造函数。
  { //检查传入的参数列表中是否有 undefined，即构造函数被调用时是否没有传入任何参数。
 if (argumentsList[0] === undefined) { 
 throw 'User cannot be instantiated without id'; //如果没有传入参数，则抛出异常，表示不允许实例化 User 对象时没有传入 id。
 } else { 
 return Reflect.construct(...arguments); 
 } 
 } //该捕获器用于拦截对构造函数的调用操作，其中 target 是目标构造函数（这里是 User 类），argumentsList 是传递给构造函数的参数列表，newTarget 是用于 new 操作符的目标构造函数。：如果传入了参数，则继续执行原始的构造函数调用操作，并返回构造出的实例。
}); 
new proxy(1); 
new proxy(); 
// Error: User cannot be instantiated without id 
```

### 数据绑定与可观察对象

Data Binding and Observables

```js
//通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的代码互操作。
//比如，可以将被代理的类绑定到一个全局实例集合，让所有创建的实例都被添加到这个集合中：
const userList = []; //声明了一个空数组 userList，用于存储创建的用户实例。
class User { 
 constructor(name) { 
 this.name_ = name; 
 } //定义了一个简单的 User 类，构造函数接受一个 name 参数，并将其存储在实例的 name_ 属性中。
} 
const proxy = new Proxy(User, { 
 construct() { 
 const newUser = Reflect.construct(...arguments); 
 userList.push(newUser);//!!!将新创建的用户实例添加到 userList 数组中!!!
 return newUser; 
 //该捕获器用于拦截对构造函数的调用操作。使用 Reflect.construct() 方法调用原始的构造函数，并将其结果存储在 newUser 变量中，即创建了一个新的用户实例。。返回新创建的用户实例。
 } 
}); //创建了一个 Proxy 对象 proxy，对 User 类进行了代理。
new proxy('John'); 
new proxy('Jacob'); 
new proxy('Jingleheimerschmidt');
// 通过代理对象 proxy 分别实例化了三个 User 对象，并传入了不同的 name 参数。
console.log(userList); // [User {}, User {}, User{}]：打印输出了 userList 数组，其中包含了三个用户实例对象。

//另外，还可以把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息：
//创建了一个代理数组 proxy，用于拦截对原始数组 userList 的修改操作，并在每次修改后触发 emit 函数来输出新值。下面逐句解析并说明其内在逻辑：
const userList = []; //声明了一个空数组 userList，用于存储用户列表。
function emit(newValue) { 
 console.log(newValue); 
} //定义了一个函数 emit，用于输出传入的 newValue。
const proxy = new Proxy(userList, { 
 set(target, property, value, receiver) {  const result = Reflect.set(...arguments); //使用 Reflect.set() 方法对原始数组进行赋值操作，并将结果存储在 result 变量中。
 if (result) { 
 emit(Reflect.get(target, property, receiver)); 
 } 
 return result; 
 } //!!!set捕获器用于拦截对属性的赋值操作!!!。如果赋值操作成功，则执行下面的代码。调用 emit 函数，传入代理数组的最新值，即新的 value。这里使用 Reflect.get() 获取属性值，确保在数组修改后获得正确的值。返回赋值操作的结果。
}); //创建了一个 Proxy 对象 proxy，对 userList 数组进行了代理。
proxy.push('John'); //向代理数组 proxy 中添加了一个元素 'John'，触发了 set 捕获器，将新值 'John' 输出到控制台。
// John 
proxy.push('Jacob'); //向代理数组 proxy 中添加了一个元素 'Jocob'，触发了 set 捕获器，将新值 'Jocob' 输出到控制台。
// Jacob 
```

## 小结

代理是 ECMAScript 6 新增的令人兴奋和动态十足的新特性。尽管不支持向后兼容，但它开辟出了一片前所未有的 JavaScript 元编程及抽象的新天地。

从宏观上看，代理是真实 JavaScript 对象的透明抽象层。代理可以定义包含捕获器的处理程序对象，而这些捕获器可以拦截绝大部分 JavaScript 的基本操作和方法。在这个捕获器处理程序中，可以修改任何基本操作的行为，当然前提是遵从捕获器不变式。

与代理如影随形的反射 API，则封装了一整套与捕获器拦截的操作相对应的方法。可以把反射 API看作一套基本操作，这些操作是绝大部分 JavaScript 对象 API 的基础。

代理的应用场景是不可限量的。开发者使用它可以创建出各种编码模式，比如（但远远不限于）跟踪属性访问、隐藏属性、阻止修改或删除属性、函数参数验证、构造函数参数验证、数据绑定，以及可观察对象.
