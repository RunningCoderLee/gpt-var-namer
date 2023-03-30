import type { ExtensionContext, OutputChannel } from 'vscode'
import { window, l10n } from 'vscode'

export const apiStorageKey = 'openAIKey'

/**
 * Check API key
 *
 * @description Check if the API key is stored in the extension context, if not, ask the user to input the key.
 * @param {ExtensionContext} context The extension context.
 * @param {OutputChannel} channel The output channel.
 * @return {*}  {(Promise<string | undefined>)} The API key.
 */
export async function checkAPIKey(
  context: ExtensionContext,
  channel: OutputChannel
): Promise<string | undefined> {
  let apiKey = await context.secrets.get(apiStorageKey)

  if (!apiKey) {
    apiKey = await applyInputKey()

    if (apiKey) {
      try {
        await context.secrets.store(apiStorageKey, apiKey)

        channel.append(l10n.t('OpenAI API key saved.'))

        return apiKey
      } catch (err) {
        console.error(err)

        channel.append((err as object).toString())
      }
    }
  }

  return apiKey
}

/**
 * Apply input key
 *
 * @return {*}  {(Thenable<string | undefined>)} The API key.
 */
export function applyInputKey(): Thenable<string | undefined> {
  return window.showInputBox({
    prompt: l10n.t(
      'Please enter your OpenAI API key. [Get your API Key from OpenAI]({ url }).You can clear your API key by command: `GVN: Clear API Key`',
      { url: 'https://platform.openai.com/account/api-keys' }
    ),
    password: true,
  })
}

/**
 * On set API key
 *
 * @param {ExtensionContext} context The extension context.
 * @param {OutputChannel} channel The output channel.
 */
export async function onSetAPIKey(
  context: ExtensionContext,
  channel: OutputChannel
) {
  try {
    const apiKey = await applyInputKey()

    if (apiKey) {
      await context.secrets.store(apiStorageKey, apiKey)
      await window.showInformationMessage(l10n.t('OpenAI API key saved.'))
    }
  } catch (err: unknown) {
    console.error(err)

    channel.append((err as object).toString())

    await window.showErrorMessage((err as object).toString())
  }
}
