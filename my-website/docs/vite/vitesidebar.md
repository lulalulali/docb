# sidebar

## Invalid sidebar file at "sidebars.js"

These sidebar document ids do not exist:
这个错误说明在加载侧边栏文件 `sidebars.js` 时出现了问题。在 `sidebars.js` 文件中引用了一个不存在的文档 ID `jesus`。

你的侧边栏文件中应该列出了可用的文档 ID 列表，但其中有一个叫做 `jesus` 的文档 ID 并不存在。

要解决这个问题，你需要检查 `sidebars.js` 文件，并确保文档 ID 的引用都是正确的，没有错别字或错误的文档 ID。比如，确保在你的侧边栏文件中列出的文档 ID 都确实存在于你的文档目录中。

另外，确保 `sidebars.js` 中的路径与实际的文档目录结构一致。一旦确认了 `sidebars.js` 中的文档 ID 都正确无误，并且与实际的文档结构匹配，这个错误就会消失。

## 创建有左侧选项单的网站流程

在 VitePress 中创建具有左侧选项菜单的网站通常需要遵循以下步骤：

### 步骤一：创建 VitePress 项目

首先，确保你已经安装了 Node.js 和 npm 或者 yarn。然后通过以下命令创建一个新的 VitePress 项目：

```bash
npm init vitepress
# 或者
yarn create vitepress
```

### 步骤二：配置侧边栏

在 VitePress 项目中，你可以通过配置文件 `.vitepress/config.js` 来设置侧边栏菜单。

```javascript
// .vitepress/config.js

module.exports = {
  themeConfig: {
    sidebar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Guide',
        link: '/guide/'
      },
      // 其他侧边栏选项
    ]
  }
}
```

以上是一个简单的示例，你可以根据自己的需要添加更多的侧边栏选项。这些选项将会在侧边栏中显示。

### 步骤三：编写内容

在你的 VitePress 项目中编写内容，每个 `.md` 文件对应一个页面。确保文件结构和链接与你配置的侧边栏菜单相匹配，这样侧边栏菜单就能正确显示和链接到对应的页面。

### 步骤四：启动开发服务器

运行以下命令启动 VitePress 开发服务器：

```bash
npm run docs:dev
# 或者
yarn docs:dev
```

这将启动一个本地开发服务器，默认地址是 `http://localhost:3000`，你可以在浏览器中打开查看你的 VitePress 网站。左侧将会显示你配置的侧边栏菜单。

### 步骤五：部署网站

当你准备好部署你的网站时，你可以使用 VitePress 提供的命令进行静态文件的构建：

```bash
npm run docs:build
# 或者
yarn docs:build
```

构建完成后，你可以将生成的静态文件部署到你的服务器或者静态托管服务上，确保路径和配置的 `base` 选项匹配，这样侧边栏和页面链接将能正确工作。

## 配置出含折叠功能的侧边栏

要配置含有折叠功能的侧边栏，你可以使用 `collapsable` 属性来设置是否可折叠。以下是一个示例，展示了如何配置含有折叠功能的侧边栏：

```javascript
// .vitepress/config.js

module.exports = {
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsable: false, // 不可折叠
          children: [
            '/guide/',          // 对应 /guide/README.md
            '/guide/getting-started.md',
            '/guide/advanced.md'
          ]
        },
        {
          text: 'Config',
          collapsable: true, // 可折叠
          children: [
            '/guide/config/',   // 对应 /guide/config/README.md
            '/guide/config/theme.md',
            '/guide/config/plugin.md'
          ]
        }
      ],
      '/blog/': [
        '/blog/',             // 对应 /blog/README.md
        '/blog/post1.md',
        '/blog/post2.md'
      ]
      // 可以继续添加其他路径的侧边栏配置
    }
  }
}
```

在这个示例中，`collapsable` 属性用来设置菜单项是否可折叠。对于需要折叠的菜单项，设置 `collapsable: true`，而对于不需要折叠的菜单项，设置 `collapsable: false`。

根据这个示例：

- `Guide` 菜单项不可折叠，用户不能关闭或打开它。
- `Config` 菜单项可折叠，用户可以点击菜单项旁边的箭头来展开或收起子菜单。

根据你的需求和项目结构，你可以设置不同的菜单项的折叠行为。
