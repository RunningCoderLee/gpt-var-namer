import { window, env, ProgressLocation, l10n } from 'vscode'
import { Configuration, OpenAIApi } from 'openai'
import type { ExtensionContext, OutputChannel } from 'vscode'
import { checkAPIKey } from './onSetAPIKey'

async function generateFunctionNames(
  apiKey: string,
  functionDescription: string,
  channel: OutputChannel
): Promise<string[]> {
  const prompt = `Suggest 5 function names for a function with the description: "${functionDescription}". Separate each suggestion with a newline.`

  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 50,
      temperature: 0.7,
      n: 1,
      stop: null,
    })

    if (response.data.choices && response.data.choices.length > 0) {
      const rawSuggestions =
        response.data.choices[0].text?.trim().split('\n') ?? []
      return rawSuggestions
        .map(suggestion =>
          suggestion
            .replace(/^\d+\.\s*/, '')
            .replace(/\./g, '')
            .trim()
        )
        .filter(Boolean)
    }

    return []
  } catch (err) {
    channel.append((err as object).toString())
    console.error(err)
    return []
  }
}

export const onGenerateFunctionName = async (
  context: ExtensionContext,
  channel: OutputChannel
) => {
  const apiKey = await checkAPIKey(context, channel)

  if (!apiKey) return

  const functionDescription = await window.showInputBox({
    prompt: l10n.t('Enter a description for the function:'),
  })

  if (!functionDescription) return

  const functionNames = await window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: l10n.t('Generating function names...'),
      cancellable: false,
    },
    async () => {
      return generateFunctionNames(apiKey, functionDescription, channel)
    }
  )

  if (functionNames.length > 0) {
    const selectedFunctionName = await window.showQuickPick(functionNames, {
      placeHolder: l10n.t('Select a function name:'),
    })

    if (selectedFunctionName) {
      const editor = window.activeTextEditor

      if (editor) {
        const currentPosition = editor.selection.active
        void editor.edit(editBuilder => {
          editBuilder.insert(currentPosition, selectedFunctionName)
        })
      }

      void env.clipboard.writeText(selectedFunctionName)
    }
  } else {
    void window.showErrorMessage(l10n.t('Failed to generate function names.'))
  }
}
