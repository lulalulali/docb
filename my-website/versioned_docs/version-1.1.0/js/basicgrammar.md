# 语言基础

介绍语言的基本概念，包括语法和流控制语句；解释 JavaScript 与其他类 C 语言在语法上的异同点。在讨论内置操作符时也会谈到强制类型转换。此外还将介绍所有的原始类型，包括 Symbol。

语法、数据类型、流控制语句、理解函数

任何语言的核心！都是这门语言在最基本的层面上如何工作，涉及语法、操作符、数据类型和内置功能。

ECMAScript 是 ECMA 制定的一种脚本语言标准，用于定义脚本语言的核心特性。ECMA（European Computer Manufacturers Association）是一个国际标准组织，成立于1961年，总部位于瑞士。它的任务是制定计算机和通信设备的标准，以促进这些设备的互操作性和相互兼容性。ECMA 有多个技术委员会，每个委员会负责制定不同领域的标准。

## 语法

ECMAScript是宽松语法，借鉴了c和类c的语言，如java和perl

### 区分大小写

无论是变量、函数名还是操作符，都区分大小写！即test和Test是完全不同的变量。关键字不能用作你的函数名，例如typeof，但是你可以定义一个Typeof函数，这是ok的。

### 标识符

例如：firstSecond myCar

关键字、保留字、true、false、null不能作为标志符。？

### 注释

单行注释// 多行注释``/* */``

### 严格模式

ecmascript5的严格模式会处理script3的一些写法。严格了又能怎么样？需启用严格模式，脚本开头"use strict";也可以在函数体里面用，放在函数的花括号里的开头即可。

### 语句

语句结束记得加分号；好处多

if(条件)之后后用花括号``{}`` 使之成为代码块，有好处

## 2.关键字与保留字

关键字break do in typeof case else instanceof var catch export new void class extends return while const finally super with continue for switch yield debugger function this default if throw delete import try

保留字是潜力股，有望发展成关键字。你也别用。

始终保留enum
严格模式下保留:implements package public interface protected static let private
模块代码中保留:await

## 3.变量

3个关键字可以声明变量var const let
var所有版本都行，另外2得在6以后的ecma版本

### var关键字

var message;//关键字 变量名；
没初始化，message保存的值就是undefined

```js
var message = "hi"; 
message = 100; // 合法，但不推荐
```

#### var的声明作用域

```js
function test() { 
 var message = "hi"; // 局部变量
} 
test(); 
console.log(message); // 出错！

function test() { 
 message = "hi"; // 全局变量
} 
test(); 
console.log(message); // "hi" 
```

定义多变量用，分隔

```js
var abc="hello",
    bcd=2,
    cde=true;
```

#### var声明提升

意思就是在函数的作用域内，也就是花括号内，var age=28会先跑var age；

### let声明

let是块作用域，也就是出了所在块就无法打印了。而var是函数作用域，块外函数内仍旧可以。

let不允许重复声明，即let abc；×2或var abc加上let abc会出错

js引擎会记住变量声明的标志符即所在的块作用域

#### 其它异同

多用let，少用var

暂时性死区：let声明的变量不会在作用域中被提升，即打印必须在声明后；但var可以在声明前。有什么用？

全局声明：console.log(window.name); 打印name，假如是let声明的name，打印不出来；var声明的，此打印可以。有什么用？

条件声明：let的作用域是块，块就是``<script>``.也就是说假如let在第一块中声明了一个变量s，第二块你不能再声明s；但var可以这么做。就是说let声明过的，你接下来用，哪怕是在另一个``<script>``中，你不能再声明，直接赋值即可。有什么用？

for循环中的let声明：

```js
for (var i = 0; i < 5; ++i) { 
 setTimeout(() => console.log(i), 0) 
} 
```

输出5、5、5、5、5因为虽然每跑一次变量都出现一次超时函数但只有循环走完才执行超时函数的逻辑；但是换成let就是0、1、2、3、4，因为let每次都走声明，每次循环都是新声明

### const声明

声明并赋值以后不能再声明或赋值，作用域也是块。声明变量person的内部属性name可以赋值，即person.name可以赋值。

遍历属性名

```js
for (const key in {a: 1, b: 2}) { 
 console.log(key); 
} 
```

遍历值const value

### 声明风格及最佳实践

不使用var，const优先，let次之。知道变量的值未来会变时再用let

## 数据类型

有6种：undefined null boolean number string symbol
还有一种：object

### typeof操作符

```js
let message = "some string"; 
console.log(typeof message); // "string" 
console.log(typeof(message)); // "string" 
console.log(typeof 95); // "number"
```

操作符它不是函数，所以它不需参数，虽然也可以。它返回一个字符串，这个字符串表明数据类型，是undefined Boolean string number object function symbol

### undefined类型

```js
let message; // 这个变量被声明了，只是值为 undefined 
// age 没有声明 
if (message) { 
 // 这个块不会执行
} 
if (!message) { 
 // 这个块会执行
} 
if (age) { 
 // 这里会报错
}
```

### null类型

mull表示一个空对象指针。变量要保存对象，但是没对象，就用null填充。

```js
let message = null; 
let age; 
if (message) { 
 // 这个块不会执行
} 
if (!message) { 
 // 这个块会执行
} 
if (age) { 
 // 这个块不会执行
} 
if (!age) { 
 // 这个块会执行
} 
```

### boolean类型

哪些会在条件中被转换成true：非空字符串、非0数值、任意对象、N/A；哪些会false：空字符串、0、NaN、null、undefined

### number类型

#### 浮点值

不要测试浮点值，即两个浮点值相加不一定跟你想象的完全一致。计算机的特性？

#### 值的范围

监测超出有限数值范围的计算，使用inFinite函数

#### NaN

nan不等于任何东西，也不等于nan。nan操作来操作去还是nan

哪些是nan：nan blue

哪些不是nan：10 "10" true

#### 数值转换

3个将非数值转换成数值的函数

int是integer的缩写，整数的意思

Number（）：一个取数函数 它输出的是0、1、NaN或者数

parseInt（）：取（）内的字符串含的数，输出的是NaN或者整数，它也能识别其他进制。

let num1 = parseInt("10", x);x是进制方法，10是x进制的10

parseFloat()：输出0或者小数或整数，输入只能阅读十进制；可以读字符串，只关注里面的数

### string类型

字符串使用什么包起来？单引号 双引号 反引号 均可，注意前后一致性。

#### 字符字面量

字符字面量就是用来表示一个字符，什么字符呢？非打印字符或有其它用途的字符。怎么用不知道。。。

#### 字符串的特点

即字符串的拼接，字符串一旦创建就不可变immutable，所以字符串拼接时等式左边会重新分配空间给拼接后的字符，填充完毕后，删掉原先的字符串。

#### 转换为字符串

两种方法：1、变量.toString()给出一个字符串，变量不能是null和undefined。特有的一种，即（）可以放东西的情况，是将一个数变成你想要的进制的字符串。（）放进制数。例如：console.log(num.toString(8)); // "12"  num是10   如果不放就是十进制。

```js
let value1 = 10; 
let value2 = true; 
let value3 = null; 
let value4; 
console.log(String(value1)); // "10" 
console.log(String(value2)); // "true" 
console.log(String(value3)); // "null" 
console.log(String(value4)); // "undefined"
```

2、值+""  也是转换为字符串的方法

#### 模板字面量

即`` ，即用来定义模板的。以换行符开头，即第一个字符是[0].怎么用，干嘛的？

#### 字符串插值

```js
let value = ''; 
function append() { 
 value = `${value}abc` 
 console.log(value); 
} 
append(); // abc 
append(); // abcabc 
append(); // abcabcabc 
```

就是使用`{}`使得花括号里面的变量强制转换成字符串。这就叫插值符号。上面的例子再写一个循环，就可以实现字符串固定增加几个字符

#### 模板字面量标签函数

function simpleTag（）是个什么函数？
完全没看懂啊

```javascript
function zipTag(strings, ...expressions) { 
  return strings[0] + 
    expressions.map((e, i) => `${e}${strings[i + 1]}`) 
    .join(''); 
}
```

1. `function zipTag(strings, ...expressions) {`：
   - 定义了一个名为 `zipTag` 的函数。
   - `strings` 是一个包含模板字面量中所有字符串部分的数组。
   - `expressions` 是一个包含模板字面量中所有插值表达式的数组。

```js
2. `return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');`：
   - `strings[0]` 表示模板字面量中的第一个字符串部分，它将是最终结果的开头。
   - `expressions.map((e, i) => `${e}${strings[i + 1]}`)`：使用 `map` 方法遍历 `expressions` 数组，对每个插值表达式进行处理。
      - 对于每个表达式 `e` 和对应的字符串部分 `strings[i + 1]`，使用模板字符串将它们拼接在一起。
   - `.join('')`：将处理后的字符串数组拼接成一个字符串，形成模板字面量的最终结果。
```

这个函数的作用是将模板字面量的各个部分重新组合成一个字符串。它通过 `map` 方法遍历插值表达式数组，将每个表达式和其对应的字符串部分拼接在一起，最后使用 `join('')` 将它们连接成一个字符串。这样做的效果是，保留了模板字面量中原始字符串的排列顺序，但将插值表达式的值插入其中。

#### 原始字符串

```js
for (const rawString of strings.raw) { 
 console.log(rawString); 
 } 
```

干嘛的？看不懂，啥叫取字符串的原始内容？

### symbol类型

symbol即符号，不是为了提供属性行为的，就是来创建唯一记号，而是非字符串形式的对象属性。

```js
const mySymbol = Symbol("abc");
```

这行代码创建了一个符号（Symbol）并将其赋值给变量 `mySymbol`。`Symbol` 是 JavaScript 中的原始数据类型之一，用于表示独一无二的值。

在这个例子中，`Symbol("abc")` 创建了一个带有可选描述 `"abc"` 的符号。描述仅用于标识符号的目的或含义，而不会影响符号的唯一性。

使用符号的基本语法是：

```javascript
const mySymbol = Symbol([description]);
```

- `description`（可选）是一个字符串，用于描述符号的目的。如果省略，符号将没有描述。

示例中的代码创建了一个具有描述 "abc" 的符号，并将它赋值给变量 `mySymbol`。这个符号是独一无二的，即使在其他地方使用相同描述的 `Symbol("abc")` 创建的符号也是不同的。

符号通常用于创建对象的私有属性、防止命名冲突以及在一些特定编程模式中标识唯一性。

#### 符号的基本用法

使用Symbol（）函数初始化。本身就是类型，所以typeof返回symbol。符号没有字面量语法，什么意思？为什么是发挥作用的关键？没与就对喽！

"符号没有字面量语法" 意味着在JavaScript 中创建符号（Symbol）时，没有一种类似于字符串、数字或布尔值等其他原始类型的直接字面量表示法。也就是说，你不能像创建字符串一样使用字面量形式创建符号。

例如，字符串有字面量语法：

```javascript
const myString = "Hello, World!";
```

而符号没有直接的字面量语法。创建符号需要使用 `Symbol` 构造函数：

```javascript
const mySymbol = Symbol("description");
```

在这里，`Symbol("description")` 创建了一个具有可选描述的唯一符号。描述只是一个可选的字符串，用于标识符号的目的或含义。

符号的主要特点是其唯一性。每个由 `Symbol` 构造函数创建的符号都是独一无二的，即使它们的描述相同。这个唯一性对于创建对象的私有属性、避免命名冲突、以及在特定上下文中使用唯一标识符非常有用。

由于符号的唯一性，它们在一些特定的编程模式中发挥了关键的作用，例如：

1. 对象属性的私有化： 使用符号作为对象的属性键，可以避免与其他属性冲突，并使属性更难以被意外访问。

    ```javascript
    const mySymbol = Symbol("private");
    
    const myObject = {
      [mySymbol]: "This is a private property"
    };
    ```

2. 创建独一无二的常量： 可以使用符号来创建独一无二的常量，以防止其它代码重写这些常量。

    ```javascript
    const RED = Symbol("red");
    const GREEN = Symbol("green");
    ```

总之，虽然符号没有直接的字面量语法，但它们的唯一性和用途使它们在某些情境下发挥了关键的作用。

```js
let mySymbol = Symbol(); 
let myWrappedSymbol = Object(mySymbol); 
console.log(typeof myWrappedSymbol); // "object"
```

使用符号包装对象

#### 使用全局符号注册表

Symbol.for()来全局

Symbol.keyFor()来查询全局注册表，只能查全局注册的符号，如果是不全局符号，会返回undefined；如果不是符号，则会抛出TypeError

#### 使用符号作为属性

Object.getOwnPropertyNames()返回name属性，即常规属性，

Object.getOwnProperty.Symbols()返回symbol属性。

Object.getOwnProperty.Descriptors()上面的两种都返回

Reflect.ownKeys()返回上面的description里面的东西，即name和symbol后面的东西

对于没显式保存的，即``[Symbol('foo')]: 'foo val'``这样的，
使用下方的遍历句，返回相应的属性里的东西

```js
let s1 = Symbol('foo'), 
 s2 = Symbol('bar'); 
let o = { 
 [s1]: 'foo val', 
 [s2]: 'bar val', 
 baz: 'baz val', 
 qux: 'qux val' 
}; 
console.log(Object.getOwnPropertySymbols(o)); 
// [Symbol(foo), Symbol(bar)] 
console.log(Object.getOwnPropertyNames(o)); 
// ["baz", "qux"] 
console.log(Object.getOwnPropertyDescriptors(o)); 
// {baz: {...}, qux: {...}, Symbol(foo): {...}, Symbol(bar): {...}} 
console.log(Reflect.ownKeys(o)); 
// ["baz", "qux", Symbol(foo), Symbol(bar)]
分隔
let o = { 
 [Symbol('foo')]: 'foo val', 
 [Symbol('bar')]: 'bar val' 
}; 
console.log(o); 
// {Symbol(foo): "foo val", Symbol(bar): "bar val"} 
let barSymbol = Object.getOwnPropertySymbols(o) 
 .find((symbol) => symbol.toString().match(/bar/)); 
console.log(barSymbol); 
// Symbol(bar) 
```

```js
let o = { 
 [Symbol('foo')]: 'foo val', 
 [Symbol('bar')]: 'bar val',
 baz: 'baz val', 
 qux: 'qux val'};  
console.log(o); 
// {Symbol(foo): "foo val", Symbol(bar): "bar val"} 
let barSymbol = Object.getOwnPropertyNames(o) 
 .find((name) => name.toString().match(/baz/)); 
console.log(barSymbol); 
// baz
```

#### 常用内置符号

@@iterator 指的就是 Symbol.iterator

暴露语言内部的行为

#### Symbol.asyncIterator

Symbol.asyncIterator，这个符号表示实现异步迭代器 API 的函数。看不懂，什么鬼？

这段代码定义了一个包含 `Symbol.asyncIterator` 方法的异步生成器函数。让我们逐词解释并打个比方说明功能：

```javascript
async *[Symbol.asyncIterator]() {
  while (this.asyncIdx < this.max) {
    yield new Promise((resolve) => resolve(this.asyncIdx++));
  }
}
```

1. `async *`:
   - 这部分定义了一个异步生成器函数。异步生成器是一种特殊类型的函数，它可以使用 `yield` 语句来产生一系列的值。
2. `[Symbol.asyncIterator]() {`:
   - 这是一个特殊的方法名，使用了 `Symbol.asyncIterator` 符号。当一个对象实现了这个方法，它就成为了一个异步可迭代对象，可以通过 `for await...of` 循环进行遍历。
3. `while (this.asyncIdx < this.max) {`:
   - 这是一个 `while` 循环，它的条件是 `this.asyncIdx` 小于 `this.max`。这意味着循环将一直执行，直到 `asyncIdx` 达到 `max`。
4. `yield new Promise((resolve) => resolve(this.asyncIdx++));`:
   - `yield` 用于从异步生成器中产生值。
   - 在这里，每次循环迭代，它产生一个 `Promise` 对象，这个 Promise 对象会在 `resolve` 被调用时解决为当前的 `this.asyncIdx` 值，然后 `this.asyncIdx` 递增。
   - 这样，每次迭代都会产生一个解决为递增数字的 Promise。

```javascript
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    let asyncIdx = 0;
    const max = 5;

    while (asyncIdx < max) {
      yield new Promise((resolve) => resolve(asyncIdx++));
    }
  }
};
(async () => {
  for await (const value of asyncIterable) {
    console.log(value);
  }
})();
```

这个例子创建了一个异步可迭代对象 `asyncIterable`，通过 `for await...of` 循环遍历了这个对象。在每次迭代中，它产生了一个 Promise，这个 Promise 在被解决时得到了递增的数字。输出结果会是：

```log
0
1
2
3
4
```

#### Symbol.hasInstance

```js
function Foo() {} 
let f = new Foo(); 
console.log(Foo[Symbol.hasInstance](f)); // true
```

Foo函数有实例f

```javascript
class Bar {}
class Baz extends Bar {
  static [Symbol.hasInstance]() {
    return false;
  }
}
let b = new Baz();
console.log(Bar[Symbol.hasInstance](b)); // true
console.log(b instanceof Bar); // true
console.log(Baz[Symbol.hasInstance](b)); // false
console.log(b instanceof Baz); // false
```

1. `class Bar {}`：
   - 定义了一个名为 `Bar` 的类。
2. `class Baz extends Bar { ... }`：
   - 定义了一个名为 `Baz` 的类，它继承自 `Bar` 类。
3. `static [Symbol.hasInstance]() { return false; }`：
   - `Symbol.hasInstance` 是一个特殊的符号，用于定制一个对象的 `instanceof` 行为。
   - 这里，`Baz` 类的静态方法 `[Symbol.hasInstance]` 被定义为总是返回 `false`，即 `Baz` 类的实例永远不会被认为是 `Baz` 类的实例。
4. `let b = new Baz();`：
   - 创建了一个 `Baz` 类的实例，并将其赋值给变量 `b`。
5. `console.log(Bar[Symbol.hasInstance](b)); // true`：
   - 使用 `Bar` 类的 `[Symbol.hasInstance]` 方法判断 `b` 是否是 `Bar` 类的实例。由于 `Baz` 继承自 `Bar`，所以返回 `true`。
6. `console.log(b instanceof Bar); // true`：
   - 使用 `instanceof` 操作符判断 `b` 是否是 `Bar` 类的实例。同样，由于 `Baz` 继承自 `Bar`，所以返回 `true`。
7. `console.log(Baz[Symbol.hasInstance](b)); // false`：
   - 使用 `Baz` 类的 `[Symbol.hasInstance]` 方法判断 `b` 是否是 `Baz` 类的实例。由于这个方法被重写为总是返回 `false`，所以返回 `false`。
8. `console.log(b instanceof Baz); // false`：
   - 使用 `instanceof` 操作符判断 `b` 是否是 `Baz` 类的实例。由于 `[Symbol.hasInstance]` 方法返回 `false`，所以返回 `false`。

比喻说明功能：
假设 `Bar` 类代表了所有动物，`Baz` 类是 `Bar` 类的子类，但它通过修改 `[Symbol.hasInstance]` 方法来说：“我不希望被认为是动物的一种”，而实例 `b` 是一个具体的动物。当你用 `instanceof` 操作符检查这个动物时，它表现得就像是一种动物（因为 `Baz` 继承自 `Bar`），但当你用 `Baz[Symbol.hasInstance]` 方法检查时，它说：“不，我不是这个类的实例”，因此返回 `false`。

什么重写？大概懂了，但还是没懂

#### Symbol.isConcatSpreadable

就是拼接之前要打开一下，设置为true

```javascript
let initial = ['foo'];
let array = ['bar'];
// 第一组例子
console.log(array[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(array)); // ['foo', 'bar']
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array)); // ['foo', Array(1)]
// 第二组例子
let arrayLikeObject = { length: 1, 0: 'baz' };
console.log(arrayLikeObject[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(arrayLikeObject)); // ['foo', {...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(arrayLikeObject)); // ['foo', 'baz']
// 第三组例子
let otherObject = new Set().add('qux');
console.log(otherObject[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(otherObject)); // ['foo', Set(1)]
otherObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(otherObject)); // ['foo']
```

1. 第一组例子：
   - `array[Symbol.isConcatSpreadable]` 是 `undefined`，表示在数组 `array` 上没有设置 `Symbol.isConcatSpreadable` 属性。
   - `initial.concat(array)` 将 `initial` 数组和 `array` 数组连接起来，结果是 `['foo', 'bar']`。
   - `array[Symbol.isConcatSpreadable] = false;` 设置了 `array` 数组的 `Symbol.isConcatSpreadable` 属性为 `false`，表示在连接时不展开。
2. 第二组例子：
`{ length: 1, 0: 'baz' }：`
这是一个对象字面量（object literal）。
length: 1 表示这个对象有一个属性名为 length，其值为 1。
0: 'baz' 表示这个对象有一个属性名为 0，其值为 'baz'。
整体表示一个类似于数组的对象，被称为类数组对象（array-like object）。
   - `arrayLikeObject[Symbol.isConcatSpreadable]` 是 `undefined`，表示在对象 `arrayLikeObject` 上没有设置 `Symbol.isConcatSpreadable` 属性。
   - `initial.concat(arrayLikeObject)` 将 `initial` 数组和类数组对象 `arrayLikeObject` 连接，结果是 `['foo', {...}]`，因为对象不会被展开。
   - `arrayLikeObject[Symbol.isConcatSpreadable] = true;` 设置了 `arrayLikeObject` 对象的 `Symbol.isConcatSpreadable` 属性为 `true`，表示在连接时展开。
3. 第三组例子：
   - `otherObject[Symbol.isConcatSpreadable]` 是 `undefined`，表示在 Set 对象 `otherObject` 上没有设置 `Symbol.isConcatSpreadable` 属性。
   - `initial.concat(otherObject)` 将 `initial` 数组和 Set 对象 `otherObject` 连接，结果是 `['foo', Set(1)]`，因为 Set 对象不会被展开。
   - `otherObject[Symbol.isConcatSpreadable] = true;` 设置了 `otherObject` Set 对象的 `Symbol.isConcatSpreadable` 属性为 `true`，表示在连接时展开。

比喻说明功能：
考虑这些对象像是不同类型的容器，`Symbol.isConcatSpreadable` 的存在与否影响它们在连接操作中的展开行为。如果 `Symbol.isConcatSpreadable` 为 `true`，它们会被展开；如果为 `false` 或 `undefined`，它们不会被展开，而是整个对象作为一个元素添加到数组中。这个特性允许你控制连接操作中对象的展开与否。

#### Symbol.iterator

迭代器在第7章讲述.`*[Symbol.iterator]()`

```javascript
class Foo {
  *[Symbol.iterator]() {}
}
let f = new Foo();
console.log(f[Symbol.iterator]());
// Generator {<suspended>}
```

1. `class Foo { *[Symbol.iterator]() {} }`：   - 这是一个 ES6（ECMAScript 2015）中的类定义。
   - `class Foo` 声明了一个名为 `Foo` 的类。
   - `*[Symbol.iterator]() {}` 定义了该类的 `[Symbol.iterator]` 方法，这是一个生成器方法。这个方法使用了 `*` 表示生成器函数，表示它将返回一个生成器对象。
2. `let f = new Foo();`：   - 这行代码创建了一个名为 `f` 的变量，并实例化了 `Foo` 类，得到一个 `Foo` 类的对象。
3. `console.log(f[Symbol.iterator]());`：   - 这行代码调用了 `f` 对象的 `[Symbol.iterator]` 方法，返回了一个生成器对象。
   - `console.log` 打印了这个生成器对象。
4. `// Generator {<suspended>}`：   - 这是打印出的生成器对象的表示形式。
   - `Generator` 表示这是一个生成器对象。
   - `{<suspended>}` 表示生成器当前处于暂停状态。

比喻说明功能：考虑这个类 `Foo` 就像是一个工厂，它可以生产生成器对象。生成器对象是一种特殊的对象，可以用于迭代，而 `[Symbol.iterator]` 方法是这个工厂的生产线。通过实例化 `Foo` 类，你就得到了一个能够产生生成器对象的工厂，调用 `[Symbol.iterator]` 方法就好比是按下了生产线的按钮，得到了一个生成器对象，这个生成器对象当前处于暂停状态。

```javascript
class Emitter {
  constructor(max) {
    this.max = max;
    this.idx = 0;
  }
  *[Symbol.iterator]() {
    while(this.idx < this.max) {
      yield this.idx++;
    }
  }
}
function count() {
  let emitter = new Emitter(5);
  for (const x of emitter) {
    console.log(x);
  }
}
count();
```

1. `class Emitter { constructor(max) { ... }`：   - 这是一个类定义，名为 `Emitter`，用于创建事件发射器的实例。
   - 构造函数 `constructor` 接收一个参数 `max`，表示事件发射器能够产生的最大值。
2. `*[Symbol.iterator]() { while(this.idx < this.max) { yield this.idx++; } }`：
   - 这是 `Emitter` 类的 `[Symbol.iterator]` 方法的定义，也是一个生成器函数。
   - 当通过迭代器访问时，这个生成器函数产生一个序列，从 `0` 到 `max-1`。
   - 使用 `yield` 将每个值生成，并在生成后将 `idx` 自增。
3. `function count() { let emitter = new Emitter(5); ... }`：
   - 这是一个名为 `count` 的函数。
   - 在函数内部创建了一个 `Emitter` 类的实例，`emitter` 是一个事件发射器，被限制在产生 `0` 到 `4` 的值。
4. `for (const x of emitter) { console.log(x); }`：
   - 使用 `for...of` 循环遍历 `emitter` 产生的序列。
   - 每次迭代，将产生的值赋给变量 `x`，然后通过 `console.log` 打印这个值。
5. `count();`：
   - 调用函数 `count`，触发了事件发射器的迭代，将产生的值逐个打印出来。

比喻说明功能：可以将 `Emitter` 类比作一个事件发射器工厂，通过实例化该工厂，得到一个可以产生特定范围内值的事件发射器。`count` 函数就像是在使用这个事件发射器，通过迭代器逐个获取值并进行操作，这里是打印每个值。整个过程就像是从事件发射器中发出的一系列事件，被逐个捕获并进行处理。

#### Symbol.match

该属性表示：一个正则RegExp 即Regular Expression表达式方法，方法干什么的呢？使得匹配字符串。 由String.prototype.match()使用.

```javascript
console.log(RegExp.prototype[Symbol.replace]);
// ƒ [Symbol.replace]() { [native code] }
console.log('foobarbaz'.replace(/bar/, 'qux'));
// 'fooquxbaz'
```

1. `console.log(RegExp.prototype[Symbol.replace]);`：
   - 这行代码打印了 `RegExp` 原型对象的 `[Symbol.replace]` 方法。
   - `[Symbol.replace]` 是一个内置的符号，用于定制字符串替换操作的行为。
   - 打印结果显示了一个函数，`[native code]` 表示这是一个由浏览器提供的原生函数实现。
2. `console.log('foobarbaz'.replace(/bar/, 'qux'));`：
   - 这行代码演示了使用正则表达式进行字符串替换。
   - `'foobarbaz'` 是原始字符串。
   - `.replace(/bar/, 'qux')` 是调用字符串的 `replace` 方法，使用正则表达式 `/bar/` 进行匹配，并将匹配到的部分替换为 `'qux'`。
   - 打印结果是替换后的字符串 `'fooquxbaz'`。

比喻说明功能：考虑这个例子就像是有一个全局的字符串替换工具，通过 `RegExp.prototype[Symbol.replace]` 定义了字符串替换的原生操作。当你调用字符串的 `replace` 方法时，实际上是调用了这个全局工具，指定了匹配规则和替换值。在这个例子中，正则表达式 `/bar/` 匹配了字符串 `'foobarbaz'` 中的 `'bar'`，然后将其替换为 `'qux'`，得到了最终的替换结果 `'fooquxbaz'`。

一个全局工具，`.replace`是调用这个功能

```javascript
class FooMatcher {
  static [Symbol.match](target) {
    return target.includes('foo');
  }
}
console.log('foobar'.match(FooMatcher)); // true
console.log('barbaz'.match(FooMatcher)); // false
class StringMatcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.match](target) {
    return target.includes(this.str);
  }
}
console.log('foobar'.match(new StringMatcher('foo'))); // true
console.log('barbaz'.match(new StringMatcher('qux'))); // false
```

1. `class FooMatcher { static [Symbol.match](target) { ... } }`：
   - 这是一个名为 `FooMatcher` 的类定义。
   - 使用了静态方法 `[Symbol.match]`，该方法用于定制字符串匹配操作的行为。
   - 在这个例子中，`FooMatcher` 类定义了匹配规则，如果目标字符串包含 `'foo'`，则匹配成功。
2. `console.log('foobar'.match(FooMatcher));`：
   - 这行代码演示了使用 `FooMatcher` 类的静态 `[Symbol.match]` 方法。
   - 调用字符串 `'foobar'` 的 `match` 方法，传入 `FooMatcher` 类，检查是否符合匹配规则。
   - 结果是 `true`，因为 `'foobar'` 中包含了 `'foo'`。
3. `console.log('barbaz'.match(FooMatcher));`：
   - 同样，调用字符串 `'barbaz'` 的 `match` 方法，检查是否符合 `FooMatcher` 类的匹配规则。
   - 结果是 `false`，因为 `'barbaz'` 中不包含 `'foo'`。
4. `class StringMatcher { constructor(str) { ... } [Symbol.match](target) { ... } }`：
   - 这是一个名为 `StringMatcher` 的类定义，带有构造函数用于接收匹配字符串。
   - 实例方法 `[Symbol.match]` 用于定制字符串匹配操作的行为。
   - 在这个例子中，`StringMatcher` 类定义了匹配规则，如果目标字符串包含了 `StringMatcher` 实例的指定字符串，则匹配成功。
5. `console.log('foobar'.match(new StringMatcher('foo')));`：
   - 这行代码演示了使用 `StringMatcher` 类的实例的 `[Symbol.match]` 方法。
   - 创建了一个 `StringMatcher` 实例，用于匹配字符串 `'foo'`。
   - 调用字符串 `'foobar'` 的 `match` 方法，传入 `StringMatcher` 实例，检查是否符合匹配规则。
   - 结果是 `true`，因为 `'foobar'` 中包含了 `'foo'`。
6. `console.log('barbaz'.match(new StringMatcher('qux')));`：
   - 同样，调用字符串 `'barbaz'` 的 `match` 方法，传入另一个 `StringMatcher` 实例，检查是否符合匹配规则。
   - 结果是 `false`，因为 `'barbaz'` 中不包含了 `StringMatcher` 实例指定的字符串 `'qux'`。
比喻说明功能：可以将这个例子比喻成两个不同的字符串匹配规则制定器。`FooMatcher` 是一个静态的规则制定器，它检查字符串是否包含 `'foo'`。而 `StringMatcher` 是一个实例化的规则制定器，它接收一个特定的字符串，并检查目标字符串是否包含该特定字符串。通过使用不同的规则制定器，可以自定义匹配操作的行为。

#### Symbol.replace

一个正则方法：替换串中我选的子串。``console.log(RegExp.prototype[Symbol.replace]);console.log('foobar'.match(FooMatcher)); // true
`` 意思就是我只找foo，foobar里面刚好有foo。而下面第二个class是实例化的制定器。

大概意思就是测试含不含。

```javascript
class FooMatcher {
  static [Symbol.match](target) {
    return target.includes('foo');
  }
}
console.log('foobar'.match(FooMatcher)); // true
console.log('barbaz'.match(FooMatcher)); // false

class StringMatcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.match](target) {
    return target.includes(this.str);
  }
}
console.log('foobar'.match(new StringMatcher('foo'))); // true
console.log('barbaz'.match(new StringMatcher('qux'))); // false
```

1. `class FooMatcher { static [Symbol.match](target) { ... } }`：
   - 这是一个名为 `FooMatcher` 的类定义。
   - 使用了静态方法 `[Symbol.match]`，该方法用于定制字符串匹配操作的行为。
   - 在这个例子中，`FooMatcher` 类定义了匹配规则，如果目标字符串包含 `'foo'`，则匹配成功。
2. `console.log('foobar'.match(FooMatcher));`：
   - 这行代码演示了使用 `FooMatcher` 类的静态 `[Symbol.match]` 方法。
   - 调用字符串 `'foobar'` 的 `match` 方法，传入 `FooMatcher` 类，检查是否符合匹配规则。
   - 结果是 `true`，因为 `'foobar'` 中包含了 `'foo'`。
3. `console.log('barbaz'.match(FooMatcher));`：
   - 同样，调用字符串 `'barbaz'` 的 `match` 方法，检查是否符合 `FooMatcher` 类的匹配规则。
   - 结果是 `false`，因为 `'barbaz'` 中不包含 `'foo'`。
4. `class StringMatcher { constructor(str) { ... } [Symbol.match](target) { ... } }`：
   - 这是一个名为 `StringMatcher` 的类定义，带有构造函数用于接收匹配字符串。
   - 实例方法 `[Symbol.match]` 用于定制字符串匹配操作的行为。
   - 在这个例子中，`StringMatcher` 类定义了匹配规则，如果目标字符串包含了 `StringMatcher` 实例的指定字符串，则匹配成功。
5. `console.log('foobar'.match(new StringMatcher('foo')));`：
   - 这行代码演示了使用 `StringMatcher` 类的实例的 `[Symbol.match]` 方法。
   - 创建了一个 `StringMatcher` 实例，用于匹配字符串 `'foo'`。
   - 调用字符串 `'foobar'` 的 `match` 方法，传入 `StringMatcher` 实例，检查是否符合匹配规则。
   - 结果是 `true`，因为 `'foobar'` 中包含了 `'foo'`。
6. `console.log('barbaz'.match(new StringMatcher('qux')));`：
   - 同样，调用字符串 `'barbaz'` 的 `match` 方法，传入另一个 `StringMatcher` 实例，检查是否符合匹配规则。
   - 结果是 `false`，因为 `'barbaz'` 中不包含了 `StringMatcher` 实例指定的字符串 `'qux'`。

比喻说明功能：可以将这个例子比喻成两个不同的字符串匹配规则制定器。`FooMatcher` 是一个静态的规则制定器，它检查字符串是否包含 `'foo'`。而 `StringMatcher` 是一个实例化的规则制定器，它接收一个特定的字符串，并检查目标字符串是否包含该特定字符串。通过使用不同的规则制定器，可以自定义匹配操作的行为。

#### Symbol.search

一个正则方法：返回字符串中匹配正则式的索引。