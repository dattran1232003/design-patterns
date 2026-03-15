import { ICommand } from './commands/command.interface'
import {
  CommandRegistry,
  SerializedCommand,
} from './serialize/command.registry'

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

  restoreHistory(history: ICommand[]) {
    for (const command of history) {
      command.execute()
    }
    this.history = history
  }

  exportHistory(): SerializedCommand[] {
    return this.history.map((h) => h.toSerialized())
  }
}
