import * as inquirer from 'inquirer';

import { OpenVSCode } from '../../../../lib/project/actions/open-vscode.action';
import { buildProject } from '../../../../lib/project/builder/project.builder';
import {
  buildMoreSubprojectQuestion,
  BuildProjectQuestionCollection,
} from '../../../../lib/project/builder/questions.builder';
import { Project } from '../../../../lib/project/project.entity';

jest.mock('inquirer');

const prompt = inquirer.prompt as jest.MockedFunction<inquirer.PromptModule>;

describe('Build project', () => {
  describe('From questions', () => {
    describe('Without subprojects and with open-vscode action', () => {
      let builtProject: Project;
      beforeAll(async () => {
        const questions = {} as BuildProjectQuestionCollection;

        const answers = {
          path: `${__dirname}/../fixtures/projects/awesome-project`,
          hasSubprojects: false,
          actions: ['open-vscode'],
        };

        prompt.mockResolvedValue(answers);
        builtProject = await buildProject('awesome_project', questions);
      });

      it('should built project without subprojects and with open-vscode action', () => {
        const project = new Project(
          'awesome_project',
          `${__dirname}/../fixtures/projects/awesome-project`,
        );
        project.addAction(new OpenVSCode());

        expect(builtProject).toStrictEqual(project);
      });
    });

    describe('With two subprojects and with open-vscode action', () => {
      let builtProject: Project;
      beforeAll(async () => {
        const questions = {} as BuildProjectQuestionCollection;

        const firstAnswers = {
          path: `${__dirname}/../fixtures/projects/awesome-project`,
          hasSubprojects: true,
        };

        const firstSubprojectAnswers = {
          path: 'api',
          hasSubprojects: false,
          actions: ['open-vscode'],
        };

        const firstHaveMoreProjectAnswers = {
          haveMoreSubprojects: true,
        };

        const secondSubprojectAnswers = {
          path: 'mobile',
          hasSubprojects: false,
          actions: ['open-vscode'],
        };

        const secondHaveMoreProjectAnswers = {
          haveMoreSubprojects: false,
        };

        prompt
          .mockResolvedValueOnce(firstAnswers)
          .mockResolvedValueOnce(firstSubprojectAnswers)
          .mockResolvedValueOnce(firstHaveMoreProjectAnswers)
          .mockResolvedValueOnce(secondSubprojectAnswers)
          .mockResolvedValueOnce(secondHaveMoreProjectAnswers);
        builtProject = await buildProject('awesome_project', questions);
      });

      it('should inquire with question about more projects', () => {
        const questions = buildMoreSubprojectQuestion(
          new Project(
            'awesome_project',
            `${__dirname}/../fixtures/projects/awesome-project`,
          ),
        );

        expect(prompt).toHaveBeenLastCalledWith(questions);
      });

      it('should built project with subproject and with open-vscode action', () => {
        const project = new Project(
          'awesome_project',
          `${__dirname}/../fixtures/projects/awesome-project`,
        );

        const api = new Project('awesome_project', 'api');
        api.addAction(new OpenVSCode());

        const mobile = new Project('awesome_project', 'mobile');
        mobile.addAction(new OpenVSCode());

        project.addSubproject(api);
        project.addSubproject(mobile);

        expect(builtProject).toStrictEqual(project);
      });
    });
  });
});
