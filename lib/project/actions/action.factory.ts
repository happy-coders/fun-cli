import { ActionName } from './abstract.action';
import { OpenVSCode } from './open-vscode.action';

export function createAction(name: ActionName) {
  if (name === 'open-vscode') {
    return new OpenVSCode();
  }

  throw new Error(`Cannot create action "${name}". Action factory not found.`);
}
