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

暂时性死区：let声明的变量不会在作用域中被提升，即打印必须在声明后；但var可以在声明前


<!-- ## 数据类型

## 流控制语句

## 理解函数 -->
