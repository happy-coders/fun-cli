import * as inquirer from 'inquirer';

import { buildProject } from '../../../../lib/core/project/builder/project.builder';
import { Project } from '../../../../lib/core/project/project.entity';
import { OpenVSCode } from '../../../../lib/core/project/tasks/open-editor/vscode.task';

jest.mock('inquirer');

const prompt = inquirer.prompt as jest.MockedFunction<inquirer.PromptModule>;

describe('Build project', () => {
  describe('From questions', () => {
    const alias = 'funny:api';
    const path = `${__dirname}/../../../fixtures/projects/awesome-project`;

    let builtProject: Project;
    beforeAll(async () => {
      const answers = {
        tasks: ['open-vscode'],
      };

      prompt.mockResolvedValue(answers);
      builtProject = await buildProject(alias, path);
    });

    it('should built project with open-vscode action', () => {
      const project = new Project(alias, path);
      project.addTask(new OpenVSCode());

      expect(builtProject).toStrictEqual(project);
    });
  });
});
