// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import {
  onGenerateVariableName,
  onChangeVariableFormat,
  onClearAPIKey,
  onSetAPIKey,
  onGenerateFunctionName,
} from './commands'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "gptvarnamer" is now active!')

  const channel = vscode.window.createOutputChannel('ChatGPT Var Namer')

  const generateVariableNameCommand = vscode.commands.registerCommand(
    'gvn.generateVariableName',
    async () => await onGenerateVariableName(context, channel)
  )

  const clearAPIKeyCommand = vscode.commands.registerCommand(
    'gvn.clearAPIKey',
    async () => await onClearAPIKey(context, channel)
  )

  const setAPIKeyCommand = vscode.commands.registerCommand(
    'gvn.setAPIKey',
    async () => await onSetAPIKey(context, channel)
  )

  const changeVariableFormatCommand = vscode.commands.registerCommand(
    'gvn.changeVariableFormat',
    onChangeVariableFormat
  )

  const generateFunctionNameCommand = vscode.commands.registerCommand(
    'gvn.generateFunctionName',
    async () => await onGenerateFunctionName(context, channel)
  )

  context.subscriptions.push(
    generateVariableNameCommand,
    clearAPIKeyCommand,
    setAPIKeyCommand,
    changeVariableFormatCommand,
    generateFunctionNameCommand
  )
}

// This method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
