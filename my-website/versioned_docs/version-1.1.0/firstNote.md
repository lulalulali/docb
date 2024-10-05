# firstNote

## 文件命名

### 1. 有意义的名称

文件名应反映其内容和功能。避免使用模糊的名称，比如 `file1.js` 或 `script.js`。

- **不推荐**: `file1.js`
- **推荐**: `userService.js` (用户相关的服务)

### 2. 使用小写字母和连字符

通常建议使用小写字母和连字符（`-`）来命名文件，这样可以提高可读性。例如：

- **不推荐**: `UserService.js`
- **推荐**: `user-service.js`

### 3. 对于组件文件，使用 PascalCase

如果是 React 或其他框架中的组件，建议使用 PascalCase（每个单词首字母大写）命名。例如：

- **不推荐**: `mycomponent.js`
- **推荐**: `MyComponent.js`

### 4. 组织文件结构

```js
/src
  /components
    MyComponent.js
    AnotherComponent.js
  /services
    userService.js
    productService.js
  /utils
    helper.js
```

### 5. 使用版本号

在一些情况下，如果文件有不同的版本，建议在文件名中添加版本号。例如：

- **不推荐**: `data.js`
- **推荐**: `data-v1.js`

### 6. 使用统一的命名约定

确保团队中所有成员都遵循相同的命名约定，以避免混淆。例如，可以制定团队内部的命名规范文档，明确文件和文件夹的命名规则。

### 7. 示例命名规则

- **组件文件**:
  - `Header.js`
  - `Footer.js`
  - `UserProfile.js`

- **服务文件**:
  - `authService.js`
  - `apiService.js`

- **工具文件**:
  - `dateUtils.js`
  - `stringHelpers.js`

- **样式文件**:
  - `main.css`
  - `header-styles.css`

## 需要转移的代码知识

### 箭头函数

```js
根据输入的年龄显示不同的问候信息。

1. **let age = prompt("What is your age?", 18);**
   - `let`：声明一个变量。
   - `age`：变量名，用来存储用户输入的年龄。
   - `=`：赋值运算符。
   - `prompt("What is your age?", 18)`：显示一个对话框，提示用户输入他们的年龄，默认值为18。
     - `prompt`：JavaScript 中的一个函数，用于显示输入对话框。
     - `"What is your age?"`：对话框中的提示信息。
     - `18`：默认值，如果用户不输入任何值，变量 `age` 的值将为 18。

2. **let welcome = (age < 18) ?**
   - `let`：声明一个变量。
   - `welcome`：变量名，用来存储函数。
   - `=`：赋值运算符。
   - `(age < 18) ?`：三元运算符的条件部分。
     - `(age < 18)`：条件表达式，检查 `age` 是否小于 18。

3. **() => alert('Hello!') :**
   - `() => alert('Hello!')`：箭头函数，如果条件为真（`age < 18`），则执行该函数。
     - `() =>`：箭头函数语法，表示一个没有参数的函数。
     - `alert('Hello!')`：函数体，显示一个弹出框，内容为 "Hello!"。
       - `alert`：JavaScript 中的一个函数，用于显示弹出框。
       - `'Hello!'`：弹出框中的消息。

4. **() => alert("Greetings!");**
   - `() => alert("Greetings!")`：箭头函数，如果条件为假（`age >= 18`），则执行该函数。
     - `() =>`：箭头函数语法，表示一个没有参数的函数。
     - `alert("Greetings!")`：函数体，显示一个弹出框，内容为 "Greetings!"。
       - `alert`：JavaScript 中的一个函数，用于显示弹出框。
       - `"Greetings!"`：弹出框中的消息。

5. **welcome();**
   - `welcome`：调用之前定义的函数 `welcome`。
   - `()`：函数调用运算符，表示执行该函数。

用户通过 `prompt` 输入年龄，如果年龄小于 18，则 `welcome` 被赋值为一个显示 "Hello!" 的函数；否则，`welcome` 被赋值为一个显示 "Greetings!" 的函数。最后调用 `welcome` 函数，根据年龄显示相应的问候信息。

根据用户是否同意，显示不同的消息。

1. **function ask(question, yes, no) {**
   - `function`：声明一个函数。
   - `ask`：函数名。
   - `(question, yes, no)`：函数参数列表，包括三个参数：`question`（问题），`yes`（同意时的回调函数），`no`（拒绝时的回调函数）。

2. **if (confirm(question)) yes();**
   - `if`：条件语句的开始。
   - `confirm(question)`：显示一个带有“确定”和“取消”按钮的对话框。
     - `confirm`：JavaScript 中的一个函数，用于显示确认对话框。
     - `question`：传入的字符串，作为对话框中的消息。
   - `yes()`：如果用户点击“确定”，则调用 `yes` 函数。
     - `yes`：传入的回调函数，当用户同意时执行。

3. **else no();**
   - `else`：条件语句的另一部分，如果 `confirm` 返回 `false`。
   - `no()`：如果用户点击“取消”，则调用 `no` 函数。
     - `no`：传入的回调函数，当用户拒绝时执行。

4. **ask(**
   - 调用 `ask` 函数。

5. **"Do you agree?",**
   - `question` 参数的值，显示在确认对话框中的消息："Do you agree?"（你同意吗？）。

6. **function() { alert("You agreed."); },**
   - `yes` 参数的值，匿名函数，当用户同意时执行。
     - `function() { alert("You agreed."); }`：一个匿名函数，显示 "You agreed." 的弹出框。
       - `alert("You agreed.")`：JavaScript 中的一个函数，用于显示消息 "You agreed."。

7. **function() { alert("You canceled the execution."); }**
   - `no` 参数的值，匿名函数，当用户拒绝时执行。
     - `function() { alert("You canceled the execution."); }`：一个匿名函数，显示 "You canceled the execution." 的弹出框。
       - `alert("You canceled the execution.")`：JavaScript 中的一个函数，用于显示消息 "You canceled the execution."。

定义了一个名为 `ask` 的函数，该函数显示一个确认对话框，并根据用户的选择执行不同的回调函数。如果用户点击“确定”，执行显示 "You agreed." 消息的函数；如果用户点击“取消”，执行显示 "You canceled the execution." 消息的函数。
```
