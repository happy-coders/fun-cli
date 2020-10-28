import * as inquirer from 'inquirer';

import { buildProject } from '../../../../src/lib/project/builder/project.builder';
import { BuildProjectQuestionCollection } from '../../../../src/lib/project/builder/questions.builder';
import { Project } from '../../../../src/lib/project/project.entity';
import { OpenVSCode } from '../../../../src/lib/project/tasks/open-editor/vscode.task';

jest.mock('inquirer');

const prompt = inquirer.prompt as jest.MockedFunction<inquirer.PromptModule>;

describe('Build project', () => {
  describe('From questions', () => {
    const alias = 'funny:api';
    const path = `${__dirname}/../../../fixtures/projects/awesome-project`;

    let builtProject: Project;
    beforeAll(async () => {
      const questions = {} as BuildProjectQuestionCollection;

      const answers = {
        tasks: ['open-vscode'],
      };

      prompt.mockResolvedValue(answers);
      builtProject = await buildProject(alias, path, questions);
    });

    it('should built project with open-vscode action', () => {
      const project = new Project(alias, path);
      project.addTask(new OpenVSCode());

      expect(builtProject).toStrictEqual(project);
    });
  });
});
