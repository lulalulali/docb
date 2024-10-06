# nextLearn

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

<!-- <ul>
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

</ul> -->

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
