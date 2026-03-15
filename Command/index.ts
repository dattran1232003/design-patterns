import { TypeCommand } from './commands/type.command'
import { TextEditor } from './text-editor'
import { TextEditorControl } from './text-editor-control'
import { sleep } from '../utils/sleep'
import { DeleteLastCommand } from './commands/delete-last.command'
import { registerCommand as registerCommands } from './serialize/register-commands'

async function main() {
  console.clear()
  const editor = new TextEditor()
  const editorCtrl = new TextEditorControl()
  const registry = registerCommands(editor)

  await sleep(1000)
  console.log(`User typed "H"`)
  editorCtrl.makeEdit(new TypeCommand(editor, 'H'))
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.log(`User typed "ello"`)
  editorCtrl.makeEdit(new TypeCommand(editor, 'ello'))
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.log(`User accidentally typed " Work"`)
  editorCtrl.makeEdit(new TypeCommand(editor, ' Work'))
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.log('User undo last type')
  editorCtrl.undoChange()
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.log('User types " World.."')
  editorCtrl.makeEdit(new TypeCommand(editor, ' World..'))
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.warn('==== USER SAVING... ====')
  const history = editorCtrl.exportHistory()
  myLocalStorage.setItem(
    'EDITOR_HISTORY',
    JSON.stringify(
      history.map((h) => registry.serializeCommand(h.type, h.params))
    )
  )
  await sleep(1000)
  console.warn('==== SAVED! ====')

  await sleep(1000)
  console.log(`User delete last redundant '.' character`)
  editorCtrl.makeEdit(new DeleteLastCommand(editor, 1))
  await sleep(1000)
  logEditor(editor)

  await sleep(1000)
  console.log('User undo last 3 actions')
  editorCtrl.undoChange()
  logEditor(editor)
  await sleep(1000)
  editorCtrl.undoChange()
  logEditor(editor)
  await sleep(1000)
  editorCtrl.undoChange()
  logEditor(editor)
  await sleep(1000)
  console.log('Done undo')

  await sleep(1000)
  console.log('==== USER RESTORE ====')
  await (async () => {
    const newEditor = new TextEditor()
    const newCtrl = new TextEditorControl()
    const historyStr = JSON.parse(
      myLocalStorage.getItem('EDITOR_HISTORY')!
    ) as string[]
    const history = historyStr.map((h) =>
      registry.deserializeCommand(h, newEditor)
    )
    newCtrl.restoreHistory(history)

    console.log('New editor content:')
    await sleep(1000)
    logEditor(newEditor)
  })()
  console.log('==== DONE RESTORE ====')
}

main().then()

const logEditor = (editor: TextEditor) => {
  console.log(`Current editor's content: "${editor.getContent()}"`)
}

export const myLocalStorage = {
  a: new Map<string, string>(),
  setItem(key: string, value: string) {
    this.a.set(key, value)
  },

  getItem(key: string) {
    return this.a.get(key)
  },
  deleteItem(key: string) {
    return this.a.delete(key)
  },
}
