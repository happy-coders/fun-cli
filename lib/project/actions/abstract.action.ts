export type ActionName = 'open-vscode';

export abstract class Action {
  constructor(protected name: ActionName) {}
}
