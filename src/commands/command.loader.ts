import chalk from 'chalk';
import { CommanderStatic } from 'commander';

import { AddAction } from '../actions';
import { WithAction } from '../actions/with.action';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { ERROR_PREFIX } from '../lib/ui';
import { AddCommand } from './add.command';
import { WithCommand } from './with.command';

export class CommandLoader {
  public static async load(program: CommanderStatic): Promise<void> {
    const repository = await createProjectRepository();

    new AddCommand(new AddAction(repository)).load(program);
    new WithCommand(new WithAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
