import { TaskName } from '../../../../core/project/tasks/abstract.task';
import { OpenVSCode } from '../../../../core/project/tasks/open-editor/vscode.task';
import { createTask } from '../../../../core/project/tasks/task.factory';

describe('Task factory', () => {
  describe('Open vscode', () => {
    it('should return an instance of OpenVSCode', async () => {
      const taskName = 'open-vscode';
      const task = createTask(taskName);

      expect(task).toBeInstanceOf(OpenVSCode);
      expect(task.getName()).toBe(taskName);
      expect(task.getLabel()).toBe('Open VSCode');
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
