import { createManager } from './manager/manager.factory';
import { ProjectRepository } from './repository';

export async function createProjectRepository() {
  const manager = await createManager();
  return new ProjectRepository(manager);
}
