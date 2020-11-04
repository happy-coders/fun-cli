import * as inquirer from 'inquirer';

import { Input } from '../commands/command.input';
import { buildDeleteProjectConfirmationQuestion } from '../core/project/builder/questions.builder';
import { ProjectRepository } from '../core/project/persistence/repository';
import { Project } from '../core/project/project.entity';
import {
  DELETE_FAIL_JOKE,
  NOT_CONFIRMED_DELETION,
  PROJECT_DELETED_WITH_SUCCESS,
  UNEXPECTED_ERROR,
} from '../core/ui/messages';
import { AbstractAction } from './abstract.action';
import { getProjectAlias } from './input.handler';

export class DeleteAction extends AbstractAction {
  constructor(private repository: ProjectRepository) {
    super();
  }

  setup(this: DeleteAction): (...args: any[]) => void {
    return async (alias: string) => {
      const inputs: Input[] = [];
      inputs.push({ name: 'alias', value: alias });

      try {
        await this.handle(inputs);
      } catch (e) {
        process.exit(1);
      }
    };
  }

  public async handle(inputs: Input[]) {
    const project = await this._getProject(inputs);

    const question = buildDeleteProjectConfirmationQuestion(project);

    const answers = await inquirer.prompt(question);

    if (!answers.shouldDelete) {
      return console.info(NOT_CONFIRMED_DELETION);
    }

    const deleted = await this.repository.delete(project.getAlias());

    if (deleted) {
      return console.info(PROJECT_DELETED_WITH_SUCCESS(project));
    }

    console.error(UNEXPECTED_ERROR);
    console.info(DELETE_FAIL_JOKE(project));
  }

  private async _getProject(inputs: Input[]): Promise<Project> {
    const projectAlias = getProjectAlias(inputs);

    return this.repository.findOneOrFail(projectAlias);
  }
}
