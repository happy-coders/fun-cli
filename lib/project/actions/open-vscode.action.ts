import { Action } from './abstract.action';

export class OpenVSCode extends Action {
  constructor() {
    super('open-vscode');
  }
}
