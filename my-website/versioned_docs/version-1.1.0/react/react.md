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

## 单引号双引号 左斜杠右斜杠

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
