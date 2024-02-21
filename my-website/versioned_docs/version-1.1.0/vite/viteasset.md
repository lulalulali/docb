# asset handle

## 引用静态资源

## public目录

在 VitePress 中，如果你的站点没有部署在根 URL 上，需要配置 `base` 选项以确保资源的正确加载。在 `.vitepress/config.js` 文件中，你可以通过添加 `base` 属性来设置。

以下是一个示例，假设你的站点部署在子路径 `/my-site/` 下：

```javascript
// .vitepress/config.js

export default {
  base: '/my-site/',
  // 其他配置...
}
```

在上面的例子中，设置了 `base` 为 `/my-site/`，这将影响生成的静态资源的路径，确保在子路径下正确加载。请根据你的实际部署情况调整 `base` 的值。

需要注意的是，如果你使用的是相对路径的链接和资源引用，VitePress 会自动处理这些相对路径，而不需要手动修改。但在某些情况下，尤其是在使用一些插件或自定义组件时，可能需要额外的配置。

## 根url

你可以将上述代码插入到你的 Vue 组件中，通常在 `.vue` 文件中的 `<script>` 部分。具体来说，在你想要使用 `withBase` 辅助函数的地方插入代码即可。

下面是一个示例，假设你有一个 Vue 组件文件（比如 `MyComponent.vue`）：

```vue
<template>
  <div>
    <!-- 其他组件内容... -->
    <img :src="withBase(theme.logoPath)" />
  </div>
</template>

<script setup>
import { withBase, useData } from 'vitepress'

const { theme } = useData()
</script>

<!-- 样式、其他配置等... -->
```

在这个例子中，`<img :src="withBase(theme.logoPath)" />` 使用了 `withBase` 辅助函数，以确保 `theme.logoPath` 的路径是相对于站点的根路径的。这在处理资源路径时特别有用，尤其是在站点部署在子路径下时。确保你的组件文件是正确引入了 `withBase` 和 `useData`，以便这段代码能够正确运行。
