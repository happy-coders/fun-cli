import { Project } from '../../project.entity';

export abstract class AbstractManager {
  public abstract create(project: Project): Promise<boolean> | boolean;
  public abstract listAll(): Promise<Project[]> | Project[];
  public abstract findOne(
    alias: string,
  ): Promise<Project | undefined> | Project | undefined;
  public abstract update(
    alias: string,
    project: Project,
  ): Promise<boolean> | boolean;
  public abstract delete(alias: string): Promise<boolean> | boolean;
}
