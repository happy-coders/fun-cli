import { CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';

export class ListCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('list')
      .allowUnknownOption(false)
      .description('Lists fun projects.')
      .action(this.action.setup());
  }
}
