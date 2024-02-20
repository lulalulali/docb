# md extension

```- [电脑](#title-1)
- [主板](#title-2)
  - [cpu](#subtitle-a)
  - [gpu](#subtitle-b)
- [rom](#title-3)
- [ram](#title-3)
```

## custom anchor

这段文本描述了标题（Headers）在渲染时自动获得锚点链接。通过 markdown.anchor 选项可以配置锚点的渲染方式。

同时，文本还提到了自定义锚点的方法。若想要指定标题的自定义锚标签，而不是使用自动生成的标签，可以在标题后添加一个后缀：

例如

``
//# 使用自定义锚点 {#my-anchor}
``

这样可以让你将标题链接为 #my-anchor，而不是默认的 #using-custom-anchors。这样做可以使你在文档中链接到特定的标题位置，并使用自定义的锚点标签进行引用。

## internal link

```markdown
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

```markdown
[Home](/) <!-- sends the user to the root index.md -->
[foo](/foo/) <!-- sends the user to index.html of directory foo -->
[foo heading](./#heading) <!-- anchors user to a heading in the foo index file -->
[bar - three](../bar/three) <!-- you can omit extension -->
[bar - three](../bar/three.md) <!-- you can append .md -->
[bar - four](../bar/four.html) <!-- or you can append .html -->
```

这段代码是关于如何在 Markdown 文件中使用相对路径进行链接的示例及解释：

- `[Home](/)`: 这会将用户重定向到根目录下的 `index.md` 文件。`/` 表示网站的根路径。
- `[foo](/foo/)`: 这会将用户重定向到名为 `foo` 的目录中的 `index.html` 文件。`/foo/` 是指向该目录的根。
- `[foo heading](./#heading)`: 这会将用户定位到 `foo` 目录中的一个名为 `index.md` 的文件，并将页面滚动至 `#heading` 这个锚点处的特定标题。
- `[bar - three](../bar/three)`: 这会将用户重定向到 `bar` 目录下的 `three.md` 文件。`../` 表示返回上一级目录。
- `[bar - three](../bar/three.md)`: 同上一行，也会将用户重定向到 `bar` 目录下的 `three.md` 文件。`.md` 扩展名是可选的。
- `[bar - four](../bar/four.html)`: 这会将用户重定向到 `bar` 目录下的 `four.html` 文件。`.html` 扩展名也是可选的。

这些示例演示了如何在 Markdown 文件中使用相对路径进行导航和链接，使用户能够方便地在文件之间进行跳转和定位。

## external link

这段描述意味着外部链接（Outbound links，指向其他网站或域名的链接）会自动获得 `target="_blank" rel="noreferrer"` 的属性。

- `target="_blank"`：这个属性告诉浏览器在新标签页或新窗口打开链接，而不是在当前窗口打开。
- `rel="noreferrer"`：这个属性告诉浏览器不要向链接的目标地址发送来源（referrer）信息，这样可以保护用户的隐私，防止目标站点获取来源页面的信息。

举例来说，如果你在 Markdown 文件中写下一个外部链接：

```markdown
[Visit OpenAI](https://openai.com)
```

在渲染后的 HTML 中，这个链接会自动获得以下属性：

```html
<a href="https://openai.com" target="_blank" rel="noreferrer">Visit OpenAI</a>
```

这意味着点击这个链接会在新标签页或新窗口打开 OpenAI 网站，并且不会向 OpenAI 网站发送来源信息，保护用户的隐私。

## emoji

:face_with_open_eyes_and_hand_over_mouth:
  :face_with_peeking_eye:
  :shushing_face:
  :saluting_face:
  :zipper_mouth_face:
  :raised_eyebrow:
  :neutral_face:
  :expressionless:

## 默认主题样式

这段输入展示了在 Markdown 中使用不同类型的信息框（Info Box）或提示框（Tip Box）来突出显示不同类型的内容。这些信息框可以用于在文档中引起注意，提供额外的信息或警告。

Markdown 中的信息框通常使用类似 `::: 类型` 的语法，其中类型可以是 `info`、`tip`、`warning`、`danger`、`details` 等，表示不同的信息提示。

举例来说，这个语法的功能及使用方式可以是这样的：

```markdown
::: info
This is an info box.
:::
```

这会在渲染时生成一个带有信息图标或特定样式的信息框，里面包含着 "This is an info box." 这段文字。类似的语法也适用于其他类型的信息框，比如 `tip`、`warning`、`danger` 和 `details`，它们分别用于不同的提示、警告、危险警告和详细信息块。

举例来说：

- `::: tip` 用于提示信息
- `::: warning` 用于警告信息
- `::: danger` 用于表示危险的警告信息
- `::: details` 用于展示详细的内容，通常可以点击进行展开和收起。

这些信息框的使用可以根据具体的 Markdown 解析器或支持库而有所不同。在不同的平台上，这些语法可能会渲染成不同样式的信息框，但通常都会突出显示其中的内容，以便于读者更容易地识别和理解重要信息。
还能加装本条的说明  但必须在配置文件中写入规则

::: info 是信息
这是个信息栏.
:::

::: tip 提示什么呢
这是提示栏.
:::

::: warning 警告什么
这是警告.
:::

::: danger 什么危险啊
这是危险.
:::

::: details 什么细节
这是锁起来的细节.
:::

## 行突出显示  

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted?,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```

## 聚焦代码块  聚焦多行是从return的``{``内第一行起算

```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

```js
export default {
  data () {
    return { 
      // [!code focus:5]
const greeting = 'Hello, world!';
console.log(greeting);
const numbers = [1, 2, 3, 4, 5];
console.log(numbers[2]);
const acc = 'Hello';
  }
  }
}
```

## 颜色  错误与警告的颜色
  
```js
export default {
  data () {
    return { 
 const greeting = 'Hello, world!';
console.log(greeting); // [!code error]
const numbers = [1, 2, 3, 4, 5];// [!code --]
console.log(numbers[2]);// [!code ++]
const acc = 'Hello';// [!code warning]
  }
  }
}
```

## 行号

```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## 导入代码片段

是如何运行的??

## code group

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

## math equations

```math
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```

**Maxwell's equations:**

```math
| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |
```

## 图像延迟加载
