import { ICommand } from './commands/command.interface'

// Invoker
export class TextEditorControl {
  private history: ICommand[] = []

  makeEdit(command: ICommand) {
    command.execute()
    this.history.push(command)
  }

  undoChange() {
    const command = this.history.pop()
    if (!command) return
    command.undo()
  }
}
