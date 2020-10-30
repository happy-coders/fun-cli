import { ProjectRepository } from '../../../../src/lib/project/persistence/repository';
import { Project } from '../../../../src/lib/project/project.entity';

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

  describe('listAll', () => {
    it('should call manager', () => {
      repo.listAll();

      expect(manager.listAll).toHaveBeenCalledTimes(1);
    });
  });
});
