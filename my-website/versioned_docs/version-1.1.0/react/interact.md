# interact

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
```

```js


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
