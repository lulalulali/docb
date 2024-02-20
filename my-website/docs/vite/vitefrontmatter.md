# frontmatter

## 用法

YAML 是 "YAML Ain't Markup Language" 的递归缩写。这是一种人类可读的数据序列化格式，主要用于配置文件和数据交换的格式。YAML 被设计为易于阅读，并且可以直接用于编程语言中的数据结构。 YAML 不是标记语言（Markup Language），因此它的主要目标是强调数据的表现形式的可读性。

在 YAML Frontmatter 中，你可以定义一些元数据，这些元数据会在处理文件时被提取并用于各种用途，比如配置页面标题、日期、作者等。 Frontmatter 通常被包裹在三虚线 `---` 之间，如下所示：

```yaml
---
title: My Page
date: 2024-01-11
author: John Doe
---
```

在这个例子中，`title`、`date`、和 `author` 是 YAML 格式的键值对，它们构成了 Frontmatter 的一部分。
这句话指的是 VitePress 支持在其所有的 Markdown 文件中使用 YAML frontmatter，并使用 gray-matter 库来解析这个 frontmatter。

1. **YAML Frontmatter：** YAML（YAML Ain't Markup Language）是一种人类可读的数据序列化格式，经常用于配置文件、数据交换、以及文档。在 Markdown 文件中，可以通过 YAML frontmatter 来定义一些元数据，比如配置项、页面标题、日期等。Frontmatter 通常被包裹在三虚线 `---` 之间，如下所示：

    ```markdown
    ---
    title: My Page
    date: 2024-01-11
    customConfig: true
    ---
    
    # Markdown Content
    ```

2. **gray-matter：** gray-matter 是一个 JavaScript 库，专门用于解析和提取 Markdown 文件中的 frontmatter。它能够将 Markdown 文件拆分为内容（content）和 frontmatter（metadata），方便程序对它们进行处理。VitePress 使用 gray-matter 来处理 Markdown 文件中的 frontmatter。

因此，上述这句话的意思是，VitePress 允许你在其所有的 Markdown 文件中使用 YAML 格式的 frontmatter，并且它使用 gray-matter 来解析这些 frontmatter，以便在构建或渲染过程中能够方便地访问和处理这些元数据。

## 其它frontmatter格式

VitePress 支持 JSON 格式的 frontmatter，你可以使用花括号 `{}` 包裹元数据。以下是三个 JSON 格式的 frontmatter 的例子：

1. **基本的 JSON Frontmatter:**

    ```markdown
    ---
    {
      "title": "My Page",
      "date": "2024-01-11",
      "author": "Jane Doe"
    }
    ---
    
    # Markdown Content
    ```

2. **包含数组的 JSON Frontmatter:**

    ```markdown
    ---
    {
      "title": "My Page",
      "tags": ["programming", "web development", "vitepress"],
      "categories": ["tech", "tutorials"]
    }
    ---
    
    # Markdown Content
    ```

3. **嵌套的 JSON Frontmatter:**

    ```markdown
    ---
    {
      "title": "My Page",
      "metadata": {
        "date": "2024-01-11",
        "author": "John Doe"
      },
      "tags": ["programming", "web development", "vitepress"]
    }
    ---
    
    # Markdown Content
    ```

在这些例子中，frontmatter 部分都是用 JSON 格式表示的，而且都被包裹在 `---` 虚线之间。这样的格式使得你可以更灵活地组织和表示你的元数据。无论是使用 YAML 还是 JSON，VitePress 都能够正确地解析 frontmatter 中的元数据。

titleTemplate标题模板

head头
Default Theme Only仅默认主题
layout布局
hero英雄
features特征
navbar导航栏
sidebar边栏
aside旁边
outline大纲
lastUpdated最近更新时间
editLink编辑链接
footer页脚
pageClass页面类

## description描述

```md
---
description: "This is a description for this specific page."
---
# Page Content
```

在上面的例子中，这个页面具有自己独特的描述，而不是使用站点级别的描述。搜索引擎和其他工具可以使用这个描述来更好地了解页面的内容。

## head

在 VitePress 中，`head` 是页面的元数据之一，用于指定要在页面的 `<head>` 部分中插入的额外标签。这允许你向页面添加自定义的 `<meta>`、`<link>`、`<script>` 等标签，以满足特定需求，比如添加网站图标、引入外部样式表或脚本等。

以下是一些马上可以运行的例子：

1. 添加自定义图标：

```markdown
---
head:
  - ['link', { rel: 'icon', href: '/custom-icon.ico' }]
---
# Page Content
```

2.引入外部样式表：

```markdown
---
head:
  - ['link', { rel: 'stylesheet', href: 'https://example.com/custom-style.css' }]
---
# Page Content
```

3.插入自定义 JavaScript：

```markdown
---
head:
  - ['script', { src: '/custom-script.js' }]
---
# Page Content
```

这些例子中，`head` 字段是一个数组，每个元素是一个包含两个元素的数组，第一个元素是标签类型，第二个元素是包含标签属性的对象。这些标签将被添加到页面的 `<head>` 部分。你可以根据需要灵活使用这个功能来自定义页面的头部标签。

## aside

将此值设置为 false 可禁用侧边栏容器。
将此值设置为 true 会将侧边栏渲染到右侧。
将此值设置为 left 会将侧边栏渲染到左侧。

## outline

上面的说明是关于 VitePress 中的 `outline` 配置项，用于指定大纲（outline）中显示的标题级别。这个配置项可以在页面级别配置中使用，并且如果设置了，会覆盖站点级的配置（即 `config.themeConfig.outline.level`）。

具体解释:

- `类型：number | [number, number] | 'deep' | false`：说明了 `outline` 的值可以是一个数字、数字范围的数组、字符串 `'deep'` 或者 `false`。

- `默认值：2`：如果未设置，大纲默认显示到标题级别 2。

以下是一些简单的例子：

1. 设置大纲显示到标题级别 3：

```yaml
---
layout: page
outline: 3
---
# Page Content
```

2.设置大纲显示到标题级别 4 到 6：

```yaml
---
layout: page
outline: [4, 6]
---
# Page Content
```

3.设置大纲显示到最深的标题级别：

```yaml
---
layout: page
outline: 'deep'
---
# Page Content
```

4.禁用大纲：

```yaml
---
layout: page
outline: false
---
# Page Content
```

你可以尝试运行这些例子，以查看它们在页面中的效果。
注意：大纲指的是本页大纲 即右边本页栏 数字2就是展示2级纲  3就是三级的纲

## fm中的editlink和footer和pageclass都是开关语句
