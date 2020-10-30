import chalk from 'chalk';

import { AddAction } from '../../src/actions';
import * as projectBuilder from '../../src/lib/project/builder/project.builder';
import * as projectQuestionsBuilder from '../../src/lib/project/builder/questions.builder';
import * as repositoryFactory from '../../src/lib/project/persistence/repository.factory';
import { Project } from '../../src/lib/project/project.entity';
import { OpenVSCode } from '../../src/lib/project/tasks/open-editor/vscode.task';

jest.mock('../../src/lib/project/builder/project.builder');
jest.mock('../../src/lib/project/builder/questions.builder');
jest.mock('../../src/lib/project/persistence/repository.factory');

const buildProject = projectBuilder.buildProject as jest.MockedFunction<
  typeof projectBuilder.buildProject
>;
const buildProjectQuestions = projectQuestionsBuilder.buildProjectQuestions as jest.MockedFunction<
  typeof projectQuestionsBuilder.buildProjectQuestions
>;
const createProjectRepository = repositoryFactory.createProjectRepository as jest.MockedFunction<
  typeof repositoryFactory.createProjectRepository
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

      beforeAll(() => {
        global.console.error = jest.fn();
      });

      describe('Without path on inputs', () => {
        it('should throw error', async () => {
          const action = new AddAction();
          await expect(() =>
            action.handle([{ name: 'alias', value: alias }]),
          ).rejects.toThrowError('No path found in command input');
        });
      });

      describe('With path', () => {
        describe('With invalid path', () => {
          const notFoundPath = '/var/www/funny';
          const errorMessage = `\nPath "${notFoundPath}" not exists or is unacessible\n`;
          it('should throw an error', async () => {
            const action = new AddAction();
            await expect(() =>
              action.handle([
                {
                  name: 'alias',
                  value: alias,
                },
                {
                  name: 'path',
                  value: notFoundPath,
                },
              ]),
            ).rejects.toThrowError(errorMessage);
          });

          it('should log the error message', () => {
            expect(console.error).toHaveBeenCalledWith(chalk.red(errorMessage));
          });
        });

        describe('If path is a file', () => {
          const filePath = `${__dirname}/../fixtures/projects-file/projects.json`;
          const errorMessage = '\nPath must be a directory\n';
          it('should throw an error', async () => {
            const action = new AddAction();
            await expect(() =>
              action.handle([
                {
                  name: 'alias',
                  value: alias,
                },
                {
                  name: 'path',
                  value: filePath,
                },
              ]),
            ).rejects.toThrowError(errorMessage);
          });

          it('should log the error message', () => {
            expect(console.error).toHaveBeenCalledWith(chalk.red(errorMessage));
          });
        });

        describe('With valid path', () => {
          const repositoryMock: any = {
            create: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            listAll: jest.fn(),
            update: jest.fn(),
          };
          const projectDefinitionsFactory = () => {
            const project = new Project(alias, __dirname);
            project.addTask(new OpenVSCode());

            return project;
          };

          describe('When project not exists', () => {
            const path = `${__dirname}/../fixtures`;
            const questions = ['fake-questions'];
            let action: AddAction;

            describe('When persist project with success', () => {
              let project: Project;
              beforeAll(async () => {
                global.console.log = jest.fn();
                buildProjectQuestions.mockReturnValue(questions);

                repositoryMock.create.mockReturnValue(true);

                buildProject.mockResolvedValue(projectDefinitionsFactory());
                createProjectRepository.mockResolvedValue(
                  repositoryMock as any,
                );

                action = new AddAction();
                await action.handle([
                  {
                    name: 'alias',
                    value: alias,
                  },
                  {
                    name: 'path',
                    value: path,
                  },
                ]);
                project = projectDefinitionsFactory();
              });

              it('should build questions with project alias', () => {
                expect(buildProjectQuestions).toHaveBeenCalled();
              });

              it('should build project with build project questions', () => {
                expect(buildProject).toHaveBeenCalledWith(
                  alias,
                  path,
                  questions,
                );
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
                expect(console.log).toHaveBeenNthCalledWith(
                  2,
                  chalk.green(
                    `  Run "fun with ${project.getAlias()}" and be happy! :D\n`,
                  ),
                );
              });
            });
          });

          describe('When project already exists', () => {
            const filePath = `${__dirname}/../fixtures/projects-file`;

            let project: Project;
            let errorMessage: string;

            beforeAll(() => {
              project = projectDefinitionsFactory();
              const tasksNames = project
                .getTasks()
                .map((task) => task.getName());

              errorMessage =
                `\nAlready exists a project with alias "${alias}"\n` +
                `+ Path: ${project.getPath()}\n` +
                `+ Tasks: ${tasksNames.join(', ')}\n`;
            });

            it('should throw an error', async () => {
              repositoryMock.findOne.mockResolvedValue(project);

              const action = new AddAction();
              await expect(() =>
                action.handle([
                  {
                    name: 'alias',
                    value: alias,
                  },
                  {
                    name: 'path',
                    value: filePath,
                  },
                ]),
              ).rejects.toThrowError(errorMessage);
            });

            it('should log the error message', () => {
              expect(console.error).toHaveBeenCalledWith(
                chalk.red(errorMessage),
              );
            });
          });
        });
      });
    });
  });
});
