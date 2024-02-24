# express

## 1

计算机的文档一般不是给非专业人士看的，揭示技术性细节而不是力求讲的通俗易懂。

vscode中，蓝色：关键字和语法元素if return function var

棕色深绿：字符串 文本

注释：灰 绿

错误：红 橙

高亮、选中:淡蓝色

版本控制：已修改绿色 已添加 蓝色

先做起来再说，哪怕一件事很困难，就像魔法刚开始的第一步，如果不是冲动，我根本接触不到y，学不会。现在再也不为各种魔法方式担心。

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

## 路由

var ？= require('？');是用来引用的

设置视图文件夹路径，设置什么什么文件夹路径；设置视图引擎为

使用日志中间件，可将请求和响应的相关信息给到控制台

解析请求体中的json数据

使用cookieparse解析中间件

使用替换路径名称，从public换为static

将某路径映射到什么什么Router上，处理相关请求

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

## examples

在控制台的常规操作：一般用来理解、调试、测试函数
1.调用函数，直接调用，传参，后执行。
2.consolelog加函数查看函数定义
3.查看函数返回值 与2大致相同，不过log的函数后跟了括号的
4.查看函数参数，也是用consolelog
5.查看函数属性
6.重新定义函数，y=func加新parameter
7.定义一个匿名函数
8.定义一个箭头函数
9.编写递归函数并调用

node.js应用程序来跑案例中的配置文件 运行node a.js

## auth是为authentication

概述：点击登录，跳出认证错误；点击禁止页，跳出'你被否了'。填入正确的账号密码，跳出通过核准。此时再点击禁止页按钮，跳入新页面；点击登出按钮。

```js
app.use(express.urlencoded({ extended: false })):用来解析表单中的输入，发给您一个地方req.body 中

app.use(session({ resave: false, saveUninitialized: false, secret: 'shhhh, very secret' })):

resave: false saveUninitialized: false意思是你没更改，就不存。

secret: 'shhhh, very secret' 加强安全性

app.use(function(req, res, next){...}:中间件，请求来了才执行它的动作
var err = req.session.error; 和 var msg = req.session.success;:抓错误和成功消息
delete req.session.error; 和 delete req.session.success;:删掉之前的错误和成功消息，防污染
res.locals.message = '';:建一个本地变量用来做展示准备
```

```js
if (err) res.locals.message = '<p class="msg error">' + err + '</p>'; 如果err存在，则上句的本地变量塞东西进来 if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';:同理
```

next();:调用 next()，

总的来说，是展示对错的消息

```js
var users = { tj: { name: 'tj' } };:创建一个对象，里面有一个叫tj的对象，它有个name属性，这个属性是tj

hash({ password: 'foobar' }, function (err, pass, salt, hash) {...}:hash接收一个passwor对象

function (err, pass, salt, hash) { if (err) throw err; ... }:

if (err) throw err;:

users.tj.salt = salt; 和 users.tj.hash = hash;:如果抛出错误，则将salt和hash给用户对象中（一般工作中会传回企业的数据库）
```

总体来说，创一个tj，hash一个到数据库

先验用户名，然后验密码的hash值

## content negotiation

概述：就是从database中拿数据，传到页面上？不很懂

## Working with cookie-based sessions基于页面cookie的动作

用cookie session中间件记录访问次数appusecount

## Working with cookies使用cookie

没懂

```js
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'))
app.use(cookieParser('my secret here'));
app.get('/', function(req, res){
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
  }
});
app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});
app.post('/', function(req, res){
  var minute = 60000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});
```

如果环境不是测试环境，则使用 morgan 中间件记录请求的方法和URL。

使用 cookie-parser 中间件，并提供一个密钥（"my secret here"）用于签名和验证 Cookie。

处理根路径 / 的 GET 请求。根据请求中的 Cookie 显示相应的页面内容。

处理 /forget 路径的 GET 请求。清除名为 'remember' 的 Cookie 并重定向回原始页面。

处理根路径 / 的 POST 请求。根据提交的表单内容设置名为 'remember' 的 Cookie 并重定向回原始页面。

## 下载

路由：提供指定路径的文件，若存在，则下载；不存在返回404并报告错误

```js
app.get('/files/:file(*)', function(req, res, next){
  res.download(req.params.file, { root: FILES_DIR }, function (err) {
    if (!err) return; // file sent
    if (err.status !== 404) return next(err); // non-404 error
    // file for download not found
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  });
});
```

无错误，返回；有错误，是非404的吗，是跳下一个中间件处理，不是非404的（即404），状态码和消息整上

## ejs

Embedded JavaScript templating (ejs)使用嵌入式js模板

```js
app.use(express.static(path.join(__dirname, 'public')));
```

从public文件夹中取你要用的css脚本

## 创建错误界面

设置路由 /500 /404 /403的各个函数

捕获错误，状态码，渲染视图

## error

迷糊

```js
if (!test) app.use(logger('dev'));
function error(err, req, res, next) {
  if (!test) console.error(err.stack);
  res.status(500);
  res.send('Internal Server Error');
}
app.get('/', function () {
  throw new Error('something broke!');
});
app.get('/next', function(req, res, next){
  process.nextTick(function(){
    next(new Error('oh no!'));
  });
});
app.use(error);
```

检查test变量，若为假，则请求记录；为真，跳过

error函数：如果test为假，则打印，状态码设500，发送字符串“报错”

定义一个路由函数：出现错误时抛出，给到下一个件

当访问/next时，往下传

总之：设置、使用错误处理中间件，何时抛出、处理错误

## hello world

appget / function res send helloworld

```js
app.get('/', function(req, res){
  res.send('Hello World');
});
```

## md模板引擎

不懂，用md渲染界面？

```js
app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    var html = marked.parse(str).replace(/\{([^}]+)\}/g, function(_, name){
      return escapeHtml(options[name] || '');
    });
    fn(null, html);
  });
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'md');
app.get('/', function(req, res){
  res.render('index', { title: 'Markdown Example' });
});
app.get('/fail', function(req, res){
  res.render('missing', { title: 'Markdown Example' });
});
```

自定义一个md引擎，读md文件并转换为html

视图模板文件的存放位置为当前目录下的views

去扩展名使用render的准备工作

访问/时，渲染index并传递数据

当访问/fail时，渲染 'missing' 视图，并传递数据。

## multiple Express routers

多个express路由，就是不同路由

apiv1get和apiv2get

## multipart-encoded forms

多部分编码的表单，上传一文件和它的名字

```js
  form.on('error', next);
  form.on('close', function(){
    res.send(format('\nuploaded %s (%d Kb) as %s'
      , image.filename
      , image.size / 1024 | 0
      , title));
  });
  form.on('field', function(name, val){
    if (name !== 'title') return;
    title = val;
  });
  form.on('part', function(part){
    if (!part.filename) return;
    if (part.name !== 'image') return part.resume();
    image = {};
    image.filename = part.filename;
    image.size = 0;
    part.on('data', function(buf){
      image.size += buf.length;
    });
  });
  ```

formerror了调next

解析表单，send一个含结果的响应

监听表单字段，如果字段名跟title一样，给title

监听文件格式，是image就给一个初始化的对象；监听data事件计算图像大小。

总之：处理表单上传，监听不同事，处理错误、获文件信息、以及获取表单字段值

## MVC-style controllers

abc都有狗，a有12，b有3，c没有

model逻辑和数据存取view界面呈现 controller接受输入并调用m和v

```js
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.response.message = function(msg){
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};
if (!module.parent) app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(function(req, res, next){
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  next();
  req.session.messages = [];
});
require('./lib/boot')(app, { verbose: !module.parent });
app.use(function(err, req, res, next){
  if (!module.parent) console.error(err.stack);
  res.status(500).render('5xx');
});
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});
```

设置视图引擎为ejs，即用ejs模板来呈现视图

视图模板的存放路径为当前目录的views夹中

resmessage方法来存和检索信息

morgan中间件记录请求日志

使用expressstatic中间价：提供静态服务

expresssession中间价:会话支持，存储检索用户信息

urlencoded中间件：传入请求的表单，放进reqbody中

methodoverride中间件：查询参数来覆盖http请求方法

自定义中间件：将会话中的信息给视图

通过/lib/boot路径加载控制器和应用模块

错误处理中间件：有错误。控制台记录，渲染5xx视图

404处理中间件：渲染404视图，显示请求原始url

总之，写一些中间件，设置视图引擎，启用会话支持，提供静态服务，加载控制器，并处理错误和404

## Simple request handler简单的访问
