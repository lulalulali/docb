# introduction介绍

## 1

介绍 JavaScript 的起源：从哪里来，如何发展，以及现今的状况。这一章会谈到 JavaScript
与 ECMAScript 的关系、DOM、BOM，以及 Ecma 和 W3C 相关的标准。
js不是一门真正有内聚力的语言，模块内的元素关联性比较弱，代码组织比较松散。

BOM 和 DOM

1. BOM（Browser Object Model）： BOM 是浏览器对象模型的缩写。它提供了与浏览器交互的对象和方法，但与网页内容无关。BOM 主要包含了一些用于控制浏览器窗口、处理用户输入、导航等的对象，例如 `window` 对象、`navigator` 对象、`location` 对象等。

2. DOM（Document Object Model）： DOM 是文档对象模型的缩写。它是一种表示和操作文档结构的方式，使得 JavaScript 能够动态地访问和修改网页的内容、结构和样式。DOM 将文档中的元素组织成一个树状结构，每个节点都是文档中的一个元素、属性或文本。通过 DOM，JavaScript 可以对网页进行动态修改和交互。
总结：BOM 主要涉及浏览器窗口和浏览器本身的一些属性和方法，而 DOM 则关注网页的结构和内容的操作。

dom是一种api，分成节点。解析head是一支。解析body是一支

## 标准内置对象

在JavaScript中，标准内置对象是指由JavaScript语言规范定义并提供的一组基本对象，这些对象具有通用的功能，可以在任何JavaScript环境中使用，无需额外的导入或引入。这些对象涵盖了常见的数据类型、数据结构和功能，提供了处理数字、字符串、日期、数组、函数等各种操作的方法和属性。
以下是一些常见的标准内置对象：

1. Object（对象）： 所有对象的基类，其他所有对象都从Object继承。
2. Array（数组）： 用于创建和操作数组的对象，提供了一系列有用的数组方法。
3. String（字符串）： 用于表示和操作字符串的对象，提供了字符串的相关方法和属性。
4. Number（数字）： 用于表示数字（整数或浮点数）的对象，提供了处理数字的方法。
5. Boolean（布尔）： 用于表示布尔值（true或false）的对象。
6. Function（函数）： 用于创建和操作函数的对象，函数在JavaScript中是一等公民，可以被赋值、传递和调用。
7. Date（日期）： 用于表示日期和时间的对象，提供了处理日期的方法。
8. RegExp（正则表达式）： 用于进行文本模式匹配的对象，提供了强大的字符串搜索和替换功能。
9. Math（数学）： 提供了执行数学运算的方法，例如三角函数、对数函数等。
10. Error（错误）： 用于表示运行时错误的对象，所有错误对象都继承自Error。

比喻：你可以将标准内置对象看作是JavaScript语言提供的工具箱，里面有各种工具（对象）可以帮助你处理不同类型的任务。就像一个木工使用不同的工具（例如锤子、螺丝刀、尺子等）来完成不同的任务一样，开发者可以使用这些标准内置对象来处理和操作不同类型的数据和功能。这些对象就像是JavaScript开发者的工具集，使他们能够更方便地进行编程工作。

## 正则RegExp

`RegExp`（正则表达式）是一种强大的文本模式匹配工具，用于在字符串中查找、匹配和操作特定模式的文本。正则表达式由一系列字符组成，形成一个搜索模式。它可以用于验证字符串的格式、搜索和替换特定文本，以及执行其他字符串处理操作。
`RegExp` 对象则是JavaScript中与正则表达式相关的对象。通过`RegExp`对象，你可以创建和操作正则表达式。`RegExp`对象有两种创建方式：

1. 字面量创建： 使用正斜杠`/`将正则表达式包裹起来，例如：`/pattern/`。

   ```javascript
   var pattern = /abc/;
   ```

2. 构造函数创建： 使用`RegExp`构造函数，传递一个字符串作为正则表达式的模式。

   ```javascript
   var pattern = new RegExp("abc");
   ```

比喻：想象你正在寻找一本书中的特定内容，而这本书是一本巨大的百科全书。正则表达式就像是你要查找的关键字，而`RegExp`对象就像是你用来查找的放大镜。

- 正则表达式（关键字）：比如你要查找书中所有包含关键字“JavaScript”的段落，这个关键字就是你的正则表达式。
- RegExp对象（放大镜）：`RegExp`对象就是你使用的工具，它帮助你在整本书中定位和匹配所有包含“JavaScript”关键字的部分。你可以使用不同的模式和选项，就像调整放大镜的焦距一样，以精准地找到你需要的内容。
总体而言，正则表达式和`RegExp`对象提供了一种强大的方式来处理字符串，就像你用放大镜在文本中查找特定内容一样。

## null的两个方法

在编程中，`null` 是一个特殊的值，表示一个空对象或无效对象引用。在 JavaScript 中，`null` 是一个表示"无值"或"空"的原始值。当一个变量被初始化为 `null`，它意味着这个变量没有引用任何对象。

关于 `valueOf()` 和 `toString()` 方法：

1. **valueOf() 方法：** 在 JavaScript 中，`valueOf()` 是一个用于返回对象的原始值的方法。对于 `null`，`valueOf()` 方法会返回 `null`。请注意，`null` 不是一个对象，因此对 `null` 调用 `valueOf()` 会返回 `null`，而不是一个对象的原始值。

    ```javascript
    var nullValue = null;
    console.log(nullValue.valueOf());  // 输出: null
    ```

2. **toString() 方法：** `toString()` 方法用于将对象转换为字符串。对于 `null`，`toString()` 方法同样会返回字符串 "null"。

    ```javascript
    var nullValue = null;
    console.log(nullValue.toString());  // 输出: "null"
    ```

总结：对于 `null` 值，`valueOf()` 返回 `null`，而 `toString()` 返回字符串 "null"。这两个方法通常在处理对象时用于获取对象的原始值或字符串表示。

## BOM

BOM 的缩写指的是 "Browser Object Model"，翻译为中文是 "浏览器对象模型"。 BOM 是一组浏览器提供的 JavaScript API，用于操作和控制浏览器窗口、处理用户屏幕信息、导航历史等功能。与 DOM（文档对象模型）一起，BOM 构成了在浏览器环境中进行客户端脚本编程的基础。
BOM（浏览器对象模型）是指浏览器提供的一组 JavaScript API，用于与浏览器窗口进行交互和控制。BOM 不是标准的一部分，而是由各个浏览器厂商实现的一组特定于浏览器的功能。

BOM 包含一系列对象，其中一些常见的对象包括：

1. **`window` 对象：** 表示浏览器的窗口，是 BOM 的顶层对象。`window` 对象提供了许多方法和属性，用于控制和操作浏览器窗口，以及访问文档和其他 BOM 对象。

2. **`navigator` 对象：** 提供关于浏览器的信息，如浏览器类型、版本和操作系统等。

3. **`screen` 对象：** 提供关于用户屏幕的信息，如屏幕的宽度和高度。

4. **`location` 对象：** 用于获取和设置当前加载的文档的 URL，使得 JavaScript 能够在浏览器中定向到不同的页面。

5. **`history` 对象：** 用于管理浏览器的历史记录，可以通过 JavaScript 进行前进、后退等操作。

BOM 对象的功能在不同的浏览器中可能有所不同，因此在使用 BOM 的功能时，需要注意浏览器的兼容性。在现代的 Web 开发中，通常更关注 DOM（文档对象模型）和 ECMAScript 标准，而对 BOM 的使用相对较少。

## next()

在 JavaScript 中，并没有内建的 `next()` 方法，因此具体的含义会取决于你在哪个上下文中使用这个方法。通常情况下，`next()` 方法常常与迭代器（Iterators）或生成器（Generators）相关联。

1. **迭代器（Iterators）：** 在使用 `for...of` 循环遍历可迭代对象时，你可能会使用 `next()` 方法。迭代器对象（如数组的迭代器）上有一个 `next()` 方法，每次调用它都会返回一个包含当前迭代值和是否还有更多值的对象。当没有更多值可供迭代时，`done` 属性将为 `true`。

    ```javascript
    let arr = [1, 2, 3];
    let iterator = arr[Symbol.iterator](); // 获取迭代器对象

    let result = iterator.next();
    while (!result.done) {
        console.log(result.value); // 输出当前值
        result = iterator.next();
    }
    ```

2. **生成器（Generators）：** 如果你定义了一个生成器函数，该函数会生成一个迭代器。在生成器函数中，`next()` 方法用于执行生成器的下一个步骤，并返回一个包含生成器产出值的对象。生成器可以在函数执行期间暂停和恢复，因此 `next()` 方法可以用于逐步执行生成器的代码。

    ```javascript
    function* myGenerator() {
        yield 1;
        yield 2;
        yield 3;
    }

    let generator = myGenerator();

    console.log(generator.next().value); // 输出: 1
    console.log(generator.next().value); // 输出: 2
    console.log(generator.next().value); // 输出: 3
    ```

如果你有特定的上下文或库，提供了一个名为 `next()` 的方法，请提供更多的上下文信息，以便更好地理解这个方法的具体用途。

## new

new 运算符允许开发人员创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// Expected output: "Eagle"

//一些语法
new constructor
new constructor()
new constructor(arg1)
new constructor(arg1, arg2)
new constructor(arg1, arg2, /* …, */ argN)
```

## `function` 和 `object`

在 JavaScript 中，`function` 和 `object` 之间有一种特殊的关系。实际上，JavaScript 中的函数（`function`）是一种特殊类型的对象（`object`）。

比方说，可以将函数看作是一个特殊的对象，具有一些额外的行为，比如可以被调用。这是因为在 JavaScript 中，函数是一等公民，它们可以被赋值给变量，作为参数传递，以及作为返回值。

以下是一个简单的比方：

假设你有一辆汽车，这辆汽车是一个对象。现在，你在这辆汽车上加了一个特殊的装置，这个装置让这辆汽车能够执行额外的操作，比如可以响应指令移动。这个装置是函数。

```javascript
// 汽车对象
var car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    color: "Blue"
};

// 加了一个特殊装置（函数）使汽车能够移动
car.move = function() {
    console.log("The car is moving!");
};

// 调用函数，就像给汽车发送移动的指令
car.move(); // 输出: "The car is moving!"
```

在这个比方中，`car` 是一个普通的对象，而 `car.move` 是一个特殊的对象，它是一个函数。这个函数使得汽车能够执行额外的动作，就像 JavaScript 中的函数允许对象执行额外的操作一样。
