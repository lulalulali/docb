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
//index.js
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // Todo: 实际实现一个导航栏
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

### 编辑器设置

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```
