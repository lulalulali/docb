---
lightModeSwitchTitle: '切换到明亮主题'
darkModeSwitchTitle: '切换到暗黑主题'
---

#

## overview

### i18nrouting

`i18nrouting` 通常指的是国际化（Internationalization，简称 i18n）和路由（Routing）的结合。在Web开发中，国际化是指为了适应不同语言和文化的用户，使应用程序能够提供多语言支持。而路由则是指导航和页面切换的机制。

`i18nrouting` 的功能主要包括以下两个方面：

1. **国际化（i18n）：** 通过使用不同语言的翻译来支持多语言。这包括在应用中标记需要翻译的文本，并根据用户的语言偏好动态加载相应的翻译。在路由中，也会包括对不同语言版本的页面的路由管理。

2. **路由（Routing）：** 管理不同页面之间的导航。在 `i18nrouting` 中，通常会考虑不同语言版本的页面，确保用户能够在不同语言之间切换，并且能够正确加载对应语言版本的页面。

具体实现 `i18nrouting` 的方式可能因框架而异，但基本思路是为每个页面提供多语言的版本，并在路由系统中处理不同语言版本之间的切换。这通常需要配合国际化库和路由库的使用。

以下是一个简单的示例，使用Vue.js和Vue Router实现 `i18nrouting`：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

const routes = [
  {
    path: '/:lang/',
    component: {
      render: () => {}
    },
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'about',
        component: About
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

在这个示例中，路由的基本结构中包含 `:lang` 参数，用于表示语言。通过这样的结构，你可以根据用户选择的语言加载不同版本的页面。例如，`/en/` 表示英语版本，`/fr/` 表示法语版本。

### logo

这段描述指的是在VitePress的导航栏上显示的 Logo 可以通过路径字符串或对象进行配置。该 Logo 通常出现在站点标题右侧，并且能够根据浅色模式和深色模式分别显示不同的 Logo。

下面是几个简单的例子：

1. **路径字符串：**
   使用 Logo 图片的路径字符串。这个路径可以是相对路径或绝对路径，指向你存放 Logo 图片的位置。

   ```javascript
   export default {
     themeConfig: {
       logo: '/images/logo-light.png'
     }
   }
   ```

2. **对象配置：**
   使用对象配置，可以分别设置浅色模式和深色模式下的 Logo。对象中的 `light` 和 `dark` 分别表示浅色模式和深色模式下的 Logo。

   ```javascript
   export default {
     themeConfig: {
       logo: {
         light: '/images/logo-light.png',
         dark: '/images/logo-dark.png'
       }
     }
   }
   ```

   在这种配置下，VitePress 会根据浏览器或用户的系统偏好自动切换浅色模式和深色模式，相应地显示不同的 Logo。

3. **只设置一个 Logo：**
   如果只设置一个 Logo，而不区分浅色和深色模式，可以直接使用路径字符串。

   ```javascript
   export default {
     themeConfig: {
       logo: '/images/logo.png'
     }
   }
   ```

这样，你可以根据具体需求选择设置 Logo 的方式，并确保在浅色和深色模式下都有合适的 Logo 显示。

logo是在哪里呢？logo是在什么位置浏览器顶上？还是在哪里？

### site和sitetitle

在 VitePress 的配置中，`title` 和 `siteTitle` 是两个不同的选项，具有不同的作用：

1. **title:**
   - **作用：** `title` 用于设置站点的默认标题，会显示在浏览器标签页上。
   - **例子：**

     ```javascript
     title: "my sidebar",
     ```

2. **siteTitle:**
   - **作用：** `siteTitle` 用于设置站点的主标题，通常显示在导航栏的左侧。
   - **例子：**

     ```javascript
     siteTitle: 'Hello Swords',
     ```

   你可以根据需要同时设置这两个选项，以确保站点在不同位置都有合适的标题显示。例如，在导航栏左侧显示一个主标题 (`siteTitle`)，而在浏览器标签页上显示一个独立的标题 (`title`)。

### carbonAds

在 VitePress 中，你可以通过配置 `carbonAds` 来展示 Carbon Ads（一个广告服务）。以下是一些简单的例子，你可以将它们添加到 VitePress 配置文件中：

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  carbonAds: {
    // 你的 Carbon Ads 配置
    carbon: 'ABCDEF',
    // 其他配置...
  },
  // 其他配置...
})
```

在上面的例子中，你需要替换 `'ABCDEF'` 为你在 Carbon Ads 网站上获得的 Carbon ID。

注意：为了真正展示广告，你需要在实际的构建和部署中验证配置的有效性。这里提供的示例是一个基本的框架，你需要根据你的实际情况进行调整。

### docFooter

在 VitePress 中，`docFooter` 用于自定义出现在上一页和下一页链接上方的文本。这对于非英语文档很有帮助，也可以用于全局禁用上一页/下一页链接。你可以通过设置 `docFooter` 来控制这些链接的显示文本。

**例子：**

```markdown
---
docFooter: "Custom Footer Text"
---

# Your Page Content
```

在这个例子中，通过在页面的 frontmatter 中添加 `docFooter` 字段，你可以自定义上一页和下一页链接上方的文本为 "Custom Footer Text"。

如果想要全局禁用上一页/下一页链接，可以在配置文件中设置：

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    docFooter: false,
  },
})
```

这将在全局禁用上一页/下一页链接。

自定义出现在上一页和下一页链接上方的文本指的是你可以定义在每个页面上，上一页和下一页链接之上显示的额外文本内容。这样的自定义文本可以用于提供更多的信息、导航上下文或者进行其他自定义的展示。

应用场景可能包括：

1. **提供额外的导航上下文：** 如果你希望在用户导航页面时提供一些额外的信息，例如当前章节或主题的简要描述，你可以使用 `docFooter` 来显示这些信息。

2. **多语言支持：** 如果你的文档是多语言的，你可以使用 `docFooter` 在每个页面上方显示当前语言的信息，帮助用户了解当前所处的语言环境。

3. **全局提示或声明：** 你可以使用 `docFooter` 在整个文档中添加一些全局的提示、声明或重要信息，以确保用户在导航文档时能够看到这些内容。

总体而言，这是一个灵活的功能，允许你在每个页面上方显示自定义的文本内容，以适应特定的文档需求。

### darkModeSwitchLabel

`darkModeSwitchLabel` 是用于自定义深色模式开关标签的配置选项。这个标签通常用于移动端视图，允许用户切换深色模式。

详细说明：

- 类型：string
- 默认值：'Appearance'
- 作用：用于设置深色模式开关的标签文本。

举例：

```yaml
---
darkModeSwitchLabel: '切换主题'
---
```

在上面的例子中，深色模式开关的标签文本将被设置为 '切换主题'。这是一个立即能运行的例子，你可以将其添加到页面的 YAML frontmatter 中。
