# 函数

探索 JavaScript 最强大的一个特性：函数表达式，主要涉及闭包、this 对象、模块模式、创建私有对象成员、箭头函数、默认参数和扩展操作符。

 函数表达式、函数声明及箭头函数➤Function expressions, function declarations, and arrow functions
 默认参数及扩展操作符➤ Default parameters and spread operators
 使用函数实现递归➤ Recursion with functions
 使用闭包实现私有变量➤ Private variables using closures

函数是ECMAScript中最有意思的部分之一，这主要是因为函数实际上是对象。每个函数都是Function类型的实例，而 Function 也有属性和方法，跟其他引用类型一样。因为函数是对象，所以函数名就是指向函数对象的指针，而且不一定与函数本身紧密绑定。函数通常以函数声明的方式定义，
比如：
``function sum (num1, num2) { return num1 + num2; }``
注意函数定义最后没有加分号。

另一种定义函数的语法是函数表达式。函数表达式与函数声明几乎是等价的：
``let sum = function(num1, num2) { return num1 + num2;};``
这里，代码定义了一个变量 sum 并将其初始化为一个函数。注意 function 关键字后面没有名称，因为不需要。这个函数可以通过变量 sum 来引用。注意这里的函数末尾是有分号的，与任何变量初始化语句一样。

还有一种定义函数的方式与函数表达式很像，叫作“箭头函数”（arrow function），如下所示：
``let sum = (num1, num2) => { return num1 + num2;};``

最后一种定义函数的方式是使用 Function 构造函数。这个构造函数接收任意多个字符串参数，最后一个参数始终会被当成函数体，而之前的参数都是新函数的参数。来看下面的例子：
``let sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐``
我们不推荐使用这种语法来定义函数，因为这段代码会被解释两次：第一次是将它当作常规ECMAScript 代码，第二次是解释传给构造函数的字符串。这显然会影响性能。不过，把函数想象为对象，把函数名想象为指针是很重要的。而上面这种语法很好地诠释了这些概念。注意 这几种实例化函数对象的方式之间存在微妙但重要的差别，本章后面会讨论。无论如何，通过其中任何一种方式都可以创建函数

## 箭头函数

ARROW FUNCTIONS.

```js
//ECMAScript 6 新增了使用胖箭头（=>）语法定义函数表达式的能力。很大程度上，箭头函数实例化的函数对象与正式的函数表达式创建的函数对象行为是相同的。任何可以使用函数表达式的地方，都可以使用箭头函数：
let arrowSum = (a, b) => { 
 return a + b; 
}; 
let functionExpressionSum = function(a, b) { 
 return a + b; 
}; 
console.log(arrowSum(5, 8)); // 13 
console.log(functionExpressionSum(5, 8)); // 13 

//箭头函数简洁的语法非常适合嵌入函数的场景：
let ints = [1, 2, 3]; 
console.log(ints.map(function(i) { return i + 1; })); // [2, 3, 4] 
console.log(ints.map((i) => { return i + 1 })); // [2, 3, 4] 

//如果只有一个参数，那也可以不用括号。只有没有参数，或者多个参数的情况下，才需要使用括号：
// 以下两种写法都有效
let double = (x) => { return 2 * x; }; 
let triple = x => { return 3 * x; }; 
// 没有参数需要括号
let getRandom = () => { return Math.random(); }; 
// 多个参数需要括号
let sum = (a, b) => { return a + b; }; 
// 无效的写法：
let multiply = a, b => { return a * b; };

//箭头函数也可以不用大括号，但这样会改变函数的行为。使用大括号就说明包含“函数体”，可以在一个函数中包含多条语句，跟常规的函数一样。如果不使用大括号，那么箭头后面就只能有一行代码，比如一个赋值操作，或者一个表达式。而且，省略大括号会隐式返回这行代码的值(什么叫隐式返回???)：
// 以下两种写法都有效，而且返回相应的值
let double = (x) => { return 2 * x; }; 
let triple = (x) => 3 * x; 
// 可以赋值
let value = {}; 
let setName = (x) => x.name = "Matt"; 
setName(value); 
console.log(value.name); // "Matt" 
// 无效的写法：
let multiply = (a, b) => return a * b; 

//箭头函数虽然语法简洁，但也有很多场合不适用。箭头函数不能使用 arguments、super 和new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。
```

### 函数名

FUNCTION NAMES.

```js
//因为函数名就是指向函数的指针，所以它们跟其他包含对象指针的变量具有相同的行为。这意味着一个函数可以有多个名称，如下所示：
function sum(num1, num2) { 
 return num1 + num2; 
} 
console.log(sum(10, 10)); // 20 
let anotherSum = sum; //一个函数可以有多个名称
console.log(anotherSum(10, 10)); // 20 
sum = null; 
console.log(anotherSum(10, 10)); // 20 
//以上代码定义了一个名为 sum()的函数，用于求两个数之和。然后又声明了一个变量 anotherSum，并将它的值设置为等于 sum。注意，使用不带括号的函数名会访问函数指针，而不会执行函数。此时，anotherSum 和 sum 都指向同一个函数。调用 anotherSum()也可以返回结果。把 sum 设置为 null之后，就切断了它与函数之间的关联。而 anotherSum()还是可以照常调用，没有问题。
//ECMAScript 6 的所有函数对象都会暴露一个只读的 name 属性，其中包含关于函数的信息。多数情况下，这个属性中保存的就是一个函数标识符，或者说是一个字符串化的变量名。即使函数没有名称，也会如实显示成空字符串。如果它是使用 Function 构造函数创建的，则会标识成"anonymous"：
function foo() {} 
let bar = function() {}; 
let baz = () => {}; 
console.log(foo.name); // foo 
console.log(bar.name); // bar 
console.log(baz.name); // baz 
console.log((() => {}).name); //（空字符串）
console.log((new Function()).name); // anonymous 

//如果函数是一个获取函数、设置函数，或者使用 bind()实例化，那么标识符前面会加上一个前缀：
function foo() {} //声明了一个空函数 foo
console.log(foo.bind(null).name); // bound foo 调用 bind() 方法将 foo 函数绑定到一个空的上下文，然后获取其 name 属性，并将其输出到控制台。bind() 方法会创建一个新函数，新函数的名称会以 "bound " 开头，后跟原始函数的名称。
let dog = { 
 years: 1, 
 get age() { 
 return this.years; 
 }, 
 set age(newAge) { 
 this.years = newAge; 
 } 
} 
let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age'); //使用 Object.getOwnPropertyDescriptor() 方法获取对象 dog 中属性 age 的属性描述符，并将其存储在变量 propertyDescriptor 中。
console.log(propertyDescriptor.get.name); // get age ：获取属性描述符对象中 get 方法的 name 属性，并将其输出到控制台。输出结果为 "get age"，因为 get 方法的名称是 "get age"，表示获取属性 age 的方法。
console.log(propertyDescriptor.set.name); // set age 获取属性描述符对象中 set 方法的 name 属性，并将其输出到控制台。输出结果为 "set age"，因为 set 方法的名称是 "set age"，表示设置属性 age 的方法。
```

### 理解参数

UNDERSTANDING ARGUMENTS.

```js
//ECMAScript 函数的参数跟大多数其他语言不同。ECMAScript 函数既不关心传入的参数个数，也不关心这些参数的数据类型。定义函数时要接收两个参数，并不意味着调用时就传两个参数。你可以传一个、三个，甚至一个也不传，解释器都不会报错。之所以会这样，主要是因为 ECMAScript 函数的!!!参数在内部表现为一个数组!!!。函数被调用时总会接收一个数组，但函数并不关心这个数组中包含什么。如果数组中什么也没有，那没问题；如果数组的元素超出了要求，那也没问题。事实上，在使用 function 关键字定义（非箭头）函数时，可以在函数内部访问 arguments 对象，从中取得传进来的每个参数值。arguments 对象是一个类数组对象（但不是 Array 的实例），因此可以使用中括号语法访问其中的元素（第一个参数是 arguments[0]，第二个参数是 arguments[1]）。而要确定传进来多少个参数，可以访问 arguments.length 属性。在下面的例子中，sayHi()函数的第一个参数叫 name：
function sayHi(name, message) {  console.log("Hello " + name + ", " + message); 
} 
//可以通过 arguments[0]取得相同的参数值。因此，把函数重写成不声明参数也可以：
function sayHi() { 
 console.log("Hello " + arguments[0] + ", " + arguments[1]); 
} 
//在重写后的代码中，没有命名参数。name 和 message 参数都不见了，但函数照样可以调用。这就表明，ECMAScript 函数的参数只是为了方便才写出来的，并不是必须写出来的。与其他语言不同，在ECMAScript 中的命名参数不会创建让之后的调用必须匹配的函数签名。这是因为根本不存在验证命名参数的机制。也可以通过 arguments 对象的 length 属性检查传入的参数个数。下面的例子展示了在每调用一个函数时，都会打印出传入的参数个数：
function howManyArgs() { 
 console.log(arguments.length); 
} 
howManyArgs("string", 45); // 2 
howManyArgs(); // 0 
howManyArgs(12); // 1 
//这个例子分别打印出 2、0 和 1（按顺序）。既然如此，那么开发者可以想传多少参数就传多少参数。

function doAdd() { 
 if (arguments.length === 1) { 
 console.log(arguments[0] + 10); 
 } else if (arguments.length === 2) { 
 console.log(arguments[0] + arguments[1]); 
 } 
} 
doAdd(10); // 20 
doAdd(30, 20); // 50 
//这个函数 doAdd()在只传一个参数时会加 10，在传两个参数时会将它们相加，然后返回。因此doAdd(10)返回 20，而 doAdd(30,20)返回 50。虽然不像真正的函数重载那么明确，但这已经足以弥补 ECMAScript 在这方面的缺失了。

//还有一个必须理解的重要方面，那就是 arguments 对象可以跟命名参数一起使用，比如：
function doAdd(num1, num2) { 
 if (arguments.length === 1) { 
 console.log(num1 + 10); 
 } else if (arguments.length === 2) { 
 console.log(arguments[0] + num2); 
 } 
} 
//在这个 doAdd()函数中，同时使用了两个命名参数和 arguments 对象。命名参数 num1 保存着与arugments[0]一样的值，因此使用谁都无所谓。（同样，num2 也保存着跟 arguments[1]一样的值。）arguments 对象的另一个有意思的地方就是，它的值始终会与对应的命名参数同步。来看下面的例子：
function doAdd(num1, num2) { 
 arguments[1] = 10; 
 console.log(arguments[0] + num2); 
} 
//这个 doAdd()函数把第二个参数的值重写为 10。因为 arguments 对象的值会自动同步到对应的命名参数，所以修改 arguments[1]也会修改 num2 的值，因此两者的值都是 10。但这并不意味着它们都访问同一个内存地址，它们在内存中还是分开的，只不过会保持同步而已。另外还要记住一点：如果只传了一个参数，然后把 arguments[1]设置为某个值，那么这个值并不会反映到第二个命名参数。这是因为 arguments 对象的长度是根据传入的参数个数，而非定义函数时给出的命名参数个数确定的。对于命名参数而言，如果调用函数时没有传这个参数，那么它的值就是 undefined。这就类似于定义了变量而没有初始化。比如，如果只给 doAdd()传了一个参数，那么 num2 的值就是 undefined。

//严格模式下，arguments 会有一些变化。首先，像前面那样给 arguments[1]赋值不会再影响 num2的值。就算把 arguments[1]设置为 10，num2 的值仍然还是传入的值。其次，在函数中尝试重写arguments 对象会导致语法错误。（代码也不会执行。）
```

### 箭头函数中的参数

Arguments in Arrow Functions.

```js
//如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用 arguments 关键字访问，而只能通过定义的命名参数访问。
function foo() { 
 console.log(arguments[0]); 
} 
foo(5); // 5 
let bar = () => { 
 console.log(arguments[0]); 
}; 
bar(5); // ReferenceError: arguments is not defined

//虽然箭头函数中没有 arguments 对象，但可以在包装函数中把它提供给箭头函数：
function foo() { 
 let bar = () => { 
 console.log(arguments[0]); // 5 
 }; 
 bar(); 
} 
foo(5); 
//注意 ECMAScript 中的所有参数都按值传递的。不可能按引用传递参数。如果把对象作为参数传递，那么传递的值就是这个对象的引用。
```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```

```js
//

```
