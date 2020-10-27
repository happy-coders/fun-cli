import { Action } from './actions/abstract.action';

export class Project {
  private subprojects: Project[] = [];

  private actions: Action[] = [];

  constructor(private alias: string, private path: string) {}

  addAction(action: Action) {
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
