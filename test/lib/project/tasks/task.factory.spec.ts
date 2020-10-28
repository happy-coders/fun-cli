import { OpenVSCode } from '../../../../src/lib/project/tasks/open-editor/vscode.task';
import { createTask } from '../../../../src/lib/project/tasks/task.factory';
import { TaskName } from '../../../../src/lib/project/tasks/abstract.task';

describe('Task factory', () => {
  describe('Open vscode', () => {
    it('should return an instance of OpenVSCode', async () => {
      const task = createTask('open-vscode');

      expect(task).toBeInstanceOf(OpenVSCode);
    });
  });

  describe('With not task name', () => {
    it('should throw error', () => {
      const name = 'not_existent' as TaskName;
      expect(() => createTask(name)).toThrow(
        `Cannot create action "${name}". Action factory not found.`,
      );
    });
  });
});
