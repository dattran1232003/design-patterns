import { ICommand } from '../commands/command.interface'
import { TextEditor } from '../text-editor'

export interface SerializedCommand {
  type: string
  params: Record<string, unknown>
}

export class CommandRegistry {
  private factories = new Map<
    string,
    (editor: TextEditor, params: any) => ICommand
  >()

  register(
    type: string,
    factory: (editor: TextEditor, params: any) => ICommand
  ) {
    this.factories.set(type, factory)
  }

  serializeCommand(type: string, params: any): string {
    return JSON.stringify({ type, params })
  }

  deserializeCommand(json: string, editor: TextEditor) {
    try {
      const { type, params } = JSON.parse(json) as SerializedCommand
      const factory = this.factories.get(type)
      if (!factory) throw new Error('This kind of command not registered')
      const command = factory(editor, params)
      return command
    } catch (e) {
      throw e
    }
  }
}
