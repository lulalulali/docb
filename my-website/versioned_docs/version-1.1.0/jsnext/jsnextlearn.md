# nextlearn

## 安装

Would you like to customize the default import alias (@/*)? » No / Yes
这句提示是问你是否想要修改默认的模块导入路径别名，默认情况下 @ 代表项目的根目录，选择自定义可以根据你的需求修改别名。

## 组件层次结构

```js
就是这些文件要干什么,怎么互动的.
注意:layout里面是template,在里面是(错误,加载,未找到),最里面是page.   同理,嵌套路由就是A文件下面的B文件整体充当A的page;当然A有自己的layout,error,loading,not-found这些,这些文件都是跟B文件夹平齐的.  。布局也可以嵌套,就是layout可以嵌套

虽然文件夹定义路由，但只有 page.js 或 route.js 返回的内容是可公开寻址的。也就是说button.js不可以寻址.(没有相应的 page.js 文件)

如果项目使用 TypeScript：文件扩展名应该是 .ts（用于纯 TypeScript 文件）和 .tsx（用于包含 JSX 的 TypeScript 文件）。你可以放心编写 TypeScript 代码，它提供静态类型检查，能够帮助你在开发过程中捕获更多的错误。\\\\\如果项目没有使用 TypeScript：你可以继续使用 .js 和 .jsx 扩展名，编写 JavaScript 文件。如果你想要使用 TypeScript，运行以下命令来启用

默认情况下，页面是 Server 组件，但可以设置为 Client Component。

Server Component 的优点:性能提升：服务器组件不会将所有 JavaScript 发送到客户端，从而减少了页面体积和加载时间。这对于静态内容或不需要交互的页面来说非常有利。安全性更高：由于逻辑是在服务器端执行的，Server Component 不会暴露用户的敏感数据到客户端，提升了安全性。SEO 友好：服务器端渲染有助于更快的初始页面加载，并且因为页面的 HTML 是在服务器端生成的，搜索引擎可以更好地爬取页面内容。

Client Component 的优点:交互性：需要用户交互的部分，比如按钮、表单、输入框等，适合使用客户端组件。这些组件可以响应用户的操作，并在浏览器中动态更新 UI。
状态管理和事件处理：客户端组件能够使用 React 的 useState、useEffect 等钩子来管理本地状态和处理副作用（如 AJAX 请求、事件监听等）。
用户体验：为了提高用户体验，页面的一部分通常会使用 Client Component，例如需要在浏览器中动态更新的部分，而页面的其他部分仍然可以使用 Server Component。

布局将与 /dashboard 和 /dashboard/settings 页面共享.就是说/dashboard的layout,/dashboard/settings也能享受到. 例子中使用的是一个nav加上{children},当/dashboard/settings时,nav仍然存在, children就是本页pagejs了.

根布局就是app直属的layout必须有.   只有根布局可以包含 <html> 和 <body> 标记。 

布局（layout）：布局是跨多个页面或路由共享的组件。布局在页面之间导航时不会被卸载，这意味着它可以在客户端保留状态，并且跨多个页面保持不变。布局的一个关键特性是持续存在，即使用户在路由之间导航，布局也不会被重新渲染或重新创建新的 DOM 元素。

模板（template）：模板和布局非常相似，它们也可以封装页面的结构并在多个路由之间共享，但与布局不同，模板在导航时为其每个子节点创建一个新实例。这意味着每当用户在共享同一个模板的路由之间导航时，模板会为每个子节点（页面）生成一个全新的实例。这不仅会导致新的 DOM 元素被创建，而且客户端组件中的状态也不会被保留，所有的 effects（如数据获取、事件监听等）会重新同步。(!!!就是弄一个点击计数的button,更换页面之后会清0)

什么是元数据？
元数据是用来描述页面或组件的一些信息的，如：
title：网页的标题，通常会显示在浏览器的标签页上。
description：网页的简短描述，搜索引擎和社交平台会用它来展示页面的摘要。
keywords：页面的关键字，帮助搜索引擎理解页面的主题。
viewport：浏览器如何渲染页面的视口设置，影响移动端页面的显示效果。
robots：告诉搜索引擎是否应该索引页面内容。
这些信息会放在页面的 <head> 标签中，对于提升网页的 SEO 和用户体验非常重要。
metadata API 只!!!能在服务端组件中使用


// 在 Next.js 中，为了顺利创建一个新的路由并使用这些特定的文件（`layout.js`、`template.js`、`error.js`、`loading.js`、`not-found.js` 和 `page.js`），你可以参考以下示例代码。这些文件的主要目的是为页面提供布局、错误边界、加载状态、404 页面等支持功能。

// 假设你已经在 `app/dashboard/settings/` 路径下创建了这些文件，这里是各个文件的简单示例代码。

// 1. `layout.js` (全局布局)
// `layout.js` 用于为页面提供布局，通常包含页面的头部、底部等通用部分。

// // app/dashboard/settings/layout.js
// export default function Layout({ children }) {
//   return (
//     <div>
//       <header>
//         <h1>Dashboard Settings</h1>
//       </header>
//       <main>{children}</main>
//       <footer>
//         <p>Footer content here</p>
//       </footer>
//     </div>
//   );
// }
// 2. `template.js` (可选的模板)
// `template.js` 主要用于控制动态内容的渲染。可以用作模板来渲染多次，适合处理多次渲染的情况。

// ```jsx
// // app/dashboard/settings/template.js
// export default function Template({ children }) {
//   return (
//     <div>
//       <h2>Settings Template</h2>
//       {children}
//     </div>
//   );
// }
//  3. `error.js` (React 错误边界)
// `error.js` 是用于捕获 React 渲染过程中的错误。
// // app/dashboard/settings/error.js
// 'use client'; // React 错误边界需要在客户端渲染中使用

// import { useEffect } from 'react';

// export default function Error({ error, reset }) {
//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//       <button onClick={() => reset()}>Try again</button>
//     </div>
//   );
// }
// 4. `loading.js` (React suspense 边界)
// `loading.js` 用于在页面加载时显示加载状态。
// ```jsx
// // app/dashboard/settings/loading.js
// export default function Loading() {
//   return <div>Loading...</div>;
// }
// 5. `not-found.js` (React 错误边界，处理 404 页面)
// `not-found.js` 用于处理找不到页面时显示的内容。
// // app/dashboard/settings/not-found.js
// export default function NotFound() {
//   return (
//     <div>
//       <h1>Page Not Found</h1>
//       <p>We couldn't find the page you're looking for.</p>
//     </div>
//   );
// }
// 6. `page.js` (主要页面内容)
// `page.js` 是你的主页面组件，显示主要的内容。
// // app/dashboard/settings/page.js
// export default function Page() {
//   return <h1>Welcome to the Settings Page!</h1>;
// }
// 7. `nested layout.js` (可选，嵌套布局)
// 如果你需要在某个子路由下再有一个嵌套布局，可以在该子目录下创建一个 `layout.js`。
// // app/dashboard/settings/nested/layout.js (如果有嵌套页面结构)
// export default function NestedLayout({ children }) {
//   return (
//     <div>
//       <h2>Nested Settings Layout</h2>
//       <section>{children}</section>
//     </div>
//   );
// }
// 目录结构示例：
// app/
//   └── dashboard/
//       └── settings/
//           ├── layout.js
//           ├── template.js
//           ├── error.js
//           ├── loading.js
//           ├── not-found.js
//           └── page.js
```

## 链接和导航

```js
interface UserParams {
  params: {
    id: string;
  };
}
//提供类型安全，确保 params 属性包含一个 id 字符串。

export default function User({ params }: UserParams) 
//从 props 中解构出 params，使得可以直接使用 params。
{
  return ()
  }

{posts.map((post) => (
  <li key={post.id}>
    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
  </li>
))}
//用于遍历 posts 数组，将每个博客文章对象转换为 JSX 元素。
//href={/blog/${post.slug}}：使用模板字符串生成动态路径。例如，如果 post.slug 是 my-first-post，链接将变为 /blog/my-first-post。$就是模板字符串


pathname 是一个表示当前浏览器地址栏中路径部分的字符串，通常用于以下效果：

高亮当前页面：通过比较 pathname，可以动态添加类名（如 active），高亮显示用户当前所在的导航链接。这有助于用户快速识别自己在哪个页面。
检测当前路径，以高亮显示导航菜单中的活动链接，提升用户体验：
const isActive = pathname === '/';
return <Link className={isActive ? 'active' : ''} href="/">Home</Link>;

.active类,添加阴影效果使元素更显眼。高亮同理
.active {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

条件渲染：可以根据 pathname 的值来决定显示或隐藏特定组件或内容。例如，某些链接或按钮可以在特定页面上可用或不可用。
根据 pathname 的值，动态渲染不同的组件或内容。例如：
if (pathname === '/about') {
  return <AboutComponent />;
} else if (pathname === '/contact') {
  return <ContactComponent />;
}
根据不同的路径加载相应的数据：
useEffect(() => {
  if (pathname === '/posts') {
    fetchPosts();
  } else if (pathname.startsWith('/posts/')) {
    fetchPostDetails(pathname.split('/').pop());
  }
}, [pathname]);

路由逻辑：在复杂的应用中，pathname 可用于实现特定的路由逻辑，比如根据不同路径加载不同的数据或组件。
根据当前路径决定是否需要重定向用户到其他页面：
if (pathname === '/old-path') {
  router.push('/new-path');
}
检测用户的访问权限，根据路径决定用户是否可以访问某些页面：
if (pathname === '/admin' && !userIsAdmin) {
  router.push('/unauthorized');
}

SEO优化：虽然不是直接作用，但通过正确管理 pathname 和链接，可以提高网站的可爬行性和用户体验，有助于搜索引擎优化。

使用场景示例：
在一个导航菜单中，当用户访问 /about 页面时，About 链接会被高亮，以告知用户他们当前所处的位置。
在应用的某些功能（如按钮或表单）上，可以根据当前路径来决定是否显示这些功能。
总结  pathname 的主要作用是在用户界面中提供上下文，帮助用户理解他们在应用中的位置，并根据该信息动态调整 UI。


所谓滚动到id就是浏览器的左右箭头来回摆弄

<link>的prefetch可以自己设置T或F

```

## 路由

```js
路由组不影响http:就是(自己起名)的文件夹:  URL 中将省略括号中的文件夹（例如(marketing)或(shop) ）。 一个括弧()文件夹里面是一个组,组外的布局\其它组 不影响布局

根布局\括弧里面的布局 是用来组织相同\近似的\相关的页面的, 前提是你得删除总根布局.

路由组的命名除了用于组织之外没有特殊意义。它们不影响 URL 路径。
包含路由组的路由不应解析为与其他路由相同的 URL 路径。例如，由于路由组不会影响 URL 结构， (marketing)/about/page.js和(shop)/about/page.js都会解析为/about并导致错误。
如果您使用多个根布局而没有顶级layout.js文件，则您的 home page.js文件应在路由组之一中定义，例如： app/(marketing)/page.js 。
跨多个根布局导航将导致完整页面加载（与客户端导航相反）。例如，从使用app/(shop)/layout.js /cart导航到使用app/(marketing)/layout.js的/blog将导致整个页面加载。这仅适用于多个根布局。

动态路由:
// 发送请求并获取数据
const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json());
// 输出获取到的原始数据,如下
console.log(posts);
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit..."
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint..."
  },
  ...
]

// 提取 slug（使用 id 作为示例的 slug）
const slugs = posts.map(post => ({
  slug: post.id,
}));
// 输出提取的 slugs,如下
console.log(slugs);
[
  { "slug": 1 },
  { "slug": 2 },
  ...
]

就是能不能抓到[...slug]的可以抓/a /a/b  /a/b/c,但是[[...slug]]可以抓空/

记得把loading.js放在文件夹中

SSR服务器端渲染

流式传输:像水一样高优先级和不依赖数据的先传输,就是说页面中主体先出来,评论区这些稍后;而不是全加载完再解析显示
<React.Suspense fallback={<Loading />}>
  <UserProfile />
</React.Suspense>
1. <React.Suspense>
作用：React.Suspense 是 React 提供的一个内置组件，它用于包裹那些需要等待异步操作完成的组件（例如数据获取、动态导入等）。它定义了一个“边界”，在这个边界内，如果某些组件正在加载或者等待数据时，Suspense 会显示一个备用的 UI。
例子：当 UserProfile 组件在等待数据时，Suspense 会显示 fallback 里指定的内容。在数据加载完成后，Suspense 会卸载 fallback 内容，并显示实际的内容（即 UserProfile）。

export import是什么东西 导出就是这里的东西会被解析成机器码出去发挥作用; 导入是吧别的地方的机器码\轮子搞过来用

错误组件可以使用reset()函数来提示用户尝试从错误中恢复。执行时，该函数将尝试重新渲染错误边界的内容。如果成功，后备错误组件将替换为重新渲染的结果。
就是说再渲染一遍,看看能不能行得通

根app/error.js边界不会捕获根app/layout.js或app/template.js组件中引发的错误。要专门处理这些根组件中的错误，请使用位于根app目录中的名为app/global-error.js的error.js变体。与根error.js不同， global-error.js错误边界包裹了整个应用程序，并且其后备组件在活动时替换根布局。因此，需要注意的是， global-error.js必须定义自己的<html>和<body>标记。global-error.js是最细粒度的错误 UI，可以被视为整个应用程序的“包罗万象”错误处理。它不太可能经常被触发，因为根组件通常不太动态，并且其他error.js边界将捕获大多数错误。即使定义了global-error.js ，仍然建议定义一个根error.js ，其后备组件将在根布局中呈现，其中包括全局共享的 UI 和品牌。
就是说根error.js不抓本级的错误;你得专门global-error.js处理(它得替换有毛病的布局组件,里面错误囊括的很多),  仍然建议再搞一个errorjs


```

## next

啥是nextjs 用来建全栈的react框架（即用它的组件来构建页面）

可以使developer少一些做配置 多做程序本身 个人弄和大团队合作都适用

特点：路由 抓数 渲染（静动） 造型 优化 ts

两路由：app路由和page路由 app路新一点可用react的服务器组件和streaming功能

必备知识：对html css react有基本的了解

layout里面有个html>和body> 要是你忘创建了 服务器会自动dev一个layout

public里面藏静态资产：图片 字体等

顶级文件夹：app pages public src

顶级文件：next.config.js Next配置

1.package.json 项目依赖项和脚本

2.instrumentation.ts  OpenTelemetry and Instrumentation 文件

3.middleware.ts下一页请求中间件

4..env 环境变量

5..env.local局部环境变量

6..env.production生产环境变量

7..env.development开发环境变量

8..eslintrc.json ESLint 配置

9..gitignore要忽略的 Git 文件和文件夹

10.next-env.d.ts TypeScript 声明文件

11.tsconfig.jsonTS配置文件

12.jsconfig.jsonjs配置文件

```js
<ul>
package.json 项目依赖项和脚本
instrumentation.ts  OpenTelemetry and Instrumentation 文件
middleware.ts下一页请求中间件
.env 环境变量
.env.local局部环境变量
.env.production生产环境变量
.env.development开发环境变量
 .eslintrc.json ESLint 配置
.gitignore要忽略的 Git 文件和文件夹
 next-env.d.ts TypeScript 声明文件
 tsconfig.jsonTS配置文件
<jsconfig.jsonjs配置文件
</ul>
```

app路由文件起名习惯：  

特殊文件：-app -document -error 404 500

路由：1夹：index folder 2：index file

动态路由：文件夹习惯[folder]/index动态路由段

 [...folder]/index Catch-all 路由段

[[...folder]]/index可选的全能路线段

文件习惯[file]动态路由段

[...file]Catch-all 路由段

[[...file]]可选的全能路线段

## 各个文件夹一般放什么东西

app中放route components和逻辑

  其lib中放utility函数和默认函数
  其ui中放ui组件：卡片 表格 窗体

publi中放static asse如图像等

scripts中放种子设定脚本 用它来填数据库

## 获取数据

使用服务器组件获取数据  在lib的data.ts文件中用import从数据库中拿sql过来

从data。ts中那取“值”函数 在export中定义一个变量 把取到的传给这个变量

最后在组件（表格 卡片 窗体）代码中用这个变量即可

一般情况下，数据获取是瀑布流 按代码前后执行

如果想并行获取 在datats中使用await Promise。all

## 静态动态渲染

静态渲染可以立马做好端上来，利于排名，一般对于非定制内容比较便利

动态适合实时 特定内容 请求时间

如何是仪表板动态化？在datats中，import一个unstable nostore从next cache，然后在对应的组件export后第一项就用nostore。 tip：nostore cookie都是动态函数

如何模拟低速数据获取  await new Promise((resolve) => setTimeout(resolve, 3000));

## streaming

分块，平行处理，防止加载阻塞

第一种:用loadingtsx/整页整页 还可以在里面塞骨架 import skeleton export skeleton

第二种：流式传输组件/悬挂   首先就不能data里面拿fetchrenevue 要从react拿suspense和从skeletons拿revenuechartskeleton  然后在main里面加入一个悬挂语句=await fetchRevenue();   tip：悬挂没有正确答案 按需  是一个强大的api

## 部分预渲染partial render

悬挂被优先视作预渲染

建库减延迟，即本地有一个。服务器和数据库之间尽量少

隔开处理，防止加载的慢的影响整个页面的加载。

## 搜索和分页pagination

所谓通过url搜索参数，是在现有的url上继续加东西，使得内容呈现的越来越具体。比如从笔记本到5000的笔记本到5000的灰色笔记本

搜索 第一步:抓搜索框中用户键入的东西 建一个handlesearch函数 然后在框上放一个onchange监听器用这个函数(效果:控制台会有你的输入)
     第二步:用键入的东西更新url:从navigation中usesearchparams并传给一个变量 对此变量使用urlsearchparams格式化传给给个新参数
 if判别它是否为空  然后替换
     第三步:使url与输入同步 有query就给表单元素defaultvalue 没有就没值
     第四步：更新表格 await fetchfilteredinvoices给invoices

debouncng：是为了不要键入中实时不停的去search数据

添加分页：page页import fetchinovicepage 用来查询page数   然后将totalpages给pagination组件 然后创一个createpageurl函数一是旧的url而是当前的page数三是新的url

## mutating data

服务器操作："Server Actions" 就是后台管理员执行的一系列操作，以响应前台收银员和顾客的需求，确保购物过程正常进行。用form元素来invoke这个操作

revalidatePath and revalidateTag.用来验证相关缓存  功效：allows users to interact with the form and submit data even if the JavaScript for the form hasn't been loaded yet or if it fails to load.

创建发票的过程：1创建一个表单来抓数据  这里是发票表单

2从表单中唤醒创建的sa 在lib中actionsTs中'use server';创一个异步叫ci接收formdata ci向action传

3在sa中从formdata中提数据  actionts

4验证并准备插入数据 类型验证导入zod对象和强制更改 以美分存储amount乘以100 创建新日期

5插入数据并处理错误 import sql 然后取发票中的值传入变量

6重新验证并向用户带回应该的界面 去缓存重新生成和重新导航一个有新篇的地址 这两功能都是先import 再用

更新发票（跟创一个发票差不多）：
在ui的Table中弄一个UpdateInvoice接收发票    在UpdateInvoice组件搞一个链接到动态路由段

造一个page 从params上读id

fetch：
id给sa
即
从 formData 中提数据

用 Zod（一个 TypeScript 友好的数据验证库）定义一个发票数据模型，确保符合预期的类型结构，如发票号码为字符串，金额为数字等.确保数据的一致性和完整性。

将金额转换为美分 可以编写一个函数

将变量传递给 SQL 查询：将经过验证和转换的数据插入数据库。涉及使用一个 SQL 查询字符串，其中包含占位符，后将验证后的数据作为变量传递给查询

调用 re validatePath 以清除客户端缓存并发出新的服务器请求：清除客户端缓存并在下一次用户请求时重新生成页面。确保在浏览发票列表时获得最新的数据。

调用 re direct 以将用户重定向到发票页面：成功插入新票后，将用户重定向到新生成的发票页面，以便查看和确认新建。

总之，上述步骤描述了从前端表单收集数据，验证和处理数据，然后将数据传递到后端进行数据库操作，并在必要时刷新客户端缓存和导航用户的一系列操作。这是一个通用的工作流程，具体的实现方式可能因应用的需求而有所不同。

删除发票：
创一个deleteinovoice在actions中 记得加一个revalidatepath 但注意不用redirect了 因为就在本页

搞一个删除按钮 是一个包 装在ui的button中

## 处理错误

在sa中添加try/catch   actionsts中

```js
try { } catch (error) {return { };
```

方法一：errortsx界面怎么写 首先use client 然后一个是error属性prop 一个是try again的button  

方法二：notFound函数来处理404error

notFound先于error，便于表达更加具体的错误。  error多用来给用户回退（先抓捕错误）

## improve access

用eslint检查

三件事改进：semantic html、label、focus outline

客户端表单检查和服务器端表单检查

添加aria标签 这是一个对视障人士友好的功能  Accessible Rich Internet Applications

## Authentication和Authorization

造登录的路径 loginPage在login文件夹里

用NextAuth.js来authen：setup authorjs

添加authorcofig

config中检查语句（authconfig中）

中间件保护路由

authts来密码哈希

``import Credential``并填充 然后建一个从数据库查用户的函数 调用bcrypt看密码一致吗 一致则返回用户 不一致则返回null

更新login form使其和auth logic链接 ：在actions中authenticate函数 在loginform中处理error用useformstate来处理表单挂起

添加登出功能：/ui/dashboard/sidenav.tsx中添加signout函数

## 添加matadata

元数据是用来seo的 服务搜索引擎 面向被搜索编程

网站图标和open graph

页面标题和说明  只有内1层可以继承 外面的主标题
