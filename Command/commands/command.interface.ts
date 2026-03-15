// Command interface
export interface ICommand {
  execute(): void
  undo(): void
}
