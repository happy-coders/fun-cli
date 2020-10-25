import { ActionName } from './abstract.action';
import { OpenVSCode } from './open-vscode.action';

export class ActionFactory {
  static create(name: ActionName) {
    if (name === 'open-vscode') {
      return new OpenVSCode();
    }

    throw new Error(
      `Cannot create action "${name}". Action factory not found.`,
    );
  }
}
