import chalk from 'chalk';

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

    console.log(`\nRunning your funny project tasks...\n`);

    const tasks = project.getTasks().map(async (task) => {
      process.stdout.write(
        `Task to ${chalk.yellow(task.getLabel())}: Executing...\r`,
      );

      const executed = await task.execute(project);
      if (executed) {
        setTimeout(() => {
          process.stdout.write(
            `Task to ${chalk.yellow(
              task.getLabel(),
            )}: ${SUCCESS_PREFIX}     \n`,
          );
        }, 2000);
      } else {
        console.error(
          `${ERROR_PREFIX} Whoops! Error executing the task. It's not funny :(\n`,
        );
      }
    });

    await Promise.all(tasks);
  }
}
