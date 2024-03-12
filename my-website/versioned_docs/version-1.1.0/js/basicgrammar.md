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

**标识符**是在编程语言中用来标识变量、函数、属性或其他用户自定义项的名称。在大多数编程语言中，标识符必须遵循一定的命名规则，通常包括以下规定：

- 只能包含字母（大写或小写）、数字（0-9）、下划线 (_) 或美元符号 ($)。
- 第一个字符不能是数字。
- 不能是保留关键字（例如，语言中预留给编程语言使用的特殊单词）。

**标识符查找**是指在程序执行过程中，根据标识符的名称查找相应的变量、函数、属性等的过程。当程序中使用一个标识符时，编程语言需要找到与该标识符相关联的实体，并根据上下文使用它。

**比方说明：**

想象一下你的程序是一座大图书馆，而标识符就是书的书名。当你在程序中使用一个标识符时，就好比你在图书馆里寻找一本书。标识符的查找过程就像你在图书馆中寻找特定书籍的过程一样。

例如，在JavaScript中：

```javascript
let myVariable = 42;

function myFunction() {
    console.log("Hello, World!");
}

// 在这里，myVariable 和 myFunction 就是标识符
// 当程序执行到这里时，JavaScript 需要查找这两个标识符对应的值或行为

console.log(myVariable);  // 查找 myVariable 的值
myFunction();             // 查找并执行 myFunction
```

在这个例子中，`myVariable` 和 `myFunction` 就是标识符。当程序执行到使用它们的地方时，JavaScript 引擎会进行标识符查找，找到相应的值或行为。这就好比你在图书馆中查找书籍一样，通过书名找到相应的书。

### 注释

单行注释// 多行注释``/ /``

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
async [Symbol.asyncIterator]() {
  while (this.asyncIdx < this.max) {
    yield new Promise((resolve) => resolve(this.asyncIdx++));
  }
}
```

1. `async`:
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
  async [Symbol.asyncIterator]() {
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

迭代器在第7章讲述.`[Symbol.iterator]()`

```javascript
class Foo {
  [Symbol.iterator]() {}
}
let f = new Foo();
console.log(f[Symbol.iterator]());
// Generator {<suspended>}
```

1. `class Foo { [Symbol.iterator]() {} }`：   - 这是一个 ES6（ECMAScript 2015）中的类定义。
   - `class Foo` 声明了一个名为 `Foo` 的类。
   - `[Symbol.iterator]() {}` 定义了该类的 `[Symbol.iterator]` 方法，这是一个生成器方法。这个方法使用了 `` 表示生成器函数，表示它将返回一个生成器对象。
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
  [Symbol.iterator]() {
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
2. `[Symbol.iterator]() { while(this.idx < this.max) { yield this.idx++; } }`：
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

一个正则方法：返回字符串中匹配正则式的索引。就是你给的字符串是不是含在目标串里面，不是返回-1，是的话返回你起始字符的位置数即foo的f是目标串中的第几个。

```javascript
console.log(RegExp.prototype[Symbol.search]);
// ƒ [Symbol.search]() { [native code] }
console.log('foobar'.search(/bar/));
// 3

class FooSearcher {
  static [Symbol.search](target) {
    return target.indexOf('foo');
  }
}
console.log('foobar'.search(FooSearcher)); // 0
console.log('barfoo'.search(FooSearcher)); // 3
console.log('barbaz'.search(FooSearcher)); // -1

class StringSearcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.search](target) {
    return target.indexOf(this.str);
  }
}
console.log('foobar'.search(new StringSearcher('foo'))); // 0
console.log('barfoo'.search(new StringSearcher('foo'))); // 3
console.log('barbaz'.search(new StringSearcher('qux'))); // -1
```

1. `console.log(RegExp.prototype[Symbol.search]);`：
   - 这行代码打印了 `RegExp` 原型对象的 `[Symbol.search]` 方法。
   - `[Symbol.search]` 是一个内置的符号，用于定制字符串搜索操作的行为。
   - 打印结果显示了一个函数，`[native code]` 表示这是一个由浏览器提供的原生函数实现。
2. `console.log('foobar'.search(/bar/));`：
   - 这行代码演示了使用正则表达式进行字符串搜索。
   - `'foobar'` 是原始字符串。
   - `.search(/bar/)` 是调用字符串的 `search` 方法，使用正则表达式 `/bar/` 进行搜索，返回匹配的位置。
   - 结果是 `3`，因为匹配的子字符串 `'bar'` 在原始字符串中的起始索引为 `3`。
3. `class FooSearcher { static [Symbol.search](target) { ... } }`：
   - 这是一个名为 `FooSearcher` 的类定义。
   - 使用了静态方法 `[Symbol.search]`，该方法用于定制字符串搜索操作的行为。
   - 在这个例子中，`FooSearcher` 类定义了搜索规则，如果目标字符串包含 `'foo'`，则搜索成功。
4. `console.log('foobar'.search(FooSearcher));`：
   - 这行代码演示了使用 `FooSearcher` 类的静态 `[Symbol.search]` 方法。
   - 调用字符串 `'foobar'` 的 `search` 方法，传入 `FooSearcher` 类，检查是否符合搜索规则。
   - 结果是 `0`，因为 `'foobar'` 中包含了 `'foo'`，而 `'foo'` 在起始位置。
5. `console.log('barfoo'.search(FooSearcher));`：
   - 同样，调用字符串 `'barfoo'` 的 `search` 方法，检查是否符合 `FooSearcher` 类的搜索规则。
   - 结果是 `3`，因为 `'barfoo'` 中包含了 `'foo'`，而 `'foo'` 在索引 `3` 处。
6. `console.log('barbaz'.search(FooSearcher));`：
   - 再次调用字符串 `'barbaz'` 的 `search` 方法，检查是否符合 `FooSearcher` 类的搜索规则。
   - 结果是 `-1`，因为 `'barbaz'` 中不包含 `'foo'`。
7. `class StringSearcher { constructor(str) { ... } [Symbol.search](target) { ... } }`：
   - 这是一个名为 `StringSearcher` 的类定义，带有构造函数用于接收搜索字符串。
   - 实例方法 `[Symbol.search]` 用于定制字符串搜索操作的行为。
   - 在这个例子中，`StringSearcher` 类定义了搜索规则，如果目标字符串包含了 `StringSearcher` 实例的指定字符串，则搜索成功。
8. `console.log('foobar'.search(new StringSearcher('foo')));`：
   - 这行代码演示了使用 `StringSearcher` 类的实例的 `[Symbol.search]` 方法。
   - 创建了一个 `StringSearcher` 实例，用于搜索字符串 `'foo'`。
   - 调用字符串 `'foobar'` 的 `search` 方法，传入 `StringSearcher` 实例，检查是否符合搜索规则。
   - 结果是 `0`，因为 `'foobar'` 中包含了 `'foo'`，而 `'foo'` 在起始位置。
9. `console.log('barfoo'.search(new StringSearcher('foo')));`：
   - 同样，调用字符串 `'barfoo'` 的 `search` 方法，传入另一个 `StringSearcher` 实例，检查是否符合搜索规则。
   - 结果是 `3`，因为 `'barfoo'` 中包含了 `'foo'`，而 `'foo'` 在索引 `3` 处。
10. `console.log('barbaz'.search(new StringSearcher('qux')));`：
    - 最后，再次调用字符串 `'barbaz'` 的 `search` 方法，传入包含另一个字符串的 `StringSearcher` 实例，检查是否符合搜索规则。
    - 结果是 `-1`，因为 `'barbaz'` 中不包含了 `StringSearcher` 实例指定的字符串 `'qux'`。

比喻说明功能：这个例子可以比喻成两个不同的字符串搜索工具。`FooSearcher` 是一个静态的搜索工具，它检查字符串是否包含 `'foo'`。而 `StringSearcher` 是一个实例化的搜索工具，它接收一个特定的字符串，并检查目标字符串是否包含该特定字符串。通过使用不同的搜索工具，可以自定义搜索操作的行为。

#### Symbol.species

该属性表示一个函数值，是一个构造函数，用来创建派生对象。于内置类型中最常用。.species即种类，

```javascript
class Bar extends Array {}
class Baz extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
1. `class Bar extends Array {}`：
   - 这是一个名为 `Bar` 的类定义，继承自 `Array`。
   - `Bar` 类扩展了数组的功能。
2. `class Baz extends Array { static get [Symbol.species]() { return Array; } }`：
   - 这是一个名为 `Baz` 的类定义，同样继承自 `Array`。
   - `Baz` 类通过静态 `get [Symbol.species]` 方法指定了构造函数，用于创建派生类实例。

let bar = new Bar();
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true
bar = bar.concat('bar');
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true
3. `let bar = new Bar();`：
   - 创建了一个 `Bar` 类的实例，即 `bar`。
4. `console.log(bar instanceof Array);`：
   - 检查 `bar` 是否是 `Array` 的实例。
   - 结果是 `true`，因为 `Bar` 继承自 `Array`。
5. `console.log(bar instanceof Bar);`：
   - 检查 `bar` 是否是 `Bar` 类的实例。
   - 结果是 `true`，因为 `bar` 是由 `Bar` 类创建的实例。
6. `bar = bar.concat('bar');`：
   - 使用 `concat` 方法将字符串 `'bar'` 添加到 `bar` 数组中。
7. `console.log(bar instanceof Array);`：
   - 再次检查 `bar` 是否是 `Array` 的实例。
   - 结果仍然是 `true`，因为 `concat` 操作返回一个新数组，继承自 `Array`。
8. `console.log(bar instanceof Bar);`：
   - 同样，检查 `bar` 是否是 `Bar` 类的实例。
   - 结果仍然是 `true`，因为 `bar` 最初是由 `Bar` 类创建的。

let baz = new Baz();
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // true
baz = baz.concat('baz');
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // false
9. `let baz = new Baz();`：
   - 创建了一个 `Baz` 类的实例，即 `baz`。
10. `console.log(baz instanceof Array);`：
    - 检查 `baz` 是否是 `Array` 的实例。
    - 结果是 `true`，因为 `Baz` 继承自 `Array`。
11. `console.log(baz instanceof Baz);`：
    - 检查 `baz` 是否是 `Baz` 类的实例。
    - 结果是 `true`，因为 `baz` 是由 `Baz` 类创建的实例。
12. `baz = baz.concat('baz');`：
    - 使用 `concat` 方法将字符串 `'baz'` 添加到 `baz` 数组中。
13. `console.log(baz instanceof Array);`：
    - 再次检查 `baz` 是否是 `Array` 的实例。
    - 结果仍然是 `true`，因为 `concat` 操作返回一个新数组，继承自 `Array`。
14. `console.log(baz instanceof Baz);`：
    - 最后，检查 `baz` 是否是 `Baz` 类的实例。
    - 结果是 `false`，因为 `concat` 操作返回的新数组继承自 `Array`，而不是 `Baz`。看不懂，看不懂？？？？？
```

比喻说明功能：这个例子可以比喻成两个继承自数组的类，`Bar` 和 `Baz`。`Bar` 类简单继承了数组功能，而 `Baz` 类通过使用 `Symbol.species` 指定了构造函数，使得在某些操作（例如 `concat`）中返回的新数组类型与父类相同。通过使用 `Symbol.species`，`Baz` 控制了继承类实例的生成行为。

以下是一个 JavaScript 类的定义，名为 `Baz`，它继承自数组类 `Array`，并通过静态方法 `[Symbol.species]` 指定了在某些情况下返回新数组的构造函数。在这个例子中，它指定了使用 `Array` 构造函数。这样做的目的是影响数组的某些操作，使其返回与父类相同类型的新数组。看不懂，看不懂？？？/
以下是对代码的逐行解释：

```javascript
class Baz extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
```

1. `class Baz extends Array { ... }`：
   - 这是一个类的声明，名为 `Baz`，它使用 `extends` 关键字继承了数组类 `Array`。
   - 这意味着 `Baz` 类将继承 `Array` 类的所有属性和方法。
2. `static get [Symbol.species]() { return Array; }`：
   - 这是一个静态方法，使用 `Symbol.species` 符号。
   - `Symbol.species` 是一个用于确定在进行一些操作时应该使用的构造函数的标准符号。
   - 在这个例子中，`[Symbol.species]` 返回 `Array` 构造函数。
   - 这样设置的目的是在进行一些操作时（例如 `concat`），返回的新数组将是使用 `Array` 构造函数创建的，而不是使用 `Baz` 构造函数创建的。

#### .split

如其名，拆分。。通过 String.prototype.split()来用。
效果是削掉//中间的东西,如下所示。

```js
console.log('fobobar'.split(/b/));
VM102:1 (3) ['fo', 'o', 'ar']
```

```js
class StringSplitter { 
 constructor(str) { 
 this.str = str; 
 } 
 [Symbol.split](target) { 
 return target.split(this.str); 
 } 
} 
console.log('barfoobaz'.split(new StringSplitter('foo'))); 
// ["bar", "baz"]
```

以上是高级用法

#### .toPrimitive

是将指定对象转换成primitive value的方法，转成原始值。``[Symbol.toPrimitive](hint) {}``hint是 `"default"`，则应该返回默认的原始值。如果参数是 `"number"`，则应该返回该对象对应的数值。如果参数是 `"string"`，则应该返回该对象对应的字符串。就是你hint了啥，你就给出相应的东西。这个给出的东西你还可以自己定制。

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 42;
    }
    if (hint === 'string') {
      return 'Hello, world!';
    }
    return null; // 返回 null 表示无法处理该转换类型
  }
};
```

```javascript
console.log(Number(obj)); // 输出 42，因为调用了 [Symbol.toPrimitive]('number')
console.log(String(obj)); // 输出 'Hello, world!'，因为调用了 [Symbol.toPrimitive]('string')
```

`Symbol.toPrimitive` 提供了对对象的自定义转换行为的控制，允许开发者定义对象在不同上下文中的原始值是什么。

```javascript
class Foo {}
let foo = new Foo();
console.log(3 + foo); // "3[object Object]"
console.log(3 - foo); // NaN
console.log(String(foo)); // "[object Object]"

class Bar {
  constructor() {
    this[Symbol.toPrimitive] = function(hint) {
      switch (hint) {
        case 'number':
          return 3;
        case 'string':
          return 'string bar';
        case 'default':
        default:
          return 'default bar';
      }
    };
  }
}
let bar = new Bar();
console.log(3 + bar); // "3default bar"
console.log(3 - bar); // 0
console.log(String(bar)); // "string bar"
```

1. `class Foo {}`：
   - 这是一个简单的类声明，名为 `Foo`，没有定义特定的方法。
2. `let foo = new Foo();`：
   - 创建了 `Foo` 类的实例，名为 `foo`。
3. `console.log(3 + foo);`：
   - 尝试对数字 `3` 和 `foo` 进行加法操作。
   - 结果是 `"3[object Object]"`，因为 JavaScript 尝试将 `foo` 转换为字符串，然后执行字符串拼接。
4. `console.log(3 - foo);`：
   - 尝试对数字 `3` 和 `foo` 进行减法操作。
   - 结果是 `NaN`，因为 JavaScript 无法在这种情况下执行有效的数学减法。
5. `console.log(String(foo));`：
   - 将 `foo` 对象转换为字符串。
   - 结果是 `"[object Object]"`，因为默认情况下 JavaScript 使用对象的 `toString` 方法来生成字符串。
6. `class Bar { ... }`：
   - 这是一个类声明，名为 `Bar`。
   - 在构造函数中，通过使用 `Symbol.toPrimitive` 符号，定义了一个自定义的类型转换行为。
7. `let bar = new Bar();`：
   - 创建了 `Bar` 类的实例，名为 `bar`。
8. `console.log(3 + bar);`：
   - 尝试对数字 `3` 和 `bar` 进行加法操作。
   - 由于 `Bar` 类定义了 `Symbol.toPrimitive` 方法，JavaScript 调用该方法以获取数字形式的值。
   - 结果是 `"3default bar"`，因为在 `Symbol.toPrimitive` 方法中，对 `number` hint 返回了 `3`，对 `default` hint 返回了 `'default bar'`。
9. `console.log(3 - bar);`：
   - 尝试对数字 `3` 和 `bar` 进行减法操作。
   - 由于 `Bar` 类定义了 `Symbol.toPrimitive` 方法，JavaScript 调用该方法以获取数字形式的值。
   - 结果是 `0`，因为在 `Symbol.toPrimitive` 方法中，对 `number` hint 返回了 `3`。
10. `console.log(String(bar));`：
    - 将 `bar` 对象转换为字符串。
    - 结果是 `"string bar"`，因为在 `Symbol.toPrimitive` 方法中，对 `string` hint 返回了 `'string bar'`。
比喻说明功能：这个例子可以比喻成两个类，`Foo` 和 `Bar`，其中 `Bar` 类定义了自定义的类型转换行为，使得对它的加法、减法和字符串转换操作产生不同的结果。这展示了 JavaScript 中对象类型转换的灵活性。

#### .toStringTag

一个字符串，用于创建对象的默认字符串描述。我也可以自定义字符串描述。这玩意怎么用的不知道？？？？

```javascript
let s = new Set();
console.log(s); // Set(0) {}
console.log(s.toString()); // [object Set]
console.log(s[Symbol.toStringTag]); // Set
```

1. `let s = new Set();`：
   - 创建了一个空的 Set 对象，名为 `s`。
2. `console.log(s);`：
   - 打印 `s`。
   - 结果是 `Set(0) {}`，表示这是一个空的 Set 对象。
3. `console.log(s.toString());`：
   - 调用 `toString` 方法。
   - 结果是 `[object Set]`，表示调用默认的 `toString` 方法，显示对象的类型为 Set。
4. `console.log(s[Symbol.toStringTag]);`：
   - 访问 Set 对象的 `[Symbol.toStringTag]` 属性。
   - 结果是 `"Set"`，这是一个内置的 Symbol，用于定制对象的 `toString` 方法返回的字符串标签。

```javascript
class Foo {}
let foo = new Foo();
console.log(foo); // Foo {}
console.log(foo.toString()); // [object Object]
console.log(foo[Symbol.toStringTag]); // undefined
```

1. `let foo = new Foo();`：
   - 创建了一个空的 `Foo` 类对象，名为 `foo`。
2. `console.log(foo);`：
   - 打印 `foo`。
   - 结果是 `Foo {}`，表示这是一个空的 `Foo` 对象。
3. `console.log(foo.toString());`：
   - 调用 `toString` 方法。
   - 结果是 `[object Object]`，因为默认情况下，没有指定 `[Symbol.toStringTag]`，所以显示对象的类型为 Object。
4. `console.log(foo[Symbol.toStringTag]);`：
   - 访问 `Foo` 类对象的 `[Symbol.toStringTag]` 属性。
   - 结果是 `undefined`，因为在 `Foo` 类中并没有定义 `[Symbol.toStringTag]`。

```javascript
class Bar {
  constructor() {
    this[Symbol.toStringTag] = 'Bar';
  }
}
let bar = new Bar();
console.log(bar); // Bar {}
console.log(bar.toString()); // [object Bar]
console.log(bar[Symbol.toStringTag]); // Bar
```

1. `class Bar { ... }`：
   - 创建了一个类 `Bar`，并在构造函数中定义了 `[Symbol.toStringTag]` 属性。
2. `let bar = new Bar();`：
    - 创建了一个 `Bar` 类对象，名为 `bar`。
3. `console.log(bar);`：
    - 打印 `bar`。
    - 结果是 `Bar {}`，表示这是一个空的 `Bar` 对象。
4. `console.log(bar.toString());`：
    - 调用 `toString` 方法。
    - 结果是 `[object Bar]`，因为在 `Bar` 类中定义了 `[Symbol.toStringTag]`，显示对象的类型为 Bar。
5. `console.log(bar[Symbol.toStringTag]);`：
    - 访问 `Bar` 类对象的 `[Symbol.toStringTag]` 属性。
    - 结果是 `"Bar"`，这是一个自定义的标签，显示在调用对象的 `toString` 方法时。

比喻说明功能：这个例子可以比喻成不同类型的对象如何在调用 `toString` 方法时显示不同的标签。默认情况下，没有指定 `[Symbol.toStringTag]` 的对象会显示为 `[object Object]`，而定义了 `[Symbol.toStringTag]` 的对象可以自定义其显示的标签。

#### .unscopables

不可舀。即把属性毙掉！一个对象，该对象所有的继承的非继承的属性，都会从关联对象的with环境绑定中解除。

```javascript
let o = { foo: 'bar' };
```

1. `let o = { foo: 'bar' };`：
   - 创建了一个对象 `o`，有一个属性 `foo` 的值为 `'bar'`。

```javascript
with (o) {
  console.log(foo); // bar
}
```

1. `with (o) { ... }`：
   - `with` 语句用于扩展代码块的作用域链，将对象 `o` 的属性添加到作用域中。
   - 在这个 `with` 块内，可以直接访问对象 `o` 的属性。

2. `console.log(foo); // bar`：
   - 在 `with` 块内，直接访问了对象 `o` 的属性 `foo`。
   - 结果是打印出 `bar`。

```javascript
o[Symbol.unscopables] = {
  foo: true
};
```

1. `o[Symbol.unscopables] = { foo: true };`：
   - 设置了对象 `o` 的 `[Symbol.unscopables]` 属性，这是一个 Symbol 属性，用于定义在使用 `with` 语句时应该被排除的属性。

```javascript
with (o) {
  console.log(foo); // ReferenceError
}
```

1. `with (o) { ... }`：
   - 再次使用 `with` 语句。
2. `console.log(foo); // ReferenceError`：
   - 在 `with` 块内，尝试访问对象 `o` 的属性 `foo`。
   - 由于在对象 `o` 的 `[Symbol.unscopables]` 属性中将 `foo` 设置为 `true`，所以在 `with` 块内无法直接访问 `foo`，会导致 `ReferenceError`。

比喻说明功能：
`with` 语句被用来扩展作用域，使得在 `with` 块内可以直接访问对象属性。然而，在某些情况下，由于代码的复杂性和不确定性，`with` 语句可能导致意外的结果。为了解决这个问题，可以使用 `[Symbol.unscopables]` 来排除某些属性，使其在 `with` 块内不可访问，从而提高代码的可靠性。在这个例子中，`foo` 被设置为 `true`，在 `with` 块内就无法直接访问，而会引发 `ReferenceError`。

### Object类型

创建自己的对象``let o = new Object(); 可以有let o = new Object; // 合法，但不推荐``

每个 Object 实例都有如下属性和方法。

 constructor：用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。

 hasOwnProperty(propertyName)：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 o.hasOwnProperty("name")）或符号。

 isPrototypeOf(object)：用于判断当前对象是否为另一个对象的原型prototype。（第 8 章将详细介绍原型。）

 propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用（本章稍后讨论的）for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。

 toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。

 toString()：返回对象的字符串表示。

 valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

因为在 ECMAScript 中 Object 是所有对象的基类，所以任何对象都有这些属性和方法。第 8 章将介绍对象间的继承机制

第八章介绍原型和对象间的继承机制

浏览器环境中的 BOM 和 DOM 对象，都是由宿主环境定义和提供的宿主对象。而宿主对象不受 ECMA-262 约束，所以它们可能会也可能不会继承 Object。什么叫宿主对象？？？

## 操作符

262中括数学操作符（如加、减）、位操作符、关系操作符和相等操作符等操作数据值的操作符；ecmascript中的操作符可用于字符串、数值、布尔值，甚至还有对象。！！一般调用 valueOf()和/或toString()方法来取得可以计算的值。

### 一元操作符

只对一个值操作的叫一元操作符

#### 递增/减操作符

来自C语言，两版本：前后缀。问题是:先运算再减还是先减再运算,--age是先--再做运算;age++是先运算再++ 但是经过操作符age都会变的.

操作符的作用指向任何值:字符串、布尔值、浮点值、对象等

```js
let age = 29; 
let anotherAge = --age + 2; 
console.log(age); // 28 
console.log(anotherAge); // 30 
```

递减操作先发生，age先变成28

```js
let num1 = 2; 
let num2 = 20; 
let num3 = --num1 + num2; 
let num4 = num1 + num2; 
console.log(num3); // 21 
console.log(num4); // 21 
```

最后一句是因为使用的是num1递减之后的值,搞完了,值变了.

```js
let s1 = "2";
let s2 = "z";
let b = false;
let f = 1.1;
let o = {
 valueOf() {
 return -1;
 }
};
s1++; // 值变成数值 3
s2++; // 字符串，值变成 NaN
b++; // 值变成数值 1
f--; // 值变成 0.10000000000000009（因为浮点数不精确）
o--; // 对象，值变成-2
```

#### 一元加和减

用来转换数据类型，也可基本的算术。

```js
let s1 = "01"; 
let s2 = "1.1"; 
let s3 = "z"; 
let b = false; 
let f = 1.1; 
let o = { 
 valueOf() { 
 return -1; 
 } 
}; 
s1 = -s1; // 值变成数值-1 
s2 = -s2; // 值变成数值-1.1 
s3 = -s3; // 值变成 NaN 
b = -b; // 值变成数值 0 
f = -f; // 变成-1.1 
o = -o; // 值变成数值 1 
```

### 位操作符

反正就是32位来放有符号整数。第一位是表示正负。剩下31用2进制方式计数：即正的，0xxxxxxxx....；对于负数以补码/二补数表示，-18的二进制表示就是 11111111111111111111111111101110,怎么做的：先把18表示成2进制，全反转，末尾再补1。

什么叫处理有符号整数时，我们无法访问第31位？31位是什么?

```js
let num = -18; 
console.log(num.toString(2)); // "-10010"
```

对无符号整数来说，第 32 位不表示符号，因为只有正值。无符号整数比有符号整数的范围更大，因为符号位被用来表示数值了.

#### 按位非

~
即对数值取反并减1

```js
let num1 = 25; // 二进制 00000000000000000000000000011001 
let num2 = ~num1; // 二进制 11111111111111111111111111100110 
console.log(num2); // -26
```

等于下面的

```js
let num1 = 25; 
let num2 = -num1 - 1; 
console.log(num2); // "-26"
```

但是位操作更快，因为更底层

#### 按位与

&

```js
let result = 25 & 3; 
console.log(result); // 1 
```

所谓与，就是二进制计算32位，两个数的每一位都进行&计算（仅同1才1），生成新的32位，得出数

#### 按位或

|

```js
let result = 25 | 3; 
console.log(result); // 27
```

或就是，有1就1。

#### 按位异或

^

相同就0，不同就1.

#### 左移

``<<``

```js
let oldValue = 2; // 等于二进制 10 
let newValue = oldValue << 5; // 等于二进制 1000000，即十进制 64 
```

左移会31位整体左移，但不改变符号

#### 有符号右移

>>

```js
let oldValue = 64; // 等于二进制 1000000 
let newValue = oldValue >> 5; // 等于二进制 10，即十进制 2
```

有符号右移是左移的逆运算。

#### 无符号右移

>>>

```js
let oldValue = -64; // 等于二进制 11111111111111111111111111000000 
let newValue = oldValue >>> 5; // 等于十进制 134217726
```

正数不影响。负数会大变化。因为是把32位都右移。

### 布尔操作符

循环语句的基石。有三个：逻辑非、逻辑与、逻辑或

#### 逻辑非

```js
console.log(!false); // true 
console.log(!"blue"); // false 
console.log(!0); // true 
console.log(!NaN); // true 
console.log(!""); // true 
console.log(!12345); // false 

//一个是返回反的布尔值,两个是取布尔值=Boolean
console.log(!!"blue"); // true 
console.log(!!0); // false 
console.log(!!NaN); // false 
console.log(!!""); // false 
console.log(!!12345); // true
```

#### 与

```js
let found = true; 
let result = (found && someUndeclaredVariable); // 这里会出错
console.log(result); // 不会执行这一行
//先看第一个,第一个false就不再看了
let found = false; 
let result = (found && someUndeclaredVariable); // 不会出错
console.log(result); // 会执行
```

#### 或

```js
let found = true; 
let result = (found || someUndeclaredVariable); // 不会出错
console.log(result); // 会执行

//先锚第一个,第一个true了就不再看了
let found = false; 
let result = (found || someUndeclaredVariable); // 这里会出错
console.log(result); // 不会执行这一行

//下面是首选值和备选值
let myObject = preferredObject || backupObject; 
```

### 乘性操作符

#### 乘法操作符

两正数,是正数;两负数负数;不同正负两负数.
有nan则nan
infinity*0则nan;*非0根据非0的符号则infinity或者-infinity;两个infinity这infinity
不是数值的操作数,先后台number转换成数值再应用上述规则

#### 除法操作符

正负号与乘法同
有任一nan的nan;0和0是nan;infi和infi是nan
infi除以任何数值,看符号得infi或-infi
操作数非number转换一下

#### 取模操作符

%

两数值,返回余数
被分数是无限,除数是有限,nan;被分数是有限,除数是0,nan;infi除以infi,nan
被分数是有限,除数是无限,返回被除数
o/不是0,返回0
不是数值的操作数,先后台用number()转换成数值

### 指数操作符

```js
console.log(Math.pow(16, 0.5); // 4 
console.log(16** 0.5); // 4 

let squared = 3; 
squared **= 2; 
console.log(squared); // 9 
let sqrt = 16; 
sqrt **= 0.5; 
console.log(sqrt); // 4 
```

### 加性操作符

加性操作符:加法和减法操作符.不是分直观的转换规则.

#### 加法操作符

有nan,结果nan
两个infi,infi
两个-infi,-infi
一正一负infi,nan
两+0,+0
两-0,-0
-0和+0,+0

两个字符串,结果是拼接
只有一个字符串,会将另一个转换成字符串,然后拼接

```js
let result1 = 5 + 5; // 两个数值
console.log(result1); // 10 
let result2 = 5 + "5"; // 一个数值和一个字符串
console.log(result2); // "55" 

let num1 = 5; 
let num2 = 10; 
let message = "The sum of 5 and 10 is " + num1 + num2; 
console.log(message); // "The sum of 5 and 10 is 510" 
```

#### 减法操作符

任一个nan,nan
infi减infi;-infi减=-infi都是nan
infi减-infi,infi
-infi减infi,-infi
两+0减,+0
两-0减,+0
+0减-0,-0
任一操作数是字符串、布尔值、null 或 undefined,先number(),再按上面进行....
任一是对象，则调用其valueOf()方法取得表示它的数值,nan则nan;如果对象没有valueOf()方法，则调用其 toString()方法，然后再将得到的字符串转换为数值.

```js
let result1 = 5 - true; // true 被转换为 1，所以结果是 4 
let result2 = NaN - 1; // NaN 
let result3 = 5 - 3; // 2 
let result4 = 5 - ""; // ""被转换为 0，所以结果是 5 
let result5 = 5 - "2"; // "2"被转换为 2，所以结果是 3 
let result6 = 5 - null; // null 被转换为 0，所以结果是 5
```

### 关系操作符

``< > <= >=    let result1 = 5 > 3; // true
let result2 = 5 < 3; // false
``

都是数值,则计较
都是字符串,则逐个比较串中对应字符的编码.怎么比???
任一是数值,则将另一个转换成数值
任一是对象,则调用valueof方法,根据前面规则比;没有valueof操作符,用tostring方法,根据前面规则比
任一是布尔值,则转成数值再比较

```js
let result = "Brick" < "alphabet"; // true
let result = "Brick".toLowerCase() < "alphabet".toLowerCase(); // false 
let result = "23" < 3; // false 
let result = "a" < 3; // 因为"a"会转换为 NaN，所以结果是 false

let result = "23" < "3"; // true
let result1 = NaN < 3; // false 
let result2 = NaN >= 3; // false
```

只要出现nan就是false,``一般情况不是<就是>=``

### 相等操作符

#### 等于和不等于

只能得到false或true

任一是布尔,则转成数值再比较,false转成0,true1.
一个是字符串,一个是数值,则字符串转换成数值,再比较是否相等
一个是对象一个不是,则调valueof()取得对象的原始值,再比较

比较时的规则:
null和undifined相等,且他们都不能转换成其它类型值再比较
任一是nan,则==返回false,!=返回true.记住,nan不等于nan
两个都是对象,则比较他们是不是同一个对象.都指向同一个对象,则返回true,否则false

```js
null == undefined  true
"NaN" == NaN       false
5 == NaN           false
NaN == NaN         false
NaN != NaN         true
false == 0         true
true == 1          true
true == 2          false
undefined == 0     false
null == 0          false
"5" == 5           true
```

#### 全等和全不相等

全等就是连数据类型也要相等

```js
let result1 = ("55" == 55); // true，转换后相等
let result2 = ("55" === 55); // false，不相等，因为数据类型不同

let result1 = ("55" != 55); // false，转换后相等
let result2 = ("55" !== 55); // true，不相等，因为数据类型不同

null == undefined 是 true（因为这两个值类似），但 null === undefined 是
false
```

#### 条件操作符

``let max = (num1 > ((num2) ? num1 : num2;()内是条件,如果()true了,则num1给max;否则,num2给max``

#### 赋值操作符

=

```js
num = num + 10;以上代码的第二行可以通过复合赋值来完成:num += 10;

乘后赋值（*=）
 除后赋值（/=）
 取模后赋值（%=）
 加后赋值（+=）
 减后赋值（-=）
 左移后赋值（<<=）
 右移后赋值（>>=）
 无符号右移后赋值（>>>=）
简写,有助提高性能
```

### 逗号操作符

``let num1 = 1, num2 = 2, num3 = 3;let num = (5, 1, 4, 8, 0); // num 的值为 0``

后面一句不常用,但是也可以存在

## 语句foo

语句,也称流控制语句

### if语句

连续if

```js
if () { 

} else if () { 

} else { 

} 
```

### do-while语句

是一种后测试循环语句.翻译为 先做一次,只要,就继续做
tip:循环体内的代码在退出前至少要执行一次

```js
do { 
 statement 
} while (expression); 
下面是一个例子：
let i = 0; 
do { 
 i += 2; 
} while (i < 10); 
```

### while语句

一种先测试循环语句,即先检测退出条件,再执行循环体内的代码.翻译为 看能做吗,再视情况执行.
tip:可能没执行就退出了

``while () { }``

### for语句

也是先测试语句,只不过for后的()里面加入了初始变量、``for (initialization; expression; post-loop-expression) statement等同于let count = 10;let i = 0;while (i < count) {console.log(i);i++;}``statement执行了postloopexpression也会执行

无法while循环的，同样也无法for循环，for只是将一些要素封装了一起。initialization用let，意味着仅在作用域中声明。

for（）内的都不是必须的，不要也能跑。若只含条件/expression，就变成了while循环

### for-in语句

```js
for (property in expression) statement

for (const propName in window) { 
 document.write(propName); 
}
```

条件会枚举，但是不一定按序举

### for-of语句

```js
for (const el of [2,4,6,8]) { 
 document.write(el); 
} 
```

会将所有元素迭代完。按序迭代。什么意思？按写的顺序跑执行语句，按序出结果?推荐用const。

### 标签语句

``start: for (let i = 0; i < count; i++) {console.log(i);}``

在这个例子中，标签 start 并没有被使用，因此循环会正常执行。

### break和continue语句

```js
let num = 0; 
for (let i = 1; i < 10; i++) { 
 if (i % 5 == 0) { 
 break; 
  } 
 num++; 
} 
console.log(num); // 4
```

break意味着循环立马结束,下面的句子不再跑了

```js
let num = 0; 
for (let i = 1; i < 10; i++) { 
 if (i % 5 == 0) { 
 continue; 
 } 
 num++; 
} 
console.log(num); // 8 
```

continue比较难理解一点,是跳过后面的expression的句子,而不是结束整个loop

```js
let num = 0; 
outermost: 
for (let i = 0; i < 10; i++) { 
 for (let j = 0; j < 10; j++) { 
 if (i == 5 && j == 5) { 
 break outermost; 
 } 
 num++; 
 } 
} 
console.log(num); // 55
```

停止循环

```js
let num = 0; 
outermost: 
for (let i = 0; i < 10; i++) { 
 for (let j = 0; j < 10; j++) { 
if (i == 5 && j == 5) { 
 continue outermost; 
 } 
 num++; 
 } 
} 
console.log(num); // 95
```

继续循环,但是跳过i是5情况下,j是5以后的循环

### with语句

```js
let qs = location.search.substring(1); 
let hostName = location.hostname; 
let url = location.href;
的简化版就是下面:

with(location) { 
 let qs = search.substring(1); 
 let hostName = hostname; 
 let url = href; 
} 
```

with用来装载作用域,将作用域搞成个对象.严格模式禁用!不推荐用!

### switch语句

与if语句紧密相关的流控制语句

```js
switch (expression) { 
 case value1: 
 statement 
 break; 
 case value2: 
 statement 
 break; 
 case value3: 
 statement 
 break; 
 case value4: 
 statement 
 break; 
 default: 
 statement 
} 
```

break关键字会导致代码执行跳出 switch 语句。
为避免不必要的条件判断，最好给每个条件后面都加上 break 语句。

```js
switch (i) { 
 case 25: 
 /*跳过*/ 
 case 35: 
 console.log("25 or 35"); 
 break; 
 case 45: 
 console.log("45"); 
 break; 
 default: 
```

如果没有 break，则代码会继续匹配下一个条件。

在使用 `switch` 语句时，如果不在每个 `case` 分支中使用 `break` 语句，那么控制流会穿透到下一个 `case` 分支，直到遇到 `break` 或者 `switch` 语句结束。有时候，开发者可能故意让控制流穿透到下一个分支，这种情况下可以通过注释来表明这是有意为之，而不是遗漏了 `break`。

举个例子，假设我们有一个星期的例子，我们想为每个工作日输出一条消息：

```javascript
let day = 'Monday';

switch (day) {
    case 'Monday':
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday':
        console.log('It\'s a workday.');
        // 没有使用 break，是故意让控制流穿透到下一个分支
        // 这里可以加上注释表明是有意为之的
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('It\'s a weekend.');
        break;
    default:
        console.log('Not a valid day.');
}
```

在这个例子中，我们故意没有在每个工作日的 `case` 中使用 `break`，因为我们希望将它们合并到一起，执行相同的逻辑。通过注释，可以清晰地表明这是有意为之的设计选择。如果遗漏了 `break` 语句，可能导致意外的控制流穿透，因此在故意省略 `break` 时，注释非常有助于提高代码的可读性和维护性。

就是说故意不写break,可能是想需要检验的条件都跑一遍.

```js
switch ("hello world") { 
 case "hello" + " world": 
 console.log("Greeting was found."); 
 break; 
 case "goodbye": 
 console.log("Closing was found."); 
 break; 
 default: 
 console.log("Unexpected message was found."); 
} 
VM50:3 Greeting was found.
```

```js
let num = 25; 
switch (true) { 
 case num < 0: 
 console.log("Less than 0."); 
 break; 
 case num >= 0 && num <= 10: 
 console.log("Between 0 and 10."); 
 break; 
 case num > 10 && num <= 20: 
 console.log("Between 10 and 20."); 
 break; 
 default: 
 console.log("More than 20."); 
}
```

()中的true,意思是expression,即条件.当case后的表达式给出布尔值true时,执行case后面的

## 函数

第10章更详细介绍

```js
function functionName(arg0, arg1,...,argN) { 
 statements 
}
示例:
function sayHi(name, message) { 
 console.log("Hello " + name + ", " + message); 
} 
```

```js
function sum(num1, num2) { 
 return num1 + num2; 
 console.log("Hello world"); // return的效能,函数中后面的不会执行
}
```

```js
function diff(num1, num2) { 
 if (num1 < num2) { 
 return num2 - num1; 
 } else { 
 return num1 - num2; 
 } 
 //但是可以多个return语句
} 
```

```js
function sayHi(name, message) { 
 return; 
 console.log("Hello " + name + ", " + message); // 不会执行,用于我想让函数立马shut的情况,并返回undefined
}
```

要么返回值,要么返回undefined,别在某些条件下返回,调试时会有麻烦.

严格模式对函数的限制:1.名称不能叫eval或arguments 2.参数不能叫eval或arguments 3.两个命名参数不能拥有同一个名称``function duplicateParameters(param1, param1)``

## 小结

ECMAScript 中的基本数据类型包括 Undefined、Null、Boolean、Number、String 和 Symbol。

 与其他语言不同，ECMAScript 不区分整数和浮点值，只有 Number 一种数值数据类型。

 Object 是一种复杂数据类型，它是这门语言中所有对象的基类。

 严格模式为这门语言中某些容易出错的部分施加了限制。

 ECMAScript 提供了 C 语言和类 C 语言中常见的很多基本操作符，包括数学操作符、布尔操作符、关系操作符、相等操作符和赋值操作符等。

 这门语言中的流控制语句大多是从其他语言中借鉴而来的，比如 if 语句、for 语句和 switch语句等。

ECMAScript 中的函数与其他语言中的函数不一样。

 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。

 不指定返回值的函数实际上会返回特殊值 undefined。
