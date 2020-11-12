import chalk from 'chalk';
import { CommanderStatic } from 'commander';

import { ERROR_PREFIX } from '../core/ui';
import {
  createAddCommand,
  createDeleteCommand,
  createListCommand,
  createWithCommand,
} from './command.factory';

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    createAddCommand().load(program);
    createWithCommand().load(program);
    createListCommand().load(program);
    createDeleteCommand().load(program);

    program.on('command:*', this.invalidCommandHandler(program));
  }

  public static invalidCommandHandler(program: CommanderStatic) {
    return () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red(
          program.args.join(' '),
        )}`,
      );
      console.info(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    };
  }
}
