---
id: 111
title: docusaurus笔记
tags:
  - 标签1
  - 标签2
---

静态站点生成器  

单页的

react来自meta

svg文件是基于数学工具矢量画图的xml文件

v2版本完全重写了逻辑 v1正在被弃用

是由一组npm包构成

StackBlitz、CodeSandbox都是代码沙盒，是在线的集成环境、部署环境。

## 配置

docusaurus.config.js中有各种方式声明它的配置

.yml或.yaml是配置文件、数据交换及各种数据表示

baseUrl是根路径，默认是你的主文件夹

i18n: defaultLocale: 'en',locales: ['en','zh-Hans'] 意思是默认语是，语库含的语是。

plugin可功能扩展、可插拔的（选择性启用）

customFields用于添加自定义的配置

配置放在单独的js中可以提高响应速度、适用于非全局配置的、高复用的情况；放在config.js中用于全局的、集中管理。

babel是用来使配置更为简洁，转化优化代码适应部署要求的东西

添加typescript支持的流程：npminstall然后创tsconfig.json加入‘带括号的’语句 随后就可以在docus。config。js中使用ts配置了

无关：在上面一行的句子括号里面加入‘括号’  在ms里是不可以的，跑不通。

## 页面

基于react的，所以和next的路由习惯相似

页面没有侧边栏，只有文档才有

路由：一个组件一个文件夹，里面包含了这个页面基本上所有相关的东西

以下短横线开头的文件会被路由系统忽视。

对于重复路由，docu只展示最后一个，其它全被覆盖。

## 文档

从高到低是：插件实例 版本 侧边栏 独立页面

仅文档模式没看懂，大致意思是把文档放在根下面，毙掉config.js中blog文件夹的插口，当然了 ，你扔也可以启用blog文件夹的路由。

此文档开头就是标签：1.id是文档的唯一识别符，是可以自己定义的，所以我用111置换的时候，文档的对应链接也发生了变化

2.slug是更牛更简洁的置换，比如slug：1，则url会变成/doc/1，可从它在的docs中直接连写；如果想在根目录下，则slug：/

3.tags就是文档底部写点标签，有助于阅读？

## 侧边栏

细节：我是手打的侧边栏，可以试一试像模板一样，总配置写一点，然后文件夹内写个配置文件，分散包裹

Hideable sidebar可隐藏的sidebar，对小屏幕友好

侧边栏的配置跟next的路由很相似，依赖文件名

customProps中有badges、tags、languages、featured、difficulty、catergories、author、relatedlinks。这种自加的属性对于react组件的

breadcrumbs就是在侧边栏实施嵌套，折中折，折叠的折

## 侧边栏项目

type指的是当前所在行的type

label就是这行（折叠也好不折叠也好）显示个什么名字

href链接到google

html怎么用的？

doc文档界面link外部连接category下拉表autogenerated自动生成侧边栏html展示存html展示一个实实在在的html ref连接一个页面但是不参与导航

```js
 type: 'autogenerated';
 dirName: '.';
 ```

自动生成侧边栏

在配置中自定义侧边栏生成器：async

使用多个侧边栏举例就是tutorialSidebar：和apiSidebar:

然后在md顶写上

```md
---
displayed_sidebar: apiSidebar或tutorialSidebar
---

上一页和下一页的导航是默认根据侧边栏显现的

ref项目不参与导航的，但是适用于其他侧边栏转入链接

## 分化版本

## blog

blogSidebarTitle
blogSidebarCount: 'ALL'
