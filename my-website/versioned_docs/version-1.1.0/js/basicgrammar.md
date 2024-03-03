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

1. **`function zipTag(strings, ...expressions) {`：**
   - 定义了一个名为 `zipTag` 的函数。
   - `strings` 是一个包含模板字面量中所有字符串部分的数组。
   - `expressions` 是一个包含模板字面量中所有插值表达式的数组。

```js
2. **`return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');`：**
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

#### 符号的基本用法
