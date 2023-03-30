# GPT 变量命名器 for VS Code

[english](('./README.md')) | 简体中文

GPT 变量命名器是一个 VS Code 扩展，它可以帮助开发者使用 OpenAI 的 GPT 为代码生成有意义的变量名。它利用 OpenAI API 根据用户提供的描述来建议上下文相关的变量名。

## 功能

- 根据用户输入生成变量名
- 支持多种变量命名格式（camelCase, PascalCase, kebab-case, snake_case）
- API 密钥存储和管理
- 可自定义工作区

## 开始使用

### 前提条件

- [Visual Studio Code](https://code.visualstudio.com/)
- [OpenAI API 密钥](https://platform.openai.com/account/api-keys)


### 安装

1. 打开 Visual Studio Code，点击窗口侧边活动栏上的方形图标，进入扩展视图。
2. 在搜索栏中搜索 "GPT 变量命名器"，然后点击扩展的安装按钮。
3. 重新加载 VS Code 以激活扩展。


### 配置

1. 按 Ctrl+Shift+P（Windows/Linux）或 Cmd+Shift+P（Mac）打开命令面板。
2. 输入并选择 "GVN: 设置 API 密钥"，输入您的 OpenAI API 密钥。您的 API 密钥将被安全存储。
3. 可选操作：您可以在命令面板中输入并选择 "GVN: 更改变量格式" 以设置工作区的变量命名格式。

## 使用方法

1. 将光标放在代码中要插入变量名的位置。
2. 打开命令面板，输入 "GVN: 生成变量名"。
3. 为变量输入描述，扩展程序将根据描述生成一系列建议的变量名。
4. 从列表中选择一个变量名，它将插入到光标位置。所选变量名也将被复制到剪贴板。

## 命令

- `GVN: 生成变量名`：根据用户输入生成变量名
- `GVN: 设置 API 密钥`：设置 OpenAI API 密钥
- `GVN: 清除 API 密钥`：清除存储的 OpenAI API 密钥
- `GVN: 更改变量格式`：更改工作区的变量命名格式


## 贡献

欢迎大家提供贡献！请随时报告问题，提交拉取请求，或对扩展的功能和可用性提供反馈。
