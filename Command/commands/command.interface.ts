import { SerializedCommand } from '../serialize/command.registry'

// Command interface
export interface ICommand {
  execute(): void
  undo(): void
  toSerialized(): SerializedCommand
}
