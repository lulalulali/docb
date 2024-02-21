---
title: configset
titleTemplate: Vite & Vue powered static site generator
description: persondescription
editLink: true
# layout: doc
navbar: true
# sidebar: 'auto'
---

## 简介

`vite` 是 VitePress 中的一个配置选项，允许你传递原始的 Vite 配置给内部的 Vite 开发服务器或打包工具。这个选项允许你对 Vite 进行更细致的配置，以满足特定的开发或生产需求。

举例来说，如果你想要修改 Vite 的一些默认行为，比如更改默认的端口号、配置自定义插件、或者进行其他定制化的配置，你可以这样使用：

```javascript
// .vitepress/config.js

module.exports = {
  vite: {
    // 自定义 Vite 配置
    // 这里可以传递所有 Vite 支持的选项，比如修改端口号、配置插件等
    // 详细配置可参考 Vite 官方文档：https://vitejs.dev/config/
    // 例如修改默认端口号为 8080
    server: {
      port: 8080
    },
    // 自定义插件等其他配置...
  }
};
```

在这个示例中，`vite` 配置项允许你传递任何符合 Vite 配置的选项给内部的 Vite 实例，从而定制 Vite 的行为以满足项目的需求。这样你可以更灵活地配置 Vite，例如修改开发服务器的端口号、添加自定义插件或中间件等。详细的配置选项可以参考 Vite 的官方文档。

## 配置是否正确加载

你可以通过一些方法来确认 VitePress 是否正确加载了 `vitepress/config.js` 文件的配置：

1. **重启服务器**：在更改配置后，重启 VitePress 的开发服务器。在终端中停止运行的 VitePress 服务，然后重新运行，确保它能够读取新的配置文件。

2. **检查控制台输出**：当 VitePress 服务启动时，通常会在终端或命令行中输出一些信息，包括是否成功加载了配置文件。查看终端输出，确认是否有关于配置文件加载的信息。

3. **查看页面**：在浏览器中查看 VitePress 生成的页面，检查导航栏、侧边栏等页面元素是否与你在 `vitepress/config.js` 中配置的内容相匹配。检查页面是否显示了你配置的导航链接或其他定制内容。

4. **日志文件**：VitePress 可能会生成日志文件或记录服务运行信息。查看日志文件，可能会有关于加载配置的信息或其他有用的信息。

5. **调试工具**：使用浏览器的开发者工具（比如 Chrome DevTools）检查页面元素，确认导航栏、侧边栏等元素是否按照你的配置正确显示。

通过以上方法，你可以验证 VitePress 是否成功加载了配置文件并按照你的预期进行了设置。如果你仍然遇到问题，可以提供更多细节，我会尽力帮助你解决。

## `.vitepress/config.js` 文件是用来配置 VitePress 站点的，它允许你自定义许多方面，包括但不限于以下内容

### 主题配置 (themeConfig)

- **导航栏 (nav)**: 设置顶部导航栏的链接。
- **侧边栏 (sidebar)**: 配置侧边栏内容，指定各个页面的侧边栏链接。
- **搜索框 (search)**: 配置搜索功能，指定搜索框的位置和搜索功能的行为。
- **最后更新时间 (lastUpdated)**: 显示页面的最后更新时间。
- **页面标题 (pageTitle)**: 设置页面标题的模板。

### Markdown 配置

- **Markdown 配置 (markdown)**: 自定义 Markdown 渲染器的配置，例如设置代码块的行号等。

### 语言配置 (locales)

- **多语言支持 (locales)**: 如果你的站点需要多语言支持，你可以配置不同语言的页面内容。

### 插件配置 (plugins)

- **插件配置 (plugins)**: 配置并使用 VitePress 插件来增强站点的功能，比如 Google Analytics 插件、Markdown 插件等。

### 网站元数据

- **标题 (title)**: 设置站点的标题。
- **描述 (description)**: 设置站点的描述。
- **基本路径 (base)**: 设置站点的基本路径，影响站点部署在子路径的情况。

### 自定义页面

- **首页 (home)**: 设置站点的首页路径。
- **404 页面 (notFound)**: 自定义 404 页面的路径。

### 其他配置

- **别名 (alias)**: 设置别名来简化导入路径。
- **文件目录 (dirs)**: 配置自定义文件目录。

以上列出的配置仅是其中的一部分，`.vitepress/config.js` 允许你配置的选项很多，你可以根据需要和你的站点特性进行自定义配置，以满足项目的需求并定制化你的 VitePress 网站。

### lang语句

当你在文档或网页中使用 `lang` 语句时，你可以指定不同的语言，以适应特定的语言环境和需求。以下是几个示例：

1. `lang: 'zh-CN'`：指定文档或网页的主要语言为中文（简体中文）。

2. `lang: 'es-ES'`：表示文档或网页的主要语言是西班牙语（西班牙）。

3. `lang: 'fr-FR'`：将文档或网页的主要语言设置为法语（法国）。

4. `lang: 'ja-JP'`：用于指定文档或网页的主要语言为日语（日本）。

这些语句用于标识文档的主要语言，以便浏览器、搜索引擎和其他工具能够正确地处理和呈现内容。它有助于提高文档的可访问性和全球适用性。

## description

这段代码 `export default { description: 'A VitePress site' }` 导出的对象包含一个 `description` 属性。在 VitePress 中，这个属性会被用作页面 HTML 中的 `<meta>` 标签的描述（description）属性的内容。

在 HTML 中，`<meta>` 标签通常用于提供关于文档的元数据。其中，`description` 属性用于提供对文档的简短描述。这样的描述通常会在搜索引擎结果中显示，帮助用户了解页面的内容。

例如，渲染后的 HTML 可能如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 其他头部内容... -->
  <meta name="description" content="A VitePress site">
  <!-- 其他<meta>标签... -->
</head>
<body>
  <!-- 页面内容... -->
</body>
</html>
```

在这个例子中，`<meta>` 标签的 `name` 属性设置为 "description"，而 `content` 属性则设置为你在配置中定义的描述内容，即 'A VitePress site'。

这样，当搜索引擎抓取并索引你的网页时，它们可以使用这个描述信息来生成搜索结果的摘要，帮助用户更好地理解页面的内容。

## head中添加谷歌字体的确认方法

要确认网页是否成功加载上述代码添加的链接，你可以使用浏览器的开发者工具进行检查。以下是一些步骤：

1. 打开你的网页，右键点击页面上的任何元素，然后选择“检查”或“审查元素”（Inspect）。

2. 在开发者工具中，切换到“网络”（Network）选项卡。

3. 刷新页面。

4. 在网络请求列表中，你应该能够看到与你添加的链接相关的请求。在这个例子中，你应该能够看到与 `https://fonts.googleapis.com` 和 `https://fonts.gstatic.com` 相关的预连接请求，以及与字体样式表 `https://fonts.googleapis.com/css2?family=Roboto&display=swap` 相关的请求。

5. 确保这些请求的状态码为 200（成功），并且没有其他错误。

如果所有这些链接请求都成功，并且没有出现错误，那么你可以确认网页成功加载了上述代码中添加的链接。如果有错误，开发者工具通常会提供有关错误的详细信息，以帮助你诊断和解决问题。

## 检查是否成功注册service worker

上面的代码看起来是为了注册 Service Worker，用于实现网页的离线支持等功能。要确认这段代码是否正常起作用，你可以按照以下步骤进行检查：

1. 打开你的网页。

2. 在浏览器中右键点击页面上的任何元素，然后选择“检查”或“审查元素”（Inspect）。

3. 在开发者工具中，切换到“控制台”（Console）选项卡。

4. 如果 Service Worker 注册成功，你应该能够在控制台中看到类似的消息，表明 Service Worker 注册已经完成：

   ```sql

   Service Worker registration successful with scope: ...
   ```

   或者

   ```yaml
   Service Worker registration failed: ...
   ```

   这些消息将告诉你注册是否成功以及注册的范围。

5. 如果 Service Worker 注册失败，控制台中可能会提供有关失败原因的详细信息。你可以根据这些信息来调试并解决问题。

确保你的网页在一个支持 Service Worker 的环境中运行，如在 HTTPS 协议下或 localhost。此外，检查 `/sw.js` 文件是否存在且包含正确的 Service Worker 代码。

通过上述步骤，你应该能够确认代码是否成功注册 Service Worker。

## 要使上面的 Service Worker 注册代码正常运行，需要确保以下几个方面的设置

1. **HTTPS 协议：** Service Workers要求在 HTTPS 协议下运行。确保你的网页是通过 HTTPS 访问的。

2. **正确的文件路径：** 确保 `/sw.js` 文件存在，并且路径是正确的。这个路径是相对于你网站的根目录的，确保它能够正确找到并注册 Service Worker。

3. **Service Worker 代码：** 确保 `/sw.js` 文件中包含正确的 Service Worker 代码。Service Worker 的代码应该负责缓存你需要的资源，以便在离线时提供服务。

4. **浏览器支持：** 确保你的浏览器支持 Service Worker。大多数现代浏览器都支持 Service Worker，但一些旧版本或不支持的浏览器可能会导致问题。

5. **页面作用域：** Service Worker 注册的范围需要正确设置。通常情况下，你可以将 Service Worker 注册到网站的根目录，如 `/`。

确保满足上述条件，并在浏览器控制台查看是否有任何与 Service Worker 相关的错误或成功消息。如果有错误消息，它们将提供有关问题的详细信息，帮助你调试和解决问题。

## config resolution

配置文件总是从 root/.vitepress/config.ext 解析，其中 root是 VitePress 项目根目录，[ext] 是支持的文件扩展名之一。开箱即用地支持 TypeScript。支持的扩展名包括 .js、.ts、.mjs 和 .mts

## 如何主题配置导航栏

在 VitePress 的 `config.js` 中，要配置主题以定制导航栏，你需要使用 `themeConfig` 中的 `nav` 属性。以下是一个示例：

```javascript
// .vitepress/config.js

module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }, // 链接到首页
      { text: 'Guide', link: '/guide/' }, // 链接到指定页面
      { text: 'External', link: 'https://external-link.com' } // 链接到外部页面
      // 可以继续添加其他导航链接
    ]
  }
}
```

这个示例展示了如何配置主题的导航栏。`nav` 属性是一个数组，数组中的每个对象代表导航栏中的一个链接。每个链接对象有两个属性：

- `text`：显示在导航栏中的文本。
- `link`：链接的目标路径，可以是相对路径（指向项目中的某个页面）或绝对路径（指向外部链接）。

在这个示例中：

- `Home` 链接到项目的根路径。
- `Guide` 链接到项目中的 `/guide/` 路径。
- `External` 链接到一个外部页面 `https://external-link.com`。

你可以根据需要添加更多的导航链接，每个链接都是一个对象，配置其对应的文本和目标路径即可。

## config 的js和ts同时出现

不可以 会冲突 只保留一种

## 建议在配置文件中使用 ES 模块语法

ES（ECMAScript）模块语法是 JavaScript 中用于模块化编程的一种标准。它允许开发者将代码分割成不同的模块，每个模块可以导出（export）特定功能，并在其他地方引入（import）这些功能。

下面是三个例子，说明了ES模块语法的用法：

### 1. 导出和引入变量/函数

```javascript
// 模块A：export.js
export const name = 'Alice';
export function greet() {
  return `Hello, ${name}!`;
}

// 模块B：import.js
import { name, greet } from './export.js';

console.log(name); // 输出 'Alice'
console.log(greet()); // 输出 'Hello, Alice!'
```

在这个例子中，`export.js`模块导出了一个常量`name`和一个函数`greet()`。在`import.js`模块中，使用`import`语法引入了这些导出的变量和函数，然后可以在`import.js`中使用它们。

### 2. 默认导出和引入

```javascript
// 模块C：defaultExport.js
const defaultGreeting = 'Hi there!';
export default defaultGreeting;

// 模块D：importDefault.js
import defaultGreeting from './defaultExport.js';

console.log(defaultGreeting); // 输出 'Hi there!'
```

在这个例子中，`defaultExport.js`模块默认导出了一个常量`defaultGreeting`。在`importDefault.js`模块中，使用`import`语法并指定`default`关键字，直接导入了`defaultExport.js`模块的默认导出。

### 3. 模块间相互引用

```javascript
// 模块E：moduleOne.js
import { greet } from './export.js';

export function greetTwice() {
  return `${greet()} ${greet()}`;
}

// 模块F：moduleTwo.js
import { greetTwice } from './moduleOne.js';

console.log(greetTwice()); // 输出 'Hello, Alice! Hello, Alice!'
```

在这个例子中，`moduleOne.js`模块引入了`export.js`模块中导出的`greet`函数，并在自己的`greetTwice()`函数中调用了两次`greet()`，然后将结果导出。`moduleTwo.js`模块引入了`moduleOne.js`模块导出的`greetTwice()`函数，并在控制台输出了结果。

ES模块语法使得 JavaScript 中的模块化更加清晰和灵活，允许开发者组织和管理代码，提高了可维护性和重用性。

### 是一种调用，从其它地方调用制造好的功能  先进口 后出口 先import 后export

## 站点配置

### type HeadConfig =

#### 这段代码是 TypeScript 中的类型定义。它定义了一个名为 `HeadConfig` 的联合类型，该类型可以是两种不同结构的元组之一

1. `[string, Record<string, string>]`: 这个元组包含两个元素。第一个元素是一个字符串，第二个元素是一个键值对对象，其中键和值都是字符串类型的数据。这种结构可能用于表示配置信息，例如某种数据的头部配置，其中字符串可能是配置的名称，而对象则是相关配置项及其对应的值。

2. `[string, Record<string, string>, string]`: 这个元组包含三个元素。前两个元素的含义与上面相同，第三个元素是一个字符串。这种结构可能表示一个带有额外信息的头部配置，其中第三个字符串可能是与配置相关的额外描述或标识。

这种类型定义可以在 TypeScript 中用于声明变量或函数参数的类型，以确保代码中使用的数据结构符合预期的格式，有助于提高代码的可读性和可维护性。

在实际应用中，这种类型定义可以用于表示各种配置信息或数据结构，例如在一个前端应用中，表示不同组件或模块的配置；或者在后端中，表示请求的特定参数结构。

类似的例子可能涉及到不同类型的配置信息或元数据的描述。例如，表示不同类型的用户配置，文件的元数据，或者是系统中不同组件的设置等等。

当我们定义 `HeadConfig` 类型时，我们考虑到它可以用于表示具有不同配置方式的数据。这是一些示例，展示了在不同情境下如何使用 `HeadConfig` 类型：

### 1. HTTP 请求头部配置

```typescript
type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

// 示例：表示不同类型的请求头部配置
const headersConfig1: HeadConfig = ['Content-Type', { 'Content-Type': 'application/json' }];
const headersConfig2: HeadConfig = ['Authorization', { 'Authorization': 'Bearer <token>' }, 'Bearer token'];
```

### 2. 组件配置

```typescript
type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

// 示例：表示不同组件的配置
const componentConfig1: HeadConfig = ['Button', { 'color': 'red' }];
const componentConfig2: HeadConfig = ['Dropdown', { 'options': 'option1, option2' }, 'Dropdown with options'];
```

### 3. 文件元数据

```typescript
type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

// 示例：文件的元数据配置
const fileMetadata1: HeadConfig = ['Image', { 'resolution': '1024x768' }];
const fileMetadata2: HeadConfig = ['Audio', { 'bitrate': '320kbps' }, 'High-quality audio'];
```

这些示例展示了 `HeadConfig` 类型可以用于描述不同场景下的配置或元数据信息。无论是 HTTP 请求头部、组件配置还是文件元数据，`HeadConfig` 提供了一种灵活的方式来表示不同类型的配置信息，同时确保类型的一致性和可读性。

## vue.config.js弄了一堆没效果 是什么原因

## cleanUrls

`cleanUrls` 是 VitePress 中的一个配置选项，用于控制生成的页面 URL 是否去掉末尾的 `.html` 后缀。当设置为 `true` 时，VitePress 会移除 URL 中页面的 `.html` 后缀，使得 URL 更加简洁易读。

举个例子，假设有一个名为 `about.html` 的页面，当 `cleanUrls` 设置为 `false` 时，生成的链接可能是 `yourdomain.com/about.html`；而当 `cleanUrls` 设置为 `true` 时，生成的链接会变成 `yourdomain.com/about`，去掉了 `.html` 后缀。

在 VitePress 的配置文件中，你可以这样使用 `cleanUrls`：

```javascript
// .vitepress/config.js

module.exports = {
  cleanUrls: true // 或者 false，取决于你想要的行为
};

```

对于这个配置的应用示例，假设有一个 VitePress 项目，并且有以下页面结构

```javascript
/docs
  ├── index.md
  └── about.md
```

如果 `cleanUrls` 设置为 `true`，那么生成的链接将是：

- `/docs/` 对应 `index.md`
- `/docs/about` 对应 `about.md`

而如果 `cleanUrls` 设置为 `false`，那么生成的链接将是：

- `/docs/` 对应 `index.md`
- `/docs/about.html` 对应 `about.md`

通过设置 `cleanUrls`，你可以根据个人偏好来定义页面链接的样式，使 URL 更加干净整洁，这对于优化网站的用户体验和搜索引擎优化都有一定的好处。

## rewrite

在很多 Web 应用中，URL 路由的配置通常是基于文件结构的。但有时候，我们可能希望 URL 能够映射到不同于文件结构的路径。`rewrites` 配置就是用来实现这种自定义 URL 路由的映射。

例如，假设你有一个静态网站，文件结构如下：

```javascript
- public
  - index.html
  - about.html
```

默认情况下，访问 `yourdomain.com/index.html` 会显示主页，`yourdomain.com/about.html` 会显示关于页面。但有时候你可能想要让 URL 更友好，比如访问 `/` 显示主页，访问 `/about` 显示关于页面。这时就可以使用 `rewrites` 进行自定义路径映射。

以下是一个 VitePress（或 Vite 构建的静态站点）的示例配置：

```javascript
// .vitepress/config.js

module.exports = {
  rewrites: {
    '/': '/index.html',
    '/about': '/about.html'
  }
};
```

这个示例配置告诉 VitePress，当用户访问根路径 `/` 时，实际上应该是去获取 `index.html` 文件；而当用户访问 `/about` 路径时，应该去获取 `about.html` 文件。

这样配置后，即使文件结构中没有 `/about` 这样的目录，访问 `/about` 时也会正确地显示 `about.html` 页面的内容。这种配置方式允许你自定义 URL 路径到实际文件路径的映射关系，提供更友好和语义化的 URL 结构。

实际上就是一行语句实现计算机对简写的阅读

## srcExclude 不包含

`srcExclude` 是 VitePress 中用来排除某些 Markdown 文件作为源内容的配置选项。这个配置项通常用于排除特定的 Markdown 文件，使它们不会被处理为文档或页面内容，而是被视为不相关的文件，不会出现在生成的文档中。

举个例子，假设在你的 VitePress 项目中有一些 Markdown 文件，但其中有些文件不需要被包含为文档内容，比如一些备份文件或者临时文件，你希望它们不出现在生成的文档中。

以下是一个示例配置：

```javascript
// .vitepress/config.js

module.exports = {
  srcExclude: '**/backup/*.md'
};
```

这个配置的含义是排除所有位于 `backup` 文件夹下的 Markdown 文件作为源内容。在这个示例中，所有符合 `**/backup/*.md` 模式的文件都不会被 VitePress 处理成文档内容。这些文件将被视为不相关的内容，不会出现在生成的文档中。

通过使用 `srcExclude` 配置，你可以根据自己的需求排除一些特定的 Markdown 文件，确保只有指定的文件被包含为文档内容。这对于管理和维护文档非常有用，特别是在大型项目中有大量文档文件时，可以筛选出需要的内容。

`srcExclude` 的值是一个字符串数组，其中的每个字符串都是一个用于匹配文件或目录的 [minimatch](https://www.npmjs.com/package/minimatch) 模式。这些模式可以包含通配符，允许进行灵活的匹配。

举例说明：

1. 排除所有 README.md 文件：

    ```javascript
    srcExclude: ['**/README.md']
    ```

   这将排除所有目录下的 `README.md` 文件，确保它们不会被包含在生成的文档中。

2. 排除所有 TODO.md 文件：

    ```javascript
    srcExclude: ['**/TODO.md']
    ```

   这将排除所有目录下的 `TODO.md` 文件，确保它们不会被包含在生成的文档中。

3. 排除特定目录及其所有文件：

    ```javascript
    srcExclude: ['specific-directory/**']
    ```

   这将排除名为 `specific-directory` 的目录及其下的所有文件。

4. 排除所有 .md 文件：

    ```javascript
    srcExclude: ['**/*.md']
    ```

   这将排除所有目录下的 Markdown 文件，确保它们不会被包含在生成的文档中。

通过使用 `srcExclude`，你可以根据项目的需求灵活地配置哪些文件应该被排除在文档生成过程之外。

## outDir

`outDir` 是 VitePress 中用于指定构建输出目录的配置选项。这个选项定义了构建完成后生成的静态网站文件的存放路径。

举例来说，假设你希望将构建生成的静态网站文件输出到一个名为 `docs` 的文件夹中，你可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  outDir: 'docs'
};
```

这段配置告诉 VitePress 将构建生成的静态网站文件输出到项目根目录下的 `docs` 文件夹中。这意味着生成的 HTML、CSS、JavaScript 文件等将会保存在 `docs` 文件夹中。

一般来说，默认情况下构建输出的目录是 `.vitepress/dist`，但你可以通过设置 `outDir` 来自定义构建输出的位置，让生成的静态网站文件输出到你想要的目录中。

这个配置项对于将静态网站文件输出到特定位置非常有用，比如为了方便部署到特定的服务器或将静态文件托管到特定目录中。
总之就是 自定义构建静态网站文件的位置

## assetsDir 静态资源文件存放命令

`assetsDir` 是 VitePress 中的配置选项，用于指定生成的静态资源文件（例如图片、字体、样式表等）的存放目录。

举个例子，如果你想要将生成的静态资源文件存放到一个名为 `static` 的文件夹中，你可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  assetsDir: 'static'
};
```

这段配置告诉 VitePress 将生成的静态资源文件放置在 `outDir`（构建输出目录）中的 `static` 文件夹下。也就是说，如果你之前通过设置 `outDir` 将构建生成的文件输出到 `docs` 文件夹中，那么生成的静态资源文件就会放在 `docs/static` 目录下。

默认情况下，VitePress 会将生成的静态资源文件放在 `outDir` 中的 `assets` 文件夹下。通过配置 `assetsDir`，你可以根据自己的需求来定义生成的静态资源文件的存放位置，使得项目结构更符合你的管理需求。

## cacheDir 缓存文件配置位

`cacheDir` 是 VitePress 中的一个配置选项，用于指定缓存文件的存放目录。这些缓存文件可以帮助提高 VitePress 的构建性能，加快页面的编译速度。

这个选项允许你指定一个目录用于存放缓存文件。举例来说，假设你希望缓存文件存放在名为 `.cache` 的文件夹中，你可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  cacheDir: '.cache'
};
```

这个配置告诉 VitePress 将缓存文件存放在项目根目录下的 `.cache` 文件夹中。这些缓存文件可以包含编译过程中的中间结果、依赖关系、或者其他提高构建性能的信息。

通过设置 `cacheDir`，你可以控制缓存文件的存放位置，可以是相对于项目根目录的路径。这有助于优化 VitePress 的构建过程，减少重复的计算和操作，提高项目的构建速度和性能。

## appearance

在 VitePress 中，`appearance` 是一个配置选项，用于控制是否启用深色模式以及深色模式的配置。下面是一些相关的配置代码示例：

1. **启用默认深色模式，跟随用户首选配色方案：**

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: true,
  // 其他配置...
})
```

这将启用默认的深色模式，根据用户首选的配色方案自动切换。

2.**设置默认主题为深色，除非用户手动切换：**

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  // 其他配置...
})
```

在这个配置中，将默认主题设置为深色，用户可以手动切换主题。

3.**强制启用深色模式，用户无法切换主题：**

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'force-dark',
  // 其他配置...
})
```

这会强制启用深色模式，并禁止用户手动切换主题。

4.**通过配置选项详细控制深色模式：**

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import { useDark } from '@vueuse/core'

export default defineConfig({
  appearance: {
    value: useDark(),
    // 其他配置...
  },
  // 其他配置...
})
```

这个示例使用 `@vueuse/core` 提供的 `useDark` 功能，可以更详细地控制深色模式的配置。你可以根据需要进行更复杂的深色模式配置。

## ignoreDeadLinks

`ignoreDeadLinks` 是 VitePress 中用于控制链接检查的配置选项。这个选项用于指定在构建过程中如何处理死链（即链接到不存在的资源或页面的链接）。

1. **`ignoreDeadLinks: true`：** 当设置为 `true` 时，VitePress 将不会因为死链而中断构建过程。它会忽略死链，继续生成文档。这意味着即使有一些链接指向不存在的页面或资源，构建也会继续完成，不会因此失败。

2. **`ignoreDeadLinks: 'localhostLinks'`：** 当设置为 `'localhostLinks'` 时，VitePress 会忽略本地主机（localhost）链接的检查。它将对死链进行检查，但是不会检查指向本地主机的链接是否有效。这在开发阶段可能很有用，因为有些链接可能是指向本地服务的。

3. **自定义配置：** 除了 `true` 和 `'localhostLinks'` 之外，你还可以提供一个数组，数组中可以包含字符串、正则表达式或自定义的函数，用于定义需要被忽略检查的链接规则。

举例来说，以下是一些配置示例：

```javascript
// 忽略所有死链，不会导致构建失败
ignoreDeadLinks: true,

// 对死链进行检查，但忽略本地主机链接的检查
ignoreDeadLinks: 'localhostLinks',

// 自定义规则：忽略以 'example.com' 开头的链接检查
ignoreDeadLinks: [/^https:\/\/example\.com/, /^http:\/\/example\.com/],

// 自定义规则：忽略特定链接 '/ignore-link' 的检查
ignoreDeadLinks: ['/ignore-link'],

// 自定义规则：使用函数定义需要忽略的链接，这个例子中忽略了以 '/docs' 开头的链接
ignoreDeadLinks: [(link) => link.startsWith('/docs')]
```

这些配置选项允许你根据项目的需要来处理链接检查，可以忽略特定的链接或指定类型的链接以避免构建过程因为死链而失败。

## mpa spa

MPA 是 Multi-Page Application 的缩写，指的是多页面应用程序。与 SPA（Single-Page Application 单页面应用程序）相对应，MPA 模式的应用程序拥有多个页面，每个页面都有独立的 HTML 文件。

在 MPA 中，每个页面的加载都会重新请求服务器获取新的 HTML、CSS、JavaScript 等资源，页面之间的导航通过页面链接实现。相比之下，SPA 通常只有一个 HTML 页面，通过 JavaScript 动态地加载和切换内容，导航是在客户端（浏览器）中通过路由来完成的，不需要重新加载整个页面。

MPA 模式适用于一些传统的网站架构，每个页面都对应着不同的内容和功能。与 SPA 相比，MPA 更容易实现搜索引擎优化（SEO），因为每个页面都有自己的 URL 和内容，而不是在客户端动态加载。

总的来说，MPA 和 SPA 是两种不同的应用程序架构模式，选择哪种取决于项目的需求和特点。
`mpa` 是 VitePress 中的一个实验性配置选项，用于控制生产模式下的构建方式。MPA 模式（Multi-Page Application，多页面应用）是一种构建方式，它默认不包含任何 JavaScript 代码，这意味着在 MPA 模式下，客户端无法进行页面间的导航，并需要明确选择哪些页面需要支持客户端交互。

通常情况下，单页应用（SPA）会将整个应用的 JavaScript 代码打包到一个文件中，允许客户端进行动态路由和交互式的页面导航。但 MPA 模式与之相反，它默认不包含任何客户端 JavaScript 代码，页面导航是通过服务器端渲染完成的。

举例来说，如果你想使用 VitePress 构建一个 MPA 模式的应用，可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  mpa: true
};
```

设置 `mpa` 为 `true` 将使 VitePress 构建生成的生产应用处于 MPA 模式。在 MPA 模式下，除了一些必要的静态资源文件外，几乎没有 JavaScript 代码被打包到生产应用中，这意味着客户端的交互性非常有限，需要明确选择哪些页面需要支持客户端交互。

MPA 模式的主要优势在于减少了页面加载所需的 JavaScript 文件大小，特别适用于一些静态内容较多、页面间交互性要求不高的场景。但是，需要注意的是，由于禁用了客户端的导航和交互，因此需要仔细考虑在何种场景下选择使用 MPA 模式。

## 主题配置theme

## 外观appearance

这个配置项 `appearance` 用于控制网站的外观模式，主要是用于启用或禁用暗黑模式。这个选项可以有不同的设置，具体如下：

- **`true`：** 启用暗黑模式，并且根据用户的首选色彩方案确定默认主题（浅色或暗色）。
- **`'dark'`：** 启用暗黑模式，但默认主题为暗色，除非用户手动切换。
- **`'force-dark'`：** 强制启用暗黑模式，无论用户的首选方案是什么。
- **`false`：** 禁用暗黑模式，用户将无法切换主题。

这个选项会向页面注入一段内联脚本，该脚本会根据本地存储中的 `vitepress-theme-appearance` 键来恢复用户的设置，确保在页面渲染之前应用了 `.dark` 类，以避免闪烁。

举例来说，如果你想要在你的 VitePress 项目中启用暗黑模式，但默认为暗色主题，可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  appearance: 'dark'
};
```

这段配置会启用暗黑模式，但默认主题将会是暗色，除非用户手动切换到浅色主题。这对于希望默认提供暗色主题但允许用户手动切换的场景很有用。

## lastUpdated

`lastUpdated` 是 VitePress 中用于获取每个页面的最后更新时间戳的配置选项。它通过 Git 提取每个页面的最后提交时间，并将该时间戳包含在每个页面的页面数据中，可以通过 `useData` 访问。

当启用 `lastUpdated` 选项时，在默认主题下会显示每个页面的最后更新时间。你可以通过 `themeConfig.lastUpdatedText` 选项来自定义显示的文本。

举例来说，如果你想要在你的 VitePress 项目中显示每个页面的最后更新时间，可以这样配置：

```javascript
// .vitepress/config.js

module.exports = {
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: 'Last Updated' // 自定义显示文本
  }
};
```

这段配置会启用 `lastUpdated` 选项，并且在默认主题中每个页面底部显示类似 "Last Updated: 2024-01-08" 的内容，其中的日期时间会根据 Git 中的最后提交时间自动更新。通过 `themeConfig.lastUpdatedText` 选项，你可以自定义显示文本，比如将 "Last Updated" 改为其他你希望显示的内容。
