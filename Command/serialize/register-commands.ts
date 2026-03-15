import { DeleteLastCommand } from '../commands/delete-last.command'
import { TypeCommand } from '../commands/type.command'
import { TextEditor } from '../text-editor'
import { CommandRegistry } from './command.registry'

export function registerCommand(editor: TextEditor): CommandRegistry {
  const registry = new CommandRegistry()

  registry.register(
    'type',
    (editor, params) => new TypeCommand(editor, params.typedText)
  )

  registry.register(
    'deleteLast',
    (editor, params) => new DeleteLastCommand(editor, params.n)
  )

  return registry
}
