import chalk from 'chalk';
import emoji from 'node-emoji';

import { Input } from '../commands';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { ERROR_PREFIX, SUCCESS_PREFIX } from '../lib/ui/prefixes';
import { AbstractAction } from './abstract.action';
import { getProjectAlias } from './input.handler';

export class WithAction extends AbstractAction {
  public async handle(inputs: Input[]) {
    const projectAlias = getProjectAlias(inputs);

    const repository = await createProjectRepository();

    const project = await repository.findOne(projectAlias);

    if (!project) {
      const errorMessage = `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
        projectAlias,
      )}\n`;

      console.error(errorMessage);
      console.info(
        `Run "${chalk.yellow(
          'fun projects',
        )}" for a list of existent commands.\n`,
      );

      throw new Error(errorMessage);
    }

    console.info(`\nRunning your funny project tasks...\n`);

    const tasks = project.getTasks().map(async (task) => {
      process.stdout.write(
        `Task to ${chalk.yellow(task.getLabel())}: Executing...\r`,
      );

      const executed = await task.execute(project);
      if (executed) {
        process.stdout.write(
          `Task to ${chalk.yellow(task.getLabel())}: ${SUCCESS_PREFIX}     \n`,
        );
      } else {
        process.stdout.write(
          `Task to ${chalk.yellow(task.getLabel())}: ${ERROR_PREFIX}       \n`,
        );
      }
    });

    await Promise.all(tasks);

    console.info(
      `\n${emoji.get('tada')} All tasks for ${chalk.yellow(
        project.getAlias(),
      )} has been executed! Don't worry. Be happy! ${emoji.emojify(
        ':grin: :computer: :thought_balloon: :moneybag:',
      )}\n`,
    );
  }
}
