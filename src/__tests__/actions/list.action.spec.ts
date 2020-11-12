import chalk from 'chalk';
import emoji from 'node-emoji';

import { ListAction } from '../../lib/actions/list.action';
import { ProjectRepository } from '../../lib/core/project/persistence/repository';
import { Project } from '../../lib/core/project/project.entity';
import { OpenVSCode } from '../../lib/core/project/tasks/open-editor/vscode.task';

describe('List action', () => {
  describe('Setup', () => {
    it('should return a function calling handle with inputs', () => {
      const action = new ListAction({} as ProjectRepository);
      action.handle = jest.fn();
      const setup = action.setup();

      setup();

      expect(action.handle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Handle', () => {
    const repositoryMock: any = {
      listAll: jest.fn(),
    };
    describe('Without projects created', () => {
      let action: ListAction;
      beforeAll(() => {
        global.console.info = jest.fn();

        repositoryMock.listAll.mockResolvedValue([]);

        action = new ListAction(repositoryMock);
        action.handle();
      });

      it('should print a info message', () => {
        expect(console.info).toHaveBeenNthCalledWith(
          1,
          `\n${emoji.get('disappointed')} No fun projects found! ${emoji.get(
            'face_palm',
          )}\n`,
        );
      });

      it('should print a help message with cmd to add project', () => {
        expect(console.info).toHaveBeenNthCalledWith(
          2,
          `${emoji.get('point_right')} Run "${chalk.yellow(
            'fun add <project-alias> --path <path-to-project>',
          )}" to add a fun project!\n`,
        );
      });
    });

    describe('With projects', () => {
      let awesomeProject: Project;
      let greatProject: Project;

      let action: ListAction;
      beforeAll(() => {
        global.console.info = jest.fn();

        awesomeProject = new Project('awesome', '/var/ww/awesome/html');
        awesomeProject.addTask(new OpenVSCode());

        greatProject = new Project('great', '/var/ww/great/html');
        greatProject.addTask(new OpenVSCode());

        repositoryMock.listAll.mockResolvedValue([
          awesomeProject,
          greatProject,
        ]);

        action = new ListAction(repositoryMock);
        action.handle();
      });

      it('should print a list of projects', () => {
        expect(console.info).toHaveBeenNthCalledWith(
          1,
          `\n${emoji.emojify(':grimacing: :clap:')} You have ${chalk.yellow(
            '2',
          )} projects to have fun:\n- ${awesomeProject.getAlias()}: fun with ${awesomeProject.getAlias()}\n- ${greatProject.getAlias()}: fun with ${greatProject.getAlias()}\n`,
        );
      });

      it('should print a help message with cmd to show project details', () => {
        expect(console.info).toHaveBeenNthCalledWith(
          2,
          `${emoji.get('point_right')} Run "${chalk.yellow(
            'fun details <project-alias>',
          )}" for more details about project.\n`,
        );
      });
    });
  });
});
