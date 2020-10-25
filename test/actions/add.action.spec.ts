import * as chalk from 'chalk';

import { AddAction } from '../../actions/add.action';
import * as repositoryFactory from '../../lib/persistence/repository.factory';
import { OpenVSCode } from '../../lib/project/actions/open-vscode.action';
import * as projectBuilder from '../../lib/project/builder/project.builder';
import * as projectQuestionsBuilder from '../../lib/project/builder/questions.builder';
import { Project } from '../../lib/project/project.entity';

jest.mock('../../lib/project/builder/project.builder');
jest.mock('../../lib/project/builder/questions.builder');
jest.mock('../../lib/persistence/repository.factory');

const buildProject = projectBuilder.buildProject as jest.MockedFunction<
  typeof projectBuilder.buildProject
>;
const buildProjectQuestions = projectQuestionsBuilder.buildProjectQuestions as jest.MockedFunction<
  typeof projectQuestionsBuilder.buildProjectQuestions
>;
const createRepository = repositoryFactory.createRepository as jest.MockedFunction<
  typeof repositoryFactory.createRepository
>;

describe('Add action', () => {
  describe('Handle', () => {
    describe('Without alias on inputs', () => {
      it('should throw error', () => {
        const action = new AddAction();
        expect(() => action.handle([])).rejects.toThrowError(
          'No alias found in command input',
        );
      });
    });

    describe('With alias', () => {
      const alias = 'funniest-project';
      const questions = ['fake-questions'];
      let action: AddAction;
      const repositoryMock: any = {
        create: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
        listAll: jest.fn(),
        update: jest.fn(),
      };
      const projectDefinitionsFactory = () => {
        const project = new Project(alias, __dirname);

        const api = new Project(alias, 'api');
        api.addAction(new OpenVSCode());

        project.addSubproject(api);

        return project;
      };

      describe('When persist project with success', () => {
        let project: Project;
        beforeAll(async () => {
          global.console.log = jest.fn();
          buildProjectQuestions.mockReturnValue(questions);

          repositoryMock.create.mockReturnValue(true);

          buildProject.mockResolvedValue(projectDefinitionsFactory());
          createRepository.mockResolvedValue(repositoryMock as any);

          action = new AddAction();
          await action.handle([
            {
              name: 'alias',
              value: alias,
            },
          ]);
          project = projectDefinitionsFactory();
        });

        it('should build project with build project questions', () => {
          expect(buildProject).toHaveBeenCalledWith(alias, questions);
        });

        it('should persist the built project', () => {
          expect(repositoryMock.create).toHaveBeenCalledWith(project);
        });

        it('should show success message on console', () => {
          expect(console.log).toHaveBeenNthCalledWith(
            1,
            chalk.green(
              `\nDone! Your project "${project.getAlias()}" has been created with success!\n`,
            ),
          );
          project.getSubprojects().forEach((subproject, index) => {
            expect(console.log).toHaveBeenNthCalledWith(
              index + 2,
              chalk.green(
                `+ Subproject "${subproject.getPath()}": Success.\n`,
                `  Run "fun with ${project.getAlias()}:${subproject.getPath()}"!\n`,
              ),
            );
          });
        });
      });
    });
  });
});
