import { CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';

export class WithCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('with <project-alias>')
      .allowUnknownOption(false)
      .description('Runs a fun project.')
      .usage('<project-alias>')
      .action(this.action.setup());
  }
}
