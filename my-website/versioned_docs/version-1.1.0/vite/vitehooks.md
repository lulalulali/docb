# hooks

## buildEnd

`buildEnd` 是 VitePress 中的一个构建 CLI 钩子（hook），它允许你在构建（SSG，即静态站点生成）完成后，但在 VitePress CLI 进程退出之前运行自定义的操作。

这个钩子允许你执行一些在构建完成后需要进行的异步操作，比如清理临时文件、上传构建生成的静态文件到服务器、发送通知等等。

举例来说，假设你希望在构建完成后输出一条消息，可以这样配置 `buildEnd` 钩子：

```javascript
// .vitepress/config.js

module.exports = {
  buildEnd: async (siteConfig) => {
    console.log('Build finished!'); // 在控制台输出消息
    // 可以在这里执行其他的异步操作
  }
};
```

在这个示例中，`buildEnd` 钩子被设置为一个异步函数，当构建完成后，会在控制台输出 `Build finished!` 消息。你可以在这个钩子中执行任何你希望在构建完成后立即执行的操作，它们将在构建完成后执行，但在 VitePress CLI 进程退出之前。

## post render

`postRender` 是 VitePress 中的一个构建钩子（hook），在静态站点生成（SSG）渲染完成后调用。这个钩子允许你在 SSG 渲染完成后处理页面内容，特别是处理 teleports（传送门）的内容。

Teleport 是 Vue 3 中的一个功能，它允许你在组件外部放置 DOM 元素，然后在组件内部将内容传送（teleport）到这些元素中。在 VitePress 中，`postRender` 钩子允许你在 SSG 渲染完成后对这些传送门的内容进行处理。

举例来说，假设你希望在 SSG 渲染完成后检查或处理传送门的内容，可以这样配置 `postRender` 钩子：

```javascript
// .vitepress/config.js

module.exports = {
  postRender: async (context) => {
    // 处理传送门的内容或进行其他操作
    console.log('SSG rendering is done!');
    // 在这里可以访问 context 中的内容并对其进行处理
    // 返回一个新的 SSGContext 或 void
  }
};
```

在这个示例中，`postRender` 钩子被设置为一个异步函数，当 SSG 渲染完成后，会在控制台输出 `SSG rendering is done!` 消息。你可以在这个钩子中访问 `context` 中的内容，并对传送门的内容或其他内容进行处理。你可以返回一个新的 `SSGContext` 对象或 `void`。

## transformhead

`transformHead` 是 VitePress 中的一个构建钩子（hook），用于在生成每个页面之前转换页面头部信息（`<head>` 标签内的内容）。这个钩子允许你在生成页面前动态添加头部信息，这些信息无法静态地添加到 VitePress 配置中。

在 VitePress 中，页面的 `<head>` 部分通常通过 `head` 配置选项来静态定义。但有时候你可能需要在构建过程中动态地添加一些特定页面的头部信息。

举例来说，假设你想要在每个页面的头部信息中添加一些额外的元数据，比如 Open Graph（OG）标签，你可以使用 `transformHead` 钩子来实现：

```javascript
// .vitepress/config.js

module.exports = {
  transformHead: async (context) => {
    // 在这里可以访问 context 中的内容并根据需要修改头部信息
    const extraHeadEntries = [
      ['meta', { property: 'og:title', content: 'My VitePress Site' }],
      ['meta', { property: 'og:description', content: 'This is an example of VitePress site.' }]
      // 可以根据需要添加其他的头部信息
    ];

    return extraHeadEntries;
  }
};
```

在这个示例中，`transformHead` 钩子被设置为一个异步函数，它可以访问 `context` 中的内容，并根据需要修改或添加头部信息。你可以通过返回一个包含额外头部信息的数组来实现，这些信息会自动与现有的头部信息合并到每个页面中。
这段代码定义了一个名为 `extraHeadEntries` 的数组，它包含了要添加到页面头部的额外信息。每个条目都是一个数组，其中第一个元素是一个字符串，代表要添加的 HTML 元素类型，第二个元素是一个对象，表示要添加到该 HTML 元素的属性和内容。
具体来说：

- `['meta', { property: 'og:title', content: 'My VitePress Site' }]` 表示要添加一个 `<meta>` 元素到页面头部，该元素具有 `property` 属性，并且属性值为 `'og:title'`，内容为 `'My VitePress Site'`。

- `['meta', { property: 'og:description', content: 'This is an example of VitePress site.' }]` 表示要添加另一个 `<meta>` 元素到页面头部，该元素同样具有 `property` 属性，属性值为 `'og:description'`，内容为 `'This is an example of VitePress site.'`。

这种格式的数组表示了要动态添加到页面头部的额外信息，通常用于需要在构建过程中根据特定条件或动态数据生成页面头部内容的情况。在 VitePress 中，通过 `transformHead` 钩子将这些信息合并到页面的头部中。

需要说明指的是在 VitePress 中钩子函数的调用时机以及钩子函数在不同环境下的作用。具体来说：

1. **`transformHead` 钩子：** 这个钩子只在生成静态站点时（SSG，静态站点生成）才会被调用。也就是说，当你运行构建命令并生成静态网站时，VitePress 会调用 `transformHead` 钩子来允许你动态地修改页面头部信息。这对于在生成静态页面时动态添加头部信息非常有用。

2. **开发环境下的动态添加头部信息：** 如果你在开发环境下需要动态地添加头部信息，`transformHead` 钩子是不会被调用的。在开发过程中，如果你需要添加动态的页面数据或者头部信息，可以使用另一个钩子函数 `transformPageData`。

3. **`transformPageData` 钩子：** 在开发过程中，可以使用 `transformPageData` 钩子来操作页面数据。这个钩子函数可以用于在页面加载时动态地修改页面的数据，包括页面的标题、内容、元数据等信息。虽然它不直接用于修改头部信息，但可以通过修改页面的数据来间接地影响头部信息的内容或属性。

总体来说，`transformHead` 钩子适用于在生成静态站点时动态修改头部信息，而在开发环境下，如果需要对页面数据进行动态操作，可以使用 `transformPageData` 钩子。

## transform html

`transformHtml` 是 VitePress 中的一个构建钩子（hook），用于在将每个页面内容保存到磁盘之前，对页面的 HTML 内容进行转换操作。

这个钩子允许你在将页面内容写入磁盘之前对 HTML 内容进行修改或转换。这在你需要对生成的 HTML 进行某些特殊处理或添加特定内容时非常有用。

举例来说，假设你希望在生成的 HTML 中的每个页面底部添加一个特定的脚注信息，你可以这样使用 `transformHtml` 钩子：

```javascript
// .vitepress/config.js

module.exports = {
  transformHtml: async (code, id, context) => {
    // code 参数是页面的 HTML 内容
    // 在这里可以根据需要修改页面的 HTML 内容

    // 添加一个脚注信息到页面底部
    const footerContent = '<footer>This is a footer added to each page.</footer>';
    const modifiedCode = code + footerContent;

    return modifiedCode; // 返回修改后的 HTML 内容
  }
};
```

在这个示例中，`transformHtml` 钩子被设置为一个异步函数，它接收三个参数：`code` 表示页面的 HTML 内容，`id` 表示页面的 ID，`context` 包含有关当前构建上下文的信息。在函数中，我们将在每个页面的 HTML 底部添加了一个固定的脚注内容，并返回修改后的 HTML 内容。这样就可以在每个页面保存到磁盘之前，动态地向页面添加额外的内容或特定的标记。

## transformPageData

`transformPageData` 是 VitePress 中的一个构建钩子（hook），用于转换每个页面的页面数据。它允许你直接修改页面数据或返回修改后的值，这些值将会与页面数据进行合并。

这个钩子允许你在构建过程中操作和修改页面的数据，包括页面的元数据、内容、标题等信息。

举例来说，假设你希望在每个页面加载时修改或添加一些页面数据，比如为每个页面增加一个额外的属性或者修改页面标题，你可以使用 `transformPageData` 钩子：

```javascript
// .vitepress/config.js

module.exports = {
  transformPageData: async (pageData, context) => {
    // 在这里可以访问和修改页面的数据（pageData）
    
    // 添加一个额外的属性到每个页面数据中
    pageData.extraInfo = 'This is additional information added to the page data.';

    // 修改页面的标题
    if (pageData.title) {
      pageData.title = `Modified - ${pageData.title}`;
    }

    // 返回修改后的页面数据
    return pageData;
  }
};
```

在这个示例中，`transformPageData` 钩子被设置为一个异步函数，它接收两个参数：`pageData` 表示页面的数据对象，`context` 包含有关当前构建上下文的信息。在函数中，我们向每个页面数据中添加了一个额外的属性 `extraInfo`，并修改了页面的标题。最后，我们返回修改后的页面数据对象，这样这些修改就会被合并到页面的数据中。这个钩子可以让你在构建过程中对每个页面的数据进行动态的修改和处理。
