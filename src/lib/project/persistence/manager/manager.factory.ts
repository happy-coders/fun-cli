import { AbstractManager } from './abstract.manager';
import { FileManager } from './file.manager';
import { homedir } from 'os';

export function createManager(
  driver = 'file',
): AbstractManager | Promise<AbstractManager> {
  if (driver === 'file') {
    return new FileManager(`${homedir()}/.fun-cli`);
  }

  throw new Error(`Manager factory not found for driver "${driver}"`);
}
