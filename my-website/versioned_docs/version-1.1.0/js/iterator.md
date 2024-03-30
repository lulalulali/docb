# 迭代器与生成器

基本上没懂???

iterators and gernerators

介绍 ECMAScript 新版中引入的两个基本概念：迭代器和生成器，并分别讨论它们最基本的行为和在当前语言环境下的应用。

 理解迭代
 迭代器模式
 生成器

迭代:按顺序反复多次执行一段程序,通常有明确的终止条件.跟循环函数有什么异同???

迭代器和生成器这两个特性能更棒的来迭代

## 理解迭代

introduction to iteration.

计数循环就是一种最简单的迭代
<!-- for (let i = 1; i <= 10; ++i) { console.log(i); }  -->

迭代前得知道咋使用数据结构.先引用取得数组对象,再通过[]操作符取得特定索引位置上的项  这种并不适用所有的数据结构
遍历顺序并不是数据机构固有的.递增索引并不是适用于有隐式顺序的数据结构

```js
//新增的Array.prototype.forEach()方法
let collection = ['foo', 'bar', 'baz']; 
collection.forEach((item) => console.log(item)); 
// foo 
// bar 
// baz 
//此方法没法标识迭代何时终止,只适用于数组,而且回调结构也比较笨拙
```

迭代器模式就是打包好的循环及其它辅助结构防止混乱.

## 迭代器模式

iterator pattern.它实现了正式的iterable接口,而且可以通过iterator consume.

```js
//基本上可以把可迭代对象理解成数组\集合这样的集合类型的对象

// 数组的元素是有限的
// 递增索引可以按序访问每个元素

let arr = [3, 1, 4]; 
// 集合的元素是有限的
// 可以按插入顺序访问每个元素
let set = new Set().add(3).add(1).add(4); 
```

不过,可迭代对象不一定是集合对象,也可是仅仅具有类似数组行为的其它数据结构.
任何实现iterable接口的数据结构都能被iterator结构消费. 迭代器iterator是按需创建的一次性对象.每个迭代器都会关联一个可迭代对象,而迭代器会暴露其关联的 可迭代对象的api.迭代器不需要知道对象的数据结构,只知道如何获得值就ok了.

以上的这种分离正是iterable和iterator的强大之处

### 可迭代协议

iterable protocol.

实现可迭代协议,即iterable接口要求同时2能力:支持迭代的自我识别能力 和 创建实现iterator接口的对象的能力.=必须暴露一个属性作为默认迭代器,此属性必须使用特殊的symbol.iterator作为键.其必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

字符串,数组,映射,集合,arguement对象,nodelist等dom集合类型都实现了iterable接口

```js
//
let num = 1; 
let obj = {}; 

// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined 
console.log(obj[Symbol.iterator]); // undefined 

let str = 'abc'; 
let arr = ['a', 'b', 'c']; 
let map = new Map().set('a', 1).set('b', 2).set('c', 3); 
//map对象 键值对
let set = new Set().add('a').add('b').add('c'); 
//set对象 元素
let els = document.querySelectorAll('div'); 
//nodelist对象

// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] } 
console.log(arr[Symbol.iterator]); // f values() { [native code] } 
console.log(map[Symbol.iterator]); // f values() { [native code] } 
console.log(set[Symbol.iterator]); // f values() { [native code] } 
console.log(els[Symbol.iterator]); // f values() { [native code] } 

// 调用这个工厂函数会生成一个迭代器 以下就是迭代器的生成.但实际写码不需要这样显示调用
console.log(str[Symbol.iterator]()); // StringIterator {} 
console.log(arr[Symbol.iterator]()); // ArrayIterator {} 
console.log(map[Symbol.iterator]()); // MapIterator {} 
console.log(set[Symbol.iterator]()); // SetIterator {} 
console.log(els[Symbol.iterator]()); // ArrayIterator {} 
```

实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。

接收可迭代对象的原生语言特性包括： for-of 循环 数组解构 扩展操作符 Array.from() 创建集合 创建映射 Promise.all()接收由期约组成的可迭代对象 Promise.race()接收由期约组成的可迭代对象 yield*操作符，在生成器中使用

```js
//后台调用工厂函数

let arr = ['foo', 'bar', 'baz']; 

// for-of 循环
for (let el of arr) { 
 console.log(el); 
}
// foo 
// bar 
// baz 

// 数组解构
let [a, b, c] = arr; 
console.log(a, b, c); // foo, bar, baz 

// 扩展操作符
let arr2 = [...arr]; 
console.log(arr2); // ['foo', 'bar', 'baz'] 

// Array.from() 
let arr3 = Array.from(arr); 
console.log(arr3); // ['foo', 'bar', 'baz'] 

// Set 构造函数
let set = new Set(arr); 
console.log(set); // Set(3) {'foo', 'bar', 'baz'}

// Map 构造函数
let pairs = arr.map((x, i) => [x, i]); 
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]] 
let map = new Map(pairs); 
console.log(map); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 } 
```

```js
//父类实现接口,子类自然也实现
class FooArray extends Array {} 
let fooArr = new FooArray('foo', 'bar', 'baz'); 
for (let el of fooArr) { 
 console.log(el); 
} 
// foo 
// bar 
// baz 
```

### 迭代器协议

iterator protocol.
next方法和两个属性done、value

```js
// 可迭代对象Iterable object
let arr = ['foo', 'bar']; 

// 迭代器工厂函数Iterator factory
console.log(arr[Symbol.iterator]); // f values() { [native code] } 

// 迭代器 Iterator
let iter = arr[Symbol.iterator](); 
console.log(iter); // ArrayIterator {} 

// 执行迭代Performing iteration. done是个布尔值,表示是否还可以再次调用next取下一个值
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: true, value: undefined } 

//迭代器done了就是下面这样
let arr = ['foo']; 
let iter = arr[Symbol.iterator](); 
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined } 
```

```js
//不同的迭代器实例之间独立.
let arr = ['foo', 'bar']; 
let iter1 = arr[Symbol.iterator](); 
let iter2 = arr[Symbol.iterator](); 

console.log(iter1.next()); // { done: false, value: 'foo' } 
console.log(iter2.next()); // { done: false, value: 'foo' } 
console.log(iter2.next()); // { done: false, value: 'bar' } 
console.log(iter1.next()); // { done: false, value: 'bar' }
```

```js
//可迭代对象在迭代中途被修改,会出现说明情况:
let arr = ['foo', 'baz']; 
let iter = arr[Symbol.iterator](); 

console.log(iter.next()); // { done: false, value: 'foo' } 

// 在数组中间插入值
arr.splice(1, 0, 'bar'); //1是索引位,0是删除数,插入后顺序是 foo bar baz

console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: false, value: 'baz' } 
console.log(iter.next()); // { done: true, value: undefined } 
```

迭代器会阻止垃圾回收程序回收可迭代对象

```js
// 这个类实现了可迭代接口（Iterable） 
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口（Iterator）的迭代器对象
class Foo {
    //迭代器工厂函数
    [Symbol.iterator]() { 
 return { 
 next() { 
 return { done: false, value: 'foo' }; 
 } 
 } 
 } 
} 
//[Symbol.iterator]() 方法被定义在 Foo 类中，用于实现迭代器接口。该方法返回一个对象，该对象具有一个 next 方法，用于迭代数据。在 next 方法中，返回了一个包含 done 和 value 属性的对象。done 表示迭代是否已完成，value 表示当前迭代的值。

let f = new Foo(); 

// 打印出实现了迭代器接口的对象
console.log(f[Symbol.iterator]()); // { next: f() {} } 

// Array 类型实现了可迭代接口（Iterable）
//array可以实现iterable
// 调用 Array 类型的默认迭代器工厂函数
// 会创建一个 ArrayIterator 的实例
let a = new Array(); 

// 打印出 ArrayIterator 的实例
console.log(a[Symbol.iterator]()); // Array Iterator {}
```

### 自定义迭代器

custom iterator definition.
与Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用。

```js
//下面的counter类只能被迭代一定的次数

class Counter { 
 // Counter 的实例应该迭代 limit 次
 constructor(limit) 
 //构造函数接受一个参数 limit，用于指定计数器的上限值。在构造函数中，count 初始化为 1，表示计数器的当前值，limit 初始化为传入的 limit 参数，表示计数器的上限值。
 { 
 this.count = 1; 
 this.limit = limit; 
 } 

 next() { 
 if (this.count <= this.limit) { 
 return { done: false, value: this.count++ }; 
 } else { 
 return { done: true, value: undefined }; 
 } 
 } 
 //定义了一个 next 方法，用于生成迭代器的下一个值。如果当前计数器的值小于等于上限值，则返回一个对象，其中 done 属性为 false，表示迭代尚未完成，value 属性为当前计数器的值，并且将计数器的值递增。如果当前计数器的值已经大于上限值，则返回一个对象，其中 done 属性为 true，表示迭代已完成，value 属性为 undefined。
 [Symbol.iterator]() { 
 return this; 
 } 
 //定义了一个 [Symbol.iterator] 方法，该方法返回 this，  即返回当前对象自身，表示该对象是一个可迭代对象!!!!!!
} 

let counter = new Counter(3); 
//创建了一个 Counter 类的实例 counter，并传入参数 3，表示计数器的上限值为 3。

for (let i of counter) { 
 console.log(i); 
} 
//使用 for...of 循环迭代计数器对象 counter。在每次迭代中，会调用计数器对象的 next 方法来获取下一个值，并将该值赋给变量 i，然后将 i 打印出来。
// 1 
// 2 
// 3

//构造函数初始化了计数器对象的当前值和上限值，next 方法用于生成迭代器的下一个值，[Symbol.iterator] 方法用于返回迭代器对象自身，从而使得该对象可以被 for...of 循环迭代。
```

```js
//以下实现了iterator接口,但不理想=每个实例只能被迭代一次
for (let i of counter) { console.log(i); } 
// 1
// 2 
// 3 
for (let i of counter) { console.log(i); } 
// (nothing logged) 
```

```js
//为了让一个可迭代对象能够创建多个迭代器，必须每创一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器：

//创建了一个可迭代的计数器对象,计数器和next放进iterator工厂里
class Counter { 
 constructor(limit) { 
 this.limit = limit; 
 } 

 [Symbol.iterator]() { 
 let count = 1, 
 limit = this.limit; 
 return { 
 next() { 
 if (count <= limit) { 
 return { done: false, value: count++ }; 
 } else { 
 return { done: true, value: undefined }; 
 } 
 } 
 }; 
 } 
} 

let counter = new Counter(3); 
for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3 

for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3 
```

```js
//
let arr = ['foo', 'bar', 'baz']; 
let iter1 = arr[Symbol.iterator](); 
//iter1是arr的迭代器

console.log(iter1[Symbol.iterator]); // f values() { [native code] } 
let iter2 = iter1[Symbol.iterator](); 

console.log(iter1 === iter2); // true 
```

```js
//for of循环中用到迭代器的接口,因为所用之处也是可迭代对象

let arr = [3, 1, 4]; 
let iter = arr[Symbol.iterator]();
for (let item of arr ) { console.log(item); } 
// 3 
// 1 
// 4 
for (let item of iter ) { console.log(item); } 
// 3 
// 1 
// 4 
```

### 提前终止迭代器

early termination of iterators.
即用return方法关闭迭代器:for-of 循环通过 break、continue、return 或 throw 提前退出；解构操作并未消费所有值。

```js
class Counter { 
 constructor(limit) { 
 this.limit = limit; 
 } 
 //构造函数接受一个参数 limit，用于指定计数器的上限值，并将其存储在对象的 limit 属性中。

 [Symbol.iterator]() 
 //定义了一个 [Symbol.iterator] 方法，该方法返回一个迭代器对象。
 { 
 let count = 1, 
 limit = this.limit; 
 //声明了两个变量 count 和 limit，分别初始化为 1 和构造函数中传入的 limit 属性值。
  return { 
 next() { 
 if (count <= limit)

 { 
 return { done: false, value: count++ }; 
 } else { 
 return { done: true }; 
 } 
 },
 //next 方法用于生成迭代器的下一个值。判断当前计数器的值是否小于等于上限值。如果小于等于上限值，则返回一个对象，其中 done 属性为 false，表示迭代尚未完成，value 属性为当前计数器的值 count，并将 count 递增。如果大于上限值，则返回一个对象，其中 done 属性为 true，表示迭代已完成。
 return() { 
 console.log('Exiting early'); 
 return { done: true }; 
 } 
 //return 方法用于提前退出迭代。输出一条消息表示提前退出。返回一个对象，其中 done 属性为 true，表示迭代已完成。
 }
 //返回一个具有 next 和 return 方法的对象，用于生成迭代器的下一个值和提前退出迭代。
 ; 
 } 
} 

let counter1 = new Counter(5); 
for (let i of counter1) { 
 if (i > 2) { 
 break; 
 } 
 console.log(i); 
} 
// 1 
// 2 
// Exiting early

//以下是  在使用 Counter 类时，通过 return 方法提前退出迭代的情况以及在解构赋值时的行为。
let counter2 = new Counter(5); //创建了一个新的 Counter 对象 counter2，其上限值为 5。
//使用了 try-catch 块来捕获可能发生的异常。
try { 
    //对 counter2 进行迭代。迭代过程中，当计数器的值大于 2 时，抛出了一个错误 'err'。如果没有提前退出，就打印当前计数器的值 i。
 for (let i of counter2) { 
 if (i > 2) { 
 throw 'err'; 
 } 
 console.log(i); 
  //在循环中打印当前计数器的值 i。
 } 
 }
catch(e) {} 
//在捕获到异常后，不执行任何操作。

// 1 
// 2 
// Exiting early 

let counter3 = new Counter(5); //创建了另一个新的 Counter 对象 counter3，其上限值也为 5。
let [a, b] = counter3; //使用解构赋值从 counter3 中获取值，并赋给变量 a 和 b。在解构赋值的过程中，会触发 return 方法，从而提前退出迭代。
// Exiting early 
```

```js
//如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，数组的迭代器就是不能关闭的：
let a = [1, 2, 3, 4, 5]; 
let iter = a[Symbol.iterator](); 

for (let i of iter) { 
 console.log(i); 
 if (i > 2) { 
 break 
 } 
} 
// 1 
// 2 
// 3 

for (let i of iter) { 
 console.log(i); 
} 
// 4 
// 5 
```

```js
//return是可选的,所以并非所有迭代器都是可关闭的.想知道是不是可关的?可以测试 这个迭代器实例的 return 属性是不是函数对象?. return不会强制关,因为不可关的return关不了.即便这样,return()还是会被调用.
let a = [1, 2, 3, 4, 5]; 
let iter = a[Symbol.iterator](); 

iter.return = function() { 
 console.log('Exiting early'); 
 return { done: true };
 }; 

for (let i of iter) { 
 console.log(i); 
 if (i > 2) { 
 break 
 } 
} 
// 1 
// 2 
// 3 
// Exiting early
for (let i of iter) { 
 console.log(i); 
} 
// 4 
// 5 

//提前退出并不意味着迭代器关闭了
```

## 生成器

generators.
能力:在一个函数内暂停\恢复代码执行的能力.eg:用生成器自定义迭代器和实现协程

### 生成器基础

generator basics.函数前面加个*就是生成器.凡能定义函数的地方,就可定义生成器.

```js
// 生成器函数声明
function* generatorFn() {} 

// 生成器函数表达式
let generatorFn = function* () {} 

// 作为对象字面量方法的生成器函数
let foo = { 
 * generatorFn() {} 
} 

// 作为类实例方法的生成器函数
class Foo { 
 * generatorFn() {} 
} 

// 作为类静态方法的生成器函数
class Bar { 
 static * generatorFn() {} 
} 

//箭头函数不能用来定义生成器函数
```

```js
//标识生成器函数的星号不受两侧空格的影响.下面的第一个例子

// 等价的生成器函数： 
function* generatorFnA() {} 
function *generatorFnB() {} 
function * generatorFnC() {} 
// 等价的生成器方法：
class Foo { 
 *generatorFnD() {} 
 * generatorFnE() {} 
}
```

```js
//调用生成器函数会弄出来一个生成器对象.其开始处于suspended状态.跟迭代器相似,生成器对象也实现了iterator接口,因此又next方法.

//调用这个方法会让生成器开始或恢复执行

function* generatorFn() {} 

const g = generatorFn(); 

console.log(g); // generatorFn {<suspended>} 
console.log(g.next); // f next() { [native code] } 
```

```js
//next方法返回值类似迭代器,有done和value.空函数体的生成器中间不会停留,调一次next就会让生成器达到done状态

function* generatorFn() {} 
let generatorObject = generatorFn(); 
console.log(generatorObject); // generatorFn {<suspended>} 
console.log(generatorObject.next()); // { done: true, value: undefined }
```

```js
//value的值可以由生成器函数的返回值指定

function* generatorFn() { 
 return 'foo'; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject); // generatorFn {<suspended>} 
console.log(generatorObject.next()); // { done: true, value: 'foo' }
```

```js
//生成器函数只会在初次调用 next()方法后开始执行
function* generatorFn() { 
 console.log('foobar'); 
} 
// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn(); 
generatorObject.next(); // foobar 

//生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的：
function* generatorFn() {} 

console.log(generatorFn); 
// f* generatorFn() {} 
console.log(generatorFn()[Symbol.iterator]); 
// f [Symbol.iterator]() {native code} 
console.log(generatorFn()); 
// generatorFn {<suspended>} 
console.log(generatorFn()[S ymbol.iterator]()); 
// generatorFn {<suspended>}

const g = generatorFn(); 
console.log(g === g[Symbol.iterator]()); 
// true 

console.log(g);//generatorFn {<suspended>} 生成器函数本身的信息

//注意 
 console.log(g[Symbol.iterator]);
 //ƒ [Symbol.iterator]() { [native code] } 生成器函数的 Symbol.iterator 方法的信息。

console.log(g === g[Symbol.iterator]); 
// false
```

### 通过yield中断执行

yield是孕育\产生\giveup\屈服\放弃索偿\放弃占有的意思
interrupting execution with "yield".

是能让生成器停止和开始执行的,也是生成器最有用的地方.遇到yield,生成器函数的执行会停止,函数作用域的状态会被保留.停止执行的 只能 用next方法恢复执行.

```js
function* generatorFn() { 
 yield; 
} 

let generatorObject = generatorFn(); 

console.log(generatorObject.next()); // { done: false, value: undefined } 
console.log(generatorObject.next()); // { done: true, value: undefined } 
```

```js
//yield,中断会使得生成器函数处于donefalse;通过return会关键字退出的函数会处于donetrue

function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: 'foo' } 
console.log(generatorObject.next()); // { done: false, value: 'bar' } 
console.log(generatorObject.next()); // { done: true, value: 'baz' } 
```

```js
//生成器对象generatorObject1和generatorObject2互不影响

function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 

let generatorObject1 = generatorFn(); 
let generatorObject2 = generatorFn(); 

console.log(generatorObject1.next()); // { done: false, value: 'foo' } 
console.log(generatorObject2.next()); // { done: false, value: 'foo' }
console.log(generatorObject2.next()); // { done: false, value: 'bar' } 
console.log(generatorObject1.next()); // { done: false, value: 'bar' }  
```

```js
//yield关键字 只能 在生成器函数内部使用

// 有效
function* validGeneratorFn() { 
 yield; 
} 
// 无效
function* invalidGeneratorFnA() { 
 function a() { 
 yield; 
 } 
} 
// 无效
function* invalidGeneratorFnB() { 
 const b = () => { 
 yield; 
 } 
} 
// 无效
function* invalidGeneratorFnC() { 
 (() => { 
 yield; 
 })(); 
} 
```

1.生成器对象作为可迭代对象

Using a Generator Object as an Iterable.

```js
//这么用更方便:把生成器对象当可迭代对象

function* generatorFn() { 
 yield 1; 
 yield 2; 
 yield 3; 
} 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
```

```js
//生成器对象(n),我们自定义一个可迭代的生成器函数

function* nTimes(n) { 
 while(n--) { 
 yield; 
 } 
} 
//定义了一个生成器函数 nTimes(n)，该函数接受一个参数 n，表示要生成的迭代次数。在每次迭代中，它都会调用 yield 关键字来暂停执行并返回一个空值。直到 n 为 0 时，迭代结束。

for (let _ of nTimes(3)) { 
 console.log('foo'); 
} 
//使用 nTimes(3) 生成器生成了一个迭代器，并对其进行迭代。每次迭代，由于生成器函数内部有 yield 关键字，会暂停执行并输出 'foo'。这样，整个循环会执行三次，每次输出 'foo'。

// foo 
// foo 
// foo 
```

2.使用yield实现输入和输出

Using “yield” for Input and Output.

```js
//除了可以作为函数的中间返回语句使用，yield 关键字还可以作为函数的中间参数使用。即yield()是可以的,(yield)也是可以的.

function* generatorFn(initial) { 
 console.log(initial); 
 console.log(yield); 
 console.log(yield); 
} 

let generatorObject = generatorFn('foo'); 

generatorObject.next('bar'); // foo  第一次的调用时,next传入的值不会被使用,因为是相当于开始执行生成器函数
generatorObject.next('baz'); // baz 
generatorObject.next('qux'); // qux 
```

```js
//yield 关键字可以同时用于输入和输出，如下例所示：
function* generatorFn() { 
 return yield 'foo'; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: 'foo' }  必须先对整个表达式求值才能确定返回的值,所以foo
console.log(generatorObject.next('bar')); // { done: true, value: 'bar' }  这里是第二次调用,传入了bar
```

```js
//yield 关键字并非只能使用一次。比如，以下代码就定义了一个无穷计数生成器函数：
function* generatorFn() { 
 for (let i = 0;;++i) 
 
 { 
 yield i; 
 } 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next().value); // 0 
console.log(generatorObject.next().value); // 1 
console.log(generatorObject.next().value); // 2 
console.log(generatorObject.next().value); // 3 
console.log(generatorObject.next().value); // 4 
console.log(generatorObject.next().value); // 5 
...
```

```js
//假设我们想定义一个生成器函数，它会根据配置的值迭代相应次数并产生迭代的索引。初始化一个新数组可以实现这个需求，但不用数组也可以实现同样的行为：
function* nTimes(n) { 
 for (let i = 0; i < n; ++i) { 
 yield i; 
 } 
} 
for (let x of nTimes(3)) { 
 console.log(x); 
} 
// 0 
// 1 
// 2 


//使用 while 循环也可以，而且代码稍微简洁一点：
function* nTimes(n) { 
 let i = 0; 
 while(n--) { 
 yield i++; 
 } 
} 
//定义了一个生成器函数 nTimes(n)，该函数接受一个参数 n，表示要生成的迭代次数。在每次迭代中，它都会调用 yield 关键字来暂停执行并返回一个空值。直到 n 为 0 时，迭代结束。

for (let x of nTimes(3)) { 
 console.log(x); 
} 
//上面有个例子,不过打印的是("foo")是一个逻辑.在这里yield实现输出.
// 0 
// 1 
// 2
```

```js
//使用生成器也可以实现范围和填充数组：看你yield的是什么
function* range(start, end) { 
 while(end > start) { 
 yield start++; 
 } 
} 
for (const x of range(4, 7)) { 
 console.log(x); 
} 
// 4 
// 5 
// 6 
function* zeroes(n) { 
 while(n--) { 
 yield 0; 
 } 
} 
console.log(Array.from(zeroes(8))); // [0, 0, 0, 0, 0, 0, 0, 0] 
```

3.产生可迭代对象

Yielding an Iterable.

```js
// 等价的 generatorFn： 
// function* generatorFn() { 
// for (const x of [1, 2, 3]) { 
// yield x; 
// } 
// } 
function* generatorFn() { 
 yield* [1, 2, 3]; 
 //使用了✳,增强yield=一次生产一个
} 
let generatorObject = generatorFn(); 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
```

```js
//跟生成器函数不受两侧空格影响一样,yield星号  两侧也不受

function* generatorFn() { 
 yield* [1, 2]; 
 yield *[3, 4]; 
 yield * [5, 6]; 
} 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
// 4 
// 5 
// 6 
```

```js
function* generatorFnA() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 

for (const x of generatorFnA()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 


//上下两个例子一样:yield*是可以将对象序列逐个产出=循环

function* generatorFnB() { 
 yield* [1, 2, 3]; 
} 
for (const x of generatorFnB()) { 
 console.log(x); 
}
// 1 
// 2 
// 3 
```

```js
//yield*的值是关联迭代器返回 done: true 时的 value 属性.什么意思???对于普通迭代器来说，这个值是undefined：   

function* generatorFn() { 
 console.log('iter value:', yield* [1, 2, 3]); 
} 
//定义了一个生成器函数 generatorFn()。在函数内部，它使用了 yield* 关键字来代理另一个可迭代对象 [1, 2, 3] 的迭代过程。

for (const x of generatorFn()) { 
 console.log('value:', x); 
} 
//对 generatorFn() 返回的生成器进行迭代。每次迭代，会执行生成器函数，其中 yield* [1, 2, 3] 会将控制权委托给 [1, 2, 3] 的迭代器，并且生成器函数内部的代码会等待迭代器返回的值。由于 [1, 2, 3] 中的值依次为 1、2、3，因此在每次迭代时，x 的值分别为 1、2、3。
// value: 1 
// value: 2 
// value: 3 
// iter value: undefined

//先打印value,就是123;然后x,x就是生成器iter value
```

```js

//不懂???

//什么是迭代器对象?x和'iter value:'\'value:'
function* innerGeneratorFn() { 
 yield 'foo'; 
 return 'bar'; 
} 
function* outerGeneratorFn(genObj) { 
 console.log('iter value:', yield* innerGeneratorFn()); 
}

for (const x of outerGeneratorFn()) { 
 console.log('value:', x); 
} 
// value: foo 
// iter value: bar  对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的值

//下面做了一点改动

function* innerGeneratorFn() { 
 yield 'foo'; 
//无
} 
function* outerGeneratorFn(genObj) { 
 console.log('iter value:', yield* innerGeneratorFn()); 
}

for (const x of outerGeneratorFn()) { 
 console.log('value:', x); 
} 
// value: foo
//iter value:undefined
```

4.使用yield实现递归算法

```js
//yield*最有用的地方是实现递归操作，此时生成器可以产生自身。
function* nTimes(n) { 
 if (n > 0) { 
 yield* nTimes(n - 1); 
 yield n - 1; 
 //在这里产生自身
 } 
} 
for (const x of nTimes(3))
//3代表返回的次数是3次
{ 
 console.log(x); 
} 
// 0  从1开始, 1才0
// 1   2才1
// 2   3才2 

//x 是一个变量名，用于在每次迭代中存储迭代器返回的当前值。作用：x 在每次迭代中代表迭代器对象返回的当前值。在循环的每次迭代中，x 的值会随着迭代器对象返回的值而变化。在这个例子中，x 的值将会依次是 0、1 和 2，因为 nTimes(3) 生成的迭代器对象会依次返回这些值。
```

```js

//看不懂???

//下面是使用递归生成器结构和yield* 优雅的表达递归算法,实现了一个随机的双向图.
class Node { 
 constructor(id) { 
 this.id = id; 
 this.neighbors = new Set(); 
 }
 //constructor(id) 方法是 Node 类的构造函数，用于创建节点对象。它接受一个参数 id，表示节点的唯一标识符。在构造函数内部，通过 this.id = id; 将传入的 id 赋值给节点对象的 id 属性。同时，通过 this.neighbors = new Set(); 创建了一个空的 Set，用于存储节点的邻居节点。 
 connect(node) { 
 if (node !== this) { 
 this.neighbors.add(node); 
 node.neighbors.add(this); 
 } 
 }
 //connect(node) 方法用于将当前节点与另一个节点相连。它接受一个参数 node，表示要连接的另一个节点。在方法内部，首先通过 if (node !== this) 判断要连接的节点是否是当前节点本身，以避免将节点与自身相连。然后，通过 this.neighbors.add(node); 将另一个节点添加到当前节点的邻居列表中。同时，通过 node.neighbors.add(this); 将当前节点也添加到另一个节点的邻居列表中，以确保连接是双向的。 
} 
//Node 类代表图中的节点。每个节点具有一个唯一的 id 属性和一个 neighbors 属性，它是一个 Set，用于存储与该节点相邻的其他节点。Node 类还有一个 connect() 方法，用于将当前节点与另一个节点连接起来，同时将另一个节点也添加到当前节点的邻居列表中。
class RandomGraph { 
 constructor(size) 
 //constructor(size) 方法是 RandomGraph 类的构造函数，用于创建随机图对象。它接受一个参数 size，表示图中节点的数量。
 { 
 this.nodes = new Set(); 
 //创建了一个空的 Set，用于存储图中的节点

 // 创建节点
 for (let i = 0; i < size; ++i) 
 //循环用于创建图中的节点。在每次循环中，通过 new Node(i) 创建一个新的节点对象，并将其添加到 nodes 集合中。
{ 
 this.nodes.add(new Node(i)); 
 } 

 // 随机连接节点
 const threshold = 1 / size; 
 for (const x of this.nodes) { 
 for (const y of this.nodes) { 
 if (Math.random() < threshold) { 
 x.connect(y); 
 } 
 } 
 } 
 //接下来的嵌套循环用于随机连接节点。外层循环遍历图中的所有节点 x，内层循环再次遍历所有节点 y。对于每对节点 (x, y)，通过 Math.random() < threshold 判断是否连接这两个节点，其中 threshold 是一个阈值，其值为 1 / size。如果随机数小于阈值，则调用 x.connect(y) 方法将节点 x 和节点 y 连接起来。
 } 
 //这段代码的逻辑是创建一个包含指定数量节点的随机图。首先创建节点并存储在集合中，然后通过随机连接节点的方式创建图的边。

 // 这个方法仅用于调试
 print() 
 //一个用于打印随机图结构的函数。
 { 
 for (const node of this.nodes)
 //是一个迭代 this.nodes 集合中所有节点的循环。每次迭代，node 变量代表当前的节点对象。
 { //创建了一个包含当前节点所有邻居节点的数组。node.neighbors 是一个 Set，通过 ... 操作符将其转换为数组。
 //将邻居节点数组中的每个节点对象转换为其对应的 id 属性值，并返回一个由这些 id 组成的数组。
 //将数组中的 id 用逗号连接成一个字符串。
 // 打印当前节点的 id 和其所有邻居节点的 id。
 const ids = [...node.neighbors] 
 .map((n) => n.id) 
 .join(','); 
 console.log(`${node.id}: ${ids}`); 
 } 
 } 
 //print() 方法用于打印图的结构。它遍历图中的每个节点，并打印出节点的 id 以及与之相邻的节点的 id。
 //print() 方法遍历图中的每个节点，对于每个节点，它打印该节点的 id 和所有邻居节点的 id。这样可以展示出图的结构，每行显示一个节点及其邻居节点的列表。
} 
//RandomGraph 类代表一个随机图，它由多个节点组成。在构造函数中，首先创建了指定数量的节点，并将它们存储在 nodes 属性中。然后，通过遍历所有节点，并在一定的概率下将节点连接起来，从而创建了一个随机图。连接的过程通过 connect() 方法实现。

const g = new RandomGraph(6); 
// 创建了一个新的 RandomGraph 类型的对象 g，并传入参数 6，表示图的大小为 6。
g.print(); 
// 调用了 RandomGraph 类的 print() 方法，用于打印图的结构。
//创建了一个 RandomGraph 实例 g，它包含了6个节点。然后调用 g.print() 方法打印出了图的结构。这段代码首先创建了一个大小为 6 的随机图对象 g，然后调用其 print() 方法，打印图的结构，显示每个节点及其邻居节点的列表。

// 示例输出：
// 0: 2,3,5 
// 1: 2,3,4,5 
// 2: 1,3 
// 3: 0,1,2,4 
// 4: 2,3 
// 5: 0,4 

//图像数据结构非常适合遍历=使用递归生成器刚好合适.如下
```

```js
class Node { 
 constructor(id) { 
 ... 
 } 
 connect(node) { 
 ... 
 } 
} 
class RandomGraph { 
 constructor(size) { 
 ... 
 } 
 print() { 
 ... 
 } 
 isConnected()  
 { 
 const visitedNodes = new Set();
  //首先创建了一个空的 visitedNodes 集合，用于存储已访问过的节点
 function* traverse(nodes)
 //定义了一个名为 traverse() 的内部生成器函数，用于递归地遍历图中的节点。  使用了一个生成器函数，通过递归地遍历节点的邻居来遍历整个图。对于传入的节点集合，首先遍历每个节点，如果该节点未被访问过，则将其添加到生成器的迭代器中，然后递归地调用 traverse() 函数遍历该节点的邻居节点。
 { 
 for (const node of nodes) { 
 if (!visitedNodes.has(node)) { 
 yield node; 
 yield* traverse(node.neighbors); 
 } 
 } 
 } 

 // 取得集合中的第一个节点
 const firstNode = this.nodes[Symbol.iterator]().next().value; 
//通过调用 this.nodes[Symbol.iterator]().next().value 获取了图中的第一个节点，并将其传递给 traverse() 函数进行遍历。

 // 使用递归生成器迭代每个节点
 for (const node of traverse([firstNode])) { 
 visitedNodes.add(node); 
 //遍历过程中，将访问过的节点添加到 visitedNodes 集合中.
 } 
 return visitedNodes.size === this.nodes.size; 
 //最后，通过比较 visitedNodes 集合的大小和图中节点数量的大小来判断图是否连通，如果它们相等，则表示图是连通的。
 } 
}
//该方法使用了 深度优先搜索（DFS）算法 来遍历图，并通过比较访问过的节点数量和图中节点数量的大小来   判断图是否连通。 
```

### 生成器作为默认迭代器

Using a Generator as the Default Iterator.
因为生成器实现了可迭代接口,而且生成器函数和默认迭代器被调用后都产生迭代器,所以生成器格外适合当默认迭代器.

```js
//流程:在对象foo里面有个constructor,还有一个* [Symbol.iterator]() 
class Foo { 
 constructor() { 
 this.values = [1, 2, 3]; 
 } 
* [Symbol.iterator]() { 
 yield* this.values; 
 } 
} 

const f = new Foo(); 
for (const x of f) { 
 console.log(x); 
} 
//for-of 循环调用了默认迭代器（它恰好又是一个生成器函数）并产生了一个生成器对象.其是可以迭代的,可在迭代中使用.

// 1 
// 2 
// 3 
```

### 提前终止生成器

Early Termination of Generators.
与迭代器类似,生成器也可'关闭'.生成器iterator有三个方法:next return throw

```js
function* generatorFn() {} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
console.log(g.next); // f next() { [native code] } 

console.log(g.return); // f return() { [native code] } 
console.log(g.throw); // f throw() { [native code] }
```

1.return()
此方法会强制使进入关闭状态.

```js
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>}悬挂 
console.log(g.return(4)); // { done: true, value: 4 } 提供给 return()方法的值，就是终止迭代器对象的值.4是return进来的.
console.log(g); // generatorFn {<closed>} 
```

```js
//跟迭代器不一样的是,所有生成器对象都有return方法,一进入关闭态,就无法恢复=后续调next会done:true
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g.next()); // { done: false, value: 1 } 
console.log(g.return(4)); // { done: true, value: 4 } 
console.log(g.next()); // { done: true, value: undefined } 
console.log(g.next()); // { done: true, value: undefined } 
console.log(g.next()); // { done: true, value: undefined } 
```

```js
//但是forof循环结构会忽略done:true的iteratorobject内部返回值,什么意思???
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
}

const g = generatorFn(); 
for (const x of g) { 
 if (x > 1) { 
 g.return(4); 
 } 
 console.log(x); 
} 
// 1 
// 2 为什么不是123???
```

2.throw()

会抛一个错误到生成器对象中,

```js
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
const g = generatorFn(); 
console.log(g); // generatorFn {<suspended>} 
try { 
 g.throw('foo'); 
} catch (e) { 
 console.log(e); // foo 
} 
console.log(g); // generatorFn {<closed>}如果错误没处理=生成器会被关闭.
```

```js
//但是假如生成器函数 内部 出现错误,不会关闭.
function* generatorFn() { 
 for (const x of [1, 2, 3]) { 
 try { 
 yield x; 
 } catch(e) {} 
 } 
} 
const g = generatorFn(); 
console.log(g.next()); // { done: false, value: 1} 
g.throw('foo'); 
console.log(g.next()); // { done: false, value: 3} 错误是这样被处理的:跳过对应的yield值,这里是2
```

tip:如果生成器对象还没有开始执行，那么调用 throw()抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。

## 小结

 迭代是一种所有编程语言中都可以看到的模式。ECMAScript 6 正式支持迭代模式并引入了两个新的语言特性：迭代器和生成器。

 迭代器是一个可以由任意对象实现的接口，支持连续获取对象产出的每一个值。任何实现 Iterable接口的对象都有一个 Symbol.iterator 属性，这个属性引用默认迭代器。默认迭代器就像一个迭代器工厂，也就是一个函数，调用之后会产生一个实现 Iterator 接口的对象。

 迭代器必须通过连续调用 next()方法才能连续取得值，这个方法返回一个 IteratorObject。这个对象包含一个 done 属性和一个 value 属性。前者是一个布尔值，表示是否还有更多值可以访问；后者包含迭代器返回的当前值。这个接口可以通过手动反复调用 next()方法来消费，也可以通过原生消费者，比如 for-of 循环来自动消费。

 生成器是一种特殊的函数，调用之后会返回一个生成器对象。生成器对象实现了 Iterable 接口，因此可用在任何消费可迭代对象的地方。生成器的独特之处在于支持 yield 关键字，这个关键字能够暂停执行生成器函数。使用 yield 关键字还可以通过 next()方法接收输入和产生输出。在加上星号之后，yield 关键字可以将跟在它后面的可迭代对象序列化为一连串值。
