# html

目的是按计算机的逻辑写出code并运行，根据结果体会过程，从一个个例子反馈中抽象出cs的道理（数学思维）
两个问题：计算机的语言体系是什么样的    我想使出现的路径用计算机语言怎么说

## pp

## 问题

html中无法注释?  不是的   用<!-- -->单行多行都可以

<!-- strong里面从very开始字体都变黑了的原因是后面的</strong>没用/  或者只嵌入一个<strong> -->
<!-- <i>italy斜体<b>bold<u>underline -->
p paragraph  em  emphasis

p里面可以嵌a    p是块 就算写在一起也会自动换行

<!-- <a>中title用来悬停提示  为什么title不加‘’ 也不影响悬停? -->

有很多字符集utf8 16 32 iso asc2 big5等等

如果你去掉路径前面的 /，比如写成 cattongjimulu.jpg，这个路径会被解释为相对于当前页面的路径。也就是说，它会在当前页面所在的文件夹中寻找这个图片。
确保路径的正确性非常重要。如果你的图片位于根目录下，就使用 /cattongjimulu.jpg；如果图片与 HTML 文件在同一目录下，可以使用 cattongjimulu.jpg。

h7不用 可以使用层叠样表

红底白字为什么字不是淡绿 为什么没跟着变   答：本是绿色的 后又执行了红底白字

rel 属性有多种用途，它是一种用于描述文档之间关系的标准属性

为什么ppp和color运行不显示颜色差异

ol和ul运行出来的一个无序号 一个自动有

total base里的红框’

看不懂 ： $= 表示选择以特定字符串结尾的属性值。如果你使用 href$=".org"，它将选择所有 href 属性以 ".org" 结尾的元素。同样地，href$=".com" 会选择所有 href 属性以 ".com" 结尾的元素。
所以，如果你同时使用了 href$=".org" 和 href$=".com" 这两个选择器，它们会选择分别以 ".org" 和 ".com" 结尾的元素，而这可能导致重叠的选择，例如 .com 结尾的链接同样也会匹配 .org 结尾的选择器规则。
如果你想单独选择以 ".org" 结尾的元素，你可以使用

```js
href="<https://www.example.org>"
```

这样的精确匹配规则。
问：为什么无法控制下划线 怎么做到

暂时还没看出来a.link和a.visited的作用

水果b
苹果b
香蕉b
橙子b
   生物
动物界b
植物界
细菌
真菌
原生生物   为什么 因为css中写的只管li child
我想实现仅仅 加粗 水果和生物  即在ol中控制 加粗

open sans 和sans serif （css里的）不懂是什么逻辑  就是我想换字体怎么弄

快要疯了 =号究竟最接近什么意思

怎么封掉一大段代码 很多注释符一起用的逻辑

main1 js定义变量换某内容  学到了在控制台运行条件句  用条件句换地址完成换图片 调用api 点按钮输内容 条件句审核替换现有内容 存入api

 为什么我的

```js
 <http://iirationalexuberant.github.io/打不开里面的html>
```

 display :block或者inline block

 在引用对象之前必须确保该对象已经存在

 number-game-errors中按教程加.报错是什么情况  加错地方了 原因是没明白逻辑 .selector

 ===/!==与==/！=   三个=更严格 测值 也测数据类型

网页上play是怎么用的

browserType.slice(0, 3);

'moz'
browserType.slice(1);

'ozilla'
browserType.slice(2);

'zilla'
browserType.slice(3);

'illa'
browserType.slice(4);

'lla'
browserType.slice(5);

'la'
browserType.slice(6);

'a'
browserType.slice(7);

''
browserType.slice(0);

'mozilla'

12.20 从数组学起
  
  23tianqi 怎么点击不显示

  12.21  上午一小时 晚上若干小时

  12.22 下午3点开始学    学到晚上9点图书馆关门
        没起名字的function  就是当一段打包好的执行句
        既然ai能写出代码  我需要做的是什么呢  我该怎么发现需求怎么用怎么创造怎么解决一个个有价值的好问题

  12.23    学到8点   names.filter(isShort) filter是指对names使用isshort的规则
  同样的 myText.replace("string", "sausage")也是

为什么30里面 171开始infinite？
31中btn.removeEventListener("click", changeBackground）放在前面跑不出来  可以阻止监听动作
33中为什么跑不出来效果
12.24   830开始学习  35第一次跑不出来  是因为{}（）的逻辑没搞清楚 把ison切换放到事件外面了
33event3点击把分按钮变成相应的颜色怎么做  
12.26 20点30开始
12.27  8点到下午4点
       36无法分清什么是自带词和编写人创造的词
12.28  840开始18
    38js很难理解
12.29  8开始 11
12.30   930开始到16
