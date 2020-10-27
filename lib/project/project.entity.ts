import { Task } from './tasks/abstract.task';

export class Project {
  private subprojects: Project[] = [];

  private actions: Task[] = [];

  constructor(private alias: string, private path: string) {}

  addAction(action: Task) {
    this.actions.push(action);
  }

  getActions() {
    return this.actions;
  }

  getAlias() {
    return this.alias;
  }

  getPath() {
    return this.path;
  }
}
