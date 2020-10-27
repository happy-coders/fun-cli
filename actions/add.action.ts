import * as chalk from 'chalk';

import { Input } from '../commands';
import { buildProject } from '../lib/project/builder/project.builder';
import { buildProjectQuestions } from '../lib/project/builder/questions.builder';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { AbstractAction } from './abstract.action';

export class AddAction extends AbstractAction {
  public async handle(inputs: Input[]) {
    const projectAlias = this.getProjectAlias(inputs);
    const projectPath = this.getProjectPath(inputs);

    const questions = buildProjectQuestions();

    try {
      const project = await buildProject(projectAlias, projectPath, questions);

      const repository = await createProjectRepository();

      const created = await repository.create(project);

      if (created) {
        console.log(
          chalk.green(
            `\nDone! Your project "${project.getAlias()}" has been created with success!\n`,
          ),
        );
        console.log(
          chalk.green(
            `  Run "fun with ${project.getAlias()}" and be happy! :D\n`,
          ),
        );
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  private getProjectAlias(inputs: Input[]): string {
    const aliasInput: Input = inputs.find(
      (input) => input.name === 'alias',
    ) as Input;

    if (!aliasInput) {
      throw new Error('No alias found in command input');
    }
    return aliasInput.value as string;
  }

  private getProjectPath(inputs: Input[]): string {
    const aliasInput: Input = inputs.find(
      (input) => input.name === 'path',
    ) as Input;

    if (!aliasInput) {
      throw new Error('No path found in command input');
    }
    return aliasInput.value as string;
  }
}
