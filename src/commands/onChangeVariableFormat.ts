import { workspace, window, l10n, ConfigurationTarget } from 'vscode'

async function applySelectedFormat() {
  return await window.showQuickPick(
    ['camelCase', 'PascalCase', 'kebab-case', 'snake_case'],
    {
      placeHolder: l10n.t('Select the variable name format (workspace):'),
    }
  )
}

export async function checkFormat(): Promise<string | undefined> {
  let format: string | undefined = await workspace
    .getConfiguration('GVN')
    .get('variableNameFormat')

  if (!format) {
    format = await applySelectedFormat()
  }

  return format
}

export async function onChangeVariableFormat() {
  const variableFormat = await applySelectedFormat()

  if (!variableFormat) return

  const folders = workspace.workspaceFolders ?? []

  if (folders.length > 1) {
    const selectedFolderName = await window.showQuickPick(
      folders.map(folder => folder.name),
      {
        placeHolder: l10n.t('Select a workspace folder:'),
      }
    )

    if (selectedFolderName) {
      const uri = folders.find(
        folder => folder.name === selectedFolderName
      )!.uri
      return await workspace
        .getConfiguration('GVN', uri)
        .update(
          'variableNameFormat',
          variableFormat,
          ConfigurationTarget.WorkspaceFolder
        )
    }
  }

  await workspace
    .getConfiguration('GVN')
    .update('variableNameFormat', variableFormat, ConfigurationTarget.Workspace)
}
