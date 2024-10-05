# escape

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

```js
你可以通过从 React 导入 useRef Hook 来为你的组件添加一个 ref：

import { useRef } from 'react';
在你的组件内，调用 useRef Hook 并传入你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”：

const ref = useRef(0);
useRef 返回一个这样的对象:

{
  current: 0 // 你向 useRef 传入的值
}
```

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
//你可以在单个组件中把 ref 和 state 结合起来使用。例如，让我们制作一个秒表，用户可以通过按按钮来使其启动或停止。为了显示从用户按下“开始”以来经过的时间长度，你需要追踪按下“开始”按钮的时间和当前时间。此信息用于渲染，所以你会把它保存在 state 中：
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);

// 当用户按下“开始”时，你将用 setInterval 每 10 毫秒更新一次时间：
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
// 当按下“停止”按钮时，你需要取消现有的 interval，以便让它停止更新 now state 变量。你可以通过调用 clearInterval 来完成此操作。但你需要为其提供 interval ID，此 ID 是之前用户按下 Start、调用 setInterval 时返回的。你需要将 interval ID 保留在某处。 由于 interval ID 不用于渲染，你可以将其保存在 ref 中：
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
// 当一条信息用于渲染时，将它保存在 state 中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。
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
// 因为 count 的值将会被显示，所以为其使用 state 是合理的。当使用 setCount() 设置计数器的值时，React 会重新渲染组件，并且屏幕会更新以展示新的计数。

// 如果你试图用 ref 来实现它，React 永远不会重新渲染组件，所以你永远不会看到计数变化！看看点击这个按钮如何 不更新它的文本：
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
// 这就是为什么在渲染期间读取 ref.current 会导致代码不可靠的原因。如果需要，请改用 state。

// useRef 内部是如何运行的？ 
// :
// 尽管 useState 和 useRef 都是由 React 提供的，原则上 useRef 可以在 useState 的基础上 实现。 你可以想象在 React 内部，useRef 是这样实现的：

// React 内部
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
  //定义一个名为 useRef 的函数，它接受一个初始值 initialValue 作为参数。
  //使用 useState 钩子初始化一个状态 ref，该状态的初始值是一个对象 { current: initialValue }。unused 是状态的 setter 函数，但在这里不会用到。
  //返回 ref 对象，这个对象包含一个名为 current 的属性，其值为 initialValue
}
// 第一次渲染期间，useRef 返回 { current: initialValue }。 该对象由 React 存储，因此在下一次渲染期间将返回相同的对象。 请注意，在这个示例中，state 设置函数没有被用到。它是不必要的，因为 useRef 总是需要返回相同的对象！

// React 提供了一个内置版本的 useRef，因为它在实践中很常见。 但是你可以将其视为没有设置函数的常规 state 变量。 如果你熟悉面向对象编程，ref 可能会让你想起实例字段 —— 但是你写的不是 this.something，而是 somethingRef.current。

// 看不懂???
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
// ref 是一种脱围机制，用于保留不用于渲染的值。 你不会经常需要它们。
// ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置。
// 你可以通过调用 useRef Hook 来让 React 给你一个 ref。
// 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
// 与 state 不同，设置 ref 的 current 值不会触发重新渲染。
// 不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测。
```

```js
//第 1 个挑战 共 4 个挑战: 修复坏掉的聊天输入框 
// 输入消息并单击“发送”。你会注意到，在看到“已发送！”提示框之前有 3 秒的延迟。在此延迟期间，你可以看到一个“撤消”按钮。点击它。这个“撤消”按钮应该阻止“发送！”消息弹出。它通过调用 clearTimeout 来做到这点，这一步骤需要使用在 handleSend 时保存的 timeout ID。但是，即使在单击“撤消”后，“已发送！”消息仍然出现。找出它不起作用的原因，然后修复它。
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
// 答案:每当你的组件重新渲染时（例如当你设置 state 时），所有局部变量都会从头开始初始化。这就是为什么你不能将 timeout ID 保存在像 timeoutID 这样的局部变量中，然后期望未来另一个事件处理器“看到”它。相反，将它存储在一个 ref 中，React 将在渲染之间保留它。
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
// 答案:
// 在这个例子中，ref 的 current 值被用于计算渲染输出：{isOnRef.current ? '开'：'关'}。这表明此信息本来不应该在 ref 中，而应该放在 state 里。要修复它，请删除 ref ，使用 state 代替：
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
// 在这个例子中，所有按钮点击处理器都是 “防抖的”。 要了解这意味着什么，请按下其中一个按钮。注意消息在一秒后显示。如果你在等待消息时按下按钮，计时器将重置。因此如果你多次快速单击同一个按钮，则直到你停止单击 之后 1 秒钟，该消息才会显示。防抖可以让你将一些动作推迟到用户“停止动作”之后。

// 这个例子可以正常运行，但并不完全符合预期。按钮不是独立的。要查看问题，请单击其中一个按钮，然后立即单击另一个按钮。你本来期望在延迟之后，你会看到两个按钮的消息。但只有最后一个按钮的消息出现了。第一个按钮的消息丢失了。

// 为什么按钮会相互干扰呢？查找并修复问题。
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
// 答案
// 像 timeoutID 这样的变量是被所有组件共享的。这就是为什么单击第二个按钮会重置第一个按钮未完成的 timeout 的原因。要解决此问题，你可以把 timeout 保存在 ref 中。每个按钮都有自己的 ref，因此它们不会相互冲突。请注意快速单击两个按钮如何显示两个消息。
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
// 在此示例中，当你按下“发送”后，在显示消息之前会有一小段延迟。输入“你好”，按下发送，然后再次快速编辑输入。尽管你进行了编辑，提示框仍会显示“你好”（这是按钮被点击 那一刻 state 的值）。

// 通常，这种行为是你在应用程序中想要的。但是，有时可能需要一些异步代码来读取某些 state 的 最新 版本。你能想出一种方法，让提示框显示 当前 输入文本而不是点击时的内容吗？
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
// 答案:
// state 运作起来 就像快照，因此你无法从 timeout 等异步操作中读取最新的 state。但是，你可以在 ref 中保存最新的输入文本。ref 是可变的，因此你可以随时读取 current 属性。由于当前文本也用于渲染，在这个例子中，你需要 同时 使用一个 state 变量（用于渲染）和 一个 ref（在 timeout 时读取它）。你需要手动更新当前的 ref 值。
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

```js
// 要访问由 React 管理的 DOM 节点，首先，引入 useRef Hook：

import { useRef } from 'react';
// 然后，在你的组件中使用它声明一个 ref：

const myRef = useRef(null);
// 最后，将 ref 作为 ref 属性值传递给想要获取的 DOM 节点的 JSX 标签：

// <div ref={myRef}>
// useRef Hook 返回一个对象，该对象有一个名为 current 的属性。最初，myRef.current 是 null。当 React 为这个 ``<div>`` 创建一个 DOM 节点时，React 会把对该节点的引用放入 myRef.current。然后，你可以从 事件处理器 访问此 DOM 节点，并使用在其上定义的内置浏览器 API。

// 你可以使用任意浏览器 API，例如：
// myRef.current.scrollIntoView();
// 示例: 使文本输入框获得焦点
// 在本例中，单击按钮将使输入框获得焦点：
```

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
