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
  //return ( ... ): 返回组件的 JSX 结构，定义组件的 UI。<>...</>: 使用 React Fragment 包裹多个元素，不增加额外的 DOM 节点。
  //<button onClick={handleClick}>Change to {walk ? 'Stop' : 'Walk'}</button>:<button onClick={handleClick}>: 定义一个按钮，绑定 handleClick 事件处理函数。Change to {walk ? 'Stop' : 'Walk'}: 根据 walk 状态，显示 "Change to Stop" 或 "Change to Walk"。
  //<h1 style={{ color: walk ? 'darkgreen' : 'darkred' }}>{walk ? 'Walk' : 'Stop'}</h1>:<h1 style={{ color: walk ? 'darkgreen' : 'darkred' }}>: 定义一个标题，根据 walk 状态设置其文本颜色为 darkgreen 或 darkred。{walk ? 'Walk' : 'Stop'}: 根据 walk 状态，显示 "Walk" 或 "Stop"。

  //定义了一个 TrafficLight 组件，初始状态为 "Walk"（绿色），点击按钮后会切换为 "Stop"（红色），再点击会切换回 "Walk"，依此类推。组件包含一个按钮和一个根据状态显示 "Walk" 或 "Stop" 的标题，标题颜色根据状态变化。
}
向 click 事件处理函数添加一个 alert 。当灯为绿色且显示“Walk”时，单击按钮应显示“Stop is next”。当灯为红色并显示“Stop”时，单击按钮应显示“Walk is next”。

把 alert 方法放在 setWalk 方法之前或之后有区别吗？

答:
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? '马上红灯' : '马上绿灯');
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
//初始状态是 "changetostop"按钮和"walk"字;点击按钮,alert "马上红灯",确定alert,walk字变stop ,按钮变"changetowalk"   !!!值得推敲逻辑!!!
无论你是将它放在 setWalk 调用之前还是之后都不会有区别。那次渲染的 walk 的值是固定的。调用setWalk 只会为 下次 渲染对它进行变更，而不会影响来自上次渲染的事件处理函数。

这一行代码乍看之下似乎有违直觉：

alert(walk ? 'Stop is next' : 'Walk is next');
但如果你将其读作“如果交通灯显示‘现在就走吧’，则消息应显示‘接下来是停’。”就容易理解了。你事件处理函数中的 walk 变量与所渲染的 walk 值是一致的，并且不会发生改变。

你可以用替代法来验证这是否正确。当 walk 为 true 时，你会得到：

<button onClick={() => {
  setWalk(false);
  alert('Stop is next');
}}>
  Change to Stop
</button>
<h1 style={{color: 'darkgreen'}}>
  Walk
</h1>
因此，单击 “Change to Stop” 就会入队一次将 walk 设置为 false 的渲染，并弹出显示 “Stop is next” 的提示框。
```

### 把一系列 state 更新加入队列

设置组件 state 会把一次重新渲染加入队列。但有时你可能会希望在下次渲染加入队列之前对 state 的值执行多次操作。为此，了解 React 如何批量更新 state 会很有帮助。

你将会学习到
什么是“批处理”以及 React 如何使用它来处理多个 state 更新
如何连续多次对同一 state 变量进行更新

```jsx
//React 会对 state 更新进行批处理 
在下面的示例中，你可能会认为点击 “+3” 按钮会使计数器递增三次，因为它调用了 setNumber(number + 1) 三次：
import { useState } from 'react';

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
但是，你可能还记得上一节中的内容，!!!!每一次渲染的 state 值都是固定!!!的，因此无论你调用多少次 setNumber(1)，在第一次渲染的事件处理函数内部的 number 值总是 0 ：

setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
但是这里还有另外一个影响因素需要讨论。React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。 这就是为什么重新渲染只会发生在所有这些 setNumber() 调用 之后 的原因。

这可能会让你想起餐厅里帮你点菜的服务员。服务员不会在你说第一道菜的时候就跑到厨房！相反，他们会让你把菜点完，让你修改菜品，甚至会帮桌上的其他人点菜。
这让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 重新渲染。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 之后，UI 才会更新。这种特性也就是 批处理，它会使你的 React 应用运行得更快。它还会帮你避免处理只​​更新了一部分 state 变量的令人困惑的“半成品”渲染。

!!!React 不会跨 多个 需要刻意触发的事件（如点击）进行批处理——每次点击都是单独处理的!!!。请放心，React 只会在一般来说安全的情况下才进行批处理。这可以确保，例如，如果第一次点击按钮会禁用表单，那么第二次点击就不会再次提交它。
```

!!!此处插入react11

```jsx
//在下次渲染前多次更新同一个 state 
这是一个不常见的用例，但是如果你想在下次渲染之前多次更新同一个 state，你可以像 setNumber(n => n + 1) 这样传入一个根据队列中的前一个 state 计算下一个 state 的 函数，而不是像 setNumber(number + 1) 这样传入 下一个 state 值。这是一种告诉 React “用 state 值做某事”而不是仅仅替换它的方法。

现在尝试递增计数器：
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
在这里，n => n + 1 被称为 更新函数。当你将它传递给一个 state 设置函数时：

React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。
在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
下面是 React 在执行事件处理函数时处理这几行代码的过程：

setNumber(n => n + 1)：n => n + 1 是一个函数。React 将它加入队列。
setNumber(n => n + 1)：n => n + 1 是一个函数。React 将它加入队列。
setNumber(n => n + 1)：n => n + 1 是一个函数。React 将它加入队列。
当你在下次渲染期间调用 useState 时，React 会遍历队列。之前的 number state 的值是 0，所以这就是 React 作为参数 n 传递给第一个更新函数的值。然后 React 会获取你上一个更新函数的返回值，并将其作为 n 传递给下一个更新函数，以此类推：

|更新队列|n|  返回值|
|----------|----------|
|n => n + 1|0|   0 + 1 = 1|
|n => n + 1|1| 1 + 1 = 2|
|n => n + 1|2| 2 + 1 = 3|
React 会保存 3 为最终结果并从 useState 中返回。

这就是为什么在上面的示例中点击“+3”正确地将值增加“+3”。
```

```jsx
//如果你在替换 state 后更新 state 会发生什么 
这个事件处理函数会怎么样？你认为 number 在下一次渲染中的值是什么？

<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>


import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>增加数字</button>
    </>
  )
}
这是事件处理函数告诉 React 要做的事情：

setNumber(number + 5)：number 为 0，所以 setNumber(0 + 5)。React 将 “替换为 5” 添加到其队列中。
setNumber(n => n + 1)：n => n + 1 是一个更新函数。 React 将 该函数 添加到其队列中。
在下一次渲染期间，React 会遍历 state 队列：
|更新队列|n|返回值|
|----------|----------|
|“替换为 5”|0（未使用）|5|
|n => n + 1|5|5 + 1 = 6|

React 会保存 6 为最终结果并从 useState 中返回。

注意:你可能已经注意到，setState(x) 实际上会像 setState(n => x) 一样运行，只是没有使用 n！
```

```jsx
//如果你在更新 state 后替换 state 会发生什么 
让我们再看一个例子。你认为 number 在下一次渲染中的值是什么？

<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>增加数字</button>
    </>
  )
}

以下是 React 在执行事件处理函数时处理这几行代码的过程：

setNumber(number + 5)：number 为 0，所以 setNumber(0 + 5)。React 将 “替换为 5” 添加到其队列中。
setNumber(n => n + 1)：n => n + 1 是一个更新函数。React 将该函数添加到其队列中。
setNumber(42)：React 将 “替换为 42” 添加到其队列中。
在下一次渲染期间，React 会遍历 state 队列：

|更新队列|n|返回值|
|----------|----------|
|“替换为 5”|0（未使用）|5|
|n => n + 1|5|5 + 1 = 6|
|“替换为 42”|6（未使用）|42|
然后 React 会保存 42 为最终结果并从 useState 中返回。

总而言之，以下是你可以考虑传递给 setNumber state 设置函数的内容：

一个更新函数（例如：n => n + 1）会被添加到队列中。
任何其他的值（例如：数字 5）会导致“替换为 5”被添加到队列中，已经在队列中的内容会被忽略。
事件处理函数执行完成后，React 将触发重新渲染。在重新渲染期间，React 将处理队列。更新函数会在渲染期间执行，因此 更新函数必须是 纯函数 并且只 返回 结果。不要尝试从它们内部设置 state 或者执行其他副作用。在严格模式下，React 会执行每个更新函数两次（但是丢弃第二个结果）以便帮助你发现错误。
```

```jsx
//命名惯例 
通常可以通过相应 state 变量的第一个字母来命名更新函数的参数：

setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
如果你喜欢更冗长的代码，另一个常见的惯例是重复使用完整的 state 变量名称，如 setEnabled(enabled => !enabled)，或使用前缀，如 setEnabled(prevEnabled => !prevEnabled)。
```

```jsx
//摘要
设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
要在一个事件中多次更新某些 state，你可以使用 setNumber(n => n + 1) 更新函数。
```

```jsx
//第 1 个挑战 共 2 个挑战: 修复请求计数器 
你正在开发一个艺术市场应用，该应用允许一个用户为一个艺术品同时提交多个订单。每次用户按下“购买”按钮，“等待”计数器应该增加一。三秒后，“等待”计数器应该减少，“完成”计数器应该增加。

但是，“等待”计数器的行为并不符合预期。当你按下“购买”按钮时，它会减少到 -1（这本应该是不可能的）。如果你快速点击两次，两个计数器似乎都会出现无法预测的行为。

为什么会发生这种情况？修复两个计数器。
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
   //   async function handleClick() {: 定义一个异步函数 handleClick。
   // setPending(pending + 1);: 增加 pending 状态的值，表示增加一个挂起的请求。
   // await delay(3000);: 调用 delay 函数等待 3000 毫秒（3 秒）。
   // setPending(pending - 1);: 减少 pending 状态的值，表示挂起的请求减少一个。
   // setCompleted(completed + 1);: 增加 completed 状态的值，表示完成的请求增加一个。
  }

  return (
    <>
      <h3>
        等待：{pending}
      </h3>
      <h3>
        完成：{completed}
      </h3>
      <button onClick={handleClick}>
        购买
      </button>
    </>
  );
  //<h3>等待：{pending}</h3>: 显示挂起的请求数量。
  // <h3>完成：{completed}</h3>: 显示完成的请求数量。
  // <button onClick={handleClick}>购买</button>: 定义一个按钮，绑定 handleClick 事件处理函数，当按钮被点击时调用 handleClick 函数。
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
  //function delay(ms) { return new Promise(resolve => { setTimeout(resolve, ms); }); }: 定义一个 delay 函数，返回一个在指定时间（毫秒）后解析的 Promise，用于在异步函数中实现延迟效果。
}
//定义了一个 RequestTracker 组件，初始状态为 pending 和 completed 均为 0。当用户点击 "购买" 按钮时，挂起的请求数量增加 1，等待 3 秒后，挂起的请求数量减少 1，完成的请求数量增加 1。组件包含两个显示请求数量的标题和一个触发状态变化的按钮。

答:在 handleClick 事件处理函数内部，pending 和 completed 的值与他们在点击事件发生时的值相对应。对于第一次渲染，pending 为 0 ，因此 setPending(pending - 1) 变成了 setPending(-1)，而这是错误的。既然你想要 增加 或 减少 计数器，你可以改为传递更新函数，而不是将计数器设置为在点击期间确定的具体值：
  async function handleClick() {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }
  这可以确保你在增加或减少计数器时是根据其 最新 的 state 而不是点击时的 state 来进行增减的
```

```jsx
//第 2 个挑战 共 2 个挑战: 自己实现状态队列 
在这个挑战中，你将从头开始重新实现 React 的一小部分！这并不像听起来那么难。

滚动 sandbox 进行预览。请注意，它显示了 四个测试用例 。它们与你之前在本页上看到过的示例相对应。你的任务是实现 getFinalState 函数，让它为每种情况返回正确的结果。如果你对它进行了正确的实现的话，那么所有四个测试用例都应该会通过。

你将收到两个参数：baseState 是初始状态（例如：0），queue 是一个既包含数字（例如：5）也包含更新函数（例如：n => n + 1）的数组，这些数字和数组会被按照它们被添加进来的顺序排列。

你的任务是返回最终的 state，如同页面上的表格展示的那样！
//processqueuejs
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: 对队列做些什么...

  return finalState;
}
//appjs  定义了一个 App 组件，它展示了一些测试用例，用于验证 getFinalState 函数在不同输入队列上的输出结果。
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';
//function increment(n) { return n + 1; }: 定义一个 increment 函数，它将输入的数字 n 增加 1 并返回结果。increment.toString = () => 'n => n+1';: 将 increment 函数的 toString 方法重写为一个返回字符串 'n => n+1' 的箭头函数。例子:
// 输出原始函数
console.log(increment); // 输出: n => n+1
// 调用函数
console.log(increment(5)); // 输出: 6

export default function App() {
  return (
//     export default function App() { ... }: 定义并导出一个名为 App 的函数组件。
// return ( ... ): 返回组件的 JSX 结构，定义组件的 UI。
// <TestCase baseState={0} queue={[1, 1, 1]} expected={1} />: 渲染一个 TestCase 组件，传入 baseState 为 0，queue 为 [1, 1, 1]，expected 为 1。
// <hr />: 渲染一个水平线，用于分隔测试用例。
// 多次调用 TestCase 组件，每次传入不同的 baseState、queue 和 expected 值。
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />

      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />

      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />

      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  // function TestCase({ baseState, queue, expected }) { ... }: 定义一个名为 TestCase 的函数组件，接收 baseState、queue 和 expected 作为 props。
  const actual = getFinalState(baseState, queue);
   // const actual = getFinalState(baseState, queue);: 调用 getFinalState 函数，将 baseState 和 queue 作为参数，得到实际结果 actual。
  return (
    <>
      <p>初始 state：<b>{baseState}</b></p>
      <p>队列：<b>[{queue.join(', ')}]</b></p>
      <p>预期结果：<b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
        'green' :
        'red'
      }}>
        你的结果：<b>{actual}</b>
        {' '}
        ({actual === expected ?
          '正确' :
          '错误'
        })
      </p>
    </>
  );
// return ( ... ): 返回组件的 JSX 结构，定义组件的 UI。
// <p>初始 state：<b>{baseState}</b></p>: 显示初始状态 baseState。
// <p>队列：<b>[{queue.join(', ')}]</b></p>: 显示队列 queue 的内容。
// <p>预期结果：<b>{expected}</b></p>: 显示预期结果 expected。
// <p style={{ color: actual === expected ? 'green' : 'red' }}>: 根据 actual 是否等于 expected 来设置文本颜色（绿色表示正确，红色表示错误）。
// 显示实际结果 actual，以及结果是否正确。
}
总结：这段代码定义了一个 App 组件，展示了一些测试用例，用于验证 getFinalState 函数在不同输入队列上的输出结果。每个测试用例通过 TestCase 组件进行渲染，并显示初始状态、队列内容、预期结果和实际结果的比较。

答:如果你没有思路，可以从下面的代码结构开始:
export function getFinalState(baseState, queue) {
  let finalState = baseState;
 //let finalState = baseState;: 初始化 finalState 为 baseState 的值。
export function getFinalState(baseState, queue) {
  let finalState = baseState;
  for (let update of queue) {
    if (typeof update === 'function') {
      // 调用更新函数
      finalState = update(finalState);
    } else {
      // 替换 state
      finalState = update;
    }
  }
 return finalState;
}
  //for (let update of queue) { ... }: 遍历 queue 数组中的每一个 update。
  //if (typeof update === 'function') { ... }: 检查 update 是否是一个函数。finalState = update(finalState);: 如果 update 是一个函数，则调用它并传入当前的 finalState，然后将返回值赋值给 finalState。else { ... }: 如果 update 不是一个函数。finalState = update;: 将 update 直接赋值给 finalState
  //return finalState;: 返回计算后的 finalState。
}
//这段代码的作用是从初始状态 baseState 开始，根据 queue 中的每个更新操作（可能是函数，也可能是直接的值）计算并返回最终的状态 finalState。

补全缺失的几行代码！
```

### 更新 state 中的对象

```jsx
//
state 中可以保存任意类型的 JavaScript 值，包括对象。但是，你不应该直接修改存放在 React state 中的对象。相反，当你想要更新一个对象时，你需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象。

你将会学习到
如何正确地更新 React state 中的对象
如何在不产生 mutation 的情况下更新一个嵌套对象
什么是不可变性（immutability），以及如何不破坏它
如何使用 Immer 使复制对象不那么繁琐
```

```jsx
//什么是 mutation？ 
你可以在 state 中存放任意类型的 JavaScript 值。

const [x, setX] = useState(0);
到目前为止，你已经尝试过在 state 中存放数字、字符串和布尔值，这些类型的值在 JavaScript 中是不可变（immutable）的，这意味着它们不能被改变或是只读的。你可以通过替换它们的值以触发一次重新渲染。

setX(5);
state x 从 0 变为 5，但是数字 0 本身并没有发生改变。在 JavaScript 中，无法对内置的原始值，如数字、字符串和布尔值，进行任何更改。

现在考虑 state 中存放对象的情况：

const [position, setPosition] = useState({ x: 0, y: 0 });
//({ x: 0, y: 0 }): useState 函数的参数，指定状态的初始值。在这个例子中，初始状态是一个对象，包含 x 和 y 两个属性，初始值分别为 0。
从技术上来讲，可以改变对象自身的内容。当你这样做时，就制造了一个 mutation：

position.x = 5;
然而，虽然严格来说 React state 中存放的对象是可变的，但你应该像处理数字、布尔值、字符串一样将它们视为不可变的。因此你应该替换它们的值，而不是对它们进行修改。
```

```jsx
//将 state 视为只读的 
换句话说，你应该 把所有存放在 state 中的 JavaScript 对象都视为只读的。

在下面的例子中，我们用一个存放在 state 中的对象来表示指针当前的位置。当你在预览区触摸或移动光标时，红色的点本应移动。但是实际上红点仍停留在原处：
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      //这一句有毛病
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
问题出在下面这段代码中。

onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
这段代码直接修改了 上一次渲染中 分配给 position 的对象。但是因为并没有使用 state 的设置函数，React 并不知道对象已更改。所以 React 没有做出任何响应。这就像在吃完饭之后才尝试去改变要点的菜一样。虽然在一些情况下，直接修改 state 可能是有效的，但我们并不推荐这么做。你应该把在渲染过程中可以访问到的 state 视为只读的。

在这种情况下，为了真正地 触发一次重新渲染，你需要创建一个新对象并把它传递给 state 的设置函数：
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
通过使用 setPosition，你在告诉 React：
!!!使用这个新的对象替换 position 的值;
!!!然后再次渲染这个组件!!!
现在你可以看到，当你在预览区触摸或移动光标时，红点会跟随着你的指针移动：
//实现了一个红点跟随鼠标移动的效果。
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
    //使用 useState Hook 创建一个 position 状态，初始值是一个包含 x 和 y 属性的对象，初始值均为 0。
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
        //onPointerMove={e => { position.x = e.clientX; position.y = e.clientY; }}: 为 div 元素添加一个 onPointerMove 事件处理程序。每当鼠标移动时，更新 position 状态的 x 和 y 属性为当前鼠标位置。这里应该使用 setPosition 来更新状态，以确保组件正确地重新渲染。
        //style={{ position: 'relative', width: '100vw', height: '100vh' }}: 将 div 元素的样式设为相对定位，宽度和高度分别为视口的 100%。
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}


局部 mutation 是可以接受的 
:
像这样的代码是有问题的，因为它改变了 state 中现有的对象：

position.x = e.clientX;
position.y = e.clientY;
但是像这样的代码就 没有任何问题，因为你改变的是你刚刚创建的一个新的对象：

const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
事实上，它完全等同于下面这种写法：

setPosition({
  x: e.clientX,
  y: e.clientY
});
!!!!只有当你改变已经处于 state 中的 现有 对象时，mutation 才会成为问题。!!!
而修改一个你刚刚创建的对象就不会出现任何问题，因为 还没有其他的代码引用它。改变它并不会意外地影响到依赖它的东西。这叫做“局部 mutation”。你甚至可以 在渲染的过程中 进行“局部 mutation”的操作。这种操作既便捷又没有任何问题！
```

```jsx
//使用展开语法复制对象 
在之前的例子中，始终会根据当前指针的位置创建出一个新的 position 对象。但是通常，你会希望把 现有 数据作为你所创建的新对象的一部分。例如，你可能只想要更新表单中的一个字段，其他的字段仍然使用之前的值。

下面的代码中，输入框并不会正常运行，因为 onChange 直接修改了 state ：
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
例如，下面这行代码修改了上一次渲染中的 state：

person.firstName = e.target.value;
想要实现你的需求，最可靠的办法就是创建一个新的对象并将它传递给 setPerson。但是在这里，你还需要 把当前的数据复制到新对象中，因为你只改变了其中一个字段：

setPerson({
  firstName: e.target.value, // 从 input 中获取新的 first name
  lastName: person.lastName,
  email: person.email
});
你可以使用 ... 对象展开 语法，这样你就不需要单独复制每个属性。

setPerson({
  ...person, // 复制上一个 person 中的所有字段
  firstName: e.target.value // 但是覆盖 firstName 字段 
});
现在表单可以正常运行了！

可以看到，你并没有为每个输入框单独声明一个 state。对于大型表单，将所有数据都存放在同一个对象中是非常方便的——前提是你能够正确地更新它！
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
请注意 ... 展开语法本质是是“浅拷贝”——它只会复制一层。这使得它的执行速度很快，但是也意味着当你想要更新一个嵌套属性时，你必须得多次使用展开语法。

使用一个事件处理函数来更新多个字段:
你也可以在对象的定义中使用 [ 和 ] 括号来实现属性的动态命名。下面是同一个例子，但它使用了一个事件处理函数而不是三个：
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
在这里，e.target.name 引用了 <input> 这个 DOM 元素的 name 属性。
```

```jsx
//更新一个嵌套对象 
考虑下面这种结构的嵌套对象：

const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
如果你想要更新 person.artwork.city 的值，用 mutation 来实现的方法非常容易理解：

person.artwork.city = 'New Delhi';
但是在 React 中，你需要将 state 视为不可变的！为了修改 city 的值，你首先需要创建一个新的 artwork 对象（其中预先填充了上一个 artwork 对象中的数据），然后创建一个新的 person 对象，并使得其中的 artwork 属性指向新创建的 artwork 对象：

const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
或者，写成一个函数调用：

setPerson({
  ...person, // 复制其它字段的数据 
  artwork: { // 替换 artwork 字段 
    ...person.artwork, // 复制之前 person.artwork 中的数据
    city: 'New Delhi' // 但是将 city 的值替换为 New Delhi！
  }
});
这虽然看起来有点冗长，但对于很多情况都能有效地解决问题：
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>

      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>

      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>

      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>

      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
对象并非是真正嵌套的:
下面这个对象从代码上来看是“嵌套”的：

let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
然而，当我们思考对象的特性时，“嵌套”并不是一个非常准确的方式。当这段代码运行的时候，不存在“嵌套”的对象。你实际上看到的是两个不同的对象：

let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
对象 obj1 并不处于 obj2 的“内部”。例如，下面的代码中，obj3 中的属性也可以指向 obj1：

let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
如果你直接修改 obj3.artwork.city，就会同时影响 obj2.artwork.city 和 obj1.city。这是因为 obj3.artwork、obj2.artwork 和 obj1 都指向同一个对象。当你用“嵌套”的方式看待对象时，很难看出这一点。相反，它们是相互独立的对象，只不过是用属性“指向”彼此而已。 就是说共享???
```

```jsx
//使用 Immer 编写简洁的更新逻辑 
如果你的 state 有多层的嵌套，你或许应该考虑 将其扁平化。但是，如果你不想改变 state 的数据结构，你可能更喜欢用一种更便捷的方式来实现嵌套展开的效果。Immer 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。通过使用 Immer，你写出的代码看起来就像是你“打破了规则”而直接修改了对象：

updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
//更新了一个对象 draft 的嵌套属性，使 artwork 对象的 city 属性的值变为 'Lagos'。
//updatePerson(draft => { ... });updatePerson: 假设这是一个函数，接受一个函数作为参数。通常，这种函数用于管理状态更新，比如在 immer 库中。(draft => { ... }): 这是一个箭头函数。箭头函数的语法简化了函数定义。这里，它接受一个参数 draft，并对其进行操作。
//draft => { ... }draft: 这是箭头函数的参数，代表一个可变的对象草稿。这种草稿对象通常用于管理状态的不可变更新。{ ... }: 这是箭头函数的函数体。花括号内包含了对 draft 对象的操作。
//draft.artwork.city = 'Lagos';draft.artwork: 访问 draft 对象的 artwork 属性。artwork 本身也是一个对象。draft.artwork.city: 进一步访问 artwork 对象的 city 属性。= 'Lagos';: 将 city 属性的值设置为 'Lagos'。
但是不同于一般的 mutation，它并不会覆盖之前的 state！   在实际应用中，这种模式通常用于状态管理库，例如 immer，以便在保持状态不可变的前提下，使用简单的赋值操作更新嵌套属性。这样可以简化状态更新的过程，同时确保状态的不可变性。

Immer 是如何运行的？
由 Immer 提供的 draft 是一种特殊类型的对象，被称为 Proxy，它会记录你用它所进行的操作。这就是你能够随心所欲地直接修改对象的原因所在！从原理上说，Immer 会弄清楚 draft 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象。

尝试使用 Immer:

运行 npm install use-immer 添加 Immer 依赖
用 import { useImmer } from 'use-immer' 替换掉 import { useState } from 'react'
下面我们把上面的例子用 Immer 实现一下：
//packagejson
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
可以看到，事件处理函数变得更简洁了。你可以随意在一个组件中同时使用 useState 和 useImmer。如果你想要写出更简洁的更新处理函数，Immer 会是一个不错的选择，尤其是当你的 state 中有嵌套，并且复制对象会带来重复的代码时。

为什么在 React 中不推荐直接修改 state？
有以下几个原因：

调试：如果你使用 console.log 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化
优化：React 常见的 优化策略 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 prevObj === obj，那么你就可以肯定这个对象内部并没有发生改变。
新功能：我们正在构建的 React 的新功能依赖于 state 被 像快照一样看待 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。
需求变更：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。
更简单的实现：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是为什么 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。
在实践中，你经常可以“侥幸”直接修改 state 而不出现什么问题，但是我们强烈建议你不要这样做，这样你就可以使用我们秉承着这种理念开发的 React 新功能。未来的贡献者甚至是你未来的自己都会感谢你的！
```

```jsx
//摘要
将 React 中所有的 state 都视为不可直接修改的。
当你在 state 中存放对象时，直接修改对象并不会触发重渲染，并会改变前一次渲染“快照”中 state 的值。
不要直接修改一个对象，而要为它创建一个 新 版本，并通过把 state 设置成这个新版本来触发重新渲染。
你可以使用这样的 {...obj, something: 'newValue'} 对象展开语法来创建对象的拷贝。
对象的展开语法是浅层的：它的复制深度只有一层。
想要更新嵌套对象，你需要从你更新的位置开始自底向上为每一层都创建新的拷贝。
想要减少重复的拷贝代码，可以使用 Immer。
```

```js
//第 1 个挑战 共 3 个挑战: 修复错误的 state 更新代码 
这个表单有几个 bug。试着点击几次增加分数的按钮。你会注意到分数并没有增加。然后试着编辑一下名字字段，你会注意到分数突然“响应”了你之前的修改。最后，试着编辑一下姓氏字段，你会发现分数完全消失了。

你的任务就是修复所有的这些 bug。在你修复它们的同时，解释一下它们为什么会产生。
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
答案
下面是两个 bug 都得到修复后的代码：就是说你只要setplayer调用了,你就得考虑其它没改的内容,体现为: ...player这种形式,代表跳过
  function handlePlusClick() {
    setPlayer({
      ...player,
      score: player.score + 1,
    });
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }
```

```js
//第 2 个挑战 共 3 个挑战: 发现并修复 mutation 
在静止的背景上有一个可以拖动的方形。你可以使用下拉框来修改方形的颜色。

但是这里有个 bug。当你先移动了方形，再去修改它的颜色时，背景会突然“跳”到方形所在的位置（实际上背景的位置并不应该发生变化！）。但是这并不是我们想要的，Background 的 position 属性被设置为 initialPosition，也就是 { x: 0, y: 0 }。为什么修改颜色之后，背景会移动呢？

找到 bug 并修复它。
//appjs
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
//boxjs
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
//backgroundjs
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};

答案:问题出在 handleMove 中的 mutation 。它直接修改了 shape.position，但是此时 initialPosition 所指向的也是同一个对象。因此方形和背景都发生了移动。（因为它是 mutation，所以直到一个不相关更新——颜色变化——触发了一次重新渲染，变化才反映到屏幕上。）

修复问题的方法就是从 handleMove 中移除这个 mutation，然后用展开运算符来复制方形对象。请注意 += 是 mutation 的一种，所以你需要对它进行重写来使用普通的 + 操作符。
export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      }
    });
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return ()
```

```js
//第 3 个挑战 共 3 个挑战: 使用 Immer 更新对象 
这里的例子和上面那段有 bug 的代码是相同的。这一次，试着用 Immer 来修复 mutation 的问题。为了方便你的练习，useImmer 已经被引入了，因此你只需要修改 shape 这个 state 变量来使用它。
//packagejson
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useState } from 'react';
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
//boxjs
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
//backgroundjs
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
答案:下面的代码是使用 Immer 重写的。请注意代码中的事件处理函数仍然是以直接修改对象的方式书写的，但是代码不会产生任何问题了。这是因为从原理上来说，Immer 从来没有直接修改现有的对象。
export default function Canvas() {
  const [shape, updateShape] = useImmer({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    updateShape(draft => {
      draft.position.x += dx;
      draft.position.y += dy;
    });
  }

  function handleColorChange(e) {
    updateShape(draft => {
      draft.color = e.target.value;
    });
  }

  return ()
```

### 更新 state 中的数组

```js
//
数组是另外一种可以存储在 state 中的 JavaScript 对象，它虽然是可变的，但是却应该被视为不可变。同对象一样，当你想要更新存储于 state 中的数组时，你需要创建一个新的数组（或者创建一份已有数组的拷贝值），并使用新数组设置 state。

你将会学习到
如何添加、删除或者修改 React state 中的数组中的元素
如何更新数组内部的对象
如何通过 Immer 降低数组拷贝的重复度

```

```js
//在没有 mutation 的前提下更新数组 
在 JavaScript 中，数组只是另一种对象。同对象一样，你需要将 React state 中的数组视为只读的。这意味着你不应该使用类似于 arr[0] = 'bird' 这样的方式来重新分配数组中的元素，也不应该使用会直接修改原始数组的方法，例如 push() 和 pop()。

相反，每次要更新一个数组时，你需要把一个新的数组传入 state 的 setting 方法中。为此，你可以通过使用像 filter() 和 map() 这样不会直接修改原始值的方法，从原始数组生成一个新的数组。然后你就可以将 state 设置为这个新生成的数组。

下面是常见数组操作的参考表。当你操作 React state 中的数组时，你需要避免使用左列的方法，而首选右列的方法：
```

| 操作类型   | 避免使用 (会改变原始数组)    | 推荐使用 (会返回一个新数组)                 |
| ---------- | ----------------------------- | ------------------------------------------- |
| 添加元素   | push，unshift                 | concat，[...arr] 展开语法（例子）            |
| 删除元素   | pop，shift，splice            | filter，slice（例子）                        |
| 替换元素   | splice，arr[i] = ... 赋值     | map（例子）                                  |
| 排序       | reverse，sort                 | 先将数组复制一份（例子）                    |

```js
//或者，你可以使用 Immer ，这样你便可以使用表格中的所有方法了。

陷阱:不幸的是，虽然 slice 和 splice 的名字相似，但作用却迥然不同：

slice 让你可以拷贝数组或是数组的一部分。
splice 会直接修改 原始数组（插入或者删除元素）。
在 React 中，更多情况下你会使用 slice（没有 p ！），因为你不想改变 state 中的对象或数组。更新对象这一章节解释了什么是 mutation，以及为什么不推荐在 state 里这样做。
```

```js
//向数组中添加元素 
push() 会直接修改原始数组，而你不希望这样：
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
//以上有毛病
//相反，你应该创建一个 新 数组，其包含了原始数组的所有元素 以及 一个在末尾的新元素。这可以通过很多种方法实现，最简单的一种就是使用 ... 数组展开 语法：

setArtists( // 替换 state
  [ // 是通过传入一个新数组实现的
    ...artists, // 新数组包含原数组的所有元素
    { id: nextId++, name: name } // 并在末尾添加了一个新的元素
  ]
);
现在代码可以正常运行了：
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
数组展开运算符还允许你把新添加的元素放在原始的 ...artists 之前：

setArtists([
  { id: nextId++, name: name },
  ...artists // 将原数组中的元素放在末尾
]);
这样一来，展开操作就可以完成 push() 和 unshift() 的工作(
push(): 将一个或多个元素添加到数组的末尾，并返回新的长度。unshift(): 将一个或多个元素添加到数组的开头，并返回新的长度。)，将新元素添加到数组的末尾和开头。你可以在上面的 sandbox 中尝试一下！
```

```js
//从数组中删除元素 
从数组中删除一个元素最简单的方法就是将它过滤出去。换句话说，你需要生成一个不包含该元素的新数组。这可以通过 filter 方法实现，例如：
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  ); 
   //使用 JavaScript 的 map 函数遍历 artists 数组，将每个艺术家对象 artist 映射到一个新的数组中，新的数组元素是一个 <li> 列表项。-----为每个艺术家创建一个列表项 <li>。key={artist.id}：React 中的 key 属性，用于唯一标识每个列表项，以帮助 React 识别哪些项目发生了变化、被添加或移除了。
   //{artist.name}{' '}:在列表项中显示艺术家的名字。{artist.name}：从 artist 对象中获取名字并显示。{' '}：一个空格，用于分隔艺术家名字和按钮。
   //onClick={() => { ... }}：为按钮的点击事件绑定一个回调函数，当按钮被点击时会执行该函数。
   //setArtists(artists.filter(a => a.id !== artist.id)):回调函数的内容，当按钮被点击时执行。setArtists(...)：调用 setArtists 函数更新 artists 状态。artists.filter(a => a.id !== artist.id)：过滤 artists 数组，移除 id 与当前艺术家 id 匹配的艺术家对象。artists.filter(...)：对 artists 数组进行过滤。a => a.id !== artist.id：过滤条件，保留 id 不等于当前艺术家 id 的对象。
   //就是说filter后的()内是留下来的条件
}
点击“删除”按钮几次，并且查看按钮处理点击事件的代码。

setArtists(
  artists.filter(a => a.id !== artist.id)
);
这里，artists.filter(s => s.id !== artist.id) 表示“创建一个新的数组，该数组由那些 ID 与 artists.id 不同的 artists 组成”。换句话说，每个 artist 的“删除”按钮会把 那一个 artist 从原始数组中过滤掉，并使用过滤后的数组再次进行渲染。注意，filter 并不会改变原始数组。
```

```js
//转换数组 
如果你想改变数组中的某些或全部元素，你可以用 map() 创建一个新数组。你传入 map 的函数决定了要根据每个元素的值或索引（或二者都要）对元素做何处理。

在下面的例子中，一个数组记录了两个圆形和一个正方形的坐标。当你点击按钮时，仅有两个圆形会向下移动 100 像素。这是通过使用 map() 生成一个新数组实现的。
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 不作改变
        return shape;
      } else {
        // 返回一个新的圆形，位置在下方 50px 处
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // 使用新的数组进行重渲染
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        所有圆形向下移动！
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}

```

```js
//替换数组中的元素 
想要替换数组中一个或多个元素是非常常见的。类似 arr[0] = 'bird' 这样的赋值语句会直接修改原始数组，所以在这种情况下，你也应该使用 map。

要替换一个元素，请使用 map 创建一个新数组。在你的 map 回调里，第二个参数是元素的索引。使用索引来判断最终是返回原始的元素（即回调的第一个参数）还是替换成其他值：
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 递增被点击的计数器数值
        return c + 1;
      } else {
        // 其余部分不发生变化
        return c;
      }
      //该代码用于创建一个新数组，将指定索引位置的计数器值递增1，其余保持不变。
      //使用 map 函数遍历 counters 数组，为每个元素创建一个新的数组。c：当前遍历的计数器值。i：当前遍历的计数器索引。

      //通过遍历 counters 数组，创建一个新数组 nextCounters。在新数组中，只有与指定索引 index 相匹配的计数器值会增加 1，其他计数器值保持不变。这种方式确保了原始数组 counters 不被修改，而是返回一个新的数组来反映变化。
      // map示例 const numbers = [10, 20, 30, 40];
      // const incrementedNumbers = numbers.map((num, index) => { return num + index;});
      // console.log(incrementedNumbers);//10,21,32,43
    });

    //就是说点了以后,这个函数用来检测'索引号'是不是一样,一样就加一\即数组中你点的那个相关的数加一
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
  //使用 JavaScript 的 map 函数遍历 counters 数组，为每个计数器值 counter 创建一个新的列表项。counter：当前遍历的计数器值。i：当前计数器的索引。

  //用于显示一个计数器列表，并为每个计数器提供一个递增按钮。\ 使用 React 框架，通过遍历 counters 数组，为每个计数器值创建一个包含计数器值和一个“+1”按钮的列表项。当用户点击“+1”按钮时，会触发 onClick 事件处理函数，调用 handleIncrementClick 函数并传入当前计数器的索引 i，以便递增该计数器的值。
}

```

```js
//向数组中插入元素 
有时，你也许想向数组特定位置插入一个元素，这个位置既不在数组开头，也不在末尾。为此，你可以将数组展开运算符 ... 和 slice() 方法一起使用。slice() 方法让你从数组中切出“一片”。为了将元素插入数组，你需要先展开原数组在插入点之前的切片，然后插入新元素，最后展开原数组中剩下的部分。

下面的例子中，插入按钮总是会将元素插入到数组中索引为 1 的位置。
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // 可能是任何索引...可以自己在沙箱里面试,=4的话会很有趣,从中看逻辑
    const nextArtists = [
      // 插入点之前的元素： 使用扩展运算符 ... 展开 artists 数组中从索引 0 到 insertAt（不包括 insertAt）的所有元素。artists.slice(0, insertAt) 返回从索引 0 到 insertAt（不包括 insertAt）的子数组。
      ...artists.slice(0, insertAt),
      // 新的元素： 插入一个新的艺术家对象，其中 id 为 nextId++（假设 nextId 是一个全局变量，每次使用后自增），name 为当前组件状态中的 name。
      { id: nextId++, name: name },
      // 插入点之后的元素： 使用扩展运算符 ... 展开 artists 数组中从索引 insertAt 开始到数组末尾的所有元素。  artists.slice(insertAt) 返回从 insertAt 开始到数组末尾的子数组。
      ...artists.slice(insertAt)
    ];

    setArtists(nextArtists); //使用 setArtists 更新 artists 的状态，将 nextArtists 赋值给新的 artists 状态。
    setName('');//使用 setName 更新 name 的状态，将其重置为空字符串，通常用于清空输入字段。
  }

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        插入
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```js
//其他改变数组的情况 
总会有一些事，是你仅仅依靠展开运算符和 map() 或者 filter() 等不会直接修改原值的方法所无法做到的。例如，你可能想翻转数组，或是对数组排序。而 JavaScript 中的 reverse() 和 sort() 方法会改变原数组，所以你无法直接使用它们。

然而，你可以先拷贝这个数组，再改变这个拷贝后的值。

例如：
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        翻转
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
在这段代码中，你先使用 [...list] 展开运算符创建了一份数组的拷贝值。当你有了这个拷贝值后，你就可以使用像 nextList.reverse() 或 nextList.sort() 这样直接修改原数组的方法。你甚至可以通过 nextList[0] = "something" 这样的方式对数组中的特定元素进行赋值。

然而，即使你拷贝了数组，你还是不能直接修改其内部的元素。这是因为数组的拷贝是浅拷贝——新的数组中依然保留了与原始数组相同的元素。因此，如果你修改了拷贝数组内部的某个对象，其实你正在直接修改当前的 state。举个例子，像下面的代码就会带来问题。

const nextList = [...list];
nextList[0].seen = true; // 问题：直接修改了 list[0] 的值
setList(nextList);
虽然 nextList 和 list 是两个不同的数组，nextList[0] 和 list[0] 却指向了同一个对象。因此，通过改变 nextList[0].seen，list[0].seen 的值也被改变了。这是一种 state 的 mutation 操作，你应该避免这么做！你可以用类似于 更新嵌套的 JavaScript 对象 的方式解决这个问题——拷贝想要修改的特定元素，而不是直接修改它。下面是具体的操作。
```

```js
//更新数组内部的对象 
对象并不是 真的 位于数组“内部”。可能他们在代码中看起来像是在数组“内部”，但其实数组中的每个对象都是这个数组“指向”的一个存储于其它位置的值。这就是当你在处理类似 list[0] 这样的嵌套字段时需要格外小心的原因。其他人的艺术品清单可能指向了数组的同一个元素！

当你更新一个嵌套的 state 时，你需要从想要更新的地方创建拷贝值，一直这样，直到顶层。 让我们看一下这该怎么做。

在下面的例子中，两个不同的艺术品清单有着相同的初始 state。他们本应该互不影响，但是因为一次 mutation，他们的 state 被意外地共享了，勾选一个清单中的事项会影响另外一个清单：
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  //用于切换某个艺术品的“已见”状态，并更新列表.
  //定义一个名为 handleToggleMyList 的函数，当需要切换某个艺术品的“已见”状态时调用这个函数。参数 artworkId 是要更新的艺术品的 ID。参数 nextSeen 是新的“已见”状态（布尔值）。
  //创建一个 myNextList 常量，并使用扩展运算符 ... 来复制 myList 数组，以避免直接修改原数组，从而保持状态的不可变性。
  //使用 find 方法在 myNextList 数组中找到 ID 为 artworkId 的艺术品对象。a => a.id === artworkId 是一个箭头函数，检查每个艺术品对象的 id 是否等于 artworkId。
  //将找到的艺术品对象的 seen 属性更新为 nextSeen 的新值。
  //使用 setMyList 更新 myList 的状态，将 myNextList 赋值给新的 myList 状态。

  //当 handleToggleMyList 函数被调用时，它会：创建 myList 数组的一个副本 myNextList。在 myNextList 中找到 ID 为 artworkId 的艺术品对象。将该艺术品对象的 seen 属性更新为 nextSeen。使用 setMyList 函数将更新后的数组 myNextList 设置为新的 myList 状态。
  //这样做的好处是确保状态更新的过程是不可变的，这样可以避免直接修改状态带来的潜在问题，符合 React 的最佳实践。
  }

  function handleToggleYourList(artworkId, nextSeen) {
    //nextSeen 是传入的参数，用于指定某个艺术品的新“已见”状态。例如，如果你有一个“标记为已见”或“取消标记为已见”的功能，nextSeen 将会传递 true 或 false 来更新艺术品的状态。
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
    //一个 ItemList 组件，并将 myList 作为艺术品列表和 handleToggleMyList 作为切换回调函数传递给该组件。
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    //渲染一个包含艺术品列表的无序列表，每个艺术品有一个复选框来切换其“已见”状态。
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              //将复选框的选中状态绑定到 artwork.seen，即当前艺术品的“已见”状态。
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
                //调用 onToggle 函数，传入当前艺术品的 id 和复选框的最新状态 e.target.checked。
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
问题出在下面这段代码中:

const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // 问题：直接修改了已有的元素
setMyList(myNextList);
虽然 myNextList 这个数组是新的，但是其内部的元素本身与原数组 myList 是相同的。因此，修改 artwork.seen，其实是在修改原始的 artwork 对象。而这个 artwork 对象也被 yourList 使用，这样就带来了 bug。这样的 bug 可能难以想到，但好在如果你避免直接修改 state，它们就会消失。

你可以使用 map 在没有 mutation 的前提下将一个旧的元素替换成更新的版本。
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // 创建包含变更的*新*对象
    return { ...artwork, seen: nextSeen };
  } else {
    // 没有变更
    return artwork;
  }
}));
此处的 ... 是一个对象展开语法，被用来创建一个对象的拷贝.

通过这种方式，没有任何现有的 state 中的元素会被改变，bug 也就被修复了。
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // 创建包含变更的*新*对象
        return { ...artwork, seen: nextSeen };
      } else {
        // 没有变更
        return artwork;
      }
    }));
    //用于更新艺术品列表中指定艺术品的“已见”状态。
  }
  // 错误方法: function handleToggleMyList(artworkId, nextSeen) {
  //   const myNextList = [...myList];
  //   const artwork = myNextList.find(
  //     a => a.id === artworkId
  //   );
  //   artwork.seen = nextSeen;
  //   setMyList(myNextList);
  // }


  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // 创建包含变更的*新*对象
        return { ...artwork, seen: nextSeen };
      } else {
        // 没有变更
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
通常来讲，你应该只直接修改你刚刚创建的对象。如果你正在插入一个新的 artwork，你可以修改它，但是如果你想要改变的是 state 中已经存在的东西，你就需要先拷贝一份了。
```

```js
//使用 Immer 编写简洁的更新逻辑 
在没有 mutation 的前提下更新嵌套数组可能会变得有点重复。就像对对象一样:

通常情况下，你应该不需要更新处于非常深层级的 state 。如果你有此类需求，你或许需要调整一下数据的结构，让数据变得扁平一些。
如果你不想改变 state 的数据结构，你也许会更喜欢使用 Immer ，它让你可以继续使用方便的，但会直接修改原值的语法，并负责为你生成拷贝值。
下面是我们用 Immer 来重写的艺术愿望清单的例子：
//packsgejson
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
请注意!!!当使用 Immer 时，类似 artwork.seen = nextSeen 这种会产生 mutation 的语法不会再有任何问题了：!!!

updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
!!!这是因为你并不是在直接修改原始的 state，而是在修改 Immer 提供的一个特殊的 draft 对象!!!。同理，你也可以为 draft 的内容使用 push() 和 pop() 这些会直接修改原值的方法。

在幕后，Immer 总是会根据你对 draft 的修改来从头开始构建下一个 state。这使得你的事件处理程序非常的简洁，同时也不会直接修改 state。
```

```js
//摘要
你可以把数组放入 state 中，但你不应该直接修改它。
不要直接修改数组，而是创建它的一份 新的 拷贝，然后使用新的数组来更新它的状态。
你可以使用 [...arr, newItem] 这样的数组展开语法来向数组中添加元素。
你可以使用 filter() 和 map() 来创建一个经过过滤或者变换的数组。
你可以使用 Immer 来保持代码简洁。

```

```js
//第 1 个挑战 共 4 个挑战: 更新购物车中的商品 
填写 handleIncreaseClick 的逻辑，以便按下“+”时递增对应数字：
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
答案:你可以使用 map 函数创建一个新数组，然后使用 ... 对象展开语法为新数组创建一个变更后对象的拷贝值：
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}

```

```js
//第 2 个挑战 共 4 个挑战: 删除购物车中的商品 
现在购物车有了一个正常工作的“+”按钮，但是“-”按钮却没有任何作用。你需要为它添加一个事件处理程序，以便按下它时可以减少对应商品的 count。如果在数字为 1 时按下按钮，商品需要自动从购物车中移除。确保商品计数永远不出现 0。
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
答案:你可以先使用 map 生成一个新数组，然后使用 filter 移除 count 被设置为 0 的商品：
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  function handleDecreaseClick(productId) {
    let nextProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1
        };
      } else {
        return product;
      }
    });

    nextProducts = nextProducts.filter(p =>
      p.count > 0
    );//使用 filter 方法过滤 nextProducts 数组，仅保留 count 大于 0 的商品对象。更新 nextProducts，移除数量为零的商品。
    setProducts(nextProducts)
    //使用 setProducts 更新 products 的状态，将过滤后的 nextProducts 赋值给 products。
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => {
            handleDecreaseClick(product.id);
          }}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```js
//第 3 个挑战 共 4 个挑战: 使用不会直接修改原始值的方法修复 mutation 的问题 
在下面的例子中，App.js 中所有的事件处理程序都会产生 mutation。这导致编辑和删除待办事项的功能无法正常运行。使用不会直接修改原始值的方法重写 handleAddTodo、handleChangeTodo 和 handleDeleteTodo 这三个函数：
//appjs
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
//addtodojs
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>添加</button>
    </>
  )
}
//tasklistjs
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          保存
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          编辑
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        删除
      </button>
    </label>
  );
}
答案:在 handleAddTodo 中，你可以使用数组展开语法；在 handleChangeTodo 中，你可以使用 map 创建一个新数组；在 handleDeleteTodo 中，你可以使用 filter 创建一个新数组。现在列表可以正常工作了：
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
    //定义一个名为 handleAddTodo 的函数，用于添加新任务。
    //将新的任务对象添加到 todos 数组中，并为新任务分配唯一的 id。
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
    //定义一个名为 handleChangeTodo 的函数，用于修改现有任务。
    //使用 map 方法遍历 todos 数组，如果找到与 nextTodo ID 相同的任务，则用 nextTodo 替换之。
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
    //定义一个名为 handleDeleteTodo 的函数，用于删除任务。
    //使用 filter 方法遍历 todos 数组，过滤掉 ID 与 todoId 相同的任务
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}//这些组件和函数，用户可以在应用中添加、修改和删除任务，实现基本的任务管理功能。

//addtodojs
import { useState } from 'react';
export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  //创建一个输入框 <input>。placeholder="Add todo"：当输入框为空时显示占位符文本 "Add todo"。value={title}：将输入框的值绑定到 title 状态变量。onChange={e => setTitle(e.target.value)}：当输入框内容变化时，更新 title 状态为输入框的当前值。
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>添加</button>
    </>
  )
  //创建一个按钮 <button>，按钮上显示文本 "添加"。onClick={() => { ... }}：当按钮被点击时执行以下操作：setTitle('')：将 title 状态重置为空字符串。onAddTodo(title)：调用 onAddTodo 函数，并传递当前的 title 状态值，添加新的待办事项。
}//通过这个组件，用户可以输入新的待办事项并点击按钮将其添加到任务列表中。

//tasklistjs  定义了一个任务列表组件，允许用户查看、编辑、标记完成和删除任务。
import { useState } from 'react';

export default function TaskList({
  //定义并导出一个名为 TaskList 的函数组件。接收三个属性（props）：todos（任务列表数组）、onChangeTodo（处理任务变更的函数）和 onDeleteTodo（处理任务删除的函数）。
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
  //返回一个无序列表 <ul>。
  //遍历 todos 数组，为每个任务渲染一个列表项 <li>。
  //每个列表项包含一个 Task 组件，传递当前任务对象 todo 以及 onChangeTodo 和 onDeleteTodo 函数作为属性。
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  //声明一个变量 todoContent，用于存放任务内容的 JSX 元素。
  //检查 isEditing 状态，如果为 true，表示任务处于编辑模式。
  let todoContent;
  if (isEditing) {
    todoContent = (
      //如果任务处于编辑模式，渲染一个输入框和保存按钮。//输入框的值绑定到 todo.title，并在内容变化时调用 onChange 函数，更新任务的标题。//保存按钮点击时，将 isEditing 状态设置为 false，退出编辑模式。
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          保存
        </button>
      </>
    );
  } else {
    //如果任务不处于编辑模式，渲染任务标题和编辑按钮。//编辑按钮点击时，将 isEditing 状态设置为 true，进入编辑模式。
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          编辑
        </button>
      </>
    );
  }
  return (
    //返回一个 <label> 元素，包含任务的各个交互元素。//渲染一个复选框，表示任务是否完成。复选框的选中状态绑定到 todo.done。当复选框状态变化时，调用 onChange 函数，更新任务的完成状态。//渲染 todoContent，显示任务内容（编辑模式或普通模式）。//渲染一个删除按钮，点击时调用 onDelete 函数，删除当前任务。
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        删除
      </button>
    </label>
  );
}
```

```js
//第 4 个挑战 共 4 个挑战: 使用 Immer 修复 mutation 的问题 
下面的例子和上一个挑战的相同。这次，你需要使用 Immer 来修复 mutation 的问题。为了方便，useImmer 已经被引入了，你需要使用它来替换 todos 的 state 变量。
//packagejson
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
//addtodojs
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>添加</button>
    </>
  )
}
//tasklistjs
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          保存
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          编辑
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        删除
      </button>
    </label>
  );
}

答案:通过使用 Immer，只要你仅仅直接修改 Immer 提供给你的 draft 的一部分，你就可以以 mutation 的方式写代码。这里所有的 mutation 都在 draft 上执行，因此代码可以正常运行：
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
    //定义 handleAddTodo 函数，用于添加新任务。//接受一个参数 title，表示新任务的标题。//调用 updateTodos 函数，并传递一个回调函数，该回调函数接收一个草稿 draft。//在回调函数内部，向 draft 数组中添加一个新任务对象。新任务对象包含属性 id（使用 nextId 生成的唯一 ID 并递增）、title（新任务的标题）和 done（初始值为 false，表示任务未完成）。
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft => {
      const todo = draft.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    });
    //定义 handleChangeTodo 函数，用于修改现有任务。//接受一个参数 nextTodo，表示要更新的任务对象。//调用 updateTodos 函数，并传递一个回调函数，该回调函数接收一个草稿 draft。//在回调函数内部，使用 find 方法在 draft 数组中找到与 nextTodo.id 相同的任务对象 todo。//更新找到的任务对象 todo 的属性，使其 title 和 done 属性与 nextTodo 对应的属性值一致。
  }

  function handleDeleteTodo(todoId) {
    updateTodos(draft => {
      const index = draft.findIndex(t =>
        t.id === todoId
      );
      draft.splice(index, 1);
    });
    //定义 handleDeleteTodo 函数，用于删除任务。//接受一个参数 todoId，表示要删除的任务的 ID。//调用 updateTodos 函数，并传递一个回调函数，该回调函数接收一个草稿 draft。//在回调函数内部，使用 findIndex 方法在 draft 数组中找到与 todoId 相同的任务对象的索引 index。//使用 splice 方法从 draft 数组中删除该索引位置的任务对象。
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

## 状态管理

随着你的应用不断变大，更有意识的去关注应用状态如何组织，以及数据如何在组件之间流动会对你很有帮助。

冗余或重复的状态往往是缺陷的根源。

在本节中，你将学习如何组织好状态，如何保持状态更新逻辑的可维护性，以及如何跨组件共享状态。

本章节
如何将 UI 变更视为状态变更
如何组织好状态
如何使用“状态提升”在组件之间共享状态
如何控制状态的保留或重置
如何在函数中整合复杂的状态逻辑
如何避免数据通过 prop 逐级透传
如何随着应用的增长去扩展状态管理

### 用 State 响应输入

React 控制 UI 的方式是声明式的。你不必直接控制 UI 的各个部分，只需要声明组件可以处于的不同状态，并根据用户的输入在它们之间切换。这与设计师对 UI 的思考方式很相似。

你将会学习到
了解声明式 UI 编程与命令式 UI 编程有何不同
了解如何列举组件可能处于的不同视图状态
了解如何在代码中触发不同视图状态的变化

#### 声明式 UI 与命令式 UI 的比较

当你设计 UI 交互时，可能会去思考 UI 如何根据用户的操作而响应变化。想象一个让用户提交答案的表单：

当你向表单输入数据时，“提交”按钮会随之变成可用状态
当你点击“提交”后，表单和提交按钮都会随之变成不可用状态，并且会加载动画会随之出现
如果网络请求成功，表单会随之隐藏，同时“提交成功”的信息会随之出现
如果网络请求失败，错误信息会随之出现，同时表单又变为可用状态
在 命令式编程 中，以上的过程直接告诉你如何去实现交互。你必须去根据要发生的事情写一些明确的命令去操作 UI。对此有另一种理解方式，想象一下，当你坐在车里的某个人旁边，然后一步一步地告诉他该去哪。
他并不知道你想去哪，只想跟着命令行动。（并且如果你发出了错误的命令，那么你就会到达错误的地方）正因为你必须从加载动画到按钮地“命令”每个元素，所以这种告诉计算机如何去更新 UI 的编程方式被称为命令式编程

在这个命令式 UI 编程的例子中，表单没有使用 React 生成，而是使用原生的 DOM:

```js
//indexjs
async function handleFormSubmit(e) {
  //定义一个异步函数 handleFormSubmit，用于处理表单提交事件。阻止表单的默认提交行为，并禁用文本区域和按钮，显示加载消息，隐藏错误消息。尝试提交表单，如果成功，显示成功消息并隐藏表单；如果失败，显示错误消息。无论成功或失败，最后都会隐藏加载消息并重新启用文本区域和按钮。
  e.preventDefault();//调用 e.preventDefault() 阻止表单的默认提交行为，以便使用自定义的提交逻辑。
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);//调用 disable 函数禁用 textarea 和 button，防止用户在表单提交过程中修改内容或再次提交。//调用 show 函数显示 loadingMessage，向用户展示加载中的状态。//调用 hide 函数隐藏 errorMessage，清除任何先前的错误消息。
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
  //使用 try...catch...finally 语句处理异步表单提交逻辑。try 块中，等待 submitForm(textarea.value) 执行，提交表单内容。如果提交成功，调用 show 函数显示 successMessage，并调用 hide 函数隐藏 form。catch 块中，如果提交失败，调用 show 函数显示 errorMessage，并将错误消息设置为 err.message。finally 块中，无论提交成功或失败，调用 hide 函数隐藏 loadingMessage，并调用 enable 函数启用 textarea 和 button。
}

function handleTextareaChange() {
  //定义 handleTextareaChange 函数，用于处理文本区域的输入变化。如果文本区域为空，禁用按钮；否则启用按钮
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
  //定义 handleTextareaChange 函数，用于处理文本区域输入变化事件。如果 textarea 的内容长度为 0，调用 disable 函数禁用 button，否则调用 enable 函数启用 button。
}

//定义四个辅助函数用于显示和隐藏元素，启用和禁用元素。hide 函数设置元素的 display 样式为 none，隐藏元素。show 函数设置元素的 display 样式为空字符串，显示元素。enable 函数设置元素的 disabled 属性为 false，启用元素。disable 函数设置元素的 disabled 属性为 true，禁用元素。
function hide(el) {
  el.style.display = 'none';
  //定义 hide 函数，接收一个元素 el 作为参数。设置 el 的 display 样式为 none，隐藏该元素。
}
function show(el) {
  el.style.display = '';
  //定义 show 函数，接收一个元素 el 作为参数。设置 el 的 display 样式为空字符串，显示该元素。
}
function enable(el) {
  el.disabled = false;
  //定义 enable 函数，接收一个元素 el 作为参数。设置 el 的 disabled 属性为 false，启用该元素。
}
function disable(el) {
  el.disabled = true;
  //定义 disable 函数，接收一个元素 el 作为参数。设置 el 的 disabled 属性为 true，禁用该元素。
}

function submitForm(answer) {
  // Pretend it's hitting the network.  定义 submitForm 函数，模拟表单提交。返回一个 Promise，使用 setTimeout 模拟网络延迟。如果答案是 "istanbul"（忽略大小写），调用 resolve 表示成功；否则调用 reject，并传递错误消息。
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === 'istanbul') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      }
    }, 1500);
  });
  //定义 submitForm 函数，接收一个答案 answer 作为参数。//模拟网络请求，返回一个新的 Promise。使用 setTimeout 模拟 1.5 秒的延迟。如果答案为 "istanbul"（不区分大小写），调用 resolve() 表示提交成功。否则调用 reject(new Error('Good guess but a wrong answer. Try again!')) 表示提交失败，并传递错误消息。
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
//使用 document.getElementById 获取 DOM 元素，并赋值给相应的变量。设置表单的 onsubmit 事件处理函数为 handleFormSubmit。设置文本区域的 oninput 事件处理函数为 handleTextareaChange。

//整体流程解释:
// 用户在文本区域中输入答案。
// 根据输入内容，按钮是否启用动态变化。
// 用户点击提交按钮时，触发 handleFormSubmit 函数。
// 表单提交过程中显示加载状态并禁用输入。
// 模拟网络请求，如果答案正确，显示成功消息；否则显示错误消息。
// 无论成功或失败，最后都会重新启用输入并隐藏加载状态。

//indexhtml
<form id="form">

  <h2>City quiz</h2>

  <p>
    What city is located on two continents?
  </p>

  <textarea id="textarea"></textarea>

  <br />

  <button id="button" disabled>Submit</button>

  <p id="loading" style="display: none">Loading...</p>

  <p id="error" style="display: none; color: red;"></p>

</form>
<h1 id="success" style="display: none">That's right!</h1>
// 定义一个表单，并为其设置 id 为 "form"。<h2>City quiz</h2>: 表单的标题，显示 "City quiz"。<p>What city is located on two continents?</p>: 一个段落，包含问题 "What city is located on two continents?"。<textarea id="textarea"></textarea>: 一个多行文本输入框，用于用户输入答案，并设置 id 为 "textarea"。<br />: 换行符，用于在文本输入框和按钮之间添加换行。<button id="button" disabled>Submit</button>: 一个提交按钮，设置 id 为 "button" 并初始禁用。<p id="loading" style="display: none">Loading...</p>: 一个段落，用于显示加载消息，初始隐藏。<p id="error" style="display: none; color: red;"></p>: 一个段落，用于显示错误消息，初始隐藏并设置文本颜色为红色。<h1 id="success" style="display: none">That's right!</h1>: 一个标题，用于显示成功消息 "That's right!"，初始隐藏。
<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
</style>
对于独立系统来说，命令式地控制用户界面的效果也不错，但是当处于更加复杂的系统中时，这会造成管理的困难程度指数级地增长。如同示例一样，想象一下，当你想更新这样一个包含着不同表单的页面时，你想要添加一个新 UI 元素或一个新的交互，为了保证不会因此产生新的 bug（例如忘记去显示或隐藏一些东西），你必须十分小心地去检查所有已经写好的代码。

!!!React 正是为了解决这样的问题而诞生的。!!!

在 React 中，你不必直接去操作 UI —— 你不必直接启用、关闭、显示或隐藏组件。相反，你只需要 声明你想要显示的内容， React 就会通过计算得出该如何去更新 UI。想象一下，当你上了一辆出租车并且告诉司机你想去哪，而不是事无巨细地告诉他该如何走。将你带到目的地是司机的工作，他们甚至可能知道一些你没有想过并且不知道的捷径！
```

##### 声明式地考虑 UI

你已经从上面的例子看到如何去实现一个表单了，为了更好地理解如何在 React 中思考，接下来你将会学到如何用 React 重新实现这个 UI：

定位你的组件中不同的视图状态
确定是什么触发了这些 state 的改变
表示内存中的 state（需要使用 useState）
删除任何不必要的 state 变量
连接事件处理函数去设置 state
步骤 1：定位组件中不同的视图状态
在计算机科学中，你或许听过可处于多种“状态”之一的 “状态机”。如果你有与设计师一起工作，那么你可能已经见过不同“视图状态”的模拟图。正因为 React 站在设计与计算机科学的交点上，因此这两种思想都是灵感的来源。

首先，你需要去可视化 UI 界面中用户可能看到的所有不同的“状态”：

无数据：表单有一个不可用状态的“提交”按钮。
输入中：表单有一个可用状态的“提交”按钮。
提交中：表单完全处于不可用状态，加载动画出现。
成功时：显示“成功”的消息而非表单。
错误时：与输入状态类似，但会多错误的消息。
像一个设计师一样，你会想要在你添加逻辑之前去“模拟”不同的状态或创建“模拟状态”。例如下面的例子，这是一个对表单可视部分的模拟。这个模拟被一个 status 的属性控制，并且这个属性的默认值为 empty。

```js
//export default function Form({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}
你可以随意命名这个属性，名字并不重要。试着将 status = 'empty' 改为 status = 'success'，然后你就会看到成功的信息出现。模拟可以让你在书写逻辑前快速迭代 UI。这是同一组件的一个更加充实的原型，仍然由 status 属性“控制”：
export default function Form({
  // Try 'submitting', 'error', 'success':
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}

```

```js
//同时展示大量的视图状态:如果一个组件有多个视图状态，你可以很方便地将它们展示在一个页面中：
//appjs  根据不同的状态渲染多个表单组件，每个表单组件对应一个不同的状态。
import Form from './Form.js';

let statuses = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>

          <h4>Form ({status}):</h4>

          <Form status={status} />

        </section>
      ))}
    </>
  );
  //返回一个包含多个 <section> 元素的 React 片段（<>...</>）。
  //statuses.map(status => ( ... ))：遍历 statuses 数组，对每个状态 status 执行箭头函数。每次迭代生成一个 <section> 元素，并设置 key 为 status（唯一标识符）。在 <section> 内部，包含一个 <h4> 元素显示当前表单状态的标题，例如 "Form (empty):"。渲染 Form 组件，并传递 status 作为 props。
}

//formjs  组件根据传入的状态渲染不同内容的表单或消息
export default function Form({ status }) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <form>
      <textarea disabled={
        status === 'submitting'
      } />
      <br />

      <button disabled={
        status === 'empty' ||
        status === 'submitting'
      }>
        Submit
      </button>

      {status === 'error' &&
        <p className="Error">
          Good guess but a wrong answer. Try again!
        </p>
      }
    </form>
  );
  //如果 status 等于 'success'，则返回一个包含消息 "That's right!" 的 <h1> 元素，不渲染表单。
  //如果 status 为 'submitting'，则禁用文本区域（disabled 属性设置为 true）。
  //如果 status 为 'empty' 或 'submitting'，则禁用按钮（disabled 属性设置为 true）。
  //如果 status 为 'error'，则渲染一个 <p> 元素，类名为 "Error"，显示错误消息 "Good guess but a wrong answer. Try again!""。
}
```

```js
//步骤 2：确定是什么触发了这些状态的改变 
你可以触发 state 的更新来响应两种输入：

人为输入。比如点击按钮、在表单中输入内容，或导航到链接。
计算机输入。比如网络请求得到反馈、定时器被触发，或加载一张图片。
以上两种情况中，你必须设置 state 变量 去更新 UI。对于正在开发中的表单来说，你需要改变 state 以响应几个不同的输入：

改变输入框中的文本时（人为）应该根据输入框的内容是否是空值，从而决定将表单的状态从空值状态切换到输入中或切换回原状态。
点击提交按钮时（人为）应该将表单的状态切换到提交中的状态。
网络请求成功后（计算机）应该将表单的状态切换到成功的状态。
网络请求失败后（计算机）应该将表单的状态切换到失败的状态，与此同时，显示错误信息。

注意
注意，人为输入通常需要 事件处理函数！
为了可视化这个流程，请尝试在纸上画出圆形标签以表示每个状态，两个状态之间的改变用箭头表示。你可以像这样画出很多流程并且在写代码前解决许多 bug。
```

!!!此处插入图react12

```js
//步骤 3：通过 useState 表示内存中的 state
接下来你会需要在内存中通过 useState 表示组件中的视图状态。诀窍很简单：state 的每个部分都是“处于变化中的”，并且你需要让“变化的部分”尽可能的少。更复杂的程序会产生更多 bug！

先从绝对必须存在的状态开始。例如，你需要存储输入的 answer 以及用于存储最后一个错误的 error （如果存在的话）：

const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
接下来，你需要一个状态变量来代表你想要显示的那个可视状态。通常有多种方式在内存中表示它，因此你需要进行实验。

如果你很难立即想出最好的办法，那就先从添加足够多的 state 开始，确保所有可能的视图状态都囊括其中：

const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
你最初的想法或许不是最好的，但是没关系，重构 state 也是步骤中的一部分！
```

```js
//步骤 4：删除任何不必要的 state 变量 
你会想要避免 state 内容中的重复，从而只需要关注那些必要的部分。花一点时间来重构你的 state 结构，会让你的组件更容易被理解，减少重复并且避免歧义。你的目的是防止出现在内存中的 state 不代表任何你希望用户看到的有效 UI 的情况。（比如你绝对不会想要在展示错误信息的同时禁用掉输入框，导致用户无法纠正错误！）

这有一些你可以问自己的， 关于 state 变量的问题：

这个 state 是否会导致矛盾？例如，isTyping 与 isSubmitting 的状态不能同时为 true。矛盾的产生通常说明了这个 state 没有足够的约束条件。两个布尔值有四种可能的组合，但是只有三种对应有效的状态。为了将“不可能”的状态移除，你可以将他们合并到一个 'status' 中，它的值必须是 'typing'、'submitting' 以及 'success' 这三个中的一个。
相同的信息是否已经在另一个 state 变量中存在？另一个矛盾：isEmpty 和 isTyping 不能同时为 true。通过使它们成为独立的 state 变量，可能会导致它们不同步并导致 bug。幸运的是，你可以移除 isEmpty 转而用 message.length === 0。
你是否可以通过另一个 state 变量的相反值得到相同的信息？isError 是多余的，因为你可以检查 error !== null。
在清理之后，你只剩下 3 个（从原本的 7 个！）必要的 state 变量：

const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
正是因为你不能在不破坏功能的情况下删除其中任何一个状态变量，因此你可以确定这些都是必要的。步骤 4：删除任何不必要的 state 变量 
你会想要避免 state 内容中的重复，从而只需要关注那些必要的部分。花一点时间来重构你的 state 结构，会让你的组件更容易被理解，减少重复并且避免歧义。你的目的是防止出现在内存中的 state 不代表任何你希望用户看到的有效 UI 的情况。（比如你绝对不会想要在展示错误信息的同时禁用掉输入框，导致用户无法纠正错误！）

这有一些你可以问自己的， 关于 state 变量的问题：

这个 state 是否会导致矛盾？例如，isTyping 与 isSubmitting 的状态不能同时为 true。矛盾的产生通常说明了这个 state 没有足够的约束条件。两个布尔值有四种可能的组合，但是只有三种对应有效的状态。为了将“不可能”的状态移除，你可以将他们合并到一个 'status' 中，它的值必须是 'typing'、'submitting' 以及 'success' 这三个中的一个。
相同的信息是否已经在另一个 state 变量中存在？另一个矛盾：isEmpty 和 isTyping 不能同时为 true。通过使它们成为独立的 state 变量，可能会导致它们不同步并导致 bug。幸运的是，你可以移除 isEmpty 转而用 message.length === 0。
你是否可以通过另一个 state 变量的相反值得到相同的信息？isError 是多余的，因为你可以检查 error !== null。
在清理之后，你只剩下 3 个（从原本的 7 个！）必要的 state 变量：

const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
正是因为你不能在不破坏功能的情况下删除其中任何一个状态变量，因此你可以确定这些都是必要的。

通过 reducer 来减少“不可能” state :尽管这三个变量对于表示这个表单的状态来说已经足够好了，仍然是有一些中间状态并不是完全有意义的。例如一个非空的 error 当 status 的值为 success 时没有意义。为了更精确地模块化状态，你可以 将状态提取到一个 reducer 中。Reducer 可以让您合并多个状态变量到一个对象中并巩固所有相关的逻辑！
```

```js
//步骤 5：连接事件处理函数以设置 state 
最后，创建事件处理函数去设置 state 变量。下面是绑定好事件的最终表单：  该组件实现了一个包含文本区域和提交按钮的问答表单，根据用户输入判断答案是否正确。
用户输入答案并提交表单，表单会模拟网络请求检查答案，如果答案正确，显示成功消息；否则，显示错误消息并允许重新输入答案。
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
    //定义异步函数 handleSubmit 处理表单提交事件：调用 e.preventDefault() 阻止默认表单提交行为。将状态设置为 'submitting'。尝试异步提交表单（模拟网络请求），如果成功，设置状态为 'success'，否则设置状态为 'typing' 并记录错误信息。
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
    //定义 handleTextareaChange 函数，处理文本区域的输入变化：更新 answer 状态为文本区域的当前值。
  }

  return (
    <>
      <h2>City quiz</h2>

      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />

        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>

        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
  //返回一个包含问答内容的 JSX 结构：显示问答标题和问题。渲染表单，绑定 onSubmit 事件处理函数 handleSubmit。文本区域绑定 value 和 onChange 事件处理函数 handleTextareaChange，
  //当状态为 'submitting' 时禁用文本区域。按钮在答案为空或状态为 'submitting' 时禁用。
  //条件渲染错误消息，如果 error 不为空，则显示错误信息。
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
    //定义模拟网络请求的 submitForm 函数：返回一个新的 Promise，在 1.5 秒后判断答案是否正确。如果答案不是 'lima'（忽略大小写），则拒绝 Promise 并返回错误信息；否则，解决 Promise。
  });
}
尽管这些代码相对与最初的命令式的例子来说更长，但是却更加健壮。将所有的交互变为 state 的改变，可以让你避免之后引入新的视图状态后导致现有 state 被破坏。同时也使你在不必改变交互逻辑的情况下，更改每个状态对应的 UI。
```

```js
//摘要
声明式编程意味着为每个视图状态声明 UI 而非细致地控制 UI（命令式）。
当开发一个组件时：
写出你的组件中所有的视图状态。
确定是什么触发了这些 state 的改变。
通过 useState 模块化内存中的 state。
删除任何不必要的 state 变量。
连接事件处理函数去设置 state。
```

```js
//第 1 个挑战 共 3 个挑战: 添加和删除一个 CSS class 
尝试实现当点击图片时删除外部 <div> 的 CSS class background--active，并将 picture--active 的 CSS class 添加到 <img> 上。当再次点击背景图片时将恢复最开始的 CSS class。

视觉上，你应该期望当点击图片时会移除紫色的背景，并且高亮图片的边框。点击图片外面时高亮背景并且删除图片边框的高亮效果。
export default function Picture() {
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
答案:
这个组件有两个视图状态：当图片处于激活状态时以及当图片处于非激活状态时：

当图片处于激活状态时，CSS class 是 background 和 picture picture--active。
当图片处于非激活状态时，CSS class 是 background background--active 和 picture。
一个布尔类型的 state 已经足够表示图片是否处于激活状态。最初的工作仅仅是移除或添加 CSS class。然而在 React 中你需要去描述什么是你想要看到的而非操作 UI 元素。因此你需要基于当前 state 去计算这两个 CSS class。同时你需要去 阻止冒泡行为，只有这样点击图片的时候不会触发点击背景的回调。

通过点击图片然后点击图片外围来确定这个版本可用：
import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = 'background';
  let pictureClassName = 'picture';
  if (isActive) {
    pictureClassName += ' picture--active';
  } else {
    backgroundClassName += ' background--active';
    //定义两个变量 backgroundClassName 和 pictureClassName，分别存储背景和图片的 CSS 类名。
    //根据 isActive 状态的值，动态更新这些类名：如果 isActive 为 true，则给 pictureClassName 添加 picture--active 类。如果 isActive 为 false，则给 backgroundClassName 添加 background--active 类。(' picture--active': 这是一个字符串，表示一个 CSS 类名，前面有一个空格，目的是与之前的类名正确地分隔开。)将右边的字符串 ' picture--active' 追加到 pictureClassName 变量的现有值中。由于 pictureClassName 初始值是 'picture'，追加后的结果是 'picture picture--active'。
  }

  return (
    <div
      className={backgroundClassName}
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={e => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
    //在 <div> 内部，包含一个 <img> 元素：
    //点击该图片时，会触发一个事件处理函数：调用 e.stopPropagation() 阻止事件冒泡，以防点击图片时触发父元素 <div> 的点击事件。将 isActive 状态设置为 true。
    //图片的 className 为 pictureClassName。alt 属性和 src 属性分别定义图片的替代文本和来源 URL。
  );
}
或者，你可以返回两个单独的 JSX 代码块：
import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);
  if (isActive) {
    return (
      <div
        className="background"
        onClick={() => setIsActive(false)}
      >
        <img
          className="picture picture--active"
          alt="Rainbow houses in Kampung Pelangi, Indonesia"
          src="https://i.imgur.com/5qwVYb1.jpeg"
          onClick={e => e.stopPropagation()}
        />
      </div>
      //如果 isActive 为 true，返回一个包含以下内容的 JSX 结构：一个 <div> 元素，其 className 为 "background"，点击时将 isActive 状态设置为 false。
      //在 <div> 内部，包含一个 <img> 元素：图片的 className 为 "picture picture--active"，表示图片在活跃状态。alt 属性和 src 属性分别定义图片的替代文本和来源 URL。点击图片时调用 e.stopPropagation() 方法，阻止事件冒泡，以防点击图片时触发父元素 <div> 的点击事件。
    );
  }
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={() => setIsActive(true)}
      />
    </div>
  );
}
请记住，如果两个不同的 JSX 代码块描述着相同的树结构，它们的嵌套（第一个 <div> → 第一个 <img>）必须对齐。否则切换 isActive 会再次在后面创建整个树结构并且 重置 state。这也就是为什么当一个相似的 JSX 树结构在两个情况下都返回的时候，最好将它们写成一个单独的 JSX。
```

### 选择 State 结构

构建良好的 state 可以让组件变得易于修改和调试，而不会经常出错。以下是你在构建 state 时应该考虑的一些建议。

你将会学习到
使用单个 state 变量还是多个 state 变量
组织 state 时应避免的内容
如何解决 state 结构中的常见问题

#### 构建 state 的原则

什么叫不关联的;什么叫矛盾的;什么叫冗余的;什么叫重复的;什么叫深度嵌套的

```js
不关联的状态 (Unrelated State)
不关联的状态指的是在同一个组件中管理的状态变量，它们之间没有任何直接的关系或依赖。

const [username, setUsername] = useState('');
const [age, setAge] = useState(0);

- `username` 和 `age` 是两个不相关的状态变量，因为一个是字符串（用户名），另一个是数字（年龄），它们之间没有直接联系。

矛盾的状态 (Contradictory State)
矛盾的状态是指在同一个组件中管理的状态变量，它们之间存在逻辑上的冲突或不一致。

const [isOnline, setIsOnline] = useState(true);
const [lastSeen, setLastSeen] = useState('10 minutes ago');

- `isOnline` 表示用户当前在线，但 `lastSeen` 却表示用户最后一次在线是10分钟前，这两个状态是矛盾的。

冗余的状态 (Redundant State)
冗余的状态是指可以通过计算或派生得到的状态，但却被显式地存储在状态中。

const [price, setPrice] = useState(100);
const [quantity, setQuantity] = useState(2);
const [total, setTotal] = useState(200); // 冗余状态

- `total` 是 `price` 和 `quantity` 的乘积，可以通过计算得到，因此是冗余的状态。

重复的状态 (Duplicated State)
重复的状态指的是在同一个或不同的组件中重复存储相同的数据。

const [username, setUsername] = useState('john_doe');
const [user, setUser] = useState({ username: 'john_doe', age: 30 }); // 重复状态

- `username` 在 `username` 和 `user` 中都存储了一遍，这是重复的状态。

深度嵌套的状态 (Deeply Nested State)
深度嵌套的状态是指状态对象结构非常复杂，包含了多层嵌套的属性。

const [state, setState] = useState({
  user: {
    personalInfo: {
      name: 'John',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        postalCode: '12345'
      }
    }
  }
});

- `address` 被嵌套在 `personalInfo` 中，而 `personalInfo` 又被嵌套在 `user` 中，这就是深度嵌套的状态。
```

当你编写一个存有 state 的组件时，你需要选择使用多少个 state 变量以及它们都是怎样的数据格式。尽管选择次优的 state 结构下也可以编写正确的程序，但有几个原则可以指导您做出更好的决策：

合并关联的 state。如果你总是同时更新两个或更多的 state 变量，请考虑将它们合并为一个单独的 state 变量。
避免互相矛盾的 state。当 state 结构中存在多个相互矛盾或“不一致”的 state 时，你就可能为此会留下隐患。应尽量避免这种情况。
避免冗余的 state。如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应将这些信息放入该组件的 state 中。
避免重复的 state。当同一数据在多个 state 变量之间或在多个嵌套对象中重复时，这会很难保持它们同步。应尽可能减少重复。
避免深度嵌套的 state。深度分层的 state 更新起来不是很方便。如果可能的话，最好以扁平化方式构建 state。
这些原则背后的目标是 使 state 易于更新而不引入错误。从 state 中删除冗余和重复数据有助于确保所有部分保持同步。这类似于数据库工程师想要 “规范化”数据库结构，以减少出现错误的机会。用爱因斯坦的话说，“让你的状态尽可能简单，但不要过于简单。”

现在让我们来看看这些原则在实际中是如何应用的。

#### 合并关联的 state

有时候你可能会不确定是使用单个 state 变量还是多个 state 变量。

你会像下面这样做吗？

const [x, setX] = useState(0);
const [y, setY] = useState(0);
或这样？

const [position, setPosition] = useState({ x: 0, y: 0 });
从技术上讲，你可以使用其中任何一种方法。但是，如果某两个 state 变量总是一起变化，则将它们统一成一个 state 变量可能更好。这样你就不会忘记让它们始终保持同步，就像下面这个例子中，移动光标会同时更新红点的两个坐标：

```js
//import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  )
}
另一种情况是，你将数据整合到一个对象或一个数组中时，你不知道需要多少个 state 片段。例如，当你有一个用户可以添加自定义字段的表单时，这将会很有帮助。

陷阱:  如果你的 state 变量是一个对象时，请记住，你不能只更新其中的一个字段 而不显式复制其他字段。例如，在上面的例子中，你不能写成 setPosition({ x: 100 })，因为它根本就没有 y 属性! 相反，如果你想要仅设置 x，则可执行 setPosition({ ...position, x: 100 })，或将它们分成两个 state 变量，并执行 setX(100)。
```

#### 避免矛盾的state

下面是带有 isSending 和 isSent 两个 state 变量的酒店反馈表单：

```js
//import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
//     定义异步函数 handleSubmit 处理表单提交事件：
// e.preventDefault(): 阻止表单的默认提交行为。
// setStatus('sending'): 将状态设置为 'sending' 表示正在发送。
// await sendMessage(text): 模拟发送消息的异步操作。
// setStatus('sent'): 消息发送完成后，将状态设置为 'sent'。
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// 假装发送一条消息。
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
尽管这段代码是有效的，但也会让一些 state “极难处理”。例如，如果你忘记同时调用 setIsSent 和 setIsSending，则可能会出现 isSending 和 isSent 同时为 true 的情况。你的组件越复杂，你就越难理解发生了什么。

因为 isSending 和 isSent 不应同时为 true，所以最好用一个 status 变量来代替它们，这个 state 变量可以采取三种有效状态其中之一：'typing' (初始), 'sending', 和 'sent':
//改后的:
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
// 定义异步函数 handleSubmit 处理表单提交事件：
// e.preventDefault(): 阻止表单的默认提交行为。
// setStatus('sending'): 将状态设置为 'sending' 表示正在发送。
// await sendMessage(text): 模拟发送消息的异步操作。
// setStatus('sent'): 消息发送完成后，将状态设置为 'sent'。
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';//定义两个常量 isSending 和 isSent，分别用于检查当前状态是否为 'sending' 或 'sent'。
//就是说逻辑上的矛盾可以另立判断式来巧妙化解,是的不同状态之间联系,而不会出现state没有管理\及时调整到的情况
  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }
  //如果状态为 'sent'，返回一条感谢消息 <h1>Thanks for feedback!</h1>。

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
  //如果状态不为 'sent'，返回表单：<form onSubmit={handleSubmit}>: !!!表单提交时调用 handleSubmit 函数!!!。
//<textarea> 元素：disabled={isSending}: 在发送过程中禁用文本区域。value={text}: 绑定到 text 状态。onChange={e => setText(e.target.value)}: 当用户输入时更新 text 状态。
//<button> 元素：disabled={isSending}: 在发送过程中禁用按钮。type="submit": 按钮类型为提交。
//{isSending && <p>Sending...</p>}: 如果正在发送，显示发送中的消息。
}

// 假装发送一条消息。
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

你仍然可以声明一些常量，以提高可读性：

const isSending = status === 'sending';
const isSent = status === 'sent';
但它们不是 state 变量，所以你不必担心它们彼此失去同步。
```

#### 避免冗余的 state

如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应该把这些信息放到该组件的 state 中。

例如，以这个表单为例。它可以运行，但你能找到其中任何冗余的 state 吗？

```js
//import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
这个表单有三个 state 变量：firstName、lastName 和 fullName。然而，fullName 是多余的。在渲染期间，你始终可以从 firstName 和 lastName 中计算出 fullName，因此需要把它从 state 中删除。

你可以这样做：
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
这里的 fullName 不是 一个 state 变量。相反，它是在渲染期间中计算出的：

const fullName = firstName + ' ' + lastName;
因此，更改处理程序不需要做任何特殊操作来更新它。当你调用 setFirstName 或 setLastName 时，你会触发一次重新渲染，然后下一个 fullName 将从新数据中计算出来。

不要在 state 中镜像 props :什么意思???
prop=properties  

以下代码是体现 state 冗余的一个常见例子：

function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);//创建了一个名为 color 的状态变量并将其初始值设置为 messageColor
这里，一个 color state 变量被初始化为 messageColor 的 prop 值。这段代码的问题在于，如果父组件稍后传递不同的 messageColor 值（例如，将其从 'blue' 更改为 'red'），则 color state 变量将不会更新！ state 仅在第一次渲染期间初始化。

这就是为什么在 state 变量中，“镜像”一些 prop 属性会导致混淆的原因。相反，你要在代码中直接使用 messageColor 属性。如果你想给它起一个更短的名称，请使用常量：

function Message({ messageColor }) {
  const color = messageColor;
这种写法就不会与从父组件传递的属性失去同步。

只有当你 想要 忽略特定 props 属性的所有更新时，将 props “镜像”到 state 才有意义。按照惯例，prop 名称以 initial 或 default 开头，以阐明该 prop 的新值将被忽略：

function Message({ initialColor }) {
  // 这个 `color` state 变量用于保存 `initialColor` 的 **初始值**。
  // 对于 `initialColor` 属性的进一步更改将被忽略。
  const [color, setColor] = useState(initialColor);
```

#### 避免重复的 state

下面这个菜单列表组件可以让你在多种旅行小吃中选择一个：

```js
//import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
当前，它将所选元素作为对象存储在 selectedItem state 变量中。然而，这并不好：selectedItem 的内容与 items 列表中的某个项是同一个对象。 这意味着关于该项本身的信息在两个地方产生了重复。

为什么这是个问题？让我们使每个项目都可以编辑：
//定义了一个菜单组件，允许用户选择和编辑列表中的项目，并显示选中的项目。
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );//初始值为 items 数组中的第一个项目，

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        //检查当前项目的 id 是否与传入的 id 匹配
        return {
          ...item,
          title: e.target.value,
          //如果匹配，则返回一个新的项目对象，更新其 title 属性为输入框的值。
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => (
          //创建一个列表，映射 items 数组中的每个项目，使用 item.id 作为键。
          //item: 数组中的当前元素。在这段代码中，item 代表一个包含 title 和 id 属性的对象。index: 当前元素在数组中的索引位置。虽然在这段代码中没有用到 index，但它仍然可以被传递和使用。

          //创建一个输入框，值为项目的标题，并在其值更改时调用 handleItemChange 函数。
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
请注意，如果你首先单击菜单上的“Choose” 然后 编辑它，输入会更新，但底部的标签不会反映编辑内容。 这是因为你有重复的 state，并且你忘记更新了 selectedItem。

尽管你也可以更新 selectedItem，但更简单的解决方法是消除重复项。在下面这个例子中，你将 selectedId 保存在 state 中，而不是在 selectedItem 对象中（它创建了一个与 items 内重复的对象），然后 通过搜索 items 数组中具有该 ID 的项，以此获取 selectedItem：
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
state 过去常常是这样复制的：

items = [{ id: 0, title: 'pretzels'}, ...]
selectedItem = {id: 0, title: 'pretzels'}
改了之后是这样的：

items = [{ id: 0, title: 'pretzels'}, ...]
selectedId = 0
重复的 state 没有了，你只保留了必要的 state！

现在，如果你编辑 selected 元素，下面的消息将立即更新。这是因为 setItems 会触发重新渲染，而 items.find(...) 会找到带有更新文本的元素。你不需要在 state 中保存 选定的元素，因为只有 选定的 ID 是必要的。其余的可以在渲染期间计算。
```

#### 避免深度嵌套的 state

想象一下，一个由行星、大陆和国家组成的旅行计划。你可能会尝试使用嵌套对象和数组来构建它的 state，就像下面这个例子：

```js
//appjs
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map(place => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}
//placesjs
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: [{
        id: 11,
        title: 'Argentina',
        childPlaces: []
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: []
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: []
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: []
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: []
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: []
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: []
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: []
      }]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: [{
        id: 20,
        title: 'China',
        childPlaces: []
      }, {
        id: 21,
        title: 'India',
        childPlaces: []
      }, {
        id: 22,
        title: 'Singapore',
        childPlaces: []
      }, {
        id: 23,
        title: 'South Korea',
        childPlaces: []
      }, {
        id: 24,
        title: 'Thailand',
        childPlaces: []
      }, {
        id: 25,
        title: 'Vietnam',
        childPlaces: []
      }]
    }, {
      id: 26,
      title: 'Europe',
      childPlaces: [{
        id: 27,
        title: 'Croatia',
        childPlaces: [],
      }, {
        id: 28,
        title: 'France',
        childPlaces: [],
      }, {
        id: 29,
        title: 'Germany',
        childPlaces: [],
      }, {
        id: 30,
        title: 'Italy',
        childPlaces: [],
      }, {
        id: 31,
        title: 'Portugal',
        childPlaces: [],
      }, {
        id: 32,
        title: 'Spain',
        childPlaces: [],
      }, {
        id: 33,
        title: 'Turkey',
        childPlaces: [],
      }]
    }, {
      id: 34,
      title: 'Oceania',
      childPlaces: [{
        id: 35,
        title: 'Australia',
        childPlaces: [],
      }, {
        id: 36,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: [],
      }, {
        id: 37,
        title: 'Easter Island (Chile)',
        childPlaces: [],
      }, {
        id: 38,
        title: 'Fiji',
        childPlaces: [],
      }, {
        id: 39,
        title: 'Hawaii (the USA)',
        childPlaces: [],
      }, {
        id: 40,
        title: 'New Zealand',
        childPlaces: [],
      }, {
        id: 41,
        title: 'Vanuatu',
        childPlaces: [],
      }]
    }]
  }, {
    id: 42,
    title: 'Moon',
    childPlaces: [{
      id: 43,
      title: 'Rheita',
      childPlaces: []
    }, {
      id: 44,
      title: 'Piccolomini',
      childPlaces: []
    }, {
      id: 45,
      title: 'Tycho',
      childPlaces: []
    }]
  }, {
    id: 46,
    title: 'Mars',
    childPlaces: [{
      id: 47,
      title: 'Corn Town',
      childPlaces: []
    }, {
      id: 48,
      title: 'Green Hill',
      childPlaces: []      
    }]
  }]
};

```

现在，假设你想添加一个按钮来删除一个你已经去过的地方。你会怎么做呢？更新嵌套的 state 需要从更改部分一直向上复制对象。删除一个深度嵌套的地点将涉及复制其整个父级地点链。这样的代码可能非常冗长。

如果 state 嵌套太深，难以轻松更新，可以考虑将其“扁平化”。 这里有一个方法可以重构上面这个数据。不同于树状结构，每个节点的 place 都是一个包含 其子节点 的数组，你可以让每个节点的 place 作为数组保存 其子节点的 ID。然后存储一个节点 ID 与相应节点的映射关系。

这个数据重组可能会让你想起看到一个数据库表：

```js
//appjs
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              placesById={placesById}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            placesById={plan}
          />
        ))}
      </ol>
    </>
  );
}
//placesjs
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
```

现在 state 已经“扁平化”（也称为“规范化”），更新嵌套项会变得更加容易。

现在要删除一个地点，您只需要更新两个 state 级别：

其 父级 地点的更新版本应该从其 childIds 数组中排除已删除的 ID。
其根级“表”对象的更新版本应包括父级地点的更新版本。
下面是展示如何处理它的一个示例：

```js
//appjs  实现了一个可以递归标记旅游计划中已完成地点的列表。
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    //parentId 参数是从父组件传递给子组件的。这是通过在递归调用 PlaceTree 组件时传递 parentId 属性实现的。
    //从 plan 状态中根据 parentId 获取父节点对象，并将其赋值给 parent 变量。
    // 创建一个其父级地点的新版本, 但不包括子级 ID。
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
        //创建一个新的父节点对象 nextParent，它是父节点对象 parent 的一个副本，但 childIds 数组中移除了 childId。...parent 复制父节点对象中的所有属性。childIds: parent.childIds.filter(id => id !== childId) 创建一个新的 childIds 数组，其中过滤掉了与 childId 相等的子节点。
    };
    // 更新根 state 对象...
    setPlan({
      ...plan,
      // ...以便它拥有更新的父级。
      [parentId]: nextParent
      //更新计划 (plan) 状态为一个新的对象：...plan 复制当前 plan 对象中的所有属性。[parentId]: nextParent 将 parentId 对应的父节点更新为新的父节点对象 nextParent。
    });

    //函数接收 parentId 和 childId，用于从父级地点中移除子级地点。获取父级地点对象 parent。创建一个新的父级地点对象 nextParent，其 childIds 数组中不再包含 childId。更新 plan 状态，用新父级对象替换旧的父级对象。
  }
  const root = plan[0];//从 plan 状态中获取根节点对象，并将其赋值给 root 变量。这里假设根节点在 plan 数组中的第一个位置（索引为 0）。
  const planetIds = root.childIds;//从根节点对象 root 中提取 childIds 数组，并将其赋值给 planet Ids 变量。planet Ids 现在包含了根节点的所有子节点的 ID。

  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
    //遍历根节点的子节点，渲染 PlaceTree 组件。 获取根节点，并根据根节点的 childIds 渲染每个子节点。
    //标签：<h2>Places to visit</h2> 渲染一个标题。
    //有序列表：<ol> 创建一个有序列表。
    //遍历子节点：{planetIds.map(id => ( ... ))} 遍历 planetIds 数组，为每个子节点 ID 渲染一个 PlaceTree 组件。
    //PlaceTree 组件：key={id}：为每个 PlaceTree 组件设置唯一的 key 属性，使用子节点的 ID。id={id}：传递子节点的 ID 给 PlaceTree 组件。parentId={0}：传递根节点的 ID（假设根节点的 ID 为 0）给 PlaceTree 组件。placesById={plan}：传递 plan 状态对象给 PlaceTree 组件。onComplete={handleComplete}：传递 handleComplete 函数给 PlaceTree 组件，用于处理完成操作。
}

function PlaceTree({ id, parentId, placesById, onComplete }) {  
  //递归渲染子节点，并在每个节点上提供完成操作的按钮。
  const place = placesById[id];//从 placesById 对象中获取当前节点信息，并将其赋值给 place 变量。
  const childIds = place.childIds;//从当前节点对象 place 中提取 childIds 数组，并将其赋值给 childIds 变量。
  return (
    //PlaceTree 组件递归渲染每个地点及其子地点，并提供完成按钮。获取地点对象 place。显示地点标题和“完成”按钮。如果有子节点，则递归渲染每个子节点。
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
  //列表项：<li> 包裹当前节点信息。
  //节点标题：{place.title} 显示当前节点的标题。
  //完成按钮：点击事件处理：点击按钮时调用 onComplete 函数，传递 parentId 和 id。按钮文本：显示 "Complete"。
  //递归渲染子节点：检查子节点：如果 childIds 数组长度大于 0，渲染子节点列表。有序列表：<ol> 包裹子节点列表。遍历子节点：{childIds.map(childId => ( ... ))} 遍历 childIds 数组，为每个子节点 ID 渲染一个 PlaceTree 组件。PlaceTree 组件：key={childId}：为每个 PlaceTree 组件设置唯一的 key 属性，使用子节点的 ID。id={childId}：传递子节点的 ID 给 PlaceTree 组件。parentId={id}：传递当前节点的 ID 给子节点，作为它们的 parentId。placesById={placesById}：传递 placesById 对象给子节点。onComplete={onComplete}：传递 onComplete 函数给子节点，用于处理完成操作。
}

//placesjs
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
你确实可以随心所欲地嵌套 state，但是将其“扁平化”可以解决许多问题。这使得 state 更容易更新，并且有助于确保在嵌套对象的不同部分中没有重复。
```

```js
//改善内存使用 :理想情况下，您还应该从“表”对象中删除已删除的项目（以及它们的子项！）以改善内存使用。还可以 使用 Immer 使更新逻辑更加简洁。
//packagejson
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useImmer } from 'use-immer';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, updatePlan] = useImmer(initialTravelPlan);

  function handleComplete(parentId, childId) {
    updatePlan(draft => {
      // 从父级地点的子 ID 中移除。
      const parent = draft[parentId];
      parent.childIds = parent.childIds
        .filter(id => id !== childId);

      // 删除这个地点和它的所有子目录。
      deleteAllChildren(childId);
      function deleteAllChildren(id) {
        const place = draft[id];
        place.childIds.forEach(deleteAllChildren);
        delete draft[id];
      }
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
//placesjs
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25,],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40,, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
有时候，你也可以通过将一些嵌套 state 移动到子组件中来减少 state 的嵌套。这对于不需要保存的短暂 UI 状态非常有效，比如一个选项是否被悬停。
```

```js
//摘要
如果两个 state 变量总是一起更新，请考虑将它们合并为一个。
仔细选择你的 state 变量，以避免创建“极难处理”的 state。
用一种减少出错更新的机会的方式来构建你的 state。
避免冗余和重复的 state，这样您就不需要保持同步。
除非您特别想防止更新，否则不要将 props 放入 state 中。
对于选择类型的 UI 模式，请在 state 中保存 ID 或索引而不是对象本身。
如果深度嵌套 state 更新很复杂，请尝试将其展开扁平化。
```

#### 挑战

```js
//第 1 个挑战 共 4 个挑战: 修复一个未更新的组件 
这个 Clock 组件接收两个属性：color 和 time。当您在选择框中选择不同的颜色时，Clock 组件将从其父组件接收到一个不同的 color 属性。然而，由于某种原因，显示的颜色没有更新。为什么？请修复这个问题。
import { useState } from 'react';

export default function Clock(props) {
  const [color, setColor] = useState(props.color);
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}
答案
这个问题点在于此组件的 color state 是使用 color prop 的初始值进行初始化的。但是当 color prop 值发生更改时，这不会影响 state 变量！因此它们会失去同步。为了解决这个问题，完全删除 state 变量，并直接使用 color prop 即可。   就是说要么全prop,,要么不用prop(不要用prop赋给初值的state,删掉这么的一行)
import { useState } from 'react';

export default function Clock(props) {
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
  );
}
或者，使用解构语法：
import { useState } from 'react';

export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}

```

```js
//第 2 个挑战 共 4 个挑战: 修复一个损坏的打包清单 
这个打包清单有一个页脚，显示了打包的物品数量和总共的物品数量。一开始看起来似乎很好用，但是它也存在漏洞。例如，如果你将一个物品标记为已打包然后删除它，计数器就不会正确更新。请修复计数器以使其始终正确。
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(3);
  const [packed, setPacked] = useState(1);

  function handleAddItem(title) {
    setTotal(total + 1);
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    if (nextItem.packed) {
      setPacked(packed + 1);
    } else {
      setPacked(packed - 1);
    }
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setTotal(total - 1);
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
答案
虽然你可以仔细更改每个事件处理程序来正确更新 total 和 packed 计数器，但根本问题在于这些 state 变量一直存在。它们是冗余的，因为你始终可以从 item 数组本身计算出物品（已打包或总共）的数量。因此需要删除冗余 state 以修复错误：
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);

  const total = items.length;
  const packed = items
    .filter(item => item.packed)
    .length;

  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
请注意，事件处理程序在这次更改后只关心调用 setItems。现在，项目计数是从 items 中在下一次渲染期间计算的，因此它们始终是最新的。

就是说用两个个变量来测packed和total的数值,就不需要state插入一个个函数去更改
```

```js
//第 3 个挑战 共 4 个挑战: 修复消失的选项 
有一个 letters 列表在 state 中。当你悬停或聚焦到特定的字母时，它会被突出显示。当前突出显示的字母存储在 highlightedLetter state 变量中。您可以“Star”和“Unstar”单个字母，这将更新 state 中的 letters 数组。

虽然这段代码可以运行，但是有一个小的 UI 问题。当你点击“Star”或“Unstar”时，高亮会短暂消失。不过只要你移动鼠标指针或者用键盘切换到另一个字母，它就会重新出现。为什么会这样？请修复它，使得在按钮点击后高亮不会消失。
//appjs
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  function handleHover(letter) {
    setHighlightedLetter(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter === highlightedLetter
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
//letterjs
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter);        
      }}
      onPointerMove={() => {
        onHover(letter);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
//datajs
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
答案:  就是说不要同时存一个数组,可以存id

这个问题点在于你将字母对象存储在 highlightedLetter 中。但是，你也将相同的信息存储在 letters 数组中。因此，你的 state 存在重复！当你在按钮点击后更新 letters 数组时，会创建一个新的字母对象，它与 highlightedLetter 不同。这就是为什么 highlightedLetter === letter 执行变为 false，并且高亮消失的原因。当指针移动时下一次调用 setHighlightedLetter 时它会重新出现。

为了解决这个问题，请从 state 中删除重复项。不要在两个地方存储 字母对象本身，而是存储 highlightedId。然后，您可以使用 letter.id === highlightedId 检查每个带有 isHighlighted 属性的字母，即使 letter 对象在上次渲染后发生了变化，这也是可行的。
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId ] = useState(null);

  function handleHover(letterId) {
    setHighlightedId(letterId);
  }

  function handleStar(starredId) {
    setLetters(letters.map(letter => {
      if (letter.id === starredId) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}

export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter.id);        
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter.id);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}

export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];

```

```js
//第 4 个挑战 共 4 个挑战: 实现多选功能 
在这个例子中，每个 Letter 都有一个 isSelected prop 和一个 onToggle 处理程序来标记它为选定 state。这样做是有效的，但是 state 被存储为 selectedId（也可以是 null 或 ID），因此任何时候只能选择一个 letter。

你需要将 state 结构更改为支持多选功能。（在编写代码之前，请考虑如何构建它。）每个复选框应该独立于其他复选框。单击已选择的项目应取消选择。最后，页脚应显示所选项目的正确数量。
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(null);

  // TODO: 支持多选
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: 支持多选
    setSelectedId(toggledId);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: 支持多选
              letter.id === selectedId
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}

export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}

export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];

答案:  就是说在handletoggle里面更改selectedid数,是的显示的selectedid count显示出勾选数
在 state 中保留一个 selectedIds 数组，而不是单个的 selectedId。例如，如果您选择了第一个和最后一个字母，则它将包含 [0, 2]。当没有选定任何内容时，它将为空数组 []：
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedCount = selectedIds.length;

  function handleToggle(toggledId) {
    //handleToggle 函数根据传入的 toggledId 切换 selectedIds 数组中对应项的选中状态。
    // 它以前是被选中的吗？
    if (selectedIds.includes(toggledId)) {
       // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      //移除选中项:如果 toggledId 已经在 selectedIds 数组中，则调用 setSelectedIds 函数更新状态，移除 toggledId。filter 方法创建一个新的数组，包含所有不等于 toggledId 的元素。
      ));
    } else {
      // 否则，增加 ID 到数组中。
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
    //增加选中项:如果 toggledId 不在 selectedIds 数组中，则调用 setSelectedIds 函数更新状态，添加 toggledId。使用扩展运算符 ... 将现有的 selectedIds 数组展开，然后添加 toggledId。
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
  //遍历 letters 数组中的每一个元素。letters 是一个包含多个信件对象的数组，letter 是当前遍历到的信件对象。
  //<Letter解释：在每次遍历时，渲染一个 Letter 组件，代表一个单独的信件。
  //key={letter.id}解释：为每个 Letter 组件设置一个唯一的 key 属性，使用信件的 id 作为其值。这对于 React 高效地更新和重新渲染列表项是必要的。
  //letter={letter}解释：将当前遍历到的 letter 对象作为 letter 属性传递给 Letter 组件。这样，Letter 组件可以访问和使用这个信件对象的数据。
  //isSelected={selectedIds.includes(letter.id)}解释：计算 Letter 组件的 isSelected 属性的值。selectedIds 是一个包含已选中信件 ID 的数组。如果当前信件的 id 包含在 selectedIds 中，则 isSelected 的值为 true，否则为 false。这样可以让 Letter 组件知道当前信件是否被选中。
  //onToggle={handleToggle}解释：将 handleToggle 函数作为 onToggle 属性传递给 Letter 组件。这样，当 Letter 组件内部的某个事件触发 onToggle 时，就会调用 handleToggle 函数。通常，这种情况会发生在用户点击信件选择/取消选择按钮时。
}

export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}

export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];


使用数组的一个小缺点是，对于每个项目，你都需要调用 selectedIds.includes(letter.id) 来检查它是否被选中。如果数组非常大，则这可能会成为性能问题，因为带有 includes() 的数组搜索需要线性时间，并且你正在为每个单独的项目执行此搜索。

要解决这个问题，你可以在 state 中使用一个 Set 对象，它提供了快速的 has() 操作：
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(
    new Set()
    //useState 钩子创建一个状态变量 selectedIds，初始值为一个空的 Set 对象。setSelectedIds 是更新状态的方法。
  );

  const selectedCount = selectedIds.size;//定义一个变量 selectedCount，它的值是 selectedIds 集合的大小（选中的信件数量）。
  //就是说.size 是 Set 对象的一个属性，用于获取集合中的元素数量。它返回集合中独特值的个数。  就是说集合里面有几个元素,我来算算

  function handleToggle(toggledId) {
    //据传入的 toggledId，在选中ID的集合 selectedIds 中添加或删除该ID，确保不修改原始集合。

    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);

    //定义事件处理函数:---创建副本：创建 selectedIds 集合的副本 nextIds，以避免直接修改原始集合。这确保了对 nextIds 的修改不会影响到 selectedIds。----切换选中状态：检查 nextIds 中是否包含 toggledId,即判断该ID是否已经被选中。：如果 toggledId 已经在集合中，调用 delete 方法从 nextIds 中移除该ID。如果不包含，调用 add 方法将 toggledId 添加到 nextIds 中。。---更新状态：调用 setSelectedIds 更新 selectedIds 的状态，将其设置为 nextIds 的内容。

    //add,delete方法就是说从对象里面添加一个元素和删除一个元素,后面的()里面就是具体的元素
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.has(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
  //使用 letters.map 方法遍历 letters 数组，生成一组 Letter 组件。--每个 Letter 组件都传递 letter 对象、isSelected 状态(使用 selectedIds 集合的 has 方法检查 selectedIds 集合中是否包含当前信件的 id，letter.id 是当前遍历到的信件的 id。)和 onToggle 处理函数。--key 属性用于标识每个 Letter 组件。
}
```

| 知识点 | 场景 | Column 3 |
|----------|----------|----------|
|      state里面的prop   |换动态时间显示的底色换不过来          |          |
|      你多余的state    |正确计数你的打包数          |          |
|       重复state-即两个state存了相同的信息   |         选中以后怎么不高亮了 |          |
|     state里面存一个数组   |         邮件列表怎么多选 |          |

### 在组件间共享状态

有时候，你希望两个组件的状态始终同步更改。要实现这一点，可以将相关 state 从这两个组件上移除，并把 state 放到它们的公共父级，再通过 props 将 state 传递给这两个组件。这被称为“状态提升”，这是编写 React 代码时常做的事。  

就是说经常干,得会!!!

你将会学习到
如何使用状态提升在组件之间共享状态
什么是受控组件和非受控组件

#### 举例说明一下状态提升

```js
//在这个例子中，父组件 Accordion 渲染了 2 个独立的 Panel 组件。

Accordion
Panel
Panel
每个 Panel 组件都有一个布尔值 isActive，用于控制其内容是否可见。

请点击 2 个面板中的显示按钮：
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          显示
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel title="关于">
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel title="词源">
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，<i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  );
}
我们发现点击其中一个面板中的按钮并不会影响另外一个，他们是独立的。
```

!!!此处插图react13

假设现在您想改变这种行为，以便在任何时候只展开一个面板。在这种设计下，展开第 2 个面板应会折叠第 1 个面板。您该如何做到这一点呢？“

要协调好这两个面板，我们需要分 3 步将状态“提升”到他们的父组件中。

从子组件中 移除 state 。
从父组件 传递 硬编码数据。
为共同的父组件添加 state ，并将其与事件处理函数一起向下传递。
这样，Accordion 组件就可以控制 2 个 Panel 组件，保证同一时间只能展开一个。

```js
//第 1 步: 从子组件中移除状态 
你将把 Panel 组件对 isActive 的控制权交给他们的父组件。这意味着，父组件会将 isActive 作为 prop 传给子组件 Panel。我们先从 Panel 组件中 删除下面这一行：

const [isActive, setIsActive] = useState(false);
然后，把 isActive 加入 Panel 组件的 props 中：

function Panel({ title, children, isActive }) {
现在 Panel 的父组件就可以通过 向下传递 prop 来 控制 isActive。但相反地，Panel 组件对 isActive 的值 没有控制权 —— 现在完全由父组件决定！

第 2 步: 从公共父组件传递硬编码数据 
为了实现状态提升，必须定位到你想协调的 两个 子组件最近的公共父组件：

Accordion (最近的公共父组件)
Panel
Panel
在这个例子中，公共父组件是 Accordion。因为它位于两个面板之上，可以控制它们的 props，所以它将成为当前激活面板的“控制之源”。通过 Accordion 组件将硬编码值 isActive（例如 true ）传递给两个面板：
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel title="关于" isActive={true}>
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel title="词源" isActive={true}>
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，<i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  );
  //<Panel title="关于">--<Panel>: 这是一个自定义的 React 组件，名为 Panel。--title="关于": 这是 Panel 组件的一个属性（prop），为 title 赋值为 "关于"，即该面板的标题。
  //阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。---这是 Panel 组件的子元素，表示面板的内容。---具体内容是一个段落，描述了阿拉木图的人口和历史。
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          显示
        </button>
      )}
    </section>
  );
}
你可以尝试修改 Accordion 组件中 isActive 的值，并在屏幕上查看结果。

第 3 步: 为公共父组件添加状态 
状态提升通常会改变原状态的数据存储类型。

在这个例子中，一次只能激活一个面板。这意味着 Accordion 这个父组件需要记录 哪个 面板是被激活的面板。我们可以用数字作为当前被激活 Panel 的索引，而不是 boolean 值：

const [activeIndex, setActiveIndex] = useState(0);
当 activeIndex 为 0 时，激活第一个面板，为 1 时，激活第二个面板。

在任意一个 Panel 中点击“显示”按钮都需要更改 Accordion 中的激活索引值。 Panel 中无法直接设置状态 activeIndex 的值，因为该状态是在 Accordion 组件内部定义的。 Accordion 组件需要 显式允许 Panel 组件通过 将事件处理程序作为 prop 向下传递 来更改其状态：

<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
现在 Panel 组件中的 <button> 将使用 onShow 这个属性作为其点击事件的处理程序：
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel
        title="关于"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel
        title="词源"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，<i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          显示
        </button>
      )}
    </section>
  );
}
//就是说通过名字叫显示的button完成兑setActiveIndex的变换,达到控制panel的目的

这样，我们就完成了对状态的提升！将状态移至公共父组件中可以让你更好的管理这两个面板。使用激活索引值代替之前的 是否显示 标识确保了一次只能激活一个面板。而通过向下传递事件处理函数可以让子组件修改父组件的状态。
```

!!!此处插图react14

受控组件和非受控组件:
通常我们把包含“不受控制”状态的组件称为“非受控组件”。例如，最开始带有 isActive 状态变量的 Panel 组件就是不受控制的，因为其父组件无法控制面板的激活状态。

相反，当组件中的重要信息是由 props 而不是其自身状态驱动时，就可以认为该组件是“受控组件”。这就允许父组件完全指定其行为。最后带有 isActive 属性的 Panel 组件是由 Accordion 组件控制的。

非受控组件通常很简单，因为它们不需要太多配置。但是当你想把它们组合在一起使用时，就不那么灵活了。受控组件具有最大的灵活性，但它们需要父组件使用 props 对其进行配置。

在实践中，“受控”和“非受控”并不是严格的技术术语——通常每个组件都同时拥有内部状态和 props。然而，这对于组件该如何设计和提供什么样功能的讨论是有帮助的。

当编写一个组件时，你应该考虑哪些信息应该受控制（通过 props），哪些信息不应该受控制（通过 state）。当然，你可以随时改变主意并重构代码。

#### 每个状态都对应唯一的数据源

在 React 应用中，很多组件都有自己的状态。一些状态可能“活跃”在叶子组件（树形结构最底层的组件）附近，例如输入框。另一些状态可能在应用程序顶部“活动”。例如，客户端路由库也是通过将当前路由存储在 React 状态中，利用 props 将状态层层传递下去来实现的！

对于每个独特的状态，都应该存在且只存在于一个指定的组件中作为 state。这一原则也被称为拥有 “可信单一数据源”。它并不意味着所有状态都存在一个地方——对每个状态来说，都需要一个特定的组件来保存这些状态信息。你应该 将状态提升 到公共父级，或 将状态传递 到需要它的子级中，而不是在组件之间复制共享的状态。

你的应用会随着你的操作而变化。当你将状态上下移动时，你依然会想要确定每个状态在哪里“活跃”。这都是过程的一部分！

想了解在更多组件中的实践，请阅读 React 思维.

摘要:

当你想要整合两个组件时，将它们的 state 移动到共同的父组件中。
然后在父组件中通过 props 把信息传递下去。
最后，向下传递事件处理程序，以便子组件可以改变父组件的 state 。
考虑该将组件视为“受控”（由 prop 驱动）或是“不受控”（由 state 驱动）是十分有益的。

```js
//第 1 个挑战 共 2 个挑战: 同步输入状态 
现在有两个独立的输入框。为了让它们保持同步：即编辑一个输入框时，另一个输入框也会更新相同的文本，反之亦然。
import { useState } from 'react';

export default function SyncedInputs() {
  //把下面删的两句拿进来
  //return两个input,都是带value(用text来state的)和onchange(用handlechange来state的), 所以实现了一个handlechange对两个输入框的控制
  //也就是说你在第二个里面输入,第一个也会动
  return (
    <>
      <Input label="第一个输入框" />
      <Input label="第二个输入框" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }
//上面两句都不要,因为提升了; 参数搞三个:label,value,onchange (往上看父状态↑)
  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}
答案
将 text 状态变量与 handleChange 处理程序一起移动到父组件中。然后将它们作为 props 传递给两个 Input 组件。这样它们就能保持同步了。
import { useState } from 'react';

export default function SyncedInputs() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Input
        label="第一个输入框"
        value={text}
        onChange={handleChange}
      />
      <Input
        label="第二个输入框"
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
```

```js
//第 2 个挑战 共 2 个挑战: 列表过滤 
在这个例子中，SearchBar 组件拥有一个用来控制输入框的 query 状态，它的父组件中展示了一个 List 组件，但是没有考虑搜索条件。

使用 filterItems(foods, query) 方法来通过搜索条件过滤列表项。为了测试修改是否正确，请尝试在输入框中输入 “寿司” ，“烤肉串” 或 “点心”。

可以看到 filterItems 已经自动引入了，所以不需要我们自己再引入了。
//appjs
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  //将下面的两行放进这里面
  //将filteritems函数根据foods和query参数的输出赋给results
  //return的searchbar里面加入query(来自query的state)和handlechange(来自function handlechange)属性; list的items属性来自results
  return (
    <>
      <SearchBar />
      <hr />
      <List items={foods} />
    </>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }
  //上面两行去掉,提升,只留下面的部分
  //参数给上:query和onchange
  return (
    <label>
      搜索：{' '}
      <input
        value={query}
        onChange={handleChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody>
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
//datajs
export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
    //split(' '): 将 name 属性的字符串按空格分割成单词数组。---some(word =>: 对单词数组调用 some 方法，并传入一个回调函数。some 方法会在数组中至少有一个项使回调函数返回 true 时，返回 true。
    //some方法的测试: word.toLowerCase().startsWith(query)---word.toLowerCase(): 将当前单词转换为小写。startsWith(query): 检查当前单词是否以 query 开头。
  );
}

export const foods = [{
  id: 0,
  name: '寿司',
  description: '寿司是一道传统的日本菜，是用醋米饭做成的'
}, {
  id: 1,
  name: '木豆',
  description: '制作木豆最常见的方法是在汤中加入洋葱、西红柿和各种香料'
}, {
  id: 2,
  name: '饺子',
  description: '饺子是用未发酵的面团包裹咸的或甜的馅料，然后在沸水中煮制而成的'
}, {
  id: 3,
  name: '烤肉串',
  description: '烤肉串是一种很受欢迎的食物，是用肉串和肉块做成。'
}, {
  id: 4,
  name: '点心',
  description: '点心是广东人的传统喜好，是在餐馆吃早餐和午餐时喜欢吃的一系列小菜'
}];
答案
将 query 状态提升到 FilterableList 组件中。调用 filterItems(foods, query) 方法获取过滤后的列表并将其传递给 List 组件。现在修改查询条件就会反映在列表中：
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      搜索：{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody> 
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: '寿司',
  description: '寿司是一道传统的日本菜，是用醋米饭做成的'
}, {
  id: 1,
  name: '木豆',
  description: '制作木豆最常见的方法是在汤中加入洋葱、西红柿和各种香料'
}, {
  id: 2,
  name: '饺子',
  description: '饺子是用未发酵的面团包裹咸的或甜的馅料，然后在沸水中煮制而成的'
}, {
  id: 3,
  name: '烤肉串',
  description: '烤肉串是一种很受欢迎的食物，是用肉串和肉块做成。'
}, {
  id: 4,
  name: '点心',
  description: '点心是广东人的传统喜好，是在餐馆吃早餐和午餐时喜欢吃的一系列小菜'
}];
```

#### 组件间共享的表格

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
|       搞一个父组件控制两个的显示   |     阿拉木图关于和词源之间切换     |          |
|      怎么把状态提升到父组件啊    |       两个框同步输入 ,输一个另一个也随动  |          |
|    提升到目标组件中      |     寿司饺子列表根据搜索框来显示对应条目详情     |          |

### 对 state 进行保留和重置

各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。

你将会学习到
React 何时选择保留或重置状态
如何强制 React 重置组件的状态
键和类型如何影响状态是否被保留

#### 状态与渲染树中的位置相关

React 会为 UI 中的组件结构构建 渲染树。

当向一个组件添加状态时，那么可能会认为状态“存在”在组件内。但实际上，状态是由 React 保存的。React 通过组件在渲染树中的位置将它保存的每个状态与正确的组件关联起来。

下面的例子中只有一个 ``<Counter />`` JSX 标签，但它会在两个不同的位置渲染：

```js
//import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
```

下面是它们的树形结构的样子：
图 :  div->counter(count | 0)
        ->counter(count | 0)

这是两个独立的 counter，因为它们在树中被渲染在了各自的位置。 一般情况下你不用去考虑这些位置来使用 React，但知道它们是如何工作会很有用。

在 React 中，屏幕中的每个组件都有完全独立的 state。举个例子，当你并排渲染两个 Counter 组件时，它们都会拥有各自独立的 score 和 hover state。

试试点击两个 counter 你会发现它们互不影响：

```js
//import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
```

如你所见，当一个计数器被更新时，只有该组件的状态会被更新：

图 :  div->counter(count | 0)
        ->counter(count | 1 )

```js
//只有当在树中相同的位置渲染相同的组件时，React 才会一直保留着组件的 state。想要验证这一点，可以将两个计数器的值递增，取消勾选 “渲染第二个计数器” 复选框，然后再次勾选它：
import { useState } from 'react';

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        渲染第二个计数器
      </label>
    </div>
  );
  //{showB && <Counter />}这是一个条件渲染的语法。当 showB 为 true 时，将渲染 <Counter /> 组件；否则不渲染任何内容。
  //<input type="checkbox" checked={showB} onChange={...} />----这是一个复选框 <input> 元素，type="checkbox" 表示它是一个复选框。---checked={showB}：checked 属性表示复选框的选中状态，由 showB 状态控制。---onChange={...}：当复选框的状态改变时触发的事件处理函数，更新 showB 状态为复选框的新值。  当复选框的选中状态改变时，通过调用 setShowB 函数，将复选框的新选中状态 (e.target.checked) 更新到 showB 状态中。
  //就是说你勾选了,才有第二个那个条件渲染的counter
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```

注意，当你停止渲染第二个计数器的那一刻，它的 state 完全消失了。这是因为 React 在移除一个组件时，也会销毁它的 state。

图 :  div->counter(count | 0)
       ->boom!!!

当你重新勾选“渲染第二个计数器”复选框时，另一个计数器及其 state 将从头开始初始化（score = 0）并被添加到 DOM 中。

图 :  div->counter(count | 0)
        ->counter(count | 0)  bling!!!

只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。 如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。

#### 相同位置的相同组件会使得 state 被保留下来

在这个例子中，有两个不同的 ``<Counter />`` 标签：

```js
//import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
当你勾选或清空复选框的时候，计数器 state 并没有被重置。不管 isFancy 是 true 还是 false，根组件 App 返回的 div 的第一个子组件都是 <Counter />：
```

!!!插入图15

它是位于相同位置的相同组件，所以对 React 来说，它是同一个计数器。

```js
//陷阱
记住 对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置！ 这个组件在 if 内外有两个return 语句，它们带有不同的 <Counter /> JSX 标签：
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);//可以手动把初值改成true
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          使用true时的的样式
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        使用false时的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
你可能以为当你勾选复选框的时候 state 会被重置，但它并没有！这是因为 两个 <Counter /> 标签被渲染在了相同的位置。 React 不知道你的函数里是如何进行条件判断的，它只会“看到”你返回的树。在这两种情况下，App 组件都会返回一个包裹着 <Counter /> 作为第一个子组件的 div。这就是 React 认为它们是 同一个 <Counter /> 的原因。

你可以认为它们有相同的“地址”：根组件的第一个子组件的第一个子组件。不管你的逻辑是怎么组织的，这就是 React 在前后两次渲染之间将它们进行匹配的方式。
```

#### 相同位置的不同组件会使 state 重置

在这个例子中，勾选复选框会将 ``<Counter>`` 替换为一个 ``<p>``：

```js
//import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>待会见！</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        休息一下
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
示例中，你在相同位置对 不同 的组件类型进行切换。刚开始 <div> 的第一个子组件是一个 Counter。但是当你切换成 p 时，React 将 Counter 从 UI 树中移除了并销毁了它的状态。
```

!!!插入图16

```js
//并且，当你在相同位置渲染不同的组件时，组件的整个子树都会被重置。要验证这一点，可以增加计数器的值然后勾选复选框：
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
当你勾选复选框后计数器的 state 被重置了。虽然你渲染了一个 Counter，但是 div 的第一个子组件从 div 变成了 section。当子组件 div 从 DOM 中被移除的时候，它底下的整棵树（包含 Counter 以及它的 state）也都被销毁了。
```

!!!插入图17

一般来说，如果你想在重新渲染时保留 state，几次渲染中的树形结构就应该相互“匹配”。结构不同就会导致 state 的销毁，因为 React 会在将一个组件从树中移除时销毁它的 state。

```js
//陷阱
以下是为什么你不应该把组件函数的定义嵌套起来的原因。

示例中， MyTextField 组件被定义在 MyComponent 内部：
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>点击了 {counter} 次</button>
    </>
  );
}
每次你点击按钮，输入框的 state 都会消失！这是因为每次 MyComponent 渲染时都会创建一个 不同 的 MyTextField 函数。你在相同位置渲染的是 不同 的组件，所以 React 将其下所有的 state 都重置了。这样会导致 bug 以及性能问题。为了避免这个问题， 永远要将组件定义在最上层并且不要把它们的定义嵌套起来。
```

#### 在相同位置重置 state

默认情况下，React 会在一个组件保持在同一位置时保留它的 state。通常这就是你想要的，所以把它作为默认特性很合理。但有时候，你可能想要重置一个组件的 state。考虑一下这个应用，它可以让两个玩家在每个回合中记录他们的得分：

```js
//import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person} 的分数：{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```

```js
//目前当你切换玩家时，分数会被保留下来。这两个 Counter 出现在相同的位置，所以 React 会认为它们是 同一个 Counter，只是传了不同的 person prop。

但是从概念上讲，这个应用中的两个计数器应该是各自独立的。虽然它们在 UI 中的位置相同，但是一个是 Taylor 的计数器，一个是 Sarah 的计数器。

有两个方法可以在它们相互切换时重置 state：

将组件渲染在不同的位置
使用 key 赋予每个组件一个明确的身份
方法一：将组件渲染在不同的位置 
你如果想让两个 Counter 各自独立的话，可以将它们渲染在不同的位置：
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person} 的分数：{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
起初 isPlayerA 的值是 true。所以第一个位置包含了 Counter 的 state，而第二个位置是空的。
当你点击“下一位玩家”按钮时，第一个位置会被清空，而第二个位置现在包含了一个 Counter。
```

!!!插入图18

每当 Counter 组件从 DOM 中移除时，它的 state 会被销毁。这就是每次点击按钮它们就会被重置的原因。

这个解决方案在你只有少数几个独立的组件渲染在相同的位置时会很方便。这个例子中只有 2 个组件，所以在 JSX 里将它们分开进行渲染并不麻烦。

```js
//方法二：使用 key 来重置 state 
还有另一种更通用的重置组件 state 的方法。

你可能在 渲染列表 时见到过 key。但 key 不只可以用于列表！你可以使用 key 来让 React 区分任何组件。默认情况下，React 使用父组件内部的顺序（“第一个计数器”、“第二个计数器”）来区分组件。但是 key 可以让你告诉 React 这不仅仅是 第一个 或者 第二个 计数器，而且还是一个特定的计数器——例如，Taylor 的 计数器。这样无论它出现在树的任何位置， React 都会知道它是 Taylor 的 计数器！

在这个例子中，即使两个 <Counter /> 会出现在 JSX 中的同一个位置，它们也不会共享 state：
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person} 的分数：{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
在 Taylor 和 Sarah 之间切换不会使 state 被保留下来。因为 你给他们赋了不同的 key：

{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
指定一个 key 能够让 React 将 key 本身而非它们在父组件中的顺序作为位置的一部分。这就是为什么尽管你用 JSX 将组件渲染在相同位置，但在 React 看来它们是两个不同的计数器。因此它们永远都不会共享 state。每当一个计数器出现在屏幕上时，它的 state 会被创建出来。每当它被移除时，它的 state 就会被销毁。在它们之间切换会一次又一次地使它们的 state 重置。
注意
请记住 key 不是全局唯一的。它们只能指定 父组件内部 的顺序。
```

```js
//使用 key 重置表单 
使用 key 来重置 state 在处理表单时特别有用。

在这个聊天应用中， <Chat> 组件包含文本输入 state：
//appjs
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
//contactlistjs
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
  //使用对象解构从组件的 props 中提取 selectedContact, contacts, 和 onSelect 属性。
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
  //创建一个 <section> 元素，并应用 CSS 类 contact-list。
  //使用 map 函数遍历 contacts 数组，为每个联系人生成一个列表项。创建一个列表项 (<li>) 元素。 每个 li 元素需要一个唯一的 key 属性，通常是联系人的 id。
  //创建一个按钮，并定义一个点击事件处理程序。当按钮被点击时，调用 onSelect 函数并传递当前 contact 作为参数。
}
//chatjs
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'跟 ' + contact.name + ' 聊一聊'}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}
尝试在输入框中输入一些内容，然后点击 “Alice” 或 “Bob” 来选择不同的收件人。你会发现因为 <Chat> 被渲染在了树的相同位置，输入框的 state 被保留下来了。

在很多应用里这可能会是大家所需要的特性，但在这个聊天应用里并不是！ 你不应该让用户因为一次偶然的点击而把他们已经输入的信息发送给一个错误的人。要修复这个问题，只需给组件添加一个 key ：

<Chat key={to.id} contact={to} />
这样确保了当你选择一个不同的收件人时， Chat 组件——包括其下方树中的任何 state——都将从头开始重新创建。 React 还将重新创建 DOM 元素，而不是复用它们。

现在切换收件人就总会清除文本字段了：
```

```js
//import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

export default function ContactList({
    selectedContact,
    contacts,
    onSelect
  }) {
    return (
      <section className="contact-list">
        <ul>
          {contacts.map(contact =>
            <li key={contact.id}>
              <button onClick={() => {
                onSelect(contact);
              }}>
                {contact.name}
              </button>
            </li>
          )}
        </ul>
      </section>
    );
  }

import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'跟 ' + contact.name + ' 聊一聊'}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}


为被移除的组件保留 state 
:
在真正的聊天应用中，你可能会想在用户再次选择前一个收件人时恢复输入 state。对于一个不可见的组件，有几种方法可以让它的 state “活下去”：

与其只渲染现在这一个聊天，你可以把 所有 聊天都渲染出来，但用 CSS 把其他聊天隐藏起来。这些聊天就不会从树中被移除了，所以它们的内部 state 会被保留下来。这种解决方法对于简单 UI 非常有效。但如果要隐藏的树形结构很大且包含了大量的 DOM 节点，那么性能就会变得很差。
你可以进行 状态提升 并在父组件中保存每个收件人的草稿消息。这样即使子组件被移除了也无所谓，因为保留重要信息的是父组件。这是最常见的解决方法。
除了 React 的 state，你也可以使用其他数据源。例如，也许你希望即使用户不小心关闭页面也可以保存一份信息草稿。要实现这一点，你可以让 Chat 组件通过读取 localStorage 对其 state 进行初始化，并把草稿保存在那里。
无论采取哪种策略，与 Alice 的聊天在概念上都不同于 与 Bob 的聊天，因此根据当前收件人为 <Chat> 树指定一个 key 是合理的。
```

```js
//摘要
只要在相同位置渲染的是相同组件， React 就会保留状态。
state 不会被保存在 JSX 标签里。它与你在树中放置该 JSX 的位置相关联。
你可以通过为一个子树指定一个不同的 key 来重置它的 state。
不要嵌套组件的定义，否则你会意外地导致 state 被重置。

```

```js
//第 1 个挑战 共 5 个挑战: 修复丢失的输入框文本 
这个例子在你按下按钮时会展示一条消息，但同时也会意外地重置输入框。为什么会发生这种情况？修复它，使按下按钮不再导致输入框文本重置。
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>提示：你最喜欢的城市？</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>隐藏提示</button>
      </div>
    );
    //把下面的return去掉
    //就是说使用简要的条件语句确定显示不显示<p>, <form>正常显示,<button>正常显示,就不干扰了
    //第二种方法就是
    //保留下面的return,但是在<form>前加上{null}占位,这样就不清空了

    //总的来说就是使<form>一直是第二个组件,不改变位置
  }
  return (
    <div>
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>显示提示</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
答案
问题在于 Form 被渲染在了不同的位置。在 if 分支里，Form 是 <div> 的第二个子组件，但在 else 分支里它是第一个子组件。所以相同位置的组件类型发生了变化。第一个位置时而包含一个 p，时而包含一个 Form；而第二个位置时而包含一个 Form，时而包含一个 button。每当组件类型发生变化时， React 都会重置 state。

最简单的解决方案是将各个分支合并，这样 Form 就总会在相同位置渲染：
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint &&
        <p><i>提示：你最喜欢的城市？</i></p>
      }
      <Form />
      {showHint ? (
        <button onClick={() => {
          setShowHint(false);
        }}>隐藏提示</button>
      ) : (
        <button onClick={() => {
          setShowHint(true);
        }}>显示提示</button>
      )}
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
其实，你还可以在 else 分支的 <Form /> 之前加个 null，以匹配 if 分支的结构：
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>提示：你最喜欢的城市？</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>隐藏提示</button>
      </div>
    );
  }
  return (
    <div>
      {null}
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>显示提示</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
这样 Form 就会始终是第二个子组件，所以它就会保持在相同位置并保留它的 state。但是这种方法特别不明显，并会引入一个风险因素——其他人可能会删除那个 null。
```

```js
//第 2 个挑战 共 5 个挑战: 交换两个表单字段 
这个表单可以让你输入姓氏和名字。它还有一个复选框控制哪个字段放在前面。当你勾选复选框时，“姓氏”字段将出现在“名字”字段之前。

它几乎可以正常使用，但有一个 bug。如果你填写了“名字”输入框并勾选复选框，文本将保留在第一个输入框(也就是现在的“姓氏”)。修复它，使得输入框文本在你调换顺序时 也 会跟着移动。
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      调换顺序
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field label="姓氏" /> 
        <Field label="名字" />
        {checkbox}
      </>
    );
    //改正:在里面加入key  =>定位组件之用
  } else {
    return (
      <>
        <Field label="名字" /> 
        <Field label="姓氏" />
        {checkbox}
      </>
    );  
    //<Field /> 是一个常见的自定义组件名称，通常用于表单字段。在表单处理中，它可以封装表单输入元素，如 <input>、<textarea> 等，并添加一些额外的功能，比如验证、样式处理等。 onChange: 当输入字段的值改变时调用的函数。就是改变了调用.
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}：
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
答案
为 if 和 else 分支中的两个 <Field> 组件都指定一个 key。这样可以告诉 React 如何为两个 <Field> “匹配”正确的状态——即使它们在父组件中的顺序会发生变化：
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      调换顺序
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field key="lastName" label="姓氏" /> 
        <Field key="firstName" label="名字" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="firstName" label="名字" /> 
        <Field key="lastName" label="姓氏" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}：
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}

```

```js
//第 3 个挑战 共 5 个挑战: 重置详情表单 
这是一个可编辑的联系人列表。你可以编辑所选联系人的详细信息，然后点击“保存”进行更新或点击“重置”来撤消你的修改。

当你选中另一个联系人（比如 Alice），状态就会更新，但表单会一直显示之前那个联系人的详细信息。修复它，使表单在所选联系人改变时重置。
//appjs
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
    //: 根据 selectedId 找到选中的联系人。
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
    //如果联系人的 id 与 updatedData 的 id 相同，则用 updatedData 替换联系人，否则保持不变。setContacts(nextContacts);: 更新联系人状态为 nextContacts。
  }

  return (
    //返回一个容器。
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
  //<hr />渲染一个水平线分隔符。
  //<EditContact>里面加一个key={selectedId}
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

//contactlistjs
export default function ContactList({
  //实现了一个联系人列表，点击按钮可以选中联系人并加粗显示选中联系人的名字。
  contacts,
  selectedId,
  onSelect
  //接收三个参数：contacts（联系人数组）、selectedId（选中的联系人 ID）和 onSelect（选择联系人的回调函数）。
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              // 如果 contact.id 等于 selectedId，则用粗体标签 <b> 包裹联系人的姓名；否则直接显示联系人的姓名。
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

//editcontactjs
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
//组件允许用户编辑联系人信息，并保存或重置这些更改。
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        名称：
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱：
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        保存
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        重置(意思就是恢复成上次设的)
      </button>
    </section>
  );
}
答案
将 key={selectedId} 赋给 EditContact 组件。这样在不同联系人之间切换将重置表单：
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        名称：
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱：
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        保存
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        重置
      </button>
    </section>
  );
}

```

```js
//第 4 个挑战 共 5 个挑战: 清除正在加载的图片 
当你点击“下一张”时，浏览器会开始加载下一张图片。但因为它是在相同的 <img> 标签中显示的，所以默认情况下，你在下一张图片加载完成前都会看到上一张图片。如果文本必须始终与图片一一对应，那么这种特性可能并不是我们想要的。调整它使得上一张图片在你点击“下一张”时立即被清除。
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;
  //定义一个名为 hasNext 的变量，用于检查当前索引是否小于图片数组的最后一个索引，以确定是否有下一张图片。

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        下一张
      </button>
      <h3>
        {images.length} 张图片中的第 {index + 1} 张
      </h3>
      <img src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  //改在<image>上,给它加个key={image.src} 使其更换时出现短暂的空白.
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
答案
你可以为 <img> 提供一个 key。当 key 更改时，React 将从头开始重新创建 <img> DOM 节点。这样会导致在每张图片加载时出现一个短暂的闪白，所以你不应该对你应用里的每张图片都这样做。但是如果你想确保图片与文本始终匹配，那这么做就是合理的。
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        下一张
      </button>
      <h3>
        {images.length} 张图片中的第 {index + 1} 张
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];

```

```js
//第 5 个挑战 共 5 个挑战: 修复列表中错位的 state 
在这个列表中每个 Contact 都有个 state 表示它的“显示邮箱”按钮是否已经按过了。点击 Alice 的“显示邮箱”按钮，然后勾选“以相反的顺序显示”复选框。你会注意到现在展开的是 Taylor 的 邮箱，而 Alice 的邮箱已经被移到底部并被收起了。

修复它，使得不管选中的顺序如何，expanded state 都与各个联系人相关联。
//appjs
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];//声明一个常量 displayedContacts。创建一个 contacts 数组的浅拷贝。...contacts 是展开运算符，保证了 displayedContacts 是 contacts 的一个副本，而不是对同一个数组的引用。
  if (reverse) {
    displayedContacts.reverse();
  } //调用数组的 reverse 方法，反转 displayedContacts 数组中的元素顺序。

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        以相反的顺序显示
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={i}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
    //用i作为key,应该使用contact.id
    //性能和稳定性:索引 key={i}: 在元素列表顺序经常变化的情况下，索引 key 会导致组件不必要的重新渲染和性能问题，因为 React 无法正确区分哪些元素发生了变化。-----ID key={contact.id}: 使用唯一的 id 作为 key 可以避免这种问题，因为每个元素在更新过程中都有稳定的标识符，有助于提高性能和渲染的准确性。
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
//contactjs
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? '隐藏' : '显示'}邮箱
      </button>
    </>
  );
}
答案:
问题在于这个例子使用了 index 作为 key：

{displayedContacts.map((contact, i) =>
  <li key={i}>
然而你应该让 state 与 每个特定的联系人 相关联。

使用联系人的 ID 作为 key 就会修复这个问题：
//appjs
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        以相反的顺序显示
      </label>
      <ul>
        {displayedContacts.map(contact =>
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
//contactjs
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? '显示' : '隐藏'}邮箱
      </button>
    </>
  );
}
state 与树中的位置相关联。 key 让你可以指定一个特定的位置，而不依赖于顺序。
```

#### 对state保留\重置的表格总结

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
|          |     框里有按钮加一,下面有复选框控制上面的框     |          |
|     相同位置的相同组件     |    框里面有加一按钮,不同的return返回不同的样式      |          |
|     相同位置的不同组件     |   框下面有个复选框,点击在counter和``<p>``之间切换       |      每次切换都会清零;不同组件指的是不同一个组件,就是说可能为样式相同的不同组件|
|组件被定义在组件内部,就是function mycomponent里面有function mytextfield|点"点击?次"会清空输入框|不要这么干|
||sarah和talor的得分,名字可切换,分数就一个|重置组件state|
||还是切换,使用key||
|使用key 在``<Chat/>``中|换人了以后清空输入的邮件内容||
||如何保留state,因为你还想要与bob的聊天内容||
||||
|原因在与返回的时候新组件顶了以前组件的位置,所以以前的保留不下来|点击确认,文本框清空重置的错误|解决:要么bureturn,用判断句决定要不要给``<p>``;要么return中用{null}占位|
|<field中键入key|姓名姓氏输入框切换位置,内容没跟着换||
|加key|点不同的人,下面的表单没换||
||点击,图片没有立马换(先清除)||
|key是i还是contact.id|给个项下面都有展开的,倒转顺序以后展开情况却没有跟着走||

### 迁移状态逻辑至 Reducer 中

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 reducer。

你将会学习到
什么是 reducer 函数
如何将 useState 重构成 useReducer
什么时候使用 reducer
如何编写一个好的 reducer

#### 使用 reducer 整合状态逻辑

随着组件复杂度的增加，你将很难一眼看清所有的组件状态更新逻辑。例如，下面的 TaskApp 组件有一个数组类型的状态 tasks，并通过三个不同的事件处理程序来实现任务的添加、删除和修改：

```js
//import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
这个组件的每个事件处理程序都通过 setTasks 来更新状态。随着这个组件的不断迭代，其状态逻辑也会越来越多。为了降低这种复杂度，并让所有逻辑都可以存放在一个易于理解的地方，你可以将这些状态逻辑移到组件之外的一个称为 reducer 的函数中。

Reducer 是处理状态的另一种方式。你可以通过三个步骤将 useState 迁移到 useReducer：

将设置状态的逻辑 修改 成 dispatch 的一个 action；
编写 一个 reducer 函数；
在你的组件中 使用 reducer。
```

```js
//第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action 
你的事件处理程序目前是通过设置状态来 实现逻辑的：
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
移除所有的状态设置逻辑。只留下三个事件处理函数：

handleAddTask(text) 在用户点击 “添加” 时被调用。
handleChangeTask(task) 在用户切换任务或点击 “保存” 时被调用。
handleDeleteTask(taskId) 在用户点击 “删除” 时被调用。
使用 reducers 管理状态与直接设置状态略有不同。它不是通过设置状态来告诉 React “要做什么”，而是通过事件处理程序 dispatch 一个 “action” 来指明 “用户刚刚做了什么”。（而状态更新逻辑则保存在其他地方！）因此，我们不再通过事件处理器直接 “设置 task”，而是 dispatch 一个 “添加/修改/删除任务” 的 action。这更加符合用户的思维。

function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
你传递给 dispatch 的对象叫做 “action”：

function handleDeleteTask(taskId) {
  dispatch(
    // "action" 对象：
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
它是一个普通的 JavaScript 对象。它的结构是由你决定的，但通常来说，它应该至少包含可以表明 发生了什么事情 的信息。（在后面的步骤中，你将会学习如何添加一个 dispatch 函数。）

注意
action 对象可以有多种结构。

按照惯例，我们通常会添加一个字符串类型的 type 字段来描述发生了什么，并通过其它字段传递额外的信息。type 是特定于组件的，在这个例子中 added 和 addded_task 都可以。选一个能描述清楚发生的事件的名字！

dispatch({
  // 针对特定的组件
  type: 'what_happened',
  // 其它字段放这里
});
```

```js
//第 2 步: 编写一个 reducer 函数 
reducer 函数就是你放置状态逻辑的地方。它接受两个参数，分别为当前 state 和 action 对象，并且返回的是更新后的 state：

function yourReducer(state, action) {
  // 给 React 返回更新后的状态
}
React 会将状态设置为你从 reducer 返回的状态。

在这个例子中，要将状态设置逻辑从事件处理程序移到 reducer 函数中，你需要：

声明当前状态（tasks）作为第一个参数；
声明 action 对象作为第二个参数；
从 reducer 返回 下一个 状态（React 会将旧的状态设置为这个最新的状态）。
下面是所有迁移到 reducer 函数的状态设置逻辑：

function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('未知 action: ' + action.type);
  }
}
由于 reducer 函数接受 state（tasks）作为参数，因此你可以 在组件之外声明它。这减少了代码的缩进级别，提升了代码的可读性。

注意
上面的代码使用了 if/else 语句，但是在 reducers 中使用 switch 语句 是一种惯例。两种方式结果是相同的，但 switch 语句读起来一目了然。

在本文档的后续部分我们会像这样使用：

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
我们建议将每个 case 块包装到 { 和 } 花括号中，这样在不同 case 中声明的变量就不会互相冲突。此外，case 通常应该以 return 结尾。如果你忘了 return，代码就会 进入 到下一个 case，这就会导致错误！

如果你还不熟悉 switch 语句，使用 if/else 也是可以的。

```

```js
//为什么称之为 reducer? 
:
尽管 reducer 可以 “减少” 组件内的代码量，但它实际上是以数组上的 reduce() 方法命名的。

reduce() 允许你将数组中的多个值 “累加” 成一个值：

const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
你传递给 reduce 的函数被称为 “reducer”。它接受 目前的结果 和 当前的值，然后返回 下一个结果。React 中的 reducer 和这个是一样的：它们都接受 目前的状态 和 action ，然后返回 下一个状态。这样，action 会随着时间推移累积到状态中。

你甚至可以使用 reduce() 方法以及 initialState 和 actions 数组，通过传递你的 reducer 函数来计算最终的状态：
//indexjs
import tasksReducer from './tasksReducer.js';

let initialState = [];//它是一个空数组，用来存储任务。
let actions = [
  {type: 'added', id: 1, text: '参观卡夫卡博物馆'},
  {type: 'added', id: 2, text: '看木偶戏'},
  {type: 'deleted', id: 1},
  {type: 'added', id: 3, text: '打卡列侬墙'},
];
//定义了包含一堆动作对象的数组

let finalState = actions.reduce(tasksReducer, initialState);
//使用 reduce 方法，将 tasksReducer 函数应用到 actions 数组中的每一个动作上，起始值为 initialState。reduce 方法会依次执行 tasksReducer 函数，将每次执行的结果传递给下一个执行。最终得到的结果是 finalState，即所有动作执行后的最终状态。 就是说对数组actions执行个遍

const output = document.getElementById('output');
output.textContent = JSON.stringify(finalState, null, 2);

//indexhtml
<pre id="output"></pre>

//taskreducerjs
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

```

```js
//第 3 步: 在组件中使用 reducer 
最后，你需要将 tasksReducer 导入到组件中。记得先从 React 中导入 useReducer Hook：

import { useReducer } from 'react';
接下来，你就可以替换掉之前的 useState:

const [tasks, setTasks] = useState(initialTasks);
只需要像下面这样使用 useReducer:

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
useReducer 和 useState 很相似——你必须给它传递一个初始状态，它会返回一个有状态的值和一个设置该状态的函数（在这个例子中就是 dispatch 函数）。但是，它们两个之间还是有点差异的。

useReducer 钩子接受 2 个参数：

一个 reducer 函数
一个初始的 state
它返回如下内容：

一个有状态的值
一个 dispatch 函数（用来 “派发” 用户操作给 reducer）
现在一切都准备就绪了！我们在这里把 reducer 定义在了组件的末尾：
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];
如果有需要，你甚至可以把 reducer 移到一个单独的文件中：
//appjs
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  //[]方括号表示数组解构赋值。这种语法可以将数组中的元素分别赋值给变量
  //tasks这是一个变量，用于存储当前的任务状态（任务列表）。dispatch：这是一个变量，用于存储一个函数，该函数用于分发动作（actions）来更新状态。

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
//taskreducerjs
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
当像这样分离关注点时，我们可以更容易地理解组件逻辑。现在，事件处理程序只通过派发 action 来指定 发生了什么，而 reducer 函数通过响应 actions 来决定 状态如何更新。
```

#### 对比 useState 和 useReducer

Reducers 并非没有缺点！以下是比较它们的几种方法：

代码体积： 通常，在使用 useState 时，一开始只需要编写少量代码。而 useReducer 必须提前编写 reducer 函数和需要调度的 actions。但是，当多个事件处理程序以相似的方式修改 state 时，useReducer 可以减少代码量。
可读性： 当状态更新逻辑足够简单时，useState 的可读性还行。但是，一旦逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，useReducer 允许你将状态更新逻辑与事件处理程序分离开来。
可调试性： 当使用 useState 出现问题时, 你很难发现具体原因以及为什么。 而使用 useReducer 时， 你可以在 reducer 函数中通过打印日志的方式来观察每个状态的更新，以及为什么要更新（来自哪个 action）。 如果所有 action 都没问题，你就知道问题出在了 reducer 本身的逻辑中。 然而，与使用 useState 相比，你必须单步执行更多的代码。
可测试性： reducer 是一个不依赖于组件的纯函数。这就意味着你可以单独对它进行测试。一般来说，我们最好是在真实环境中测试组件，但对于复杂的状态更新逻辑，针对特定的初始状态和 action，断言 reducer 返回的特定状态会很有帮助。
个人偏好： 并不是所有人都喜欢用 reducer，没关系，这是个人偏好问题。你可以随时在 useState 和 useReducer 之间切换，它们能做的事情是一样的！
如果你在修改某些组件状态时经常出现问题或者想给组件添加更多逻辑时，我们建议你还是使用 reducer。当然，你也不必整个项目都用 reducer，这是可以自由搭配的。你甚至可以在一个组件中同时使用 useState 和 useReducer。

#### 编写一个好的 reducers

编写 reducers 时最好牢记以下两点：

reducers 必须是纯粹的。 这一点和 状态更新函数 是相似的，reducers 是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 reducers 必须纯净，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 对象 和 数组。
每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。 举个例子，如果用户在一个由 reducer 管理的表单（包含五个表单项）中点击了 重置按钮，那么 dispatch 一个 reset_form 的 action 比 dispatch 五个单独的 set_field 的 action 更加合理。如果你在一个 reducer 中打印了所有的 action 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！

#### 使用 Immer 简化 reducers

来源于德语单词 “immer”，意思是 “总是” 或 “始终”。这个名字反映了该库的设计理念，即状态总是不可变的。

```js
与在平常的 state 中 修改对象 和 数组 一样，你可以使用 Immer 这个库来简化 reducer。在这里，useImmerReducer 让你可以通过 push 或 arr[i] = 来修改 state ：
//package
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
//appjs
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  //tasksReducer 函数根据动作类型（added, changed, deleted）来更新任务列表。---使用 immer 库来简化不可变状态的更新。
  switch (action.type) {
   //定义 tasksReducer 函数，该函数接受两个参数：draft 和 action。--draft 是当前状态的草稿版，可以在其上进行直接修改。--action 是一个包含 type 和其他属性的对象，描述要执行的操作。
   //使用 switch 语句，根据 action.type 的值选择不同的处理逻辑。

    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
      //如果 action.type 是 'added'
      //向 draft 数组中添加一个新任务对象。这个对象有三个属性：id、text 和 done。---id 是从 action.id 获取的。---text 是从 action.text 获取的。---done 初始值为 false。
      //使用 break 语句跳出当前的 case 块，结束处理。
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
      //如果 action.type 是 'changed'，使用 findIndex 方法找到   draft 数组中任务 id 与 action.task.id 相匹配的任务 的索引。
      //使用 action.task 更新 draft 数组中对应索引位置的任务。
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
      //如果 action.type 是 'deleted'，执行下面的代码块。使用 filter 方法创建一个新数组，包含所有 id 不等于 action.id 的任务，从而删除指定任务。
    }
    default: {
      throw Error('未知 action：' + action.type);
      //如果 action.type 不匹配任何已知的情况，执行 default 块。抛出一个错误，提示未知的 action.type。
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
Reducers 应该是纯净的，所以它们不应该去修改 state。而 Immer 为你提供了一种特殊的 draft 对象，你可以通过它安全的修改 state。在底层，Immer 会基于当前 state 创建一个副本。这就是为什么通过 useImmerReducer 来管理 reducers 时，可以修改第一个参数，且不需要返回一个新的 state 的原因。
```

```js
//摘要
把 useState 转化为 useReducer：
通过事件处理函数 dispatch actions；
编写一个 reducer 函数，它接受传入的 state 和一个 action，并返回一个新的 state；
使用 useReducer 替换 useState；
Reducers 可能需要你写更多的代码，但是这有利于代码的调试和测试。
Reducers 必须是纯净的。
每个 action 都描述了一个单一的用户交互。
使用 Immer 来帮助你在 reducer 里直接修改状态。
```

```js
//第 1 个挑战 共 4 个挑战: 通过事件处理函数 dispatch actions 
目前，ContactList.js 和 Chat.js 中的事件处理程序包含 // TODO 注释。这就是为什么输入不起作用，点击按钮也不会改变收件人的原因。

将这两个 // TODO 替换为 dispatch 相应的 action。如果要查看 action 的结构和类型，请查看 messengerReducer.js 中的 reducer。reducer 已经写好了，你不需要再修改它。你只需要在 ContactList.js 和 Chat.js 中 dispatch 相应的 action 即可。
//appjs
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

//messengereducerjs
export const initialState = {
  selectedId: 0,
  message: '你好',
  //导出初始状态对象 initialState，包含两个属性：selectedId：当前选中的联系人的 ID，初始值为 0。message：当前消息内容，初始值为 '你好'。
};
  //定义了消息应用的初始状态和用于管理状态变化的 reducer 函数。
export function messengerReducer(state, action) {
//定义并导出 messengerReducer 函数，用于根据不同的动作更新状态。--接受两个参数：state（当前状态）和 action（描述状态变化的动作对象）。
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
        //使用 switch 语句根据 action.type 区分不同的动作类型。
        //如果 action.type 是 'changed_selection'，执行以下操作：返回一个新的状态对象，使用展开运算符 ...state 保留现有状态。更新 selectedId 为 action.contactId（新的选中联系人 ID）。重置 message 为空字符串 ''。
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
      //如果 action.type 是 'edited_message'，执行以下操作：返回一个新的状态对象，使用展开运算符 ...state 保留现有状态。更新 message 为 action.message（新的消息内容）。
    }
    default: {
      throw Error('未知 action：' + action.type);
      //如果 action.type 不匹配任何已知的情况，执行 default 块。抛出一个错误，提示未知的 action.type。
    }
  }
}

//contactlistjs
export default function ContactList({contacts, selectedId, dispatch}) {
  //定义了一个联系人列表组件，允许用户选择联系人并触发状态更新。接受三个 props：contacts（联系人列表数组）、selectedId（当前选中联系人的 ID）和 dispatch（用于分发动作的函数）。
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                // TODO: dispatch changed_selection
                //应为: dispatch({
                // type:'change_selection',
                // contactId:contact.id,
                // }),
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
    //生成联系人列表:创建一个 ul 元素，表示无序列表。使用 contacts.map 方法遍历 contacts 数组，为每个联系人生成一个 li 元素。每个 li 元素的 key 属性设置为联系人的 id，确保列表的每个项都有唯一标识。
    //添加按钮并处理点击事件:在每个 li 元素中创建一个 button 按钮。为按钮的 onClick 事件添加处理函数，当按钮被点击时，调用 dispatch 函数，分发一个 changed_selection 动作，并传递 contactId 为当前联系人的 id。
    //显示联系人名称:在按钮内部显示联系人名称。如果 selectedId 等于当前联系人的 id，使用 <b> 标签将联系人名称加粗显示。否则，直接显示联系人名称。
  );
}

//chatjs
import { useState } from 'react';
//定义了一个聊天组件，允许用户输入和发送消息。
export default function Chat({contact, message, dispatch}) {
  return (
    //接受三个 props：contact（当前联系人对象）、message（当前消息内容）和 dispatch（用于分发动作的函数）。
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          // TODO: 派发 edited_message
          // (从 e.target.value 获取输入框的值)
          //dispatch({
          // type: 'edited_messeage',
          // message:e.target.value,
          // });
        }}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
    //创建文本区域:创建一个 textarea 元素，用于输入消息。value 属性设置为当前的 message 内容。placeholder 属性显示提示文本，内容为 “和 [contact.name] 聊天”。
    //处理文本区域的变化事件:处理文本区域的变化事件:为 textarea 元素的 onChange 事件添加处理函数，当文本区域内容发生变化时，调用 dispatch 函数。分发一个 edited_message 动作，并传递新的消息内容 e.target.value。
    //添加换行和发送按钮:添加一个换行 <br /> 元素，将接下来的内容换行显示。创建一个 button 按钮，按钮文本为 “发送到 [contact.email]”，表示将消息发送到联系人的电子邮件。
  );
}
答案
从 reducer 函数的代码中，你可以推断出 actions 需要像下面这样：

// 当用户点击 "Alice"
dispatch({
  type: 'changed_selection',
  contactId: 1,
});

// 当用户输入 "你好！"
dispatch({
  type: 'edited_message',
  message: '你好！',
});
下面是更新后的示例，可以实现派发相应的消息：
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  message: '你好',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}
```

```js
//第 2 个挑战 共 4 个挑战: 发送消息时清空输入框 
目前，点击 发送 没有任何反应。我们需要给 发送 按钮添加一个事件处理程序，它将：

显示一个包含收件人电子邮件和信息的 alert。
清空输入框。
//appjs
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
//messengerreducerjs
export const initialState = {
  selectedId: 0,
  message: '你好',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
//contactlistjs
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
//chatjs
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
      // <button
      // onclick={()=>{
      //   alert('正在发送"${message}"到${contact.email}');
      //   dispatch({
      //     type:'edited_message',
      //     message:'',
      //   });
      // }}>
      // 发送到{contact.email}</button>
  );
  //就是说onclick的时候加一个alert,再跟一个dispatch动作清空

  //还有一种是再加一个action起名叫做sent_message
  //在messengerReducer.js中
  //case 'sent_message':{
  // return{
  //   ...state,
  //   message:'',
  // };
  // }
  //在chatjs中botton onclick时依然是alert(`正在发送 "${message}" 到 ${contact.email}`);
  //跟上dispatch({
  // type:'sent_message',
  // });
}
答案
在 “发送” 按钮的事件处理程序中，有很多方法可以用来清空输入框。一种方法是显示一个 alert，然后 dispatch 一个名为 edited_message 且带有空 message 的 action：
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  message: '你好',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`正在发送 "${message}" 到 ${contact.email}`);
          dispatch({
            type: 'edited_message',
            message: '',
          });
        }}>
        发送到 {contact.email}
      </button>
    </section>
  );
}
这样当你点击 “发送” 按钮时就会清空输入框。

然而，从用户的角度来看，发送消息与编辑字段是不同的操作。为了体现这一点，你可以创建一个名为 sent_message 的新 action，并在 reducer 中单独处理：
export const initialState = {
  selectedId: 0,
  message: '你好',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
结果虽然是一样的。但请记住，action 的类型应该准确描述 “用户做了什么”，而不是 “你希望状态如何改变”。这使得以后添加更多特性变的容易。

不管是哪一种解决方案，最重要的是你 不要 把 alert 放置在 reducer 中。reducer 必须是一个纯函数——它应该只计算下一个状态。而不应该 “做” 其它事情，包括向用户显示消息。这应该在事件处理程序中处理。（为了便于捕获这样的错误，React 会在严格模式下多次调用你的 reducer。这就是为什么当你在 reducer 中加入一个 alert，它会触发两次的原因。）
```

```js
//第 3 个挑战 共 4 个挑战: 切换 tab 时重置输入框内容 
在这个示例中，切换收件人时总是会清空输入框。

case 'changed_selection': {
  return {
    ...state,
    selectedId: action.contactId,
    message: '' // 清空输入框
  };
这是因为你不希望在多个收件人之间共享单个邮件草稿。但如果你的应用程序能单独 “记住” 每个联系人的草稿，并在你切换联系人时恢复，那就更好了。

你的任务是改变状态的组织形式，以便能记住 每个联系人 的消息草稿。你需要对 reducer、初始状态和组件进行一些修改。
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  //更新message组件来从当前选中的读取信息  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  message: '你好',
  //像这样组织state  
  // messages: {
  //   0: 'Hello, Taylor',
  //   1: 'Hello, Alice',
  //   2: 'Hello, Bob',
  // },
  //这种 [key]: value 计算属性 可以帮你更新 messages 对象：
  // {  ...state.messages,
  // [id]: message}
  //定义并导出初始状态对象 initialState，包含两个属性：----selectedId：当前选中的联系人的 ID，初始值为 0。----messages：一个对象，键是联系人 ID，值是与该联系人的初始消息内容。
};

export function messengerReducer(state, action) {
  //定义并导出 messengerReducer 函数，用于根据不同的动作更新状态。接受两个参数：state（当前状态）和 action（描述状态变化的动作对象）。
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',//此行不要,???
      };
      //如果 action.type 是 'changed_selection'，执行以下操作：返回一个新的状态对象，使用展开运算符 ...state 保留现有状态。更新 selectedId 为 action.contactId（新的选中联系人 ID）。
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
        //存消息草稿   messages: {
        //   ...state.messages,
        //   [state.selectedId]: action.message,
        // },
        //如果 action.type 是 'edited_message'，执行以下操作：返回一个新的状态对象，使用展开运算符 ...state 保留现有状态。更新 messages 对象，将 selectedId 对应的消息内容更新为 action.message。
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
        //         messages: {
        //   ...state.messages,
        //   [state.selectedId]: '',
        // },
        //如果 action.type 是 'sent_message'，执行以下操作：返回一个新的状态对象，使用展开运算符 ...state 保留现有状态。更新 messages 对象，将 selectedId 对应的消息内容重置为空字符串 ''。
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`正在发送 "${message}" 到 ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        发送到 {contact.email}
      </button>
    </section>
  );
}

答案
你将需要更新 reducer 来为每个联系人分别存储并更新一个消息草稿：

// 当输入框内容被修改时
case 'edited_message': {
  return {
    // 保存其它的 state，比如当前选中的
    ...state,
    messages: {
      // 保存其他联系人的消息
      ...state.messages,
      // 改变当前联系人的消息
      [state.selectedId]: action.message
    }
  };
}
你还需要更新 Messenger 组件来从当前选中的联系人读取信息：

const message = state.messages[state.selectedId];
下面是完整答案:
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`正在发送 "${message}" 到 ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        发送到 {contact.email}
      </button>
    </section>
  );
}

显然，你不再需要通过修改任何事件处理程序来实现不同的行为。但如果没使用 reducer 的话，你不得不在每个事件处理程序中去更新状态。
```

```js
//第 4 个挑战 共 4 个挑战: 从零开始实现 useReducer 
在前面的例子中，你从 React 中导入了 useReducer Hook。现在，你将学习自己实现 useReducer Hook。你可以从这个模板开始，它不会超过 10 行代码。

为了验证你的修改，试着在输入框中输入文字或选择联系人。
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

import { useState } from 'react';

export function useReducer(reducer, initialState) {
  //接受两个参数：reducer（处理状态更新的函数）和 initialState（初始状态）。
  const [state, setState] = useState(initialState);//使用 useState Hook 初始化状态 state，初始值为 initialState。setState 是更新状态的函数。
  
  //在这里加
  //  function dispatch(action) {
  //   const nextState = reducer(state, action);
  //   setState(nextState);
  // }
  //定义一个名为 dispatch 的函数，用于分发动作。---接受一个参数 action，表示要执行的动作。---调用 reducer 函数，将当前状态 state 和 action 传入，计算得到下一个状态 nextState。---使用 setState 更新状态为 nextState。

//更准确的实现 function dispatch(action) {  setState((s) => reducer(s, action));}这是因为被派发的 actions 在下一次渲染之前都是处于排队状态的，这和 状态更新函数 类似。
//dispatch 函数的作用是当接收到一个 action 时，它会使用当前状态 s 和这个 action 调用 reducer 函数，计算出新的状态，并使用 setState 更新当前状态为这个新的状态。这样，通过 dispatch 函数，可以触发状态的更新。
  return [state, dispatch];//返回一个数组，包含当前状态 state 和分发动作的函数 dispatch。
}
答案:
dispatch 一个 action 去调用一个具有当前 state 和 action 的 reducer，并将结果存储为下一个 state。下面是它在代码中的样子：
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}


虽然在大多数情况下这并不重要，但更准确的实现是这样的：

function dispatch(action) {
  setState((s) => reducer(s, action));
}
这是因为被派发的 actions 在下一次渲染之前都是处于排队状态的，这和 状态更新函数 类似。
```

#### reducer表格

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
|    写好一串action打包,然后在组件中调用      |       dispatch的使用   |          |
|    在buttononclick中键入alert和dispatchtype,这个type可以另立,也可以使用已有的edit_message      |    使点击发送按钮出现alert,alert以后清空输入框    |          |
|    细节上改空为有东西      |    你想在切换时保存之前给某人发的草稿      |          |
|dispatch一个action,用reducer(参:s,action)算一个新state来setState|问题四很抽象||

### 使用 Context 深层传递参数

通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

你将会学习到
什么是 “prop 逐级透传”
如何使用 context 代替重复的参数传递
Context 的常见用法
Context 的常见替代方案

#### 传递 props 带来的问题

传递 props 是将数据通过 UI 树显式传递到使用它的组件的好方法。

但是当你需要在组件树中深层传递参数以及需要在组件间复用相同的参数时，传递 props 就会变得很麻烦。最近的根节点父组件可能离需要数据的组件很远，状态提升 到太高的层级会导致 “逐层传递 props” 的情况。

!!!此处插入图19

要是有一种方法可以在组件树中不需要 props 将数据“直达”到所需的组件中，那可就太好了。React 的 context 功能可以满足我们的这个心愿。

#### Context：传递 props 的另一种方法

Context 让父组件可以为它下面的整个组件树提供数据。Context 有很多种用途。这里就有一个示例。思考一下这个 Heading 组件接收一个 level 参数来决定它标题尺寸的场景：

```js
//appjs
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>主标题</Heading>
      <Heading level={2}>副标题</Heading>
      <Heading level={3}>子标题</Heading>
      <Heading level={4}>子子标题</Heading>
      <Heading level={5}>子子子标题</Heading>
      <Heading level={6}>子子子子标题</Heading>
    </Section>
  );
}
//sectionsjs
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
//headingjs
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}
假设你想让相同 Section 中的多个 Heading 具有相同的尺寸：
//appjs
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>主标题</Heading>
      <Section>
        <Heading level={2}>副标题</Heading>
        <Heading level={2}>副标题</Heading>
        <Heading level={2}>副标题</Heading>
        <Section>
          <Heading level={3}>子标题</Heading>
          <Heading level={3}>子标题</Heading>
          <Heading level={3}>子标题</Heading>
          <Section>
            <Heading level={4}>子子标题</Heading>
            <Heading level={4}>子子标题</Heading>
            <Heading level={4}>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

目前，你将 level 参数分别传递给每个 <Heading>：

<Section>
  <Heading level={3}>关于</Heading>
  <Heading level={3}>照片</Heading>
  <Heading level={3}>视频</Heading>
</Section>
将 level 参数传递给 <Section> 组件而不是传给 <Heading> 组件看起来更好一些。这样的话你可以强制使同一个 section 中的所有标题都有相同的尺寸：

<Section level={3}>
  <Heading>关于</Heading>
  <Heading>照片</Heading>
  <Heading>视频</Heading>
</Section>
但是 <Heading> 组件是如何知道离它最近的 <Section> 的 level 的呢？这需要子组件可以通过某种方式“访问”到组件树中某处在其上层的数据。

你不能只通过 props 来实现它。这就是 context 大显身手的地方。你可以通过以下三个步骤来实现它：

创建 一个 context。（你可以将其命名为 LevelContext, 因为它表示的是标题级别。)
在需要数据的组件内 使用 刚刚创建的 context。（Heading 将会使用 LevelContext。）
在指定数据的组件中 提供 这个 context。 （Section 将会提供 LevelContext。）
Context 可以让父节点，甚至是很远的父节点都可以为其内部的整个组件树提供数据。
```

!!!插入图片20

```js
//Step 1：创建 context 
首先，你需要创建这个 context，并 将其从一个文件中导出，这样你的组件才可以使用它：
```

```js
//import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>主标题</Heading>
      <Section>
        <Heading level={2}>副标题</Heading>
        <Heading level={2}>副标题</Heading>
        <Heading level={2}>副标题</Heading>
        <Section>
          <Heading level={3}>子标题</Heading>
          <Heading level={3}>子标题</Heading>
          <Heading level={3}>子标题</Heading>
          <Section>
            <Heading level={4}>子子标题</Heading>
            <Heading level={4}>子子标题</Heading>
            <Heading level={4}>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

import { createContext } from 'react';

export const LevelContext = createContext(1);
createContext 只需默认值这么一个参数。在这里, 1 表示最大的标题级别，但是你可以传递任何类型的值（甚至可以传入一个对象）。你将在下一个步骤中见识到默认值的意义。
```

```js
//Step 2：使用 Context 
从 React 中引入 useContext Hook 以及你刚刚创建的 context:

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
目前，Heading 组件从 props 中读取 level：

export default function Heading({ level, children }) {
  // ...
}
删掉 level 参数并从你刚刚引入的 LevelContext 中读取值：

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
useContext 是一个 Hook。和 useState 以及 useReducer一样，你只能在 React 组件中（不是循环或者条件里）立即调用 Hook。useContext 告诉 React Heading 组件想要读取 LevelContext。

现在 Heading 组件没有 level 参数，你不需要再像这样在你的 JSX 中将 level 参数传递给 Heading：

<Section>
  <Heading level={4}>子子标题</Heading>
  <Heading level={4}>子子标题</Heading>
  <Heading level={4}>子子标题</Heading>
</Section>
修改一下 JSX，让 Section 组件代替 Heading 组件接收 level 参数：

<Section level={4}>
  <Heading>子子标题</Heading>
  <Heading>子子标题</Heading>
  <Heading>子子标题</Heading>
</Section>
你将修改下边的代码直到它正常运行：
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

import { createContext } from 'react';

export const LevelContext = createContext(1);

注意！这个示例还不能运行。所有 headings 的尺寸都一样，因为 即使你正在使用 context，但是你还没有提供它。 React 不知道从哪里获取这个 context！

如果你不提供 context，React 会使用你在上一步指定的默认值。在这个例子中，你为 createContext 传入了 1 这个参数，所以 useContext(LevelContext) 会返回 1，把所有的标题都设置为<h1>。我们通过让每个 Section 提供它自己的 context 来修复这个问题。

```

```js
//Step 3：提供 context 
Section 组件目前渲染传入它的子组件：

export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
把它们用 context provider 包裹起来  以提供 LevelContext 给它们：

import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
这告诉 React：“如果在 <Section> 组件中的任何子组件请求 LevelContext，给他们这个 level。”组件会使用 UI 树中在它上层最近的那个 <LevelContext.Provider> 传递过来的值。
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

import { createContext } from 'react';

export const LevelContext = createContext(1);

这与原始代码的运行结果相同，但是你不需要向每个 Heading 组件传递 level 参数了！取而代之的是，它通过访问上层最近的 Section 来“断定”它的标题级别：

你将一个 level 参数传递给 <Section>。
Section 把它的子元素包在 <LevelContext.Provider value={level}> 里面。
Heading 使用 useContext(LevelContext) 访问上层最近的 LevelContext 提供的值。
```

#### 在相同的组件中使用并提供 context

```js
//目前，你仍需要手动指定每个 section 的 level：

export default function Page() {
  return (
    <Section level={1}>
      ...
      <Section level={2}>
        ...
        <Section level={3}>
          ...
由于 context 让你可以从上层的组件读取信息，每个 Section 都会从上层的 Section 读取 level，并自动向下层传递 level + 1。
你可以像下面这样做：

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
这样修改之后，你不用将 level 参数传给 <Section> 或者是 <Heading> 了：
```

```js
//import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>主标题</Heading>
      <Section>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading 必须在 Section 内部！');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

import { createContext } from 'react';

export const LevelContext = createContext(0);

现在，Heading 和 Section 都通过读取 LevelContext 来判断它们的深度。而且 Section 把它的子组件都包在 LevelContext 中来指定其中的任何内容都处于一个“更深”的级别。

注意
本示例使用标题级别来展示，因为它们直观地显示了嵌套组件如何覆盖 context。但是 context 对于许多其他的场景也很有用。你可以用它来传递整个子树需要的任何信息：当前的颜色主题、当前登录的用户等。
```

#### Context 会穿过中间层级的组件

```js
// 
你可以在提供 context 的组件和使用它的组件之间的层级插入任意数量的组件。这包括像 <div> 这样的内置组件和你自己创建的组件。

在这个示例中，相同的 Post 组件（带有虚线边框）在两个不同的嵌套层级上渲染。注意，它内部的 <Heading> 会自动从最近的 <Section> 获取它的级别：
import Heading from './Heading.js';
import Section from './Section.js';

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="旅行者，你好！"
        body="来看看我的冒险。"
      />
      <AllPosts />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>帖子</Heading>
      <RecentPosts />
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>最近的帖子</Heading>
      <Post
        title="里斯本的味道"
        body="...那些蛋挞！"
      />
      <Post
        title="探戈节奏中的布宜诺斯艾利斯"
        body="我爱它！"
      />
    </Section>
  );
}

function Post({ title, body }) {
  return (
    <Section isFancy={true}>
      <Heading>
        {title}
      </Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children, isFancy }) {
  const level = useContext(LevelContext);
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading 必须在 Section 内部！');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('未知的 level：' + level);
  }
}

import { createContext } from 'react';

export const LevelContext = createContext(0);
你不需要做任何特殊的操作。Section 为它内部的树指定一个 context，所以你可以在任何地方插入一个 <Heading>，而且它会有正确的尺寸。在上边的沙箱中尝试一下！

Context 让你可以编写“适应周围环境”的组件，并且根据 在哪 （或者说 在哪个 context 中）来渲染它们不同的样子。

Context 的工作方式可能会让你想起 CSS 属性继承。在 CSS 中，你可以为一个 <div> 手动指定 color: blue，并且其中的任何 DOM 节点，无论多深，都会继承那个颜色，除非中间的其他 DOM 节点用 color: green 来覆盖它。类似地，在 React 中，覆盖来自上层的某些 context 的唯一方法是将子组件包裹到一个提供不同值的 context provider 中。

在 CSS 中，诸如 color 和 background-color 之类的不同属性不会覆盖彼此。你可以设置所有 <div> 的 color 为红色，而不会影响 background-color。类似地，不同的 React context 不会覆盖彼此。你通过 createContext() 创建的每个 context 都和其他 context 完全分离，只有使用和提供 那个特定的 context 的组件才会联系在一起。一个组件可以轻松地使用或者提供许多不同的 context。
```

#### 写在你使用 context 之前

使用 Context 看起来非常诱人！然而，这也意味着它也太容易被过度使用了。如果你只想把一些 props 传递到多个层级中，这并不意味着你需要把这些信息放到 context 里。

在使用 context 之前，你可以考虑以下几种替代方案：

从 传递 props 开始。 如果你的组件看起来不起眼，那么通过十几个组件向下传递一堆 props 并不罕见。这有点像是在埋头苦干，但是这样做可以让哪些组件用了哪些数据变得十分清晰！维护你代码的人会很高兴你用 props 让数据流变得更加清晰。
抽象组件并 将 JSX 作为 children 传递 给它们。 如果你通过很多层不使用该数据的中间组件（并且只会向下传递）来传递数据，这通常意味着你在此过程中忘记了抽象组件。举个例子，你可能想传递一些像 posts 的数据 props 到不会直接使用这个参数的组件，类似 ``<Layout posts={posts} />``。取而代之的是，让 Layout 把 children 当做一个参数，然后渲染 ``<Layout><Posts posts={posts} /></Layout>``。这样就减少了定义数据的组件和使用数据的组件之间的层级。
如果这两种方法都不适合你，再考虑使用 context。

#### Context 的使用场景

主题： 如果你的应用允许用户更改其外观（例如暗夜模式），你可以在应用顶层放一个 context provider，并在需要调整其外观的组件中使用该 context。
当前账户： 许多组件可能需要知道当前登录的用户信息。将它放到 context 中可以方便地在树中的任何位置读取它。某些应用还允许你同时操作多个账户（例如，以不同用户的身份发表评论）。在这些情况下，将 UI 的一部分包裹到具有不同账户数据的 provider 中会很方便。
路由： 大多数路由解决方案在其内部使用 context 来保存当前路由。这就是每个链接“知道”它是否处于活动状态的方式。如果你创建自己的路由库，你可能也会这么做。
状态管理： 随着你的应用的增长，最终在靠近应用顶部的位置可能会有很多 state。许多遥远的下层组件可能想要修改它们。通常 将 reducer 与 context 搭配使用来管理复杂的状态并将其传递给深层的组件来避免过多的麻烦。
Context 不局限于静态值。如果你在下一次渲染时传递不同的值，React 将会更新读取它的所有下层组件！这就是 context 经常和 state 结合使用的原因。

一般而言，如果树中不同部分的远距离组件需要某些信息，context 将会对你大有帮助。

```js
//摘要
Context 使组件向其下方的整个树提供信息。
传递 Context 的方法:
通过 export const MyContext = createContext(defaultValue) 创建并导出 context。
在无论层级多深的任何子组件中，把 context 传递给 useContext(MyContext) Hook 来读取它。
在父组件中把 children 包在 <MyContext.Provider value={...}> 中来提供 context。
Context 会穿过中间的任何组件。
Context 可以让你写出 “较为通用” 的组件。
在使用 context 之前，先试试传递 props 或者将 JSX 作为 children 传递。
```

```js
//第 1 个挑战 共 1 个挑战: 用 context 替代逐层 props 
在这个示例中，切换复选框状态会修改传入每个 <PlaceImage> 的 imageSize 参数。复选框的 state 保存在顶层的 App 组件中，但是每个 <PlaceImage> 都需要注意它。

目前，App 将 imageSize 传递给 List，List 再将其传递给每个 Place，Place 又将其传递给 PlaceImage。移除 imageSize 参数，并在 App 组件中直接将其传递给 PlaceImage。

你可以在 Context.js 中声明 context。
//appjs
import { useState } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
//加个import
//import { ImageSizeContext } from './Context.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  //定义并导出 App 函数组件。--使用 useState Hook 初始化状态 isLarge 为 false，并定义 setIsLarge 函数更新状态。---根据 isLarge 状态来确定 imageSize 大小，如果 isLarge 为 true，则 imageSize 为 150，否则为 100。
  return (
    //加个provider
    //<ImageSizeContext.Provider
    // value={imageSize}
    // > </ImageSizeContext.Provider>
    //<LIist />里面没东西
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List imageSize={imageSize} />
    </>
  )
  //返回一个包含 JSX 结构的片段：--一个 label 元素，包含一个复选框，用于切换 isLarge 状态。---复选框的 checked 属性绑定 isLarge 状态，onChange 事件更新 isLarge 状态。---一个水平线 <hr />。---一个 List 组件，传递 imageSize 属性。
}

function List({ imageSize }) {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place
        place={place}
        imageSize={imageSize}
      />
    </li>
    //imagesize都去掉
  );
  return <ul>{listItems}</ul>;
  //定义 List 函数组件，接受 imageSize 属性。---使用 places 数据数组生成 listItems，每个地方创建一个 li 元素，包含一个 Place 组件。---返回一个包含 listItems 的 ul 元素。
}

function Place({ place, imageSize }) {
  return (
    //imagesize去掉
    <>
      <PlaceImage
        place={place}
        imageSize={imageSize}
      />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
  //定义 Place 函数组件，接受 place 和 imageSize 属性。---返回一个片段，包含一个 PlaceImage 组件和一个描述文本 p 元素。
}

function PlaceImage({ place, imageSize }) {
  //const imageSize = useContext(ImageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
  //定义 PlaceImage 函数组件，接受 place 和 imageSize 属性。---返回一个 img 元素，设置 src 属性为 getImageUrl(place) 返回的 URL，alt 属性为 place.name，width 和 height 属性为 imageSize。
}

//组件关系与数据流
//App 组件管理 isLarge 状态，通过 ImageSizeContext.Provider 提供 imageSize 给子组件。
//List 组件从 places 数据数组生成 Place 组件列表。
//Place 组件包含 PlaceImage 组件和文本描述。
//PlaceImage 组件通过 useContext 从 ImageSizeContext 获取 imageSize 并应用于图片大小。

//contextjs  补全
import { createContext } from 'react';
export const ImageSizeContext = createContext(500);

//datajs
export const places = [{
  id: 0,
  name: '南非开普敦的波卡普区',
  description: '为房屋选择亮色的传统始于 20 世纪后期。',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: '中国台湾省台中市彩虹村',
  description: '1924 年，当地居民黄永福为了避免拆迁，将 1200 间房屋全部粉刷。',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: '墨西哥的帕丘卡宏观壁画',
  description: '世界上最大的壁画之一，覆盖了山坡上的房屋。',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: '巴西里约热内卢的塞拉龙楼梯',
  description: '这个地标由智利出生的艺术家 Jorge Selarón 创作，以“向巴西人民致敬”。',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: '意大利布拉诺',
  description: '这些房屋按照一个可追溯到 16 世纪的特定颜色系统进行粉刷。',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: '摩洛哥舍夫沙万',
  description: '关于为什么房屋被涂成蓝色，有几种理论，包括这几种颜色可以驱蚊或者它象征着天空和天堂。',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: '韩国釜山甘川文化村',
  description: '2009 年，该村通过粉刷房屋并举办展览和艺术装置而转变为文化中心。',
  imageId: 'ZfQOOzf'
}];

//utilsjs
export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
答案
移除掉所有组件中的 imageSize 参数。

在 Context.js 中创建并导出 ImageSizeContext。然后用 <ImageSizeContext.Provider value={imageSize}> 包裹住整个列表来向下传递值，最后在 PlaceImage 中使用 useContext(ImageSizeContext) 来读取它。
import { useState, useContext } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import { ImageSizeContext } from './Context.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <ImageSizeContext.Provider
      value={imageSize}
    >
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </ImageSizeContext.Provider>
  )
}

function List() {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place place={place} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(ImageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}

import { createContext } from 'react';

export const ImageSizeContext = createContext(500);

export const places = [{
  id: 0,
  name: '南非开普敦的波卡普区',
  description: '为房屋选择亮色的传统始于 20 世纪后期。',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: '中国台湾省台中市彩虹村',
  description: '1924 年，当地居民黄永福为了避免拆迁，将 1200 间房屋全部粉刷。',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: '墨西哥的帕丘卡宏观壁画',
  description: '世界上最大的壁画之一，覆盖了山坡上的房屋。',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: '巴西里约热内卢的塞拉龙楼梯',
  description: '这个地标由智利出生的艺术家 Jorge Selarón 创作，以“向巴西人民致敬”。',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: '意大利布拉诺',
  description: '这些房屋按照一个可追溯到 16 世纪的特定颜色系统进行粉刷。',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: '摩洛哥舍夫沙万',
  description: '关于为什么房屋被涂成蓝色，有几种理论，包括这几种颜色可以驱蚊或者它象征着天空和天堂。',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: '韩国釜山甘川文化村',
  description: '2009 年，该村通过粉刷房屋并举办展览和艺术装置而转变为文化中心。',
  imageId: 'ZfQOOzf'
}];

export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
请注意中间的组件是怎样实现不用传入 imageSize 参数的。
```

#### 使用context深传参表格

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||就是说level给到``<section>``,它下面的heading>都有了这个level级别||
|试着更改1234为1432看效果|不需向每个 Heading 传递 level 参数，通过访问上层最近的 Section 来定标题级别||
||不用自己在section上设置了|从上层的 Section读取level并自动向下层传递 level+ 1|
||使用图像大小在整个组件最上方嵌套,下面无需使用imagesize,由最底层的组件来用一下就都能用上了||

### 使用 Reducer 和 Context 拓展你的应用

Reducer 可以整合组件的状态更新逻辑。Context 可以将信息深入传递给其他组件。你可以组合使用它们来共同管理一个复杂页面的状态。

你将会学习到
如何结合使用 reducer 和 context
如何去避免通过 props 传递 state 和 dispatch
如何将 context 和状态逻辑保存在一个单独的文件中

#### 结合使用 reducer 和 context

在 reducer 介绍 的例子里面，状态被 reducer 所管理。reducer 函数包含了所有的状态更新逻辑并在此文件的底部声明：

```js
//import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}

import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
Reducer 有助于保持事件处理程序的简短明了。但随着应用规模越来越庞大，你就可能会遇到别的困难。目前，tasks 状态和 dispatch 函数仅在顶级 TaskApp 组件中可用。要让其他组件读取任务列表或更改它，你必须显式 传递 当前状态和事件处理程序，将其作为 props。

例如，TaskApp 将 一系列 task 和事件处理程序传递给 TaskList：

<TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/>
TaskList 将事件处理程序传递给 Task：

<Task
  task={task}
  onChange={onChangeTask}
  onDelete={onDeleteTask}
/>
在像这样的小示例里这样做没什么问题，但是如果你有成千上百个组件，传递所有状态和函数可能会非常麻烦！

这就是为什么，比起通过 props 传递它们，你可能想把 tasks 状态和 dispatch 函数都 放入 context。这样，所有的在 TaskApp 组件树之下的组件都不必一直往下传 props 而可以直接读取 tasks 和 dispatch 函数。

下面将介绍如何结合使用 reducer 和 context：

创建 context。
将 state 和 dispatch 放入 context。
在组件树的任何地方 使用 context。
```

```js
//第一步: 创建 context 
useReducer 返回当前的 tasks 和 dispatch 函数来让你更新它们：

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
为了将它们从组件树往下传，你将 创建 两个不同的 context：

TasksContext 提供当前的 tasks 列表。
TasksDispatchContext 提供了一个函数可以让组件分发动作。
将它们从单独的文件导出，以便以后可以从其他文件导入它们：
//app
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
    //定义并导出 TaskApp 函数组件。使用 useReducer Hook 初始化状态 tasks 和 dispatch 函数。tasksReducer 是 reducer 函数，initialTasks 是初始任务列表。
  );
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
      //接收任务文本
    });
  }
  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
      //接收任务对象
    });
  }
  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
      //接收任务id
    });
  }
  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
    //返回一个包含 JSX 结构的片段：
    // 一个标题 <h1>。
   // AddTask 组件，传递handleAddTask 回调函数。
   // TaskList 组件，传递任务列表 tasks 和任务操作回调函数。
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
  //tasksReducer 函数根据 action.type 执行不同的操作：
  // added：返回一个新任务列表，增加新任务。
  // changed：返回一个修改后的任务列表，更新指定任务。
  // deleted：返回一个过滤后的任务列表，删除指定任务。
  // default：抛出未知动作类型的错误。
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

//taskscontext
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

//addtask
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}

//tasklist
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
    //如果 isEditing 为 true，显示输入框和 "Save" 按钮：输入框的值绑定到 task.text。输入框的 onChange 事件调用 onChange 回调函数，更新任务文本。"Save" 按钮的 onClick 事件设置 isEditing 为 false，退出编辑模式。
    //如果 isEditing 为 false，显示任务文本和 "Edit" 按钮："Edit" 按钮的 onClick 事件设置 isEditing 为 true，进入编辑模式。
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
  //返回一个 <label> 元素，包含以下内容：
  //复选框：type 为 checkbox，checked 绑定到 task.done，onChange 事件调用 onChange 回调函数，更新任务完成状态。
  //taskContent：根据 isEditing 状态显示不同内容。
  //"Delete" 按钮：onClick 事件调用 onDelete 回调函数，删除任务。
}
在这里，你把 null 作为默认值传递给两个 context。实际值是由 TaskApp 组件提供的。
```

```js
//第二步: 将 state 和 dispatch 函数 放入 context 
现在，你可以将所有的 context 导入 TaskApp 组件。获取 useReducer() 返回的 tasks 和 dispatch 并将它们 提供 给整个组件树：

import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
现在，你可以同时通过 props 和 context 传递信息：
//app
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask
          onAddTask={handleAddTask}
        />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
//taskscontext
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
//addtask
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
//tasklist
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
在下一步中，你将删除通过 props 传递的代码。
```

```js
//Step 3: 在组件树中的任何地方使用 context 
现在你不需要将 tasks 和事件处理程序在组件树中传递：

<TasksContext.Provider value={tasks}>
  <TasksDispatchContext.Provider value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext.Provider>
</TasksContext.Provider>
相反，任何需要 tasks 的组件都可以从 TaskContext 中读取它：

export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...
任何组件都可以从 context 中读取 dispatch 函数并调用它，从而更新任务列表：

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
TaskApp 组件不会向下传递任何事件处理程序，TaskList 也不会。每个组件都会读取它需要的 context：
//app  定义了一个任务管理应用，通过 useReducer 和上下文来管理和分发任务数据。
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';
//从 React 库中导入 useReducer Hook。导入 AddTask 和 TaskList 组件。导入 TasksContext 和 TasksDispatchContext 上下文。

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
  //定义并导出 TaskApp 函数组件。
  //使用 useReducer Hook 初始化状态和分发函数，tasksReducer 为 reducer 函数，initialTasks 为初始状态。
  //使用 TasksContext.Provider 提供 tasks 状态值。
  //使用 TasksDispatchContext.Provider 提供 dispatch 分发函数。
  //渲染标题 <h1>、AddTask 和 TaskList 组件。
}

function tasksReducer(tasks, action) {
  //定义 tasksReducer 函数，用于处理不同类型的任务操作。added：添加新任务，将新任务对象追加到任务数组。changed：修改任务，根据任务 id 查找并更新任务。deleted：删除任务，根据任务 id 过滤掉对应任务。default：抛出错误，处理未知操作类型。
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
 
//taskscontext  创建了两个上下文，用于在组件树中共享任务状态和任务分发函数。
import { createContext } from 'react';

export const TasksContext = createContext(null);
//使用 createContext 函数创建一个新的上下文对象 TasksContext，初始值为 null。上下文对象的作用是提供一个途径，将数据传递给组件树中的任何组件，而不必通过 props 一层层传递。
export const TasksDispatchContext = createContext(null);
//使用 createContext 函数创建另一个上下文对象 TasksDispatchContext，初始值也为 null。这个上下文对象将用于共享任务分发函数，允许组件在不直接传递 props 的情况下分发任务操作。
//TasksContext：用于存储和共享任务状态（tasks）。任何需要读取任务状态的组件都可以使用这个上下文。
//TasksDispatchContext：用于存储和共享任务分发函数（dispatch）。任何需要触发任务操作的组件都可以使用这个上下文。

//addtask   组件提供了一个输入框和按钮，允许用户添加任务，点击按钮后将新任务通过上下文的 dispatch 函数添加到任务列表中。
import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.js';
//从 React 库中导入 useState 和 useContext 钩子函数。从 TasksContext.js 文件中导入 TasksDispatchContext。

export default function AddTask() {
  const [text, setText] = useState('');//使用 useState 钩子定义一个名为 text 的状态变量和一个名为 setText 的更新函数。初始值为一个空字符串。
  const dispatch = useContext(TasksDispatchContext);//使用 useContext 钩子从 TasksDispatchContext 中获取 dispatch 函数。这个 dispatch 函数将用于分发添加任务的 action。
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
  //返回 JSX 结构： 
  //输入框：placeholder：显示占位符文本 "Add task"。value：绑定到 text 状态变量，显示当前输入的文本。onChange：当输入框内容改变时，调用 setText 更新 text 状态。
  //按钮：onClick：当按钮被点击时，触发以下操作：清空输入框（调用 setText('')）。使用 dispatch 函数分发一个 added 类型的 action，包含新任务的 id 和 text。
}
let nextId = 3;

//tasklist  组件显示任务列表，允许用户编辑、删除任务，以及通过复选框标记任务是否完成。
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';
//从 React 库中导入 useState 和 useContext 钩子函数。从 TasksContext.js 文件中导入 TasksContext 和 TasksDispatchContext。

export default function TaskList() {
  const tasks = useContext(TasksContext);
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
  //使用 useContext 钩子从 TasksContext 中获取任务列表。  返回一个包含任务列表的 ul 元素，其中每个任务是一个 li 元素，并包含一个 Task 组件。
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  //使用 useState 钩子定义 isEditing 状态，用于跟踪任务是否处于编辑状态。使用 useContext 钩子从 TasksDispatchContext 中获取 dispatch 函数。
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
    //根据 isEditing 状态，渲染不同的内容：如果处于编辑状态，显示输入框和保存按钮。如果不处于编辑状态，显示任务文本和编辑按钮。
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
    //渲染一个复选框，允许用户标记任务是否完成。 当复选框状态改变时，分发 changed 类型的 action 更新任务完成状态。
    //显示任务内容（根据 isEditing 状态）。
    //渲染一个删除按钮，允许用户删除任务。当点击删除按钮时，分发 deleted 类型的 action 删除任务。
  );
}
state 仍然 “存在于” 顶层 Task 组件中，由 useReducer 进行管理。不过，组件树里的组件只要导入这些 context 之后就可以获取 tasks 和 dispatch。
```

#### 将相关逻辑迁移到一个文件当中

这不是必须的，但你可以通过将 reducer 和 context 移动到单个文件中来进一步整理组件。目前，“TasksContext.js” 仅包含两个 context 声明：

import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
来给这个文件添加更多代码！将 reducer 移动到此文件中，然后声明一个新的 TasksProvider 组件。此组件将所有部分连接在一起：

它将管理 reducer 的状态。
它将提供现有的 context 给组件树。
它将 把 children 作为 prop，所以你可以传递 JSX。
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
这将使 TaskApp 组件更加直观：

```js
//app
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
//taskscontext
import { createContext, useReducer } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
//addtask
import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
//tasklist
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
你也可以从 TasksContext.js 中导出使用 context 的函数：

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
组件可以通过以下函数读取 context：

const tasks = useTasks();
const dispatch = useTasksDispatch();
这不会改变任何行为，但它会允许你之后进一步分割这些 context 或向这些函数添加一些逻辑。现在所有的 context 和 reducer 连接部分都在 TasksContext.js 中。这保持了组件的干净和整洁，让我们专注于它们显示的内容，而不是它们从哪里获得数据：
```

```js
//app
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
//taskcontext
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
//addtask
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
//tasklist
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
你可以将 TasksProvider 视为页面的一部分，它知道如何处理 tasks。useTasks 用来读取它们，useTasksDispatch 用来从组件树下的任何组件更新它们。

注意
像 useTasks 和 useTasksDispatch 这样的函数被称为 自定义 Hook。 如果你的函数名以 use 开头，它就被认为是一个自定义 Hook。这让你可以使用其他 Hook，比如 useContext。

随着应用的增长，你可能会有许多这样的 context 和 reducer 的组合。这是一种强大的拓展应用并 提升状态 的方式，让你在组件树深处访问数据时无需进行太多工作。
```

```js
//摘要
你可以将 reducer 与 context 相结合，让任何组件读取和更新它的状态。
为子组件提供 state 和 dispatch 函数：
创建两个 context (一个用于 state,一个用于 dispatch 函数)。
让组件的 context 使用 reducer。
使用组件中需要读取的 context。
你可以通过将所有传递信息的代码移动到单个文件中来进一步整理组件。
你可以导出一个像 TasksProvider 可以提供 context 的组件。
你也可以导出像 useTasks 和 useTasksDispatch 这样的自定义 Hook。
你可以在你的应用程序中大量使用 context 和 reducer 的组合。
```

#### 结合使用reducer和context

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||全懵逼状态!!||
|就是说appjs中都是最精简的,其它的挪走,另开文件|将相关逻辑迁移到一个文件当中||

结合使用的逻辑:
1.状态管理逻辑集中在 reducer 中：
reducer 函数定义了状态如何随着 action 的变化而变化。
使用 useReducer 来管理复杂状态，并通过 dispatch 分发 action。
2.通过 Context 共享状态：
使用 createContext 创建两个上下文，一个用于状态，一个用于 dispatch 函数。
在顶层组件中使用 Provider 组件提供状态和 dispatch 函数，这样子组件可以通过 useContext 访问。
3.子组件中使用 Context 和 Reducer：
子组件通过 useContext 获取状态和 dispatch 函数。
子组件可以根据需要读取状态或分发 action 修改状态。

优点:
状态管理集中：reducer 集中管理所有状态变更逻辑，使代码更易维护。
状态共享简便：上下文提供了一个方便的方式在组件树中共享状态和 dispatch 函数，避免了繁琐的 props 传递。
代码结构清晰：将状态管理逻辑与 UI 逻辑分离，使代码更模块化、更易读。
通过这种方式，复杂的状态管理和状态共享变得更简洁、可维护。

## 脱围机制

高级:就是说指将变量从当前闭包环境中释放，以便在其他环境中访问和使用。

有些组件可能需要控制和同步 React 之外的系统。例如，你可能需要使用浏览器 API 聚焦输入框，或者在没有 React 的情况下实现视频播放器，或者连接并监听远程服务器的消息。在本章中，你将学习到一些脱围机制，让你可以“走出” React 并连接到外部系统。大多数应用逻辑和数据流不应该依赖这些功能。

本章节
在不重新渲染的情况下“记住”信息
访问 React 管理的 DOM 元素
将组件与外部系统同步
从组件中删除不必要的 Effect
Effect 的生命周期与组件的生命周期有何不同
防止某些值重新触发 Effect
减少 Effect 重新执行的频率
在组件之间共享逻辑

### 使用 ref 引用值

就是说引用,但不触发新渲染.是为了直接访问和操作 DOM 元素或持久化的可变数据。

当你希望组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 ref 。

你将会学习到
如何向组件添加 ref
如何更新 ref 的值
ref 与 state 有何不同
如何安全地使用 ref

#### 给你的组件添加 ref

你可以通过从 React 导入 useRef Hook 来为你的组件添加一个 ref：

import { useRef } from 'react';
在你的组件内，调用 useRef Hook 并传入你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”：

const ref = useRef(0);
useRef 返回一个这样的对象:

{
  current: 0 // 你向 useRef 传入的值
}

```js
//你可以用 ref.current 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它。就像一个 React 追踪不到的、用来存储组件信息的秘密“口袋”。（这就是让它成为 React 单向数据流的“脱围机制”的原因 —— 详见下文！）

这里，每次点击按钮时会使 ref.current 递增：
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('你点击了 ' + ref.current + ' 次！');
  }

  return (
    <button onClick={handleClick}>
      点击我！
    </button>
  );
}
这里的 ref 指向一个数字，但是，像 state 一样，你可以让它指向任何东西：字符串、对象，甚至是函数。与 state 不同的是，ref 是一个普通的 JavaScript 对象，具有可以被读取和修改的 current 属性。

请注意，组件不会在每次递增时重新渲染。 与 state 一样，React 会在每次重新渲染之间保留 ref。但是，设置 state 会重新渲染组件，更改 ref 不会！
```

#### 示例：制作秒表

```js
// 
你可以在单个组件中把 ref 和 state 结合起来使用。例如，让我们制作一个秒表，用户可以通过按按钮来使其启动或停止。为了显示从用户按下“开始”以来经过的时间长度，你需要追踪按下“开始”按钮的时间和当前时间。此信息用于渲染，所以你会把它保存在 state 中：
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);

当用户按下“开始”时，你将用 setInterval 每 10 毫秒更新一次时间：
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);//使用 useState 钩子定义两个状态变量：startTime（计时开始时间）和 now（当前时间），初始值均为 null。

  function handleStart() {
    // 开始计时。
    setStartTime(Date.now());
    setNow(Date.now());
    setInterval(() => {
      // 每 10ms 更新一次当前时间。
      setNow(Date.now());
    }, 10);
    //定义 handleStart 函数，在按钮点击时调用：--设置 startTime 为当前时间。--设置 now 为当前时间。--每隔 10 毫秒更新 now 为当前时间，以实现计时功能。
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
    //计算自开始计时以来经过的秒数（secondsPassed），如果 startTime 和 now 不为 null，计算并更新秒数。 
  }

  return (
    <>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        开始
      </button>
    </>
    //显示经过的时间（secondsPassed），保留三位小数。---提供一个按钮，点击时调用 handleStart 开始计时。
  );
}
当按下“停止”按钮时，你需要取消现有的 interval，以便让它停止更新 now state 变量。你可以通过调用 clearInterval 来完成此操作。但你需要为其提供 interval ID，此 ID 是之前用户按下 Start、调用 setInterval 时返回的。你需要将 interval ID 保留在某处。 由于 interval ID 不用于渲染，你可以将其保存在 ref 中：
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
    //在组件中清除先前的定时器并设置一个新的定时器，每隔 10 毫秒更新一次当前时间。
    //清除存储在 intervalRef.current 中的先前的定时器。
    //设置一个新的定时器，每隔 10 毫秒执行一次回调函数，更新当前时间 (setNow(Date.now()))，并将定时器的 ID 存储在 intervalRef.current 中。
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        开始
      </button>
      <button onClick={handleStop}>
        停止
      </button>
    </>
  );
}
当一条信息用于渲染时，将它保存在 state 中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。
```

#### ref 和 state 的不同之处

也许你觉得 ref 似乎没有 state 那样“严格” —— 例如，你可以改变它们而非总是必须使用 state 设置函数。但在大多数情况下，我们建议你使用 state。ref 是一种“脱围机制”，你并不会经常用到它。 以下是 state 和 ref 的对比：

| 操作类型   | 避免使用 (会改变原始数组)    | 推荐使用 (会返回一个新数组)                 |
| ---------- | ----------------------------- | ------------------------------------------- |
| 添加元素   | push，unshift                 | concat，[...arr] 展开语法（例子）            |
| 删除元素   | pop，shift，splice            | filter，slice（例子）                        |
| 替换元素   | splice，arr[i] = ... 赋值     | map（例子）                                  |
| 排序       | reverse，sort                 | 先将数组复制一份（例子）                    |

```js
//这是一个使用 state 实现的计数器按钮：
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      你点击了 {count} 次
    </button>
  );
}
因为 count 的值将会被显示，所以为其使用 state 是合理的。当使用 setCount() 设置计数器的值时，React 会重新渲染组件，并且屏幕会更新以展示新的计数。

如果你试图用 ref 来实现它，React 永远不会重新渲染组件，所以你永远不会看到计数变化！看看点击这个按钮如何 不更新它的文本：
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // 这样并未重新渲染组件！
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      你点击了 {countRef.current} 次
    </button>
  );
}
这就是为什么在渲染期间读取 ref.current 会导致代码不可靠的原因。如果需要，请改用 state。

useRef 内部是如何运行的？ 
:
尽管 useState 和 useRef 都是由 React 提供的，原则上 useRef 可以在 useState 的基础上 实现。 你可以想象在 React 内部，useRef 是这样实现的：

// React 内部
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
  //定义一个名为 useRef 的函数，它接受一个初始值 initialValue 作为参数。
  //使用 useState 钩子初始化一个状态 ref，该状态的初始值是一个对象 { current: initialValue }。unused 是状态的 setter 函数，但在这里不会用到。
  //返回 ref 对象，这个对象包含一个名为 current 的属性，其值为 initialValue
}
第一次渲染期间，useRef 返回 { current: initialValue }。 该对象由 React 存储，因此在下一次渲染期间将返回相同的对象。 请注意，在这个示例中，state 设置函数没有被用到。它是不必要的，因为 useRef 总是需要返回相同的对象！

React 提供了一个内置版本的 useRef，因为它在实践中很常见。 但是你可以将其视为没有设置函数的常规 state 变量。 如果你熟悉面向对象编程，ref 可能会让你想起实例字段 —— 但是你写的不是 this.something，而是 somethingRef.current。

看不懂???
```

#### 何时使用 ref

通常，当你的组件需要“跳出” React 并与外部 API 通信时，你会用到 ref —— 通常是不会影响组件外观的浏览器 API。以下是这些罕见情况中的几个：

存储 timeout ID
存储和操作 DOM 元素，我们将在 下一页 中介绍
存储不需要被用来计算 JSX 的其他对象。
如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref。

#### ref 的最佳实践

遵循这些原则将使你的组件更具可预测性：

将 ref 视为脱围机制。当你使用外部系统或浏览器 API 时，ref 很有用。如果你很大一部分应用程序逻辑和数据流都依赖于 ref，你可能需要重新考虑你的方法。
不要在渲染过程中读取或写入 ref.current。 如果渲染过程中需要某些信息，请使用 state 代替。由于 React 不知道 ref.current 何时发生变化，即使在渲染时读取它也会使组件的行为难以预测。（唯一的例外是像 if (!ref.current) ref.current = new Thing() 这样的代码，它只在第一次渲染期间设置一次 ref。）
React state 的限制不适用于 ref。例如，state 就像 每次渲染的快照，并且 不会同步更新。但是当你改变 ref 的 current 值时，它会立即改变：

ref.current = 5;
console.log(ref.current); // 5
这是因为 ref 本身是一个普通的 JavaScript 对象， 所以它的行为就像对象那样。

当你使用 ref 时，也无需担心 避免变更。只要你改变的对象不用于渲染，React 就不会关心你对 ref 或其内容做了什么。

#### ref 和 DOM

你可以将 ref 指向任何值。但是，ref 最常见的用法是访问 DOM 元素。例如，如果你想以编程方式聚焦一个输入框，这种用法就会派上用场。当你将 ref 传递给 JSX 中的 ref 属性时，比如 ``<div ref={myRef}>``，React 会将相应的 DOM 元素放入 myRef.current 中。当元素从 DOM 中删除时，React 会将 myRef.current 更新为 null。你可以在 使用 ref 操作 DOM 中阅读更多相关信息。

```js
//摘要
ref 是一种脱围机制，用于保留不用于渲染的值。 你不会经常需要它们。
ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置。
你可以通过调用 useRef Hook 来让 React 给你一个 ref。
与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
与 state 不同，设置 ref 的 current 值不会触发重新渲染。
不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测。
```

```js
//第 1 个挑战 共 4 个挑战: 修复坏掉的聊天输入框 
输入消息并单击“发送”。你会注意到，在看到“已发送！”提示框之前有 3 秒的延迟。在此延迟期间，你可以看到一个“撤消”按钮。点击它。这个“撤消”按钮应该阻止“发送！”消息弹出。它通过调用 clearTimeout 来做到这点，这一步骤需要使用在 handleSend 时保存的 timeout ID。但是，即使在单击“撤消”后，“已发送！”消息仍然出现。找出它不起作用的原因，然后修复它。
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    //timeoutRef.current=
    timeoutID = setTimeout(() => {
      alert('已发送！');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
    //(timeoutRef.current)
    //这么用才能穿过state,引用?
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? '发送中……' : '发送'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          撤销
        </button>
      }
    </>
  );
}
答案:每当你的组件重新渲染时（例如当你设置 state 时），所有局部变量都会从头开始初始化。这就是为什么你不能将 timeout ID 保存在像 timeoutID 这样的局部变量中，然后期望未来另一个事件处理器“看到”它。相反，将它存储在一个 ref 中，React 将在渲染之间保留它。
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  function handleSend() {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert('已发送!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? '发送中……' : '发送'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          撤销
        </button>
      }
    </>
  );
}

```

```js
//第 2 个挑战 共 4 个挑战: 修复无法重新渲染的组件 
这个按钮本该在显示“开”和“关”之间切换。但是，它始终显示“关”。这段代码有什么问题？修复它。
import { useRef } from 'react';

export default function Toggle() {
  const isOnRef = useRef(false);
//应该为const [isOn,setIsOn]=useState(false);
  return (
    //onClick={()={setIsOn(!isOn);}}
    //{isOn?'开':'关'}
    <button onClick={() => {
      isOnRef.current = !isOnRef.current;
    }}>
      {isOnRef.current ? '开' : '关'}
    </button>
  );
}
答案:
在这个例子中，ref 的 current 值被用于计算渲染输出：{isOnRef.current ? '开'：'关'}。这表明此信息本来不应该在 ref 中，而应该放在 state 里。要修复它，请删除 ref ，使用 state 代替：
import { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => {
      setIsOn(!isOn);
    }}>
      {isOn ? '开' : '关'}
    </button>
  );
}

```

```js
//第 3 个挑战 共 4 个挑战: 修复防抖 
在这个例子中，所有按钮点击处理器都是 “防抖的”。 要了解这意味着什么，请按下其中一个按钮。注意消息在一秒后显示。如果你在等待消息时按下按钮，计时器将重置。因此如果你多次快速单击同一个按钮，则直到你停止单击 之后 1 秒钟，该消息才会显示。防抖可以让你将一些动作推迟到用户“停止动作”之后。

这个例子可以正常运行，但并不完全符合预期。按钮不是独立的。要查看问题，请单击其中一个按钮，然后立即单击另一个按钮。你本来期望在延迟之后，你会看到两个按钮的消息。但只有最后一个按钮的消息出现了。第一个按钮的消息丢失了。

为什么按钮会相互干扰呢？查找并修复问题。
let timeoutID;

function DebouncedButton({ onClick, children }) {
  return (
    //timeoutID 这样的变量是被所有组件共享的
    //把 timeout 保存在 ref 中。每个按钮都有自己的 ref，因此它们不会相互冲突。
    //const timeoutRef=useRef(null);
    //()={clearTimeout(timeoutRef.current);timeoutRef.current=setTimeout}
    <button onClick={() => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('宇宙飞船已发射！')}
      >
        发射宇宙飞船
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('汤煮好了！')}
      >
        煮点儿汤
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('摇篮曲唱完了！')}
      >
        唱首摇篮曲
      </DebouncedButton>
    </>
  )
}
答案
像 timeoutID 这样的变量是被所有组件共享的。这就是为什么单击第二个按钮会重置第一个按钮未完成的 timeout 的原因。要解决此问题，你可以把 timeout 保存在 ref 中。每个按钮都有自己的 ref，因此它们不会相互冲突。请注意快速单击两个按钮如何显示两个消息。
import { useRef } from 'react';

function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('宇宙飞船已发射！')}
      >
        发射宇宙飞船
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('汤煮好了！')}
      >
        煮点儿汤
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('摇篮曲唱完了！')}
      >
        唱首摇篮曲
      </DebouncedButton>
    </>
  )
}

```

```js
//第 4 个挑战 共 4 个挑战: 读取最新的 state 
在此示例中，当你按下“发送”后，在显示消息之前会有一小段延迟。输入“你好”，按下发送，然后再次快速编辑输入。尽管你进行了编辑，提示框仍会显示“你好”（这是按钮被点击 那一刻 state 的值）。

通常，这种行为是你在应用程序中想要的。但是，有时可能需要一些异步代码来读取某些 state 的 最新 版本。你能想出一种方法，让提示框显示 当前 输入文本而不是点击时的内容吗？
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  //同时使用一个 state 变量（用于渲染）和 一个 ref（在 timeout 时读取它）
  //const textRef = useRef(text);
  // function handleChange(e) {
  //   setText(e.target.value);
  //   textRef.current = e.target.value;
  // }
  function handleSend() {
    setTimeout(() => {
      alert('正在发送：' + text);
    }, 3000);
    //'正在发送'+textRef.cyrrent
  }

  return (
    //onChange={handleChange}
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        发送
      </button>
    </>
  );
}
答案:
state 运作起来 就像快照，因此你无法从 timeout 等异步操作中读取最新的 state。但是，你可以在 ref 中保存最新的输入文本。ref 是可变的，因此你可以随时读取 current 属性。由于当前文本也用于渲染，在这个例子中，你需要 同时 使用一个 state 变量（用于渲染）和 一个 ref（在 timeout 时读取它）。你需要手动更新当前的 ref 值。
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleChange(e) {
    setText(e.target.value);
    textRef.current = e.target.value;
  }

  function handleSend() {
    setTimeout(() => {
      alert('正在发送：' + textRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}>
        发送
      </button>
    </>
  );
}

```

#### 使用ref引用值 表格

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||点击撤销发送仍然出现"已发送"的信息||
||按钮不切换\始终为关||
||防抖(抖:非故意的连击)失效||
||让提示框显示 当前 输入文本而不是点击时的内容||

### 使用 ref 操作 DOM

由于 React 会自动处理更新 DOM 以匹配你的渲染输出，因此你在组件中通常不需要操作 DOM。但是，有时你可能需要访问由 React 管理的 DOM 元素 —— 例如，让一个节点获得焦点、滚动到它或测量它的尺寸和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个指向 DOM 节点的 ref 来实现。

你将会学习到
如何使用 ref 属性访问由 React 管理的 DOM 节点
ref JSX 属性如何与 useRef Hook 相关联
如何访问另一个组件的 DOM 节点
在哪些情况下修改 React 管理的 DOM 是安全的

#### 获取指向节点的 ref

要访问由 React 管理的 DOM 节点，首先，引入 useRef Hook：

import { useRef } from 'react';
然后，在你的组件中使用它声明一个 ref：

const myRef = useRef(null);
最后，将 ref 作为 ref 属性值传递给想要获取的 DOM 节点的 JSX 标签：

``<div ref={myRef}>``
useRef Hook 返回一个对象，该对象有一个名为 current 的属性。最初，myRef.current 是 null。当 React 为这个 ``<div>`` 创建一个 DOM 节点时，React 会把对该节点的引用放入 myRef.current。然后，你可以从 事件处理器 访问此 DOM 节点，并使用在其上定义的内置浏览器 API。

// 你可以使用任意浏览器 API，例如：
myRef.current.scrollIntoView();
示例: 使文本输入框获得焦点
在本例中，单击按钮将使输入框获得焦点：

```js
//import { useRef } from 'react';
//通过 useRef 获取输入框的引用，并在点击按钮时让输入框获取焦点。
export default function Form() {
  const inputRef = useRef(null);
//使用 useRef 创建一个名为 inputRef 的引用对象，初始值为 null。inputRef 将在组件生命周期内保持不变。
  function handleClick() {
    inputRef.current.focus();
    //名为 handleClick 的函数。当被调用时，通过 inputRef.current 访问输入框 DOM 元素，并调用其 focus 方法使其获取焦点。
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
    //渲染一个 input 元素，并将 inputRef 赋值给其 ref 属性，这样 inputRef.current 就会指向该输入框DOM 元素。
  );
}
要实现这一点：

使用 useRef Hook 声明 inputRef。
像 <input ref={inputRef}> 这样传递它。这告诉 React 将这个 <input> 的 DOM 节点放入 inputRef.current。
在 handleClick 函数中，从 inputRef.current 读取 input DOM 节点并使用 inputRef.current.focus() 调用它的 focus()。
用 onClick 将 handleClick 事件处理器传递给 <button>。
虽然 DOM 操作是 ref 最常见的用例，但 useRef Hook 可用于存储 React 之外的其他内容，例如计时器 ID 。与 state 类似，ref 能在渲染之间保留。你甚至可以将 ref 视为设置它们时不会触发重新渲染的 state 变量！你可以在使用 Ref 引用值中了解有关 ref 的更多信息。
```

```js
//示例: 滚动至一个元素 
一个组件中可以有多个 ref。在这个例子中，有一个由三张图片和三个按钮组成的轮播，点击按钮会调用浏览器的 scrollIntoView() 方法，在相应的 DOM 节点上将它们居中显示在视口中：
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Tom
        </button>
        <button onClick={handleScrollToSecondCat}>
          Maru
        </button>
        <button onClick={handleScrollToThirdCat}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

```

```js
//如何使用 ref 回调管理 ref 列表 

收起
在上面的例子中，ref 的数量是预先确定的。但有时候，你可能需要为列表中的每一项都绑定 ref ，而你又不知道会有多少项。像下面这样做是行不通的：

<ul>
  {items.map((item) => {
    // 行不通！
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
这是因为 Hook 只能在组件的顶层被调用。不能在循环语句、条件语句或 map() 函数中调用 useRef 。

一种可能的解决方案是用一个 ref 引用其父元素，然后用 DOM 操作方法如 querySelectorAll 来寻找它的子节点。然而，这种方法很脆弱，如果 DOM 结构发生变化，可能会失效或报错。

另一种解决方案是将函数传递给 ref 属性。这称为 ref 回调。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 null 。这使你可以维护自己的数组或 Map，并通过其索引或某种类型的 ID 访问任何 ref。

此示例展示了如何使用此方法滚动到长列表中的任意节点：
//组件实现了点击按钮时平滑滚动到对应的猫图片。
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);
  //使用 useRef 创建一个名为 itemsRef 的引用对象，初始值为 null。itemsRef 将用于存储猫图片元素的引用。使用 useState 钩子创建一个名为 catList 的状态变量，并初始化为 setupCatList 函数返回的值

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    //定义一个名为 scrollToCat 的函数。该函数从 itemsRef 的 Map 中获取对应 cat 的 DOM 节点，并调用 scrollIntoView 方法使其平滑滚动到视图中。
    //调用 getMap 函数，获取或初始化 itemsRef.current，并将其赋值给常量 map。
    //从 map 中获取与 cat 关联的 DOM 节点（即猫图片的引用），并将其赋值给常量 node。
    //调用 node 的 scrollIntoView 方法，使该节点滚动到视图中。scrollIntoView 方法接收一个配置对象，指定滚动行为：behavior: "smooth"：表示滚动将是平滑的。block: "nearest"：表示元素将滚动到最近的边界。inline: "center"：表示元素将滚动到水平中心。
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
    //定义一个名为 getMap 的函数。如果 itemsRef.current 为空，则初始化为一个新的 Map 对象。返回 itemsRef.current。
    //定义一个名为 getMap 的函数，该函数用于获取或初始化 itemsRef.current。
    //检查 itemsRef.current 是否为空（即首次运行时）。如果为空，则将 itemsRef.current 初始化为一个新的 Map 对象。
    //返回 itemsRef.current，即存储猫图片引用的 Map 对象。
  }
  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
    //使用 map 方法遍历 catList 数组，为每个 cat 创建一个列表项。catList 是一个包含猫图片 URL 的数组。
    //创建一个 li 列表项元素，使用 cat 作为唯一的键属性，以确保每个列表项在列表中的唯一性。
    //将一个函数分配给 li 元素的 ref 属性。这个函数在元素挂载或卸载时执行，用于将元素的引用存储到 Map 中：---const map = getMap();：获取或初始化 itemsRef.current，并将其赋值给 map。---if (node) { map.set(cat, node); }：如果 node 不为空（元素挂载），将 cat 作为键，node 作为值存储到 map 中。---else { map.delete(cat); }：如果 node 为空（元素卸载），从 map 中删除 cat 的引用。
    //在 li 元素内部创建一个 img 元素，设置其 src 属性为当前 cat 的 URL，以显示猫的图片。
  );
  //渲染一个导航栏，包含三个按钮，每个按钮对应一个猫图片。点击按钮时调用 scrollToCat 函数，将视图滚动到对应的猫图片。---渲染一个包含所有猫图片的列表。对每个猫图片使用 ref 回调，将图片的 DOM 节点存储到 itemsRef 的 Map 中。
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }
  return catList;
  //定义一个名为 setupCatList 的函数。该函数生成一个包含 10 个猫图片 URL 的数组并返回。
}

在这个例子中，itemsRef 保存的不是单个 DOM 节点，而是保存了包含列表项 ID 和 DOM 节点的 Map。(Ref 可以保存任何值！) 每个列表项上的 ref 回调负责更新 Map：

<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    if (node) {
      // Add to the Map
      map.set(cat, node);
    } else {
      // Remove from the Map
      map.delete(cat);
    }
  }}
>
这使你可以之后从 Map 读取单个 DOM 节点。

Canary:
This example shows another approach for managing the Map with a ref callback cleanup function.此示例展示了使用 ref 回调清理函数管理 Map 的另一种方法

<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    // Add to the Map
    map.set(cat, node);

    return () => {
      // Remove from the Map
      map.delete(cat);
    };
  }}
>
```

#### 访问另一个组件的 DOM 节点

当你将 ref 放在像 ``<input />`` 这样输出浏览器元素的内置组件上时，React 会将该 ref 的 current 属性设置为相应的 DOM 节点（例如浏览器中实际的 ``<input />`` ）。

但是，如果你尝试将 ref 放在 你自己的 组件上，例如 ``<MyInput />``，默认情况下你会得到 null。这个示例演示了这种情况。请注意单击按钮 并不会 聚焦输入框：

```js
//import { useRef } from 'react';
//当点击按钮时，输入框会自动获得焦点。
function MyInput(props) {
  return <input {...props} />;
  //定义一个简单的 MyInput 组件，它接受所有传递的属性（props），并将这些属性应用到一个 input 元素上。
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
    //使用 useRef 钩子创建一个引用对象 inputRef，初始化为 null。这个引用对象用于访问 MyInput 组件中的 input 元素。
    //定义一个 handleClick 函数，当这个函数被调用时，它会通过 inputRef 引用对象访问 input 元素，并调用其 focus 方法，使输入框获得焦点。
  }
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
    //在 JSX 代码中，渲染 MyInput 组件，并将 inputRef 传递给它的 ref 属性。这样，inputRef 就会引用 MyInput 内的 input 元素。
    //渲染一个按钮，并将 handleClick 函数作为其 onClick 事件处理函数。点击按钮时会调用 handleClick 函数。
  );
}
为了帮助您注意到这个问题，React 还会向控制台打印一条错误消息：

Console
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
发生这种情况是因为默认情况下，React 不允许组件访问其他组件的 DOM 节点。甚至自己的子组件也不行！这是故意的。Refs 是一种脱围机制，应该谨慎使用。手动操作 另一个 组件的 DOM 节点会使你的代码更加脆弱。

相反，想要 暴露其 DOM 节点的组件必须选择该行为。一个组件可以指定将它的 ref “转发”给一个子组件。下面是 MyInput 如何使用 forwardRef API：

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
它是这样工作的:

<MyInput ref={inputRef} /> 告诉 React 将对应的 DOM 节点放入 inputRef.current 中。但是，这取决于 MyInput 组件是否允许这种行为， 默认情况下是不允许的。
MyInput 组件是使用 forwardRef 声明的。 这让从上面接收的 inputRef 作为第二个参数 ref 传入组件，第一个参数是 props 。
MyInput 组件将自己接收到的 ref 传递给它内部的 <input>。
现在，单击按钮聚焦输入框起作用了：
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
  //创建了一个能接收 ref 的 MyInput 组件，使其父组件可以通过 ref 直接访问其内部的 input 元素。
  //使用 React.forwardRef 创建一个 MyInput 组件，使其可以接收一个 ref 参数。forwardRef 是一个高阶组件，它允许函数组件接收 ref 参数并转发到其子组件。
  //在 MyInput 组件中，返回一个 input 元素。{...props} 将所有传入的属性应用到 input 元素上，而 ref={ref} 将传入的 ref 绑定到 input 元素上。这使得父组件可以通过 ref 直接访问这个 input 元素。
  //整个代码的作用是创建了一个 MyInput 组件，使其能够接收并转发 ref，从而使父组件可以直接访问 MyInput 内部的 input 元素。这在需要访问或控制子组件的 DOM 元素时非常有用。
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
在设计系统中，将低级组件（如按钮、输入框等）的 ref 转发到它们的 DOM 节点是一种常见模式。另一方面，像表单、列表或页面段落这样的高级组件通常不会暴露它们的 DOM 节点，以避免对 DOM 结构的意外依赖。

使用命令句柄暴露一部分 API :
在上面的例子中，MyInput 暴露了原始的 DOM 元素 input。这让父组件可以对其调用focus()。然而，这也让父组件能够做其他事情 —— 例如，改变其 CSS 样式。在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 useImperativeHandle 做到这一点：
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  //创建了一个能够通过 ref 调用自定义方法 focus 的 MyInput 组件，使父组件可以通过 ref 调用这个方法来聚焦 MyInput 组件内的 input 元素。
  const realInputRef = useRef(null);//定义一个内部 ref，用于直接引用实际的 input 元素。
  useImperativeHandle(ref, () => ({
  // 只暴露 focus，没有别的
  //使用 useImperativeHandle 钩子来自定义暴露给父组件的 ref 对象。第一个参数是传入的 ref，第二个参数是一个返回值为对象的函数，这个对象定义了暴露给父组件的属性和方法。
  focus() {
  realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
  //在暴露给父组件的对象中定义一个 focus 方法，这个方法调用 realInputRef 的 current 属性的 focus 方法，从而聚焦 input 元素。
});
//MyInput 组件不仅能接收 props 传递的属性，还能通过 ref 暴露一个自定义的 focus 方法，使得父组件可以调用 ref.current.focus() 来聚焦 MyInput 组件内的 input 元素，而不直接暴露 input 元素本身。

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
这里，MyInput 中的 realInputRef 保存了实际的 input DOM 节点。 但是，useImperativeHandle 指示 React 将你自己指定的对象作为父组件的 ref 值。 所以 Form 组件内的 inputRef.current 将只有 focus 方法。在这种情况下，ref “句柄”不是 DOM 节点，而是你在 useImperativeHandle 调用中创建的自定义对象。
```

#### React 何时添加 refs

就是说ref怎么指向dom节点的???

在 React 中，每次更新都分为 两个阶段：

在 渲染 阶段， React 调用你的组件来确定屏幕上应该显示什么。
在 提交 阶段， React 把变更应用于 DOM。
通常，你 不希望 在渲染期间访问 refs。这也适用于保存 DOM 节点的 refs。在第一次渲染期间，DOM 节点尚未创建，因此 ref.current 将为 null。在渲染更新的过程中，DOM 节点还没有更新。所以读取它们还为时过早。

React 在提交阶段设置 ref.current。在更新 DOM 之前，React 将受影响的 ref.current 值设置为 null。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。

通常，你将从事件处理器访问 refs。 如果你想使用 ref 执行某些操作，但没有特定的事件可以执行此操作，你可能需要一个 effect。我们将在下一页讨论 effect。

```js
//用 flushSync 同步更新 state :
思考这样的代码，它添加一个新的待办事项，并将屏幕向下滚动到列表的最后一个子项。请注意，出于某种原因，它总是滚动到最后一个添加 之前 的待办事项：
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        添加
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
  });
}
问题出在这两行：

setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
在 React 中，state 更新是排队进行的。通常，这就是你想要的。但是，在这个示例中会导致问题，因为 setTodos 不会立即更新 DOM。因此，当你将列表滚动到最后一个元素时，尚未添加待办事项。这就是为什么滚动总是“落后”一项的原因。

要解决此问题，你可以强制 React 同步更新（“刷新”）DOM。 为此，从 react-dom 导入 flushSync 并将 state 更新包裹 到 flushSync 调用中：

flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
这将指示 React 当封装在 flushSync 中的代码执行后，立即同步更新 DOM。因此，当你尝试滚动到最后一个待办事项时，它已经在 DOM 中了：
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);      
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        添加
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
  });
}

```

#### 使用 refs 操作 DOM 的最佳实践

Refs 是一种脱围机制。你应该只在你必须“跳出 React”时使用它们。这方面的常见示例包括管理焦点、滚动位置或调用 React 未暴露的浏览器 API。

如果你坚持聚焦和滚动等非破坏性操作，应该不会遇到任何问题。但是，如果你尝试手动修改 DOM，则可能会与 React 所做的更改发生冲突。

为了说明这个问题，这个例子包括一条欢迎消息和两个按钮。第一个按钮使用 条件渲染 和 state 切换它的显示和隐藏，就像你通常在 React 中所做的那样。第二个按钮使用 remove() DOM API 将其从 React 控制之外的 DOM 中强行移除.

尝试按几次“通过 setState 切换”。该消息会消失并再次出现。然后按 “从 DOM 中删除”。这将强行删除它。最后，按 “通过 setState 切换”：

```js
//import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        通过 setState 切换
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        从 DOM 中删除
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
在你手动删除 DOM 元素后，尝试使用 setState 再次显示它会导致崩溃。这是因为你更改了 DOM，而 React 不知道如何继续正确管理它。

避免更改由 React 管理的 DOM 节点。 对 React 管理的元素进行修改、添加子元素、从中删除子元素会导致不一致的视觉结果，或与上述类似的崩溃。

但是，这并不意味着你完全不能这样做。它需要谨慎。 你可以安全地修改 React 没有理由更新的部分 DOM。 例如，如果某些 <div> 在 JSX 中始终为空，React 将没有理由去变动其子列表。 因此，在那里手动增删元素是安全的。
```

```js
//摘要
Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
你通过传递 <div ref={myRef}> 指示 React 将 DOM 节点放入 myRef.current。
通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
避免更改由 React 管理的 DOM 节点。
如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。
```

```js
//第 1 个挑战 共 4 个挑战: 播放和暂停视频 
在此示例中，按钮切换 state 变量以在播放和暂停状态之间切换。 然而，为了实际播放或暂停视频，切换状态是不够的。你还需要在 <video> 的 DOM 元素上调用 play() 和 pause()。 向它添加一个 ref，并使按钮起作用。
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  //const ref =useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    //if (nextIsPlaying){
    // ref.current.play();
    // }else {
    //   ref.current.pause();
    // }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <video width="250">
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
    //ref={ref}
    //onPlay={()=>setIsPlaying(true)}
    //onPause={()=>setIsPlaying(false)}
  )
}
对于额外的挑战，即使用户右键单击视频并使用内置浏览器媒体控件播放，也要使“播放”按钮与视频是否正在播放同步。 您可能需要在视频中监听 onPlay 和 onPause 才能做到这一点。

答案
声明一个 ref 并将其放在 <video> 元素上。然后根据下一个 state 在事件处理器中调用 ref.current.play() 和 ref.current.pause()。
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
为了处理内置浏览器控件，您可以将 onPlay 和 onPause 处理程序添加到 <video> 元素，并调用它们的 setIsPlaying。 这样，如果用户使用浏览器控件播放视频，状态将相应调整。
```

```js
//第 2 个挑战 共 4 个挑战: 使搜索域获得焦点 
做到单击“搜索”按钮时，使搜索域获得焦点。
export default function Page() {
  return (
    <>
      <nav>
        <button>搜索</button>
      </nav>
      <input
        placeholder="找什么呢？"
      />
    </>
  );
  //const加一个
  //button 的onclick里面加一个
  //input>里面加一个

}
答案
向输入框添加一个 ref，并在 DOM 节点上调用 focus() 以使其获得焦点：
import { useRef } from 'react';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <button onClick={() => {
          inputRef.current.focus();
        }}>
          搜索
        </button>
      </nav>
      <input
        ref={inputRef}
        placeholder="找什么呢？"
      />
    </>
  );
}

```

```js
//第 3 个挑战 共 4 个挑战: 滚动图像轮播 
此图像轮播有一个“下一个”按钮，可以切换激活的图像。单击时使图库水平滚动到激活的图像。你需要在激活的图像的 DOM 节点上调用 scrollIntoView()：

node.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center'
});

import { useState } from 'react';
//import { flushSync } from 'react-dom';
export default function CatFriends() {
  const [index, setIndex] = useState(0);
  // const selectedRef = useRef(null);
  return (
    //调用 flushSync，确保在更新 DOM 前同步执行传递的回调函数。flushSync 是 React 18 中提供的一个方法，用于确保在当前更新循环内同步刷新 React 树。
    //在 flushSync 的回调函数中执行一个条件判断：如果 index 小于 catList 的长度减一，则将 index 增加 1。否则，将 index 重置为 0。
    //调用 selectedRef.current.scrollIntoView 方法，使被 selectedRef 引用的 DOM 元素滚动到视口中：behavior: 'smooth'：表示平滑滚动。block: 'nearest'：滚动到最近的块级位置。inline: 'center'：滚动到水平中心位置。
    <>
      <nav>
        <button onClick={() => {
          //    flushSync(() => {
          if (index < catList.length - 1) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          };
        // selectedRef.current.scrollIntoView({
        // behavior: 'smooth',
        // block: 'nearest',
        // nline: 'center'
        }}>
          下一个
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={
                  index === i ?
                    'active' :
                    ''
                }
                src={cat.imageUrl}
                alt={'猫猫 #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}

答案
你可以声明一个 selectedRef，然后根据条件将它传递给当前图像：

<li ref={index === i ? selectedRef : null}>
当index === i时，表示图像是被选中的图像，相应的 <li> 将接收到 selectedRef。React 将确保 selectedRef.current 始终指向正确的 DOM 节点。

请注意，为了强制 React 在滚动前更新 DOM，flushSync 调用是必需的。否则，selectedRef.current将始终指向之前选择的项目。
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function CatFriends() {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <>
      <nav>
        <button onClick={() => {
          flushSync(() => {
            if (index < catList.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
          });
          selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });            
        }}>
          下一步
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={index === i ?
                selectedRef :
                null
              }
            >
              <img
                className={
                  index === i ?
                    'active'
                    : ''
                }
                src={cat.imageUrl}
                alt={'猫猫 #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}
```

```js
//第 4 个挑战 共 4 个挑战: 使分开的组件中的搜索域获得焦点 
做到单击“搜索”按钮将焦点放在搜索域上。请注意，每个组件都在单独的文件中定义，并且不能将其移出。如何将它们连接在一起？
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  return (
    //const inputRef =useRef(null);
    <>
      <nav>
        <SearchButton />
      </nav>
      <SearchInput />
    </>
  );
  //onClick ={()=>{inputRef.current.focus();}}
  //ref={inputRef}
}

export default function SearchButton() {
  return (
    <button>
      搜索
    </button>
  );
}

export default function SearchInput() {
  return (
    <input
      placeholder="找什么呢？"
    />
  );
  //export default forwardRef(
  //   function SearchInput(props, ref) {
  //     return (
  //       <input
  //         ref={ref}
  //         placeholder="找什么呢？"
  //       />
  //     );
  //   }
  // );
  //import { forwardRef } from 'react';从 react 库中导入 forwardRef 函数。forwardRef 允许函数组件接收 ref 参数，并将其传递给子组件。
  //导出一个使用 forwardRef 包裹的函数组件。forwardRef 接受一个渲染函数作为参数。定义一个名为 SearchInput 的函数组件，该组件接受两个参数：props 和 ref。props 包含传递给组件的所有属性，ref 是传递给组件的引用。返回一个 input 元素：ref={ref}：将传递给 SearchInput 组件的 ref 赋值给 input 元素，使外部组件可以通过 ref 直接操作该 input 元素。placeholder="找什么呢？"：设置输入框的占位符文本为“找什么呢？”。
}
答案
你需要向 SearchButton 添加一个onClick 属性，SearchButton 会将其向下传递给浏览器原生 <button>。你还要向下传递一个 ref 给 <SearchInput>，<SearchInput> 将转发 ref 给真正的 <input> 并对它进行赋值。最后，在单击事件处理器中，你将能对存储在该 ref 中的 DOM 节点调用 focus。
import { useRef } from 'react';
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <SearchButton onClick={() => {
          inputRef.current.focus();
        }} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  );
}

export default function SearchButton({ onClick }) {
  return (
    <button onClick={onClick}>
      搜索
    </button>
  );
}

import { forwardRef } from 'react';

export default forwardRef(
  function SearchInput(props, ref) {
    return (
      <input
        ref={ref}
        placeholder="找什么呢？"
      />
    );
  }
);

```

#### 用ref操作DOM 表格

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
|键入handleclick中的ref和button中的ref|视频暂停和播放的切换||
|框添加一个 ref，并在 DOM 节点上调用 focus()|获得焦点||
|flushsync|滚动图像轮播||
||搜索键和输入框分开在单独文件,如何获得焦点||

### 使用 Effect 同步

就是说是确保副作用在状态更新完成后立即执行。

有些组件需要与外部系统同步。例如，你可能希望根据 React state 控制非 React 组件、设置服务器连接或在组件出现在屏幕上时发送分析日志。Effects 会在渲染后运行一些代码，以便可以将组件与 React 之外的某些系统同步。

你将会学习到
什么是 Effect
Effect 与事件（event）有何不同
如何在组件中声明 Effect
如何避免不必要地重新运行 Effect
为什么 Effect 在开发环境中会影响两次，如何修复它们

#### 什么是 Effect，它与事件（event）有何不同？

在谈到 Effect 之前，你需要熟悉 React 组件中的两种逻辑类型：

渲染逻辑代码（在 描述 UI 中有介绍）位于组件的顶层。你将在这里接收 props 和 state，并对它们进行转换，最终返回你想在屏幕上看到的 JSX。渲染的代码必须是纯粹的——就像数学公式一样，它只应该“计算”结果，而不做其他任何事情。

事件处理程序（在 添加交互性 中介绍）是嵌套在组件内部的函数，而不仅仅是计算函数。事件处理程序可能会更新输入字段、提交 HTTP POST 请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作（例如按钮点击或键入）引起的“副作用”（它们改变了程序的状态）。

有时这还不够。考虑一个 ChatRoom 组件，它在屏幕上可见时必须连接到聊天服务器。连接到服务器不是一个纯计算（它包含副作用），因此它不能在渲染过程中发生。然而，并没有一个特定的事件（比如点击）导致 ChatRoom 被显示。

Effect 允许你指定由渲染本身，而不是特定事件引起的副作用。在聊天中发送消息是一个“事件”，因为它直接由用户点击特定按钮引起。然而，建立服务器连接是 Effect，因为它应该发生无论哪种交互导致组件出现。Effect 在屏幕更新后的 提交阶段 运行。这是一个很好的时机，可以将 React 组件与某个外部系统（如网络或第三方库）同步。

注意
在本文和后续文本中，Effect 在 React 中是专有定义——由渲染引起的副作用。为了指代更广泛的编程概念，也可以将其称为“副作用（side effect）”。

#### 你可能不需要 Effect

```js
不要随意在你的组件中使用 Effect。记住，Effect 通常用于暂时“跳出” React 代码并与一些 外部 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你想用 Effect 仅根据其他状态调整某些状态，那么 你可能不需要 Effect。

如何编写 Effect
编写 Effect 需要遵循以下三个规则：

声明 Effect。默认情况下，Effect 会在每次 commit 后都会执行。
指定 Effect 依赖。大多数 Effect 应该按需执行，而不是在每次渲染后都执行。例如，淡入动画应该只在组件出现时触发。连接和断开服务器的操作只应在组件出现和消失时，或者切换聊天室时执行。文章将介绍如何通过指定依赖来控制如何按需执行。
必要时添加清理（cleanup）函数。有时 Effect 需要指定如何停止、撤销，或者清除它的效果。例如，“连接”操作需要“断连”，“订阅”需要“退订”，“获取”既需要“取消”也需要“忽略”。你将学习如何使用 清理函数 来做到这一切。
以下是具体步骤。

第一步：声明 Effect
首先在 React 中引入 useEffect Hook：

import { useEffect } from 'react';
然后，在组件顶部调用它，并传入在每次渲染时都需要执行的代码：

function MyComponent() {
  useEffect(() => {
    // 每次渲染后都会执行此处的代码
  });
  return <div />;
}
每当你的组件渲染时，React 将更新屏幕，然后运行 useEffect 中的代码。换句话说，useEffect 会把这段代码放到屏幕更新渲染之后执行。

让我们看看如何使用 Effect 与外部系统同步。考虑一个 <VideoPlayer> React 组件。通过传递布尔类型的 isPlaying prop 以控制是播放还是暂停：

<VideoPlayer isPlaying={isPlaying} />;
自定义的 VideoPlayer 组件渲染了内置的 <video> 标签：

function VideoPlayer({ src, isPlaying }) {
  // TODO：使用 isPlaying 做一些事情
  return <video src={src} />;
}
但是，浏览器的 <video> 标签没有 isPlaying 属性。控制它的唯一方式是在 DOM 元素上调用 play() 和 pause() 方法。因此，你需要将 isPlaying prop 的值与 play() 和 pause() 等函数的调用进行同步，该属性用于告知当前视频是否应该播放。

首先要获取 <video>  DOM 节点的 对象引用。

你可能会尝试在渲染期间调用 play() 或 pause()，但这种做法是错的：
```

```js
//import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // 渲染期间不能调用 `play()`。 
  } else {
    ref.current.pause(); // 同样，调用 `pause()` 也不行。
  }

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
这段代码之所以不正确，是因为它试图在渲染期间对 DOM 节点进行操作。在 React 中，JSX 的渲染必须是纯粹操作，不应该包含任何像修改 DOM 的副作用。

而且，当第一次调用 VideoPlayer 时，对应的 DOM 节点甚至还不存在！如果连 DOM 节点都没有，那么如何调用 play() 或 pause() 方法呢！在返回 JSX 之前，React 不知道要创建什么 DOM。

解决办法是 使用 useEffect 包裹副作用，把它分离到渲染逻辑的计算过程之外：
```

```js
//import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
把调用 DOM 方法的操作封装在 Effect 中，你可以让 React 先更新屏幕，确定相关 DOM 创建好了以后然后再运行 Effect。

当 VideoPlayer 组件渲染时（无论是否为首次渲染），都会发生以下事情。首先，React 会刷新屏幕，确保 <video> 元素已经正确地出现在 DOM 中；然后，React 将运行 Effect；最后，Effect 将根据 isPlaying 的值调用 play() 或 pause()。

试试按下几次播放和暂停操作，观察视频播放器的播放、暂停行为是如何与 isPlaying prop 同步的：
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
在这个示例中，你同步到 React state 的“外部系统”是浏览器媒体 API；也可以使用类似的方法将旧的非 React 代码（如 jQuery 插件）封装成声明性的 React 组件。

请注意，控制视频播放器在实际应用中复杂得多：比如调用 play() 可能会失败，用户可能会使用内置浏览器控件播放或暂停等等。这只是一个简化了很多具体细节的例子。

陷阱
一般来说，Effect 会在  每次 渲染后执行，而以下代码会陷入死循环中：

const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
每次渲染结束都会执行 Effect；而更新 state 会触发重新渲染。但是新一轮渲染时又会再次执行 Effect，然后 Effect 再次更新 state……如此周而复始，从而陷入死循环。

Effect 通常应该使组件与 外部 系统保持同步。如果没有外部系统，你只想根据其他状态调整一些状态，那么 你也许不需要 Effect。
```

```js
//第二步：指定 Effect 依赖 
一般来说，Effect 会在 每次 渲染时执行。但更多时候，并不需要每次渲染的时候都执行 Effect。

有时这会拖慢运行速度。因为与外部系统的同步操作总是有一定时耗，在非必要时可能希望跳过它。例如，没有人会希望每次用键盘打字时都重新连接聊天服务器。
有时这会导致程序逻辑错误。例如，组件的淡入动画只需要在第一轮渲染出现时播放一次，而不是每次触发新一轮渲染后都播放。
为了演示这个问题，我们在前面的示例中加入一些 console.log 语句和更新父组件 state 的文本输入。请注意键入是如何导致 Effect 重新运行的：
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current.play();
    } else {
      console.log('调用 video.pause()');
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
将 依赖数组 传入 useEffect 的第二个参数，以告诉 React 跳过不必要地重新运行 Effect。在上面示例的第 14 行中传入一个空数组 []：

  useEffect(() => {
    // ...
  }, []);
你会发现 React 报错：React Hook useEffect has a missing dependency: 'isPlaying'：
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current.play();
    } else {
      console.log('调用 video.pause()');
      ref.current.pause();
    }
  }, []); // 这将产生错误

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
问题出现在 Effect 中使用了 isPlaying prop 以控制逻辑，但又没有直接告诉 Effect 需要依赖这个属性。为了解决这个问题，将 isPlaying 添加至依赖数组中：

  useEffect(() => {
    if (isPlaying) { // isPlaying 在此处使用……
      // ...
    } else {
      // ...
    }
  }, [isPlaying]); // ……所以它必须在此处声明！
现在所有的依赖都已经声明，所以没有错误了。指定 [isPlaying] 会告诉 React，如果 isPlaying 在上一次渲染时与当前相同，它应该跳过重新运行 Effect。通过这个改变，输入框的输入不会导致 Effect 重新运行，但是按下播放/暂停按钮会重新运行 Effect。
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
依赖数组可以包含多个依赖项。当指定的所有依赖项在上一次渲染期间的值与当前值完全相同时，React 会跳过重新运行该 Effect。React 使用 Object.is 比较依赖项的值。有关详细信息，请参阅 useEffect 参考文档。

请注意，不能随意选择依赖项。如果你指定的依赖项不能与 Effect 代码所期望的相匹配时，lint 将会报错，这将帮助你找到代码中的问题。如果你不希望某些代码重新运行，那么你应当 重新编辑 Effect 代码本身，使其不需要该依赖项。

陷阱
没有依赖数组作为第二个参数，与依赖数组位空数组 [] 的行为是不一致的：

useEffect(() => {
  // 这里的代码会在每次渲染后执行
});

useEffect(() => {
  // 这里的代码只会在组件挂载后执行
}, []);

useEffect(() => {
  //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
}, [a, b]);
接下来，我们将进一步介绍什么是 挂载（mount）。
为什么依赖数组中可以省略 ref? 

收起
下面的 Effect 同时使用了 ref 与 isPlaying prop，但是只有 isPlaying 被声明为了依赖项：

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
这是因为 ref 具有 稳定 的标识：React 保证 每轮渲染中调用 useRef 所产生的引用对象时，获取到的对象引用总是相同的，即获取到的对象引用永远不会改变，所以它不会导致重新运行 Effect。因此，依赖数组中是否包含它并不重要。当然也可以包括它，这样也可以：

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying, ref]);
useState 返回的 set 函数 也有稳定的标识符，所以也可以把它从依赖数组中忽略掉。如果在忽略某个依赖项时 linter 不会报错，那么这么做就是安全的。

但是，仅在 linter 可以“看到”对象稳定时，忽略稳定依赖项的规则才会起作用。例如，如果 ref 是从父组件传递的，则必须在依赖项数组中指定它。这样做是合适的，因为无法确定父组件是否始终是传递相同的 ref，或者可能是有条件地传递几个 ref 之一。因此，你的 Effect 将取决于传递的是哪个 ref。
```

```js
//第三步：按需添加清理（cleanup）函数 
考虑一个不同的例子。你正在编写一个 ChatRoom 组件，该组件出现时需要连接到聊天服务器。现在为你提供了 createConnection() API，该 API 返回一个包含 connect() 与 disconnection() 方法的对象。考虑当组件展示给用户时，应该如何保持连接？

从编写 Effect 逻辑开始：

useEffect(() => {
  const connection = createConnection();
  connection.connect();
});
每次重新渲染后连接到聊天室会很慢，因此可以添加依赖数组：

useEffect(() => {
  const connection = createConnection();
  connection.connect();
}, []);
在这个例子中，Effect 中的代码没有使用任何 props 或 state，此时指定依赖数组为空数组 []。这告诉 React 仅在组件“挂载”时运行此代码，即首次出现在屏幕上这一阶段。

试试运行下面的代码：
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
  }, []);
  return <h1>欢迎来到聊天室！</h1>;
}

export function createConnection() {
  // 真实的实现会将其连接到服务器，此处代码只是示例
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}
这里的 Effect 仅在组件挂载时执行，所以 "✅ 连接中……" 在控制台中只会打印一次。然而控制台实际打印 "✅ 连接中……" 了两次！为什么会这样？

想象 ChatRoom 组件是一个大规模的 App 中许多界面中的一部分。用户切换到含有 ChatRoom 组件的页面上时，该组件被挂载，并调用 connection.connect() 方法连接服务器。然后想象用户此时突然导航到另一个页面，比如切换到“设置”页面。这时，ChatRoom 组件就被卸载了。接下来，用户在“设置”页面忙完后，单击“返回”，回到上一个页面，并再次挂载 ChatRoom。这将建立第二次连接，但是，第一次时创建的连接从未被销毁！当用户在应用程序中不断切换界面再返回时，与服务器的连接会不断堆积。

如果不进行大量的手动测试，这样的错误很容易被遗漏。为了帮助你快速发现它们，在开发环境中，React 会在初始挂载组件后，立即再挂载一次。

观察到 "✅ 连接中……" 出现了两次，可以帮助找到问题所在：在代码中，组件被卸载时没有关闭连接。

为了解决这个问题，可以在 Effect 中返回一个 清理（cleanup） 函数。

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数。让我们看看执行清理函数会做些什么：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到聊天室！</h1>;
}

export function createConnection() {
  // 真实的实现会将其连接到服务器，此处代码只是示例
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}
现在在开发模式下，控制台会打印三条记录：

"✅ 连接中……"
"❌ 连接断开。"
"✅ 连接中……"
在开发环境下，出现这样的结果才是符合预期的。重复挂载组件，可以确保在 React 中离开和返回页面时不会导致代码运行出现问题。上面的代码中规定了挂载组件时连接服务器、卸载组件时断连服务器。所以断开、连接再重新连接是符合预期的行为。当为 Effect 正确实现清理函数时，无论 Effect 执行一次，还是执行、清理、再执行，用户都不会感受到明显的差异。所以，在开发环境下，出现额外的连接、断连时，这是 React 正在调试你的代码。这是很正常的现象，不要试图消除它！

在生产环境下，"✅ 连接中……" 只会被打印一次。也就是说仅在开发环境下才会重复挂载组件，以帮助你找到需要清理的 Effect。你可以选择关闭 严格模式 来关闭开发环境下特有的行为，但我们建议保留它。这可以帮助发现许多上面这样的错误。
```

#### 如何处理在开发环境中 Effect 执行两次？

```js
//
在开发环境中，React 有意重复挂载你的组件，以查找像上面示例中的错误。正确的态度是“如何修复 Effect 以便它在重复挂载后能正常工作”，而不是“如何只运行一次 Effect”。

通常的解决办法是实现清理函数。清理函数应该停止或撤销 Effect 正在执行的任何操作。简单来说，用户不应该感受到 Effect 只执行一次（如在生产环境中）和执行“挂载 → 清理 → 挂载”过程（如在开发环境中）之间的差异。

下面提供一些常用的 Effect 应用模式。

陷阱
Don’t use refs to prevent Effects from firing 
A common pitfall for preventing Effects firing twice in development is to use a ref to prevent the Effect from running more than once. For example, you could “fix” the above bug with a useRef:

  const connectionRef = useRef(null);
  useEffect(() => {
    // 🚩 This wont fix the bug!!!
    if (!connectionRef.current) {
      connectionRef.current = createConnection();
      connectionRef.current.connect();
    }
  }, []);
This makes it so you only see "✅ Connecting..." once in development, but it doesn’t fix the bug.

When the user navigates away, the connection still isn’t closed and when they navigate back, a new connection is created. As the user navigates across the app, the connections would keep piling up, the same as it would before the “fix”.

To fix the bug, it is not enough to just make the Effect run once. The effect needs to work after re-mounting, which means the connection needs to be cleaned up like in the solution above.

See the examples below for how to handle common patterns.
```

```js
//控制非 React 组件 
有时需要添加不是使用 React 编写的 UI 小部件。例如，假设你要向页面添加地图组件，并且它有一个 setZoomLevel() 方法，你希望调整缩放级别（zoom level）并与 React 代码中的 zoomLevel state 变量保持同步。Effect 看起来应该与下面类似：

useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
请注意，在这种情况下不需要清理。在开发环境中，React 会调用 Effect 两次，但这两次挂载时依赖项 zoomLevel 都是相同的，所以会跳过执行第二次挂载时的 Effect。开发环境中它可能会稍微慢一些，但这问题不大，因为它在生产中不会进行不必要的重复挂载。

某些 API 可能不允许连续调用两次。例如，内置的 <dialog> 元素的 showModal 方法在连续调用两次时会抛出异常，此时实现清理函数并使其关闭对话框：
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []);
在开发环境中，Effect 将调用 showModal()，然后立即调用 close()，然后再次调用 showModal()。这与调用只一次 showModal() 的效果相同。也正如在生产环境中看到的那样。
```

```js
//订阅事件 
如果 Effect 订阅了某些事件，清理函数应该退订这些事件：

useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
在开发环境中，Effect 会调用 addEventListener()，然后立即调用 removeEventListener()，然后再调用相同的 addEventListener()，这与只订阅一次事件的 Effect 等效；这也与用户在生产环境中只调用一次 addEventListener() 具有相同的感知效果。
```

```js
//触发动画 

在 React 开发环境中，`useEffect` 钩子会被执行两次：一次在挂载时，另一次在卸载时。这个行为是为了帮助开发者发现和修复副作用的问题。具体原因如下：
1. **挂载时**：`useEffect` 在组件首次渲染完成后执行，设置 `node.style.opacity = 1`，触发动画将透明度变为 1。
2. **卸载时**：在开发环境中，React 会在执行完 `useEffect` 的清理函数后立即重新运行 `useEffect`。清理函数将 `node.style.opacity` 重置为 0。
3. **重新挂载时**：`useEffect` 再次运行，将 `node.style.opacity` 重新设置为 1。
在生产环境中，`useEffect` 仅在组件挂载和卸载时运行一次，因此不会出现透明度反复变化的问题。React 仅在开发环境中执行这个双重调用，以帮助开发者识别潜在的副作用问题。

如果 Effect 对某些内容加入了动画，清理函数应将动画重置：

useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // 触发动画
  return () => {
    node.style.opacity = 0; // 重置为初始值
  };
}, []);
在开发环境中，透明度由 1 变为 0，再变为 1。这与在生产环境中，直接将其设置为 1 具有相同的感知效果，如果你使用支持过渡的第三方动画库，你的清理函数应将时间轴重置为其初始状态。
```

```js
//获取数据 
如果 Effect 将会获取数据，清理函数应该要么 中止该数据获取操作，要么忽略其结果：

useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
我们无法撤消已经发生的网络请求，但是清理函数应当确保获取数据的过程以及获取到的结果不会继续影响程序运行。如果 userId 从 'Alice' 变为 'Bob'，那么请确保 'Alice' 响应数据被忽略，即使它在 'Bob' 之后到达。

在开发环境中，浏览器调试工具的“网络”选项卡中会出现两个 fetch 请求。这是正常的。使用上述方法，第一个 Effect 将立即被清理，而 ignore 将被设置为 true。因此，即使有额外的请求，由于有 if (!ignore) 判断检查，也不会影响程序状态。

在生产环境中，只会显示发送了一条获取请求。如果开发环境中，第二次请求给你造成了困扰，最好的方法是使用一种可以删除重复请求、并缓存请求响应的解决方案：

function TodoList() {
  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);
  // ...
这不仅可以提高开发体验，还可以让你的应用程序速度更快。例如，用户按下按钮时，如果数据已经被缓存了，那么就不必再次等待加载。你可以自己构建这样的缓存，也可以使用很多在 Effect 中手动加载数据的替代方法。

Effect 中有哪些好的数据获取替代方案？ 
:
在 Effect 中调用 fetch 请求数据 是一种非常受欢迎的方式，特别是在客户端应用中。然而，它非常依赖手动操作，有很多的缺点：

Effect 不能在服务端执行。这意味着服务器最初传递的 HTML 不会包含任何数据。客户端的浏览器必须下载所有 JavaScript 脚本来渲染应用程序，然后才能加载数据——这并不高效。
直接在 Effect 中获取数据容易产生网络瀑布（network waterfall）。首先渲染了父组件，它会获取一些数据并进行渲染；然后渲染子组件，接着子组件开始获取它们的数据。如果网络速度不够快，这种方式比同时获取所有数据要慢得多。
直接在 Effect 中获取数据通常意味着无法预加载或缓存数据。例如，在组件卸载后然后再次挂载，那么它必须再次获取数据。
这不是很符合人机交互原则。如果你不想出现像 条件竞争（race condition） 之类的问题，那么你需要编写更多的样板代码。
以上所列出来的缺点并不是 React 特有的。在任何框架或者库上的组件挂载过程中获取数据，都会遇到这些问题。与路由一样，要做好数据获取并非易事，因此我们推荐以下方法：

如果你正在使用 框架 ，使用其内置的数据获取机制。现代 React 框架集成了高效的数据获取机制，不会出现上述问题。
否则，请考虑使用或构建客户端缓存。目前受欢迎的开源解决方案是 React Query、useSWR 和 React Router v6.4+。你也可以构建自己的解决方案，在这种情况下，你可以在幕后使用 Effect，但是请注意添加用于删除重复请求、缓存响应和避免网络瀑布（通过预加载数据或将数据需求提升到路由）的逻辑。
如果这些方法都不适合你，你可以继续直接在 Effect 中获取数据。
```

```js
//发送分析报告 
考虑在访问页面时发送日志分析：

useEffect(() => {
  logVisit(url); // 发送 POST 请求
}, [url]);
在开发环境中，logVisit 会为每个 URL 发送两次请求，所以你可能会想尝试解决这个问题。不过我们建议不必修改此处代码，与前面的示例一样，从用户的角度来看，运行一次和运行两次之间不会 感知 到行为差异。从实际的角度来看，logVisit 不应该在开发环境中做任何影响生产事情。由于每次保存代码文件时都会重新挂载组件，因此在开发环境中会额外记录访问次数。

在生产环境中，不会产生有重复的访问日志。

为了调试发送的分析事件，可以将应用部署到一个运行在生产模式下的暂存环境，或者暂时取消 严格模式 及其仅在开发环境中重新加载检查；还可以从路由变更事件处理程序中发送分析数据，而不是从 Effect 中发送。为了更精确的分析，可以使用 Intersection Observer 来跟踪哪些组件位于视口中以及它们保持可见的时间。
```

```js
//初始化应用时不需要使用 Effect 的情形 
某些逻辑应该只在应用程序启动时运行一次。比如，验证登陆状态和加载本地程序数据。你可以将其放在组件之外：

if (typeof window !== 'undefined') { // 检查是否在浏览器中运行
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ……
}
这保证了这种逻辑在浏览器加载页面后只运行一次。
```

```js
//不要在 Effect 中执行购买商品一类的操作 
有时，即使编写了一个清理函数，也不能避免执行两次 Effect。例如，Effect 包含会发送 POST 请求以执行购买操作：

useEffect(() => {
  // 🔴 错误：此处的 Effect 会在开发环境中执行两次，这在代码中是有问题的。
  fetch('/api/buy', { method: 'POST' });
}, []);
一方面，开发环境下，Effect 会执行两次，这意味着购买操作执行了两次，但是这并非是预期的结果，所以不应该把这个业务逻辑放在 Effect 中。另一方面，如果用户转到另一个页面，然后按“后退”按钮回到了这个界面，该怎么办？Effect 会随着组件再次挂载而再次执行。所以，当用户重新访问某个页面时，不应当执行购买操作；当只有用户点击“购买”按钮时，才执行购买操作。

因此，“购买”的操作不应由组件的挂载、渲染引起的；它是由特定的交互作用引起的，它应该只在用户按下按钮时运行。因此，它不应该写在 Effect 中，应当把 /api/buy 请求操作移动到购买按钮事件处理程序中：

  function handleClick() {
    // ✅ 购买商品应当在事件中执行，因为这是由特定的操作引起的。
    fetch('/api/buy', { method: 'POST' });
  }
这个例子说明如果重新挂载破坏了应用程序的逻辑，则通常含有未被发现的错误。从用户的角度来看，访问一个页面不应该与访问它、点击链接然后按下返回键再次查看页面有什么不同。React 通过在开发环境中重复挂载组件以验证组件是否遵守此原则。
```

#### 总结

```js
//
下面的 playground 可以帮助你在实践中找到对 Effect 的感觉。

这个例子使用 setTimeout 来安排控制台日志，在 Effect 运行后三秒钟显示输入文本。清理函数会取消挂起的超时。从按下“挂载组件”开始：
import { useState, useEffect } from 'react';
//展示了一个可以动态挂载和卸载的组件，该组件会根据输入的文本安排一个 3 秒后打印日志的定时器，并在文本变化时取消之前的定时器。
function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text);
    }
    //使用 useEffect 钩子安排副作用。定义一个 onTimeout 函数，在定时器触发时打印日志。
    console.log('🔵 安排 "' + text + '" 日志');
    const timeoutId = setTimeout(onTimeout, 3000);
    //打印日志，表示安排一个 3 秒后的定时器。设置一个定时器，3 秒后执行 onTimeout 函数，并将定时器的 ID 存储在 timeoutId 中。
    return () => {
      console.log('🟡 取消 "' + text + '" 日志');
      clearTimeout(timeoutId);
    };
  }, [text]);
//返回一个清理函数。当 text 变化或组件卸载时，清理函数会取消之前安排的定时器，并打印取消日志。
  return (
    <>
      <label>
        日志内容：{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
  //渲染一个输入框和一个标题。输入框的值绑定到 text 状态，输入框的变化会更新 text 状态。
}

export default function App() {
  const [show, setShow] = useState(false);//定义一个状态变量 show，初始值为 false，用于控制 Playground 组件的显示和隐藏。
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '卸载' : '挂载'} 组件
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
  //渲染一个按钮，点击按钮会切换 show 的状态。如果 show 为 true，渲染分隔线和 Playground 组件；否则，不渲染。

  //当 Playground 组件挂载时，useEffect 会安排一个定时器，3 秒后打印 text 的值。---当 text 变化时，useEffect 会先运行清理函数，取消之前的定时器，然后安排一个新的定时器。---当 Playground 组件卸载时，useEffect 的清理函数会运行，取消最后安排的定时器。---App 组件中的按钮控制 Playground 组件的挂载和卸载。点击按钮会在 show 状态和其取反值之间切换。
}
在最开始时可以看到三个日志输出：安排 "a" 日志，取消 "a" 日志，还有一个 安排 "a" 日志。三秒后，还会有一条日志显示：a。正如之前所说，额外的安排/取消动作产生的原因是因为 React 在开发环境中，会重新挂载组件一次，以验证你是否正确地实现了清理函数。

现在编辑输入框，输入 abc。如果输入速度足够快，你会看到 安排 "ab" 日志，紧接着的是 取消 "ab" 日志 和 安排 "abc" 日志。React 总是在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect。这就是为什么即使你快速输入，最多也只有一个安排操作。试试多次编辑输入框，并观察控制台以了解 Effect 是如何被清理的。

在输入框中输入一些内容，然后立即按下“卸载组件”按钮。注意卸载时如何清理最后一轮渲染的 Effect。在这里，它在触发卸载之前，清除了最后一次安排操作。

最后，在上面的代码中注释掉清理函数，这样安排操作就不会被取消。尝试快速输入 abcde。你预期三秒钟内会发生什么？计时器安排内的 console.log(text) 会打印 最新 的 text 并产生五个 abcde 日志吗？验证你的直觉吧！

三秒后，你应该看到一系列日志：a、ab、abc、abcd 与 abcde，而不是五个 abcde。每个 Effect 都会“捕获”其对应渲染的 text 值。text state 发生变化并不重要：来自 text = 'ab' 的渲染的 Effect 始终会得到 'ab'。换句话说，每个渲染的 Effect 都是相互隔离的。如果你对这是如何工作的感到好奇，你可以阅读有关 闭包 的内容。
每一轮渲染都有自己的 Effect 

收起
你可以将 useEffect 认为其将一段行为“附加”到渲染输出。考虑这种情况：

export default function ChatRoom({ roomId }) {
  //展示了一个动态连接和断开聊天室的功能
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>欢迎来到 {roomId}！</h1>;
  //定义一个名为 ChatRoom 的 React 组件，该组件接收一个 roomId 作为属性。
  //使用 useEffect 钩子安排副作用。该副作用会在组件挂载和 roomId 变化时执行。
  //调用 createConnection 函数，传入 roomId，创建一个连接对象 connection。
  //调用连接对象的 connect 方法，建立连接。
  //返回一个清理函数。当组件卸载或 roomId 变化时，该清理函数会调用连接对象的 disconnect 方法，断开连接。
  //指定 roomId 作为依赖项。当 roomId 变化时，useEffect 会重新执行副作用，首先调用上一次的清理函数断开旧的连接，然后创建并连接新的连接。
  //渲染一个标题，显示当前的 roomId。
}
让我们看看当用户在应用程序中切换页面时到底发生了什么。

初始渲染 
用户访问 <ChatRoom roomId="general" />，在这里让我们 假设 roomId 的值为 'general' ：

  // 首次渲染时的 JSX（roomId 为 "general"）
  return <h1>欢迎来到 general！</h1>;
Effect 也是渲染输出的一部分。首次渲染的 Effect 变为：

  //首先渲染时的 Effect（roomId 为 "general"）
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // 首次渲染时的依赖项（roomId 为 "general"）
  ['general']
React 将会执行用于连接到 'general' 聊天室的 Effect。

依赖项相同时的重新渲染 
让我们探讨下 <ChatRoom roomId="general" /> 的重复渲染。JSX 的输出结果仍然相同：

  // 第二次渲染时的 JSX（roomId 为 "general"）
  return <h1>Welcome to general!</h1>;
React 看到渲染输出没有改变，所以它不会更新 DOM 。

第二次渲染的 Effect 如下所示：

  // 第二次渲染时的 Effect（roomId 为 "general"）
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // 第二次渲染时的依赖项（roomId 为 "general"）
  ['general']
React 将第二次渲染时的 ['general'] 与第一次渲染时的 ['general'] 进行比较。因为所有的依赖项都是相同的，React 会忽略第二次渲染时的 Effect。所以此时 Effect 不会被调用。

依赖项不同时的重新渲染 
接下来，用户开始访问 <ChatRoom roomId="travel" />。注意这里 roomId 的属性值改为了 'travel'，返回的是不同的 JSX 输出结果：

  // 第三次渲染时的 JSX（roomId 为 "travel"）
  return <h1>欢迎来到 travel！</h1>;
这时的 React 会更新 DOM ，将 "欢迎来到 general" 更新为 "欢迎来到 travel"。

第三次渲染的 Effect 如下所示：

  // 第三次渲染时的 Effect（roomId 为 "travel"）
  () => {
    const connection = createConnection('travel');
    connection.connect();
    return () => connection.disconnect();
  },
  // 第三次渲染时的依赖项（roomId 为 "travel"）
  ['travel']
React 将第三次渲染时的 ['travel'] 与第二次渲染时的 ['general'] 相互比较。会发现依赖项不同：Object.is('travel', 'general') 为 false：所以这次的 Effect 不能跳过。

在 React 执行第三次渲染的 Effect 之前，它需要清理最近渲染的 Effect。第二次渲染的 Effect 被跳过了。所以 React 需要清理第一次渲染时的 Effect。如果你回看第一次渲染的 Effect，你可以看到第一次渲染时的清理函数需要执行的内容，是在 createConnection('general') 所创建的连接上调用 disconnect()。也就是从 'general' 聊天室断开连接。

之后，React 执行第三次渲染的 Effect。它连接到 'travel' 聊天室。
组件卸载 
最后，假设用户离开了当前页面，ChatRoom 组件将被卸载时，React 会执行最近的 Effect 的清理函数，也就是第三次渲染时 Effect 的清理函数。第三次渲染后再清理时，清理函数破坏了 createConnection('travel') 方法创建的连接。因此，该应用程序与 travel 房间断开了连接。

仅开发环境下的行为 
在 严格模式 下，React 在每次挂载组件后都会重新挂载组件（但是组件的 state 与 创建的 DOM 都会被保留）。它可以帮助你找出需要添加清理函数的 Effect，以及早暴露出像条件竞争那样的问题。此外，每当你在开发环境中保存更新代码文件时，React 也会重新挂载 Effect，不过这两种行为都仅限于开发环境。
```

```js
//摘要
与事件不同，Effect 是由渲染本身，而非特定交互引起的。
Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
空的依赖数组（[]）对应于组件“挂载”，即添加到屏幕上。
仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。
```

```js
//第 1 个挑战 共 4 个挑战: 挂载后聚焦于表单字段 
在下面的例子中，表单中渲染了一个 <MyInput /> 组件。

使用输入框的 focus() 方法，以在 MyInput 出现在屏幕上时自动聚焦。下面有一种实现方式，但是被注释掉了，因为它并没有很好地工作。找出它为什么不起作用，并修复它。如果你熟悉 autoFocus 属性，请假装它不存在：我们正在从头开始重新实现相同的功能。
import { useEffect, useRef } from 'react';

export default function MyInput({ value, onChange }) {
  const ref = useRef(null);

  // TODO：下面的这种做法不会生效，请修复。
  // ref.current.focus()    
  //  useEffect(() => {
  //  ref.current.focus();
  //}, []);
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
按下“展示表单”按钮并验证是否聚焦于 <input />（高亮显示，光标位于内部）；再次按下“隐藏表单”和“展示表单”，以验证是否再次聚焦于输入框。

仅在 挂载 时聚焦于 MyInput，而非每次渲染后。为了验证这一行为，按下“展示表单”，然后重复按下“大写”的复选框。点击复选框时，上方的输入框不应该获取焦点。

答案
在渲染期间调用 ref.current.focus() 本身是不正确的。因为这会产生“副作用”。副作用要么应该放在事件处理程序里面，要么在 useEffect 中。在这种情况下，副作用是组件渲染引起的，而不是任何特定的交互引起的，因此应该将它放在 Effect 中。

为了修复这个错误，可以对 ref.current.focus() 的调用包裹在 Effect 中。然后确保这个 Effect 只在组件挂载时执行而不是在每一轮渲染时都执行，可以为 Effect 的声明加一个空的依赖数组 []。
import { useEffect, useRef } from 'react';

export default function MyInput({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
```

```js
//第 2 个挑战 共 4 个挑战: 有条件地聚焦于表单 
下面的表单渲染两个 <MyInput /> 组件。

按下“展示表单”，同时注意自动聚焦于第二个输入框，这是因为两个 <MyInput /> 组件都在试图把焦点往自身上转移。当你连续为两个输入框调用 focus() 时，总是聚焦于最后面的输入框。

假设聚焦于第一个输入框，那么，第一个 MyInput 组件现在接收到 shouldFocus 属性，并且应当被设置为 true。更改下程序逻辑，规定仅当 MyInput 接收到的 shouldFocus 属性为 true 时才调用 focus() 。
import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
  const ref = useRef(null);
  // TODO：只在 shouldFocus 为 true 时才调用 focus()
  useEffect(() => {
    ref.current.focus();
  }, []);
  // useEffect(()=>{
  //   if (shoulderFoucs) {
  //     ref.current.focus();
  //   }
  // },[shouldFocus]);
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
试着重复按下“展示表单”和“隐藏表单”以验证你的解决方式。当表单出现时，这里只有第一个输入框获得了焦点。那是因为它的父组件渲染的第一个输入框时，第一个输入框带着 shouldFocus={true} 这个属性值，而渲染第二个输入框时，第二个输入框则带着 shouldFocus={false} 的属性值。可以发现，即使你往两个输入框里都输入一些内容时，它们仍然能正常工作。

答案
向 Effect 中加入条件逻辑。由于 Effect 使用了 shouldFocus，你需要为 Effect 指定 shouldFocus 这个依赖项。这也意味着如果输入框的 shouldFocus 由 false 变为 true 时，它才会在下次渲染时获得焦点。
import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}

```

```js
//第 3 个挑战 共 4 个挑战: 修复计时器触发两次的问题 
下面的 Counter 组件显示一个计数器，应该每秒递增一次。在组件挂载时，它调用 setInterval。这会导致 onTick 每秒运行一次。onTick 函数会递增计数器。

然而，计数器不是每秒递增一次，而是两次。这是为什么呢？找出错误的原因并修复它。
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
    }
    setInterval(onTick, 1000);
    //const intervalId = setInterval(onTick, 1000);
    // return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}

答案:
在 严格模式 下，（本网站中的示例沙盒（sandbox）都已开启严格模式），React 在开发模式中，每个组件都会重复挂载一次。这也就导致计数器组件被挂载了两次。所以，计时器也被设立了两次，这就是为什么计数器每秒递增两次的原因。

然而，这并不是 React 本身的错：而是 Effect 代码中本身就存在问题。React 只不过把这个问题放大了。真正的错误原因是这样的 Effect 启动后，但没有提供清理函数，所以上一次的 Effect 残留就没有被除去。

要修复这个问题，保存 setInterval 返回的 interval ID，并使用 clearInterval 实现一个清理函数：
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
    }

    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}
在开发环境中，React 仍然会重复挂载一次组件，通过放大问题，以确保已经正确地实现了清理函数。这样，调用一次 setInterval 后就紧接着调用 clearInterval，然后再调用 setInterval。在生产环境中与开发环境不同，React 只挂载一次组件，即只调用一次 setInterval。两种情况下用户感知的效果是相同的：计数器每秒递增一次。
```

```js
//第 4 个挑战 共 4 个挑战: 修复在 Effect 中获取数据的问题 
下面这个组件显示所选人物的传记。它在挂载时和每当 person 改变时通过调用一个异步函数 fetchBio(person) 来加载传记。该异步函数返回一个 Promise，最终解析为一个字符串。当获取完成时，它调用 setBio 以将该字符串显示在选择框下方。
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    setBio(null);
    fetchBio(person).then(result => {
      setBio(result);
    });
  }, [person]);
  //   useEffect(() => {
  //在 person 变化时异步获取并设置用户简介，并在组件卸载或 person 变化时取消未完成的请求。
  //   let ignore = false;
  //   setBio(null);
  //   fetchBio(person).then(result => {
  //     if (!ignore) {
  //       setBio(result);
  //     }
  //   });
  //   return () => {
  //     ignore = true;
  //   }
  // }, [person]);
  //使用 useEffect 钩子安排副作用。该副作用会在组件挂载和 person 变化时执行。
  //定义一个局部变量 ignore，用于在清理函数中标记是否应忽略请求结果。
  //在开始新的异步请求之前，将 bio 设置为 null，表示正在加载或重置状态。
  //调用 fetchBio 函数异步获取 person 的简介，当请求完成时执行 .then 回调。
  //检查 ignore 标记，如果标记为 false，则继续执行。
  //如果 ignore 标记为 false，将请求结果设置为 bio 的新值。
  //返回一个清理函数。当组件卸载或 person 变化时，该清理函数会执行。
  //在清理函数中，将 ignore 标记设置为 true，表示应忽略未完成的请求结果。
  //指定 person 作为依赖项。当 person 变化时，useEffect 会重新执行副作用，首先调用上一次的清理函数，然后重新运行副作用逻辑。

  //当组件首次挂载或 person 变化时，useEffect 会执行，重置 bio 为 null 并发起异步请求获取新的 person 的简介。---在异步请求完成后，如果组件未卸载且 person 未变化，结果会被设置为 bio 的新值。---如果在请求完成前组件卸载或 person 变化，清理函数会将 ignore 标记设置为 true，从而忽略未完成请求的结果，避免潜在的状态更新问题

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? '加载中……'}</i></p>
    </>
  );
}
这段代码中有一个错误。试试首先选择 Alice，然后选择 Bob，然后紧接着选择 Taylor。如果操作得足够快，会注意到这个错误：Taylor 被选中了，但下面的一段却说：“这是Bob的传记。”

为什么会发生这种情况？试着修复此 Effect 中的错误。
```

#### effect同步 表格

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
|[]就是只在渲染时与运行效果|||
|effect返回一个清理函数|杜绝connect两次||
|副作用应放在effect中|展开以后,输入框自动高亮||
|在useeffect中写入逻辑|展开两个输入框,但是只高亮后一个||
|清理|计时器触发2次的错误||
|清理|复选框快速选择但是下面人物传记内容不匹配||

### 你 可能不需要 Effect

Effect 是 React 范式中的一种脱围机制。它们让你可以 “逃出” React 并使组件和一些外部系统同步，比如非 React 组件、网络和浏览器 DOM。如果没有涉及到外部系统（例如，你想根据 props 或 state 的变化来更新一个组件的 state），你就不应该使用 Effect。移除不必要的 Effect 可以让你的代码更容易理解，运行得更快，并且更少出错。

你将会学习到
为什么以及如何从你的组件中移除 Effect
如何在没有 Effect 的情况下缓存昂贵的计算
如何在没有 Effect 的情况下重置和调整组件的 state
如何在事件处理函数之间共享逻辑
应该将哪些逻辑移动到事件处理函数中
如何将发生的变动通知到父组件

#### 如何移除不必要的 Effect

有两种不必使用 Effect 的常见情况：

你不必使用 Effect 来转换渲染所需的数据。例如，你想在展示一个列表前先做筛选。你的直觉可能是写一个当列表变化时更新 state 变量的 Effect。然而，这是低效的。当你更新这个 state 时，React 首先会调用你的组件函数来计算应该显示在屏幕上的内容。然后 React 会把这些变化“提交”到 DOM 中来更新屏幕。然后 React 会执行你的 Effect。如果你的 Effect 也立即更新了这个 state，就会重新执行整个流程。为了避免不必要的渲染流程，应在你的组件顶层转换数据。这些代码会在你的 props 或 state 变化时自动重新执行。
你不必使用 Effect 来处理用户事件。例如，你想在用户购买一个产品时发送一个 /api/buy 的 POST 请求并展示一个提示。在这个购买按钮的点击事件处理函数中，你确切地知道会发生什么。但是当一个 Effect 运行时，你却不知道用户做了什么（例如，点击了哪个按钮）。这就是为什么你通常应该在相应的事件处理函数中处理用户事件。
你 的确 可以使用 Effect 来和外部系统 同步 。例如，你可以写一个 Effect 来保持一个 jQuery 的组件和 React state 之间的同步。你也可以使用 Effect 来获取数据：例如，你可以同步当前的查询搜索和查询结果。请记住，比起直接在你的组件中写 Effect，现代 框架 提供了更加高效的，内置的数据获取机制。

为了帮助你获得正确的直觉，让我们来看一些常见的实例吧！

#### 根据 props 或 state 来更新 state

```js
//
假设你有一个包含了两个 state 变量的组件：firstName 和 lastName。你想通过把它们联结起来计算出 fullName。此外，每当 firstName 和 lastName 变化时，你希望 fullName 都能更新。你的第一直觉可能是添加一个 state 变量：fullName，并在一个 Effect 中更新它：

function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
大可不必这么复杂。而且这样效率也不高：它先是用 fullName 的旧值执行了整个渲染流程，然后立即使用更新后的值又重新渲染了一遍。让我们移除 state 变量和 Effect：

function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ 非常好：在渲染期间进行计算
  const fullName = firstName + ' ' + lastName;
  // ...
}
如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值。这将使你的代码更快（避免了多余的 “级联” 更新）、更简洁（移除了一些代码）以及更少出错（避免了一些因为不同的 state 变量之间没有正确同步而导致的问题）。如果这个观点对你来说很新奇，React 哲学 中解释了什么值应该作为 state。  
```

#### 缓存昂贵的计算

```js
//
这个组件使用它接收到的 props 中的 filter 对另一个 prop todos 进行筛选，计算得出 visibleTodos。你的直觉可能是把结果存到一个 state 中，并在 Effect 中更新它：

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
就像之前的例子一样，这既没有必要，也很低效。首先，移除 state 和 Effect：

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 如果 getFilteredTodos() 的耗时不长，这样写就可以了。
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
一般来说，这段代码没有问题！但是，getFilteredTodos() 的耗时可能会很长，或者你有很多 todos。这些情况下，当 newTodo 这样不相关的 state 变量变化时，你并不想重新执行 getFilteredTodos()。

你可以使用 useMemo Hook 缓存（或者说 记忆（memoize））一个昂贵的计算。

import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
或者写成一行：

import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 getFilteredTodos()
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
这会告诉 React，除非 todos 或 filter 发生变化，否则不要重新执行传入的函数。React 会在初次渲染的时候记住 getFilteredTodos() 的返回值。在下一次渲染中，它会检查 todos 或 filter 是否发生了变化。如果它们跟上次渲染时一样，useMemo 会直接返回它最后保存的结果。如果不一样，React 将再次调用传入的函数（并保存它的结果）。

你传入 useMemo 的函数会在渲染期间执行，所以它仅适用于 纯函数 场景。

如何判断计算是昂贵的？ 
:
一般来说只有你创建或循环遍历了成千上万个对象时才会很耗费时间。如果你想确认一下，可以添加控制台输出来测量某一段代码的执行时间：

console.time('筛选数组');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('筛选数组');
触发要测量的交互（例如，在输入框中输入）。你会在控制台中看到类似 筛选数组：0.15ms 这样的输出日志。如果总耗时达到了一定量级（比方说 1ms 或更多），那么把计算结果记忆（memoize）起来可能是有意义的。做一个实验，你可以把计算传入 useMemo 中来验证该交互导致的总耗时是减少了还是没什么变化：

console.time('筛选数组');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // 如果 todos 或 filter 没有发生变化将跳过执行
}, [todos, filter]);
console.timeEnd('筛选数组');
useMemo 不会让 第一次 渲染变快。它只是帮助你跳过不必要的更新。

请注意，你的设备性能可能比用户的更好，因此最好通过人工限制工具来测试性能。例如，Chrome 提供了 CPU 节流 工具。

同时需要注意的是，在开发环境测试性能并不能得到最准确的结果（例如，当开启 严格模式 时，你会看到每个组件渲染了两次，而不是一次）。所以为了得到最准确的时间，需要将你的应用构建为生产模式，同时使用与你的用户性能相当的设备进行测试。

```

#### 当 props 变化时重置所有 state

```js
//ProfilePage 组件接收一个 prop：userId。页面上有一个评论输入框，你用了一个 state：comment 来保存它的值。有一天，你发现了一个问题：当你从一个人的个人资料导航到另一个时，comment 没有被重置。这导致很容易不小心把评论发送到不正确的个人资料。为了解决这个问题，你想在 userId 变化时，清除 comment 变量：

export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 避免：当 prop 变化时，在 Effect 中重置 state
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
但这是低效的，因为 ProfilePage 和它的子组件首先会用旧值渲染，然后再用新值重新渲染。并且这样做也很复杂，因为你需要在 ProfilePage 里面 所有 具有 state 的组件中都写这样的代码。例如，如果评论区的 UI 是嵌套的，你可能也想清除嵌套的 comment state。

取而代之的是，你可以通过为每个用户的个人资料组件提供一个明确的键来告诉 React 它们原则上是 不同 的个人资料组件。将你的组件拆分为两个组件，并从外部的组件传递一个 key 属性给内部的组件：

export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ 当 key 变化时，该组件内的 comment 或其他 state 会自动被重置
  const [comment, setComment] = useState('');
  // ...
}
通常，当在相同的位置渲染相同的组件时，React 会保留状态。通过将 userId 作为 key 传递给 Profile 组件，使  React 将具有不同 userId 的两个 Profile 组件视为两个不应共享任何状态的不同组件。每当 key（这里是 userId）变化时，React 将重新创建 DOM，并 重置 Profile 组件和它的所有子组件的 state。现在，当在不同的个人资料之间导航时，comment 区域将自动被清空。

请注意，在这个例子中，只有外部的 ProfilePage 组件被导出并在项目中对其他文件可见。渲染 ProfilePage 的那些组件不用传递 key 给它：它们只需把 userId 作为常规 prop 传入即可。而 ProfilePage 将其作为 key 传递给内部的 Profile 组件是它的实现细节而已。
```

#### 当 prop 变化时调整部分 state

```js
//有时候，当 prop 变化时，你可能只想重置或调整部分 state ，而不是所有 state。

List 组件接收一个 items 列表作为 prop，然后用 state 变量 selection 来保持已选中的项。当 items 接收到一个不同的数组时，你想将 selection 重置为 null：

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 避免：当 prop 变化时，在 Effect 中调整 state
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
这不太理想。每当 items 变化时，List 及其子组件会先使用旧的 selection 值渲染。然后 React 会更新 DOM 并执行 Effect。最后，调用 setSelection(null) 将导致 List 及其子组件重新渲染，重新启动整个流程。

让我们从删除 Effect 开始。取而代之的是在渲染期间直接调整 state：

function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 好一些：在渲染期间调整 state
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
像这样 存储前序渲染的信息 可能很难理解，但它比在 Effect 中更新这个 state 要好。上面的例子中，在渲染过程中直接调用了 setSelection。当它执行到 return 语句退出后，React 将 立即 重新渲染 List。此时 React 还没有渲染 List 的子组件或更新 DOM，这使得 List 的子组件可以跳过渲染旧的 selection 值。

在渲染期间更新组件时，React 会丢弃已经返回的 JSX 并立即尝试重新渲染。为了避免非常缓慢的级联重试，React 只允许在渲染期间更新 同一 组件的状态。如果你在渲染期间更新另一个组件的状态，你会看到一条报错信息。条件判断 items !== prevItems 是必要的，它可以避免无限循环。你可以像这样调整 state，但任何其他副作用（比如变化 DOM 或设置的延时）应该留在事件处理函数或 Effect 中，以 保持组件纯粹。

虽然这种方式比 Effect 更高效，但大多数组件也不需要它。无论你怎么做，根据 props 或其他 state 来调整 state 都会使数据流更难理解和调试。总是检查是否可以通过添加 key 来重置所有 state，或者 在渲染期间计算所需内容。例如，你可以存储已选中的 item ID 而不是存储（并重置）已选中的 item：

function List({ items }) {
  //实现了一个列表组件，并包含了对 selectedId 和 isReverse 的状态管理。
  //定义一个名为 List 的函数组件，接收一个 items 属性。
  const [isReverse, setIsReverse] = useState(false);//使用 useState 钩子定义一个布尔状态变量 isReverse 及其更新函数 setIsReverse，初始值为 false。
  const [selectedId, setSelectedId] = useState(null);//使用 useState 钩子定义一个状态变量 selectedId 及其更新函数 setSelectedId，初始值为 null。
  // ✅ 非常好：在渲染期间计算所需内容
  const selection = items.find(item => item.id === selectedId) ?? null;
  // 使用 find 方法在 items 数组中查找 id 与 selectedId 匹配的项目。如果找到了该项目，将其赋值给 selection；如果没有找到，使用空合并运算符 ?? 将 selection 赋值为 null。
  //...组件其他部分
}
现在完全不需要 “调整” state 了。如果包含已选中 ID 的项出现在列表中，则仍然保持选中状态。如果没有找到匹配的项，则在渲染期间计算的 selection 将会是 null。行为不同了，但可以说更好了，因为大多数对 items 的更改仍可以保持选中状态。
```

#### 在事件处理函数中共享逻辑

```js
//假设你有一个产品页面，上面有两个按钮（购买和付款），都可以让你购买该产品。当用户将产品添加进购物车时，你想显示一个通知。在两个按钮的 click 事件处理函数中都调用 showNotification() 感觉有点重复，所以你可能想把这个逻辑放在一个 Effect 中：

function ProductPage({ product, addToCart }) {
  //组件 ProductPage，展示了一个产品页面。这里展示了如何避免在 useEffect 中处理属于事件特定的逻辑。

  // 🔴 避免：在 Effect 中处理属于事件特定的逻辑
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`已添加 ${product.name} 进购物车！`);
    }
  }, [product]);
  //组件，接收 product 和 addToCart 两个属性。
  //使用 useEffect 钩子来显示通知，如果 product.isInCart 为 true，则显示通知 已添加 ${product.name} 进购物车！。useEffect 的依赖是 product，即每当 product 变化时，useEffect 都会重新执行。这个代码片段的注释指出这是一个不好的做法，因为它在 useEffect 中处理了事件特定的逻辑。
function handleBuyClick() {
    addToCart(product);
    //定义一个函数 handleBuyClick，当用户点击购买按钮时调用 addToCart 函数，将 product 添加到购物车。
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
    //定义一个函数 handleCheckoutClick，当用户点击结账按钮时，先调用 addToCart 函数将 product 添加到购物车，然后导航到结账页面。
  }
  // ...
}
这个 Effect 是多余的。而且很可能会导致问题。例如，假设你的应用在页面重新加载之前 “记住” 了购物车中的产品。如果你把一个产品添加到购物车中并刷新页面，通知将再次出现。每次刷新该产品页面时，它都会出现。这是因为 product.isInCart 在页面加载时已经是 true 了，所以上面的 Effect 每次都会调用 showNotification()。

当你不确定某些代码应该放在 Effect 中还是事件处理函数中时，先自问 为什么 要执行这些代码。Effect 只用来执行那些显示给用户时组件 需要执行 的代码。在这个例子中，通知应该在用户 按下按钮 后出现，而不是因为页面显示出来时！删除 Effect 并将共享的逻辑放入一个被两个事件处理程序调用的函数中：

function ProductPage({ product, addToCart }) {
  // ✅ 非常好：事件特定的逻辑在事件处理函数中处理
  function buyProduct() {
    addToCart(product);
    showNotification(`已添加 ${product.name} 进购物车！`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
这既移除了不必要的 Effect，又修复了问题。
```

#### 发送 POST 请求

```js
//这个 Form 组件会发送两种 POST 请求。它在页面加载之际会发送一个分析请求。当你填写表格并点击提交按钮时，它会向 /api/register 接口发送一个 POST 请求：

function Form() {
  //一个表单组件 Form，说明了如何在组件挂载时执行逻辑，同时避免在 useEffect 中处理事件特定的逻辑
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);
  //使用 useEffect 钩子在组件挂载时发送分析事件 visit_form，因为第二个参数是空数组 []，所以这个效果只会在组件挂载和卸载时执行一次。这是一个很好的做法。

  // 🔴 避免：在 Effect 中处理属于事件特定的逻辑
  const [jsonToSubmit, setJsonToSubmit] = useState(null);// useState 钩子定义一个状态变量 jsonToSubmit，用来存储要提交的 JSON 数据。
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);
  //使用 useEffect 钩子来监听 jsonToSubmit 状态的变化。当 jsonToSubmit 不为 null 时，发送一个 POST 请求到 /api/register。这段代码的注释指出，应该避免在 useEffect 中处理事件特定的逻辑。这样做的目的是将事件特定的逻辑与组件状态变化的逻辑分开。

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
    //定义一个 handleSubmit 函数，用来处理表单的提交事件。首先阻止表单的默认提交行为，然后设置 jsonToSubmit 状态为包含 firstName 和 lastName 的对象。
  }
  // ...
}
让我们应用与之前示例相同的准则。

分析请求应该保留在 Effect 中。这是 因为 发送分析请求是表单显示时就需要执行的（在开发环境中它会发送两次，请 参考这里 了解如何处理）。

然而，发送到 /api/register 的 POST 请求并不是由表单 显示 时引起的。你只想在一个特定的时间点发送请求：当用户按下按钮时。它应该只在这个 特定的交互 中发生。删除第二个 Effect，将该 POST 请求移入事件处理函数中：

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 非常好：这个逻辑应该在组件显示时执行
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ 非常好：事件特定的逻辑在事件处理函数中处理
    post('/api/register', { firstName, lastName });
  }
  // ...
}
当你决定将某些逻辑放入事件处理函数还是 Effect 中时，你需要回答的主要问题是：从用户的角度来看它是 怎样的逻辑。如果这个逻辑是由某个特定的交互引起的，请将它保留在相应的事件处理函数中。如果是由用户在屏幕上 看到 组件时引起的，请将它保留在 Effect 中。
```

#### 链式计算

```js
//有时候你可能想链接多个 Effect，每个 Effect 都基于某些 state 来调整其他的 state：

function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 避免：链接多个 Effect 仅仅为了相互触发调整 state
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
    //监听 card 状态的变化，如果 card 不为 null 且是黄金卡片（card.gold 为 true），则将黄金卡片计数增加 1。
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
      //监听 goldCardCount 状态的变化，如果黄金卡片计数大于 3，则将游戏回合增加 1，并将黄金卡片计数重置为 0
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
    //监听 round 状态的变化，如果回合数大于 5，则将游戏结束状态设置为 true。
  }, [round]);

  useEffect(() => {
    alert('游戏结束！');
    //监听 isGameOver 状态的变化，如果游戏结束状态变为 true，则弹出一个提示框显示“游戏结束”。
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('游戏已经结束了。');
    } else {
      setCard(nextCard);
      //定义 handlePlaceCard 函数来处理放置卡片的逻辑。如果游戏已经结束，抛出错误，否则将当前卡片设置为 nextCard。
    }
  }

  // ...
这段代码里有两个问题。

一个问题是它非常低效：在链式的每个 set 调用之间，组件（及其子组件）都不得不重新渲染。在上面的例子中，在最坏的情况下（setCard → 渲染 → setGoldCardCount → 渲染 → setRound → 渲染 → setIsGameOver → 渲染）有三次不必要的重新渲染。

即使不考虑渲染效率问题，随着代码不断扩展，你会遇到这条 “链式” 调用不符合新需求的情况。试想一下，你现在需要添加一种方法来回溯游戏的历史记录，可以通过更新每个 state 变量到之前的值来实现。然而，将 card 设置为之前的的某个值会再次触发 Effect 链并更改你正在显示的数据。这样的代码往往是僵硬而脆弱的。

在这个例子中，更好的做法是：尽可能在渲染期间进行计算，以及在事件处理函数中调整 state：

function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ 尽可能在渲染期间进行计算
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('游戏已经结束了。');
    }

    // ✅ 在事件处理函数中计算剩下的所有 state
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('游戏结束！');
        }
      }
    }
  }

  // ...
这高效得多。此外，如果你实现了一个回溯游戏历史的方法，现在你可以将每个 state 变量设置为之前的任何的一个值，而不会触发每个调整其他值的 Effect 链。如果你需要在多个事件处理函数之间复用逻辑，可以 提取成一个函数 并在这些事件处理函数中调用它。

请记住，在事件处理函数内部，state 的行为类似快照。例如，即使你调用了 setRound(round + 1)，round 变量仍然是用户点击按钮时的值。如果你需要使用下一个值进行计算，则需要像这样手动定义它：const nextRound = round + 1。

在某些情况下，你 无法 在事件处理函数中直接计算出下一个 state。例如，试想一个具有多个下拉菜单的表单，如果下一个下拉菜单的选项取决于前一个下拉菜单选择的值。这时，Effect 链是合适的，因为你需要与网络进行同步。
```

#### 初始化应用

```js
//有些逻辑只需要在应用加载时执行一次。

你可能想把它放在一个顶层组件的 Effect 中：

function App() {
  // 🔴 避免：把只需要执行一次的逻辑放在 Effect 中
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
然后，你很快就会发现它在 开发环境会执行两次。这会导致一些问题——例如，它可能使身份验证 token 无效，因为该函数不是为被调用两次而设计的。一般来说，当组件重新挂载时应该具有一致性。包括你的顶层 App 组件。

尽管在实际的生产环境中它可能永远不会被重新挂载，但在所有组件中遵循相同的约束条件可以更容易地移动和复用代码。如果某些逻辑必须在 每次应用加载时执行一次，而不是在 每次组件挂载时执行一次，可以添加一个顶层变量来记录它是否已经执行过了：

let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ 只在每次应用加载时执行一次
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
你也可以在模块初始化和应用渲染之前执行它：

if (typeof window !== 'undefined') { // 检测我们是否在浏览器环境
   // ✅ 只在每次应用加载时执行一次
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
顶层代码会在组件被导入时执行一次——即使它最终并没有被渲染。为了避免在导入任意组件时降低性能或产生意外行为，请不要过度使用这种方法。将应用级别的初始化逻辑保留在像 App.js 这样的根组件模块或你的应用入口中。
```

#### 通知父组件有关 state 变化的信息

```js
//假设你正在编写一个有具有内部 state isOn 的 Toggle 组件，该 state 可以是 true 或 false。有几种不同的方式来进行切换（通过点击或拖动）。你希望在 Toggle 的 state 变化时通知父组件，因此你暴露了一个 onChange 事件并在 Effect 中调用它：

function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 避免：onChange 处理函数执行的时间太晚了
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
和之前一样，这不太理想。Toggle 首先更新它的 state，然后 React 会更新屏幕。然后 React 执行 Effect 中的代码，调用从父组件传入的 onChange 函数。现在父组件开始更新它自己的 state，开启另一个渲染流程。更好的方式是在单个流程中完成所有操作。

删除 Effect，并在同一个事件处理函数中更新 两个 组件的 state：

function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ 非常好：在触发它们的事件中执行所有更新
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
通过这种方式，Toggle 组件及其父组件都在事件处理期间更新了各自的 state。React 会 批量 处理来自不同组件的更新，所以只会有一个渲染流程。

你也可以完全移除该 state，并从父组件中接收 isOn：

// ✅ 也很好：该组件完全由它的父组件控制
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
“状态提升” 允许父组件通过切换自身的 state 来完全控制 Toggle 组件。这意味着父组件会包含更多的逻辑，但整体上需要关心的状态变少了。每当你尝试保持两个不同的 state 变量之间的同步时，试试状态提升！
```

#### 将数据传递给父组件

```js
//Child 组件获取了一些数据并在 Effect 中传递给 Parent 组件：

function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 避免：在 Effect 中传递数据给父组件
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
在 React 中，数据从父组件流向子组件。当你在屏幕上看到了一些错误时，你可以通过一路追踪组件树来寻找错误信息是从哪个组件传递下来的，从而找到传递了错误的 prop 或具有错误的 state 的组件。当子组件在 Effect 中更新其父组件的 state 时，数据流变得非常难以追踪。既然子组件和父组件都需要相同的数据，那么可以让父组件获取那些数据，并将其 向下传递 给子组件：

function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ 非常好：向子组件传递数据
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
这更简单，并且可以保持数据流的可预测性：数据从父组件流向子组件。
```

#### 订阅外部 store

```js
//有时候，你的组件可能需要订阅 React state 之外的一些数据。这些数据可能来自第三方库或内置浏览器 API。由于这些数据可能在 React 无法感知的情况下发变化，你需要在你的组件中手动订阅它们。这经常使用 Effect 来实现，例如：

function useOnlineStatus() {
  // 不理想：在 Effect 中手动订阅 store
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
这个组件订阅了一个外部的 store 数据（在这里，是浏览器的 navigator.onLine API）。由于这个 API 在服务端不存在（因此不能用于初始的 HTML），因此 state 最初被设置为 true。每当浏览器 store 中的值发生变化时，组件都会更新它的 state。

尽管通常可以使用 Effect 来实现此功能，但 React 为此针对性地提供了一个 Hook 用于订阅外部 store。删除 Effect 并将其替换为调用 useSyncExternalStore：

//使用 useSyncExternalStore 钩子订阅网络状态（在线或离线）并在组件中使用该状态。
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
  //subscribe 函数用于订阅浏览器的在线和离线事件。
  //在函数内部，window.addEventListener 方法添加了两个事件监听器，分别监听 online 和 offline 事件，并在事件发生时调用传入的 callback 函数。
  //该函数返回一个清理函数，用于移除这些事件监听器。
}

function useOnlineStatus() {
  // ✅ 非常好：用内置的 Hook 订阅外部 store
  return useSyncExternalStore(
    subscribe, // 只要传递的是同一个函数，React 不会重新订阅
    () => navigator.onLine, // 如何在客户端获取值
    () => true // 如何在服务端获取值
  );
  //useOnlineStatus 是一个自定义钩子，它使用 useSyncExternalStore 来订阅外部的网络状态。
  //useSyncExternalStore 接受三个参数：subscribe 函数，用于订阅在线和离线事件。一个函数，在客户端调用时返回当前的网络状态（navigator.onLine）。一个函数，在服务端调用时返回默认值（true）。
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  //ChatIndicator 组件使用 useOnlineStatus 钩子获取当前的网络状态。isOnline 变量保存当前的网络状态（true 表示在线，false 表示离线）。
  // ...
}
与手动使用 Effect 将可变数据同步到 React state 相比，这种方法能减少错误。通常，你可以写一个像上面的 useOnlineStatus() 这样的自定义 Hook，这样你就不需要在各个组件中重复写这些代码。阅读更多关于在 React 组件中订阅外部数据 store 的信息。
```

#### 获取数据

```js
//许多应用使用 Effect 来发起数据获取请求。像这样在 Effect 中写一个数据获取请求是相当常见的：

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 避免：没有清除逻辑的获取数据
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
你 不需要 把这个数据获取逻辑迁移到一个事件处理函数中。

这可能看起来与之前需要将逻辑放入事件处理函数中的示例相矛盾！但是，考虑到这并不是 键入事件，这是在这里获取数据的主要原因。搜索输入框的值经常从 URL 中预填充，用户可以在不关心输入框的情况下导航到后退和前进页面。

page 和 query 的来源其实并不重要。只要该组件可见，你就需要通过当前 page 和 query 的值，保持 results 和网络数据的 同步。这就是为什么这里是一个 Effect 的原因。

然而，上面的代码有一个问题。假设你快速地输入 “hello”。那么 query 会从 “h” 变成 “he”，“hel”，“hell” 最后是 “hello”。这会触发一连串不同的数据获取请求，但无法保证对应的返回顺序。例如，“hell” 的响应可能在 “hello” 的响应 之后 返回。由于它的 setResults() 是在最后被调用的，你将会显示错误的搜索结果。这种情况被称为 “竞态条件”：两个不同的请求 “相互竞争”，并以与你预期不符的顺序返回。

为了修复这个问题，你需要添加一个 清理函数 来忽略较早的返回结果：

//根据查询参数 query 和当前页码 page 来获取搜索结果，并在组件中显示这些结果。
function SearchResults({ query }) {
  //这是一个接收 query 作为属性的函数组件，query 代表搜索查询。
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
   //使用 useEffect 钩子来执行副作用操作（如数据获取），当 query 或 page 发生变化时会重新运行该副作用。
   //定义 ignore 变量，用于标记是否应忽略当前的请求结果（用于清理效果）。
   //调用 fetchResults(query, page) 获取搜索结果，fetchResults 是一个异步函数，返回一个包含搜索结果的 Promise。
   //当 fetchResults 返回结果后，检查 ignore 是否为 false，如果为 false，调用 setResults 更新 results 状态。
   //useEffect 返回一个清理函数，当组件卸载或 query 或 page 发生变化时，清理函数会将 ignore 设置为 true，避免处理已卸载组件的状态更新。
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
    //handleNextPageClick 函数用于处理用户点击“下一页”按钮的事件，调用 setPage 将 page 状态加 1，从而触发 useEffect 重新获取下一页的搜索结果。
  }
  // ...
}
这确保了当你在 Effect 中获取数据时，除了最后一次请求的所有返回结果都将被忽略。

处理竞态条件并不是实现数据获取的唯一难点。你可能还需要考虑缓存响应结果（使用户点击后退按钮时可以立即看到先前的屏幕内容），如何在服务端获取数据（使服务端初始渲染的 HTML 中包含获取到的内容而不是加载动画），以及如何避免网络瀑布（使子组件不必等待每个父组件的数据获取完毕后才开始获取数据）。

这些问题适用于任何 UI 库，而不仅仅是 React。解决这些问题并不容易，这也是为什么现代 框架 提供了比在 Effect 中获取数据更有效的内置数据获取机制的原因。

如果你不使用框架（也不想开发自己的框架），但希望使从 Effect 中获取数据更符合人类直觉，请考虑像这个例子一样，将获取逻辑提取到一个自定义 Hook 中：

//查询参数 query 和当前页码 page 从 /api/search 获取搜索结果，并在组件中显示这些结果。
function SearchResults({ query }) {
  //这是一个接收 query 作为属性的函数组件，query 代表搜索查询
  //使用 URLSearchParams 将 query 和 page 组合成查询字符串参数。
  //调用 useData 钩子函数，并传入包含查询参数的 URL 字符串 /api/search?${params}，返回搜索结果并存储在 results 变量中。
  //handleNextPageClick 函数用于处理用户点击“下一页”按钮的事件，调用 setPage 将 page 状态加 1，从而触发 useData 钩子重新获取下一页的搜索结果。
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);
  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  //useData 是一个自定义钩子函数，用于从指定的 url 获取数据。
  const [data, setData] = useState(null);//data 是一个状态变量，用于存储从 API 获取的数据，初始值为 null。
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
      //使用 useEffect 钩子来执行副作用操作（如数据获取），当 url 发生变化时会重新运行该副作用。
      //定义 ignore 变量，用于标记是否应忽略当前的请求结果（用于清理效果）。
      //调用 fetch(url) 获取数据，并转换为 JSON 格式  ;  接着检查 ignore 是否为 false，如果为 false，调用 setData 更新 data 状态。
     //useEffect 返回一个清理函数，当组件卸载或 url 发生变化时，清理函数会将 ignore 设置为 true，避免处理已卸载组件的状态更新。
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
你可能还想添加一些错误处理逻辑以及跟踪内容是否处于加载中。你可以自己编写这样的 Hook，也可以使用 React 生态中已经存在的许多解决方案。虽然仅仅使用自定义 Hook 不如使用框架内置的数据获取机制高效，但将数据获取逻辑移动到自定义 Hook 中将使后续采用高效的数据获取策略更加容易。

一般来说，当你不得不编写 Effect 时，请留意是否可以将某段功能提取到专门的内置 API 或一个更具声明性的自定义 Hook 中，比如上面的 useData。你会发现组件中的原始 useEffect 调用越少，维护应用将变得更加容易。
```

```js
//摘要
如果你可以在渲染期间计算某些内容，则不需要使用 Effect。
想要缓存昂贵的计算，请使用 useMemo 而不是 useEffect。
想要重置整个组件树的 state，请传入不同的 key。
想要在 prop 变化时重置某些特定的 state，请在渲染期间处理。
组件 显示 时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中。
如果你需要更新多个组件的 state，最好在单个事件处理函数中处理。
当你尝试在不同组件中同步 state 变量时，请考虑状态提升。
你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免竞态条件。
```

```js
//第 1 个挑战 共 4 个挑战: 不用 Effect 转换数据 
下面的 TodoList 显示了一个待办事项列表。当 “只显示未完成的事项” 复选框被勾选时，已完成的待办事项不会显示在列表中。无论哪些待办事项可见，页脚始终显示尚未完成的待办事项数量。

通过移除不必要的 state 和 Effect 来简化这个组件。
import { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [activeTodos, setActiveTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [footer, setFooter] = useState(null);//多余

  useEffect(() => {
    setActiveTodos(todos.filter(todo => !todo.completed));
    //筛选出所有未完成的事项。
  }, [todos]);

  useEffect(() => {
    setVisibleTodos(showActive ? activeTodos : todos);
  }, [showActive, todos, 
  //显示所有事项还是仅显示未完成的事项。activeTodos]);

  useEffect(() => {
    setFooter(
      <footer>
        {activeTodos.length} 项待办
      </footer>
    );
    //，显示未完成事项的数量。
  }, [activeTodos]);

//3个useeffect都多余

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      {footer}
    </> 
        //       <footer>
        //   {activeTodos.length} 项待办
        // </footer>
  );
  //渲染一个复选框，用于切换是否仅显示未完成事项。
  //渲染一个 NewTodo 组件，用于添加新事项。
  //渲染一个待办事项列表，根据 visibleTodos 中的内容显示。
  //渲染页脚 footer。
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
    //NewTodo 组件用于添加新的待办事项。text: 存储新事项的文本内容，初始值为空字符串。handleAddClick 函数：清空输入框，并调用 onAdd 回调函数，将新事项添加到列表中。渲染一个输入框和一个按钮，用户可以在输入框中输入新事项，点击按钮添加事项。
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
    </>
  );
}

//todojs
let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];
答案
这个例子中只有两个必要的 state 变量：todos 列表和代表复选框是否勾选的 showActive。其他所有的 state 变量都是 多余的，可以在渲染期间计算得出。包括 footer，可以直接移到包含它的 JSX 中。

你的最终答案应该是这样：
import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>
        {activeTodos.length} 项待办
      </footer>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
    </>
  );
}

let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];
```

```js
//第 2 个挑战 共 4 个挑战: 不用 Effect 缓存计算结果 
在这个例子中，筛选 todos 的逻辑被提取到了一个叫做 getVisibleTodos() 的函数中，该函数内部包含一个 console.log()，它可以帮你了解函数的调用情况。切换 “只显示未完成的事项” 会导致 getVisibleTodos() 重新执行。这符合预期，因为切换未完成的待办事项会导致可见的待办事项发生变化。

你的任务是移除 TodoList 组件中重复计算 visibleTodos 列表的 Effect。但是，你需要确保在输入框中输入时，getVisibleTodos() 不会 重新执行（因此不会打印任何日志）。
import { useState, useEffect } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const [visibleTodos, setVisibleTodos] = useState([]);
  //  const visibleTodos = useMemo(
  // () => getVisibleTodos(todos, showActive),
// [todos, showActive]
  )

//这个useEFFECT删掉
  useEffect(() => {
    setVisibleTodos(getVisibleTodos(todos, showActive));
  }, [todos, showActive]);

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() 被调用了 ${++calls} 次`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];
答案
移除 state 变量和 Effect，取而代之的是添加一个 useMemo 来以缓存调用 getVisibleTodos() 的结果：
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() 被调用了 ${++calls} 次`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];

通过这些改动，getVisibleTodos() 只有在 todos 或 showActive 变化时才会被调用。在输入框中输入只会更改 text 变量的值，并不会触发 getVisibleTodos()的调用。

还有一个不使用 useMemo 的解决方案。由于 text 变量不可能影响待办事项列表，你可以将 NewTodo 表单提取到一个单独的组件中，并将 text 变量移动到其中：
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
    </>
  );
}

let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() 被调用了 ${++calls} 次`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];
这种方法也满足要求。当你在输入框中输入时，只有 text 变量会更新。由于 text 变量在子组件 NewTodo 中，父组件 TodoList 不会重新渲染。这就是当你输入时 getVisibleTodos() 不会被调用的原因（如果 TodoList 由于其他原因被重新渲染了，它仍然会被调用）。
```

```js
//第 3 个挑战 共 4 个挑战: 不用 Effect 重置 state 
EditContact 组件的 prop savedContact 接收一个类似于 { id, name, email } 这样的联系人对象。尝试编辑名称和邮箱输入框。当你点击保存按钮时，表单上方的联系人按钮会更新为编辑后的名称。当你点击重置按钮时，表单中的任何改动都会被丢弃。试着玩一玩儿这个用户界面感受一下。

当你用顶部按钮选择一个联系人时，该表单会重置并展示该联系人的详细信息。这是在 EditContact.js 内部使用 Effect 实现的。移除该 Effect，找到另一种方式在 savedContact.id 变化时重置表单。
import { useState, useEffect } from 'react';

export default function EditContact({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);
  
  useEffect(() => {
    setName(savedContact.name);
    setEmail(savedContact.email);
  }, [savedContact]);
  //当 savedContact 发生变化时，使用 useEffect 钩子函数同步 name 和 email 状态。---每次 savedContact 更新时，将其 name 和 email 属性的值更新到对应的状态变量 name 和 email。

  return (
    <section>
      <label>
        姓名：{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱：{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        保存
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        重置
      </button>
    </section>
  );
}
答案
将 EditContact 组件拆分为两个组件。将所有表单 state 移动到内部的 EditForm 组件中。导出外部的 EditContact 组件，并将 savedContact.id 作为 key 传入内部的 EditForm 组件。结果是，每当你选择不同的联系人时，内部的 EditForm 组件会重置所有表单状态并重新创建 DOM。
import { useState } from 'react';

export default function EditContact(props) {
  return (
    <EditForm
      {...props}
      key={props.savedContact.id}
    />
  );
  //使用 EditForm 组件并传递所有 props 属性。---设置 key 属性为 props.savedContact.id，确保每次 savedContact 变化时，EditForm 组件会重新渲染。
}

function EditForm({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  return (
    <section>
      <label>
        姓名：{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱：{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        保存
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        重置
      </button>
    </section>
  );
}
```

```js
//第 4 个挑战 共 4 个挑战: 不用 Effect 提交表单 
Form 组件可以让你向朋友发送消息。当你提交表单时，state 变量 showForm 会被设置为 false。这会触发一个 Effect 调用 sendMessage(message) 发送消息（你可以在控制台中看到）。消息发送后，你会看到一个 “谢谢” 的提示语，里面有一个 “打开聊天” 按钮，让你回到表单。

你的应用的用户发送的消息太多了。为了让聊天变得稍微困难一些，你决定 先 展示 “谢谢” 提示语，而不是表单。将 state 变量 showForm 的初始值改为 false，而不是 true。一旦你做了这些修改，控制台将发送一条空消息。这里的逻辑有问题！

导致这个问题的根本原因是什么？你能修复它吗？
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!showForm) {
      sendMessage(message);
    }
  }, [showForm, message]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
  }

  if (!showForm) {
    return (
      <>
        <h1>谢谢使用我们的服务！</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          打开聊天
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="消息"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        发送
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('发送的消息：' + message);
}


答案:state 变量 showForm 决定了显示表单还是 “谢谢” 提示语。然而，你并不是因为 “谢谢” 提示语被 显示 才发送消息的。你希望发送消息是因为用户 提交了表单 。删除误导性的 Effect，并将 sendMessage 调用移到 handleSubmit 事件处理函数中：
  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
    //阻止表单的默认提交行为。
    // 将 showForm 设置为 false，隐藏表单。
    // 调用 sendMessage 函数并传递当前的 message。
  }

  if (!showForm) {
    return (
      <>
        <h1>谢谢使用我们的服务！</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          打开聊天
        </button>
      </>
    );
    //如果 showForm 为 false，显示感谢消息和一个按钮。
    //点击按钮时，清空 message 并将 showForm 设置为 true，重新显示表单。
  }

注意在这个版本中，只有 提交表单（这是一个事件）才会导致消息被发送。采用这种方案，无论 showForm 最初被设置为 true 还是 false 都同样有效（将其设置为 false，注意没有额外的控制台消息）。
```

#### 表格--你可能不需effect

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||不同人的评论块自动切换避免错位||
|删effect,用function|已经添加过的商品还是会出现"您已添加"||
||全懵逼状态???||
||3:  每次切换都会重新渲染||
||||

### 响应式 Effect 的生命周期

Effect 与组件有不同的生命周期。组件可以挂载、更新或卸载。Effect 只能做两件事：开始同步某些东西，然后停止同步它。如果 Effect 依赖于随时间变化的 props 和 state，这个循环可能会发生多次。React 提供了代码检查规则来检查是否正确地指定了 Effect 的依赖项，这能够使 Effect 与最新的 props 和 state 保持同步。

你将会学习到
Effect 的生命周期与组件的生命周期有何不同
如何独立地考虑每个 Effect
什么时候以及为什么 Effect 需要重新同步
如何确定 Effect 的依赖项
值是响应式的含义是什么
空依赖数组意味着什么
React 如何使用检查工具验证依赖关系是否正确
与代码检查工具产生分歧时，该如何处理

#### Effect 的生命周期

```js
//
每个 React 组件都经历相同的生命周期：

当组件被添加到屏幕上时，它会进行组件的 挂载。
当组件接收到新的 props 或 state 时，通常是作为对交互的响应，它会进行组件的 更新。
当组件从屏幕上移除时，它会进行组件的 卸载。
这是一种很好的思考组件的方式，但并不适用于 Effect。相反，尝试从组件生命周期中跳脱出来，独立思考 Effect。Effect 描述了如何将外部系统与当前的 props 和 state 同步。随着代码的变化，同步的频率可能会增加或减少。

为了说明这一点，考虑下面这个示例。Effect 将组件连接到聊天服务器：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
Effect 的主体部分指定了如何 开始同步：

    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
Effect 返回的清理函数指定了如何 停止同步：

    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
你可能会直观地认为当组件挂载时 React 会 开始同步，而当组件卸载时会 停止同步。然而，事情并没有这么简单！有时，在组件保持挂载状态的同时，可能还需要 多次开始和停止同步。

让我们来看看 为什么 这是必要的、何时 会发生以及 如何 控制这种行为。

注意
有些 Effect 根本不返回清理函数。在大多数情况下，可能希望返回一个清理函数，但如果没有返回，React 将表现得好像返回了一个空的清理函数。
```

```js
//为什么同步可能需要多次进行 
想象一下，这个 ChatRoom 组件接收 roomId 属性，用户可以在下拉菜单中选择。假设初始时，用户选择了 "general" 作为 roomId。应用程序会显示 "general" 聊天室：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* "general" */ }) {
  // ...
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}
在 UI 显示之后，React 将运行 Effect 来 开始同步。它连接到 "general" 聊天室：

function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 连接到 "general" 聊天室
    connection.connect();
    return () => {
      connection.disconnect(); // 断开与 "general" 聊天室的连接
    };
  }, [roomId]);
  // ...
到目前为止，一切都很顺利。

之后，用户在下拉菜单中选择了不同的房间（例如 "travel" ）。首先，React 会更新 UI：

function ChatRoom({ roomId /* "travel" */ }) {
  // ...
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}
思考接下来应该发生什么。用户在界面中看到 "travel" 是当前选定的聊天室。然而，上次运行的 Effect 仍然连接到 "general" 聊天室。roomId 属性已经发生了变化，所以之前 Effect 所做的事情（连接到 "general" 聊天室）不再与 UI 匹配。

此时，你希望 React 执行两个操作：

停止与旧的 roomId 同步（断开与 "general" 聊天室的连接）
开始与新的 roomId 同步（连接到 "travel" 聊天室）
幸运的是，你已经教会了 React 如何执行这两个操作！Effect 的主体部分指定了如何开始同步，而清理函数指定了如何停止同步。现在，React 只需要按照正确的顺序和正确的 props 和 state 来调用它们。让我们看看具体是如何实现的。
```

```js
//React 如何重新同步 Effect 
回想一下，ChatRoom 组件已经接收到了 roomId 属性的新值。之前它是 "general"，现在变成了 "travel"。React 需要重新同步 Effect，以重新连接到不同的聊天室。

为了 停止同步，React 将调用 Effect 返回的清理函数，该函数在连接到 "general" 聊天室后返回。由于 roomId 为 "general"，清理函数将断开与 "general" 聊天室的连接：

function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 连接到 "general" 聊天室
    connection.connect();
    return () => {
      connection.disconnect(); // 断开与 "general" 聊天室的连接
    };
    // ...
然后，React 将运行在此渲染期间提供的 Effect。这次，roomId 为 "travel"，因此它将 开始同步 到 "travel" 聊天室（直到最终也调用了清理函数）：

function ChatRoom({ roomId /* "travel" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 连接到 "travel" 聊天室
    connection.connect();
    // ...
多亏了这一点，现在已经连接到了用户在 UI 中选择的同一个聊天室。避免了灾难！

每当组件使用不同的 roomId 重新渲染后，Effect 将重新进行同步。例如，假设用户将 roomId 从 "travel" 更改为 "music"。React 将再次通过调用清理函数 停止同步 Effect（断开与 "travel" 聊天室的连接）。然后，它将通过使用新的 roomId 属性再次运行 Effect 的主体部分 开始同步（连接到 "music" 聊天室）。

最后，当用户切换到不同的屏幕时，ChatRoom 组件将被卸载。现在没有必要保持连接了。React 将 最后一次停止同步 Effect，并从 "music" 聊天室断开连接。
```

```js
//从 Effect 的角度思考 
让我们总结一下从 ChatRoom 组件的角度所发生的一切：

ChatRoom 组件挂载，roomId 设置为 "general"
ChatRoom 组件更新，roomId 设置为 "travel"
ChatRoom 组件更新，roomId 设置为 "music"
ChatRoom 组件卸载
在组件生命周期的每个阶段，Effect 执行了不同的操作：

Effect 连接到了 "general" 聊天室
Effect 断开了与 "general" 聊天室的连接，并连接到了 "travel" 聊天室
Effect 断开了与 "travel" 聊天室的连接，并连接到了 "music" 聊天室
Effect 断开了与 "music" 聊天室的连接
现在让我们从 Effect 本身的角度来思考所发生的事情：

  useEffect(() => {
    // Effect 连接到了通过 roomId 指定的聊天室...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      // ...直到它断开连接
      connection.disconnect();
    };
  }, [roomId]);
这段代码的结构可能会将所发生的事情看作是一系列不重叠的时间段：

Effect 连接到了 "general" 聊天室（直到断开连接）
Effect 连接到了 "travel" 聊天室（直到断开连接）
Effect 连接到了 "music" 聊天室（直到断开连接）
之前，你是从组件的角度思考的。当你从组件的角度思考时，很容易将 Effect 视为在特定时间点触发的“回调函数”或“生命周期事件”，例如“渲染后”或“卸载前”。这种思维方式很快变得复杂，所以最好避免使用。

相反，始终专注于单个启动/停止周期。无论组件是挂载、更新还是卸载，都不应该有影响。只需要描述如何开始同步和如何停止。如果做得好，Effect 将能够在需要时始终具备启动和停止的弹性。

这可能会让你想起当编写创建 JSX 的渲染逻辑时，并不考虑组件是挂载还是更新。描述的是应该显示在屏幕上的内容，而 React 会 解决其余的问题。
```

```js
//React 如何验证 Effect 可以重新进行同步 
这里有一个可以互动的实时示例。点击“打开聊天”来挂载 ChatRoom 组件：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? '关闭聊天' : '打开聊天'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
    }
  };
}
请注意，当组件首次挂载时，会看到三个日志：

✅ 连接到 "general" 聊天室，位于 https://localhost:1234... (仅限开发环境)
❌ 从 "general" 聊天室断开连接，位于 https://localhost:1234. (仅限开发环境)
✅ 连接到 "general" 聊天室，位于 https://localhost:1234...
前两个日志仅适用于开发环境。在开发环境中，React 总是会重新挂载每个组件一次。

React 通过在开发环境中立即强制 Effect 重新进行同步来验证其是否能够重新同步。这可能让你想起打开门并额外关闭它以检查门锁是否有效的情景。React 在开发环境中额外启动和停止 Effect 一次，以检查 是否正确实现了它的清理功能。

实际上，Effect 重新进行同步的主要原因是它所使用的某些数据发生了变化。在上面的示例中，更改所选的聊天室。注意当 roomId 发生变化时，Effect 会重新进行同步。

然而，还存在其他一些不寻常的情况需要重新进行同步。例如，在上面的示例中，尝试在聊天打开时编辑 serverUrl。注意当修改代码时，Effect会重新进行同步。将来，React 可能会添加更多依赖于重新同步的功能。
```

```js
//React 如何知道需要重新进行 Effect 的同步 
你可能想知道 React 是如何知道在 roomId 更改后需要重新同步 Effect。这是因为 你告诉了 React 它的代码依赖于 roomId，通过将其包含在 依赖列表 中。

function ChatRoom({ roomId }) { // roomId 属性可能会随时间变化。
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 这个 Effect 读取了 roomId
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // 因此，你告诉 React 这个 Effect "依赖于" roomId
  // ...
下面是它的工作原理：

你知道 roomId 是 prop，这意味着它可能会随着时间的推移发生变化。
你知道 Effect 读取了 roomId（因此其逻辑依赖于可能会在之后发生变化的值）。
这就是为什么你将其指定为 Effect 的依赖项（以便在 roomId 发生变化时重新进行同步）。
每次在组件重新渲染后，React 都会查看传递的依赖项数组。如果数组中的任何值与上一次渲染时在相同位置传递的值不同，React 将重新同步 Effect。

例如，如果在初始渲染时传递了 ["general"]，然后在下一次渲染时传递了 ["travel"]，React 将比较 "general" 和 "travel"。这些是不同的值（使用 Object.is 进行比较），因此 React 将重新同步 Effect。另一方面，如果组件重新渲染但 roomId 没有发生变化，Effect 将继续连接到相同的房间。
```

```js
//每个 Effect 表示一个独立的同步过程。 
抵制将与 Effect 无关的逻辑添加到已经编写的 Effect 中，仅仅因为这些逻辑需要与 Effect 同时运行。例如，假设你想在用户访问房间时发送一个分析事件。你已经有一个依赖于 roomId 的 Effect，所以你可能会想要将分析调用添加到那里：

function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
但是想象一下，如果以后给这个 Effect 添加了另一个需要重新建立连接的依赖项。如果这个 Effect 重新进行同步，它将为相同的房间调用 logVisit(roomId)，而这不是你的意图。记录访问行为是 一个独立的过程，与连接不同。将它们作为两个单独的 Effect 编写：

function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    // ...
  }, [roomId]);
  // ...
}
代码中的每个 Effect 应该代表一个独立的同步过程。

在上面的示例中，删除一个 Effect 不会影响另一个 Effect 的逻辑。这表明它们同步不同的内容，因此将它们拆分开是有意义的。另一方面，如果将一个内聚的逻辑拆分成多个独立的 Effects，代码可能会看起来更加“清晰”，但 维护起来会更加困难。这就是为什么你应该考虑这些过程是相同还是独立的，而不是只考虑代码是否看起来更整洁。
```

```js
//Effect 会“响应”于响应式值 
Effect 读取了两个变量（serverUrl 和 roomId），但是只将 roomId 指定为依赖项：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
为什么 serverUrl 不需要作为依赖项呢？

这是因为 serverUrl 永远不会因为重新渲染而发生变化。无论组件重新渲染多少次以及原因是什么，serverUrl 都保持不变。既然 serverUrl 从不变化，将其指定为依赖项就没有意义。毕竟，依赖项只有在随时间变化时才会起作用！

另一方面，roomId 在重新渲染时可能会不同。在组件内部声明的 props、state 和其他值都是 响应式 的，因为它们是在渲染过程中计算的，并参与了 React 的数据流。

如果 serverUrl 是状态变量，那么它就是响应式的。响应式值必须包含在依赖项中：

function ChatRoom({ roomId }) { // Props 随时间变化
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // State 可能随时间变化

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Effect 读取 props 和 state
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // 因此，你告诉 React 这个 Effect "依赖于" props 和 state
  // ...
}
通过将 serverUrl 包含在依赖项中，确保 Effect 在其发生变化后重新同步。

尝试在此沙盒中更改所选的聊天室或编辑服务器 URL：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        服务器 URL：{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>欢迎来到 {roomId} 房间！</h1>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
    }
  };
}
无论何时更改一个类似 roomId 或 serverUrl 的响应式值，该 Effect 都会重新连接到聊天服务器。
```

```js
//没有依赖项的 Effect 的含义 
如果将 serverUrl 和 roomId 都移出组件会发生什么？

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖
  // ...
}
现在 Effect 的代码不使用任何响应式值，因此它的依赖可以是空的 ([])。

从组件的角度来看，空的 [] 依赖数组意味着这个 Effect 仅在组件挂载时连接到聊天室，并在组件卸载时断开连接。（请记住，在开发环境中，React 仍会 额外执行一次 来对逻辑进行压力测试。）
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? '关闭聊天' : '打开聊天'}
      </button>
      {show && <hr />}
      {show && <ChatRoom />}
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
    }
  };
}

然而，如果你 从 Effect 的角度思考，根本不需要考虑挂载和卸载。重要的是，你已经指定了 Effect 如何开始和停止同步。目前，它没有任何响应式依赖。但是，如果希望用户随时间改变 roomId 或 serverUrl（它们将变为响应式），Effect 的代码不需要改变。只需要将它们添加到依赖项中即可。
```

```js
//在组件主体中声明的所有变量都是响应式的 
Props 和 state 并不是唯一的响应式值。从它们计算出的值也是响应式的。如果 props 或 state 发生变化，组件将重新渲染，从中计算出的值也会随之改变。这就是为什么 Effect 使用的组件主体中的所有变量都应该在依赖列表中。

假设用户可以在下拉菜单中选择聊天服务器，但他们还可以在设置中配置默认服务器。假设你已经将设置状态放入了 上下文，因此从该上下文中读取 settings。现在，可以根据 props 中选择的服务器和默认服务器来计算 serverUrl：

function ChatRoom({ roomId, selectedServerUrl }) { 
// roomId 是响应式的
// 定义一个名为 ChatRoom 的组件，接收两个属性 roomId 和 selectedServerUrl
  const settings = useContext(SettingsContext); // settings 是响应式的,使用 useContext 从 SettingsContext 获取 settings，settings 是响应式的
  const serverUrl = selectedServerUrl ?? settings.defaultServerUrl; // serverUrl 是响应式的,如果 selectedServerUrl 存在，使用 selectedServerUrl，否则使用 settings.defaultServerUrl
  useEffect(() => {
    // 定义一个副作用，依赖于 roomId 和 serverUrl
    const connection = createConnection(serverUrl, roomId); // Effect 读取了 roomId 和 serverUrl,// 使用 serverUrl 和 roomId 创建一个连接
    connection.connect();
    //// 连接建立后调用 connect 方法
    return () => {
      connection.disconnect();
      //// 在副作用清理阶段调用 disconnect 方法断开连接
    };
  }, [roomId, serverUrl]); // 因此，当它们中的任何一个发生变化时，它需要重新同步！
  // ...
}
在这个例子中，serverUrl 不是 prop 或 state 变量。它是在渲染过程中计算的普通变量。但是它是在渲染过程中计算的，所以它可能会因为重新渲染而改变。这就是为什么它是响应式的。

组件内部的所有值（包括 props、state 和组件体内的变量）都是响应式的。任何响应式值都可以在重新渲染时发生变化，所以需要将响应式值包括在 Effect 的依赖项中。

换句话说，Effect 对组件体内的所有值都会“react”。

全局变量或可变值可以作为依赖项吗？ 
:
可变值（包括全局变量）不是响应式的。

例如，像 location.pathname 这样的可变值不能作为依赖项。它是可变的，因此可以在 React 渲染数据流之外的任何时间发生变化。更改它不会触发组件的重新渲染。因此，即使在依赖项中指定了它，React 也无法知道在其更改时重新同步 Effect。这也违反了 React 的规则，因为在渲染过程中读取可变数据（即在计算依赖项时）会破坏 纯粹的渲染。相反，应该使用 useSyncExternalStore 来读取和订阅外部可变值。

另外，像 ref.current 或从中读取的值也不能作为依赖项。useRef 返回的 ref 对象本身可以作为依赖项，但其 current 属性是有意可变的。它允许 跟踪某些值而不触发重新渲染。但由于更改它不会触发重新渲染，它不是响应式值，React 不会知道在其更改时重新运行 Effect。

正如你将在本页面下面学到的那样，检查工具将自动检查这些问题。
```

```js
//React 会验证是否将每个响应式值都指定为了依赖项 
如果检查工具 配置了 React，它将检查 Effect 代码中使用的每个响应式值是否已声明为其依赖项。例如，以下示例是一个 lint 错误，因为 roomId 和 serverUrl 都是响应式的：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) { // roomId 是响应式的
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // serverUrl 是响应式的

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- 这里有些问题！

  return (
    <>
      <label>
        服务器 URL：{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>欢迎来到 {roomId} 房间！</h1>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到 "' + roomId + '" 房间，位于' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开 "' + roomId + '" 房间，位于' + serverUrl);
    }
  };
}

这可能看起来像是 React 错误，但实际上 React 是在指出代码中的 bug。roomId 和 serverUrl 都可能随时间改变，但忘记了在它们改变时重新同步 Effect。即使用户在 UI 中选择了不同的值，仍然保持连接到初始的 roomId 和 serverUrl。

要修复这个 bug，请按照检查工具的建议将 roomId 和 serverUrl 作为 Effect 的依赖进行指定：

function ChatRoom({ roomId }) { // roomId 是响应式的
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // serverUrl 是响应式的
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]); // ✅ 声明的所有依赖
  // ...
}
在上面的沙盒中尝试这个修复方法。验证一下是否消除了检查工具的错误，并且在需要时聊天会重新连接。

注意
在某些情况下，React 知道 一个值永远不会改变，即使它在组件内部声明。例如，从 useState 返回的 set 函数和从 useRef 返回的 ref 对象是 稳定的 ——它们保证在重新渲染时不会改变。稳定值不是响应式的，因此可以从列表中省略它们。包括它们是允许的：它们不会改变，所以无关紧要。
```

```js
//当你不想进行重新同步时该怎么办 
在上一个示例中，通过将 roomId 和 serverUrl 列为依赖项来修复了 lint 错误。

然而，可以通过向检查工具“证明”这些值不是响应式值，即它们 不会 因为重新渲染而改变。例如，如果 serverUrl 和 roomId 不依赖于渲染并且始终具有相同的值，可以将它们移到组件外部。现在它们不需要成为依赖项：

const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的
const roomId = 'general'; // roomId 不是响应式的

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖
  // ...
}
也可以将它们 移动到 Effect 内部。它们不是在渲染过程中计算的，因此它们不是响应式的：

function ChatRoom() {
  useEffect(() => {
    const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的
    const roomId = 'general'; // roomId 不是响应式的
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖
  // ...
}
Effect 是一段响应式的代码块。它们在读取的值发生变化时重新进行同步。与事件处理程序不同，事件处理程序只在每次交互时运行一次，而 Effect 则在需要进行同步时运行。

不能“选择”依赖项。依赖项必须包括 Effect 中读取的每个 响应式值。代码检查工具会强制执行此规则。有时，这可能会导致出现无限循环的问题，或者 Effect 过于频繁地重新进行同步。不要通过禁用代码检查来解决这些问题！下面是一些解决方案：

检查 Effect 是否表示了独立的同步过程。如果 Effect 没有进行任何同步操作，可能是不必要的。如果它同时进行了几个独立的同步操作，将其拆分为多个 Effect。

如果想读取 props 或 state 的最新值，但又不想对其做出反应并重新同步 Effect，可以将 Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）。阅读关于将事件与 Effect 分离的内容。

避免将对象和函数作为依赖项。如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步。阅读有关从 Effect 中删除不必要依赖项的更多内容。

陷阱
检查工具是你的朋友，但它们的能力是有限的。检查工具只知道依赖关系是否 错误。它并不知道每种情况下的 最佳 解决方法。如果静态代码分析工具建议添加某个依赖关系，但添加该依赖关系会导致循环，这并不意味着应该忽略静态代码分析工具。需要修改 Effect 内部（或外部）的代码，使得该值不是响应式的，也不 需要 成为依赖项。

如果有一个现有的代码库，可能会有一些像这样禁用了检查工具的 Effect：

useEffect(() => {
  // ...
  // 🔴 避免这样禁用静态代码分析工具：
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
在 下一页 和 之后的页面 中，你将学习如何修复这段代码，而不违反规则。修复代码总是值得的！
```

```js
//摘要
组件可以挂载、更新和卸载。
每个 Effect 与周围组件有着独立的生命周期。
每个 Effect 描述了一个独立的同步过程，可以 开始 和 停止。
在编写和读取 Effect 时，要独立地考虑每个 Effect（如何开始和停止同步），而不是从组件的角度思考（如何挂载、更新或卸载）。
在组件主体内声明的值是“响应式”的。
响应式值应该重新进行同步 Effect，因为它们可以随着时间的推移而发生变化。
检查工具验证在 Effect 内部使用的所有响应式值都被指定为依赖项。
检查工具标记的所有错误都是合理的。总是有一种方法可以修复代码，同时不违反规则。
```

```js
//第 1 个挑战 共 5 个挑战: 修复每次输入均重新连接 
在这个例子中，ChatRoom 组件在组件挂载时连接到聊天室，在卸载时断开连接，并且在选择不同的聊天室时重新连接。这种行为是正确的，所以需要保持它的正常工作。

然而，存在一个问题。每当在底部的消息框中输入时，ChatRoom 也会重新连接到聊天室（可以通过清空控制台并在输入框中输入内容来注意到这一点）。修复这个问题，使其不再发生重新连接的情况。
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  });
  //,[roomId];有依赖项时，只在依赖项变化时执行；无依赖项时，每次渲染都会执行。

  return (
    <>
      <h1>欢迎来到 {roomId} 聊天室！</h1>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 建立连接 "' + roomId + '" 聊天室位于 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开连接 "' + roomId + '" 聊天室位于 ' + serverUrl);
    }
  };
}
答案
这个 Effect 实际上没有任何依赖数组，所以它在每次重新渲染后都会重新同步。首先，添加依赖数组。然后，确保每个被 Effect 使用的响应式值都在数组中指定。例如，roomId 是响应式的（因为它是 prop），所以它应该包含在数组中。这样可以确保当用户选择不同的聊天室时，聊天会重新连接。另一方面，serverUrl 是在组件外部定义的，这就是为什么它不需要在数组中的原因。
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>欢迎来到 {roomId} 聊天室！</h1>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 建立连接 "' + roomId + '" 聊天室位于 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开连接 "' + roomId + '" 聊天室位于 ' + serverUrl);
    }
  };
}

```

```js
//第 2 个挑战 共 5 个挑战: 打开和关闭状态同步 
在这个例子中，Effect 订阅了 window 的 pointermove 事件，以在屏幕上移动一个粉色的点。尝试在预览区域上悬停（或者如果你使用移动设备，请触摸屏幕），看看粉色的点如何跟随你移动。

还有一个复选框。勾选复选框会切换 canMove 状态变量，但是这个状态变量在代码中没有被使用。你的任务是修改代码，使得当 canMove 为 false（复选框未选中）时，点应该停止移动。在切换复选框回到选中状态（将 canMove 设置为 true）之后，点应该重新跟随移动。换句话说，点是否可以移动应该与复选框的选中状态保持同步。
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      //if (canMove){}
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  //,[canMove];确保在每次值的更改后，Effect 重新同步。

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
答案
一个解决方案是将 setPosition 的调用包裹在 if (canMove) { ... } 条件语句中：
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}

或者，你可以将 事件订阅 的逻辑包裹在 if (canMove) { ... } 条件语句中：
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      //定义一个 handleMove 函数，在指针移动时更新位置状态。
      setPosition({ x: e.clientX, y: e.clientY });
    }
    if (canMove) {
      window.addEventListener('pointermove', handleMove);
      //如果 canMove 为真，添加 pointermove 事件监听器，并在组件卸载或 canMove 变化时移除该监听器。
      return () => window.removeEventListener('pointermove', handleMove);
    }
  }, [canMove]);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
在这两种情况下，canMove 是一个响应式变量，并在 Effect 中读取它。这就是为什么它必须在 Effect 的依赖列表中进行指定。这样可以确保在每次值的更改后，Effect 重新同步。
```

```js
//第 3 个挑战 共 5 个挑战: 寻找过时值的错误 
在这个例子中，当复选框选中时，粉色的点应该移动，当复选框未选中时，点应该停止移动。这个逻辑已经实现了：handleMove 事件处理程序检查 canMove 状态变量。

然而，出现问题的是在 handleMove 内部，canMove 状态变量似乎是“过时的”：即使在取消选中复选框之后，它始终是 true。这是怎么可能的？找出代码中的错误并进行修复。
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
答案
原始代码的问题在于禁止了依赖性检查的 linter 规则。如果移除禁止，会发现这个 Effect 依赖于 handleMove 函数。这是有道理的：handleMove 是在组件体内声明的，这使得它成为一个响应式值。每个响应式值都必须在依赖列表中进行指定，否则它可能会随着时间的推移变为过时！

原始代码的作者通过声明 Effect 不依赖任何响应式值（[]）来欺骗 React。这就是为什么 React 在 canMove 改变后（以及 handleMove）没有重新同步该 Effect。因为 React 没有重新同步该 Effect，所以附加的 handleMove 侦听器是在初始渲染期间创建的 handleMove 函数。在初始渲染期间，canMove 是 true，这就是为什么初始渲染时的 handleMove 将永远获取到该值。

如果从不禁止 linter，就不会遇到过时值的问题。解决这个 bug 有几种不同的方法，但应该始终从移除 linter 禁止开始。然后修改代码来修复 lint 错误。

可以将 Effect 的依赖项更改为 [handleMove]，但由于它在每次渲染时都会被重新定义，也可以完全删除依赖项数组。然后，Effect 将在 每次重新渲染后重新同步：
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  });

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
这个解决方案有效，但并不理想。如果在 Effect 内部放置 console.log('Resubscribing')，会注意到它在每次重新渲染后都重新订阅。重新订阅很快，但是正常情况下应该避免频繁进行重新订阅。

更好的解决方案是将 handleMove 函数 移动到 Effect 内部。然后，handleMove 就不会成为响应式值，因此 Effect 不会依赖于函数。相反，它将依赖于 Effect 内部的 canMove。这符合预期行为，因为 Effect 现在将始终与 canMove 的值保持同步：
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)} 
        />
        是否允许移动
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
请在 Effect 主体中添加 console.log('Resubscribing')，注意现在它只在切换复选框（canMove 变化）或编辑代码时重新订阅。这使得它比之前的方法更好，因为它只在必要时重新订阅。

你将在 将事件与 Effect 分离 中学习到更通用的解决此类问题的方法。
```

```js
//第 4 个挑战 共 5 个挑战: 修复连接开关 
在这个例子中，chat.js 中的聊天服务提供了两个不同的 API：createEncryptedConnection 和 createUnencryptedConnection。根组件 App 允许用户选择是否使用加密，并将相应的 API 方法作为 createConnection 属性传递给子组件 ChatRoom。

请注意，最初控制台日志显示连接未加密。尝试切换复选框：不会发生任何变化。然而，如果在此之后更改所选的聊天室，那么聊天将重新连接 并且 启用加密（从控制台日志中可以看到）。这是一个错误。修复这个错误，以便切换复选框 也 会使重新连接聊天室。
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        启用加密
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        createConnection={isEncrypted ?
          createEncryptedConnection :
          createUnencryptedConnection
        }
      />
    </>
  );
}

import { useState, useEffect } from 'react';

export default function ChatRoom({ roomId, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
    //{ roomId, createConnection }和, [roomId, createConnection]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //当用户勾选复选框时，父组件会传递一个不同的 createConnection prop 值。）这就是为什么它应该是一个依赖项。
  }, [roomId]);

  return <h1>欢迎来到 {roomId} 聊天室！</h1>;
}

export function createEncryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 🔐 建立连接 "' + roomId + '... (加密)');
    },
    disconnect() {
      console.log('❌ 🔐 断开连接 "' + roomId + '" room (加密)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 建立连接 "' + roomId + '... (未加密)');
    },
    disconnect() {
      console.log('❌ 断开连接 "' + roomId + '" room (未加密)');
    }
  };
}

答案
如果解除代码检查工具的禁用，你会看到一个代码检查错误。问题在于 createConnection 是一个 prop，因此它是一个响应式的值。它可以随时间而改变！（实际上，当用户勾选复选框时，父组件会传递一个不同的 createConnection prop 值。）这就是为什么它应该是一个依赖项。将其包含在依赖项列表中以修复该 bug：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        启用加密
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        createConnection={isEncrypted ?
          createEncryptedConnection :
          createUnencryptedConnection
        }
      />
    </>
  );
}

import { useState, useEffect } from 'react';

export default function ChatRoom({ roomId, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, createConnection]);

  return <h1>欢迎来到 {roomId} 聊天室！</h1>;
}

export function createEncryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 🔐 建立连接 "' + roomId + '... (加密)');
    },
    disconnect() {
      console.log('❌ 🔐 断开连接 "' + roomId + '" room (加密)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 建立连接 "' + roomId + '... (未加密)');
    },
    disconnect() {
      console.log('❌ 断开连接 "' + roomId + '" room (未加密)');
    }
  };
}

是的，createConnection 是一个依赖项。然而，这段代码并不健壮，因为可以编辑 App 组件以将内联函数作为该 prop 的值传递。在这种情况下，每次 App 组件重新渲染时，其值都会不同，因此 Effect 可能会过于频繁地重新同步。为了避免这种情况，可以传 isEncrypted 作为 prop 的值：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
  return (
    <>
      <label>
        选择聊天室：{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        启用加密
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
      />
    </>
  );
}

import { useState, useEffect } from 'react';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted }) {
  useEffect(() => {
    const createConnection = isEncrypted ?
      createEncryptedConnection :
      createUnencryptedConnection;
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]);

  return <h1>欢迎来到 {roomId} 聊天室！</h1>;
}

export function createEncryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 🔐 建立连接 "' + roomId + '... (加密)');
    },
    disconnect() {
      console.log('❌ 🔐 断开连接 "' + roomId + '" room (加密)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log('✅ 建立连接 "' + roomId + '... (未加密)');
    },
    disconnect() {
      console.log('❌ 断开连接 "' + roomId + '" room (未加密)');
    }
  };
}
在这个版本中，App 组件传递了一个布尔类型的 prop，而不是一个函数。在 Effect 内部，根据需要决定使用哪个函数。由于 createEncryptedConnection 和 createUnencryptedConnection 都是在组件外部声明的，它们不是响应式的，因此不需要作为依赖项。你可以在 移除 Effect 依赖项 中了解更多相关内容。
```

```js
//第 5 个挑战 共 5 个挑战: 填充一系列选择框 
当前的示例中有两个下拉框。一个下拉框允许用户选择一个行星，而另一个下拉框应该显示该选定行星上的地点。然而，目前这两个下拉框都还没有正常工作。你的任务是添加一些额外的代码，使得选择一个行星时，placeList 状态变量被填充为 "/planets/" + planetId + "/places" API 调用的结果。

如果你正确实现了这个功能，选择一个行星应该会填充地点列表，而更改行星应该会相应地改变地点列表。
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

export default function Page() {
  const [planetList, setPlanetList] = useState([])
  const [planetId, setPlanetId] = useState('');

  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchData('/planets').then(result => {
      if (!ignore) {
        console.log('获取了一个行星列表。');
        setPlanetList(result);
        setPlanetId(result[0].id); // 选择第一个行星
      }
    });
    return () => {
      ignore = true;
    }
  }, []);

  return (
    <>
      <label>
        选择一个行星：{' '}
        <select value={planetId} onChange={e => {
          setPlanetId(e.target.value);
        }}>
          {planetList?.map(planet =>
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          )}
        </select>
      </label>
      <label>
        选择一个地点：{' '}
        <select value={placeId} onChange={e => {
          setPlaceId(e.target.value);
        }}>
          {placeList?.map(place =>
            <option key={place.id} value={place.id}>{place.name}</option>
          )}
        </select>
      </label>
      <hr />
      <p>你将要前往：{planetId || '...'} 的 {placeId || '...'} </p>
    </>
  );
}
```

#### 表格---响应式effect的生命周期

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||useEffect 有无依赖项的区别在于：有依赖项时，只在依赖项变化时执行；无依赖项时，每次渲染都会执行。||
||||

### 将事件从 Effect 中分开

事件处理函数只有在你再次执行同样的交互时才会重新运行。Effect 和事件处理函数不一样，它只有在读取的 props 或 state 值和上一次渲染不一样时才会重新同步。有时你需要这两种行为的混合体：即一个 Effect 只在响应某些值时重新运行，但是在其他值变化时不重新运行。本章将会教你怎么实现这一点。

你将会学习到
怎么在事件处理函数和 Effect 之间做选择
为什么 Effect 是响应式的，而事件处理函数不是
当你想要 Effect 的部分代码变成非响应式时要做些什么
Effect Event 是什么，以及怎么从 Effect 中提取
怎么使用 Effect Event 读取最新的 props 和 state

#### 在事件处理函数和 Effect 中做选择

首先让我们回顾一下事件处理函数和 Effect 的区别。

假设你正在实现一个聊天室组件，需求如下：

组件应该自动连接选中的聊天室。
每当你点击“Send”按钮，组件应该在当前聊天界面发送一条消息。
假设你已经实现了这部分代码，但是还没有确定应该放在哪里。你是应该用事件处理函数还是 Effect 呢？每当你需要回答这个问题时，请考虑一下 为什么代码需要运行。

```js
//事件处理函数只在响应特定的交互操作时运行 
从用户角度出发，发送消息是 因为 他点击了特定的“Send”按钮。如果在任意时间或者因为其他原因发送消息，用户会觉得非常混乱。这就是为什么发送消息应该使用事件处理函数。事件处理函数是让你处理特定的交互操作的：

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function handleSendClick() {
    sendMessage(message);
  }
  // ...
  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
借助事件处理函数，你可以确保 sendMessage(message) 只 在用户点击按钮的时候运行。
```

```js
//每当需要同步，Effect 就会运行 
回想一下，你还需要让组件和聊天室保持连接。代码放哪里呢？

运行这个代码的 原因 不是特定的交互操作。用户为什么或怎么导航到聊天室屏幕的都不重要。既然用户正在看它并且能够和它交互，组件就要和选中的聊天服务器保持连接。即使聊天室组件显示的是应用的初始屏幕，用户根本还没有执行任何交互，仍然应该需要保持连接。这就是这里用 Effect 的原因：

function ChatRoom({ roomId }) {
  // ...
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
无论 用户是否执行指定交互操作，这段代码都可以保证当前选中的聊天室服务器一直有一个活跃连接。用户是否只启动了应用，或选中了不同的聊天室，又或者导航到另一个屏幕后返回，Effect 都可以确保组件和当前选中的聊天室保持同步，并在必要时 重新连接。
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}

export function sendMessage(message) {
  console.log('🔵 You sent: ' + message);
}

export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}

```

#### 响应式值和响应式逻辑

```js
//直观上，你可以说事件处理函数总是“手动”触发的，例如点击按钮。另一方面， Effect 是自动触发：每当需要保持同步的时候他们就会开始运行和重新运行。

有一个更精确的方式来考虑这个问题。

组件内部声明的 state 和 props 变量被称为  响应式值。本示例中的 serverUrl 不是响应式值，但 roomId 和 message 是。他们参与组件的渲染数据流：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // ...
}
像这样的响应式值可以因为重新渲染而变化。例如用户可能会编辑 message 或者在下拉菜单中选中不同的 roomId。事件处理函数和 Effect 对于变化的响应是不一样的：

事件处理函数内部的逻辑是非响应式的。除非用户又执行了同样的操作（例如点击），否则这段逻辑不会再运行。事件处理函数可以在“不响应”他们变化的情况下读取响应式值。
Effect 内部的逻辑是响应式的。如果 Effect 要读取响应式值，你必须将它指定为依赖项。如果接下来的重新渲染引起那个值变化，React 就会使用新值重新运行 Effect 内的逻辑。
让我们重新看看前面的示例来说明差异。
```

```js
//事件处理函数内部的逻辑是非响应式的 
看这行代码。这个逻辑是响应式的吗？

    // ...
    sendMessage(message);
    // ...
从用户角度出发，message 的变化并不意味着他们想要发送消息。它只能表明用户正在输入。换句话说，发送消息的逻辑不应该是响应式的。它不应该仅仅因为 响应式值 变化而再次运行。这就是应该把它归入事件处理函数的原因：

  function handleSendClick() {
    sendMessage(message);
  }
事件处理函数是非响应式的，所以 sendMessage(message) 只会在用户点击“Send”按钮的时候运行。
```

```js
//Effect 内部的逻辑是响应式的 
现在让我们返回这几行代码：

    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // ...
从用户角度出发，roomId 的变化意味着他们的确想要连接到不同的房间。换句话说，连接房间的逻辑应该是响应式的。你 需要 这几行代码和响应式值“保持同步”，并在值不同时再次运行。这就是它被归入 Effect 的原因：

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
Effect 是响应式的，所以 createConnection(serverUrl, roomId) 和 connection.connect() 会因为 roomId 每个不同的值而运行。Effect 让聊天室连接和当前选中的房间保持了同步。
```

#### 从 Effect 中提取非响应式逻辑

```js
//当你想混合使用响应式逻辑和非响应式逻辑时，事情变得更加棘手。

例如，假设你想在用户连接到聊天室时展示一个通知。并且通过从 props 中读取当前 theme（dark 或者 light）来展示对应颜色的通知：

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    // ...
但是 theme 是一个响应式值（它会由于重新渲染而变化），并且 Effect 读取的每一个响应式值都必须在其依赖项中声明。现在你必须把 theme 作为 Effect 的依赖项之一：

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ 声明所有依赖项
  // ...
用这个例子试一下，看你能否看出这个用户体验问题：
//app
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
//chat
export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
//notification
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
当 roomId 变化时，聊天会和预期一样重新连接。但是由于 theme 也是一个依赖项，所以每次你在 dark 和 light 主题间切换时，聊天 也会 重连。这不是很好！

换言之，即使它在 Effect 内部（这是响应式的），你也不想让这行代码变成响应式：

      // ...
      showNotification('Connected!', theme);
      // ...
你需要一个将这个非响应式逻辑和周围响应式 Effect 隔离开来的方法。
```

```js
//声明一个 Effect Event 
正在建设中
本章节描述了一个在 React 稳定版中 还没有发布的实验性 API。

使用 useEffectEvent 这个特殊的 Hook 从 Effect 中提取非响应式逻辑：

import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
这里的 onConnected 被称为 Effect Event。它是 Effect 逻辑的一部分，但是其行为更像事件处理函数。它内部的逻辑不是响应式的，而且能一直“看见”最新的 props 和 state。

现在你可以在 Effect 内部调用 onConnected Effect Event：

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 声明所有依赖项
  // ...
这个方法解决了问题。注意你必须从 Effect 依赖项中 移除 onConnected。Effect Event 是非响应式的并且必须从依赖项中删除。

验证新表现是否和你预期的一样：
//app
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
//chat
export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
你可以将 Effect Event 看成和事件处理函数相似的东西。主要区别是事件处理函数只在响应用户交互的时候运行，而 Effect Event 是你在 Effect 中触发的。Effect Event 让你在 Effect 响应性和不应是响应式的代码间“打破链条”。
```

```js
//使用 Effect Event 读取最新的 props 和 state 
正在建设中
本章节描述了一个在 React 稳定版中 还没有发布的实验性 API。

Effect Event 可以修复之前许多你可能试图抑制依赖项检查工具的地方。

例如，假设你有一个记录页面访问的 Effect：

function Page() {
  useEffect(() => {
    logVisit();
  }, []);
  // ...
}
稍后向你的站点添加多个路由。现在 Page 组件接收包含当前路径的 url props。你想把 url 作为 logVisit 调用的一部分进行传递，但是依赖项检查工具会提示：

function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, []); // 🔴 React Hook useEffect 缺少一个依赖项: 'url'
  // ...
}
想想你想要代码做什么。你 需要 为不同的 URL 记录单独的访问，因为每个 URL 代表不同的页面。换言之，logVisit 调用对于 url 应该 是响应式的。这就是为什么在这种情况下， 遵循依赖项检查工具并添加 url 作为一个依赖项很有意义：

function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, [url]); // ✅ 声明所有依赖项
  // ...
}
现在假设你想在每次页面访问中包含购物车中的商品数量：

function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect 缺少依赖项: ‘numberOfItems’
  // ...
}
你在 Effect 内部使用了 numberOfItems，所以代码检查工具会让你把它加到依赖项中。但是，你 不 想要 logVisit 调用响应 numberOfItems。如果用户把某样东西放入购物车， numberOfItems 会变化，这 并不意味着 用户再次访问了这个页面。换句话说，在某种意义上，访问页面 是一个“事件”。它发生在某个准确的时刻。

将代码分割为两部分：

function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ 声明所有依赖项
  // ...
}
这里的 onVisit 是一个 Effect Event。里面的代码不是响应式的。这就是为什么你可以使用 numberOfItems（或者任意响应式值！）而不用担心引起周围代码因为变化而重新执行。

另一方面，Effect 本身仍然是响应式的。其内部的代码使用了 url props，所以每次因为不同的 url 重新渲染后 Effect 都会重新运行。这会依次调用 onVisit 这个 Effect Event。

结果是你会因为 url 的变化去调用 logVisit，并且读取的一直都是最新的 numberOfItems。但是如果 numberOfItems 自己变化，不会引起任何代码的重新运行。

注意
你可能想知道是否可以无参数调用 onVisit() 并且读取内部的 url：

  const onVisit = useEffectEvent(() => {
    logVisit(url, numberOfItems);
  });

  useEffect(() => {
    onVisit();
  }, [url]);
这可以起作用，但是更好的方法是将这个 url 显式传递给Effect Event。通过将 url 作为参数传给 Effect Event，你可以说从用户角度来看使用不同的 url 访问页面构成了一个独立的“事件”。visitedUrl 是发生的“事件”的一部分：

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]);
由于 Effect 明确“要求” visitedUrl，所以现在你不会不小心地从 Effect 的依赖项中移除 url。如果你移除了 url 依赖项（导致不同的页面访问被认为是一个），代码检查工具会向你提出警告。如果你想要 onVisit 能对 url 的变化做出响应，不要读取内部的 url（这里不是响应式的），而是应该将它 从 Effect 中传入。

如果 Effect 内部有一些异步逻辑，这就变得非常重要了：

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    setTimeout(() => {
      onVisit(url);
    }, 5000); // 延迟记录访问
  }, [url]);
在这里，onVisit 内的 url 对应 最新的 url（可能已经变化了），但是 visitedUrl 对应的是最开始引起这个 Effect（并且是本次 onVisit 调用）运行的 url 。
```

```js
//抑制依赖项检查是可行的吗？ 

收起
在已经存在的代码库中，你可能有时会看见像这样的检查规则抑制：

function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
    // 🔴 避免像这样抑制代码检查:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  // ...
}
等 useEffectEvent 成为 React 稳定部分后，我们会推荐 永远不要抑制代码检查工具。

抑制规则的第一个缺点是当 Effect 需要对一个已经在代码中出现过的新响应式依赖项做出“响应”时，React 不会再发出警告。在稍早之前的示例中，你将 url 添加为依赖项，是因为 React 提醒你去做这件事。如果禁用代码检查，你未来将不会再收到任何关于 Effect 修改的提醒。这引起了 bug。

这个示例展示了一个由抑制代码检查引起的奇怪 bug。在这个示例中，handleMove 应该读取当前的 state 变量 canMove 的值来决定这个点是否应该跟随光标。但是 handleMove 中的 canMove 一直是 true。

你能看出是为什么吗？
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
这段代码的问题在于抑制依赖项检查。如果移除，你可以看到 Effect 应该依赖于 handleMove 函数。这非常有意义：handleMove 是在组件内声明的，是响应式值。而每个响应式值都必须被指定为依赖项，否则它可能会随着时间而过时！

原代码的作者对 React “撒谎”说 Effect 不依赖于任何响应式值（[]）。这就是为什么 canMove（以及 handleMove）变化后 React 没有重新同步。因为 React 没有重新同步 Effect，所以作为监听器附加的 handleMove 还是初次渲染期间创建的 handleMove 函数。初次渲染期间，canMove 的值是 true，这就是为什么来自初次渲染的 handleMove 永远只能看到这个值。
如果你从来没有抑制代码检查，就永远不会遇见过期值的问题。

有了 useEffectEvent，就不需要对代码检查工具“说谎”，并且代码也能和你预期的一样工作：
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const onMove = useEffectEvent(e => {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
这不意味着 useEffectEvent 总是 正确的解决方案。你只能把它用在你不需要变成响应式的代码上。上面的 sandbox 中，你不需要 Effect 的代码响应 canMove。这就是提取 Effect Event 很有意义的原因。

阅读 移除 Effect 依赖项 寻找抑制代码检查的其他正确的替代方式。
```

```js
//Effect Event 的局限性 
正在建设中
本章节描述了一个在 React 稳定版中 还没有发布的实验性 API。

Effect Event 的局限性在于你如何使用他们：

只在 Effect 内部调用他们。
永远不要把他们传给其他的组件或者 Hook。
例如不要像这样声明和传递 Effect Event：

function Timer() {
  const [count, setCount] = useState(0);

  const onTick = useEffectEvent(() => {
    setCount(count + 1);
  });

  useTimer(onTick, 1000); // 🔴 Avoid: 传递 Effect Event

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, callback]); // 需要在依赖项中指定“callback”
}
取而代之的是，永远直接在使用他们的 Effect 旁边声明 Effect Event：

function Timer() {
  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount(count + 1);
  }, 1000);
  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback();
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick(); // ✅ Good: 只在 Effect 内部局部调用
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]); // 不需要指定 “onTick” (Effect Event) 作为依赖项
}
Effect Event 是 Effect 代码的非响应式“片段”。他们应该在使用他们的 Effect 的旁边。
```

```js
//摘要
事件处理函数在响应特定交互时运行。
Effect 在需要同步的时候运行。
事件处理函数内部的逻辑是非响应式的。
Effect 内部的逻辑是响应式的。
你可以将非响应式逻辑从 Effect 移到 Effect Event 中。
只在 Effect 内部调用 Effect Event。
不要将 Effect Event 传给其他组件或者 Hook。
```

```js
//第 1 个挑战 共 4 个挑战: 修复一个不更新的变量 
Timer 组件保存了一个 count 的 state 变量，这个变量每秒增加一次。每次增加的值存储在 increment state 变量中。你可以使用加减按钮控制 increment 变量。

但是无论你点击加号按钮多少次，计数器每秒都只增加 １。这段代码存在什么问题呢？为什么 Effect 内部的 increment 总是等于 1 呢？找出错误并修复它。
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //,[increment]);
  //移除了抑制注释，React 就会告诉你这个 Effect 的代码依赖于 increment.此时,当 increment 变化时，React 会重新同步你的 Effect，这会重启 interval。

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
答案
和往常一样，当你寻找 Effect 中的 bug 时，从寻找代码检查抑制开始。

如果你移除了抑制注释，React 就会告诉你这个 Effect 的代码依赖于 increment，但是你通过宣称这个 Effect 不依赖于响应式值（[]）“欺骗”了 React。将 increment 添加到依赖项数组：
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
现在当 increment 变化时，React 会重新同步你的 Effect，这会重启 interval。
```

```js
//第 2 个挑战 共 4 个挑战: 修复一个冻结的计数器 
Timer 组件保存了一个 count 的 state 变量，这个变量每秒增加一次。每次增加的值存储在 increment state 变量中，你可以使用加减按钮控制它。例如，尝试点击加号按钮九次，注意现在 count 每次都增加 10 而不是 1。

这个用户接口有一个小问题。你可能注意到如果你每秒内按压加减按钮不止一次， 那计时器本身似乎就会暂停。它只在你最后一次按压按钮的一秒后恢复。找出为什么会发生这种现象，并修复它以便计时器能 每 秒滴答作响而不中断。
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);
  //   const onTick = useEffectEvent(() => {
  //   setCount(c => c + increment);
  // });一个名为 onTick 的常量，它使用 useEffectEvent 钩子。useEffectEvent 接收一个回调函数，该回调函数会调用 setCount 函数，以当前计数器值 c 加上 increment 的结果来更新计数器值。
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     onTick();
  //   }, 1000); 这个1000改成10000,会发现等10秒后加数器才作用
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);使用 useEffect 钩子在组件挂载时运行。---在 useEffect 内部，调用 setInterval 创建一个定时器，每隔 1000 毫秒（即 1 秒）调用一次 onTick 函数。---onTick 函数会根据 useEffectEvent 钩子的定义来更新计数器。---useEffect 返回一个清理函数，该函数在组件卸载或依赖项变化时运行。清理函数调用 clearInterval 来清除定时器 id，以防止内存泄漏或不必要的计时器调用。
  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
答案
问题在于 Effect 内部的代码使用了 increment 这个 state 变量。因为它是 Effect 的一个依赖项，每次 increment 变化都会引起 Effect 重新同步，这引起了 interval 清理。如果你每次有机会触发之前就清理 interval，它会表现得好像计时器已经停止了。

为了解决这个问题，需要从 Effect 中提取一个 Effect Event onTick：
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
由于 onTick 是一个 Effect Event，所以内部的代码是非响应式的。increment 的变化不会触发任何 Effect。
```

```js
//第 3 个挑战 共 4 个挑战: 修复不可调整的延迟 
在这个示例中，你可以自定义 interval 延迟。它被储存在一个由两个按钮更新的 delay state 变量中。但你即使按了“加 100 ms”按钮到 delay 为 1000 毫秒（即 1 秒），可以注意到计时器仍然在快速增加（每 100 ms）。你对 delay 的修改好像被忽略了。找到并修复这个 bug。
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  const onMount = useEffectEvent(() => {
    return setInterval(() => {
      onTick();
    }, delay);
  });
  //以上取消

  useEffect(() => {
    const id = onMount();
    return () => {
      clearInterval(id);
    }
  }, []);
  //,    return () => {
  //     clearInterval(id);
  //   }
  // }, [delay]);需要将所有的响应式代码放回到 Effect 内部

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
      <p>
        Increment delay:
        <button disabled={delay === 100} onClick={() => {
          setDelay(d => d - 100);
        }}>–100 ms</button>
        <b>{delay} ms</b>
        <button onClick={() => {
          setDelay(d => d + 100);
        }}>+100 ms</button>
      </p>
    </>
  );
}
答案
上面这个示例的问题在于它没有考虑代码实际正在做什么就直接提取了一个叫做 onMount 的 Effect Event。你应该只为特定的原因提取 Effect Event：你想让代码的一部分称为非响应式。但是，setInterval 调用 state 变量 delay 的变化 应该 是响应式的。如果 delay 变化了，你想要重新设置 interval！为了修复这个问题，你需要将所有的响应式代码放回到 Effect 内部：
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, delay);
    return () => {
      clearInterval(id);
    }
  }, [delay]);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
      <p>
        Increment delay:
        <button disabled={delay === 100} onClick={() => {
          setDelay(d => d - 100);
        }}>–100 ms</button>
        <b>{delay} ms</b>
        <button onClick={() => {
          setDelay(d => d + 100);
        }}>+100 ms</button>
      </p>
    </>
  );
}
总的来说，你应该对像 onMount 这样主要关注 执行时机 而非 目的 的函数持有怀疑态度。开始可能会感觉“更具描述性”，但是可能会模糊你的意图。根据经验来说，Effect Event 应该对应从“用户的”角度发生的事情。例如，onMessage，onTick，onVisit 或者 onConnected 是优秀的 Effect Event 名称。它们内部的代码可能不需要是响应式的。另一方面，onMount，onUpdate，onUnmount 或者 onAfterRender 太通用了，以至于很容易不小心就把一些”应该”是响应式的代码放入其中。这就是为什么你应该用 用户想要什么发生 来给你的 Effect Event 命名，而不是用某些代码正好运行的时机命名。
```

```js
//第 4 个挑战 共 4 个挑战: 修复延迟通知 
当你加入一个聊天室时，这个组件展示一个通知。但是它不会立刻展示通知。相反，把通知人工延迟 2 秒钟，以便用户有机会查看 UI。

这几乎生效了，但还是有一个 bug。尝试将下拉菜单从“general”变成“travel”并且接下来非常快速的变成“music”。如果你动作足够快，你会看到两个通知（和预期一样！），但是他们 都是 展示 “Welcome to music”。

修复它，让它能在你快速从“general”切换到“travel”再到“music”的时候看见两个通知，第一个是“Welcome to travel” ，第二个是“Welcome to music”（有一个额外的挑战，假设你 已经 让通知显示了正确的房间，请修改代码只展示后面的通知）。
//app
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Welcome to ' + roomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected();
      }, 2000);
    });
    //    connection.on('connected', () => {
    //   setTimeout(() => {
    //     onConnected(roomId);
    //   }, 2000);
    // });connectedRoomId让它成为 Effect Event 的参数。然后通过调用 onConnected(roomId) 将 roomId 从 Effect 中传入
    connection.connect();
   return () => connection.disconnect();
  }, [roomId]);
    //return () => {
    //   connection.disconnect();
    //   if (notificationTimeoutId !== undefined) {
    //     clearTimeout(notificationTimeoutId);
    //   }
    // }
      return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
//chat
export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
答案
在 Effect Event 内部，roomId 是 Effect Event 被调用时刻 的值。

Effect Event 伴随着两秒的延迟被调用。如果你快速地从 travel 切换到 music 聊天室，直到 travel 聊天室的通知显示出来，roomId 已经是 “music” 了。这就是为什么两个通知都是 “Welcome to music”。

为了修复这个问题，不要在 Effect Event 里面读取 最新的 roomId，而是如同下面的 connectedRoomId 一样让它成为 Effect Event 的参数。然后通过调用 onConnected(roomId) 将 roomId 从 Effect 中传入：
//app
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(connectedRoomId => {
    showNotification('Welcome to ' + connectedRoomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
//chat
export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
将 roomId 设置为 “travel”（所以它连接到了 “travel” 聊天室）的 Effect 将会展示 “travel” 的通知。将 roomId 设置为 “music”（所以它连接到了 “music” 聊天室）的 Effect 将会展示 "music" 的通知。换言之，connectedRoomId 来自 Effect（是响应式的），而 theme 总是使用最新值。

为了解决额外的挑战，保存通知的 timeout ID，并在 Effect 的清理函数中进行清理：
//app
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(connectedRoomId => {
    showNotification('Welcome to ' + connectedRoomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    let notificationTimeoutId;
    connection.on('connected', () => {
      notificationTimeoutId = setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => {
      connection.disconnect();
      if (notificationTimeoutId !== undefined) {
        clearTimeout(notificationTimeoutId);
      }
    };
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
//chat
export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
这确保了当你修改聊天室时，已经安排好（但还没展示）的通知会被取消。
```

#### 表格 将事件从effect中分开

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||theme也得effect,但是你在 dark 和 light 主题间切换时，聊天也会重连,这很烦||
|,[increment]|点击+-计时的增速没反应||
|需要从 Effect 中提取一个 Effect Event onTick|点击+-时,计时停滞不动||
||快速切换,但是显示2次都是最后一个music|响应式的只显示最新的|

### 移除 Effect 依赖

当编写 Effect 时，linter 会验证是否已经将 Effect 读取的每一个响应式值（如 props 和 state）包含在 Effect 的依赖中。这可以确保 Effect 与组件的 props 和 state 保持同步。不必要的依赖可能会导致 Effect 运行过于频繁，甚至产生无限循环。请按照本指南审查并移除 Effect 中不必要的依赖。

你将会学习到
修复无限的 Effect 依赖性循环
当你想移除依赖时，该怎么做
从 Effect 中读取值而不对它作出“反应”
为什么以及如何避免对象和函数的依赖？
为什么抑制依赖代码检查器的检查是危险的，以及应该如何做？

#### 依赖应该和代码保持一致

```js
//依赖应该和代码保持一致 
当你编写 Effect 时，无论这个 Effect 要做什么，你首先要明确其 生命周期：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
// ...
}
如果你设置 Effect 的依赖是空数组（[]），那么 linter 将会建议合适的依赖：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- 修复这里的依赖！
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('所有');
  return (
    <>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}

按照 linter 的建议，把它们填进去：

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
}
Effect “反应”响应式值 因为这里的 roomId 是一个响应式值（它可能随重新渲染而改变），所以 linter 会验证你是否将它指定为依赖。如果 roomId 变成不同的值，React 将重新运行 Effect。这可以确保聊天界面与所选房间保持一致，并把变化“反馈”给下拉菜单：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('所有');
  return (
    <>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}

```

```js
//当要移除一个依赖时，请证明它不是一个依赖 
注意，你不能“选择” Effect 的依赖。每个被 Effect 所使用的响应式值，必须在依赖中声明。依赖是由 Effect 的代码决定的：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) { // 这是一个响应式值
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Effect 在这里读取响应式值
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所以你必须在依赖中声明 Effect 使用的响应式值
  // ...
}
响应式值 包括 props 以及所有你直接在组件中声明的变量和函数。由于 roomId 是响应式值，你不能把它从依赖中移除。linter 不允许这样做：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // 🔴 React Hook useEffect 缺失依赖: 'roomId'
  // ...
}
linter 是对的！ 由于 roomId 可能会随时间变化，这会在代码中引入错误。

移除一个依赖，你需要向 linter 证明其不需要这个依赖。例如，你可以将 roomId 移出组件，以证明它不是响应的，也不会在重新渲染时改变：

const serverUrl = 'https://localhost:1234';
const roomId = '音乐'; // 不再是响应式值

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ 所有依赖已声明
  // ...
}
现在 roomId 不是响应式值（并且不能在重新渲染时改变），那它不就不是依赖：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = '音乐';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export function createConnection(serverUrl, roomId) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}

```

```js
//这就是为什么你现在可以指定 空（[]）依赖。Effect 真的不 依赖任何响应式值了，也 真的不 需要在组件的 props 或 state 改变时重新运行。

要改变依赖，请改变代码 
你可能已经注意到工作流程中有一个模式：

首先，你 改变 Effect 的代码 或响应式值的声明方式。
然后，你采纳 linter 的建议，调整依赖，以 匹配你所改变的代码。
如果你对依赖不满意，你可以 回到第一步（并再次修改代码）。
最后一部分很重要。如果你想改变依赖，首先要改变所涉及到的代码。你可以把依赖看作是 Effect的代码所依赖的所有响应式值的列表。你不要 选择 把什么放在这个列表上。该列表 描述了 代码。要改变依赖，请改变代码。

这可能感觉就像解方程一样。你有一个目标（例如，移除一个依赖），你需要“找到”与该目标相匹配的代码。不是每个人都觉得解方程很有趣，写 Effect 也是如此！幸运的是，下面有一些常见的解决方案你可以去尝试。

陷阱
如果你有一个已经存在的代码库，你可能会有一些像这样抑制 linter 的代码：

useEffect(() => {
  // ...
  // 🔴 避免像这样抑制 linter 的警告或错误提示：
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
当依赖与代码不匹配时，极有可能引入 bug。通过抑制 linter，你是在 Effect 所依赖的值上对 React “撒谎”。

你可以使用如下技术。
为什么抑制 linter 对依赖的检查如此危险？ 

收起
抑制 linter 会导致非常不直观的 bug，这将很难发现和修复。这里有一个例子：
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  function onTick() {
 setCount(count + increment);
  }

  useEffect(() => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>
        计数器：{count}
        <button onClick={() => setCount(0)}>重制</button>
      </h1>
      <hr />
      <p>
        每秒递增：
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
比方说，你想“只在 mount 时”运行 Effect。你已经知道可以通过设置 空（[]）依赖 来达到这种效果，所以你决定忽略 linter 的检查，强行指定 [] 为依赖。

上面的计数器例子，本应该每秒递增，递增量可以通过两个按钮来控制。然而，由于你对 React “撒谎”，说这个 Effect 不依赖于任何东西，React 便一直使用初次渲染时的 onTick 函数。在后续渲染中， count 总是 0 ，increment 总是 1。为什么？因为定时器每秒调用 onTick 函数，实际运行的是 setCount(0 + 1)[1]，所以你总是看到 1。像这样的错误，当它们分散在多个组件中时，就更难解决了。

这里有一个比忽略 linter 更好的解决方案! 那便是将 onTick 添加到依赖中。(为了确保 interval 只设置一次，使 onTick 成为 Effect Event。)

我们建议将依赖性 lint 错误作为一个编译错误来处理。如果你不抑制它，你将永远不会遇到像上面这样的错误。本页面的剩下部分将介绍这个和其他情况的替代方案。
```

#### 移除非必需的依赖

每当你调整 Effect 的依赖以适配代码时，请注意一下当前的依赖。当这些依赖发生变化时，让 Effect 重新运行是否有意义？有时，答案是“不”：

你可能想在不同的条件下重新执行 Effect 的 不同部分。
你可能想只读取某个依赖的 最新值，而不是对其变化做出“反应”。
依赖可能会因为它的类型是对象或函数而 无意间 改变太频繁。
为了找到正确的解决方案，你需要回答关于 Effect 的几个问题。让我们来看看这些问题。

```js
//这段代码应该移到事件处理程序中吗？ 
你应该考虑的第一件事是，这段代码是否应该成为 Effect。

想象一个表单，在提交时你将 submitted 状态变量设置为 true，并在 submitted 为 true 时，需要发送 POST 请求并显示通知。你把这个逻辑放在 Effect 内，并根据 submitted 为 true “反应”。

function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      // 🔴 避免: Effect 中有特定事件的逻辑
      post('/api/register');
      showNotification('Successfully registered!');
    }
  }, [submitted]);

  function handleSubmit() {
    setSubmitted(true);
  }

  // ...
}
后来，你想通过读取当前的主题值来调整通知信息的样式。因为 theme 是在组件中声明的，所以它是响应式值，你决定把它作为依赖加入：

function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      // 🔴 避免: Effect 中有特定事件的逻辑
      post('/api/register');
      showNotification('Successfully registered!', theme);
    }
  }, [submitted, theme]); // ✅ 所有依赖已声明

  function handleSubmit() {
    setSubmitted(true);
  }  

  // ...
}
如果这么做，你将引入一个错误。想象一下，你先提交表单，然后切换暗亮主题。当 theme 改变后，Effect 重新运行，这将导致显示两次相同的通知！

首先，这里的问题是，代码不应该以 Effect 实现。你想发送这个 POST 请求，并在 提交表单时显示通知，这是一个特定的交互。特定的交互请将该逻辑直接放到相应的事件处理程序中：

function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ 好：从事件处理程序调用特定于事件的逻辑
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }  

  // ...
}
现在，代码在事件处理程序中，它不是响应式的 —— 所以它只在用户提交表单时运行。阅读更多关于 在事件处理程序和 Effect 之间做出选择 和 如何删除不必要的 Effect。
```

```js
//Effect 是否在做几件不相关的事情？ 
下一个应该问自己的问题是，Effect 是否在做几件不相关的事情。

如下例子，你正在实现运输表单，用户需要选择他们的城市和地区。你根据所选的“国家”从服务器上获取“城市”列表，然后在下拉菜单中显示：

function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ 所有依赖已声明

  // ...
这是一个 在Effect中获取数据 的好例子：cities state 通过网络和 country props 进行“同步”。但你不能在事件处理程序中这样做，因为你需要在 ShippingForm 显示时和 country 发生变化时（不管是哪个交互导致的）立即获取。

现在我们假设你要为城市区域添加第二个选择框，它应该获取当前选择的 city 的 areas。你也许会在同一个 Effect 中添加第二个 fetch 调用来获取地区列表：

function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 避免: 单个 Effect 同步两个独立逻辑处理
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ 所有依赖已声明

  // ...
然而，由于 Effect 现在使用 city state 变量，你不得不把 city 加入到依赖中。这又带来一个问题：当用户选择不同的城市时，Effect 将重新运行并调用 fetchCities(country)。这将导致不必要地多次获取城市列表。

这段代码的问题在于，你在同步两个不同的、不相关的东西：

你想要根据 country props 通过网络同步 city state
你想要根据 city 状态通过网络同步 areas state
将逻辑分到 2 个 Effect 中，每个 Effect 仅响应其需要同步响应的 props：

//定义了一个名为 ShippingForm 的 React 组件，用于根据所选国家和城市动态加载城市和区域数据。
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ 所有依赖已声明
  //使用 useEffect 钩子在 country 发生变化时执行。
  //声明一个局部变量 ignore，用于取消无效的异步请求。
  //发送 fetch 请求获取指定国家的城市数据。
  //请求成功后，将响应转换为 JSON 并更新 cities 状态。
  //如果 ignore 为 true，则不会更新 cities 状态。
  //返回的清理函数在组件卸载或 country 变化时将 ignore 设置为 true，以避免更新卸载组件的状态。

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  useEffect(() => {
    //使用 useEffect 钩子在 city 发生变化且 city 不为 null 时执行。
    //声明一个局部变量 ignore，用于取消无效的异步请求。
    //发送 fetch 请求获取指定城市的区域数据。
    //请求成功后，将响应转换为 JSON 并更新 areas 状态。
    //如果 ignore 为 true，则不会更新 areas 状态。
    //返回的清理函数在组件卸载或 city 变化时将 ignore 设置为 true，以避免更新卸载组件的状态
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]); // ✅ 所有依赖已声明

  // ...
现在，第一个 Effect 只在 country 改变时重新运行，而第二个 Effect 在 city 改变时重新运行。你已经按目的把它们分开了：两件不同的事情由两个独立的 Effect 来同步。两个独立的 Effect 有两个独立的依赖，所以它们不会在无意中相互触发。

最终完成的代码比最初的要长，但是拆分这些 Effect 是非常正确的。每个 Effect 应该代表一个独立的同步过程。在这个例子中，删除一个 Effect 并不会影响到另一个 Effect 的逻辑。这意味着他们 同步不同的事情，分开他们处理是一件好事。如果你担心重复代码的问题，你可以通过 提取相同逻辑到自定义 Hook 来提升代码质量
```

```js
//是否在读取一些状态来计算下一个状态？ 
每次有新的消息到达时，这个 Effect 会用新创建的数组更新 messages state：

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    // ...
它使用 messages 变量来 创建一个新的数组：从所有现有的消息开始，并在最后添加新的消息。然而，由于 messages 是一个由 Effect 读取的响应式值，它必须是一个依赖：

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ 所有依赖已声明
  // ...
而让 messages 成为依赖会带来问题。

每当你收到一条消息，setMessages() 就会使该组件重新渲染一个新的 messages 数组，其中包括收到的消息。然而，由于该 Effect 现在依赖于 messages，这 也将 重新同步该 Effect。所以每条新消息都会使聊天重新连接。用户不会喜欢这样！

为了解决这个问题，不要在 Effect 里面读取 messages。相反，应该将一个 state 更新函数 传递给 setMessages：

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
注意 Effect 现在根本不读取 messages 变量。你只需要传递一个更新函数，比如 msgs => [...msgs, receivedMessage]。React 将更新程序函数放入队列 并将在下一次渲染期间向其提供 msgs 参数。这就是 Effect 本身不再需要依赖 messages 的原因。修复后，接收聊天消息将不再使聊天重新连接。
```

```js
//你想读取一个值而不对其变化做出“反应”吗？ 
正在建设中
本节描述了一个在稳定版本的 React 中 尚未发布的实验性 API。

假设你希望在用户收到新消息时播放声音，isMuted 为 true 除外：

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    // ...
由于 Effect 现在在其代码中使用了 isMuted ，因此你必须将其添加到依赖中：

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]); // ✅ 所有依赖已声明
  // ...
问题是每次 isMuted 改变时（例如，当用户按下“静音”开关时），Effect 将重新同步，并重新连接到聊天。这不是理想的用户体验！（在此示例中，即使禁用 linter 也不起作用——如果你这样做，isMuted 将“保持”其旧值。）

要解决这个问题，需要将不应该响应式的逻辑从 Effect 中抽取出来。你不希望此 Effect 对 isMuted 中的更改做出“反应”。将这段非响应式逻辑移至 Effect Event 中：

import { useState, useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
Effect Events 让你可以将 Effect 分成响应式部分（应该“反应”响应式值，如 roomId 及其变化）和非响应式部分（只读取它们的最新值，如 onMessage 读取 isMuted）。现在你在 Effect Event 中读取了 isMuted，它不需要添加到 Effect 依赖中。因此，当你打开或者关闭“静音”设置时，聊天不会重新连接。至此，解决原始问题！

包装来自 props 的事件处理程序 
当组件接收事件处理函数作为 props 时，你可能会遇到类似的问题：

function ChatRoom({ roomId, onReceiveMessage }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onReceiveMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId, onReceiveMessage]); // ✅ 所有依赖已声明
  // ...
假设父组件在每次渲染时都传递了一个 不同的 onReceiveMessage 函数：

<ChatRoom
  roomId={roomId}
  onReceiveMessage={receivedMessage => {
    // ...
  }}
/>
由于 onReceiveMessage 是依赖，它会导致 Effect 在每次父级重新渲染后重新同步。这将导致聊天重新连接。要解决此问题，请用 Effect Event 包裹之后再调用：

function ChatRoom({ roomId, onReceiveMessage }) {
  const [messages, setMessages] = useState([]);

  const onMessage = useEffectEvent(receivedMessage => {
    onReceiveMessage(receivedMessage);
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
Effect Events 不是响应式的，因此你不需要将它们指定为依赖。因此，即使父组件传递的函数在每次重新渲染时都不同，聊天也将不再重新连接。

分离响应式和非响应式代码 
在此示例中，你希望在每次 roomId 更改时记录一次。你希望在每个日志中包含当前的 notificationCount，但你 不 希望通过更改 notificationCount 来触发日志事件。

解决方案还是将非响应式代码拆分，将其放到 Effect Event 内：

function Chat({ roomId, notificationCount }) {
  const onVisit = useEffectEvent(visitedRoomId => {
    logVisit(visitedRoomId, notificationCount);
  });

  useEffect(() => {
    onVisit(roomId);
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
}
你希望逻辑对 roomId 做出响应，因此你在 Effect 中读取 roomId。但是，你不希望更改 notificationCount 来记录额外的日志输出，因此你可以在 Effect Event 中读取 notificationCount。了解使用 Effect Events 在 Effect 中读取最新 props 和 state 的更多信息。
```

```js
//一些响应式值是否无意中改变了？ 
有时，你 确实 希望 Effect 对某个值“做出反应”，但该值的变化比你希望的更频繁——并且可能不会从用户的角度反映任何实际变化。例如，假设你在组件中创建了 options 对象，然后从 Effect 内部读取该对象：

function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    // ...
该对象在组件中声明，因此它是 响应式值。当你在 Effect 中读取这样的响应式值时，你将其声明为依赖。这可确保 Effect 对其更改做出“反应”：

  // ...
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ 所有依赖已声明
  // ...
将其声明为依赖很重要！例如，这可以确保如果 roomId 发生变化，Effect 将使用新的 options 重新连接到聊天。但是，上面的代码也有问题。要查看它，请尝试在下面的沙盒中输入内容，然后观察控制台中发生的情况：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // 暂时禁用 linter 以演示问题
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return (
    <>
      <h1>欢迎来到 {roomId} 房间！</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('所有');
  return (
    <>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}

在上面的沙箱中，输入仅更新 message 状态变量。从用户的角度来看，这不应该影响聊天连接。但是，每次更新 message 时，组件都会重新渲染。当组件重新渲染时，其中的代码会从头开始重新运行。

在每次重新渲染 ChatRoom 组件时，都会从头开始创建一个新的 options 对象。React 发现 options 对象与上次渲染期间创建的 options 对象是 不同的对象。这就是为什么它会重新同步 Effect（依赖于 options），并且会在你输入时重新连接聊天。

此问题仅影响对象和函数。在 JavaScript 中，每个新创建的对象和函数都被认为与其他所有对象和函数不同。即使他们的值相同也没关系！

// 第一次渲染
const options1 = { serverUrl: 'https://localhost:1234', roomId: '音乐' };

// 下一次渲染
const options2 = { serverUrl: 'https://localhost:1234', roomId: '音乐' };

// 这是 2 个不同的对象
console.log(Object.is(options1, options2)); // false
对象和函数作为依赖，会使 Effect 比你需要的更频繁地重新同步。

这就是为什么你应该尽可能避免将对象和函数作为 Effect 的依赖。所以，尝试将它们移到组件外部、Effect 内部，或从中提取原始值。

将静态对象和函数移出组件 
如果该对象不依赖于任何 props 和 state，你可以将该对象移到组件之外：

const options = {
  serverUrl: 'https://localhost:1234',
  roomId: '音乐'
};

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ 所有依赖已声明
  // ...
这样，你向 linter 证明 它不是响应式的。它不会因为重新渲染而改变，所以它不是依赖。现在重新渲染 ChatRoom 不会导致 Effect 重新同步。

这也适用于函数场景：

function createOptions() {
  return {
    serverUrl: 'https://localhost:1234',
    roomId: '音乐'
  };
}

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ 所有依赖已声明
  // ...
由于 createOptions 是在组件外部声明的，因此它不是响应式值。这就是为什么它不需要在 Effect 的依赖中指定，以及为什么它永远不会导致 Effect 重新同步。

将动态对象和函数移动到 Effect 中 
如果对象依赖于一些可能因重新渲染而改变的响应式值，例如 roomId props，那么你不能将它放置于组件 外部。你可以在 Effect 内部 创建它：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
现在 options 已在 Effect 中声明，它不再是 Effect 的依赖。相反，Effect 使用的唯一响应式值是 roomId。由于 roomId 不是对象或函数，你可以确定它不会 无意间 变不同。在 JavaScript 中，数字和字符串根据它们的内容进行比较：

// 第一次渲染
const roomId1 = '音乐';

// 下一次渲染
const roomId2 = '音乐';

// 这 2 个字符串是相同的
console.log(Object.is(roomId1, roomId2)); // true
得益于此修复，当你编辑输入时，聊天将不再重新连接：
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>欢迎来到 {roomId} 房间!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('所有');
  return (
    <>
      <label>
        选择聊天室:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}
然而，当你更改 roomId 下拉列表时，它 确实 重新连接，正如你所期望的那样。

这也适用于函数的场景：

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明
  // ...
你可以编写自己的函数来组织 Effect 中的逻辑。只要将这些函数声明在 Effect 内部，它们就不是响应式值，因此它们也不是 Effect 的依赖。

从对象中读取原始值 
有时，你可能会通过 props 接收到类型为对象的值：

function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ 所有依赖已声明
  // ...
这里的风险是父组件会在渲染过程中创建对象：

<ChatRoom
  roomId={roomId}
  options={{
    serverUrl: serverUrl,
    roomId: roomId
  }}
/>
这将导致 Effect 在每次父组件重新渲染时重新连接。要解决此问题，请从 Effect 外部 读取对象信息，并避免依赖对象和函数类型：

function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 所有依赖已声明
  // ...
逻辑有点重复（你从 Effect 外部的对象读取一些值，然后在 Effect 内部创建具有相同值的对象）。但这使得 Effect 实际 依赖的信息非常明确。如果对象被父组件无意中重新创建，聊天也不会重新连接。但是，如果 options.roomId 或 options.serverUrl 确实不同，聊天将重新连接。

从函数中计算原始值 
同样的方法也适用于函数。例如，假设父组件传递了一个函数：

<ChatRoom
  roomId={roomId}
  getOptions={() => {
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }}
/>
为避免使其成为依赖（并导致它在重新渲染时重新连接），请在 Effect 外部调用它。这为你提供了不是对象的 roomId 和 serverUrl 值，你可以从 Effect 中读取它们：

function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions();
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 所有依赖已声明
  // ...
这仅适用于 纯 函数，因为它们在渲染期间可以安全调用。如果函数是一个事件处理程序，但你不希望它的更改重新同步 Effect，将它包装到 Effect Event 中。
```

```js
//摘要
依赖应始终与代码匹配。
当你对依赖不满意时，你需要编辑的是代码。
抑制 linter 会导致非常混乱的错误，你应该始终避免它。
要移除依赖，你需要向 linter “证明”它不是必需的。
如果某些代码是为了响应特定交互，请将该代码移至事件处理的地方。
如果 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect。
如果你想根据以前的状态更新一些状态，传递一个更新函数。
如果你想读取最新值而不“反应”它，请从 Effect 中提取出一个 Effect Event。
在 JavaScript 中，如果对象和函数是在不同时间创建的，则它们被认为是不同的。
尽量避免对象和函数依赖。将它们移到组件外或 Effect 内。
```

```js
//第 1 个挑战 共 4 个挑战: 修复重置 interval 
这个 Effect 设置了一个每秒运行的 interval。你已经注意到一些奇怪的事情：似乎每次 interval 都会被销毁并重新创建。修复代码，使 interval 不会被不断重新创建。
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ 创建定时器');
    const id = setInterval(() => {
      console.log('⏰ Interval');
      setCount(count + 1);
    }, 1000);
    return () => {
      console.log('❌ 清除定时器');
      clearInterval(id);
    };
  }, [count]);
  // setCount(c => c + 1);
  //,[]
  return <h1>计数器: {count}</h1>
}
译注：
 在创建 onTick 函数时，由于闭包的缘故，setCount(count + increment) 捕获的是创建时 count 和 increment 值。由于这里的“说谎”，每次重新渲染时新创建的 onTick 函数不能替换掉 Effect 里旧 onTick 函数，于是最终的效果就是 setCount(0 + 1) 


答案
你想要从 Effect 内部将 count 状态更新为 count + 1。但是，这会使 Effect 依赖于 count，它会随着每次滴答而变化，这就是为什么 interval 会在每次滴答时重新创建。

要解决这个问题，请使用 更新函数 并编写 setCount(c => c + 1) 而不是 setCount(count + 1):
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ 创建定时器');
    const id = setInterval(() => {
      console.log('⏰ Interval');
      setCount(c => c + 1);
    }, 1000);
    return () => {
      console.log('❌ 清除定时器');
      clearInterval(id);
    };
  }, []);

  return <h1>计数器: {count}</h1>
}
你不应在 Effect 中读取 count，而是将 c => c + 1 指令（“增加此数字！”）传递给 React。React 将在下一次渲染时执行它。由于你不再需要读取 Effect 中 count 的值，因此你可以将 Effect 的依赖保持为空（[]）。这可以防止 Effect 在每次执行时重新创建定时器 interval。
```

```js
//第 2 个挑战 共 4 个挑战: 修复重新触发动画的问题 
在此示例中，当你按下“显示”时，欢迎消息淡入。动画持续一秒钟。当你按下“移除”时，欢迎信息立即消失。淡入动画的逻辑在 animation.js 文件中以纯 JavaScript 动画循环 实现。你不需要改变那个逻辑。你可以将其视为第三方库。Effect 的逻辑是为 DOM 节点创建一个 FadeInAnimation 实例，然后调用 start(duration) 或 stop() 来控制动画。duration 由滑块控制。调整滑块并查看动画如何变化。

此代码已经能工作，但你需要更改一些内容。目前，当你移动控制 duration 状态变量的滑块时，它会重新触发动画。更改行为，使 Effect 不会对 duration 变量做出“反应”。当你按下“显示”时，Effect 应该使用滑块上的当前 duration 值。但是，移动滑块本身不应重新触发动画。
import { useState, useEffect, useRef } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome({ duration }) {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [duration]);
  // const onAppear = useEffectEvent(animation => {
  //   animation.start(duration);
  // });
  // useEffect(() => {
  //   const animation = new FadeInAnimation(ref.current);
  //   onAppear(animation);
  //   return () => {
  //     animation.stop();
  //   };
  // }, []);
  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      欢迎
    </h1>
  );
}

export default function App() {
  const [duration, setDuration] = useState(1000);
  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        <input
          type="range"
          min="100"
          max="3000"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        <br />
        淡入 interval: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? '移除' : '显示'}
      </button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  );
}

//animation
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    if (this.duration === 0) {
      // Jump to end immediately
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // Start animating
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}

答案
Effect 需要读取 duration 的最新值，但你不希望它对 duration 的变化做出“反应”。你使用 duration 来启动动画，但启动动画不是响应式的。将非响应式代码行提取到 Effect Event 中，并从 Effect 中调用该函数。
import { useState, useEffect, useRef } from 'react';
import { FadeInAnimation } from './animation.js';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

function Welcome({ duration }) {
  const ref = useRef(null);

  const onAppear = useEffectEvent(animation => {
    animation.start(duration);
  });

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    onAppear(animation);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      欢迎
    </h1>
  );
}

export default function App() {
  const [duration, setDuration] = useState(1000);
  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        <input
          type="range"
          min="100"
          max="3000"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        <br />
        淡入 interval: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? '移除' : '显示'}
      </button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  );
}

export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
像 onAppear 这样的 Effect Events 不是响应式的，因此你可以在不重新触发动画的情况下读取内部的 duration。
```

```js
//第 3 个挑战 共 4 个挑战: 修复聊天重新连接的问题 
在此示例中，每次你按“切换主题”时，聊天都会重新连接。为什么会这样？修复错误，只有当你编辑服务器 URL 或选择不同的聊天室时，聊天才会重新连接。

将 chat.js 视为外部第三方库：你可以查阅它以检查其 API，但不要对其进行编辑。
//app
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('所有');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
      <label>
        服务器地址：
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom options={options} />
    </div>
  );
}
//chatroom
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);
  // const { roomId, serverUrl } = options;
  // useEffect(() => {
  //   const connection = createConnection({
  //     roomId: roomId,
  //     serverUrl: serverUrl
  //   });
  //   connection.connect();
  //   return () => connection.disconnect();
  // }, [roomId, serverUrl]);

  //或者直接  useEffect(() => {
    // const connection = createConnection({
    //   roomId: roomId,
    //   serverUrl: serverUrl
    // });原始props更好一些
  return <h1>欢迎来到 {options.roomId} 房间！</h1>;
}
//chat
export function createConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}
答案
Effect 因依赖于 options 对象，导致其重新运行。对象可能会在无意中被重新创建，你应该尽可能避免将它们作为 Effect 的依赖。

侵入性最小的修复方法是在 Effect 外部读取 roomId 和 serverUrl，然后使 Effect 依赖于这些原始值（不能无意地更改）。在 Effect 内部，创建一个对象并将其传递给 createConnection：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('所有');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
      <label>
        服务器地址：
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom options={options} />
    </div>
  );
}

import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return <h1>欢迎来到 {options.roomId} 房间！</h1>;
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}

用更具体的 roomId 和 serverUrl props 替换对象 options props 会更好：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('所有');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
      <label>
        服务器地址：
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        serverUrl={serverUrl}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ roomId, serverUrl }) {
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间，在 ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ 断开“' + roomId + '”房间，在 ' + serverUrl);
    }
  };
}
尽可能坚持使用原始 props，以便以后更容易优化组件。
```

```js
//第 4 个挑战 共 4 个挑战: 再次修复聊天重新连接的问题 
此示例使用或不使用加密连接到聊天。切换复选框并注意加密打开和关闭时控制台中的不同消息。换个房间试试，然后，尝试切换主题。当你连接到聊天室时，每隔几秒钟就会收到一条新消息。验证它们的颜色是否与你选择的主题相匹配。

在此示例中，每次你尝试更改主题时聊天都会重新连接。解决这个问题。修复后，更改主题不应重新连接聊天，但切换加密设置或更改房间应重新连接。

不要更改 chat.js 中的任何代码。除此之外，你可以更改任何代码，只要它引起相同的行为。例如，你可能会发现更改正在传递的 props 很有帮助。
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';
import { showNotification } from './notifications.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('所有');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        使用暗黑主题
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        开启加密功能
      </label>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        onMessage={msg => {
          showNotification('新消息：' + msg, isDark ? 'dark' : 'light');
        }}
        createConnection={() => {
          const options = {
            serverUrl: 'https://localhost:1234',
            roomId: roomId
          };
          if (isEncrypted) {
            return createEncryptedConnection(options);
          } else {
            return createUnencryptedConnection(options);
          }
        }}
      />
    </>
  );
}

import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function ChatRoom({ roomId, createConnection, onMessage }) {
  useEffect(() => {
    const connection = createConnection();
    connection.on('message', (msg) => onMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [createConnection, onMessage]);

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export function createEncryptedConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 🔐 连接到“' + roomId + '”房间...（已加密）');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 🔐 断开“' + roomId + '”房间（已加密）');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('不能添加 handler 2次');
      }
      if (event !== 'message') {
        throw Error('仅支持 "message" 事件');
      }
      messageCallback = callback;
    },
  };
}

export function createUnencryptedConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间（未加密）...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 断开“' + roomId + '”房间（未加密）');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('不能添加 handler 2次');
      }
      if (event !== 'message') {
        throw Error('仅支持 "message" 事件');
      }
      messageCallback = callback;
    },
  };
}

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
```

```js
//答案
解决这个问题的正确方法不止一种，下面要介绍的是一种可能的解决方案。

在原始示例中，切换主题会导致创建和传递不同的 onMessage 和 createConnection 函数。由于 Effect 依赖于这些功能，因此每次切换主题时聊天都会重新连接。

要解决 onMessage 的问题，你需要将其包装到 Effect Event 中：

export default function ChatRoom({ roomId, createConnection, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    // ...
与 onMessage props 不同，onReceiveMessage Effect Event 不是响应式的。这就是为什么它不需要成为 Effect 的依赖。因此，对 onMessage 的更改不会导致聊天重新连接。

你不能对 createConnection 做同样的事情，因为它 应该 是响应式的。如果用户在加密和未加密连接之间切换，或者如果用户切换当前房间，你 希望 重新触发 Effect。但是，因为 createConnection 是函数，你无法检查它读取的信息是否 实际 发生了变化。要解决此问题，请传递原始的 roomId 和 isEncrypted 值，而不是从 App 组件向下传递 createConnection ：

      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
        onMessage={msg => {
          showNotification('新消息：' + msg, isDark ? 'dark' : 'light');
        }}
      />
现在你可以将 createConnection 函数移到 Effect 里面，而不是从 App 向下传递它：

import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }
    // ...
在这两个更改之后，Effect 不再依赖于任何函数值：

export default function ChatRoom({ roomId, isEncrypted, onMessage }) { // Reactive values
  const onReceiveMessage = useEffectEvent(onMessage); // Not reactive

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId // 读取响应式值
      };
      if (isEncrypted) { // 读取响应式值
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }

    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]); // ✅ 所有依赖已声明
因此，仅当有意义的内容（roomId 或 isEncrypted）发生变化时，聊天才会重新连接：
//app
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

import { showNotification } from './notifications.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('所有');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        使用暗黑主题
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        开启加密功能
      </label>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
        onMessage={msg => {
          showNotification('新消息：' + msg, isDark ? 'dark' : 'light');
        }}
      />
    </>
  );
}
//chatroom
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);
//使用 useEffectEvent 创建一个响应式的 onReceiveMessage 回调函数，确保每次渲染时 onMessage 都是最新的。
  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
      //定义 createConnection 函数，根据 isEncrypted 决定创建加密或未加密的连接。--options 包含 serverUrl 和 roomId。
    }

    const connection = createConnection();//调用 createConnection 函数创建连接。
    connection.on('message', (msg) => onReceiveMessage(msg));//设置消息事件处理程序，接收到消息时调用 onReceiveMessage 回调函数。
    connection.connect();
    return () => connection.disconnect();//返回清理函数，在组件卸载或 roomId 或 isEncrypted 变化时断开连接。
  }, [roomId, isEncrypted]);

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}
//chat
export function createEncryptedConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 🔐 连接到“' + roomId + '”房间...（已加密）');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 🔐 断开“' + roomId + '”房间（已加密）');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('不能添加 handler 2次');
      }
      if (event !== 'message') {
        throw Error('仅支持 "message" 事件');
      }
      messageCallback = callback;
    },
  };
}

export function createUnencryptedConnection({ serverUrl, roomId }) {
  // 真正的实现实际上会连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('期望 serverUrl 是字符串类型，收到：' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('期望 roomId 是字符串类型，收到：' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 连接到“' + roomId + '”房间（未加密）...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 断开“' + roomId + '”房间（未加密）');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('不能添加 handler 2次');
      }
      if (event !== 'message') {
        throw Error('仅支持 "message" 事件');
      }
      messageCallback = callback;
    },
  };
}
//notification
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
```

#### 表格 移除effect依赖

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||post这种别放在useEffect里面||
||静音动作不应[],因为不想看它刷新||
||||
||||

### 使用自定义 Hook 复用逻辑

React 有一些内置 Hook，例如 useState，useContext 和 useEffect。有时你需要一个用途更特殊的 Hook：例如获取数据，记录用户是否在线或者连接聊天室。虽然 React 中可能没有这些 Hook，但是你可以根据应用需求创建自己的 Hook。

你将会学习到
什么是自定义 Hook，以及如何编写
如何在组件间重用逻辑
如何给自定义 Hook 命名以及如何构建
提取自定义 Hook 的时机和原因

#### 自定义 Hook：组件间共享逻辑

假设你正在开发一款重度依赖网络的应用（和大多数应用一样）。当用户使用应用时网络意外断开，你需要提醒他。你会怎么处理呢？看上去组件需要两个东西：

一个追踪网络是否在线的 state。
一个订阅全局 online 和 offline 事件并更新上述 state 的 Effect。
这会让组件与网络状态保持 同步。你也许可以像这样开始：

```js
//import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
试着开启和关闭网络，注意观察 StatusBar 组件应对你的行为是如何更新的。

假设现在你想在另一个不同的组件里 也 使用同样的逻辑。你希望实现一个保存按钮，每当网络断开这个按钮就会不可用并且显示“Reconnecting…”而不是“Save progress”。

你可以从复制粘贴 isOnline state 和 Effect 到 SaveButton 组件开始：
import { useState, useEffect } from 'react';

export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
如果你关闭网络，可以发现这个按钮的外观变了。

这两个组件都能很好地工作，但不幸的是他们的逻辑重复了。他们看上去有不同的 视觉外观，但你依然想复用他们的逻辑。
```

```js
//从组件中提取自定义 Hook 
假设有一个内置 Hook useOnlineStatus，它与 useState 和 useEffect 相似。那么你就可以简化这两个组件并移除他们之间的重复部分：

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
尽管目前还没有这样的内置 Hook，但是你可以自己写。声明一个 useOnlineStatus 函数，并把组件里早前写的所有重复代码移入该函数：

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
在函数结尾处返回 isOnline。这可以让组件读取到该值：
//app
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
//useonlinestatus
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
切换网络状态验证一下是否会同时更新两个组件。

现在组件里没有那么多的重复逻辑了。更重要的是，组件内部的代码描述的是想要做什么（使用在线状态！），而不是怎么做（通过订阅浏览器事件完成）。

当提取逻辑到自定义 Hook 时，你可以隐藏如何处理外部系统或者浏览器 API 这些乱七八糟的细节。组件内部的代码表达的是目标而不是具体实现。
```

```js
// Hook 的名称必须永远以 use 开头
//React 应用是由组件构成，而组件由内置或自定义 Hook 构成。可能你经常使用别人写的自定义 Hook，但偶尔也要自己写！

你必须遵循以下这些命名公约：

React 组件名称必须以大写字母开头，比如 StatusBar 和 SaveButton。React 组件还需要返回一些 React 能够显示的内容，比如一段 JSX。
Hook 的名称必须以 use 开头，然后紧跟一个大写字母，就像内置的 useState 或者本文早前的自定义 useOnlineStatus 一样。Hook 可以返回任意值。
这个公约保证你始终能一眼识别出组件并且知道它的 state，Effect 以及其他的 React 特性可能“隐藏”在哪里。例如如果你在组件内部看见 getColor() 函数调用，就可以确定它里面不可能包含 React state，因为它的名称没有以 use 开头。但是像 useOnlineStatus() 这样的函数调用就很可能包含对内部其他 Hook 的调用！

注意
如果你为 React 配置了 代码检查工具，它会强制执行这个命名公约。现在滑动到上面的 sandbox，并将 useOnlineStatus 重命名为 getOnlineStatus。注意此时代码检查工具将不会再允许你在其内部调用 useState 或者 useEffect。只有 Hook 和组件可以调用其他 Hook！
```

```js
//渲染期间调用的所有函数都应该以 use 前缀开头么？ 

收起
不。没有 调用 Hook 的函数不需要 变成 Hook。

如果你创建的函数没有调用任何 Hook 方法，在命名时应避免使用 use 前缀，把它当成一个常规函数去命名。如下案例中的 useSorted 函数就没有调用任何 Hook 方法，所以更推荐用 getSorted 来命名：

// 🔴 Avoid: 没有调用其他Hook的Hook
function useSorted(items) {
  return items.slice().sort();
}

// ✅ Good: 没有使用Hook的常规函数
function getSorted(items) {
  return items.slice().sort();
}
这保证你的代码可以在包含条件语句在内的任何地方调用这个常规函数：

function List({ items, shouldSort }) {
  let displayedItems = items;
  if (shouldSort) {
    // ✅ 在条件分支里调用getSorted()是没问题的，因为它不是Hook
    displayedItems = getSorted(items);
  }
  // ...
}
哪怕内部只使用了一个 Hook，你也应该给这个函数加 use 前缀（让它成为一个 Hook）：

// ✅ Good: 一个使用了其他Hook的Hook
function useAuth() {
  return useContext(Auth);
}
技术上 React 对此并不强制要求。原则上你可以写出不调用其他 Hook 的 Hook。但这常常会难以理解且受限，所以最好避免这种方式。但是它在极少数场景下可能是有益的。例如函数目前也许并没有使用任何 Hook，但是你计划未来在该函数内部添加一些 Hook 调用。那么使用 use 前缀命名就很有意义：

// ✅ Good: 之后可能使用其他Hook的Hook
function useAuth() {
  // TODO: 当认证功能实现以后，替换这一行：
  // 返回 useContext(Auth)；
  return TEST_USER;
}
接下来组件就不能在条件语句里调用这个函数。当你在内部实际添加了 Hook 调用时，这一点将变得很重要。如果你（现在或者之后）没有计划在内部使用 Hook，请不要让它变成 Hook。
```

```js
//自定义 Hook 共享的是状态逻辑，而不是状态本身 
之前的例子里，当你开启或关闭网络时，两个组件一起更新了。但是两个组件共享 state 变量 isOnline 这种想法是错的。看这段代码：

function StatusBar() {
  const isOnline = useOnlineStatus();
  // ...
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  // ...
}
它的工作方式和你之前提取的重复代码一模一样：

function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // ...
  }, []);
  // ...
}

function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // ...
  }, []);
  // ...
}
这是完全独立的两个 state 变量和 Effect！只是碰巧同一时间值一样，因为你使用了相同的外部值同步两个组件（无论网络是否开启）。

为了更好的说明这一点，我们需要一个不同的示例。看下面的 Form 组件：
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p><b>Good morning, {firstName} {lastName}.</b></p>
    </>
  );
}
每个表单域都有一部分重复的逻辑：

都有一个 state（firstName 和 lastName）。
都有 change 事件的处理函数（handleFirstNameChange 和 handleLastNameChange）。
都有为输入框指定 value 和 onChange 属性的 JSX。
你可以提取重复的逻辑到自定义 Hook useFormInput：
//app
import { useFormInput } from './useFormInput.js';

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}
//useforminput
import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}
注意它只声明了 一个 state 变量，叫做 value。

但 Form 组件调用了 两次 useFormInput：

function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');
  // ...
这就是为什么它工作的时候像声明了两个单独的 state 变量！

自定义 Hook 共享的只是状态逻辑而不是状态本身。对 Hook 的每个调用完全独立于对同一个 Hook 的其他调用。这就是上面两个 sandbox 结果完全相同的原因。如果愿意，你可以划上去进行比较。提取自定义 Hook 前后组件的行为是一致的。

当你需要在多个组件之间共享 state 本身时，需要 将变量提升并传递下去。
```

#### 在 Hook 之间传递响应值

每当组件重新渲染，自定义 Hook 中的代码就会重新运行。这就是组件和自定义 Hook 都 需要是纯函数 的原因。我们应该把自定义 Hook 的代码看作组件主体的一部分。

由于自定义 Hook 会随着组件一起重新渲染，所以组件可以一直接收到最新的 props 和 state。想知道这意味着什么，那就看看这个聊天室的示例。修改 ServeUrl 或者 roomID：

```js
//import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}

//chatroom
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

//chat
export function createConnection({ serverUrl, roomId }) {
  // 真正的实现会实际连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

//notification
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme = 'dark') {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
当你修改 serverUrl 或者 roomId 时，Effect 会对 你的修改做出“响应” 并重新同步。你可以通过每次修改 Effect 依赖项时聊天室重连的控制台消息来区分。

现在将 Effect 代码移入自定义 Hook：

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
这让 ChatRoom 组件调用自定义 Hook，而不需要担心内部怎么工作：

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
这看上去简洁多了（但是它做的是同一件事）！

注意逻辑 仍然响应 props 和 state 的变化。尝试编辑 server URL 或选中的房间：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}

import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

import { useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现会实际连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme = 'dark') {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
注意你如何获取 Hook 的返回值：

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
并把它作为输入传给另一个 Hook：

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
每次 ChatRoom 组件重新渲染，它就会传最新的 roomId 和 serverUrl 到你的 Hook。这就是每当重新渲染后他们的值不一样时你的 Effect 会重连聊天室的原因。（如果你曾经使用过音视频处理软件，像这样的 Hook 链也许会让你想起音视频效果链。好似 useState 的输出作为 useChatRoom 的输入）。
```

```js
//把事件处理函数传到自定义 Hook 中 
正在建设中
这个章节描述了 React 稳定版 还未发布的一个实验性 API。

当你在更多组件中使用 useChatRoom 时，你可能希望组件能定制它的行为。例如现在 Hook 内部收到消息的处理逻辑是硬编码：

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
假设你想把这个逻辑移回到组件中：

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });
  // ...
完成这个工作需要修改自定义 Hook，把 onReceiveMessage 作为其命名选项之一：

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onReceiveMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl, onReceiveMessage]); // ✅ 声明了所有的依赖
}
这个修改有效果，但是当自定义 Hook 接受事件处理函数时，你还可以进一步改进。

增加对 onReceiveMessage 的依赖并不理想，因为每次组件重新渲染时聊天室就会重新连接。 通过 将这个事件处理函数包裹到 Effect Event 中来将它从依赖中移除：

import { useEffect, useEffectEvent } from 'react';
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 声明所有依赖
}
现在每次 ChatRoom 组件重新渲染时聊天室都不会重连。这是一个将事件处理函数传给自定义 Hook 的完整且有效的 demo，你可以尝试一下：
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}

import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';
import { showNotification } from './notifications.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}

export function createConnection({ serverUrl, roomId }) {
  // 真正的实现会实际连接到服务器
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme = 'dark') {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
注意你不再需要为了使用它而去了解 useChatRoom 是 如何 工作的。你可以把它添加到其他任意组件，传递其他任意选项，而它会以同样的方式工作。这就是自定义 Hook 的强大之处。
```

#### 什么时候使用自定义 Hook

```js
//你没必要对每段重复的代码都提取自定义 Hook。一些重复是好的。例如像早前提取的包裹单个 useState 调用的 useFormInput Hook 就是没有必要的。

但是每当你写 Effect 时，考虑一下把它包裹在自定义 Hook 是否更清晰。你不应该经常使用 Effect，所以如果你正在写 Effect 就意味着你需要“走出 React”和某些外部系统同步，或者需要做一些 React 中没有对应内置 API 的事。把 Effect 包裹进自定义 Hook 可以准确表达你的目标以及数据在里面是如何流动的。

例如，假设 ShippingForm 组件展示两个下拉菜单：一个显示城市列表，另一个显示选中城市的区域列表。你可能一开始会像这样写代码：

function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  // 这个 Effect 拉取一个国家的城市数据
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]);

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  // 这个 Effect 拉取选中城市的区域列表
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]);

  // ...
尽管这部分代码是重复的，但是 把这些 Effect 各自分开是正确的。他们同步两件不同的事情，所以不应该把他们合并到同一个 Effect。而是提取其中的通用逻辑到你自己的 useData Hook 来简化上面的 ShippingForm 组件：

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
现在你可以在 ShippingForm 组件中调用 useData 替换两个 Effect：

function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
提取自定义 Hook 让数据流清晰。输入 url，就会输出 data。通过把 Effect “隐藏”在 useData 内部，你也可以防止一些正在处理 ShippingForm 组件的人向里面添加 不必要的依赖。随着时间的推移，应用中大部分 Effect 都会存在于自定义 Hook 内部。
```

```js
//让你的自定义 Hook 专注于具体的高级用例 

收起
从选择自定义 Hook 名称开始。如果你难以选择一个清晰的名称，这可能意味着你的 Effect 和组件逻辑剩余的部分耦合度太高，还没有做好被提取的准备。

理想情况下，你的自定义 Hook 名称应该清晰到即使一个不经常写代码的人也能很好地猜中自定义 Hook 的功能，输入和返回：

✅ useData(url)
✅ useImpressionLog(eventName, extraData)
✅ useChatRoom(options)
当你和外部系统同步的时候，你的自定义 Hook 名称可能会更加专业，并使用该系统特定的术语。只要对熟悉这个系统的人来说名称清晰就可以：

✅ useMediaQuery(query)
✅ useSocket(url)
✅ useIntersectionObserver(ref, options)
保持自定义 Hook 专注于具体的高级用例。避免创建和使用作为 useEffect API 本身的替代品和 wrapper 的自定义“生命周期” Hook：

🔴 useMount(fn)
🔴 useEffectOnce(fn)
🔴 useUpdateEffect(fn)
例如这个 useMount Hook 试图保证一些代码只在“加载”时运行：

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // 🔴 Avoid: 使用自定义“生命周期” Hook
  useMount(() => {
    const connection = createConnection({ roomId, serverUrl });
    connection.connect();

    post('/analytics/event', { eventName: 'visit_chat' });
  });
  // ...
}

// 🔴 Avoid: 创建自定义“生命周期” Hook
function useMount(fn) {
  useEffect(() => {
    fn();
  }, []); // 🔴 React Hook useEffect 缺少依赖项: 'fn'
}
像 useMount 这样的自定义“生命周期” Hook 不是很适合 React 范式。例如示例代码有一个错误（它没有对 roomId 或 serverUrl 的变化做出“响应” ），但是代码检查工具并不会向你发出对应的警告，因为它只能检测 useEffect 的直接调用。并不了解你的 Hook。

如果你正在编写 Effect，请从直接使用 React API 开始：

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // ✅ Good: 通过用途分割的两个原始Effect

  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]);

  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_chat', roomId });
  }, [roomId]);

  // ...
}
然后你可以（但不是必须的）为不同的高级用例提取自定义 Hook：

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // ✅ Great: 以用途命名的自定义Hook
  useChatRoom({ serverUrl, roomId });
  useImpressionLog('visit_chat', { roomId });
  // ...
}
好的自定义 Hook 通过限制功能使代码调用更具声明性。例如 useChatRoom(options) 只能连接聊天室，而 useImpressionLog(eventName, extraData) 只能向分析系统发送展示日志。如果你的自定义 Hook API 没有约束用例且非常抽象，那么在长期的运行中，它引入的问题可能比解决的问题更多。
```

```js
//自定义 Hook 帮助你迁移到更好的模式 
Effect 是一个 脱围机制：当需要“走出 React”且用例没有更好的内置解决方案时你可以使用他们。随着时间的推移，React 团队的目标是通过给更具体的问题提供更具体的解决方案来最小化应用中的 Effect 数量。把你的 Effect 包裹进自定义 Hook，当这些解决方案可用时升级代码会更加容易。

让我们回到这个示例：
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}


import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}

```

```js
//在上述示例中，useOnlineStatus 借助一组 useState 和 useEffect 实现。但这不是最好的解决方案。它有许多边界用例没有考虑到。例如假设当组件加载时，isOnline 已经为 true，但是如果网络已经离线的话这就是错误的。你可以使用浏览器的 navigator.onLine API 来检查，但是在生成初始 HTML 的服务端直接使用它是没用的。简而言之这段代码可以改进。

幸运的是，React 18 包含了一个叫做 useSyncExternalStore 的专用 API，它可以解决你所有这些问题。这里展示了如何利用这个新 API 来重写你的 useOnlineStatus Hook：
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}

import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // 如何在客户端获取值
    () => true // 如何在服务端获取值
  );
}

注意 你不需要修改任何组件 就能完成这次迁移：

function StatusBar() {
  const isOnline = useOnlineStatus();
  // ...
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  // ...
}
这是把 Effect 包裹进自定义 Hook 有益的另一个原因：

你让进出 Effect 的数据流非常清晰。
你让组件专注于目标，而不是 Effect 的准确实现。
当 React 增加新特性时，你可以在不修改任何组件的情况下移除这些 Effect。
和 设计系统 相似，你可能会发现从应用的组件中提取通用逻辑到自定义 Hook 是非常有帮助的。这会让你的组件代码专注于目标，并且避免经常写原始 Effect。许多很棒的自定义 Hook 是由 React 社区维护的。
```

```js
//React 会为数据获取提供内置解决方案么？ 

收起
我们仍然在规划细节，但是期望未来可以像这样写数据获取：

import { use } from 'react'; // 还不可用！

function ShippingForm({ country }) {
  const cities = use(fetch(`/api/cities?country=${country}`));
  const [city, setCity] = useState(null);
  const areas = city ? use(fetch(`/api/areas?city=${city}`)) : null;
  // ...
比起在每个组件手动写原始 Effect，在应用中使用像上面 useData 这样的自定义 Hook，之后迁移到最终推荐方式你所需要的修改更少。但是旧的方式仍然可以有效工作，所以如果你喜欢写原始 Effect，可以继续这样做。
```

```js
//不止一个方法可以做到 
假设你想要使用浏览器的 requestAnimationFrame API 从头开始 实现一个 fade-in 动画。你也许会从一个设置动画循环的 Effect 开始。在动画的每一帧中，你可以修改 ref 持有的 DOM 节点的 opacity 属性直到 1。你的代码一开始可能是这样：
import { useState, useEffect, useRef } from 'react';
//一个组件，该组件在显示时会通过动画渐变显示欢迎消息。
function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const duration = 1000; // 动画持续时间为 1000 毫秒
    const node = ref.current; // 引用到 DOM 节点

    let startTime = performance.now();
    let frameId = null; // 保存请求动画帧的 ID

    function onFrame(now) {
      const timePassed = now - startTime; // 计算已过去的时间
      const progress = Math.min(timePassed / duration, 1); // 计算动画进度（0 到 1 之间）
      onProgress(progress); // 更新节点透明度
      if (progress < 1) {
        // 如果动画未完成，请求下一帧
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress; // 根据进度更新节点透明度
    }

    function start() {
      onProgress(0); // 初始化透明度
      startTime = performance.now(); // 记录动画开始时间
      frameId = requestAnimationFrame(onFrame); // 开始动画
    }

    function stop() {
      cancelAnimationFrame(frameId); // 取消动画帧请求
      startTime = null; // 重置开始时间
      frameId = null; // 重置帧 ID
    }

    start(); // 启动动画
    return () => stop(); // 清理函数，在组件卸载时停止动画
  }, []);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false); // 用于控制 Welcome 组件显示状态的 state
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'} // 按钮文本根据 show 的状态进行切换
      </button>
      <hr />
      {show && <Welcome />} // 根据 show 的状态决定是否渲染 Welcome 组件
    </>
  );
}

为了让组件更具有可读性，你可能要将逻辑提取到自定义 Hook useFadeIn：
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

import { useEffect } from 'react';

export function useFadeIn(ref, duration) {
  useEffect(() => {
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

    function onFrame(now) {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // 我们还有更多的帧需要绘制
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, [ref, duration]);
}

你可以让 useFadeIn 和原来保持一致，但是也可以进一步重构。例如你可以把设置动画循环的逻辑从 useFadeIn 提取到自定义 Hook useAnimationLoop：
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useFadeIn(ref, duration) {
  const [isRunning, setIsRunning] = useState(true);

  useAnimationLoop(isRunning, (timePassed) => {
    const progress = Math.min(timePassed / duration, 1);
    ref.current.style.opacity = progress;
    if (progress === 1) {
      setIsRunning(false);
    }
  });
}

function useAnimationLoop(isRunning, drawFrame) {
  const onFrame = useEffectEvent(drawFrame);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const startTime = performance.now();
    let frameId = null;

    function tick(now) {
      const timePassed = now - startTime;
      onFrame(timePassed);
      frameId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);
}
但是 没有必要 这样做。和常规函数一样，最终是由你决定在哪里绘制代码不同部分之间的边界。你也可以采取不一样的方法。把大部分必要的逻辑移入一个 JavaScript 类，而不是把逻辑保留在 Effect 中：
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

import { useState, useEffect } from 'react';
import { FadeInAnimation } from './animation.js';

export function useFadeIn(ref, duration) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}

export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress === 1) {
      this.stop();
    } else {
      // 我们还有更多的帧要绘制
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}

Effect 可以连接 React 和外部系统。Effect 之间的配合越多（例如链接多个动画），像上面的 sandbox 一样 完整地 从 Effect 和 Hook 中提取逻辑就越有意义。然后你提取的代码 变成 “外部系统”。这会让你的 Effect 保持简洁，因为他们只需要向已经被你移动到 React 外部的系统发送消息。

上面这个示例假设需要使用 JavaScript 写 fade-in 逻辑。但使用纯 CSS 动画 实现这个特定的 fade-in 动画会更加简单和高效：
import { useState, useEffect, useRef } from 'react';
import './welcome.css';

function Welcome() {
  return (
    <h1 className="welcome">
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}

.welcome {
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  animation: fadeIn 1000ms;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

某些时候你甚至不需要 Hook！
```

```js
//摘要
自定义 Hook 让你可以在组件间共享逻辑。
自定义 Hook 命名必须以后跟一个大写字母的 use 开头。
自定义 Hook 共享的只是状态逻辑，不是状态本身。
你可以将响应值从一个 Hook 传到另一个，并且他们会保持最新。
每次组件重新渲染时，所有的 Hook 会重新运行。
自定义 Hook 的代码应该和组件代码一样保持纯粹。
把自定义 Hook 收到的事件处理函数包裹到 Effect Event。
不要创建像 useMount 这样的自定义 Hook。保持目标具体化。
如何以及在哪里选择代码边界取决于你。
```

```js
//第 1 个挑战 共 5 个挑战: 提取 useCounter Hook 
这个组件使用了一个 state 变量和一个 Effect 来展示每秒递增的一个数字。把这个逻辑提取到一个 useCounter 的自定义 Hook 中。你的目标是让 Counter 组件的实现看上去和这个一样：

export default function Counter() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}
你需要在 useCounter.js 中编写你的自定义 Hook，并且把它引入到 Counter.js 文件。
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>Seconds passed: {count}</h1>;
}

答案
你的代码应该像这样：
import { useCounter } from './useCounter.js';

export default function Counter() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}

import { useState, useEffect } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}
注意 App.js 不再需要引入 useState 或者 useEffect。
```

```js
//第 2 个挑战 共 5 个挑战: 让计时器的 delay 变为可配置项 
这个示例中有一个由滑动条控制的 state 变量 delay，但它的值没有被使用。请将 delay 值传给自定义 Hook useCounter，修改 useCounter Hook，用传过去的 delay 代替硬编码 1000 毫秒。
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter();
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}

import { useState, useEffect } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
  //加入delay依赖就ok了
}

答案
使用 useCounter(delay) 将 delay 传入 Hook。然后在 Hook 内部使用 delay 替换硬编码值 1000。你需要在 Effect 依赖项中加入 delay。这保证了 delay 的变化会重置 interval。
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter(delay);
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}

import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}

```

```js
//第 3 个挑战 共 5 个挑战: 从 useCounter 中提取 useInterval 
现在 useCounter Hook 做两件事。设置一个 interval，并且在每个 interval tick 内递增一次 state 变量。将设置 interval 的逻辑拆分到一个独立 Hook useInterval。它应该有两个参数：onTick 回调函数和 delay。本次修改后 useCounter 的实现应该如下所示：
export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}
在 useInterval.js 文件中编写 useInterval 并在 useCounter.js 文件中导入。
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const count = useCounter(1000);
  return <h1>Seconds passed: {count}</h1>;
}

import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}

//useinterval
答案
useInterval 内部的逻辑应该是设置和清理计时器。除此之外不需要做任何事。
import { useEffect } from 'react';

export function useInterval(onTick, delay) {
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [onTick, delay]);
}
注意这个解决方案有一些问题，你将在下一个挑战中解决他们。
```

```js
//第 4 个挑战 共 5 个挑战: 修复计时器重置 
这个示例有 两个 独立的计时器。

App 组件调用 useCounter，这个 Hook 调用 useInterval 来每秒更新一次计数器。但是 App 组件 也 调用 useInterval 每两秒随机更新一次页面背景色。

更新页面背景色的回调函数因为一些原因从未执行过。在 useInterval 内部添加一些日志。

  useEffect(() => {
    console.log('✅ Setting up an interval with delay ', delay)
    const id = setInterval(onTick, delay);
    return () => {
      console.log('❌ Clearing an interval with delay ', delay)
      clearInterval(id);
    };
  }, [onTick, delay]);
这些日志符合你的预期吗？如果一些不必要的 Effect 似乎重新同步了，你能猜出哪一个依赖项导致了这个情况吗？有其他方式从 Effect 中 移除依赖 吗？

这个问题修复以后，你预期的应该是页面背景每两秒更新一次。
import { useCounter } from './useCounter.js';
import { useInterval } from './useInterval.js';

export default function Counter() {
  const count = useCounter(1000);

  useInterval(() => {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
    document.body.style.backgroundColor = randomColor;
  }, 2000);

  return <h1>Seconds passed: {count}</h1>;
}

import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}

import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(onTick, delay) {
  //名为 useInterval 的自定义 Hook，它接受两个参数：回调函数 onTick 和时间间隔 delay。
  useEffect(() => {
    const id = setInterval(onTick, delay);
    //使用 setInterval 设置一个定时器，每隔 delay 毫秒执行一次 onTick 回调函数，并将定时器 ID 存储在 id 中。
    return () => {
      clearInterval(id);
    };
  }, [onTick, delay]);//指定 useEffect 的依赖项数组，当 onTick 或 delay 发生变化时，useEffect 会重新执行。
}
//export function useInterval(callback, delay) {
//   const onTick = useEffectEvent(callback);使用 useEffectEvent 封装回调函数 callback。useEffectEvent 确保 callback 的引用在其值发生变化时也保持稳定，避免因依赖变化导致不必要的重新执行。
//   useEffect(() => {
//     const id = setInterval(onTick, delay);
//     return () => clearInterval(id);
//   }, [delay]);指定 useEffect 的依赖项数组，仅当 delay 发生变化时，useEffect 会重新执行。
// }


答案
和 早前这个页面 做的一样，在 useInterval 内部把 tick 回调函数包裹进一个 Effect Event。

这将让你可以从 Effect 的依赖项中删掉 onTick。每次组件重新渲染时，Effect 将不会重新同步，所以页面背景颜色变化 interval 有机会触发之前不会每秒重置一次。

随着这个修改，两个 interval 都会像预期一样工作并且不会互相干扰：
import { useCounter } from './useCounter.js';
import { useInterval } from './useInterval.js';

export default function Counter() {
  const count = useCounter(1000);

  useInterval(() => {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
    document.body.style.backgroundColor = randomColor;
  }, 2000);

  return <h1>Seconds passed: {count}</h1>;
}

import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}

import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(callback, delay) {
  const onTick = useEffectEvent(callback);
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [delay]);
}


```

```js
//第 5 个挑战 共 5 个挑战: 实现交错运动 
这个示例中，usePointerPosition() Hook 追踪当前指针位置。尝试移动光标或你的手指到预览区域上方，可以看到有一个红点随着你移动。它的位置被保存在变量 pos1 中。

事实上，有 5（!）个正在被渲染的不同红点。你看不见是因为他们现在都显示在同一位置。这就是你需要修复的问题。你想要实现的是一个“交错”运动：每个圆点应该“跟随”它前一个点的路径。例如如果你快速移动光标，第一个点应该立刻跟着它，第二个应该在小小的延时后跟上第一个点，第三个点应该跟着第二个点等等。

你需要实现自定义 Hook useDelayedValue。它当前的实现返回的是提供给它的 value。而你想从 delay 毫秒之前返回 value。你可能需要一些 state 和一个 Effect 来完成这个任务。

实现 useDelayedValue 后，你应该看见这些点一个接一个运动。
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
  //自定义 Hook 返回一个延迟更新的值。两个参数：要延迟更新的 value 和延迟时间 delay（以毫秒为单位）。
  // TODO: 实现这个 Hook
  // const [delayedValue, setDelayedValue] = useState(value);
  //使用 useState Hook 创建一个状态变量 delayedValue，并初始化为 value 的初始值。setDelayedValue 是用于更新 delayedValue 的函数。
  // useEffect(() => {
  //使用 useEffect Hook 设置一个副作用，该副作用在 value 或 delay 发生变化时执行。
  //   setTimeout(() => {
  //     setDelayedValue(value);
  //   }, delay);
  // }, [value, delay]);
  return value;

  //自定义 Hook useDelayedValue 接受一个值和一个延迟时间，返回一个在指定延迟时间后更新的值。它通过 useState 来存储延迟更新的值，通过 useEffect 来设置定时器，并在定时器触发时更新值。
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}

import { useState, useEffect } from 'react';

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}
答案
这里是一个生效的版本。你将 delayedValue 保存为一个 state 变量。当 value 更新时，Effect 会安排一个 timeout 来更新 delayedValue。这就是 delayedValue 总是“滞后于”实际 value 的原因。
import { useState, useEffect } from 'react';
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}

import { useState, useEffect } from 'react';

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}
注意这个 Effect 不 需要清理。如果你在清理函数中调用了 clearTimeout，那么每次 value 变化时，就会终止已经计划好的 timeout。为了保持运动连续，你需要触发所有 timeout。
```

#### 表格 自定义hook复用逻辑

| Column 1 | 问题\毛病 | Column 3 |
|----------|----------|----------|
||显示"网络状态"||
||自定义 Hook 通过将组件逻辑封装在一个函数中，使其可以在多个组件中重复使用，从而复用逻辑。||
||自定义 Hook 帮助你迁移到更好的模式是指通过提取和重用逻辑，简化组件结构，减少重复代码，从而提升代码的可维护性和可读性。||

### 123

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
