import { CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';

export class AddCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('add <project-alias>')
      .allowUnknownOption(false)
      .description('Adds fun project.')
      .requiredOption(
        '-p, --path <path>',
        'The absolute path to your fun project.',
      )
      .usage('<project-alias> [options]')
      .action(this.action.setup());
  }
}
