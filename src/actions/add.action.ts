import chalk from 'chalk';
import { Command } from 'commander';
import * as fs from 'fs';

import { Input } from '../commands';
import { buildProject } from '../lib/project/builder/project.builder';
import { buildProjectQuestions } from '../lib/project/builder/questions.builder';
import { ProjectRepository } from '../lib/project/persistence/repository';
import {
  ADD_ACTION_SUCCESS,
  PROJECT_ALREADY_EXISTS,
  PROJECT_DETAILS_HELP,
  RUN_COMMAND_HELP,
} from '../lib/ui/messages';
import { AbstractAction } from './abstract.action';
import { getProjectAlias } from './input.handler';

export class AddAction extends AbstractAction {
  constructor(private repository: ProjectRepository) {
    super();
  }

  setup(this: AbstractAction): (...args: any[]) => void {
    return async (alias: string, command: Command) => {
      const inputs: Input[] = [];
      inputs.push(
        { name: 'alias', value: alias },
        { name: 'path', value: command.path },
      );

      await this.handle(inputs);
    };
  }

  public async handle(inputs: Input[]) {
    const projectAlias = getProjectAlias(inputs);
    const projectPath = this.getProjectPath(inputs);

    await this._ensureProjectDoesNotExists(projectAlias);

    const questions = buildProjectQuestions();

    const project = await buildProject(projectAlias, projectPath, questions);

    const created = await this.repository.create(project);

    if (created) {
      console.log(ADD_ACTION_SUCCESS(project));
      console.log(RUN_COMMAND_HELP(project));
    }

    // TODO: Handle if occurr persisting project
  }

  private async _ensureProjectDoesNotExists(
    projectAlias: string,
  ): Promise<void> {
    const existentProject = await this.repository.findOne(projectAlias);

    if (!!existentProject) {
      const errorMessage = PROJECT_ALREADY_EXISTS(projectAlias);

      console.error(errorMessage);
      console.info(PROJECT_DETAILS_HELP(projectAlias));

      throw new Error(errorMessage);
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
