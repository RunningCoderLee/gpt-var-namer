import { ExtensionContext, OutputChannel, ProgressLocation } from 'vscode'
import { window, l10n, env } from 'vscode'
import { Configuration, OpenAIApi } from 'openai'
import { checkAPIKey } from './onSetAPIKey'
import { checkFormat } from './onChangeVariableFormat'

async function generateVariableNames(
  apiKey: string,
  variableMeaning: string,
  variableFormat: string,
  channel: OutputChannel
): Promise<string[]> {
 const prompt = `Suggest 5 variable names in ${variableFormat} format for a variable with the meaning: "${variableMeaning}". Separate each suggestion with a newline`

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
          // remove number prefix and dot
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

export const onGenerateVariableName = async (
  context: ExtensionContext,
  channel: OutputChannel
) => {
  const apiKey = await checkAPIKey(context, channel)

  if (!apiKey) return

  const variableFormat = await checkFormat()

  if (!variableFormat) return

  const variableMeaning = await window.showInputBox({
    prompt: l10n.t('Enter a description for the variable:'),
  })

  if (!variableMeaning) return

  const variableNames = await window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: l10n.t('Generating variable names...'),
      cancellable: false,
    },
    async () => {
      return generateVariableNames(
        apiKey,
        variableMeaning,
        variableFormat,
        channel
      )
    }
  )

  if (variableNames.length > 0) {
    const selectedVariableName = await window.showQuickPick(variableNames, {
      placeHolder: l10n.t('Select a variable name:'),
    })

    if (selectedVariableName) {
      const editor = window.activeTextEditor

      if (editor) {
        const currentPosition = editor.selection.active
        void editor.edit(editBuilder => {
          editBuilder.insert(currentPosition, selectedVariableName)
        })
      }

      void env.clipboard.writeText(selectedVariableName)
    }
  } else {
    void window.showErrorMessage(l10n.t('Failed to generate variable names.'))
  }
}
