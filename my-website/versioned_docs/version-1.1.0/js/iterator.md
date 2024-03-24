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
// 可迭代对象
let arr = ['foo', 'bar']; 

// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] } 

// 迭代器
let iter = arr[Symbol.iterator](); 
console.log(iter); // ArrayIterator {} 

// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: true, value: undefined } 
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
