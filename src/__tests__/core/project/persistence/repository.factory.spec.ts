import { FileManager } from '../../../../core/project/persistence/manager/file.manager';
import { ProjectRepository } from '../../../../core/project/persistence/repository';
import { createProjectRepository } from '../../../../core/project/persistence/repository.factory';

describe('Repository factory', () => {
  it('should return an instance of ProjectRepository with default', async () => {
    const projectRepository = await createProjectRepository();

    expect(projectRepository).toBeInstanceOf(ProjectRepository);
    expect(projectRepository.getManager()).toBeInstanceOf(FileManager);
  });
});
