import { Command } from 'commander';

import { Input } from '../commands';
import { createProjectRepository } from '../lib/project/persistence/repository.factory';
import { Project } from '../lib/project/project.entity';
import { Task } from '../lib/project/tasks/abstract.task';
import {
  TASK_EXECUTED_WITH_SUCCESS,
  TASK_EXECUTION_FAILED,
  TASK_EXECUTION_STARTED,
  WITH_ACTION_DONE,
  WITH_ACTION_STARTED,
} from '../lib/ui/messages';
import { AbstractAction } from './abstract.action';
import { getProjectAlias } from './input.handler';

export class WithAction extends AbstractAction {
  setup(this: WithAction): (...args: any[]) => void {
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
    const project = await this._getProject(inputs);

    console.info(WITH_ACTION_STARTED);

    const tasksExecution = project
      .getTasks()
      .map((task) => this._executeTask(task, project));

    await Promise.all(tasksExecution);

    console.info(WITH_ACTION_DONE(project));
  }

  private async _getProject(inputs: Input[]): Promise<Project> {
    const projectAlias = getProjectAlias(inputs);

    const repository = await createProjectRepository();

    return repository.findOneOrFail(projectAlias);
  }

  private async _executeTask(task: Task, project: Project): Promise<void> {
    process.stdout.write(TASK_EXECUTION_STARTED(task));

    const executed = await task.execute(project);
    if (executed) {
      process.stdout.write(TASK_EXECUTED_WITH_SUCCESS(task));
    } else {
      process.stdout.write(TASK_EXECUTION_FAILED(task));
    }
  }
}
