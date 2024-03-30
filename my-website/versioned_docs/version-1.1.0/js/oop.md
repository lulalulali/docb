# 对象、类与面向对象编程

Objects, Classes, and Object-Oriented Programming.
 理解对象
 理解对象创建过程
 理解继承
 理解类
解释如何在 JavaScript 中使用类和面向对象编程。首先会深入讨论 JavaScript 的 Object 类型，进而探讨原型式继承，接下来全面介绍 ES6 类及其与原型式继承的紧密关系。

ecma将对象定义为一组属性的无序集合=一组没有特定顺序的值.对象的每个属性或方法都由一个 名称 来标识,名称映射一个值.   对象=散列表=内容是一组name\value对,value可以是数据或者函数.

## 理解对象

通常的创建方式是创建object的一个新实例,然后加入属性方法

```js
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
person.job = "Software Engineer"; 
person.sayName = function() { 
 console.log(this.name); 
};

//用对象字面量写上面的
let person = { 
 name: "Nicholas", 
 age: 29, 
 job: "Software Engineer", 
 sayName() { 
 console.log(this.name); 
 } 
}; 
```

### 属性的类型

types of properties.
以例如[[Enumerable]]为标识。分两种：数据属性和访问器属性。

1.数据属性data properties

```js
//属性显式添加到对象之后，[[Configurable]](是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性)、[[Enumerable]](是否可以通过 for-in 循环返回)和[[Writable]](属性的值是否可以被修改)都会被设置为 true，而[[Value]]特性会被设置为指定的值。比如：
let person = { 
 name: "Nicholas" 
}; 
```

```js
//要修改属性的默认特性，就必须使用 Object.defineProperty()方法.接收 3 个参数：要给其添加属性的对象、属性的名称和一个描述符对象。最后一个参数，即描述符对象上的属性可以包含：configurable、enumerable、writable 和 value，跟相关特性的名称一一对应。接收 3 个参数：要给其添加属性的对象、属性的名称和一个描述符对象。最后一个参数，即描述符对象上的属性可以包含：configurable、enumerable、writable 和 value，跟相关特性的名称一一对应。

//根据修改的特性,可以设置其中一个或多个值
let person = {}; 
Object.defineProperty(person, "name", { 
 writable: false, //这一行不要也行,因为有.defineProperty 就默认false
 value: "Nicholas" 
}); 
console.log(person.name); // "Nicholas" 
person.name = "Greg"; 
console.log(person.name); // "Nicholas"
//在非严格模式下尝试给这个属性重新赋值会被忽略。在严格模式下，尝试修改只读属性的值会抛出错误

let person = {}; 
Object.defineProperty(person, "name", { 
 writable: true, //上面的例子改动一下
 value: "Nicholas" 
}); 
console.log(person.name); // "Nicholas" 

person.name = "Greg"; 
console.log(person.name); //"Greg"
```

```js
//于创建不可配置的属性
let person = {}; 
Object.defineProperty(person, "name", { 
 configurable: false, 
 value: "Nicholas" 
}); 
console.log(person.name); // "Nicholas" 
delete person.name; 
//非严格模式下对这个属性调用 delete 没有效果，严格模式下会抛出错误。
console.log(person.name); // "Nicholas" 
```

```js
//一个属性被定义为不可配置之后，就不能再变回可配置的了。再次调用 Object.defineProperty()并修改任何非 writable 属性会导致错误：
let person = {}; 
Object.defineProperty(person, "name", { 
 configurable: false, 
 value: "Nicholas" 
}); 
// 抛出错误
Object.defineProperty(person, "name", { 
 configurable: true, 
 value: "Nicholas" 
}); 
```

在调用 Object.defineProperty()时，configurable、enumerable 和 writable 的值如果不指定，则都默认为 false。多数情况下，可能都不需要 Object.defineProperty()提供的这些强大的设置，但要理解 JavaScript 对象，就要理解这些概念。

2.访问器属性
Accessor Properties
不含数据值,却包含一个setter(写入访问器时传入新值)一个getter(读取访问器属性时返回一个有效值),不过这两都不是必需的.

4个属性:[[Configurable]]：是否可以通过 delete 删除并重新定义，是否可以修改它的特性，是否可以把它改为数据属性。默认true。[[Enumerable]]：是否可以通过 for-in 循环返回。默认true。[[Get]]：获取函数，在读取属性时调用。默认undefined。[[Set]]：设置函数，在写入属性时调用。默认undefined。

```js
//访问器属性是不能直接定义的，必须使用 Object.defineProperty()。下面是例

// 定义一个对象，包含伪私有成员 year_和公共成员 edition 
let book = { 
 year_: 2017, //year_中的下划线常用来表示该属性并不希望在对象方法的外部被访问
 edition: 1 
}; 

//对 book 对象的 year 属性进行定义
Object.defineProperty(book, "year", {
 get() { 
 return this.year_; 
 }, 
 //在 getter 函数中，当访问 year 属性时，会返回 this.year_ 的值，即返回 year_ 属性的当前值。
 set(newValue)
 //在 getter 函数中，当访问 year 属性时，会返回 this.year_ 的值，即返回 year_ 属性的当前值。
 { 
 if (newValue > 2017) { 
 this.year_ = newValue; 
 this.edition += newValue - 2017; 
 } 
 //2018 大于 2017，所以会触发 setter 函数。在 setter 函数中，this.year_ 被更新为 2018，而 this.edition 被增加了 2018 和 2017 的差值，即 1。
 } 
}); 
book.year = 2018; 
console.log(book.edition); // 2  是1加1
//以上是访问器属性的典型使用场景，即设置一个属性值会导致一些其他变化发生
```

严格模式下,只定义get和set中的一个,会抛错误.

### 定义多个属性

Defining Multiple Properties.

```js
//通过多个描述符一次性定义多个属性
let book = {}; 

//book 对象被定义了三个属性：year_、edition 和 year
Object.defineProperties(book, { 
 year_: { 
 value: 2017 
 }, 
 //属性不可枚举、不可配置、不可写
 edition: { 
 value: 1 
 }, //属性不可枚举、不可配置、不可写

 year: { 
 get() { 
 return this.year_; 
 },
 set(newValue) { 
 if (newValue > 2017) { 
 this.year_ = newValue; 
 this.edition += newValue - 2017; 
 } 
 } 
 }
 //year 属性具有 getter 和 setter 方法，允许对其进行读取和设置，并根据条件更新 year_ 和 edition 属性的值。 
}); 
```

### 读取属性的特性

Reading Property Attributes.

```js
let book = {}; 
Object.defineProperties(book, { 
 year_: { 
 value: 2017 
 }, 
 edition: { 
 value: 1 
 }, 
 year: { 
 get: function() { 
 return this.year_; 
 }, 
 set: function(newValue){ 
 if (newValue > 2017) { 
 this.year_ = newValue; 
 this.edition += newValue - 2017; 
 } 
 } 
 } 
}); 
let descriptor = Object.getOwnPropertyDescriptor(book, "year_"); //获取 book 对象中 year_ 属性的描述符，并将其赋值给变量 descriptor。
console.log(descriptor.value); // 2017  year_ 属性的值，预期输出为 2017。
console.log(descriptor.configurable); // false   year_ 属性是否可配置，预期输出为 false，因为在定义时未设置 configurable，默认值为 false。
console.log(typeof descriptor.get); // "undefined"     year_ 属性的 getter 方法是否存在，预期输出为 "undefined"，因为 year_ 属性没有 getter 方法。

let descriptor = Object.getOwnPropertyDescriptor(book, "year"); //year 属性的值，预期输出为 undefined，因为 year 属性没有初始值。
console.log(descriptor.value); // undefined         year属性的值，预期输出为 undefined，因为 year 属性没有初始值。 
console.log(descriptor.enumerable); // false        year 属性是否可枚举，预期输出为 false，因为在定义时未设置 enumerable，默认值为 false 
console.log(typeof descriptor.get); // "function"   year 属性的 getter 方法是否存在，预期输出为 "function"，因为 year 属性具有 getter 方法。.get 是一个指向获取函数的指针。
```

```js
//Object.getOwnPropertyDescriptors()静态方法,翻看每个属性里面的情况.
let book = {}; 
Object.defineProperties(book, { 
 year_: { 
 value: 2017 
 }, 
 edition: { 
 value: 1 
 }, 
 year: { 
 get: function() { 
 return this.year_; 
 }, 
 set: function(newValue){ 
 if (newValue > 2017) { 
 this.year_ = newValue; 
 this.edition += newValue - 2017; 
 } 
 } 
 } 
}); 
console.log(Object.getOwnPropertyDescriptors(book)); 
// { 
// edition: { 
// configurable: false, 
// enumerable: false, 
// value: 1, 
// writable: false 
// }, 
// year: { 
// configurable: false, 
// enumerable: false, 
// get: f(), 
// set: f(newValue), 
// }, 
// year_: { 
// configurable: false, 
// enumerable: false, 
// value: 2017, 
// writable: false 
// } 
// } 
```

### 合并对象

Merging Objects.也被称为“混入”（mixin）,目标对象通过混入源对象的属性得到了增强.

```js
//Object.assign()方法

let dest, src, result; 
/** 
 * 简单复制
 */ 
dest = {}; 
src = { id: 'src' }; 
result = Object.assign(dest, src); 

// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === src);//false
console.log(dest === result); // true 是否指向同一个对象，预期输出为 true，因为 Object.assign() 方法会修改目标对象并返回修改后的目标对象。
console.log(dest !== src); // true 是否指向不同的对象，预期输出为 true，因为 Object.assign() 方法不会改变源对象。
console.log(result); // { id: src } 即复制了 src 对象的属性到 dest 对象。
console.log(dest); // { id: src } 与 result 相同，表示成功将 src 对象的属性复制到了 dest 对象中。

/** 
 * 多个源对象,即拼接多个
 */ 
dest = {}; 
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' }); 
console.log(result); // { a: foo, b: bar }

/** 
 * 获取函数与设置函数.会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值
 */ 
dest = { 
 set a(val) { 
 console.log(`Invoked dest setter with param ${val}`); 
 } 
 //dest是目标对象.属性值是一个设置函数a。设置函数的定义中包含了一个参数 val，当这个设置函数被调用时，会在控制台打印一条消息，消息中包含参数 val 的值。调用的英语是invoke.
}; 
src = {  
 get a() { 
 console.log('Invoked src getter'); 
 return 'foo'; 
 } 
 //src是源对象.属性值是一个获取函数。获取函数的定义中没有参数，当这个获取函数被调用时，会在控制台打印一条消息，表示被调用，并返回字符串 'foo'。
}; 
//分别包含名为 a 的设置函数和获取函数。设置函数和获取函数的名称都是 a，这样设置是为了在调用 Object.assign() 时能够正确地将 src 的属性复制到 dest 中。

Object.assign(dest, src);  //目标对象 dest 中的 a 属性是一个设置函数，而不是一个普通属性，因此在复制属性时，获取函数会被调用，但设置函数不会执行赋值操作。
// 调用 src 的获取方法
// 调用 dest 的设置方法并传入参数"foo" 
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
let result2=Object.assign(dest, src);//将 src 对象的属性复制到 dest 对象中，并将返回的修改后的目标对象赋值给 result2。
console.log(dest); // { set a(val) {...} }表示 Object.assign() 并未将 src 对象的属性复制到 dest 对象中，而是保留了 dest 自身的属性。
```

```js
//Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象=不能在两个对象间转移获取函数和设置函数。
let dest, src, result; 
/** 
 * 覆盖属性
 */ 
dest = { id: 'dest' }; 
result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2', b: 'bar' }); 
// Object.assign 会覆盖重复的属性
console.log(result); // { id: src2, a: foo, b: bar } 同名属性只保留最后一个

// 可以通过目标对象上的设置函数观察到覆盖的过程：
dest = { 
 set id(x) { 
 console.log(x); 
 } 
}; 
Object.assign(dest, { id: 'first' }, { id: 'second' }, { id: 'third' }); 
// first 
// second 
// third 

/** 
 * 对象引用
 */ 
dest = {}; 
src = { a: {} }; 
Object.assign(dest, src); 

// 浅复制意味着只会复制对象的引用
console.log(dest); // { a :{} } 
console.log(dest.a === src.a); // true 
```

```js
//如果赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。
let dest, src, result; 
/** 
 * 错误处理
 */ 
dest = {}; 
src = { 
 a: 'foo', 
 get b() { 
 // Object.assign()在调用这个获取函数时会抛出错误
 throw new Error(); 
 }, 
 c: 'bar' 
}; 
try { 
 Object.assign(dest, src); 
} catch(e) {} 
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在： e 表示error
console.log(dest); // { a: foo } 
//尽管在处理源对象的过程中出现了错误，但是目标对象 dest 上已经成功地复制了 a 属性，因此输出结果为 { a: 'foo' }
```

### 对象标识及相等判定

Object Identity and Equality.对象的认证和相等

```js
//ecma6之前,操作符或无能为力

// 这些是===符合预期的情况
console.log(true === 1); // false 
console.log({} === {}); // false 
console.log("2" === 2); // false 

// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true 
console.log(+0 === 0); // true 
console.log(-0 === 0); // true 

// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN() 
console.log(NaN === NaN); // false 
console.log(isNaN(NaN)); // true  isnan这是一个全局函数，用于检查传入的值是否为 "NaN"
```

```js
//一下是ecma6

console.log(Object.is(true, 1)); // false 
console.log(Object.is({}, {})); // false 
console.log(Object.is("2", 2)); // false 
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false 
console.log(Object.is(+0, 0)); // true 
console.log(Object.is(-0, 0)); // false 
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true 跟上面例子不一样的地方

要检查超过两个值，递归地利用相等性传递即可：
function recursivelyCheckEqual(x, ...rest) { 
 return Object.is(x, rest[0]) && 
 (rest.length < 2 || recursivelyCheckEqual(...rest)); 
} 
```

### 增强的对象语法

```js
```

```js
```

```js
```
