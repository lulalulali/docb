# node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，用于构建快速、可扩展的网络应用程序。它的主要作用是在服务器端运行 JavaScript 代码。

## 作用和特点

### 1.服务器端开发

- **构建服务器端应用**: Node.js允许开发者使用 JavaScript 编写服务器端应用程序。这包括 Web 应用、API、实时通信应用等。
- **高性能**: 基于事件驱动和非阻塞I/O的特性，使得 Node.js 能够处理高并发请求，适用于需要高性能的应用场景。

### 2. JavaScript 运行环境

- **在服务器上运行 JavaScript**: Node.js 将 JavaScript 从仅限于浏览器的前端语言扩展到了服务器端。

### 3. 构建工具和实用程序

- **构建工具**: Node.js 生态系统中有许多工具和模块，可用于构建前端和后端应用程序，如Webpack、Gulp等。
- **实用程序**: Node.js 提供了丰富的模块和库，可以用于文件操作、网络通信、数据库连接、数据流处理等。

### 4. 事件驱动和非阻塞I/O

- **事件驱动**: 使用事件驱动模型处理请求，当某个请求完成时，Node.js 会触发相应的事件进行处理，而不需要等待。
- **非阻塞I/O**: 在等待 I/O 操作完成时，Node.js 不会阻塞其他请求，而是继续处理其他请求，提高了系统的吞吐量。

### 5. 生态系统和模块

- **npm**: Node.js 的包管理器，拥有庞大的模块生态系统，可以通过 npm 轻松获取并使用各种功能强大的模块。

Node.js 的灵活性和性能使其成为构建高效、实时、可扩展的网络应用程序的流行选择。它使开发者能够使用单一语言（JavaScript）进行前后端开发，提高了开发效率和代码复用性。

## nodejs setup

在进行 Node.js 的安装过程中，通常会遇到一些选项，比如选择 runtime、core manage 或其他项。这些选项可能因安装方式或安装程序而异，以下是一些可能的选项及其含义：

### Runtime（运行时）

1. **Stable / LTS（稳定版 / 长期支持版）**：
   - 这是指 Node.js 的稳定版本或长期支持版本，适合大多数生产环境和稳定的应用。它们通常是经过更多测试和验证的版本。

2. **Current / Latest（当前版 / 最新版）**：
   - 这是最新的 Node.js 版本，可能包含最新功能和改进，但可能不稳定或存在一些尚未解决的问题。

### Core Manage（核心管理）

1. **npm（Node Package Manager）**：
   - npm 是 Node.js 的包管理器，用于安装、管理和共享 JavaScript 包的工具。几乎所有的 Node.js 项目都使用 npm 来管理依赖项。

### 其他项（Other Options）

1. **Add to PATH（添加到路径）**：
   - 这个选项询问是否将 Node.js 安装目录添加到操作系统的环境变量中，以便在终端或命令提示符中直接运行 Node.js 和 npm 命令。

2. **Development Tools（开发工具）**：
   - 可能会提供一些额外的开发工具或集成环境，如调试器、编辑器插件等，让你更方便地开发和调试 Node.js 应用。

### 建议的选择

- **对于大多数情况**：建议选择稳定版本或长期支持版本，除非你有特殊的原因需要使用最新版。
- **npm** 是必选项，因为它是 Node.js 生态系统中最重要的包管理器。

确保根据你的需求和应用场景选择合适的 Node.js 版本，并确保在安装过程中理解并选择正确的选项以满足你的需求。

## 查看nodejs版本

node -v

## 重新启动服务器 具体操作步骤

重新启动服务器通常意味着停止当前正在运行的服务，然后再次启动它。对于 Docusaurus 项目来说，重新启动服务器意味着停止现有的开发服务器并重新运行它，以便加载可能的更改或新页面。

### 在 Docusaurus 项目中重新启动服务器的步骤

1. **关闭当前运行的开发服务器**：在终端窗口，按下 `Ctrl + C` 组合键（在 Windows 上可能会提示你是否终止当前进程），这将停止当前正在运行的 Docusaurus 开发服务器。

2. **重新启动开发服务器**：在终端窗口中，进入到你的 Docusaurus 项目根目录（确保你在项目的根目录下），然后运行以下命令：

   - 如果使用 npm：

     ```bash
     npm start
     ```

   - 如果使用 yarn：

     ```bash
     yarn start
     ```

3. **等待服务器启动**：启动命令会重新运行开发服务器，并且会在终端中显示类似于 "Docusaurus server started onhttp://localhost:3000" 的消息，表示服务器已成功启动。

4. **访问项目页面**：在浏览器中输入 `http://localhost:3000` 或者你想要访问的页面地址，确保服务器已经正确地加载了你的页面。

这些步骤会帮助你重新启动 Docusaurus 项目的开发服务器，以便加载可能的更改或新创建的页面。确保在终端窗口中查看服务器启动时的任何错误或警告信息，以便及时解决可能的问题。

## setup时选哪个feature比较好

Node.js 的安装程序通常会提供一些安装选项或功能，不同的功能选项适用于不同的用途和需求。以下是一些常见的 Node.js 安装程序提供的功能选项：

1. **Node.js runtime（Node.js 运行时）**：
   - 这是 Node.js 的核心功能，包括 Node.js 运行时和 npm 包管理器。几乎所有情况下都需要选择这个选项，因为它包含了 Node.js 的核心功能。

2. **npm package manager（npm 包管理器）**：
   - npm 是 Node.js 的默认包管理器，用于安装、管理和发布 JavaScript 包。通常情况下，你会需要选择这个选项，因为 npm 在 Node.js 的生态系统中扮演着重要的角色。

3. **Add to PATH（添加到系统 PATH 变量）**：
   - 选中此选项将 Node.js 添加到系统的环境变量 PATH 中。这将使你可以从任何位置运行 node 和 npm 命令。这是一个很有用的选项，因为它简化了在命令行中访问 Node.js 的过程。

4. **Automatically install the necessary tools for Node.js（自动安装 Node.js 所需的工具）**：
   - 选择此选项将自动安装 Node.js 所需的附加工具，例如 Python 和 Visual Studio Build Tools（仅在 Windows 上）。这些工具可能在某些情况下需要用于编译某些 Node.js 包。

5. **npm global package manager（全局 npm 包管理器）**：
   - 这个选项将设置 npm 全局安装的路径。选择此选项后，npm 全局安装的包将会安装到指定的路径中。

在大多数情况下，你需要选择 Node.js runtime 和 npm package manager。至于其他选项，是否选择取决于你的具体需求和系统配置。通常情况下，推荐选择将 Node.js 添加到系统 PATH 中，因为这样可以方便地从任何位置访问 Node.js 和 npm 命令。其他选项根据你的特定需求选择即可。
