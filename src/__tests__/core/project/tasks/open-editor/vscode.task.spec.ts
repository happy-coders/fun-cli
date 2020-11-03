import execa from 'execa';

import { Project } from '../../../../../core/project/project.entity';
import { OpenVSCode } from '../../../../../core/project/tasks/open-editor/vscode.task';

jest.mock('execa');

const process = execa as jest.MockedFunction<typeof execa>;

describe('Open VSCode', () => {
  describe('Execute', () => {
    const projectPath = '/var/ww/html';
    let project: Project;
    let task: OpenVSCode;
    let result: boolean;

    beforeAll(() => {
      task = new OpenVSCode();

      project = new Project('test', projectPath);
    });

    describe('When occur an error in command execution', () => {
      const error = 'error';

      beforeAll(async () => {
        global.console.error = jest.fn();
        process.mockImplementation(() => {
          throw new Error(error);
        });
        result = await task.execute(project);
      });

      it('should return false', async () => {
        expect(result).toBe(false);
      });

      it('should print returned error message', async () => {
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(error);
      });
    });

    describe('When execute command with success', () => {
      beforeAll(async () => {
        process.mockReset();

        result = await task.execute(project);
      });

      it('should return true', async () => {
        expect(result).toBe(true);
      });
    });
  });
});
