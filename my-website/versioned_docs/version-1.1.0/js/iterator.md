# 迭代器与生成器

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
console.log(generatorFn()[Symbol.iterator]()); 
// generatorFn {<suspended>}

const g = generatorFn(); 
console.log(g === g[Symbol.iterator]()); 
// true 

console.log(g);//generatorFn {<suspended>}生成器函数本身的信息

//注意 
 console.log(g[Symbol.iterator]);
 //ƒ [Symbol.iterator]() { [native code] }生成器函数的 Symbol.iterator 方法的信息。
 
console.log(g === g[Symbol.iterator]); 
// false
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
