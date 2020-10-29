import { CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class WithCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('with <project-alias>')
      .allowUnknownOption(false)
      .description('Runs a funny project.')
      .usage('<project-alias>')
      .action(async (alias: string) => {
        const inputs: Input[] = [];
        inputs.push({ name: 'alias', value: alias });

        try {
          await this.action.handle(inputs);
        } catch (err) {
          process.exit(0);
        }
      });
  }
}
