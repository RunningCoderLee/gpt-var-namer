import type { ExtensionContext, OutputChannel } from 'vscode'
import { window, l10n } from 'vscode'
import { apiStorageKey } from './onSetAPIKey'

export async function onClearAPIKey(
  context: ExtensionContext,
  channel: OutputChannel
) {
  try {
    await context.secrets.delete(apiStorageKey)

    void window.showInformationMessage(l10n.t('Delete API Key success'))
  } catch (err: unknown) {
    console.error(err)

    channel.append((err as object).toString())

    await window.showErrorMessage((err as object).toString())
  }
}
