import { Action } from './actions/abstract.action';
import { createAction } from './actions/action.factory';
import { BuildProjectAnswers } from './builder/questions.builder';

export class Project {
  private subprojects: Project[] = [];

  private actions: Action[] = [];

  constructor(private alias: string, private path: string) {}

  addSubproject(project: Project) {
    this.subprojects.push(project);
  }

  getSubprojects() {
    return this.subprojects;
  }

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

  static createFromAnswers(
    alias: string,
    { path, actions }: BuildProjectAnswers,
  ) {
    const instance = new Project(alias, path);
    actions?.forEach((action) => {
      instance.addAction(createAction(action));
    });
    return instance;
  }
}
