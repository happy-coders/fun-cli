import { LIST_PROJECTS_HELP, PROJECT_NOT_FOUND } from '../../ui/messages';
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

  async findOneOrFail(alias: string): Promise<Project> {
    const project = await this.findOne(alias);

    if (!project) {
      const errorMessage = PROJECT_NOT_FOUND(alias);

      console.error(errorMessage);
      console.info(LIST_PROJECTS_HELP);

      throw new Error(errorMessage);
    }

    return project;
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
