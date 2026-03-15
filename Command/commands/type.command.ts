import { TextEditor } from '../text-editor'
import { ICommand } from './command.interface'

export class TypeCommand implements ICommand {
  constructor(private editor: TextEditor, private typedText: string) {}

  execute() {
    // call editor to type text
    this.editor.type(this.typedText)
  }

  undo() {
    // remove typed text by its length
    this.editor.deleteLast(this.typedText.length)
  }
}
