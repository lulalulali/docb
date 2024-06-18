# REACT

## jsx

JSX 的全名是 JavaScript XML。它是一种语法扩展，通常与 React 一起使用。JSX 允许你在 JavaScript 代码中编写类似 HTML 的标签，从而使得定义 React 组件的结构和内容更加直观和简洁。

大致表述
语法扩展：JSX 是 JavaScript 的语法扩展，允许你在 JavaScript 文件中直接写 HTML 标签。
类 HTML 语法：使用类似 HTML 的语法来描述组件的 UI 结构，使得代码更具可读性和直观性。
与 React 结合：JSX 通常与 React 一起使用，简化了创建和管理组件的过程。
转译为 JavaScript：在构建过程中，JSX 会被 Babel 等工具转译为标准的 JavaScript 代码。每个 JSX 元素都被转换为 React.createElement() 调用。

## 概述

React 应用程序是由 组件 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

React 组件是返回标签的 JavaScript 函数

你可能已经注意到 ``<MyButton />`` 是以大写字母开头的。你可以据此识别 React 组件。React 组件必须以大写字母开头，而 HTML 标签则必须是小写字母。

大多数 React 项目会使用 JSX，主要是它很方便。所有 我们推荐的本地开发工具 都开箱即用地支持 JSX。

JSX (JavaScript XML)比 HTML 更加严格。你必须闭合标签，如 ``<br />``。你的组件也不能返回多个 JSX 标签。你必须将它们包裹到一个共享的父级中，比如 ``<div>...</div>``或使用空的 <>...</> 包裹

如果你有大量的 HTML 需要移植到 JSX 中，你可以使用 在线转换器。 就是说把html格式的东西放进jsx的组件里面???

React 并没有规定你如何添加 CSS 文件。最简单的方式是使用 HTML 的 ``<link>`` 标签。

JSX 会让你把标签放到 JavaScript 中。而大括号会让你 “回到” JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。例如，这将显示 user.name：

```jsx
return (
  <h1>
    {user.name}
  </h1>
);
return ( 
  <img
    className="avatar"
    src={user.imageUrl}
  />
);

//更复杂的式子
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
          //就这儿
        }}
      />
    </>
  );
}
```

你还可以将 JSX 属性 “转义到 JavaScript”，但你必须使用大括号 而非 引号。例如，className="avatar" 是将 "avatar" 字符串传递给 className，作为 CSS 的 class。但 src={user.imageUrl} 会读取 JavaScript 的 user.imageUrl 变量，然后将该值作为 src 属性传递.(在上面代码里面)

```jsx
//React 没有特殊的语法来编写条件语句，因此你使用的就是普通的 JavaScript 代码。例如使用 if 语句根据条件引入 JSX：
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
//如果你喜欢更为紧凑的代码，可以使用 条件 ? 运算符。与 if 不同的是，它工作于 JSX 内部：
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>

//或者下面的逻辑
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

```jsx
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);
//<li> 有一个 key 属性。对于列表中的每一个元素，你都应该传递一个字符串或者数字给 key，用于在其兄弟节点中唯一标识该元素。通常 key 来自你的数据，比如数据库中的 ID。如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 key 来思考发生了什么。  后续是毛意思,怎么插入???

return (
  <ul>{listItems}</ul>
);
```

### 响应事件

```jsx
//可以通过在组件中声明 事件处理 函数来响应事件：
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
注意，onClick={handleClick} 的结尾没有小括号！不要 调用 事件处理函数：你只需 把函数传递给事件 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。
```

### 更新界面

```jsx
//通常你会希望你的组件 “记住” 一些信息并展示出来，  比如说:  一个按钮被点击的次数。要做到这一点，你需要在你的组件中添加 state。
//首先，从 React 引入 useState：
import { useState } from 'react';
//现在你可以在你的组件中声明一个 state 变量：
function MyButton() {
  const [count, setCount] = useState(0);
  // ...}
//你将从 useState 中获得两样东西：当前的 state（count），以及用于更新它的函数（setCount）。你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名。

//第一次显示按钮时，count 的值为 0，因为你把 0 传给了 useState()。当你想改变 state 时，调用 setCount() 并将新的值传递给它。点击该按钮计数器将递增：
function MyButton() {
    //定义了一个函数组件 MyButton。函数组件是 React 中定义组件的一种方式。
  const [count, setCount] = useState(0);
    //状态钩子:useState(0)：调用 useState 钩子，初始化 count 状态为 0。count：当前状态值，初始化为 0。setCount：更新状态的函数。调用 setCount 并传入新值时，React 会重新渲染组件并更新 count 的值。
  function handleClick() {
    setCount(count + 1);
  }
    //事件处理函数:handleClick：定义了一个事件处理函数，当按钮被点击时调用。setCount(count + 1)：每次按钮点击时，将 count 的值增加 1，并使用 setCount 更新状态。
  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
    //render按钮:<button onClick={handleClick}>：定义了一个按钮，并将 handleClick 作为 onClick 事件处理函数。当按钮被点击时，会调用 handleClick 函数。    Clicked {count} times：按钮的文本内容动态显示 count 的值，格式为 "Clicked X times"，其中 X 是当前点击次数。
  );
  //注意，每个按钮会 “记住” 自己的 count，而不影响其他按钮。
}
//React 将再次调用你的组件函数。第一次 count 变成 1。接着点击会变成 2。继续点击会逐步递增。
//如果你多次渲染同一个组件，每个组件都会拥有自己的 state。你可以尝试点击不同的按钮：
```

```js
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

### HOOK

以 use 开头的函数被称为 Hook。useState 是 React 提供的一个内置 Hook。你可以在 React API 参考 中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。

### 上移

上移是用来干嘛的?

```jsx
//希望将按钮的计数逻辑从 MyApp 组件中移动到 MyButton 组件中。这样，每个 MyButton 组件都有独立的状态和计数逻辑。
import { useState } from 'react';
// 定义 MyButton 组件
function MyButton() {
    //定义了一个函数组件 MyButton，该组件包含自己的状态和点击处理逻辑。
    //使用 useState 钩子初始化 count 状态为 0。
    //定义 handleClick 函数，当按钮被点击时调用 setCount 增加计数。
    //渲染一个按钮，显示当前的点击次数，当按钮被点击时调用 handleClick 函数。
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

// 定义 MyApp 组件
export default function MyApp() {
  return (
    //定义了一个函数组件 MyApp，渲染一个包含标题和两个 MyButton 组件的 div。
    //每个 MyButton 组件都有独立的状态，因此它们的计数是分开更新的。
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
//组件交互
//当 MyApp 组件渲染时，会创建两个 MyButton 组件的实例。
//每个 MyButton 组件都有自己的 count 状态，并且它们的状态是相互独立的。
//点击任意一个按钮，只会更新对应 MyButton 组件的 count 状态，而不会影响另一个按钮的计数。

//接着，将 MyApp 中的点击事件处理函数以及 state 一同向下传递到 每个 MyButton 中。你可以使用 JSX 的大括号向 MyButton 传递信息。就像之前向 <img> 等内置标签所做的那样:
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
//使用这种方式传递的信息被称作 prop。此时 MyApp 组件包含了 count state 以及 handleClick 事件处理函数，并将它们作为 prop 传递给 了每个按钮。
//最后，改变 MyButton 以 读取 从父组件传递来的 prop：
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

```jsx
在这个示例中，我们希望创建一个 `MyApp` 组件，该组件包含两个 `MyButton` 组件，并且它们共享同一个计数状态。这意味着无论点击哪个按钮，两个按钮的计数都会一起更新。以下是实现此功能的完整代码：
import { useState } from 'react';

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

1. **`MyButton` 组件**：
   - 接受 `count` 和 `onClick` 作为 props。
   - 渲染一个按钮，显示当前的点击次数 `count`，并将 `onClick` 函数绑定到按钮的 `onClick` 事件上。
2. **`MyApp` 组件**：
   - 使用 `useState` 钩子来管理计数状态 `count`。
   - 定义 `handleClick` 函数，当按钮被点击时，增加计数。
   - 渲染一个包含标题和两个 `MyButton` 组件的 `div`。
   - 将 `count` 和 `handleClick` 作为 props 传递给每个 `MyButton` 组件。

- `MyApp` 组件管理着一个共享的 `count` 状态。
- 每次点击任意一个按钮，都会调用 `handleClick` 函数，将 `count` 增加 `1`。
- 由于 `count` 是由 `MyApp` 组件管理的，两个 `MyButton` 组件会显示相同的计数值，并且它们的计数会一起更新。

最终结果:当你运行这个代码时，你会看到标题 "Counters that update together" 和两个按钮。每个按钮都会显示相同的点击次数。当你点击任意一个按钮时，两个按钮的计数都会增加。这展示了如何在 React 中通过传递 props 来实现组件之间的状态共享。

- **共享状态**：`MyApp` 组件管理着一个 `count` 状态，并将其作为 props 传递给 `MyButton` 组件。
- **统一更新**：由于 `count` 状态是由 `MyApp` 管理的，每次更新都会导致所有依赖该状态的组件重新渲染。
- **提升状态**：这是一个状态提升的示例，状态提升到它们的共同父组件中，以便多个子组件可以共享同一个状态。
```

### 井字棋game

```jsx
//注意:html文件！打头 
<html>
<body>
  <div id="root"></div>
</body>
<!-- 一个带有 id 为 root 的 div，React 将在这个 div 中渲染内容。 -->
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->

<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<!-- 加载 Babel 以便在浏览器中直接使用 JSX 和现代 JavaScript 特性。加载 ES 模块填充库以便使用 importmap 来指定模块的位置。 -->
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//导入 React 和 useState 钩子。导入 createRoot 方法，用于创建 React 根节点。

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
  //Square 组件是一个按钮，显示传入的 value，并在点击时调用 onSquareClick 函数。
}

//定义了三个 React 组件：Square、Board 和 Game。Square 组件表示棋盘上的一个方格。
//Board 组件表示整个棋盘，它负责渲染 9 个 Square 组件，并处理点击事件。
//Game 组件管理游戏的状态，包括历史记录和当前步数，并允许用户查看游戏历史记录。
//calculateWinner 函数用来判断是否有玩家赢得了游戏。
//使用 createRoot 方法挂载 React 应用，并在 root 元素中渲染 App 组件。

//game组件
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  //计算赢家的个数
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

let App = function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//计算赢家的函数
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//挂载react应用
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
/* 为游戏组件定义了一些基础样式，包括方格、行和游戏信息的布局。 */
</style>
</html>
```

#### 一个button框

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<!-- 这两行脚本的作用是支持在浏览器中直接编写和运行现代 JavaScript 和 JSX 语法 -->
<!-- Babel：这是一个 JavaScript 编译器，可以将最新的 JavaScript 语法和 JSX 语法转换为浏览器能够理解的普通 JavaScript。   作用：这个脚本从 unpkg CDN 加载 Babel 的独立版本。它使我们可以在 HTML 文件中直接使用 JSX 语法和现代 JavaScript 特性，无需预编译步骤。配合 <script type="text/babel"> 标签使用时，Babel 会自动编译这些标签中的代码。 -->
<!-- ES Module Shims：这是一个 polyfill(Polyfill 是一个 JavaScript 库，通常用于提供对较旧的浏览器不支持的新特性或新功能的支持。Polyfill 可以模拟新特性，使得这些特性能够在不支持它们的旧环境中运行。一般作用--兼容性：Polyfill 的主要作用是增强兼容性，确保代码能够在尽可能多的浏览器和环境中运行。功能补充：对于浏览器尚未实现的 Web 标准，Polyfill 可以提供相应的功能支持。
平滑过渡：在新特性逐步被各大浏览器支持的过渡期，Polyfill 能帮助开发者提前使用这些新特性。)，它为浏览器提供对 import maps 和其他 ES 模块特性的支持。
作用：这个脚本使得我们可以使用 import maps 来定义模块的路径，从而在浏览器中更灵活地加载 ES 模块。它确保浏览器能够理解并处理 import maps 中的配置，并且支持基于 import 语句的模块导入。 -->
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<!-- Import Map 是一种用于在 JavaScript 模块导入时映射模块名称与实际 URL 之间的关系的 JSON 对象。它允许开发者定义模块名称以及它们的实际加载路径，从而更灵活地管理依赖项。 -->
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//React：从 react 库中导入 React 对象，这是编写 React 组件所需的核心库。StrictMode：React 的严格模式，用于突出潜在的问题。createRoot：从 react-dom/client 中导入的函数，用于创建 React 应用的根节点。
let App = function Square() {
  return <button className="square">X</button>;
}

const root = createRoot(document.getElementById('root'));
//创建一个 React 应用的根节点，并将其与 DOM 中的一个元素绑定。
//createRoot 函数--这是 React 18 中引入的新 API，用于创建一个新的根节点（root）。createRoot 函数接受一个 DOM 元素作为参数，返回一个根节点实例，该实例用于渲染 React 组件树。
//document.getElementById('root')--document.getElementById 是一个 DOM 方法，用于获取具有指定 id 的元素。在这个例子中，它获取 id 为 root 的 DOM 元素。
//结合起来--createRoot(document.getElementById('root')) 这行代码将获取 id 为 root 的 DOM 元素，并将其作为 React 应用的根元素。  root 变量现在是一个由 createRoot 创建的根节点实例，允许我们使用它来渲染 React 组件树。
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
// 在指定的根节点上渲染 React 组件树
//root.render 方法--root 是由 createRoot 创建的根节点实例。render 方法用于渲染 React 组件树到指定的根节点上。<StrictMode> 组件--StrictMode 是一个用于突出潜在问题的工具。它仅在开发模式中启用，帮助检测不安全的生命周期方法、过时的 API 以及其他可能导致问题的代码。将组件树包裹在 <StrictMode> 中，可以在开发过程中更早发现并修复潜在问题。<App /> 组件--这是我们自定义的 React 组件 App。在这个例子中，App 返回一个包含 "X" 的按钮。
//整体作用--这段代码的作用是将 App 组件（一个简单的按钮）渲染到 DOM 中 id 为 root 的元素中，并使用 StrictMode 进行包裹以便在开发过程中检测潜在问题。
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 数字9宫格框

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script> 
<!-- type="importmap" 是用来定义 JavaScript 模块的导入映射的。import map 是一种浏览器原生支持的机制，用来指定模块的路径映射关系，使得我们可以使用简短的别名来引用模块，而无需在每个文件中都写出完整的路径。 -->
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

let App = function Board() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
// createRoot(document.getElementById('root'))：创建一个 React 应用的根节点，并绑定到 HTML 中 id 为 root 的元素。
// root.render：在根节点上渲染 React 组件树。
// <StrictMode>：用于包裹 App 组件，帮助在开发模式下检测潜在问题。
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 数字9宫格另一种代码

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function Square({ value }) {
  return <button className="square">{value}</button>;
}

let App = function Board() {      
      // <div className="board-row">
      //   <button className="square">1</button>
      //   <button className="square">2</button>
      //   <button className="square">3</button>
      // </div>跟以下对比来看
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>

      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 空的9宫格棋盘

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({ value }) {
  return <button className="square">{value}</button>;
}

let App = function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
//使用了 React 的 useState 钩子来定义和管理组件的状态。以下是逐词解释：
// const：这是一个 ES6 关键字，用于声明一个常量变量。
// [squares, setSquares]：使用数组解构语法从 useState 返回的数组中提取两个值。第一个值 squares 是当前状态，第二个值 setSquares 是一个函数，用于更新状态。
// useState：这是 React 的一个钩子，用于在函数组件中添加状态。它接受一个初始状态作为参数，并返回一个包含当前状态和更新状态的函数的数组。
// Array(9).fill(null)：这是 useState 钩子的初始状态，它创建了一个包含 9 个 null 值的数组。这个数组表示一个 3x3 的棋盘，每个方块初始状态都是空的。
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 点击后全是X的9空格

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
// function Square({ value, onSquareClick }) { ... }：定义了一个名为 Square 的函数组件，接受两个属性（props）：value 和 onSquareClick。
// <button className="square" onClick={onSquareClick}>：返回一个按钮元素，具有一个 onClick 事件处理程序，当点击按钮时触发 onSquareClick 函数。
// {value}：按钮内部显示 value 属性的值。
}

let App = function Board() {
//let App = function Board() { ... }：定义了一个名为 Board 的函数，并将其赋值给 App，它代表了棋盘。
//const [squares, setSquares] = useState(Array(9).fill(null));：使用 useState 钩子定义一个状态变量 squares，其初始值为包含 9 个 null 的数组。setSquares 用于更新 squares 的值。
//function handleClick(i) { ... }：定义了一个 handleClick 函数，当一个方块被点击时调用。它创建一个 squares 数组的副本，更新点击的方块的值为 'X'，然后调用 setSquares 更新状态。
//return ( ... )：返回一个包含三个 div 元素的 JSX 片段，每个 div 元素代表棋盘的一行。每个 Square 组件被传递了对应的 value 和 onSquareClick 函数。
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
    //function handleClick(i) { ... }：定义了一个名为 handleClick 的函数，接受一个参数 i，表示被点击的方块的索引。
   // const nextSquares = squares.slice();：创建 squares 数组的一个副本 nextSquares。
   // nextSquares[i] = 'X';：将 nextSquares 数组中索引 i 处的值设置为 'X'。
   // setSquares(nextSquares);：使用 setSquares 更新 squares 状态为 nextSquares。
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 交替落子

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

let App = function Board() {
  //定义两个状态,一个是拿来true\false调控判断的;一个是拿来证明按钮新不新鲜的
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  //状态定义：xIsNext：一个布尔值，表示下一步是否由 X 进行。squares：一个包含 9 个元素的数组，表示棋盘上的方块，每个方块可以是 null、'X' 或 'O'。

  function handleClick(i) {
    if (squares[i]) {
      return;
      //检查索引 i 处的方块是否已经被点击过（即是否有值）。如果方块已经被点击过（值不为 null），函数返回，不执行后续操作。
    }
    const nextSquares = squares.slice();
    //创建当前 squares 数组的副本 nextSquares。使用 slice() 方法可以创建数组的浅拷贝。
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
      //nextSquares[i] = 'X';：如果当前是 X 的回合（xIsNext 为 true），将索引 i 处的方块值设置为 'X'。else { nextSquares[i] = 'O'; }：否则，将索引 i 处的方块值设置为 'O'。
    }
    setSquares(nextSquares);//更新 squares 状态为 nextSquares，重新渲染组件，显示更新后的方块值。
    setXIsNext(!xIsNext);//切换 xIsNext 的值，即将布尔值 xIsNext 取反，以便下次点击时使用不同的符号（X 或 O）。
    //handleClick 函数：
    // 首先检查方块是否已经被点击，如果是则直接返回。
    // 创建 squares 数组的副本 nextSquares。
    // 根据 xIsNext 的值设置点击的方块为 'X' 或 'O'。
    // 更新 squares 状态为 nextSquares。
    // 切换 xIsNext 的值，以便下一步由另一个玩家进行。
  }

  return (
// <Square value={squares[0]}：
// value={squares[0]}：将 squares 数组中索引为 0 的值传递给 Square 组件的 value 属性。这个值可以是 null、'X' 或 'O'。
// onSquareClick={() => handleClick(0)}：
// onSquareClick={() => handleClick(0)}：传递一个箭头函数给 Square 组件的 onSquareClick 属性。
// 当 Square 组件中的按钮被点击时，会调用这个箭头函数。
// 这个箭头函数会调用 handleClick(0) 函数，传递索引 0 作为参数，从而更新索引为 0 的方块的值。
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 赢家

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

 let App = function Board() {
  // 定义两个 state 变量：xIsNext 和 squares
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  // 点击处理函数
  function handleClick(i) {
    // 如果已经有赢家或者该方块已被点击，直接返回
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 创建 squares 数组的一个副本
    const nextSquares = squares.slice();
    // 根据 xIsNext 的值设置当前点击的方块为 'X' 或 'O'
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // 更新 squares 状态为 nextSquares
    setSquares(nextSquares);
    // 切换 xIsNext 的值，以便下次点击时使用不同的符号
    setXIsNext(!xIsNext);
  }
  // 检查是否有赢家
  const winner = calculateWinner(squares);
  let status;
  // 如果有赢家，显示赢家
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    // 否则，显示下一个玩家
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  // 返回 JSX 组件
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // function handleClick(i) {
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   const nextSquares = squares.slice();
  //   if (xIsNext) {
  //     nextSquares[i] = 'X';
  //   } else {
  //     nextSquares[i] = 'O';
  //   }
  //   setSquares(nextSquares);
  //   setXIsNext(!xIsNext);
  // }

  // const winner = calculateWinner(squares);
  // let status;
  // if (winner) {
  //   status = 'Winner: ' + winner;
  // } else {
  //   status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  // }

  // return (
  //   <>
  //     <div className="status">{status}</div>
  //     <div className="board-row">
  //       <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  //       <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  //       <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  //       <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  //       <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  //       <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  //       <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  //     </div>
  //   </>
  // );

function calculateWinner(squares) {
  // 定义一个包含所有可能赢得比赛的行、列和对角线组合的数组
  const lines = [
    [0, 1, 2], // 第一行
    [3, 4, 5], // 第二行
    [6, 7, 8], // 第三行
    [0, 3, 6], // 第一列
    [1, 4, 7], // 第二列
    [2, 5, 8], // 第三列
    [0, 4, 8], // 主对角线
    [2, 4, 6], // 副对角线
  ];
  // 遍历所有可能的胜利组合
  for (let i = 0; i < lines.length; i++) {
    // 获取当前组合的三个索引
    const [a, b, c] = lines[i];
    // 检查这三个索引是否都相同且不为空
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 如果三个索引的值都相同且不为空，返回这个值（'X'或'O'）
      return squares[a];
      //第一个条件写作 squares[a] && squares[a] === squares[b] 而不是仅仅 squares[a]，是因为它不仅需要检查 squares[a] 是否有值，还要确保 squares[a] 的值等于 squares[b] 和 squares[c] 的值。这么做有两个目的：---防止 null 或 undefined 值的比较：squares[a] 只检查 squares[a] 是否有值（即不为 null 或 undefined）。如果 squares[a] 是 null 或 undefined，那么接下来的比较操作 squares[a] === squares[b] 和 squares[a] === squares[c] 可能会引发错误或无效比较。---确保在进行相等比较之前，先确认 squares[a] 有值：逻辑运算符 && 具有短路特性，即如果 squares[a] 是 falsy 值（例如 null、undefined、0、空字符串等），则整个条件表达式会直接返回 false，而不会继续进行后面的比较。这保证了只有在 squares[a] 有有效值的情况下，才会继续进行后续的相等性检查。
    }
  }
  // 如果没有赢家，返回 null
  return null;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 再一次状态提升\什么?再一次是什么意思啊???

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {// Board 是一个 React 函数组件，接收三个 props：xIsNext, squares 和 onPlay
function handleClick(i) {
  // handleClick 是一个用于处理方块点击的函数，i 是点击的方块的索引
  if (calculateWinner(squares) || squares[i]) {
    // 如果当前的 squares 数组已经有赢家（由 calculateWinner 函数判断）
    // 或者 squares[i] 已经有值（即方块已被点击），则直接返回，不做任何操作
    return;
  }
  const nextSquares = squares.slice();
  // 创建 squares 数组的一个副本，避免直接修改原数组
  // 这样可以保持 React 的不可变性原则
  if (xIsNext) {
    nextSquares[i] = 'X';
    // 如果当前是 X 的回合，将 nextSquares[i] 设置为 'X'
  } else {
    nextSquares[i] = 'O';
    // 否则，将 nextSquares[i] 设置为 'O'
  }
  onPlay(nextSquares);
  // 调用传入的 onPlay 函数，并传递更新后的 nextSquares 数组.  触发状态更新：调用 onPlay 函数，将更新后的 nextSquares 数组传递给它。这个函数通常用于更新父组件的状态，从而触发界面的重新渲染。
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

let App = function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //状态管理：xIsNext：表示当前轮到谁下棋，初始值为 true（表示 'X' 先下）。history：存储游戏的每一步历史状态，初始值为一个包含 9 个 null 值的数组。
  const currentSquares = history[history.length - 1];
  //获取当前棋盘状态：currentSquares：获取 history 数组中的最后一个元素，即当前的棋盘状态。
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
    //点击处理函数 handlePlay：当一个方块被点击时，handlePlay 会更新 history 数组，将新的棋盘状态 nextSquares 添加到 history 中。setHistory：这是 useState 返回的函数，用于更新 history 状态。[...]：这是展开运算符，用于展开数组。history：当前的 history 状态，包含游戏的所有历史状态。nextSquares：新的棋盘状态。...history：展开当前的 history 数组，复制其中的所有元素。nextSquares：将 nextSquares 作为新的元素添加到数组的末尾  --同时，xIsNext 会被切换，以便下次点击时使用不同的符号。
  }
  return (
    //渲染：Board 组件被渲染，并通过 props 接收 xIsNext、currentSquares 和 handlePlay。还有一个留空的 <ol> 标签，用于将来实现游戏历史记录显示。
    // <div className="game-board">：创建一个 div 元素，并赋予它一个名为 game-board 的 CSS 类。这个类名可以用来应用样式，使这个容器在页面上以特定方式显示。
    // <Board>：在 div 内渲染 Board 组件。 xIsNext={xIsNext}：将 xIsNext 状态作为一个名为 xIsNext 的属性传递给 Board 组件，使 Board 能够知道当前是 X 还是 O 的回合。 squares={currentSquares}：将 currentSquares 作为一个名为 squares 的属性传递给 Board 组件，使 Board 知道当前的棋盘状态。 onPlay={handlePlay}：将 handlePlay 函数作为一个名为 onPlay 的属性传递给 Board 组件，使 Board 能够在棋盘点击时调用 handlePlay 函数。
    // 这段代码的作用是创建一个包含 Board 组件的 div 容器，并将必要的属性传递给 Board，以便它能够正确显示和处理游戏逻辑。  
      <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
    //<div>：HTML 的 div 元素，用于创建一个块级容器。className="game-info"：className 是 React 中用于指定 HTML 类名的属性，"game-info" 是应用于这个 div 的 CSS 类名。<ol>：HTML 的 ol 元素，表示有序列表。 {/*TODO*/}：JavaScript 的注释语法，在 JSX 中用花括号 {} 包裹，表示在这里将来会添加内容。
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 显示过去的落子

### recat哲学

当你使用 React 构建用户界面时，你首先会把它分解成一个个 组件，然后，你需要把这些组件连接在一起，使数据流经它们。

#### 将 UI 拆解为组件层级结构

就是整体是个框;部分中各自套框

#### 使用 React 构建一个静态版本

!!!!构建一个静态版本需要写大量的代码，并不需要什么思考; 但添加交互需要大量的思考，却不需要大量的代码。!!!!在简单的例子中，自上而下构建通常更简单；而在大型项目中，自下而上构建更简单。!!!!

##### 静态版本示例

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

let App = function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  //map是一种数组操作方法. 以下生成了一个包含所有历史步数的列表，每个列表项都是一个按钮，点击按钮可以跳转到相应的历史状态。描述信息根据步数显示为 Go to move #n 或 Go to game start。
  //array.map((element, index) => {});
  // 回调函数的主体
  // 对元素进行操作并返回新值
  //array 是我们要遍历的数组。.map 是数组的方法，用来对数组中的每个元素执行一个函数，并生成一个新数组。element 是当前正在处理的数组元素。index 是当前正在处理的数组元素的索引（位置）。
  const moves = history.map((squares, move) => {
    //map 方法会创建一个新数组，其结果是对原数组中的每个元素调用一次提供的回调函数后的返回值。它会遍历 history 数组中的每个元素，并为每个元素调用一次回调函数。(squares, move) => {这是传递给 map 方法的回调函数，它是一个箭头函数。箭头函数在这里定义了两个参数：squares 和 move。squares这是 history 数组中的每个元素。在这个上下文中，squares 是一个数组，表示某一时刻的棋盘状态。move这是 map 方法提供的第二个参数，表示当前元素在 history 数组中的索引。move 用来标识第几步。
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
    //const moves = history.map((squares, move) => {遍历 history 数组，为每一步创建一个按钮。history.map 返回一个新数组 moves，其中每个元素是一个列表项 li，包含一个按钮。
    //let description;声明一个变量 description，用于存储每一步的描述信息。
    //if (move > 0) {判断 move 是否大于 0，如果是，则设置 description 为 Go to move # 加上 move。
    //description = 'Go to move #' + move;设置 description 的值为当前步数。
    //description = 'Go to game start';如果 move 为 0，设置 description 为 Go to game start。
    //return (返回一个 li 元素，包含一个按钮，按钮的 onClick 事件调用 jumpTo 函数，传入当前的 move 值，按钮的文本为 description。
    //<li key={move}>创建一个 li 元素，key 属性设置为 move。
    //<button onClick={() => jumpTo(move)}>{description}</button>创建一个按钮，点击时调用 jumpTo 函数，传入当前的 move 值，按钮的文本为 description。
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
  //game 容器包含整个游戏界面。
  //game-board 容器包含棋盘组件 Board，该组件接收当前的玩家、棋盘状态和处理点击事件的函数作为属性。
  //game-info 容器包含历史记录的有序列表 moves，用户可以点击列表中的按钮跳转到对应的历史状态。
}

 function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

</style>
</html>
```

#### 找出 UI 精简且完整的 state 表示

为了使 UI 可交互，你需要用户更改潜在的数据结构。你将可以使用 state 进行实现。

组织 state 最重要的一条原则是保持它 DRY（不要自我重复）。计算出你应用程序需要的绝对精简 state 表示，按需计算其它一切。举个例子，如果你正在构建一个购物列表，你可将他们在 state 中存储为数组。如果你同时想展示列表中物品数量，不需要将其另存为一个新的 state。取而代之，可以通过读取你数组的长度来实现。

思路!!!:原始列表中的产品 被作为 props 传递，所以不是 state。
搜索文本似乎应该是 state，因为它会随着时间的推移而变化，并且无法从任何东西中计算出来。
复选框的值似乎是 state，因为它会随着时间的推移而变化，并且无法从任何东西中计算出来。
过滤后列表中的产品 不是 state，因为可以通过被原始列表中的产品，根据搜索框文本和复选框的值进行计算。

props与state:
在 React 中有两种“模型”数据：props 和 state。下面是它们的不同之处:
props 像是你传递的参数 至函数。它们使父组件可以传递数据给子组件，定制它们的展示。举个例子，Form 可以传递 color prop 至 Button。
state 像是组件的内存。它使组件可以对一些信息保持追踪，并根据交互来改变。举个例子，Button 可以保持对 isHovered state 的追踪。
props 和 state 是不同的，但它们可以共同工作。父组件将经常在 state 中放置一些信息（以便它可以改变），并且作为子组件的属性!!!向下!!!传递至它的子组件。如果第一次了解这其中的差别感到迷惑，也没关系。通过大量练习即可牢牢记住！

#### 验证state应该被放置在哪里

通常情况下，你可以直接放置 state 于它们共同的父组件。
你也可以将 state 放置于它们父组件上层的组件。
如果你找不到一个有意义拥有这个 state 的地方，单独创建一个新的组件去管理这个 state，并将它添加到它们父组件上层的某个地方。

##### 编辑后搜框和表格的变化

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

   return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    //如果 product.name 中不包含 filterText，则跳过当前产品
    if (inStockOnly && !product.stocked) {
      return;
    }
    //检查 inStockOnly 是否为真，以及产品是否未库存 (!product.stocked)。如果 inStockOnly 为真且产品未库存，则跳过当前产品。
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
      //检查当前产品的类别是否与 lastCategory 不同。如果不同，则说明遇到一个新的类别。
      //向 rows 数组添加一个 ProductCategoryRow 组件。ProductCategoryRow 组件用于显示当前产品类别的标题行。使用 product.category 作为 key 属性，以确保唯一性。
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
        //向 rows 数组添加一个 ProductRow 组件。ProductRow 组件用于显示当前产品的详细信息。使用 product.name 作为 key 属性，以确保唯一性。
    );
    lastCategory = product.category;
    //将 lastCategory 更新为当前产品的类别，以便下一个产品进行类别检查。
    //总之:遍历所有产品。过滤掉不匹配搜索文本的产品。过滤掉未库存的产品（如果启用了库存过滤）。如果当前产品的类别与上一个产品不同，则添加一个新的类别行。将产品行添加到 rows 数组中。更新 lastCategory 以便下一次迭代检查。最终，rows 数组包含了按类别分组并过滤后的产品列表，这些数据将用于在表格中显示产品信息。
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
      <label>
        <input
          type="checkbox"
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

let App = function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}

</style>
</html>
```

#### 添加反向数据流

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<!-- This setup is not suitable for production. -->
<!-- Only use it in development! -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    // 这两个onchange函数用来更新 FilterableProductTable 组件中的状态 filterText 和 inStockOnly。
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />

      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
  //简单说就是当输入框的内容改变时，调用 onFilterTextChange 并传递新的输入值。  就是说onchange事件(监视作用)发生时调用e=>后面的句子
  //这是一个 JSX 属性，指定当 HTML 输入元素的值改变时要调用的事件处理程序。--(e):这是事件处理函数的参数。e 代表事件对象，即 change 事件的实例。当输入框的内容发生变化时，浏览器会生成一个事件对象，并将其作为参数传递给事件处理函数。--=>:这是箭头函数语法，用来定义一个匿名函数。在这个上下文中，箭头函数接受一个参数 e，并执行箭头右侧的代码。---onFilterTextChange(e.target.value):onFilterTextChange 是通过属性传递到当前组件的一个函数。e.target 是触发事件的 DOM 元素，即输入框。e.target.value 是输入框当前的值，即用户输入的文本。这个表达式的作用是调用 onFilterTextChange 函数，并将输入框当前的值作为参数传递给它。
  //综合起来，onChange={(e) => onFilterTextChange(e.target.value)} 的作用是当输入框的内容发生变化时，调用 onFilterTextChange 函数，并传递输入框的新值。这样，onFilterTextChange 函数就能够接收到最新的输入值，并进行相应的处理（比如更新组件的状态）。
  //完整的解释如下：当输入框的值发生变化时，触发 change 事件。浏览器生成一个事件对象 e，包含事件的相关信息。事件处理程序 (e) => onFilterTextChange(e.target.value) 被调用，e 作为参数传入。事件处理程序内，通过 e.target 获取触发事件的 DOM 元素（输入框），再通过 e.target.value 获取输入框的当前值。调用 onFilterTextChange 函数，并将输入框的当前值作为参数传递给它。
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

let App = function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}

</style>
</html>
```

## 安装

### 启动一个新项目

大多数应用程序和网站最终都会构建常见问题的解决方案，例如代码分割、路由、数据获取和生成 HTML。不仅仅是 React，这些问题对于所有 UI 库都很常见。

当然可以在没有框架的情况下使用 React——这也就是你将 使用 React 作为页面的一部分。但是，如果你完全使用 React 构建新应用程序或网站，我们建议使用框架。

#### 生产级的react框架

这些框架支持在生产中部署和扩展应用程序所需的所有功能，并致力于支持我们的 全栈架构愿景。我们推荐的所有框架都是开源的，有活跃的社区支持，并且可以部署到你自己的服务器或托管服务提供商。如果你是一位框架作者，有兴趣加入此列表，请告诉我们。

#### nextjs

```js
这个组件 `Talks` 仅在服务端运行（或在构建期间），下面是对代码的逐段解释：
**函数声明**：这里定义了一个名为 `Talks` 的异步函数组件，它接收一个名为 `confId` 的属性。
async function Talks({ confId }) {
  // 1. 你在服务端，所以你可以和你的数据层对话。不需要 API 端点。**数据获取**：由于这个组件在服务端运行，它可以直接与数据库对话。使用 `await` 等待 `db.Talks.findAll` 方法的结果，该方法根据传入的 `confId` 从数据库中查找所有相关的 `talks`（演讲）。
  const talks = await db.Talks.findAll({ confId });

  // 2. 添加任意数量的渲染逻辑。它不会使你的 JavaScript bundle 变大。**处理数据**：`talks` 是一个包含演讲数据的数组。使用 `map` 方法从每个 `talk` 对象中提取 `video` 属性，并将这些 `video` 组成一个新的数组 `videos`。
  const videos = talks.map(talk => talk.video);

  // 3. 将数据向下传递给将在浏览器中运行的组件。**渲染组件**：返回一个 `SearchableVideoList` 组件，并将 `videos` 作为属性传递给它。这个 `SearchableVideoList` 组件将在浏览器中运行，并接收由服务端传递下来的数据。
  return <SearchableVideoList videos={videos} />;
}

- 这个组件 `Talks` 只在服务端运行。
- 它从数据库中获取数据，处理数据，然后将处理后的数据传递给一个将在浏览器中运行的组件。
- 这样做的好处是可以在服务端进行复杂的数据处理，而不会影响客户端 JavaScript 的大小或性能。
```

```jsx
简而言之就是:使用 Suspense 组件在加载 Talks 组件时显示 TalksLoading 作为回退内容。
使用了 React 的 `Suspense` 组件来处理异步加载的组件 `Talks`，并在 `Talks` 加载期间显示一个回退的加载指示器 `TalksLoading`。
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>

1. **Suspense 组件**：`Suspense` 是 React 的一个组件，用于处理异步操作的界面。`fallback` 属性指定在子组件加载过程中显示的回退内容。在这里，`<TalksLoading />` 是一个加载指示器组件，当 `Talks` 组件还没有加载完成时，会显示这个组件。

2. **Talks 组件**：`Talks` 是一个异步加载的组件，它接收一个 `confId` 属性。这里的 `conf.id` 是一个从 `conf` 对象中获取的会议信息 ID。这段代码表示 `Talks` 组件需要根据 `conf.id` 来加载特定会议信息的演讲数据。

3. **关闭 Suspense 组件**：这部分关闭了 `Suspense` 组件的标签。所有放置在 `Suspense` 组件内的子组件都将受到 `Suspense` 组件的控制，即如果这些子组件有任何异步操作（如数据加载），则会显示 `fallback` 指定的回退内容，直到这些子组件完全加载完成。

- **`Suspense` 组件**：用于处理异步操作。在加载子组件时，可以显示一个回退内容。
- **`fallback` 属性**：指定回退内容，这里是 `<TalksLoading />` 组件。
- **`Talks` 组件**：这是一个异步组件，加载指定 `confId` 的会议信息。
- **嵌套结构**：`Talks` 组件被包含在 `Suspense` 组件中，所以在 `Talks` 加载过程中，会显示 `TalksLoading` 组件作为加载指示器。

通过这种方式，React 可以优雅地处理异步数据加载，并在数据加载完成之前提供用户友好的加载指示。
```

### 将 React 添加到现有项目中

如果想对现有项目添加一些交互，不必使用 React 将其整个重写。只需将 React 添加到已有技术栈中，就可以在任何位置渲染交互式的 React 组件。

#### 在现有网站的子路由中使用 React

你又想在 example.com/some-app/ 部署一个 React 项目。

以下是推荐的配置方式：

使用一个 基于 React 的框架 构建 应用的 React 部分。
在框架配置中将 /some-app 指定为基本路径（这里有 Next.js 与 Gatsby 的配置样例）。
配置服务器或代理，以便所有位于 /some-app/ 下的请求都由 React 应用处理。
这可以确保应用的 React 部分可以受益于这些框架中内置的 最佳实践。

许多基于 React 的框架都是全栈的，从而可以让你的 React 应用充分利用服务器。但是，即使无法或不想在服务器上运行 JavaScript，也可以使用相同的方法。在这种情况下，将 HTML/CSS/JS 导出（Next.js 的 next export output，Gatsby 的 default）替换为 /some-app/。

#### 在现有页面的一部分中使用 React

想要在该页面的某个位置渲染交互式的 React 组件。这是常见方式——实际上，正是多年来大多数情况下 Meta 使用 React 的方式！

你可以分两步进行：
配置 JavaScript 环境，以便使用 JSX 语法、import 和 export 语法将代码拆分为模块，以及从 npm 包注册表中使用包（例如 React）。
在需要的位置渲染 React 组件。
确切的方法取决于现有的页面配置，因此让我们对一些细节进行说明。

步骤 1：配置模块化的 JavaScript 环境

```jsx
import { createRoot } from 'react-dom/client';

// 清除现有的 HTML 内容
document.body.innerHTML = '<div id="app"></div>';

// 渲染你的 React 组件
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

步骤 2：在页面的任何位置渲染 React 组件

```jsx
//在上一步中，此代码将被放在主文件的顶部：
import { createRoot } from 'react-dom/client';

// 清除现有的 HTML 内容
document.body.innerHTML = '<div id="app"></div>';

// 渲染你的 React 组件
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

```jsx
<!-- ... 你的 HTML 代码某处 ... -->
<nav id="navigation"></nav>
<!-- ... 其他 HTML 代码 ... -->

<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
//<title>My app</title>：定义了文档的标题栏显示的文本内容为 "My app"。
//<nav>：定义导航链接的部分。id="navigation"：给导航部分定义了一个ID为 "navigation"，可以在CSS或JavaScript中引用该ID。
```

```jsx
//index.js  简单说就是在指定的 DOM 节点中渲染一个显示 "Hello from React!" 的 React 组件。
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // Todo: 实际实现一个导航栏
  return <h1>Hello from React!</h1>;
  //定义了一个名为 NavigationBar 的函数组件，这个组件目前返回一个简单的 <h1> 元素，显示文本 "Hello from React!"。
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
//使用 document.getElementById 方法获取 id 为 'navigation' 的 DOM 元素。这个元素预期在 HTML 中已经存在，作为要将 React 组件渲染到其内部的目标容器。
//使用 createRoot 方法创建了一个根渲染器 root，并将其绑定到 domNode，即前面获取的 id 为 'navigation' 的 DOM 元素。根渲染器是 React 18 中引入的新概念，用于异步渲染和并发模式。
//使用 root 渲染器的 render 方法，将 NavigationBar 组件渲染到之前选定的 domNode 容器中。这样，<h1>Hello from React!</h1> 就会被渲染到 id 为 'navigation' 的 DOM 元素内部。

//总结：这段目的是在页面中找到 id 为 'navigation' 的 DOM 元素，然后使用 React 的新特性 createRoot 和 root.render 将一个简单的 NavigationBar 组件渲染到这个位置。
```

### 编辑器设置

ESLint 是一款流行且开源的 JavaScript 代码检查工具。

请确保你已经为你的项目启用了 eslint-plugin-react-hooks 规则。这在 React 项目中是必备的，同时能帮助你及早的捕获较为严重的 bug。我们推荐的 eslint-config-react-app preset 中已经集成了该规则。

格式化
与其他贡献者共享代码时，你最不想做的事就是争论代码缩进应该使用 tabs 还是空格！幸好，Prettier 会根据预设配置的规则重新格式化代码，以保证代码整洁。运行 Prettier，你的所有 tabs 都将转换为空格，同时缩进、引号等也都将根据你的配置而改变。理想状态下，当你保存文件时，Prettier 会自动执行格式化操作。

### 使用ts

```jsx
//该代码定义并渲染一个带有标题和按钮的 React 应用。括号 () 内的内容是函数的参数，参数是传递给函数的数据-----({ title }):使用对象解构来提取传入组件的属性 title。{ title } 是解构赋值语法，表示从传入的属性对象中提取 title 属性。: { title: string }:TypeScript 类型注解。表示 MyButton 函数的参数是一个对象，对象中包含一个 title 属性，且该属性的类型为字符串。
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}
export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton title="我是一个按钮" />
    </div>
  );
}
```

```jsx
//定义并渲染一个包含标题和按钮的 React 应用，其中按钮通过传入的属性设置其文本和禁用状态。
//一个 MyButton 组件和一个默认导出的 MyApp 组件，并使用 TypeScript 的接口来进行类型检查。
interface MyButtonProps {
  /** 按钮文字 */
  title: string;
  /** 按钮是否禁用 */
  disabled: boolean;
}
//TypeScript 关键字，用于定义接口。MyButtonProps：接口名称。title: string：接口中的属性，表示按钮文字，是一个字符串类型。disabled: boolean：接口中的属性，表示按钮是否禁用，是一个布尔类型.

function MyButton({ title, disabled }: MyButtonProps) {
  //简单说就是:将 MyButtonProps 类型的对象解构为 title 和 disabled 两个参数。两个的类型是 MyButtonProps
  //在 TypeScript 中，函数参数的类型注解使用冒号 : 语法。冒号 : 的含义: MyButtonProps：冒号 : 后面的部分是类型注解。表示前面的参数 { title, disabled } 的类型是 MyButtonProps。
  return (
    <button disabled={disabled}>{title}</button>
  );
}
//定义一个名为 MyButton 的函数组件。({ title, disabled })：使用解构赋值从传入的对象中提取 title 和 disabled 属性。: MyButtonProps：TypeScript 类型注解，表示参数的类型是 MyButtonProps。return：返回 JSX，渲染一个按钮元素。
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="我是一个禁用按钮" disabled={true}/>
    </div>
  );
  //导出 MyApp 组件作为默认导出。function MyApp：定义一个名为 MyApp 的函数组件。return：返回 JSX，渲染一个包含标题和 MyButton 组件的 div 元素。
}
```

#### hook示例

```jsx
useState Hook 会重用作为初始 state 传入的值以确定值的类型。例如：

// 推断类型为 "boolean"
const [enabled, setEnabled] = useState(false);//简单说就是:声明一个名为 enabled 的状态变量，初始值为 false，并提供一个名为 setEnabled 的函数来更新该状态。
这将为 enabled 分配 boolean 类型，而 setEnabled 将是一个接受 boolean 参数的函数，或者返回 boolean 的函数。如果你想为 state 显式提供一个类型，你可以通过为 useState 调用提供一个类型参数来实现：

// 显式设置类型为 "boolean"
const [enabled, setEnabled] = useState<boolean>(false);//简单说就是声明一个名为 enabled 的布尔状态变量，初始值为 false，并提供一个名为 setEnabled 的函数来更新该状态。

//在这种情况下，这并不是很有用，但是当你有一个联合类型时，你可能想要提供一个 type。例如，这里的 status 可以是几个不同的字符串之一：
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<Status>("idle");//声明一个名为 status 的状态变量(往上看是声明的布尔状态变量)，初始值为 "idle"，并提供一个名为 setStatus 的函数来更新该状态。

或者，如 选择 state 结构原则 中推荐的，你可以将相关的 state 作为一个对象分组，并通过对象类型描述不同的可能性：
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });//声明一个名为 requestState 的状态变量，初始值为 { status: 'idle' }，并提供一个名为 setRequestState 的函数来更新该状态。
```

```jsx
//定义了一个计数器应用组件 App，使用 useReducer 来管理状态，实现了增加计数和重置计数功能。
import {useReducer} from 'react';

interface State {
   count: number 
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  //一个状态管理函数 stateReducer，根据不同的操作类型更新状态。这个 stateReducer 函数根据 CounterAction 中定义的操作类型来更新 State 对象，是一个常见的状态管理模式之一，通常与 useReducer 配合使用来管理复杂的组件状态。
  //定义了一个名为 stateReducer 的函数，接收两个参数 state（类型为 State）和 action（类型为 CounterAction），返回一个 State 类型的对象。
  //switch (action.type) {开始一个 switch 语句，根据 action.type 的不同值执行不同的操作。
  //case "reset":当 action.type 等于 "reset" 时，返回 initialState，即状态重置为初始状态。
  //case "setCount":当 action.type 等于 "setCount" 时，返回一个新的状态对象，保留原始状态 (...state)，但更新 count 属性为 action.value。
  //default:如果 action.type 不匹配任何已知的 case，抛出一个错误，表示遇到未知的操作类型。
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  //一个计数器应用组件 App，使用了 useReducer 进行状态管理，并实现了加 5 和重置计数功能。这个组件通过 useReducer 和自定义的 stateReducer 函数来管理状态，并通过 dispatch 函数实现不同的操作，展示了一个简单的计数器应用。
  //使用 useReducer 钩子来初始化状态 state 和派发函数 dispatch，使用 stateReducer 函数管理状态，初始状态为 initialState。
  //const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });定义 addFive 函数，当调用时，派发一个类型为 "setCount" 的动作，更新计数值为当前 state.count 加 5。
  //const reset = () => dispatch({ type: "reset" });定义 reset 函数，当调用时，派发一个类型为 "reset" 的动作，将计数器重置为初始状态。
  //return (组件的返回部分开始。<div>返回一个 <div> 元素作为根元素。<h1>欢迎来到我的计数器</h1>显示一个标题，欢迎用户访问计数器应用。<p>计数： {state.count}</p>显示当前的计数值，从 state 中获取 count 属性。<button onClick={addFive}>加 5</button>创建一个按钮，点击按钮时调用 addFive 函数，执行加 5 操作。<button onClick={reset}>重置</button>创建一个按钮，点击按钮时调用 reset 函数，执行重置操作。</div>返回部分结束。
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>欢迎来到我的计数器</h1>
      <p>计数： {state.count}</p>
      <button onClick={addFive}>加 5</button>
      <button onClick={reset}>重置</button>
    </div>
  );

  //为 useReducer 提供类型参数的更明确的替代方法是在 initialState 上设置类型：
//使用 useReducer 钩子创建了一个简单的计数器状态管理器。使用 useReducer 钩子创建了一个简单的计数器状态管理器。在这里，<State> 用于给 useReducer 钩子指定状态的类型，这在 TypeScript 中很常见，用于确保状态和动作的类型安全。
import { stateReducer, State } from './your-reducer-implementation';

const initialState = { count: 0 };

export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}
//这行代码从 ./your-reducer-implementation 文件中导入了 stateReducer 和 State。stateReducer 是一个用来更新状态的函数，State 是一个状态的类型定义。
//定义了一个初始状态 initialState，其中包含一个 count 属性，并且初始值为 0。
//这是一个默认导出的 App 组件：使用了 useReducer 钩子，传入 stateReducer 作为状态更新函数，initialState 作为初始状态。useReducer 返回一个包含当前状态 state 和一个用于分发动作的 dispatch 函数的数组。state 用于访问当前的状态，dispatch 用于发送动作来更新状态。
}

useReducer 用于在 React 组件中管理复杂状态和状态逻辑。

useState 用于在 React 组件中管理简单的状态。
```

```jsx
//useContext 是一个 React 钩子，用于在函数组件中获取和使用上下文的当前值。 
//创建了一个主题上下文，并在组件中使用它来获取和显示当前主题。
//从 React 库中导入 createContext、useContext 和 useState 钩子。
import { createContext, useContext, useState } from 'react';
type Theme = "light" | "dark" | "system";//定义了一个 TypeScript 类型 Theme，它可以是 "light"、"dark" 或 "system"。

const ThemeContext = createContext<Theme>("system");
//使用 createContext 创建了一个上下文 ThemeContext，初始值为 "system"。

const useGetTheme = () => useContext(ThemeContext);
//定义了一个自定义钩子 useGetTheme，它使用 useContext 从 ThemeContext 获取当前主题值。
// console.log(useGetThem);  ???
export default function MyApp() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  )
 //这是一个默认导出的 MyApp 组件：使用 useState 钩子定义了 theme 状态，初始值为 "light"。使用 ThemeContext.Provider 将 theme 作为上下文值提供给组件树中的所有子组件。渲染一个 MyComponent 组件。 
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>当前主题：{theme}</p>
    </div>
  )
  //这是一个 MyComponent 组件：使用 useGetTheme 钩子获取当前的主题值。渲染一个 div，其中包含当前主题的段落文本。
}
```

```jsx
//但是，为了让类型系统理解你的代码，你需要在 createContext 上显式设置 ContextShape | null。

这会导致一个问题，你需要在 context consumer 中消除 | null 的类型。我们建议让 Hook 在运行时检查它的存在，并在不存在时抛出一个错误：

import { createContext, useContext, useState, useMemo } from 'react';

// 这是一个简单的示例，但你可以想象一个更复杂的对象
//创建了一个上下文，并在组件中安全地获取和显示一个复杂对象。
type ComplexObject = {
  kind: string
};
//定义了一个 TypeScript 类型 ComplexObject，包含一个 kind 属性，其类型为字符串。

// 上下文在类型中创建为 `| null`，以准确反映默认值。
const Context = createContext<ComplexObject | null>(null);
//使用 createContext 创建了一个上下文 Context，其初始值为 null，类型为 ComplexObject | null。

// 这个 Hook 会在运行时检查 context 是否存在，并在不存在时抛出一个错误。
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
  //示例:  const add = (a, b) => a + b;console.log(add(2, 3)); // 输出 5
  //定义了一个自定义钩子 useGetComplexObject：使用 useContext 从 Context 获取当前上下文值。如果上下文值不存在，则抛出一个错误。返回上下文值。
}

export default function MyApp() {
  const object = useMemo(() => ({ kind: "complex" }), []);

  return (
    <Context.Provider value={object}>
      <MyComponent />
    </Context.Provider>
  )
  //这是一个默认导出的 MyApp 组件：使用 useMemo 钩子创建一个 object，其中包含 { kind: "complex" }，并且仅在组件第一次渲染时创建。使用 Context.Provider 将 object 作为上下文值提供给组件树中的所有子组件。渲染一个 MyComponent 组件。
}

function MyComponent() {
  const object = useGetComplexObject();

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
  //这是一个 MyComponent 组件：使用 useGetComplexObject 钩子获取当前的复杂对象。渲染一个 div，其中包含当前对象的种类 (kind) 的段落文本。
}
```

```jsx
useMemo 会从函数调用中创建/重新访问记忆化值，只有在第二个参数中传入的依赖项发生变化时，才会重新运行该函数。函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为该 Hook 提供一个类型参数以指定函数类型。  就是说useMemo 用于缓存计算结果，以提高性能。

// 从 filterTodos 的返回值推断 visibleTodos 的类型.  使用 useMemo 钩子根据 todos 和 tab 计算并缓存过滤后的待办事项列表。  使用 useMemo 钩子根据 todos 和 tab 计算并缓存过滤后的待办事项列表。  useMemo 会缓存 filterTodos(todos, tab) 的结果，只有当 todos 或 tab 发生变化时才会重新计算，从而提高性能。
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
//const visibleTodos: 声明一个常量 visibleTodos 来存储计算后的结果。=: 赋值操作符，将右边的值赋给左边的变量。useMemo: 一个 React 钩子，用于优化性能，通过记忆函数的计算结果。(() => filterTodos(todos, tab)): 一个箭头函数，将 todos 和 tab 作为参数传递给 filterTodos 函数，并返回过滤后的结果。[todos, tab]: 依赖数组，只有在 todos 或 tab 发生变化时，才会重新计算 visibleTodos。
```

```jsx
useCallback 会在第二个参数中传入的依赖项保持不变的情况下，为函数提供相同的引用。与 useMemo 类似，函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为这个 Hook 提供一个类型参数以指定函数类型。

const handleClick = useCallback(() => {
  // ...
}, [todos]);
//使用 useCallback 钩子缓存一个点击处理函数，只有当 todos 改变时才重新创建这个函数。  useCallback 会缓存箭头函数 () => { // ... }，只有在 todos 发生变化时才会重新创建这个函数，从而优化性能，避免不必要的重新渲染。
//const handleClick: 声明一个常量 handleClick 用来存储回调函数。=: 赋值操作符，将右边的值赋给左边的变量。useCallback: 一个 React 钩子，用于返回一个记忆的回调函数。(() => { // ... }): 一个箭头函数，定义了点击处理逻辑（这里用注释代替实际代码）。, [todos]: 依赖数组，只有当 todos 发生变化时，useCallback 才会重新创建 handleClick。

当在 TypeScript 严格模式下，使用 useCallback 需要为回调函数中的参数添加类型注解。这是因为回调函数的类型是根据函数的返回值进行推断的——如果没有参数，那么类型就不能完全理解。

根据自身的代码风格偏好，你可以使用 React 类型中的 *EventHandler 函数以在定义回调函数的同时为事件处理程序提供类型注解：

//创建了一个带有输入框的表单，输入框的值会随着用户输入而更新。
import { useState, useCallback } from 'react';
//从 React 库中导入 useState 和 useCallback 钩子。

export default function Form() {
  const [value, setValue] = useState("Change me");
  //定义并导出一个名为 Form 的函数组件。
  //使用 useState 钩子创建一个状态变量 value，初始值为 "Change me"，以及一个更新状态的函数 setValue。
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, [setValue])
  //使用 useCallback 缓存输入变化处理函数，仅在 setValue 改变时重新创建。使用 useCallback 钩子创建一个 handleChange 函数：useCallback：用来缓存回调函数，依赖于 setValue。<React.ChangeEventHandler<HTMLInputElement>>：指定 handleChange 的类型是 React.ChangeEventHandler<HTMLInputElement>。(event) => { setValue(event.currentTarget.value); }：事件处理函数，接受一个事件对象 event，并使用 setValue 更新 value 的值为输入框的当前值。
  //在组件中返回一个包含输入框和段落的 JSX 片段：<input value={value} onChange={handleChange} />：一个输入框，值绑定到 value，当输入框内容改变时触发 handleChange 函数。<p>值： {value}</p>：显示当前 value 的段落。
  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>值： {value}</p>
    </>
  );
}
```

#### 箭头函数

以下是箭头函数与普通函数（函数声明和函数表达式）的区别：

| 特性                      | 箭头函数                    | 普通函数（函数声明/表达式）           |
|---------------------------|-----------------------------|--------------------------------------|
| **语法**                  | `const func = () => {}`     | `function func() {}` 或 `const func = function() {}` |
| **`this` 绑定**           | 继承自外层上下文            | 动态绑定，根据调用方式决定            |
| **`arguments` 对象**      | 没有自己的 `arguments` 对象 | 有自己的 `arguments` 对象             |
| **构造函数**              | 不能用作构造函数            | 可以用作构造函数                      |
| **原型属性**              | 没有 `prototype` 属性       | 有 `prototype` 属性                   |
| **函数体**                | 适用于简短的函数体          | 适用于更复杂的函数体                  |
| **隐式返回**              | 可以使用隐式返回（省略 `{}`）| 必须使用 `return` 关键字               |
| **适用场景**              | 简单的、无状态的函数        | 复杂的、有状态的函数                  |

1. **语法**：
   - 箭头函数：`const add = (a, b) => a + b;`
   - 普通函数：`function add(a, b) { return a + b; }` 或 `const add = function(a, b) { return a + b; };`

2. **`this` 绑定**：
   - 箭头函数：`this` 继承自定义该函数的上下文，不会被重新绑定。
   - 普通函数：`this` 取决于调用方式，可在运行时动态绑定。

3. **`arguments` 对象**：
   - 箭头函数：没有自己的 `arguments` 对象，使用的是外层函数的 `arguments`。
   - 普通函数：有自己的 `arguments` 对象，包含传递给函数的所有参数。

4. **构造函数**：
   - 箭头函数：不能用作构造函数，不能使用 `new` 关键字。
   - 普通函数：可以用作构造函数，可以使用 `new` 关键字创建实例。

5. **原型属性**：
   - 箭头函数：没有 `prototype` 属性。
   - 普通函数：有 `prototype` 属性，用于定义构造函数的原型。

6. **函数体**：
   - 箭头函数：适用于简短的单行函数。
   - 普通函数：适用于更复杂的、多行函数。

7. **隐式返回**：
   - 箭头函数：可以省略 `{}` 并隐式返回表达式结果。
   - 普通函数：必须使用 `return` 关键字显式返回结果。

8. **适用场景**：
   - 箭头函数：适合简短的、无状态的回调函数，如数组方法的回调。
   - 普通函数：适合更复杂的、有状态的函数，如需要动态 `this` 绑定的场景。

#### DOM事件

```jsx
在 React 中处理 DOM 事件时，事件的类型通常可以从事件处理程序中推断出来。但是，当你想提取一个函数以传递给事件处理程序时，你需要明确设置事件的类型。
//创建了一个带有输入框的表单，输入框的值会随着用户输入而更新。
import { useState } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>值： {value}</p>
    </>
  );
}
```

#### 子元素

```jsx
子元素 
描述组件的子元素有两种常见方法。第一种是使用 React.ReactNode 类型，这是可以在 JSX 中作为子元素传递的所有可能类型的并集：

interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
//定义了一个名为 ModalRendererProps 的接口，它描述了一个包含 title 和 children 属性的对象。
//声明一个名为 ModalRendererProps 的接口，用来描述一个对象的结构。  接口中的 title 属性，类型为 string，表示这是一个字符串类型的标题。   接口中的 children 属性，类型为 React.ReactNode，表示这是一个可以包含任何有效 React 子元素的节点。
这是对子元素的一个非常宽泛的定义。

//第二种方法是使用 React.ReactElement 类型，它只包括 JSX 元素，而不包括 JavaScript 原始类型，如 string 或 number：

interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
注意，你不能使用 TypeScript 来描述子元素是某种类型的 JSX 元素，所以你不能使用类型系统来描述一个只接受 <li> 子元素的组件。
```

#### 样式属性

```jsx
当在 React 中使用内联样式时，你可以使用 React.CSSProperties 来描述传递给 style 属性的对象。这个类型是所有可能的 CSS 属性的并集，它能确保你传递给 style 属性的是有效的 CSS 属性，并且你能在编辑器中获得样式编码提示。

//定义了一个名为 MyComponentProps 的接口，它描述了一个包含 style 属性的对象。
interface MyComponentProps {
  style: React.CSSProperties;
}
//声明一个名为 MyComponentProps 的接口，用来描述一个对象的结构。  接口中的 style 属性，类型为 React.CSSProperties，表示这是一个包含 CSS 样式属性的对象。
```

### react开发者工具

chrome插件,在FB上使用插件,并打开控制台.  怎么看出门道???

## 描述UI

### 你的第一个组件

组件 是 React 的核心概念之一。它们是构建用户界面（UI）的基础，是你开始 React 之旅的最佳起点！

#### 组件:UI构成要素

```html
<!-- 组件：UI 构成要素 
在 Web 当中，HTML 允许我们使用其内置的标签集（如 <h1> 和 <li>）创建丰富的结构化文档： -->

<article>
  <h1>我的第一个组件</h1>
  <ol>
    <li>组件：UI 构成要素</li>
    <li>定义组件</li>
    <li>使用组件</li>
  </ol>
</article>
```

``<article>`` 表示这篇文章，``<h1>`` 表示文章的标题，``<ol>`` 以有序列表的形式表示文章的（缩写的）目录。每一个侧边栏、头像、模态框、下拉框的背后是都是像这样的（结合了用于样式的 CSS 和用于交互的 JavaScript 的）标签——你在 Web 上看到的每一个 UI 模块。

React 允许你将标签、CSS 和 JavaScript 组合成自定义“组件”，即 应用程序中可复用的 UI 元素。上文中表示目录的代码可以改写成一个能够在每个页面中渲染的 ``<TableOfContents />`` 组件。实际上，使用的依然是 ``<article>、<h1>`` 等相同的 HTML 标签。

```html
就像使用 HTML 标签一样，你可以组合、排序和嵌套组件来绘制整个页面。例如，你正在阅读的文档页面就是由 React 组件构成的：

<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">文档</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
<!-- 一个页面布局，包含导航抬头(搜索框\链接栏) 主要内容区(目录表\内容) -->
随着项目的发展，你会发现很多布局可以通过复用已经完成的组件来实现，从而加快开发进程。上文中提到的目录可以通过 <TableOfContents /> 组件添加到任意的画面中！你也可以使用 React 开源社区分享的大量组件（例如 Chakra UI 和 Material UI）来快速启动项目。
```

#### 定义组件

```jsx
一直以来，创建网页时，Web 开发人员会用标签描述内容，然后通过 JavaScript 来增加交互。这种在 Web 上添加交互的方式能产生出色的效果。现在许多网站和全部应用都需要交互。React 最为重视交互性且使用了相同的处理方式：React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。如下所示（你可以编辑下面的示例）
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
  //这个组件渲染一张 Katherine Johnson 的图片。
  //声明并导出一个默认的名为 Profile 的函数组件。在函数组件内部，使用 return 返回要渲染的 JSX。使用 HTML 的 img 标签来渲染一张图片。来源 URL 为 https://i.imgur.com/MK3eW3Am.jpg。图片的替代文本（alt 属性）为 "Katherine Johnson"，在图片无法显示时显示的文本。
}

export default 前缀是一种 JavaScript 标准语法（非 React 的特性）。它允许你导出一个文件中的主要函数以便你以后可以从其他文件引入它。
```

#### 使用组件

```jsx  
//定义了一个 Gallery 组件，它包含一个标题和三张 Katherine Johnson 的图片。
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
  //声明一个名为 Profile 的函数组件。
}
export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```jsx
!!!浏览器所看到的:
注意下面两者的区别：

<section> 是小写的，所以 React 知道我们指的是 HTML 标签。
<Profile /> 以大写 P 开头，所以 React 知道我们想要使用名为 Profile 的组件。(针对上面说的)
然而 Profile 包含更多的 HTML：<img />。这是浏览器最后所看到的：

<section>
  <h1>了不起的科学家</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

```jsx
嵌套和组织组件:
组件是常规的 JavaScript 函数，所以你可以将多个组件保存在同一份文件中。当组件相对较小或彼此紧密相关时，这是一种省事的处理方式。如果这个文件变得臃肿，你也可以随时将 Profile 移动到单独的文件中。你可以立即在 关于引入的页面 中学习如何做到这些。

因为 Profile 组件在 Gallery 组件中渲染——甚至好几次！——我们可以认为 Gallery 是一个 父组件，将每个 Profile 渲染为一个“孩子”。这是 React 的神奇之处：你可以只定义组件一次，然后按需多处和多次使用。
```

```jsx
组件可以渲染其他组件，但是 请不要嵌套他们的定义：

export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
上面这段代码 非常慢，并且会导致 bug 产生。因此，你应该在顶层定义每个组件：

export default function Gallery() {
  // ...
}

// ✅ 在顶层声明组件
function Profile() {
  // ...
}
!!!当子组件需要使用父组件的数据时，你需要 通过 props 的形式进行传递，而不是嵌套定义。!!!
```

```jsx
你的 React 应用程序从“根”组件开始。通常，它会在启动新项目时自动创建。例如，如果使用 Next.js 框架，根组件定义在 pages/index.js(page.js) 中。在这些示例中，一直有导出根组件。

大多数 React 应用程序只有组件。这意味着你不仅可以将组件用于可复用的部分，例如按钮，还可以用于较大块的部分，例如侧边栏、列表以及最终的完整页面！组件是组织 UI 代码和标签的一种快捷方式，即使其中一些组件只使用了一次。

像 Next.js 这样的框架会做更多事情。与使用一个空白的 HTML 页面并让 React 使用 JavaScript “接手”管理页面不同，框架还会根据你的 React 组件自动生成 HTML。这使你的应用程序在加载 JavaScript 代码之前能够展示一些内容。

尽管如此，许多网站仅使用 React 来 添加“交互性”。它们有很多根组件，而不是整个页面的单个组件。你可以根据需要尽可能多或尽可能少地使用 React。
```

#### 小小的summary

```jsx
回顾一些关键点。

React 允许你创建组件，应用程序的可复用 UI 元素。

在 React 应用程序中，每一个 UI 模块都是一个组件。

React 是常规的 JavaScript 函数，除了：

它们的名字总是以大写字母开头。
它们返回 JSX 标签。(React 返回 JSX（JavaScript XML） 是指 React 组件返回一种类似 XML 语法的代码，这种代码混合了 JavaScript 和 HTML 的特性。JSX 是 React 的一种语法扩展，可以让你在 JavaScript 中编写类似 HTML 的代码。它使定义用户界面组件的代码更直观、更易读。)
```

```jsx
// 在下面写你的组件
function Pratice (){
  return(
  <h1>干得漂亮！</h1>
  );
}
export default function kuaKua(){
  return(
  <div>
    <Pratice />
  </div>
  );
}

或者
export default function Congratulations() {
  return (
    <h1>干得漂亮！</h1>
  );
}
```

### 组件的导入与导出

组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

#### 根组件文件

```jsx
//在此示例中，所有组件目前都定义在 根组件 App.js 文件中。具体还需根据项目配置决定，有些根组件可能会声明在其他文件中。
//!!!如果你使用的框架基于文件进行路由，如 Next.js，那你每个页面的根组件都会不一样。!!!
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}
export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

#### 导出和导入一个组件

如果将来需要在首页添加关于科学书籍的列表，亦或者需要将所有的资料信息移动到其他文件。这时将 Gallery 组件和 Profile 组件移出根组件文件会更加合理。这会使组件更加模块化，并且可在其他文件中复用。你可以根据以下三个步骤对组件进行拆分：
创建 一个新的 JS 文件来存放该组件。

导出 该文件中的函数组件（可以使用 默认导出 或 具名导出）

在需要使用该组件的文件中 导入（可以根据相应的导出方式使用 默认导入 或 具名导入）。
这里将 Profile 组件和 Gallery 组件，从 App.js 文件中移动到了 Gallery.js 文件中。修改后，即可在 App.js 中导入 Gallery.js 中的 Gallery 组件:

```jsx
//app.js  定义了一个 App 组件，渲染了 Gallery 组件。  定义了一个名为 App 的函数组件，该组件渲染了一个从 ./Gallery.js 导入的 Gallery 组件。
import Gallery from './Gallery.js';//从 ./Gallery.js 文件中导入默认导出的 Gallery 组件

export default function App() {
  return (
    <Gallery />
  );
  //声明并导出一个默认的名为 App 的函数组件。
  //在 App 组件内部，使用 return 返回要渲染的 JSX。
  //在 App 组件中渲染 Gallery 组件。
}


//Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

//小细节:文件名用全称,即加.js
//引入过程中，你可能会遇到一些文件并未添加 .js 文件后缀，如下所示import Gallery from './Gallery';无论是 './Gallery.js' 还是 './Gallery'，在 React 里都能正常使用，只是前者更符合 原生 ES 模块。
```

这是 JavaScript 里两个主要用来导出值的方式：默认导出和具名导出。到目前为止，我们的示例中只用到了默认导出。但你可以在一个文件中，选择使用其中一种，或者两种都使用。

!!!一个文件里有且仅有一个 默认 导出，但是可以有任意多个 具名 导出。!!!

组件的导出方式决定了其导入方式。当你用默认导入的方式，导入具名导出的组件时，就会报错。如下表格可以帮你更好地理解它们：

默认:导出语句--export default function Button() {}
导入语句--import Button from './Button.js';
具名:导出语句--export function Button() {}
导入语句--import { Button } from './Button.js';

当使用默认导入时，你可以在 import 语句后面进行任意命名。比如 import Banana from './Button.js'，如此你能获得与默认导出一致的内容。相反，对于具名导入，导入和导出的名字必须一致。这也是为什么称其为 具名 导入的原因！

通常，文件中仅包含一个组件时，人们会选择默认导出，而当文件中包含多个组件或某个值需要导出时，则会选择具名导出。 无论选择哪种方式，请记得给你的组件和相应的文件命名一个有意义的名字。我们不建议创建未命名的组件，比如 export default () => {}，因为这样会使得调试变得异常困难。

#### 从同一文件中导出和导入多个组件

```js
如果你只想展示一个 Profile 组，而不展示整个图集。你也可以导出 Profile 组件。但 Gallery.js 中已包含 默认 导出，此时，你不能定义 两个 默认导出。但你可以将其在新文件中进行默认导出，或者将 Profile 进行 具名 导出。

!!!同一文件中，有且仅有一个默认导出，但可以有多个具名导出!!!

注意:为了减少在默认导出和具名导出之间的混淆，一些团队会选择只使用一种风格（默认或者具名），或者禁止在单个文件内混合使用。这因人而异，选择最适合你的即可！

首先，用具名导出的方式，将 Profile 组件从 Gallery.js 导出（不使用 default 关键字）：

export function Profile() {
  // ...
}
接着，用具名导入的方式，从 Gallery.js 文件中 导入 Profile 组件（用大括号）:

import { Profile } from './Gallery.js';
最后，在 App 组件里 渲染 <Profile />：

export default function App() {
  return <Profile />;
}
现在，Gallery.js 包含两个导出：一个是默认导出的 Gallery，另一个是具名导出的 Profile。App.js 中均导入了这两个组件。尝试将 <Profile /> 改成 <Gallery />，回到示例中：
```

```jsx
//app.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}

//Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

//当你需要在一个文件中引入另一个文件（通常是模块）中导出的内容时，你会使用 import 关键字。当你希望将当前文件中的某些内容暴露给其他文件使用时，你会使用 export 关键字。
```

### 使用 JSX 书写标签语言

JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。虽然还有其它方式可以编写组件，但大部分 React 开发者更喜欢 JSX 的简洁性，并且在大部分代码库中使用它。

#### JSX: 将标签引入 JavaScript

网页是构建在 HTML、CSS 和 JavaScript 之上的。多年以来，web 开发者都是将网页内容存放在 HTML 中，样式放在 CSS 中，而逻辑则放在 JavaScript 中 —— 通常是在不同的文件中！页面的内容通过标签语言描述并存放在 HTML 文件中，而逻辑则单独存放在 JavaScript 文件中。

但随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容。JavaScript 控制着 HTML 的内容！

这也是为什么 在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。

将一个按钮的渲染逻辑和标签放在一起可以确保它们在每次编辑时都能保持互相同步。反之，彼此无关的细节是互相隔离的，例如按钮的标签和侧边栏的标签Sidebar.js和Form.js。这样我们在修改其中任意一个组件时会更安全。

每个 React 组件都是一个 JavaScript 函数，它会返回一些标签，React 会将这些标签渲染到浏览器上。React 组件使用一种被称为 JSX 的语法扩展来描述这些标签。JSX 看起来和 HTML 很像，但它的语法更加严格并且可以动态展示信息。了解这些区别最好的方式就是将一些 HTML 标签转化为 JSX 标签。

tip:JSX and React 是相互独立的 东西。但它们经常一起使用，但你 可以 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。

#### 将 HTML 转化为 JSX

```jsx
//以下是html标签
<h1>海蒂·拉玛的待办事项</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>发明一种新式交通信号灯
    <li>排练一个电影场景
    <li>改进频谱技术
</ul>
```

```js
//而现在想要把这些标签迁移到组件中：
export default function TodoList() {
  return (
    // ???
  )
}
//不起作用,如下
export default function TodoList() {
  return (
    // 这不起作用！
    <h1>海蒂·拉玛的待办事项</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>发明一种新式交通信号灯
      <li>排练一个电影场景
      <li>改进频谱技术
    </ul>
  );
}
```

#### JSX 规则

```jsx
1. 只能返回一个根元素 
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。
例如，你可以使用一个 <div> 标签：
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

```jsx
如果你不想在标签中增加一个额外的 <div>，可以用 <> 和 </> 元素来代替：
<>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。

为什么多个 JSX 标签需要被一个父元素包裹？ 

答:JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。
```

```jsx
2. 标签必须闭合 
JSX 要求标签必须正确闭合。像 <img> 这样的自闭合标签必须书写成 <img />，而像 <li>oranges 这样只有开始标签的元素必须带有闭合标签，需要改为 <li>oranges</li>。

海蒂·拉玛的照片和待办事项的标签经修改后变为：
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
  </ul>
</>
```

```jsx
3. 使用驼峰式命名法给 所有 大部分属性命名！ 
JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 - 符号或者像 class 这样的保留字。

这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 strokeWidth 代替 stroke-width。由于 class 是一个保留字，所以在 React 中需要用 className 来代替。这也是 DOM 属性中的命名:
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
你可以 在 React DOM 元素中找到所有对应的属性。如果你在编写属性时发生了错误，不用担心 —— React 会在 浏览器控制台 中打印一条可能的更正信息。

由于历史原因，aria-* 和 data-* 属性是以带 - 符号的 HTML 格式书写的。
```

```jsx
高级提示：使用 JSX 转化器 
将现有的 HTML 中的所有属性转化 JSX 的格式是很繁琐的。我们建议使用 转化器 将 HTML 和 SVG 标签转化为 JSX。这种转化器在实践中非常有用。但我们依然有必要去了解这种转化过程中发生了什么，这样你就可以编写自己的 JSX 了。

这是最终的结果:
export default function TodoList() {
  return (
    <>
      <h1>海蒂·拉玛的待办事项</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </>
  );
}
```

为什么我们需要 JSX 以及如何在组件中使用它：

答:由于渲染逻辑和标签是紧密相关的，所以 React 将它们存放在一个组件中。
JSX 类似 HTML，不过有一些区别。如果需要的话可以使用 转化器 将 HTML 转化为 JSX。
错误提示通常会指引你将标签修改为正确的格式。

```jsx
<>
  <div className="intro">
    <h1>欢迎来到我的站点！</h1>
  </div>
  <p className="summary">
    你可以在这里了解我的想法。
    <br />
    <br />
    <b>
      还有科学家们的<i>照片</i>
    </b>
    ！
  </p>
  );
</>
```

### 在 JSX 中通过大括号使用 JavaScript

JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript。

```jsx
使用引号传递字符串 
当你想把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中：
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
这里的 "https://i.imgur.com/7vQD0fPs.jpg" 和 "Gregorio Y. Zara" 就是被作为字符串传递的。

但是如果你想要动态地指定 src 或 alt 的值呢？你可以 用 { 和 } 替代 " 和 " 以使用 JavaScript 变量 ：
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
请注意 className="avatar" 和 src={avatar} 之间的区别，className="avatar" 指定了一个就叫 "avatar" 的使图片在样式上变圆的 CSS 类名，而 src={avatar} 这种写法会去读取 JavaScript 中 avatar 这个变量的值。这是因为大括号可以使你直接在标签中使用 JavaScript！
```

```jsx
使用大括号：一扇进入 JavaScript 世界的窗户 
JSX 是一种编写 JavaScript 的特殊方式。这为在大括号 { } 中使用 JavaScript 带来了可能。下面的示例中声明了科学家的名字，name，然后在 <h1> 后的大括号内嵌入它：
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
试着将 name 的值从 'Gregorio Y. Zara' 更改成 'Hedy Lamarr'。看看这个 To Do List 的标题将如何变化？

大括号内的任何 JavaScript 表达式都能正常运行，包括像 formatDate() 这样的函数调用：
//定义了一个 TodoList 组件，显示当天是星期几的待办事项列表标题。
const today = new Date();
//创建一个表示当前日期和时间的 Date 对象，并赋值给 today 变量。
function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
  //声明一个名为 formatDate 的函数，该函数接受一个日期对象 date 作为参数。
  //使用 Intl.DateTimeFormat 构造函数创建一个新的国际化日期格式化器。
  //设置日期格式化器的语言环境为中文（简体中文）。
  //指定日期格式化器的选项，weekday: 'long' 表示以完整形式显示星期几（例如，星期一、星期二）。
  //调用 format 方法，将传入的日期对象 date 格式化为指定的星期几格式。

  //简单说就是日期输入转换成 星期几
}
export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
  //声明并导出一个默认的名为 TodoList 的函数组件。
  //在 TodoList 组件内部，使用 return 返回要渲染的 JSX。使用 h1 标签显示标题。To Do List for 是标题的静态文本。{formatDate(today)} 是一个动态部分，调用 formatDate 函数，将 today 日期对象格式化为星期几，并插入到标题中。
}

```

```jsx
可以在哪使用大括号 
在 JSX 中，只能在以下两种场景中使用大括号：

用作 JSX 标签内的文本：<h1>{name}'s To Do List</h1> 是有效的，但是 <{tag}>Gregorio Y. Zara's To Do List</{tag}> 无效。
用作紧跟在 = 符号后的 属性：src={avatar} 会读取 avatar 变量，但是 src="{avatar}" 只会传一个字符串 {avatar}。
```

```jsx
使用 “双大括号”：JSX 中的 CSS 和 对象 
除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 { name: "Hedy Lamarr", inventions: 5 }。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：person={{ name: "Hedy Lamarr", inventions: 5 }}。

你可能在 JSX 的内联 CSS 样式中就已经见过这种写法了。React 不要求你使用内联样式（使用 CSS 类就能满足大部分情况）。但是当你需要内联样式的时候，你可以给 style 属性传递一个对象：
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
      //可以改改.  当你下次在 JSX 中看到 {{ 和 }}时，就知道它只不过是包在大括号里的一个对象罢了！
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
//tip:内联 style 属性 使用驼峰命名法编写。例如，HTML <ul style="background-color: black"> 在你的组件里应该写成 <ul style={{ backgroundColor: 'black' }}>。
```

```jsx
JavaScript 对象和大括号的更多可能 

你可以将多个表达式合并到一个对象中，在 JSX 的大括号内分别使用它们：
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```jsx
//在这个示例中，person JavaScript 对象包含 name 中存储的字符串和 theme 对象：

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
该组件可以这样使用来自 person 的值：

<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。
```

```jsx
//小小summary
几乎了解了有关 JSX 的一切：

JSX 引号内的值会作为字符串传递给属性。
大括号让你可以将 JavaScript 的逻辑和变量带入到标签中。
它们会在 JSX 标签中的内容区域或紧随属性的 = 后起作用。
{{ 和 }} 并不是什么特殊的语法：它只是包在 JSX 大括号内的 JavaScript 对象。

//小作业:就是说你要{}可以包好几个引用一并处理.  也可以这么搞,如下
//import { getImageUrl } from './utils.js' 和 src={getImageUrl(person)}
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl+person.imageId+person.imageSize+'.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

### 单引号双引号 左斜杠右斜杠

简单说双引单引差别不大,套用时保持不一样即可;  一般用左斜杠,路径分割等,右斜杠用于转义win系统路径分割

```jsx
//在 JavaScript 和 JSX 中，单引号 (`'`) 和双引号 (`"`) 用来包裹字符串值。虽然它们在功能上是等效的，但有一些最佳实践和使用情境可以帮助你选择何时使用单引号和双引号。
单引号 (`'`) 和双引号 (`"`) 的使用建议
1. **一致性**:
   - 无论选择单引号还是双引号，保持一致性是最重要的。建议在整个项目中使用一种风格。

2. **JSX 中的属性**:
   - 在 JSX 中，通常使用双引号来包裹属性值，这类似于 HTML 的属性规范。
     ```jsx
     <input type="text" placeholder="Enter your name" />
     ```

3. **字符串包含引号**:
   - 如果字符串内部包含双引号，可以使用单引号来避免转义符。
     ```javascript
     const message = 'He said, "Hello!"';
     ```

   - 反之，如果字符串内部包含单引号，可以使用双引号。
     ```javascript
     const message = "It's a beautiful day!";
     ```

4. **嵌套引号**:
   - 当需要嵌套引号时，外层使用一种引号，内层使用另一种引号。
     ```javascript
     const quote = "She said, 'I love JavaScript!'";
     ```

5. **模板字符串**:
   - 对于包含变量或多行文本的字符串，可以使用反引号（`` ` ``），这称为模板字符串。
     ```javascript
     const name = "John";
     const greeting = `Hello, ${name}!`;
     ```
使用单引号
const singleQuoteString = 'This is a string with single quotes.';
const stringWithDoubleQuotes = 'She said, "Hello!"';

使用双引号
const doubleQuoteString = "This is a string with double quotes.";
const stringWithSingleQuotes = "It's a sunny day.";

JSX 中使用双引号
function App() {
  return (
    <div>
      <input type="text" placeholder="Enter your name" />
    </div>
  );
}

模板字符串
const name = 'Alice';
const greeting = `Hello, ${name}! Welcome to the site.`;

总之，选择单引号或双引号主要取决于个人和团队的编码风格。在 JSX 中使用双引号是推荐的做法，而在 JavaScript 中，选择一种引号并保持一致是最佳实践。
```

```jsx
//在编程中，斜杠 (`/`) 和反斜杠 (`\`) 有不同的用途和意义。下面详细解释它们的用法和区别：
斜杠 (`/`)
1. **路径分隔符**:
   - 在大多数操作系统（如 Unix、Linux、macOS）和 URL 中，斜杠用作路径分隔符。
   - 示例：`/home/user/documents` 或 `https://example.com/path/to/resource`

2. **正则表达式**:
   - 在 JavaScript 中，斜杠用于包裹正则表达式。
   - 示例：`/abc/` 表示一个匹配 "abc" 的正则表达式。

3. **数学运算**:
   - 斜杠用于表示除法运算。
   - 示例：`10 / 2 = 5`

反斜杠 (`\`)
1. **转义字符**:
   - 在许多编程语言中，反斜杠用作转义字符，表示后面的字符应被特殊处理。
   - 示例：`\n` 表示换行符，`\"` 表示引号字符。

2. **路径分隔符**:
   - 在 Windows 操作系统中，反斜杠用于文件路径分隔符。
   - 示例：`C:\Users\user\documents`

使用场景对比
1. **文件路径**:
   - Unix/Linux/macOS: `/home/user/file.txt`
   - Windows: `C:\Users\user\file.txt`

2. **字符串中的转义**:

   const string = "She said, \"Hello!\""; // 使用反斜杠转义双引号
   const path = "C:\\Users\\user\\file.txt"; // 在 Windows 路径中使用反斜杠

3.**URL**:
   - 在 URL 中使用斜杠：`https://example.com/path/to/resource`

总结
- **斜杠 (`/`)**: 主要用于 Unix 类系统的路径分隔符、URL 和正则表达式。
- **反斜杠 (`\`)**: 主要用于 Windows 系统的路径分隔符和字符串中的转义字符。

根据具体场景和所使用的操作系统来选择使用斜杠或反斜杠。希望这对你理解它们的使用有所帮助！
```

### 将 Props 传递给组件

在 React 中，props 是用于将数据从父组件传递到子组件的机制。简单来说就是机制,一种联系.

React 组件使用 props 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

```jsx
//熟悉的 props 
Props 是你传递给 JSX 标签的信息。例如，className、src、alt、width 和 height 便是一些可以传递给 <img> 的 props：
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}
export default function Profile() {
  return (
    <Avatar />
  );
}
你可以传递给 <img> 标签的 props 是预定义的（ReactDOM 符合 HTML 标准）。但是你可以将任何 props 传递给 你自己的 组件，例如 <Avatar> ，以便自定义它们。 就像这样！
```

```jsx
//向组件传递 props 
在这段代码中， Profile 组件没有向它的子组件 Avatar 传递任何 props ：

export default function Profile() {
  return (
    <Avatar />
  );
}
你可以分两步给 Avatar 一些 props。
步骤 1: 将 props 传递给子组件 
首先，将一些 props 传递给 Avatar。例如，让我们传递两个 props：person（一个对象）和 size（一个数字）：

export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
!!!注意:如果 person= 后面的双花括号让你感到困惑，请记住，在 JSX 花括号中，它们只是一个对象。!!!现在，你可以在 Avatar 组件中读取这些 props 了。
```

```jsx
//步骤 2: 在子组件中读取 props 
你可以通过在 function Avatar 之后直接列出它们的名字 person, size 来读取这些 props。这些 props 在 ({ 和 }) 之间，并由逗号分隔。这样，你可以在 Avatar 的代码中使用它们，就像使用变量一样。

function Avatar({ person, size }) {
  // 在这里 person 和 size 是可访问的
}
向使用 person 和 size props 渲染的 Avatar 添加一些逻辑，你就完成了。

现在你可以配置 Avatar ，通过不同的 props，使它能以多种不同的方式进行渲染。尝试变换值吧！
```

```jsx
//appjs
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}
//utilsjs
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );//参数都是变得东西,看你往这个函数里面塞什么,  产出一定是基于参数的数据处理造成的
  //函数生成一个基于给定人物信息和尺寸的图片 URL。   URL 的格式是 https://i.imgur.com/{imageId}{size}.jpg，其中 imageId 来自 person 对象，size 是可选的图片尺寸，默认值为 's'。
  //export：将这个函数导出，使其可以在其他文件中被导入使用。function getImageUrl：声明一个名为 getImageUrl 的函数。person：函数的第一个参数，是一个包含人物信息的对象。size = 's'：函数的第二个参数，具有默认值 's'，表示图片的尺寸。
  //在 getImageUrl 函数内部，使用 return 返回要生成的图片 URL。URL 的起始部分，是固定的字符串 'https://i.imgur.com/'。连接 person 对象的 imageId 属性，这是图片的唯一标识符。连接图片的尺寸参数 size，默认值为 's'。连接图片的文件扩展名，固定为 '.jpg'。关闭 return 语句和 getImageUrl 函数。
}
Props 使你独立思考父组件和子组件。 例如，你可以改变 Profile 中的 person 或 size props，而无需考虑 Avatar 如何使用它们。 同样，你可以改变 Avatar 使用这些 props 的方式，不必考虑 Profile。

你可以将 props 想象成可以调整的“旋钮”。它们的作用与函数的参数相同 —— 事实上，props 正是 组件的唯一参数！ React 组件函数接受一个参数，一个 props 对象：

function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
通常你不需要整个 props 对象，所以可以将它解构为单独的 props。

陷阱
在声明 props 时， 不要忘记 ( 和 ) 之间的一对花括号 { 和 }  ：

function Avatar({ person, size }) {
  // ...
}
这种语法被称为 “解构”，等价于于从函数参数中读取属性：   函数组件 Avatar 接受 props 参数并将其 person 和 size 属性分别赋值给局部变量 person 和 size。 从传入的 props 对象中提取 person 和 size 属性，并分别赋值给局部变量 person 和 size，以便在组件内部使用这些属性。
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

```jsx
//给 prop 指定一个默认值 
如果你想在没有指定值的情况下给 prop 一个默认值，你可以通过在参数后面写 = 和默认值来进行解构：

function Avatar({ person, size = 100 }) {
  // ...
}
现在， 如果 <Avatar person={...} /> 渲染时没有 size prop，  size 将被赋值为 100。

默认值仅在缺少 size prop 或 size={undefined} 时生效。 但是如果你传递了 size={null} 或 size={0}，默认值将 不 被使用。  也就是说,你自己使用一个,会顶掉默认值.
```

```jsx
//使用 JSX 展开语法传递 props 
有时候，传递 props 会变得非常重复：

function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
重复代码没有错（它可以更清晰）。但有时你可能会重视简洁。一些组件将它们所有的 props 转发给子组件，正如 Profile 转给 Avatar 那样。因为这些组件不直接使用他们本身的任何 props，所以使用更简洁的“展开”语法是有意义的：

function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
这会将 Profile 的所有 props 转发到 Avatar，而不列出每个名字。

请克制地使用展开语法。 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！
```

```jsx
//将 JSX 作为子组件传递 
嵌套浏览器内置标签是很常见的：

<div>
  <img />
</div>
有时你会希望以相同的方式嵌套自己的组件：

<Card>
  <Avatar />
</Card>
当您将内容嵌套在 JSX 标签中时，父组件将在名为 children 的 prop 中接收到该内容。例如，下面的 Card 组件将接收一个被设为 <Avatar /> 的 children prop 并将其包裹在 div 中渲染：

```

```jsx
//appjs
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
//avatarjs
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
//utilsjs
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
尝试用一些文本替换 <Card> 中的 <Avatar>，看看 Card 组件如何包裹任意嵌套内容。它不必“知道”其中渲染的内容。你会在很多地方看到这种灵活的模式。

可以将带有 children prop 的组件看作有一个“洞”，可以由其父组件使用任意 JSX 来“填充”。你会经常使用 children prop 来进行视觉包装：面板、网格等等。
```

!!!此处插入图片2

```jsx
//Props 如何随时间变化 
下面的 Clock 组件从其父组件接收两个 props：color 和 time。（父组件的代码被省略，因为它使用 state，我们暂时不会深入研究。）

尝试在下面的选择框中更改颜色：
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
  //函数组件 Clock 渲染一个带有指定颜色和时间的标题。
  //声明并默认导出一个名为 Clock 的函数组件，该组件解构接收 color 和 time 两个属性。
  //在 Clock 组件内部，使用 return 返回要渲染的 JSX。使用 HTML 的 h1 标签渲染一个标题，设置 style 属性，其中 color 属性的值由传入的 color 属性决定。在 h1 标签内插入 time 属性的值，显示传入的时间。关闭 h1 标签、return 语句和 Clock 函数组件。
}
这个例子说明，一个组件可能会随着时间的推移收到不同的 props。 Props 并不总是静态的！在这里，time prop 每秒都在变化。当你选择另一种颜色时，color prop 也改变了。Props 反映了组件在任何时间点的数据，并不仅仅是在开始时。

然而，props 是 不可变的（一个计算机科学术语，意思是“不可改变”）。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递 不同的 props —— 一个新对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。

不要尝试“更改 props”。 当你需要响应用户输入（例如更改所选颜色）时，你可以“设置 state”，你可以在 State: 一个组件的内存 中继续了解。
```

```jsx
//小小summary
要传递 props，请将它们添加到 JSX，就像使用 HTML 属性一样。
要读取 props，请使用 function Avatar({ person, size }) 解构语法。
你可以指定一个默认值，如 size = 100，用于缺少值或值为 undefined 的 props 。
你可以使用 <Avatar {...props} /> JSX 展开语法转发所有 props，但不要过度使用它！
像 <Card><Avatar /></Card> 这样的嵌套 JSX，将被视为 Card 组件的 children prop。
Props 是只读的时间快照：每次渲染都会收到新版本的 props。
你不能改变 props。当你需要交互性时，你可以设置 state。
```

```jsx
//小作业
//一:
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
//以上改成以下↓
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
    </div>
  );
}
//!!!感到非常经典的常规操作,一定要学会!!!
```

```jsx
//二:根据需求调整图片大小
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
//以上改为以下↓(utilsjs不变)
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```jsx
//三:用子组件的方法 标签card
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
//以上改为以下↓
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}

//如果你希望每个 Card 都有一个标题，你还可以将 title 设为一个单独的 prop：
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

### 条件渲染

通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 if 语句、&& 和 ? : 运算符来选择性地渲染 JSX。

### 条件返回jsx

```jsx
//假设有一个 PackingList 组件，里面渲染多个 Item 组件，每个物品可标记为打包与否：
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
//需要注意的是，有些 Item 组件的 isPacked 属性是被设为 true 而不是 false。你可以在那些满足 isPacked={true} 条件的物品旁加上一个勾选符号（✔）。

你可以用 if/else 语句 去判断：
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```

### 选择性的返回null

```jsx
//在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 null。

如果组件的 isPacked 属性为 true，那么它将只返回 null。否则，它将返回相应的 JSX 用来渲染。
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
实际上，在组件里返回 null 并不常见，因为这样会让想使用它的开发者感觉奇怪。通常情况下，你可以在父组件里选择是否要渲染该组件。让我们接着往下看吧！
```

### 选择性的返回jsx

```jsx
//在之前的例子里，你在组件内部控制哪些 JSX 树（如果有的话！）会返回。你可能已经发现了在渲染输出里会有一些重复的内容：

<li className="item">{name} ✔</li>
和下面的写法很像：

<li className="item">{name}</li>
两个条件分支都会返回 <li className="item">...</li>：

if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
虽然这些重复的内容没什么害处，但这样可能会导致你的代码更难维护。比如你想更改 className？你就需要修改两个地方！针对这种情况，你可以通过选择性地包含一小段 JSX 来让你的代码更加 DRY。

三目运算符（? :） 
JavaScript 有一种紧凑型语法来实现条件判断表达式——条件运算符 又称“三目运算符”。

除了这样：

if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
你还可以这样实现：

return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
你可以认为，“如果 isPacked 为 true 时，则（?）渲染 name + ' ✔'，否则（:）渲染 name。”

思考:两个例子完全一样吗？ 

如果你之前是习惯面向对象开发的，你可能会认为上面的两个例子略有不同，因为其中一个可能会创建两个不同的 <li> “实例”。但 JSX 元素不是“实例”，因为它们没有内部状态也不是真实的 DOM 节点。它们只是一些简单的描述，就像图纸一样。所以上面这两个例子事实上是完全相同的。在 状态的保持和重置 里会深入探讨其原因。
```

```jsx
//现在，假如你想将对应物品的文本放到另一个 HTML 标签里，比如用 <del> 来显示删除线。你可以添加更多的换行和括号，以便在各种情况下更好地去嵌套 JSX：
function Item({ name, isPacked }) {
  return (
    //根据 isPacked 的值在列表项中显示已打包或未打包的项目名称。
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
  //使用 HTML 的 li 标签渲染一个列表项，并设置 className 为 "item".   使用三元运算符，根据 isPacked 的值选择要渲染的内容。 如果 isPacked 为 true，则渲染 del 标签，表示删除线。 在 del 标签内，显示 name 属性加上一个复选标记（✔），表示该项目已打包。
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
对于简单的条件判断，这样的风格可以很好地实现，但需要适量使用。如果你的组件里有很多的嵌套式条件表达式，则需要考虑通过提取为子组件来简化这些嵌套表达式。在 React 里，标签也是你代码中的一部分，所以你可以使用变量和函数来整理一些复杂的表达式。
```

```jsx
//与运算符（&&） 
你会遇到的另一个常见的快捷表达式是 JavaScript 逻辑与（&&）运算符。在 React 组件里，通常用在当条件成立时，你想渲染一些 JSX，或者不做任何渲染。使用 &&，你也可以实现仅当 isPacked 为 true 时，渲染勾选符号。

return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
你可以认为，“当 isPacked 为真值时，则（&&）渲染勾选符号，否则，不渲染。”

下面为具体的例子：
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
当 JavaScript && 表达式 的左侧（我们的条件）为 true 时，它则返回其右侧的值（在我们的例子里是勾选符号）。但条件的结果是 false，则整个表达式会变成 false。在 JSX 里，React 会将 false 视为一个“空值”，就像 null 或者 undefined，这样 React 就不会在这里进行任何渲染。

陷阱:
切勿将数字放在 && 左侧.

JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

例如，一个常见的错误是 messageCount && <p>New messages</p>。其原本是想当 messageCount 为 0 的时候不进行渲染，但实际上却渲染了 0。

为了更正，可以将左侧的值改成布尔类型：messageCount > 0 && <p>New messages</p>。
```

```jsx
//选择性地将 JSX 赋值给变量 
当这些快捷方式妨碍写普通代码时，可以考虑使用 if 语句和变量。因为你可以使用 let 进行重复赋值，所以一开始你可以将你想展示的（这里指的是物品的名字）作为默认值赋予给该变量。

let itemContent = name;
结合 if 语句，当 isPacked 为 true 时，将 JSX 表达式的值重新赋值给 itemContent：

if (isPacked) {
  itemContent = name + " ✔";
}
在 JSX 中通过大括号使用 JavaScript。将变量用大括号嵌入在返回的 JSX 树中，来嵌套计算好的表达式与 JSX：

<li className="item">
  {itemContent}
</li>
!!!这种方式是最冗长的，但也是最灵活的。!!!下面是相关的例子：
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

跟之前的一样，这个方式不仅仅适用于文本，任意的 JSX 均适用：
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
如果对 JavaScript 不熟悉，这些不同的风格一开始可能会让你感到不知所措。但是，学习这些将有助于你理解和写任何的 JavaScript 代码，而不仅仅是 React 组件。一开始可以选择一个你喜欢的来用，然后当你忘记其他的怎么用时，可以再翻阅这份参考资料。
```

```jsx
//小小summary
在 React，你可以使用 JavaScript 来控制分支逻辑。
你可以使用 if 语句来选择性地返回 JSX 表达式。
你可以选择性地将一些 JSX 赋值给变量，然后用大括号将其嵌入到其他 JSX 中。
在 JSX 中，{cond ? <A /> : <B />} 表示 “当 cond 为真值时, 渲染 <A />，否则 <B />”。
在 JSX 中，{cond && <A />} 表示 “当 cond 为真值时, 渲染 <A />，否则不进行渲染”。
快捷的表达式很常见，但如果你更倾向于使用 if，你也可以不使用它们。
```

```jsx
  return (
    <li className="item">
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
//分隔
  function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>（重要性: {importance}）</i>
      }
    </li>
   );
   //如果 importance 大于 0，则显示一个空格字符。
   //如果 importance 大于 0，执行以下代码。 使用 HTML 的 i 标签显示斜体文字，内容是 （重要性: {importance}），其中 importance 是传入的属性值。
  }
//分隔
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}//或者
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}//更好,代码更优美
```

### 渲染列表

你可能经常需要通过 JavaScript 的数组方法 来操作数组中的数据，从而将一个数据集渲染成多个相似的组件。在这篇文章中，你将学会如何在 React 中使用 filter() 筛选需要渲染的组件和使用 map() 把数组转换成组件数组。

```jsx
//从数组中渲染数据 
这里我们有一个列表。

<ul>
  <li>凯瑟琳·约翰逊: 数学家</li>
  <li>马里奥·莫利纳: 化学家</li>
  <li>穆罕默德·阿卜杜勒·萨拉姆: 物理学家</li>
  <li>珀西·莱温·朱利亚: 化学家</li>
  <li>苏布拉马尼扬·钱德拉塞卡: 天体物理学家</li>
</ul>
可以看到，这些列表项之间唯一的区别就是其中的内容/数据。未来你可能会碰到很多类似的情况，在那些场景中，你想基于不同的数据渲染出相似的组件，比如评论列表或者个人资料的图库。在这样的场景下，可以把要用到的数据存入 JavaScript 对象或数组，然后用 map() 或 filter() 这样的方法来渲染出一个组件列表。

这里给出一个由数组生成一系列列表项的简单示例：

首先，把数据 存储 到数组中：
const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];
遍历 people 这个数组中的每一项，并获得一个新的 JSX 节点数组 listItems：
const listItems = people.map(person => <li>{person}</li>);
把 listItems 用 <ul> 包裹起来，然后 返回 它：
return <ul>{listItems}</ul>;
来看看运行的结果：
const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
//注意上面的沙盒可能会输出这样一个控制台错误：Console:Warning: Each child in a list should have a unique “key” prop.
等会我们会学到怎么修复它。在此之前，我们先来看看如何把这个数组变得更加结构化。
```

```jsx
//对数组项进行过滤 
让我们把 people 数组变得更加结构化一点
const people = [{
  id: 0,
  name: '凯瑟琳·约翰逊',
  profession: '数学家',
}, {
  id: 1,
  name: '马里奥·莫利纳',
  profession: '化学家',
}, {
  id: 2,
  name: '穆罕默德·阿卜杜勒·萨拉姆',
  profession: '物理学家',
}, {
  id: 3,
  name: '珀西·莱温·朱利亚',
  profession: '化学家',
}, {
  id: 4,
  name: '苏布拉马尼扬·钱德拉塞卡',
  profession: '天体物理学家',
}];
现在，假设你只想在屏幕上显示职业是 化学家 的人。那么你可以使用 JavaScript 的 filter() 方法来返回满足条件的项。这个方法会让数组的子项经过 “过滤器”（一个返回值为 true 或 false 的函数）的筛选，最终返回一个只包含满足条件的项的新数组。

既然你只想显示 profession 值是 化学家 的人，那么这里的 “过滤器” 函数应该长这样：(person) => person.profession === '化学家'。下面我们来看看该怎么把它们组合在一起：

首先，创建 一个用来存化学家们的新数组 chemists，这里用到 filter() 方法过滤 people 数组来得到所有的化学家，过滤的条件应该是 person.profession === '化学家'：
const chemists = people.filter(person =>
  person.profession === '化学家'
);
接下来 用 map 方法遍历 chemists 数组:
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       因{person.accomplishment}而闻名世界
     </p>
  </li>
);
最后，返回 listItems：
return <ul>{listItems}</ul>;

```

```jsx
//appjs
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === '化学家'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        因{person.accomplishment}而闻名世界
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
//datajs
export const people = [
  {
    id: 0,
    name: '凯瑟琳·约翰逊',
    profession: '数学家',
    accomplishment: '太空飞行相关数值的核算',
    imageId: 'MK3eW3A',
  },
  {
    id: 1,
    name: '马里奥·莫利纳',
    profession: '化学家',
    accomplishment: '北极臭氧空洞的发现',
    imageId: 'mynHUSa',
  },
  {
    id: 2,
    name: '穆罕默德·阿卜杜勒·萨拉姆',
    profession: '物理学家',
    accomplishment: '关于基本粒子间弱相互作用和电磁相互作用的统一理论',
    imageId: 'bE7W1ji',
  },
  {
    id: 3,
    name: '珀西·莱温·朱利亚',
    profession: '化学家',
    accomplishment: '开创性的可的松药物、类固醇和避孕药的研究',
    imageId: 'IOjWm71',
  },
  {
    id: 4,
    name: '苏布拉马尼扬·钱德拉塞卡',
    profession: '天体物理学家',
    accomplishment: '白矮星质量计算',
    imageId: 'lrWQx8l',
  },
];
//utilsjs
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
!!!陷阱:
因为箭头函数会隐式地返回位于 => 之后的表达式，所以你可以省略 return 语句。

const listItems = chemists.map(person =>
  <li>...</li> // 隐式地返回！
);
不过，如果你的 => 后面跟了一对花括号 { ，那你必须使用 return 来指定返回值！

const listItems = chemists.map(person => { // 花括号
  return <li>...</li>;
});
箭头函数 => { 后面的部分被称为 “块函数体”，块函数体支持多行代码的写法，但要用 return 语句才能指定返回值。假如你忘了写 return，那这个函数什么都不会返回！
```

```jsx
//用 key 保持列表项的顺序 
如果把上面任何一个沙盒示例在新标签页打开，你就会发现控制台有这样一个报错：

Console
Warning: Each child in a list should have a unique “key” prop.j就是说每个li中的child都要有key prop
这是因为你必须给数组中的每一项都指定一个 key——它可以是字符串或数字的形式，只要能唯一标识出各个数组项就行：

<li key={person.id}>...</li>
注意
直接放在 map() 方法里的 JSX 元素一般都需要指定 key 值！
这些 key 会告诉 React，每个组件对应着数组里的哪一项，所以 React 可以把它们匹配起来。这在数组项进行移动（例如排序）、插入或删除等操作时非常重要。一个合适的 key 可以帮助 React 推断发生了什么，从而得以正确地更新 DOM 树。

用作 key 的值应该在数据中提前就准备好，而不是在运行时才随手生成：
```

```jsx
//appjs
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          因{person.accomplishment}而闻名世界
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
//datajs
export const people = [
  {
    id: 0, // 在 JSX 中作为 key 使用
    name: '凯瑟琳·约翰逊',
    profession: '数学家',
    accomplishment: '太空飞行相关数值的核算',
    imageId: 'MK3eW3A',
  },
  {
    id: 1, // 在 JSX 中作为 key 使用
    name: '马里奥·莫利纳',
    profession: '化学家',
    accomplishment: '北极臭氧空洞的发现',
    imageId: 'mynHUSa',
  },
  {
    id: 2, // 在 JSX 中作为 key 使用
    name: '穆罕默德·阿卜杜勒·萨拉姆',
    profession: '物理学家',
    accomplishment: '关于基本粒子间弱相互作用和电磁相互作用的统一理论',
    imageId: 'bE7W1ji',
  },
  {
    id: 3, // 在 JSX 中作为 key 使用
    name: '珀西·莱温·朱利亚',
    profession: '化学家',
    accomplishment: '开创性的可的松药物、类固醇和避孕药',
    imageId: 'IOjWm71',
  },
  {
    id: 4, // 在 JSX 中作为 key 使用
    name: '苏布拉马尼扬·钱德拉塞卡',
    profession: '天体物理学家',
    accomplishment: '白矮星质量计算',
    imageId: 'lrWQx8l',
  },
];
//utilsjs
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}

//为每个列表项显示多个 DOM 节点 

收起
如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 <> </> 无法接受 key 值，所以你只能要么把生成的节点用一个 <div> 标签包裹起来，要么使用长一点但更明确的 <Fragment> 写法：

import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
这里的 Fragment 标签本身并不会出现在 DOM 上，这串代码最终会转换成 <h1>、<p>、<h1>、<p>…… 的列表。
```

```jsx
//如何设定 key 值 
不同来源的数据往往对应不同的 key 值获取方式：

来自数据库的数据： 如果你的数据是从数据库中获取的，那你可以直接使用数据表中的主键，因为它们天然具有唯一性。
本地产生数据： 如果你数据的产生和保存都在本地（例如笔记软件里的笔记），那么你可以使用一个自增计数器或者一个类似 uuid 的库来生成 key。
key 需要满足的条件 
key 值在兄弟节点之间必须是唯一的。 不过不要求全局唯一，在不同的数组中可以使用相同的 key。
key 值不能改变，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。
React 中为什么需要 key？ 
设想一下，假如你桌面上的文件都没有文件名，取而代之的是，你需要通过文件的位置顺序来区分它们———第一个文件，第二个文件，以此类推。也许你也不是不能接受这种方式，可是一旦你删除了其中的一个文件，这种组织方式就会变得混乱无比。原来的第二个文件可能会变成第一个文件，第三个文件会成为第二个文件……

React 里需要 key 和文件夹里的文件需要有文件名的道理是类似的。它们（key 和文件名）都让我们可以从众多的兄弟元素中唯一标识出某一项（JSX 节点或文件）。而一个精心选择的 key 值所能提供的信息远远不止于这个元素在数组中的位置。即使元素的位置在渲染的过程中发生了改变，它提供的 key 值也能让 React 在整个生命周期中一直认得它。

陷阱
你可能会想直接把数组项的索引当作 key 值来用，实际上，如果你没有显式地指定 key 值，React 确实默认会这么做。但是数组项的顺序在插入、删除或者重新排序等操作中会发生改变，此时把索引顺序用作 key 值会产生一些微妙且令人困惑的 bug。

与之类似，请不要在运行过程中动态地产生 key，像是 key={Math.random()} 这种方式。这会导致每次重新渲染后的 key 值都不一样，从而使得所有的组件和 DOM 元素每次都要重新创建。这不仅会造成运行变慢的问题，更有可能导致用户输入的丢失。所以，使用能从给定数据中稳定取得的值才是明智的选择。

有一点需要注意，组件不会把 key 当作 props 的一部分。Key 的存在只对 React 本身起到提示作用。如果你的组件需要一个 ID，那么请把它作为一个单独的 prop 传给组件： <Profile key={id} userId={id} />。
```

```jsx
//摘要
在这篇文章中，你学习了：

如何从组件中抽离出数据，并把它们放入像数组、对象这样的数据结构中。
如何使用 JavaScript 的 map() 方法来生成一组相似的组件。
如何使用 JavaScript 的 filter() 方法来筛选数组。
为何以及如何给集合中的每个组件设置一个 key 值：它使 React 能追踪这些组件，即便后者的位置或数据发生了变化

```

```jsx
//第 1 个挑战 共 4 个挑战: 把列表一分为二 
下面的示例中有一个包含所有人员信息的列表。

请试着把它分成一前一后的两个列表：分别是 化学家们 和 其余的人。像之前一样，你可以通过 person.profession === '化学家' 这个条件来判断一个人是不是化学家。
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        因{person.accomplishment}而闻名世界
      </p>
    </li>
  );
  return (
    <article>
      <h1>科学家</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
答:
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === '化学家'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== '化学家'
  );
  return (
    <article>
      <h1>科学家</h1>
      <h2>化学家</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              因{person.accomplishment}而闻名世界
            </p>
          </li>
        )}
      </ul>
      <h2>其余的人</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              因{person.accomplishment}而闻名世界
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
//这个解决方案中，我们直接在父级的 <ul> 元素里就执行了 map 方法。当然如果你想提高代码的可读性，你也可以先用变量保存一下 map 之后的结果。

现在得到的列表中仍然存在一些重复的代码，我们可以更进一步，将这些重复的部分提取成一个 <ListSection> 组件：
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) { 
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              因{person.accomplishment}而闻名世界
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === '化学家'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== '化学家'
  );
  return (
    <article>
      <h1>科学家</h1>
      <ListSection
        title="化学家"
        people={chemists}
      />
      <ListSection
      title="其余的人"
      people={everyoneElse} 
      />
    </article>
  );
}
仔细的读者会发现我们在这写了两个 filter，对于每个人的职业我们都进行了两次过滤。读取一个属性的值花不了多少时间，因此放在这个简单的示例中没什么大问题。但是如果你的代码逻辑比这里复杂和“昂贵”得多，那你可以把两次的 filter 替换成一个只需进行一次检查就能构造两个数组的循环。

实际上，如果 people 的数据不会改变，可以直接把这段代码移到组件外面。从 React 的视角来看，它只关心你最后给它的是不是包含 JSX 节点的数组，并不在乎数组是怎么来的：  !!!(值得学习)
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === '化学家') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              因{person.accomplishment}而闻名世界
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>科学家</h1>
      <ListSection
        title="化学家"
        people={chemists}
      />
      <ListSection
        title="其余的人"
        people={everyoneElse}
      />
    </article>
  );
}
```

### 保持组件纯粹

```jsx
//部分 JavaScript 函数是 纯粹 的，这类函数通常被称为纯函数。纯函数仅执行计算操作，不做其他操作。你可以通过将组件按纯函数严格编写，以避免一些随着代码库的增长而出现的、令人困扰的 bug 以及不可预测的行为。但为了获得这些好处，你需要遵循一些规则。
```

```jsx
//纯函数：组件作为公式 
在计算机科学中（尤其是函数式编程的世界中），纯函数 通常具有如下特征：

只负责自己的任务。它不会更改在该函数调用前就已存在的对象或变量。
输入相同，则输出相同。给定相同的输入，纯函数应总是返回相同的结果。
举个你非常熟悉的纯函数示例：数学中的公式。

考虑如下数学公式：y = 2x。

若 x = 2 则 y = 4。永远如此。

若 x = 3 则 y = 6。永远如此。

若 x = 3，那么 y 并不会因为时间或股市的影响，而有时等于 9 、 –1 或 2.5。

若 y = 2x 且 x = 3, 那么 y 永远 等于 6.

我们使用 JavaScript 的函数实现，看起来将会是这样：

function double(number) {
  return 2 * number;
}
上述例子中，double() 就是一个 纯函数。如果你传入 3 ，它将总是返回 6 。

React 便围绕着这个概念进行设计。React 假设你编写的所有组件都是纯函数。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。
```

```jsx
//function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
当你给函数 Recipe 传入 drinkers={2} 参数时，它将返回包含 2 cups of water 的 JSX。永远如此。

而当你传入 drinkers={4} 时，它将返回包含 4 cups of water 的 JSX。永远如此。

就像数学公式一样。

你可以把你的组件当作食谱：如果你遵循它们，并且在烹饪过程中不引入新食材，你每次都会得到相同的菜肴。那这道 “菜肴” 就是组件用于 React 渲染 的 JSX。
```

!!!此处插入图react3

```jsx
//副作用：（不符合）预期的后果 
React 的渲染过程必须自始至终是纯粹的。组件应该只 返回 它们的 JSX，而不 改变 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！

以下是违反这一规则的组件示例：
let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
//组件 Cup 返回一个显示当前 guest 数量的标题，但直接修改了预先存在的全局变量 guest。
//声明一个名为 Cup 的函数组件。注释，提示这里的做法不正确，因为它正在更改一个预先存在的变量。直接将 guest 变量的值增加 1。这是假设 guest 是一个已经存在于更大作用域中的变量（比如全局变量或外部变量），!!!这种直接修改外部变量的做法是不推荐的。!!!返回一个 h2 标题元素，内容是 "Tea cup for guest #"，后面接着 guest 的当前值，显示给第几位客人准备的茶杯。
//总结：这个 Cup 组件每次渲染时都会增加 guest 的值并显示更新后的值。直接修改外部变量（如全局变量）是一个不好的实践，可能会导致意想不到的副作用和错误

//为了正确处理 guest 计数并避免副作用，应该使用 React 的 useState 钩子来管理组件内部的状态。这样可以确保每次渲染都使用最新的状态，并且不会修改全局变量。以下是一个更好的实现方法：javascript Copy code
// import React, { useState } from 'react';
// function Cup() {
//   // 使用 useState 钩子来管理 guest 计数
//   const [guest, setGuest] = useState(0);
//   // 增加 guest 计数
//   const incrementGuest = () => {
//     setGuest(guest + 1);
//   };
//   return (
//     <div>
//       <h2>Tea cup for guest #{guest}</h2>
//       <button onClick={incrementGuest}>Add Guest</button>
//     </div>
//   );
// }
// export default Cup;总结：这个修改后的组件使用 React 的 useState 钩子来管理 guest 计数，确保每次渲染时都使用最新的状态。添加了一个按钮，通过点击按钮来增加 guest 的值，并触发组件重新渲染以显示更新后的值
。
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
//以上是不符合逻辑的蹩脚代码
```

```jsx
//该组件正在读写其外部声明的 guest 变量。这意味着 多次调用这个组件会产生不同的 JSX！并且，如果 其他 组件读取 guest ，它们也会产生不同的 JSX，其结果取决于它们何时被渲染！这是无法预测的。

回到我们的公式 y = 2x ，现在即使 x = 2 ，我们也不能相信 y = 4 。我们的测试可能会失败，我们的用户可能会感到困扰，飞机可能会从天空坠毁——你将看到这会引发多么扑朔迷离的 bugs！

你可以 将 guest 作为 prop 传入 来修复此组件：
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
  //#{guest} 是模板字符串语法的一部分，用于在字符串中插入变量值。
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
现在你的组件就是纯粹的，因为它返回的 JSX 只依赖于 guest prop。

一般来说，你不应该期望你的组件以任何特定的顺序被渲染。调用 y = 5x 和 y = 2x 的先后顺序并不重要：这两个公式相互独立。同样地，每个组件也应该“独立思考”，而不是在渲染过程中试图与其他组件协调，或者依赖于其他组件。渲染过程就像是一场学校考试：每个组件都应该自己计算 JSX！

//使用严格模式检测不纯的计算 

尽管你可能还没使用过，但在 React 中，你可以在渲染时读取三种输入：props，state 和 context。你应该始终将这些输入视为只读。

当你想根据用户输入 更改 某些内容时，你应该 设置状态，而不是直接写入变量。当你的组件正在渲染时，你永远不应该改变预先存在的变量或对象。

React 提供了 “严格模式”，在严格模式下开发时，它将会调用每个组件函数两次。通过重复调用组件函数，严格模式有助于找到违反这些规则的组件。

我们注意到，原始示例显示的是 “Guest #2”、“Guest #4” 和 “Guest #6”，而不是 “Guest #1”、“Guest #2” 和 “Guest #3”。原来的函数并不纯粹，因此调用它两次就出现了问题。但对于修复后的纯函数版本，即使调用该函数两次也能得到正确结果。纯函数仅仅执行计算，因此调用它们两次不会改变任何东西 — 就像两次调用 double(2) 并不会改变返回值，两次求解 y = 2x 不会改变 y 的值一样。相同的输入，总是返回相同的输出。

严格模式在生产环境下不生效，因此它不会降低应用程序的速度。如需引入严格模式，你可以用 <React.StrictMode> 包裹根组件。一些框架会默认这样做。
```

```jsx
//局部 mutation：组件的小秘密 
上述示例的问题出在渲染过程中，组件改变了 预先存在的 变量的值。为了让它听起来更可怕一点，我们将这种现象称为 突变（mutation） 。纯函数不会改变函数作用域外的变量、或在函数调用前创建的对象——这会使函数变得不纯粹！

但是，你完全可以在渲染时更改你 刚刚 创建的变量和对象。在本示例中，你创建一个 [] 数组，将其分配给一个 cups 变量，然后 push 一打 cup 进去：
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}

```

```jsx
//哪些地方 可能 引发副作用 
函数式编程在很大程度上依赖于纯函数，但 某些事物 在特定情况下不得不发生改变。这是编程的要义！这些变动包括更新屏幕、启动动画、更改数据等，它们被称为 副作用。它们是 “额外” 发生的事情，与渲染过程无关。

在 React 中，副作用通常属于 事件处理程序。事件处理程序是 React 在你执行某些操作（如单击按钮）时运行的函数。即使事件处理程序是在你的组件 内部 定义的，它们也不会在渲染期间运行！ 因此事件处理程序无需是纯函数。

如果你用尽一切办法，仍无法为副作用找到合适的事件处理程序，你还可以调用组件中的 useEffect 方法将其附加到返回的 JSX 中。这会告诉 React 在渲染结束后执行它。然而，这种方法应该是你最后的手段。

如果可能，请尝试仅通过渲染过程来表达你的逻辑。你会惊讶于这能带给你多少好处！

//React 为何侧重于纯函数? 

答:编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：

你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
你可以为那些输入未更改的组件来 跳过渲染，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。
我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。
```

```jsx
//摘要
一个组件必须是纯粹的，就意味着：
只负责自己的任务。 它不会更改在该函数调用前就已存在的对象或变量。
输入相同，则输出相同。 给定相同的输入，组件应该总是返回相同的 JSX。
渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序。
你不应该改变任何用于组件渲染的输入。这包括 props、state 和 context。通过 “设置” state 来更新界面，而不要改变预先存在的对象。
努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 useEffect。
编写纯函数需要一些练习，但它充分释放了 React 范式的能力。
```

```jsx
//第 1 个挑战 共 3 个挑战: 修复坏掉的时钟 
该组件尝试在午夜到早上 6 点期间，将 <h1> 的 CSS 类设置为 "night"，而在其他时间都设置为 "day"。但它不起作用。你能修复这个组件吗？

你可以临时更改计算机的时区来验证你的解决方案是否有效。当前时间位于午夜至早上六点之间时，时钟应该有相反的颜色！
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
//答案:
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

```jsx
//第 2 个挑战 共 3 个挑战: 修复损坏的资料 
两个 Profile 组件使用不同的数据并排呈现。在第一个资料中点击 “Collapse” 折叠，然后点击 “Expand” 展开它。你会看到两个资料现在显示的是同一个人。这是一个 bug。

找出产生 bug 的原因，并修复它。
//profilejs
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}
function Header() {
  return <h1>{currentPerson.name}</h1>;
}
function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
//appjs
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
//第一种方式的缺点：全局变量污染：currentPerson 是一个全局变量，修改全局变量会污染全局作用域，容易引起不可预见的错误，特别是在多人协作或者大项目中。组件间耦合度高：子组件 Header 和 Avatar 必须依赖 currentPerson 全局变量，增加了组件间的耦合度，不利于组件的独立性和重用性。不可预测的状态：由于 currentPerson 是全局变量，其状态可能会在组件未渲染时被其他代码修改，导致不一致的 UI 显示。

//第二种方式的优点：组件解耦：通过 props 传递数据，子组件 Header 和 Avatar 不再依赖外部变量 currentPerson，提高了组件的独立性和重用性。明确的数据流：使用 props 传递数据，使得数据流更加明确，代码更易于理解和维护。状态可控：每次渲染 Profile 组件时，person 都会通过 props 传递给子组件，确保子组件总是使用最新的 person 数据。
//答案:import Panel from './Panel.js';
import { getImageUrl } from './utils.js';
export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  )
}
function Header({ person }) {
  return <h1>{person.name}</h1>;
}
function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

```jsx
//第 3 个挑战 共 3 个挑战: 修复损坏的故事集 
你所在公司的 CEO 要求你在在线时钟 app 中添加 “故事”，你不能拒绝。你编写了一个 StoryTray 组件，它接受一个 stories 列表，后跟一个 “Create Story” 占位符。

你在作为 props 的 stories 数组末尾 push 了一个假故事来实现 “Create Story” 占位符。但出于某种原因，“Create Story” 出现了不止一次。请修复这个问题。
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
//答案
请注意，每当时钟更新时，“Create Story” 都会被添加 两次。这暗示我们在渲染过程中发生了 mutation — 严格模式调用两次组件，可以使这些问题更加明显。

StoryTray 的功能不纯粹。通过在接收到的 stories 数组（一个 prop！）上调用 push 方法，它正改变着一个在 StoryTray 渲染 之前 创建的对象。这使得它有问题并且难以预测。

最简单的解决方案是完全不碰数组，单独渲染 “Create Story”：
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}
或者,你可以在 push 之前创建一个 新 数组（通过复制现有数组）：
export default function StoryTray({ stories }) {  
  //声明并默认导出一个名为 StoryTray 的函数组件，该组件接受一个 props 对象，并从中解构出 stories 属性。
  //在显示原始 stories 列表的基础上，添加一个 "Create Story" 项目，并将其显示在一个无序列表中。

  // 复制数组！
  let storiesToDisplay = stories.slice();
  //使用 slice() 方法创建 stories 数组的浅拷贝，并将其赋值给 storiesToDisplay 变量。这样可以避免直接修改原始 stories 数组。
  // 不影响原始数组：
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });
  //在 storiesToDisplay 数组的末尾添加一个新的对象，该对象的 id 为 'create'，label 为 'Create Story'。这样可以在不修改原始 stories 数组的情况下，扩展显示的数组。
  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
  //返回一个无序列表 <ul>，使用 map 方法遍历 storiesToDisplay 数组，为每个 story 创建一个列表项 <li>。列表项的 key 属性设置为 story.id，内容为 story.label。

  //通过创建原始 stories 数组的浅拷贝并向其中添加一个新的项目，实现了在显示 stories 列表的基础上添加 "Create Story" 项目。这样可以在不影响原始数组的情况下，扩展和显示数组内容。
}

//这使你的 mutation 保持在局部，并使你的渲染函数保持纯粹。但你仍然需要小心：例如，当你想要更改数组的任意项时，必须先对其进行拷贝。

!!!记住数组上的哪些操作会修改原始数组、哪些不会，这非常有帮助。例如，push、pop、reverse 和 sort 会改变原始数组，但 slice、filter 和 map 则会创建一个新数组。!!!
```

### 将 UI 视为树

当 React 应用程序逐渐成形时，许多组件会出现嵌套。那么 React 是如何跟踪应用程序组件结构的？

React 以及许多其他 UI 库，将 UI 建模为树。将应用程序视为树对于理解组件之间的关系以及调试性能和状态管理等未来将会遇到的一些概念非常有用。

```jsx
//将 UI 视为树 
树是项目和 UI 之间的关系模型，通常使用树结构来表示 UI。例如，浏览器使用树结构来建模 HTML（DOM）与CSS（CSSOM）。移动平台也使用树来表示其视图层次结构。
与浏览器和移动平台一样，React 还使用树结构来管理和建模 React 应用程序中组件之间的关系。这些树是有用的工具，用于理解数据如何在 React 应用程序中流动以及如何优化呈现和应用程序大小。
```

!!! 此处插图react4

```jsx
//渲染树 
组件的一个主要特性是能够由其他组件组合而成。在 嵌套组件 中有父组件和子组件的概念，其中每个父组件本身可能是另一个组件的子组件。

当渲染 React 应用程序时，可以在一个称为渲染树的树中建模这种关系。

下面的 React 应用程序渲染了一些鼓舞人心的引语。
//appjs
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
//App.js 是应用程序的主组件。它从其他文件导入了 FancyText、InspirationGenerator 和 Copyright 组件。App 组件渲染了一个 FancyText 组件，传递了 title 和 text 属性，分别为 true 和 "Get Inspired App"。它还渲染了一个 InspirationGenerator 组件，作为 InspirationGenerator 的子组件，它包含了一个 Copyright 组件，传递了 year 属性为 2004。
}

//fancytextjs
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
    //FancyText 组件根据传入的 title 属性渲染不同的元素。如果 title 为 true，则渲染一个包含 text 的 h1 元素，并添加 fancy title 类。如果 title 为 false，则渲染一个包含 text 的 h3 元素，并添加 fancy cursive 类。
}
//inspirationgeneratorjs
import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const quote = quotes[index];
  const next = () => setIndex((index + 1) % quotes.length);
  //使用 useState 钩子创建一个状态变量 index，并初始化为 0。setIndex 是一个更新 index 的函数。
  //从 quotes 数组中取出当前 index 对应的引言，并赋值给 quote 变量。
  //定义一个名为 next 的函数，该函数将 index 增加 1，并使用模运算确保索引在 quotes 数组长度内循环。使用 % quotes.length 计算该值除以引言总数的余数。 这确保了当索引达到数组末尾时，它会回到数组的开头，从而实现循环显示引言的效果。
  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
    //<> 和 </>：使用 React 片段包裹返回的 JSX 元素。<p>Your inspirational quote is:</p>：渲染一个段落，显示 "Your inspirational quote is:"。<FancyText text={quote} />：使用 FancyText 组件显示当前引言，通过 text 属性传递当前引言 quote。<button onClick={next}>Inspire me again</button>：渲染一个按钮，点击时调用 next 函数以显示下一个引言。{children}：渲染传递给 InspirationGenerator 组件的子组件。
    //总结：InspirationGenerator 组件显示一个引言，并提供一个按钮，用于在点击时切换到下一个引言，同时还可以渲染传递给它的子组件。
  );
  //InspirationGenerator 组件管理一个当前引用的 quotes 索引的状态。组件导入了一个 quotes 数组（来自 quotes.js 文件）。使用 React.useState 钩子来管理当前显示的引言的索引，并提供一个 next 函数来更新该索引。渲染一个段落，显示 "Your inspirational quote is:"，然后使用 FancyText 显示当前的引言。渲染一个按钮，当点击时调用 next 函数以显示下一个引言。InspirationGenerator 组件的子组件（children 属性）被渲染在组件的末尾。
}
//copyrightjs
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
  //Copyright 组件接受一个 year 属性，并渲染一个包含 year 的段落元素，并添加 small 类。
}
//quotesjs
export default [
  "Don’t let yesterday take up too much of today.” — Will Rogers",
  "Ambition is putting a ladder against the sky.",
  "A joy that's shared is a joy made double.",
  ];
  //quotes.js 文件导出一个包含三条引言的数组，这些引言将在 InspirationGenerator 组件中使用。
```

```js
//组件如何互相作用：
App.js 渲染了主应用界面，其中包括 FancyText 和 InspirationGenerator 组件。
FancyText 在 App 组件中显示应用标题 "Get Inspired App"。
InspirationGenerator 组件初始化显示第一个引言，并提供按钮来切换到下一个引言。在 InspirationGenerator 内部，使用 FancyText 显示当前的引言。
InspirationGenerator 组件还渲染了一个 Copyright 组件，并将 year 属性传递给它，显示 "©️ 2004"。
quotes.js 提供了一个引言数组，用于在 InspirationGenerator 中循环显示。

//总结：
App 组件作为主入口，组合并渲染其他组件。
FancyText 组件根据传入的 title 属性动态渲染不同样式的文本。
InspirationGenerator 组件管理引言的状态，动态显示引言，并包含 Copyright 组件。
Copyright 组件简单地显示版权年份。
quotes.js 提供引言数组供 InspirationGenerator 使用。

这种结构使得各个组件职责分明，组件间通过属性传递数据，形成一个清晰的组件树。
```

!!!此处插入react5

```jsx
//通过示例应用程序，可以构建上面的渲染树。

这棵树由节点组成，每个节点代表一个组件。例如，App、FancyText、Copyright 等都是我们树中的节点。

在 React 渲染树中，根节点是应用程序的 根组件。在这种情况下，根组件是 App，它是 React 渲染的第一个组件。树中的每个箭头从父组件指向子组件。

那么渲染树中的 HTML 标签在哪里呢？ 

答:也许会注意到在上面的渲染树中，没有提到每个组件渲染的 HTML 标签。这是因为渲染树仅由 React 组件 组成。

React 是跨平台的 UI 框架。react.dev 展示了一些渲染到使用 HTML 标签作为 UI 原语的 web 的示例。但是 React 应用程序同样可以渲染到移动设备或桌面平台，这些平台可能使用不同的 UI 原语，如 UIView 或 FrameworkElement。

这些平台 UI 原语不是 React 的一部分。无论应用程序渲染到哪个平台，React 渲染树都可以为 React 应用程序提供见解。
```

```jsx
//渲染树表示 React 应用程序的单个渲染过程。在 条件渲染 中，父组件可以根据传递的数据渲染不同的子组件。

我们可以更新应用程序以有条件地渲染励志语录或颜色。
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
在这个示例中，根据 inspiration.type 的值可能会渲染 <FancyText> 或 <Color>。每次渲染过程的渲染树可能都不同。

尽管渲染树可能在不同的渲染过程中有所不同，但通常这些树有助于识别 React 应用程序中的顶级和叶子组件。顶级组件是离根组件最近的组件，它们影响其下所有组件的渲染性能，通常包含最多复杂性。叶子组件位于树的底部，没有子组件，通常会频繁重新渲染。

识别这些组件类别有助于理解应用程序的数据流和性能。
```

!!!此处插入react6

```jsx
//模块依赖树 
在 React 应用程序中，可以使用树来建模的另一个关系是应用程序的模块依赖关系。当 拆分组件 和逻辑到不同的文件中时，就创建了 JavaScript 模块，在这些模块中可以导出组件、函数或常量。

模块依赖树中的每个节点都是一个模块，每个分支代表该模块中的 import 语句。

以之前的 Inspirations 应用程序为例，可以构建一个模块依赖树，简称依赖树。
树的根节点是根模块，也称为入口文件。它通常包含根组件的模块。

与同一应用程序的渲染树相比，存在相似的结构，但也有一些显著的差异：

构成树的节点代表模块，而不是组件。
非组件模块，如 inspirations.js，在这个树中也有所体现。渲染树仅封装组件。
Copyright.js 出现在 App.js 下，但在渲染树中，Copyright 作为 InspirationGenerator 的子组件出现。这是因为 InspirationGenerator 接受 JSX 作为 children props，因此它将 Copyright 作为子组件渲染，但不导入该模块。
依赖树对于确定运行 React 应用程序所需的模块非常有用。在为生产环境构建 React 应用程序时，通常会有一个构建步骤，该步骤将捆绑所有必要的 JavaScript 以供客户端使用。负责此操作的工具称为 bundler（捆绑器），并且 bundler 将使用依赖树来确定应包含哪些模块。

随着应用程序的增长，捆绑包大小通常也会增加。大型捆绑包大小对于客户端来说下载和运行成本高昂，并延迟 UI 绘制的时间。了解应用程序的依赖树可能有助于调试这些问题。
```

!!!此处插入react7

```jsx
//摘要
树是表示实体之间关系的常见方式，它们经常用于建模 UI。
渲染树表示单次渲染中 React 组件之间的嵌套关系。
使用条件渲染，渲染树可能会在不同的渲染过程中发生变化。使用不同的属性值，组件可能会渲染不同的子组件。
渲染树有助于识别顶级组件和叶子组件。顶级组件会影响其下所有组件的渲染性能，而叶子组件通常会频繁重新渲染。识别它们有助于理解和调试渲染性能问题。
依赖树表示 React 应用程序中的模块依赖关系。
构建工具使用依赖树来捆绑必要的代码以部署应用程序。
依赖树有助于调试大型捆绑包带来的渲染速度过慢的问题，以及发现哪些捆绑代码可以被优化。
```

## 添加交互

### 响 应 事 件

使用 React 可以在 JSX 中添加 事件处理函数。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。

你将会学习到
编写事件处理函数的不同方法
如何从父组件传递事件处理逻辑
事件如何传播以及如何停止它们

```jsx
//添加事件处理函数 
如需添加一个事件处理函数，你需要先定义一个函数，然后 将其作为 prop 传入 合适的 JSX 标签。例如，这里有一个没绑定任何事件的按钮：
export default function Button() {
  return (
    <button>
      未绑定任何事件
    </button>
  );
}
按照如下三个步骤，即可让它在用户点击时显示消息：

在 Button 组件 内部 声明一个名为 handleClick 的函数。
实现函数内部的逻辑（使用 alert 来显示消息）。
添加 onClick={handleClick} 到 <button> JSX 中。
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}
你可以定义 handleClick 函数然后 将其作为 prop 传入 <button>。其中 handleClick 是一个 事件处理函数 。事件处理函数有如下特点:

通常在你的组件 内部 定义。
名称以 handle 开头，后跟事件名称。
按照惯例，通常将事件处理程序命名为 handle，后接事件名。你会经常看到 onClick={handleClick}，onMouseEnter={handleMouseEnter} 等。

或者，你也可以在 JSX 中定义一个内联的事件处理函数：
<button onClick={function handleClick() {
  alert('你点击了我！');
}}>
或者，直接使用更为简洁箭头函数：

<button onClick={() => {
  alert('你点击了我！');
}}>
以上所有方式都是等效的。当函数体较短时，内联事件处理函数会很方便。
陷阱
传递给事件处理函数的函数应直接传递，而非调用。例如：

传递一个函数（正确）
``<button onClick={handleClick}>``  调用一个函数（错误）``<button onClick={handleClick()}>``
区别很微妙。在第一个示例中，handleClick 函数作为 onClick 事件处理函数传递。这会让 React 记住它，并且只在用户点击按钮时调用你的函数。

在第二个示例中，handleClick() 中最后的 () 会在 渲染 过程中 立即 触发函数，即使没有任何点击。这是因为在 JSX { 和 } 之间的 JavaScript 会立即执行。

当你编写内联代码时，同样的陷阱可能会以不同的方式出现：

传递一个函数（正确） 
``<button onClick={() => alert('...')}>`` 调用一个函数（错误）``<button onClick={alert('...')}>``
如果按如下方式传递内联代码，并不会在点击时触发，而是会在每次组件渲染时触发：

// 这个 alert 在组件渲染时触发，而不是点击时触发！
<button onClick={alert('你点击了我！')}>
如果你想要定义内联事件处理函数，请将其包装在匿名函数中，如下所示：

<button onClick={() => alert('你点击了我！')}>
这里创建了一个稍后调用的函数，而不会在每次渲染时执行其内部代码。

在这两种情况下，你都应该传递一个函数：

<button onClick={handleClick}> 传递了 handleClick 函数。
<button onClick={() => alert('...')}> 传递了 () => alert('...') 函数。
```

```jsx
//在事件处理函数中读取 props 
由于事件处理函数声明于组件内部，因此它们可以直接访问组件的 props。示例中的按钮，当点击时会弹出带有 message prop 的 alert：
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
    </div>
  );
}
此处有两个按钮，会展示不同的消息。你可以尝试更改传递给它们的消息。
```

```jsx
//将事件处理函数作为 props 传递 
通常，我们会在父组件中定义子组件的事件处理函数。比如：置于不同位置的 Button 组件，可能最终执行的功能也不同 —— 也许是播放电影，也许是上传图片。

为此，将组件从父组件接收的 prop 作为事件处理函数传递，如下所示：
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`正在播放 ${movieName}！`);
  }

  return (
    <Button onClick={handlePlayClick}>
      播放 "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('正在上传！')}>
      上传图片
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="魔女宅急便" />
      <UploadButton />
    </div>
  );
}
示例中，Toolbar 组件渲染了一个 PlayButton 组件和 UploadButton 组件：

PlayButton 将 handlePlayClick 作为 onClick prop 传入 Button 组件内部。
UploadButton 将 () => alert('正在上传！') 作为 onClick prop 传入 Button 组件内部。
最后，你的 Button 组件接收一个名为 onClick 的 prop。它直接将这个 prop 以 onClick={onClick} 方式传递给浏览器内置的 <button>。当点击按钮时，React 会调用传入的函数。

如果你遵循某个 设计系统 时，按钮之类的组件通常会包含样式，但不会指定行为。而 PlayButton 和 UploadButton 之类的组件则会向下传递事件处理函数。
```

```jsx
//命名事件处理函数 prop 
内置组件（<button> 和 <div>）仅支持 浏览器事件名称，例如 onClick。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。

按照惯例，事件处理函数 props 应该以 on 开头，后跟一个大写字母。

例如，Button 组件的 onClick prop 本来也可以被命名为 onSmash：
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onSmash={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
上述示例中，<button onClick={onSmash}> 代表浏览器内置的 <button>（小写）仍然需要使用 onClick prop，而自定义的 Button 组件接收到的 prop 名称可由你决定！

当你的组件支持多种交互时，你可以根据不同的应用程序命名事件处理函数 prop。例如，一个 Toolbar 组件接收 onPlayMovie 和 onUploadImage 两个事件处理函数：
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('正在播放！')}
      onUploadImage={() => alert('正在上传！')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        播放电影
      </Button>
      <Button onClick={onUploadImage}>
        上传图片
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
请注意，App 组件并不需要知道 Toolbar 将会对 onPlayMovie 和 onUploadImage 做 什么 。上述示例是 Toolbar 的实现细节。其中，Toolbar 将它们作为 onClick 处理函数传递给了 Button 组件，其实还可以通过键盘快捷键来触发它们。根据应用程序特定的交互方式（如 onPlayMovie）来命名 prop ，可以让你灵活地更改以后使用它们的方式。

注意:确保为事件处理程序使用适当的 HTML 标签。例如，要处理点击事件，请使用 <button onClick={handleClick}> 而不是 <div onClick={handleClick}>。使用真正的浏览器 <button> 启用内置的浏览器行为，如键盘导航。如果你不喜欢按钮的默认浏览器样式，并且想让它看起来更像一个链接或不同的 UI 元素，你可以使用 CSS 来实现。了解有关编写无障碍标签的更多信息。
```

```jsx
//事件传播 
事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。

下面这个 <div> 包含两个按钮。<div> 和每个按钮都有自己的 onClick 处理函数。你认为点击按钮时会触发哪些处理函数？
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}
陷阱:在 React 中所有事件都会传播，除了 onScroll，它仅适用于你附加到的 JSX 标签。
```

```jsx
//阻止传播 
事件处理函数接收一个 事件对象 作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation() ：
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}
当你点击按钮时：

React 调用了传递给 <button> 的 onClick 处理函数。
定义在 Button 中的处理函数执行了如下操作：
调用 e.stopPropagation()，阻止事件进一步冒泡。
调用 onClick 函数，它是从 Toolbar 组件传递过来的 prop。
在 Toolbar 组件中定义的函数，显示按钮对应的 alert。
由于传播被阻止，父级 <div> 的 onClick 处理函数不会执行。
由于调用了 e.stopPropagation()，点击按钮现在将只显示一个 alert（来自 <button>），而并非两个（分别来自 <button> 和父级 toolbar <div>）。点击按钮与点击周围的 toolbar 不同，因此阻止传播对这个 UI 是有意义的。

捕获阶段事件:
极少数情况下，你可能需要捕获子元素上的所有事件，即便它们阻止了传播。例如，你可能想对每次点击进行埋点记录，传播逻辑暂且不论。那么你可以通过在事件名称末尾添加 Capture 来实现这一点：

<div onClickCapture={() => { /* 这会首先执行 */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
每个事件分三个阶段传播：

它向下传播，调用所有的 onClickCapture 处理函数。
它执行被点击元素的 onClick 处理函数。
它向上传播，调用所有的 onClick 处理函数。
捕获事件对于路由或数据分析之类的代码很有用，!!!但你可能不会在应用程序代码中使用它们。!!!
```

```jsx
//传递处理函数作为事件传播的替代方案 
注意，此处的点击事件处理函数先执行了一行代码，然后调用了父组件传递的 onClick prop：
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
你也可以在调用父元素 onClick 函数之前，向这个处理函数添加更多代码。此模式是事件传播的另一种 替代方案 。它让子组件处理事件，同时也让父组件指定一些额外的行为。与事件传播不同，它并非自动。但使用这种模式的好处是你可以清楚地追踪因某个事件的触发而执行的整条代码链。???

如果你依赖于事件传播，而且很难追踪哪些处理程序在执行，及其执行的原因，可以尝试这种方法。
```

```jsx
//阻止默认行为 
某些浏览器事件具有与事件相关联的默认行为。例如，点击 <form> 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：
export default function Signup() {
  return (
    <form onSubmit={() => alert('提交表单！')}>
      <input />
      <button>发送</button>
    </form>
  );
}

你可以调用事件对象中的 e.preventDefault() 来阻止这种情况发生：
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
不要混淆 e.stopPropagation() 和 e.preventDefault()。它们都很有用，但二者并不相关：

e.stopPropagation() 阻止触发绑定在外层标签上的事件处理函数。
e.preventDefault() 阻止少数事件的默认浏览器行为。
```

```jsx
//事件处理函数可以包含副作用吗？ 
当然可以！事件处理函数是执行副作用的最佳位置。

与渲染函数不同，事件处理函数不需要是 纯函数，因此它是用来 更改 某些值的绝佳位置。例如，更改输入框的值以响应键入，或者更改列表以响应按钮的触发。但是，为了更改某些信息，你首先需要某种方式存储它。在 React 中，这是通过 state（组件的记忆） 来完成的。你将在下一章节了解所有相关信息。

摘要:

你可以通过将函数作为 prop 传递给元素如 <button> 来处理事件。
必须传递事件处理函数，而非函数调用！ onClick={handleClick} ，不是 onClick={handleClick()}。
你可以单独或者内联定义事件处理函数。
事件处理函数在组件内部定义，所以它们可以访问 props。
你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件。
你可以根据特定于应用程序的名称定义事件处理函数的 prop。
事件会向上传播。通过事件的第一个参数调用 e.stopPropagation() 来防止这种情况。
事件可能具有不需要的浏览器默认行为。调用 e.preventDefault() 来阻止这种情况。
从子组件显式调用事件处理函数 prop 是事件传播的另一种优秀替代方案。
```

```jsx
//第 1 个挑战 共 2 个挑战: 修复事件处理函数 
点击此按钮理论上应该在黑白主题之间切换页面背景。然而，当你点击它时，什么也没有发生。解决这个问题。（无需担心 handleClick 的内部逻辑。）
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      切换背景
    </button>
  );
}
这是由于 <button onClick={handleClick()}> 在渲染过程中 调用 了 handleClick 函数，而没有将其进行 传递。移除 () 调用改为 <button onClick={handleClick}> 进而修复问题：return (
    <button onClick={handleClick()}>
      切换背景
    </button>
  );

```

```jsx
//第 2 个挑战 共 2 个挑战: 关联事件 
ColorSwitch 组件渲染了一个按钮。它应该改变页面颜色。将它与从父组件接收的 onChangeColor 事件处理函数关联，以便在点击按钮时改变颜色。

如此操作后，你会发现点击按钮时，也会增加页面点击计数器的值。而编写父组件的同事坚持认为 onChangeColor 不应该使得计数器的值递增。应该如何处理？修改问题使得点击按钮 只 改变颜色，并且 不 增加计数器。
export default function ColorSwitch({
  onChangeColor
  //function ColorSwitch({ onChangeColor })：定义一个名为 ColorSwitch 的函数组件，并解构出一个 onChangeColor 属性。
}) {
  return (
    <button>
      改变颜色
    </button>
  );
  //定义并导出了一个名为 ColorSwitch 的 React 函数组件，该组件渲染一个按钮，按钮上的文字内容为“改变颜色”。目前，这个组件接受一个 onChangeColor 属性，但这个属性没有被使用（组件内部并未触发 onChangeColor）。这个组件的意图是显示一个按钮，点击按钮后可以触发颜色改变的功能（需要在实际使用时将 onChangeColor 关联到按钮的点击事件）。
}
答:
首先，你需要添加事件处理函数，例如 <button onClick={onChangeColor}>。

然而，同时又引入了计数器递增的问题。正如你的同事所坚持的那样，onChangeColor 并不符合预期，!!!这主要是因为事件发生向上传播，并且上层的某些事件处理函数执行了递增操作。为了解决这个问题，你需要阻止事件冒泡!!!。但是不要忘记调用 onChangeColor。
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      改变颜色
    </button>
  );
}
```

### State：组件的记忆

组件通常需要根据交互更改屏幕上显示的内容。输入表单应该更新输入字段，单击轮播图上的“下一个”应该更改显示的图片，单击“购买”应该将商品放入购物车。组件需要“记住”某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 state。

你将会学习到:
如何使用 useState Hook 添加 state 变量
useState Hook 返回哪一对值
如何添加多个 state 变量
为什么 state 被称作是局部的

```jsx
//当普通的变量无法满足时 
以下是一个渲染雕塑图片的组件。点击 “Next” 按钮应该显示下一个雕塑并将 index 更改为 1，再次点击又更改为 2，以此类推。但这个组件现在不起作用（你可以试一试！）：
//appjs  显示雕塑画廊，并点击按钮显示下一个雕塑。
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
    //定义一个名为 handleClick 的函数，这个函数将在按钮被点击时调用。
  }

  let sculpture = sculptureList[index];//根据当前 index，从 sculptureList 中获取当前雕塑对象。
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>

      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>

      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>

      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />

      <p>
        {sculpture.description}
      </p>
    </>
  );
  //定义并导出了一个名为 Gallery 的 React 函数组件，该组件渲染一个雕塑画廊。画廊显示一个按钮和当前雕塑的信息，包括名称、艺术家、编号、图片和描述。当用户点击按钮时，显示下一个雕塑。然而，由于 index 是一个局部变量，每次重新渲染组件时都会重置为 0，因此点击按钮不会真正切换到下一个雕塑。
}
//datajs
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
handleClick() 事件处理函数正在更新局部变量 index。但存在两个原因使得变化不可见：

局部变量无法在多次渲染中持久保存。 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
更改局部变量不会触发渲染。 React 没有意识到它需要使用新数据再次渲染组件。
要使用新数据更新组件，需要做两件事：

保留 渲染之间的数据。
触发 React 使用新数据渲染组件（重新渲染）。
useState Hook 提供了这两个功能：

State 变量 用于保存渲染间的数据。
State setter 函数 更新变量并触发 React 再次渲染组件。
```

```jsx
//添加一个 state 变量 
要添加 state 变量，先从文件顶部的 React 中导入 useState：

import { useState } from 'react';
然后，替换这一行：

let index = 0;
将其修改为

const [index, setIndex] = useState(0);
index 是一个 state 变量，setIndex 是对应的 setter 函数。

这里的 [ 和 ] 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。

以下展示了它们在 handleClick() 中是如何共同起作用的：

function handleClick() {
  setIndex(index + 1);
}
现在点击 “Next” 按钮切换当前雕塑：
//appjs
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  //当用户点击按钮时，handleClick 函数将 index 增加 1，使用 useState 更新组件状态，从而显示下一个雕塑。这样，点击按钮后可以浏览雕塑列表中的每个雕塑。
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
//datajs
...
```

```jsx
//遇见你的第一个 Hook 
在 React 中，useState 以及任何其他以“use”开头的函数都被称为 Hook。

Hook 是特殊的函数，只在 React 渲染时有效（我们将在下一节详细介绍）。它们能让你 “hook” 到不同的 React 特性中去。

State 只是这些特性中的一个，你之后还会遇到其他 Hook。
```

```jsx
//见你的第一个 Hook 
在 React 中，useState 以及任何其他以“use”开头的函数都被称为 Hook。

Hook 是特殊的函数，只在 React 渲染时有效（我们将在下一节详细介绍）。它们能让你 “hook” 到不同的 React 特性中去。

State 只是这些特性中的一个，你之后还会遇到其他 Hook。

陷阱:Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。 你不能在条件语句、循环语句或其他嵌套函数内调用 Hook。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。
```

```js
//剖析 useState 
当你调用 useState 时，你是在告诉 React 你想让这个组件记住一些东西：

const [index, setIndex] = useState(0);
在这个例子里，你希望 React 记住 index。

注意:惯例是将这对返回值命名为 const [thing, setThing]。你也可以将其命名为任何你喜欢的名称，但遵照约定俗成能使跨项目合作更易理解。

useState 的唯一参数是 state 变量的初始值。在这个例子中，index 的初始值被useState(0)设置为 0。

每次你的组件渲染时，useState 都会给你一个包含两个值的数组：

state 变量 (index) 会保存上次渲染的值。
state setter 函数 (setIndex) 可以更新 state 变量并触发 React 重新渲染组件。
以下是实际发生的情况：

const [index, setIndex] = useState(0);
组件进行第一次渲染。 因为你将 0 作为 index 的初始值传递给 useState，它将返回 [0, setIndex]。 React 记住 0 是最新的 state 值。
你更新了 state。当用户点击按钮时，它会调用 setIndex(index + 1)。 index 是 0，所以它是 setIndex(1)。这告诉 React 现在记住 index 是 1 并触发下一次渲染。
组件进行第二次渲染。React 仍然看到 useState(0)，但是因为 React 记住 了你将 index 设置为了 1，它将返回 [1, setIndex]。
以此类推！
```

```jsx
//赋予一个组件多个 state 变量 
你可以在一个组件中拥有任意多种类型的 state 变量。该组件有两个 state 变量，一个数字 index 和一个布尔值 showMore，点击 “Show Details” 会改变 showMore 的值：
//appjs
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </> 
    // 如果 showMore 为真，则显示雕塑的描述。
  );
}
//datajs
...
如果它们不相关，那么存在多个 state 变量是一个好主意，例如本例中的 index 和 showMore。但是，如果你发现经常同时更改两个 state 变量，那么最好将它们合并为一个。例如，如果你有一个包含多个字段的表单，那么有一个值为对象的 state 变量比每个字段对应一个 state 变量更方便。 选择 state 结构在这方面有更多提示。
```

```jsx
//React 如何知道返回哪个 state 

答:你可能已经注意到，useState 在调用时没有任何关于它引用的是哪个 state 变量的信息。没有传递给 useState 的“标识符”，它是如何知道要返回哪个 state 变量呢？它是否依赖于解析函数之类的魔法？答案是否定的。

相反，为了使语法更简洁，在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序。这在实践中很有效，因为如果你遵循上面的规则（“只在顶层调用 Hooks”），Hooks 将始终以相同的顺序被调用。此外，linter 插件也可以捕获大多数错误。

在 React 内部，为每个组件保存了一个数组，其中每一项都是一个 state 对。它维护当前 state 对的索引值，在渲染之前将其设置为 “0”。每次调用 useState 时，React 都会为你提供一个 state 对并增加索引值。你可以在文章 React Hooks: not magic, just arrays中阅读有关此机制的更多信息。

这个例子没有使用 React，但它让你了解 useState 在内部是如何工作的：
//indexjs
// useState 在 React 中是如何工作的（简化版）
let componentHooks = [];
let currentHookIndex = 0;
//声明一个全局变量 componentHooks，用于存储组件的所有 hooks。声明一个全局变量 currentHookIndex，用于跟踪当前组件中的 hook 调用。

function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
    //声明一个名为 useState 的函数，接受一个初始状态 initialState。
    //获取当前 hook 索引对应的 state pair。
    //如果 pair 存在，表示不是第一次渲染，直接返回它。增加 currentHookIndex，为下一个 hook 调用做准备。
  }

  // 这是我们第一次进行渲染.
  // 所以新建一个 state pair 然后存储它.如果 pair 不存在，表示第一次渲染，创建一个新的 state pair。
  pair = [initialState, setState];

  function setState(nextState) {
    // 当用户发起 state 的变更， 把新的值放入 pair 中.   声明 setState 函数，当 state 更新时调用 updateDOM 重新渲染组件。
    pair[0] = nextState;
    updateDOM();
  }

  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // 每次调用 useState() 都会得到新的 pair
  const [index, setIndex] = useState(0);//使用 useState 初始化 index 为 0，并提供 setIndex 方法更新它。
  const [showMore, setShowMore] = useState(false);//使用 useState 初始化 showMore 为 false，并提供 setShowMore 方法更新它。

  function handleNextClick() {
    setIndex(index + 1);
    //当用户点击 "Next" 按钮时，调用 setIndex 增加 index 值。
  }

  function handleMoreClick() {
    setShowMore(!showMore);
    //当用户点击 "Show details" 或 "Hide details" 按钮时，调用 setShowMore 切换 showMore 状态。
  }

  let sculpture = sculptureList[index];
  // 这个例子没有使用 React，所以, 返回一个对象而不是 JSX
  return {
    //返回一个对象，其中包含了所有需要的属性和事件处理函数，用于更新 DOM。
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // 在渲染组件之前重置当前 Hook 的下标
  currentHookIndex = 0;
  let output = Gallery();

  // 更新 DOM 以匹配输出结果
  // 这部分工作由 React 为你完成
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

//初始化渲染
let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [{
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terrts with 52',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 txpression and armor.'
}, 
...
}];
// 使 UI 匹配当前 state
updateDOM();

//indexhtml
<button id="nextButton">
  Next
</button>
<h3 id="header"></h3>
<button id="moreButton"></button>
<p id="description"></p>
<img id="image">

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
button { display: block; margin-bottom: 10px; }
</style>
```

```jsx
//
```

```jsx
//State 是隔离且私有的 
State 是屏幕上组件实例内部的状态。换句话说，如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！改变其中一个不会影响另一个。

在这个例子中，之前的 Gallery 组件以同样的逻辑被渲染了两次。试着点击每个画廊内的按钮。你会注意到它们的 state 是相互独立的：
//appjs
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
//galleryjs
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
//datajs
...
这就是 state 与声明在模块顶部的普通变量不同的原因。 State 不依赖于特定的函数调用或在代码中的位置，它的作用域“只限于”屏幕上的某块特定区域。你渲染了两个 <Gallery /> 组件，所以它们的 state 是分别存储的。

还要注意 Page 组件“不知道”关于 Gallery state 的任何信息，甚至不知道它是否有任何 state。与 props 不同，state 完全私有于声明它的组件。父组件无法更改它。这使你可以向任何组件添加或删除 state，而不会影响其他组件。

如果你希望两个画廊保持其 states 同步怎么办？在 React 中执行此操作的正确方法是从子组件中删除 state 并将其添加到离它们最近的共享父组件中。接下来的几节将专注于组织单个组件的 state，但我们将在组件间共享 state 中回到这个主题。
```

```jsx
//摘要
当一个组件需要在多次渲染间“记住”某些信息时使用 state 变量。
State 变量是通过调用 useState Hook 来声明的。
Hook 是以 use 开头的特殊函数。它们能让你 “hook” 到像 state 这样的 React 特性中。
Hook 可能会让你想起 import：它们需要在非条件语句中调用。调用 Hook 时，包括 useState，仅在组件或另一个 Hook 的顶层被调用才有效。
useState Hook 返回一对值：当前 state 和更新它的函数。
你可以拥有多个 state 变量。在内部，React 按顺序匹配它们。
State 是组件私有的。如果你在两个地方渲染它，则每个副本都有独属于自己的 state。
```

```jsx
//第 1 个挑战 共 4 个挑战: 完成画廊组件 
当你在最后一个雕塑上按 “Next” 时，代码会发生崩溃。请修复逻辑以防止此崩溃。你可以尝试在事件处理函数中添加额外的逻辑，或在操作无法执行时禁用掉按钮。

修复崩溃后，添加一个显示上一个雕塑的 “Previous” 按钮。同样地，确保它不在第一个雕塑里发生崩溃。
//appjs
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
//datajs
...

答:
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
注意 hasPrev 和 hasNext 是如何同时 作用于返回的 JSX 和事件处理函数中的！这种简便的模式之所以有效，是因为事件处理函数”闭包”了渲染时声明的变量。
```

```jsx
//第 2 个挑战 共 4 个挑战: 修复卡住的输入表单 
当你输入字段时，什么也没有出现。这就像输入值被空字符串给“卡住”了。第一个 <input> 的 value 设置为始终匹配 firstName 变量，第二个 <input> 的 value 设置为始终匹配 lastName 变量。这是对的。两个输入框都有 onChange 事件处理函数，它尝试根据最新的用户输入（e.target.value）更新变量。但是，变量似乎并没有在重新渲染时“记住”它们的值。通过使用 state 变量来解决此问题。
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}

答:首先，从 React 导入 useState。然后用 useState 声明的 state 变量替换 firstName 和 lastName。最后，用 setFirstName(...) 替换每个 firstName = ... 赋值，并对 lastName 做同样的事情。不要忘记更新 handleReset，以使重置按钮生效。
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    //该函数在输入框内容改变时更新 firstName 状态。
    //定义一个名为 handleFirstNameChange 的函数，接收一个事件对象 e 作为参数。函数的参数 e，表示事件对象。
    //调用 setFirstName 函数，用输入框的新值更新 firstName 状态。setFirstName一个函数，通常由 useState 钩子生成，用于更新 firstName 状态。(e.target.value) 从事件对象 e 中获取目标元素的值，并传递给 setFirstName 函数。e.target事件对象的目标元素，即触发事件的元素。.value目标元素的当前值，通常是输入框中的文本。
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
```

```jsx
//第 3 个挑战 共 4 个挑战: 修复一个错误 
这是一个收集用户反馈的小表单。当反馈被提交时，它应该显示一条感谢信息。但是，现在它会发生崩溃并显示错误消息“渲染的 hooks 比预期的少”。你能发现错误并修复它吗？
import { useState } from 'react';
//这个组件显示一个反馈表单，当提交表单时显示感谢信息。
export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
        //返回一个表单元素，当表单提交时执行事件处理函数。return (返回的 JSX 元素开始。<form onSubmit={e => { ... }}>表单元素，当提交表单时执行 onSubmit 处理函数。e.preventDefault();阻止默认的表单提交行为。alert(Sending: "${message}");弹出一个提示框，显示将要发送的消息。setIsSent(true);将 isSent 状态更新为 true。
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          //定义一个文本区域，用于输入消息，绑定 message 状态，值改变时更新 message。<textarea定义一个多行文本输入区域。placeholder="Message"提示文本，显示为 "Message"。value={message}绑定 message 状态，显示当前消息。onChange={e => setMessage(e.target.value)}当文本区域内容改变时，更新 message 状态。
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
答:
Hook 只能在组件函数的顶层调用。这里，第一个 isSent 定义遵循这个规则，但是 message 的定义位于一个条件语句中。

将其移出条件语句以解决问题：
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}
请记住，必须在条件语句外并且始终以相同的顺序调用 Hook！

你还可以删除不必要的 else 分支以减少嵌套。但要保证对 Hook 的所有调用都发生在第一个 return 前，这很重要。
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  if (isSent) {
    return <h1>Thank you!</h1>;
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert(`Sending: "${message}"`);
      setIsSent(true);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
尝试移动第二个 useState 调用到 if 条件之后，并要注意这会如何再次破坏它。

通常，以上类型的错误都会由 eslint-plugin-react-hooks linter 规则捕获。如果在本地调试错误代码时没有看到错误，则需要在构建工具的配置文件中进行设置。
```

```jsx
//第 4 个挑战 共 4 个挑战: 移除不必要的 state 
当按钮被点击时，这个例子应该询问用户的名字，然后显示一个 alert 欢迎他们。你尝试使用 state 来保存名字，但由于某种原因，它始终显示“Hello, ！”。

要修复此代码，请删除不必要的 state 变量。（我们将在稍后讨论为什么上述代码不起作用。）

你能解释为什么这个 state 变量是不必要的吗？
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('What is your name?'));
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
答:以下是一个使用了普通变量 name 的固定版本，这个变量声明于需要它的函数中。
export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?');
    //这行代码会显示一个提示对话框，询问用户“你的名字是什么？”。用户在对话框中输入的内容将被存储在常量变量 name 中。
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
State 变量仅用于在组件重渲染时保存信息。在单个事件处理函数中，普通变量就足够了。当普通变量运行良好时，不要引入 state 变量。
```

### 渲染和提交

组件显示到屏幕之前，其必须被 React 渲染。理解这些处理步骤将帮助你思考代码的执行过程并能解释其行为。

你将会学习到
在 React 中渲染的含义是什么
为什么以及什么时候 React 会渲染一个组件
在屏幕上显示组件所涉及的步骤
为什么渲染并不一定会导致 DOM 更新
想象一下，你的组件是厨房里的厨师，把食材烹制成美味的菜肴。在这种场景下，React 就是一名服务员，他会帮客户们下单并为他们送来所点的菜品。这种请求和提供 UI 的过程总共包括三个步骤：

触发 一次渲染（把客人的点单分发到厨房）
渲染 组件（在厨房准备订单）
提交 到 DOM（将菜品放在桌子上）

```jsx
//步骤 1: 触发一次渲染 
有两种原因会导致组件的渲染:

组件的 初次渲染。
组件（或者其祖先之一）的 状态发生了改变。
初次渲染 
当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用 createRoot 方法并传入目标 DOM 节点，然后用你的组件调用 render 函数完成的：
//indexjs
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
//获取 HTML 页面中的一个元素，并在其中渲染一个 React 组件 <Image />。   createRoot: React 18 中的一个函数，用于创建一个新的根渲染器。document.getElementById('root'): JavaScript 中的一个方法，用于获取 HTML 页面中 id 为 'root' 的元素。createRoot(document.getElementById('root')): 这一整句代码的意思是使用 createRoot 函数，传入获取到的 id 为 'root' 的 HTML 元素，并返回一个新的根渲染器，将其赋值给 root 变量。
//root.render(<Image />): 使用根渲染器的 render 方法，将 <Image /> 组件渲染到 id 为 'root' 的 HTML 元素中。

//imagejs
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
试着注释掉 root.render()，然后你将会看到组件消失。
```

```jsx
//状态更新时重新渲染 
一旦组件被初次渲染，你就可以通过使用 set 函数 更新其状态来触发之后的渲染。更新组件的状态会自动将一次渲染送入队列。（你可以把这种情况想象成餐厅客人在第一次下单之后又点了茶、点心和各种东西，具体取决于他们的胃口。）

```

!!!此处插入图react8

```jsx
//步骤 2: React 渲染你的组件 
在你触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。“渲染中” 即 React 在调用你的组件。

在进行初次渲染时, React 会调用根组件。
对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件。
这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染 那个 组件，而如果那个组件又返回了某个组件，那么 React 接下来就会渲染 那个 组件，以此类推。这个过程会持续下去，直到没有更多的嵌套组件并且 React 确切知道哪些东西应该显示到屏幕上为止。  !!!就是说像俄罗斯套娃

在接下来的例子中，React 将会调用 Gallery() 和 Image() 若干次：
//indexjs
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
//galleryjs
export default function Gallery() {
  return (
    <section>
      <h1>鼓舞人心的雕塑</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
在初次渲染中， React 将会为<section>、<h1> 和三个 <img> 标签 创建 DOM 节点。
在一次重渲染过程中, React 将计算它们的哪些属性（如果有的话）自上次渲染以来已更改。在下一步（提交阶段）之前，它不会对这些信息执行任何操作。
陷阱
渲染必须始终是一次 纯计算:

输入相同，输出相同。 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
只做它自己的事情。 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）
否则，随着代码库复杂性的增加，你可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。

性能优化 :如果更新的组件在树中的位置非常高，渲染更新后的组件内部所有嵌套组件的默认行为将不会获得最佳性能。如果你遇到了性能问题，性能 章节描述了几种可选的解决方案 。不要过早进行优化！
```

```jsx
//步骤 3: React 把更改提交到 DOM 上 
在渲染（调用）你的组件之后，React 将会修改 DOM。

对于初次渲染， React 会使用 appendChild() DOM API 将其创建的所有 DOM 节点放在屏幕上。
对于重渲染， React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。
React 仅在渲染之间存在差异时才会更改 DOM 节点。 例如，有一个组件，它!!!每秒!!!使用从父组件传递下来的不同属性重新渲染一次。注意，你可以添加一些文本到 <input> 标签，更新它的 value，但是文本不会在组件重渲染时消失：
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
  //定义并导出一个名为 Clock 的 React 函数组件。这个组件接受一个 time 属性，并返回一个包含两个元素的 JSX 结构：一个显示 time 属性值的 <h1> 标签和一个输入框 <input />。使用 React Fragment (<>...</>) 来包裹这些元素，从而避免在 DOM 中增加额外的节点。
  //
}
这个例子之所以会正常运行，是因为在最后一步中，React 只会使用最新的 time 更新 <h1> 标签的内容。它看到 <input> 标签出现在 JSX 中与上次相同的位置，因此 React 不会修改 <input> 标签或它的 value！
```

```jsx
//尾声：浏览器绘制 
在渲染完成并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕。尽管这个过程被称为“浏览器渲染”（“browser rendering”），但我们还是将它称为“绘制”（“painting”），以避免在这些文档的其余部分中出现混淆。

//摘要
在一个 React 应用中一次屏幕更新都会发生以下三个步骤：
触发
渲染
提交
你可以使用严格模式去找到组件中的错误
如果渲染结果与上次一样，那么 React 将不会修改 DOM
上一页
state：组件的记忆
```

### state 如同一张快照

也许 state 变量看起来和一般的可读写的 JavaScript 变量类似。但 state 在其表现出的特性上更像是一张快照。设置它不会更改你已有的 state 变量，但会触发重新渲染。

你将会学习到
设置 state 如何导致重新渲染
state 在何时以何种方式更新
为什么 state 不在设置后立即更新
事件处理函数如何获取 state 的一张“快照”

```jsx
//设置 state 会触发渲染 
你可能会认为你的用户界面会直接对点击之类的用户输入做出响应并发生变化。在 React 中，它的工作方式与这种思维模型略有不同。在上一页中，你看到了来自 React 的设置 state 请求重新渲染。这意味着要使界面对输入做出反应，你需要设置其 state。

在这个例子中，当你按下 “send” 时，setIsSent(true) 会通知 React 重新渲染 UI：
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
当你单击按钮时会发生以下情况：

执行 onSubmit 事件处理函数。
setIsSent(true) 将 isSent 设置为 true 并排列一个新的渲染。
React 根据新的 isSent 值重新渲染组件。
让我们仔细看看 state 和渲染之间的关系。
```

```jsx
//渲染会及时生成一张快照 
“正在渲染” 就意味着 React 正在调用你的组件——一个函数。你从该函数返回的 JSX 就像是在某个时间点上 UI 的快照。它的 props、事件处理函数和内部变量都是 根据当前渲染时的 state 被计算出来的。

与照片或电影画面不同，你返回的 UI “快照”是可交互的。它其中包括类似事件处理函数的逻辑，这些逻辑用于指定如何对输入作出响应。React 随后会更新屏幕来匹配这张快照，并绑定事件处理函数。因此，按下按钮就会触发你 JSX 中的点击事件处理函数。

当 React 重新渲染一个组件时：

React 会再次调用你的函数
函数会返回新的 JSX 快照
React 会更新界面以匹配返回的快照  

```

!!!此处插入图react9

```jsx
//作为一个组件的记忆，state 不同于在你的函数返回之后就会消失的普通变量。state 实际上“活”在 React 本身中——就像被摆在一个架子上！——位于你的函数之外。当 React 调用你的组件时，它会为特定的那一次渲染提供一张 state 快照。你的组件会在其 JSX 中返回一张包含一整套新的 props 和事件处理函数的 UI 快照 ，其中所有的值都是 根据那一次渲染中 state 的值 被计算出来的！
这里有个向你展示其运行原理的小例子。在这个例子中，你可能会以为点击“+3”按钮会调用 setNumber(number + 1) 三次从而使计数器递增三次。

看看你点击“+3”按钮时会发生什么：
```

!!!此处插入react10

```jsx
//import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

请注意，每次点击只会让 number 递增一次！

设置 state 只会为下一次渲染变更 state 的值。在第一次渲染期间，number 为 0。这也就解释了为什么在 那次渲染中的 onClick 处理函数中，即便在调用了 setNumber(number + 1) 之后，number 的值也仍然是 0：

<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
以下是这个按钮的点击事件处理函数通知 React 要做的事情：

setNumber(number + 1)：number 是 0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
setNumber(number + 1)：number 是0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
setNumber(number + 1)：number 是0 所以 setNumber(0 + 1)。
React 准备在下一次渲染时将 number 更改为 1。
尽管你调用了三次 setNumber(number + 1)，但在 这次渲染的 事件处理函数中 number 会一直是 0，所以你会三次将 state 设置成 1。这就是为什么在你的事件处理函数执行完以后，React 重新渲染的组件中的 number 等于 1 而不是 3。

你还可以通过在心里把 state 变量替换成它们在你代码中的值来想象这个过程。由于 这次渲染 中的 state 变量 number 是 0，其事件处理函数看起来会像这样：

<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
对于下一次渲染来说，number 是 1，因此 那次渲染中的 点击事件处理函数看起来会像这样：

<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
这就是为什么再次点击按钮会将计数器设置为 2，下次点击时会设为 3，依此类推。
```

```jsx
//随时间变化的 state 
好的，刚才那些很有意思。试着猜猜点击这个按钮会发出什么警告：
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
如果你使用之前替换的方法，你就能猜到这个提示框将会显示 “0”：

setNumber(0 + 5);
alert(0);
但如果你在这个提示框上加上一个定时器， 使得它在组件重新渲染 之后 才触发，又会怎样呢？是会显示 “0” 还是 “5” ？猜一猜！
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
惊讶吗？你如果使用替代法，就能看到被传入提示框的 state “快照”。

setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
到提示框运行时，React 中存储的 state 可能已经发生了更改，但它是使用用户与之交互时状态的快照进行调度的！

一个 state 变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是异步的。在 那次渲染的 onClick 内部，number 的值即使在调用 setNumber(number + 5) 之后也还是 0。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。

这里有个示例能够说明上述特性会使你的事件处理函数更不容易出现计时错误。下面是一个会在五秒延迟之后发送一条消息的表单。想象以下场景：

你按下“发送”按钮，向 Alice 发送“你好”。
在五秒延迟结束之前，将“To”字段的值更改为“Bob”。
你觉得 alert 会显示什么？它是会显示“你向 Alice 说了你好“还是会显示“你向 Bob 说了你好”？根据你已经学到的知识猜一猜，然后动手试一试：
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('你好');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`你向 ${to} 说了${message}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">发送</button>
    </form>
  );
}
React 会使 state 的值始终“固定”在一次渲染的各个事件处理函数内部。你无需担心代码运行时 state 是否发生了变化。

但是，万一你想在重新渲染之前读取最新的 state 怎么办？你应该使用 状态更新函数，下一页将会介绍！
```

```jsx
//摘要
设置 state 请求一次新的渲染。
React 将 state 存储在组件之外，就像在架子上一样。
当你调用 useState 时，React 会为你提供该次渲染 的一张 state 快照。
变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。
每个渲染（以及其中的函数）始终“看到”的是 React 提供给这个 渲染的 state 快照。
你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX。
过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值。
```

```jsx
//第 1 个挑战 共 1 个挑战: 实现红绿灯组件 
以下是一个人行道红绿灯组件，在按下按钮时会切换状态：
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
向 click 事件处理函数添加一个 alert 。当灯为绿色且显示“Walk”时，单击按钮应显示“Stop is next”。当灯为红色并显示“Stop”时，单击按钮应显示“Walk is next”。

把 alert 方法放在 setWalk 方法之前或之后有区别吗？
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```

```jsx
//
```
