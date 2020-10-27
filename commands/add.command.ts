import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class AddCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('add <project-alias>')
      .allowUnknownOption(false)
      .description('Adds funny project.')
      .requiredOption(
        '-p, --path <path>',
        'The absolute path to your fun project.',
      )
      .usage('<project-alias> [options]')
      .action(async (alias: string, path: string) => {
        const inputs: Input[] = [];
        inputs.push(
          { name: 'alias', value: alias },
          { name: 'path', value: path },
        );

        try {
          await this.action.handle(inputs);
        } catch (err) {
          process.exit(0);
        }
      });
  }
}
