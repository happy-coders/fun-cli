import { createManager } from './manager/manager.factory';
import { ProjectRepository } from './repository';

export function createProjectRepository() {
  const manager = createManager();
  return new ProjectRepository(manager);
}
