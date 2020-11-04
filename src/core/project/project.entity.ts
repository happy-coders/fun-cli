import { Task } from './tasks/abstract.task';

export class Project {
  private tasks: Task[] = [];

  constructor(private alias: string, private path: string) {}

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }

  getAlias() {
    return this.alias;
  }

  getPath() {
    return this.path;
  }

  hasSameAlias(alias: string) {
    return this.getAlias() === alias;
  }
}
