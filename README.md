# GPT Variable Namer for VS Code

english | [简体中文]('./README-zh_CN.md')

GPT Variable Namer is a VS Code extension that helps developers generate meaningful variable names for their code using OpenAI's GPT. It leverages the OpenAI API to suggest contextually appropriate variable names based on a user-provided description.

## Features

- Generate variable names based on user input
- Support for multiple variable naming formats (camelCase, PascalCase, kebab-case, snake_case)API key storage and management
- Customizable per workspace

## Getting Started

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- An [OpenAI API key](https://platform.openai.com/account/api-keys)

### Installation

1. Open Visual Studio Code and navigate to the Extensions view by clicking on the square icon in the Activity Bar on the side of the window.
2. Search for "GPT Variable Namer" in the search bar and click on the Install button for the extension.
3. Reload VS Code to activate the extension.

### Configuration

1. Open the Command Palette by pressing Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac).
2. Type and select "GVN: Set API Key" to enter your OpenAI API key. Your API key will be securely stored.
3. Optionally, you can set the variable name format for your workspace by typing and selecting "GVN: Change Variable Format" in the Command Palette.

## Usage

1. Place the cursor where you want to insert the variable name in your code.
2. Open the Command Palette and type "GVN: Generate Variable Name".
3. Enter a description for the variable, and the extension will generate a list of suggested variable names based on the description.
4. Select a variable name from the list, and it will be inserted at the cursor position. The selected variable name will also be copied to the clipboard.


## Commands

- `GVN: Generate Variable Name`: Generate a variable name based on user input
- `GVN: Set API Key`: Set the OpenAI API key
- `GVN: Clear API Key`: Clear the stored OpenAI API key
- `GVN: Change Variable Format`: Change the variable naming format for the workspace

## Contributing

Contributions are welcome! Please feel free to report issues, submit pull requests, or provide feedback on the extension's features and functionality.
