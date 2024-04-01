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

### 增强的 对象语法

Enhanced Object Syntax.

1.属性值填写Property Value Shorthand

```js
//在给对象添加变量的时候，开发者经常会发现属性名和变量名是一样的
let name = 'Matt'; 
let person = { 
 name: name 
}; 
console.log(person); // { name: 'Matt' } 

//以下是以上的解决方案

//代码压缩程序会在不同作用域间保留属性名，以防止找不到引用。以下面的代码为例：
function makePerson(name) { 
 return { 
 name 
 }; 
} 
let person = makePerson('Matt'); 
console.log(person.name); // Matt 

//即使参数标识符只限定于函数作用域，编译器也会保留初始的 name 标识符.若编译器压缩，那么函数参数会被缩短，而属性名不变
function makePerson(a) { 
 return { 
 name: a 
 }; 
} 
var person = makePerson("Matt"); 
console.log(person.name); // Matt 
```

2.可 运算属性Computed Property Keys

即可对属性名字进行操作

引入可计算属性之前，如果想使用变量的值作为属性，那么必须先声明对象，然后使用中括号语法来添加属性=不能在对象字面量中直接动态命名属性。

```js
const nameKey = 'name'; 
const ageKey = 'age'; 
const jobKey = 'job'; 
//以上是变量,赋了值

//以下是使用上述的变量值作为对象的属性名,属性值顺便一fu
let person = {}; 
person[nameKey] = 'Matt'; 
person[ageKey] = 27; 
person[jobKey] = 'Software engineer'; 
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' } 
```

```js
//以下是以上的一步到位
//有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时将其作为 JavaScript 表达式而不是字符串来求值
const nameKey = 'name'; 
const ageKey = 'age'; 
const jobKey = 'job'; 
let person = { 
 [nameKey]: 'Matt', 
 [ageKey]: 27, 
 [jobKey]: 'Software engineer' 
}; 
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' } 
```

```js
//上面的升级版

//接受一个输入参数key，然后将它与一个自增的唯一令牌拼接起来，生成一个唯一的键，并将其作为函数的返回值。
const nameKey = 'name'; 
const ageKey = 'age'; 
const jobKey = 'job'; 
let uniqueToken = 0; 
function getUniqueKey(key) { 
 return `${key}_${uniqueToken++}`; 
} 
//获取唯一键的函数.返回值的表达式，这里使用了模板字符串，${}用于嵌入变量key的值;并在其后添加一个下划线;然后紧接着是uniqueToken自增后的值。这个表达式的作用是生成一个唯一的键值。
let person = { 
 [getUniqueKey(nameKey)]: 'Matt', 
 [getUniqueKey(ageKey)]: 27, 
 [getUniqueKey(jobKey)]: 'Software engineer' 
}; 
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' } 
```

3.简写方法名
Concise Method Syntax.

```js
//.sayname是下面的例子的方法
//在给对象定义方法时，要写一个方法名sayname、冒号，然后再引用一个匿名函数表达式function(name)
let person = { 
 sayName: function(name) { 
 console.log(`My name is ${name}`); 
 } 
}; 
person.sayName('Matt'); // My name is Matt 
```

```js
//以下代码和之前的代码在行为上是等价的：
//新的简写方法的语法遵循同样的模式，但开发者要放弃给函数表达式命名（不过给作为方法的函数命名通常没什么用）。相应地，这样也可以明显缩短方法声明。
let person = { 
 sayName(name) { 
 console.log(`My name is ${name}`); 
 } 
}; 
person.sayName('Matt'); // My name is Matt 

//简写方法名对获取函数和设置函数也是适用的：
let person = { 
 name_: '', 
 get name() { 
 return this.name_; 
 }, 
 set name(name) { 
 this.name_ = name; 
 }, 
 sayName() { 
 console.log(`My name is ${this.name_}`); 
 } 
}; 

person.name = 'Matt'; 
person.sayName(); // My name is Matt 
```

```js
//简写方法名与可运算属性键相互兼容：即[methodKey]就是方法名
const methodKey = 'sayName'; 
let person = { 
 [methodKey](name) { 
 console.log(`My name is ${name}`); 
 } 
}
person.sayName('Matt'); // My name is Matt 
```

### 对象解构

Object Destructuring.即使用与对象匹配的结构来实现对象属性赋值=可以在一条语句中使用嵌套数据实现一个或多个赋值操作(解构语法)

```js
//首先是不使用对象解构的：
// 不使用对象解构
let person = { 
 name: 'Matt', 
 age: 27 
};
let personName = person.name, 
 personAge = person.age; 
console.log(personName); // Matt 
console.log(personAge); // 27 

//然后，是使用对象解构的：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name: personName, age: personAge } = person; //不同出现在这里,意思是将person赋给新变量,使用{}里面的对应方式
console.log(personName); // Matt 
console.log(personAge); // 27 
```

```js
//使用解构，可以在一个类似对象字面量的结构中，声明多个变量，同时执行多个赋值操作。如果想让变量直接使用属性的名称，那么可以使用简写语法，比如：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name, age } = person; //多个赋值操作
console.log(name); // Matt 
console.log(age); // 27 

//解构赋值 不一定 与对象的属性 匹配 。赋值的时候可以忽略某些属性，而如果引用的属性不存在，则该变量的值就是 undefined：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name, job } = person; 
console.log(name); // Matt 
console.log(job); // undefined

//也可以在 解构 赋值的 同时定义默认值 ，这适用于前面刚提到的引用的属性不存在于源对象中的情况：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let { name, job='Software engineer' } = person; 
console.log(name); // Matt 
console.log(job); // Software engineer 

//解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据 ToObject()的定义），null和 undefined 不能被解构，否则会抛出错误。
let { length } = 'foobar'; 
console.log(length); // 6 

let { constructor: c } = 4; 
console.log(c === Number); // true 

let { _ } = null; // TypeError 
let { _ } = undefined; // TypeError

//解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中：
let personName, personAge; //事先声明的变量
let person = { 
 name: 'Matt', 
 age: 27 
}; 
({name: personName, age: personAge} = person);//相当于let { name: personName, age: personAge } = person;
console.log(personName, personAge); // Matt, 27
```

所谓解构赋值,其实也是赋值,只不过解构了再赋

1.嵌套解构

Nested Destructuring.

```js
//解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：
let person = { 
 name: 'Matt', 
 age: 27, 
 job: { 
 title: 'Software engineer' 
 } 
}; 
let personCopy = {}; 
({ 
 name: personCopy.name,
 age: personCopy.age, 
 job: personCopy.job 
} = person); 

// 因为一个对象的引用被赋值给 personCopy，所以修改
// person.job 对象的属性也会影响 personCopy 
person.job.title = 'Hacker' 

console.log(person); 
// { name: 'Matt', age: 27, job: { title: 'Hacker' } } 
console.log(personCopy); 
// { name: 'Matt', age: 27, job: { title: 'Hacker' } } 


//解构赋值可以使用嵌套结构，以匹配嵌套的属性
let person = { 
 name: 'Matt', 
 age: 27, 
 job: { 
 title: 'Software engineer' 
 } 
}; 
// 声明 title 变量并将 person.job.title 的值赋给它
let { job: { title } } = person; 
console.log(title); // Software engineer 


//在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样：
let person = { 
 job: { 
 title: 'Software engineer' 
 } 
}; 
let personCopy = {}; 

// foo 在源对象上是 undefined 
({ 
 foo: { 
 bar: personCopy.bar 
 } 
} = person); 
// TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'. 意思是person没有定义bar

// job 在目标对象上是 undefined 
({ 
 job: { 
 title: personCopy.job.title 
 } 
} = person); 
// TypeError: Cannot set property 'title' of undefined 意思是person定义job里面没有.title
```

2.部分解构

Partial Destructuring Completion.

```js
//需要注意的是，涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
let personName, personBar, personAge; 
try { 
 // person.foo 是 undefined，因此会抛出错误
 ({name: personName, foo: { bar: personBar }, age: personAge} = person); 
} catch(e) {} 
console.log(personName, personBar, personAge); 
// Matt, undefined, undefined 错误终止在第二个,所以第三个也没赋出来
```

3.参数上下文匹配

Parameter Context Matching.

```js
//在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在函数签名中声明在函数体内使用局部变量：
let person = { 
 name: 'Matt', 
 age: 27 
}; 
function printPerson(foo, {name, age}, bar) { 
 console.log(arguments); 
 console.log(name, age); 
} 

function printPerson2(foo, {name: personName, age: personAge}, bar) { 
 console.log(arguments); 
 console.log(personName, personAge); 
} 

printPerson('1st', person, '2nd'); 
// ['1st', { name: 'Matt', age: 27 }, '2nd'] 
// 'Matt', 27 
//['1st', { name: 'Matt', age: 27 }, '2nd']: 第一个console.log打印出函数的参数，即调用printPerson时传入的参数数组。'Matt', 27: 第二个console.log打印出从person对象中解构得到的name和age属性值。
printPerson2('1st', person, '2nd'); 
// ['1st', { name: 'Matt', age: 27 }, '2nd'] 
// 'Matt', 27 
//通过解构赋值，将该对象的name属性赋值给personName变量，将age属性赋值给personAge变量
```

## 创建对象

OBJECT CREATION.
创建具有同样接口的多个对象需要重复编写很多代码,所以任何解决呢?

### 概述Overview

支持面向对象的结构，比如类或继承=巧妙地运用原型式继承可以成功地模拟同样的行为

### 工厂模式

The Factory Pattern.用于抽象创建特定对象的过程.

```js
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
 console.log(this.name); 
 }; 
 return o; 
} //每次都会返回包含 3 个属性和 1 个方法的对象
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor"); 
```

### 构造函数模式

The Function Constructor Pattern.用于创建特定类型对象的.像 Object 和 Array 这样的原生直接使用。当然也可以自定义构造函数，以函数的形式为自己的对象类型定义属性和方法

```js
//前面的例子使用构造函数模式可以这样写：
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg

//，person1 和 person2 分别保存着 Person 的不同实例。这两个对象都有一个constructor 属性指向 Person，如下所示：
console.log(person1.constructor == Person); // true 
console.log(person2.constructor == Person); // true

//constructor 本来是用于标识对象类型的。不过，一般认为 instanceof 操作符是确定对象类型更可靠的方式。前面例子中的每个对象都是Object 的实例(是因为所有自定义对象都继承自 Object)，同时也是 Person 的实例，如下面调用instanceof 操作符的结果所示：
console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
console.log(person2 instanceof Object); // true 
console.log(person2 instanceof Person); // true 
```

Person()构造函数代替了 createPerson()工厂函数。实际上，Person()内部的代码跟 createPerson()基本是一样的，只是有如下区别。
 没有显式地创建对象。
 属性和方法直接赋值给了 this。
 没有 return
另外，要注意函数名 Person 的首字母大写了。按照惯例，构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头。有助于在 ECMA中区分构
造函数和普通函数。毕竟构造函数就是能创建对象的函数。要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。
(1) 在内存中创建一个新对象。
(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
(4) 执行构造函数内部的代码（给新对象添加属性）。
(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```js
//构造函数不一定要写成函数声明的形式。赋值给变量的函数表达式也可以表示构造函数：
let Person = function(name, age, job)
//相当于function Person(name, age, job){}的另一形式
{ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 
console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
console.log(person2 instanceof Object); // true 
console.log(person2 instanceof Person); // true 
```

```js
//在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。只要有 new 操作符，就可以调用相应的构造函数：
function Person() { 
 this.name = "Jake"; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person(); 
let person2 = new Person; 
person1.sayName(); // Jake 
person2.sayName(); // Jake 
console.log(person1 instanceof Object); // true 
console.log(person1 instanceof Person); // true 
console.log(person2 instanceof Object); // true 
console.log(person2 instanceof Person); // true 
```

1.构造函数也是函数
Constructors as Functions.与普通函数唯一的区别就是 !调用方式不同! .任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

```js
//前面的例子中定义的 Person()可以像下面这样调用：
// 作为构造函数 
let person = new Person("Nicholas", 29, "Software Engineer"); 
person.sayName(); // "Nicholas" 

// 作为函数调用
Person("Greg", 27, "Doctor"); // 添加到 window 对象.作为函数调用了Person构造函数，没有使用new关键字。在非严格模式下，这会导致Person函数中的this绑定到全局对象（在浏览器环境中是window对象），并创建了全局变量sayName，它的值为"Greg"。
window.sayName(); // "Greg" 
//调用了全局变量sayName

//在另一个对象的作用域中调用
let o = new Object(); //创建了一个新的空对象o。
Person.call(o, "Kristen", 25, "Nurse"); //使用call方法将Person构造函数的上下文设置为对象o，并传入了参数"Kristen"、25和"Nurse"。
o.sayName(); // "Kristen"  调用了对象o的sayName方法
//此在上面的调用之后，window 对象上就有了一个 sayName()方法，调用它会返回"Greg"。最后展示的调用方式是通过 call()（或 apply()）调用函数，同时将特定对象指定为作用域。这里的调用将对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添加到对象 o 上面
```

关于call的知识

```js
`call()` 方法是函数对象的一个方法，它允许你在指定的 `this` 值和参数列表的情况下调用函数。
function.call(thisArg, arg1, arg2, ...)
- `function` 是要调用的函数；- `thisArg` 是函数执行时的上下文，即在函数内部的 `this` 值；- `arg1`, `arg2`, ... 是函数调用时传入的参数。
当你调用 `call()` 方法时，函数会立即执行，并且 `this` 的值会被设置为 `thisArg`。这允许你在调用函数时显式地指定函数执行的上下文。
举个例子，假设有一个函数 `sayName()`：
function sayName(greeting) {
    console.log(`${greeting}, ${this.name}!`);
}
你可以使用 `call()` 方法以不同的上下文调用它：
const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };
sayName.call(person1, 'Hello'); // 输出：Hello, Alice!
sayName.call(person2, 'Hi');    // 输出：Hi, Bob!
在这个例子中，我们使用 `call()` 方法将函数 `sayName()` 分别绑定到了 `person1` 和 `person2` 对象上，这样函数中的 `this` 就分别指向了这两个对象，从而实现了不同的输出。
```

### 构造函数的毛病

Problems with Constructors.

```js
//构造函数的主要毛病在于，其定义的方法会在每个实例上都创建一遍。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方法不是同一个 Function 实例。我们知道，ECMAScript 中的函数是对象，因此每次定义函数时，都会初始化一个对象。逻辑上讲，这个构造函数实际上是这样的：
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = new Function("console.log(this.name)"); // 逻辑等价
} 
//每个 Person 实例都会有自己的 Function 实例用于显示 name 属性。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。
```

```js
//但创建新 Function实例的机制是一样的。因此不同实例上的函数虽然同名却不相等，如下所示：
console.log(person1.sayName == person2.sayName); //false
```

```js
//因为都是做一样的事，所以没必要定义两个不同的 Function 实例。况且，this 对象可以把函数与对象的绑定推迟到运行时。要解决这个问题，可以把函数定义转移到构造函数外部：
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = sayName; 
} 
function sayName() { 
 console.log(this.name); 
} //sayName()被定义在了构造函数外部。
//在构造函数内部，sayName 属性等于全局 sayName()函数。因为这一次 sayName 属性中包含的只是一个指向外部函数的指针，所以 person1 和 person2共享了定义在全局作用域上的 sayName()函数。这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。???如果这个对象需要多个方法，那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。这个新问题可以通过原型模式来解决.???不懂
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 
```

### 原型模式

The Prototype Pattern.

```js
//每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，如下所示：
function Person() {}

Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
};

let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true  ==是转换后再比较值是否相等


//以上是构造函数模式.与构造函数模式不同，使用这种原型模式定义的属性和方法是由所有实例共享的如下使用函数表达式也可以：
let Person = function() {}; //使用函数表达式
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true 
```

原型的本质:
1.理解原型
How Prototypes Work.。脚本中没有访问这个[[Prototype]]特性的标准方式
实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。

```js
//这种关系不好可视化，但可以通过下面的代码来理解原型的行为：
/** 
 * 构造函数可以是函数表达式
 * 也可以是函数声明，因此以下两种形式都可以：
 * function Person() {} 
 * let Person = function() {} 
 */ 
function Person() {} 
/** 
 * 声明之后，构造函数就有了一个
 * 与之关联的原型对象：
 */ 
console.log(typeof Person.prototype); 
console.log(Person.prototype); 
// { 
// constructor: f Person(), 
// __proto__: Object 
// } 
/** 
 * 如前所述，构造函数有一个 prototype 属性
 * 引用其原型对象，而这个原型对象也有一个
 * constructor 属性，引用这个构造函数
 * 换句话说，两者循环引用：
 */ 
console.log(Person.prototype.constructor === Person); // true 
/** 
 * 正常的原型链都会终止于 Object 的原型对象
 * Object 原型的原型是 null 
 */ 
console.log(Person.prototype.__proto__ === Object.prototype); // true 
console.log(Person.prototype.__proto__.constructor === Object); // true 
console.log(Person.prototype.__proto__.__proto__ === null); // true 
console.log(Person.prototype.__proto__); 
// { 
// constructor: f Object(), 
// toString: ... 
// hasOwnProperty: ... 
// isPrototypeOf: ... 
// ... 
// } 
let person1 = new Person(), 
 person2 = new Person(); 
/** 
 * 构造函数、原型对象和实例
 * 是 3 个完全不同的对象：
 */ 
console.log(person1 !== Person); // true 
console.log(person1 !== Person.prototype); // true 
console.log(Person.prototype !== Person); // true 
/** 
 * 实例通过__proto__链接到原型对象，
 * 它实际上指向隐藏特性[[Prototype]] 
 * 
 * 构造函数通过 prototype 属性链接到原型对象
 * 
 * 实例与构造函数没有直接联系，与原型对象有直接联系
 */ 
console.log(person1.__proto__ === Person.prototype); // true 
conosle.log(person1.__proto__.constructor === Person); // true 
/** 
 * 同一个构造函数创建的两个实例
 * 共享同一个原型对象：
 */ 
console.log(person1.__proto__ === person2.__proto__); // true 
/** 
 * instanceof 检查实例的原型链中
 * 是否包含指定构造函数的原型：
 */ 
console.log(person1 instanceof Person); // true 
console.log(person1 instanceof Object); // true 
console.log(Person.prototype instanceof Object); // true 
```

![Person 构造函数和 Person.prototype各个对象之间的对象](oop1.png)
就是无论是person还person1还是person2,都走person prototype,但是person prototype又指向原型person.  这里面到底是什么东西,怎么使用的???
Person.prototype 指向原型对象，而 Person.prototype.contructor 指回 Person 构造函数。原型对象包含 constructor 属性和其他后来添加的属性。Person 的两个实例 person1 和 person2 都只有一个内部属性指回 Person.prototype，而且两者都与构造函数没有直接联系。另外要注意，虽然这两个实例都没有属性和方法，但 person1.sayName()可以正常调用。这是由于对象属性查找机制的原因。

```js
//虽然不是所有实现都对外暴露了[[Prototype]]，但可以使用 isPrototypeOf()方法确定两个对象之间的这种关系。本质上，isPrototypeOf()会在传入参数的[[Prototype]]指向调用它的对象时返回 true，如下所示：
console.log(Person.prototype.isPrototypeOf(person1)); // true 
console.log(Person.prototype.isPrototypeOf(person2)); // true 
//以上通过原型对象调用 isPrototypeOf()方法检查了 person1 和 person2。
```

```js
//ECMA 的 Object 类型有一个方法叫 Object.getPrototypeOf()，返回参数的内部特性[[Prototype]]的值。例如：
console.log(Object.getPrototypeOf(person1) == Person.prototype); // true 
console.log(Object.getPrototypeOf(person1).name); // "Nicholas" 
```

```js
//Object 类型还有一个 setPrototypeOf()方法，可以向实例的私有特性[[Prototype]]写入一个新值。这样就可以重写一个对象的原型继承关系：
let biped = { 
 numLegs: 2 
}; 
let person = { 
 name: 'Matt' 
}; 
Object.setPrototypeOf(person, biped); //使用 Object.setPrototypeOf() 方法将 person 对象的原型设置为 biped 对象。这意味着 person 对象继承了 biped 对象的属性和方法。
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true  使用 Object.getPrototypeOf() 方法获取 person 对象的原型，然后与 biped 对象进行比较。

//warning:Object.setPrototypeOf()可能会严重影响代码性能。Mozilla 文档说得很清楚：“在所有浏览器和 JavaScript 引擎中，修改继承关系的影响都是微妙且深远的。这种影响并不仅是执行 Object.setPrototypeOf()语句那么简单，而是会涉及所有访问了那些修改过[[Prototype]]的对象的代码。”
//为了避免上述:为避免使用 Object.setPrototypeOf()可能造成的性能下降，可以通过 Object.create()来创建一个新对象，同时为其指定原型：
let biped = { 
 numLegs: 2 
}; 
let person = Object.create(biped); //使用object.create
person.name = 'Matt'; 
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true 
```

2.原型层级

Understanding the Prototype Hierarchy.理解原型的继承.
在调用 person1.sayName()时，会发生两步搜索。首先，JavaScript 引擎会问：“person1 实例有 sayName 属性吗？”答案是没有。然后，继续搜索并问：“person1 的原型有 sayName 属性吗？”答案是有。于是就返回了保存在原型上的这个函数。在调用 person2.sayName()时，会发生同样的搜索过程，而且也会返回相同的结果。这就是原型用于在多个对象实例间共享属性和方法的原理.
即:前面提到的 constructor 属性只存在于原型对象，因此通过实例对象也是可以访问到的。

```js
//虽然可以通过实例读取原型对象上的值，但不可能通过实例重写这些值。如果在实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。下面看一个例子：
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
let person2 = new Person(); 
person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例.访问 person1.name 时，会先在实例上搜索个属性。因为这个属性在实例上存在，所以就不会再搜索原型对象了。只要给对象实例添加一个属性，这个属性就会遮蔽（shadow）原型对象上的同名属性，也就是虽然不会修改它，但会屏蔽对它的访问.
console.log(person2.name); // "Nicholas"，来自原型
```

```js
//使用 delete 操作符可以完全删除实例上的这个属性，从而让标识符解析过程能够继续搜索原型对象。
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
let person2 = new Person(); 
person1.name = "Greg"; 
console.log(person1.name); // "Greg"，来自实例
console.log(person2.name); // "Nicholas"，来自原型
delete person1.name; 
console.log(person1.name); // "Nicholas"，来自原型
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```

```js
```
