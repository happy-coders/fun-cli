import { Project } from '../project.entity';
import { AbstractManager } from './manager/abstract.manager';

export class ProjectRepository {
  constructor(private readonly manager: AbstractManager) {}

  async create(project: Project): Promise<boolean> {
    return this.manager.create(project);
  }

  async listAll(): Promise<Project[]> {
    return this.manager.listAll();
  }

  async findOne(alias: string): Promise<Project | undefined> {
    return this.manager.findOne(alias);
  }

  async update(alias: string, project: Project): Promise<boolean> {
    return this.manager.update(alias, project);
  }

  async delete(alias: string): Promise<boolean> {
    return this.manager.delete(alias);
  }

  getManager() {
    return this.manager;
  }
}
