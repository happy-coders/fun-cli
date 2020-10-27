import * as inquirer from 'inquirer';

import { OpenVSCode } from '../../../../lib/project/actions/open-editor/vscode.action';
import { buildProject } from '../../../../lib/project/builder/project.builder';
import { BuildProjectQuestionCollection } from '../../../../lib/project/builder/questions.builder';
import { Project } from '../../../../lib/project/project.entity';

jest.mock('inquirer');

const prompt = inquirer.prompt as jest.MockedFunction<inquirer.PromptModule>;

describe('Build project', () => {
  describe('From questions', () => {
    const alias = 'funny:api';
    const path = `${__dirname}/../fixtures/projects/awesome-project`;

    let builtProject: Project;
    beforeAll(async () => {
      const questions = {} as BuildProjectQuestionCollection;

      const answers = {
        actions: ['open-vscode'],
      };

      prompt.mockResolvedValue(answers);
      builtProject = await buildProject(alias, path, questions);
    });

    it('should built project with open-vscode action', () => {
      const project = new Project(alias, path);
      project.addAction(new OpenVSCode());

      expect(builtProject).toStrictEqual(project);
    });
  });
});
