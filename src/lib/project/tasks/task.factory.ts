import { TaskName } from './abstract.task';
import { OpenVSCode } from './open-editor/vscode.task';

export function createTask(name: TaskName) {
  if (name === 'open-vscode') {
    return new OpenVSCode();
  }

  throw new Error(`Cannot create action "${name}". Action factory not found.`);
}
