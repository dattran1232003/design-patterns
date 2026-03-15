import { TypeCommand } from './commands/type.command'
import { TextEditor } from './text-editor'
import { TextEditorControl } from './text-editor-control'
import { sleep } from '../utils/sleep'
import { DeleteLastCommand } from './commands/delete-last.command'

async function main() {
  console.clear()

  const editor = new TextEditor()
  const editorCtrl = new TextEditorControl()

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
}

main().then()

const logEditor = (editor: TextEditor) => {
  console.log(`Current editor's content: "${editor.getContent()}"`)
}
