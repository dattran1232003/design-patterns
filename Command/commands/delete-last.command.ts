import { TextEditor } from '../text-editor'
import { ICommand } from './command.interface'

export class DeleteLastCommand implements ICommand {
  private removedSubStr = ''
  constructor(private editor: TextEditor, private n = 1) {}

  execute(): void {
    let n = 0
    const content = this.editor.getContent()

    // make sure n not below 1
    n = Math.max(1, this.n)
    // And not exceed the editor string length
    n = Math.min(this.editor.length, n)

    // store removed subStr for restore
    this.removedSubStr = content.substring(content.length - n)

    this.editor.deleteLast(n)
  }

  undo(): void {
    // re-typing the removed substring from last delete command
    // not invoke type command to keep the isolation between commands
    this.editor.type(this.removedSubStr)
  }
}
