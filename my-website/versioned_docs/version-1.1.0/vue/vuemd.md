# vue on md

## interpolation 插值语法

当将 Markdown 文件编译成 HTML 并传递给 Vite 进程流水线时，你可以在文本中使用类似 Vue 的插值语法。这使得你可以在 Markdown 文件中嵌入 Vue 样式的插值、绑定等。

以下是一些例子：

1. **Vue 插值：**

    ```markdown
    ---
    title: My Page
    ---

    # {{ title }}
    ```

    在这个例子中，`{{ title }}` 是一个 Vue 插值，它将在编译时被替换为 frontmatter 中定义的 `title`。

2. **动态 class 绑定：**

    ```markdown
    ---
    isImportant: true
    ---

    <div :class="{ 'important': isImportant }">
      This is an important message.
    </div>
    ```

    这里使用了 Vue 的动态 class 绑定，根据 frontmatter 中的 `isImportant` 属性的值来决定是否应用 `important` 类。

3. **循环渲染列表：**

    ```markdown
    ---
    items:
      - Apple
      - Banana
      - Orange
    ---

    <ul>
      <li v-for="item in items">{{ item }}</li>
    </ul>
    ```

    在这个例子中，利用 Vue 的 `v-for` 指令，将 frontmatter 中的 `items` 数组中的每个元素渲染成列表项。

这些例子演示了在 Markdown 文件中使用 Vue 插值和指令的能力，允许你更灵活地结合 Vue 的功能和 Markdown 的文本内容。这样的集成使得在 VitePress 中创建动态、交互式的文档变得更为方便。

## script style

在 VitePress 的 Markdown 文件中使用 `<script setup>` 和 `<style module>` 是不支持的。VitePress 对 Markdown 文件中的 `<script>` 和 `<style>` 进行了特殊处理，允许在其中使用 Vue 的插值语法和普通的样式，但并不支持 `<script setup>` 和 `<style module>` 这样的语法。

如果你需要在 Markdown 文件中使用 Vue 组件的 `<script setup>` 和 `<style module>`，可以考虑将该组件放在 `.vue` 单文件组件中，而不是在 Markdown 文件中。例如，将上述代码保存为一个名为 `MyComponent.vue` 的文件，内容如下：

<!-- ```vue
<template>
  <div>
    <p>The count is: {{ count }}</p>
    <button :class="$style.button" @click="count++">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
``` -->

然后，在你的 Markdown 文件中引入这个组件：

<!-- ```markdown
---
hello: world
---
 <MyComponent />
``` -->

这样，你就可以在 `.vue` 文件中使用 `<script setup>` 和 `<style module>`，并在 Markdown 文件中引入这个组件。这是一种更灵活的组织代码的方式，同时也能够利用 Vue 的强大功能。

## 使用组件

### 在md中导入组件?

### 自定义 Vue 实例来全局注册一个在大多数界面上用的组件

### 标题中使用组件  
