import chalk from 'chalk';
import { Command } from 'commander';
import * as fs from 'fs';

import { Input } from '../commands/command.input';
import { buildProject } from '../core/project/builder/project.builder';
import { ProjectRepository } from '../core/project/persistence/repository';
import {
  ADD_ACTION_SUCCESS,
  PROJECT_ALREADY_EXISTS,
  PROJECT_DETAILS_HELP,
  RUN_COMMAND_HELP,
} from '../core/ui/messages';
import { AbstractAction } from './abstract.action';
import { createInputsFromAlias, getProjectAlias } from './input.handler';

export class AddAction extends AbstractAction {
  constructor(private repository: ProjectRepository) {
    super();
  }

  public mountInputs(alias: string, command: Command): Input[] {
    const inputs = createInputsFromAlias(alias);
    inputs.push({ name: 'path', value: command.path });

    return inputs;
  }

  public async handle(inputs: Input[]) {
    const projectAlias = getProjectAlias(inputs);
    await this._ensureProjectDoesNotExists(projectAlias);

    const projectPath = this._getProjectPath(inputs);
    const project = await buildProject(projectAlias, projectPath);

    await this.repository.create(project);

    console.log(ADD_ACTION_SUCCESS(project));
    console.log(RUN_COMMAND_HELP(project));
  }

  private async _ensureProjectDoesNotExists(
    projectAlias: string,
  ): Promise<void> {
    const project = await this.repository.findOne(projectAlias);

    if (!!project) {
      const errorMessage = PROJECT_ALREADY_EXISTS(projectAlias);

      console.error(errorMessage);
      console.info(PROJECT_DETAILS_HELP(projectAlias));

      throw new Error(errorMessage);
    }
  }

  private _getProjectPath(inputs: Input[]): string {
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
