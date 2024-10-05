# ui

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

```js
// 这是 JavaScript 里两个主要用来导出值的方式：默认导出和具名导出。到目前为止，我们的示例中只用到了默认导出。但你可以在一个文件中，选择使用其中一种，或者两种都使用。

// !!!一个文件里有且仅有一个 默认 导出，但是可以有任意多个 具名 导出。!!!

// 组件的导出方式决定了其导入方式。当你用默认导入的方式，导入具名导出的组件时，就会报错。如下表格可以帮你更好地理解它们：

// 默认:导出语句--export default function Button() {}
// 导入语句--import Button from './Button.js';
// 具名:导出语句--export function Button() {}
// 导入语句--import { Button } from './Button.js';

// 当使用默认导入时，你可以在 import 语句后面进行任意命名。比如 import Banana from './Button.js'，如此你能获得与默认导出一致的内容。相反，对于具名导入，导入和导出的名字必须一致。这也是为什么称其为 具名 导入的原因！

// 通常，文件中仅包含一个组件时，人们会选择默认导出，而当文件中包含多个组件或某个值需要导出时，则会选择具名导出。 无论选择哪种方式，请记得给你的组件和相应的文件命名一个有意义的名字。我们不建议创建未命名的组件，比如 export default () => {}，因为这样会使得调试变得异常困难。
```

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
// 单引号 (`'`) 和双引号 (`"`) 的使用建议
// 1. **一致性**:
//    - 无论选择单引号还是双引号，保持一致性是最重要的。建议在整个项目中使用一种风格。

// 2. **JSX 中的属性**:
//    - 在 JSX 中，通常使用双引号来包裹属性值，这类似于 HTML 的属性规范。
//      ```jsx
//      <input type="text" placeholder="Enter your name" />
//      ```

// 3. **字符串包含引号**:
//    - 如果字符串内部包含双引号，可以使用单引号来避免转义符。
//      ```javascript
//      const message = 'He said, "Hello!"';
//      ```

//    - 反之，如果字符串内部包含单引号，可以使用双引号。
//      ```javascript
//      const message = "It's a beautiful day!";
//      ```

// 4. **嵌套引号**:
//    - 当需要嵌套引号时，外层使用一种引号，内层使用另一种引号。
//      ```javascript
//      const quote = "She said, 'I love JavaScript!'";
//      ```

// 5. **模板字符串**:
//    - 对于包含变量或多行文本的字符串，可以使用反引号（`` ` ``），这称为模板字符串。
//      ```javascript
//      const name = "John";
//      const greeting = `Hello, ${name}!`;
//      ```
// 使用单引号
// const singleQuoteString = 'This is a string with single quotes.';
// const stringWithDoubleQuotes = 'She said, "Hello!"';

// 使用双引号
// const doubleQuoteString = "This is a string with double quotes.";
// const stringWithSingleQuotes = "It's a sunny day.";

// JSX 中使用双引号
// function App() {
//   return (
//     <div>
//       <input type="text" placeholder="Enter your name" />
//     </div>
//   );
// }

// 模板字符串
// const name = 'Alice';
// const greeting = `Hello, ${name}! Welcome to the site.`;

// 总之，选择单引号或双引号主要取决于个人和团队的编码风格。在 JSX 中使用双引号是推荐的做法，而在 JavaScript 中，选择一种引号并保持一致是最佳实践。
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

// 如果你之前是习惯面向对象开发的，你可能会认为上面的两个例子略有不同，因为其中一个可能会创建两个不同的 <li> “实例”。但 JSX 元素不是“实例”，因为它们没有内部状态也不是真实的 DOM 节点。它们只是一些简单的描述，就像图纸一样。所以上面这两个例子事实上是完全相同的。在 状态的保持和重置 里会深入探讨其原因。
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
