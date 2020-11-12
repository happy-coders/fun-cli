import execa from 'execa';

import { Project } from '../../project.entity';
import { Task } from '../abstract.task';

export class OpenVSCode extends Task {
  constructor() {
    super('open-vscode');
  }

  async execute(project: Project): Promise<boolean> {
    try {
      await execa('code', [project.getPath()]);

      return true;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  }

  getLabel() {
    return 'Open VSCode';
  }
}
