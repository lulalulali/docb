# state

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

```js
有时候你可能会不确定是使用单个 state 变量还是多个 state 变量。

你会像下面这样做吗？

const [x, setX] = useState(0);
const [y, setY] = useState(0);
或这样？

const [position, setPosition] = useState({ x: 0, y: 0 });
从技术上讲，你可以使用其中任何一种方法。但是，如果某两个 state 变量总是一起变化，则将它们统一成一个 state 变量可能更好。这样你就不会忘记让它们始终保持同步，就像下面这个例子中，移动光标会同时更新红点的两个坐标：
```

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
|field中键入key|姓名姓氏输入框切换位置,内容没跟着换||
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
// state 仍然 “存在于” 顶层 Task 组件中，由 useReducer 进行管理。不过，组件树里的组件只要导入这些 context 之后就可以获取 tasks 和 dispatch。
```

#### 将相关逻辑迁移到一个文件当中

```js
// 这不是必须的，但你可以通过将 reducer 和 context 移动到单个文件中来进一步整理组件。目前，“TasksContext.js” 仅包含两个 context 声明：

import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
// 来给这个文件添加更多代码！将 reducer 移动到此文件中，然后声明一个新的 TasksProvider 组件。此组件将所有部分连接在一起：

// 它将管理 reducer 的状态。
// 它将提供现有的 context 给组件树。
// 它将 把 children 作为 prop，所以你可以传递 JSX。
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
// 这将使 TaskApp 组件更加直观：
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
