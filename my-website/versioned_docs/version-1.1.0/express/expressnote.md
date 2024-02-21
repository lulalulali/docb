# express

## 1

计算机的文档一般不是给非专业人士看的，揭示技术性细节而不是力求讲的通俗易懂。

vscode中，蓝色：关键字和语法元素if return function var
棕色深绿：字符串 文本
注释：灰 绿
错误：红 橙
高亮、选中:淡蓝色
版本控制：已修改绿色 已添加 蓝色

先做起来再说，哪怕一件事很困难，就像魔法刚开始的第一步，如果不是冲动，我根本接触不到y，学不会。现在再也不为各种方式担心。
哪怕不是高手，是萌新，可以装作自己很会，坚持下来，慢慢的，我真的就是了。

## 配置

关于配置的问题，在搞不清楚背后的内核之前，多试几次，多问问gpt，说不定就实现了

put是更新、放上一个新的资源
post是发一个、上传一个
delete是删一个

app.use(express.static('public'))就是允许找public下的文件

app.use('/static', express.static('public'))就是输static能找public的文件

app.use('/static', express.static(path.join(__dirname, 'public')))最好用绝对路径，因为express的运行目录。

多个回调函数处理一个路由，（）中的，后用next

回调函数组处理路由就是，后[]弄几个回调函数

独立函数和函数组处理，就是按序添加。

app.route()就是用来减少书写量的，可以把同一路由的put。post。get搞一起。

express.route  先在另一个js中创建route模块，然后在appjs中用app.use('/myroute', router);

## 中间件

中间件函数按序加载

有mylog中间件函数

有requesttime中间件函数

有validatecookies中间件函数 ：外部异步服务来验证 try catch模式

可配置的中间件:弄一个middleware.js来，写接受选择对象或其他参数的函数；然后``app.use(mw({ option1: '1', option2: '2' }))``来使用中间件。

## 使用中间件

中间件是干嘛的?是在到达路由之前或之后运行的函数

路由处理器?是指定的路由被匹配时执行的函数

应用级：

绑定到app object

没挂路径，即use后括号没有路径

挂在在路径上就是特定路径才启用

使用 next('route') 传给下一个路由，一般会用if条件句判断一下

路由器级：就是route.get

绑定到 express.Router()

错误处理中间件：

就是(err, req, res, next)

内置中间件：

express.static或者e.json或urlencode

第三方中间件：

要先装$ npm install cookie-parser 然后是定义变量const cookieParser = require('cookie-parser')然后用起来app.use(cookieParser())

## 覆盖expressAPI

两个扩展点:express.request 和 express.response  与   app.request 和 app.response 。

分别是特定原型和全局原型

什么叫状态码?statuscode 200表示ok 404表示未找到 500表示错误 内容类型分文本\图像\json数据 消息即主体内容

方法:引擎设计.通过自己写覆盖现有的status,包括签名和行为

属性:性能调整 分配的和定义的 分配的无法覆盖

原型:新的轮胎 建议仅在应用程序级执行该操作

1是上线不了 没弄了 2是有些文档不是按添加代码达到一整个项目这样的思路设计的，我如何正确添加，尤其是涉及到js的核心的内容
