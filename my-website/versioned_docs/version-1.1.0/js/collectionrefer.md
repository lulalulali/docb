# 集合引用类型

 对象   Object
 数组与定型数组   Array
 Map、WeakMap、Set 以及 WeakSet 类型

继续讨论内置引用类型，包括 Object、Array、Map、WeakMap、Set 和 WeakSet 等

## Object

显示地创建object得方式,一是使用new操作符

```js
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
```

二是使用对象字面量

```js
let person = { 
 name: "Nicholas", 
 age: 29 
}; 
//{表示对象字面量的开始,因为它出现在一个表达式上下文中.赋值号即=号后面是期待的返回值.
```

```js
//属性名可以是字符串或数值，比如：
let person = { 
 "name": "Nicholas", 
 "age": 29, 
 5: true 
};
```

```js
//与使用new操作符那个等效.以下是表示只有一个默认属性和方法的对象
let person = {}; // 与 new Object()相同
person.name = "Nicholas"; 
person.age = 29; 
```

```js
//对象字面量方法是传递大量可选参数的主要方式
function displayInfo(args) { 
 let output = ""; 
 if (typeof args.name == "string"){ 
 output += "Name: " + args.name + "\n"; 
 } 
 if (typeof args.age == "number") { 
 output += "Age: " + args.age + "\n"; 
 } 
 alert(output); 
} 
displayInfo({ 
 name: "Nicholas", 
 age: 29 
}); 
displayInfo({ 
 name: "Greg" 
}); 
//一般来说，命名参数更直观，但在可选参数过多的时候就显得笨拙了。最好的方式是对必选参数使用命名参数，再通过一个对象字面量来封装多个可选参数。
```

```js
console.log(person["name"]); // "Nicholas" 
console.log(person.name); // "Nicholas"

let propertyName = "name"; 
console.log(person[propertyName]); // "Nicholas"   通过变量访问属性.什么意思????

//点语法是首选的属性存取方式
person["first name"] = "Nicholas"; 
```

## Array

即数组,数组中的每个槽位可以存储任意类型的数据

### 创建数组

几种方式创建数组,一:使用Array构造函数

```js
let colors = new Array(); 

let colors = new Array(20); //初始length是20

let colors = new Array("red", "blue", "green");//含3个字符串

let colors = new Array(3); // 创建一个包含 3 个元素的数组
let names = new Array("Greg"); // 创建一个只包含一个元素，即字符串"Greg"的数组

//以下为省略new操作符,是一样的
let colors = Array(3); // 创建一个包含 3 个元素的数组
let names = Array("Greg"); // 创建一个只包含一个元素，即字符串"Greg"的数组
```

二是:使用数组字面量,即字面上看就是一个数组的样子=不会调用Array构造函数

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组
let names = []; // 创建一个空数组
let values = [1,2,]; // 创建一个包含 2 个元素的数组
```

三四:静态方法from()和 of()。from()用于将类数组结构转换为数组实例，而 of()用于将一组参数转换为数组实例。

```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"] 
// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2) 
 .set(3, 4); 
const s = new Set().add(1) 
 .add(2) 2
 .add(3) 
 .add(4); 
console.log(Array.from(m)); // [[1, 2], [3, 4]] 
console.log(Array.from(s)); // [1, 2, 3, 4] 

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4]; 
const a2 = Array.from(a1); 
console.log(a1); // [1, 2, 3, 4] 
console.log(a2);//同上
alert(a1 === a2); // 通知显示false,为什么???

// 可以使用任何可迭代对象
const iter = { 
 *[Symbol.iterator]() {
 yield 1; 
 yield 2; 
 yield 3; 
 yield 4; 
 } 
}; 
console.log(Array.from(iter)); // [1, 2, 3, 4]
// arguments 对象可以被轻松地转换为数组
function getArgsArray() { 
 return Array.from(arguments); 
} 
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4] 

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = { 
 0: 1, 
 1: 2, 
 2: 3, 
 3: 4, 
 length: 4 
}; 
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4] 
```

```js
//接受第二个可选的映射函数参数.这个函数可以用于增强数组的值，无须调用 Array.from().map()先创建一个中间数组。还可接收第三个可选参数，用于指定映射函数中 this 的值。但这个重写的 this 值在箭头函数中不适用。
const a1 = [1, 2, 3, 4]; 
const a2 = Array.from(a1, x => x**2); 
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2}); 
console.log(a2); // [1, 4, 9, 16] 
console.log(a3); // [1, 4, 9, 16] 
```

Array.of()可以把一组参数转换为数组。

```js
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4] 
console.log(Array.of(undefined)); // [undefined] 
```

### 数组空位

```js
//创建空位数组
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5 
console.log(options); // [,,,,,]
```

```js
const options = [1,,,,5]; 
for (const option of options) { 
 console.log(option === undefined); 
} 
// false 
// true 
// true 
// true 
// false
const a = Array.from([,,,]); // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
for (const val of a) { 
 alert(val === undefined); 
} 
// true 
// true 
// true 
alert(Array.of(...[,,,])); // [undefined, undefined, undefined] 
for (const [index, value] of options.entries()) { 
 alert(value); 
} 
// - `for`：表示开始一个循环。
// - `const`：声明一个常量，用于保存循环中当前元素的值。
// - `[index, value]`：使用解构赋值，将数组元素的索引保存到 `index` 变量中，将数组元素的值保存到 `value` 变量中。
// - `of`：用于指定要遍历的可迭代对象。
// - `options.entries()`：调用数组 `options` 的 `entries()` 方法，该方法返回一个迭代器对象，该对象包含数组的索引/值对。
// - `()`：表示调用函数或方法。
// - `{}`：表示循环体的开始和结束。
// - `alert(value);`：弹出对话框，显示当前数组元素的值。
// - `}`：表示循环体的结束。
// 综上所述，这段代码的作用是遍历数组 `options` 中的每个元素，并对每个元素调用 `alert()` 方法弹出其值。
// 1 
// undefined 
// undefined 
// undefined 
// 5 

//以上是如何处理数组空位的
```

由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。如果确实需要空位，则可以显式地用 undefined 值代替。

### 数组索引

```js
let colors = ["red", "blue", "green"]; // 定义一个字符串数组
alert(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 添加第四项,增长
```

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
let names = []; // 创建一个空数组
alert(colors.length); // 3 
alert(names.length); // 0 

//length属性不止可以读,也可以增删元素.新添的元素用undefined填充
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2; 
alert(colors[2]); // undefined

let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组,即length是3
colors[colors.length] = "black"; // 添加一种颜色（位置 3）
colors[colors.length] = "brown"; // 再添加一种颜色（位置 4）

let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[99] = "black"; // 添加一种颜色（位置 99）
alert(colors.length); // 100,而位置 3~98，实际上并不存在，因此在访问时会返回 undefined
```

数组最多可以包含 4 294 967 295 个元素.为什么???

### 检测数组

```js
if (value instanceof Array){ 
 // 操作数组

//以上是假设只有一个全局执行上下文.以下可以解决这个问题,不管它是在哪个全局执行上下文中创建的.因为网页里有多个框架,可能设计两个不同的全局执行上下文.什么意思??????
 if (Array.isArray(value)){ 
 // 操作数组
} 
} 
```

### 迭代器方法

Array原型上暴露了3个用于检查数组内容的方法keys()、values()和entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回索引/值对的迭代器

```js
const a = ["foo", "bar", "baz", "qux"]; 

// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys()); 
const aValues = Array.from(a.values()); 
const aEntries = Array.from(a.entries()); 

console.log(aKeys); // [0, 1, 2, 3] 序号的数组
console.log(aValues); // ["foo", "bar", "baz", "qux"]内容的数组 
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]序号和内容配对作为数组的的合数组 
//使用 ES6 的解构可以非常容易地在循环中拆分键/值对：
const a = ["foo", "bar", "baz", "qux"]; 

for (const [idx, element] of a.entries()) { 
 alert(idx); 
 alert(element); 
} 
// 0 
// foo 
// 1 
// bar 
// 2 
// baz 
// 3 
// qux
```

```js
const a = ["foo", "bar", "baz", "qux"]; 
for (const [idx, element] of a.entries()) { 
 alert(idx); 
 alert(element); 
} 
// 0 
// foo 
// 1 
// bar 
// 2 
// baz 
// 3 
// qux 
```

### 复制和填充方法

批量复制方法 copyWithin()，以及填充数组方法 fill(),都需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引。

```js
const zeroes = [0, 0, 0, 0, 0]; 
// 用 5 填充整个数组,每个位置都填上
zeroes.fill(5); 
console.log(zeroes); // [5, 5, 5, 5, 5] 
zeroes.fill(0); // 重置

// 用 6 填充索引大于等于 3 的元素,即在3位置(含)开始往后使用6顶替
zeroes.fill(6, 3); 
console.log(zeroes); // [0, 0, 0, 6, 6] 
zeroes.fill(0); // 重置

// 用 7 填充索引大于等于 1 且小于 3 的元素,即在1位置开始(含)到3位置(不含)使用7顶替
zeroes.fill(7, 1, 3); 
console.log(zeroes); // [0, 7, 7, 0, 0]; 
zeroes.fill(0); // 重置

// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1) 
// (-1 + zeroes.length = 4) 
zeroes.fill(8, -4, -1); 
//等价于zeroes.fill(8,1,4);
console.log(zeroes); // [0, 8, 8, 8, 0]; 

const zeroes = [0, 0, 0, 0, 0]; 
zeroes.fill(5,0,4); 
console.log(zeroes); // [5, 5, 5, 5, 0]

const zeroes = [0, 0, 0, 0, 0]; 
zeroes.fill(5,0,5); 
console.log(zeroes); // [5, 5, 5, 5, 5]

//fill()静默忽略超出数组边界、零长度及方向相反的索引范围：
const zeroes = [0, 0, 0, 0, 0]; 


// 索引过低，忽略
zeroes.fill(1, -10, -6); 
console.log(zeroes); // [0, 0, 0, 0, 0] 

// 索引过高，忽略
zeroes.fill(1, 10, 15); 
console.log(zeroes); // [0, 0, 0, 0, 0] 

// 索引反向，忽略
zeroes.fill(2, 4, 2); 
console.log(zeroes); // [0, 0, 0, 0, 0] 

// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10) 
console.log(zeroes); // [0, 0, 0, 4, 4] 

zeroes.fill(5,4,7); 
console.log(zeroes);//[0, 0, 0, 0, 5]

zeroes.fill(5,0,7); 
console.log(zeroes);// [5, 5, 5, 5, 5]
```

与 fill()不同，copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。

```js
let ints, 
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

这段代码定义了一个变量 `ints` 和一个箭头函数 `reset()`。`reset()` 函数用于将数组 `ints` 重新赋值为一个包含 0 到 9 的整数的数组。声明了变量 `ints` 后，调用 `reset()` 函数来初始化该变量，使其成为一个包含 0 到 9 的整数的数组。
1. `let ints,`：声明了一个变量 `ints`，但未进行初始化。
2. `reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];`：定义了一个箭头函数 `reset()`，该函数将数组 `ints` 重新赋值为包含整数 0 到 9 的数组。
3. `reset();`：调用了 `reset()` 函数，即执行了函数体内的代码，将数组 `ints` 初始化为包含 0 到 9 的整数的数组。

// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5); 
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] 
reset(); 

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5); 
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9] 
reset();

// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3); 
alert(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9] 
reset(); 

// JavaScript 引擎在插值前会完整复制范围内的值
// 因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6); 
alert(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9] 
reset(); 

// 支持负索引值，与 fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3); 
//相当于 ints.copyWithin(6,3,7);
alert(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6] 

//copyWithin()静默忽略超出数组边界、零长度及方向相反的索引范围：
let ints, 
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 索引过低，忽略
ints.copyWithin(1, -15, -12); 
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset() 

// 索引过高，忽略
ints.copyWithin(1, 12, 15); 
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 索引反向，忽略
ints.copyWithin(2, 4, 2);
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 索引部分可用，复制、填充可用部分
ints.copyWithin(4, 7, 10) 
alert(ints); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9]; 
```

第一个参数是改变的位置,第二个第三个参数是复制的段,含前不含后

### 转换方法

所有对象都有 toLocaleString()、toString()和 valueOf()方法。valueOf()返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。也就是说，对数组的每个值都会调用其 toString()方法，以得到最终的字符串。

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // red,blue,green
alert(colors.valueOf()); // red,blue,green
alert(colors); // red,blue,greenalert()期待字符串，所以会在后台调用数组的 toString()方法，从而得到跟前面一样的结果。
```

```js
let person1 = { 
 toLocaleString() { 
 return "Nikolaos"; 
 }, 

 toString() { 
 return "Nicholas"; 
 } 
}; 

let person2 = { 
 toLocaleString() { 
 return "Grigorios"; 
 }, 

 toString() { 
 return "Greg"; 
 } 
}; 

let people = [person1, person2]; 
alert(people); // Nicholas,Greg 
alert(people.toString()); // Nicholas,Greg 在将数组传给 alert()时，输出的是"Nicholas,Greg"，这是因为会在数组每一项上调用 toString()方法（与下一行显式调用toString()方法结果一样）
alert(people.toLocaleString()); // Nikolaos,Grigorios为调用了数组每一项的 toLocaleString()方法 
```

```js
let colors = ["red", "green", "blue"]; 
alert(colors.join(",")); // red,green,blue 
alert(colors.join("||")); // red||green||blue
//如果不给join传入任何参数/传undefined,则仍使用,作为分隔符. 如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、toString()和 valueOf()返回的结果中会以空字符串表示。
```

### 栈方法

哪里进,哪里出

栈是一种后进先出（LIFO，Last-In-First-Out）的结构，也就是最近添加的项先被删除。数据项的插入（称为推入，push）和删除（称为弹出，pop）只在栈的一个地方发生，即栈顶。相当于栈是一个桶.

```js
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
alert(count); // 2 
count = colors.push("black"); // 再推入一项
alert(count); // 3 
let item = colors.pop(); // 取得最后一项
alert(item); // black 
alert(colors.length); // 2 
```

```js
//栈和其它数组方法一起使用
let colors = ["red", "blue"]; 
colors.push("brown"); // 再添加一项
colors[3] = "black"; // 添加一项
alert(colors.length); // 4 
let item = colors.pop(); // 取得最后一项
alert(item); // black
```

### 队列方法

哪里进,另一头出

像流水线推一样,先来先走.队列以先进先出（FIFO，First-In-First-Out）形式限制访问。队列在列表末尾添加数据，但从列表开头获取数据。使用 shift()和 push()，可以把数组当成队列来使用：

```js
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项,尾部加上两项
alert(count); // 2 

count = colors.push("black"); // 再推入一项
alert(count); // 3 

let item = colors.shift(); // 取得头部第一项
alert(item); // red 
alert(colors.length); // 2 
```

也提供了unshift()方法,是与shift相反的操作:在数组开头添加任意多个值,然后返回新的数组长度.

```js
let colors = new Array(); // 创建一个数组
let count = colors.unshift("red", "green"); // 从数组开头推入两项
alert(count); // 2 
count = colors.unshift("black"); // 再推入一项
alert(count); // 3 
let item = colors.pop(); // 取得尾部最后一项
alert(item); // green 
alert(colors.length); // 2 
```

### 排序方法

```js
let values = [1, 2, 3, 4, 5]; 
values.reverse(); 
alert(values); // 5,4,3,2,1
```

```js
let values = [0, 1, 5, 10, 15]; 
values.sort(); 
alert(values); // 0,1,10,15,5 作为字符串,"10"和"15"会排在"5"前面
```

以下是以上的解决方式

```js
function compare(value1, value2) { 
 if (value1 < value2) { 
 return -1; 
 } else if (value1 > value2) { 
 return 1; 
 } else { 
 return 0; 
 } 
} 
let values = [0, 1, 5, 10, 15]; 
values.sort(compare); 
alert(values); // 0,1,5,10,15
```

```js
//同上的降序
function compare(value1, value2) { 
 if (value1 < value2) { 
 return 1; 
 } else if (value1 > value2) { 
 return -1; 
 } else { 
 return 0; 
 } 
} 
let values = [0, 1, 5, 10, 15]; 
values.sort(compare); 
alert(values); // 15,10,5,1,0 
```

```js
//用箭头函数写比较函数
let values = [0, 1, 5, 10, 15]; 
values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0); 
alert(values); // 15,10,5,1,0 
```

reverse()和 sort()都返回调用它们的数组的引用.什么意思????

```js
function compare(value1, value2){ 
 return value2 - value1; 
}
//比较函数就是要返回小于 0、0 和大于 0 的数值，因此减法操作完全可以满足要求。条件就是数组元素是数值或其valueOf方法返回数值的对象
```

### 操作方法

```js
let colors = ["red", "green", "blue"]; 
let colors2 = colors.concat("yellow", ["black", "brown"]); 

console.log(colors); // ["red", "green","blue"] 
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"] 
```

```js
//所谓打平,就是去方括号.
let colors = ["red", "green", "blue"]; 
let newColors = ["black", "brown"]; 
let moreNewColors = { 
 [Symbol.isConcatSpreadable]: true, 
 length: 2, 
 0: "pink", 
 1: "cyan" 
}; //这个对象类似于一个数组，在调用数组方法 concat() 时，会将其作为可展开的对象处理，并且拥有长度为 2，并包含了两个元素 "pink" 和 "cyan"。

newColors[Symbol.isConcatSpreadable] = false; 

// 强制不打平数组
let colors2 = colors.concat("yellow", newColors); 

// 强制打平类数组对象
let colors3 = colors.concat(moreNewColors); 

console.log(colors); // ["red", "green", "blue"] 
console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]] 
console.log(colors3); // ["red", "green", "blue", "pink", "cyan"] 
```

```js
//slice()削去.
let colors = ["red", "green", "blue", "yellow", "purple"]; 
let colors2 = colors.slice(1); //削去,留1位置及直到最后
let colors3 = colors.slice(1, 4); //留1位置(含)到4位置(不含)
alert(colors2); // green,blue,yellow,purple 
alert(colors3); // green,blue,yellow
//含 5 个元素的数组上调用 slice(-2,-1)，就相当于调用 slice(3,4)。如果结束位置小于开始位置，则返回空数组
```

```js
let colors = ["red", "green", "blue"]; 
let removed = colors.splice(0,1); // 删除第一项.两个参数:第一个是起始位(含),第二个是要删的数量
alert(colors); // green,blue 
alert(removed); // red，只有一个元素的数组

removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 插入两个元素.开始在1位置,删0个,在1位置插入两元素
alert(colors); // green,yellow,orange,blue 
alert(removed); // 空数组

//上面的插入和替换其实是一个参数逻辑

removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素.
alert(colors); // green,red,purple,orange,blue 
alert(removed); // yellow，只有一个元素的数组
```

### 搜索和位置方法

两类搜索数组的方法:按严格相等搜索和按断言函数搜索.

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 

alert(numbers.indexOf(4)); // 3 
alert(numbers.lastIndexOf(4)); // 5 
alert(numbers.includes(4)); // true 

alert(numbers.indexOf(4, 4)); // 5 
alert(numbers.lastIndexOf(4, 4)); // 3 
alert(numbers.includes(4, 7)); // false 

let person = { name: "Nicholas" }; 
let people = [{ name: "Nicholas" }]; 
let morePeople = [person]; 

alert(people.indexOf(person)); // -1 
alert(morePeople.indexOf(person)); // 0 
alert(people.includes(person)); // false 
alert(morePeople.includes(person)); // true 
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
