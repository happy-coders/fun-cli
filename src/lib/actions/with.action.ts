import { Input } from '../commands/command.input';
import { createProjectRepository } from '../core/project/persistence/repository.factory';
import { Project } from '../core/project/project.entity';
import { Task } from '../core/project/tasks/abstract.task';
import {
  TASK_EXECUTED_WITH_SUCCESS,
  TASK_EXECUTION_FAILED,
  TASK_EXECUTION_STARTED,
  WITH_ACTION_DONE,
  WITH_ACTION_STARTED,
} from '../core/ui/messages';
import { AbstractAction } from './abstract.action';
import { createInputsFromAlias, getProjectAlias } from './input.handler';

export class WithAction extends AbstractAction {
  public mountInputs(alias: string): Input[] {
    return createInputsFromAlias(alias);
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

    const repository = createProjectRepository();

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
