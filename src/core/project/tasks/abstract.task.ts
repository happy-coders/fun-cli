import { Project } from '../project.entity';

export type TaskName = 'open-vscode';

export abstract class Task {
  constructor(protected name: TaskName) {}

  getName() {
    return this.name;
  }

  abstract execute(project: Project): Promise<boolean>;

  abstract getLabel(): string;
}
