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

model逻辑和数据存取view界面呈现 controller接受输入并调用m和v

abc都有狗，a有12，b有3，c没有

main里面是重定向函数

pet里面是show、edit、update；还有view，有showejs和editejs

user里面是展示、编辑、更新、列表；还有view，edithbs、listhbs、showhbs

user-pet里面是创建宠物路由，和用户相关路由关联

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

```js
if (obj.engine) app.set('view engine', obj.engine);
  app.set('views', path.join(__dirname, '..', 'controllers', name, 'views'));
    for (var key in obj) {
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      switch (key) {
        case 'show':
          method = 'get';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'list':
          method = 'get';
          url = '/' + name + 's';
          break;
        case 'edit':
          method = 'get';
          url = '/' + name + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          url = '/' + name + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          url = '/' + name;
          break;
        case 'index':
          method = 'get';
          url = '/';
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }
      handler = obj[key];
      url = prefix + url;
      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
      } else {
        app[method](url, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
      }
    }
    parent.use(app);
  });
};
```

自动生成express路由的模块

如果obj中有engine，就将其设置为视图引擎

视图模板的存放路径

遍历obj属性

跳过特殊属性

根据属性名生成路由配置

生成相应http方法和url，

有objbefore，加进路由配置里

使用express的http方法设置路由

输出一些日志信息，表示已经设置对应的路由。

将生成的程序挂载在父类中

lib总之，就是基于对象obj生成路由，支持一些方法配置。好处是简单自定义对象来创建组织，利于模块化和维护

## online和redis包

Tracking online user activity with online and redis packages用online和redis包追踪用户行为，显示用户列表

```javascript
app.use(function(req, res, next){
  online.add(req.headers['user-agent']);  // 在每个请求中，将用户代理信息添加到在线用户列表
  next();
});
```

将用户信息添加到在线用户列表

```javascript
function list(ids) {
  return '<ul>' + ids.map(function(id){
    return '<li>' + id + '</li>';
  }).join('') + '</ul>';
}
```

生成列表

```javascript
app.get('/', function(req, res, next){
  online.last(5, function(err, ids){
    if (err) return next(err);
    res.send('<p>Users online: ' + ids.length + '</p>' + list(ids));  // 返回包含在线用户数量和用户列表的HTML响应
  });
});
```

走一个get请求，显示在线用户数量

总之，用redis存表，然后用户加入的信息可以进表。get请求可以显示最新的用户表

## route parameters

效果是：/user/1或0或2 1显示是lobi 2是tj 这样，即不同的路由下的页面展示

   ```javascript
   app.param(['to', 'from'], function(req, res, next, num, name){
     req.params[name] = parseInt(num, 10);
     if( isNaN(req.params[name]) ){
       next(createError(400, 'failed to parseInt '+num));
     } else {
       next();
     }
   });
   ```

appparam是路由参数处理器，parseint赋给reqparamsname。判reqparamsname，inNaN表示如果是数组字则fasle，执行else；跟数无关的话，传给createerror中间件处理。

   ```javascript
   app.param('user', function(req, res, next, id){
     if (req.user = users[id]) {
       next();
     } else {
       next(createError(404, 'failed to find user'));
     }
   });
   ```

根据userid判断，如果没有，走createerror中间件；有执行next

   ```javascript
   app.get('/', function(req, res){
     res.send('Visit /user/0 or /users/0-2');
   });
   ```

走/路径，send到页面展示：visit /user/0

   ```javascript
   app.get('/user/:user', function (req, res) {
     res.send('user ' + req.user.name);
   });
   ```

走/user/1路径，就send信息到页面：user tobi或者user tj

   ```javascript
   app.get('/users/:from-:to', function (req, res) {
     var from = req.params.from;
     var to = req.params.to;
     var names = users.map(function(user){ return user.name; });
     res.send('users ' + names.slice(from, to + 1).join(', '));
   });
   ```

走/users/0-2路径，就send信息到页面：user tj tobi loki

## resource

Multiple HTTP operations on the same resource基于同一资源库的http操作 建了一个RESTful资源（users）

   ```javascript
   app.resource = function(path, obj) {
     this.get(path, obj.index);
     this.get(path + '/:a..:b.:format?', function(req, res){
       var a = parseInt(req.params.a, 10);
       var b = parseInt(req.params.b, 10);
       var format = req.params.format;
       obj.range(req, res, a, b, format);
     });
     this.get(path + '/:id', obj.show);
     this.delete(path + '/:id', function(req, res){
       var id = parseInt(req.params.id, 10);
       obj.destroy(req, res, id);
     });
   };
   ```

get所有用户列表

get范围内的用户，range返回格式format

get指定的id用户

删掉指定的id用户

   ```javascript
   var User = {
     index: function(req, res){
       res.send(users);
     },
     show: function(req, res){
       res.send(users[req.params.id] || { error: 'Cannot find user' });
     },
     destroy: function(req, res, id){
       var destroyed = id in users;
       delete users[id];
       res.send(destroyed ? 'destroyed' : 'Cannot find user');
     },
     range: function(req, res, a, b, format){
       var range = users.slice(a, b + 1);
       switch (format) {
         case 'json':
           res.send(range);
           break;
         case 'html':
         default:
           var html = '<ul>' + range.map(function(user){
             return '<li>' + user.name + '</li>';
           }).join('\n') + '</ul>';
           res.send(html);
           break;
       }
     }
   };
   ```

定义了一个user，里面有四个方法 `index`, `show`, `destroy`, 和 `range`

index:返回用户列表
show：返回特定的id要不就是报错
destroy：删除特定用户id 用三元运算符表示如果删了就是destroyed如果没有就是cannotfinduser
range：如果是json格式，发range数组；如果是其它的，转换为li元素，连成字符串，发给客户端。

## route-map

routes using a map具体没懂，但是可以用/users/1/pets

定义一个函数，内含http方法，然后调用

   ```javascript
   app.map = function(a, route){
     route = route || '';
     for (var key in a) {
       switch (typeof a[key]) {
         case 'object':
           app.map(a[key], route + key);
           break;
         case 'function':
           if (verbose) console.log('%s %s', key, route);
           app[key](route, a[key]);
           break;
       }
     }
   };
   ```

接受两个参数，路由的对象和路径。属性是object，搜寻街道；属性是function，标记此物的位置

   ```javascript
   var users = {
     list: function(req, res){
       res.send('user list');
     },
     get: function(req, res){
       res.send('user ' +  escapeHtml(req.params.uid));
     },
     delete: function(req, res){
       res.send('delete users');
     }
   };

   var pets = {
     list: function(req, res){
       res.send('user ' + escapeHtml(req.params.uid) + '\'s pets');
     },
     delete: function(req, res){
       res.send('delete ' + escapeHtml(req.params.uid) + '\'s pet ' + escapeHtml(req.params.pid));
     }
   };
   ```

总之，用嵌套对象定义映射路由，方便添加修改路由

## route-middleware

user/0/edit就ok，但是user/1/edit就报错。路由中间件，基本的身份认证，

   ```javascript
   var users = [
     { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' },
     { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' },
     { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
   ];
   ```

一个虚拟数组，有四个属性

   ```javascript
   function loadUser(req, res, next) {
     var user = users[req.params.id];
     if (user) {
       req.user = user;
       next();
     } else {
       next(new Error('Failed to load user ' + req.params.id));
     }
   }
   ```

loaduser中间件，如果找到用户，则将用户id附在请求的对象上；如果没有，抛出failed to load user 9  

   ```javascript
   function andRestrictToSelf(req, res, next) {
     if (req.authenticatedUser.id === req.user.id) {
       next();
     } else {
       next(new Error('Unauthorized'));
     }
   }
   ```

andRestrictToSelf 中间件 ，检查当前id是否和已认证？正在查看?的相同，不同，抛出，unauthorized

   ```javascript
   function andRestrictTo(role) {
     return function(req, res, next) {
       if (req.authenticatedUser.role === role) {
         next();
       } else {
         next(new Error('Unauthorized'));
       }
     }
   }
   ```

andrestrictto检查名叫role的属性是否匹配

   ```javascript
   app.use(function(req, res, next){
     req.authenticatedUser = users[0];
     next();
   });
   ```

faux模拟身份认证，真实应用是怎么样操作的呢？

   ```javascript
   app.get('/', function(req, res){
     res.redirect('/user/0');
   });
   app.get('/user/:id', loadUser, function(req, res){
     res.send('Viewing user ' + req.user.name);
   });
   app.get('/user/:id/edit', loadUser, andRestrictToSelf, function(req, res){
     res.send('Editing user ' + req.user.name);
   });
   app.delete('/user/:id', loadUser, andRestrictTo('admin'), function(req, res){
     res.send('Deleted user ' + req.user.name);
   });
   ```

redirect重定向

总之，验证授权，并可以在确定用户下执行特定操作

## route-separation

Organizing routes per each resource为每个资源流组织路由，主页有两个按钮，分别是进入posts页面和users页面

这是一个使用Node.js和Express框架构建的Web应用程序的部分代码。以下是对这段代码的解释：

```javascript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
if (!module.parent) {
  app.use(logger('dev'));
}
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);
app.get('/posts', post.list);
```

设置视图引擎为ejs，设置视图文件夹路径，添加日志中间件

使用methodoverride中间价；cookie的parse；使用expressurlcoded中间件，解析请求中的数据；静态文件服务中间件，指定public目录

显示users页面、user1、user1view、user1edit和posts页面

总之，index中视图引擎、静态文件目录、中间件、首页、用户相关路由、帖子相关路由。可以有列表，查看信息、编辑信息

```javascript
exports.list = function(req, res){
  // 渲染名为 'posts' 的视图，并传递一个包含标题和帖子数据的对象
  res.render('posts', { title: 'Posts', posts: posts });
};
```

第一个‘posts’是文件名；后面是一个数据对象，包含一个title和post数组，post数组用的是之前定义的数组；这样就渲染了

```html
<dl id="posts">
  <% posts.forEach(function(post) { %>
    <dt><%= post.title %></dt>
    <dd><%= post.body %></dd>
  <% }) %>  
</dl>
<%- include('../footer') -%>
```

自定义一个列表，起个名字
ejs模板语法 dt插入帖子标题；dd插入帖子正文
一个名为footer的外部模板

## search

search API

```javascript
var db = redis.createClient();
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
db.sadd('ferret', 'tobi');
db.sadd('ferret', 'loki');
db.sadd('ferret', 'jane');
db.sadd('cat', 'manny');
db.sadd('cat', 'luna');
app.get('/search/:query?', function(req, res){
  var query = req.params.query;
  db.smembers(query, function(err, vals){
    if (err) return res.send(500);
    res.send(vals);
  });
});

app.get('/client.js', function(req, res){
  res.sendFile(path.join(__dirname, 'client.js'));
});
```

创建redis实例；将public设置为静态文件跟目录

向redis数据库加入数据

获取集合中与查询匹配的所有成员，send回客户端

sendfile发送文件

## session

user session,第一次访问吗？第2、第3、第4直到第n次 即跟踪用户访问的次数

```javascript
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));
```

使用expresssession中间件，resavefalse意味着你（用户）不改的话默认就不保存；saveuninitialized不创建未初始化的，意思就是你没存数据我就不给你创会话；secretkeyboard cat用来签名会话id的密钥，防篡改，可是任意字符串

```javascript
app.get('/', function(req, res){
  var body = '';
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});
```

如果存在reqsessionviews，则在原有的基础上加1；不存在，给reqsessionviews赋1，body给一个句子。不管如何都send一个view？times

## static-files

静态文件，通过更改路由来显示文件。如/hello/txt

```javascript
// 记录请求日志
app.use(logger('dev'));
// express 默认不理解 "文件" 的概念。express.static() 中间件检查与 `req.path` 匹配的文件，
// 在传递给它的目录中查找。例如 "GET /js/app.js" 将在 "./public/js/app.js" 中查找。
app.use(express.static(path.join(__dirname, 'public')));
// 如果你想要添加 "前缀"，你可以使用 Connect 提供的挂载特性，例如
// "GET /static/js/app.js" 而不是 "GET /js/app.js"。
// 挂载路径 "/static" 在传递控制给 express.static() 中间件之前会被简单地移除，
// 因此它会正确地通过忽略 "/static" 来服务文件。
app.use('/static', express.static(path.join(__dirname, 'public')));
// 如果由于某种原因你想要从多个目录中提供文件，你可以多次使用 express.static()！
// 在这里我们传递 "./public/css"，这将允许 "GET /style.css" 而不是 "GET /css/style.css"：
app.use(express.static(path.join(__dirname, 'public', 'css')));
```

用logger中间件请求日日志
用expresstatic中间件将public文件夹设置为静态根目录，便于浏览器访问
用/static置换/public
用/public/css当静态根目录，也就是说css文件夹中的文件访问时可以直接打在主路由上

## vhost

使用虚拟主机，不同子域名来处理不同的请求。意思就是sub.google.com和google.com,用户的导向不一样，但是可以在同一服务器上托管域名

```javascript
/*
edit /etc/hosts:
127.0.0.1       foo.example.com
127.0.0.1       bar.example.com
127.0.0.1       example.com
*/
if (!module.parent) main.use(logger('dev'));
main.get('/', function(req, res){
  res.send('Hello from main app!');
});
main.get('/:sub', function(req, res){
  res.send('requested ' + req.params.sub);
});
var redirect = express();
redirect.use(function(req, res){
  if (!module.parent) console.log(req.vhost);
  res.redirect('http://example.com:3000/' + req.vhost[0]);
});
var app = module.exports = express();
app.use(vhost('*.example.com', redirect)); // 将所有子域名请求导向 Redirect app
app.use(vhost('example.com', main)); // 将主域名请求导向 Main server app
```

如果module中没有爹件，使用logger中间件请求日志

根路径请求

带有子路径的请求，返回request和reqparamssub

如果module中没有爹件，重定向到example3000

使用vhost中间件，将请求导向redirectapp、main sever app

## view-constructor

Rendering views dynamically,所谓动态渲染视图，就是给一个视图模板，什么人的文章进来我都用这个模板去呈现。方便app适应不同内容和需求、维护修改。

   ```javascript
   app.engine('md', function(str, options, fn){
     try {
       var html = md(str);
       html = html.replace(/\{([^}]+)\}/g, function(_, name){
         return options[name] || '';
       });
       fn(null, html);
     } catch(err) {
       fn(err);
     }
   });
   ```

注册md引擎，它用来将md渲染成html。

定义一个md函数，它是一个转换器

replace方法  没懂！ ，前是正则表达式，/是开始符号，/g是global全局匹配，\{是匹配左花括号，右花括号亦然，^}表示除了右花括号的字符，+号表示匹配一或多个  整个replace后面的内容就是匹配所有{}内的内容

optionname中有值就把模板中的换掉，没有就用空串

fn回调函数，传递第一个参数null表示没错误，第二个参数html传给回调参数

转换过程出现错误，则catch抓到，会fn传出去err的消息

总之，就是md转成html，转成之后替换模板。出错了，则。。。

   ```javascript
   app.set('views', 'expressjs/express');
   ```

指定视图文件（，前是‘views’）的根目录是expresssjs/express

   ```javascript
   app.set('view', GithubView);
   ```

设置一个名为githubview的视图构造器，这个是自定义的。

   ```javascript
   app.get('/', function(req, res){
     // 渲染与仓库相关的视图，app.locals、res.locals 和传递的 locals 变量的工作方式与通常相同。
     res.render('examples/markdown/views/index.md', { title: 'Example' });
   });
   ```

用，后的内容渲染，前的目标文件

   ```javascript
   app.get('/Readme.md', function(req, res){
     // 渲染来自 https://github.com/expressjs/express/blob/master/Readme.md 的视图
     res.render('Readme.md');
   });
   ```

当访问/readme路径时，用来自github中的read.md渲染视图

```javascript
module.exports = GithubView;
```

导出了GithubView，使得其他文件或模块可使用

```javascript
/**
 * Custom view that fetches and renders
 * remove github templates. You could
 * render templates from a database etc.
 */
function GithubView(name, options){
  this.name = name;
  options = options || {};
  this.engine = options.engines[extname(name)];
  // "root" is the app.set('views') setting, however
  // in your own implementation you could ignore this
  this.path = '/' + options.root + '/master/' + name;
}
```

定义了一个函数，两个参数。传进来的模板name给this。name中；options有值就给options，没有就给空值
从options.engines对象中获取引擎，用来渲染模板？
构造github上模板的路径

```javascript
/**
 * Render the view.
 */
GithubView.prototype.render = function(options, fn){
  var self = this;
  var opts = {
    host: 'raw.githubusercontent.com',
    port: 443,
    path: this.path,
    method: 'GET'
  };
  https.request(opts, function(res) {
    var buf = '';
    res.setEncoding('utf8');
    res.on('data', function(str){ buf += str });
    res.on('end', function(){
      self.engine(buf, options, fn);
    });
  }).end();
};
```

定义上面函数上的render方法，用来渲染视图。

var opts构造了一个包含请求参数的选项对象，用于向 GitHub 发送 GET 请求获取模板文件的内容 ？

https.request 使用 Node.js 的 https模块发起请求，获取 GitHub 上模板文件的内容 ？

res.on data当收到数据时，将数据累加到缓冲区 buf中。

res.on end当数据接收完成时，调用回调函数，将缓冲区中的数据传递给self.engine进行渲染。

self.engine使用之前从 options.engines 中获取的引擎（可能是 Markdown 渲染引擎等）来渲染模板文件的内容，并将结果传递给回调函数 fn。

总之，是自己定义一个自定义的视图构造器，它用来接github上获取的模板，这很动态

## view-locals

Saving data in request object between middleware calls，

不同方式获取用户数量和列表，将之传给视图

   ```javascript
   function ferrets(user) {
     return user.species === 'ferret';
   }
   ```

判断userspecies的属性是否等于ferret字符串，返回true或者false

   ```javascript
   app.get('/', function(req, res, next){
     User.count(function(err, count){
       if (err) return next(err);
       User.all(function(err, users){
         if (err) return next(err);
         res.render('index', {
           title: 'Users',
           count: count,
           users: users.filter(ferrets)
         });
       })
     })
   });
   ```

如果异步操作中发生了错误，调用nexterr将错误传递

usercount后，即已获取用户列表了，render渲染index视图，传数据给title、count、users

总之，获取用户数量、过滤列表、传递信息

   ```javascript
   function count(req, res, next) {
     User.count(function(err, count){
       if (err) return next(err);
       req.count = count;
       next();
     })
   }
   function users(req, res, next) {
     User.all(function(err, users){
       if (err) return next(err);
       req.users = users;
       next();
     })
   }
   app.get('/middleware', count, users, function (req, res) {
     res.render('index', {
       title: 'Users',
       count: req.count,
       users: req.users.filter(ferrets)
     });
   });
   ```

count和users获取用户数量和列表

将这些数据给后续处理函数，最后render渲染

   ```javascript
   function count2(req, res, next) {
     User.count(function(err, count){
       if (err) return next(err);
       res.locals.count = count;
       next();
     })
   }
   function users2(req, res, next) {
     User.all(function(err, users){
       if (err) return next(err);
       res.locals.users = users.filter(ferrets);
       next();
     })
   }
   app.get('/middleware-locals', count2, users2, function (req, res) {
     res.render('index', { title: 'Users' });
   });
   ```

count2和users2将用户数量和列表放入reslocals。渲染视图时，通过reslocals获取数据

   ```javascript
   app.use(function(req, res, next){
     res.locals.user = req.user;
     res.locals.sess = req.session;
     next();
   });
   app.use('/api', function(req, res, next){
     res.locals.user = req.user;
     res.locals.sess = req.session;
     next();
   });
   app.all('/api/*', function(req, res, next){
     res.locals.user = req.user;
     res.locals.sess = req.session;
     next();
   });
   ```

全局中间价和路由中间价演示，全局的local变量可供后续使用
