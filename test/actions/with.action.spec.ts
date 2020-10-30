import chalk from 'chalk';
import emoji from 'node-emoji';

import { WithAction } from '../../src/actions';
import * as repositoryFactory from '../../src/lib/project/persistence/repository.factory';
import { ERROR_PREFIX, SUCCESS_PREFIX } from '../../src/lib/ui';

jest.mock('../../src/lib/project/persistence/repository.factory');

const createProjectRepository = repositoryFactory.createProjectRepository as jest.MockedFunction<
  typeof repositoryFactory.createProjectRepository
>;

const repositoryMock = {
  findOneOrFail: jest.fn(),
};

describe('With action', () => {
  describe('Handle', () => {
    describe('Without alias on inputs', () => {
      it('should throw error', () => {
        const action = new WithAction();
        expect(() => action.handle([])).rejects.toThrowError(
          'No alias found in command input',
        );
      });
    });

    describe('With alias', () => {
      const alias = 'funniest-project';
      let action: WithAction;

      beforeAll(() => {
        global.console.error = jest.fn();
        global.console.info = jest.fn();
        action = new WithAction();
      });

      describe('When project not exists', () => {
        const errorMessage = `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
          alias,
        )}\n`;
        beforeAll(async () => {
          createProjectRepository.mockResolvedValue(repositoryMock as any);
          repositoryMock.findOneOrFail.mockRejectedValue(
            new Error(errorMessage),
          );
        });

        it('should throw error', async () => {
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
        const gitPullLabel = 'Git pull';
        const gitPullName = 'git-pull';

        const openSpotifyLabel = 'Open Spotify';
        const openSpotifyName = 'open-spotify';

        const project = {
          getAlias: () => alias,
          getTasks: jest.fn(),
        };

        const gitPull = {
          getLabel: () => gitPullLabel,
          getName: () => gitPullName,
          execute: jest.fn(),
        };

        const openSpotify = {
          getLabel: () => openSpotifyLabel,
          getName: () => openSpotifyName,
          execute: jest.fn(),
        };

        beforeAll(async () => {
          global.console.info = jest.fn();
          global.process.stdout.write = jest.fn();

          gitPull.execute.mockResolvedValue(true);
          openSpotify.execute.mockResolvedValue(false);
          project.getTasks.mockReturnValue([gitPull, openSpotify]);

          createProjectRepository.mockResolvedValue(repositoryMock as any);
          repositoryMock.findOneOrFail.mockResolvedValue(project);

          await action.handle([
            {
              name: 'alias',
              value: alias,
            },
          ]);
        });

        it('should log an info about project execution', () => {
          expect(console.info).toHaveBeenNthCalledWith(
            1,
            `\nRunning your funny project tasks...\n`,
          );
        });

        it('should execute all project tasks', () => {
          expect(gitPull.execute).toHaveBeenCalledTimes(1);
          expect(gitPull.execute).toHaveBeenCalledWith(project);

          expect(openSpotify.execute).toHaveBeenCalledTimes(1);
          expect(openSpotify.execute).toHaveBeenCalledWith(project);
        });

        it('should write on console that is executing tasks', () => {
          expect(process.stdout.write).toHaveBeenCalledWith(
            `Task to ${chalk.yellow(gitPullLabel)}: Executing...\r`,
          );
          expect(process.stdout.write).toHaveBeenCalledWith(
            `Task to ${chalk.yellow(openSpotifyLabel)}: Executing...\r`,
          );
        });

        it('should write success message on console for success tasks', () => {
          expect(process.stdout.write).toHaveBeenCalledWith(
            `Task to ${chalk.yellow(gitPullLabel)}: ${SUCCESS_PREFIX}     \n`,
          );
        });

        it('should write error message on console for error tasks', () => {
          expect(process.stdout.write).toHaveBeenCalledWith(
            `Task to ${chalk.yellow(
              openSpotifyLabel,
            )}: ${ERROR_PREFIX}       \n`,
          );
        });

        it('should write finish message with tasks result status', () => {
          expect(console.info).toHaveBeenNthCalledWith(
            2,
            `\n${emoji.get('tada')} All tasks for ${chalk.yellow(
              project.getAlias(),
            )} has been executed! Don't worry. Be happy! ${emoji.emojify(
              ':grin: :computer: :thought_balloon: :moneybag:',
            )}\n`,
          );
        });
      });
    });
  });
});
