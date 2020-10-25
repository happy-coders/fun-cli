import { Project } from '../project/project.entity';

export abstract class AbstractRepository {
  public abstract create(project: Project): Promise<boolean>;
  public abstract listAll(): Promise<Project[]>;
  public abstract findOne(alias: string): Promise<Project | undefined>;
  public abstract update(alias: string, project: Project): Promise<boolean>;
  public abstract delete(alias: string): Promise<boolean>;
}
