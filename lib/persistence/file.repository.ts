import { Project } from '../project/project.entity';
import { AbstractRepository } from './abstract.repository';

export class FileRepository extends AbstractRepository {
  constructor(private readonly path: string) {
    super();
  }

  public create(project: Project): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public listAll(): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  public findOne(alias: string): Promise<Project | undefined> {
    throw new Error('Method not implemented.');
  }
  public update(alias: string, project: Project): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  public delete(alias: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
