import chalk from 'chalk';
import * as inquirer from 'inquirer';
import emoji from 'node-emoji';

import { DeleteAction } from '../../actions';
import * as questionBuilder from '../../core/project/builder/questions.builder';
import { Project } from '../../core/project/project.entity';
import { ERROR_PREFIX } from '../../core/ui';

jest.mock('../../core/project/persistence/repository.factory');
jest.mock('../../core/project/builder/questions.builder');
jest.mock('inquirer');

const buildDeleteProjectConfirmationQuestion = questionBuilder.buildDeleteProjectConfirmationQuestion as jest.MockedFunction<
  typeof questionBuilder.buildDeleteProjectConfirmationQuestion
>;
const repositoryMock = {
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
};

const prompt = inquirer.prompt as jest.MockedFunction<inquirer.PromptModule>;

describe('With action', () => {
  describe('Setup', () => {
    it('should return a function calling handle with inputs', () => {
      const action = new DeleteAction(repositoryMock as any);
      action.handle = jest.fn();
      const setup = action.setup();

      setup('alias');

      expect(action.handle).toHaveBeenCalledTimes(1);
      expect(action.handle).toHaveBeenCalledWith([
        { name: 'alias', value: 'alias' },
      ]);
    });
  });

  describe('Handle', () => {
    let action: DeleteAction;

    beforeAll(() => {
      action = new DeleteAction(repositoryMock as any);
    });

    describe('Without alias on inputs', () => {
      it('should throw error', () => {
        expect(() => action.handle([])).rejects.toThrowError(
          'No alias found in command input',
        );
      });
    });

    describe('With alias', () => {
      const alias = 'funniest-project';

      beforeAll(() => {
        global.console.error = jest.fn();
        global.console.info = jest.fn();
      });

      describe('When project not exists', () => {
        const errorMessage = `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
          alias,
        )}\n`;
        beforeAll(async () => {
          repositoryMock.findOneOrFail.mockRejectedValue(
            new Error(errorMessage),
          );
        });

        it('should throw error', async () => {
          action = new DeleteAction(repositoryMock as any);
          await expect(() =>
            action.handle([
              {
                name: 'alias',
                value: alias,
              },
            ]),
          ).rejects.toThrowError(errorMessage);
        });

        it('should call repository passing alias', () => {
          expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
          expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith(alias);
        });
      });

      describe('For existent project', () => {
        const confirmQuestion: any[] = [];

        let project: Project;

        beforeAll(async () => {
          project = new Project(alias, 'test');

          repositoryMock.findOneOrFail.mockResolvedValue(project);

          buildDeleteProjectConfirmationQuestion.mockReturnValue(
            confirmQuestion,
          );
          prompt.mockResolvedValue({
            shouldDelete: true,
          });

          action = new DeleteAction(repositoryMock as any);
          await action.handle([
            {
              name: 'alias',
              value: alias,
            },
          ]);
        });

        it('should ask confirmation', () => {
          expect(buildDeleteProjectConfirmationQuestion).toHaveBeenCalledTimes(
            1,
          );
          expect(buildDeleteProjectConfirmationQuestion).toHaveBeenCalledWith(
            project,
          );

          expect(prompt).toHaveBeenCalledTimes(1);
          expect(prompt).toHaveBeenCalledWith(confirmQuestion);
        });

        describe('When confirm deletion', () => {
          beforeAll(async () => {
            global.console.info = jest.fn();
            repositoryMock.delete.mockReset();

            repositoryMock.findOneOrFail.mockResolvedValue(project);
            repositoryMock.delete.mockResolvedValue(true);
            buildDeleteProjectConfirmationQuestion.mockReturnValue(
              confirmQuestion,
            );

            prompt.mockResolvedValue({
              shouldDelete: true,
            });

            action = new DeleteAction(repositoryMock as any);
            await action.handle([
              {
                name: 'alias',
                value: alias,
              },
            ]);
          });

          it('should delete project', () => {
            expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
            expect(repositoryMock.delete).toHaveBeenCalledWith(alias);
          });

          describe('When delete with success', () => {
            it('should print success message', () => {
              expect(console.info).toHaveBeenNthCalledWith(
                1,
                `\n${emoji.get(
                  'disappointed',
                )} The project "${alias}" is not fun anymore, it happens...\n`,
              );
            });
          });

          describe('When delete fail', () => {
            beforeAll(async () => {
              global.console.info = jest.fn();

              repositoryMock.findOneOrFail.mockResolvedValue(project);
              repositoryMock.delete.mockResolvedValue(false);
              buildDeleteProjectConfirmationQuestion.mockReturnValue(
                confirmQuestion,
              );

              prompt.mockResolvedValue({
                shouldDelete: true,
              });

              action = new DeleteAction(repositoryMock as any);
              await action.handle([
                {
                  name: 'alias',
                  value: alias,
                },
              ]);
            });

            it('should print error message', () => {
              expect(console.error).toHaveBeenNthCalledWith(
                1,
                `\n${emoji.get(
                  'disappointed_relieved',
                )} Whoops, something went wrong! It's not fun...\n`,
              );
            });

            it('should print a joke', () => {
              expect(console.info).toHaveBeenNthCalledWith(
                1,
                `\n${emoji.get(
                  'thought_balloon',
                )} Be positive! At least you can have fun with "${project.getAlias()}" for the last time...\n`,
              );
            });
          });
        });

        describe('When not confirm deletion', () => {
          beforeAll(async () => {
            global.console.info = jest.fn();
            repositoryMock.delete.mockReset();

            repositoryMock.findOneOrFail.mockResolvedValue(project);
            repositoryMock.delete.mockResolvedValue(true);
            buildDeleteProjectConfirmationQuestion.mockReturnValue(
              confirmQuestion,
            );

            prompt.mockResolvedValue({
              shouldDelete: false,
            });

            action = new DeleteAction(repositoryMock as any);
            await action.handle([
              {
                name: 'alias',
                value: alias,
              },
            ]);
          });

          it('should not delete project', () => {
            expect(repositoryMock.delete).not.toHaveBeenCalled();
          });

          it('should print info message', () => {
            expect(console.info).toHaveBeenNthCalledWith(
              1,
              `\n${emoji.get('sweat_smile')} Phew, that was close...\n`,
            );
          });
        });
      });
    });
  });
});
