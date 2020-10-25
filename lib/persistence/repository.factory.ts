import { AbstractRepository } from './abstract.repository';
import { FileRepository } from './file.repository';

export function createRepository(
  driver = 'file',
): AbstractRepository | Promise<AbstractRepository> {
  if (driver === 'file') {
    return new FileRepository('~/.fun-cli');
  }

  throw new Error(`Repository factory not found for driver "${driver}"`);
}
