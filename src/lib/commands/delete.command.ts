import { CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';

export class DeleteCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('delete <project-alias>')
      .allowUnknownOption(false)
      .description('Removes a probable not fun project.')
      .usage('<project-alias>')
      .action(this.action.setup());
  }
}
