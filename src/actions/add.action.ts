import chalk from 'chalk';
import * as fs from 'fs';

import { Input } from '../commands';
import { buildProject } from '../lib/project/builder/project.builder';
import { buildProjectQuestions } from '../lib/project/builder/questions.builder';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { AbstractAction } from './abstract.action';
import { getProjectAlias } from './input.handler';

export class AddAction extends AbstractAction {
  public async handle(inputs: Input[]) {
    const projectAlias = getProjectAlias(inputs);
    const projectPath = this.getProjectPath(inputs);

    const repository = await createProjectRepository();

    const existentProject = await repository.findOne(projectAlias);

    if (!!existentProject) {
      const tasksNames = existentProject
        .getTasks()
        .map((task) => task.getName());

      const errorMessage =
        `\nAlready exists a project with alias "${projectAlias}"\n` +
        `+ Path: ${existentProject.getPath()}\n` +
        `+ Tasks: ${tasksNames.join(', ')}\n`;

      console.error(chalk.red(errorMessage));

      throw new Error(errorMessage);
    }

    const questions = buildProjectQuestions();

    const project = await buildProject(projectAlias, projectPath, questions);

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
  }

  private getProjectPath(inputs: Input[]): string {
    const pathInput: Input = inputs.find(
      (input) => input.name === 'path',
    ) as Input;

    if (!pathInput) {
      throw new Error('No path found in command input');
    }

    const path = pathInput.value as string;

    if (!fs.existsSync(path)) {
      const errorMessage = `\nPath "${path}" not exists or is unacessible\n`;

      console.error(chalk.red(errorMessage));

      throw new Error(errorMessage);
    }

    if (!fs.lstatSync(path).isDirectory()) {
      const errorMessage = '\nPath must be a directory\n';

      console.error(chalk.red(errorMessage));

      throw new Error(errorMessage);
    }

    return path;
  }
}
