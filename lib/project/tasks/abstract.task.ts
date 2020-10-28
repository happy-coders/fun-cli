export type TaskName = 'open-vscode';

export abstract class Task {
  constructor(protected name: TaskName) {}

  getName() {
    return this.name;
  }
}
