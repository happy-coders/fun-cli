import chalk from 'chalk';

import { ProjectRepository } from '../../../../core/project/persistence/repository';
import { Project } from '../../../../core/project/project.entity';
import { ERROR_PREFIX } from '../../../../core/ui/prefixes';

describe('Project Repository', () => {
  const manager = {
    create: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    listAll: jest.fn(),
    update: jest.fn(),
  };
  const project = new Project('alias', 'path');

  let repo: ProjectRepository;

  beforeAll(() => {
    repo = new ProjectRepository(manager);
  });

  describe('create', () => {
    it('should call manager', () => {
      repo.create(project);

      expect(manager.create).toHaveBeenCalledTimes(1);
      expect(manager.create).toHaveBeenCalledWith(project);
    });
  });

  describe('delete', () => {
    it('should call manager', () => {
      repo.delete(project.getAlias());

      expect(manager.delete).toHaveBeenCalledTimes(1);
      expect(manager.delete).toHaveBeenCalledWith(project.getAlias());
    });
  });

  describe('update', () => {
    it('should call manager', () => {
      repo.update(project.getAlias(), project);

      expect(manager.update).toHaveBeenCalledTimes(1);
      expect(manager.update).toHaveBeenCalledWith(project.getAlias(), project);
    });
  });

  describe('findOne', () => {
    it('should call manager', () => {
      repo.findOne(project.getAlias());

      expect(manager.findOne).toHaveBeenCalledTimes(1);
      expect(manager.findOne).toHaveBeenCalledWith(project.getAlias());
    });
  });

  describe('findOneOrFail', () => {
    const alias = 'fun';
    describe('When project not exists', () => {
      const errorMessage = `\n${ERROR_PREFIX} Not found a project with alias: ${chalk.red(
        alias,
      )}\n`;

      beforeAll(() => {
        global.console.error = jest.fn();
        global.console.info = jest.fn();

        repo.findOne = jest.fn().mockReturnValue(undefined);
      });

      it('should throw an error', () => {
        expect(() => repo.findOneOrFail(alias)).rejects.toThrowError(
          errorMessage,
        );
      });

      it('should print error on console', () => {
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(errorMessage);
      });

      it('should print list project help', () => {
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith(
          `Run "${chalk.yellow(
            'fun list',
          )}" for a list of existent commands.\n`,
        );
      });
    });

    describe('When found project', () => {
      it('should return the project', async () => {
        repo.findOne = jest.fn().mockReturnValue(project);

        const result = await repo.findOneOrFail(alias);

        expect(result).toBe(project);
      });
    });
  });

  describe('listAll', () => {
    it('should call manager', () => {
      repo.listAll();

      expect(manager.listAll).toHaveBeenCalledTimes(1);
    });
  });
});
